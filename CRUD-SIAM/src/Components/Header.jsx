import './styles/Header.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);
const closeMenu = () => setMenuOpen(false);
    const toggleMenu = (state) => {
        if (typeof state === 'boolean') {
            setMenuOpen(state);
        } else {
            setMenuOpen((prev) => !prev);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50); // Detecta si ha hecho scroll más de 50px
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return (
        <>
            <header className={`header ${isScrolled ? 'scrolled' :''}`}>
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
                        <li className="nav-item"><Link to="/projects">Publicaciones</Link></li>
                        <li className="nav-item"><Link to="/historia">Historia</Link></li>
                        <li className="nav-item"><Link to="/contact">Contacto</Link></li>
                    </ul>
                </nav>
                <div className="hamburger" onClick={() => toggleMenu()}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                {/* Menú que se muestra al hacer clic en el hamburger */}
                <div className={`overlay ${isMenuOpen ? 'active' : ''}`} onClick={() => toggleMenu(false)}>
                    <div className="hamburger-menu overlay" onClick={(e) => e.stopPropagation()}>
                        <Link to="/" onClick={closeMenu}><div className="nav-item" >Inicio</div></Link>
                        <Link to="/projects" onClick={closeMenu}><div className="nav-item">Proyectos</div></Link>
                        <Link to="/about" onClick={closeMenu}><div className="nav-item">Nosotros</div></Link>
                        <Link to="/contact" onClick={closeMenu}><div className="nav-item">Contacto</div></Link>
                </div>
                </div>
            </header>
        </>
    );
};

export default Header;
