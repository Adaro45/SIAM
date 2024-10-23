// src/components/Footer.jsx
import './styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Centro de Estudios Ambientales. Todos los derechos reservados.</p>
        <ul className="footer-links">
          <li><a href="#">Política de Privacidad</a></li>
          <li><a href="#">Términos y Condiciones</a></li>
          <li><a href="#">Contacto</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
