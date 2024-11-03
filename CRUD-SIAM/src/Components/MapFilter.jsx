import React, { useEffect, useState } from "react";
import './styles/MapFilter.css';

const MapFilter = ({ layers, onToggleLayer }) => {
  const [selectedLayers, setSelectedLayers] = useState({});

  // Cargar el estado de las capas desde localStorage al iniciar
  useEffect(() => {
    const savedLayers = JSON.parse(localStorage.getItem("selectedLayers")) || {};
    setSelectedLayers(savedLayers);

    // Solo activa las capas que están marcadas en el almacenamiento local
    Object.entries(savedLayers).forEach(([layerName, isVisible]) => {
      if (isVisible) {
        // Solo llama a onToggleLayer si la capa está visible y no estaba ya activada
        if (!layers.find(layer => layer.name === layerName && layer.visible)) {
          onToggleLayer(layerName, true);
        }
      }
    });
  }, [layers, onToggleLayer]);

  // Maneja el cambio de estado de una capa
  const handleToggle = (layerName) => {
    const currentVisibility = selectedLayers[layerName] || false;
    const updatedLayers = { ...selectedLayers, [layerName]: !currentVisibility };

    setSelectedLayers(updatedLayers);
    localStorage.setItem("selectedLayers", JSON.stringify(updatedLayers));

    // Llama a onToggleLayer solo si la visibilidad cambia
    if (currentVisibility !== updatedLayers[layerName]) {
      onToggleLayer(layerName, updatedLayers[layerName]);
    }
  };

  return (
    <div className="map-filter">
      <h3>Control de Capas</h3>
      {layers.map((layer) => (
        <div key={layer.name} className="layer-control">
          <input
            type="checkbox"
            id={layer.name}
            checked={selectedLayers[layer.name] || false}
            onChange={() => handleToggle(layer.name)}
          />
          <label htmlFor={layer.name}>{layer.label}</label>
        </div>
      ))}
    </div>
  );
};

export default MapFilter;
