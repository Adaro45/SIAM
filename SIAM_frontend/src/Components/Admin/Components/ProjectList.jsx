const ProjectList = ({ projects, onEdit, onDelete }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Título</th>
                    <th>Acrónimo</th>
                    <th>Jefe de Proyecto</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {projects.map(project => (
                    <tr key={project.id}>
                        <td>{project.title}</td>
                        <td>{project.acron}</td>
                        <td>{project.project_boss}</td>
                        <td>
                            {/* <button onClick={() => onEdit(project)}>Editar</button> */}
                            <button onClick={() => onDelete(project.id)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProjectList;
