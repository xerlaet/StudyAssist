import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  UserPen,
  Calendar,
  Folder,
  Bot,
  Users,
  Settings,
} from "lucide-react";

import Title from "@/components/header-title";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StudyBuddy",
  description: "",
};

// Logo component
// Move this to its own file if needed in other components
const Logo = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1682.58 1012.7" className="w-32 h-24">
      <g id="a" data-name="Layer_2">
        <circle cx="422.79" cy="35" r="35" style={{fill: "#e4c5c3"}}/>
        <circle cx="943.79" cy="35" r="35" style={{fill: "#e4c5c3"}}/>
        <path d="M407.79,567c0-20.01,11.75-37.26,28.73-45.25-27.62,4.44-48.73,28.38-48.73,57.25,0,32.03,25.97,58,58,58,17.49,0,33.16-7.75,43.79-20h-31.79c-27.61,0-50-22.39-50-50Z" style={{fill: "#e4c5c3"}}/>
        <path d="M457.79,617c-4.14,0-8.15-.51-12-1.46v21.46h235v-20h-223Z" style={{fill: "#e4c5c3"}}/>
        <path d="M445.79,35v483.46c3.85-.95,7.86-1.46,12-1.46h223V210c0-30.38,24.62-55,55-55h79v-15c0-23.75,19.25-43,43-43s43,19.25,43,43v15h78V35H445.79Z" style={{fill: "#e4c5c3"}}/>
        <rect x="422.79" width="521" height="70" style={{fill: "#e4c5c3"}}/>
        <path d="M486.79,35h-99v544h21.46c-.95-3.85-1.46-7.86-1.46-12,0-27.61,22.39-50,50-50h29V35Z" style={{fill: "#e4c5c3"}}/>
        <circle cx="457.79" cy="567" r="16" style={{fill: "#e4c5c3"}}/>
        <rect x="457.79" y="551" width="223" height="32" style={{fill: "#e4c5c3"}}/>
      </g>
      <g id="b" data-name="Layer_3">
        <circle cx="735.79" cy="210" r="35" style={{fill: "#24adb9"}}/>
        <circle cx="1259.79" cy="210" r="35" style={{fill: "#24adb9"}}/>
        <path d="M1264.79,578.54v43.46h-.03c-.54,31.02-25.83,56-56.97,56h-44.17c13,18.73,34.65,31,59.17,31,39.76,0,72-32.24,72-72,0-24.09-11.84-45.39-30-58.46Z" style={{fill: "#24adb9"}}/>
        <path d="M730.81,622h-.03v-43.46c-18.16,13.07-30,34.38-30,58.46,0,39.76,32.24,72,72,72,24.53,0,46.17-12.27,59.17-31h-44.17c-31.14,0-56.44-24.98-56.97-56Z" style={{fill: "#24adb9"}}/>
        <path d="M1180.6,210c.12,1.32.19,2.65.19,4,0,23.75-19.25,43-43,43s-43-19.25-43-43c0-1.35.07-2.68.19-4h-194.38c.12,1.32.19,2.65.19,4,0,23.75-19.25,43-43,43s-43-19.25-43-43c0-1.35.07-2.68.19-4h-114.19v427h32.31c-1.39-4.77-2.19-9.8-2.28-15h-.03v-307h534v307h-.03c-.09,5.2-.89,10.23-2.28,15h32.31V210h-114.19Z" style={{fill: "#24adb9"}}/>
        <path d="M1180.79,175v39c0,4.53-.71,8.9-2.01,13h81.01v-52h-79Z" style={{fill: "#24adb9"}}/>
        <path d="M814.79,175h-79v52h81.01c-1.3-4.1-2.01-8.47-2.01-13v-39Z" style={{fill: "#24adb9"}}/>
        <path d="M1096.79,227c-1.3-4.1-2.01-8.47-2.01-13v-39h-194v39c0,4.53-.71,8.9-2.01,13h198.01Z" style={{fill: "#24adb9"}}/>
        <path d="M787.79,678c-5.19,0-10.22-.71-15-2.01v33.01h450v-33.01c-4.78,1.3-9.81,2.01-15,2.01h-420Z" style={{fill: "#24adb9"}}/>
        <rect x="772.79" y="380" width="38" height="38" style={{fill: "#24adb9"}}/>
        <rect x="855.79" y="380" width="38" height="38" style={{fill: "#24adb9"}}/>
        <rect x="937.79" y="380" width="38" height="38" style={{fill: "#24adb9"}}/>
        <rect x="1019.79" y="380" width="38" height="38" style={{fill: "#24adb9"}}/>
        <rect x="1101.79" y="380" width="38" height="38" style={{fill: "#24adb9"}}/>
        <rect x="1183.79" y="380" width="38" height="38" style={{fill: "#24adb9"}}/>
        <rect x="772.79" y="462" width="38" height="38" style={{fill: "#24adb9"}}/>
        <rect x="855.79" y="462" width="38" height="38" style={{fill: "#24adb9"}}/>
        <rect x="937.79" y="462" width="38" height="38" style={{fill: "#24adb9"}}/>
        <rect x="1019.79" y="462" width="38" height="38" style={{fill: "#24adb9"}}/>
        <rect x="1101.79" y="462" width="38" height="38" style={{fill: "#24adb9"}}/>
        <rect x="1183.79" y="462" width="38" height="38" style={{fill: "#24adb9"}}/>
        <rect x="772.79" y="544" width="38" height="38" style={{fill: "#24adb9"}}/>
        <rect x="855.79" y="544" width="38" height="38" style={{fill: "#24adb9"}}/>
        <rect x="937.79" y="544" width="38" height="38" style={{fill: "#24adb9"}}/>
        <rect x="1019.79" y="544" width="38" height="38" style={{fill: "#24adb9"}}/>
        <rect x="1101.79" y="544" width="38" height="38" style={{fill: "#24adb9"}}/>
        <circle cx="857.79" cy="140" r="24" style={{fill: "#24adb9"}}/>
        <circle cx="857.79" cy="214" r="24" style={{fill: "#24adb9"}}/>
        <rect x="833.79" y="140" width="48" height="74" style={{fill: "#24adb9"}}/>
        <circle cx="1137.79" cy="140" r="24" style={{fill: "#24adb9"}}/>
        <circle cx="1137.79" cy="214" r="24" style={{fill: "#24adb9"}}/>
        <rect x="1113.79" y="140" width="48" height="74" style={{fill: "#24adb9"}}/>
      </g>
      <g id="c" data-name="text">
        <g>
          <path d="M96.91,816.88l-20.62,22.62c-10.86-6.41-18.67-9.61-23.44-9.61-3.67,0-6.84,1.39-9.49,4.16-2.66,2.77-3.98,6.07-3.98,9.9,0,7.58,6.87,14.14,20.62,19.69,10.08,4.3,17.7,8.19,22.85,11.66,5.16,3.48,9.47,8.3,12.95,14.47,3.48,6.17,5.21,12.85,5.21,20.04,0,13.2-5.33,24.69-16,34.45-10.66,9.77-23.26,14.65-37.79,14.65-15.94,0-31.68-7.5-47.23-22.5l21.8-25.43c9.77,10.08,18.91,15.12,27.42,15.12,3.98,0,7.81-1.77,11.48-5.32,3.67-3.54,5.51-7.27,5.51-11.16,0-8.03-8.48-15.1-25.43-21.23-9.69-3.53-16.56-6.84-20.62-9.93-4.06-3.08-7.48-7.58-10.25-13.48-2.77-5.9-4.16-11.93-4.16-18.11,0-13.67,4.45-24.76,13.36-33.28,8.91-8.51,20.55-12.77,34.92-12.77,17.03,0,31.33,5.35,42.89,16.05Z" style={{fill: "#28292c"}}/>
          <path d="M138.26,802.94h103.48v32.7h-35.27v121.17h-33.16v-121.17h-35.04v-32.7Z" style={{fill: "#28292c"}}/>
          <path d="M287.77,802.94h32.7v94.1c0,8.75,2.42,15.78,7.27,21.09,4.84,5.31,11.21,7.97,19.1,7.97,9.06,0,16.09-2.67,21.09-8.03,5-5.35,7.5-12.91,7.5-22.68v-92.46h32.58v99.61c0,8.75-2.27,17.83-6.8,27.25-4.53,9.42-11.5,16.62-20.92,21.62-9.42,5-19.94,7.5-31.58,7.5-21.09,0-36.52-5.88-46.29-17.64-9.77-11.76-14.65-24.12-14.65-37.09v-101.25Z" style={{fill: "#28292c"}}/>
          <path d="M463.41,802.94h52.5c22.42,0,40.47,7.07,54.14,21.21,13.67,14.14,20.51,32.77,20.51,55.9s-7.05,41.8-21.15,55.78c-14.1,13.99-32.87,20.98-56.31,20.98h-49.69v-153.87ZM496.8,832v95.04h13.12c13.59,0,24.77-3.71,33.52-11.13,8.75-7.42,13.12-19.8,13.12-37.15,0-10.08-2.11-19-6.33-26.78-4.22-7.77-10.33-13.05-18.34-15.82-8.01-2.77-15.64-4.16-22.91-4.16h-12.19Z" style={{fill: "#28292c"}}/>
          <path d="M619.12,802.94h36.73l28.39,47.7,28.8-47.7h36.86l-48.98,81.91v71.95h-32.81v-71.95l-48.98-81.91Z" style={{fill: "#28292c"}}/>
          <path d="M882.28,802.94h44.83c18.73,0,31.52,3.9,38.39,11.71s10.3,16.94,10.3,27.4c0,6.64-1.25,12.24-3.75,16.8-2.5,4.57-6.52,9.19-12.07,13.87,10.62,3.67,18.14,9.09,22.56,16.24,4.41,7.15,6.62,14.8,6.62,22.93,0,14.15-4.84,25.18-14.52,33.07-9.68,7.9-23.29,11.84-40.85,11.84h-51.51v-153.87ZM915.45,828.72v33.75h7.58c5.6,0,10.31-1.78,14.12-5.35,3.81-3.57,5.72-7.98,5.72-13.23,0-4.23-1.87-7.82-5.6-10.76-3.74-2.94-8.4-4.41-14-4.41h-7.82ZM915.45,888.6v42.42h11.88c18.17,0,27.26-6.66,27.26-19.98,0-7.21-2.21-12.75-6.64-16.63-4.43-3.88-10.75-5.82-18.99-5.82h-13.51Z" style={{fill: "#28292c"}}/>
          <path d="M1033.78,802.94h32.7v94.1c0,8.75,2.42,15.78,7.27,21.09,4.84,5.31,11.21,7.97,19.1,7.97,9.06,0,16.09-2.67,21.09-8.03,5-5.35,7.5-12.91,7.5-22.68v-92.46h32.58v99.61c0,8.75-2.27,17.83-6.8,27.25-4.53,9.42-11.5,16.62-20.92,21.62-9.42,5-19.94,7.5-31.58,7.5-21.09,0-36.52-5.88-46.29-17.64-9.77-11.76-14.65-24.12-14.65-37.09v-101.25Z" style={{fill: "#28292c"}}/>
          <path d="M1209.42,802.94h52.5c22.42,0,40.47,7.07,54.14,21.21,13.67,14.14,20.51,32.77,20.51,55.9s-7.05,41.8-21.15,55.78c-14.1,13.99-32.87,20.98-56.31,20.98h-49.69v-153.87ZM1242.82,832v95.04h13.12c13.59,0,24.76-3.71,33.52-11.13,8.75-7.42,13.12-19.8,13.12-37.15,0-10.08-2.11-19-6.33-26.78-4.22-7.77-10.33-13.05-18.34-15.82-8.01-2.77-15.64-4.16-22.91-4.16h-12.19Z" style={{fill: "#28292c"}}/>
          <path d="M1385.77,802.94h52.5c22.42,0,40.47,7.07,54.14,21.21,13.67,14.14,20.51,32.77,20.51,55.9s-7.05,41.8-21.15,55.78c-14.1,13.99-32.87,20.98-56.31,20.98h-49.69v-153.87ZM1419.16,832v95.04h13.12c13.59,0,24.76-3.71,33.52-11.13,8.75-7.42,13.12-19.8,13.12-37.15,0-10.08-2.11-19-6.33-26.78-4.22-7.77-10.33-13.05-18.34-15.82-8.01-2.77-15.64-4.16-22.91-4.16h-12.19Z" style={{fill: "#28292c"}}/>
          <path d="M1541.48,802.94h36.73l28.39,47.7,28.8-47.7h36.86l-48.98,81.91v71.95h-32.81v-71.95l-48.98-81.91Z" style={{fill: "#28292c"}}/>
        </g>
      </g>
    </svg>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 w-full z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex w-full justify-stretch items-center">
            <div className="flex w-full justify-start items-center">
              <div className="flex justify-center items-center w-64 max-w-64 border-(--border) border-e-1">
                <Link href="/" className="cursor-pointer">
                  <Logo />
                </Link>
              </div>
            </div>
            <div className="flex w-full justify-center items-center">
              <Title />
            </div>
            <div className="flex w-full justify-end items-center pr-8 gap-2">
              {/* Login / Sign up or User options -- make this a client component*/}
              <Button variant="outline" className="cursor-pointer">
                Login
              </Button>
              <Button variant="outline" className="cursor-pointer">
                Sign Up
              </Button>
            </div>
          </div>
          <Separator />
        </header>
        <main className="z-0 flex justify-between">
          <div className="sticky border-(--border) border-e-1 w-64 top-24.5 bottom-0 left-0 h-[calc(100dvh-(var(--spacing)*24.5))]">
            <div className="flex flex-col justify-start items-baseline mt-6 ml-6 gap-8 text-xl">
              <Link href="/dashboard">
                <div className="flex items-center justify-center gap-4">
                  <LayoutDashboard className="size-8"/>
                  <span>Dashboard</span>
                </div>
              </Link>
              <Link href="/profile">
                <div className="flex items-center justify-center gap-4">
                  <UserPen className="size-8"/>
                  <span>Profile</span>
                </div>
              </Link>
              <Link href="/calendar">
                <div className="flex items-center justify-center gap-4">
                  <Calendar className="size-8"/>
                  <span>Calendar</span>
                </div>
              </Link>
              <Link href="/resource-hub">
                <div className="flex items-center justify-center gap-4">
                  <Folder className="size-8"/>
                  <span>Resource Hub</span>
                </div>
              </Link>
              <Link href="/bot-assist">
                <div className="flex items-center justify-center gap-4">
                  <Bot className="size-8"/>
                  <span>Bot Assist</span>
                </div>
              </Link>
              <Link href="/friends">
                <div className="flex items-center justify-center gap-4">
                  <Users className="size-8"/>
                  <span>Friends</span>
                </div>
              </Link>
              <Link href="/settings">
                <div className="flex items-center justify-center gap-4">
                  <Settings className="size-8"/>
                  <span>Settings</span>
                </div>
              </Link>
            </div>
          </div>
          <div className="pt-8 px-8 pb-16 w-full flex-grow mx-auto max-w-4xl">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
