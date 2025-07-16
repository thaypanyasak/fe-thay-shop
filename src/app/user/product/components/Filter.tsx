"use client";

import React from "react";

import { Search, Filter as FilterIcon } from "lucide-react";

type FilterProps = {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  selectedBrand: string;
  setSelectedBrand: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

const Filter: React.FC<FilterProps> = ({
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="relative z-10 container mx-auto px-4 mb-12">
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-lg">
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search your dream gear..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white focus:outline-none focus:bg-gray-500 focus:ring-2 focus:ring-green-500 appearance-none"
            >
              <option value="All Categories">All Categories</option>
              <option value="Shoes">Basketball Shoes</option>
              <option value="Jerseys">Basketball Jerseys</option>
              <option value="Shorts">Basketball Shorts</option>
              <option value="Accessories">Accessories</option>
            </select>

            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none focus:bg-gray-500 focus:text-white"
            >
              <option value="All Brands">All Brands</option>
              <option value="Nike">Nike</option>
              <option value="Adidas">Adidas</option>
              <option value="Jordan">Jordan</option>
              <option value="Under Armour">Under Armour</option>
            </select>

            <button className="flex items-center gap-2 px-6 py-4 bg-green-500 text-white rounded-2xl hover:bg-green-600 transition-all duration-300 shadow-lg">
              <FilterIcon className="w-5 h-5" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
