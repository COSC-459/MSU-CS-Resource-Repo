// src/components/ProfilePage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import '../style.css';

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Try to fetch user profile from localStorage
    const storedUserProfile = JSON.parse(localStorage.getItem('user'));

    // If there's no profile in localStorage, redirect to login page
    if (!storedUserProfile) {
      navigate('/login');
    } else {
      setUserProfile(storedUserProfile);  // Set the user profile state
    }
  }, [navigate]);

  return (
    <div className="profile-container">
      {userProfile ? (
        <>
          <h1>User Profile</h1>
          <div className="profile-info">
            <p><strong>Username:</strong> {userProfile.username}</p>
            <p><strong>User ID:</strong> {userProfile.user_id}</p>
          </div>

          {/* Bookmarks Section */}
          <div className="profile-bookmarks">
            <h2>Bookmarked Resources</h2>
            {userProfile.bookmarks && userProfile.bookmarks.length > 0 ? (
              <ul>
                {userProfile.bookmarks.map((bookmark, index) => (
                  <li key={index}>{bookmark.title}</li>
                ))}
              </ul>
            ) : (
              <p>No bookmarks yet.</p>
            )}
          </div>

          {/* Applications Section */}
          <div className="profile-applications">
            <h2>Applications</h2>
            {userProfile.applications && userProfile.applications.length > 0 ? (
              <ul>
                {userProfile.applications.map((application, index) => (
                  <li key={index}>
                    {application.title} - {application.status}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No applications yet.</p>
            )}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfilePage;
