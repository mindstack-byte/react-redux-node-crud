# React Redux Node CRUD

This is a full-stack CRUD application built with React, Redux, and Node.js.

## Project Structure

- **client/**: Contains the frontend React application.
  - Built with Vite for fast development.
  - Uses Redux for state management.
  - Includes components for pages like Home, Products, Todos, etc.
  - Has a store with actions and reducers for cart and todos.

- **server/**: Contains the backend Node.js application.
  - Built with Express.js using ES6 modules.
  - Provides RESTful API for todos (CRUD operations).
  - Uses mock data for now (no database).
  - Includes middleware for error handling.
  - Folder structure: controllers, routes, middleware, utils, config.

## Getting Started

### Prerequisites
- Node.js
- npm or yarn

### Installation
1. Clone the repository: `git clone https://github.com/mindstack-byte/react-redux-node-crud.git`
2. Navigate to the project directory: `cd react-redux-node-crud`

### Running the Client
1. Go to the client directory: `cd client`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

### Running the Server
1. Go to the server directory: `cd server`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev` (uses --watch for auto-restart)
4. The server runs on `http://localhost:5001`
5. API endpoints: `/api/todos` (GET, POST, PUT, DELETE)

### API Documentation
- **GET /api/todos**: Get all todos
- **GET /api/todos/:id**: Get a specific todo by ID
- **POST /api/todos**: Create a new todo (requires `title` in body)
- **PUT /api/todos/:id**: Update a todo by ID
- **DELETE /api/todos/:id**: Delete a todo by ID

Example request:
```json
POST /api/todos
{
  "title": "New Todo",
  "completed": false
}
```

<img width="1581" height="773" alt="image" src="https://github.com/user-attachments/assets/5e1a8edd-e934-48d6-8d91-6c6850805314" />
