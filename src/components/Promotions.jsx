import { useState, useEffect } from 'react'
import { HiX, HiSparkles, HiGift } from 'react-icons/hi'
import './Promotions.css'

function Promotions() {
  const [isVisible, setIsVisible] = useState(true)
  const [currentPromo, setCurrentPromo] = useState(0)

  const promotions = [
    {
      id: 1,
      icon: <HiSparkles />,
      text: 'Free Shipping on Orders Over $50',
      highlight: 'FREE SHIPPING'
    },
    {
      id: 2,
      icon: <HiGift />,
      text: 'New Customer? Get 15% Off Your First Order',
      highlight: '15% OFF'
    },
    {
      id: 3,
      icon: <HiSparkles />,
      text: 'Limited Time: Buy 2 Get 1 Free',
      highlight: 'BUY 2 GET 1'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promotions.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  if (!isVisible) return null

  const promo = promotions[currentPromo]

  return (
    <div className="promotions-banner">
      <div className="promo-content">
        <span className="promo-icon">{promo.icon}</span>
        <span className="promo-text">
          <strong className="promo-highlight">{promo.highlight}</strong>
          {' '}
          {promo.text.replace(promo.highlight, '')}
        </span>
      </div>
      <div className="promo-indicators">
        {promotions.map((_, index) => (
          <button
            key={index}
            className={`promo-dot ${index === currentPromo ? 'active' : ''}`}
            onClick={() => setCurrentPromo(index)}
            aria-label={`Go to promotion ${index + 1}`}
          />
        ))}
      </div>
      <button
        className="promo-close"
        onClick={() => setIsVisible(false)}
        aria-label="Close promotions"
      >
        <HiX />
      </button>
    </div>
  )
}

export default Promotions


