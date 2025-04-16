"use client"

import { UserPlus, Users } from "lucide-react"
import { useState } from "react"

const dummyFriends = [
  "John D",
  "John D.",
  "John Doe",
  "John Duo"
]

export default function FriendsPage() {
  const [search, setSearch] = useState("John D")

  return (
    <div className="space-y-6">

      {/* Tabs */}
      <div className="flex space-x-6 border-b border-border text-sm font-medium">
        <button className="pb-2 border-b-2 border-primary text-primary">Friends</button>
        <button className="pb-2 text-muted-foreground hover:text-primary transition">Study Groups</button>
      </div>

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
        <p className="text-sm text-muted-foreground mb-3">Search Results For <span className="font-semibold">{search}</span></p>
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
    </div>
  )
}

