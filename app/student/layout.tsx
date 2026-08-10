export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex" }}>
      <nav style={{ width: 200, padding: "1rem" }}>
        <a href="/student">Dashboard</a><br />
        <a href="/student/attendance">Attendance</a><br />
        <a href="/student/assignments">Assignments</a><br />
        <a href="/student/notifications">Notifications</a><br />
        <a href="/student/profile">Profile</a>
      </nav>
      <main style={{ flex: 1, padding: "1rem" }}>{children}</main>
    </div>
  );
}