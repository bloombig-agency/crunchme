import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiGift, HiSparkles, HiTag, HiFire, HiStar, HiTruck, HiHeart } from 'react-icons/hi'
import { useAutoRotate } from '../hooks/useAutoRotate'
import { useViewportAnimation } from '../hooks/useViewportAnimation'
import { PROMOTIONS, ANIMATION_DELAYS } from '../data/constants'
import './PromotionBanner.css'

const iconMap = {
  fire: HiFire,
  gift: HiGift,
  tag: HiTag,
  star: HiStar,
  truck: HiTruck,
  heart: HiHeart
}

function PromotionBanner() {
  const navigate = useNavigate()
  const { currentIndex, setCurrentIndex, isPaused, setIsPaused } = useAutoRotate(
    PROMOTIONS.length,
    ANIMATION_DELAYS.PROMO_ROTATION,
    true
  )
  const [sectionRef, isSectionVisible] = useViewportAnimation({ threshold: 0.05, rootMargin: '0px 0px -100px 0px' })

  const promotionsWithIcons = useMemo(() => 
    PROMOTIONS.map(promo => {
      const IconComponent = iconMap[promo.icon]
      return {
        ...promo,
        icon: IconComponent ? <IconComponent /> : null
      }
    }),
    []
  )

  const promo = promotionsWithIcons[currentIndex]

  if (!promo) {
    return null
  }

  return (
    <section className={`promotion-showcase-section ${isSectionVisible ? 'is-visible' : ''}`} ref={sectionRef}>
      <div className="promotion-showcase-container">
        <div 
          className="promotion-showcase-card"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="promotion-visual">
            {promo.image ? (
              <div className="promotion-image-frame">
                <img 
                  src={promo.image} 
                  alt={promo.title}
                  className="promotion-showcase-image"
                  onError={(e) => {
                    e.target.src = '/images/products/peanut-rampage.png'
                    e.target.onerror = null
                  }}
                />
              </div>
            ) : (
              <div className="promotion-placeholder-frame">
                <span className="placeholder-text">{promo.title}</span>
              </div>
            )}
          </div>
          
          <div className="promotion-info">
            <div className="promotion-category">{promo.subtitle}</div>
            <h3 className="promotion-heading">{promo.title}</h3>
            <p className="promotion-text">{promo.description}</p>
            <div className="promotion-highlight">{promo.highlight}</div>
            <a 
              href="/shop"
              className="promotion-cta"
              onClick={(e) => {
                e.preventDefault()
                navigate('/shop')
              }}
            >
              {promo.cta}
            </a>
          </div>
        </div>
        
        <div className="promotion-nav">
          {promotionsWithIcons.map((promo, index) => (
            <button
              key={promo.id}
              className={`nav-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to promotion ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default PromotionBanner


