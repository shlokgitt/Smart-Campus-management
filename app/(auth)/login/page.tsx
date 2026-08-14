"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const router = useRouter();

  // =========================
  // GOOGLE LOGIN
  // =========================
  async function handleGoogleLogin() {
    setGoogleLoading(true);
    setError("");

    try {
      await signIn("google", {
        callbackUrl: "/student",
      });
    } catch (err) {
      console.error("Google login error:", err);
      setError("Unable to connect to Google. Please try again.");
      setGoogleLoading(false);
    }
  }

  // =========================
  // EMAIL + PASSWORD LOGIN
  // =========================
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password.");
        setLoading(false);
        return;
      }

      // Get current session
      const sessionRes = await fetch("/api/auth/session");
      const session = await sessionRes.json();

      const role = session?.user?.role;

      // Role-based redirect
      if (role === "faculty") {
        router.push("/faculty");
      } else if (role === "admin") {
        router.push("/admin");
      } else {
        router.push("/student");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#eeeae2] text-[#181816]">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* ========================================= */}
        {/* LEFT PANEL */}
        {/* ========================================= */}
        <section className="hidden bg-[#171715] lg:flex lg:min-h-screen lg:flex-col">

          {/* Brand */}
          <div className="p-12 xl:p-16">
            <a
              href="/"
              className="inline-flex items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center overflow-hidden border border-[#b49a6a] bg-white">
                <img
                  src="/icon.png"
                  alt="Smart Campus"
                  className="h-full w-full object-cover"
                />
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

          {/* Main Copy */}
          <div className="flex flex-1 items-center px-12 pb-20 xl:px-16">
            <div className="max-w-lg">

              <div className="mb-6 h-px w-12 bg-[#b49a6a]" />

              <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[#a99572]">
                Campus Portal
              </p>

              <h1 className="font-serif text-5xl leading-tight text-[#f1ede4] xl:text-6xl">
                Everything your
                <br />
                campus needs.
              </h1>

              <p className="mt-6 max-w-md text-sm leading-7 text-[#a7a197]">
                A single platform for students, faculty, and
                administrators to manage everyday academic work.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-[#302f2b] px-12 py-6 xl:px-16">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#6f6b63]">
              Smart Campus Management System
            </p>
          </div>
        </section>

        {/* ========================================= */}
        {/* RIGHT PANEL */}
        {/* ========================================= */}
        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-md">

            {/* Mobile Brand */}
            <div className="mb-10 lg:hidden">
              <a
                href="/"
                className="inline-flex items-center gap-3"
              >
                <div className="flex h-11 w-11 items-center justify-center overflow-hidden bg-[#171715]">
                  <img
                    src="/icon.png"
                    alt="Smart Campus"
                    className="h-full w-full object-cover"
                  />
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
                Sign in
              </p>

              <h2 className="font-serif text-4xl leading-tight text-[#181816]">
                Welcome back
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#706b62]">
                Sign in to access your campus account.
              </p>
            </div>

            {/* Form Card */}
            <div className="border border-[#d2cabc] bg-[#f8f5ee] p-6 shadow-[0_12px_35px_rgba(30,26,20,0.07)] sm:p-8">

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* ========================================= */}
                {/* EMAIL */}
                {/* ========================================= */}
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

                {/* ========================================= */}
                {/* PASSWORD */}
                {/* ========================================= */}
                <div>

                  {/* Password label + Forgot password */}
                  <div className="mb-2 flex items-center justify-between">

                    <label
                      htmlFor="password"
                      className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#4e4940]"
                    >
                      Password
                    </label>

                    <a
                      href="/forgot-password"
                      className="text-xs font-semibold text-[#8b7042] transition hover:text-[#5f4b2d]"
                    >
                      Forgot password?
                    </a>
                  </div>

                  <div className="relative">

                    <input
                      id="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      required
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      className="w-full border border-[#cbc3b4] bg-[#fffdf8] px-4 py-3 pr-16 text-sm text-[#181816] outline-none transition placeholder:text-[#aaa398] focus:border-[#8f7244] focus:ring-1 focus:ring-[#8f7244]"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (current) => !current
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-[#766b5b] hover:text-[#181816]"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>

                  </div>
                </div>

                {/* ========================================= */}
                {/* ERROR */}
                {/* ========================================= */}
                {error && (
                  <div className="border border-red-200 bg-red-50 px-4 py-3">
                    <p className="text-sm font-medium text-red-700">
                      {error}
                    </p>
                  </div>
                )}

                {/* ========================================= */}
                {/* SIGN IN BUTTON */}
                {/* ========================================= */}
                <button
                  type="submit"
                  disabled={
                    loading || googleLoading
                  }
                  className="w-full bg-[#181816] px-5 py-3 text-sm font-semibold text-[#f5f0e6] transition hover:bg-[#292824] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "Signing in..."
                    : "Sign In"}
                </button>

              </form>

              {/* ========================================= */}
              {/* DIVIDER */}
              {/* ========================================= */}
              <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-[#d2cabc]" />

                <span className="text-[10px] uppercase tracking-[0.16em] text-[#a29a8c]">
                  Or
                </span>

                <div className="h-px flex-1 bg-[#d2cabc]" />
              </div>

              {/* ========================================= */}
              {/* GOOGLE LOGIN */}
              {/* ========================================= */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={
                  loading || googleLoading
                }
                className="flex w-full items-center justify-center gap-3 border border-[#cbc3b4] bg-[#fffdf8] px-5 py-3 text-sm font-semibold text-[#302e29] transition hover:bg-[#f1ede4] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {googleLoading ? (
                  "Connecting to Google..."
                ) : (
                  <>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fill="#4285F4"
                        d="M21.35 12.23c0-.79-.07-1.55-.2-2.28H12v4.31h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.42Z"
                      />

                      <path
                        fill="#34A853"
                        d="M12 21.99c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.03H3.28v2.53A9.75 9.75 0 0 0 12 21.99Z"
                      />

                      <path
                        fill="#FBBC05"
                        d="M6.53 14.08A5.86 5.86 0 0 1 6.22 12c0-.72.12-1.42.31-2.08V7.39H3.28A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.03 4.61l3.25-2.53Z"
                      />

                      <path
                        fill="#EA4335"
                        d="M12 5.88c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 2.98 14.63 2 12 2a9.75 9.75 0 0 0-8.72 5.39l3.25 2.53C7.3 7.6 9.46 5.88 12 5.88Z"
                      />
                    </svg>

                    Continue with Google
                  </>
                )}
              </button>
            </div>

            {/* Back */}
            <div className="mt-6">
              <a
                href="/"
                className="text-sm text-[#756d61] transition hover:text-[#8b7042]"
              >
                ← Back to Smart Campus
              </a>
            </div>

            <p className="mt-8 text-center text-[10px] uppercase tracking-[0.15em] text-[#a29a8c]">
              Secure campus access
            </p>

          </div>
        </section>
      </div>
    </main>
  );
}