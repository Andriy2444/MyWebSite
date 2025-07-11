import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar.tsx";
import Home from "../pages/Home/Home.tsx";
import Profile from "../pages/Profile/Profile.tsx";
import Cart from "../components/Cart/Cart.tsx";
import Login from "../pages/Auth/Login.tsx";
import Register from "../pages/Auth/Register.tsx";
import ProductDetails from '../pages/ProductDetalis/ProductDetails.tsx';

export default function Router() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
