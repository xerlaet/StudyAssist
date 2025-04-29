"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Overview from "@/components/profile/overview";
import DetailedStats from "@/components/profile/detailedstats";
import Achievements from "@/components/profile/Achievements";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function ProfilePage() {
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
    <div className="px-6 py-4 w-full">
      <h1 className="text-2xl font-semibold mb-4">
        Profile {profileData ? `- ${profileData.username}` : ""}
      </h1>
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Stats</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Overview />
        </TabsContent>

        <TabsContent value="detailed">
          <DetailedStats />
        </TabsContent>

        <TabsContent value="achievements">
          <Achievements />
        </TabsContent>
      </Tabs>
    </div>
  );
}
