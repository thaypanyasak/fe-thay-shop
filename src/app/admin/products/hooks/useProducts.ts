// hooks/useProducts.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "../services/productService";
import { Product } from "../../../types/product";

export const useProducts = () => {
  const queryClient = useQueryClient();

  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: productService.getProducts,
  });

  const addProductMutation = useMutation({
    mutationFn: productService.addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: productService.updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  // Mutation for deleting product
  const deleteProductMutation = useMutation({
    mutationFn: productService.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return {
    products,
    isLoading,
    error,
    addProduct: addProductMutation.mutate,
    updateProduct: updateProductMutation.mutate,
    deleteProduct: deleteProductMutation.mutate,
    isAddingProduct: addProductMutation.isPending,
    isUpdatingProduct: updateProductMutation.isPending,
    isDeletingProduct: deleteProductMutation.isPending,
  };
};
