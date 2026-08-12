"use client";
import { useEffect, useState } from "react";

export default function FacultyDashboard() {
  const [assignmentCount, setAssignmentCount] = useState<number | null>(null);
  const [studentCount, setStudentCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/faculty/assignments")
      .then((r) => r.json())
      .then((data) => setAssignmentCount(Array.isArray(data) ? data.length : 0));

    fetch("/api/faculty/students")
      .then((r) => r.json())
      .then((data) => setStudentCount(Array.isArray(data) ? data.length : 0));
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Welcome back, Faculty</h1>
        <p className="mt-1 text-sm text-slate-500">
          Here's a quick overview of your assignments and students.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Assignments Created
          </p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {assignmentCount === null ? "..." : assignmentCount}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Total Students
          </p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {studentCount === null ? "..." : studentCount}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-slate-900">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <a href="/faculty/assignments" className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700">
            Create Assignment
          </a>
          <a href="/faculty/attendance" className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
            Mark Attendance
          </a>
        </div>
      </div>
    </div>
  );
}