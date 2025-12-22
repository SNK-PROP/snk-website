"use client";
import { useEffect, useRef, useCallback, useState } from "react";
import { apiService } from "@/lib/api";

export function useNotificationPolling(enabled = true, interval = 30000) {
  const intervalRef = useRef(null);
  const lastUpdateRef = useRef(null);

  const startPolling = useCallback((callback) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Initial call
    callback();

    // Set up interval
    intervalRef.current = setInterval(() => {
      callback();
    }, interval);

    lastUpdateRef.current = new Date();
  }, [interval]);

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const manualRefresh = useCallback((callback) => {
    callback();
    lastUpdateRef.current = new Date();
  }, []);

  useEffect(() => {
    return () => {
      stopPolling();
    };
  }, [stopPolling]);

  return {
    startPolling,
    stopPolling,
    manualRefresh,
    isPolling: !!intervalRef.current,
    lastUpdate: lastUpdateRef.current
  };
}

// Hook for polling notification stats
export function useNotificationStats(initialStats, enabled = true) {
  const [stats, setStats] = useState(initialStats);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(async () => {
    if (!enabled) return;

    setLoading(true);
    setError(null);
    try {
      const response = await apiService.getNotificationStats();
      setStats(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  const { startPolling, stopPolling, manualRefresh } = useNotificationPolling(enabled);

  useEffect(() => {
    if (enabled) {
      startPolling(fetchStats);
    } else {
      stopPolling();
    }

    return () => stopPolling();
  }, [enabled, fetchStats, startPolling, stopPolling]);

  return {
    stats,
    loading,
    error,
    refresh: () => manualRefresh(fetchStats),
    startPolling: () => startPolling(fetchStats),
    stopPolling
  };
}