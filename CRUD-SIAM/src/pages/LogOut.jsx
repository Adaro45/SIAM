import React from 'react'
import { useState, useEffect } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom";
import "../Components/styles/LogOut.css"
import Identificador from '../Components/Identificador';
export default function Logout() {
    
    const [username, setUsername] = useState("")
    const [isLoggedIn, setLoggedIn] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        const checkLoggedInUser = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                if (token) {
                    const config = {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    };
                    const response = await axios.get("http://127.0.0.1:8000/SIAM/user/", config)
                    setLoggedIn(true)
                    setUsername(response.data.username)
                }
                else {
                    setLoggedIn(false);
                    setUsername("");
                }
            }
            catch (error) {
                setLoggedIn(false);
                setUsername("");
            }
        };
        checkLoggedInUser()
    }, [])

    const handleLogout = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");

            if (accessToken && refreshToken) {
                const config = {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                };
                await axios.post("http://127.0.0.1:8000/SIAM/logout/", { "refresh": refreshToken }, config)
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                setLoggedIn(false);
                setUsername("");
                navigate("/");
                window.location.reload();
            }
        }
        catch (error) {
            console.error("Failed to logout", error.response?.data || error.message)
        }
        if(!isLoggedIn){
            navigate("/login");
        }
    }
    return (
        <div className='logout_container'>
            {isLoggedIn ? (
                <>
                <Identificador/>
                    <h1 className='logout_title'>Hola, {username} gracias por su visita</h1>
                    <button className='logout_button' onClick={handleLogout}>Logout</button>

                </>
            ) : (
                <>
                <Identificador/>
                <h1 className='logout_title'>Please Login</h1>
                <button className='logout_button' onClick={handleLogout}>Iniciar Sesion</button>
                </>
            )}
        </div>
    )
}