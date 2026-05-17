import axios from "axios";

const BASE_URL = import.meta.env.VITE_PRODUCT_SERVICE_URL;

export const getAllProducts = () => axios.get(`${BASE_URL}/api/products`);
export const getProductById = (id) => axios.get(`${BASE_URL}/api/products/${id}`);
export const getProductsByCategory = (category) => axios.get(`${BASE_URL}/api/products/category/${category}`);