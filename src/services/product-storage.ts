import { products as initialProducts } from "@/data/products";
import { Product } from "@/types/product";

const STORAGE_KEY = "qual-o-codigo:products";

export function loadProducts(): Product[] {
  if (typeof window === "undefined") return initialProducts;
  const savedProducts = window.localStorage.getItem(STORAGE_KEY);
  if (!savedProducts) return initialProducts;

  try { return JSON.parse(savedProducts) as Product[]; } catch { return initialProducts; }
}

export function saveProducts(products: Product[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}
