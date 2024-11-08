import React from 'react';
import "../Components/styles/ContactPage.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const ContactPage = () => {
  return (
    <div className="contact-page">
      <h1>Contacto - Centro de Estudios Ambientales de Cienfuegos (CEAC)</h1>

      {/* Información de Contacto */}
      <div className="contact-info">
        <h2>Información de Contacto</h2>
        <p><strong>Dirección:</strong> Apartado Postal 5, Ciudad Nuclear, Cienfuegos, Cuba</p>
        <p><strong>Teléfono:</strong> 43965746</p>
        <p><strong>Email:</strong> ceac@ceac.cu</p>
        <p><strong>Horario de Atención:</strong> Lunes a Viernes, 8:00 AM - 5:00 PM</p>
      </div>

      {/* Formulario de Contacto */}
      <div className="contact-form">
        <h2>Envíanos un Mensaje</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" id="name" name="name" placeholder="Tu nombre" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Tu email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Mensaje</label>
            <textarea id="message" name="message" rows="5" placeholder="Escribe tu mensaje aquí..." required></textarea>
          </div>
          <button type="submit" className="submit-button">Enviar</button>
        </form>
      </div>

      {/* Mapa de Ubicación */}
      <div className="location-map">
        <h2>Ubicación</h2>
        <p>Encuéntranos en Cienfuegos, Cuba:</p>
        <MapContainer 
          center={[22.12, -80.50]} 
          zoom={11.5} 
          style={{ height: "400px", width: "100%" }}
          className="map-container"
          zoomControl={false}
          maxZoom={16}
          minZoom={11.5}
          bounds={[[21.9, -80.7], [22.3, -80.3]]}  // Limites SW y NE de la zona
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[22.142338, -80.458321]}>
            <Popup>Centro de Estudios Ambientales de Cienfuegos (Ingeniería y Gestión Ambiental)</Popup>
          </Marker>
          <Marker position={[22.066285, -80.482446]}>
            <Popup>Centro de Estudios Ambientales de Cienfuegos (CEAC)</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default ContactPage;
