import { MouseEvent, useState } from 'react'

import './App.css'

interface Click {
  clientX: number
  clientY: number
}

function App() {
  const [click, setClicks] = useState<Click[]>([])
  const [redo, setRedo] = useState<Click[]>([])

  function getCoordinates(event: MouseEvent<HTMLElement>) {
    const { clientX, clientY } = event
    setClicks(previousClick => [...previousClick, { clientX, clientY }])
    setRedo([])
  }

  function handleUndo() {
    const newClickArray = [...click]
    const currentUndo = newClickArray.pop()
    if (currentUndo) {
      const { clientX, clientY } = currentUndo
      setClicks(newClickArray)
      setRedo(previousRedo => [...previousRedo, { clientX, clientY }])
    }
  }

  function handleRedo() {
    const newRedoArray = [...redo]
    const currentRedo = newRedoArray.pop()
    if (currentRedo) {
      const { clientX, clientY } = currentRedo
      setRedo(newRedoArray)
      setClicks(previousClick => [...previousClick, { clientX, clientY }])
    }
  }

  function handleReset() {
    setClicks([])
    setRedo([])
  }

  return (
    <>
      <button disabled={click.length === 0} onClick={handleUndo}>Undo</button>
      <button disabled={click.length === 0 && redo.length === 0} onClick={handleReset}>Reset</button>
      <button disabled={redo.length === 0} onClick={handleRedo}>Redo</button>

      <div
        className="App"
        onClick={getCoordinates}
      >
        {click.map((click, clickIndex) => {
          return (
            <div
              key={clickIndex}
              style={{
                position: 'absolute',
                left: click.clientX - 6,
                top: click.clientY - 7,
                borderRadius: '50%',
                backgroundColor: 'red',
                width: '10px',
                height: '10px'
              }}
            ></div>
          )
        })}
      </div>
    </>
  )
}

export default App
