import './styles/Header.css';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const isMounted = useRef(false);
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
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            setIsScrolled(scrollTop > 50);
            isMounted.current = true; // Marcar que ya se registró el listener
        };

        if (!isMounted.current) {
            window.addEventListener('scroll', handleScroll);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <header className="header">
                <div className="logo-container">
                    <div className={`logo-movement ${isScrolled ? 'scroll' : ''}`}>
                        <img src="/IconCEAC.png" className="logo" />
                    </div>
                    <h1 className="title">SIAM</h1>
                    <h1 className="titleORG">CEAC</h1>
                </div>
                <nav className="nav">
                    <ul className="nav-list">
                        <li className="nav-item"><Link to="/">Inicio</Link></li>
                        <li className="nav-item"><Link to="/projects">Publicaciones</Link></li>
                        <li className="nav-item"><Link to="/map">Mapa Provincial</Link></li>
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
                        <Link to="/"> <div className="nav-item">Inicio</div></Link>
                        <Link to="/projects"><div className="nav-item">Publicaciones</div></Link>
                        <Link to="/map"> <div className="nav-item">Mapa Provincial</div></Link>
                        <Link to="/historia"> <div className="nav-item">Historia</div></Link>
                        <Link to="/contact"> <div className="nav-item">Contacto</div></Link>

                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
