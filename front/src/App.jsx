
import { useEffect, useState } from 'react'
import Checkin from './components/Checkin'
import './App.css'
const env = import.meta.env

function App() {
  const [message, setMessage] = useState({error:false, message:""})
  const [data, setData] = useState([])
  const [cpf, setCPF] = useState("")

  useEffect(()=>{
    refreshlist()
  },[])

  const apiRoutes = {
    setcheck:"setcheck/",
    getchecklist:"getchecklist/",
  }
  

  async function setcheckin(){
    resetMessage()

    if(cpf.length != 11){
      setMessage({error:true, message:"O CPF deve ter exatamente 11 dígitos"})
      return
    }

    console.log(env.VITE_PROD)
    const serverURL = env.VITE_PROD==('1'||1)?env.VITE_API_URL:env.VITE_LOCALHOST_URL
    const url = serverURL + apiRoutes.setcheck + (cpf)
    const response = await fetch(url, {
      method:'POST',
    })

    const result = await response.json();

    if (result.status >226){
      setMessage({error:true, message:result.message})
      return
    }

    resetMessage()
    setMessage({message:result.message})
    refreshlist()
  }

  async function refreshlist(){
    const serverURL = env.VITE_PROD==('1'||1)?env.VITE_API_URL:env.VITE_LOCALHOST_URL
    const url = serverURL + apiRoutes.getchecklist
    const response = await fetch(url, {
      method:'GET',
    })
  
    const result = await response.json();

    if (result.status <=226){
      setMessage({error:true, message:result.message})
      return
    }

    console.log(result)
    setData(result)
  }

  function handleSetCPF(event){
    let cpf = event.target.value.replace(/\D/g, "")
    setCPF(cpf)    
  }

  function resetMessage(){
    setMessage({error:false, message:""})
  }

  return (
    <>
      <section id="center">
        <div className='half-container' id='check'>
          <h1 style={{margin:0, marginBottom: "0.67em"}}>Check-in</h1>
          <p style={{marginBottom:"0.67em"}}>
            Insira o cpf abaixo (apenas números):
          </p>
          <input className='input-text' type="text" value={cpf} onChange={handleSetCPF}/>
          <input className='input-button' type='button' value={"Check"} onClick={setcheckin}/>
          <p id='message' style={{color:message.error?'red':'whitesmoke'}}>{message.message}</p>
        </div>

        <div className='half-container' id='list'>
          <h2>Check-in's</h2>
          
          <ol id='list-container'>
            <Checkin data={data}/>
          </ol>
          
        </div>
      </section>      
    </>
  )
}

export default App
