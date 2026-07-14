import { Outlet } from 'react-router-dom'
import { TrendingUp } from 'lucide-react'

// Shared shell for Login and Signup. Keeps a calm branding panel on the
// left for larger screens and just shows the form on mobile.
function AuthLayout() {
  return (
    <div className="min-h-screen bg-cream flex">
      {/* Branding panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary-700 text-cream flex-col justify-between p-12">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-500">
            <TrendingUp size={18} strokeWidth={2.5} />
          </div>
          <span className="font-display text-lg font-bold">FinSight AI</span>
        </div>

        <div className="max-w-md">
          <h1 className="font-display text-3xl font-bold leading-tight">
            Snap a receipt.
            <br />
            Know where it went.
          </h1>
          <p className="mt-4 text-primary-100 text-sm leading-relaxed">
            FinSight AI reads your receipts, sorts every purchase into a
            category, and keeps a running picture of your spending — no
            manual entry required.
          </p>
        </div>

        <p className="text-xs text-primary-200">
          © {new Date().getFullYear()} FinSight AI
        </p>
      </div>

      {/* Form panel */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
