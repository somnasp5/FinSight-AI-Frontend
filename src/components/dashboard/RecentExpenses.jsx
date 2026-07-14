function RecentExpenses({ expenses = [], isLoading }) {
  if (isLoading) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-gray-900">
          Recent Expenses
        </h2>

        <p className="mt-6 text-sm text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <h2 className="text-base font-semibold text-gray-900">Recent Expenses</h2>

      {expenses.length === 0 ? (
        <p className="mt-6 text-sm text-gray-500">No expenses yet.</p>
      ) : (
        <div className="mt-4 flex flex-col divide-y divide-gray-100">
          {expenses.map((expense) => (
            <div
              key={expense._id}
              className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-gray-900">
                  {expense.merchant}
                </p>

                <p className="text-xs text-gray-500">{expense.category}</p>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-sm font-semibold text-gray-900">
                  ₹{expense.total_amount}
                </p>

                <p className="text-xs text-gray-500">
                  {new Date(expense.purchase_date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentExpenses;
