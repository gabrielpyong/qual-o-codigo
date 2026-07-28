"use client";

import { useState } from "react";
import { BookOpen, Plus, Search } from "lucide-react";
import { ProductForm } from "@/components/product/ProductForm";
import { ProductList } from "@/components/product/ProductList";
import { SearchInput } from "@/components/search/SearchInput";
import { useProducts } from "@/hooks/use-products";
import { Product } from "@/types/product";

type View = "search" | "manage";

export default function Home() {
  const { products, isReady, error, source, addProduct, editProduct, removeProduct, searchProducts } = useProducts();
  const [view, setView] = useState<View>("search");
  const [query, setQuery] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const results = searchProducts(query);

  const showForm = (product?: Product) => { setEditingProduct(product); setIsFormOpen(true); };
  const closeForm = () => { setIsFormOpen(false); setEditingProduct(undefined); };

  return <main className="min-h-screen bg-stone-50 pb-10 text-slate-900">
    <div className="mx-auto max-w-2xl px-4 pt-5 sm:px-6">
      <header className="mb-6 flex items-center justify-between gap-3">
        <div><p className="text-sm font-bold uppercase tracking-[0.18em] text-rose-700">Açougue</p><h1 className="text-3xl font-black tracking-tight">Qual o Código?</h1></div>
        <div className="rounded-2xl bg-rose-700 p-3 text-white"><BookOpen className="size-7" /></div>
      </header>

      <nav className="grid grid-cols-2 rounded-2xl bg-slate-200 p-1.5" aria-label="Navegação principal">
        <button onClick={() => { setView("search"); closeForm(); }} className={`min-h-14 rounded-xl text-lg font-black transition ${view === "search" ? "bg-white text-rose-700 shadow-sm" : "text-slate-600"}`}><Search className="mr-2 inline size-5" />Consultar</button>
        <button onClick={() => { setView("manage"); setQuery(""); }} className={`min-h-14 rounded-xl text-lg font-black transition ${view === "manage" ? "bg-white text-rose-700 shadow-sm" : "text-slate-600"}`}><Plus className="mr-1 inline size-5" />Cadastrar</button>
      </nav>

      {!isReady ? <div className="mt-8 rounded-2xl bg-white p-6 text-center text-slate-500">Carregando produtos...</div> : <>{error && <p className="mt-4 rounded-xl bg-red-50 p-4 font-bold text-red-800">{error}</p>}{view === "search" ? <section className="mt-6">
        <h2 className="mb-2 text-2xl font-black">Encontre o produto</h2><p className="mb-5 text-base text-slate-600">Digite parte do nome. A busca aparece na hora.</p>
        <SearchInput value={query} onChange={setQuery} />
        {!query ? <div className="mt-5 rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center text-lg text-slate-500">Comece digitando o nome do produto.</div> : results.length ? <><p className="mt-5 text-sm font-bold text-slate-500">{results.length} {results.length === 1 ? "produto encontrado" : "produtos encontrados"}</p><ProductList products={results} /></> : <div className="mt-5 rounded-3xl bg-white p-8 text-center"><p className="text-xl font-bold">Produto não encontrado</p><p className="mt-2 text-slate-500">Tente outro nome ou cadastre o produto.</p></div>}
      </section> : <section className="mt-6">
        <div className="flex items-center justify-between gap-4"><div><h2 className="text-2xl font-black">Cadastro de produtos</h2><p className="mt-1 text-slate-600">{products.length} produtos cadastrados {source === "supabase" ? "no banco" : "neste aparelho"}.</p></div>{!isFormOpen && <button onClick={() => showForm()} className="min-h-14 shrink-0 rounded-xl bg-rose-700 px-4 text-lg font-black text-white hover:bg-rose-800"><Plus className="mr-1 inline size-5" />Novo</button>}</div>
        {isFormOpen ? <ProductForm key={editingProduct?.id ?? "new"} product={editingProduct} onSave={async (input) => { if (editingProduct) await editProduct(editingProduct.id, input); else await addProduct(input); closeForm(); }} onCancel={closeForm} onDelete={editingProduct ? async () => { if (window.confirm(`Excluir ${editingProduct.name}?`)) { await removeProduct(editingProduct.id); closeForm(); } } : undefined} /> : <ProductList products={products} onEdit={showForm} />}
      </section>}
      </>}
    </div>
  </main>;
}
