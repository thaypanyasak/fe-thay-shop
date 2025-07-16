"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import {
  ShoppingCart,
  Heart,
  Star,
  ArrowLeft,
  Share2,
  Shield,
  Truck,
  RotateCcw,
  Plus,
  Minus,
} from "lucide-react";
import { useUserStore } from "../../../store/useUserStore";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Product } from "../../../types/product";

const ProductDetail = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const { isLoggedIn } = useUserStore();
  const params = useParams<{ id?: string }>();
  const id = params?.id;
  const router = useRouter();

  useEffect(() => {
    if (id) {
      const fetchProductDetails = async () => {
        try {
          console.log("Fetching product details for ID:", id);
          const response = await axios.get(
            `https://thay-shop.onrender.com/api/products/${id}`
          );
          console.log("Product details:", response.data);
          setProduct(response.data);
        } catch (err) {
          if (axios.isAxiosError(err)) {
            console.error("Axios error:", err.message);
          } else {
            console.error("Unexpected error:", err);
          }
        } finally {
          setIsLoading(false);
        }
      };

      fetchProductDetails();
    } else {
      setError("Product ID is missing");
      setIsLoading(false);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    console.log("Product added to cart", product);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-600/30 rounded-full animate-spin border-t-green-500"></div>
          </div>
          <p className="text-white mt-4 text-lg">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  const productImages = product?.images || [product?.image];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10  top-0 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-white hover:text-green-400 transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Products</span>
            </button>
            <button className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300">
              <Share2 className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-4">
            <div className="relative group">
              <div className="aspect-square bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden border border-white/20 hover:border-green-500/50 transition-all duration-500">
                <Image
                  src={
                    productImages[selectedImageIndex] ||
                    product?.image ||
                    "/fallback.png"
                  }
                  alt={product?.name || "Product"}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  unoptimized={true}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                {product?.stock && product.stock < 10 && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Only {product.stock} left
                  </div>
                )}

                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                  {product?.brand_name}
                </div>
              </div>
            </div>

            {productImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {productImages.map(
                  (image: string | undefined, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                        selectedImageIndex === index
                          ? "border-green-500 ring-2 ring-green-500/30"
                          : "border-white/20 hover:border-white/40"
                      }`}
                    >
                      <img
                        src={image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-200 mb-3 leading-tight">
                {product?.name}
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                {product?.description}
              </p>
            </div>

            <div className="text-sm text-gray-400">
              <span className="text-green-300 font-medium">
                {product?.category_name}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
                ${product?.price}
              </span>
              <span className="text-xl text-gray-500 line-through">
                ${((product?.price ?? 0) * 1.2).toFixed(2)}
              </span>
              <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm font-medium">
                Save 20%
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <span className="text-gray-400 text-sm">
                (4.8) • 2,847 reviews
              </span>
            </div>

            <div className="text-sm text-gray-400">
              Stock:{" "}
              <span className="text-green-300 font-medium">
                {product?.stock}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-white font-medium">Quantity:</span>
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-white/20 rounded-l-2xl transition-colors duration-300"
                >
                  <Minus className="w-4 h-4 text-white" />
                </button>
                <span className="px-6 py-3 text-white font-medium min-w-[60px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-white/20 rounded-r-2xl transition-colors duration-300"
                >
                  <Plus className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-3 bg-green-500 text-white py-4 px-8 rounded-2xl hover:bg-green-600 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-green-500/25 transform hover:-translate-y-0.5"
              >
                <ShoppingCart className="w-6 h-6" />
                Add to Cart
              </button>
              <button
                onClick={toggleFavorite}
                className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20 transition-all duration-300 group border border-white/20"
              >
                <Heart
                  className={`w-6 h-6 transition-colors duration-300 ${
                    isFavorite
                      ? "text-red-500 fill-current"
                      : "text-white group-hover:text-red-400"
                  }`}
                />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
              <div className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                <Truck className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-white font-medium text-sm">
                    Free Shipping
                  </p>
                  <p className="text-gray-400 text-xs">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                <Shield className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-white font-medium text-sm">Warranty</p>
                  <p className="text-gray-400 text-xs">2 years guarantee</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                <RotateCcw className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-white font-medium text-sm">Easy Returns</p>
                  <p className="text-gray-400 text-xs">30-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
