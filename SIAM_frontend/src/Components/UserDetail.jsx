import React from 'react'
import { useState, useEffect } from 'react';
export default function UserDetail() {
    const [userData, setUserData] = useState(null);
    const [message, setMessage] = useState('');
    const access_token = localStorage.getItem('accessToken');
    const username = localStorage.getItem('userName');

    useEffect(() => {
        // Solo hacer la solicitud si tenemos un nombre de usuario y un token de acceso
        if (username && access_token) {
            // Realizar la solicitud GET para obtener los datos del usuario
            const fetchUserData = async () => {
                try {
                    const response = await fetch(`http://127.0.0.1:8000/SIAM/user/${username}/`,);

                    if (response.ok) {
                        const data = await response.json();
                        setUserData(data);  // Almacenar los datos del usuario en el estado
                    } else {
                        setMessage('Error al obtener los datos del usuario');
                    }
                } catch (error) {
                    console.error('Error en la solicitud:', error);
                    setMessage('Error en la conexión');
                }
            };

            fetchUserData();
        } else {
            setMessage('No se ha encontrado el nombre de usuario o el token de acceso.');
        }
    }, [username, access_token]);  // Dependencias: se vuelve a ejecutar si cambia el nombre de usuario o el token

    return (
            <div>
                {message && <p>{message}</p>}
                {userData ? (
                    <>
                        <h2 className='user_title'>Nombre de Usuario:</h2>
                            <h1 className='user_title username'> {userData.username}</h1>
                        <h2 className='user_title'>Email:</h2>
                            <h1 className='user_title username'> {userData.email}</h1>
                    </>
                ) : (
                    <p>Cargando información del usuario...</p>
                )}
            </div>
    );
}
