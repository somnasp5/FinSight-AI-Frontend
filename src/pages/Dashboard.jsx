import { useAuth } from "../context/AuthContext.jsx";
import DashboardCards from "../components/dashboard/DashboardCards.jsx";
import MonthlySummary from "../components/dashboard/MonthlySummary.jsx";
import RecentExpenses from "../components/dashboard/RecentExpenses.jsx";
import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "../api/dashboardApi.js";
import { Wallet } from "lucide-react";
// Picks a greeting based on the time of day. Just a plain function — no
// hook needed since it doesn't hold any state.
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}

function Dashboard() {
  const { user } = useAuth();
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
  });
  const firstName = user?.fullName?.split(" ")[0] || "there";

  return (
    <div className="flex flex-col gap-6">
      {/* Greeting */}
      {/* Hero Section */}
      <div className="flex flex-col-reverse items-center justify-between gap-6 rounded-3xl bg-[#F8FCF8] p-6 md:flex-row">
        {/* Left */}
        <div>
          <p className="text-sm text-gray-500">{getGreeting()},</p>

          <h1 className="mt-1 text-3xl font-bold text-gray-900">
            {firstName} 👋
          </h1>

          <p className="mt-3 max-w-md text-gray-600">
            Track every expense, understand your spending habits, and take
            control of your finances with FinSight AI.
          </p>
        </div>

        {/* Right */}
        <div className="flex h-36 w-36 items-center justify-center rounded-full bg-[#E7F4E8] shadow-sm">
          <Wallet size={72} className="text-[#4C8C63]" strokeWidth={1.8} />
        </div>
      </div>

      {/* Stat cards */}
      <DashboardCards data={dashboardData} isLoading={isLoading} />

      {/* Two-column layout: chart placeholder + recent expenses */}
      <RecentExpenses
        expenses={dashboardData?.recent_expenses}
        isLoading={isLoading}
      />
    </div>
  );
}

export default Dashboard;
