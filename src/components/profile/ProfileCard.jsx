import { Mail, Receipt, Wallet, ShoppingBag } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "../../api/dashboardApi.js";

const formatAmount = (amount) =>
  `₹${Number(amount || 0).toLocaleString("en-IN")}`;

function ProfileCard() {
  const { user } = useAuth();

  const { data } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
  });

  const firstLetter = user?.full_name?.charAt(0).toUpperCase() || "U";

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      {/* Avatar */}
      <div className="flex flex-col items-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#8FBC8F] text-4xl font-bold text-white shadow-md">
          {firstLetter}
        </div>

        <h2 className="mt-4 text-xl font-bold text-gray-900">
          {user?.full_name}
        </h2>

        <div className="mt-2 flex items-center gap-2 text-gray-500">
          <Mail size={16} />
          <span className="text-sm">{user?.email}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-gray-100"></div>

      {/* Financial Overview */}
      <h3 className="mb-4 text-lg font-semibold text-gray-900">
        Financial Overview
      </h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Receipt size={18} className="text-[#4C8C63]" />
            <span className="text-gray-600">Receipts Uploaded</span>
          </div>

          <span className="font-semibold">{data?.total_receipts ?? 0}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-[#4C8C63]" />
            <span className="text-gray-600">Expenses Logged</span>
          </div>

          <span className="font-semibold">
            {data?.recent_expenses?.length ?? 0}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet size={18} className="text-[#4C8C63]" />
            <span className="text-gray-600">Total Spending</span>
          </div>

          <span className="font-semibold text-[#4C8C63]">
            {formatAmount(data?.total_expenses)}
          </span>
        </div>
      </div>

      {/* Quote */}
      <div className="mt-8 rounded-xl bg-[#F4FAF4] p-4">
        <p className="text-center text-sm italic text-gray-600">
          "Every small expense tracked today builds stronger financial habits
          tomorrow."
        </p>
      </div>
    </div>
  );
}

export default ProfileCard;
