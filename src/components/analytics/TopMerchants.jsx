import { useQuery } from "@tanstack/react-query";
import { Store } from "lucide-react";

import { getTopMerchants } from "../../api/analyticsApi.js";
import LoadingSpinner from "../common/LoadingSpinner.jsx";

const formatAmount = (amount) => `₹${Number(amount).toLocaleString("en-IN")}`;

// Expects the backend to return an array like:
// [{ merchant: "Starbucks", amount: 850 }, { merchant: "Amazon", amount: 620 }, ...]
// Adjust the field names below if your backend uses different ones.
function TopMerchants() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["topMerchants"],
    queryFn: getTopMerchants,
  });

  const merchants = data || [];

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <h2 className="text-base font-semibold text-gray-900">Top Merchants</h2>

      {isLoading && (
        <div className="flex flex-col items-center justify-center gap-3 py-16">
          <LoadingSpinner size={28} className="text-[#4C8C63]" />
          <p className="text-sm text-gray-500">Loading merchants...</p>
        </div>
      )}

      {isError && !isLoading && (
        <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
          <p className="text-sm text-gray-500">
            Couldn&apos;t load top merchants. Please try again.
          </p>
        </div>
      )}

      {!isLoading && !isError && merchants.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E7F4E8]">
            <Store size={20} className="text-[#4C8C63]" />
          </div>
          <p className="text-sm text-gray-500">No merchant data yet.</p>
        </div>
      )}

      {!isLoading && !isError && merchants.length > 0 && (
        <div className="mt-4 flex flex-col divide-y divide-gray-100">
          {merchants.map((merchant, index) => (
            <div
              key={merchant.merchant || index}
              className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
            >
              <p className="truncate text-sm font-medium text-gray-900">
                {merchant.merchant}
              </p>
              <p className="shrink-0 text-sm font-semibold text-gray-900">
                {formatAmount(merchant.total)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TopMerchants;
