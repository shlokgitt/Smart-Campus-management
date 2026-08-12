export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      {/* TOP ANNOUNCEMENT */}
      <div className="bg-[#f4a340] px-6 py-2 text-center text-xs font-medium text-zinc-950">
        Smart Campus Management System — One connected platform for your campus
      </div>

      {/* HEADER */}
      <header className="bg-[#111111] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center border-2 border-[#f28c28] bg-[#171717] text-xl font-bold text-[#f28c28]">
              S
            </div>

            <div>
              <p className="text-lg font-semibold tracking-tight">
                Smart Campus
              </p>
              <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-500">
                Management System
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium lg:flex">
            <a href="#about" className="transition hover:text-[#f28c28]">
              About
            </a>
            <a href="#features" className="transition hover:text-[#f28c28]">
              Features
            </a>
            <a href="#roles" className="transition hover:text-[#f28c28]">
              User Roles
            </a>
            <a href="#faq" className="transition hover:text-[#f28c28]">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="/login"
              className="hidden px-3 py-2 text-sm font-medium text-zinc-300 transition hover:text-white sm:block"
            >
              Log in
            </a>

            <a
              href="/signup"
              className="bg-[#f28c28] px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-[#ff9d3f]"
            >
              Sign up
            </a>
          </div>
        </div>

        {/* MOBILE NAV */}
        <div className="border-t border-zinc-800 px-6 py-3 lg:hidden">
          <div className="flex justify-between text-xs font-medium text-zinc-400">
            <a href="#about">About</a>
            <a href="#features">Features</a>
            <a href="#roles">Roles</a>
            <a href="#faq">FAQ</a>
            <a href="/login">Login</a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-[620px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/campus-hero.png')",
          }}
        />

        {/* Image overlay */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/25" />

        <div className="relative mx-auto flex min-h-[620px] max-w-7xl items-center px-6 lg:px-10">
          <div className="max-w-3xl text-white">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#f5a04b]">
              Smart Campus
            </p>

            <h1 className="font-serif text-5xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
              One platform for
              <br />
              your entire campus.
            </h1>

            <div className="mt-6 h-1 w-16 bg-[#f28c28]" />

            <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-200 sm:text-lg">
              Attendance, assignments, submissions, notifications, and
              administration — everything your campus needs, connected in one
              place.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="/signup"
                className="bg-[#f28c28] px-7 py-3.5 text-sm font-bold text-zinc-950 transition hover:bg-[#ff9d3f]"
              >
                GET STARTED
              </a>

              <a
                href="/login"
                className="border border-white/70 bg-black/20 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-zinc-950"
              >
                LOG IN
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK FACTS */}
      <section className="bg-[#151515] text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
          <div className="border-b border-zinc-700 px-6 py-8 text-center lg:border-b-0 lg:border-r">
            <p className="text-3xl font-bold text-[#f28c28]">3</p>
            <p className="mt-2 text-xs uppercase tracking-wider text-zinc-400">
              Core User Roles
            </p>
          </div>

          <div className="border-b border-zinc-700 px-6 py-8 text-center lg:border-b-0 lg:border-r">
            <p className="text-3xl font-bold text-[#f28c28]">24/7</p>
            <p className="mt-2 text-xs uppercase tracking-wider text-zinc-400">
              Browser Access
            </p>
          </div>

          <div className="border-r border-zinc-700 px-6 py-8 text-center">
            <p className="text-3xl font-bold text-[#f28c28]">1</p>
            <p className="mt-2 text-xs uppercase tracking-wider text-zinc-400">
              Connected Platform
            </p>
          </div>

          <div className="px-6 py-8 text-center">
            <p className="text-3xl font-bold text-[#f28c28]">0</p>
            <p className="mt-2 text-xs uppercase tracking-wider text-zinc-400">
              Scattered Chats
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d97706]">
                About Smart Campus
              </p>

              <h2 className="mt-4 font-serif text-4xl leading-tight text-zinc-900 sm:text-5xl">
                Built around the way
                <br />
                a campus actually works.
              </h2>

              <div className="mt-6 h-1 w-12 bg-[#f28c28]" />

              <p className="mt-6 max-w-xl text-sm leading-7 text-zinc-600">
                Smart Campus brings everyday academic operations into one
                organized platform. Students, faculty, and administrators get
                dedicated tools while staying connected through the same
                system.
              </p>

              <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-600">
                The goal is simple: less scattered communication, fewer
                disconnected tools, and a clearer campus experience.
              </p>
            </div>

            <div className="border-l-4 border-[#f28c28] bg-zinc-100 p-8 lg:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
                The idea
              </p>

              <p className="mt-5 font-serif text-3xl leading-relaxed text-zinc-900">
                "Everything important about campus life should be easy to
                find."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="bg-[#f4f4f2]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d97706]">
              Platform Features
            </p>

            <h2 className="mt-3 font-serif text-4xl text-zinc-900 sm:text-5xl">
              Everything in one place.
            </h2>
          </div>

          <div className="grid border-l border-t border-zinc-300 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border-b border-r border-zinc-300 bg-white p-7">
              <span className="text-sm font-bold text-[#d97706]">01</span>
              <h3 className="mt-7 text-lg font-bold">Attendance</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                Record and track attendance without maintaining separate
                spreadsheets.
              </p>
            </div>

            <div className="border-b border-r border-zinc-300 bg-white p-7">
              <span className="text-sm font-bold text-[#d97706]">02</span>
              <h3 className="mt-7 text-lg font-bold">Assignments</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                Create assignments, submit work, and keep deadlines visible.
              </p>
            </div>

            <div className="border-b border-r border-zinc-300 bg-white p-7">
              <span className="text-sm font-bold text-[#d97706]">03</span>
              <h3 className="mt-7 text-lg font-bold">Notifications</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                Keep important academic updates accessible from the platform.
              </p>
            </div>

            <div className="border-b border-r border-zinc-300 bg-white p-7">
              <span className="text-sm font-bold text-[#d97706]">04</span>
              <h3 className="mt-7 text-lg font-bold">Administration</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                Manage users, roles, and platform-wide access from one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ROLES */}
      <section id="roles" className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d97706]">
              Designed for everyone
            </p>

            <h2 className="mt-3 font-serif text-4xl text-zinc-900 sm:text-5xl">
              One campus. Three experiences.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="border border-zinc-300 p-8">
              <div className="mb-8 flex h-12 w-12 items-center justify-center bg-[#151515] text-lg font-bold text-[#f28c28]">
                S
              </div>

              <h3 className="text-xl font-bold">Students</h3>

              <p className="mt-4 text-sm leading-7 text-zinc-600">
                View attendance, manage assignments, submit work, and stay
                updated with campus notifications.
              </p>
            </div>

            <div className="border border-zinc-300 p-8">
              <div className="mb-8 flex h-12 w-12 items-center justify-center bg-[#151515] text-lg font-bold text-[#f28c28]">
                F
              </div>

              <h3 className="text-xl font-bold">Faculty</h3>

              <p className="mt-4 text-sm leading-7 text-zinc-600">
                Create assignments, record attendance, and manage student
                academic activity.
              </p>
            </div>

            <div className="border border-zinc-300 p-8">
              <div className="mb-8 flex h-12 w-12 items-center justify-center bg-[#151515] text-lg font-bold text-[#f28c28]">
                A
              </div>

              <h3 className="text-xl font-bold">Administrators</h3>

              <p className="mt-4 text-sm leading-7 text-zinc-600">
                Manage users, roles, and platform-wide access through a
                centralized administrative dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-[#151515] text-white">
        <div className="mx-auto max-w-4xl px-6 py-24 lg:px-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f28c28]">
            Frequently Asked Questions
          </p>

          <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
            Questions, answered.
          </h2>

          <div className="mt-12 divide-y divide-zinc-700 border-y border-zinc-700">
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
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-950">
              Smart Campus
            </p>

            <h2 className="mt-3 font-serif text-4xl text-zinc-950">
              Bring your campus together.
            </h2>
          </div>

          <a
            href="/signup"
            className="w-fit bg-[#111111] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-zinc-800"
          >
            GET STARTED
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#111111] text-zinc-400">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <div>
            <p className="font-serif text-base text-white">
              Smart Campus
            </p>
            <p className="mt-1 text-xs text-zinc-600">
              Management System
            </p>
          </div>

          <p className="text-xs">
            Built for DevFusion 4.O — The Developers Hackathon
          </p>
        </div>
      </footer>
    </div>
  );
}