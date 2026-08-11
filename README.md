# Smart Campus Management Platform

**DevFusion 4.O — The Developers Hackathon**
**Problem Statement 1: Smart Campus Management Platform**

A centralized full-stack web platform where students, faculty, and admins
manage attendance, assignments, notifications, and user roles — replacing
scattered WhatsApp groups and disconnected systems with one place.

---

## 🔗 Live Deployment

[https://smart-campus-management-ashen.vercel.app](https://smart-campus-management-ashen.vercel.app)

> **Note:** Login is fully working in local development. Production login
> on the deployed link is still being finalized — see **Known Bugs &
> Limitations** below.

---

## 🧰 Tech Stack

- **Frontend:** Next.js 16 (App Router), TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** MongoDB Atlas (Mongoose ODM)
- **Authentication:** NextAuth.js — Email/Password (Credentials provider) +
  Google OAuth (configured, pending final setup)
- **Deployment:** Vercel

---

## ✅ Features Built

### Authentication
- Email + password signup/login
- JWT-based sessions
- Role-based route protection via middleware (student / faculty / admin)

### Student
- Dashboard with attendance %, pending assignments, and unread notification
  counts
- View attendance history and overall percentage
- View and submit assignments (file URL or GitHub link)
- View and mark notifications as read
- View and edit profile (name, phone, department, bio, LinkedIn, GitHub)

### Faculty
- Dashboard access
- Create assignments (title, description, subject, deadline)
- Mark student attendance (present/absent, by subject and date)

### Admin
- Dashboard with platform-wide stats (total students, faculty, admins,
  assignments, attendance records)
- User management: view all users, change roles, delete users (with a
  safety check preventing self-deletion)

### Landing Page
- Hero section, feature highlights per role, stats, and FAQ

---

## 🚀 Running Locally

**Prerequisites:** Node.js 18+, a MongoDB Atlas account (free tier works)

```bash
git clone <this-repo-url>
cd smart-campus
npm install
```

Create a `.env.local` file in the project root with the following (see
`.env.example` for the template):

```
MONGODB_URI=<your MongoDB Atlas connection string>
NEXTAUTH_SECRET=<any random string — generate with the command below>
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=<optional, for Google login>
GOOGLE_CLIENT_SECRET=<optional, for Google login>
```

Generate a `NEXTAUTH_SECRET`:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**MongoDB Atlas setup:**
1. Create a free M0 cluster
2. Under Database Access, create a user with read/write permissions
3. Under Network Access, allow access from anywhere (`0.0.0.0/0`)
4. Copy the connection string into `MONGODB_URI` above

Run the dev server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 🔑 Test Accounts

| Role    | Email                | Password    |
|---------|-----------------------|-------------|
| Student | test@example.com      | test1234    |
| Faculty | faculty@example.com   | faculty1234 |
| Admin   | admin@example.com     | admin1234   |

---

## 📁 Project Structure

```
/app
  /(auth)/login, /signup       — auth pages
  /api                         — all backend API routes
  /student, /faculty, /admin   — role-specific dashboards and pages
/lib
  /models                      — Mongoose schemas
  auth.ts, db.ts                — NextAuth config, DB connection
/components                    — shared and role-specific UI components
/middleware.ts                 — role-based route protection
```

---

## 🐛 Known Bugs & Limitations

- **Production login on Vercel is not yet fully verified** — local
  development is fully functional and tested end-to-end; the deployed
  environment's auth flow is still being debugged.
- **Google OAuth** is wired into the codebase but Google Cloud credentials
  have not yet been added to the environment — currently email/password
  login only.
- **Faculty submission review** (grading student assignment submissions) is
  not yet built — faculty can create assignments and take attendance;
  students can submit; the review/grading step is pending.
- **UI is functional but minimally styled** on most pages — the landing
  page has full styling; internal dashboard pages use plain layout and
  will receive a full visual pass.
- No file upload for assignments yet — students submit a file URL or
  GitHub link rather than uploading a file directly.
- Coordinator role and Event/Placement modules are not implemented.

---

## 👥 Team

- **Shlok** — Full-stack development (auth, database, all three role
  dashboards, deployment)

---

## 📄 License

Built for DevFusion 4.O — The Developers Hackathon. Not licensed for
production use.