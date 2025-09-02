// app/page.js
import BrowseByCategory from "@/components/BrowseByCategory";
import ProductsSection from "@/components/ProductsSection";
import DiscountsSection from "@/components/DiscountsSection";
import Footer from "@/components/Footer";
import { getCategories, getAllProducts } from "@/lib/api";

export default async function Home() {
  const [categories, all] = await Promise.all([
    getCategories(),
    getAllProducts(),
  ]);

  // const heroProducts = all.slice(0, 5);
  const newArrival = all.slice(0, 8);
  const bestseller = all.slice(8, 16);
  const discounts = all.slice(12, 20);

  return (
    <>
      <ProductsSection title="New Arrival" products={newArrival} />
      <ProductsSection title="Bestseller" products={bestseller} />
      <DiscountsSection products={discounts} />
      <Footer />
    </>
  );
}
