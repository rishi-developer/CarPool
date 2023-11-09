import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import PoolHome from './PoolHome'

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element = {<Login />}></Route>
      <Route path="/signup" element = {<Signup />}></Route>
      <Route path="/poolhome" element = {<PoolHome />}></Route>

    </Routes>
   </BrowserRouter>
  )
}

export default App