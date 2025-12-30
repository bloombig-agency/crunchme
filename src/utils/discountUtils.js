/**
 * Utility functions for discount code generation and management
 */

/**
 * Generates a random discount code
 * @param {string} prefix - Prefix for the code (e.g., 'CRUNCH', 'SCRATCH')
 * @param {number} length - Length of the random suffix
 * @returns {string} Generated discount code
 */
export const generateDiscountCode = (prefix = 'CRUNCH', length = 6) => {
  const randomSuffix = Math.random()
    .toString(36)
    .substring(2, 2 + length)
    .toUpperCase()
  return `${prefix}${randomSuffix}`
}

/**
 * Saves discount code to localStorage
 * @param {string} key - Storage key
 * @param {Object} data - Discount data object
 */
export const saveDiscountToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify({
      ...data,
      createdAt: Date.now()
    }))
  } catch (error) {
    console.error('Failed to save discount to localStorage:', error)
  }
}

/**
 * Retrieves discount code from localStorage
 * @param {string} key - Storage key
 * @returns {Object|null} Discount data or null if not found/expired
 */
export const getDiscountFromStorage = (key) => {
  try {
    const stored = localStorage.getItem(key)
    if (!stored) return null

    const data = JSON.parse(stored)
    
    // Check if expired
    if (data.expires && Date.now() > data.expires) {
      localStorage.removeItem(key)
      return null
    }

    return data
  } catch (error) {
    console.error('Failed to retrieve discount from localStorage:', error)
    return null
  }
}

/**
 * Checks if a discount code is valid and not expired
 * @param {string} key - Storage key
 * @returns {boolean} True if discount is valid
 */
export const isDiscountValid = (key) => {
  const discount = getDiscountFromStorage(key)
  return discount !== null && (!discount.expires || Date.now() < discount.expires)
}





