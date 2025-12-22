"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Send,
  Users,
  Smartphone,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  BarChart3,
  RefreshCw
} from "lucide-react";

export function NotificationStats({ stats, onRefresh }) {
  const getDeliveryRate = () => {
    if (!stats.notifications?.overview?.totalRecipients) return 0;
    const { successfulDeliveries, totalRecipients } = stats.notifications.overview;
    return totalRecipients > 0 ? Math.round((successfulDeliveries / totalRecipients) * 100) : 0;
  };

  const getSuccessRate = () => {
    if (!stats.notifications?.overview?.total) return 0;
    const { sent, total } = stats.notifications.overview;
    return total > 0 ? Math.round((sent / total) * 100) : 0;
  };

  const deliveryRate = getDeliveryRate();
  const successRate = getSuccessRate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Sent */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Sent</CardTitle>
          <Send className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.notifications?.overview?.sent || 0}
          </div>
          <p className="text-xs text-muted-foreground">
            {successRate > 0 && `${successRate}% success rate`}
          </p>
        </CardContent>
      </Card>

      {/* Pending */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.notifications?.overview?.pending || 0}
          </div>
          <p className="text-xs text-muted-foreground">
            Scheduled or queued
          </p>
        </CardContent>
      </Card>

      {/* Failed */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Failed</CardTitle>
          <XCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            {stats.notifications?.overview?.failed || 0}
          </div>
          <p className="text-xs text-muted-foreground">
            Need attention
          </p>
        </CardContent>
      </Card>

      {/* Active Devices */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Devices</CardTitle>
          <Smartphone className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.devices?.reduce((sum, device) => sum + device.active, 0) || 0}
          </div>
          <p className="text-xs text-muted-foreground">
            Total registered devices
          </p>
        </CardContent>
      </Card>

      {/* Delivery Statistics */}
      <Card className="md:col-span-2 lg:col-span-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">Delivery Statistics</CardTitle>
          <Button variant="outline" size="sm" onClick={onRefresh}>
            <RefreshCw className="h-3 w-3 mr-1" />
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* Total Recipients */}
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold">
                {stats.notifications?.overview?.totalRecipients || 0}
              </div>
              <p className="text-xs text-muted-foreground">Total Recipients</p>
            </div>

            {/* Successful Deliveries */}
            <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {stats.notifications?.overview?.successfulDeliveries || 0}
              </div>
              <p className="text-xs text-muted-foreground">Successful</p>
            </div>

            {/* Failed Deliveries */}
            <div className="text-center p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {stats.notifications?.overview?.failedDeliveries || 0}
              </div>
              <p className="text-xs text-muted-foreground">Failed</p>
            </div>

            {/* Delivery Rate */}
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {deliveryRate}%
              </div>
              <p className="text-xs text-muted-foreground">Delivery Rate</p>
            </div>

            {/* Scheduled Jobs */}
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {stats.scheduledJobs || 0}
              </div>
              <p className="text-xs text-muted-foreground">Scheduled Jobs</p>
            </div>
          </div>

          {/* Device Platform Breakdown */}
          {stats.devices && stats.devices.length > 0 && (
            <div className="mt-6 pt-6 border-t">
              <h4 className="text-sm font-medium mb-3">Device Platform Breakdown</h4>
              <div className="flex flex-wrap gap-2">
                {stats.devices.map((device) => (
                  <Badge key={device._id} variant="outline" className="flex items-center gap-2">
                    <Smartphone className="h-3 w-3" />
                    {device._id}: {device.active}/{device.total} active
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Notification Types */}
          {stats.notifications?.byType && stats.notifications.byType.length > 0 && (
            <div className="mt-6 pt-6 border-t">
              <h4 className="text-sm font-medium mb-3">Notification Types</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                {stats.notifications.byType.map((type) => (
                  <Badge key={type._id} variant="secondary">
                    {type._id}: {type.count}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Status Indicators */}
          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  <span>Delivery Rate: {deliveryRate}%</span>
                </div>
                <div className="flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3 text-yellow-500" />
                  <span>Failed Rate: {100 - deliveryRate}%</span>
                </div>
              </div>
              <div className="text-muted-foreground">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}