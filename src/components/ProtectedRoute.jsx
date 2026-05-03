import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isLoggedIn, role } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && role !== "admin") {
    return <Navigate to="/not-authorized" />;
  }

  return children;
};

export default ProtectedRoute;