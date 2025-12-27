import './Footer.css'

function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <h2 className="footer-logo">
              CRUNCH<span className="logo-accent">ME</span>
            </h2>
            <p className="footer-tagline">
              Premium protein bars built to munch. Crafted with 22g protein, zero preservatives, and all-natural ingredients.
            </p>
            <div className="footer-social">
              <a href="https://www.facebook.com" title="CRUNCHME on Facebook" rel="me" target="_blank" className="social-link">
                Facebook
              </a>
              <a href="https://www.instagram.com" title="CRUNCHME on Instagram" rel="me" target="_blank" className="social-link">
                Instagram
              </a>
              <a href="https://www.twitter.com" title="CRUNCHME on Twitter" rel="me" target="_blank" className="social-link">
                Twitter
              </a>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h3 className="footer-column-title">Products</h3>
              <ul className="footer-link-list">
                <li><a href="#products">Protein Bars</a></li>
                <li><a href="#products">Bundles</a></li>
                <li><a href="#products">All Products</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-column-title">Company</h3>
              <ul className="footer-link-list">
                <li><a href="#about">About Us</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#faq">FAQs</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-column-title">Legal</h3>
              <ul className="footer-link-list">
                <li><a href="#terms">Terms</a></li>
                <li><a href="#privacy">Privacy</a></li>
                <li><a href="#shipping">Shipping</a></li>
              </ul>
            </div>

            <div className="footer-column footer-newsletter">
              <h3 className="footer-column-title">Stay Updated</h3>
              <p className="newsletter-description">
                Get the latest updates, exclusive offers, and new product launches.
              </p>
              <form className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="newsletter-input"
                  aria-label="Enter your email"
                />
                <button type="submit" className="newsletter-button">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>© {new Date().getFullYear()} CrunchMe Protein Bars LLC. All rights reserved.</p>
          </div>
          <div className="footer-legal">
            <a href="#privacy">Privacy</a>
            <span className="legal-divider">•</span>
            <a href="#terms">Terms</a>
            <span className="legal-divider">•</span>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
