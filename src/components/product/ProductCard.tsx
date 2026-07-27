import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article
      className="
        rounded-xl
        bg-white
        p-5
        shadow-sm
        border
        border-gray-200
      "
    >
      <h2 className="text-xl font-semibold">
        {product.name}
      </h2>

      <div className="mt-4 space-y-1 text-gray-700">
        <p>
          <strong>Código:</strong> {product.code}
        </p>

        <p>
          <strong>Tara:</strong> {product.tare}
        </p>
      </div>
    </article>
  );
}