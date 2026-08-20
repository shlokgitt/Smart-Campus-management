# 🎓 Smart Campus Management Platform

> **DevFusion 4.O — The Developers Hackathon**  
> **Problem Statement 1: Smart Campus Management Platform**

A centralized full-stack campus management platform where students, faculty, and administrators can manage academic activities, attendance, assignments, notifications, profiles, and user roles from one connected system.

---

## 🔗 Live Deployment

**Production:**  
https://smart-campus-management-ashen.vercel.app

The application is deployed on Vercel and the production build is operational.

---

# ✨ What Has Been Built

## 🔐 Authentication & Authorization

- Email/password signup and login
- Password hashing with `bcryptjs`
- JWT-based NextAuth sessions
- Google OAuth login
- Automatic Google-user creation in MongoDB
- Role-aware sessions
- Protected routes and middleware
- Student, Faculty, and Admin access control
- Logout functionality
- Back to Home navigation
- Unauthorized-access protection
- Forgot password flow
- Email-based password reset
- Cryptographically secure reset tokens
- Hashed reset tokens stored in the database
- Reset-token expiration
- Password confirmation and validation

---

## 🎓 Student Portal

- Student dashboard
- Attendance overview and history
- Assignment listing
- Assignment deadline tracking
- Submission status tracking
- Assignment submission using:
  - File URL
  - GitHub repository link
- Late-submission detection
- Database-backed notifications
- Read/unread notification state
- Mark notification as read
- Student profile
- Responsive sidebar
- Mobile navigation
- Loading states
- Error states
- Empty states
- Logout and Back to Home navigation

---

## 👨‍🏫 Faculty Portal

- Faculty dashboard
- Assignment creation and management
- Attendance management
- Student listing
- Student access
- Quick actions for assignments and attendance
- Responsive dashboard UI
- Loading states
- Error states
- Empty states
- Logout and Back to Home navigation

---

## 🛡️ Admin Portal

### Dashboard

- Platform-wide statistics
- Student count
- Faculty count
- Admin count
- Assignment count
- Attendance-record count
- Platform activity overview
- Quick administrative actions
- Loading skeletons
- API error state with retry

### User Management

- View all users
- Search users
- Filter users by role
- View user roles
- Change user roles
- Delete users
- Protection against changing the logged-in admin's own role
- Loading state
- API error state with retry
- Empty database state
- Empty search/filter state

### Notifications

- Create admin notifications
- Notification title and message
- Notification type
- Recipient targeting
- Success/error feedback

---

# 🔔 Notifications

The notification system supports:

- User-specific notifications
- Notification title
- Notification message
- Notification types:
  - Assignment
  - Attendance
  - Event
  - Placement
  - System
- Read/unread state
- Mark-as-read API
- Newest-first ordering
- Student notification interface
- Admin notification creation

---

# 🎨 UI / UX

The platform follows a clean, modern campus-management design system.

### Design principles

- Responsive layouts
- Role-specific dashboards
- Consistent navigation
- Mobile-friendly interfaces
- Dashboard cards
- Loading skeletons
- Error states
- Empty states
- Retry actions
- Consistent spacing and typography
- Modern Smart Campus visual identity
- Styled landing page

The application is designed to provide a separate but consistent experience for:

**Student → Faculty → Admin**

---

# 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16, React, TypeScript |
| Styling | Tailwind CSS |
| Backend | Next.js API Routes |
| Database | MongoDB Atlas |
| ODM | Mongoose |
| Authentication | NextAuth.js |
| OAuth | Google OAuth |
| Password Security | bcryptjs |
| Sessions | JWT |
| Deployment | Vercel |
| Version Control | GitHub |

---

# 📡 API Modules

```text
/api
├── admin
│   ├── dashboard
│   ├── notifications
│   └── users
│       ├── [id]
│       └── [id]/role
│
├── auth
│   ├── signup
│   ├── forgot-password
│   ├── reset-password
│   └── [...nextauth]
│
├── faculty
│   ├── assignments
│   ├── attendance
│   └── students
│
└── student
    ├── assignments
    │   └── [id]/submit
    ├── attendance
    ├── dashboard
    ├── notifications
    │   └── [id]/read
    └── profile
```

---

# 🗂️ Project Structure

