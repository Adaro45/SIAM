import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../Components/styles/ProjectDetail.css';

// Define fetchDataFromApi aquí para evitar errores
const fetchDataFromApi = async (endpoint) => {
    const baseUrl = 'http://127.0.0.1:8000/SIAM'; // Ajusta según tu entorno
    const response = await fetch(`${baseUrl}/${endpoint}/`);
    if (!response.ok) {
        throw new Error('Error al obtener los datos');
    }
    return await response.json();
};

const ProjectDetail = () => {
    const { id } = useParams(); // Obtener el ID del proyecto desde la URL
    const [project, setProject] = useState(null); // Estado para el proyecto específico
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true; // Previene actualizaciones si el componente se desmonta

        const fetchProject = async () => {
            try {
                const data = await fetchDataFromApi(`projects/${id}`); // Llama al endpoint con el ID del proyecto
                if (isMounted) {
                    console.log('Proyecto obtenido:', data);
                    setProject(data);
                }
            } catch (err) {
                console.error(err);
                if (isMounted) setError('Error al obtener el proyecto.');
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchProject();

        return () => {
            isMounted = false; // Limpia al desmontar
        };
    }, [id]);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!project) return <p>No se encontró el proyecto.</p>;

    return <ProjectDetailCard project={project} />; // Renderiza la tarjeta del proyecto
};

const ProjectDetailCard = ({ project }) => {
    const { title, results, description, project_boss, resource, acron, measure } = project;
    const [bossName, setBossName] = useState('');
    const baseUrl = 'http://127.0.0.1:8000/SIAM';

    // Primer recurso como imagen destacada
    const mainImageUrl = resource.length > 0 ? `${baseUrl}${resource[0].resource}` : '';

    useEffect(() => {
        const fetchBossName = async () => {
            try {
                const response = await fetch(`${baseUrl}/investigadors/${project_boss}/`);
                if (response.ok) {
                    const bossData = await response.json();
                    setBossName(bossData.name);
                } else {
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
        <div className="project-detail">
            {/* Imagen destacada */}
            {mainImageUrl ? (
                <img src={mainImageUrl} alt={title} className="project-image" />
            ) : (
                <div className="placeholder-image">Imagen no disponible</div>
            )}

            {/* Detalles del proyecto */}
            <div className="project-details">
                <h4>{acron} - {title}</h4>
                <p>{description}</p>
                <p>{results}</p>
                <p><strong>Investigador Jefe:</strong> {bossName}</p>

                {/* Documento asociado */}
                {document && (
                    <div className="project-document">
                        <h5>Mediciones del Proyecto:</h5>
                        <a href={`${baseUrl}${measure}`} target="_blank" rel="noopener noreferrer">
                            Descargar documento
                        </a>
                    </div>
                )}

                {/* Galería de recursos adicionales */}
                {resource.length > 1 && (
                    <div className="project-gallery">
                        <h5>Imágenes adicionales:</h5>
                        <div className="image-grid">
                            {resource.slice(1).map((res, index) => (
                                <img
                                    key={index}
                                    src={`${baseUrl}${res.resource}`}
                                    alt={`Recurso ${index + 1}`}
                                    className="additional-image"
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectDetail;
