// src/components/Navbar.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faBook, faBoxes, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FaSun, FaGlobe, FaMoon } from 'react-icons/fa';
import './Navbar.css';
import book from '../../src/images/svg/book.svg';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext} from '../context/ThemeContext';

const Navbar = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const { userRole } = useContext(AuthContext);
  const { theme, changeTheme } = useContext(ThemeContext); // Get theme and changeTheme function from context

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('User successfully signed out');
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <nav className="Navbar">
      <div className="logo-container">
        <img src={book} alt="Logo" className="logo" />
        <p>Tienda de Libros Unimayor</p>
      </div>
      <ul>
        <li>
          <div className="theme-buttons">
            <button onClick={() => changeTheme('principal')}><FaSun /> </button>
            <button onClick={() => changeTheme('daltonismo')}><FaGlobe /> </button>
            <button onClick={() => changeTheme('dark')}><FaMoon /> </button>
          </div>
        </li>
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
            <FontAwesomeIcon icon={faSignOutAlt} /> Cerrar sesión
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
