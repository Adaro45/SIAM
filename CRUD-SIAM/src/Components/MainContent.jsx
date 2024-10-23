// src/components/MainContent.jsx
import './styles/MainContent.css';
import ProjectCard from './ProjectCard';

const MainContent = () => {
    return (
        <main className="main-content">
            <section className="institution-info">
                <h2>Centro de Estudios Ambientales de Cienfuegos</h2>
                <p>
                    Un puente al desarrollo sostenible.
                </p>
            </section>
            <ProjectCard/>
        </main>
    );
};

export default MainContent;
