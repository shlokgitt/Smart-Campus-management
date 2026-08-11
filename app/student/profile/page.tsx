"use client";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("/api/student/profile")
      .then((r) => r.json())
      .then(setProfile);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Saving...");
    const res = await fetch("/api/student/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: profile.name,
        phone: profile.phone,
        department: profile.department,
        bio: profile.bio,
        linkedin: profile.linkedin,
        github: profile.github,
      }),
    });
    if (res.ok) {
      setStatus("Saved!");
    } else {
      setStatus("Failed to save.");
    }
  }

  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h1>Profile</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Name</label><br />
          <input
            value={profile.name || ""}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Email (read-only)</label><br />
          <input value={profile.email || ""} disabled style={{ width: "100%", padding: "0.5rem" }} />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Phone</label><br />
          <input
            value={profile.phone || ""}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Department</label><br />
          <input
            value={profile.department || ""}
            onChange={(e) => setProfile({ ...profile, department: e.target.value })}
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Bio</label><br />
          <textarea
            value={profile.bio || ""}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>LinkedIn</label><br />
          <input
            value={profile.linkedin || ""}
            onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>GitHub</label><br />
          <input
            value={profile.github || ""}
            onChange={(e) => setProfile({ ...profile, github: e.target.value })}
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Save
        </button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}