import { HiSparkles, HiFire, HiShoppingCart } from 'react-icons/hi'
import { GiChocolateBar } from 'react-icons/gi'
import './InteractiveFeatures.css'

function InteractiveFeatures() {
  return (
    <section className="interactive-features-section">
      <div className="interactive-features-container">
        <div className="features-grid">
          <div className="feature-card feature-card-chocolate">
            <div className="feature-icon">
              <GiChocolateBar />
            </div>
            <h3 className="feature-title">Rich Chocolate</h3>
            <p className="feature-description">
              Premium Belgian-style chocolate crafted with rich cocoa. Indulgent flavor meets powerful nutrition in every bar.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <HiSparkles />
            </div>
            <h3 className="feature-title">Premium Quality</h3>
            <p className="feature-description">
              22g of protein per bar. Zero preservatives. All natural ingredients crafted for the discerning palate.
            </p>
          </div>

          <div className="feature-card">
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


