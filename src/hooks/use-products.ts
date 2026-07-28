"use client";

import { useEffect, useState } from "react";
import { productRepository } from "@/services/product-repository";
import { Product, ProductInput } from "@/types/product";
import { normalizeText } from "@/utils/normalize";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    queueMicrotask(async () => {
      try { setProducts(await productRepository.list()); } catch { setError("Não foi possível carregar os produtos. Verifique a conexão."); }
      setIsReady(true);
    });
  }, []);

  const addProduct = async (input: ProductInput) => { const product = await productRepository.create(input); setProducts((current) => [product, ...current]); };
  const editProduct = async (id: string, input: ProductInput) => { const product = await productRepository.update(id, input); setProducts((current) => current.map((item) => item.id === id ? product : item)); };
  const removeProduct = async (id: string) => { await productRepository.remove(id); setProducts((current) => current.filter((product) => product.id !== id)); };
  const searchProducts = (query: string) => { const normalizedQuery = normalizeText(query); return normalizedQuery ? products.filter((product) => normalizeText(product.name).includes(normalizedQuery)) : []; };

  return { products, isReady, error, source: productRepository.source, addProduct, editProduct, removeProduct, searchProducts };
}
