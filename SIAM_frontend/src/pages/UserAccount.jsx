import React, { useState } from 'react';
import "../Components/styles/UserAccount.css";
import Identificador from "../Components/Identificador";
import UserDetail from '../Components/UserDetail';
export default function UserAccount() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const access_token = localStorage.getItem('accessToken');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!access_token) {
      setMessage('Error: No se encontró el token de autenticación.');
      return;
    }

    // Validación de contraseñas
    if (newPassword !== confirmPassword) {
      setMessage('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/SIAM/user/${localStorage.getItem('userName')}/${password}/update/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`, // Agrega el token
        },
        body: JSON.stringify({
          username: username || undefined, // Solo enviar campos si tienen valor
          email: email || undefined,
          new_password: newPassword || undefined, // Nueva contraseña
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setEmail(data.email);
        setUsername(data.username);
        localStorage.setItem('userName', data.username);
        window.location.reload();
        setMessage('Cuenta actualizada exitosamente');
      } else if (response.status === 400) {
        const errorData = await response.json();
        setMessage(errorData.detail || 'Error al actualizar');
      } else {
        setMessage('Ocurrió un error al actualizar la cuenta');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setMessage('Error en la conexión');
    }
  };

  return (
    <div className="user_account_container">
      <Identificador />
      <div className="user_account_data"><UserDetail/></div>
      <form onSubmit={handleSubmit} className="user_account_update">
        <label className='user_label' htmlFor="username">Cambiar nombre de Usuario:</label>
        <input 
          className="user_input"
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label className='user_label' htmlFor="email">Email:</label>
        <input 
          className="user_input"
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className='user_label' htmlFor="password">Tu Actual Contraseña:</label>
        <input 
          className="user_input"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label className='user_label' htmlFor="newPassword">Nueva Contraseña:</label>
        <input 
          className="user_input"
          type="password"
          id="newPassword"
          name="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
        <input 
          className="user_input"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <h3 className="user_message">Esta accion no se puede deshacer</h3>
        <button className='register_button' type="submit">Actualizar</button>
        {message && <p className='user_message'>{message}</p>}
        <button className='logout_button_cerrar' onClick={() => window.location.href = '/login'}>Cerrar Sesión</button>
        
      </form>

    </div>
  );
}
