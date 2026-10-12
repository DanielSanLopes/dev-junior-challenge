import { useState } from 'react'
import './Checkin.css'

function Checkin({data}) {

  if (!Array.isArray(data))
    data = []
  return (
    <>
      {
        data.map((value, index)=>{
          const {id, nome, cpf, dataNascimento, horaCheckin} = value
          let nasc = dataNascimento.split('T')[0]
          const date = new Date(horaCheckin)
          let checkin = new Intl.DateTimeFormat("sv-SW", {
            timeZone: "America/Sao_Paulo",
            dateStyle: "short",
            timeStyle: "medium"
          }).format(date).split(" ")[1]
          return(
            <li key={id} className='list-item'>
              <p> <b>Nome:</b> {nome} <b>CPF:</b> {cpf}</p>
              <p> <b>Nasc:</b> {nasc} <b>Checkin:</b> {checkin}</p>

              <div style={{width:"100%", height:"1px", backgroundColor:'GrayText', marginTop:"10px", marginBottom:"10px"}}></div>
            </li>
          )
        })
      }
    </>
  )
}

export default Checkin
