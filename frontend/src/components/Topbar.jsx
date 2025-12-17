import { Bell, User, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Topbar() {
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center justify-between bg-white px-6 py-4 shadow">
      {/* Search */}
      <input
        type="text"
        placeholder="Search..."
        className="border rounded-md px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />

      {/* Right */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        {/* <button className="relative">
          <Bell className="w-6 h-6 text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
            3
          </span>
        </button> */}

        {/* User Info */}
        <div className="flex items-center gap-2">
          <User className="w-7 h-7 text-gray-600" />
          <span className="font-semibold text-gray-700">
            {user?.email || "Admin"}
          </span>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="flex items-center gap-1 bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 transition"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
}
