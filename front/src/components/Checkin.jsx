import { useState } from 'react'
import './Checkin.css'

function Checkin({data}) {
  const [count, setCount] = useState(0)

  return (
    <>
      <div id="checkin-list">
        <ol>
          {
            data.map((value, index) =>(
              <li key={index} id={index}>
                {value}
              </li>
            ))
          }

        </ol>
      </div>      
    </>
  )
}

export default App
