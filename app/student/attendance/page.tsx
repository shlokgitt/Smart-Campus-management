"use client";
import { useEffect, useState } from "react";

export default function AttendancePage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/student/attendance")
      .then((r) => r.json())
      .then(setData);
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>Attendance</h1>
      <p>
        Overall: {data.percentage}% ({data.present}/{data.total})
      </p>
      <ul>
        {data.records.length === 0 && <li>No attendance records yet.</li>}
        {data.records.map((r: any) => (
          <li key={r._id}>
            {r.subject} — {new Date(r.date).toLocaleDateString()} — {r.status}
          </li>
        ))}
      </ul>
    </div>
  );
}