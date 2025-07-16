import { useState } from "react";
import { Product, ProductFormData } from "@/app/types/product";
import { useProductForm } from "../hooks/useProductForm";
import { toast } from "sonner";
import { Box, Edit, Image, DollarSign, Package, X } from "lucide-react";

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
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageError, setImageError] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(false);

  const {
    form,
    setFormValues,
    resetForm: resetProductForm,
  } = useProductForm({
    onSubmit: (data: ProductFormData) => {
      onSubmit(data, editProduct);
      setShowForm(false);
      resetProductForm();
      setImagePreview("");
      setImageError(false);
      setImageLoading(false);
    },
    editProduct,
  });

  const handleCancel = () => {
    resetProductForm();
    setEditProduct(null);
    setShowForm(false);
    setImagePreview("");
    setImageError(false);
    setImageLoading(false);
  };

  const handleImageChange = (
    url: string,
    fieldHandler: (value: string) => void
  ) => {
    fieldHandler(url);
    setImagePreview(url);
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
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden border border-gray-700/50 relative">
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2 flex items-center">
                <Box className="mr-3 text-4xl" />
                {editProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <p className="text-gray-300 text-sm">
                {editProduct
                  ? "Update product information in the system"
                  : "Create a new product for the store"}
              </p>
            </div>
            <button
              onClick={handleCancel}
              className="w-10 h-10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(95vh-120px)] bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-8"
          >
            <form.Field
              name="name"
              validators={{
                onChange: ({ value }) =>
                  !value ? "Product name is required" : undefined,
              }}
              children={(field) => (
                <div className="space-y-3">
                  <label className="flex items-center text-sm font-semibold text-gray-800">
                    <Package className="mr-2 text-gray-600" />
                    Product Name *
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type="text"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="Enter product name..."
                  />
                </div>
              )}
            />

            <form.Field
              name="description"
              children={(field) => (
                <div className="space-y-3">
                  <label className="flex items-center text-sm font-semibold text-gray-800">
                    <Edit className="mr-2 text-gray-600" />
                    Product Description
                  </label>
                  <textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 text-gray-900 placeholder-gray-500 resize-none"
                    placeholder="Enter detailed product description..."
                  />
                  <div className="text-xs text-gray-500 text-right">
                    {field.state.value?.length || 0} characters
                  </div>
                </div>
              )}
            />

            <form.Field
              name="image"
              children={(field) => (
                <div className="space-y-3">
                  <label className="flex items-center text-sm font-semibold text-gray-800">
                    <Image className="mr-2 text-gray-600" />
                    Product Image
                  </label>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          handleImageChange(e.target.value, field.handleChange)
                        }
                        type="url"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    <div className="flex items-center justify-center">
                      {field.state.value ? (
                        <div className="relative w-32 h-32 bg-gray-100 rounded-xl overflow-hidden border border-gray-300">
                          {imageLoading && (
                            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                              <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                            </div>
                          )}

                          {imageError ? (
                            <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center text-gray-500 text-center p-2">
                              <Image className="w-8 h-8 mb-2" />
                              <span className="text-xs">Invalid URL</span>
                            </div>
                          ) : (
                            <>
                              <img
                                src={field.state.value}
                                alt="Preview"
                                className="w-full h-full object-cover"
                                onError={handleImageError}
                                onLoad={handleImageLoad}
                                style={{
                                  opacity: imageLoading ? 0 : 1,
                                  transition: "opacity 0.3s ease",
                                }}
                              />
                              {!imageLoading && (
                                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                                  <span className="text-white text-xs opacity-0 hover:opacity-100">
                                    Preview
                                  </span>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      ) : (
                        <div className="w-32 h-32 bg-gray-100 rounded-xl border border-gray-300 border-dashed flex flex-col items-center justify-center text-gray-400">
                          <Image className="w-8 h-8 mb-2" />
                          <span className="text-xs">No image</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <form.Field
                name="price"
                validators={{
                  onChange: ({ value }) =>
                    value <= 0 ? "Price must be greater than 0" : undefined,
                }}
                children={(field) => (
                  <div className="space-y-3">
                    <label className="flex items-center text-sm font-semibold text-gray-800">
                      <DollarSign className="mr-2 text-gray-600" />
                      Price *
                    </label>
                    <div className="relative">
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(Number(e.target.value))
                        }
                        type="number"
                        min="0"
                        className="w-full px-4 py-3 pr-16 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                        placeholder="0"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-medium">
                        USD
                      </span>
                    </div>
                  </div>
                )}
              />

              <form.Field
                name="stock"
                validators={{
                  onChange: ({ value }) =>
                    value < 0 ? "Stock cannot be negative" : undefined,
                }}
                children={(field) => (
                  <div className="space-y-3">
                    <label className="flex items-center text-sm font-semibold text-gray-800">
                      <Package className="mr-2 text-gray-600" />
                      Stock Quantity *
                    </label>
                    <div className="relative">
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(Number(e.target.value))
                        }
                        type="number"
                        min="0"
                        className="w-full px-4 py-3 pr-20 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                        placeholder="0"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                        items
                      </span>
                    </div>
                  </div>
                )}
              />
            </div>

            <div className="flex gap-4 pt-6 border-t border-gray-300">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium flex items-center justify-center border border-gray-300"
              >
                <X className="mr-2" />
                Cancel
              </button>

              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <button
                    type="submit"
                    disabled={!canSubmit || isSubmitting}
                    className="flex-1 bg-gradient-to-r from-gray-800 to-gray-700 text-white py-3 px-6 rounded-xl hover:from-gray-900 hover:to-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center shadow-lg hover:shadow-xl"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <span className="mr-2">✓</span>
                        {editProduct ? "Update Product" : "Add Product"}
                      </>
                    )}
                  </button>
                )}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
