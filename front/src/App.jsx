
import { useState } from 'react'
import Checkin from './components/Checkin'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className='half-container' id='check'>
          <h1 style={{margin:0, marginBottom: "0.67em"}}>Check-in</h1>
          <p style={{marginBottom:"0.67em"}}>
            Insira o cpf abaixo (apenas números):
          </p>
          <input className='input-text' type="text" />
          <input className='input-button' type='button' value={"Check"}/>
        </div>

        <div className='half-container' id='list'>
          <h2>Check-in</h2>
          <ol id='list-container'>
            <Checkin data={['asd', '342']}/>
          </ol>
          
        </div>

      </section>      
    </>
  )
}

export default App
