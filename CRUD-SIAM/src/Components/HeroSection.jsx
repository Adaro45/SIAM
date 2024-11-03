import React, { useEffect } from 'react';
import './styles/HeroSection.css'; // Archivo CSS específico

const HeroSection = () => {
    useEffect(() => {
        const buttons = document.querySelectorAll('.cta-button');
        buttons.forEach((button, index) => {
            button.style.transitionDelay = `${index * 100}ms`; // Efecto de aparición
            button.classList.add('fade-in');
        });
    }, []);

    return (
        <section className="hero-section">
            <div className="hero-content">
                <img src="/HeroImage.jpeg" alt="Hero" />
                <div className="text-container">
                    <h1 className="hero-title">Un puente al desarrollo sostenible</h1>
                    <div className="cta-buttons">
                        <CTAButton text="Nuestros Proyectos" link="/projects" />
                        <CTAButton text="Nuestros Historia" link="/historia" />
                        <CTAButton text="Contáctanos" link="/contact" />
                    </div>
                </div>
            </div>
        </section>
    );
};

const CTAButton = ({ text, link }) => (
    <a href={link} className="cta-button">
        {text}
    </a>
);

export default HeroSection;


