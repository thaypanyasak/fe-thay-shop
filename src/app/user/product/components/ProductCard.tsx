"use client";

import React, { useEffect, useState } from "react";
import { Heart, ShoppingCart, Eye, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { Product } from "@/app/types/product";
import { useCartStore } from "@/app/store/useCartStore";
import { useUserStore } from "@/app/store/useUserStore";
import { toast } from "sonner";
import { useAddToCartMutation } from "../hooks/useAddToCart";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const [isInCart, setIsInCart] = useState(false);
  const { user, isLoggedIn } = useUserStore();
  const { addItem } = useCartStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  const cartItems = useCartStore((state) => state.cartItems);
  const setCartItems = useCartStore((state) => state.setCartItems);

  const { mutate: addToCartMutation, isPending } = useAddToCartMutation();

  useEffect(() => {
    const checkInCart = async () => {
      if (!user || !product?.id) return;

      const alreadyInStore = cartItems.some((item) => item.id === product.id);
      if (alreadyInStore) {
        setIsInCart(true);
        return;
      }

      try {
        const res = await axios.get(
          `https://thay-shop.onrender.com/api/cart/view`,
          {
            params: { userId: user.id },
          }
        );
        const cartFromDb = res.data;

        setCartItems(cartFromDb);
        const alreadyInDb = cartFromDb.some(
          (item: Product) => item.id === product.id
        );
        if (alreadyInDb) {
          setIsInCart(true);
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error("Failed to check cart from DB:", error.message);
        } else {
          console.error("Unknown error occurred while checking cart.");
        }
      }
    };

    checkInCart();
  }, [user, product.id, cartItems, setCartItems]);

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const handleViewDetail = () => {
    router.push(`/user/productdetail/${product.id}`);
  };
  const handleAddToCart = () => {
    if (!isLoggedIn || !user) {
      router.push("/auth/login");
      return;
    }

    addToCartMutation(
      {
        userId: Number(user.id),
        productId: product.id,
        quantity: 1,
      },
      {
        onSuccess: () => {
          addItem(product);
          setIsInCart(true);
          toast.success("Thêm vào giỏ hàng thành công!");

          queryClient.invalidateQueries({
            queryKey: ["cartItems", Number(user.id)],
          });
        },
        onError: (error) => {
          console.error("Add to cart error:", error);
          toast.error("Không thể thêm vào giỏ hàng.");
        },
      }
    );
  };

  return (
    <div
      key={product.id}
      className="group relative"
      onMouseEnter={() => setHoveredProduct(product.id)}
      onMouseLeave={() => setHoveredProduct(null)}
    >
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 hover:border-green-500/50 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/20">
        <div className="relative overflow-hidden rounded-2xl mb-6 aspect-square">
          <Image
            src={product.image}
            alt={product.name}
            width={500} // hoặc 400/600 tùy ảnh
            height={500}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            unoptimized={product.image.startsWith("http") ? false : true}
          />

          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
              hoveredProduct === product.id ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
              <button
                onClick={() => toggleFavorite(product.id)}
                className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Heart
                  className={`w-6 h-6 ${
                    favorites.has(product.id)
                      ? "text-red-500 fill-current"
                      : "text-white"
                  }`}
                />
              </button>
              <button
                onClick={handleViewDetail}
                className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Eye className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>

          {product.stock < 10 && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Only {product.stock} left
            </div>
          )}

          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
            {product.brand_name}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-green-300 transition-colors">
              {product.name}
            </h3>
            <p className="text-gray-400 text-sm line-clamp-2">
              {product.description}
            </p>
          </div>

          {/* Rating */}
          {/* <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-yellow-400 fill-current"
                />
              ))}
            </div>
            <span className="text-gray-400 text-sm">(4.8)</span>
          </div> */}

          <div className="text-sm text-gray-400">
            <span className="text-green-300 font-medium">
              {product.category_name}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
                ${product.price}
              </span>
              <span className="text-gray-500 text-sm line-through">
                ${(product.price * 1.2).toFixed(2)}
              </span>
            </div>
            <div className="text-sm text-gray-400">Stock: {product.stock}</div>
          </div>

          <button
            disabled={isPending || isInCart}
            onClick={handleAddToCart}
            className="w-full bg-green-500 text-white py-4 px-6 rounded-2xl font-medium hover:bg-green-600 transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-green-500/25 disabled:opacity-60"
          >
            {isInCart ? (
              <>
                <ShoppingCart className="w-5 h-5" />
                <span>Already in Cart</span>
              </>
            ) : isPending ? (
              <div className="w-5 h-5 border-b-2 border-white animate-spin rounded-full"></div>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
