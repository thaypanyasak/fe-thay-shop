import Image from "next/image";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductList from "./user/product/page";
import { Metadata } from "next";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import { Toaster } from "sonner";
export const metadata: Metadata = {
  title: "ThayShop",
  description: "Basketball Shop",
  icons: {
    icon: "/img/metaIcon.png",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 ">
      <ProductList />
    </div>
  );
}
