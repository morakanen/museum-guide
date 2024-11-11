import React, { useState } from 'react';
import { Link, useNavigate,NavLink } from 'react-router-dom';
import{ useAuth0 } from '@auth0/auth0-react';
import './Navbar.css';
import UserContainer from '../components/UserContainer';
import { useSelector, useDispatch } from'react-redux';



const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth0();

  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">MyApp</div>
      <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
        <li><Link to="/HomePage">Home</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/registration">Registration</Link></li>
        <li><Link to="/AboutPage">About</Link></li>
        <li><Link to="/ModelPage">Modelpage</Link></li>
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
      </ul>
      <div className="navbar-toggle" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
};

export default Navbar;