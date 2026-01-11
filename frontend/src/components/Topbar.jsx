import { useState } from "react";
import { User, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import LogoutConfirmationModal from "./LogoutConfirmationModal";

export default function Topbar() {
  const { user, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(false);
    logout();
  };

  return (
    <div className="flex items-center justify-end bg-white px-6 py-4 shadow">
      {/* Right */}
      <div className="flex items-center gap-6">
        {/* User Info */}
        <div className="flex items-center gap-2">
          <User className="w-7 h-7 text-gray-600" />
          <span className="font-semibold text-gray-700">
            {user?.email || "Admin"}
          </span>
        </div>

        {/* Logout */}
        <button
          onClick={() => setShowLogoutModal(true)}
          className="flex items-center gap-1 bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 transition"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      <LogoutConfirmationModal
        isOpen={showLogoutModal}
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutModal(false)}
      />
    </div>
  );
}
