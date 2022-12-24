import { Grid } from './components/Grid'
import { cards } from './data/cards'

import './App.css'

function App() {
  return (
    <div className='App'>
      <Grid cards={cards} />
    </div>
  )
}

export default App
