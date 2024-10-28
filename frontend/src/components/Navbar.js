import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faBook, faBoxes, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css'; // Asegúrate de importar los estilos CSS
import logo from '../pages/Public/assets/logo.png';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const { userRole } = useContext(AuthContext); // Obtiene el rol del usuario

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('Usuario cerró sesión exitosamente');
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logo} alt="Logo Unimayor" className="logo" />
        <p className="logo-text">Tienda de Libros Unimayor</p>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/home">
            <FontAwesomeIcon icon={faHome} /> Inicio
          </Link>
        </li>
        <li>
          <Link to="/users">
            <FontAwesomeIcon icon={faUser} /> Usuarios
          </Link>
        </li>
        <li>
          <Link to="/books">
            <FontAwesomeIcon icon={faBook} /> Libros
          </Link>
        </li>
        <li>
          <Link to="/inventory">
            <FontAwesomeIcon icon={faBoxes} /> {userRole === 'admin' ? 'Inventario' : 'Comprar'}
          </Link>
        </li>
        <li>
          <button className="logout-button" onClick={handleSignOut}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Salir
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
