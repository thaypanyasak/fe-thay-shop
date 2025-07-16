"use client";

import React, { useEffect } from "react";
import { useCartStore } from "@/app/store/useCartStore";
import { useUserStore } from "@/app/store/useUserStore";
import axios from "axios";
import {
  ArrowLeft,
  CreditCard,
  Minus,
  Plus,
  Shield,
  ShoppingBag,
  Tag,
  Trash2,
  Truck,
} from "lucide-react";

const CartPage = () => {
  const { cartItems, removeItem, updateQuantity, setCartItems } =
    useCartStore();
  const { user } = useUserStore();

  const fetchCart = async () => {
    try {
      const res = await axios.get(
        "https://thay-shop.onrender.com/api/cart/view",
        {
          params: { userId: user?.id },
        }
      );
      setCartItems(res.data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchCart();
    }
  }, [user]);

  const handleQuantityChange = async (
    productId: number,
    newQuantity: number
  ) => {
    if (newQuantity < 1) return;

    try {
      await axios.put(
        "https://thay-shop.onrender.com/api/cart/update-quantity",
        {
          userId: user?.id,
          productId,
          quantity: newQuantity,
        }
      );
      updateQuantity(productId, newQuantity);
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const handleRemove = async (productId: number) => {
    try {
      await axios.delete("https://thay-shop.onrender.com/api/cart/remove", {
        data: { userId: user?.id, productId },
      });
      removeItem(productId);
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const subtotal = total;
  const shipping = total > 100 ? 0 : 15;
  const tax = total * 0.08;
  const finalTotal = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-green-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-white/5 to-green-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-green-500/1 rounded-full blur-2xl animate-ping"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl animate-ping delay-3000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <button className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to Shop
            </button>
            <div className="text-gray-500">•</div>
            <span className="text-green-400">Cart</span>
          </div>

          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-300 to-green-200 mb-4 animate-pulse">
              BALL IS LIFE
            </h1>
            <div className="text-2xl md:text-3xl font-semibold text-white mb-2">
              Your Cart
            </div>
            <p className="text-gray-400 text-lg">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"}{" "}
              ready to score
            </p>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-16 border border-white/20 max-w-lg mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5"></div>
              <div className="relative z-10">
                <div className="mb-8">
                  <ShoppingBag className="w-32 h-32 text-gray-400 mx-auto mb-4 animate-bounce" />
                  <div className="text-6xl mb-4">🏀</div>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Your cart is empty
                </h3>
                <p className="text-gray-400 mb-8 text-lg">
                  Time to gear up! Add some amazing products to get started.
                </p>
                <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-10 py-5 rounded-2xl font-medium hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-green-500/25 transform hover:scale-105">
                  Start Shopping
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Enhanced Cart Items */}
            <div className="xl:col-span-2 space-y-6">
              {cartItems.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:border-green-500/50 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-500/10 group relative overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative z-10 flex items-center gap-8">
                    <div className="relative overflow-hidden rounded-2xl w-32 h-32 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2 truncate group-hover:text-green-300 transition-colors">
                            {item.name}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                            <span className="flex items-center gap-1">
                              <Tag className="w-4 h-4" />
                              {item.brand_name}
                            </span>
                            <span>•</span>
                            <span className="text-green-400">
                              {item.category_name}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="w-12 h-12 bg-red-500/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-500/30 transition-all duration-300 group-hover:scale-110"
                        >
                          <Trash2 className="w-5 h-5 text-red-400 group-hover:text-red-300" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity - 1)
                            }
                            className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110"
                          >
                            <Minus className="w-5 h-5 text-white" />
                          </button>
                          <div className="bg-green-500/20 backdrop-blur-sm rounded-2xl px-6 py-3 border border-green-500/30">
                            <span className="text-white font-bold text-xl">
                              {item.quantity}
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity + 1)
                            }
                            className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110"
                          >
                            <Plus className="w-5 h-5 text-white" />
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600 mb-1">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                          <div className="text-sm text-gray-400">
                            ${item.price} each
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Order Summary */}
            <div className="xl:col-span-1">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 sticky top-8  overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5"></div>

                <div className="relative z-10">
                  <h3 className="text-3xl font-bold text-white mb-8 text-center">
                    Order Summary
                  </h3>

                  <div className="space-y-6 mb-8">
                    <div className="flex justify-between text-gray-300 text-lg">
                      <span>Subtotal</span>
                      <span className="font-semibold">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-300 text-lg">
                      <span className="flex items-center gap-2">
                        <Truck className="w-4 h-4" />
                        Shipping
                      </span>
                      <span
                        className={`font-semibold ${
                          shipping === 0 ? "text-green-400" : ""
                        }`}
                      >
                        {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-300 text-lg">
                      <span>Tax</span>
                      <span className="font-semibold">${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-white/20 pt-6">
                      <div className="flex justify-between text-2xl font-bold text-white">
                        <span>Total</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
                          ${finalTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {shipping > 0 && (
                    <div className="bg-gradient-to-r from-blue-500/20 to-green-500/20 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-blue-500/30">
                      <p className="text-blue-300 text-center">
                        💡 Add{" "}
                        <span className="font-bold text-green-400">
                          ${(100 - subtotal).toFixed(2)}
                        </span>{" "}
                        more to get free shipping!
                      </p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-5 px-6 rounded-2xl font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-green-500/25 transform hover:scale-105">
                      <div className="flex items-center justify-center gap-3">
                        <CreditCard className="w-6 h-6" />
                        Proceed to Checkout
                      </div>
                    </button>

                    <button className="w-full bg-white/10 backdrop-blur-sm text-white py-5 px-6 rounded-2xl font-medium hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-green-500/50">
                      Continue Shopping
                    </button>
                  </div>

                  {/* Trust badges */}
                  <div className="mt-8 pt-6 border-t border-white/20">
                    <div className="flex items-center justify-center gap-6 text-gray-400">
                      <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-green-400" />
                        <span className="text-sm">Secure</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Truck className="w-5 h-5 text-green-400" />
                        <span className="text-sm">Fast Shipping</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
