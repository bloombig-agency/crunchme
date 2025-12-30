import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiLightningBolt, HiSparkles, HiFire, HiCheckCircle } from 'react-icons/hi'
import { PRODUCTS } from '../data/constants'
import { useViewportAnimation, useStaggeredAnimation } from '../hooks/useViewportAnimation'
import './JustDropped.css'

function JustDropped() {
  const navigate = useNavigate()
  const latestProduct = PRODUCTS[0]
  const [hoveredFeature, setHoveredFeature] = useState(null)
  const [sectionRef, isSectionVisible] = useViewportAnimation({ threshold: 0.05, rootMargin: '0px 0px -100px 0px' })
  const [featureRefs, featureVisible] = useStaggeredAnimation(3, { threshold: 0.05, rootMargin: '0px 0px -100px 0px' })

  if (!latestProduct) return null

  return (
    <section className={`just-dropped-innovative ${isSectionVisible ? 'is-visible' : ''}`} ref={sectionRef}>
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
                  className={`nutrition-card ${item.highlight ? 'highlight' : ''} ${featureVisible[index] ? 'is-visible' : ''}`}
                  ref={featureRefs[index]}
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
              <a 
                href={`/product/${latestProduct.id}`}
                className="action-btn-primary"
                onClick={(e) => {
                  e.preventDefault()
                  navigate(`/product/${latestProduct.id}`)
                }}
              >
                <span>Explore</span>
                <div className="btn-arrow">→</div>
              </a>
              <a 
                href="/shop"
                className="action-btn-secondary"
                onClick={(e) => {
                  e.preventDefault()
                  navigate('/shop')
                }}
              >
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

