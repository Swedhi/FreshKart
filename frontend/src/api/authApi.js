import client from "./client";

// Login
export const loginUser = async (data) => {
  const response = await client.post("/auth/login", data);
  return response.data;
};

// Register
export const registerUser = async (data) => {
  const response = await client.post("/auth/register", data);
  return response.data;
};

// Logout
export const logoutUser = async () => {
  const response = await client.post("/auth/logout");
  return response.data;
};

// Verify OTP
export const verifyOtp = async (data) => {
  const response = await client.post("/auth/verify-otp", data);
  return response.data;
};

// Forgot Password
export const forgotPassword = async (data) => {
  const response = await client.post("/auth/forgot-password", data);
  return response.data;
};

// Reset Password
export const resetPassword = async (data) => {
  const response = await client.post("/auth/reset-password", data);
  return response.data;
};