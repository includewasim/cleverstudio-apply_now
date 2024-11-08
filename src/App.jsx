import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import JobApplicationForm from './ApplicationForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <JobApplicationForm />
    </>
  )
}

export default App
