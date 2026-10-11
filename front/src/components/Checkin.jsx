import { useState } from 'react'
import './Checkin.css'

function Checkin({data}) {
  const [count, setCount] = useState(0)

  return (
    <>
      {
        data.map((value, index)=>(
          <li key={index} className='list-item'>
            {value}
          </li>
        ))
      }
    </>
  )
}

export default Checkin
