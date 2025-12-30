import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { PRODUCTS } from '../data/constants'
import { HiMinus, HiPlus, HiTrash, HiShoppingCart, HiTag, HiTruck, HiShieldCheck } from 'react-icons/hi'
import { useViewportAnimation, useStaggeredAnimation } from '../hooks/useViewportAnimation'
import './Cart.css'

function Cart() {
  const navigate = useNavigate()
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart()
  const [sectionRef, isSectionVisible] = useViewportAnimation({ threshold: 0.05, rootMargin: '0px 0px -100px 0px' })
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  
  const recommendedProducts = PRODUCTS.filter(p => !cartItems.some(item => item.id === p.id)).slice(0, 3)
  const [recommendedRefs, recommendedVisible] = useStaggeredAnimation(recommendedProducts.length, { threshold: 0.05, rootMargin: '0px 0px -100px 0px' })
  
  const subtotal = getCartTotal()
  const shipping = subtotal >= 50 ? 0 : 5
  const discount = promoApplied ? subtotal * 0.1 : 0
  const total = subtotal + shipping - discount
  
  const handlePromoCode = (e) => {
    e.preventDefault()
    if (promoCode.toLowerCase() === 'save10' || promoCode.toLowerCase() === 'welcome') {
      setPromoApplied(true)
    }
  }
  
  const getEstimatedDelivery = () => {
    const today = new Date()
    today.setDate(today.getDate() + 5)
    return today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  if (cartItems.length === 0) {
    return (
      <section className={`cart-page section ${isSectionVisible ? 'is-visible' : ''}`} ref={sectionRef}>
        <div className="cart-container">
          <h1 className="cart-title">Shopping Cart</h1>
          <div className="empty-cart">
            <HiShoppingCart className="empty-cart-icon" />
            <h2>Your cart is empty</h2>
            <p>Add some products to get started!</p>
            <button onClick={() => navigate('/shop')} className="shop-btn">
              Shop Now
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={`cart-page section ${isSectionVisible ? 'is-visible' : ''}`} ref={sectionRef}>
      <div className="cart-container">
        <div className="cart-header">
          <h1 className="cart-title">Shopping Cart</h1>
          <button onClick={clearCart} className="clear-cart-btn">
            Clear Cart
          </button>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => {
              const price = parseFloat(item.price.replace('$', '')) || 0
              const itemTotal = price * item.quantity

              return (
                <div key={item.id} className="cart-item">
                  <div 
                    className="item-image-wrapper"
                    onClick={() => navigate(`/product/${item.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img
                      src={item.image || '/images/products/peanut-rampage.png'}
                      alt={item.name}
                      className="item-image"
                      onError={(e) => {
                        e.target.src = '/images/products/peanut-rampage.png'
                      }}
                    />
                  </div>

                  <div 
                    className="item-details"
                    onClick={() => navigate(`/product/${item.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-description">{item.description}</p>
                    <div className="item-specs">
                      <span>{item.protein} Protein</span>
                      <span>{item.weight}</span>
                    </div>
                  </div>

                  <div className="item-quantity">
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      <HiMinus />
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <HiPlus />
                    </button>
                  </div>

                  <div className="item-price-section">
                    <div className="item-price">${itemTotal.toFixed(2)}</div>
                    <div className="item-unit-price">${price.toFixed(2)} each</div>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                  >
                    <HiTrash />
                  </button>
                </div>
              )
            })}
          </div>

          <div className="cart-summary">
            <div className="summary-card">
              <h2 className="summary-title">Order Summary</h2>
              
              {/* Promo Code */}
              <div className="promo-section">
                <form onSubmit={handlePromoCode} className="promo-form">
                  <input
                    type="text"
                    placeholder="Promo code"
                    className="promo-input"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <button type="submit" className="promo-btn">
                    <HiTag />
                  </button>
                </form>
                {promoApplied && (
                  <div className="promo-success">
                    ✓ 10% discount applied!
                  </div>
                )}
              </div>
              
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              {discount > 0 && (
                <div className="summary-row discount">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : '$5.00'}</span>
              </div>
              
              <div className="summary-row total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              {/* Estimated Delivery */}
              <div className="delivery-info">
                <HiTruck className="delivery-icon" />
                <div>
                  <strong>Estimated Delivery</strong>
                  <span>{getEstimatedDelivery()}</span>
                </div>
              </div>

              <button 
                className="checkout-btn"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </button>

              <button 
                className="continue-shopping-btn"
                onClick={() => navigate('/shop')}
              >
                Continue Shopping
              </button>

              {/* Security Badge */}
              <div className="security-badge">
                <HiShieldCheck className="security-icon" />
                <span>Secure checkout • SSL encrypted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        {recommendedProducts.length > 0 && (
          <div className="cart-recommendations">
            <h2 className="recommendations-title">You Might Also Like</h2>
            <div className="recommendations-grid">
              {recommendedProducts.map((product, index) => (
                <div
                  key={product.id}
                  className={`recommendation-card ${recommendedVisible[index] ? 'is-visible' : ''}`}
                  ref={recommendedRefs[index]}
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <div className="recommendation-image-wrapper">
                    <img
                      src={product.image || '/images/products/peanut-rampage.png'}
                      alt={product.name}
                      className="recommendation-image"
                      onError={(e) => {
                        e.target.src = '/images/products/peanut-rampage.png'
                      }}
                    />
                  </div>
                  <h3 className="recommendation-name">{product.name}</h3>
                  <div className="recommendation-price">{product.price}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Cart

