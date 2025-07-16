export interface Product {
  quantity: number;
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  stock: number;
  category_id: number;
  brand_id: number;
  brand_name: string;
  category_name: string;
  images?: string[];
}
export type ProductFormData = Omit<Product, "id">;
