import { useState, useEffect, useRef } from 'react'

/**
 * Custom hook for auto-rotating through items
 * @param {number} itemsLength - Total number of items
 * @param {number} interval - Rotation interval in milliseconds
 * @param {boolean} pauseOnHover - Whether to pause on hover
 * @returns {Object} { currentIndex, setCurrentIndex, isPaused, setIsPaused }
 */
export const useAutoRotate = (itemsLength, interval = 5000, pauseOnHover = true) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef(null)
  const timeoutRef = useRef(null)

  useEffect(() => {
    if (!isPaused && itemsLength > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % itemsLength)
      }, interval)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPaused, itemsLength, interval])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleIndexChange = (index) => {
    setCurrentIndex(index)
    if (pauseOnHover) {
      setIsPaused(true)
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      // Resume after a delay
      timeoutRef.current = setTimeout(() => {
        setIsPaused(false)
      }, interval * 2)
    }
  }

  return {
    currentIndex,
    setCurrentIndex: handleIndexChange,
    isPaused,
    setIsPaused
  }
}

