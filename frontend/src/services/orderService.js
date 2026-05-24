import axios from "axios";

const authHeader = (token) => ({ headers: { Authorization: `Bearer ${token}` } });

export const createOrder = (data, token) => axios.post(`/api/orders/`, data, authHeader(token));
export const getUserOrders = (token) => axios.get(`/api/orders/`, authHeader(token));
export const getOrderById = (id, token) => axios.get(`/api/orders/${id}/`, authHeader(token));