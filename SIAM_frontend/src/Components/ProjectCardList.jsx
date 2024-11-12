// ProjectCardList.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/ProjectCard.css';
import { fetchDataFromApi } from '../services/apiService';
import ProjectCard from './ProjectCard'; 

const ProjectCardList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchProjects = async () => {
      try {
        const data = await fetchDataFromApi('projects');
        if (isMounted) setProjects(data);
      } catch (err) {
        if (isMounted) setError('Error al obtener los proyectos.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!projects.length) return <p>No hay proyectos disponibles.</p>;

  return (
    <div className="project-grid">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectCardList;
