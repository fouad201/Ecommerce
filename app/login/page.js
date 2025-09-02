// app/login/page.jsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./login.css";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        
        const t = await res.text();
        throw new Error(t || "Login failed");
      }
      const data = await res.json(); 
      if (!data?.token) throw new Error("No token returned");

      
      localStorage.setItem("fs_token", data.token);

      
      

      router.push("/"); 
    } catch (e) {
      setErr(e.message || "Login error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username (FakeStore)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />

          <div className="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <Link href="#">Forgot password?</Link>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>

          {err && <p style={{ color: "crimson", marginTop: 8 }}>{err}</p>}
        </form>

        
        <div style={{ marginTop: 12, fontSize: 13, opacity: 0.8 }}>
          <div>
            Example username: <code>mor_2314</code>
          </div>
          <div>
            Example password: <code>83r5^_</code>
          </div>
        </div>
      </div>
    </div>
  );
}
