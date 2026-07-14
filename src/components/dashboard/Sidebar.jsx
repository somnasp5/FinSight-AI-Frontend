import { NavLink } from "react-router-dom";
import { Home, Upload, Wallet, BarChart3, User, LogOut, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";

// All sidebar links live in one array, so adding a new page later is just
// one new line here instead of hunting through JSX.
const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: Home },
  { to: "/upload", label: "Upload Receipt", icon: Upload },
  { to: "/expenses", label: "Expenses", icon: Wallet },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/profile", label: "Profile", icon: User },
];

// isOpen / onClose control the slide-in drawer on tablet & mobile.
// On desktop the sidebar is just always visible.
function Sidebar({ isOpen, onClose }) {
  const { logoutUser } = useAuth();

  return (
    <>
      {/* Dark overlay behind the drawer, only shown on tablet/mobile when open */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/20 lg:hidden"
        />
      )}

      <aside
        className={`fixed z-40 flex h-screen w-[250px] flex-col border-r border-gray-100 bg-white px-4 py-6 transition-transform duration-200 lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="mb-8 flex items-center justify-between px-2">
          <span className="text-lg font-bold tracking-tight text-gray-900">
            FinSight AI
          </span>
          {/* Close button, only useful on the mobile/tablet drawer */}
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-50 lg:hidden"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-1 flex-col gap-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#BFE3C0] text-gray-900"
                    : "text-gray-500 hover:bg-[#E7F4E8] hover:text-gray-900"
                }`
              }
            >
              <Icon size={18} strokeWidth={2} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Logout sits at the bottom, separated from the main nav */}
        <button
          onClick={logoutUser}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-500 transition-colors hover:bg-[#E7F4E8] hover:text-gray-900"
        >
          <LogOut size={18} strokeWidth={2} />
          Logout
        </button>
      </aside>
    </>
  );
}

export default Sidebar;
