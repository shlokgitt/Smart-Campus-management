"use client";
import { useEffect, useState } from "react";

export default function FacultyAssignmentsPage() {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("");

  function loadAssignments() {
    fetch("/api/faculty/assignments")
      .then((r) => r.json())
      .then(setAssignments);
  }

  useEffect(() => {
    loadAssignments();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Creating...");
    const res = await fetch("/api/faculty/assignments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, subject, deadline }),
    });
    if (res.ok) {
      setStatus("Created!");
      setTitle("");
      setDescription("");
      setSubject("");
      setDeadline("");
      loadAssignments();
    } else {
      setStatus("Failed to create.");
    }
  }

  return (
    <div>
      <h1>Assignments</h1>

      <h2>Create New</h2>
      <form onSubmit={handleCreate} style={{ maxWidth: 400, marginBottom: "2rem" }}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Title</label><br />
          <input value={title} onChange={(e) => setTitle(e.target.value)} required style={{ width: "100%", padding: "0.5rem" }} />
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Description</label><br />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: "100%", padding: "0.5rem" }} />
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Subject</label><br />
          <input value={subject} onChange={(e) => setSubject(e.target.value)} style={{ width: "100%", padding: "0.5rem" }} />
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Deadline</label><br />
          <input type="datetime-local" value={deadline} onChange={(e) => setDeadline(e.target.value)} required style={{ width: "100%", padding: "0.5rem" }} />
        </div>
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>Create</button>
      </form>
      {status && <p>{status}</p>}

      <h2>My Assignments</h2>
      <ul>
        {assignments.length === 0 && <li>No assignments created yet.</li>}
        {assignments.map((a: any) => (
          <li key={a._id}>{a.title} — due {new Date(a.deadline).toLocaleDateString()}</li>
        ))}
      </ul>
    </div>
  );
}