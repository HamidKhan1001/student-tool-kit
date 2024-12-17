import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ navbarVisible }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) setUser(loggedInUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    alert('Logged out successfully!');
  };

  return (
    <nav className={`navbar ${navbarVisible ? '' : 'hidden'}`}>
      <div className="navbar-container">
        <a href="/" className="navbar-brand">
          <img src="/aelogo.png" alt="Logo" />
          Admissions Express
        </a>
        <div className="navbar-links">
          <ul>
            <li><NavLink to="/" activeClassName="active">Home</NavLink></li>
            <li><NavLink to="/about" activeClassName="active">About Us</NavLink></li>
            <li><NavLink to="/contact" activeClassName="active">Contact</NavLink></li>
            {user ? (
              <li>
                <div className="profile-dropdown">
                  {user.name}
                  <ul>
                    <li>Email: {user.email}</li>
                    <li><button onClick={handleLogout}>Logout</button></li>
                  </ul>
                </div>
              </li>
            ) : (
              <li><NavLink to="/signin" activeClassName="active">Sign In</NavLink></li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
