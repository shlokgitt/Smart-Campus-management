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

  const router = useRouter();

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

      const sessionRes = await fetch("/api/auth/session");
      const session = await sessionRes.json();

      const role = session?.user?.role;

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
        {/* Left panel */}
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

        {/* Right panel */}
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
                Sign in
              </p>

              <h2 className="font-serif text-4xl leading-tight text-[#181816]">
                Welcome back
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#706b62]">
                Sign in to access your campus account.
              </p>
            </div>

            {/* Form */}
            <div className="border border-[#d2cabc] bg-[#f8f5ee] p-6 shadow-[0_12px_35px_rgba(30,26,20,0.07)] sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
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
                      autoComplete="current-password"
                      placeholder="Enter your password"
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

                {/* Error */}
                {error && (
                  <div className="border border-red-200 bg-red-50 px-4 py-3">
                    <p className="text-sm font-medium text-red-700">
                      {error}
                    </p>
                  </div>
                )}

                {/* Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#181816] px-5 py-3 text-sm font-semibold text-[#f5f0e6] transition hover:bg-[#292824] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>
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