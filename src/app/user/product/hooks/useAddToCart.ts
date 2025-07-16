import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Product } from "@/app/types/product";

type AddToCartPayload = {
  userId: number;
  productId: number;
  quantity: number;
};

export const useAddToCartMutation = () => {
  return useMutation({
    mutationFn: async (payload: AddToCartPayload) => {
      const response = await axios.post(
        "https://thay-shop.onrender.com/api/cart/add",
        payload
      );
      return response.data;
    },
  });
};
