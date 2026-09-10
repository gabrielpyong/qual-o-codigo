"use client";

import { useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { ProductList } from "@/components/product/ProductList";
import { SearchInput } from "@/components/search/SearchInput";
import { useProducts } from "@/hooks/use-products";

export default function Home() {
  const { isLoading, error, refresh, searchProducts } = useProducts(); const [query, setQuery] = useState(""); const products = searchProducts(query);
  return <main className="min-h-screen bg-stone-50 pb-10"><div className="mx-auto max-w-2xl px-4 pt-5 sm:px-6"><AppHeader /><h1 className="text-2xl font-black">Consulte rapidamente o código dos produtos</h1><p className="mb-5 mt-2 text-slate-600">Digite o nome; o resultado aparece na hora.</p><SearchInput value={query} onChange={setQuery} />{isLoading && <p className="mt-5 rounded-2xl bg-white p-6 text-center text-slate-500">Carregando produtos...</p>}{error && <div className="mt-5 rounded-2xl bg-red-50 p-5 text-red-800"><p className="font-bold">Não foi possível acessar o catálogo.</p><p className="mt-1 text-sm">{error}</p><button onClick={() => void refresh()} className="mt-3 min-h-11 rounded-xl bg-red-700 px-4 font-bold text-white">Tentar novamente</button></div>}{!isLoading && !error && !query && <p className="mt-5 rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center text-lg text-slate-500">Comece digitando o nome do produto.</p>}{!isLoading && !error && query && !products.length && <p className="mt-5 rounded-3xl bg-white p-8 text-center text-lg text-slate-600">Não encontramos nenhum produto.</p>}{!isLoading && !error && products.length > 0 && <><p className="mt-5 text-sm font-bold text-slate-500">{products.length} {products.length === 1 ? "produto encontrado" : "produtos encontrados"}</p><ProductList products={products} /></>}</div></main>;
}
