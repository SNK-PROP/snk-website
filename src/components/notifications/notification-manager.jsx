"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Send, Bell, Users, BarChart3, Clock, Settings, RefreshCw, Trash2, Edit, Eye, X, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { apiService } from "@/lib/api";
import { NotificationStats } from "./notification-stats";
import { NotificationList } from "./notification-list";
import { useNotificationPolling } from "./use-notification-polling";
import { format } from "date-fns";

export function NotificationManager({ initialStats }) {
  const [activeTab, setActiveTab] = useState("send");
  const [stats, setStats] = useState(initialStats || {});
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sendLoading, setSendLoading] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    targetAudience: "all",
    targetUsers: [],
    type: "general",
    data: "{}",
    imageUrl: "",
    scheduledFor: "",
    priority: "normal",
    ttl: 3600
  });

  // Set up polling for real-time stats updates
  const { startPolling, stopPolling, manualRefresh } = useNotificationPolling(true, 30000);

  const loadStats = async () => {
    try {
      const response = await apiService.getNotificationStats();
      setStats(response.data);
    } catch (error) {
      console.error("Failed to load stats:", error);
    }
  };

  // Load notifications and stats
  useEffect(() => {
    if (activeTab === "history") {
      loadNotifications();
    }
    // Start polling for stats updates
    startPolling(loadStats);

    // Cleanup polling on unmount
    return () => stopPolling();
  }, [activeTab, startPolling, stopPolling]);

  const loadNotifications = async (params = {}) => {
    setLoading(true);
    try {
      const response = await apiService.getNotificationHistory(params);
      setNotifications(response.data.notifications);
    } catch (error) {
      console.error("Failed to load notifications:", error);
      toast.error("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  const handleSendNotification = async () => {
    if (!formData.title || !formData.body) {
      toast.error("Title and body are required");
      return;
    }

    let data = {};
    try {
      data = JSON.parse(formData.data);
    } catch (error) {
      toast.error("Invalid JSON in data field");
      return;
    }

    const payload = {
      ...formData,
      data,
      scheduledFor: formData.scheduledFor || undefined,
    };

    setSendLoading(true);
    try {
      await apiService.sendNotification(payload);
      toast.success("Notification sent successfully!");

      // Reset form
      setFormData({
        title: "",
        body: "",
        targetAudience: "all",
        targetUsers: [],
        type: "general",
        data: "{}",
        imageUrl: "",
        scheduledFor: "",
        priority: "normal",
        ttl: 3600
      });

      loadStats();
    } catch (error) {
      console.error("Error sending notification:", error);
      toast.error(error.response?.data?.message || "Failed to send notification");
    } finally {
      setSendLoading(false);
    }
  };

  const handleSendTestNotification = async () => {
    setSendLoading(true);
    try {
      await apiService.sendTestNotification({
        title: "Test Notification",
        body: "This is a test notification from the admin dashboard"
      });
      toast.success("Test notification sent successfully!");
    } catch (error) {
      console.error("Error sending test notification:", error);
      toast.error("Failed to send test notification");
    } finally {
      setSendLoading(false);
    }
  };

  const handleViewNotification = async (id) => {
    try {
      const response = await apiService.getNotificationById(id);
      setSelectedNotification(response.data);
      setShowDetails(true);
    } catch (error) {
      console.error("Error loading notification details:", error);
      toast.error("Failed to load notification details");
    }
  };

  const handleCancelNotification = async (id) => {
    try {
      await apiService.cancelNotification(id);
      toast.success("Notification cancelled successfully");
      loadNotifications();
      loadStats();
    } catch (error) {
      console.error("Error cancelling notification:", error);
      toast.error("Failed to cancel notification");
    }
  };

  const handleDeleteNotification = async (id) => {
    if (!confirm("Are you sure you want to delete this notification?")) {
      return;
    }

    try {
      await apiService.deleteNotification(id);
      toast.success("Notification deleted successfully");
      loadNotifications();
      loadStats();
    } catch (error) {
      console.error("Error deleting notification:", error);
      toast.error("Failed to delete notification");
    }
  };

  const handleRetryFailed = async () => {
    try {
      await apiService.retryFailedNotifications();
      toast.success("Failed notifications retry initiated");
      loadStats();
    } catch (error) {
      console.error("Error retrying notifications:", error);
      toast.error("Failed to retry notifications");
    }
  };

  const handleProcessPending = async () => {
    try {
      await apiService.processPendingNotifications();
      toast.success("Pending notifications processed");
      loadStats();
    } catch (error) {
      console.error("Error processing pending notifications:", error);
      toast.error("Failed to process pending notifications");
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      sent: "default",
      pending: "secondary",
      failed: "destructive",
      cancelled: "outline"
    };
    const icons = {
      sent: <CheckCircle className="h-3 w-3" />,
      pending: <Clock className="h-3 w-3" />,
      failed: <XCircle className="h-3 w-3" />,
      cancelled: <X className="h-3 w-3" />
    };

    return (
      <Badge variant={variants[status]} className="flex items-center gap-1">
        {icons[status]}
        {status}
      </Badge>
    );
  };

  const getTypeBadge = (type) => {
    const colors = {
      general: "default",
      new_property: "secondary",
      system: "outline",
      marketing: "default",
      alert: "destructive"
    };

    return <Badge variant={colors[type] || "default"}>{type}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <NotificationStats stats={stats} onRefresh={loadStats} />

      {/* Quick Actions */}
      <div className="flex gap-2">
        <Button onClick={handleSendTestNotification} disabled={sendLoading} variant="outline">
          <Bell className="h-4 w-4 mr-2" />
          Send Test
        </Button>
        <Button onClick={handleProcessPending} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Process Pending
        </Button>
        <Button onClick={handleRetryFailed} variant="outline">
          <AlertCircle className="h-4 w-4 mr-2" />
          Retry Failed
        </Button>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="send">Send Notification</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="send">
          <Card>
            <CardHeader>
              <CardTitle>Send New Notification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter notification title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="new_property">New Property</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                      <SelectItem value="alert">Alert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="body">Message *</Label>
                <Textarea
                  id="body"
                  value={formData.body}
                  onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                  placeholder="Enter notification message"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="audience">Target Audience</Label>
                  <Select value={formData.targetAudience} onValueChange={(value) => setFormData({ ...formData, targetAudience: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="users">Regular Users</SelectItem>
                      <SelectItem value="agents">Agents</SelectItem>
                      <SelectItem value="admins">Admins</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="scheduledFor">Schedule (Optional)</Label>
                  <Input
                    id="scheduledFor"
                    type="datetime-local"
                    value={formData.scheduledFor}
                    onChange={(e) => setFormData({ ...formData, scheduledFor: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Image URL (Optional)</Label>
                  <Input
                    id="imageUrl"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ttl">TTL (seconds)</Label>
                  <Input
                    id="ttl"
                    type="number"
                    value={formData.ttl}
                    onChange={(e) => setFormData({ ...formData, ttl: parseInt(e.target.value) || 3600 })}
                    placeholder="3600"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="data">Additional Data (JSON)</Label>
                <Textarea
                  id="data"
                  value={formData.data}
                  onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                  placeholder='{"key": "value", "action": "open_app"}'
                  rows={2}
                />
              </div>

              <Button
                onClick={handleSendNotification}
                disabled={sendLoading}
                className="w-full"
              >
                <Send className="h-4 w-4 mr-2" />
                {sendLoading ? 'Sending...' : 'Send Notification'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Notification History</CardTitle>
            </CardHeader>
            <CardContent>
              <NotificationList
                notifications={notifications}
                loading={loading}
                onView={handleViewNotification}
                onCancel={handleCancelNotification}
                onDelete={handleDeleteNotification}
                onRefresh={() => loadNotifications()}
                getStatusBadge={getStatusBadge}
                getTypeBadge={getTypeBadge}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Notification Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Notification Details</DialogTitle>
          </DialogHeader>
          {selectedNotification && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <div className="mt-1">{getStatusBadge(selectedNotification.status)}</div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Type</Label>
                  <div className="mt-1">{getTypeBadge(selectedNotification.type)}</div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Title</Label>
                <p className="mt-1 text-sm">{selectedNotification.title}</p>
              </div>

              <div>
                <Label className="text-sm font-medium">Message</Label>
                <p className="mt-1 text-sm">{selectedNotification.body}</p>
              </div>

              <div>
                <Label className="text-sm font-medium">Target Audience</Label>
                <p className="mt-1 text-sm capitalize">{selectedNotification.targetAudience}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Created</Label>
                  <p className="mt-1 text-sm">
                    {format(new Date(selectedNotification.createdAt), 'PPp')}
                  </p>
                </div>
                {selectedNotification.sentAt && (
                  <div>
                    <Label className="text-sm font-medium">Sent</Label>
                    <p className="mt-1 text-sm">
                      {format(new Date(selectedNotification.sentAt), 'PPp')}
                    </p>
                  </div>
                )}
              </div>

              {selectedNotification.deliveryStats && (
                <div>
                  <Label className="text-sm font-medium">Delivery Statistics</Label>
                  <div className="mt-2 grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Total:</span>
                      <span className="ml-2 font-medium">{selectedNotification.deliveryStats.totalRecipients || 0}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Successful:</span>
                      <span className="ml-2 font-medium text-green-600">
                        {selectedNotification.deliveryStats.successfulDeliveries || 0}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Failed:</span>
                      <span className="ml-2 font-medium text-red-600">
                        {selectedNotification.deliveryStats.failedDeliveries || 0}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {selectedNotification.data && Object.keys(selectedNotification.data).length > 0 && (
                <div>
                  <Label className="text-sm font-medium">Additional Data</Label>
                  <pre className="mt-1 text-xs bg-muted p-2 rounded">
                    {JSON.stringify(selectedNotification.data, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}