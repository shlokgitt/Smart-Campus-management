"use client";

import { useEffect, useState } from "react";

interface AttendanceRecord {
  _id: string;
  subject: string;
  date: string;
  status: string;
}

interface AttendanceData {
  percentage: number;
  present: number;
  total: number;
  records: AttendanceRecord[];
}

export default function AttendancePage() {
  const [data, setData] = useState<AttendanceData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/student/attendance")
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then(setData)
      .catch(() => setError(true));
  }, []);

  if (error) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 p-6">
        <h2 className="font-semibold text-red-700">
          Unable to load attendance
        </h2>
        <p className="mt-1 text-sm text-red-500">
          Please refresh the page and try again.
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="space-y-5">
        <div className="h-28 animate-pulse rounded-3xl bg-slate-200" />
        <div className="h-32 animate-pulse rounded-2xl bg-slate-200" />
        <div className="h-72 animate-pulse rounded-2xl bg-slate-200" />
      </div>
    );
  }

  const percentage = Number(data.percentage) || 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm font-medium text-indigo-600">
          Academic overview
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          Attendance
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Keep track of your class attendance and stay above the required
          percentage.
        </p>
      </div>

      {/* Main attendance card */}
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="grid lg:grid-cols-[280px_1fr]">
          {/* Percentage */}
          <div className="flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-violet-700 p-8 text-white">
            <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-[14px] border-white/20">
              <div
                className="absolute inset-[-14px] rounded-full border-[14px] border-transparent border-t-white border-r-white"
                style={{
                  transform: `rotate(${percentage * 1.8 - 45}deg)`,
                }}
              />

              <div className="text-center">
                <p className="text-4xl font-bold">{percentage}%</p>
                <p className="mt-1 text-xs font-medium text-indigo-100">
                  Overall
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm font-semibold">
              {percentage >= 75
                ? "Attendance is on track"
                : "Attendance needs attention"}
            </p>
          </div>

          {/* Stats */}
          <div className="p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900">
              Attendance summary
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your attendance across all recorded classes.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-emerald-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                  Present
                </p>

                <p className="mt-2 text-3xl font-bold text-emerald-700">
                  {data.present}
                </p>

                <p className="mt-1 text-xs text-emerald-600">
                  Classes attended
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Total
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {data.total}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Classes recorded
                </p>
              </div>

              <div className="rounded-2xl bg-amber-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">
                  Missed
                </p>

                <p className="mt-2 text-3xl font-bold text-amber-700">
                  {Math.max(data.total - data.present, 0)}
                </p>

                <p className="mt-1 text-xs text-amber-600">
                  Classes missed
                </p>
              </div>
            </div>

            {/* Progress */}
            <div className="mt-8">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700">
                  Attendance progress
                </span>

                <span className="font-semibold text-indigo-600">
                  {percentage}%
                </span>
              </div>

              <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-indigo-600 transition-all"
                  style={{
                    width: `${Math.min(Math.max(percentage, 0), 100)}%`,
                  }}
                />
              </div>

              <p className="mt-2 text-xs text-slate-400">
                Recommended minimum: 75%
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Records */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-6">
          <h2 className="font-bold text-slate-900">
            Attendance history
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Recent attendance records.
          </p>
        </div>

        {data.records.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
              ✓
            </div>

            <h3 className="mt-4 font-semibold text-slate-800">
              No attendance records
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Attendance records will appear here once classes are recorded.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70 text-left">
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Subject
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Date
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {data.records.map((record) => {
                    const present =
                      record.status.toLowerCase() === "present";

                    return (
                      <tr
                        key={record._id}
                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60"
                      >
                        <td className="px-6 py-4">
                          <p className="text-sm font-semibold text-slate-800">
                            {record.subject}
                          </p>
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-500">
                          {new Date(record.date).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                              present
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-red-50 text-red-700"
                            }`}
                          >
                            {record.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile */}
            <div className="divide-y divide-slate-100 md:hidden">
              {data.records.map((record) => {
                const present =
                  record.status.toLowerCase() === "present";

                return (
                  <div key={record._id} className="p-5">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-slate-800">
                        {record.subject}
                      </p>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          present
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {record.status}
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-slate-400">
                      {new Date(record.date).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </section>
    </div>
  );
}