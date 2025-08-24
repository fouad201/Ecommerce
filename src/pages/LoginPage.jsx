import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../state/AuthContext.jsx";
import "./LoginPage.css"; 

export default function LoginPage() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true); setError("");
    try {
      await login(username, password); // calls /auth/login via axios
      nav("/");
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 400 }}>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <input
          className="input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br/><br/>
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br/><br/>
        <button className="btn" type="submit" disabled={busy}>
          {busy ? "Logging in…" : "Login"}
        </button>
        {error && <p style={{ color: "crimson" }}>{error}</p>}
        <p className="small" style={{ marginTop: 8 }}>
          Using FakeStore API? Try a known demo account if needed.
        </p>
      </form>
    </div>
  );
}
