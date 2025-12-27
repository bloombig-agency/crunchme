import { GiChocolateBar } from 'react-icons/gi'
import { PRODUCTS } from '../data/constants'
import './Products.css'

function Products() {
  const chocolateProducts = PRODUCTS.filter(p => p.name.toLowerCase().includes('choco'))
  const allProducts = PRODUCTS

  return (
    <section id="products" className="products-showcase-section">
      <div className="products-showcase-container">
        <div className="section-header">
          <div className="section-label">
            <span className="label-line"></span>
            <span className="label-text">Full Collection</span>
            <span className="label-line"></span>
          </div>
          <h2 className="section-title">
            Complete <span className="title-highlight">Protein Bar</span> Range
          </h2>
          <p className="section-subtitle">
            Explore our complete selection of premium protein bars. Each bar delivers 22g of protein with zero compromise on taste.
          </p>
        </div>

        {chocolateProducts.length > 0 && (
          <div className="chocolate-collection-section">
            <div className="chocolate-collection-header">
              <div className="chocolate-collection-badge">
                <GiChocolateBar className="badge-icon-choco" />
                <span>Chocolate Collection</span>
              </div>
              <h3 className="chocolate-collection-title">
                Rich & <span className="choco-accent">Decadent</span>
              </h3>
              <p className="chocolate-collection-desc">
                Indulge in our premium chocolate protein bars, crafted with rich cocoa and natural ingredients.
              </p>
            </div>
            <div className="products-showcase-grid chocolate-grid">
              {allProducts.map((product) => (
                <div key={product.id} className={`product-showcase-card ${chocolateProducts.some(p => p.id === product.id) ? 'chocolate-card' : ''}`}>
                  <a href={`#product-${product.id}`} className="product-card-link">
                    <div className="product-card-image-area">
                      {product.badge && (
                        <div className={`product-badge-tag ${chocolateProducts.some(p => p.id === product.id) ? 'chocolate-badge' : ''}`}>
                          {product.badge}
                        </div>
                      )}
                      <div className="product-image-box">
                        <img
                          src={product.image || '/images/products/peanut-rampage.png'}
                          alt={product.name}
                          className="product-card-image"
                          onError={(e) => {
                            e.target.src = '/images/products/peanut-rampage.png'
                          }}
                        />
                      </div>
                    </div>
                    <div className="product-card-details">
                      <div className="product-type">
                        {chocolateProducts.some(p => p.id === product.id) ? 'Chocolate Protein Bar' : 'Protein Bar'}
                      </div>
                      <h3 className="product-title">{product.name}</h3>
                      <p className="product-summary">
                        {product.description || 'Premium protein bar'}
                      </p>
                      <div className="product-specs">
                        <div className="spec-item">
                          <span className="spec-value">22g</span>
                          <span className="spec-label">Protein</span>
                        </div>
                        <div className="spec-item spec-highlight">
                          <span className="spec-value">0g</span>
                          <span className="spec-label">Sugar</span>
                        </div>
                        <div className="spec-item">
                          <span className="spec-value">250</span>
                          <span className="spec-label">Cal</span>
                        </div>
                      </div>
                      <div className="product-card-action">
                        <span className="action-text">View Details</span>
                        <span className="action-arrow">→</span>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Products
