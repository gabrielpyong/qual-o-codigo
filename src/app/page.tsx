import { Header } from "@/components/layout/Header";
import { ProductList } from "@/components/product/ProductList";
import { SearchInput } from "@/components/search/SearchInput";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl p-8">
      <Header />

      <SearchInput />

      <ProductList />
    </main>
  );
}