import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserManagment = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [updatedRole, setUpdatedRole] = useState(''); // Para el rol del usuario a actualizar
  const [password, setPassword] = useState(''); // Para la contraseña del admin

  // Obtener la lista de usuarios al cargar el componente
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/SIAM/user/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError('Hubo un problema al obtener los usuarios');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Manejar la eliminación de un usuario
  const handleDelete = async (username) => {
    const confirmPassword = prompt('Por favor, ingrese su contraseña de administrador para confirmar la eliminación:');
    if (!confirmPassword) return; // Si no se ingresa la contraseña, no hace nada

    try {
      const response = await axios({
        method: 'delete',
        url: `http://127.0.0.1:8000/SIAM/user/${username}/delete/`,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        data: { password: confirmPassword } // Pasamos la contraseña del admin
      });

      if (response.status === 204) {
        // Eliminar el usuario de la lista localmente
        setUsers(users.filter(user => user.username !== username));
        alert('Usuario eliminado exitosamente.');
      }
    } catch (error) {
      alert('Hubo un error al eliminar el usuario: ' + error.response?.data?.detail || 'Error desconocido');
    }
  };

  // Manejar la edición de un usuario
  const handleEdit = (user) => {
    setEditingUser(user);
    setUpdatedRole(user.role); // Inicializar el rol del usuario al editar
  };

  // Manejar la actualización de un usuario
  const handleUpdate = async () => {
    const confirmPassword = prompt('Por favor, ingrese su contraseña de administrador para confirmar la actualización:');
    if (!confirmPassword) return; // Si no se ingresa la contraseña, no hace nada

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/SIAM/user/${editingUser.username}/update/`,
        {
          password: confirmPassword,
          role: updatedRole // Enviar el nuevo rol
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        }
      );

      if (response.status === 200) {
        // Actualizar la lista localmente
        const updatedUser = response.data;
        setUsers(users.map(user => user.username === updatedUser.username ? updatedUser : user));
        setEditingUser(null);
        alert('Usuario actualizado exitosamente.');
      }
    } catch (error) {
      alert('Hubo un error al actualizar el usuario: ' + error.response?.data?.detail || 'Error desconocido');
    }
  };

  // Mostrar el estado de carga o el error
  if (loading) return <div>Cargando usuarios...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='user_managment'>
      <h2 className='user_managment_title'>Gestión de Usuarios</h2>
    <div className='user_managment_container'>
      {/* Formulario de edición */}
      {editingUser && (
        <div className='form-container_edit_user_main' >
          <h3>Editar Usuario</h3>
          <form className='form-container_edit_user' onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
            <div>
              <label> Usuario: </label>
              <label> {editingUser.username} </label>
            </div>
            <div className='form-container_update_user'>
              <label>Rol: </label>
              <select className='form-container_update_user_select'
                value={updatedRole}
                onChange={(e) => setUpdatedRole(e.target.value)}
              >
                <option value="normal">Normal</option>
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button className='form-container_update_user_button' type="submit">Actualizar</button>
          </form>
        </div>
      )}
      <table className='user_managment_table'>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button className='user_managment_table_button edit-button' onClick={() => handleEdit(user)}>Editar Rol</button>
                <button className='user_managment_table_button delete-button' onClick={() => handleDelete(user.username)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default UserManagment;
