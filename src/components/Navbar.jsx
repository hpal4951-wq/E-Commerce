
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "20px", background: "#333", color: "#fff" }}>
      <Link to="/products" style={{ marginRight: "10px", color: "#fff" }}>
        Products
      </Link>

      <Link to="/cart" style={{ marginRight: "10px", color: "#fff" }}>
        Cart
      </Link>

      <Link to="/inventory" style={{ marginRight: "10px", color: "#fff" }}>
        Inventory
      </Link>

      <Link to="/login" style={{ marginRight: "10px", color: "#fff" }}>
        Login
      </Link>

      <Link to="/signup" style={{ color: "#fff" }}>
        Signup
      </Link>
    </nav>
  );
};

export default Navbar;