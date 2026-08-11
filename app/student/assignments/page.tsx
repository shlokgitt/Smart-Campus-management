"use client";
import { useEffect, useState } from "react";

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/student/assignments")
      .then((r) => r.json())
      .then((data) => {
        setAssignments(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Assignments</h1>
      {assignments.length === 0 && <p>No assignments yet.</p>}
      <ul>
        {assignments.map((a) => (
          <li key={a._id} style={{ marginBottom: "0.5rem" }}>
            <a href={`/student/assignments/${a._id}`}>
              {a.title} — due {new Date(a.deadline).toLocaleDateString()}
              {a.submitted ? " ✅ Submitted" : " ⏳ Pending"}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}