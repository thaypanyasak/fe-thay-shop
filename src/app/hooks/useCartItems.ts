// hooks/useCartItems.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCartItems = async (userId: number) => {
  const response = await axios.get(
    "https://thay-shop.onrender.com/api/cart/view",
    {
      params: { userId },
    }
  );
  return response.data;
};

export const useCartItems = (userId: number | undefined) => {
  return useQuery({
    queryKey: ["cartItems", userId],
    queryFn: () => fetchCartItems(userId!),
    enabled: !!userId, // chỉ gọi nếu có userId
  });
};
