"use client";

import { useEffect, useState } from "react";

interface UserProfile {
  name?: string;
  email?: string;
  role?: string;
  enrollmentNumber?: string;
  department?: string;
  course?: string;
  year?: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/student/profile")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setProfile(data);
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
        <div className="h-56 animate-pulse rounded-3xl bg-slate-200" />
        <div className="h-64 animate-pulse rounded-2xl bg-slate-200" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 p-6">
        <h2 className="font-semibold text-red-700">
          Unable to load profile
        </h2>
        <p className="mt-1 text-sm text-red-500">
          Please refresh the page and try again.
        </p>
      </div>
    );
  }

  const initials =
    profile.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "ST";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm font-medium text-indigo-600">
          Account
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          My Profile
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          View your personal and academic information.
        </p>
      </div>

      {/* Profile hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 p-6 text-white shadow-lg shadow-indigo-100 sm:p-8">
        <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-white/15 text-3xl font-bold ring-1 ring-white/20 backdrop-blur">
            {initials}
          </div>

          <div>
            <p className="text-sm font-medium text-indigo-100">
              Student account
            </p>

            <h2 className="mt-1 text-2xl font-bold">
              {profile.name || "Student"}
            </h2>

            <p className="mt-1 text-sm text-indigo-100">
              {profile.email || "No email available"}
            </p>

            <span className="mt-4 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
              Student
            </span>
          </div>
        </div>

        <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-white/10" />
        <div className="absolute -bottom-28 right-24 h-64 w-64 rounded-full bg-white/5" />
      </section>

      {/* Academic information */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-6">
          <h2 className="font-bold text-slate-900">
            Academic information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your registered academic details.
          </p>
        </div>

        <div className="grid gap-px bg-slate-100 sm:grid-cols-2">
          <ProfileItem
            label="Enrollment number"
            value={profile.enrollmentNumber}
          />

          <ProfileItem
            label="Department"
            value={profile.department}
          />

          <ProfileItem
            label="Course"
            value={profile.course}
          />

          <ProfileItem
            label="Year"
            value={profile.year}
          />

          <ProfileItem
            label="Email"
            value={profile.email}
          />

          <ProfileItem
            label="Role"
            value={profile.role || "Student"}
          />
        </div>
      </section>

      {/* Account notice */}
      <section className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5 sm:p-6">
        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 font-bold text-indigo-600">
            i
          </div>

          <div>
            <h3 className="text-sm font-bold text-indigo-900">
              Need to update your information?
            </h3>

            <p className="mt-1 text-sm leading-6 text-indigo-700">
              If any of your academic or personal information is incorrect,
              contact your college administrator to have it updated.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProfileItem({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  return (
    <div className="bg-white p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold text-slate-800">
        {value || "Not available"}
      </p>
    </div>
  );
}