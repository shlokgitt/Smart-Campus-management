"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Unable to create your account.");
        setLoading(false);
        return;
      }

      setSuccess("Account created successfully. Signing you in...");

      const loginResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (loginResult?.error) {
        router.push("/login");
        return;
      }

      router.push("/student");
    } catch (err) {
      console.error("Signup error:", err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  async function handleGoogleSignup() {
    setGoogleLoading(true);
    setError("");

    await signIn("google", {
      callbackUrl: "/student",
    });
  }

  return (
    <main className="min-h-screen bg-[#eeeae2] text-[#181816]">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* =========================
            LEFT PANEL
        ========================== */}
        <section className="hidden bg-[#171715] lg:flex lg:min-h-screen lg:flex-col">

          {/* Brand */}
          <div className="p-12 xl:p-16">
            <a href="/" className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center border border-[#b49a6a] text-lg font-semibold text-[#d0b47a]">
                S
              </div>

              <div>
                <p className="font-serif text-lg text-[#f1ede4]">
                  Smart Campus
                </p>

                <p className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-[#8f897e]">
                  Management System
                </p>
              </div>
            </a>
          </div>

          {/* Main copy */}
          <div className="flex flex-1 items-center px-12 pb-20 xl:px-16">
            <div className="max-w-lg">

              <div className="mb-6 h-px w-12 bg-[#b49a6a]" />

              <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[#a99572]">
                Campus Portal
              </p>

              <h1 className="font-serif text-5xl leading-tight text-[#f1ede4] xl:text-6xl">
                Your campus.
                <br />
                One place.
              </h1>

              <p className="mt-6 max-w-md text-sm leading-7 text-[#a7a197]">
                Create your Smart Campus account and keep your academic
                life organized from one place.
              </p>

              <div className="mt-10 space-y-4 text-sm text-[#8f897e]">
                <div className="flex items-center gap-3">
                  <span className="h-px w-6 bg-[#b49a6a]" />
                  Attendance & academics
                </div>

                <div className="flex items-center gap-3">
                  <span className="h-px w-6 bg-[#b49a6a]" />
                  Assignments & notifications
                </div>

                <div className="flex items-center gap-3">
                  <span className="h-px w-6 bg-[#b49a6a]" />
                  One secure campus account
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-[#302f2b] px-12 py-6 xl:px-16">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#6f6b63]">
              Smart Campus Management System
            </p>
          </div>
        </section>

        {/* =========================
            RIGHT PANEL
        ========================== */}
        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">

          <div className="w-full max-w-md">

            {/* Mobile brand */}
            <div className="mb-10 lg:hidden">
              <a href="/" className="inline-flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center bg-[#171715] font-serif text-lg font-semibold text-[#d0b47a]">
                  S
                </div>

                <div>
                  <p className="font-serif text-lg text-[#181816]">
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
                Create account
              </p>

              <h2 className="font-serif text-4xl leading-tight text-[#181816]">
                Join Smart Campus
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#706b62]">
                Create your account to access the campus portal.
              </p>

            </div>

            {/* Form Card */}
            <div className="border border-[#d2cabc] bg-[#f8f5ee] p-6 shadow-[0_12px_35px_rgba(30,26,20,0.07)] sm:p-8">

              <form
                onSubmit={handleSignup}
                className="space-y-5"
              >

                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[#4e4940]"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                    placeholder="Your full name"
                    className="w-full border border-[#cbc3b4] bg-[#fffdf8] px-4 py-3 text-sm text-[#181816] outline-none transition placeholder:text-[#aaa398] focus:border-[#8f7244] focus:ring-1 focus:ring-[#8f7244]"
                  />
                </div>

                {/* Email */}
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
                    className="w-full border border-[#cbc3b4] bg-[#fffdf8] px-4 py-3 text-sm text-[#181816] outline-none transition placeholder:text-[#aaa398] focus:border-[#8f7244] focus:ring-1 focus:ring-[#8f7244]"
                  />
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[#4e4940]"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="new-password"
                      placeholder="At least 6 characters"
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

                {/* Create Account */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#181816] px-5 py-3 text-sm font-semibold text-[#f5f0e6] transition hover:bg-[#292824] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "Creating account..."
                    : "Create Account"}
                </button>

                {/* Divider */}
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-[#d2cabc]" />

                  <span className="text-[10px] uppercase tracking-[0.15em] text-[#9a9184]">
                    Or
                  </span>

                  <div className="h-px flex-1 bg-[#d2cabc]" />
                </div>

                {/* Google */}
                <button
                  type="button"
                  onClick={handleGoogleSignup}
                  disabled={googleLoading}
                  className="flex w-full items-center justify-center gap-3 border border-[#cbc3b4] bg-[#fffdf8] px-5 py-3 text-sm font-semibold text-[#3f3b34] transition hover:bg-[#f3efe6] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="text-base font-bold">
                    G
                  </span>

                  {googleLoading
                    ? "Connecting..."
                    : "Continue with Google"}
                </button>

              </form>
            </div>

            {/* Login */}
            <p className="mt-6 text-center text-sm text-[#756d61]">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-semibold text-[#8b7042] transition hover:text-[#5f4b2d]"
              >
                Log in
              </a>
            </p>

            {/* Back */}
            <div className="mt-4 text-center">
              <a
                href="/"
                className="text-sm text-[#756d61] transition hover:text-[#8b7042]"
              >
                ← Back to Smart Campus
              </a>
            </div>

            <p className="mt-8 text-center text-[10px] uppercase tracking-[0.15em] text-[#a29a8c]">
              Secure campus registration
            </p>

          </div>
        </section>
      </div>
    </main>
  );
}