// ProjectCardList.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/ProjectCard.css';
import { fetchDataFromApi } from '../services/apiService';
import ProjectCard from './ProjectCard'; // Asegúrate de la ruta correcta

const ProjectCardList = () => {
    const [projects, setProjects] = useState([]); // Estado para los proyectos
    const [loading, setLoading] = useState(true); // Estado de carga
    const [error, setError] = useState(null); // Estado de error
    const navigate = useNavigate();

    // useEffect para obtener los datos al montar el componente
    useEffect(() => {
        let isMounted = true; // Para evitar fugas de memoria si el componente se desmonta

        const fetchProjects = async () => {
            try {
                const data = await fetchDataFromApi('projects'); // Llama al endpoint

                if (isMounted) {
                    setProjects(data); // Guarda los proyectos en el estado
                }
            } catch (err) {
                if (isMounted) setError('Error al obtener los proyectos.');
            } finally {
                if (isMounted) setLoading(false); // Finaliza el estado de carga
            }
        };

        fetchProjects(); // Ejecuta la función

        return () => {
            isMounted = false; // Limpieza al desmontar
        };
    }, []); // Solo se ejecuta una vez al montar

    // Renderiza según el estado
    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!projects.length) return <p>No hay proyectos disponibles.</p>;

    return (
        <div className="project-list">
            {projects.map((project) => (
                <ProjectCard key={project.id} project={project} /> // Renderiza cada tarjeta
            ))}
        </div>
    );
};

export default ProjectCardList;
