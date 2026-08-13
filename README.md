Smart Campus Management Platform

DevFusion 4.O — The Developers Hackathon Problem Statement 1: Smart Campus Management Platform

A centralized full-stack campus management platform where students, faculty, and administrators can manage academic activities, attendance, assignments, notifications, profiles, and user roles from one connected system.

🔗 Live Deployment

Production: https://smart-campus-management-ashen.vercel.app

The application is deployed on Vercel and the production build is currently working.

✨ What Has Been Built

🔐 Authentication & Authorization

Email/password signup and login

Password hashing with bcryptjs

JWT-based NextAuth sessions

Google OAuth login

Automatic Google-user creation in MongoDB

Role-aware sessions and route protection

Student, Faculty, and Admin access control

Logout and Back to Home navigation

Unauthorized-access protection

🎓 Student Portal

Dashboard

Attendance overview/history

Assignment listing and submission

File URL or GitHub-link submissions

Late-submission detection

Database-backed notifications

Mark notifications as read

Profile viewing/editing

Responsive sidebar and mobile navigation

Logout and Back to Home

👨‍🏫 Faculty Portal

Faculty dashboard

Assignment creation and management

Attendance management

Student listing/access

Responsive dashboard UI

Quick actions for assignments and attendance

Logout and Back to Home

🛡️ Admin Portal

Platform-wide dashboard statistics

Student, faculty and admin counts

Assignment and attendance-record counts

User management

View all users

Change user roles

Delete users

Protection against changing the logged-in admin's own role

Admin notifications API

Responsive navigation

Logout and Back to Home

🔔 Notifications

User-specific notifications

Title and message

Types: assignment, attendance, event, placement, system

Read/unread state

Mark-as-read API

Newest-first ordering

🎨 UI/UX

Modern Smart Campus visual identity

Responsive layouts

Role-specific sidebars

Mobile navigation

Dashboard cards and empty states

Consistent spacing, typography and navigation

Styled landing page

Student, Faculty and Admin dashboard interfaces

🧰 Tech Stack

Frontend: Next.js 16, React, TypeScript, Tailwind CSS

Backend: Next.js API Routes

Database: MongoDB Atlas with Mongoose

Authentication: NextAuth.js, Credentials Provider, Google OAuth, JWT

Security: bcryptjs, role-based middleware

Deployment: GitHub + Vercel

📡 API Modules

/api
├── admin
│   ├── dashboard
│   ├── notifications
│   └── users
│       ├── [id]
│       └── [id]/role
├── auth
│   ├── signup
│   └── [...nextauth]
├── faculty
│   ├── assignments
│   ├── attendance
│   └── students
└── student
    ├── assignments
    │   └── [id]/submit
    ├── attendance
    ├── dashboard
    ├── notifications
    │   └── [id]/read
    └── profile

🗂️ Project Structure

smart-campus/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── signup/
│   ├── admin/
│   ├── faculty/
│   ├── student/
│   ├── unauthorized/
│   ├── api/
│   └── layout.tsx
├── components/
│   └── shared/
├── lib/
│   ├── models/
│   ├── auth.ts
│   └── db.ts
├── public/
├── types/
├── middleware.ts
├── next.config.ts
└── README.md

🚀 Running Locally

Prerequisites

Node.js 18+

MongoDB Atlas

Google Cloud OAuth credentials for Google login

Install

git clone https://github.com/shlokgitt/Smart-Campus-management.git
cd Smart-Campus-management
npm install

Create .env.local:

MONGODB_URI=<your MongoDB Atlas connection string>
NEXTAUTH_SECRET=<your NextAuth secret>
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=<your Google OAuth client ID>
GOOGLE_CLIENT_SECRET=<your Google OAuth client secret>

Generate a secret:

node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

Start the development server:

npm run dev

Open http://localhost:3000.

Never commit .env.local or expose production secrets.

🧪 Production Build

Verify the project before deployment:

npm run build

The current project has a successful production build after fixing the Next.js 16 dynamic-route parameter typing issue.

Dynamic routes use:

{ params }: { params: Promise<{ id: string }> }

and:

const { id } = await params;

🌐 Deployment

The project is deployed through Vercel from GitHub.

Production environment variables:

MONGODB_URI
NEXTAUTH_SECRET
NEXTAUTH_URL
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET

For production, NEXTAUTH_URL must use the deployed Vercel domain.

Google OAuth production callback:

https://<your-vercel-domain>/api/auth/callback/google

🔑 Roles

The database currently supports:

student
faculty
coordinator
admin

Role

Portal

Status

Student

/student

✅ Built

Faculty

/faculty

✅ Built

Admin

/admin

✅ Built

Coordinator

/coordinator

🚧 Planned

Public signup currently creates Student accounts by default. Faculty/Admin role assignment is handled through Admin user management.

🐛 Current Limitations / Future Work

Faculty review/grading of student assignment submissions

Direct assignment file uploading

Coordinator portal

Events module

Placement module

More advanced notification creation/management workflows

Detailed analytics and reporting

Password-reset/email recovery flow

Additional production security hardening

🛠️ Important Fixes Completed

Fixed Google OAuth client configuration

Fixed Google login redirect/session handling

Fixed role-aware authentication and middleware behavior

Fixed authenticated-user redirect-to-login issue

Added automatic database users for Google authentication

Added signup API with hashed passwords

Added Student/Faculty/Admin logout

Added Back to Home navigation

Added database-backed notifications

Added notification read functionality

Fixed Admin user-management API structure

Fixed Next.js 16 dynamic-route params typing

Verified successful production build

Successfully deployed to Vercel

👥 Team

Member

Responsibility

Shlok

Backend & Authentication

Shrijan

Frontend & UI/UX

Sidharth

Designing & Libraries

📄 License

Built for DevFusion 4.O — The Developers Hackathon.

Not licensed for production/commercial use.