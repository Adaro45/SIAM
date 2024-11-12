// src/components/MainContent.jsx
import './styles/MainContent.css';
import HeroSection from './HeroSection';
import Presentacion from './Presentacion';
import FeaturedProjects from './FeaturedProjects';

const MainContent = () => {
    return (
        <main className="main-content">
            <section className="institution-header">
                <HeroSection />
            </section>
            <section className="institution-present">
                <Presentacion />
            </section>
            <section className="featured-projects">
                <FeaturedProjects />
            </section>
        </main>
    );
};

export default MainContent;
