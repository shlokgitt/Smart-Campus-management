"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface DashboardStats {
  attendancePercentage: number;
  pendingAssignments: number;
  totalAssignments: number;
  unreadNotifications: number;
}

export default function StudentDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/student/dashboard")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load dashboard");
        return response.json();
      })
      .then(setStats)
      .catch(() => setError(true));
  }, []);

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center">
          <p className="font-semibold text-red-700">
            Unable to load dashboard
          </p>
          <p className="mt-1 text-sm text-red-500">
            Please refresh the page and try again.
          </p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="space-y-6">
        <div className="h-32 animate-pulse rounded-3xl bg-slate-200" />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-32 animate-pulse rounded-2xl bg-slate-200"
            />
          ))}
        </div>

        <div className="h-64 animate-pulse rounded-2xl bg-slate-200" />
      </div>
    );
  }

  const statCards = [
    {
      title: "Attendance",
      value: `${stats.attendancePercentage}%`,
      description: "Overall attendance",
      icon: "✓",
      href: "/student/attendance",
    },
    {
      title: "Pending assignments",
      value: stats.pendingAssignments,
      description: "Need your attention",
      icon: "!",
      href: "/student/assignments",
    },
    {
      title: "Total assignments",
      value: stats.totalAssignments,
      description: "Assigned this term",
      icon: "▣",
      href: "/student/assignments",
    },
    {
      title: "Notifications",
      value: stats.unreadNotifications,
      description: "Unread notifications",
      icon: "●",
      href: "/student/notifications",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-700 p-6 text-white shadow-lg shadow-indigo-100 sm:p-8">
        <div className="relative z-10 max-w-2xl">
          <p className="text-sm font-medium text-indigo-100">
            Welcome back 👋
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Your campus, all in one place.
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-indigo-100 sm:text-base">
            Stay updated with your attendance, assignments and important
            campus notifications from one simple dashboard.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/student/assignments"
              className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-indigo-700 shadow-sm transition hover:bg-indigo-50"
            >
              View assignments
            </Link>

            <Link
              href="/student/attendance"
              className="rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              Check attendance
            </Link>
          </div>
        </div>

        {/* Decorative shapes */}
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10" />
        <div className="absolute -bottom-24 right-20 h-64 w-64 rounded-full bg-white/5" />
      </section>

      {/* Stats */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900">
            Your overview
          </h2>
          <p className="text-sm text-slate-500">
            A quick look at your academic activity.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-sm font-bold text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                  {card.icon}
                </div>

                <span className="text-slate-300 transition group-hover:text-indigo-500">
                  →
                </span>
              </div>

              <p className="mt-5 text-sm font-medium text-slate-500">
                {card.title}
              </p>

              <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                {card.value}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                {card.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom section */}
      <section className="grid gap-5 lg:grid-cols-3">
        {/* Attendance */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-bold text-slate-900">
                Attendance overview
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Keep your attendance above the required threshold.
              </p>
            </div>

            <Link
              href="/student/attendance"
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              View details →
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-6">
            <div className="relative flex h-32 w-32 shrink-0 items-center justify-center rounded-full border-[12px] border-indigo-100">
              <div
                className="absolute inset-[-12px] rounded-full border-[12px] border-transparent border-t-indigo-600 border-r-indigo-600"
                style={{
                  transform: `rotate(${stats.attendancePercentage * 1.8 - 45}deg)`,
                }}
              />

              <div className="text-center">
                <p className="text-2xl font-bold text-slate-900">
                  {stats.attendancePercentage}%
                </p>
                <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                  Attendance
                </p>
              </div>
            </div>

            <div>
              <p className="font-semibold text-slate-900">
                {stats.attendancePercentage >= 75
                  ? "You're doing well!"
                  : "Attendance needs attention"}
              </p>

              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                {stats.attendancePercentage >= 75
                  ? "Your current attendance is above the usual minimum requirement. Keep it up."
                  : "Your attendance is below the usual minimum requirement. Try to attend upcoming classes regularly."}
              </p>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-slate-900">Quick actions</h2>
          <p className="mt-1 text-sm text-slate-500">
            Jump to frequently used areas.
          </p>

          <div className="mt-5 space-y-3">
            <Link
              href="/student/assignments"
              className="flex items-center justify-between rounded-xl bg-slate-50 p-4 transition hover:bg-indigo-50"
            >
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Assignments
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Check pending work
                </p>
              </div>

              <span className="text-slate-400">→</span>
            </Link>

            <Link
              href="/student/attendance"
              className="flex items-center justify-between rounded-xl bg-slate-50 p-4 transition hover:bg-indigo-50"
            >
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Attendance
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  View attendance history
                </p>
              </div>

              <span className="text-slate-400">→</span>
            </Link>

            <Link
              href="/student/notifications"
              className="flex items-center justify-between rounded-xl bg-slate-50 p-4 transition hover:bg-indigo-50"
            >
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Notifications
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  See latest updates
                </p>
              </div>

              <span className="text-slate-400">→</span>
            </Link>

            <Link
              href="/student/profile"
              className="flex items-center justify-between rounded-xl bg-slate-50 p-4 transition hover:bg-indigo-50"
            >
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  My profile
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Update your details
                </p>
              </div>

              <span className="text-slate-400">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}