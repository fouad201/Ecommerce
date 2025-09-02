import Image from "next/image";
import { getProduct } from "@/lib/api";
import QtyAddToCart from "@/components/QtyAddToCart";

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);

  if (!product) {
    return (
      <main className="container" style={{ padding: "24px 0" }}>
        <p>Product not found.</p>
      </main>
    );
  }

  return (
    <main className="container" style={{ padding: "24px 0" }}>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 24 }}
      >
        <div
          style={{ border: "1px solid #eee", borderRadius: 12, padding: 12 }}
        >
          <Image
            src={product.image}
            alt={product.title}
            width={700}
            height={700}
            style={{ width: "100%", height: "auto", objectFit: "contain" }}
          />
        </div>
        <div>
          <h1 style={{ marginTop: 0 }}>{product.title}</h1>
          <p style={{ fontSize: 22, fontWeight: 800 }}>${product.price}</p>
          <p style={{ lineHeight: 1.6 }}>{product.description}</p>

          <QtyAddToCart
            product={{
              id: product.id,
              title: product.title,
              price: product.price,
              image: product.image,
            }}
          />
        </div>
      </div>
    </main>
  );
}
