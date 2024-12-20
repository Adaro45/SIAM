import React, { useEffect, useState } from 'react';
import "../Components/styles/Slideshow.css"

const imagePaths = [//poner resulicion para las imagenes
    '/images/slideshow/Edificio CEAC.jpg',
];

const Slideshow = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setFade(false); // Inicia el desvanecimiento
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
                setFade(true); // Activa la opacidad de nuevo
            }, 500); // Tiempo de la transición
        }, 5000); // Cambia cada 10 segundos

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="slideshow-container">
            <img
                src={imagePaths[currentIndex]}
                alt="Slide"
                className="main_img"
                style={{ opacity: fade ? 1 : 0.5 }} // Controla la opacidad
            />
        </div>
    );
};

export default Slideshow;
