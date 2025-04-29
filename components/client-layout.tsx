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
  CircleUser,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import Title from "@/components/header-title";
import { Logo } from "@/components/logo";

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase"; // make sure auth is exported from your firebase.ts

export function ClientLayout({ children }: { children: React.ReactNode; }) {
  const pathname = usePathname();
  const pageName = pathname.split("/")[1];

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUsername(user.displayName);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
      window.location.href = "/"; // redirect to home after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

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
      {showTopBar && (
        <header className="sticky top-0 w-full z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex w-full justify-stretch items-center">
            <div className="flex w-full justify-start items-center">
              <div className="flex justify-center items-center w-full max-w-64 min-w-0 border-(--border)">
                <Link href="/" className="cursor-pointer">
                  <Logo />
                </Link>
              </div>
            </div>

            {!isLandingPage && (
              <div className="flex w-full justify-center items-center">
                <Title />
              </div>
            )}

            <div className="flex w-full justify-end items-center pr-8 gap-2">
              {!isLoggedIn ? (
                <div className="flex justify-end items-center gap-3">
                  <CircleUser className="text-neutral-600"/>
                  <span className="text-lg pr-3 text-neutral-600">testUser</span>
                  <Button variant="outline" className="cursor-pointer" onClick={handleLogout}>
                    Log Out
                  </Button>
                </div>
              ) : (
                <>
                  <Link href="/login" passHref>
                    <Button variant="outline" className="cursor-pointer">
                      Login
                    </Button>
                  </Link>
                  <Link href="/create-account" passHref>
                    <Button variant="outline" className="cursor-pointer">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
          <Separator />
        </header>
      )}

      <main className="z-0 flex justify-between">
        {showSideBar && (
          <div className="sticky border-(--border) border-e-1 w-64 top-24.5 bottom-0 left-0 h-[calc(100dvh-(var(--spacing)*24.5))]">
            <div className="flex flex-col justify-start items-baseline mt-6 ml-6 gap-6 text-xl">
              {[
                { label: "Dashboard", icon: LayoutDashboard, path: "dashboard" },
                { label: "Profile", icon: UserPen, path: "profile" },
                { label: "Calendar", icon: Calendar, path: "calendar" },
                { label: "Resource Hub", icon: Folder, path: "resource-hub" },
                { label: "Bot Assist", icon: Bot, path: "bot-assist" },
                { label: "Friends", icon: Users, path: "friends" },
                { label: "Settings", icon: Settings, path: "settings" },
              ].map(({ label, icon: Icon, path }) => (
                <div key={path} className={pageName === path ? "bg-pink-50 p-4 rounded-2xl" : "p-2 rounded-2xl"}>
                  <Link href={`/${path}`}>
                    <div className="flex items-center justify-center gap-4">
                      <Icon className="size-8" />
                      <span>{label}</span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={`pt-8 px-8 pb-16 w-full flex-grow mx-auto ${pageName === "" ? "max-w-screen-2xl" : "max-w-screen-xl"}`}>
          {children}
        </div>
      </main>
    </>
  );
}
