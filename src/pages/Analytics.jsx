import { useState } from 'react'

import CategoryChart from '../components/analytics/CategoryChart.jsx'
import TopMerchants from '../components/analytics/TopMerchants.jsx'
import YearSummary from '../components/analytics/YearSummary.jsx'

const MONTHS = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
]

// Offers the current year and the 4 years before it.
const currentYear = new Date().getFullYear()
const YEARS = [0, 1, 2, 3, 4].map((offset) => currentYear - offset)

function Analytics() {
  const [year, setYear] = useState(currentYear)
  const [month, setMonth] = useState(new Date().getMonth() + 1)

  const selectClasses =
    'rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 focus:border-[#8FBC8F] focus:outline-none focus:ring-2 focus:ring-[#E7F4E8]'

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="mt-1 text-sm text-gray-500">
          See where your money goes, by category, month, and merchant.
        </p>
      </div>

      {/* Year & month selectors */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={year}
          onChange={(event) => setYear(Number(event.target.value))}
          className={selectClasses}
          aria-label="Select year"
        >
          {YEARS.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <select
          value={month}
          onChange={(event) => setMonth(Number(event.target.value))}
          className={selectClasses}
          aria-label="Select month"
        >
          {MONTHS.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      </div>

      {/* Total spending for the selected year */}
      <YearSummary year={year} />

      {/* Category chart + top merchants */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CategoryChart year={year} month={month} />
        </div>
        <TopMerchants />
      </div>
    </div>
  )
}

export default Analytics
