import { Menu } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'

// title is passed in from MainLayout, which already knows the current route.
// onMenuClick opens the sidebar drawer on tablet/mobile.
function Navbar({ title, onMenuClick }) {
  const { user } = useAuth()

  const firstName = user?.fullName?.split(' ')[0] || 'there'
  const firstLetter = user?.fullName?.[0]?.toUpperCase() || 'U'

  return (
    <header className="flex items-center justify-between border-b border-gray-100 bg-white px-4 py-4 lg:px-8">
      {/* Left side: hamburger (tablet/mobile only) + page title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-50 lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
      </div>

      {/* Right side: welcome message + avatar */}
      <div className="flex items-center gap-3">
        <span className="hidden text-sm text-gray-500 sm:block">
          Welcome, <span className="font-medium text-gray-900">{firstName}</span>
        </span>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#A8D5BA] text-sm font-semibold text-gray-900">
          {firstLetter}
        </div>
      </div>
    </header>
  )
}

export default Navbar
