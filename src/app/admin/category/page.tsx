"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import axios from "axios";

interface Category {
  id: number;
  name: string;
  description: string;
}

type CategoryFormData = Omit<Category, "id">;

// Fetch categories from API
const fetchCategories = async (): Promise<Category[]> => {
  const { data } = await axios.get(
    "https://thay-shop.onrender.com/api/categories"
  );
  return data;
};

// Add category to API
const addCategory = async (category: CategoryFormData): Promise<Category> => {
  const { data } = await axios.post(
    "https://thay-shop.onrender.com/api/categories",
    category
  );
  return data;
};

// Update category in API
const updateCategory = async (category: Category): Promise<Category> => {
  const { data } = await axios.put(
    `https://thay-shop.onrender.com/api/categories/${category.id}`,
    category
  );
  return data;
};

// Delete category from API
const deleteCategory = async (id: number): Promise<number> => {
  await axios.delete(`https://thay-shop.onrender.com/api/categories/${id}`);
  return id;
};

const columnHelper = createColumnHelper<Category>();

export default function AdminCategoryList() {
  const queryClient = useQueryClient();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);

  const {
    data: categories = [],
    isLoading,
    error,
  } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // Mutations
  const addMutation = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setShowForm(false);
      setEditCategory(null);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setShowForm(false);
      setEditCategory(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });

  // TanStack Form
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    } as CategoryFormData,
    onSubmit: async ({ value }) => {
      if (editCategory) {
        updateMutation.mutate({ ...editCategory, ...value });
      } else {
        addMutation.mutate(value);
      }
    },
  });

  // Table columns
  const columns = [
    columnHelper.accessor("name", {
      header: "Danh mục",
      size: 400,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("description", {
      header: "Mô tả",
      size: 400,
      cell: (info) => info.getValue() || "Chưa có mô tả",
    }),
    columnHelper.display({
      id: "actions",
      header: "Thao tác",
      size: 120,
      cell: (info) => {
        const category = info.row.original;
        return (
          <div className="flex items-center justify-center space-x-2">
            <button
              onClick={() => handleEdit(category)}
              className="w-8 h-8 flex items-center justify-center bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
              title="Chỉnh sửa"
            >
              ✏️
            </button>
            <button
              onClick={() => handleDelete(category.id)}
              disabled={deleteMutation.isPending}
              className="w-8 h-8 flex items-center justify-center bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50"
              title="Xóa"
            >
              🗑️
            </button>
          </div>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: categories,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const handleDelete = (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleEdit = (category: Category) => {
    setEditCategory(category);
    form.setFieldValue("name", category.name);
    form.setFieldValue("description", category.description);
    setShowForm(true);
  };

  const handleCancel = () => {
    form.reset();
    setEditCategory(null);
    setShowForm(false);
  };

  const handleAddNew = () => {
    form.reset();
    setEditCategory(null);
    setShowForm(true);
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
            Có lỗi xảy ra khi tải dữ liệu
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Quản lý Danh mục
              </h1>
              <p className="text-gray-600 mt-2">
                Tổng:{" "}
                <span className="font-semibold text-blue-600">
                  {categories.length}
                </span>{" "}
                danh mục
              </p>
            </div>
            <button
              onClick={handleAddNew}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              <span className="mr-2">+</span>
              Thêm danh mục
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            className={
                              header.column.getCanSort()
                                ? "cursor-pointer select-none flex items-center hover:text-gray-700"
                                : ""
                            }
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {table.getRowModel().rows.length > 0 ? (
                  table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="px-6 py-4 whitespace-nowrap"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={columns.length} className="text-center py-16">
                      <div className="text-gray-500">
                        <div className="text-6xl mb-4">📦</div>
                        <p className="text-xl font-medium text-gray-900 mb-2">
                          Chưa có danh mục nào
                        </p>
                        <p className="text-gray-600">
                          Hãy thêm danh mục đầu tiên
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
                  </h2>
                  <button
                    onClick={handleCancel}
                    className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                  }}
                  className="space-y-6"
                >
                  <form.Field
                    name="name"
                    validators={{
                      onChange: ({ value }) =>
                        !value ? "Tên danh mục là bắt buộc" : undefined,
                    }}
                    children={(field) => (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Tên danh mục *
                        </label>
                        <input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Nhập tên danh mục"
                        />
                        {field.state.meta.errors && (
                          <p className="mt-2 text-sm text-red-600 flex items-center">
                            <span className="mr-1">⚠️</span>
                            {field.state.meta.errors[0]}
                          </p>
                        )}
                      </div>
                    )}
                  />

                  <form.Field
                    name="description"
                    children={(field) => (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Mô tả
                        </label>
                        <textarea
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                          placeholder="Nhập mô tả danh mục"
                        />
                      </div>
                    )}
                  />

                  <div className="flex gap-4 pt-6">
                    <form.Subscribe
                      selector={(state) => [
                        state.canSubmit,
                        state.isSubmitting,
                      ]}
                      children={([canSubmit, isSubmitting]) => (
                        <button
                          type="submit"
                          disabled={!canSubmit || isSubmitting}
                          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                        >
                          {isSubmitting
                            ? "Đang xử lý..."
                            : editCategory
                            ? "Cập nhật"
                            : "Thêm danh mục"}
                        </button>
                      )}
                    />
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                    >
                      Hủy
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
