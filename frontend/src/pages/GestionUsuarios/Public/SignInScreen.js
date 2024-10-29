import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowLeft,FaMoon,FaGlobe,FaSun} from 'react-icons/fa';
import loginImage from '../../../images/svg/login.svg';
import book from '../../../images/svg/book.svg';
import './SignInScreen.css';  // Importa una sola hoja de estilos con las variables de CSS

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
   
  const [theme, setTheme] = useState('principal');  // Estado para manejar el tema
  const auth = getAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (error) {
      setError('Credenciales inválidas. Por favor, inténtalo de nuevo.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    document.documentElement.setAttribute('data-theme', selectedTheme);  // Cambia el atributo de tema globalmente
  };

  return (
    <div className={`background-container`}>
      <div className="background-shape"></div>
      <div className="signin-wrapper">
        <div className="signin-left">
          <div className='container-btn-pages'>
          <button className="back-button" onClick={() => navigate('/')}><FaArrowLeft /> Volver</button>
          <button className="back-button" onClick={() => handleThemeChange('principal')}><FaSun/></button>
          <button className="back-button" onClick={() => handleThemeChange('daltonismo')}><FaGlobe /></button>
          <button className="back-button" onClick={() => handleThemeChange('dark')}><FaMoon/></button>
          </div>
          <div className="signin-title">
            <img src={book} alt="Logo" className="logo" />
            <div>
              <h2>Tienda de Libros Unimayor</h2>
              <h1>Iniciar Sesión</h1>
            </div>
          </div>
          <img src={loginImage} alt="Biblioteca" className="signin-image" />
        </div>
        <div className="signin-right">
          <form onSubmit={handleSignIn}>
            <div className="input-container">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Usuario o Correo electrónico"
                required
              />
              <FaEnvelope className="input-icon" />
            </div>
            <div className="input-container">
              <FaLock className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                required
              />
              {showPassword ? (
                <FaEyeSlash className="password-toggle-icon" onClick={togglePasswordVisibility} />
              ) : (
                <FaEye className="password-toggle-icon" onClick={togglePasswordVisibility} />
              )}
            </div>
            {error && <p className="error-message">{error}</p>}
            
            <button type="submit" className="submit-button">Iniciar Sesión</button>
            
            <div className="links-container">
              <a href="/password" onClick={() => alert("Recuperar Contraseña")}>Olvidé mi contraseña</a>
              <a href="/signup">Registrarse</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInScreen;
