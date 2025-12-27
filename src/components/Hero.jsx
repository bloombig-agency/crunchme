import { useState, useEffect } from 'react'
import { HiArrowRight, HiSparkles } from 'react-icons/hi'
import './Hero.css'

function Hero() {
  const [activeStat, setActiveStat] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStat((prev) => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="hero-innovative">
      <div className="hero-container-innovative">
        <div className="hero-content-innovative">
          <div className="hero-badge-innovative">
            <HiSparkles className="badge-icon" />
            <span>New Collection</span>
          </div>
          
          <div className="hero-title-wrapper">
            <h1 className="hero-title-innovative">
              <span className="title-line-1">CRUNCH</span>
              <span className="title-line-2">ME</span>
            </h1>
            <div className="title-underline"></div>
          </div>

          <div className="hero-tagline-innovative">
            <span className="tagline-word">Premium</span>
            <span className="tagline-word">Protein</span>
            <span className="tagline-word tagline-accent">Bars</span>
          </div>

          <p className="hero-description-innovative">
            Built to munch. Crafted with 22g protein, zero preservatives, and all-natural ingredients. 
            Experience the premium taste that fuels your active lifestyle.
          </p>

          <div className="hero-stats-innovative">
            {[
              { value: '22g', label: 'Protein', color: 'var(--color-lime)' },
              { value: '0g', label: 'Sugar', color: 'var(--color-pink)' },
              { value: '100%', label: 'Natural', color: 'var(--color-lime)' }
            ].map((stat, index) => (
              <div 
                key={index}
                className={`stat-card ${activeStat === index ? 'active' : ''}`}
                style={{ '--stat-color': stat.color }}
                onClick={() => setActiveStat(index)}
              >
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="hero-actions-innovative">
            <a href="#products" className="cta-primary-innovative">
              <span>Shop Now</span>
              <div className="cta-arrow">
                <HiArrowRight />
              </div>
            </a>
            <a href="#about" className="cta-secondary-innovative">
              Discover More
            </a>
          </div>
        </div>

        <div className="hero-visual-innovative">
          <div className="product-showcase-3d">
            <img 
              alt="CrunchMe Premium Protein Bars"
              className="product-image-3d"
              src="/images/products/peanut-rampage.png"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
            <div className="product-badge-3d">
              <span>22g</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
