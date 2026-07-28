import { MapPin, Package } from "lucide-react";
import { chambers } from "@/constants/chambers";
import { Product } from "@/types/product";

interface ProductCardProps { product: Product; onEdit?: (product: Product) => void; }

export function ProductCard({ product, onEdit }: ProductCardProps) {
  const chamber = chambers.find((item) => item.code === product.chamber);

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="flex min-h-40">
        <div className="flex w-28 shrink-0 items-center justify-center bg-amber-50 sm:w-36">
          {product.imageUrl ? (
            // A URL is used in the MVP; Supabase Storage will replace it later.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
          ) : <Package aria-hidden="true" className="size-12 text-amber-600" />}
        </div>
        <div className="min-w-0 flex-1 p-5">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Código da balança</p>
          <p className="mt-1 text-5xl font-black leading-none tracking-tight text-rose-700">{product.code}</p>
          <h2 className="mt-4 text-xl font-bold text-slate-900">{product.name}</h2>
          <div className="mt-3 flex flex-wrap gap-2 text-sm font-semibold">
            <span className="rounded-full bg-slate-100 px-3 py-1.5 text-slate-700">Tara: {product.tare} g</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-3 py-1.5 text-rose-800"><MapPin className="size-4" /> Câmara {product.chamber}</span>
          </div>
          {chamber && <p className="mt-3 text-sm text-slate-500">{chamber.description}</p>}
          {onEdit && <button type="button" onClick={() => onEdit(product)} className="mt-4 min-h-11 rounded-xl px-3 text-base font-bold text-rose-700 hover:bg-rose-50">Editar produto</button>}
        </div>
      </div>
    </article>
  );
}
