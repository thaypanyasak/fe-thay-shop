import { createColumnHelper } from "@tanstack/react-table";
import { Product } from "../../../../types/product";
import { Edit, Trash } from "lucide-react";

const columnHelper = createColumnHelper<Product>();

interface ColumnProps {
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  isDeletingProduct: boolean;
}

export const createProductColumns = ({
  onEdit,
  onDelete,
  isDeletingProduct,
}: ColumnProps) => [
  columnHelper.accessor("name", {
    header: "Product",
    size: 400,
    minSize: 250,
    maxSize: 600,
    cell: (info) => {
      const product = info.row.original;
      return (
        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
          <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <div className="w-4 h-4 sm:w-6 sm:h-6 bg-gray-300 rounded"></div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-medium text-gray-900 truncate text-sm sm:text-base">
              {product.name}
            </div>
            <div className="text-xs sm:text-sm text-gray-500 truncate hidden sm:block">
              {product.description || "No description available"}
            </div>
          </div>
        </div>
      );
    },
  }),
  columnHelper.accessor("price", {
    header: "Price",
    size: 120,
    minSize: 80,
    maxSize: 150,
    cell: (info) => (
      <div className="font-semibold text-gray-900 text-sm sm:text-base">
        <span className="hidden sm:inline">$</span>
        <span className="sm:hidden">$</span>
        {info.getValue().toLocaleString("en-US")}
      </div>
    ),
  }),
  columnHelper.accessor("stock", {
    header: "Stock",
    size: 100,
    minSize: 60,
    maxSize: 120,
    cell: (info) => (
      <div className="font-medium text-gray-900 text-sm sm:text-base">
        {info.getValue()}
      </div>
    ),
  }),
  columnHelper.display({
    id: "status",
    header: "Status",
    size: 120,
    minSize: 80,
    maxSize: 150,
    cell: (info) => {
      const stock = info.row.original.stock;
      return (
        <div className="flex justify-start">
          <span
            className={`inline-flex px-1.5 py-0.5 sm:px-2 sm:py-1 text-xs font-semibold rounded-full whitespace-nowrap ${
              stock > 0
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            <span className="hidden sm:inline">
              {stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
            <span className="sm:hidden">{stock > 0 ? "In" : "Out"}</span>
          </span>
        </div>
      );
    },
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    size: 120,
    minSize: 80,
    maxSize: 150,
    cell: (info) => {
      const product = info.row.original;
      return (
        <div className="flex items-center justify-start space-x-1 sm:space-x-2">
          <button
            onClick={() => onEdit(product)}
            className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
            title="Edit"
          >
            <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
          <button
            onClick={() => onDelete(product.id)}
            disabled={isDeletingProduct}
            className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50"
            title="Delete"
          >
            <Trash className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
      );
    },
  }),
];
