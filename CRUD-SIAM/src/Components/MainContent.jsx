// src/components/MainContent.jsx
import './styles/MainContent.css';
import HeroSection from './HeroSection';
import Presentacion from './Presentacion';
import FeaturedProjects from './FeaturedProjects';
const MainContent = () => {
    return (
        <main className="main-content">
            <section className="institution-info">
            <HeroSection/>
            </section>
            <section className="intitucion-present">
                <Presentacion/>
            </section>
            <FeaturedProjects/>
        </main>
    );
};

export default MainContent;
