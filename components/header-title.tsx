"use client"

import { useSelectedLayoutSegments } from "next/navigation";
import {
  LayoutDashboard,
  UserPen,
  Calendar,
  Folder,
  Bot,
  Users,
  Settings,
  Home,
} from "lucide-react";

// Title component for the top bar
export default () => {
  // Get URL segments to determine which title to display
  const segments = useSelectedLayoutSegments();

  // Convert URL segment to title string
  const segmentString = segments.at(-1)?.split("-").map((s) => s.substring(0,1).toUpperCase() + s.substring(1)).join(" ");

  return (
    <div className="flex items-center justify-center gap-2 text-3xl">
      {segments.at(-1) === "dashboard" && <LayoutDashboard />}
      {segments.at(-1) === "profile" && <UserPen />}
      {segments.at(-1) === "calendar" && <Calendar />}
      {segments.at(-1) === "resource-hub" && <Folder />}
      {segments.at(-1) === "bot-assist" && <Bot />}
      {segments.at(-1) === "friends" && <Users />}
      {segments.at(-1) === "settings" && <Settings />}
      <span>{segmentString}</span>
    </div>
  );
};