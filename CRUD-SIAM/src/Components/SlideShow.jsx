// src/components/Slideshow.jsx
import React, { useEffect, useState } from 'react';

const imagePaths = [
    '/images/slideshow/AcreditadoCollage.jpg',
    '/images/slideshow/CEAC25Azul.jpg',
    '/images/slideshow/CEACCEN.jpg',
    '/images/slideshow/HeroImage.jpeg',
    '/images/slideshow/laguna-guanarocaaa.jpg',
    '/images/slideshow/Paisaje.jpg',
    '/images/slideshow/PLACACEAC.jpg'
];

const Slideshow = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
        }, 10000); // Cambia cada 1 segundo

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="slideshow-container">
            <img
                src={imagePaths[currentIndex]}
                alt="Slide"
                className="main_img"
                style={{ width: '100%' }}
            />
        </div>
    );
};

export default Slideshow;
