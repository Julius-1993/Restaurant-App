import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <h1 className='bg-primary'>
      Hello Fastfood-App
    </h1>
  )
}

export default App
