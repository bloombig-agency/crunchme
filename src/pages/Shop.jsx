import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiSearch, HiTruck, HiShieldCheck, HiStar } from 'react-icons/hi'
import { PRODUCTS } from '../data/constants'
import { useViewportAnimation, useStaggeredAnimation } from '../hooks/useViewportAnimation'
import './Shop.css'

function Shop() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('default')
  const [sectionRef, isSectionVisible] = useViewportAnimation({ threshold: 0.05, rootMargin: '0px 0px -100px 0px' })
  
  // Always use constant length for hooks - use PRODUCTS.length
  const [allProductRefs, allProductVisible] = useStaggeredAnimation(PRODUCTS.length, { threshold: 0.05, rootMargin: '0px 0px -100px 0px' })
  
  const filteredProducts = useMemo(() => {
    let products = PRODUCTS
    
    // Apply filter
    if (filter !== 'all') {
      products = products.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
    }
    
    // Apply search
    if (searchQuery) {
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    // Apply sort
    if (sortBy === 'price-low') {
      products = [...products].sort((a, b) => {
        const priceA = parseFloat(a.price.replace('$', ''))
        const priceB = parseFloat(b.price.replace('$', ''))
        return priceA - priceB
      })
    } else if (sortBy === 'price-high') {
      products = [...products].sort((a, b) => {
        const priceA = parseFloat(a.price.replace('$', ''))
        const priceB = parseFloat(b.price.replace('$', ''))
        return priceB - priceA
      })
    } else if (sortBy === 'name') {
      products = [...products].sort((a, b) => a.name.localeCompare(b.name))
    }
    
    return products
  }, [filter, searchQuery, sortBy])

  return (
    <section className={`shop-page section ${isSectionVisible ? 'is-visible' : ''}`} ref={sectionRef}>
      <div className="shop-container">
        <div className="shop-header">
          <h1 className="shop-title">Shop All Products</h1>
          <p className="shop-subtitle">Premium protein bars built to munch</p>
        </div>

        {/* Shipping Info Banner */}
        <div className="shop-info-banner">
          <div className="info-item">
            <HiTruck className="info-icon" />
            <div>
              <strong>Free Shipping</strong>
              <span>On orders over $50</span>
            </div>
          </div>
          <div className="info-item">
            <HiShieldCheck className="info-icon" />
            <div>
              <strong>Secure Checkout</strong>
              <span>100% safe & secure</span>
            </div>
          </div>
          <div className="info-item">
            <HiStar className="info-icon" />
            <div>
              <strong>Premium Quality</strong>
              <span>22g protein guaranteed</span>
            </div>
          </div>
        </div>

        {/* Search and Sort */}
        <div className="shop-controls">
          <div className="search-wrapper">
            <HiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search products..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="sort-wrapper">
            <label htmlFor="sort">Sort by:</label>
            <select
              id="sort"
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="name">Name (A-Z)</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="results-count">
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          {searchQuery && ` for "${searchQuery}"`}
        </div>

        <div className="shop-filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Products
          </button>
          <button 
            className={`filter-btn ${filter === 'peanut' ? 'active' : ''}`}
            onClick={() => setFilter('peanut')}
          >
            Peanut
          </button>
          <button 
            className={`filter-btn ${filter === 'berry' ? 'active' : ''}`}
            onClick={() => setFilter('berry')}
          >
            Berry
          </button>
          <button 
            className={`filter-btn ${filter === 'choco' ? 'active' : ''}`}
            onClick={() => setFilter('choco')}
          >
            Chocolate
          </button>
        </div>

        <div className="shop-grid">
          {filteredProducts.map((product) => {
            // Find the index of this product in the original PRODUCTS array
            const originalIndex = PRODUCTS.findIndex(p => p.id === product.id)
            return (
            <div
              key={product.id}
              className={`shop-product-card ${allProductVisible[originalIndex] ? 'is-visible' : ''}`}
              ref={allProductRefs[originalIndex]}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="product-image-wrapper">
                {product.badge && (
                  <div className="product-badge">{product.badge}</div>
                )}
                <img
                  src={product.image || '/images/products/peanut-rampage.png'}
                  alt={product.name}
                  className="product-image"
                  onError={(e) => {
                    e.target.src = '/images/products/peanut-rampage.png'
                  }}
                />
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-specs">
                  <span className="spec">{product.protein} Protein</span>
                  <span className="spec">{product.weight}</span>
                </div>
                <div className="product-footer">
                  <span className="product-price">{product.price}</span>
                  <button 
                    className="view-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate(`/product/${product.id}`)
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Shop

