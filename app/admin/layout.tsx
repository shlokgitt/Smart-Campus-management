export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex" }}>
      <nav style={{ width: 200, padding: "1rem" }}>
        <a href="/admin">Dashboard</a><br />
        <a href="/admin/users">Users</a>
      </nav>
      <main style={{ flex: 1, padding: "1rem" }}>{children}</main>
    </div>
  );
}