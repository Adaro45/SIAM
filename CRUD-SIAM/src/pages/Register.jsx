import React, { useState } from "react";
import axios from "axios";
import "../Components/styles/Register.css";
import Identificador from "../Components/Identificador";
export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });

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
      console.log("Success!", response.data)
      setSuccessMessage("Registration Successful!")
    }
    catch (error) {
      console.log("Error during registration!", error.response?.data);
      if (error.response && error.response.data) {
        Object.keys(error.response.data).forEach(field => {
          const errorMessages = error.response.data[field];
          if (errorMessages && errorMessages.length > 0) {
            setError(errorMessages[0]);
          }
        })
      }
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