import React from 'react';
import './Navbar.css';

const Navbar = ({ navbarVisible }) => {
  return (
    <>
    
    <nav className={`navbar ${navbarVisible ? '' : 'hidden'}`}>
      <div className="navbar-container">
        <a href="/" className="navbar-brand">
          <img src="/aelogo.png" alt="Logo" />
          Admissions Express
        </a>
        <div className="navbar-links">
          <ul>
            <li><a href="/" className="active">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/signin">Sign In</a></li> 
          </ul>
        </div>
      </div>
    </nav>
    
 </>
  );
};

export default Navbar;
