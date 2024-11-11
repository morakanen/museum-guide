// src/Header.jsx
import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import{ useAuth0 } from '@auth0/auth0-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth0();//when i was trying to implement auth0,future versions

  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header style={headerStyles}>
      <h1 style={titleStyles}>Fitzwilliam Museum</h1>
      <nav style={navStyles}>
        <Link to="/HomePage">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/registration">Registration</Link>
        <Link to="/AboutPage">About</Link>
        <Link to="/ModelPage">Modelpage</Link>
        {isAuthenticated ? (
        <div>
          <span>Welcome, {user.name}</span>
          <button onClick={() => logout({ returnTo: window.location.origin })}>
            Logout
          </button>
        </div>
      ) : (
        <a href="/login">Login</a>
      )}
      <div className="navbar-toggle" onClick={toggleMenu}>
      <span className="bar"></span>
      <span className="bar"></span>
      <span className="bar"></span>
    </div>
      </nav>
    </header>
  );
};

const headerStyles = {
  padding: '1rem',
  backgroundColor: '#333',
  color: 'white',
  textAlign: 'center',
};

const titleStyles = {
  margin: '0',
  fontSize: '2rem',
  fontWeight: 'bold',
};

const navStyles = {
  marginTop: '0.5rem',
};

const linkStyles = {
  color: 'white',
  textDecoration: 'none',
  margin: '0 1rem',
  fontSize: '1rem',
};

export default Header;
