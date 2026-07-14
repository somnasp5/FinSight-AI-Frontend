import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import Sidebar from '../components/dashboard/Sidebar.jsx'
import Navbar from '../components/dashboard/Navbar.jsx'

// Maps each route to the title shown in the Navbar.
// Simple lookup object — no need for anything fancier.
const pageTitles = {
  '/dashboard': 'Dashboard',
  '/upload': 'Upload Receipt',
  '/expenses': 'Expenses',
  '/analytics': 'Analytics',
  '/profile': 'Profile',
}

// Shell for every authenticated page: sidebar on the left, navbar on top,
// and the current page in the middle (via <Outlet />).
function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const location = useLocation()

  const currentTitle = pageTitles[location.pathname] || 'Dashboard'

  return (
    <div className="flex min-h-screen bg-[#FAFAF7]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Everything to the right of the sidebar */}
      <div className="flex min-h-screen flex-1 flex-col">
        <Navbar title={currentTitle} onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="flex-1 px-4 py-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout
