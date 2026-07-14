import { useQuery } from '@tanstack/react-query'
import { Wallet } from 'lucide-react'

import { getYearAnalytics } from '../../api/analyticsApi.js'
import LoadingSpinner from '../common/LoadingSpinner.jsx'

const formatAmount = (amount) => `₹${Number(amount).toLocaleString('en-IN')}`

// Expects the backend to return an object like { total_amount: 48250 }.
// Falls back to a "total" field too, in case the backend names it differently.
function YearSummary({ year }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['yearAnalytics', year],
    queryFn: () => getYearAnalytics(year),
  })

  const total = data?.total_amount ?? data?.total ?? 0

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E7F4E8]">
        <Wallet size={20} className="text-[#4C8C63]" strokeWidth={2} />
      </div>

      <p className="mt-4 text-sm text-gray-500">Total spending in {year}</p>

      {isLoading && (
        <div className="mt-3">
          <LoadingSpinner size={22} className="text-[#4C8C63]" />
        </div>
      )}

      {isError && !isLoading && (
        <p className="mt-2 text-sm text-gray-500">
          Couldn&apos;t load this total. Please try again.
        </p>
      )}

      {!isLoading && !isError && (
        <p className="mt-1 text-3xl font-bold text-gray-900">
          {formatAmount(total)}
        </p>
      )}
    </div>
  )
}

export default YearSummary
