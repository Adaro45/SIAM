import React from 'react'
import { Link } from 'react-router-dom'
import LogIn from './LogIn'
import Register from './Register'
import Logout from './LogOut'
import "../Components/styles/Layout.css"
import "../Components/styles/Identificador.css"
import Identificador from '../Components/Identificador'
export default function Layout() {
  return (
    <>
      <div className='layout_container'>
        <h1 className=' layout_title'>  Regístrate o Inicia Sesión</h1>
        <Identificador />
        <div className="layout_buttons_box">
          <div className="layout_buttons">
            <li> <Link to="/register">Registrarse</Link></li>
          </div>
          <div className="layout_buttons">
            <li> <Link to="/login">Iniciar Sesión</Link></li>
          </div>
        </div>
      </div>
    </>
  )
}
