const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');  // Import the database connection file
const cors = require('cors');  // Import the cors middleware

const app = express();
const PORT = process.env.PORT || 5001;  // Backend will run on port 5001

// Enable CORS for requests from localhost:3000 (your frontend)
app.use(cors({
  origin: 'http://localhost:3000',  // Adjust if the frontend runs on a different port
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow OPTIONS for preflight requests
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  preflightContinue: false,  // Ensures the preflight request is handled correctly
  optionsSuccessStatus: 204, // Status code for successful OPTIONS request
}));

app.use(bodyParser.json());  // Middleware for parsing JSON requests

// Route to handle sign-up
app.post('/signup', (req, res) => {
  const { username } = req.body;

  console.log(`Received signup request with username: ${username}`);

  // Check if the username exists in the database
  const checkQuery = 'SELECT * FROM Users WHERE username = ?';
  db.query(checkQuery, [username], (err, result) => {
    if (err) {
      console.error('Database error while checking username:', err);
      return res.status(500).json({ message: 'Database error, please try again.' });
    }

    if (result.length > 0) {
      return res.status(400).json({ message: 'Username already exists. Please choose another.' });
    }

    // Insert new user if the username doesn't exist
    const insertQuery = 'INSERT INTO Users (username) VALUES (?)';
    db.query(insertQuery, [username], (err, result) => {
      if (err) {
        console.error('Error inserting user into database:', err);
        return res.status(500).json({ message: 'Error registering user. Please try again.' });
      }
      console.log('User registered successfully');
      res.status(200).json({ message: 'User registered successfully!', user_id: result.insertId, username });
    });
  });
});

app.post('/login', (req, res) => {
    const { username } = req.body;
  
    console.log(`Received login request with username: ${username}`);
  
    // Check if the username exists in the database
    const checkQuery = 'SELECT * FROM Users WHERE username = ?';
    db.query(checkQuery, [username], (err, result) => {
      if (err) {
        console.error('Database error while checking username:', err);
        return res.status(500).json({ message: 'Database error, please try again.' });
      }
  
      if (result.length === 0) {
        return res.status(400).json({ message: 'Username does not exist. Please sign up.' });
      }
  
      const user_id = result[0].user_id;
  
      // Fetch user's bookmarks and applications after successful login
      const bookmarksQuery = `
        SELECT r.resource_id, r.title
        FROM Resources r
        INNER JOIN Bookmarks b ON r.resource_id = b.resource_id
        WHERE b.user_id = ?
      `;
  
      const applicationsQuery = `
        SELECT r.resource_id, r.title, a.status
        FROM Resources r
        INNER JOIN Applications a ON r.resource_id = a.resource_id
        WHERE a.user_id = ?
      `;
  
      db.query(bookmarksQuery, [user_id], (err, bookmarks) => {
        if (err) {
          console.error('Error fetching bookmarks:', err);
          return res.status(500).json({ message: 'Error fetching bookmarks.' });
        }
  
        db.query(applicationsQuery, [user_id], (err, applications) => {
          if (err) {
            console.error('Error fetching applications:', err);
            return res.status(500).json({ message: 'Error fetching applications.' });
          }
  
          // Send the complete user profile data
          res.status(200).json({
            message: 'Login successful!',
            user_id,
            username: result[0].username,
            bookmarks,
            applications,
          });
        });
      });
    });
  });
  

// Route to get all resources, grouped by category
app.get('/resources', (req, res) => {
  const query = `
    SELECT r.resource_id, r.title, r.description, r.link, c.name AS category
    FROM Resources r
    INNER JOIN Categories c ON r.category_id = c.category_id
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching resources:', err);
      return res.status(500).json({ message: 'Error fetching resources.' });
    }
    res.status(200).json(result);  // Send the resources with their categories as JSON
  });
});

// Route to handle bookmark
app.post('/bookmark', (req, res) => {
  const { user_id, resource_id } = req.body;

  // Check if the user already bookmarked this resource
  const checkQuery = 'SELECT * FROM Bookmarks WHERE user_id = ? AND resource_id = ?';
  db.query(checkQuery, [user_id, resource_id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error while checking bookmark.' });
    }

    if (result.length > 0) {
      return res.status(400).json({ message: 'This resource is already bookmarked by you.' });
    }

    // Insert bookmark into database
    const insertQuery = 'INSERT INTO Bookmarks (user_id, resource_id) VALUES (?, ?)';
    db.query(insertQuery, [user_id, resource_id], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error bookmarking resource. Please try again.' });
      }
      res.status(200).json({ message: 'Resource bookmarked successfully!' });
    });
  });
});

// Route to handle apply
app.post('/apply', (req, res) => {
  const { user_id, resource_id, status } = req.body;

  // Insert application into database
  const insertQuery = 'INSERT INTO Applications (user_id, resource_id, status) VALUES (?, ?, ?)';
  db.query(insertQuery, [user_id, resource_id, status], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error applying for resource. Please try again.' });
    }
    res.status(200).json({ message: 'Application submitted successfully!' });
  });
});

// Route to fetch user profile details (bookmarks and applications)
app.get('/user/profile', (req, res) => {
    let { user_id } = req.query;

    // Use dummy user_id if none is provided
    if (!user_id) {
        user_id = 1; // Dummy user ID for testing purposes
    }

    // Fetch user bookmarks
    const bookmarksQuery = `
      SELECT r.title AS resource_title, r.link AS resource_link
      FROM Bookmarks b
      JOIN Resources r ON b.resource_id = r.resource_id
      WHERE b.user_id = ?
    `;
  
    // Fetch user applications
    const applicationsQuery = `
      SELECT r.title AS resource_title, r.link AS resource_link, a.status AS application_status
      FROM Applications a
      JOIN Resources r ON a.resource_id = r.resource_id
      WHERE a.user_id = ?
    `;
  
    db.query(bookmarksQuery, [user_id], (err, bookmarks) => {
      if (err) {
        console.error('Error fetching bookmarks:', err);
        return res.status(500).json({ message: 'Error fetching bookmarks.' });
      }
  
      db.query(applicationsQuery, [user_id], (err, applications) => {
        if (err) {
          console.error('Error fetching applications:', err);
          return res.status(500).json({ message: 'Error fetching applications.' });
        }
  
        res.status(200).json({ bookmarks, applications });  // Send bookmarks and applications as response
      });
    });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
