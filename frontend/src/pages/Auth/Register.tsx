import "./Auth.css"
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { registerUser } from '../../services/api.ts';


export default function Register() {
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await registerUser({ email, name, password });
      const token = res.data.token;
      localStorage.setItem("token", token);
      window.dispatchEvent(new Event("storage"));
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Register failed.");
    }
  }



  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input type="text" name="name" autoComplete="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" name="email" autoComplete="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Register</button>
        <Link to="/login" className="link-auth">
          Already have an account?
        </Link>
      </form>
    </div>
  );
}
