import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Search, Inbox } from 'lucide-react'

import { getExpenses } from '../../api/expenseApi.js'
import LoadingSpinner from '../common/LoadingSpinner.jsx'

// Turns a raw amount into a nicely formatted rupee string, e.g. 1250 -> "₹1,250"
const formatAmount = (amount) => `₹${Number(amount).toLocaleString('en-IN')}`

// Turns an ISO date string into "DD MMM YYYY", e.g. "13 Jul 2026"
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function ExpenseTable() {
  const [searchTerm, setSearchTerm] = useState('')

  const {
    data: expenses = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['expenses'],
    queryFn: getExpenses,
  })

  // Filter by merchant name only, case-insensitive.
  const filteredExpenses = expenses.filter((expense) =>
    expense.merchant?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      {/* Search box */}
      <div className="relative mb-4 max-w-xs">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search by merchant..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-[#FAFAF7] py-2.5 pl-9 pr-3 text-sm text-gray-900 focus:border-[#8FBC8F] focus:outline-none focus:ring-2 focus:ring-[#E7F4E8]"
        />
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center gap-3 py-16">
          <LoadingSpinner size={28} className="text-[#4C8C63]" />
          <p className="text-sm text-gray-500">Loading expenses...</p>
        </div>
      )}

      {/* Error state */}
      {isError && !isLoading && (
        <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
          <p className="text-sm text-gray-500">
            Couldn&apos;t load your expenses. Please try again.
          </p>
        </div>
      )}

      {/* Empty state — no expenses at all */}
      {!isLoading && !isError && expenses.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E7F4E8]">
            <Inbox size={20} className="text-[#4C8C63]" />
          </div>
          <p className="text-sm text-gray-500">No expenses yet.</p>
        </div>
      )}

      {/* No results for the current search */}
      {!isLoading && !isError && expenses.length > 0 && filteredExpenses.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-sm text-gray-500">
            No expenses match &quot;{searchTerm}&quot;.
          </p>
        </div>
      )}

      {/* Table */}
      {!isLoading && !isError && filteredExpenses.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px] text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-gray-500">
                <th className="py-2 pr-4 font-medium">Merchant</th>
                <th className="py-2 pr-4 font-medium">Category</th>
                <th className="py-2 pr-4 font-medium">Amount</th>
                <th className="py-2 pr-4 font-medium">Purchase Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredExpenses.map((expense) => (
                <tr key={expense._id || expense.id}>
                  <td className="py-3 pr-4 font-medium text-gray-900">
                    {expense.merchant}
                  </td>
                  <td className="py-3 pr-4">
                    <span className="rounded-full bg-[#E7F4E8] px-2.5 py-1 text-xs font-medium text-[#4C8C63]">
                      {expense.category}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-gray-900">
                    {formatAmount(expense.total_amount)}
                  </td>
                  <td className="py-3 pr-4 text-gray-500">
                    {formatDate(expense.purchase_date)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ExpenseTable
