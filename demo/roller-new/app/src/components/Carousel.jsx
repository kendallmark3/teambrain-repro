import React, { useRef, useEffect } from 'react'

const ITEMS = [
  { id: 1, label: 'Radiance Serum', icon: '✦' },
  { id: 2, label: 'Hydration Boost', icon: '◈' },
  { id: 3, label: 'Matte Finish', icon: '◉' },
  { id: 4, label: 'Glow Renewal', icon: '✧' },
  { id: 5, label: 'Age Reverse', icon: '◎' },
  { id: 6, label: 'Clean Beauty', icon: '✦' },
]

// Build a long repeating strip so the carousel has room to scroll
// We repeat enough times that the animation never shows the end
const REPEATS = 6
const STRIP = Array.from({ length: REPEATS }, () => ITEMS).flat()

const ITEM_WIDTH = 200 // px — must match CSS .carousel-item width
const VISIBLE_WIDTH = 600 // px — width of the viewport window

/**
 * Carousel renders a horizontal slot-machine strip.
 *
 * Why JS-driven instead of pure CSS animation:
 * We need a deterministic final position (selected item centered) with an
 * ease-out curve, which requires knowing the target offset at runtime.
 * Pure CSS keyframes can't encode a runtime-computed target.
 */
export default function Carousel({ spinning, selectedIndex, onAnimationEnd }) {
  const stripRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    if (!spinning) return

    const strip = stripRef.current
    if (!strip) return

    // Reset to start before each spin so there's always room to travel
    strip.style.transition = 'none'
    strip.style.transform = 'translateX(0px)'

    // Force a reflow so the reset takes effect before we start moving
    void strip.offsetWidth

    // Target: land the selectedIndex item (from the 3rd repeat block) in center
    const repeatOffset = ITEMS.length * 2 // start from 3rd block for visual travel distance
    const targetItemIndex = repeatOffset + selectedIndex
    const centerOffset = (VISIBLE_WIDTH / 2) - (ITEM_WIDTH / 2)
    const targetX = -(targetItemIndex * ITEM_WIDTH) + centerOffset

    // Extra full rotations before landing — makes the spin feel intentional
    const spinDistance = ITEMS.length * ITEM_WIDTH * 2
    const travelX = targetX - spinDistance

    // Phase 1: fast spin past target
    strip.style.transition = `transform 1.4s cubic-bezier(0.1, 0.0, 0.3, 1.0)`
    strip.style.transform = `translateX(${travelX}px)`

    const phase1 = setTimeout(() => {
      // Phase 2: ease-out snap to final position
      strip.style.transition = `transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)`
      strip.style.transform = `translateX(${targetX}px)`

      const phase2 = setTimeout(() => {
        onAnimationEnd()
      }, 900)

      animationRef.current = phase2
    }, 1400)

    animationRef.current = phase1

    return () => {
      clearTimeout(animationRef.current)
    }
  }, [spinning, selectedIndex, onAnimationEnd])

  return (
    <div className="carousel-viewport">
      <div className="carousel-fade-left" />
      <div className="carousel-fade-right" />
      <div className="carousel-center-highlight" />
      <div className="carousel-strip" ref={stripRef}>
        {STRIP.map((item, i) => (
          <div key={i} className="carousel-item">
            <span className="carousel-item-icon">{item.icon}</span>
            <span className="carousel-item-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export { ITEMS }
