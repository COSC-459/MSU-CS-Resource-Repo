// src/components/HomePage.js
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../style.css';

const HomePage = () => {
  const [resources, setResources] = useState([]);
  const [message, setMessage] = useState('');
  
  // Get user profile from localStorage
  const userProfile = JSON.parse(localStorage.getItem('user'));
  const user_id = userProfile ? userProfile.user_id : null;

  useEffect(() => {
    // Fetch resources from the backend when the component mounts
    fetch('http://localhost:5001/resources')
      .then((response) => response.json())
      .then((data) => {
        setResources(data);  // Set the fetched resources into state
      })
      .catch((error) => {
        console.error('Error fetching resources:', error);
        setMessage('Error fetching resources.');
      });
  }, []);  // Empty array ensures it runs only once after the component mounts

  // Group resources by category
  const groupedResources = resources.reduce((acc, resource) => {
    if (!acc[resource.category]) {
      acc[resource.category] = [];
    }
    acc[resource.category].push(resource);
    return acc;
  }, {});

  // Handle bookmarking a resource
  const handleBookmark = (resource_id) => {
    if (user_id) {
      fetch('http://localhost:5001/bookmark', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id, resource_id }),
      })
        .then((response) => response.json())
        .then((data) => {
          alert(data.message);  // Show success/error message
        })
        .catch((error) => {
          console.error('Error bookmarking resource:', error);
        });
    } else {
      alert('Please log in to bookmark resources');
    }
  };

  // Handle applying for a resource (takes the user to the link)
  const handleApply = (link) => {
    if (link) {
      // Directly open the resource link in a new tab
      window.open(link, '_blank');
    } else {
      alert('No link available for this resource.');
    }
  };

  return (
    <div className="home-container">
      <Navbar />
      <h1>Welcome to the MSU CS Resource Platform</h1>

      {/* If the user is logged in, display their username */}
      {user_id && <p>Welcome, {userProfile.username}!</p>}

      {/* Loop over categories and display resources */}
      {message && <p>{message}</p>} {/* Display error or info messages */}
      <div className="resource-category">
        {Object.keys(groupedResources).map((category) => (
          <div key={category} className="category-section">
            <h2>{category}</h2>
            {groupedResources[category].map((resource) => (
              <div key={resource.resource_id} className="resource-card">
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                {/* Apply button */}
                <button
                  className="apply-button"
                  onClick={() => handleApply(resource.link)}  // Open the link directly
                >
                  Apply
                </button>
                {/* Bookmark button */}
                <button
                  className="bookmark-button"
                  onClick={() => handleBookmark(resource.resource_id)}
                >
                  Bookmark
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
