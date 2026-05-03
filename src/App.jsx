import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Inventory from "./pages/Inventory";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotAuthorized from "./pages/NotAuthorized";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/not-authorized" element={<NotAuthorized />} />
      </Routes>
    </>
  );
}

export default App;