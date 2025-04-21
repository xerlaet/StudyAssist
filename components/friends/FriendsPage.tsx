"use client"

import { UserPlus, Users } from "lucide-react"
import { useState } from "react"

const dummyFriends = ["John D", "John D.", "John Doe", "John Duo"]

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
  const [search, setSearch] = useState("John D")
  const [activeTab, setActiveTab] = useState<"friends" | "groups">("friends")

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
            <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition text-sm">
              Search
            </button>
          </div>

          {/* Results */}
          <div className="bg-[#f9f1f1] p-6 rounded-lg">
            <p className="text-sm text-muted-foreground mb-3">
              Search Results For <span className="font-semibold">{search}</span>
            </p>
            <div className="space-y-2">
              {dummyFriends.map((friend, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-white hover:bg-secondary/20 transition rounded-md shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 text-primary font-semibold flex items-center justify-center">
                      {friend.split(" ").map(w => w[0]).join("")}
                    </div>
                    <span className="text-sm font-medium">{friend}</span>
                  </div>
                  <button className="hover:text-primary transition" title="Add Friend">
                    <UserPlus className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
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
              <button className="mt-3 px-4 py-1 rounded-md bg-green-300 hover:bg-green-400 text-black text-sm font-semibold shadow">
                Join
              </button>
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


