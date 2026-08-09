export default function Unauthorized() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>403 — Unauthorized</h1>
      <p>You don't have permission to view this page.</p>
      <a href="/">Go home</a>
    </main>
  );
}