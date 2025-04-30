"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { CalendarDays, CheckCircle2, Award, BarChart3 } from "lucide-react";

export default function Overview() {
  const [profileData, setProfileData] = useState<{
    hoursLogged: number;
    tasksCompleted: number;
    username: string;
  } | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await fetchProfileData(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchProfileData = async (uid: string) => {
    try {
      const docRef = doc(db, "users", uid, "userdata", "profile");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setProfileData({
          hoursLogged: data.hoursLogged || 0,
          tasksCompleted: data.tasksCompleted || 0,
          username: data.username || "Unnamed",
        });
      } else {
        console.error("No profile document found!");
      }
    } catch (error) {
      console.error("Failed to fetch profile data:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">
          {profileData ? `Hello, ${profileData.username}` : "Hello, User"}
        </h1>
        <p className="text-gray-500 mt-1">
          You are currently on day{" "}
          <span className="text-[#23b0ba] font-semibold">10</span>
        </p>
      </div>

      {/* Quiz Stats */}
      <div className="bg-[#f9f1f1] p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-6 text-center">Quiz Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="space-y-1">
            <CheckCircle2 className="mx-auto text-[#23b0ba]" />
            <div className="text-3xl font-bold">14</div>
            <p className="text-gray-600 text-sm">Quizzes taken</p>
          </div>
          <div className="space-y-1">
            <BarChart3 className="mx-auto text-[#23b0ba]" />
            <div className="text-3xl font-bold">85%</div>
            <p className="text-gray-600 text-sm">Average Score</p>
          </div>
          <div className="space-y-1">
            <Award className="mx-auto text-[#23b0ba]" />
            <div className="text-3xl font-bold">90%</div>
            <p className="text-gray-600 text-sm">Highest Score</p>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="bg-[#f9f1f1] p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-6 text-center">Your Badges</h2>
        <div className="flex justify-center gap-6">
          <div className="w-24 h-24 bg-[#6dc0c6] text-white rounded-full flex items-center justify-center text-lg font-bold shadow-md">
            QUIZ
          </div>
          <div className="w-24 h-24 bg-[#e3c4c2] text-white rounded-full flex items-center justify-center text-lg font-bold shadow-md">
            STUDY
          </div>
          <div className="w-24 h-24 bg-[#23b0ba] text-white rounded-full flex items-center justify-center text-lg font-bold shadow-md">
            NOTES
          </div>
        </div>
      </div>
    </div>
  );
}
