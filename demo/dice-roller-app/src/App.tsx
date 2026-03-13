import { useState } from 'react'
import Dice from './components/Dice'

function App() {
  const [die1, setDie1] = useState<number>(1)
  const [die2, setDie2] = useState<number>(1)
  const [rolling, setRolling] = useState<boolean>(false)

  const rollDice = () => {
    if (rolling) return
    setRolling(true)
    setTimeout(() => {
      setDie1(Math.floor(Math.random() * 6) + 1)
      setDie2(Math.floor(Math.random() * 6) + 1)
      setRolling(false)
    }, 600)
  }

  return (
    <div className="app">
      <h1>Dice Roller</h1>
      <div className="dice-container">
        <Dice value={die1} rolling={rolling} />
        <Dice value={die2} rolling={rolling} />
      </div>
      <button className="roll-btn" onClick={rollDice} disabled={rolling}>
        {rolling ? 'Rolling...' : 'Roll Dice'}
      </button>
    </div>
  )
}

export default App
