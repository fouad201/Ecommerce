"use client";
export default function Error({ error }) {
  return (
    <main className="container" style={{ padding: "24px 0" }}>
      <h1>Something went wrong</h1>
      <p>{error?.message}</p>
    </main>
  );
}
