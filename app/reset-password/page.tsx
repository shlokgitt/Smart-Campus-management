"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Check reset link
    if (!token || !email) {
      setError("This password reset link is invalid or incomplete.");
      return;
    }

    // Password length
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    // Password confirmation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(
          data.error || "Unable to reset your password. Please try again."
        );
        return;
      }

      setSuccess(
        "Password reset successfully. Redirecting you to login..."
      );

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      console.error("Reset password error:", error);

      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#eeeae2] px-5 py-10 text-[#181816] sm:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center">
        <div className="w-full">

          {/* Brand */}
          <div className="mb-10">
            <a
              href="/"
              className="inline-flex items-center gap-3"
            >
              <div className="h-11 w-11 overflow-hidden rounded-xl bg-[#171715]">
                <img
                  src="/icon.png"
                  alt="Smart Campus"
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <p className="text-lg font-semibold text-[#181816]">
                  Smart Campus
                </p>

                <p className="text-[10px] uppercase tracking-[0.18em] text-[#81796c]">
                  Management System
                </p>
              </div>
            </a>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[#8b7042]">
              Account recovery
            </p>

            <h1 className="text-4xl font-semibold leading-tight">
              Create a new password
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#706b62]">
              Choose a new password for your Smart Campus account.
            </p>
          </div>

          {/* Card */}
          <div className="border border-[#d2cabc] bg-[#f8f5ee] p-6 shadow-[0_12px_35px_rgba(30,26,20,0.07)] sm:p-8">
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* New Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[#4e4940]"
                >
                  New Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    autoComplete="new-password"
                    placeholder="At least 8 characters"
                    className="w-full border border-[#cbc3b4] bg-[#fffdf8] px-4 py-3 pr-16 text-sm text-[#181816] outline-none transition placeholder:text-[#aaa398] focus:border-[#8f7244] focus:ring-1 focus:ring-[#8f7244]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((current) => !current)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-[#766b5b] hover:text-[#181816]"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[#4e4940]"
                >
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    required
                    minLength={8}
                    autoComplete="new-password"
                    placeholder="Re-enter your password"
                    className="w-full border border-[#cbc3b4] bg-[#fffdf8] px-4 py-3 pr-16 text-sm text-[#181816] outline-none transition placeholder:text-[#aaa398] focus:border-[#8f7244] focus:ring-1 focus:ring-[#8f7244]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (current) => !current
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-[#766b5b] hover:text-[#181816]"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="border border-red-200 bg-red-50 px-4 py-3">
                  <p className="text-sm font-medium text-red-700">
                    {error}
                  </p>
                </div>
              )}

              {/* Success */}
              {success && (
                <div className="border border-[#c8b995] bg-[#f2ecdc] px-4 py-3">
                  <p className="text-sm font-medium text-[#6f5830]">
                    {success}
                  </p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#181816] px-5 py-3 text-sm font-semibold text-[#f5f0e6] transition hover:bg-[#292824] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Updating password..."
                  : "Reset Password"}
              </button>
            </form>
          </div>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <a
              href="/login"
              className="text-sm font-medium text-[#8b7042] transition hover:text-[#5f4b2d]"
            >
              ← Back to login
            </a>
          </div>

          {/* Back Home */}
          <div className="mt-4 text-center">
            <a
              href="/"
              className="text-sm text-[#756d61] transition hover:text-[#8b7042]"
            >
              Back to Smart Campus
            </a>
          </div>

        </div>
      </div>
    </main>
  );
}

/*
 * Next.js requires useSearchParams() to be rendered
 * inside a Suspense boundary during production builds.
 */
export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#eeeae2]">
          <p className="text-sm text-[#706b62]">
            Loading password reset...
          </p>
        </main>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}