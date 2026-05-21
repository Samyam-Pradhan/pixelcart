import axios from "axios";

export const getAllProducts = () => axios.get(`/api/products`);
export const getProductById = (id) => axios.get(`/api/products/${id}`);
export const getProductsByCategory = (category) => axios.get(`/api/products/category/${category}`);