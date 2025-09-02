import "./blog.css";

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "Top 10 Gadgets for 2025",
      excerpt:
        "Discover the must-have gadgets of 2025 that are changing the way we live and work...",
      date: "Aug 20, 2025",
      author: "Cyber Team",
    },
    {
      id: 2,
      title: "How to Choose the Best Laptop",
      excerpt:
        "A step-by-step guide to help you pick the perfect laptop for your needs and budget...",
      date: "Aug 10, 2025",
      author: "Cyber Experts",
    },
    {
      id: 3,
      title: "The Future of Online Shopping",
      excerpt:
        "E-commerce is evolving faster than ever. Here’s what to expect in the next few years...",
      date: "Jul 28, 2025",
      author: "Cyber Editorial",
    },
  ];

  return (
    <div className="blog-page">
      <div className="container">
        <h1 className="blog-title">
          Our <span>Blog</span>
        </h1>
        <p className="blog-intro">
          Read our latest articles about technology, lifestyle, and online
          shopping tips.
        </p>

        <div className="blog-grid">
          {posts.map((post) => (
            <div className="blog-card" key={post.id}>
              <h2>{post.title}</h2>
              <p className="blog-excerpt">{post.excerpt}</p>
              <div className="blog-meta">
                <span>{post.date}</span> | <span>{post.author}</span>
              </div>
              <a href={`/blog/${post.id}`} className="blog-btn">
                Read More
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
