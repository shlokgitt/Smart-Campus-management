export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#111111]/95 text-white backdrop-blur-md">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6 lg:px-10">
          {/* Brand */}
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white">
              <img
                src="/icon.png"
                alt="Smart Campus"
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <p className="text-[17px] font-semibold tracking-tight text-white">
                Smart Campus
              </p>

              <p className="mt-0.5 text-[9px] uppercase tracking-[0.22em] text-zinc-500">
                Management System
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-9 text-sm text-zinc-300 lg:flex">
            <a
              href="#about"
              className="transition hover:text-white"
            >
              About
            </a>

            <a
              href="#features"
              className="transition hover:text-white"
            >
              Features
            </a>

            <a
              href="#roles"
              className="transition hover:text-white"
            >
              User Roles
            </a>

            <a
              href="#faq"
              className="transition hover:text-white"
            >
              FAQ
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href="/login"
              className="hidden rounded-lg px-3 py-2 text-sm font-medium text-zinc-300 transition hover:text-white sm:block"
            >
              Log in
            </a>

            <a
              href="/signup"
              className="rounded-lg bg-[#f28c28] px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-[#ff9d3f]"
            >
              Get started
            </a>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="border-t border-white/10 lg:hidden">
          <div className="mx-auto flex max-w-7xl items-center justify-between overflow-x-auto px-6 py-3 text-xs font-medium text-zinc-400">
            <a href="#about" className="whitespace-nowrap hover:text-white">
              About
            </a>

            <a href="#features" className="whitespace-nowrap hover:text-white">
              Features
            </a>

            <a href="#roles" className="whitespace-nowrap hover:text-white">
              Roles
            </a>

            <a href="#faq" className="whitespace-nowrap hover:text-white">
              FAQ
            </a>

            <a href="/login" className="whitespace-nowrap text-white">
              Login
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-[680px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/campus-hero.png')",
          }}
        />

        {/* Refined overlay */}
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />

        <div className="relative mx-auto flex min-h-[680px] max-w-7xl items-center px-6 lg:px-10">
          <div className="max-w-3xl pt-8">
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-10 bg-[#f28c28]" />

              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#f5a04b]">
                Smart Campus
              </span>
            </div>

            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.03] tracking-[-0.03em] text-white sm:text-6xl lg:text-[76px]">
              One platform for
              <br />
              your entire campus.
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-zinc-200 sm:text-lg">
              Attendance, assignments, submissions, notifications, and
              administration — everything your campus needs, connected in one
              place.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="/signup"
                className="rounded-lg bg-[#f28c28] px-7 py-3.5 text-sm font-semibold text-zinc-950 shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#ff9d3f]"
              >
                Get started
              </a>

              <a
                href="#features"
                className="rounded-lg border border-white/40 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-zinc-950"
              >
                Explore platform
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-zinc-400">
              <span>Student portal</span>
              <span className="hidden h-1 w-1 rounded-full bg-zinc-600 sm:block" />
              <span>Faculty portal</span>
              <span className="hidden h-1 w-1 rounded-full bg-zinc-600 sm:block" />
              <span>Admin portal</span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
          <div className="border-b border-zinc-200 px-6 py-8 lg:border-b-0 lg:border-r">
            <p className="text-2xl font-semibold text-zinc-900">3</p>

            <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
              Core user roles
            </p>
          </div>

          <div className="border-b border-zinc-200 px-6 py-8 lg:border-b-0 lg:border-r">
            <p className="text-2xl font-semibold text-zinc-900">24/7</p>

            <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
              Browser access
            </p>
          </div>

          <div className="border-r border-zinc-200 px-6 py-8">
            <p className="text-2xl font-semibold text-zinc-900">1</p>

            <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
              Connected platform
            </p>
          </div>

          <div className="px-6 py-8">
            <p className="text-2xl font-semibold text-zinc-900">∞</p>

            <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
              Campus possibilities
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-28">
          <div className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c56f14]">
                About Smart Campus
              </p>

              <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-5xl">
                Built around the way a campus actually works.
              </h2>

              <div className="mt-7 h-px w-16 bg-[#f28c28]" />

              <p className="mt-7 max-w-xl text-sm leading-7 text-zinc-600 sm:text-base">
                Smart Campus brings everyday academic operations into one
                organized platform. Students, faculty, and administrators get
                dedicated tools while staying connected through the same
                system.
              </p>

              <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-600 sm:text-base">
                The goal is simple: fewer disconnected tools, less scattered
                communication, and a clearer campus experience.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8 sm:p-10">
              <div className="flex items-center gap-4">
                <div className="h-10 w-1 rounded-full bg-[#f28c28]" />

                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  The idea
                </p>
              </div>

              <p className="mt-7 text-3xl font-medium leading-tight tracking-tight text-zinc-900 sm:text-4xl">
                Everything important about campus life should be easy to find.
              </p>

              <p className="mt-6 text-sm leading-6 text-zinc-500">
                One platform. Clear responsibilities. Less friction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="bg-zinc-50">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-28">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c56f14]">
              Platform features
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
              Everything in one place.
            </h2>

            <p className="mt-5 text-sm leading-7 text-zinc-600 sm:text-base">
              The tools students, faculty, and administrators use most — all
              connected through one platform.
            </p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                number: "01",
                title: "Attendance",
                description:
                  "Record and track attendance without maintaining separate spreadsheets.",
              },
              {
                number: "02",
                title: "Assignments",
                description:
                  "Create assignments, submit work, and keep deadlines visible.",
              },
              {
                number: "03",
                title: "Notifications",
                description:
                  "Keep important academic updates accessible from the platform.",
              },
              {
                number: "04",
                title: "Administration",
                description:
                  "Manage users, roles, and platform-wide access from one place.",
              },
            ].map((feature) => (
              <div
                key={feature.number}
                className="group bg-white p-7 transition hover:bg-zinc-950"
              >
                <span className="text-xs font-semibold tracking-wider text-[#c56f14] group-hover:text-[#f28c28]">
                  {feature.number}
                </span>

                <h3 className="mt-10 text-lg font-semibold text-zinc-900 group-hover:text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-zinc-600 group-hover:text-zinc-400">
                  {feature.description}
                </p>

                <div className="mt-8 h-px w-8 bg-zinc-300 transition-all group-hover:w-14 group-hover:bg-[#f28c28]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROLES */}
      <section id="roles" className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-28">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c56f14]">
              Designed for everyone
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
              One campus. Different experiences.
            </h2>

            <p className="mt-5 text-sm leading-7 text-zinc-600 sm:text-base">
              Every role gets the tools and access it needs without cluttering
              the experience with unnecessary features.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Students",
                description:
                  "View attendance, manage assignments, submit work, and stay updated with campus notifications.",
              },
              {
                title: "Faculty",
                description:
                  "Create assignments, record attendance, and manage student academic activity.",
              },
              {
                title: "Administrators",
                description:
                  "Manage users, roles, and platform-wide access through a centralized administrative dashboard.",
              },
            ].map((role) => (
              <div
                key={role.title}
                className="rounded-2xl border border-zinc-200 bg-white p-7 transition hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-zinc-200 bg-white">
                  <img
                    src="/icon.png"
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>

                <h3 className="mt-7 text-xl font-semibold text-zinc-900">
                  {role.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-zinc-600">
                  {role.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-[#111111] text-white">
        <div className="mx-auto max-w-4xl px-6 py-24 lg:px-10 lg:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f28c28]">
            Frequently asked questions
          </p>

          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Questions, answered.
          </h2>

          <div className="mt-12 divide-y divide-zinc-800 border-y border-zinc-800">
            <div className="py-7">
              <h3 className="font-semibold">
                Who can use Smart Campus?
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Students, faculty, coordinators, and administrators can use
                the platform with role-specific access.
              </p>
            </div>

            <div className="py-7">
              <h3 className="font-semibold">
                Is my data secure?
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Passwords are hashed, protected routes use role-based access,
                and authenticated sessions are securely managed.
              </p>
            </div>

            <div className="py-7">
              <h3 className="font-semibold">
                Do I need to install anything?
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                No. Smart Campus runs directly in your web browser.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#f28c28]">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-16 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-950">
              Smart Campus
            </p>

            <h2 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight text-zinc-950">
              Bring your campus together.
            </h2>
          </div>

          <a
            href="/signup"
            className="w-fit rounded-lg bg-[#111111] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-zinc-800"
          >
            Get started
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#111111] text-zinc-400">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-9 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 overflow-hidden rounded-lg bg-white">
              <img
                src="/icon.png"
                alt="Smart Campus"
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                Smart Campus
              </p>

              <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                Management System
              </p>
            </div>
          </div>

          <p className="text-xs text-zinc-500">
            Built for DevFusion 4.O — The Developers Hackathon
          </p>
        </div>
      </footer>
    </div>
  );
}