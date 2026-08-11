export default function FacultyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex" }}>
      <nav style={{ width: 200, padding: "1rem" }}>
        <a href="/faculty">Dashboard</a><br />
        <a href="/faculty/assignments">Assignments</a><br />
        <a href="/faculty/attendance">Attendance</a><br />
        <a href="/faculty/submissions">Submissions</a>
      </nav>
      <main style={{ flex: 1, padding: "1rem" }}>{children}</main>
    </div>
  );
}