"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Moon, Sun } from "lucide-react"

export default function GeneralSettings() {
  const [darkMode, setDarkMode] = useState(false)
  const [timezone, setTimezone] = useState("UTC-5")
  const [fontSize, setFontSize] = useState(16)

  return (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
        <CardDescription>Customize your application experience</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="dark-mode">Dark Mode</Label>
            <div className="text-sm text-gray-500">Switch between light and dark theme</div>
          </div>
          <div className="flex items-center space-x-2">
            <Sun className="h-4 w-4 text-gray-500" />
            <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
            <Moon className="h-4 w-4 text-gray-500" />
          </div>
        </div>

        {/* Timezone Selector */}
        <div className="space-y-2">
          <Label htmlFor="timezone">Timezone</Label>
          <Select value={timezone} onValueChange={setTimezone}>
            <SelectTrigger id="timezone" className="w-full">
              <SelectValue placeholder="Select timezone" />
            </SelectTrigger>
            <SelectContent>
             <SelectContent className="bg-white border border-gray-300 rounded-md shadow-md">
             <SelectItem className="px-4 py-2 hover:bg-gray-100 border-b last:border-b-0" value="UTC-8">
              Pacific Time (UTC-8)
             </SelectItem>
  <SelectItem className="px-4 py-2 hover:bg-gray-100 border-b last:border-b-0" value="UTC-7">
    Mountain Time (UTC-7)
  </SelectItem>
  <SelectItem className="px-4 py-2 hover:bg-gray-100 border-b last:border-b-0" value="UTC-6">
    Central Time (UTC-6)
  </SelectItem>
  <SelectItem className="px-4 py-2 hover:bg-gray-100 border-b last:border-b-0" value="UTC-5">
    Eastern Time (UTC-5)
  </SelectItem>
  <SelectItem className="px-4 py-2 hover:bg-gray-100 border-b last:border-b-0" value="UTC+0">
    Greenwich Mean Time (UTC+0)
  </SelectItem>
  <SelectItem className="px-4 py-2 hover:bg-gray-100 border-b last:border-b-0" value="UTC+1">
    Central European Time (UTC+1)
  </SelectItem>
  <SelectItem className="px-4 py-2 hover:bg-gray-100 border-b last:border-b-0" value="UTC+8">
    China Standard Time (UTC+8)
  </SelectItem>
  <SelectItem className="px-4 py-2 hover:bg-gray-100" value="UTC+9">
    Japan Standard Time (UTC+9)
  </SelectItem>
</SelectContent>
            </SelectContent>
          </Select>
          <p className="text-sm text-gray-500">Choose your local timezone for accurate scheduling</p>
        </div>

        {/* Font Size Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="font-size">Font Size</Label>
            <span className="text-sm font-medium">{fontSize}px</span>
          </div>
          <Slider
            id="font-size"
            min={12}
            max={24}
            step={1}
            value={[fontSize]}
            onValueChange={(value) => setFontSize(value[0])}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Small</span>
            <span>Medium</span>
            <span>Large</span>
          </div>
        </div>

        {/* Language Selector */}
        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <Select defaultValue="en">
            <SelectTrigger id="language" className="w-full">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
           <SelectContent className="bg-white border border-gray-300 rounded-md shadow-md">
  <SelectItem className="px-4 py-2 hover:bg-gray-100 border-b last:border-b-0" value="en">
    English
  </SelectItem>
  <SelectItem className="px-4 py-2 hover:bg-gray-100 border-b last:border-b-0" value="es">
    Spanish
  </SelectItem>
  <SelectItem className="px-4 py-2 hover:bg-gray-100 border-b last:border-b-0" value="fr">
    French
  </SelectItem>
  <SelectItem className="px-4 py-2 hover:bg-gray-100 border-b last:border-b-0" value="de">
    German
  </SelectItem>
  <SelectItem className="px-4 py-2 hover:bg-gray-100 border-b last:border-b-0" value="zh">
    Chinese
  </SelectItem>
  <SelectItem className="px-4 py-2 hover:bg-gray-100" value="ja">
    Japanese
  </SelectItem>
</SelectContent>
          </Select>
          <p className="text-sm text-gray-500">Choose your preferred language</p>
        </div>
      </CardContent>
    </Card>
  )
}
