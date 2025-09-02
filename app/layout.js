// app/layout.js
import "./globals.css";
import NavBar from "@/components/NavBar";
import { CartProvider } from "@/components/cart/CartContext";

export const metadata = {
  title: "Cyber Store",
  description: "E-commerce demo with Next.js (App Router, JS)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <NavBar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
