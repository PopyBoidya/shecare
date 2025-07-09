import { Outlet } from "react-router-dom";
import Sidebar from "./Shared/Sidbar/Sidbar";

const Admin = () => {
  return (
    <div>
      {/* Sidebar is fixed */}
      <Sidebar />

      {/* Main content area with margin-left to prevent overlap */}
      <div className="ml-64 h-screen overflow-y-auto p-6 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
