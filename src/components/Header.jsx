import { useState, useEffect } from 'react'
import { HiShoppingCart, HiMenu, HiX, HiSearch } from 'react-icons/hi'
import './Header.css'

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false)

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
                    <div 
                      className="navbar-item header__item has-dropdown has-dropdown--vertical is-hoverable has-mega-menu"
                      onMouseEnter={() => setIsShopMenuOpen(true)}
                      onMouseLeave={() => setIsShopMenuOpen(false)}
                    >
                      <a 
                        className="navbar-link header__link is-arrowless" 
                        aria-haspopup="true" 
                        aria-expanded={isShopMenuOpen}
                        href="#products"
                      >
                        SHOP
                      </a>
                      <span className="headerlink_spacer">SHOP</span>

                      {isShopMenuOpen && (
                        <div className="navbar-dropdown navbar-dropdown--below-parent is-vertical has-large-vertical-spacing">
                          <div className="mega-menu mega-menu--header-centered">
                            <div className="container has-no-side-gutter">
                              <div className="column mega-menu__block block__menu one-fourth medium-down--one-half">
                                <div className="mega-menu__content">
                                  <div className="mega-menu__linklist">
                                    <p className="menu__heading">
                                      <a href="#products">SHOP CRUNCHME</a>
                                    </p>
                                    <ul>
                                      <li><a href="#products" className="mega-menu__linklist-link">PROTEIN BARS</a></li>
                                      <li><a href="#products" className="mega-menu__linklist-link">BUNDLES</a></li>
                                      <li><a href="#products" className="mega-menu__linklist-link">ALL PRODUCTS</a></li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <div className="column mega-menu__block block__menu one-fourth medium-down--one-half">
                                <div className="mega-menu__content">
                                  <div className="mega-menu__linklist">
                                    <p className="menu__heading">FEATURED FLAVORS</p>
                                    <ul>
                                      <li><a href="#products" className="mega-menu__linklist-link">PEANUT RAMPAGE</a></li>
                                      <li><a href="#products" className="mega-menu__linklist-link">BERRY BLASTZ</a></li>
                                      <li><a href="#products" className="mega-menu__linklist-link">CHOCO SHATTER</a></li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="navbar-item header__item">
                      <a href="#about" className="navbar-link header__link is-arrowless">
                        ABOUT
                      </a>
                      <span className="headerlink_spacer">ABOUT</span>
                    </div>

                    <div className="navbar-item header__item">
                      <a href="#contact" className="navbar-link header__link is-arrowless">
                        CONTACT
                      </a>
                      <span className="headerlink_spacer">CONTACT</span>
                    </div>
                  </div>
                </div>

                <div className="header__brand is-align-center is-justify-space-between is-flex text-align-center">
                  <h1 className="visually-hidden">CRUNCHME</h1>
                  <a className="header__logo header__link primary-logo" href="/" title="CRUNCHME">
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
                  </a>
                </div>

                <div className="header__icons header__icon-style- header__icons--sticky">
                  <div className="header__link">
                    <a className="header__link action-area__link search-icon" tabIndex={0}>
                      <span className="icon header__icon" data-icon="search-prime">
                        <HiSearch />
                      </span>
                    </a>
                  </div>
                  <div className="header__link">
                    <a className="header__link action-area__link cart-icon" tabIndex={0}>
                      <span className="icon header__icon" data-icon="cart">
                        <HiShoppingCart />
                      </span>
                    </a>
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
