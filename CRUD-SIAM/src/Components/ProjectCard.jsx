import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/ProjectCard.css';
import { fetchDataFromApi } from '../services/apiService';

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
          // console.log('Proyectos obtenidos:', data); // Verifica los datos en consola
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
    // Asegúrate de llamar a la función aquí
    const fetchBossName = async () => {
      try {
        const response = await fetch(`${baseUrl}/investigadors/${project_boss}/`); // Asegúrate de que la URL sea correcta
        // console.log('Respuesta de la API:', response); // Verifica si la API responde
        if (response.ok) {
          const bossData = await response.json();
          // console.log('Datos del jefe:', bossData); // Verifica los datos obtenidos
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

    fetchBossName(); // Llamada a la función dentro del useEffect
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

export default ProjectCardList;
