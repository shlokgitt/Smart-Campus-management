"use client";
import { useEffect, useState } from "react";

export default function StudentDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch("/api/student/dashboard")
      .then((r) => r.json())
      .then(setStats);
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div>
      <h1>Student Dashboard</h1>
      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <div style={{ border: "1px solid #444", padding: "1rem", minWidth: 150 }}>
          <h3>Attendance</h3>
          <p style={{ fontSize: "1.5rem" }}>{stats.attendancePercentage}%</p>
        </div>
        <div style={{ border: "1px solid #444", padding: "1rem", minWidth: 150 }}>
          <h3>Pending Assignments</h3>
          <p style={{ fontSize: "1.5rem" }}>{stats.pendingAssignments}</p>
        </div>
        <div style={{ border: "1px solid #444", padding: "1rem", minWidth: 150 }}>
          <h3>Total Assignments</h3>
          <p style={{ fontSize: "1.5rem" }}>{stats.totalAssignments}</p>
        </div>
        <div style={{ border: "1px solid #444", padding: "1rem", minWidth: 150 }}>
          <h3>Unread Notifications</h3>
          <p style={{ fontSize: "1.5rem" }}>{stats.unreadNotifications}</p>
        </div>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h2>Quick Links</h2>
        <a href="/student/attendance">View Attendance</a><br />
        <a href="/student/assignments">View Assignments</a><br />
        <a href="/student/notifications">View Notifications</a><br />
        <a href="/student/profile">Edit Profile</a>
      </div>
    </div>
  );
}