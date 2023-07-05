//Axios
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const PRODUCTS_API_URL = `${BACKEND_URL}/api/products`;

// Create new Product
const createProduct = async formData => {
  const response = await axios.post(PRODUCTS_API_URL, formData);
  return response.data;
};

// Get all Products
const getProducts = async () => {
  const response = await axios.get(PRODUCTS_API_URL);
  return response.data;
};

// Delete a product
const deleteProduct = async id => {
  const response = await axios.delete(`${PRODUCTS_API_URL}/${id}`);
  return response.data;
};

// Get a product
const getProduct = async id => {
  const response = await axios.get(`${PRODUCTS_API_URL}/${id}`);
  return response.data;
};

// Update product
const updateProduct = async (id, formData) => {
  console.log("formData @ productService.js", [...formData]);
  const response = await axios.patch(`${PRODUCTS_API_URL}/${id}`, formData);
  return response.data;
};

const productService = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};

export default productService;
