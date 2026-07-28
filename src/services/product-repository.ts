import { Product, ProductInput } from "@/types/product";
import { loadProducts, saveProducts } from "./product-storage";

type DatabaseProduct = {
  id: string;
  name: string;
  code: string;
  tare: number;
  chamber: Product["chamber"];
  image_url: string | null;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

function toProduct(product: DatabaseProduct): Product {
  return { ...product, imageUrl: product.image_url ?? undefined };
}

function toDatabaseProduct(product: ProductInput) {
  return { name: product.name, code: product.code, tare: product.tare, chamber: product.chamber, image_url: product.imageUrl ?? null };
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    ...init,
    headers: { apikey: supabaseKey!, Authorization: `Bearer ${supabaseKey!}`, "Content-Type": "application/json", ...init?.headers },
  });
  if (!response.ok) throw new Error("Não foi possível acessar o banco de dados.");
  return response.status === 204 ? (undefined as T) : response.json() as Promise<T>;
}

export const productRepository = {
  source: isSupabaseConfigured ? "supabase" : "local" as const,
  async list(): Promise<Product[]> {
    if (!isSupabaseConfigured) return loadProducts();
    const products = await request<DatabaseProduct[]>("products?select=*&order=name.asc");
    return products.map(toProduct);
  },
  async create(input: ProductInput): Promise<Product> {
    if (!isSupabaseConfigured) {
      const product = { ...input, id: crypto.randomUUID() };
      saveProducts([product, ...loadProducts()]);
      return product;
    }
    const [product] = await request<DatabaseProduct[]>("products", { method: "POST", headers: { Prefer: "return=representation" }, body: JSON.stringify(toDatabaseProduct(input)) });
    return toProduct(product);
  },
  async update(id: string, input: ProductInput): Promise<Product> {
    if (!isSupabaseConfigured) {
      const products = loadProducts().map((product) => product.id === id ? { ...input, id } : product);
      saveProducts(products);
      return products.find((product) => product.id === id)!;
    }
    const [product] = await request<DatabaseProduct[]>(`products?id=eq.${id}`, { method: "PATCH", headers: { Prefer: "return=representation" }, body: JSON.stringify(toDatabaseProduct(input)) });
    return toProduct(product);
  },
  async remove(id: string): Promise<void> {
    if (!isSupabaseConfigured) { saveProducts(loadProducts().filter((product) => product.id !== id)); return; }
    await request(`products?id=eq.${id}`, { method: "DELETE" });
  },
};
