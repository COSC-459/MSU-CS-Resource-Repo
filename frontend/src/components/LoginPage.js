// src/components/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Use useNavigate for navigation
import '../style.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleLogin = (e) => {
    e.preventDefault();

    // Send the username to the backend to check if it exists
    fetch('http://localhost:5001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message); // Display success or error message
        
        // If login is successful, store user data
        if (data.message === 'Login successful!') {
          // Store the full user profile (username, user_id, bookmarks, applications) in localStorage
          localStorage.setItem('user', JSON.stringify({
            username: data.username,
            user_id: data.user_id,
            bookmarks: data.bookmarks || [], // Ensure bookmarks exist
            applications: data.applications || [], // Ensure applications exist
          }));

          // Navigate to home page after successful login
          navigate('/home');
        } else {
          setMessage('Login failed. Please check your username.');
        }
      })
      .catch((error) => {
        console.error('Error logging in:', error);
        setMessage('Error logging in. Please try again.');
      });
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginPage;
