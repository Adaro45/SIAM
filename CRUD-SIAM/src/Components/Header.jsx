import './styles/Header.css';
import { useState,useEffect } from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
    const [isScrolled,setIsScrolled] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50); // Detecta si ha hecho scroll más de 50px
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return (
        <>
        <header className={`header ${isScrolled ? 'scrolled':''}`}>
            <div className="logo-container">
                <div className='logo-movement'>
                <img src="/IconCEAC.png" className="logo" />
                </div>
                <h1 className="title">SIAM</h1>
                <h1 className="titleORG">CEAC</h1>
            </div>
            <nav className="nav">
                <ul className="nav-list">
                    <li className="nav-item"><Link to="/">Inicio</Link></li>
                    <li className="nav-item"><Link to="/projects">Proyectos</Link></li>
                    <li className="nav-item"><Link to="/about">Nosotros</Link></li>
                    <li className="nav-item"><Link to="/contact">Contacto</Link></li>
                </ul>
            </nav>
        </header>
        </>
    );
};

export default Header;