```text
smart-campus/
│
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── signup/
│   │
│   ├── admin/
│   │   ├── notifications/
│   │   └── users/
│   │
│   ├── faculty/
│   │   ├── assignments/
│   │   └── attendance/
│   │
│   ├── student/
│   │   ├── assignments/
│   │   ├── attendance/
│   │   ├── notifications/
│   │   └── profile/
│   │
│   ├── forgot-password/
│   ├── reset-password/
│   ├── unauthorized/
│   ├── api/
│   └── layout.tsx
│
├── components/
│   └── shared/
│
├── lib/
│   ├── models/
│   ├── auth.ts
│   └── db.ts
│
├── public/
├── types/
├── middleware.ts
├── next.config.ts
└── README.md
```

---

# 🚀 Running Locally

## Prerequisites

- Node.js 18+
- MongoDB Atlas
- Google Cloud OAuth credentials
- Git

## Installation

Clone the repository:

```bash
git clone https://github.com/shlokgitt/Smart-Campus-management.git
cd Smart-Campus-management
```

Install dependencies:

```bash
npm install
```

---

## 🔑 Environment Variables

Create a `.env.local` file:

```env
MONGODB_URI=<your MongoDB Atlas connection string>
NEXTAUTH_SECRET=<your NextAuth secret>
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=<your Google OAuth client ID>
GOOGLE_CLIENT_SECRET=<your Google OAuth client secret>
```

Generate a secure NextAuth secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

> ⚠️ Never commit `.env.local` or expose production secrets.

---

## ▶️ Start Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# 🔑 Password Recovery

Smart Campus includes an email-based password recovery system.

```text
Forgot Password
       ↓
Enter Email
       ↓
Generate Secure Token
       ↓
Send Reset Email
       ↓
Open Reset Link
       ↓
Validate Token
       ↓
Create New Password
       ↓
Login
```

### Security

- Reset tokens are generated using Node.js `crypto`
- Only the SHA-256 hash of the token is stored
- Raw tokens are never stored in MongoDB
- Tokens expire after 15 minutes
- Password length is validated
- Password confirmation is required
- Google-only accounts cannot reset a password that does not exist

---

# 🧪 Production Build

Before deployment, verify the production build:

```bash
npm run build
```

The project has been successfully built and deployed using the Next.js 16 App Router.

Dynamic routes follow the Next.js 16 parameter format:

```ts
{ params }: { params: Promise<{ id: string }> }
```

and:

```ts
const { id } = await params;
```

---

# 🌐 Deployment

The project is deployed through **Vercel** from GitHub.

Production environment variables:

```text
MONGODB_URI
NEXTAUTH_SECRET
NEXTAUTH_URL
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
```

For production:

```text
NEXTAUTH_URL
```

must point to the deployed Vercel domain.

### Google OAuth Production Callback

```text
https://<your-vercel-domain>/api/auth/callback/google
```

---

# 👥 Roles

The database currently supports:

```text
student
faculty
coordinator
admin
```

| Role | Portal | Status |
|---|---|---|
| Student | `/student` | ✅ Built |
| Faculty | `/faculty` | ✅ Built |
| Admin | `/admin` | ✅ Built |
| Coordinator | `/coordinator` | 🚧 Planned |

### Current Role Flow

Public signup currently creates **Student** accounts by default.

Faculty/Admin role assignment is handled through **Admin User Management**.

---

# 🛡️ Security

Current security measures include:

- bcrypt password hashing
- JWT-based sessions
- Protected routes
- Role-based authorization
- Google OAuth
- Secure password-reset tokens
- SHA-256 token hashing
- Reset-token expiration
- Environment-based secrets
- Admin role protection
- Generic forgot-password responses to reduce account enumeration

### Planned Security Improvements

- API rate limiting
- Additional request validation
- Further production hardening
- More granular permission controls

---

# 📊 Project Status

### Core Development

**Core platform implemented and deployed.**

Current development is focused on:

- Faculty signup/registration flow
- Security hardening
- API rate limiting
- Final testing
- Edge-case handling
- Production polish

---

# 👥 Team

| Member | Responsibility |
|---|---|
| **Shlok** | Backend & Authentication |
| **Shrijan** | Frontend & UI/UX |
| **Sidharth** | Designing & Libraries |

---

# 📄 License

Built for:

**DevFusion 4.O — The Developers Hackathon**

This project is developed for educational and hackathon purposes.

Not licensed for production/commercial use.
