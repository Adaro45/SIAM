import React, { useState , useContext} from "react";
import axios from "axios";
import HomePage from "./HomePage";
import "../Components/styles/LogIn.css"
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "../Components/styles/Identificador.css"
import Identificador from '../Components/Identificador'
export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate();
    const { logInUser } = useContext(UserContext);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoading) {
            return
        }

        setIsLoading(true);

        try {
            const response = await axios.post("http://127.0.0.1:8000/SIAM/login/", formData)
            console.log("Success!", response.data)
            localStorage.setItem("accessToken", response.data.tokens.access);
            localStorage.setItem("refreshToken", response.data.tokens.refresh)
            localStorage.setItem("userName", formData.email)
            logInUser(formData.email)
            setIsAuthenticated(true);
            navigate("/")
            window.location.reload();
        }
        catch (error) {
            console.log("Error during Login!", error.response?.data);
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
        <div className="log_container">
            {error && <p style={{ color: "red" }}>{error}</p>}
            {isAuthenticated ? (
                <Navigate to="/" />
                //como utilizo el userContext para actualizar el componente cuado se redirige hacia "/"
                ) : (
                <div className="login_container">
                    <h2 className="login_title">Inicia Sesión</h2>
                    <Identificador/>
                    <form className="login_form">

                        <label className="login_labels">Nombre de Usuario</label>
                        <br />
                        <input className="login_inputs"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        ></input>{" "}
                        <br />
                        <br />
                        <label className="login_labels">Contraseña</label>
                        <br />
                        <input className="login_inputs"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        ></input>{" "}

                        <br />
                        <br />
                        <button type="submit" disabled={isLoading} onClick={handleSubmit} className="login_button">
                            Iniciar Sesión
                        </button>
                    </form>
                </div>
            )}
        </div>
    )
}