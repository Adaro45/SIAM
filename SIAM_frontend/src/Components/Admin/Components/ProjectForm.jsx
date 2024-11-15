import { useState, useEffect } from "react";

const ProjectForm = ({ project, onSubmit, isEditing = false }) => {
    const [formData, setFormData] = useState({
        title: '',
        acron: '',
        date: '',
        results: '',
        description: '',
        inv_area: '',
        project_boss: '',  // ID único
        tecnic_boss: '',  // ID único
        leed_entity: '',  // ID único
        financed: '',  // ID único
        investigators: [],  // Lista de IDs
        entitys: [],  // Lista de IDs
        clients: [],  // Lista de IDs
        resource: [],  // Lista de IDs
        measures: '',  // ID único o null
        main_image: null,  // Archivo de imagen
    });

    const [investigators, setInvestigators] = useState([]);
    const [entities, setEntities] = useState([]);
    const [resources, setResources] = useState([]);
    const [measures, setMeasures] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        // Fetch de listas de opciones
        fetch('http://127.0.0.1:8000/SIAM/investigadors/', { headers })
            .then(response => response.json())
            .then(data => setInvestigators(data))
            .catch(error => console.error("Error fetching investigators:", error));

        fetch('http://127.0.0.1:8000/SIAM/entitys/', { headers })
            .then(response => response.json())
            .then(data => setEntities(data))
            .catch(error => console.error("Error fetching entities:", error));

        fetch('http://127.0.0.1:8000/SIAM/resources/', { headers })
            .then(response => response.json())
            .then(data => setResources(data))
            .catch(error => console.error("Error fetching resources:", error));

        fetch('http://127.0.0.1:8000/SIAM/measures/', { headers })
            .then(response => response.json())
            .then(data => setMeasures(data))
            .catch(error => console.error("Error fetching measures:", error));

        // Cargar datos del proyecto para edición
        if (isEditing && project) {
            setFormData({
                ...project,
                project_boss: project.project_boss.id,
                tecnic_boss: project.tecnic_boss.id,
                leed_entity: project.leed_entity.id,
                financed: project.financed.id,
                investigators: project.investigators.map(inv => inv.id),
                entitys: project.entitys.map(entity => entity.id),
                clients: project.clients.map(client => client.id),
                resource: project.resource.map(res => res.id),
                measures: project.measures ? project.measures.id : null,
                main_image: project.main_image || null,
            });
        }
    }, [project, isEditing]);

    const handleInputChange = (e) => {
        const { name, value, type, files, multiple, selectedOptions } = e.target;

        if (type === 'file') {
            setFormData(prevState => ({ ...prevState, main_image: files[0] }));
        } else if (multiple) {
            setFormData(prevState => ({
                ...prevState,
                [name]: Array.from(selectedOptions, option => parseInt(option.value))
            }));
        } else {
            setFormData(prevState => ({ ...prevState, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formToSend = new FormData();

        Object.keys(formData).forEach(key => {
            if (Array.isArray(formData[key])) {
                formData[key].forEach(item => formToSend.append(key, item));
            } else if (key !== 'main_image') {
                formToSend.append(key, formData[key]);
            }
        });

        if (formData.main_image) {
            formToSend.append('main_image', formData.main_image);
        }

        onSubmit(formToSend);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Título"
            />
            <input
                type="text"
                name="acron"
                value={formData.acron}
                onChange={handleInputChange}
                placeholder="Acrónimo"
            />
            <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                placeholder="Fecha"
            />
            <textarea
                name="results"
                value={formData.results}
                onChange={handleInputChange}
                placeholder="Resultados"
            />
            <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Descripción"
            />
            <input
                type="text"
                name="inv_area"
                value={formData.inv_area}
                onChange={handleInputChange}
                placeholder="Área de Investigación"
            />

            <input
                type="file"
                name="main_image"
                accept="image/*"
                onChange={handleInputChange}
            />
            {formData.main_image && <p>Imagen seleccionada: {formData.main_image.name}</p>}

            <select
                name="project_boss"
                value={formData.project_boss}
                onChange={handleInputChange}
            >
                <option value="">Seleccionar Jefe de Proyecto</option>
                {investigators.map(inv => (
                    <option key={inv.id} value={inv.id}>{inv.name}</option>
                ))}
            </select>

            <select
                name="tecnic_boss"
                value={formData.tecnic_boss}
                onChange={handleInputChange}
            >
                <option value="">Seleccionar Jefe Técnico</option>
                {investigators.map(inv => (
                    <option key={inv.id} value={inv.id}>{inv.name}</option>
                ))}
            </select>

            <select
                name="leed_entity"
                value={formData.leed_entity}
                onChange={handleInputChange}
            >
                <option value="">Seleccionar Entidad Líder</option>
                {entities.map(entity => (
                    <option key={entity.id} value={entity.id}>{entity.name}</option>
                ))}
            </select>

            <select
                name="financed"
                value={formData.financed}
                onChange={handleInputChange}
            >
                <option value="">Seleccionar Financiamiento</option>
                {entities.map(entity => (
                    <option key={entity.id} value={entity.id}>{entity.name}</option>
                ))}
            </select>

            <select
                name="investigators"
                multiple
                value={formData.investigators}
                onChange={handleInputChange}
            >
                {investigators.map(inv => (
                    <option key={inv.id} value={inv.id}>{inv.name}</option>
                ))}
            </select>

            <select
                name="entitys"
                multiple
                value={formData.entitys}
                onChange={handleInputChange}
            >
                {entities.map(entity => (
                    <option key={entity.id} value={entity.id}>{entity.name}</option>
                ))}
            </select>

            <select
                name="clients"
                multiple
                value={formData.clients}
                onChange={handleInputChange}
            >
                {entities.map(entity => (
                    <option key={entity.id} value={entity.id}>{entity.name}</option>
                ))}
            </select>

            <select
                name="resource"
                multiple
                value={formData.resource}
                onChange={handleInputChange}
            >
                {resources.map(resource => (
                    <option key={resource.id} value={resource.id}>{resource.title}</option>
                ))}
            </select>

            <select
                name="measures"
                value={formData.measures}
                onChange={handleInputChange}
            >
                <option value="">Seleccionar Medida</option>
                {measures.map(measure => (
                    <option key={measure.id} value={measure.id}>{measure.measure}</option>
                ))}
            </select>

            <button type="submit">{isEditing ? "Actualizar Proyecto" : "Crear Proyecto"}</button>
        </form>
    );
};

export default ProjectForm;
