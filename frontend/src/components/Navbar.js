// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import Link and useNavigate for navigation
import '../style.css'; // Import the CSS for the navbar

const Navbar = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    // Navigate back to the login page after logout
    navigate('/login');
  };

  return (
    <nav className="navbar">
      {/* MSU Logo */}
      <div className="logo-container">
        <img src="/msulogo.png" alt="MSU Logo" className="msu-logo-navbar" />
      </div>

      {/* Navigation Links */}
      <div className="nav-links">
        <Link to="/" className="nav-link">Welcome</Link> {/* Link to the Welcome Page */}
        <Link to="/profile" className="nav-link">Profile</Link> {/* Link to the Profile Page */}
        <button className="nav-link" onClick={handleLogout}>Logout</button> {/* Logout Button */}
      </div>
    </nav>
  );
};

export default Navbar;
