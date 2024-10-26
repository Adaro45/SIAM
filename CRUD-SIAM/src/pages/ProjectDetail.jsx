import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../Components/styles/ProjectDetail.css';

// Define fetchDataFromApi aquí para evitar errores
const fetchDataFromApi = async (endpoint) => {
    const baseUrl = 'http://127.0.0.1:8000/SIAM'; // Ajusta según tu entorno
    const response = await fetch(`${baseUrl}/${endpoint}/`);
    console.log(response.json)
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
                    // console.log('Proyecto obtenido:', data);
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
    const [bossName, setBossName] = useState('');
    const [tecnicBoss, settecnicBossName] = useState('');
    const { 
        title, acron, date, results, description, princ_img, 
        inv_area, investigators, project_boss, tecnic_boss, 
        entitys, clients, resource 
    } = project;
    
    const baseUrl = 'http://127.0.0.1:8000/SIAM';

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
    }, [setBossName]);

    useEffect(() => {
        const fetchBossName = async () => {
            try {
                const response = await fetch(`${baseUrl}/investigadors/${tecnic_boss}/`);
                if (response.ok) {
                    const tecnicBoss = await response.json();
                    settecnicBossName(tecnicBoss.name);
                } else {
                    settecnicBossName('Investigador no encontrado');
                }
            } catch (error) {
                console.error('Error al obtener el nombre del investigador jefe tecnico :', error);
                settecnicBossName('Error al cargar el nombre');
            }
        };
    
        fetchBossName();
    }, [settecnicBossName]);

    return (
        <div className="project-detail">
            <div>
            {/* Imagen principal */}
            <img src={`${baseUrl}${princ_img}`} alt={title} className="project-image-detail" />
                {/* Galería de imágenes adicionales */}
                {resource.length > 0 && (
                    <div className="project-gallery">
                        <h5>Imágenes adicionales:</h5>
                        <div className="image-grid">
                            {resource.map((res, index) => (
                                <img
                                    key={index}
                                    src={`${baseUrl}${res.resource}`}
                                    alt={res.title}
                                    className="additional-image"
                                />
                            ))}
                        </div>
                    </div>
                )}
                </div>
            {/* Detalles del proyecto */}
            <div className="project-details">
                <h4>{acron} - {title}</h4>
                <p className='project-details_pha'><strong>Fecha:</strong> {date}</p>
                <p className='project-details_pha'><strong>Área:</strong> {inv_area}</p>
                <p className='project-details_pha'><strong>Descripción:</strong> {description}</p>
                <p className='project-details_pha'><strong>Resultados:</strong> {results}</p>
                {/* Jefes */}
                <p className='project-details_pha'><strong>Investigador Jefe:</strong> {bossName}</p>
                <p className='project-details_pha'><strong>Jefe Técnico:</strong> {tecnicBoss}</p>
                {/* Investigadores */}
                <div className='investigators_card'>
                <h5 className='project-details_pha'>Investigadores:</h5>
                <ul >
                    {investigators.map(inv => (
                        <li key={inv.id}>{inv.name}</li>
                    ))}
                </ul>
                </div>
                <div className="entity_card project-details_pha">
                {/* Entidades */}
                <h5 className='project-details_pha' >Entidades Asociadas:</h5>
                <ul>
                    {entitys.map(ent => (
                        <li key={ent.id}>{ent.name} ({ent.acron})</li>
                    ))}
                </ul>
                </div>
                <div className="client_card project-details_pha">
                {/* Clientes */}
                <h5>Clientes:</h5>
                <ul>
                    {clients.map(client => (
                        <li key={client.id}>{client.name} ({client.acron})</li>
                        ))}
                </ul>
                </div>
                <div className="gallery_resposive">
                {resource.length > 0 && (
                    <div className="project-gallery-responsive">
                        <h5>Imágenes adicionales:</h5>
                        <div className="image-grid">
                            {resource.map((res, index) => (
                                <img
                                    key={index}
                                    src={`${baseUrl}${res.resource}`}
                                    alt={res.title}
                                    className="additional-image"
                                />
                                ))}
                                </div>
                        </div>
                )}
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;
