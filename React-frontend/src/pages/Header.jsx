import "./Css/Header.css"
import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import{ useAuth0 } from '@auth0/auth0-react';
import UserContainer from "../components/UserContainer";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/userstateSlice';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();

  // Accessing Redux state to check if user is authenticated and to get username
  const isAuthenticated = useSelector((state) => state.userstate.isAuthenticated);
  const username = useSelector((state) => state.userstate.user?.username); // Assuming `username` is in `user`

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header style={headerStyles}>
      <h1 style={titleStyles}>Fitzwilliam Museum</h1>
      <nav style={navStyles}>
        <Link to="/HomePage">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/registration">Registration</Link>
        <Link to="/AboutPage">About</Link>
        <Link to="/ModelPage">Model</Link>
        
        {/* Display username if authenticated */}
        {isAuthenticated ? (
          <div>
            <UserContainer /> {/* Ensure `UserContainer` uses `username` */}
            <span>{username}</span> {/* Show username */}
          </div>
        ) : (
          <Link to="/login">Login</Link>
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
