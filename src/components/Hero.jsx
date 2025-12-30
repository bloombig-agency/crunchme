import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiArrowRight, HiSparkles } from 'react-icons/hi'
import { useViewportAnimation, useStaggeredAnimation } from '../hooks/useViewportAnimation'
import './Hero.css'

function Hero() {
  const navigate = useNavigate()
  const [activeStat, setActiveStat] = useState(0)
  const [heroRef, isVisible] = useViewportAnimation({ threshold: 0.05, rootMargin: '0px 0px -100px 0px' })
  const [contentRefs, contentVisible] = useStaggeredAnimation(6, { threshold: 0.05, rootMargin: '0px 0px -100px 0px' })

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStat((prev) => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className={`hero-innovative ${isVisible ? 'is-visible' : ''}`} ref={heroRef}>
      <div className="hero-container-innovative">
        <div className="hero-content-innovative">
          <div className={`hero-badge-innovative ${contentVisible[0] ? 'is-visible' : ''}`} ref={contentRefs[0]}>
            <HiSparkles className="badge-icon" />
            <span>New Collection</span>
          </div>
          
          <div className={`hero-title-wrapper ${contentVisible[1] ? 'is-visible' : ''}`} ref={contentRefs[1]}>
            <h1 className="hero-title-innovative">
              <span className="title-line-1">CRUNCH</span>
              <span className="title-line-2">ME</span>
            </h1>
            <div className="title-underline"></div>
          </div>

          <div className={`hero-tagline-innovative ${contentVisible[2] ? 'is-visible' : ''}`} ref={contentRefs[2]}>
            <span className="tagline-word">Premium</span>
            <span className="tagline-word">Protein</span>
            <span className="tagline-word tagline-accent">Bars</span>
          </div>

          <p className={`hero-description-innovative ${contentVisible[3] ? 'is-visible' : ''}`} ref={contentRefs[3]}>
            Built to munch. Crafted with 22g protein, zero preservatives, and all-natural ingredients. 
            Experience the premium taste that fuels your active lifestyle.
          </p>

          <div className={`hero-stats-innovative ${contentVisible[4] ? 'is-visible' : ''}`} ref={contentRefs[4]}>
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

          <div className={`hero-actions-innovative ${contentVisible[5] ? 'is-visible' : ''}`} ref={contentRefs[5]}>
            <a 
              href="/shop"
              className="cta-primary-innovative"
              onClick={(e) => {
                e.preventDefault()
                navigate('/shop')
              }}
            >
              <span>Shop Now</span>
              <div className="cta-arrow">
                <HiArrowRight />
              </div>
            </a>
            <a 
              href="/#about"
              className="cta-secondary-innovative"
              onClick={(e) => {
                e.preventDefault()
                navigate('/#about')
              }}
            >
              Discover More
            </a>
          </div>
        </div>

        <div className={`hero-visual-innovative ${isVisible ? 'is-visible' : ''}`}>
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
