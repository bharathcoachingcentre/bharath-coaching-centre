
"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const { toast } = useToast();
  const [platformName, setPlatformName] = useState("Bharath Academy");
  const [adminEmail, setAdminEmail] = useState("admin@edu.com");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your platform configuration has been updated successfully.",
    });
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* General Settings Section */}
      <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[24px] overflow-hidden bg-white">
        <CardContent className="p-10 space-y-8">
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">General</h3>
          
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="platform-name" className="text-sm font-bold text-gray-700">
                Platform Name
              </Label>
              <Input 
                id="platform-name"
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
                className="h-14 bg-gray-100/80 border-none rounded-xl focus-visible:ring-indigo-500 text-gray-900 font-medium px-6"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="admin-email" className="text-sm font-bold text-gray-700">
                Admin Email
              </Label>
              <Input 
                id="admin-email"
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="h-14 bg-gray-100/80 border-none rounded-xl focus-visible:ring-indigo-500 text-gray-900 font-medium px-6"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications Section */}
      <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[24px] overflow-hidden bg-white">
        <CardContent className="p-10 space-y-8">
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">Notifications</h3>
          
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-bold text-gray-900">Email Notifications</Label>
                <p className="text-sm text-gray-400 font-medium">Receive enrollment alerts</p>
              </div>
              <Switch 
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
                className="data-[state=checked]:bg-indigo-600"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-bold text-gray-900">Weekly Reports</Label>
                <p className="text-sm text-gray-400 font-medium">Performance summaries</p>
              </div>
              <Switch 
                checked={weeklyReports}
                onCheckedChange={setWeeklyReports}
                className="data-[state=checked]:bg-indigo-600"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Button */}
      <div className="flex justify-start pt-4">
        <Button 
          onClick={handleSave}
          className="h-14 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
