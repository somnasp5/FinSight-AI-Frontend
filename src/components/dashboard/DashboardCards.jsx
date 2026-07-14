import { Wallet, CalendarDays, Receipt, Tag } from "lucide-react";

function DashboardCards({ data, isLoading }) {
  const stats = [
    {
      label: "Total Expenses",
      value: isLoading ? `₹0` : `₹${data?.total_expenses ?? 0}`,
      icon: Wallet,
    },
    {
      label: "Monthly Expenses",
      value: isLoading ? `₹0` : `₹${data?.monthly_expenses ?? 0}`,
      icon: CalendarDays,
    },
    {
      label: "Receipts Uploaded",
      value: isLoading ? 0 : (data?.total_receipts ?? 0),
      icon: Receipt,
    },
    {
      label: "Categories",
      value: isLoading ? 0 : (data?.total_categories ?? 0),
      icon: Tag,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E7F4E8]">
            <Icon size={18} className="text-[#4C8C63]" />
          </div>

          <p className="mt-4 text-sm text-gray-500">{label}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;
