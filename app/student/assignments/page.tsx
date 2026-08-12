"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Assignment {
  _id: string;
  title: string;
  deadline: string;
  submitted: boolean;
}

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/student/assignments")
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data) => {
        setAssignments(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-28 animate-pulse rounded-3xl bg-slate-200" />

        <div className="grid gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-28 animate-pulse rounded-2xl bg-slate-200"
            />
          ))}
        </div>

        <div className="h-72 animate-pulse rounded-2xl bg-slate-200" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 p-6">
        <h2 className="font-semibold text-red-700">
          Unable to load assignments
        </h2>

        <p className="mt-1 text-sm text-red-500">
          Please refresh the page and try again.
        </p>
      </div>
    );
  }

  const pending = assignments.filter((a) => !a.submitted).length;
  const submitted = assignments.filter((a) => a.submitted).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm font-medium text-indigo-600">
          Academic work
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          Assignments
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          View your assignments, deadlines and submission status.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Total
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {assignments.length}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Assignments
          </p>
        </div>

        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">
            Pending
          </p>

          <p className="mt-2 text-3xl font-bold text-amber-700">
            {pending}
          </p>

          <p className="mt-1 text-xs text-amber-600">
            Need your attention
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
            Submitted
          </p>

          <p className="mt-2 text-3xl font-bold text-emerald-700">
            {submitted}
          </p>

          <p className="mt-1 text-xs text-emerald-600">
            Completed
          </p>
        </div>
      </div>

      {/* Assignment list */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-2 border-b border-slate-100 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-bold text-slate-900">
              All assignments
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Select an assignment to view or submit your work.
            </p>
          </div>

          <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
            {assignments.length} total
          </span>
        </div>

        {assignments.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
              ▣
            </div>

            <h3 className="mt-4 font-semibold text-slate-800">
              No assignments yet
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              New assignments from your faculty will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {assignments.map((assignment) => {
              const deadline = new Date(assignment.deadline);
              const overdue =
                !assignment.submitted && deadline.getTime() < Date.now();

              return (
                <Link
                  key={assignment._id}
                  href={`/student/assignments/${assignment._id}`}
                  className="group block p-5 transition hover:bg-slate-50 sm:p-6"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-start gap-4">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
                          assignment.submitted
                            ? "bg-emerald-50 text-emerald-600"
                            : overdue
                            ? "bg-red-50 text-red-600"
                            : "bg-indigo-50 text-indigo-600"
                        }`}
                      >
                        {assignment.submitted
                          ? "✓"
                          : overdue
                          ? "!"
                          : "▣"}
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate font-semibold text-slate-800 group-hover:text-indigo-700">
                          {assignment.title}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          Due{" "}
                          {deadline.toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pl-15 sm:pl-0">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                          assignment.submitted
                            ? "bg-emerald-50 text-emerald-700"
                            : overdue
                            ? "bg-red-50 text-red-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {assignment.submitted
                          ? "Submitted"
                          : overdue
                          ? "Overdue"
                          : "Pending"}
                      </span>

                      <span className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-indigo-500">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}