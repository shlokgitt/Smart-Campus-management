"use client";
import { useEffect, useState } from "react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/student/notifications")
      .then((r) => r.json())
      .then((data) => {
        setNotifications(data);
        setLoading(false);
      });
  }, []);

  async function markAsRead(id: string) {
    await fetch(`/api/student/notifications/${id}/read`, { method: "PATCH" });
    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
    );
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Notifications</h1>
      {notifications.length === 0 && <p>No notifications yet.</p>}
      <ul>
        {notifications.map((n) => (
          <li key={n._id} style={{ marginBottom: "0.5rem" }}>
            <strong>{n.title}</strong> — {n.message}{" "}
            {n.isRead ? (
              "(read)"
            ) : (
              <button onClick={() => markAsRead(n._id)}>Mark as read</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}