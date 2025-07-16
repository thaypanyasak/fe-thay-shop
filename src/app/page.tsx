import ProductList from "./user/product/page";
import { Metadata } from "next";

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
