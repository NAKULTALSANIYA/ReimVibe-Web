import { LogOut, X } from "lucide-react";

export default function LogoutConfirmationModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn"
        onClick={onCancel}
      ></div>

      {/* Modal Container */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden animate-scaleIn">
        {/* Decorative top bar */}
        <div className="h-2 bg-gradient-to-r from-red-500 via-red-400 to-red-500"></div>
        
        {/* Close button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Modal Content */}
        <div className="p-8 text-center">
          {/* Animated Logout Icon */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              {/* Background circle with gradient */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center">
                {/* Pulsing animation ring */}
                <div className="absolute w-20 h-20 rounded-full border-4 border-red-200 animate-ping opacity-50"></div>
                {/* Main icon */}
                <div className="animate-logout-bounce">
                  <LogOut size={40} className="text-red-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Log Out?
          </h2>

          {/* Message */}
          <p className="text-gray-500 mb-8 leading-relaxed">
            Are you sure you want to log out? You'll need to sign in again to access the admin panel.
          </p>

          {/* Action Buttons */}
          <div className="flex gap-4">
            {/* Cancel Button */}
            <button
              onClick={onCancel}
              className="flex-1 px-6 py-3 rounded-xl font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              Cancel
            </button>

            {/* Confirm Logout Button */}
            <button
              onClick={onConfirm}
              className="flex-1 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-red-500/30 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <LogOut size={18} />
              Log Out
            </button>
          </div>
        </div>

        {/* Decorative bottom gradient */}
        <div className="h-1 bg-gradient-to-r from-transparent via-red-200 to-transparent"></div>
      </div>
    </div>
  );
}

