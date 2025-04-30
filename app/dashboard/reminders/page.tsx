"use client";

import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { requestFCMToken, onFCMMessage } from "@/lib/firebase";
import { db, auth } from "@/lib/firebase";
import {
  collection,
  deleteDoc,
  onSnapshot,
  doc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

interface Reminder {
  id: string;
  event: string;
  reminder_time: Timestamp; // Firestore timestamp
  message: string;
}

export default function RemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDate, setNewDate] = useState<string>("");
  const [newTime, setNewTime] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");
  const [uid, setUid] = useState<string | null>(null);

  // Subscribe to user's reminders and auto-delete expired
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        const remindersRef = collection(db, "users", user.uid, "reminders");
        const q = query(remindersRef, orderBy("reminder_time"));
        return onSnapshot(q, (snapshot) => {
          const rems = snapshot.docs.map((d) => {
            const data = d.data();
            return {
              id: d.id,
              event: data.event,
              message: data.message,
              reminder_time: data.reminder_time as Timestamp,
            } as Reminder;
          });
          setReminders(rems);

          // Auto-delete past reminders
          const now = new Date();
          snapshot.docs.forEach((d) => {
            const ts = d.data().reminder_time as Timestamp;
            if (ts.toDate() < now) {
              deleteDoc(d.ref);
            }
          });
        });
      }
    });
    return () => unsub();
  }, []);

  // Register service worker and request FCM token on mount
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);
          return requestFCMToken();
        })
        .then((token) => {
          if (token) {
            localStorage.setItem("fcm_token", token);
          }
        })
        .catch((err) => console.error('SW or FCM error:', err));
    }
  }, []);

  // Handle incoming FCM messages
  useEffect(() => {
    const unsub = onFCMMessage((payload) => {
      const notif = payload.notification;
      if (notif?.title && notif.body) {
        new Notification(notif.title, { body: notif.body });
      }
    });
    return unsub;
  }, []);

  // Add a new reminder
  const addReminder = async () => {
    if (!uid) return alert("Not authenticated");
    if (!newTitle.trim()) return alert("Title required");
    if (!newDate) return alert("Date required");
    if (!newTime) return alert("Time required");

    const raw = `${newDate}T${newTime}:00`;
    const when = new Date(raw);
    if (isNaN(when.getTime())) {
      return alert("Invalid date/time; please select valid values.");
    }
    if (when < new Date()) return alert("Cannot schedule in the past");

    const isoString = when.toISOString();
    const fcmToken = localStorage.getItem("fcm_token") || "";

    try {
      const res = await fetch(
        "https://us-central1-studyassist-d13b1.cloudfunctions.net/scheduleReminder",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: fcmToken, title: newTitle, body: newDescription || "You have an upcoming event!", sendAt: isoString, uid, }),
        }
      );
      if (!res.ok) throw new Error(await res.text());
      setIsOpen(false); setNewTitle(""); setNewDate(""); setNewTime(""); setNewDescription("");
    } catch (err) {
      console.error(err);
      alert("Failed to schedule reminder. Please try again later.");
    }
  };

  // Delete a reminder
  const deleteReminder = async (id: string) => {
    if (!uid) return;
    await deleteDoc(doc(db, "users", uid, "reminders", id));
  };

  // Helper to check if a timestamp is today
  const isToday = (ts: Timestamp) => {
    const d = ts.toDate();
    const now = new Date();
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate();
  };

  return (
    <div className="min-h-screen w-full p-8">
      <h1 className="text-2xl font-bold mb-6">Reminders</h1>
      <div className="bg-[#f9f1f1] p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2"><CalendarIcon className="h-6 w-6 text-primary" /><h2 className="text-xl font-semibold">Your Reminders</h2></div>
          <button onClick={() => setIsOpen(true)} className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition text-sm"><Plus className="h-4 w-4" /> Add Reminder</button>
        </div>

        <div className="space-y-4">
          {reminders.map((r) => (
            <div key={r.id} className={`flex items-center justify-between p-4 rounded-lg shadow-sm hover:shadow-md transition ${isToday(r.reminder_time) ? 'bg-red-50 border border-red-500' : 'bg-white'}`}>
              <div>
                <h3 className="font-semibold">{r.event}</h3>
                <p className="text-sm text-gray-500">{r.reminder_time.toDate().toLocaleString()}</p>
                <p className="text-xs text-gray-400 italic">{r.message}</p>
              </div>
              <button onClick={() => deleteReminder(r.id)} className="text-red-500 hover:text-red-700"><Trash2 className="h-5 w-5" /></button>
            </div>
          ))}
        </div>

        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"><div className="fixed inset-0 bg-black bg-opacity-25" /></Transition.Child>
            <div className="fixed inset-0 flex items-center justify-center"><Dialog.Panel className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <Dialog.Title className="text-lg font-bold mb-4">Add New Reminder</Dialog.Title>
                <div className="space-y-4">
                  <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Enter task title" className="w-full border px-4 py-2 rounded-md text-sm" />
                  <div className="flex gap-2"><input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} className="w-1/2 border px-4 py-2 rounded-md text-sm" /><input type="time" value={newTime} onChange={(e) => setNewTime(e.target.value)} className="w-1/2 border px-4 py-2 rounded-md text-sm" /></div>
                  <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="Enter description (optional)" className="w-full border px-4 py-2 rounded-md text-sm" />
                </div>
                <div className="mt-6 flex justify-end gap-4"><button onClick={() => setIsOpen(false)} className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 text-sm hover:bg-gray-100">Cancel</button><button onClick={addReminder} className="px-4 py-2 bg-black text-white rounded-md text-sm hover:bg-gray-800">Save Reminder</button></div>
              </Dialog.Panel>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
}
