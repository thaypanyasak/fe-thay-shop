import { useState } from "react";
import { useProducts } from "./hooks/useProducts";
import { Product, ProductFormData } from "@/app/types/product";
import { ProductTable } from "./components/ProductTable/ProductTable";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { ProductFormModal } from "./components/ProductFormModal";

export default function AdminProductList() {
  const {
    products,
    isLoading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    isDeletingProduct,
  } = useProducts();

  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleAddNew = () => {
    setShowForm(true);
    setEditProduct(null);
  };

  const handleEdit = (product: Product) => {
    setEditProduct(product);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
    }
  };

  const handleFormSubmit = (
    data: ProductFormData,
    editProduct: Product | null
  ) => {
    if (editProduct) {
      updateProduct({ ...editProduct, ...data });
      toast.success("Sản phẩm đã được cập nhật thành công!");
    } else {
      addProduct(data);
      toast.success("Sản phẩm đã được thêm thành công!");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="text-4xl mb-4">❌</div>
          <p className="text-red-600 font-medium">
            An error occurred while loading data
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Product Management
              </h1>
              <p className="text-gray-600 mt-2">
                Total:{" "}
                <span className="font-semibold text-blue-600">
                  {products.length}
                </span>{" "}
                products
              </p>
            </div>
            <button
              onClick={handleAddNew}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Plus className="mr-2" /> Add Product
            </button>
          </div>
        </div>

        <ProductFormModal
          showForm={showForm}
          editProduct={editProduct}
          setEditProduct={setEditProduct}
          resetForm={() => {}}
          setShowForm={setShowForm}
          onSubmit={handleFormSubmit}
        />

        <ProductTable
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isDeletingProduct={isDeletingProduct}
        />
      </div>
    </div>
  );
}
