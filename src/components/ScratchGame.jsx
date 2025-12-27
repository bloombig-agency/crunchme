import { useState, useRef, useEffect, useMemo } from 'react'
import { HiGift, HiSparkles, HiStar } from 'react-icons/hi'
import Button from './ui/Button'
import { generateDiscountCode, saveDiscountToStorage, isDiscountValid } from '../utils/discountUtils'
import { SCRATCH_DISCOUNTS, SCRATCH_COLORS, STORAGE_KEYS } from '../data/constants'
import './ScratchGame.css'

function ScratchGame() {
  const [isScratching, setIsScratching] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [discount, setDiscount] = useState(null)
  const canvasRef = useRef(null)
  const [hasPlayed, setHasPlayed] = useState(() => isDiscountValid(STORAGE_KEYS.SCRATCH_DISCOUNT))

  const randomColor = useMemo(() => 
    SCRATCH_COLORS[Math.floor(Math.random() * SCRATCH_COLORS.length)],
    []
  )

  useEffect(() => {
    if (!revealed && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      
      canvas.width = canvas.offsetWidth || 300
      canvas.height = canvas.offsetHeight || 200

      // Draw scratch-off layer
      ctx.fillStyle = '#333'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Add text pattern
      ctx.fillStyle = '#666'
      ctx.font = 'bold 20px Arial'
      ctx.textAlign = 'center'
      ctx.fillText('SCRATCH HERE', canvas.width / 2, canvas.height / 2)
    }
  }, [revealed])

  const handleScratch = (e) => {
    if (revealed || hasPlayed || !canvasRef.current) return

    setIsScratching(true)
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Erase circle at mouse position
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x, y, 30, 0, Math.PI * 2)
    ctx.fill()

    // Check if enough is revealed
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data
    let transparentPixels = 0

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] < 128) transparentPixels++
    }

    const revealPercent = (transparentPixels / (pixels.length / 4)) * 100

    if (revealPercent > 30) {
      // Reveal discount
      const randomDiscount = SCRATCH_DISCOUNTS[Math.floor(Math.random() * SCRATCH_DISCOUNTS.length)]
      setDiscount(randomDiscount)
      setRevealed(true)
      setHasPlayed(true)
      
      // Save to localStorage
      const code = generateDiscountCode('SCRATCH', 6)
      saveDiscountToStorage(STORAGE_KEYS.SCRATCH_DISCOUNT, {
        code,
        discount: randomDiscount,
        expires: Date.now() + 3 * 24 * 60 * 60 * 1000 // 3 days
      })
    }
  }

  const handleReset = () => {
    setRevealed(false)
    setDiscount(null)
    setIsScratching(false)
    setHasPlayed(false)
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.fillStyle = '#333'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#666'
      ctx.font = 'bold 20px Arial'
      ctx.textAlign = 'center'
      ctx.fillText('SCRATCH HERE', canvas.width / 2, canvas.height / 2)
    }
  }

  return (
    <div className="scratch-game">
      <div className="game-header">
        <div className="game-icon">
          <HiSparkles />
        </div>
        <h3 className="game-title">Scratch & Win</h3>
        <p className="game-subtitle">Scratch to reveal your discount!</p>
      </div>

      <div className="scratch-container">
        <div className="scratch-card">
          <div 
            className={`scratch-content ${revealed ? 'revealed' : ''}`}
            style={{ backgroundColor: revealed ? randomColor : 'transparent' }}
          >
            {revealed ? (
              <div className="discount-reveal">
                <HiStar className="trophy-icon" />
                <div className="discount-amount">{discount}%</div>
                <div className="discount-label">OFF</div>
                <p className="discount-message">Your discount code has been saved!</p>
              </div>
            ) : (
              <div className="scratch-placeholder">
                <HiGift className="gift-icon" />
                <p className="scratch-instruction">Drag to scratch</p>
              </div>
            )}
          </div>
          {!revealed && (
            <canvas
              ref={canvasRef}
              className="scratch-canvas"
              onMouseDown={handleScratch}
              onMouseMove={(e) => {
                if (isScratching) handleScratch(e)
              }}
              onMouseUp={() => setIsScratching(false)}
              onMouseLeave={() => setIsScratching(false)}
              onTouchStart={handleScratch}
              onTouchMove={(e) => {
                if (isScratching && e.touches && e.touches[0] && canvasRef.current) {
                  const touch = e.touches[0]
                  handleScratch({
                    clientX: touch.clientX,
                    clientY: touch.clientY
                  })
                }
              }}
              onTouchEnd={() => setIsScratching(false)}
            />
          )}
        </div>
      </div>

      {revealed && (
        <div className="game-actions">
          <Button variant="primary" onClick={handleReset}>
            Play Again
          </Button>
        </div>
      )}

      {hasPlayed && !revealed && (
        <p className="game-note">You've already played! Come back tomorrow for another chance.</p>
      )}
    </div>
  )
}

export default ScratchGame

