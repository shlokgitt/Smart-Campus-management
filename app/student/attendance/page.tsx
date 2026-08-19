"use client";

import { useCallback, useEffect, useState } from "react";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadAttendance = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await fetch("/api/student/attendance");

      if (!response.ok) {
        throw new Error("Failed to load attendance");
      }

      const result = await response.json();

      if (!result || typeof result !== "object") {
        throw new Error("Invalid attendance response");
      }

      setData({
        percentage: Number(result.percentage) || 0,
        present: Number(result.present) || 0,
        total: Number(result.total) || 0,
        records: Array.isArray(result.records) ? result.records : [],
      });
    } catch (err) {
      console.error("Attendance loading error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAttendance();
  }, [loadAttendance]);

  if (loading) {
    return (
      <div className="space-y-5">
        <div className="h-28 animate-pulse rounded-3xl bg-slate-200" />
        <div className="h-32 animate-pulse rounded-2xl bg-slate-200" />
        <div className="h-72 animate-pulse rounded-2xl bg-slate-200" />
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
            Unable to load attendance
          </h2>

          <p className="mt-1 text-sm leading-6 text-red-500">
            We couldn't retrieve your attendance information right now.
          </p>

          <button
            type="button"
            onClick={loadAttendance}
            className="mt-5 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
        <h2 className="font-semibold text-slate-800">
          Attendance information unavailable
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          No attendance data could be loaded.
        </p>

        <button
          type="button"
          onClick={loadAttendance}
          className="mt-5 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Try again
        </button>
      </div>
    );
  }

  const percentage = Math.min(
    100,
    Math.max(0, Number(data.percentage) || 0)
  );

  const hasRecords = data.records.length > 0;

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
                <p className="text-4xl font-bold">
                  {percentage.toFixed(1)}%
                </p>

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

          {/* Summary */}
          <div className="p-6 sm:p-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Attendance summary
              </p>

              <h2 className="mt-1 text-xl font-bold text-slate-900">
                Your attendance record
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Review your attendance history and keep track of your
                attendance percentage.
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
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
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Total
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {data.total}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Classes recorded
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Records */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-5">
          <h2 className="font-bold text-slate-900">
            Attendance history
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your recently recorded attendance.
          </p>
        </div>

        {!hasRecords ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-lg text-slate-400">
              ✓
            </div>

            <h3 className="mt-4 font-semibold text-slate-800">
              No attendance records yet
            </h3>

            <p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-slate-500">
              Your attendance records will appear here once your faculty
              starts marking attendance.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {data.records.map((record) => {
              const recordDate = new Date(record.date);

              const isPresent =
                record.status.toLowerCase() === "present";

              return (
                <div
                  key={record._id}
                  className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
                >
                  <div>
                    <h3 className="font-semibold text-slate-800">
                      {record.subject || "Subject unavailable"}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {Number.isNaN(recordDate.getTime())
                        ? "Date unavailable"
                        : recordDate.toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                    </p>
                  </div>

                  <span
                    className={`w-fit rounded-full px-3 py-1.5 text-xs font-semibold ${
                      isPresent
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {record.status || "Unknown"}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
} 