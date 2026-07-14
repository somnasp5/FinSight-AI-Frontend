import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Loader2 } from 'lucide-react'

import Input from '../common/Input.jsx'
import { addExpense } from '../../api/expenseApi.js'

// Categories shown in the dropdown. Kept as a plain array so adding a new
// one later is a one-line change.
const CATEGORIES = [
  'Food',
  'Groceries',
  'Shopping',
  'Transport',
  'Entertainment',
  'Bills',
  'Healthcare',
  'Other',
]

function ExpenseForm() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      merchant: '',
      category: '',
      totalAmount: '',
      purchaseDate: '',
      itemName: '',
      itemPrice: '',
    },
  })

  // React Query mutation that calls the backend.
  const { mutate, isPending } = useMutation({
    mutationFn: (payload) => addExpense(payload),
    onSuccess: () => {
      toast.success('Expense added successfully!')
      navigate('/dashboard')
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || 'Failed to add expense. Try again.'
      toast.error(message)
    },
  })

  const onSubmit = (data) => {
    // Only create an item entry if BOTH item name and item price were filled.
    const items =
      data.itemName && data.itemPrice
        ? [{ name: data.itemName, price: Number(data.itemPrice) }]
        : []

    const payload = {
      merchant: data.merchant,
      category: data.category,
      items,
      total_amount: Number(data.totalAmount),
      // The date input only gives us a day (YYYY-MM-DD), so convert it to
      // a full ISO timestamp before sending it to the backend.
      purchase_date: new Date(data.purchaseDate).toISOString(),
      receipt_image: 'manual',
    }

    mutate(payload)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
    >
      <Input
        label="Merchant Name"
        placeholder="e.g. Starbucks"
        error={errors.merchant?.message}
        {...register('merchant', { required: 'Merchant name is required' })}
      />

      {/* Category dropdown */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="category" className="text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          id="category"
          defaultValue=""
          className={`rounded-xl border bg-white px-3.5 py-2.5 text-sm text-gray-900 focus:border-[#8FBC8F] focus:outline-none focus:ring-2 focus:ring-[#E7F4E8] ${
            errors.category ? 'border-red-400' : 'border-gray-200'
          }`}
          {...register('category', { required: 'Please select a category' })}
        >
          <option value="" disabled>
            Select a category
          </option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-xs text-red-500">{errors.category.message}</p>
        )}
      </div>

      <Input
        label="Total Amount"
        type="number"
        step="0.01"
        placeholder="e.g. 250"
        error={errors.totalAmount?.message}
        {...register('totalAmount', {
          required: 'Total amount is required',
          min: { value: 0.01, message: 'Amount must be greater than 0' },
        })}
      />

      <Input
        label="Purchase Date"
        type="date"
        error={errors.purchaseDate?.message}
        {...register('purchaseDate', { required: 'Purchase date is required' })}
      />

      {/* Optional single item — only sent if both fields are filled */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Item Name (optional)"
          placeholder="e.g. Coffee"
          {...register('itemName')}
        />
        <Input
          label="Item Price (optional)"
          type="number"
          step="0.01"
          placeholder="e.g. 250"
          {...register('itemPrice')}
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#8FBC8F] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#7CAE7C] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
      >
        {isPending && <Loader2 size={16} className="animate-spin" />}
        {isPending ? 'Saving...' : 'Add Expense'}
      </button>
    </form>
  )
}

export default ExpenseForm
