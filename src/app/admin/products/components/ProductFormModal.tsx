"use client";

import { useState } from "react";
import { Product, ProductFormData } from "@/app/types/product";
import { useProductForm } from "../hooks/useProductForm";
import { Box, X, PictureInPicture } from "lucide-react";

import Image from "next/image";

interface ProductFormModalProps {
  showForm: boolean;
  editProduct: Product | null;
  setEditProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  resetForm: () => void;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (data: ProductFormData, editProduct: Product | null) => void;
}

export const ProductFormModal = ({
  showForm,
  editProduct,
  setEditProduct,
  resetForm,
  setShowForm,
  onSubmit,
}: ProductFormModalProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const { form, resetForm: resetProductForm } = useProductForm({
    onSubmit: (data: ProductFormData) => {
      onSubmit(data, editProduct);
      setShowForm(false);
      resetProductForm();
      setImageError(false);
      setImageLoading(false);
    },
    editProduct,
  });

  const handleCancel = () => {
    resetProductForm();
    setEditProduct(null);
    setShowForm(false);
    setImageError(false);
    setImageLoading(false);
  };

  const handleImageChange = (
    url: string,
    fieldHandler: (value: string) => void
  ) => {
    fieldHandler(url);
    setImageError(false);
    if (url.trim()) {
      setImageLoading(true);
    }
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageError(false);
    setImageLoading(false);
  };

  if (!showForm) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[95vh] overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center bg-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <Box className="mr-2" />
            {editProduct ? "Edit Product" : "Add Product"}
          </h2>
          <button
            onClick={handleCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <X />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(95vh-80px)]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-6"
          >
            {/* Product Name */}
            <form.Field
              name="name"
              validators={{
                onChange: ({ value }) =>
                  !value ? "Product name is required" : undefined,
              }}
            >
              {(field) => (
                <div>
                  <label className="font-medium text-sm text-gray-700 mb-2 block">
                    Product Name *
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className="w-full px-4 py-2 border rounded"
                    placeholder="Enter product name"
                  />
                  {field.state.meta.errors && (
                    <p className="text-sm text-red-500 mt-1">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Description */}
            <form.Field name="description">
              {(field) => (
                <div>
                  <label className="font-medium text-sm text-gray-700 mb-2 block">
                    Description
                  </label>
                  <textarea
                    id={field.name}
                    name={field.name}
                    rows={4}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className="w-full px-4 py-2 border rounded resize-none"
                    placeholder="Enter product description"
                  />
                </div>
              )}
            </form.Field>

            {/* Image URL */}
            <form.Field name="image">
              {(field) => (
                <div>
                  <label className="font-medium text-sm text-gray-700 mb-2 block flex items-center">
                    <PictureInPicture className="mr-2" />
                    Image URL
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type="url"
                    value={field.state.value}
                    onChange={(e) =>
                      handleImageChange(e.target.value, field.handleChange)
                    }
                    onBlur={field.handleBlur}
                    className="w-full px-4 py-2 border rounded"
                    placeholder="https://example.com/image.jpg"
                  />
                  <div className="mt-4 flex justify-center">
                    {field.state.value ? (
                      <div className="w-32 h-32 border rounded overflow-hidden relative">
                        {imageLoading && (
                          <div className="absolute inset-0 bg-white/50 flex justify-center items-center">
                            <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                          </div>
                        )}
                        <Image
                          src={field.state.value}
                          alt="Product Preview"
                          width={128}
                          height={128}
                          onError={handleImageError}
                          onLoad={handleImageLoad}
                          className="w-full h-full object-cover"
                          style={{ opacity: imageLoading ? 0 : 1 }}
                          unoptimized // nếu ảnh từ URL ngoài không được phép tối ưu
                        />
                      </div>
                    ) : (
                      <div className="w-32 h-32 bg-gray-100 border rounded flex items-center justify-center text-gray-500 text-sm">
                        No image
                      </div>
                    )}
                  </div>
                </div>
              )}
            </form.Field>

            {/* Price + Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <form.Field
                name="price"
                validators={{
                  onChange: ({ value }) =>
                    value <= 0 ? "Price must be greater than 0" : undefined,
                }}
              >
                {(field) => (
                  <div>
                    <label className="font-medium text-sm text-gray-700 mb-2 block">
                      Price *
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type="number"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                      onBlur={field.handleBlur}
                      className="w-full px-4 py-2 border rounded"
                      min={0}
                    />
                  </div>
                )}
              </form.Field>

              <form.Field
                name="stock"
                validators={{
                  onChange: ({ value }) =>
                    value < 0 ? "Stock cannot be negative" : undefined,
                }}
              >
                {(field) => (
                  <div>
                    <label className="font-medium text-sm text-gray-700 mb-2 block">
                      Stock *
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type="number"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                      onBlur={field.handleBlur}
                      className="w-full px-4 py-2 border rounded"
                      min={0}
                    />
                  </div>
                )}
              </form.Field>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200 transition"
              >
                Cancel
              </button>

              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <button
                    type="submit"
                    disabled={!canSubmit || isSubmitting}
                    className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting
                      ? "Saving..."
                      : editProduct
                      ? "Update"
                      : "Add Product"}
                  </button>
                )}
              </form.Subscribe>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
