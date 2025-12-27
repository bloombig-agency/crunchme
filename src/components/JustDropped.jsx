import { useState } from 'react'
import { HiLightningBolt, HiSparkles, HiFire, HiCheckCircle } from 'react-icons/hi'
import { PRODUCTS } from '../data/constants'
import './JustDropped.css'

function JustDropped() {
  const latestProduct = PRODUCTS[0]
  const [hoveredFeature, setHoveredFeature] = useState(null)

  if (!latestProduct) return null

  return (
    <section className="just-dropped-innovative">
      <div className="jd-container">
        <div className="jd-header-innovative">
          <div className="jd-badge-innovative">
            <div className="badge-dot"></div>
            <span>Latest Release</span>
          </div>
          <h2 className="jd-title-innovative">
            <span className="title-part-1">Meet the</span>
            <span className="title-part-2">Newest</span>
            <span className="title-part-3">Bar</span>
          </h2>
        </div>

        <div className="jd-content-innovative">
          <div className="jd-visual-innovative">
            <div className="product-container-3d">
              <div className="product-image-wrapper-3d">
                <img
                  src={latestProduct.image || '/images/products/peanut-rampage.png'}
                  alt={latestProduct.name}
                  className="product-image-3d"
                  onError={(e) => {
                    e.target.src = '/images/products/peanut-rampage.png'
                  }}
                />
              </div>
              <div className="product-info-overlay">
                <div className="overlay-stat">
                  <span className="stat-number">22</span>
                  <span className="stat-unit">g</span>
                </div>
                <div className="overlay-label">Protein</div>
              </div>
            </div>
          </div>
          
          <div className="jd-info-innovative">
            <div className="jd-category">PROTEIN BAR</div>
            <h3 className="jd-product-name">
              {latestProduct.name.split(' ').map((word, i) => (
                <span key={i} className="name-word" style={{ animationDelay: `${i * 0.1}s` }}>
                  {word}
                </span>
              ))}
            </h3>
            
            <p className="jd-description">
              {latestProduct.description || 'Premium protein bar crafted with natural ingredients. Built to munch.'}
            </p>
            
            <div className="jd-nutrition-innovative">
              {[
                { value: '22g', label: 'Protein', icon: <HiLightningBolt /> },
                { value: '0g', label: 'Sugar', icon: <HiSparkles />, highlight: true },
                { value: '250', label: 'Calories', icon: <HiFire /> }
              ].map((item, index) => (
                <div 
                  key={index}
                  className={`nutrition-card ${item.highlight ? 'highlight' : ''}`}
                >
                  <div className="nutrition-icon">{item.icon}</div>
                  <div className="nutrition-value">{item.value}</div>
                  <div className="nutrition-label">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="jd-features-innovative">
              {['All Natural', 'Gluten Free', 'No Preservatives'].map((feature, index) => (
                <div
                  key={index}
                  className={`feature-chip ${hoveredFeature === index ? 'active' : ''}`}
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <HiCheckCircle className="chip-icon" />
                  <span className="chip-text">{feature}</span>
                </div>
              ))}
            </div>

            <div className="jd-actions-innovative">
              <a href={`#product-${latestProduct.id}`} className="action-btn-primary">
                <span>Explore</span>
                <div className="btn-arrow">→</div>
              </a>
              <a href="#products" className="action-btn-secondary">
                View All
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default JustDropped

