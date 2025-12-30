import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { HiCheckCircle, HiTruck, HiGift, HiShieldCheck } from 'react-icons/hi'
import { useViewportAnimation } from '../hooks/useViewportAnimation'
import './Checkout.css'

function Checkout() {
  const navigate = useNavigate()
  const { cartItems, getCartTotal, clearCart } = useCart()
  const [sectionRef, isSectionVisible] = useViewportAnimation({ threshold: 0.05, rootMargin: '0px 0px -100px 0px' })
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    shippingMethod: 'standard',
    orderNotes: '',
    giftWrap: false
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  
  const getEstimatedDelivery = () => {
    const today = new Date()
    const days = formData.shippingMethod === 'express' ? 2 : formData.shippingMethod === 'priority' ? 3 : 5
    today.setDate(today.getDate() + days)
    return today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }
  
  const getShippingCost = () => {
    if (getCartTotal() >= 50) return 0
    if (formData.shippingMethod === 'express') return 15
    if (formData.shippingMethod === 'priority') return 10
    return 5
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    let formattedValue = value
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const cleaned = value.replace(/\s+/g, '')
      formattedValue = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned
    }
    
    // Format expiry date as MM/YY
    if (name === 'expiryDate') {
      const cleaned = value.replace(/\D/g, '')
      if (cleaned.length >= 2) {
        formattedValue = cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4)
      } else {
        formattedValue = cleaned
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : formattedValue
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsProcessing(false)
    setOrderComplete(true)
    clearCart()
  }

  if (cartItems.length === 0 && !orderComplete) {
    return (
      <section className={`checkout-page section ${isSectionVisible ? 'is-visible' : ''}`} ref={sectionRef}>
        <div className="checkout-container">
          <div className="empty-checkout">
            <h2>Your cart is empty</h2>
            <button onClick={() => navigate('/shop')} className="shop-btn">
              Shop Now
            </button>
          </div>
        </div>
      </section>
    )
  }

  if (orderComplete) {
    return (
      <section className={`checkout-page section ${isSectionVisible ? 'is-visible' : ''}`} ref={sectionRef}>
        <div className="checkout-container">
          <div className="order-success">
            <HiCheckCircle className="success-icon" />
            <h1>Order Placed Successfully!</h1>
            <p>Thank you for your purchase. Your order confirmation has been sent to your email.</p>
            <div className="success-actions">
              <button onClick={() => navigate('/shop')} className="continue-btn">
                Continue Shopping
              </button>
              <button onClick={() => navigate('/')} className="home-btn">
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const subtotal = getCartTotal()
  const shipping = getShippingCost()
  const giftWrapCost = formData.giftWrap ? 5 : 0
  const total = subtotal + shipping + giftWrapCost

  return (
    <section className={`checkout-page section ${isSectionVisible ? 'is-visible' : ''}`} ref={sectionRef}>
      <div className="checkout-container">
        <h1 className="checkout-title">Checkout</h1>

        <div className="checkout-content">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h2 className="section-title">Contact Information</h2>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-section">
              <h2 className="section-title">Shipping Address</h2>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="zipCode">ZIP Code</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="country">Country</label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>
            </div>

            <div className="form-section">
              <h2 className="section-title">Shipping Method</h2>
              <div className="shipping-options">
                <label className="shipping-option">
                  <input
                    type="radio"
                    name="shippingMethod"
                    value="standard"
                    checked={formData.shippingMethod === 'standard'}
                    onChange={handleInputChange}
                  />
                  <div className="shipping-option-content">
                    <div className="shipping-name">
                      <HiTruck />
                      <span>Standard Shipping</span>
                    </div>
                    <div className="shipping-details">
                      <span>5-7 business days</span>
                      <span>{shipping === 0 ? 'Free' : '$5.00'}</span>
                    </div>
                  </div>
                </label>
                <label className="shipping-option">
                  <input
                    type="radio"
                    name="shippingMethod"
                    value="priority"
                    checked={formData.shippingMethod === 'priority'}
                    onChange={handleInputChange}
                  />
                  <div className="shipping-option-content">
                    <div className="shipping-name">
                      <HiTruck />
                      <span>Priority Shipping</span>
                    </div>
                    <div className="shipping-details">
                      <span>3-5 business days</span>
                      <span>{subtotal >= 50 ? '$5.00' : '$10.00'}</span>
                    </div>
                  </div>
                </label>
                <label className="shipping-option">
                  <input
                    type="radio"
                    name="shippingMethod"
                    value="express"
                    checked={formData.shippingMethod === 'express'}
                    onChange={handleInputChange}
                  />
                  <div className="shipping-option-content">
                    <div className="shipping-name">
                      <HiTruck />
                      <span>Express Shipping</span>
                    </div>
                    <div className="shipping-details">
                      <span>1-2 business days</span>
                      <span>{subtotal >= 50 ? '$10.00' : '$15.00'}</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div className="form-section">
              <h2 className="section-title">Additional Options</h2>
              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="giftWrap"
                    checked={formData.giftWrap}
                    onChange={(e) => setFormData(prev => ({ ...prev, giftWrap: e.target.checked }))}
                  />
                  <div>
                    <HiGift className="gift-icon" />
                    <span>Add gift wrapping (+$5.00)</span>
                  </div>
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="orderNotes">Order Notes (Optional)</label>
                <textarea
                  id="orderNotes"
                  name="orderNotes"
                  value={formData.orderNotes}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Special instructions for your order..."
                  className="order-notes-input"
                />
              </div>
            </div>

            <div className="form-section">
              <h2 className="section-title">Payment Information</h2>
              <div className="form-group">
                <label htmlFor="cardNumber">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="cardName">Name on Card</label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expiryDate">Expiry Date</label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    maxLength="5"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cvv">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    maxLength="4"
                    required
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : `Place Order - $${total.toFixed(2)}`}
            </button>
          </form>

          <div className="order-summary">
            <h2 className="summary-title">Order Summary</h2>
            
            <div className="order-items">
              {cartItems.map((item) => {
                const price = parseFloat(item.price.replace('$', '')) || 0
                return (
                  <div key={item.id} className="order-item">
                    <div className="order-item-info">
                      <span className="order-item-name">{item.name}</span>
                      <span className="order-item-quantity">x{item.quantity}</span>
                    </div>
                    <span className="order-item-price">${(price * item.quantity).toFixed(2)}</span>
                  </div>
                )
              })}
            </div>

            <div className="order-totals">
              <div className="total-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              {giftWrapCost > 0 && (
                <div className="total-row">
                  <span>Gift Wrapping</span>
                  <span>${giftWrapCost.toFixed(2)}</span>
                </div>
              )}
              <div className="total-row final">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Estimated Delivery */}
            <div className="checkout-delivery-info">
              <HiTruck className="delivery-icon" />
              <div>
                <strong>Estimated Delivery</strong>
                <span>{getEstimatedDelivery()}</span>
              </div>
            </div>

            {/* Security Badges */}
            <div className="checkout-security">
              <div className="security-item">
                <HiShieldCheck className="security-icon" />
                <span>SSL Encrypted</span>
              </div>
              <div className="security-item">
                <HiShieldCheck className="security-icon" />
                <span>Secure Payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Checkout

