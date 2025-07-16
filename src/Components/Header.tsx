"use client";

import React, { useState } from "react";
import { ShoppingCart, Menu, User, Heart, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/app/store/useUserStore";
import { useCartItems } from "@/app/hooks/useCartItems";
import Image from "next/image";

const Header = () => {
  const { user, isLoggedIn, logout } = useUserStore();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const userId = user?.id ? parseInt(user.id as string, 10) : undefined;

  const toggleCartPopup = () => {
    setShowCartPopup(!showCartPopup);
  };
  const { data: cartItems = [], isLoading, isError } = useCartItems(userId);

  // Calculate the number of distinct products in the cart
  const totalProducts = cartItems.length;

  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-2xl sticky top-0 z-50 border-b border-green-700">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => router.push("/")}
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-gray-900 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-xl border-2 border-green-400">
                <span className="text-white font-bold text-xl">
                  <Image
                    src="/img/logo2.png"
                    width={100}
                    height={50}
                    className="w-25 h-10 object-contain"
                    alt="Logo"
                  />
                </span>
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                BasketThayz
              </h1>
              <p className="text-xs text-gray-400">Premium Basketball Gear</p>
            </div>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 hover:bg-gray-700 rounded-full transition-colors"
            >
              <Search className="w-5 h-5 text-white" />
            </button>

            <button className="relative p-2 hover:bg-gray-700 rounded-full transition-colors group">
              <Heart className="w-5 h-5 text-white group-hover:text-red-400 transition-colors" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                2
              </span>
            </button>

            <div className="relative">
              <button
                onClick={toggleCartPopup}
                className="relative p-2 rounded-full group hover:bg-gray-700 transition-colors"
              >
                <ShoppingCart className="w-5 h-5 text-white group-hover:text-orange-400 transition-colors" />
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center font-semibold shadow">
                  {isLoading ? "…" : totalProducts || 0}{" "}
                  {/* Display the total number of products */}
                </span>
              </button>

              {showCartPopup && (
                <div className="absolute right-0 mt-3 w-80 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl z-50 p-4 text-white max-h-96 overflow-y-auto">
                  <h4 className="font-semibold text-base mb-3 border-b border-gray-600 pb-2">
                    🛒 Your Cart
                  </h4>

                  {isLoading ? (
                    <p className="text-sm text-gray-400">Loading...</p>
                  ) : isError ? (
                    <p className="text-sm text-red-400">
                      Failed to load cart data.
                    </p>
                  ) : cartItems.length === 0 ? (
                    <p className="text-sm text-gray-400">
                      Your cart is currently empty.
                    </p>
                  ) : (
                    <ul className="space-y-4">
                      {cartItems.map(
                        (item: {
                          id: number;
                          image: string;
                          name: string;
                          price: number;
                          quantity: number;
                        }) => (
                          <li key={item.id} className="flex gap-3 items-center">
                            <Image
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded-lg border border-gray-700"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-sm line-clamp-1">
                                {item.name}
                              </p>
                              <p className="text-xs text-gray-400">
                                Qty: {item.quantity} | ${item.price}
                              </p>
                            </div>
                          </li>
                        )
                      )}
                    </ul>
                  )}

                  <div className="mt-4">
                    {isLoggedIn ? (
                      <button
                        onClick={() => {
                          router.push("/user/cart");
                          setShowCartPopup(false);
                        }}
                        className="w-full py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium transition"
                      >
                        View Cart
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          router.push("/auth/login");
                          setShowCartPopup(false);
                        }}
                        className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-sm font-medium transition"
                      >
                        Login to see cart
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Account */}
            {isLoggedIn ? (
              <div className="hidden md:flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-gray-800 px-3 py-2 rounded-full">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-white">
                    {user?.name}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => router.push("/auth/login")}
                className="hidden md:block bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full font-medium hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105"
              >
                Login
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-700 rounded-full transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden mt-3 pb-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 pb-3 border-t border-gray-700 pt-3">
            <div className="flex flex-col space-y-3">
              {isLoggedIn ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white font-medium">
                      Hello, {user?.name}
                    </span>
                  </div>
                  <button
                    onClick={logout}
                    className="text-red-400 hover:text-red-300 text-sm font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => router.push("/auth/login")}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full font-medium hover:from-green-600 hover:to-green-700 transition-all text-center"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
