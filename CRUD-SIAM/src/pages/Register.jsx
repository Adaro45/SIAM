import React, { useState } from "react";
import axios from "axios";
import "../Components/styles/Register.css";
import Identificador from "../Components/Identificador";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) {
      return
    }

    setIsLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/SIAM/register/", formData)
      window.scrollTo(0, 0);
      navigate("/")
      window.location.reload();
    }
    catch (error) {
      console.error(error);
        }
        finally {
      setIsLoading(false)
    }
  };
  return (
    <div className="register_container">
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <h2 className="register_title">Regístrate en nuestra web:</h2>
        <Identificador/>
      <form className="register_form">
        <label className="register_labels" >Nombre de Usuario</label>
        <br />
        <input className="register_input"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        ></input>{" "}
        <br />
        <br />
        <label className="register_labels" >Correo Electrónico</label>
        <br />
        <input className="register_input"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          ></input>{" "}
        <br />
        <br />
        <label className="register_labels" >Contraseña</label>
        <br />
        <input className="register_password register_input"
          type="password"
          name="password1"
          value={formData.password1}
          onChange={handleChange}
        ></input>{" "}
        <br />
        <br />
        <label className="register_labels" >Confirme la contraseña</label>
        <br />
        <input className="register_password register_input"
          type="password"
          name="password2"
          value={formData.password2}
          onChange={handleChange}
        ></input>{" "}
        <br />
        <br />
        <button type="submit" disabled={isLoading} onClick={handleSubmit} className="register_button">
          Registrarse
        </button>
      </form>

    </div>
  );
}