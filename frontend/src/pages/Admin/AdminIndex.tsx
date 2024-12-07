import { Heading } from "@/components/heading";
import { Outlet } from "react-router-dom";

export default function AdminIndex() {
  return (
    <div>
      <div className="px-6 py-4">
        <Heading title="Admin" />
      </div>
      {/* Add a sidebar or header for navigation */}
      <Outlet />
    </div>
  );
}
