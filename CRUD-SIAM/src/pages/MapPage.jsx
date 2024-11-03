import React, { useState, useEffect } from "react";
import axios from "axios";
import MapFilter from "../Components/MapFilter";
import MapView from "../Components/MapView";
import '../Components/styles/MapPage.css';
import { Layer } from "leaflet";

const MapPage = () => {
    const geoserverUrl = "http://localhost:8080/geoserver";
    const workspace = "SIAM_CEAC";
    const [layers, setLayers] = useState([]);

    useEffect(() => {
        const fetchLayers = async () => {
            try {
                const response = await axios.get(
                    `${geoserverUrl}/rest/workspaces/${workspace}/layers.json`,
                    {
                        auth: {
                            username: 'admin',
                            password: 'geoserver'
                        }
                    }
                );
                const layerList = response.data.layers.layer.map((layer) => ({
                    name: layer.name,
                    label: layer.name,
                    visible: false,
                }));
                setLayers(layerList);
            } catch (error) {
                console.error("Error al cargar las capas:", error.response ? error.response.data : error.message);
            }
        };

        fetchLayers();
    }, [geoserverUrl, workspace]);

    const toggleLayerVisibility = (layerName) => {
        setLayers((prevLayers) =>
            prevLayers.map((layer) =>
                layer.name === layerName ? { ...layer, visible: !layer.visible } : layer
            )
        );
    };

    return (
        <div className="map-container">
            <aside className="map-layer-filter">
                <MapFilter layers={layers} onToggleLayer={toggleLayerVisibility} />
            </aside>
                <MapView className="map-view" layers={layers} geoserverUrl={geoserverUrl} workspace={workspace} />
        </div>
    );
};

export default MapPage;
