"use client";

import { useCallback, useEffect, useState } from "react";

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

  const loadProfile = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await fetch("/api/student/profile");

      if (!response.ok) {
        throw new Error("Failed to load profile");
      }

      const data = await response.json();

      if (!data || typeof data !== "object") {
        throw new Error("Invalid profile response");
      }

      setProfile(data);
    } catch (err) {
      console.error("Profile loading error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-28 animate-pulse rounded-3xl bg-slate-200" />
        <div className="h-56 animate-pulse rounded-3xl bg-slate-200" />
        <div className="h-64 animate-pulse rounded-2xl bg-slate-200" />
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
            Unable to load profile
          </h2>

          <p className="mt-1 text-sm leading-6 text-red-500">
            We couldn't retrieve your profile information right now.
          </p>

          <button
            type="button"
            onClick={loadProfile}
            className="mt-5 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
          ?
        </div>

        <h2 className="mt-4 font-semibold text-slate-800">
          Profile information unavailable
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          We couldn't find your profile information.
        </p>

        <button
          type="button"
          onClick={loadProfile}
          className="mt-5 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Try again
        </button>
      </div>
    );
  }

  const initials =
    profile.name
      ?.split(" ")
      .filter(Boolean)
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

            <p className="mt-1 break-all text-sm text-indigo-100">
              {profile.email || "No email available"}
            </p>

            <span className="mt-4 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
              {profile.role || "Student"}
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

      <p className="mt-2 break-words text-sm font-semibold text-slate-800">
        {value || "Not available"}
      </p>
    </div>
  );
}