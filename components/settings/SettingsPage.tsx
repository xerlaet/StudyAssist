"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState("24px");
  const [timezone, setTimezone] = useState("GMT-6");
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [notificationFrequency, setNotificationFrequency] = useState("Daily");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/settings/")
      .then((res) => res.json())
      .then((data) => {
        const setting = data[0];
        setDarkMode(setting.darkMode);
        setFontSize(setting.fontSize);
        setTimezone(setting.timezone);
        setNotificationsEnabled(setting.notificationsEnabled);
        setNotificationFrequency(setting.notificationFrequency);

        document.documentElement.classList.toggle("dark", setting.darkMode);
        document.body.style.setProperty("--user-font-size", setting.fontSize);
      })
      .catch((err) => console.error("Failed to load settings", err));
  }, []);

  const handleApply = async () => {
    try {
      await fetch("http://127.0.0.1:8000/api/settings/update/test@example.com/", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fontSize,
          timezone,
          darkMode,
          notificationsEnabled,
          notificationFrequency,
        }),
      });

      document.documentElement.classList.toggle("dark", darkMode);
      document.body.style.setProperty("--user-font-size", fontSize);
    } catch (err) {
      console.error("Failed to update settings.");
    }
  };

  return (
    <div className="w-full bg-white dark:bg-[#1a1a1a] text-black dark:text-white" style={{ fontSize: "var(--user-font-size, 24px)" }}>
      <div className="flex flex-col px-10 py-6">
        <div className="text-center mb-10"></div>

        {/* General Settings */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">General Settings</h2>
          <Card className="bg-[#f9f1f1] dark:bg-[#2b2b2b] rounded-xl">
            <CardContent className="flex flex-col space-y-6 p-6">
              <div className="flex justify-between items-center">
                <span className="text-black dark:text-white">Dark Mode</span>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-black dark:text-white">Font Size</span>
                <div className="text-black dark:text-white">{fontSize}</div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-black dark:text-white">Timezone</span>
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GMT-6">GMT-6</SelectItem>
                    <SelectItem value="GMT-5">GMT-5</SelectItem>
                    <SelectItem value="GMT+1">GMT+1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Notification Settings */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Notification Settings</h2>
          <Card className="bg-[#f9f1f1] dark:bg-[#2b2b2b] rounded-xl">
            <CardContent className="flex flex-col space-y-6 p-6">
              <div className="flex justify-between items-center">
                <span className="text-black dark:text-white">Enable Notification</span>
                <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-black dark:text-white">Frequency</span>
                <Select value={notificationFrequency} onValueChange={setNotificationFrequency}>
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Daily">Daily</SelectItem>
                    <SelectItem value="Weekly">Weekly</SelectItem>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Apply Button */}
        <div className="flex justify-center">
          <Button
            className="bg-[#D0E7F9] text-black px-6 py-2 hover:bg-[#c3dbec] transition"
            onClick={handleApply}
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}

