"use client";
import { useEffect, useState } from "react";

export default function FacultyAttendancePage() {
  const [students, setStudents] = useState<any[]>([]);
  const [studentId, setStudentId] = useState("");
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("present");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/faculty/students")
      .then((r) => r.json())
      .then(setStudents);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("Saving...");
    const res = await fetch("/api/faculty/attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId, subject, date, status }),
    });
    if (res.ok) {
      setMessage("Attendance marked!");
    } else {
      setMessage("Failed to mark attendance.");
    }
  }

  return (
    <div>
      <h1>Mark Attendance</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Student</label><br />
          <select value={studentId} onChange={(e) => setStudentId(e.target.value)} required style={{ width: "100%", padding: "0.5rem" }}>
            <option value="">Select a student</option>
            {students.map((s: any) => (
              <option key={s._id} value={s._id}>{s.name} ({s.email})</option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Subject</label><br />
          <input value={subject} onChange={(e) => setSubject(e.target.value)} required style={{ width: "100%", padding: "0.5rem" }} />
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Date</label><br />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required style={{ width: "100%", padding: "0.5rem" }} />
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Status</label><br />
          <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ width: "100%", padding: "0.5rem" }}>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
          </select>
        </div>
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>Mark Attendance</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}