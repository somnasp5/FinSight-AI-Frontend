import { useNavigate } from "react-router-dom";
import { LogOut, ShieldCheck, Lock, CheckCircle2 } from "lucide-react";

import { useAuth } from "../../context/AuthContext.jsx";

function ProfileActions() {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">Account</h3>

      <p className="mt-1 text-sm text-gray-500">
        Your account is protected and ready to use.
      </p>

      <div className="mt-6 space-y-4">
        <div className="flex items-center gap-3 rounded-xl bg-[#F4FAF4] p-3">
          <ShieldCheck size={20} className="text-[#4C8C63]" />

          <div>
            <p className="text-sm font-medium text-gray-900">Secure Login</p>

            <p className="text-xs text-gray-500">JWT Authentication Enabled</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-[#F4FAF4] p-3">
          <Lock size={20} className="text-[#4C8C63]" />

          <div>
            <p className="text-sm font-medium text-gray-900">Session Status</p>

            <p className="text-xs text-gray-500">Logged in successfully</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-[#F4FAF4] p-3">
          <CheckCircle2 size={20} className="text-[#4C8C63]" />

          <div>
            <p className="text-sm font-medium text-gray-900">Account Status</p>

            <p className="text-xs text-gray-500">Active</p>
          </div>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#8FBC8F] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#7CAE7C]"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}

export default ProfileActions;
