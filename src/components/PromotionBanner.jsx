import { useMemo } from 'react'
import { HiGift, HiSparkles, HiTag, HiFire, HiStar, HiTruck, HiHeart } from 'react-icons/hi'
import { useAutoRotate } from '../hooks/useAutoRotate'
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
  const { currentIndex, setCurrentIndex, isPaused, setIsPaused } = useAutoRotate(
    PROMOTIONS.length,
    ANIMATION_DELAYS.PROMO_ROTATION,
    true
  )

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
    <section className="promotion-showcase-section">
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
            <a href="#products" className="promotion-cta">
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


