import { Navigate } from "react-router-dom";
import useUserRole from "@/hooks/useUserRole"; // Adjust path as needed
import { ReactNode } from "react";
import useTokenStore from "@/store";

type ProtectedRouteProps = {
  allowedRoles: string[];
  children: ReactNode;
};

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const role = useUserRole();
  const { setToken } = useTokenStore((state) => state);

  if (role === null) {
    // You can show a loading spinner or redirect to login if needed
    console.log("Role is null");

    return <Navigate to="/auth/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    console.log("Role is not allowed");
    setToken("");
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
