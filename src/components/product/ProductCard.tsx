import { ImageIcon, MapPin, Tag } from "lucide-react";
import { Product } from "@/types/product";

interface ProductCardProps { product: Product; onEdit?: (product: Product) => void; }

export function ProductCard({ product, onEdit }: ProductCardProps) {
  return <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
    <div className="flex min-h-40"><div className="flex w-28 shrink-0 items-center justify-center bg-slate-100 sm:w-36">{product.imageUrl ? <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" /> : <ImageIcon className="size-10 text-slate-400" aria-hidden="true" />}</div>
      <div className="min-w-0 flex-1 p-5"><p className="text-sm font-bold uppercase tracking-wide text-slate-500">Código da balança</p><p className="mt-1 text-5xl font-black leading-none text-rose-700">{product.code}</p><h2 className="mt-4 text-xl font-bold text-slate-900">{product.name}</h2>
        <div className="mt-3 flex flex-wrap gap-2 text-sm font-semibold">{product.tare > 0 && <span className="rounded-full bg-slate-100 px-3 py-1.5 text-slate-700">Tara: {product.tare.toLocaleString("pt-BR", { minimumFractionDigits: 3, maximumFractionDigits: 3 })} kg</span>}<span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-3 py-1.5 text-rose-800"><MapPin className="size-4" /> {product.chamber}</span>{product.category && <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1.5 text-amber-800"><Tag className="size-4" /> {product.category}</span>}</div>
        {product.notes && <p className="mt-3 text-sm text-slate-500">{product.notes}</p>}{onEdit && <button type="button" onClick={() => onEdit(product)} className="mt-4 min-h-11 rounded-xl px-3 text-base font-bold text-rose-700 hover:bg-rose-50">Editar produto</button>}</div></div>
  </article>;
}
