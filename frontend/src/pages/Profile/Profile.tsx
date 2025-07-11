import { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/auth/profile");
        setUser(res.data);
      } catch (err) {
        navigate("/login");
      }
    };
    fetchProfile();
  }, []);

  if (!user) return <p>Loading profile...</p>;

  return (
    <>
      <div className="profile-container">
        <h2>Welcome, {user.name}</h2>
        <p>Email: {user.email}</p>
        <p>User ID: {user.userId}</p>
      </div>
      <div>
        <button
          className="nav-link"
          onClick={() => {
            localStorage.removeItem("token");
            window.dispatchEvent(new Event("storage"));
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>
    </>
  );
}
