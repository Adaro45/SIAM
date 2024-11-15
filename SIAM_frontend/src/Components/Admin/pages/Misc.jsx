import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Misc = () => {
    // Estados para manejar datos de formularios y tablas
    const [newInvestigator, setNewInvestigator] = useState({
        name: '',
        email: '',
        projects: [],
    });
    const [newEntity, setNewEntity] = useState({
        name: '',
        acron: '',
        projects: [],
    });
    const [investigators, setInvestigators] = useState([]);
    const [entities, setEntities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const [selectedInvestigator, setSelectedInvestigator] = useState(null);
    const [selectedEntity, setSelectedEntity] = useState(null);

    // Función para cargar los datos desde el backend
    const fetchData = async () => {
        try {
            const investigatorsResponse = await axios.get('http://127.0.0.1:8000/SIAM/investigadors/', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
            });
            const entitiesResponse = await axios.get('http://127.0.0.1:8000/SIAM/entitys/', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
            });

            setInvestigators(investigatorsResponse.data);
            setEntities(entitiesResponse.data);
        } catch (error) {
            setMessage('Error al cargar los datos.');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Funciones de manejo de formularios y datos
    const handleInputChange = (e, type) => {
        const { name, value } = e.target;
        if (type === 'investigator') {
            setNewInvestigator((prev) => ({ ...prev, [name]: value }));
        } else if (type === 'entity') {
            setNewEntity((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleInvestigatorSelect = (investigator) => {
        setSelectedInvestigator(investigator);
        setNewInvestigator({
            name: investigator.name,
            email: investigator.email,
            projects: investigator.projects,
        });
    };

    const handleEntitySelect = (entity) => {
        setSelectedEntity(entity);
        setNewEntity({
            name: entity.name,
            acron: entity.acron,
            projects: entity.projects,
        });
    };

    // Funciones de agregar y actualizar datos (Investigadores y Entidades)
    const handleAddInvestigator = async () => {
        setLoading(true);
        try {
            await axios.post('http://127.0.0.1:8000/SIAM/investigadors/', newInvestigator, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
            });
            setMessage('Investigador agregado correctamente.');
            setLoading(false);
            fetchData(); // Recargar los datos
        } catch (error) {
            setMessage('Error al agregar el investigador.');
            setLoading(false);
        }
    };

    const handleUpdateInvestigator = async () => {
        setLoading(true);
        try {
            await axios.put(`http://127.0.0.1:8000/SIAM/investigadors/${selectedInvestigator.id}/`, newInvestigator, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
            });
            setMessage('Investigador actualizado correctamente.');
            setLoading(false);
            fetchData(); // Recargar los datos
        } catch (error) {
            setMessage('Error al actualizar el investigador.');
            setLoading(false);
        }
    };

    const handleAddEntity = async () => {
        setLoading(true);
        try {
            await axios.post('http://127.0.0.1:8000/SIAM/entitys/', newEntity, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
            });
            setMessage('Entidad agregada correctamente.');
            setLoading(false);
            fetchData(); // Recargar los datos
        } catch (error) {
            setMessage('Error al agregar la entidad.');
            setLoading(false);
        }
    };

    const handleUpdateEntity = async () => {
        setLoading(true);
        try {
            await axios.put(`http://127.0.0.1:8000/SIAM/entitys/${selectedEntity.id}/`, newEntity, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
            });
            setMessage('Entidad actualizada correctamente.');
            setLoading(false);
            fetchData(); // Recargar los datos
        } catch (error) {
            setMessage('Error al actualizar la entidad.');
            setLoading(false);
        }
    };

    // Funciones de eliminación
    const handleDelete = async (url, id) => {
        setLoading(true);
        try {
            await axios.delete(`http://127.0.0.1:8000/SIAM/${url}/${id}/`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
            });
            setMessage('Elemento eliminado correctamente.');
            setLoading(false);
            fetchData(); // Recargar los datos
        } catch (error) {
            setMessage('Error al eliminar el elemento.');
            setLoading(false);
        }
    };

    return (
        <div className="misc">
            <h2 className="misc__title">Gestión de Investigadores y Entidades</h2>
            {loading && <p className="loading">Cargando...</p>}
            {message && <p className="message">{message}</p>}
            <div className="forms">
                {/* Formulario para agregar un Investigador */}
                <div className="form">
                    <h3 className="form-title">Agregar Investigador</h3>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre del Investigador"
                        value={newInvestigator.name}
                        onChange={(e) => handleInputChange(e, 'investigator')}
                        className="form-input"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email del Investigador"
                        value={newInvestigator.email}
                        onChange={(e) => handleInputChange(e, 'investigator')}
                        className="form-input"
                    />
                    <button onClick={handleAddInvestigator} className="form-button">
                        Agregar Investigador
                    </button>
                </div>

                {/* Formulario para actualizar un Investigador */}
                {selectedInvestigator && (
                    <div className="form">
                        <h3 className="form-title">Actualizar Investigador</h3>
                        <input
                            type="text"
                            name="name"
                            placeholder="Nombre del Investigador"
                            value={newInvestigator.name}
                            onChange={(e) => handleInputChange(e, 'investigator')}
                            className="form-input"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email del Investigador"
                            value={newInvestigator.email}
                            onChange={(e) => handleInputChange(e, 'investigator')}
                            className="form-input"
                        />
                        <button onClick={handleUpdateInvestigator} className="form-button">
                            Actualizar Investigador
                        </button>
                    </div>
                )}
            </div>
            {/* Tabla de Investigadores */}
            <div className="table-container">
                <h3 className="table-title">Investigadores</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {investigators.map((investigator) => (
                            <tr key={investigator.id}>
                                <td>{investigator.name}</td>
                                <td>{investigator.email}</td>
                                <td>
                                    <button onClick={() => handleInvestigatorSelect(investigator)} className="edit-button">Editar</button>
                                    <button onClick={() => handleDelete('investigadors', investigator.id)} className="delete-button">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="forms">

                {/* Formulario para agregar una Entidad */}
                <div className="form">
                    <h3 className="form-title">Agregar Entidad</h3>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre de la Entidad"
                        value={newEntity.name}
                        onChange={(e) => handleInputChange(e, 'entity')}
                        className="form-input"
                    />
                    <input
                        type="text"
                        name="acron"
                        placeholder="Acrónimo de la Entidad"
                        value={newEntity.acron}
                        onChange={(e) => handleInputChange(e, 'entity')}
                        className="form-input"
                    />
                    <button onClick={handleAddEntity} className="form-button">
                        Agregar Entidad
                    </button>
                </div>

                {/* Formulario para actualizar una Entidad */}
                {selectedEntity && (
                    <div className="form">
                        <h3 className="form-title">Actualizar Entidad</h3>
                        <input
                            type="text"
                            name="name"
                            placeholder="Nombre de la Entidad"
                            value={newEntity.name}
                            onChange={(e) => handleInputChange(e, 'entity')}
                            className="form-input"
                        />
                        <input
                            type="text"
                            name="acron"
                            placeholder="Acrónimo de la Entidad"
                            value={newEntity.acron}
                            onChange={(e) => handleInputChange(e, 'entity')}
                            className="form-input"
                        />
                        <button onClick={handleUpdateEntity} className="__form-button">
                            Actualizar Entidad
                        </button>
                    </div>
                )}
            </div>
            {/* Tabla de Entidades */}
            <div className="table-container">
                <h3 className="table-title">Entidades</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Acrónimo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entities.map((entity) => (
                            <tr key={entity.id}>
                                <td>{entity.name}</td>
                                <td>{entity.acron}</td>
                                <td>
                                    <button onClick={() => handleEntitySelect(entity)} className="edit-button">Editar</button>
                                    <button onClick={() => handleDelete('entitys', entity.id)} className="delete-button">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Misc;
