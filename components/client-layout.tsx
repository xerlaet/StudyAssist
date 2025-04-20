"use client";

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
import { usePathname } from "next/navigation";

import Title from "@/components/header-title";
import { Logo } from "@/components/logo";


export function ClientLayout( {children}: {children: React.ReactNode;}) {
  const pathname = usePathname();
  const pageName = pathname.split("/")[1];

  // Add more path names here if top bar or side bar should be hidden
  const showTopBar = pageName !== "login" &&
                     pageName !== "create-account" &&
                     pageName !== "forgot-password" && 
                     pageName !== "reset-password";
  const showSideBar = showTopBar &&
                      pageName !== "quiz" &&
                      pageName !== "";
  const isLandingPage = pageName == "";

  return (
    <>
      {showTopBar && <header className="sticky top-0 w-full z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex w-full justify-stretch items-center">
          <div className="flex w-full justify-start items-center">
            <div className="flex justify-center items-center w-full max-w-64 min-w-0 border-(--border)">
              <Link href="/" className="cursor-pointer">
                <Logo />
              </Link>
            </div>
          </div>
          {!isLandingPage && <div className="flex w-full justify-center items-center">
            <Title />
          </div>}
          <div className="flex w-full justify-end items-center pr-8 gap-2">
            <Link href= " /login" passHref>
              <Button variant="outline" className="cursor-pointer">
                Login
              </Button>
            </Link>
            <Link href= "/create-account" passHref>
              <Button variant="outline" className="cursor-pointer">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
        <Separator />
      </header>}
      <main className="z-0 flex justify-between">
        {showSideBar && <div className="sticky border-(--border) border-e-1 w-64 top-24.5 bottom-0 left-0 h-[calc(100dvh-(var(--spacing)*24.5))]">
          <div className="flex flex-col justify-start items-baseline mt-6 ml-6 gap-6 text-xl">
            <div className={pageName == "dashboard" ? "bg-pink-50 p-4 rounded-2xl" : "p-2 rounded-2xl"}>
              <Link href="/dashboard">
                <div className="flex items-center justify-center gap-4">
                  <LayoutDashboard className="size-8"/>
                  <span>Dashboard</span>
                </div>
              </Link>
            </div>
            <div className={pageName == "profile" ? "bg-pink-50 p-4 rounded-2xl" : "p-2 rounded-2xl"}>
              <Link href="/profile">
                <div className="flex items-center justify-center gap-4">
                  <UserPen className="size-8"/>
                  <span>Profile</span>
                </div>
              </Link>
            </div>
            <div className={pageName == "calendar" ? "bg-pink-50 p-4 rounded-2xl" : "p-2 rounded-2xl"}>
              <Link href="/calendar">
                <div className="flex items-center justify-center gap-4">
                  <Calendar className="size-8"/>
                  <span>Calendar</span>
                </div>
              </Link>
            </div>
            <div className={pageName == "resource-hub" ? "bg-pink-50 p-4 rounded-2xl" : "p-2 rounded-2xl"}>
              <Link href="/resource-hub">
                <div className="flex items-center justify-center gap-4">
                  <Folder className="size-8"/>
                  <span>Resource Hub</span>
                </div>
              </Link>
            </div>
            <div className={pageName == "bot-assist" ? "bg-pink-50 p-4 rounded-2xl" : "p-2 rounded-2xl"}>
              <Link href="/bot-assist">
                <div className="flex items-center justify-center gap-4">
                  <Bot className="size-8"/>
                  <span>Bot Assist</span>
                </div>
              </Link>
            </div>
            <div className={pageName == "friends" ? "bg-pink-50 p-4 rounded-2xl" : "p-2 rounded-2xl"}>
              <Link href="/friends">
                <div className="flex items-center justify-center gap-4">
                  <Users className="size-8"/>
                  <span>Friends</span>
                </div>
              </Link>
            </div>
            <div className={pageName == "settings" ? "bg-pink-50 p-4 rounded-2xl" : "p-2 rounded-2xl"}>
              <Link href="/settings">
                <div className="flex items-center justify-center gap-4">
                  <Settings className="size-8"/>
                  <span>Settings</span>
                </div>
              </Link>
            </div>
          </div>
        </div>}
        <div className={`pt-8 px-8 pb-16 w-full flex-grow mx-auto ${pageName == "" ? "max-w-7xl" : "max-w-4xl"}`}>
          {children}
        </div>
      </main>
    </>
  );
};
