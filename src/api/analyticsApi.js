import axiosInstance from './axiosInstance'

// GET /api/analytics/category?year=YYYY&month=MM
// Returns category-wise spending for the given month.
export const getCategoryAnalytics = async (year, month) => {
  const response = await axiosInstance.get('/analytics/category', {
    params: { year, month },
  })
  return response.data
}

// GET /api/analytics/year?year=YYYY
// Returns total spending for the given year.
export const getYearAnalytics = async (year) => {
  const response = await axiosInstance.get('/analytics/year', {
    params: { year },
  })
  return response.data
}

// GET /api/analytics/merchants
// Returns the top merchants by spending.
export const getTopMerchants = async () => {
  const response = await axiosInstance.get('/analytics/merchants')
  return response.data
}
