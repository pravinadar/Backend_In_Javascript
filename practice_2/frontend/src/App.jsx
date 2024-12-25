import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  let [heroes, setHeroes] = useState([])

  useEffect(()=>{
    axios
      .get('/api/heroes')
      .then((response)=>{
        setHeroes(response.data)
        // console.log(response.data)      
      })
      .catch((error)=>{
        console.log(error);
      })
  })

  return (
    <>
    <h1>Hello World</h1>
    <h2>We have {heroes.length} Heroes</h2>
    {
      heroes.map((hero)=>(
        <div key={hero.id}>
          <h2>{hero.heroName}</h2>
          <p>{hero.description}</p>
          <br />
        </div>
      ))
    }
      
    </>
  )
}

export default App
