"use client";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((r) => r.json())
      .then(setStats);
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem", flexWrap: "wrap" }}>
        <div style={{ border: "1px solid #444", padding: "1rem", minWidth: 150 }}>
          <h3>Students</h3>
          <p style={{ fontSize: "1.5rem" }}>{stats.totalStudents}</p>
        </div>
        <div style={{ border: "1px solid #444", padding: "1rem", minWidth: 150 }}>
          <h3>Faculty</h3>
          <p style={{ fontSize: "1.5rem" }}>{stats.totalFaculty}</p>
        </div>
        <div style={{ border: "1px solid #444", padding: "1rem", minWidth: 150 }}>
          <h3>Admins</h3>
          <p style={{ fontSize: "1.5rem" }}>{stats.totalAdmins}</p>
        </div>
        <div style={{ border: "1px solid #444", padding: "1rem", minWidth: 150 }}>
          <h3>Assignments</h3>
          <p style={{ fontSize: "1.5rem" }}>{stats.totalAssignments}</p>
        </div>
        <div style={{ border: "1px solid #444", padding: "1rem", minWidth: 150 }}>
          <h3>Attendance Records</h3>
          <p style={{ fontSize: "1.5rem" }}>{stats.totalAttendanceRecords}</p>
        </div>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h2>Quick Links</h2>
        <a href="/admin/users">Manage Users</a>
      </div>
    </div>
  );
}