// src/components/HeroSection.jsx
import React from 'react';
import './styles/HeroSection.css'; // Archivo CSS específico
const HeroSection = () => {
    return (
        <>
        <section className="hero-section">
            <div className="hero-content">
            <img src="/HeroImage.jpeg"/>
            </div>
        </section>
                <div className="cta-buttons">
                    <CTAButton text="Nuestros Proyectos" link="/projects" />
                    <CTAButton text="Contáctanos" link="/contact" />
                </div>
                </>
    );
};

const CTAButton = ({ text, link }) => (
    <a href={link} className="cta-button">
        {text}
    </a>
);


export default HeroSection;
