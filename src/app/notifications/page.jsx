"use client";
import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { NotificationManager } from "@/components/notifications/notification-manager";
import { apiService } from "@/lib/api";
import { toast } from "sonner";

export default function NotificationsPage() {
  const [loading, setLoading] = useState(true);
  const [initialStats, setInitialStats] = useState(null);

  useEffect(() => {
    loadInitialStats();
  }, []);

  const loadInitialStats = async () => {
    try {
      const stats = await apiService.getNotificationStats();
      setInitialStats(stats.data);
    } catch (error) {
      console.error("Failed to load notification stats:", error);
      toast.error("Failed to load notification statistics");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="flex items-center justify-center h-64">
              <div className="text-lg">Loading notifications...</div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
              <p className="text-muted-foreground">
                Manage push notifications and view delivery statistics
              </p>
            </div>
          </div>

          <NotificationManager initialStats={initialStats} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}