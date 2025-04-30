'use client';

import { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import HeaderTitle from '@/components/header-title';
import OverviewCards from './OverviewCards';
import ChartsSection from './ChartsSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import {
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
} from 'firebase/firestore';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { db } from '@/lib/firebase';

async function createUserProfileIfNotExist(user: User): Promise<void> {
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      email: user.email,
      name: user.displayName || 'Anonymous',
      createdAt: serverTimestamp(),
    });
    console.log('User profile created!');
  } else {
    console.log('User profile already exists.');
  }

  const userdataRef = doc(userRef, 'userdata', 'profile');
  const userdataSnap = await getDoc(userdataRef);

  if (!userdataSnap.exists()) {
    await setDoc(userdataRef, {
      username: user.displayName || 'Anonymous',
      hoursLogged: 0,
      tasksCompleted: 0,
    });
    console.log('Userdata created!');
  } else {
    console.log('Userdata already exists.');
  }
}

async function ensureSubCollectionDoc<T>(
  user: User,
  subCollection: string,
  docId: string,
  defaultData: T
): Promise<void> {
  const ref = doc(db, 'users', user.uid, subCollection, docId);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, { ...defaultData, createdAt: serverTimestamp() });
    console.log(`${subCollection}/${docId} created`);
  } else {
    console.log(`${subCollection}/${docId} already exists.`);
  }
}

interface CardData { id: string; title: string; value: string; change: string; }
interface TaskData { id: string; title: string; status: string; [key: string]: any; }

export default function DashboardMain() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [overviewData, setOverviewData] = useState<CardData[]>([]);
  const [taskData, setTaskData] = useState<TaskData[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setAuthLoading(false);
      if (user) {
        await createUserProfileIfNotExist(user);

        await ensureSubCollectionDoc(user, 'profile', 'defaultProfile', {});
        await ensureSubCollectionDoc(user, 'calendar', 'eventsList', { events: [] });
        await ensureSubCollectionDoc(user, 'resourceHub', 'default', {});
        await ensureSubCollectionDoc(user, 'botAssist', 'default', {});
        await ensureSubCollectionDoc(user, 'friends', 'default', {});
        await ensureSubCollectionDoc(user, 'settings', 'profileSettings', {
          darkMode: false,
          fontSize: 14,
          timezone: 'America/Chicago',
          enableNotifications: true,
          notificationFrequency: 'daily',
        });
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchOverview = async () => {
    if (!user) return;
    const snap = await getDocs(collection(db, 'users', user.uid, 'overview'));
    const formatted: CardData[] = snap.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        value: data.value,
        change: data.change,
      };
    });
    setOverviewData(formatted);
  };

  const fetchUserdata = async () => {
    if (!user) return;
    const userdataRef = doc(db, 'users', user.uid, 'userdata', 'profile');
    const userdataSnap = await getDoc(userdataRef);

    if (userdataSnap.exists()) {
      const data = userdataSnap.data();
      setOverviewData((prev) => [
        ...prev,
        {
          id: 'hoursLogged',
          title: 'Hours Logged',
          value: data.hoursLogged.toString(),
          change: '+0 today',
        },
        {
          id: 'tasksCompleted',
          title: 'Tasks Completed',
          value: data.tasksCompleted.toString(),
          change: '+0 today',
        },
      ]);
    }
  };

  const fetchTasks = async () => {
    if (!user) return;
    const snap = await getDocs(collection(db, 'users', user.uid, 'tasks'));
    const now = new Date();

    const formatted: TaskData[] = await Promise.all(
      snap.docs.map(async (docSnap) => {
        const data = docSnap.data();
        const dueDate = new Date(data.dueDate);

        let status = data.status;
        if (status === 'Pending' && dueDate < now) {
          status = 'Overdue';
          await updateDoc(doc(db, 'users', user.uid, 'tasks', docSnap.id), { status: 'Overdue' });
        }

        return {
          id: docSnap.id,
          title: data.title,
          status: status,
        };
      })
    );

    setTaskData(formatted);
  };

  const handleAddTask = async () => {
    if (!user || !newTaskTitle || !newTaskDueDate) return;
    const taskRef = collection(db, 'users', user.uid, 'tasks');
    await addDoc(taskRef, {
      title: newTaskTitle,
      dueDate: newTaskDueDate,
      status: 'Pending',
      createdAt: serverTimestamp(),
    });
    setNewTaskTitle('');
    setNewTaskDueDate('');
    fetchTasks();
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!user) return;
    const taskDoc = doc(db, 'users', user.uid, 'tasks', taskId);
    await deleteDoc(taskDoc);
    fetchTasks();
  };

  useEffect(() => {
    if (authLoading || !user) return;
    switch (activeTab) {
      case 'overview':
        fetchOverview();
        fetchUserdata();
        break;
      case 'task':
        fetchTasks();
        break;
      default:
        break;
    }
  }, [activeTab, authLoading, user]);

  const tabs = [
    { label: 'Overview', value: 'overview' },
    { label: 'Task', value: 'task' },
  ];

  return (
    <div className="flex-1 bg-white px-12 py-8 max-w-6xl mx-auto">
      <HeaderTitle />
      <Separator className="my-4" />

      <div className="flex gap-4 mb-6">
        {tabs.map((tab) => (
          <Button
            key={tab.value}
            variant={activeTab === tab.value ? 'default' : 'outline'}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.label}
          </Button>
        ))}
        <Button variant="outline">
          <Link href="/quiz">Quiz</Link>
        </Button>
      </div>

      <Separator className="my-2" />

      {activeTab === 'overview' && (
        <>
          <OverviewCards data={overviewData} placeholder="No overview data yet..." />
          <Separator className="my-6" />
          <ChartsSection data={overviewData} />
        </>
      )}

      {activeTab === 'task' && (
        <div className="flex flex-col gap-6">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter task title"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="border p-2 rounded flex-1"
            />
            <input
              type="date"
              value={newTaskDueDate}
              onChange={(e) => setNewTaskDueDate(e.target.value)}
              className="border p-2 rounded"
            />
            <Button onClick={handleAddTask}>Add Task</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {taskData.length > 0 ? (
              taskData.map((task) => (
                <div key={task.id} className="p-4 bg-blue-50 rounded shadow">
                  <h3 className="text-sm text-gray-700">{task.title}</h3>
                  <p className="text-gray-500">{task.status}</p>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteTask(task.id)}>
                    Delete
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No tasks yet...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
