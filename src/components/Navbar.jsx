import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { isLoggedIn, logout, role, currentUser } = useAuth();
  const { totalQuantity } = useCart();

  return (
    <nav className="navbar">
      <Link to="/products" className="logo">
        E-Shop
      </Link>

      <div className="nav-links">
        <NavLink to="/products">Products</NavLink>

        {isLoggedIn && <NavLink to="/cart">Cart ({totalQuantity})</NavLink>}

        {role === "admin" && <NavLink to="/inventory">Inventory</NavLink>}

        {!isLoggedIn ? (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
          </>
        ) : (
          <>
            <span>{currentUser?.username}</span>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;