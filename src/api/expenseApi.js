import axiosInstance from "./axiosInstance";

// POST /api/expenses
// payload matches the shape the backend expects (see ExpenseForm.jsx for
// how it's built from the form fields).
export const addExpense = async (payload) => {
  const response = await axiosInstance.post("/expenses", payload);
  return response.data;
};

// GET /api/expenses
// Returns all expenses for the authenticated user.
export const getExpenses = async () => {
  const response = await axiosInstance.get("/expenses");
  return response.data;
};
