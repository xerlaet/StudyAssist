"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

export default function NotificationSettings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [frequency, setFrequency] = useState("daily")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>Manage how and when you receive notifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Enable/Disable Notifications */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="notifications">Enable Notifications</Label>
            <div className="text-sm text-gray-500">Receive notifications about important updates</div>
          </div>
          <Switch id="notifications" checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
        </div>

        {notificationsEnabled && (
          <>
            {/* Notification Frequency */}
            <div className="space-y-2">
              <Label>Notification Frequency</Label>
              <RadioGroup value={frequency} onValueChange={setFrequency} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="realtime" id="realtime" />
                  <Label htmlFor="realtime" className="cursor-pointer">
                    Real-time
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hourly" id="hourly" />
                  <Label htmlFor="hourly" className="cursor-pointer">
                    Hourly digest
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="daily" id="daily" />
                  <Label htmlFor="daily" className="cursor-pointer">
                    Daily digest
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="weekly" id="weekly" />
                  <Label htmlFor="weekly" className="cursor-pointer">
                    Weekly digest
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Notification Types */}
            <div className="space-y-2">
              <Label>Notification Types</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="assignments" defaultChecked />
                  <Label htmlFor="assignments" className="cursor-pointer">
                    Assignment reminders
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="deadlines" defaultChecked />
                  <Label htmlFor="deadlines" className="cursor-pointer">
                    Upcoming deadlines
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="study-sessions" defaultChecked />
                  <Label htmlFor="study-sessions" className="cursor-pointer">
                    Study session reminders
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="messages" defaultChecked />
                  <Label htmlFor="messages" className="cursor-pointer">
                    New messages
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="system" defaultChecked />
                  <Label htmlFor="system" className="cursor-pointer">
                    System updates
                  </Label>
                </div>
              </div>
            </div>

            {/* Notification Channels */}
            <div className="space-y-2">
              <Label htmlFor="channels">Notification Channels</Label>
              <Select defaultValue="all">
                <SelectTrigger id="channels" className="w-full">
                  <SelectValue placeholder="Select channels" />
                </SelectTrigger>
             <SelectContent className="bg-white border border-gray-300 rounded-md shadow-md">
  <SelectItem className="px-4 py-2 hover:bg-gray-100 border-b last:border-b-0" value="all">
    All channels
  </SelectItem>
  <SelectItem className="px-4 py-2 hover:bg-gray-100 border-b last:border-b-0" value="app">
    In-app only
  </SelectItem>
  <SelectItem className="px-4 py-2 hover:bg-gray-100 border-b last:border-b-0" value="email">
    Email only
  </SelectItem>
  <SelectItem className="px-4 py-2 hover:bg-gray-100" value="push">
    Push notifications only
  </SelectItem>
</SelectContent>
              </Select>
              <p className="text-sm text-gray-500">Choose how you want to receive notifications</p>
            </div>

            {/* Quiet Hours */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="quiet-hours">Quiet Hours</Label>
                <Switch id="quiet-hours" defaultChecked />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start-time" className="text-sm">
                    Start Time
                  </Label>
                  <Select defaultValue="22:00">
                    <SelectTrigger id="start-time">
                      <SelectValue placeholder="Start time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="20:00">8:00 PM</SelectItem>
                      <SelectItem value="21:00">9:00 PM</SelectItem>
                      <SelectItem value="22:00">10:00 PM</SelectItem>
                      <SelectItem value="23:00">11:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="end-time" className="text-sm">
                    End Time
                  </Label>
                  <Select defaultValue="07:00">
                    <SelectTrigger id="end-time">
                      <SelectValue placeholder="End time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="06:00">6:00 AM</SelectItem>
                      <SelectItem value="07:00">7:00 AM</SelectItem>
                      <SelectItem value="08:00">8:00 AM</SelectItem>
                      <SelectItem value="09:00">9:00 AM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <p className="text-sm text-gray-500">No notifications will be sent during quiet hours</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
