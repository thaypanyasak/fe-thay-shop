import axios from "axios";
import { Product, ProductFormData } from "../../../types/product";

const API_BASE_URL = "https://thay-shop.onrender.com/api/products";

export const productService = {
  getProducts: async (): Promise<Product[]> => {
    const { data } = await axios.get(API_BASE_URL);
    return data;
  },
  addProduct: async (product: ProductFormData): Promise<Product> => {
    const { data } = await axios.post(API_BASE_URL, product);
    return data;
  },

  updateProduct: async (product: Product): Promise<Product> => {
    const { data } = await axios.put(`${API_BASE_URL}/${product.id}`, product);
    return data;
  },

  deleteProduct: async (id: number): Promise<number> => {
    await axios.delete(`${API_BASE_URL}/${id}`);
    return id;
  },
};
