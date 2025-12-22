"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { MoreHorizontal, Eye, Edit, X, Clock, RefreshCw, ChevronLeft, ChevronRight, Trash2, BarChart3 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

export function NotificationList({
  notifications,
  loading,
  onView,
  onCancel,
  onDelete,
  onRefresh,
  getStatusBadge,
  getTypeBadge
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const paginatedNotifications = notifications.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(notifications.length / pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCancel = (id) => {
    onCancel(id);
  };

  const handleDelete = (id) => {
    onDelete(id);
  };

  if (loading) {
    return (
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-9 w-24" />
        </div>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Audience</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-8" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Notifications</h3>
          <p className="text-sm text-muted-foreground">
            {notifications.length} total notifications
          </p>
        </div>
        <Button onClick={onRefresh} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No notifications yet</h3>
            <p className="text-muted-foreground mb-4">
              Send your first notification to see it appear here.
            </p>
            <Button onClick={onRefresh} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Audience</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedNotifications.map((notification) => (
                  <TableRow key={notification._id}>
                    <TableCell>
                      <div className="max-w-[300px]">
                        <p className="font-medium truncate">{notification.title}</p>
                        <p className="text-sm text-muted-foreground truncate">
                          {notification.body}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getTypeBadge(notification.type)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {notification.targetAudience}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(notification.status)}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {format(new Date(notification.createdAt), 'MMM d, yyyy')}
                        <br />
                        <span className="text-muted-foreground">
                          {format(new Date(notification.createdAt), 'h:mm a')}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => onView(notification._id)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>

                          {notification.status === 'pending' && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleCancel(notification._id)}
                                className="text-yellow-600"
                              >
                                <X className="h-4 w-4 mr-2" />
                                Cancel
                              </DropdownMenuItem>
                            </>
                          )}

                          {(notification.status === 'failed' || notification.status === 'cancelled') && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleDelete(notification._id)}
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </>
                          )}

                          {notification.status === 'sent' && notification.deliveryStats && (
                            <DropdownMenuItem
                              onClick={() => onView(notification._id)}
                            >
                              <BarChart3 className="h-4 w-4 mr-2" />
                              View Stats
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Showing {((currentPage - 1) * pageSize) + 1} to{' '}
                  {Math.min(currentPage * pageSize, notifications.length)} of{' '}
                  {notifications.length} notifications
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                        className="w-8 h-8 p-0"
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer Stats */}
      {notifications.length > 0 && (
        <div className="flex justify-between items-center text-sm text-muted-foreground border-t pt-4">
          <div className="flex items-center space-x-4">
            <span>
              Sent: <strong>{notifications.filter(n => n.status === 'sent').length}</strong>
            </span>
            <span>
              Pending: <strong>{notifications.filter(n => n.status === 'pending').length}</strong>
            </span>
            <span>
              Failed: <strong>{notifications.filter(n => n.status === 'failed').length}</strong>
            </span>
          </div>
          <div>
            Total: <strong>{notifications.length}</strong> notifications
          </div>
        </div>
      )}
    </div>
  );
}