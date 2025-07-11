import { NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../../assets/react.svg"
import "./Navbar.css"

export default function Navbar() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
      const handleStorageChange = () => {
        setIsAuth(!!localStorage.getItem("token"));
      };
      window.addEventListener("storage", handleStorageChange);

      return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          <img className="logo-img" src={logo} alt="logo"></img>
          MyShop
        </Link>
        <div className="nav-links">
          <NavLink to="/cart" className="nav-link">
            Cart
          </NavLink>
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          {isAuth ? (
            <NavLink to="/profile" className="nav-link">
              Profile
            </NavLink>
          ) : (
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}
