import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PRODUCTS } from '../data/constants'
import { useViewportAnimation, useStaggeredAnimation } from '../hooks/useViewportAnimation'
import './FeaturedProducts.css'

function FeaturedProducts() {
  const navigate = useNavigate()
  const featuredProducts = PRODUCTS.slice(0, 3)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [sectionRef, isSectionVisible] = useViewportAnimation({ threshold: 0.05, rootMargin: '0px 0px -100px 0px' })
  const [cardRefs, cardVisible] = useStaggeredAnimation(featuredProducts.length, { threshold: 0.05, rootMargin: '0px 0px -100px 0px' })

  return (
    <section className={`featured-innovative ${isSectionVisible ? 'is-visible' : ''}`} id="featured" ref={sectionRef}>
      <div className="featured-container-innovative">
        <div className="featured-header-innovative">
          <div className="header-badge-innovative">
            <span className="badge-pulse"></span>
            <span className="badge-text">Best Sellers</span>
          </div>
          <h2 className="featured-title-innovative">
            <span className="title-line">Customer</span>
            <span className="title-line title-accent">Favorites</span>
          </h2>
          <p className="featured-subtitle-innovative">
            Our most loved protein bars, chosen by thousands of satisfied customers.
          </p>
        </div>

        <div className="featured-grid-innovative">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className={`featured-card-innovative card-${index + 1} ${hoveredIndex === index ? 'hovered' : ''} ${cardVisible[index] ? 'is-visible' : ''}`}
              ref={cardRefs[index]}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ '--card-delay': `${index * 0.1}s` }}
            >
              <a 
                href={`/product/${product.id}`}
                className="card-link-innovative"
                onClick={(e) => {
                  e.preventDefault()
                  navigate(`/product/${product.id}`)
                }}
              >
                <div className="card-image-wrapper-innovative">
                  <div className="card-badge-innovative">
                    {product.badge || 'Popular'}
                  </div>
                  <div className="card-image-container-innovative">
                    <img
                      src={product.image || '/images/products/peanut-rampage.png'}
                      alt={product.name}
                      className="card-image-innovative"
                      onError={(e) => {
                        e.target.src = '/images/products/peanut-rampage.png'
                      }}
                    />
                  </div>
                  <div className="card-overlay-innovative"></div>
                </div>
                
                <div className="card-content-innovative">
                  <div className="card-category-innovative">PROTEIN BAR</div>
                  <h3 className="card-name-innovative">{product.name}</h3>
                  <p className="card-desc-innovative">
                    {product.description || 'Premium protein bar'}
                  </p>
                  
                  <div className="card-stats-innovative">
                    <div className="stat-mini">
                      <span className="stat-value-mini">22g</span>
                      <span className="stat-label-mini">Protein</span>
                    </div>
                    <div className="stat-mini stat-highlight">
                      <span className="stat-value-mini">0g</span>
                      <span className="stat-label-mini">Sugar</span>
                    </div>
                  </div>

                  <div className="card-action-innovative">
                    <span className="action-text-innovative">View Details</span>
                    <div className="action-arrow-innovative">
                      <span>→</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>

        <div className="featured-footer-innovative">
          <a 
            href="/shop"
            className="cta-view-all"
            onClick={(e) => {
              e.preventDefault()
              navigate('/shop')
            }}
          >
            <span className="cta-text">Explore Full Collection</span>
            <div className="cta-icon-wrapper">
              <span className="cta-icon">→</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts
