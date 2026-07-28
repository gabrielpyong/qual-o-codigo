"use client";

import { FormEvent, useState } from "react";
import { chambers } from "@/constants/chambers";
import { ChamberCode, Product, ProductInput } from "@/types/product";

const emptyProduct: ProductInput = { name: "", code: "", tare: 0, chamber: "D1", imageUrl: "" };
interface ProductFormProps { product?: Product; onSave: (input: ProductInput) => void | Promise<void>; onCancel: () => void; onDelete?: () => void; }

export function ProductForm({ product, onSave, onCancel, onDelete }: ProductFormProps) {
  const [values, setValues] = useState<ProductInput>(product ? { name: product.name, code: product.code, tare: product.tare, chamber: product.chamber, imageUrl: product.imageUrl ?? "" } : emptyProduct);
  const update = <K extends keyof ProductInput>(field: K, value: ProductInput[K]) => setValues((current) => ({ ...current, [field]: value }));
  const submit = async (event: FormEvent) => { event.preventDefault(); await onSave({ ...values, name: values.name.trim(), code: values.code.trim(), imageUrl: values.imageUrl?.trim() || undefined }); };

  return <form onSubmit={submit} className="mt-5 space-y-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
    <h2 className="text-xl font-black text-slate-900">{product ? "Editar produto" : "Novo produto"}</h2>
    <label className="block text-base font-bold text-slate-700">Nome<input required value={values.name} onChange={(event) => update("name", event.target.value)} className="mt-2 min-h-14 w-full rounded-xl border-2 border-slate-200 px-4 text-lg outline-none focus:border-rose-600" /></label>
    <div className="grid grid-cols-2 gap-4"><label className="block text-base font-bold text-slate-700">Código<input required inputMode="numeric" value={values.code} onChange={(event) => update("code", event.target.value)} className="mt-2 min-h-14 w-full rounded-xl border-2 border-slate-200 px-4 text-lg outline-none focus:border-rose-600" /></label><label className="block text-base font-bold text-slate-700">Tara (g)<input required min="0" type="number" inputMode="decimal" value={values.tare || ""} onChange={(event) => update("tare", Number(event.target.value))} className="mt-2 min-h-14 w-full rounded-xl border-2 border-slate-200 px-4 text-lg outline-none focus:border-rose-600" /></label></div>
    <label className="block text-base font-bold text-slate-700">Câmara<select value={values.chamber} onChange={(event) => update("chamber", event.target.value as ChamberCode)} className="mt-2 min-h-14 w-full rounded-xl border-2 border-slate-200 bg-white px-4 text-lg outline-none focus:border-rose-600">{chambers.map((chamber) => <option key={chamber.code} value={chamber.code}>{chamber.code} — {chamber.side}: {chamber.description}</option>)}</select></label>
    <label className="block text-base font-bold text-slate-700">URL da foto <span className="font-normal text-slate-500">(opcional)</span><input type="url" value={values.imageUrl} onChange={(event) => update("imageUrl", event.target.value)} placeholder="https://..." className="mt-2 min-h-14 w-full rounded-xl border-2 border-slate-200 px-4 text-lg outline-none focus:border-rose-600" /></label>
    <div className="flex flex-wrap gap-3 pt-1"><button className="min-h-14 rounded-xl bg-rose-700 px-6 text-lg font-black text-white hover:bg-rose-800">Salvar produto</button><button type="button" onClick={onCancel} className="min-h-14 rounded-xl px-5 text-lg font-bold text-slate-700 hover:bg-slate-100">Cancelar</button>{onDelete && <button type="button" onClick={onDelete} className="min-h-14 rounded-xl px-4 text-base font-bold text-red-700 hover:bg-red-50">Excluir</button>}</div>
  </form>;
}
