// src/components/MainContent.jsx
import './styles/MainContent.css';
import ProjectCard from './ProjectCard';
import HeroSection from './HeroSection';
import Presentacion from './Presentacion';
const MainContent = () => {
    return (
        <main className="main-content">
            <section className="institution-info">
            <HeroSection/>
            </section>
            <section className="intitucion-present">
                <Presentacion/>
            </section>
            <ProjectCard/>
        </main>
    );
};

export default MainContent;
