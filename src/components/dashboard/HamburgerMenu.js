
import React, { useState } from 'react';
import './HamburgerMenu.css';

const HamburgerMenu = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="hamburger-menu">
            <button className="hamburger-btn" onClick={toggleMenu}>
                ☰
            </button>
            {isOpen && (
                <div className="menu">
                    <div className="profile">
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                    </div>
                    <ul>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#how-it-works">How It Works</a></li>
                        <li><a href="#contact">Contact Us</a></li>
                        <li><button className="logout-btn" onClick={() => window.location.reload()}>Logout</button></li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default HamburgerMenu;
