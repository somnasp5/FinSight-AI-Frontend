import axiosInstance from "./axiosInstance";

// GET /api/dashboard
export const getDashboardData = async () => {
  const response = await axiosInstance.get("/dashboard");
  return response.data;
};
