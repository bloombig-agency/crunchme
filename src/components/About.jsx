import { HiSparkles, HiLightningBolt, HiCheckCircle } from 'react-icons/hi'
import { GiChocolateBar } from 'react-icons/gi'
import './About.css'

function About() {
  return (
    <section className="manifesto-section" id="about">
      <div className="manifesto-container">
        <div className="manifesto-content">
          <div className="manifesto-visual">
            <div className="manifesto-card">
              <div className="card-number">01</div>
              <div className="card-message">
                <span className="message-line">Premium</span>
                <span className="message-line message-accent">Quality</span>
                <span className="message-line">Always</span>
              </div>
            </div>
          </div>

          <div className="manifesto-text">
            <div className="manifesto-label">Our Promise</div>
            <h2 className="manifesto-title">
              Built to <span className="title-emphasis">Munch</span>
            </h2>
            <h3 className="manifesto-subtitle">
              Built for <span className="subtitle-strike">Excellence</span>
            </h3>
            <p className="manifesto-description">
              CrunchMe isn't just a protein bar. It's a commitment to premium quality and legendary taste.
              We crafted these bars for those who refuse to compromise. With 22g of protein, zero preservatives,
              and all-natural ingredients, every bite delivers the fuel your body deserves. Whether you're powering
              through a workout or conquering your day, CrunchMe is built to munch.
            </p>

            <div className="manifesto-features">
              {['22g Protein', 'Zero Sugar', 'All Natural', 'Gluten Free'].map((feature) => (
                <div key={feature} className="feature-item">
                  <div className="feature-dot"></div>
                  <span className="feature-text">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="chocolate-showcase-section">
        <div className="chocolate-showcase-container">
          <div className="chocolate-content">
            <div className="chocolate-label">Premium Craft</div>
            <h2 className="chocolate-title">
              Rich <span className="chocolate-accent">Chocolate</span> Experience
            </h2>
            <p className="chocolate-description">
              Indulge in our premium chocolate protein bars, crafted with rich cocoa and natural ingredients. 
              Each bar delivers the perfect balance of decadent flavor and powerful nutrition. Experience the 
              sophisticated taste that satisfies your cravings while fueling your performance.
            </p>
            <div className="chocolate-features">
              <div className="chocolate-feature">
                <div className="feature-icon-chocolate">
                  <GiChocolateBar />
                </div>
                <div className="feature-content">
                  <h4>Rich Cocoa</h4>
                  <p>Premium Belgian-style chocolate</p>
                </div>
              </div>
              <div className="chocolate-feature">
                <div className="feature-icon-chocolate">
                  <HiLightningBolt />
                </div>
                <div className="feature-content">
                  <h4>22g Protein</h4>
                  <p>Powerful nutrition in every bar</p>
                </div>
              </div>
              <div className="chocolate-feature">
                <div className="feature-icon-chocolate">
                  <HiCheckCircle />
                </div>
                <div className="feature-content">
                  <h4>Zero Sugar</h4>
                  <p>No compromise on taste or health</p>
                </div>
              </div>
            </div>
            <a href="#products" className="chocolate-cta">
              Explore Chocolate Collection
            </a>
          </div>
          <div className="chocolate-visual">
            <div className="chocolate-bar-display">
              <div className="bar-segment segment-1"></div>
              <div className="bar-segment segment-2"></div>
              <div className="bar-segment segment-3"></div>
              <div className="bar-segment segment-4"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

