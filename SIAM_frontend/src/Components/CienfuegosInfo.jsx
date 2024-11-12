import React from "react";
import "./styles/CienfuegosInfo.css";

const RegionInfo = () => {
    return (
        <section className="region-info">
            <div className="content">
                <h2>Información geográfica sobre la Provincia de Cienfuegos</h2>
                <p>
                    La provincia de Cienfuegos, en la región sur-central de Cuba, se extiende sobre el 3,77 % de la superficie nacional,
                    abarcando 4177,2 km² y limitando al norte con Villa Clara, al este con Sancti Spíritus, al oeste con Matanzas,
                    y al sur con el Mar Caribe.
                </p>
                <p>
                    El clima en Cienfuegos es templado y húmedo, con una temperatura promedio anual de 26 °C. Los veranos suelen tener
                    temperaturas máximas entre 31 y 33 °C, mientras que los inviernos son suaves, con mínimas de entre 18 y 21 °C que
                    pueden bajar a 10 °C en presencia de frentes fríos. Las precipitaciones anuales promedian 1400 mm, y los vientos
                    predominan desde el noreste en la madrugada y desde el suroeste durante el día, moderados por la bahía y las
                    cercanas masas de agua.
                </p>
                <p>
                    La bahía de Cienfuegos es un importante accidente geográfico de la región, con una extensión norte-sur de 22 km y
                    un ancho este-oeste de 13 km, cubriendo un área de 88 km². Este cuerpo de agua, conectado al Caribe por un canal de
                    3 km, actúa como barrera natural que reduce la posibilidad de penetraciones del mar y protege la región costera.
                    Además, la presencia de una fosa profunda y acantilados frente al litoral caribeño aporta mayor seguridad frente a
                    los fenómenos marítimos extremos.
                </p>
            </div>
        </section>
    );
};

export default RegionInfo;
