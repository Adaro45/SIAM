import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchDataFromApi } from '../services/apiService';
import './styles/FeaturedProjects.css';

const FeaturedProjects = () => {
    const [featuredProjects, setFeaturedProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;

        const fetchProjects = async () => {
            try {
                const data = await fetchDataFromApi('projects');
                if (isMounted && Array.isArray(data)) {
                    setFeaturedProjects(data.slice(-2)); // Solo toma los 2 recientes
                }
            } catch (err) {
                if (isMounted) setError('Error al obtener los proyectos destacados.');
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchProjects();

        return () => {
            isMounted = false;
        };
    }, []);

    const handleClick = (projectId) => {
        navigate(`/projects/${projectId}`);
    };

    if (loading) return <p>Cargando proyectos destacados...</p>;
    if (error) return <div>
        <p>{error}</p>
        <button onClick={() => fetchProjects()}>Reintentar</button>
    </div>;
    if (!featuredProjects.length) return <p>No hay proyectos destacados.</p>;

    return (
        <>
            <h1 className="projects-featured">Proyectos más Recientes</h1>
            <div className="featured-projects-featured">
                {featuredProjects.map((project) => (
                    <div key={project.id} className="project-card-featured" onClick={() => handleClick(project.id)} aria-label={`Ir a detalles de ${project.title}`}>
                        {project.resource.length > 0 ? (
                            <img
                                src={`http://127.0.0.1:8000/SIAM${project.resource[0].resource}`}
                                alt={`Imagen de ${project.title}`}
                                className="project-image-featured"
                            />
                        ) : (
                            <div className="placeholder-image">Imagen no disponible</div>
                        )}
                        <div className="project-details-featured">
                            <h4>{project.acron} - {project.title}</h4>
                            <p>{project.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default FeaturedProjects;
