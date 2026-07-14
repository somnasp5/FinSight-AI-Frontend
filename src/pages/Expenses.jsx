import { Link } from "react-router-dom";
import ExpenseTable from "../components/expenses/ExpenseTable.jsx";

function Expenses() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Expenses</h1>

          <p className="mt-1 text-sm text-gray-500">
            Browse and search through all of your logged expenses.
          </p>
        </div>

        <Link
          to="/expenses/new"
          className="rounded-xl bg-[#8FBC8F] px-4 py-2 text-white font-medium hover:bg-[#7CAE7C]"
        >
          + Add Expense
        </Link>
      </div>

      <ExpenseTable />
    </div>
  );
}

export default Expenses;
