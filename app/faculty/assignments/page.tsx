"use client";

import { useEffect, useState } from "react";

export default function FacultyAssignmentsPage() {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [deadline, setDeadline] = useState("");

  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function loadAssignments() {
    try {
      setLoading(true);

      const res = await fetch("/api/faculty/assignments");

      if (!res.ok) {
        throw new Error("Failed to load assignments");
      }

      const data = await res.json();

      setAssignments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load assignments:", error);
      setAssignments([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAssignments();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();

    setSubmitting(true);
    setStatus("");

    try {
      const res = await fetch("/api/faculty/assignments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          subject,
          deadline,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create assignment");
      }

      setStatus("success");

      setTitle("");
      setDescription("");
      setSubject("");
      setDeadline("");

      await loadAssignments();

      setTimeout(() => {
        setStatus("");
      }, 4000);
    } catch (error) {
      console.error("Failed to create assignment:", error);
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  }

  function formatDeadline(date: string) {
    const deadlineDate = new Date(date);

    if (Number.isNaN(deadlineDate.getTime())) {
      return "Invalid deadline";
    }

    return deadlineDate.toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  function isOverdue(date: string) {
    return new Date(date).getTime() < Date.now();
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
              Assignments
            </h1>

            <p className="mt-1 max-w-2xl text-sm text-slate-500">
              Create assignments for your students and keep track of
              everything you've published.
            </p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
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
                d="M9 5h6M9 9h6M9 13h4m-7 7h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Create Assignment */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 bg-slate-50/70 px-6 py-5 sm:px-7">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
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

            <div>
              <h2 className="font-bold text-slate-900">
                Create New Assignment
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Add the assignment details your students need.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleCreate} className="p-6 sm:p-7">
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Title */}
            <div className="sm:col-span-2">
              <label
                htmlFor="assignment-title"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Assignment Title
              </label>

              <input
                id="assignment-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                placeholder="e.g. Sorting Algorithms Report"
              />
            </div>

            {/* Subject */}
            <div>
              <label
                htmlFor="assignment-subject"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Subject
              </label>

              <input
                id="assignment-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                placeholder="e.g. Data Structures"
              />
            </div>

            {/* Deadline */}
            <div>
              <label
                htmlFor="assignment-deadline"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Submission Deadline
              </label>

              <input
                id="assignment-deadline"
                type="datetime-local"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
              />
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label
                htmlFor="assignment-description"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Description
              </label>

              <textarea
                id="assignment-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                placeholder="Explain what students need to complete..."
              />

              <p className="mt-2 text-xs text-slate-400">
                Keep the instructions clear and easy for students to
                understand.
              </p>
            </div>
          </div>

          {/* Status */}
          {status === "success" && (
            <div className="mt-5 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                ✓
              </span>

              <div>
                <p className="text-sm font-semibold text-emerald-800">
                  Assignment created successfully
                </p>

                <p className="mt-0.5 text-xs text-emerald-600">
                  Your assignment has been added to the list below.
                </p>
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="mt-5 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-700">
                !
              </span>

              <div>
                <p className="text-sm font-semibold text-red-800">
                  Could not create assignment
                </p>

                <p className="mt-0.5 text-xs text-red-600">
                  Please check the details and try again.
                </p>
              </div>
            </div>
          )}

          {/* Submit */}
          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => {
                setTitle("");
                setDescription("");
                setSubject("");
                setDeadline("");
                setStatus("");
              }}
              disabled={submitting}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Clear
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Creating Assignment..." : "Create Assignment"}
            </button>
          </div>
        </form>
      </section>

      {/* Assignment List */}
      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              My Assignments
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {loading
                ? "Loading your assignments..."
                : `${assignments.length} assignment${
                    assignments.length === 1 ? "" : "s"
                  } published`}
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {loading ? (
            <div className="divide-y divide-slate-100">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-6">
                  <div className="h-5 w-56 animate-pulse rounded bg-slate-100" />
                  <div className="mt-3 h-4 w-32 animate-pulse rounded bg-slate-100" />
                  <div className="mt-3 h-4 w-44 animate-pulse rounded bg-slate-100" />
                </div>
              ))}
            </div>
          ) : assignments.length === 0 ? (
            <div className="px-6 py-14 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="h-7 w-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5h6M9 9h6M9 13h4m-7 7h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z"
                  />
                </svg>
              </div>

              <h3 className="mt-4 text-sm font-semibold text-slate-800">
                No assignments yet
              </h3>

              <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
                Create your first assignment using the form above.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {assignments.map((a: any) => {
                const overdue = isOverdue(a.deadline);

                return (
                  <div
                    key={a._id}
                    className="group p-5 transition hover:bg-slate-50 sm:p-6"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold text-slate-900">
                            {a.title}
                          </h3>

                          {a.subject && (
                            <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600">
                              {a.subject}
                            </span>
                          )}
                        </div>

                        {a.description && (
                          <p className="mt-2 max-w-2xl truncate text-sm text-slate-500">
                            {a.description}
                          </p>
                        )}
                      </div>

                      <div className="flex shrink-0 items-center gap-3">
                        <div
                          className={`rounded-xl px-3 py-2 text-right ${
                            overdue
                              ? "bg-red-50"
                              : "bg-slate-50"
                          }`}
                        >
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                            Deadline
                          </p>

                          <p
                            className={`mt-0.5 text-xs font-semibold ${
                              overdue
                                ? "text-red-600"
                                : "text-slate-700"
                            }`}
                          >
                            {formatDeadline(a.deadline)}
                          </p>
                        </div>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            overdue
                              ? "bg-red-50 text-red-600"
                              : "bg-emerald-50 text-emerald-700"
                          }`}
                        >
                          {overdue ? "Overdue" : "Active"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}