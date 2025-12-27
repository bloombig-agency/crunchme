import { useRef, useCallback } from 'react'
import { scrollHorizontal, getFirstChildWidth, getComputedGap } from '../utils/scrollUtils'

/**
 * Custom hook for horizontal scrolling functionality
 * @param {string} itemSelector - CSS selector for scroll items
 * @returns {Object} { scrollRef, scrollLeft, scrollRight }
 */
export const useHorizontalScroll = (itemSelector = '.product-scroll-item') => {
  const scrollRef = useRef(null)

  const scrollLeft = useCallback(() => {
    if (scrollRef.current) {
      const itemWidth = getFirstChildWidth(scrollRef.current, itemSelector)
      const gap = getComputedGap(scrollRef.current)
      scrollHorizontal(scrollRef.current, 'left', itemWidth, gap)
    }
  }, [itemSelector])

  const scrollRight = useCallback(() => {
    if (scrollRef.current) {
      const itemWidth = getFirstChildWidth(scrollRef.current, itemSelector)
      const gap = getComputedGap(scrollRef.current)
      scrollHorizontal(scrollRef.current, 'right', itemWidth, gap)
    }
  }, [itemSelector])

  return {
    scrollRef,
    scrollLeft,
    scrollRight
  }
}



