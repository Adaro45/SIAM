import React from "react";
import "./styles/Presentacion.css";

const Presentacion = () => {
    return (<>
        <section className="presentacion-centro">
            <div className="content">
                <h2>Centro de Estudios Ambientales de Cienfuegos (CEAC)</h2>
                <p>
                    Fundado en 1999 como una unidad de ciencia y técnica del Ministerio de Ciencia,
                    Tecnología y Medio Ambiente (CITMA), el CEAC se ubica en la Ciudad Nuclear de Cienfuegos.
                    Sus raíces se remontan a la década de 1980, con el nacimiento del Laboratorio de Control
                    Radiológico Externo (LCRE) y un grupo nacional enfocado en el estudio de microalgas.
                </p>
                <p>
                    En 1987, el LCRE se integró a la red nacional de laboratorios de control radiológico,
                    especializándose en vigilancia ambiental y estudios del "fondo cero" del emplazamiento nuclear.
                    En 1992, evolucionó hacia el Laboratorio de Vigilancia Radiológica Ambiental del Centro (LVRAC).
                </p>
                <p>
                    El 3 de noviembre de 1999, se fusionaron el Laboratorio de Algología, el Grupo Nacional de
                    Estudios de Microalgas de agua dulce y el LVRAC, dando lugar al CEAC. Desde entonces, su
                    misión ha sido abordar problemas ambientales y contribuir a la sostenibilidad mediante
                    técnicas avanzadas, excelencia en servicios analíticos y académicos, y constante innovación.
                </p>
                <p>
                    El CEAC es reconocido por el Organismo Internacional de Energía Atómica (OIEA) como
                    Centro de Referencia Regional en el uso de técnicas nucleares para la gestión integrada
                    costera desde el año 2007.
                </p>
                <div className="achievements">
                    <h3>Logros Destacados:</h3>
                    <ul>
                        <li>Más de 25 años de experiencia en investigación ambiental.</li>
                        <li>Centro de referencia para técnicas nucleares desde 2007.</li>
                        <li>Desarrollo de proyectos innovadores en sostenibilidad.</li>
                    </ul>
                </div>
            </div>

            <div className="aniversario">
                <img src="./25.png" alt="25 Años del Centro CEAC" />
            </div>
        </section>
        <section className="descripcion-siam">
            <h2>Descripción del Sistema de Información Ambiental (SIAM)</h2>
            <ul>
                <li>
                    El Sistema de Información Ambiental (SIAM) del Centro de Estudios Ambientales de Cienfuegos (CEAC) tiene como objetivo centralizar y hacer accesible información ambiental clave de la región de Cienfuegos, Cuba. A través de un diseño intuitivo, el SIAM permite a investigadores, autoridades y al público en general explorar datos geoespaciales y acceder a informes y estudios relevantes.
                </li>
                <li>
                    El portal incluye un mapa interactivo donde los usuarios pueden visualizar capas de información ambiental, facilitando el análisis de aspectos como biodiversidad, calidad del aire y riesgos ambientales. También ofrece un catálogo de datos descargable, una sección de proyectos con detalles sobre investigaciones activas y terminadas, y un repositorio de publicaciones para compartir resultados científicos.
                </li>
                <li>
                    La finalidad del SIAM es optimizar la gestión de la información ambiental, promover la transparencia y fortalecer la toma de decisiones informadas sobre la conservación y uso de los recursos naturales en Cienfuegos. Al reunir la información en un solo lugar y hacerla fácilmente accesible, el SIAM facilita el flujo de conocimiento, mejora la colaboración científica y contribuye al desarrollo sostenible de la región.
                </li>
            </ul>

        </section>
    </>
    );
};

export default Presentacion;
