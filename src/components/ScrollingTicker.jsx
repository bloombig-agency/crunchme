import { useEffect, useRef } from 'react'
import './ScrollingTicker.css'

function ScrollingTicker({ items = [], speed = 30 }) {
    const tickerRef = useRef(null)

    useEffect(() => {
        const ticker = tickerRef.current
        if (!ticker || items.length === 0) return

        const tickerContent = ticker.querySelector('.ticker-content')
        if (!tickerContent) return

        const clone = tickerContent.cloneNode(true)
        ticker.appendChild(clone)

        return () => {
            if (clone && clone.parentNode) {
                clone.parentNode.removeChild(clone)
            }
        }
    }, [items])

    return (
        <div className="scrolling-ticker" ref={tickerRef}>
            <div className="ticker-content">
                {items.map((item, index) => (
                    <div 
                        key={index} 
                        className="ticker-item"
                        style={{ animationDelay: `${index * 0.2}s` }}
                    >
                        <span className="ticker-text">{item}</span>
                        <span className="ticker-separator">★</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ScrollingTicker
