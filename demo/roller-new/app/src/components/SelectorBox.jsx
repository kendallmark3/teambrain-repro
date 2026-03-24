import React, { useState, useCallback } from 'react'
import Carousel, { ITEMS } from './Carousel'

/**
 * SelectorBox orchestrates the roll sequence:
 * idle → spinning → landed
 *
 * Why state machine instead of booleans:
 * Three distinct visual states (idle, spinning, landed) with different
 * UI treatments — a state machine avoids boolean combination bugs.
 */
export default function SelectorBox() {
  const [phase, setPhase] = useState('idle') // 'idle' | 'spinning' | 'landed'
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [selectedItem, setSelectedItem] = useState(null)

  const handleRoll = () => {
    if (phase === 'spinning') return
    const idx = Math.floor(Math.random() * ITEMS.length)
    setSelectedIndex(idx)
    setSelectedItem(null)
    setPhase('spinning')
  }

  const handleAnimationEnd = useCallback(() => {
    setSelectedItem(ITEMS[selectedIndex])
    setPhase('landed')
  }, [selectedIndex])

  return (
    <div className="selector-box">
      <div className="selector-eyebrow">INTENT SELECTOR</div>
      <h1 className="selector-headline">
        Define Intent.<br />Let the System Decide.
      </h1>

      <div className={`carousel-wrapper ${phase === 'landed' ? 'landed' : ''}`}>
        <Carousel
          spinning={phase === 'spinning'}
          selectedIndex={selectedIndex}
          onAnimationEnd={handleAnimationEnd}
        />
      </div>

      <button
        className={`roll-button ${phase === 'spinning' ? 'spinning' : ''}`}
        onClick={handleRoll}
        disabled={phase === 'spinning'}
      >
        {phase === 'spinning' ? (
          <span className="button-inner">Interpreting Intent…</span>
        ) : (
          <span className="button-inner">Roll Intent</span>
        )}
      </button>

      <div className={`result-display ${phase === 'landed' ? 'visible' : ''}`}>
        {selectedItem && (
          <>
            <div className="result-label">Selected Intent</div>
            <div className="result-name">{selectedItem.label}</div>
            <div className="result-tagline">
              From control… to orchestration.
            </div>
          </>
        )}
      </div>
    </div>
  )
}
