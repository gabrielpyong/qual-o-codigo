"use client";

import { useCallback, useEffect, useState } from "react";
import { productRepository } from "@/services/product-repository";
import { Product, ProductInput } from "@/types/product";
import { normalizeText } from "@/utils/normalize";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const refresh = useCallback(async () => { setIsLoading(true); setError(""); try { setProducts(await productRepository.list()); } catch (reason) { setError(reason instanceof Error ? reason.message : "Não foi possível carregar os produtos."); } finally { setIsLoading(false); } }, []);
  useEffect(() => { queueMicrotask(() => { void refresh(); }); }, [refresh]);
  const addProduct = async (input: ProductInput) => { const product = await productRepository.create(input); setProducts((current) => [...current, product].sort((a, b) => a.name.localeCompare(b.name, "pt-BR"))); };
  const editProduct = async (id: string, input: ProductInput) => { const product = await productRepository.update(id, input); setProducts((current) => current.map((item) => item.id === id ? product : item)); };
  const removeProduct = async (id: string) => { await productRepository.remove(id); setProducts((current) => current.filter((product) => product.id !== id)); };
  const searchProducts = (query: string) => { const q = normalizeText(query); return q ? products.filter((product) => [product.name, ...(product.searchTerms ?? [])].some((term) => normalizeText(term).includes(q))) : []; };
  return { products, isLoading, error, refresh, addProduct, editProduct, removeProduct, searchProducts };
}
