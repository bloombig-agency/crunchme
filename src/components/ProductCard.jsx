import { useState, memo } from 'react'
import { HiShoppingCart } from 'react-icons/hi'
import './ProductCard.css'

function ProductCard({ product, onAddToCart }) {
  if (!product) {
    return null
  }

  return (
    <div className="thumbnail product__thumbnail thumbnail__hover-overlay--false has-thumbnail-sticker">
      <div className="product-wrap">
        <div className="product-image__wrapper">
          <div className="image__container product__imageContainer">
            <a href={`#product-${product.id}`} aria-label={product.name || 'Product'}>
              {product.badge && (
                <div className="sticker-holder sticker-shape-square sticker-position-left">
                  <div className="sticker-holder__content sticker-holder__content--product">
                    <div className="thumbnail-sticker sticker-">
                      <span className="sticker-text">{product.badge}</span>
                    </div>
                  </div>
                </div>
              )}
              <div className="image-element__wrap">
                {product.image ? (
                  <img
                    alt={product.name || 'Product'}
                    className="transition--blur-up"
                    src={product.image}
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                ) : (
                  <div className="image-placeholder" />
                )}
              </div>
            </a>
          </div>
        </div>

        <div className="product-info">
          <div className="thumbnail__caption text-align-center">
            <div className="product-thumbnail">
              <span className="product-thumbnail__title font-banner-heading is-uppercase">
                PROTEIN
              </span>
              <span className="product-thumbnail__title font-banner-heading is-uppercase">
                BAR
              </span>
              <div className="variant-title">{product.name || 'Product Name'}</div>
              {product.weight && (
                <div className="packsize">{product.weight}</div>
              )}
            </div>
          </div>

          <div className="product_form product_form--radio">
            <form className="shopify-product-form">
              <div className="purchase-details">
                <div className="purchase-details__buttons">
                  <a 
                    href={`#product-${product.id}`}
                    aria-label="Learn More"
                    className="button button--primary"
                    onClick={(e) => {
                      e.preventDefault()
                      onAddToCart?.(product)
                    }}
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(ProductCard)
