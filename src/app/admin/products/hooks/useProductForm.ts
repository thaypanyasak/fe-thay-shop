import { useForm } from "@tanstack/react-form";
import { Product, ProductFormData } from "../../../types/product";

interface UseProductFormProps {
  onSubmit: (data: ProductFormData, editProduct?: Product | null) => void;
  editProduct?: Product | null;
}

export const useProductForm = ({
  onSubmit,
  editProduct,
}: UseProductFormProps) => {
  const form = useForm({
    defaultValues: {
      name: editProduct?.name || "",
      description: editProduct?.description || "",
      image: editProduct?.image || "",
      price: editProduct?.price || 0,
      stock: editProduct?.stock || 0,
      category_id: editProduct?.category_id || 1,
      brand_id: editProduct?.brand_id || 1,
    } as ProductFormData,
    onSubmit: async ({ value }) => {
      onSubmit(value, editProduct);
    },
  });

  const setFormValues = (product: Product) => {
    form.setFieldValue("name", product.name);
    form.setFieldValue("description", product.description);
    form.setFieldValue("image", product.image);
    form.setFieldValue("price", product.price);
    form.setFieldValue("stock", product.stock);
    form.setFieldValue("category_id", product.category_id);
    form.setFieldValue("brand_id", product.brand_id);
  };

  const resetForm = () => {
    form.reset();
  };

  return {
    form,
    setFormValues,
    resetForm,
  };
};
