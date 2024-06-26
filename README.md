﻿# Cointab SE-ASSIGNMENT

## Overview

This application is a web-based system that provides functionalities for managing users and their posts. It consists of both frontend and backend components. The backend is built with Node.js and Express, while the frontend is developed using React.js. The application interacts with a MySQL database to store user and post data.

## Features

- **User Management**: Allows users to be retrieved from an external API and added to a local database.
- **Post Management**: Enables users to view posts retrieved from an external API, add them to the local database, and download them in Excel format.
- **Database Interaction**: Utilizes MySQL database for storing user and post data.
- **API Integration**: Communicates with external APIs to fetch user and post data.

## Backend

### Technologies Used

- **Node.js**: JavaScript runtime for server-side development.
- **Express**: Web application framework for Node.js.
- **MySQL**: Relational database management system.

### Backend Structure

- **`index.js`**: Main entry point for the backend application. Sets up the Express server and defines routes.
- **`config/db.js`**: Configuration file for establishing a connection with the MySQL database.
- **`Routes/user.routes.js`**: Defines routes for user-related functionalities such as fetching and adding users.
- **`Routes/post.routes.js`**: Defines routes for post-related functionalities such as fetching and adding posts.

## Frontend

### Technologies Used

- **React.js**: JavaScript library for building user interfaces.
- **Chakra UI**: Component library for React applications.

### Frontend Structure

- **`App.jsx`**: Main component of the frontend application. Renders all routes.
- **`pages/Home.jsx`**: Component for the homepage, displays all users fetched from the database.
- **`pages/Post.jsx`**: Component for displaying posts, allows users to download posts in Excel format or bulk add posts.
- **`components/AllUsers.jsx`**: Component for rendering all users fetched from an external API.
- **`components/Usercard.jsx`**: Component for rendering individual user cards with add functionality.

## Setup Instructions

1. **Clone the Repository**: `git clone <repository-url>`
2. **Install Dependencies**:
   - Backend: `cd backend && npm install`
   - Frontend: `cd frontend && npm install`
3. **Database Configuration**:
   - Set up a MySQL database and configure credentials in `backend/config/db.js`.
4. **Run the Application**:
   - Backend: `cd backend && npm start`
   - Frontend: `cd frontend && npm start`

## Credits

- This application was developed by Vishnuraj K R.
