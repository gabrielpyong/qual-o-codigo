const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && key);

export async function supabaseRequest<T>(path: string, init?: RequestInit): Promise<T> {
  if (!url || !key) throw new Error("O Supabase não está configurado. Adicione as variáveis de ambiente na Vercel.");
  const response = await fetch(`${url}${path}`, { ...init, headers: { apikey: key, Authorization: `Bearer ${key}`, ...init?.headers } });
  if (!response.ok) { const message = await response.text(); throw new Error(message || "Não foi possível concluir a operação no Supabase."); }
  return response.status === 204 ? (undefined as T) : response.json() as Promise<T>;
}

export function publicStorageUrl(path: string) { return url ? `${url}/storage/v1/object/public/product-images/${path}` : ""; }
