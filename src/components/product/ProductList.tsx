import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

interface ProductListProps { products: Product[]; onEdit?: (product: Product) => void; }

export function ProductList({ products, onEdit }: ProductListProps) {
  return <section className="mt-5 space-y-4" aria-live="polite">{products.map((product) => <ProductCard key={product.id} product={product} onEdit={onEdit} />)}</section>;
}
