"use client";

// -----------------------------------------------------------------------------
// Imports
// -----------------------------------------------------------------------------
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import HeaderTitle from "@/components/header-title";
import ChartsSection from "./ChartsSection";
import OverviewCards from "./OverviewCards";
import ReminderIcon from '@/components/dashboard/ReminderIcon';

import {
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  DocumentReference,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { db } from "@/lib/firebase";

// -----------------------------------------------------------------------------
// Helper types
// -----------------------------------------------------------------------------
interface CardData {
  id: string;
  title: string;
  value: string;
  change: string;
}

interface TaskData {
  id: string;
  title: string;
  status: string;
}

export interface DayGraphPoint {
  day: string;
  hours: number;
}

export interface WeekGraphPoint {
  week: string;
  totalHours: number;
}

// -----------------------------------------------------------------------------
// Clock component (pure client-side)
// -----------------------------------------------------------------------------
const Clock = () => {
  const [timeString, setTimeString] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      setTimeString(new Date().toLocaleTimeString());
    };
    updateTime();
    const intervalId = setInterval(updateTime, 1_000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="text-3xl font-semibold">
      {timeString}
    </div>
  );
};

// -----------------------------------------------------------------------------
// Firestore helpers
// -----------------------------------------------------------------------------
const weekKeys = ["week1", "week2", "week3", "week4"] as const;

type WeekKey = (typeof weekKeys)[number];

async function createUserProfileIfNotExist(user: User) {
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      email: user.email,
      name: user.displayName ?? "Anonymous",
      createdAt: serverTimestamp(),
    });
  }

  const profileRef = doc(userRef, "userdata", "profile");
  const profileSnap = await getDoc(profileRef);

  if (!profileSnap.exists()) {
    await setDoc(profileRef, {
      username: user.displayName ?? "Anonymous",
      hoursLogged: 0,
      tasksCompleted: 0,
      weeklyData: weekKeys.reduce<Record<WeekKey, number>>((acc, key) => {
        acc[key] = 0;
        return acc;
      }, {} as Record<WeekKey, number>),
    });
    await createWeekDataCollection(profileRef);
  } else {
    const data = profileSnap.data();
    if (!data.weeklyData) {
      await updateDoc(profileRef, {
        weeklyData: weekKeys.reduce<Record<WeekKey, number>>((acc, key) => {
          acc[key] = 0;
          return acc;
        }, {} as Record<WeekKey, number>),
      });
    }

    const weekDataSnap = await getDocs(collection(profileRef, "weekData"));
    if (weekDataSnap.empty) await createWeekDataCollection(profileRef);
  }
}

async function createWeekDataCollection(profileRef: DocumentReference) {
  const weekDataCol = collection(profileRef, "weekData");
  const now = serverTimestamp();
  await Promise.all(
    weekKeys.map((wk) =>
      setDoc(doc(weekDataCol, wk), {
        totalHours: 0,
        createdAt: now,
        lastUpdated: now,
      })
    )
  );
}

async function fetchUserdata(user: User) {
  const profileRef = doc(db, "users", user.uid, "userdata", "profile");
  const snap = await getDoc(profileRef);
  if (!snap.exists()) return null;

  const data = snap.data();
  const graphDataRaw: Record<string, number> = data.graphData ?? {};

  const dayMap: Record<string, string> = {
    Monday: "Mon",
    Tuesday: "Tue",
    Wednesday: "Wed",
    Thursday: "Thu",
    Friday: "Fri",
    Saturday: "Sat",
    Sunday: "Sun",
  };

  const orderedGraphData: DayGraphPoint[] = (
    [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ] as const
  ).map((d) => ({ day: dayMap[d], hours: Number(graphDataRaw[d]) || 0 }));

  const weeklyData: Record<WeekKey, number> = data.weeklyData ?? {};
  const weekData: WeekGraphPoint[] = weekKeys.map((k) => ({
    week: k,
    totalHours: Number(weeklyData[k]) || 0,
  }));

  return {
    hoursLogged: String(data.hoursLogged ?? 0),
    tasksCompleted: String(data.tasksCompleted ?? 0),
    dayData: orderedGraphData,
    weekData,
    weeklyData,
  } as const;
}

