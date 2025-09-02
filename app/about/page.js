import "./about.css";

export default function AboutPage() {
  return (
    <div className="about-page">
      <div className="container">
        {/* Title */}
        <h1 className="about-title">
          About <span>Cyber</span>
        </h1>

        {/* Intro */}
        <p className="about-intro">
          At <strong>Cyber</strong>, we’re passionate about bringing you the
          latest trends in electronics, fashion, and lifestyle products. Our
          mission is simple: deliver top-quality items at fair prices with a
          shopping experience you’ll love.
        </p>

        {/* 3 Columns */}
        <div className="about-grid">
          <div className="about-card">
            <h2>Our Mission</h2>
            <p>
              To empower customers with the best products and seamless online
              shopping. We value innovation, trust, and satisfaction above all.
            </p>
          </div>

          <div className="about-card">
            <h2>Our Vision</h2>
            <p>
              To be a global leader in e-commerce by offering diverse products
              and excellent service that inspires loyalty and confidence.
            </p>
          </div>

          <div className="about-card">
            <h2>Our Values</h2>
            <p>
              Integrity, quality, and customer care are at the heart of
              everything we do. We believe in long-term relationships with our
              shoppers.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="about-cta">
          <h3>Want to know more about us?</h3>
          <p>
            Visit our shop to explore trending products and exclusive deals.
          </p>
          <a href="/shop" className="about-btn">
            Shop Now
          </a>
        </div>
      </div>
    </div>
  );
}
