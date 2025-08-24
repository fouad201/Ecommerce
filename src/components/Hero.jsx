import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../lib/api";
import "./Hero.css";

export default function Hero() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    let mounted = true;
    async function loadFeaturedProducts() {
      try {
        const { data } = await api.get("/products?limit=5"); 
        if (mounted) {
          setFeaturedProducts(data);
        }
      } catch (error) {
        console.error("Failed to load featured products:", error);
      }
    }
    loadFeaturedProducts();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    
    const timer = setInterval(() => {
      setActiveSlide((current) =>
        current === featuredProducts.length - 1 ? 0 : current + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredProducts.length]);

  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  if (featuredProducts.length === 0) {
    return (
      <section className="hero">
        <div className="hero-content">
          <div className="slider-container">
            <div className="slide active">
              <div className="slide-text">
                <h1>Loading Featured Products...</h1>
              </div>
              <div className="slide-image">
                <div className="loading-placeholder" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="slider-container">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className={`slide ${index === activeSlide ? "active" : ""}`}
              style={{
                transform: `translateX(${(index - activeSlide) * 100}%)`,
              }}
            >
              <div className="slide-text">
                <h1>{product.title}</h1>
                <p>{product.description.substring(0, 100)}...</p>
                <div className="slide-price">
                  <span className="price">${product.price.toFixed(2)}</span>
                </div>
                <Link to={`/product/${product.id}`} className="btn hero-btn">
                  Shop Now
                </Link>
              </div>
              <div className="slide-image">
                <img src={product.image} alt={product.title} />
              </div>
            </div>
          ))}
        </div>

        <div className="slider-controls">
          {featuredProducts.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === activeSlide ? "active" : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
