// ProjectCard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/ProjectCard.css';

const ProjectCard = ({ project }) => {
  const { title, description, project_boss, resource, acron, id } = project;
  const [bossName, setBossName] = useState('');
  const navigate = useNavigate();

  const baseUrl = 'http://127.0.0.1:8000/SIAM'; // Ajusta según tu entorno
  const imageUrl = resource.length > 0 ? `${baseUrl}${resource[0].resource}` : '';

  const handleClick = () => {
    navigate(`/projects/${id}`);
  };

  useEffect(() => {
    const fetchBossName = async () => {
      try {
        const response = await fetch(`${baseUrl}/investigadors/${project_boss}/`);
        if (response.ok) {
          const bossData = await response.json();
          setBossName(bossData.name);
        } else {
          console.error('Investigador no encontrado');
          setBossName('Investigador no encontrado');
        }
      } catch (error) {
        console.error('Error al obtener el nombre del investigador jefe:', error);
        setBossName('Error al cargar el nombre');
      }
    };

    fetchBossName();
  }, [project_boss]);

  return (
    <div className="project-card" onClick={handleClick}>
      {imageUrl ? (
        <img src={imageUrl} alt={title} className="project-image" />
      ) : (
        <div className="placeholder-image">Imagen no disponible</div>
      )}
      <div className="project-details">
        <h4>{acron} - {title}</h4>
        <p>{description}</p>
        <p><strong>Investigador Jefe:</strong> {bossName}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
