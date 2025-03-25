import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/autStore";

const ProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { isAuthenticated } = useAuthStore.getState();

  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(useAuthStore.getState().role)) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
