import React from "react"
import "./style.css"
import Die from "./components/Die.js"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {
  const [tenDice, setTenDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const allHeld = tenDice.every(die => die.isHeld)
    const allSameValue = tenDice.every(die => die.value === tenDice[0].value)
    if(allHeld && allSameValue) {
      setTenzies(true)
    }
  }, [tenDice])

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newArray = []
    for(let i = 0; i < 10; i++) {
      newArray.push(generateNewDie())
    }
    return newArray
  }

  function rollDice() {
    if(tenzies) {
      setTenDice(allNewDice())
      setTenzies(false)
    } else {
      setTenDice(oldDice => oldDice.map(die => {
      return die.isHeld
        ? die
        : generateNewDie()
    }))}
  }

  function changeHold(id) {
    setTenDice(oldDice => oldDice.map(die => {
      return die.id === id 
        ? {...die, isHeld: !die.isHeld}
        : die
    }))
  }

  const diceElements = tenDice.map(die => 
    <Die 
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      changeHold={() => changeHold(die.id)}
    />
  )

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="die-container">
        {diceElements}
      </div>
      <button 
        className="roll-button" 
        onClick={rollDice}>{tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  )
}