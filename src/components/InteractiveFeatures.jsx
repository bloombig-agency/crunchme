import { HiSparkles, HiFire, HiShoppingCart } from 'react-icons/hi'
import { GiChocolateBar } from 'react-icons/gi'
import { useViewportAnimation, useStaggeredAnimation } from '../hooks/useViewportAnimation'
import './InteractiveFeatures.css'

function InteractiveFeatures() {
  const [sectionRef, isSectionVisible] = useViewportAnimation({ threshold: 0.05, rootMargin: '0px 0px -100px 0px' })
  const [cardRefs, cardVisible] = useStaggeredAnimation(3, { threshold: 0.05, rootMargin: '0px 0px -100px 0px' })

  return (
    <section className={`interactive-features-section ${isSectionVisible ? 'is-visible' : ''}`} ref={sectionRef}>
      <div className="interactive-features-container">
        <div className="features-grid">
          <div className={`feature-card feature-card-chocolate ${cardVisible[0] ? 'is-visible' : ''}`} ref={cardRefs[0]}>
            <div className="feature-icon">
              <GiChocolateBar />
            </div>
            <h3 className="feature-title">Rich Chocolate</h3>
            <p className="feature-description">
              Premium Belgian-style chocolate crafted with rich cocoa. Indulgent flavor meets powerful nutrition in every bar.
            </p>
          </div>

          <div className={`feature-card ${cardVisible[1] ? 'is-visible' : ''}`} ref={cardRefs[1]}>
            <div className="feature-icon">
              <HiSparkles />
            </div>
            <h3 className="feature-title">Premium Quality</h3>
            <p className="feature-description">
              22g of protein per bar. Zero preservatives. All natural ingredients crafted for the discerning palate.
            </p>
          </div>

          <div className={`feature-card ${cardVisible[2] ? 'is-visible' : ''}`} ref={cardRefs[2]}>
            <div className="feature-icon">
              <HiFire />
            </div>
            <h3 className="feature-title">Built to Munch</h3>
            <p className="feature-description">
              Every bar is designed for maximum satisfaction. Premium taste meets legendary texture in every bite.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InteractiveFeatures


