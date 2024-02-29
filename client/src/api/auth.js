import axios from "./axios";

export const registerRequest = async (user) => axios.post(`/register`, user);

export const loginRequest = async (user) => axios.post(`/login`, user);

export const verifyTokenRequest = async () => axios.get(`/verify`);

export const forgotPasswordRequest = async (email) =>
  axios.post("/login/forgot-password", email);

export const verifyResetPasswordRequest = async (token) =>
  axios.get(`/verify-reset-password/${token}`);

export const resetPasswordRequest = async (password, token) =>
  axios.post(`/login/forgot-password/${token}`, password);
