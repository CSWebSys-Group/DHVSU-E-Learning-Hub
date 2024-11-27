import LoadingSpinner from "@/components/LoadingSpinner";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedNotAuthRoutes({
  token,
}: {
  token: string | null | undefined;
}) {
  if (token === undefined) return <LoadingSpinner loading={true} />;

  return !token ? <Outlet /> : <Navigate to="/user/dashboard" />;
}
