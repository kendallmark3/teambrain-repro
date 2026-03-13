import dice1 from '../assets/dice-1.svg'
import dice2 from '../assets/dice-2.svg'
import dice3 from '../assets/dice-3.svg'
import dice4 from '../assets/dice-4.svg'
import dice5 from '../assets/dice-5.svg'
import dice6 from '../assets/dice-6.svg'

const diceImages: Record<number, string> = {
  1: dice1,
  2: dice2,
  3: dice3,
  4: dice4,
  5: dice5,
  6: dice6,
}

interface DiceProps {
  value: number
  rolling: boolean
}

export default function Dice({ value, rolling }: DiceProps) {
  return (
    <div className={`dice ${rolling ? 'rolling' : ''}`}>
      <img
        src={diceImages[value]}
        alt={`Die showing ${value}`}
      />
    </div>
  )
}
