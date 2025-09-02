// app/shop/page.js
import ShopFilters from "@/components/ShopFilters";
import ShopGrid from "@/components/ShopGrid";
import Pagination from "@/components/Pagination";
import { getAllProducts, getCategories } from "@/lib/api";

const PER_PAGE = 12;

export const metadata = { title: "Shop - Cyber Store" };

export default async function ShopPage({ searchParams }) {
  const [all, categories] = await Promise.all([
    getAllProducts(),
    getCategories(),
  ]);

  const q = (searchParams?.q || "").toLowerCase();
  const category = searchParams?.category || "";
  const min = parseFloat(searchParams?.min ?? "");
  const max = parseFloat(searchParams?.max ?? "");
  const page = Math.max(1, parseInt(searchParams?.page || "1", 10));

  // filters
  let filtered = all.filter((p) => {
    if (category && p.category !== category) return false;
    if (!Number.isNaN(min) && p.price < min) return false;
    if (!Number.isNaN(max) && p.price > max) return false;
    if (q && !`${p.title} ${p.description}`.toLowerCase().includes(q))
      return false;
    return true;
  });

  const total = filtered.length;
  const start = (page - 1) * PER_PAGE;
  const pageItems = filtered.slice(start, start + PER_PAGE);

  return (
    <main className="container" style={{ padding: "18px 0 28px" }}>
      <h1 style={{ marginTop: 0 }}>Shop</h1>
      <ShopFilters categories={categories} />
      <ShopGrid products={pageItems} />
      <Pagination total={total} perPage={PER_PAGE} />
    </main>
  );
}
