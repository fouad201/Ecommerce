// app/search/page.js
import { redirect } from "next/navigation";

export default function SearchPage({ searchParams }) {
  const q = searchParams?.q || "";
  redirect(`/shop?q=${encodeURIComponent(q)}`);
}
