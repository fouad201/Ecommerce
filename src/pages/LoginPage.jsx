import "./LoginPage.css";

export default function LoginPage() {
  return (
    <div className="container" style={{ maxWidth: 400 }}>
      <h2>Login</h2>
      <form>
        <input
          className="input"
          type="text"
          placeholder="Username"
        />
        <br /><br />
        <input
          className="input"
          type="password"
          placeholder="Password"
        />
        <br /><br />
        <button className="btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
