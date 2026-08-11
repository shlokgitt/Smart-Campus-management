"use client";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function AssignmentDetailPage() {
  const params = useParams();
  const [fileUrl, setFileUrl] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [status, setStatus] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(`/api/student/assignments/${params.id}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileUrl, githubLink }),
    });
    if (res.ok) {
      setStatus("Submitted successfully!");
    } else {
      setStatus("Submission failed.");
    }
  }

  return (
    <div>
      <h1>Submit Assignment</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <div style={{ marginBottom: "1rem" }}>
          <label>File URL (optional)</label><br />
          <input
            value={fileUrl}
            onChange={(e) => setFileUrl(e.target.value)}
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>GitHub Link (optional)</label><br />
          <input
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Submit
        </button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}