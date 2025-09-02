import "./contact.css";

export default function ContactPage() {
  return (
    <div className="contact-page">
      <div className="container">
        {/* Title */}
        <h1 className="contact-title">
          Contact <span>Us</span>
        </h1>
        <p className="contact-intro">
          We’d love to hear from you! Whether you have a question, feedback, or
          a business inquiry — feel free to get in touch with our team.
        </p>

        {/* Contact form */}
        <div className="contact-grid">
          {/* Form */}
          <form className="contact-form">
            <label>
              Name
              <input type="text" placeholder="Your Name" required />
            </label>
            <label>
              Email
              <input type="email" placeholder="Your Email" required />
            </label>
            <label>
              Message
              <textarea placeholder="Write your message..." rows="5" required />
            </label>
            <button type="submit" className="contact-btn">
              Send Message
            </button>
          </form>

          {/* Info */}
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>
              Email: <a href="mailto:support@cyber.com">support@cyber.com</a>
            </p>
            <p>
              Phone: <a href="tel:+20123456789">+20 01227289650</a>
            </p>
            <p>Address: 123 Cyber Street, Smart City</p>
          </div>
        </div>
      </div>
    </div>
  );
}
