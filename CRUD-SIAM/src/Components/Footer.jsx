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

        <div className="footer-social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="./Facebook icono.jpeg" alt="Facebook" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img src="./Twitter X .png" alt="Twitter" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <img src="./LinkedIn.png" alt="LinkedIn" />
          </a>
        </div>

        <div className="footer-contact">
          <p><strong>Contacto:</strong> ceac@gmail.com | +53 555 5555</p>
          <p><strong>Dirección:</strong> Cienfuegos, Cuba</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
