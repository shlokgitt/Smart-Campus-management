"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => setStats(null));
  }, []);

  const statCards = [
    {
      label: "Students",
      value: stats?.totalStudents,
      description: "Registered students",
      accent: "bg-indigo-50 text-indigo-700",
      icon: "♙",
    },
    {
      label: "Faculty",
      value: stats?.totalFaculty,
      description: "Teaching staff",
      accent: "bg-emerald-50 text-emerald-700",
      icon: "◆",
    },
    {
      label: "Admins",
      value: stats?.totalAdmins,
      description: "System administrators",
      accent: "bg-amber-50 text-amber-700",
      icon: "A",
    },
    {
      label: "Assignments",
      value: stats?.totalAssignments,
      description: "Created assignments",
      accent: "bg-violet-50 text-violet-700",
      icon: "▣",
    },
    {
      label: "Attendance",
      value: stats?.totalAttendanceRecords,
      description: "Attendance records",
      accent: "bg-rose-50 text-rose-700",
      icon: "✓",
    },
  ];

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600">
            Administration
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Campus overview
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Monitor users, academic activity, and attendance across the
            Smart Campus platform.
          </p>
        </div>

        <Link
          href="/admin/users"
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
        >
          Manage Users
          <span className="ml-2">→</span>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold ${card.accent}`}
              >
                {card.icon}
              </div>

              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Total
              </span>
            </div>

            <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-slate-400">
              {card.label}
            </p>

            <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
              {stats === null ? (
                <span className="inline-block h-9 w-16 animate-pulse rounded-lg bg-slate-100" />
              ) : (
                card.value ?? 0
              )}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {card.description}
            </p>
          </div>
        ))}
      </div>

      {/* Main overview */}
      <div className="grid gap-6 lg:grid-cols-3">

        {/* Platform activity */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Platform activity
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                A quick look at the current campus system.
              </p>
            </div>

            <div className="rounded-lg bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
              Live data
            </div>
          </div>

          <div className="mt-6 divide-y divide-slate-100">

            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-sm text-indigo-700">
                  ♙
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Student accounts
                  </p>
                  <p className="text-xs text-slate-500">
                    Students currently registered
                  </p>
                </div>
              </div>

              <span className="text-sm font-bold text-slate-900">
                {stats === null ? "..." : stats.totalStudents ?? 0}
              </span>
            </div>

            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-sm text-emerald-700">
                  ◆
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Faculty members
                  </p>
                  <p className="text-xs text-slate-500">
                    Teaching staff with portal access
                  </p>
                </div>
              </div>

              <span className="text-sm font-bold text-slate-900">
                {stats === null ? "..." : stats.totalFaculty ?? 0}
              </span>
            </div>

            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-sm text-violet-700">
                  ▣
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Assignments
                  </p>
                  <p className="text-xs text-slate-500">
                    Assignments created by faculty
                  </p>
                </div>
              </div>

              <span className="text-sm font-bold text-slate-900">
                {stats === null ? "..." : stats.totalAssignments ?? 0}
              </span>
            </div>

          </div>
        </div>

        {/* Quick actions */}
        <div className="rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white shadow-sm">

          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-indigo-300">
            Admin tools
          </p>

          <h2 className="mt-3 text-xl font-semibold">
            Manage your campus
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            Access the tools you need to manage users and keep the platform
            organized.
          </p>

          <div className="mt-6 space-y-3">

            <Link
              href="/admin/users"
              className="flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              <span>Manage Users</span>
              <span>→</span>
            </Link>

            <Link
              href="/admin/notifications"
              className="flex items-center justify-between rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
            >
              <span>Notifications</span>
              <span>→</span>
            </Link>

          </div>
        </div>
      </div>

      {/* System status */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              ✓
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-900">
                Smart Campus is operational
              </p>

              <p className="text-xs text-slate-500">
                Dashboard data is being loaded from the platform.
              </p>
            </div>
          </div>

          <span className="w-fit rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
            System healthy
          </span>

        </div>
      </div>

    </div>
  );
}