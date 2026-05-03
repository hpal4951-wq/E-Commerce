import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isLoggedIn, logout, currentUser, role } = useAuth();

  return (
    <nav style={{ padding: "20px", background: "#333", color: "#fff" }}>
      <Link to="/products" style={{ marginRight: "10px", color: "#fff" }}>
        Products
      </Link>

      {isLoggedIn && (
        <Link to="/cart" style={{ marginRight: "10px", color: "#fff" }}>
          Cart
        </Link>
      )}

      {role === "admin" && (
        <Link to="/inventory" style={{ marginRight: "10px", color: "#fff" }}>
          Inventory
        </Link>
      )}

      {!isLoggedIn ? (
        <>
          <Link to="/login" style={{ marginRight: "10px", color: "#fff" }}>
            Login
          </Link>

          <Link to="/signup" style={{ color: "#fff" }}>
            Signup
          </Link>
        </>
      ) : (
        <>
          <span style={{ marginRight: "10px" }}>
            {currentUser?.username} ({role})
          </span>

          <button onClick={logout}>Logout</button>
        </>
      )}
    </nav>
  );
};

export default Navbar;