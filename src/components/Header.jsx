import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HiShoppingCart, HiMenu, HiX } from 'react-icons/hi'
import { useCart } from '../contexts/CartContext'
import './Header.css'

function Header() {
  const navigate = useNavigate()
  const { getCartItemCount, setIsCartOpen } = useCart()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const cartCount = getCartItemCount()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      <div className="is-relative" data-enable_overlay="true" data-enable_sticky="true">
        <header 
          id="header" 
          className={`header header--centered dropdown-style-vertical box-shadow-true ${isScrolled ? 'is-sticky' : ''}`}
        >
          <div className="header__inner-content">
            <section className="section is-width-wide">
              <nav className="navbar dropdown-click--false is-align-center header-layout--above" role="navigation" aria-label="main navigation">
                <div className={`header__link header__menu-toggle is-medium ${isMobileMenuOpen ? 'menu-open' : ''}`}>
                  <div className="header__open-menu" onClick={toggleMobileMenu}>
                    <span className="icon" data-icon="menu">
                      <HiMenu />
                    </span>
                  </div>
                  <div className="header__close-menu" onClick={toggleMobileMenu}>
                    <span className="icon" data-icon="x">
                      <HiX />
                    </span>
                  </div>
                </div>

                <div className="header__menu header__menu--left">
                  <div className={`header__menu-items header__dropdown--below-parent is-flex is-flex-wrap is-justify-flex-end ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                    <div className="navbar-item header__item">
                      <Link 
                        to="/shop"
                        className="navbar-link header__link is-arrowless"
                      >
                        SHOP
                      </Link>
                      <span className="headerlink_spacer">SHOP</span>
                    </div>

                    <div className="navbar-item header__item">
                      <Link to="/#about" className="navbar-link header__link is-arrowless">
                        ABOUT
                      </Link>
                      <span className="headerlink_spacer">ABOUT</span>
                    </div>

                    <div className="navbar-item header__item">
                      <Link to="/#contact" className="navbar-link header__link is-arrowless">
                        CONTACT
                      </Link>
                      <span className="headerlink_spacer">CONTACT</span>
                    </div>
                  </div>
                </div>

                <div className="header__brand is-align-center is-justify-space-between is-flex text-align-center">
                  <h1 className="visually-hidden">CRUNCHME</h1>
                  <Link to="/" className="header__logo header__link primary-logo" title="CRUNCHME">
                    <img 
                      src="/images/logo.png" 
                      alt="CRUNCHME Logo" 
                      className="logo-image"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.nextElementSibling.style.display = 'inline-block'
                      }}
                    />
                    <span className="logo-text" style={{ display: 'none' }}>CRUNCHME</span>
                  </Link>
                </div>

                <div className="header__icons header__icon-style- header__icons--sticky">
                  <div className="header__link">
                    <button 
                      className="header__link action-area__link cart-icon" 
                      tabIndex={0}
                      onClick={() => {
                        navigate('/cart')
                        setIsCartOpen(true)
                      }}
                      aria-label={`Shopping cart${cartCount > 0 ? ` (${cartCount} items)` : ''}`}
                    >
                      <span className="icon header__icon" data-icon="cart">
                        <HiShoppingCart />
                      </span>
                      {cartCount > 0 && (
                        <span className="cart-badge">{cartCount > 99 ? '99+' : cartCount}</span>
                      )}
                    </button>
                  </div>
                </div>
              </nav>
            </section>
          </div>
        </header>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </>
  )
}

export default Header
