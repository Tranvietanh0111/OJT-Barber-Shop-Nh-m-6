import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ roles }) {
  const { user } = useAuth();
  const location = useLocation();
  const token = localStorage.getItem("access_token");

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (roles?.length && (!user?.role || !roles.includes(user.role))) {
    return <Navigate to="/overview" replace />;
  }

  return <Outlet />;
}
