import Link from "next/link";
import { BookOpen, Settings } from "lucide-react";

export function AppHeader({ admin = false }: { admin?: boolean }) {
  return <header className="mb-6 flex items-center justify-between gap-3"><Link href="/" className="flex items-center gap-3"><span className="rounded-2xl bg-rose-700 p-3 text-white"><BookOpen className="size-6" /></span><span><span className="block text-sm font-bold uppercase tracking-[0.16em] text-rose-700">Açougue</span><span className="block text-2xl font-black tracking-tight">Códigos Rissul</span></span></Link><Link href={admin ? "/" : "/admin"} className="inline-flex min-h-12 items-center gap-2 rounded-xl px-3 font-bold text-slate-600 hover:bg-slate-100"><Settings className="size-5" />{admin ? "Consulta" : "Admin"}</Link></header>;
}
