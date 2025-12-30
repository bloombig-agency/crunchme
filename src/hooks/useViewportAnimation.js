import { useEffect, useRef, useState } from 'react'

/**
 * Custom hook for viewport animations that trigger every time element enters viewport
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Intersection threshold (0-1)
 * @param {string} options.rootMargin - Root margin for intersection observer
 * @param {boolean} options.triggerOnce - Whether to trigger only once (default: false)
 * @returns {[React.RefObject, boolean]} - Ref and visibility state
 */
export function useViewportAnimation(options = {}) {
  const {
    threshold = 0.05,
    rootMargin = '0px 0px -100px 0px',
    triggerOnce = false
  } = options

  const elementRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const observerRef = useRef(null)
  const isVisibleRef = useRef(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Check if element is already in viewport on mount
    const checkInitialVisibility = () => {
      const rect = element.getBoundingClientRect()
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight
      const viewportWidth = window.innerWidth || document.documentElement.clientWidth
      
      // More lenient check - element is visible if any part is in viewport
      const isInViewport = (
        rect.top < viewportHeight + 100 && // Add buffer
        rect.bottom > -100 && // Add buffer
        rect.left < viewportWidth &&
        rect.right > 0
      )
      
      if (isInViewport) {
        setIsVisible(true)
        isVisibleRef.current = true
      }
    }

    // Cleanup previous observer
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    // Check initial visibility immediately and after layout
    checkInitialVisibility()
    const timeoutId = setTimeout(checkInitialVisibility, 200)

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          isVisibleRef.current = true
        } else {
          // Reset visibility when element leaves viewport (for repeat animations)
          // Only reset if element is significantly out of viewport
          if (!triggerOnce && entry.boundingClientRect.bottom < -100) {
            setIsVisible(false)
            isVisibleRef.current = false
          }
        }
      },
      {
        threshold: threshold,
        rootMargin: rootMargin
      }
    )

    observerRef.current.observe(element)

    // Fallback: If element is still not visible after 500ms and it's in viewport, make it visible
    const fallbackTimeout = setTimeout(() => {
      if (!isVisibleRef.current) {
        const rect = element.getBoundingClientRect()
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight
        if (rect.top < viewportHeight && rect.bottom > 0) {
          setIsVisible(true)
          isVisibleRef.current = true
        }
      }
    }, 500)

    return () => {
      clearTimeout(timeoutId)
      clearTimeout(fallbackTimeout)
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [threshold, rootMargin, triggerOnce])

  return [elementRef, isVisible]
}

/**
 * Hook for staggered animations on multiple elements
 * @param {number} count - Number of elements
 * @param {Object} options - Configuration options
 * @returns {Array} - Array of refs and visibility states
 */
export function useStaggeredAnimation(count, options = {}) {
  const {
    threshold = 0.05,
    rootMargin = '0px 0px -100px 0px',
    staggerDelay = 0.1,
    triggerOnce = false
  } = options

  const refs = Array.from({ length: count }, () => useRef(null))
  const [visibleStates, setVisibleStates] = useState(
    Array.from({ length: count }, () => false)
  )
  const observersRef = useRef([])

  useEffect(() => {
    // Cleanup previous observers
    observersRef.current.forEach(observer => {
      if (observer) observer.disconnect()
    })
    observersRef.current = []

    // Check initial visibility and create observers
    const checkAndObserve = () => {
      const observers = refs.map((ref, index) => {
        if (!ref.current) return null

        // Check if element is already in viewport
        const rect = ref.current.getBoundingClientRect()
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight
        const viewportWidth = window.innerWidth || document.documentElement.clientWidth
        
        // More lenient check - element is visible if any part is in viewport
        const isInViewport = (
          rect.top < viewportHeight + 100 && // Add buffer
          rect.bottom > -100 && // Add buffer
          rect.left < viewportWidth &&
          rect.right > 0
        )
        
        if (isInViewport) {
          setVisibleStates(prev => {
            const newStates = [...prev]
            newStates[index] = true
            return newStates
          })
        }

        // Parse rootMargin safely
        let parsedRootMargin = rootMargin
        try {
          const parts = rootMargin.split(' ')
          if (parts.length >= 3) {
            const topMargin = parseInt(parts[0]) || 0
            parsedRootMargin = `${topMargin + index * 20}px ${parts[1] || '0px'} ${parts[2] || '-50px'} ${parts[3] || '0px'}`
          }
        } catch (e) {
          // Fallback to original rootMargin if parsing fails
          parsedRootMargin = rootMargin
        }

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleStates(prev => {
                const newStates = [...prev]
                newStates[index] = true
                return newStates
              })
            } else {
              // Reset when leaving viewport for repeat animations
              // Only reset if element is significantly out of viewport
              if (!triggerOnce && entry.boundingClientRect.bottom < -100) {
                setVisibleStates(prev => {
                  const newStates = [...prev]
                  newStates[index] = false
                  return newStates
                })
              }
            }
          },
          {
            threshold: threshold,
            rootMargin: parsedRootMargin
          }
        )

        observer.observe(ref.current)
        return observer
      })

      observersRef.current = observers.filter(obs => obs !== null)
    }

    // Use requestAnimationFrame to ensure DOM is ready
    const rafId = requestAnimationFrame(() => {
      // Small delay to ensure layout is complete
      setTimeout(checkAndObserve, 50)
    })

    return () => {
      cancelAnimationFrame(rafId)
      observersRef.current.forEach((observer) => {
        if (observer) {
          observer.disconnect()
        }
      })
    }
  }, [count, threshold, rootMargin, staggerDelay, triggerOnce])

  return [refs, visibleStates]
}

