import { Search } from "lucide-react";

interface SearchInputProps { value: string; onChange: (value: string) => void; }

export function SearchInput({ value, onChange }: SearchInputProps) {
  return <div className="relative"><Search aria-hidden="true" className="pointer-events-none absolute left-5 top-1/2 size-6 -translate-y-1/2 text-slate-400" /><input autoFocus type="search" placeholder="Digite o nome do produto" value={value} onChange={(event) => onChange(event.target.value)} className="min-h-16 w-full rounded-2xl border-2 border-slate-200 bg-white py-4 pl-14 pr-4 text-xl font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-rose-600 focus:ring-4 focus:ring-rose-100" /></div>;
}
