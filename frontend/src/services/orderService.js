import axios from "axios";

const BASE_URL = import.meta.env.VITE_ORDER_SERVICE_URL;

const authHeader = (token) => ({ headers: { Authorization: `Bearer ${token}` } });

export const createOrder = (data, token) => axios.post(`${BASE_URL}/api/orders`, data, authHeader(token));
export const getUserOrders = (token) => axios.get(`${BASE_URL}/api/orders`, authHeader(token));
export const getOrderById = (id, token) => axios.get(`${BASE_URL}/api/orders/${id}`, authHeader(token));