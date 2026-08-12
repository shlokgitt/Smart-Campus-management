"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    name: "Dashboard",
    href: "/student",
    icon: "⌂",
  },
  {
    name: "Attendance",
    href: "/student/attendance",
    icon: "✓",
  },
  {
    name: "Assignments",
    href: "/student/assignments",
    icon: "▣",
  },
  {
    name: "Notifications",
    href: "/student/notifications",
    icon: "●",
  },
  {
    name: "Profile",
    href: "/student/profile",
    icon: "○",
  },
];

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">
          {/* Logo */}
          <div className="flex h-20 items-center border-b border-slate-100 px-6">
            <Link href="/student" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white shadow-sm">
                S
              </div>

              <div>
                <p className="text-sm font-bold tracking-tight text-slate-900">
                  Smart Campus
                </p>
                <p className="text-xs text-slate-500">Student Portal</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6">
            <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Menu
            </p>

            <div className="space-y-1">
              {navigation.map((item) => {
                const active =
                  item.href === "/student"
                    ? pathname === "/student"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all ${
                      active
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm ${
                        active
                          ? "bg-indigo-600 text-white"
                          : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                      }`}
                    >
                      {item.icon}
                    </span>

                    {item.name}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Bottom card */}
          <div className="p-4">
            <div className="rounded-2xl bg-slate-900 p-4 text-white">
              <p className="text-sm font-semibold">Stay on track</p>
              <p className="mt-1 text-xs leading-5 text-slate-300">
                Keep an eye on your attendance and upcoming assignments.
              </p>

              <Link
                href="/student/assignments"
                className="mt-3 inline-block text-xs font-semibold text-indigo-300 hover:text-indigo-200"
              >
                View assignments →
              </Link>
            </div>
          </div>
        </aside>

        {/* Main area */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Topbar */}
          <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur-md sm:px-8">
            <div>
              <p className="text-xs font-medium text-slate-400">
                Student Portal
              </p>
              <h2 className="text-lg font-bold text-slate-900">
                {pathname === "/student"
                  ? "Dashboard"
                  : navigation.find((item) =>
                      pathname.startsWith(item.href)
                    )?.name || "Smart Campus"}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/student/notifications"
                className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
                aria-label="Notifications"
              >
                ●
              </Link>

              <Link
                href="/student/profile"
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 transition hover:bg-slate-50"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                  S
                </div>

                <div className="hidden text-left sm:block">
                  <p className="text-xs font-semibold text-slate-900">
                    Student
                  </p>
                  <p className="text-[11px] text-slate-500">
                    View profile
                  </p>
                </div>
              </Link>
            </div>
          </header>

          {/* Mobile navigation */}
          <div className="border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
            <div className="flex gap-2 overflow-x-auto">
              {navigation.map((item) => {
                const active =
                  item.href === "/student"
                    ? pathname === "/student"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold ${
                      active
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Page */}
          <main className="flex-1 px-4 py-6 sm:px-8 lg:px-10 lg:py-8">
            <div className="mx-auto w-full max-w-7xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}