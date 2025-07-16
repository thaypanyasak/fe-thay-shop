"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./components/ProductCard";
import Filter from "./components/Filter";
import { Product } from "@/app/types/product";

const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch("https://thay-shop.onrender.com/api/products");
  if (!res.ok) {
    throw new Error("Error fetching products");
  }
  return res.json();
};

const ProductList = () => {
  const { data, error, isLoading } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedBrand, setSelectedBrand] = useState("All Brands");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData =
    data?.filter((product) => {
      const matchesCategory =
        selectedCategory === "All Categories" ||
        product.category_name === selectedCategory;
      const matchesBrand =
        selectedBrand === "All Brands" || product.brand_name === selectedBrand;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesBrand && matchesSearch;
    }) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-600/30 rounded-full animate-spin border-t-green-500"></div>
          </div>
          <p className="text-white mt-4 text-lg">Loading amazing products...</p>
        </div>
      </div>
    );
  }

  if (error instanceof Error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-400">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      <div className="relative z-10 pt-16 pb-8">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-200 mb-6">
            BALL IS LIFE
          </h1>
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {data?.length || 0}
              </div>
              <div className="text-sm text-gray-400">Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">50+</div>
              <div className="text-sm text-gray-400">Brands</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">24/7</div>
              <div className="text-sm text-gray-400">Support</div>
            </div>
          </div>
        </div>
      </div>
      <Filter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="relative z-10 container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {filteredData.length === 0 && (
        <div className="text-center py-20">
          <div className="text-8xl mb-6">🏀</div>
          <h3 className="text-2xl font-bold text-white mb-4">
            No products found
          </h3>
          <p className="text-gray-400 mb-6">
            Try adjusting your search or filter criteria
          </p>
          <button className="bg-green-500 text-white px-8 py-4 rounded-2xl font-medium hover:bg-green-600 transition-all duration-300 shadow-lg">
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
