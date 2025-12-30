/**
 * Utility functions for scroll operations
 */

/**
 * Scrolls a container horizontally by a specific amount
 * @param {HTMLElement} container - Container element to scroll
 * @param {string} direction - 'left' or 'right'
 * @param {number} itemWidth - Width of one scroll item
 * @param {number} gap - Gap between items in pixels
 */
export const scrollHorizontal = (container, direction, itemWidth, gap = 16) => {
  if (!container) return

  const scrollAmount = itemWidth + gap
  container.scrollBy({
    left: direction === 'left' ? -scrollAmount : scrollAmount,
    behavior: 'smooth'
  })
}

/**
 * Gets the width of the first child element in a container
 * @param {HTMLElement} container - Container element
 * @param {string} selector - Selector for child element
 * @returns {number} Width in pixels
 */
export const getFirstChildWidth = (container, selector) => {
  if (!container) return 0
  const firstChild = container.querySelector(selector)
  return firstChild ? firstChild.offsetWidth : 0
}

/**
 * Gets the computed gap value from CSS
 * @param {HTMLElement} element - Element to get gap from
 * @returns {number} Gap in pixels
 */
export const getComputedGap = (element) => {
  if (!element) return 16
  const gap = getComputedStyle(element).gap
  return parseInt(gap) || 16
}






