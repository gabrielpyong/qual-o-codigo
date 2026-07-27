import { mockProducts } from "@/data/mock-products";
import { ProductCard } from "./ProductCard";

export function ProductList() {
  return (
    <section className="mt-8 space-y-4">
      {mockProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </section>
  );
}