"use client";

import { useEffect, useState } from "react";
import { loadProducts, saveProducts } from "@/services/product-storage";
import { Product, ProductInput } from "@/types/product";
import { normalizeText } from "@/utils/normalize";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setProducts(loadProducts());
      setIsReady(true);
    });
  }, []);

  const updateProducts = (nextProducts: Product[]) => { setProducts(nextProducts); saveProducts(nextProducts); };
  const addProduct = (input: ProductInput) => updateProducts([{ ...input, id: crypto.randomUUID() }, ...products]);
  const editProduct = (id: string, input: ProductInput) => updateProducts(products.map((product) => product.id === id ? { ...input, id } : product));
  const removeProduct = (id: string) => updateProducts(products.filter((product) => product.id !== id));
  const searchProducts = (query: string) => {
    const normalizedQuery = normalizeText(query);
    return normalizedQuery ? products.filter((product) => normalizeText(product.name).includes(normalizedQuery)) : [];
  };

  return { products, isReady, addProduct, editProduct, removeProduct, searchProducts };
}
