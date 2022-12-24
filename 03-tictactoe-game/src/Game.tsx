import { useState } from "react"
import { Label } from "./components/Label"

function getInitialState() {
  const gameState: any = {}
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      gameState[`${row}-${col}`] = null
    }
  }
  return gameState
}

const getKeyFromIndex = (index: number) => {
  const row = Math.floor(index / 3)
  const col = index % 3
  return `${row}-${col}`
}

const getLabel = (playerIdentification: number) => {
  if (!playerIdentification) {
    return null
  }
  return playerIdentification > 0 ? <Label symbol="O" color="blue" /> : <Label symbol="X" color="red" />
}

const checkWinner = (val: any): null | number => {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const sumRow = val[`${row}-${col}`] +
        val[`${row}-${col + 1}`] +
        val[`${row}-${col + 2}`]
      if (sumRow === 3 || sumRow === -3) {
        return sumRow > 0 ? 1 : -1
      }

      const sumCol = val[`${row}-${col}`] +
        val[`${row + 1}-${col}`] +
        val[`${row + 2}-${col}`]
      if (sumCol === 3 || sumCol === -3) {
        return sumCol > 0 ? 1 : -1
      }

      const sumDiagonal = val[`${row}-${col}`] +
        val[`${row + 1}-${col + 1}`] +
        val[`${row + 2}-${col + 2}`]
      if (sumDiagonal === 3 || sumDiagonal === -3) {
        return sumDiagonal > 0 ? 1 : -1
      }

      const sumReverseDiagonal = val[`${row}-${col}`] +
        val[`${row + 1}-${col - 1}`] +
        val[`${row + 2}-${col - 2}`]
      if (sumReverseDiagonal === 3 || sumReverseDiagonal === -3) {
        return sumReverseDiagonal > 0 ? 1 : -1
      }
    }
  }
  return null
}

export function Game() {
  const [values, setValues] = useState(getInitialState)
  const [player, setPlayer] = useState(1)
  const [winner, setWinner] = useState<null | number>(null)

  function handleClick(gameStateKey: string) {
    if (winner || values[gameStateKey]) {
      return
    }
    const newValues = {
      ...values,
      [gameStateKey]: player
    }
    setValues(newValues)
    setPlayer(player * -1)

    const checkCurrentMoveWins = checkWinner(newValues)
    if (checkCurrentMoveWins) {
      setWinner(checkCurrentMoveWins)
    }
  }

  function reset() {
    setWinner(null)
    setValues(getInitialState)
    setPlayer(1)
  }

  const checkTie = Object.values(values).filter(Boolean).length === 9 &&
    !winner

  return (
    <div className="Game">
      <div className="Game__board">
        {
          Array.from({ length: 9 }).map((_, index) => {
            const key = getKeyFromIndex(index)
            return (
              <button
                key={index}
                type="button"
                onClick={() => handleClick(key)}
              >
                {getLabel(values[key])}
              </button>
            )
          })
        }
      </div>
      {(winner || checkTie) && (
        <div className="Game__menu">
          {winner ? (
            <p>O ganhador é: {winner > 0 ? <Label symbol="O" color="blue" /> : <Label symbol="X" color="red" />}</p>
          ) : (
            <p>Houve um empate!</p>
          )}
          <button onClick={reset}>Reiniciar</button>
        </div>
      )}
    </div>
  )
}
