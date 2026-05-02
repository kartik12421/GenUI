import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

export const ServerUrl = "http://localhost:3000"

function App() {
  return (
    <Routes>

      <Route path='/' element={<Home></Home>}></Route>

    </Routes>
  )
}

export default App
