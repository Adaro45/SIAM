import React, { useEffect } from "react";
import { MapContainer, TileLayer, WMSTileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MapFilter from "./MapFilter"; // Asegúrate de que la ruta es correcta

const MapClickHandler = ({ onClick }) => {
  const map = useMap();

  useEffect(() => {
    const handleClick = (event) => {
      console.log("Clic en el mapa en:", event.latlng);
      if (onClick) onClick(event);
    };

    map.on("click", handleClick);

    return () => {
      map.off("click", handleClick);
    };
  }, [map, onClick]);

  return null; // Este componente no necesita renderizar nada
};

const MapView = ({ layers, geoserverUrl, workspace, onToggleLayer }) => {
  console.log("MapView se está renderizando");
  const initialCenter = [22.15, -80.44];
  const initialZoom = 9.5;
  const bounds = [
    [21.7, -81.0], // esquina suroeste
    [22.6, -79.8], // esquina noreste
  ];

  const handleMapClick = (event) => {
    const map = event.target;
    const latlng = event.latlng;

    layers.forEach((layer) => {
      if (layer.visible) {
        const url = `${geoserverUrl}/${workspace}/wms?service=WMS&version=1.1.0&request=GetFeatureInfo&layers=${workspace}:${layer.name}&query_layers=${workspace}:${layer.name}&bbox=${map.getBounds().toBBoxString()}&width=${map.getSize().x}&height=${map.getSize().y}&x=${Math.round(event.containerPoint.x)}&y=${Math.round(event.containerPoint.y)}&info_format=application/json`;

        console.log("URL de GetFeatureInfo:", url);

        fetch(url)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Error fetching feature info: ${response.statusText}`);
            }
            return response.json();
          })
          .then((data) => {
            if (data.features.length > 0) {
              const feature = data.features[0];
              const properties = feature.properties;

              // Lista de campos a ignorar
              const camposIgnorados = [
                "OID_", "POINT_X", "POINT_Y", "POINT_Z",
                "Shape_Leng", "Shape_Area", "PROM", "mi_update",
                "mi_command", "mi_prinx", "numero", "fechacreac",
                "fechacambi", "provincia"
              ];

              // Mapeo de nombres de propiedades a nombres amigables
              const nombresAmigables = {
                "Name": "Nombre",
                "CUENCA": "Cuenca",
                "ÁREA_KM2": "Área (km²)",
                "PERÍmETRO": "Perímetro",
                "RÍoS_KM": "Ríos (km)",
                "FLUVIAL": "Área fluvial",
                "SUM_POBL": "Suma de población",
                "DENS_POBL": "Densidad de población"
              };

              // Crear contenido para el popup, ignorando campos vacíos y campos innecesarios
              let popupContent = `<div><strong>${properties.Name || 'Feature'}</strong><br><ul>`;

              Object.keys(properties).forEach((key) => {
                const value = properties[key];

                // Filtrar campos no deseados y vacíos
                if (!camposIgnorados.includes(key) && value !== null && value !== "" && value !== undefined) {
                  // Decodificar caracteres especiales
                  const decodedValue = decodeURIComponent(escape(value));
                  const nombreAmigable = nombresAmigables[key] || key.replace(/_/g, " ");
                  popupContent += `<li><strong>${nombreAmigable}:</strong> ${decodedValue}</li>`;
                }
              });

              popupContent += `</ul></div>`;

              // Mostrar el popup en la ubicación del clic con ajuste automático de posición
              L.popup({ autoPan: true, keepInView: true, maxWidth: 250 })
                .setLatLng(latlng)
                .setContent(popupContent)
                .openOn(map);
            } else {
              console.log("No se encontraron entidades en esta ubicación.");
            }
          })
          .catch((error) => console.error("Error en la solicitud:", error));
      }
    });
  };

  return (
    <div className="map-container" style={{ position: 'relative', height: '100vh', width: '100vw' }}>
      <MapFilter layers={layers} onToggleLayer={onToggleLayer} />
      <MapContainer
        center={initialCenter}
        zoom={initialZoom}
        minZoom={initialZoom}
        maxBounds={bounds}
        className="map-container"
        whenCreated={(mapInstance) => {
          console.log("Mapa creado", mapInstance);
        }}
        zoomControl={false}
        style={{ height: "100%", width: "100%" }} // Asegúrate de que el mapa tenga tamaño
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {layers
          .filter((layer) => layer.visible)
          .map((layer) => (
            <WMSTileLayer
              key={`${workspace}:${layer.name}`} // Asegúrate de que la clave sea única
              url={`${geoserverUrl}/${workspace}/wms`}
              layers={`${workspace}:${layer.name}`}
              format="image/png"
              transparent={true}
              crossOrigin="anonymous"
              opacity={0.7} // Asigna la opacidad de la capa
            />
          ))}
        <MapClickHandler onClick={handleMapClick} /> {/* Componente para manejar clics */}
      </MapContainer>
    </div>
  );
};

export default MapView;
