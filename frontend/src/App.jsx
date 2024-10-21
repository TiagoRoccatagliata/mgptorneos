import { useState } from 'react'
import './App.css'
import Home from './components/Home.jsx'
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
import Navbar from './components/Navbar.jsx'
import About from './components/About.jsx'
import {Routes, Route, useLocation} from 'react-router-dom'


function App() {
    const location = useLocation()
    const noNavbar = location.pathname === "/register" || location.pathname === "/"

  return (
    <>
        {
            noNavbar ?
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Routes>

                :
                    <Navbar
                         content={
                             <Routes>
                                 <Route path="/home" element={<Home/>}/>
                                 <Route path="/about" element={<About/>}/>
                            </Routes>
        }
        />
        }
    </>
  )
}

export default App
