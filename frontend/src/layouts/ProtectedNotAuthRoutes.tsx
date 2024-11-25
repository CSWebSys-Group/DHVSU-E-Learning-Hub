import LoadingSpinner from "@/components/LoadingSpinner";
import { UsersType } from "@/lib/types";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedNotAuthRoutes({
  user,
}: {
  user: UsersType | null | undefined;
}) {
  if (user === undefined) return <LoadingSpinner loading={true} />;

  return !user ? <Outlet /> : <Navigate to="/user/dashboard" />;
}
