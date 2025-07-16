"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import ProductList from "../products/page";
import Category from "../category/page";
import Brands from "../brands/page";
import { Box, Tag, TowerControl, Menu, X } from "lucide-react";

const Dashboard = () => {
  const searchParams = useSearchParams();
  const section = searchParams?.get("section") ?? null;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  let content;

  if (section === "products") {
    content = <ProductList />;
  } else if (section === "categories") {
    content = <Category />;
  } else if (section === "brands") {
    content = <Brands />;
  } else {
    content = (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <Box className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Welcome to the Dashboard
        </h3>
        <p className="text-gray-600 px-4">
          Select an option from the sidebar to start managing.
        </p>
      </div>
    );
  }

  const menuItems = [
    {
      id: "products",
      label: "Manage Products",
      icon: <Box className="w-5 h-5" />,
    },
    {
      id: "categories",
      label: "Manage Categories",
      icon: <Tag className="w-5 h-5" />,
    },
    {
      id: "brands",
      label: "Manage Brands",
      icon: <TowerControl className="w-5 h-5" />,
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <div
        className={`
        fixed lg:relative lg:translate-x-0 z-50 lg:z-auto
        w-64 bg-white shadow-lg border-r border-gray-200 h-full lg:h-auto
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:flex lg:flex-col
      `}
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <TowerControl className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Admin</h2>
              <p className="text-sm text-gray-500">Dashboard</p>
            </div>
          </div>

          <button
            onClick={closeSidebar}
            className="lg:hidden p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-2 flex-1">
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={`/admin/dashboard?section=${item.id}`}
              onClick={closeSidebar}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                section === item.id
                  ? "bg-blue-50 text-blue-700 border-r-4 border-blue-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <span
                className={`${
                  section === item.id
                    ? "text-blue-600"
                    : "text-gray-400 group-hover:text-gray-600"
                }`}
              >
                {item.icon}
              </span>
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </nav>
      </div>

      <div className="flex-1 flex flex-col w-full lg:w-auto">
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleSidebar}
                className="lg:hidden p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="min-w-0 flex-1">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                  {section === "products" && "Manage Products"}
                  {section === "categories" && "Manage Categories"}
                  {section === "brands" && "Manage Brands"}
                  {!section && "Dashboard"}
                </h1>
                <p className="text-sm text-gray-600 mt-1 hidden sm:block">
                  {section === "products" &&
                    "Manage all products in the system"}
                  {section === "categories" && "Manage product categories"}
                  {section === "brands" && "Manage brands"}
                  {!section && "Overview of the management system"}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Box className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Tag className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-96 overflow-hidden">
            {content}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
