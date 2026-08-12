"use client";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((r) => r.json())
      .then(setStats);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">Platform-wide overview across every role.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Students</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {stats === null ? "..." : stats.totalStudents}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Faculty</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {stats === null ? "..." : stats.totalFaculty}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Admins</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {stats === null ? "..." : stats.totalAdmins}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Assignments</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {stats === null ? "..." : stats.totalAssignments}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Attendance Records</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {stats === null ? "..." : stats.totalAttendanceRecords}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-slate-900">Quick Links</h2>
        <a href="/admin/users" className="inline-block rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700">
          Manage Users
        </a>
      </div>
    </div>
  );
}