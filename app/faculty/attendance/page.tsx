"use client";

import { useEffect, useState } from "react";

interface Student {
  _id: string;
  name: string;
  email: string;
}

export default function FacultyAttendancePage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [studentId, setStudentId] = useState("");
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("present");

  const [loadingStudents, setLoadingStudents] = useState(true);
  const [studentError, setStudentError] = useState(false);

  const [message, setMessage] = useState<"success" | "error" | "">("");
  const [submitting, setSubmitting] = useState(false);

  async function loadStudents() {
    try {
      setLoadingStudents(true);
      setStudentError(false);

      const res = await fetch("/api/faculty/students");

      if (!res.ok) {
        throw new Error("Failed to load students");
      }

      const data = await res.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid student data");
      }

      setStudents(data);
    } catch (error) {
      console.error("Failed to load students:", error);
      setStudentError(true);
      setStudents([]);
    } finally {
      setLoadingStudents(false);
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!studentId || !subject || !date) {
      setMessage("error");
      return;
    }

    setSubmitting(true);
    setMessage("");

    try {
      const res = await fetch("/api/faculty/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId,
          subject,
          date,
          status,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to mark attendance");
      }

      setMessage("success");

      // Keep student and date selected, but reset subject.
      setSubject("");

      setTimeout(() => {
        setMessage("");
      }, 4000);
    } catch (error) {
      console.error("Failed to mark attendance:", error);
      setMessage("error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <section>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-medium text-indigo-600">
              Faculty Portal
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
              Mark Attendance
            </h1>

            <p className="mt-1 max-w-2xl text-sm text-slate-500">
              Record attendance for your students by subject and date.
            </p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m5 12 4 4L19 6"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Attendance Card */}
      <section className="max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 bg-slate-50/70 px-6 py-5 sm:px-7">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
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

            <div>
              <h2 className="font-bold text-slate-900">
                Attendance Record
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Select a student and record their attendance.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-7">
          {/* Student */}
          <div>
            <label
              htmlFor="student"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Student
            </label>

            {loadingStudents ? (
              <div className="h-12 w-full animate-pulse rounded-xl bg-slate-100" />
            ) : studentError ? (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-4">
                <p className="text-sm font-semibold text-red-700">
                  Unable to load students
                </p>

                <p className="mt-1 text-xs text-red-600">
                  Something went wrong while loading the student list.
                </p>

                <button
                  type="button"
                  onClick={loadStudents}
                  className="mt-3 rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-700"
                >
                  Try again
                </button>
              </div>
            ) : students.length === 0 ? (
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-4">
                <p className="text-sm font-semibold text-amber-800">
                  No students available
                </p>

                <p className="mt-1 text-xs leading-5 text-amber-700">
                  There are currently no students available for attendance
                  marking.
                </p>
              </div>
            ) : (
              <>
                <select
                  id="student"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                >
                  <option value="">Select a student</option>

                  {students.map((student) => (
                    <option key={student._id} value={student._id}>
                      {student.name} ({student.email})
                    </option>
                  ))}
                </select>

                <p className="mt-2 text-xs text-slate-400">
                  {students.length} student
                  {students.length === 1 ? "" : "s"} available.
                </p>
              </>
            )}
          </div>

          {/* Subject + Date */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="subject"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Subject
              </label>

              <input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                disabled={studentError || students.length === 0}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                placeholder="e.g. Data Structures"
              />
            </div>

            <div>
              <label
                htmlFor="attendance-date"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Date
              </label>

              <input
                id="attendance-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                disabled={studentError || students.length === 0}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="block text-sm font-semibold text-slate-700">
                Attendance Status
              </label>

              <span className="text-xs text-slate-400">
                Select one
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setStatus("present")}
                disabled={studentError || students.length === 0}
                aria-pressed={status === "present"}
                className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                  status === "present"
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm"
                    : "border-slate-200 bg-white text-slate-500 hover:border-emerald-200 hover:bg-emerald-50/50"
                }`}
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full ${
                    status === "present"
                      ? "bg-emerald-100"
                      : "bg-slate-100"
                  }`}
                >
                  ✓
                </span>

                Present
              </button>

              <button
                type="button"
                onClick={() => setStatus("absent")}
                disabled={studentError || students.length === 0}
                aria-pressed={status === "absent"}
                className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                  status === "absent"
                    ? "border-red-500 bg-red-50 text-red-700 shadow-sm"
                    : "border-slate-200 bg-white text-slate-500 hover:border-red-200 hover:bg-red-50/50"
                }`}
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full ${
                    status === "absent"
                      ? "bg-red-100"
                      : "bg-slate-100"
                  }`}
                >
                  ×
                </span>

                Absent
              </button>
            </div>
          </div>

          {/* Feedback */}
          {message === "success" && (
            <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                ✓
              </span>

              <div>
                <p className="text-sm font-semibold text-emerald-800">
                  Attendance marked successfully
                </p>

                <p className="mt-0.5 text-xs text-emerald-600">
                  The attendance record has been saved.
                </p>
              </div>
            </div>
          )}

          {message === "error" && (
            <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-700">
                !
              </span>

              <div>
                <p className="text-sm font-semibold text-red-800">
                  Could not save attendance
                </p>

                <p className="mt-0.5 text-xs text-red-600">
                  Please check the details and try again.
                </p>
              </div>
            </div>
          )}

          {/* Submit */}
          <div className="border-t border-slate-100 pt-5">
            <button
              type="submit"
              disabled={
                submitting ||
                loadingStudents ||
                studentError ||
                students.length === 0
              }
              className="w-full rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Saving Attendance..." : "Mark Attendance"}
            </button>
          </div>
        </form>
      </section>

      {/* Helpful note */}
      <div className="max-w-3xl rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-5">
        <p className="text-sm font-semibold text-slate-700">
          Attendance tip
        </p>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          Make sure the selected student, subject, date, and attendance
          status are correct before saving the record.
        </p>
      </div>
    </div>
  );
}