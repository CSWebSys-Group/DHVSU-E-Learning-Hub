import { UsersType } from "@/lib/types";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedNotAuthRoutes({
  user,
}: {
  user: UsersType | null;
}) {
  return !user ? <Outlet /> : <Navigate to="/dashboard" />;
}
