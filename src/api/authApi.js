import axiosInstance from "./axiosInstance";

// POST /api/signup
// Expects: { fullName, email, password }
export const signup = async (payload) => {
  const response = await axiosInstance.post("/signup", {
    full_name: payload.fullName,
    email: payload.email,
    password: payload.password,
  });

  return response.data;
};

// POST /api/login
// Expects: { email, password }
// Returns: { token, user }
export const login = async (payload) => {
  const response = await axiosInstance.post("/login", payload);
  return response.data;
};
