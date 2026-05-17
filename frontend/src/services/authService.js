import axios from "axios";

const BASE_URL = import.meta.env.VITE_AUTH_SERVICE_URL;

export const signup = (data) => axios.post(`${BASE_URL}/api/auth/signup`, data);
export const login = (data) => axios.post(`${BASE_URL}/api/auth/login`, data);
export const getMe = (token) => axios.get(`${BASE_URL}/api/auth/me`, {
  headers: { Authorization: `Bearer ${token}` },
});