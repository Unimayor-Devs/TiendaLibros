import React, { useState, useEffect, useContext } from 'react';
import { getUsers, deleteUserFromBackend, deleteUserFromFirestore, updateUserRole, deleteUserRoleField } from '../../../services/userService';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { ThemeContext } from '../../../context/ThemeContext';
import Navbar from '../../../components/Navbar';
import { FaTrash, FaEdit, FaUser } from 'react-icons/fa';
import DataTable from 'react-data-table-component';
import './UsersScreen.css';

const UsersScreen = () => {
  const navigate = useNavigate();
  const { user, userRole } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getUsers();
        setUsers(userData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleEditUser = (userId) => {
    navigate(`/users/${userId}/edit`);
  };

  const handleAdminDeleteUser = async (userId, fullName) => {
    const confirmDelete = window.confirm(`¿Estás seguro que quieres eliminar permanentemente a "${fullName}"? Esta acción no se puede deshacer.`);
    if (confirmDelete) {
      try {
        await deleteUserFromBackend(userId);
        const firestoreDeleteResult = await deleteUserFromFirestore(userId);
        if (firestoreDeleteResult.success) {
          setUsers(users.filter(user => user.id !== userId));
          console.log('Usuario eliminado permanentemente.');
        } else {
          console.error('Error deleting user from Firestore:', firestoreDeleteResult.error);
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      user.firstName.toLowerCase().includes(lowerCaseSearchTerm) ||
      user.lastName.toLowerCase().includes(lowerCaseSearchTerm) ||
      fullName.includes(lowerCaseSearchTerm) ||
      user.email.toLowerCase().includes(lowerCaseSearchTerm) ||
      user.department.toLowerCase().includes(lowerCaseSearchTerm) ||
      user.city.toLowerCase().includes(lowerCaseSearchTerm) ||
      user.phoneNumber.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  const sortedUsers = filteredUsers.sort((a, b) => {
    if (a.id === user.uid) return -1;
    if (b.id === user.uid) return 1;
    return 0;
  });

  const columns = [
    userRole === 'admin' && { name: 'UID', selector: row => row.id, sortable: true },
    { name: 'Nombre', selector: row => `${row.firstName} ${row.lastName}`, sortable: true },
    { name: 'Correo', selector: row => row.email, sortable: true },
    { name: 'Teléfono', selector: row => row.phoneNumber, sortable: true },
    { name: 'Departamento', selector: row => row.department, sortable: true },
    { name: 'Ciudad', selector: row => row.city, sortable: true },
    userRole === 'admin' && {
      name: 'Acciones',
      cell: row => (
        user.uid !== row.id && (
          <>
            <FaEdit
              className="button button-icon button-primary"
              onClick={() => handleEditUser(row.id)}
            />
            <FaTrash
              className="button button-icon button-danger"
              onClick={() => handleAdminDeleteUser(row.id, `${row.firstName} ${row.lastName}`)}
            />
          </>
        )
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }
  ].filter(Boolean);

  return (
    <div className={`users-container theme-${theme}`}>
      <Navbar />
      <div className={`users-container-form theme-${theme}`}>
        <h1>Usuarios</h1>
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Buscar usuarios..."
            className="search-bar"
            value={searchTerm}
            onChange={handleSearch}
          />
          {user && (
            <button
              className="boton-user"
              onClick={() => handleEditUser(user.uid)}
            >
              <FaUser />
            </button>
          )}
        </div>
        <div className={`user-list-table-container theme-${theme}`}>
          <DataTable
            className={`data-table theme-${theme}`}
            columns={columns}
            data={sortedUsers}
            noDataComponent={<div>No se encontraron coincidencias con su búsqueda</div>}
            highlightOnHover
            pointerOnHover
            striped
          />
        </div>
      </div>
    </div>
  );
};

export default UsersScreen;
