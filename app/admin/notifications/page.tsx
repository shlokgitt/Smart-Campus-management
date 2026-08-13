"use client";

import { useState } from "react";

const notificationTypes = [
  {
    value: "system",
    label: "System",
    description: "General campus announcement",
  },
  {
    value: "assignment",
    label: "Assignment",
    description: "Assignment related update",
  },
  {
    value: "attendance",
    label: "Attendance",
    description: "Attendance related update",
  },
  {
    value: "event",
    label: "Event",
    description: "Campus event announcement",
  },
  {
    value: "placement",
    label: "Placement",
    description: "Placement related update",
  },
];

export default function AdminNotificationsPage() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("system");
  const [audience, setAudience] = useState("all");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await fetch("/api/admin/notifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          message,
          type,
          audience,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || "Failed to send notification."
        );
      }

      setSuccess(
        `Notification sent successfully to ${data.count} user${
          data.count !== 1 ? "s" : ""
        }.`
      );

      setTitle("");
      setMessage("");
      setType("system");
      setAudience("all");
    } catch (err: any) {
      setError(
        err.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600">
          Administration
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Notifications
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Send important announcements and updates to students and
          faculty across the campus.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">

        {/* Form */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

          <div className="mb-6">
            <h2 className="text-base font-semibold text-slate-900">
              Create notification
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Write an announcement and choose who should receive it.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                Title
              </label>

              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                maxLength={100}
                placeholder="e.g. Mid-Semester Examination Schedule"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              />

              <p className="mt-1 text-right text-[11px] text-slate-400">
                {title.length}/100
              </p>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                Message
              </label>

              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                maxLength={500}
                placeholder="Write the announcement students or faculty should receive..."
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              />

              <p className="mt-1 text-right text-[11px] text-slate-400">
                {message.length}/500
              </p>
            </div>

            {/* Type + Audience */}
            <div className="grid gap-5 sm:grid-cols-2">

              {/* Type */}
              <div>
                <label
                  htmlFor="type"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500"
                >
                  Notification type
                </label>

                <select
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                >
                  {notificationTypes.map((item) => (
                    <option
                      key={item.value}
                      value={item.value}
                    >
                      {item.label}
                    </option>
                  ))}
                </select>

                <p className="mt-1 text-xs text-slate-400">
                  {
                    notificationTypes.find(
                      (item) => item.value === type
                    )?.description
                  }
                </p>
              </div>

              {/* Audience */}
              <div>
                <label
                  htmlFor="audience"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500"
                >
                  Send to
                </label>

                <select
                  id="audience"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="all">
                    Everyone
                  </option>

                  <option value="student">
                    Students
                  </option>

                  <option value="faculty">
                    Faculty
                  </option>
                </select>

                <p className="mt-1 text-xs text-slate-400">
                  Choose which users receive this notification.
                </p>
              </div>

            </div>

            {/* Success */}
            {success && (
              <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">

                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                  ✓
                </div>

                <div>
                  <p className="text-sm font-semibold text-emerald-800">
                    Notification sent
                  </p>

                  <p className="mt-0.5 text-xs text-emerald-700">
                    {success}
                  </p>
                </div>

              </div>
            )}

            {/* Error */}
            {error && (
              <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">

                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-700">
                  !
                </div>

                <div>
                  <p className="text-sm font-semibold text-red-800">
                    Unable to send
                  </p>

                  <p className="mt-0.5 text-xs text-red-700">
                    {error}
                  </p>
                </div>

              </div>
            )}

            {/* Submit */}
            <div className="flex justify-end border-t border-slate-100 pt-5">

              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Sending..."
                  : "Send Notification →"}
              </button>

            </div>

          </form>
        </div>

        {/* Preview */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 px-6 py-5">
            <h2 className="text-base font-semibold text-slate-900">
              Preview
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              This is how the notification will look.
            </p>
          </div>

          <div className="p-6">

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

              <div className="flex items-start gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-sm font-bold text-indigo-600">
                  ●
                </div>

                <div className="min-w-0">

                  <div className="flex items-start justify-between gap-3">

                    <h3 className="text-sm font-semibold text-slate-900">
                      {title || "Notification title"}
                    </h3>

                    <span className="shrink-0 text-[10px] text-slate-400">
                      Now
                    </span>

                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {message ||
                      "Your notification message will appear here."}
                  </p>

                  <span className="mt-3 inline-flex rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold capitalize text-slate-500">
                    {type}
                  </span>

                </div>

              </div>

            </div>

            <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4">

              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Recipients
              </p>

              <p className="mt-1 text-sm font-semibold capitalize text-slate-900">
                {audience === "all"
                  ? "All students & faculty"
                  : audience === "student"
                  ? "Students only"
                  : "Faculty only"}
              </p>

            </div>

          </div>
        </div>

      </div>

      {/* Information */}
      <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-sm">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-indigo-300">
              Campus communication
            </p>

            <h2 className="mt-2 text-lg font-semibold">
              Keep everyone on the same page.
            </h2>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-300">
              Notifications are delivered directly to the selected users
              through their Smart Campus portal.
            </p>
          </div>

          <div className="shrink-0 rounded-xl bg-white/10 px-4 py-3 text-xs font-medium text-slate-200">
            Admin control
          </div>

        </div>

      </div>

    </div>
  );
}