async function updateWeeklyData(user: User, weekKey: WeekKey, hours: number) {
  const profileRef = doc(db, "users", user.uid, "userdata", "profile");
  await updateDoc(profileRef, {
    [`weeklyData.${weekKey}`]: hours,
  });
  const weekDocRef = doc(profileRef, "weekData", weekKey);
  await updateDoc(weekDocRef, {
    totalHours: hours,
    lastUpdated: serverTimestamp(),
  });
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------
export default function DashboardMain() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), async (u) => {
      setUser(u);
      setAuthLoading(false);
      if (u) await createUserProfileIfNotExist(u);
    });
    return unsubscribe;
  }, []);

  // UI state -----------------------------------------------------------------
  const [activeTab, setActiveTab] = useState<"overview" | "task">("overview");
  const [overviewData, setOverviewData] = useState<CardData[]>([]);
  const [taskData, setTaskData] = useState<TaskData[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");
  const [dayData, setDayData] = useState<DayGraphPoint[]>([]);
  const [weekData, setWeekData] = useState<WeekGraphPoint[]>([]);
  const [weeklyData, setWeeklyData] = useState<Record<WeekKey, number>>(
    {} as Record<WeekKey, number>
  );
  const [selectedWeek, setSelectedWeek] = useState<WeekKey | "">("");
  const [selectedHours, setSelectedHours] = useState("");

  // Task fetching ------------------------------------------------------------
  const fetchTasks = useCallback(async () => {
    if (!user) return;
    const snap = await getDocs(collection(db, "users", user.uid, "tasks"));
    const now = Date.now();

    const tasks = await Promise.all(
      snap.docs.map(async (d) => {
        const data = d.data();
        const due = new Date(data.dueDate).getTime();
        let status = data.status as string;
        if (status === "Pending" && due < now) {
          status = "Overdue";
          await updateDoc(d.ref, { status });
        }
        return { id: d.id, title: data.title, status } as TaskData;
      })
    );
    setTaskData(tasks);
  }, [user]);

  // Primary data loader ------------------------------------------------------
  useEffect(() => {
    if (authLoading || !user) return;
    (async () => {
      if (activeTab === "overview") {
        const data = await fetchUserdata(user);
        if (!data) return;
        setDayData(data.dayData);
        setWeekData(data.weekData);
        setWeeklyData(data.weeklyData);
        setOverviewData([
          {
            id: "hoursLogged",
            title: "Hours Logged",
            value: data.hoursLogged,
            change: "+0 today",
          },
          {
            id: "tasksCompleted",
            title: "Tasks Completed",
            value: data.tasksCompleted,
            change: "+0 today",
          },
        ]);
      } else if (activeTab === "task") {
        await fetchTasks();
      }
    })();
  }, [activeTab, authLoading, user, fetchTasks]);

  // Task CRUD ---------------------------------------------------------------
  const handleAddTask = async () => {
    if (!user || !newTaskTitle || !newTaskDueDate) return;
    await setDoc(doc(collection(db, "users", user.uid, "tasks")), {
      title: newTaskTitle,
      dueDate: newTaskDueDate,
      status: "Pending",
      createdAt: serverTimestamp(),
    });
    setNewTaskTitle("");
    setNewTaskDueDate("");
    await fetchTasks();
  };

  const handleDeleteTask = async (id: string) => {
    if (!user) return;
    await deleteDoc(doc(db, "users", user.uid, "tasks", id));
    await fetchTasks();
  };

  // Weekly data update -------------------------------------------------------
  const handleUpdateWeeklyData = async () => {
    if (!user || !selectedWeek || !selectedHours) return;
    const hrs = parseInt(selectedHours, 10);
    if (Number.isNaN(hrs)) return;
    await updateWeeklyData(user, selectedWeek as WeekKey, hrs);
    setSelectedWeek("");
    setSelectedHours("");
    const refreshed = await fetchUserdata(user);
    if (refreshed) {
      setWeekData(refreshed.weekData);
      setWeeklyData(refreshed.weeklyData);
    }
  };

  // -------------------------------------------------------------------------
  // render
  // -------------------------------------------------------------------------
  return (
    <div className="relative flex-1 bg-white px-12 py-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <Clock />
        <ReminderIcon/>
      </div>
      <HeaderTitle />
      <Separator className="my-4" />

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {(
          [
            { label: "Overview", value: "overview" },
            { label: "Task", value: "task" },
          ] as const
        ).map((t) => (
          <Button
            key={t.value}
            variant={activeTab === t.value ? "default" : "outline"}
            onClick={() => setActiveTab(t.value)}
          >
            {t.label}
          </Button>
        ))}
        <Button variant="outline">
          <Link href="/quiz">Quiz</Link>
        </Button>
      </div>

      <Separator className="my-4" />

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <>
          <OverviewCards
            data={overviewData}
            placeholder="No overview data yet…"
          />
          <Separator className="my-6" />
          <ChartsSection dayData={dayData} weekData={weekData} />

          {/* Weekly Summary */}
          <section className="mt-10">
            <h3 className="text-lg font-semibold mb-4">Weekly Hours Summary</h3>
            {weekData.length ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {weekData.map((w) => (
                  <div
                    key={w.week}
                    className="p-4 bg-blue-100 rounded shadow text-center"
                  >
                    <h4 className="font-medium">
                      {w.week.replace("week", "Week ")}
                    </h4>
                    <p className="text-2xl font-bold">{w.totalHours}</p>
                    <p className="text-sm">hours</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No weekly data available</p>
            )}
          </section>

          {/* Weekly Data Update */}
          <section className="mt-10">
            <h3 className="font-semibold mb-4">Update Weekly Hours</h3>
            <div className="flex flex-wrap gap-3 items-center">
              <select
                value={selectedWeek}
                onChange={(e) =>
                  setSelectedWeek(e.target.value as WeekKey | "")
                }
                className="border p-2 rounded"
              >
                <option value="">Select Week</option>
                {weekKeys.map((wk) => (
                  <option key={wk} value={wk}>
                    {wk}
                  </option>
                ))}
              </select>
              <input
                type="number"
                min="0"
                placeholder="Hours"
                value={selectedHours}
                onChange={(e) => setSelectedHours(e.target.value)}
                className="border p-2 rounded w-24"
              />
              <Button onClick={handleUpdateWeeklyData}>Update</Button>
            </div>
          </section>
        </>
      )}

      {/* Task Tab */}
      {activeTab === "task" && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-2 items-center">
            <input
              type="text"
              placeholder="Enter task title"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="border p-2 rounded flex-grow min-w-[180px]"
            />
            <input
              type="date"
              value={newTaskDueDate}
              onChange={(e) => setNewTaskDueDate(e.target.value)}
              className="border p-2 rounded"
            />
            <Button onClick={handleAddTask}>Add Task</Button>
          </div>

          {/* Task List */}
          {taskData.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {taskData.map((t) => (
                <div
                  key={t.id}
                  className="p-4 bg-blue-50 rounded shadow flex items-center justify-between"
                >
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">
                      {t.title}
                    </h3>
                    <p className="text-xs text-gray-500">{t.status}</p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteTask(t.id)}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No tasks yet…</p>
          )}
        </div>
      )}
    </div>
  );
}
