// src/components/SignUpPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirecting
import '../style.css';  // Import global styles

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();  // Initialize useNavigate for redirection

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the username to the backend via POST request
    fetch('http://localhost:5001/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message); // Display success or error message
        if (data.message === 'User registered successfully!') {
          setUsername(''); // Clear the input if successful
          navigate('/home');  // Redirect to the Home Page after sign-up
        }
      })
      .catch((error) => {
        setMessage('Error registering user. Please try again.');
      });
  };

  return (
    <div className="signup-container">
      {/* Bear Logo */}
      <div className="logo-container">
        <img src="/msulogo.png" alt="Bear Logo" className="bear-logo" />
      </div>

      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignUpPage;
