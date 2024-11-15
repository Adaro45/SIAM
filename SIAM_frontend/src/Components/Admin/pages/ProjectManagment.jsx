import React, { useState, useEffect } from "react";
import ProjectList from "../Components/ProjectList";  // Para listar proyectos
import ProjectForm from "../Components/ProjectForm";  // Para crear o editar un proyecto

const ProjectManagement = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // Obtener proyectos desde el backend
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        fetch('http://127.0.0.1:8000/SIAM/projects/', { headers })
            .then(response => response.json())
            .then(data => setProjects(data))
            .catch(error => console.error("Error fetching projects:", error));
    }, []);

    // Función para crear un nuevo proyecto
    const handleCreateProject = (formData) => {
        const token = localStorage.getItem('accessToken');
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        fetch('http://127.0.0.1:8000/SIAM/projects/', {
            method: 'POST',
            headers: headers,
            body: formData,  // Enviar FormData en lugar de JSON
        })
            .then(response => response.json())
            .then(data => {
                setProjects([...projects, data]);
                console.log(data)
            })
            .catch(error => console.error("Error creating project:", error));
    };

    // Función para actualizar un proyecto
    const handleUpdateProject = (projectId, formData) => {
        const token = localStorage.getItem('accessToken');
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        fetch(`http://127.0.0.1:8000/SIAM/projects/${projectId}/`, {
            method: 'PUT',
            headers: headers,
            body: formData,  // Enviar FormData en lugar de JSON
        })
            .then(response => response.json())
            .then(data => {
                const updatedProjects = projects.map(project =>
                    project.id === projectId ? data : project
                );
                setProjects(updatedProjects);
                setIsEditing(false);
                setSelectedProject(null);
            })
            .catch(error => console.error("Error updating project:", error));
    };

    // Función para eliminar un proyecto
    const handleDeleteProject = (projectId) => {
        const token = localStorage.getItem('accessToken');
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        fetch(`http://127.0.0.1:8000/SIAM/projects/${projectId}/delete/`, {
            method: 'DELETE',
            headers: headers,
        })
            .then(() => {
                setProjects(projects.filter(project => project.id !== projectId));
            })
            .catch(error => console.error("Error deleting project:", error));
    };

    return (
        <div>
            <h1>Gestión de Proyectos</h1>
            {/* <button onClick={() => setIsEditing(false)}>Crear Proyecto</button>
            {isEditing ? (
                <ProjectForm
                    project={selectedProject}
                    onSubmit={(formData) => handleUpdateProject(selectedProject.id, formData)}  // Pasar FormData
                    isEditing={true}
                />
            ) : (
                <ProjectForm onSubmit={handleCreateProject} />  // Pasar FormData
            )} */}
            <ProjectList
                projects={projects}
                onEdit={(project) => {
                    setSelectedProject(project);
                    setIsEditing(true);
                }}
                onDelete={handleDeleteProject}
            />
        </div>
    );
};

export default ProjectManagement;
