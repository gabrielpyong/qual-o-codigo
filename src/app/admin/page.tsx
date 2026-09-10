"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { AppHeader } from "@/components/layout/AppHeader";
import { ProductForm } from "@/components/product/ProductForm";
import { ProductList } from "@/components/product/ProductList";
import { SearchInput } from "@/components/search/SearchInput";
import { useProducts } from "@/hooks/use-products";
import { productRepository } from "@/services/product-repository";
import { Product } from "@/types/product";

export default function AdminPage() {
  const { products, isLoading, error, addProduct, editProduct, removeProduct, searchProducts } = useProducts(); const [query, setQuery] = useState(""); const [editing, setEditing] = useState<Product>(); const [formOpen, setFormOpen] = useState(false); const [notice, setNotice] = useState(""); const listed = query ? searchProducts(query) : products;
  const close = () => { setFormOpen(false); setEditing(undefined); };
  return <main className="min-h-screen bg-stone-50 pb-10"><div className="mx-auto max-w-2xl px-4 pt-5 sm:px-6"><AppHeader admin /><div className="flex items-center justify-between gap-3"><div><h1 className="text-2xl font-black">Produtos</h1><p className="mt-1 text-slate-600">Cadastre e mantenha o catálogo central.</p></div><button onClick={() => { setEditing(undefined); setFormOpen(true); }} className="min-h-14 rounded-xl bg-rose-700 px-4 text-lg font-black text-white"><Plus className="mr-1 inline size-5" />Novo</button></div>{notice && <p className="mt-4 rounded-xl bg-emerald-50 p-4 font-bold text-emerald-800">{notice}</p>}{formOpen ? <ProductForm product={editing} onCancel={close} onSave={async (input) => { if (editing) { await editProduct(editing.id, input); setNotice("Produto atualizado."); } else { await addProduct(input); setNotice("Produto cadastrado."); } close(); }} onDelete={editing ? async () => { if (!window.confirm(`Excluir ${editing.name}?`)) return; await productRepository.removePhoto(editing.imageUrl); await removeProduct(editing.id); setNotice("Produto excluído."); close(); } : undefined} /> : <><div className="mt-5"><SearchInput value={query} onChange={setQuery} /></div>{isLoading ? <p className="mt-5 text-center text-slate-500">Carregando produtos...</p> : error ? <p className="mt-5 rounded-xl bg-red-50 p-4 font-bold text-red-700">{error}</p> : <ProductList products={listed} onEdit={(product) => { setEditing(product); setFormOpen(true); }} />}</>}</div></main>;
}
