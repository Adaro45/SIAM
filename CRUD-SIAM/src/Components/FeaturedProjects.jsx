import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchDataFromApi } from '../services/apiService';
import './styles/FeaturedProjects.css'; // Opcional: Estilos para este componente

const FeaturedProjects = () => {
    const [featuredProjects, setFeaturedProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true; // Evita fugas de memoria si el componente se desmonta

        const fetchProjects = async () => {
            try {
                const data = await fetchDataFromApi('projects'); // Llama a la API
                if (isMounted && Array.isArray(data)) {
                    setFeaturedProjects(data.slice(data.length - 2, data.length)); // Solo toma los 2 recentes
                }
            } catch (err) {
                if (isMounted) setError('Error al obtener los proyectos destacados.');
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchProjects(); // Ejecuta la función

        return () => {
            isMounted = false; // Limpieza al desmontar
        };
    }, []);
    const handleClick = (projectId) => {
        navigate(`/projects/${projectId}`); // Navega al detalle del proyecto
    };
    // Renderiza según el estado
    if (loading) return <p>Cargando proyectos destacados...</p>;
    if (error) return <p>{error}</p>;
    if (!featuredProjects.length) return <p>No hay proyectos destacados.</p>;


    return (
        <>
            <h1 className="projects-featured">Proyectos mas Recientes</h1>
            <div className="featured-projects-featured">
                {featuredProjects.map((project) => (
                    <div key={project.id} className="project-card-featured" onClick={()=>handleClick(project.id)}>
                        {project.resource.length > 0 ? (
                            <img
                                src={`http://127.0.0.1:8000/SIAM${project.resource[0].resource}`}
                                alt={project.title}
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
        </>);
};

export default FeaturedProjects;
