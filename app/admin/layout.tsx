
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: "⌂" },
  { name: "Users", href: "/admin/users", icon: "◇" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">
          <div className="flex h-20 items-center border-b border-slate-100 px-6">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white shadow-sm">
                S
              </div>
              <div>
                <p className="text-sm font-bold tracking-tight text-slate-900">
                  Smart Campus
                </p>
                <p className="text-xs text-slate-500">Admin Portal</p>
              </div>
            </Link>
          </div>

          <nav className="flex-1 px-4 py-6">
            <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Menu
            </p>
            <div className="space-y-1">
              {navigation.map((item) => {
                const active =
                  item.href === "/admin"
                    ? pathname === "/admin"
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

          <div className="p-4">
            <div className="rounded-2xl bg-slate-900 p-4 text-white">
              <p className="text-sm font-semibold">Full control</p>
              <p className="mt-1 text-xs leading-5 text-slate-300">
                Manage every user and role across the platform.
              </p>
              <Link
                href="/admin/users"
                className="mt-3 inline-block text-xs font-semibold text-indigo-300 hover:text-indigo-200"
              >
                Manage users →
              </Link>
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur-md sm:px-8">
            <div>
              <p className="text-xs font-medium text-slate-400">Admin Portal</p>
              <h2 className="text-lg font-bold text-slate-900">
                {pathname === "/admin"
                  ? "Dashboard"
                  : navigation.find((item) => pathname.startsWith(item.href))
                      ?.name || "Smart Campus"}
              </h2>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                A
              </div>
              <div className="hidden text-left sm:block">
                <p className="text-xs font-semibold text-slate-900">Admin</p>
                <p className="text-[11px] text-slate-500">Signed in</p>
              </div>
            </div>
          </header>

          <div className="border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
            <div className="flex gap-2 overflow-x-auto">
              {navigation.map((item) => {
                const active =
                  item.href === "/admin"
                    ? pathname === "/admin"
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

          <main className="flex-1 px-4 py-6 sm:px-8 lg:px-10 lg:py-8">
            <div className="mx-auto w-full max-w-7xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}