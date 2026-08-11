export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
        <span className="text-lg font-bold">Smart Campus</span>
        <div className="flex gap-4 text-sm">
          <a href="/login" className="hover:text-blue-400">Log in</a>
          <a href="/signup" className="rounded bg-blue-600 px-4 py-2 hover:bg-blue-500">Sign up</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="text-center px-6 py-24">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          One platform for your entire campus
        </h1>
        <p className="text-zinc-400 max-w-xl mx-auto mb-8">
          Attendance, assignments, notices, and placements — for students,
          faculty, and admins, all in one place. No more scattered WhatsApp groups.
        </p>
        <div className="flex justify-center gap-4">
          <a href="/signup" className="rounded bg-blue-600 px-6 py-3 font-medium hover:bg-blue-500">
            Get Started
          </a>
          <a href="/login" className="rounded border border-zinc-700 px-6 py-3 font-medium hover:bg-zinc-800">
            Log in
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-6 py-12 border-y border-zinc-800 max-w-4xl mx-auto text-center">
        <div>
          <p className="text-3xl font-bold">3</p>
          <p className="text-sm text-zinc-400">User Roles</p>
        </div>
        <div>
          <p className="text-3xl font-bold">100%</p>
          <p className="text-sm text-zinc-400">Cloud Based</p>
        </div>
        <div>
          <p className="text-3xl font-bold">24/7</p>
          <p className="text-sm text-zinc-400">Access</p>
        </div>
        <div>
          <p className="text-3xl font-bold">0</p>
          <p className="text-sm text-zinc-400">WhatsApp Groups Needed</p>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-12">Everything in one place</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="rounded-lg border border-zinc-800 p-6">
            <h3 className="font-semibold mb-2">For Students</h3>
            <p className="text-sm text-zinc-400">
              Track attendance, submit assignments, and stay on top of notifications — all from one dashboard.
            </p>
          </div>
          <div className="rounded-lg border border-zinc-800 p-6">
            <h3 className="font-semibold mb-2">For Faculty</h3>
            <p className="text-sm text-zinc-400">
              Create assignments, mark attendance, and review student submissions without spreadsheets.
            </p>
          </div>
          <div className="rounded-lg border border-zinc-800 p-6">
            <h3 className="font-semibold mb-2">For Admins</h3>
            <p className="text-sm text-zinc-400">
              Manage users, assign roles, and get a real-time overview of the entire campus.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">FAQ</h2>
        <div className="space-y-4">
          <div>
            <p className="font-medium">Who can use Smart Campus?</p>
            <p className="text-sm text-zinc-400">Students, faculty, coordinators, and admins — each with their own dashboard.</p>
          </div>
          <div>
            <p className="font-medium">Is my data secure?</p>
            <p className="text-sm text-zinc-400">Passwords are hashed, routes are protected by role, and sessions are securely managed.</p>
          </div>
          <div>
            <p className="font-medium">Do I need to install anything?</p>
            <p className="text-sm text-zinc-400">No — it runs entirely in your browser.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 px-6 py-8 text-center text-sm text-zinc-500">
        Built for DevFusion 4.O — The Developers Hackathon
      </footer>
    </div>
  );
}