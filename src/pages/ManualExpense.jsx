import ExpenseForm from '../components/expenses/ExpenseForm.jsx'

function ManualExpense() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Add Manual Expense</h1>
        <p className="mt-1 text-sm text-gray-500">
          Log an expense by hand when you don&apos;t have a receipt to upload.
        </p>
      </div>

      <div className="max-w-xl">
        <ExpenseForm />
      </div>
    </div>
  )
}

export default ManualExpense
