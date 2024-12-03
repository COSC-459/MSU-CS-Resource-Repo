# MSU-CS-Resource-Repo
The MSU CS Resource and Job Opportunity Repository is a web-based application designed to serve computer science students at Morgan State University. This platform will act as a centralized hub, providing access to a variety of opportunities and resources that are essential for student growth and career development.  The goal is to empower students by connecting them to practical experiences such as internships, research opportunities, scholarships, and early career jobs, as well as valuable educational content that goes beyond the classroom. 
# Group Members
Aramide Ogundiran

### **Key Features**
1.) User Registration (Sign-Up):
Endpoint: /signup
Functionality: This endpoint allows new users to register by providing a unique username. It checks if the username already exists in the database and prevents duplicate registrations. Upon successful registration, a new user record is created in the database, and the user's user_id is returned.


2.) User Login:
Endpoint: /login
Functionality: This endpoint allows users to log in by providing their username. It checks if the provided username exists in the database. Upon successful login, the user’s user_id, username, and their associated bookmarks and applications are returned and stored in localStorage for frontend usage.

3.) Display All Resources:
Endpoint: /resources
Functionality: This endpoint retrieves all available resources from the database, grouped by categories. It returns a list of resources with details such as resource ID, title, description, and link.

4.) Bookmark Resource:
Endpoint: /bookmark
Functionality: This endpoint allows logged-in users to bookmark resources. It checks if the resource has already been bookmarked by the user. If not, it adds the resource to the user’s bookmarks in the database.

5.) Apply for Resource:
Endpoint: /apply
Functionality: This endpoint allows users to apply for a specific resource (e.g., job opportunities, scholarships). The status of the application (such as "Applied", "Pending", etc.) is stored in the database along with the user's ID and the resource ID.


6.) Fetch User Profile:
Endpoint: /user/profile
Functionality: This endpoint retrieves the full user profile, including their bookmarked resources and applications. It requires the user’s user_id, which is used to fetch all the relevant data from the database.

7.) Logout:
Functionality: This functionality is handled on the frontend. When the user clicks on the logout button, the profile data is removed from localStorage, and the user is redirected to the login page.

8.) User Profile Page:
Page: /profile
Functionality: The user profile page displays the user’s information, including the username, user ID, bookmarks, and applications. The profile page is populated by data stored in localStorage after the user successfully logs in.

### **Tech Stack**
1.) Frontend
  The frontend was built using the following technologies:
  
  React.js:
    Used for building the user interface.
    Component-based architecture ensures modularity and reusability.
    Navigation was implemented using the React Router DOM library (useNavigate) for seamless page transitions.
    
  CSS:
    Custom styling was added through a global style.css file to ensure the application maintained a clean and responsive design.
    
  Fetch API:
    Used to make HTTP requests to the backend for user authentication, resource retrieval, and other interactions.
    
2.) Backend
  The backend was developed using the following stack:
  
  Node.js:
    Served as the runtime environment for executing server-side JavaScript.
    
  Express.js:
    Provided a framework for building RESTful APIs.
    Modular routing was used to organize endpoints for functionalities such as login, signup, and resource management.
    
  Body-Parser:
    Middleware used to parse incoming request bodies as JSON.
    
  CORS:
    Configured to allow cross-origin requests from the frontend running on a different port.
    
  MySQL:
    Used for the database to manage users, resources, bookmarks, and applications.
    Database queries were executed using the MySQL module.
    
### **Database Schema**

Users

  Represents the users of the platform, including students and admins.
  
  Attributes:
  user_id: A unique identifier for each user.
  username: The name of the user.
  role: Defines the type of user, such as user or admin.
  created_at: The optional timestamp of when the user was added to the platform.
  
Categories

  Represents the classification of resources (e.g., Scholarships, Internships).
  
  Attributes:
  category_id: A unique identifier for each category.
  name: The name of the category.
  description: An optional text field providing additional details about the category.
  
Resources

  Represents the opportunities or resources available to students.
  
  Attributes:
  resource_id: A unique identifier for each resource.
  title: The title or name of the resource.
  description: An optional text field describing the resource.
  link: The URL where users can find the resource.
  category_id: Links the resource to a category.
  created_at: The timestamp when the resource was added.
  updated_at: The timestamp when the resource was last updated.
  
Bookmarks

  Tracks the resources saved or bookmarked by users.
  
  Attributes:
  bookmark_id: A unique identifier for each bookmark.
  user_id: The ID of the user who bookmarked the resource.
  resource_id: The ID of the resource that was bookmarked.
  bookmarked_at: The timestamp when the bookmark was created.
  
Applications

  Tracks user applications to opportunities (e.g., scholarships, internships).
  
  Attributes:
  application_id: A unique identifier for each application.
  user_id: The ID of the user applying.
  resource_id: The ID of the resource the user applied for.
  status: The status of the application (e.g., applied, interview, accepted, rejected).
  
AdminLogs

  Logs actions performed by admin users, such as adding or updating resources.
  
  Attributes:
  log_id: A unique identifier for each log entry.
  admin_id: The ID of the admin performing the action.
  action: A description of the action performed.

### **Demo Link**
[View Live Demo](https://drive.google.com/drive/u/0/folders/1fim1KT-ZzNhfCXDXcOB46ruuWnRVYnvO)  


