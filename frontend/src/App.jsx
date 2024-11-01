import { useState } from 'react'
import './App.css'
import Home from './components/Home.jsx'
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
import Navbar from './components/Navbar.jsx'
import About from './components/About.jsx'
import {Routes, Route, useLocation} from 'react-router-dom'
import ProtectedRoutes from './components/ProtectedRoutes.jsx'
import PasswordResetRequest from "./components/PasswordResetRequest.jsx";
import PasswordReset from "./components/PasswordReset.jsx";

function App() {
    const location = useLocation()
    const noNavbar = location.pathname === "/register" || location.pathname === "/" || location.pathname.includes("password")

    return (
        <>
            {
                noNavbar ?
                    <Routes>
                        <Route path="/" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/request/password_reset" element={<PasswordResetRequest/>}/>
                        <Route path="/password-reset/:token" element={<PasswordReset/>}/>
                    </Routes>
                :
                    <Navbar
                        content={
                            <Routes>
                                <Route element={<ProtectedRoutes/>}>
                                    <Route path="/home" element={<Home/>}/>
                                    <Route path="/about" element={<About/>}/>
                                </Route>
                            </Routes>
                        }
                    />
            }
        </>
    )
}

export default App