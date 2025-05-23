"use client"

import { useEffect, useState } from "react"
import { UserPlus } from "lucide-react"
import { collection, getDocs } from "firebase/firestore"
import { onAuthStateChanged, User } from "firebase/auth"
import { auth, db } from "@/lib/firebase"

type Account = {
  account_id: string
  email?: string
  username: string
}

const dummyGroups = [
  {
    title: "CS 1234 Project",
    date: "Wednesday, March 19",
    time: "2:30PM",
    location: "JO 2.222",
    friends: "John Doe, Jane Doe, and 1 other",
  },
  {
    title: "MATH 4321 Study Session",
    date: "Thursday, March 20th",
    time: "11:00AM",
    location: "The Plinth",
    friends: "John Doe, Jordan Carter",
  },
  {
    title: "Study Hangout",
    date: "Wednesday, March 19",
    time: "5:00PM",
    location: "ECSS 2.222",
    friends: "Jane Doe",
  },
]

export default function FriendsPage() {
  const [search, setSearch] = useState("")
  const [activeTab, setActiveTab] = useState<"friends" | "groups">("friends")
  const [myFriends, setMyFriends] = useState<Account[]>([])
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return

      setCurrentUser(user)

      try {
        const friendsSnapshot = await getDocs(collection(db, "users", user.uid, "friends"))

        const friendsList: Account[] = friendsSnapshot.docs.map(doc => {
          const data = doc.data()
          return {
            account_id: doc.id,
            username: data.username || "Unnamed",
            email: data.email || "",
          }
        })

        setMyFriends(friendsList)
      } catch (error) {
        console.error("Error fetching friends from Firestore:", error)
      }
    })

    return () => unsubscribe()
  }, [])

  const filteredFriends = search.trim() === ""
  ? myFriends
  : myFriends.filter(friend =>
      friend.username.toLowerCase().includes(search.trim().toLowerCase())
    )

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex space-x-6 border-b border-border text-sm font-medium">
        <button
          onClick={() => setActiveTab("friends")}
          className={`pb-2 ${activeTab === "friends" ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-primary transition"}`}
        >
          Friends
        </button>
        <button
          onClick={() => setActiveTab("groups")}
          className={`pb-2 ${activeTab === "groups" ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-primary transition"}`}
        >
          Study Groups
        </button>
      </div>

      {activeTab === "friends" ? (
        <>
          {/* Search */}
          <div className="flex justify-between items-center gap-4 bg-[#f9f1f1] p-6 rounded-lg">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for Friends"
              className="w-full px-4 py-2 bg-muted text-black border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm"
            />
          </div>

          {/* Results */}
          <div className="bg-[#f9f1f1] p-6 rounded-lg">
            <p className="text-sm text-muted-foreground mb-3">
              Showing results for <span className="font-semibold">{search || "all friends"}</span>
            </p>
            {filteredFriends.length > 0 ? (
              <div className="space-y-2">
                {filteredFriends.map((friend) => (
                  <div
                    key={friend.account_id}
                    className="flex items-center justify-between p-3 bg-white hover:bg-secondary/20 transition rounded-md shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 text-primary font-semibold flex items-center justify-center">
                        {friend.username.split(" ").map(w => w[0]).join("")}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{friend.username}</span>
                        <span className="text-xs text-muted-foreground">{friend.email}</span>
                      </div>
                    </div>
                    <button className="hover:text-primary transition" title="Add Friend">
                      <UserPlus className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm italic text-muted-foreground">No results found.</p>
            )}
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dummyGroups.map((group, index) => (
            <div
              key={index}
              className="bg-white border border-gray-300 rounded-lg p-4 shadow hover:shadow-md transition"
            >
              <h3 className="text-md font-semibold">{group.title}</h3>
              <p className="text-sm text-muted-foreground">{group.date}</p>
              <p className="text-sm text-muted-foreground mb-2">{group.time}</p>
              <p className="text-sm text-muted-foreground italic">{group.location}</p>
              <a
                href="https://meet.google.com/gci-zvvm-ksv"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 px-4 py-1 rounded-md bg-green-300 hover:bg-green-400 text-black text-sm font-semibold shadow text-center"
              >
                Join
              </a>
              <p className="text-xs text-muted-foreground mt-2">
                Friends in event: {group.friends}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
