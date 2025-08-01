import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../services/api.ts";

export default function Login() {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await loginUser({ email, password });
      const token = res.data.token;
      localStorage.setItem("token", token);
      window.dispatchEvent(new Event("storage"));
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message ||"Login failed");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input type="email" name="email" autoComplete="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" name="password" autoComplete="current-password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
        {error && <div className="error-message">{error}</div>}
        <Link to="/register" className="link-auth">
          Don't have an account?
        </Link>
      </form>
    </div>
  );
}
