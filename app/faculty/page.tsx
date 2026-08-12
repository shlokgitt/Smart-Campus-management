"use client";

import { useEffect, useState } from "react";

export default function FacultyDashboard() {
  const [assignmentCount, setAssignmentCount] = useState<number | null>(null);
  const [studentCount, setStudentCount] = useState<number | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [assignmentsRes, studentsRes] = await Promise.all([
          fetch("/api/faculty/assignments"),
          fetch("/api/faculty/students"),
        ]);

        if (!assignmentsRes.ok || !studentsRes.ok) {
          throw new Error("Failed to load dashboard data");
        }

        const assignments = await assignmentsRes.json();
        const students = await studentsRes.json();

        setAssignmentCount(
          Array.isArray(assignments) ? assignments.length : 0
        );

        setStudentCount(
          Array.isArray(students) ? students.length : 0
        );
      } catch (err) {
        console.error("Faculty dashboard error:", err);
        setError(true);
      }
    }

    loadDashboard();
  }, []);

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl bg-indigo-600 px-6 py-8 text-white shadow-sm sm:px-8">
        <div className="relative z-10 max-w-2xl">
          <p className="text-sm font-medium text-indigo-200">
            Faculty Portal
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Welcome back, Faculty
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-indigo-100 sm:text-base">
            Manage your assignments, track students, and keep your
            academic activities organized from one place.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/faculty/assignments"
              className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-indigo-700 shadow-sm transition hover:bg-indigo-50"
            >
              Create Assignment
            </a>

            <a
              href="/faculty/attendance"
              className="rounded-xl border border-indigo-400 bg-indigo-500/40 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
            >
              Mark Attendance
            </a>
          </div>
        </div>

        {/* Decorative shapes */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-32 right-20 h-72 w-72 rounded-full bg-white/5" />
      </section>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          Unable to load some dashboard information. Please refresh
          the page and try again.
        </div>
      )}

      {/* Overview */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900">
            Overview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            A quick look at your current teaching activity.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Assignments */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Assignments Created
                </p>

                <p className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
                  {assignmentCount === null ? (
                    <span className="inline-block h-10 w-12 animate-pulse rounded-lg bg-slate-100" />
                  ) : (
                    assignmentCount
                  )}
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Total assignments you've created
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5h6M9 9h6M9 13h4m-7 7h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z"
                  />
                </svg>
              </div>
            </div>

            <a
              href="/faculty/assignments"
              className="mt-5 inline-flex text-sm font-semibold text-indigo-600 transition hover:text-indigo-700"
            >
              Manage assignments →
            </a>
          </div>

          {/* Students */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Total Students
                </p>

                <p className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
                  {studentCount === null ? (
                    <span className="inline-block h-10 w-12 animate-pulse rounded-lg bg-slate-100" />
                  ) : (
                    studentCount
                  )}
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Students available in your portal
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2m6-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm8-1a3 3 0 1 0 0-6m4 17v-2a4 4 0 0 0-3-3.87"
                  />
                </svg>
              </div>
            </div>

            <a
              href="/faculty/attendance"
              className="mt-5 inline-flex text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
            >
              Manage attendance →
            </a>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-slate-900">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Jump directly to the tools you use most.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <a
            href="/faculty/assignments"
            className="group flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-indigo-200 hover:bg-indigo-50/50"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 5v14m-7-7h14"
                />
              </svg>
            </div>

            <div className="min-w-0">
              <p className="font-semibold text-slate-900">
                Create Assignment
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Create and manage assignments
              </p>
            </div>

            <span className="ml-auto text-slate-400 transition group-hover:translate-x-1 group-hover:text-indigo-600">
              →
            </span>
          </a>

          <a
            href="/faculty/attendance"
            className="group flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-emerald-200 hover:bg-emerald-50/50"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m5 12 4 4L19 6"
                />
              </svg>
            </div>

            <div className="min-w-0">
              <p className="font-semibold text-slate-900">
                Mark Attendance
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Record attendance for students
              </p>
            </div>

            <span className="ml-auto text-slate-400 transition group-hover:translate-x-1 group-hover:text-emerald-600">
              →
            </span>
          </a>
        </div>
      </section>

      {/* Footer hint */}
      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-5">
        <p className="text-sm font-semibold text-slate-700">
          Keep your classes organized
        </p>

        <p className="mt-1 text-sm text-slate-500">
          Use assignments and attendance tools to keep your student
          activity up to date.
        </p>
      </div>
    </div>
  );
}