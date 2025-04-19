
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState("24px");
  const [timezone, setTimezone] = useState("GMT-6");
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [notificationFrequency, setNotificationFrequency] = useState("Daily");

  return (
    <div className="w-full bg-white">
      <div className="flex flex-col px-10 py-6">
        {/* Top Heading */}
        <div className="text-center mb-10">
          
        </div>

        {/* General Settings */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">General Settings</h2>
          <Card className="bg-[#f9f1f1] rounded-xl">
            <CardContent className="flex flex-col space-y-6 p-6">
              {/* Dark Mode Switch */}
              <div className="flex justify-between items-center">
                <span>Dark Mode</span>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>

              {/* Font Size */}
              <div className="flex justify-between items-center">
                <span>Font Size</span>
                <div>{fontSize}</div>
              </div>

              {/* Timezone */}
              <div className="flex justify-between items-center">
                <span>Timezone</span>
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
          <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
          <Card className="bg-[#f9f1f1] rounded-xl">
            <CardContent className="flex flex-col space-y-6 p-6">
              {/* Enable Notifications */}
              <div className="flex justify-between items-center">
                <span>Enable Notification</span>
                <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
              </div>

              {/* Frequency */}
              <div className="flex justify-between items-center">
                <span>Frequency</span>
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
          <Button className="bg-[#D0E7F9] text-black px-6 py-2 hover:bg-[#c3dbec] transition">
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}
