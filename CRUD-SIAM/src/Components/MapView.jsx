import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, WMSTileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

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

const MapView = ({ layers, geoserverUrl, workspace }) => {
  console.log("MapView se está renderizando");
  const initialCenter = [22.15, -80.44];
  const initialZoom = 9.5;
  const bounds = [
    [21.7, -81.0], // esquina suroeste
    [22.6, -79.8], // esquina noreste
  ];

  const handleMapClick = (event) => {
    const map = event.target; // El mapa donde ocurrió el clic
    const latlng = event.latlng; // Coordenadas del clic
    console.log("Clic en el mapa en:", latlng);

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
            console.log("Datos recibidos:", data);
            if (data.features.length > 0) {
              const feature = data.features[0];
              const popupContent = `<div><strong>${feature.properties.name || 'Feature'}</strong><br>${JSON.stringify(feature.properties)}</div>`;

              L.popup()
                .setLatLng(latlng)
                .setContent(popupContent)
                .openOn(map);
            } else {
              console.log("No features found for this layer at the clicked location.");
            }
          })
          .catch((error) => console.error("Error en la solicitud:", error));
      }
    });
  };

  return (
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
      style={{ height: "100vh", width: "100vw" }} // Asegúrate de que el mapa tenga tamaño
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
            opacity={layer.opacity || 1} // Asigna la opacidad de la capa
          />
        ))}
      <MapClickHandler onClick={handleMapClick} /> {/* Componente para manejar clics */}
    </MapContainer>
  );
};

export default MapView;
