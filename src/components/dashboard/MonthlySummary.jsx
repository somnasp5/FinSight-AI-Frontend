import { BarChart3 } from 'lucide-react'

// Placeholder card for the monthly spending chart.
// The real Recharts bar chart gets wired up once the analytics API is connected.
function MonthlySummary() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <h2 className="text-base font-semibold text-gray-900">Monthly Spending</h2>

      <div className="mt-4 flex h-64 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-gray-200 bg-[#FAFAF7]">
        <BarChart3 size={28} className="text-gray-300" strokeWidth={1.5} />
        <p className="text-sm text-gray-400">Chart will be connected in Phase 4</p>
      </div>
    </div>
  )
}

export default MonthlySummary
