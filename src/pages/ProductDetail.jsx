import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PRODUCTS, REVIEWS, NUTRITION_FACTS } from '../data/constants'
import { useCart } from '../contexts/CartContext'
import { HiCheckCircle, HiMinus, HiPlus, HiStar, HiTruck, HiShieldCheck, HiRefresh, HiShare, HiHeart, HiClock, HiFire, HiLightningBolt, HiCube } from 'react-icons/hi'
import { useViewportAnimation, useStaggeredAnimation } from '../hooks/useViewportAnimation'
import './ProductDetail.css'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('details')
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [sectionRef, isSectionVisible] = useViewportAnimation({ threshold: 0.05, rootMargin: '0px 0px -100px 0px' })

  const product = PRODUCTS.find(p => p.id === parseInt(id))
  const productReviews = REVIEWS.filter(r => r.productId === parseInt(id))
  const relatedProducts = PRODUCTS.filter(p => p.id !== parseInt(id)).slice(0, 3)
  const nutrition = NUTRITION_FACTS[parseInt(id)]
  const [relatedRefs, relatedVisible] = useStaggeredAnimation(relatedProducts.length, { threshold: 0.05, rootMargin: '0px 0px -100px 0px' })
  
  // Mock product images array - defined after product
  const productImages = product ? [
    product.image || '/images/products/peanut-rampage.png',
    product.image || '/images/products/peanut-rampage.png',
    product.image || '/images/products/peanut-rampage.png'
  ] : ['/images/products/peanut-rampage.png']
  
  const averageRating = productReviews.length > 0
    ? productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length
    : 5

  if (!product) {
    return (
      <section className="product-detail-page section">
        <div className="product-not-found">
          <h2>Product Not Found</h2>
          <button onClick={() => navigate('/shop')} className="back-btn">
            Back to Shop
          </button>
        </div>
      </section>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1)
  }

  const decreaseQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1))
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      }).catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  return (
    <section className={`product-detail-page section ${isSectionVisible ? 'is-visible' : ''}`} ref={sectionRef}>
      <div className="product-detail-container">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>

        <div className="product-detail-content">
          <div className="product-image-section">
            <div className="product-image-wrapper">
              {product.badge && (
                <div className="product-badge">{product.badge}</div>
              )}
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="product-main-image"
                onError={(e) => {
                  e.target.src = '/images/products/peanut-rampage.png'
                }}
              />
              <div className="image-actions">
                <button 
                  className="image-action-btn wishlist-btn"
                  onClick={toggleWishlist}
                  aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <HiHeart className={isWishlisted ? 'filled' : ''} />
                </button>
                <button 
                  className="image-action-btn share-btn"
                  onClick={handleShare}
                  aria-label="Share product"
                >
                  <HiShare />
                </button>
              </div>
            </div>
            <div className="product-thumbnails">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  className={`thumbnail-btn ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${index + 1}`}
                    onError={(e) => {
                      e.target.src = '/images/products/peanut-rampage.png'
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="product-info-section">
            <div className="product-header-info">
              <div className="product-category">{product.category}</div>
              <div className="product-rating-summary">
                <div className="rating-stars-small">
                  {[1, 2, 3, 4, 5].map(star => (
                    <HiStar 
                      key={star} 
                      className={star <= Math.round(averageRating) ? 'filled' : ''}
                    />
                  ))}
                </div>
                <span className="rating-text">({productReviews.length} reviews)</span>
              </div>
            </div>
            <h1 className="product-title">{product.name}</h1>
            <p className="product-description">{product.description}</p>

            <div className="product-price-section">
              <span className="product-price">{product.price}</span>
              <span className="product-weight">{product.weight}</span>
            </div>

            {/* Stock Status */}
            <div className="stock-status">
              <HiCube className="stock-icon" />
              <span className="stock-text">In Stock - Ready to Ship</span>
            </div>

            {/* Quick Highlights */}
            <div className="quick-highlights">
              <div className="highlight-item">
                <HiLightningBolt className="highlight-icon" />
                <span>22g Protein</span>
              </div>
              <div className="highlight-item">
                <HiFire className="highlight-icon" />
                <span>250 Calories</span>
              </div>
              <div className="highlight-item">
                <HiClock className="highlight-icon" />
                <span>No Prep Needed</span>
              </div>
            </div>

            {/* Enhanced Key Features Section */}
            <div className="key-features-section">
              <h3 className="key-features-title">KEY FEATURES</h3>
              <div className="key-features-grid">
                <div className="key-feature-card">
                  <div className="key-feature-icon">
                    <HiLightningBolt />
                  </div>
                  <div className="key-feature-content">
                    <h4>HIGH PROTEIN</h4>
                    <p>22g of premium protein per bar for optimal muscle recovery</p>
                  </div>
                </div>
                <div className="key-feature-card">
                  <div className="key-feature-icon">
                    <HiCheckCircle />
                  </div>
                  <div className="key-feature-content">
                    <h4>100% NATURAL</h4>
                    <p>No preservatives, artificial flavors, or synthetic ingredients</p>
                  </div>
                </div>
                <div className="key-feature-card">
                  <div className="key-feature-icon">
                    <HiFire />
                  </div>
                  <div className="key-feature-content">
                    <h4>ENERGY BOOST</h4>
                    <p>Sustained energy release to keep you going all day</p>
                  </div>
                </div>
                <div className="key-feature-card">
                  <div className="key-feature-icon">
                    <HiShieldCheck />
                  </div>
                  <div className="key-feature-content">
                    <h4>GLUTEN FREE</h4>
                    <p>Suitable for gluten-sensitive individuals and celiac diets</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="product-nutrition">
              <div className="nutrition-item">
                <span className="nutrition-label">Protein</span>
                <span className="nutrition-value">{product.protein}</span>
              </div>
              <div className="nutrition-item">
                <span className="nutrition-label">Weight</span>
                <span className="nutrition-value">{product.weight}</span>
              </div>
            </div>

            <div className="product-quantity">
              <label className="quantity-label">Quantity</label>
              <div className="quantity-controls">
                <button 
                  className="quantity-btn"
                  onClick={decreaseQuantity}
                  aria-label="Decrease quantity"
                >
                  <HiMinus />
                </button>
                <span className="quantity-value">{quantity}</span>
                <button 
                  className="quantity-btn"
                  onClick={increaseQuantity}
                  aria-label="Increase quantity"
                >
                  <HiPlus />
                </button>
              </div>
            </div>

            <div className="product-actions">
              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button className="buy-now-btn" onClick={() => {
                addToCart(product, quantity)
                navigate('/cart')
              }}>
                Buy Now
              </button>
            </div>

            {/* Trust Badges */}
            <div className="trust-badges">
              <div className="trust-item">
                <HiTruck className="trust-icon" />
                <div>
                  <strong>Free Shipping</strong>
                  <span>On orders over $50</span>
                </div>
              </div>
              <div className="trust-item">
                <HiShieldCheck className="trust-icon" />
                <div>
                  <strong>Secure Payment</strong>
                  <span>100% protected</span>
                </div>
              </div>
              <div className="trust-item">
                <HiRefresh className="trust-icon" />
                <div>
                  <strong>Easy Returns</strong>
                  <span>30-day guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="product-tabs">
          <div className="tab-buttons">
            <button 
              className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
              onClick={() => setActiveTab('details')}
            >
              Details
            </button>
            <button 
              className={`tab-btn ${activeTab === 'nutrition' ? 'active' : ''}`}
              onClick={() => setActiveTab('nutrition')}
            >
              Nutrition Facts
            </button>
            <button 
              className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({productReviews.length})
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'details' && (
              <div className="details-content">
                <h3>Product Description</h3>
                <p>{product.description}</p>
                <p>Experience the perfect blend of taste and nutrition with our premium protein bars. Each bar is carefully crafted to deliver maximum protein content while maintaining exceptional flavor. Whether you're hitting the gym, heading to work, or need a quick energy boost, our protein bars are your perfect companion.</p>
                
                <h3>Key Benefits</h3>
                <ul className="benefits-list">
                  <li>22g of premium protein per bar for muscle recovery and growth</li>
                  <li>Zero preservatives and artificial ingredients - 100% natural</li>
                  <li>Perfect for post-workout recovery and daily nutrition</li>
                  <li>Keeps you satisfied and energized throughout the day</li>
                  <li>Made with all-natural, high-quality ingredients</li>
                  <li>Gluten-free and suitable for various dietary needs</li>
                  <li>Convenient on-the-go nutrition solution</li>
                </ul>

                <h3>Ingredients</h3>
                <p className="ingredients-text">
                  {nutrition?.ingredients.join(', ') || 'All natural ingredients'}
                </p>

                <h3>Usage Instructions</h3>
                <div className="usage-instructions">
                  <p><strong>When to Enjoy:</strong></p>
                  <ul className="benefits-list">
                    <li>Post-workout for optimal muscle recovery</li>
                    <li>As a mid-day snack to maintain energy levels</li>
                    <li>Before workouts for sustained energy</li>
                    <li>As a meal replacement when on-the-go</li>
                  </ul>
                  <p><strong>Storage:</strong> Store in a cool, dry place. Best consumed within 6 months of purchase.</p>
                </div>

                <h3>Allergen Information</h3>
                <div className="allergen-info">
                  <p>Contains: Nuts (Peanuts, Almonds)</p>
                  <p>May contain traces of: Soy, Milk</p>
                  <p>Free from: Gluten, Artificial Colors, Artificial Flavors</p>
                </div>

                <h3>Product Specifications</h3>
                <div className="specifications-grid">
                  <div className="spec-item">
                    <span className="spec-label">Net Weight</span>
                    <span className="spec-value">{product.weight}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Protein Content</span>
                    <span className="spec-value">{product.protein}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Shelf Life</span>
                    <span className="spec-value">6 Months</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Country of Origin</span>
                    <span className="spec-value">USA</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'nutrition' && nutrition && (
              <div className="nutrition-content">
                <div className="nutrition-facts-table">
                  <div className="nutrition-header">
                    <h3>Nutrition Facts</h3>
                    <span className="serving-size">Serving Size: {nutrition.servingSize}</span>
                  </div>
                  <div className="nutrition-row">
                    <span>Calories</span>
                    <span>{nutrition.calories}</span>
                  </div>
                  <div className="nutrition-row">
                    <span>Total Fat</span>
                    <span>{nutrition.totalFat}</span>
                  </div>
                  <div className="nutrition-row sub">
                    <span>Saturated Fat</span>
                    <span>{nutrition.saturatedFat}</span>
                  </div>
                  <div className="nutrition-row">
                    <span>Trans Fat</span>
                    <span>{nutrition.transFat}</span>
                  </div>
                  <div className="nutrition-row">
                    <span>Cholesterol</span>
                    <span>{nutrition.cholesterol}</span>
                  </div>
                  <div className="nutrition-row">
                    <span>Sodium</span>
                    <span>{nutrition.sodium}</span>
                  </div>
                  <div className="nutrition-row">
                    <span>Total Carbohydrate</span>
                    <span>{nutrition.totalCarbs}</span>
                  </div>
                  <div className="nutrition-row sub">
                    <span>Dietary Fiber</span>
                    <span>{nutrition.dietaryFiber}</span>
                  </div>
                  <div className="nutrition-row sub">
                    <span>Sugars</span>
                    <span>{nutrition.sugars}</span>
                  </div>
                  <div className="nutrition-row highlight">
                    <span>Protein</span>
                    <span>{nutrition.protein}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="reviews-content">
                <div className="reviews-summary">
                  <div className="rating-display">
                    <div className="rating-value">{averageRating.toFixed(1)}</div>
                    <div className="rating-stars">
                      {[1, 2, 3, 4, 5].map(star => (
                        <HiStar 
                          key={star} 
                          className={star <= Math.round(averageRating) ? 'filled' : ''}
                        />
                      ))}
                    </div>
                    <div className="rating-count">Based on {productReviews.length} reviews</div>
                  </div>
                  <button className="write-review-btn">
                    Write a Review
                  </button>
                </div>
                <div className="reviews-list">
                  {productReviews.length > 0 ? (
                    productReviews.map(review => (
                      <div key={review.id} className="review-item">
                        <div className="review-header">
                          <div className="reviewer-info">
                            <strong>{review.name}</strong>
                            {review.verified && <span className="verified-badge">Verified Purchase</span>}
                          </div>
                          <div className="review-rating">
                            {[1, 2, 3, 4, 5].map(star => (
                              <HiStar 
                                key={star} 
                                className={star <= review.rating ? 'filled' : ''}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="review-date">{new Date(review.date).toLocaleDateString()}</div>
                        <p className="review-comment">{review.comment}</p>
                      </div>
                    ))
                  ) : (
                    <div className="no-reviews">
                      <p>No reviews yet. Be the first to review this product!</p>
                      <button className="write-review-btn">Write the First Review</button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="related-products-section">
            <h2 className="related-title">You May Also Like</h2>
            <div className="related-products-grid">
              {relatedProducts.map((relatedProduct, index) => (
                <div
                  key={relatedProduct.id}
                  className={`related-product-card ${relatedVisible[index] ? 'is-visible' : ''}`}
                  ref={relatedRefs[index]}
                  onClick={() => navigate(`/product/${relatedProduct.id}`)}
                >
                  <div className="related-image-wrapper">
                    <img
                      src={relatedProduct.image || '/images/products/peanut-rampage.png'}
                      alt={relatedProduct.name}
                      className="related-image"
                      onError={(e) => {
                        e.target.src = '/images/products/peanut-rampage.png'
                      }}
                    />
                  </div>
                  <h3 className="related-name">{relatedProduct.name}</h3>
                  <div className="related-price">{relatedProduct.price}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductDetail

