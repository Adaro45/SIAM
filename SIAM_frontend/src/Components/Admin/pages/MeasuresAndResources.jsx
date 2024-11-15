import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MeasuresAndResources = () => {
    const [newMeasure, setNewMeasure] = useState({ measure: null, });
    const [newResource, setNewResource] = useState({ title: '', resource: null, });
    const [measures, setMeasures] = useState([]);  // Inicializar como un array vacío
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const toBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

    const fetchData = async () => {
        try {
            const measuresResponse = await axios.get('http://127.0.0.1:8000/SIAM/measures/', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
            });
            const resourcesResponse = await axios.get('http://127.0.0.1:8000/SIAM/resources/', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
            });

            // Verificar que las respuestas sean arrays antes de asignar al estado
            setMeasures(measuresResponse.data || []);
            setResources(resourcesResponse.data || []);
        } catch (error) {
            setMessage('Error al cargar los datos.');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleInputChangeMeasure = (e) => {
      setNewMeasure({ measure: e.target.files[0] });
  };

  // Manejar cambios en inputs de recurso
  const handleInputChangeResource = (e) => {
      setNewResource({ ...newResource, [e.target.name]: e.target.value });
  };
  const handleResourceFileChange = (e) => {
    setNewResource({ ...newResource, resource: e.target.files[0] });
};

    const handleAddMeasure = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('measure', newMeasure.measure);

        try {
            await axios.post('http://127.0.0.1:8000/SIAM/measures/', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage('Medida agregada correctamente.');
            fetchData();
        } catch (error) {
            setMessage('Error al agregar la medida.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddResource = async () => {
        setLoading(true);
        try {
            const base64Resource = await toBase64(newResource.resource);
            const response = await axios.post('http://127.0.0.1:8000/SIAM/resources/', {
                title: newResource.title,
                resource: base64Resource,
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                },
            });
            setMessage('Recurso agregado correctamente.');
            fetchData();
        } catch (error) {
            setMessage('Error al agregar el recurso.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteResource = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`http://127.0.0.1:8000/SIAM/resources/${id}/delete/`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
            });
            setMessage('Recurso eliminado correctamente.');
            fetchData();
        } catch (error) {
            setMessage('Error al eliminar el recurso.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteMeasure = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`http://127.0.0.1:8000/SIAM/measures/${id}/delete/`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
            });
            setMessage('Medida eliminada correctamente.');
            fetchData();
        } catch (error) {
            setMessage('Error al eliminar la medida.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="measures-resources">
            <h2>Gestión de Recursos y Medidas</h2>
            {loading && <p>Cargando...</p>}
            {message && <p>{message}</p>}

            <div className="form">
                <h3>Agregar Medida</h3>
                <input
                    type="file"
                    name="measure"
                    onChange={handleInputChangeMeasure}
                    className="form-input file-input"
                />
                <button onClick={handleAddMeasure} className="form-button">
                    Agregar Medida
                </button>
            </div>

            <div className="table-container">
                <h3>Medidas</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Archivo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {measures.map((measure) => (
                            <tr key={measure.id}>
                                <td>
                                    <a href={`http://127.0.0.1:8000${measure.measure}`} target="_blank" rel="noopener noreferrer">
                                        {measure.measure.split('/').pop()}
                                    </a>
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteMeasure(measure.id)} className="delete-button">
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="form form_resource">
                <div className="form_resource_data">
                <h3>Agregar Recurso</h3>
                <input
                    type="text"
                    name="title"
                    placeholder="Título del recurso"
                    value={newResource.title}
                    onChange={handleInputChangeResource}
                    className="form-input"
                />
                <input
                    type="file"
                    name="resource"
                    onChange={handleResourceFileChange}
                    className="form-input file-input"
                />
                <button onClick={handleAddResource} className="form-button">
                    Agregar Recurso
                </button>
                </div>
                {newResource.resource && (
                    <div className="image-preview">
                        <img
                            src={URL.createObjectURL(newResource.resource)}
                            alt="Vista previa"
                            className="preview-image"
                        />
                    </div>
                )}
            </div>

            <div className="table-container">
                <h3>Recursos</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resources.map((resource) => (
                            <tr key={resource.id}>
                                <td>{resource.title}</td>
                                <td>
                                    <button onClick={() => handleDeleteResource(resource.id)} className="delete-button">
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MeasuresAndResources;
