"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useFirestore, useDoc } from "@/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { Loader2, Save } from "lucide-react";

export default function SettingsPage() {
  const { toast } = useToast();
  const firestore = useFirestore();
  
  const settingsRef = useMemo(() => {
    if (!firestore) return null;
    return doc(firestore, "settings", "academy");
  }, [firestore]);

  const { data: settings, loading } = useDoc(settingsRef);

  const [platformName, setPlatformName] = useState("Bharath Academy");
  const [adminEmail, setAdminEmail] = useState("admin@edu.com");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (settings) {
      setPlatformName(settings.name || "Bharath Academy");
      setAdminEmail(settings.email || "admin@edu.com");
      setEmailNotifications(settings.emailNotifications !== undefined ? settings.emailNotifications : true);
      setWeeklyReports(settings.weeklyReports !== undefined ? settings.weeklyReports : true);
    }
  }, [settings]);

  const handleSave = async () => {
    if (!firestore) return;
    setIsSaving(true);

    const submissionData = {
      name: platformName,
      email: adminEmail,
      emailNotifications,
      weeklyReports,
      updatedAt: serverTimestamp(),
    };

    try {
      await setDoc(doc(firestore, "settings", "academy"), submissionData, { merge: true });
      toast({
        title: "Settings Saved",
        description: "Your platform configuration has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Save Failed",
        description: error.message || "Could not update settings.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        <p className="font-bold text-gray-400">Loading Configuration...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl text-left">
      {/* General Settings Section */}
      <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[24px] overflow-hidden bg-white">
        <CardContent className="p-6 sm:p-10 space-y-8">
          <h3 className="text-xl font-bold text-gray-900 tracking-tight text-left">General</h3>
          
          <div className="space-y-6">
            <div className="space-y-3 text-left">
              <Label htmlFor="platform-name" className="text-sm font-bold text-gray-700">
                Platform Name
              </Label>
              <Input 
                id="platform-name"
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
                className="h-14 bg-gray-100/80 border-none rounded-xl focus-visible:ring-blue-500 text-gray-900 font-medium px-6"
              />
            </div>

            <div className="space-y-3 text-left">
              <Label htmlFor="admin-email" className="text-sm font-bold text-gray-700">
                Admin Email
              </Label>
              <Input 
                id="admin-email"
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="h-14 bg-gray-100/80 border-none rounded-xl focus-visible:ring-blue-500 text-gray-900 font-medium px-6"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications Section */}
      <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[24px] overflow-hidden bg-white">
        <CardContent className="p-6 sm:p-10 space-y-8">
          <h3 className="text-xl font-bold text-gray-900 tracking-tight text-left">Notifications</h3>
          
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="space-y-1 text-left">
                <Label className="text-base font-bold text-gray-900">Email Notifications</Label>
                <p className="text-sm text-gray-400 font-medium">Receive enrollment alerts</p>
              </div>
              <Switch 
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1 text-left">
                <Label className="text-base font-bold text-gray-900">Weekly Reports</Label>
                <p className="text-sm text-gray-400 font-medium">Performance summaries</p>
              </div>
              <Switch 
                checked={weeklyReports}
                onCheckedChange={setWeeklyReports}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Button */}
      <div className="flex justify-start pt-4">
        <Button 
          onClick={handleSave}
          disabled={isSaving}
          className="h-14 px-10 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-teal-500 hover:to-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95 border-none gap-2 w-full sm:w-auto"
        >
          {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          Save Changes
        </Button>
      </div>
    </div>
  );
}
