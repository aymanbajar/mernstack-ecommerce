import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/Auth/AuthContext";

export default function AdminRoute() {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "admin") {
    // Redirect normal users to home if they try to access admin pages
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
