import React from 'react'
import { useState, useEffect } from 'react'
import axios from "axios"
import { useNavigate, Link } from "react-router-dom";
import "../Components/styles/LogOut.css"
import Identificador from '../Components/Identificador';
export default function Logout() {

    const [username, setUsername] = useState("")
    const [isLoggedIn, setLoggedIn] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        const checkLoggedInUser = async () => {
            try {
                const userName = localStorage.getItem("userName");
                const accessToken = localStorage.getItem("accessToken");
        
                if (userName && accessToken) {  // Verificar si ambos están en localStorage
                    const config = {
                        headers: {
                            "Authorization": `Bearer ${accessToken}`
                        }
                    };
        
                    const response = await axios.get(`http://127.0.0.1:8000/SIAM/user/${userName}/`);
        
                    setLoggedIn(true);
                    setUsername(response.data.username);
                } else {
                    setLoggedIn(false);
                    setUsername("");
                }
            } catch (error) {
                setLoggedIn(false);
                setUsername("");
                console.error("Error fetching user data:", error); // Para mejor diagnóstico de errores
            }
        };
        
        // Llamada inicial a la función
        checkLoggedInUser();
        
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
                localStorage.clear();
                window.scrollTo(0, 0);
                setLoggedIn(false);
                setUsername("");
                navigate("/");
                window.location.reload();
            }
        }
        catch (error) {
            console.error("Failed to logout", error.response?.data || error.message)
        }
        if (!isLoggedIn) {
            navigate("/login");
            window.location.reload();
        }

    }
    return (
        <div className='logout_container'>
            {isLoggedIn ? (
                <>
                    <Identificador />
                    <h1 className='logout_title'>Hola, {username} gracias por su visita</h1>
                    <div className="logout_buttons">
                    <Link to="/userAccount" className="logout_button userAccount">Mi Usuario</Link>
                    <button className='logout_button_cerrar' onClick={handleLogout}>Logout</button>
                    </div>

                </>
            ) : (
                <>
                    <Identificador />
                    <h1 className='logout_title'>Please Login</h1>
                    <button className='logout_button_cerrar' onClick={handleLogout}>Iniciar Sesion</button>
                </>
            )}
        </div>
    )
}