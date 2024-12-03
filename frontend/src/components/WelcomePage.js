// src/components/WelcomePage.js
import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import '../style.css';

const WelcomePage = () => {
  return (
    <div className="welcome-container">
      {/* MSU Logo */}
      <div className="logo-container">
        <img src="/msulogo.png" alt="MSU Logo" className="msu-logo" />
      </div>

      {/* Page Description */}
      <div className="description">
        <h1>Welcome to MSU CS Resource Opportunity Platform</h1>
        <p>
          This platform connects Computer Science students at Morgan State University
          to various career-building opportunities, including scholarships, internships,
          full-time jobs, research projects, and educational resources. Join the platform
          to access valuable tools to help you build your career in tech!
        </p>
      </div>

      {/* Sign-Up Button */}
      <div className="signup-container">
        <Link to="/signup">
          <button className="signup-button">Sign Up</button>
        </Link>
        <Link to="/login">
          <button className="login-button">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
