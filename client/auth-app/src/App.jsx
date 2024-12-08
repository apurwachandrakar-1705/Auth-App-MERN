import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import Login from './components/Login'
import {Routes,Route} from 'react-router-dom'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import Error from './components/Error'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <Header></Header>
   <Routes >
    <Route path='/'element={ <Login></Login>}></Route>
    <Route path='/register'element={ <Register></Register>}></Route>
    <Route path='/dash'element={ <Dashboard></Dashboard>}></Route>
    <Route path='*'element={ <Error></Error>}></Route>
   </Routes>
  
    </>
  )
}

export default App
