import { Product, ProductInput } from "@/types/product";
import { publicStorageUrl, supabaseRequest } from "./supabase";

type DatabaseProduct = { id: string; name: string; search_terms: string[] | null; code: string; tare: number | null; photo_url: string | null; category: string | null; chamber_location: Product["chamber"] | null; notes: string | null; };

function toProduct(product: DatabaseProduct): Product {
  return { id: product.id, name: product.name, code: product.code, tare: product.tare ?? 0, chamber: product.chamber_location ?? "D1", imageUrl: product.photo_url ?? undefined, searchTerms: product.search_terms ?? [], category: product.category, notes: product.notes };
}

function toDatabaseProduct(product: ProductInput) {
  return { name: product.name, code: product.code, tare: product.tare || null, chamber_location: product.chamber, photo_url: product.imageUrl ?? null, search_terms: product.searchTerms ?? [], category: product.category ?? null, notes: product.notes ?? null };
}

export const productRepository = {
  async list(): Promise<Product[]> { return (await supabaseRequest<DatabaseProduct[]>("/rest/v1/products?select=*&order=name.asc")).map(toProduct); },
  async create(input: ProductInput): Promise<Product> { const [product] = await supabaseRequest<DatabaseProduct[]>("/rest/v1/products", { method: "POST", headers: { "Content-Type": "application/json", Prefer: "return=representation" }, body: JSON.stringify(toDatabaseProduct(input)) }); return toProduct(product); },
  async update(id: string, input: ProductInput): Promise<Product> { const [product] = await supabaseRequest<DatabaseProduct[]>(`/rest/v1/products?id=eq.${id}`, { method: "PATCH", headers: { "Content-Type": "application/json", Prefer: "return=representation" }, body: JSON.stringify(toDatabaseProduct(input)) }); return toProduct(product); },
  async remove(id: string): Promise<void> { await supabaseRequest(`/rest/v1/products?id=eq.${id}`, { method: "DELETE" }); },
  async uploadPhoto(file: File): Promise<string> {
    if (!file.type.startsWith("image/")) throw new Error("Envie uma imagem válida.");
    if (file.size > 5 * 1024 * 1024) throw new Error("A imagem deve ter no máximo 5 MB.");
    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${crypto.randomUUID()}.${extension}`;
    await supabaseRequest(`/storage/v1/object/product-images/${path}`, { method: "POST", headers: { "Content-Type": file.type, "x-upsert": "false" }, body: file });
    return publicStorageUrl(path);
  },
  async removePhoto(photoUrl?: string) {
    if (!photoUrl) return;
    const path = photoUrl.split("/product-images/")[1];
    if (!path) return;
    await supabaseRequest("/storage/v1/object/product-images", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prefixes: [path] }) });
  },
};
