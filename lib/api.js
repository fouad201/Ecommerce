// lib/api.js
const API = process.env.NEXT_PUBLIC_API_BASE || "https://fakestoreapi.com";

export async function getProducts(limit = 8) {
  const res = await fetch(`${API}/products?limit=${limit}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function getAllProducts() {
  const res = await fetch(`${API}/products`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json(); // 20 عنصر
}

export async function getCategories() {
  const res = await fetch(`${API}/products/categories`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function getProduct(id) {
  const res = await fetch(`${API}/products/${id}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}
