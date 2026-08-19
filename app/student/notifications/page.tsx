"use client";

import { useCallback, useEffect, useState } from "react";

interface Notification {
  _id: string;
  title: string;
  message: string;
  createdAt: string;
  read?: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadNotifications = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await fetch("/api/student/notifications");

      if (!response.ok) {
        throw new Error("Failed to load notifications");
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid notifications response");
      }

      setNotifications(data);
    } catch (err) {
      console.error("Notifications loading error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-28 animate-pulse rounded-3xl bg-slate-200" />

        <div className="space-y-3">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-28 animate-pulse rounded-2xl bg-slate-200"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="w-full max-w-md rounded-2xl border border-red-100 bg-red-50 p-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-lg font-bold text-red-600">
            !
          </div>

          <h2 className="mt-4 font-semibold text-red-700">
            Unable to load notifications
          </h2>

          <p className="mt-1 text-sm leading-6 text-red-500">
            We couldn't retrieve your notifications right now.
          </p>

          <button
            type="button"
            onClick={loadNotifications}
            className="mt-5 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  const unread = notifications.filter(
    (notification) => !notification.read
  ).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-indigo-600">
            Stay updated
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Notifications
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Important updates and announcements from your campus.
          </p>
        </div>

        <div className="w-fit rounded-full bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-700">
          {unread} unread
        </div>
      </div>

      {/* Notification list */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-5">
          <h2 className="font-bold text-slate-900">
            Recent notifications
          </h2>
        </div>

        {notifications.length === 0 ? (
          <div className="px-6 py-20 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-xl text-slate-400">
              ✓
            </div>

            <h3 className="mt-4 font-semibold text-slate-800">
              You're all caught up
            </h3>

            <p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-slate-500">
              There are no notifications to show right now. We'll let you
              know when something important comes up.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {notifications.map((notification) => {
              const notificationDate = new Date(notification.createdAt);

              return (
                <div
                  key={notification._id}
                  className={`flex gap-4 p-5 transition hover:bg-slate-50 sm:p-6 ${
                    !notification.read ? "bg-indigo-50/30" : ""
                  }`}
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
                      !notification.read
                        ? "bg-indigo-100 text-indigo-600"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    !
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-slate-800">
                          {notification.title}
                        </h3>

                        {!notification.read && (
                          <span
                            className="h-2 w-2 rounded-full bg-indigo-600"
                            aria-label="Unread"
                          />
                        )}
                      </div>

                      <span className="text-xs text-slate-400">
                        {Number.isNaN(notificationDate.getTime())
                          ? "Date unavailable"
                          : notificationDate.toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                      </span>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {notification.message}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}