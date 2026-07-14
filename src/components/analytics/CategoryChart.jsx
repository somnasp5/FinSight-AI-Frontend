import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { BarChart3 } from "lucide-react";

import { getCategoryAnalytics } from "../../api/analyticsApi.js";
import LoadingSpinner from "../common/LoadingSpinner.jsx";

// Expects the backend to return an array like:
// [{ category: "Food", amount: 1200 }, { category: "Transport", amount: 400 }, ...]
// Adjust the dataKeys below if your backend uses different field names.
function CategoryChart({ year, month }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categoryAnalytics", year, month],
    queryFn: () => getCategoryAnalytics(year, month),
  });

  const categoryData = data || [];

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <h2 className="text-base font-semibold text-gray-900">
        Category Spending
      </h2>

      {isLoading && (
        <div className="flex flex-col items-center justify-center gap-3 py-16">
          <LoadingSpinner size={28} className="text-[#4C8C63]" />
          <p className="text-sm text-gray-500">Loading chart...</p>
        </div>
      )}

      {isError && !isLoading && (
        <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
          <p className="text-sm text-gray-500">
            Couldn&apos;t load category data. Please try again.
          </p>
        </div>
      )}

      {!isLoading && !isError && categoryData.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E7F4E8]">
            <BarChart3 size={20} className="text-[#4C8C63]" />
          </div>
          <p className="text-sm text-gray-500">
            No spending data for this month yet.
          </p>
        </div>
      )}

      {!isLoading && !isError && categoryData.length > 0 && (
        <div className="mt-4 h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#F1F1EC"
                vertical={false}
              />
              <XAxis
                dataKey="category"
                tick={{ fontSize: 12, fill: "#6B7280" }}
                axisLine={{ stroke: "#E5E7EB" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#6B7280" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: "#F1F7F1" }}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #E5E7EB",
                  fontSize: "13px",
                }}
              />
              <Bar dataKey="total" fill="#8FBC8F" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default CategoryChart;
