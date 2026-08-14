"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setLoading(false);
        return;
      }

      setMessage(
        "If an account exists with this email, a password reset link has been sent."
      );
    } catch (error) {
      console.error("Forgot password error:", error);
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
            <a href="/" className="inline-flex items-center gap-3">
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
              Forgot your password?
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#706b62]">
              Enter your email address and we'll help you reset your password.
            </p>
          </div>

          {/* Card */}
          <div className="border border-[#d2cabc] bg-[#f8f5ee] p-6 shadow-[0_12px_35px_rgba(30,26,20,0.07)] sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[#4e4940]"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full border border-[#cbc3b4] bg-[#fffdf8] px-4 py-3 text-sm outline-none transition placeholder:text-[#aaa398] focus:border-[#8f7244] focus:ring-1 focus:ring-[#8f7244]"
                />
              </div>

              {error && (
                <div className="border border-red-200 bg-red-50 px-4 py-3">
                  <p className="text-sm font-medium text-red-700">{error}</p>
                </div>
              )}

              {message && (
                <div className="border border-[#c8b995] bg-[#f2ecdc] px-4 py-3">
                  <p className="text-sm font-medium text-[#6f5830]">
                    {message}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#181816] px-5 py-3 text-sm font-semibold text-[#f5f0e6] transition hover:bg-[#292824] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          </div>

          {/* Back to login */}
          <div className="mt-6 text-center">
            <a
              href="/login"
              className="text-sm font-medium text-[#8b7042] transition hover:text-[#5f4b2d]"
            >
              ← Back to login
            </a>
          </div>

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