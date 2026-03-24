import React from 'react'
import SelectorBox from './components/SelectorBox'

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="brand-mark">L'ORÉAL</div>
        <div className="brand-sub">PARIS</div>
      </header>
      <main className="app-main">
        <SelectorBox />
      </main>
      <footer className="app-footer">
        <p className="footer-text">Intent-Driven Selection — Powered by TeamBrain</p>
      </footer>
    </div>
  )
}
