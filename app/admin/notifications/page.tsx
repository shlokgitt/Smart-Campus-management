"use client";

export default function AdminNotificationsPage() {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-indigo-600">
            Stay informed
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Notifications
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage important updates and announcements across Smart Campus.
          </p>
        </div>

        <div className="rounded-full bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-700">
          0 notifications
        </div>
      </div>

      {/* Main Card */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-100 px-6 py-5">
          <h2 className="text-base font-semibold text-slate-900">
            Recent notifications
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Latest announcements and system updates.
          </p>
        </div>

        {/* Empty State */}
        <div className="flex min-h-[380px] flex-col items-center justify-center px-6 py-12 text-center">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-2xl text-indigo-600">
            ●
          </div>

          <h3 className="mt-5 text-lg font-semibold text-slate-900">
            No notifications yet
          </h3>

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
            When announcements or important campus updates are created,
            they will appear here.
          </p>

        </div>
      </div>

      {/* Information Card */}
      <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-sm">
        <h2 className="font-semibold">
          Campus communication
        </h2>

        <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-300">
          Notifications will allow administrators to communicate important
          academic and campus updates to students and faculty.
        </p>
      </div>

    </div>
  );
}