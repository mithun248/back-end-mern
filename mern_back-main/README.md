# MERN Stack Backend

This is the backend for a MERN (MongoDB, Express, React, Node.js) stack application with user authentication and product management.

## Features

- User authentication with JWT
- Protected routes
- Role-based authorization (user/admin)
- Product CRUD operations
- MongoDB database integration
- Express server with middleware

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for authentication
- bcrypt for password hashing
- dotenv for environment variables

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd <repository-name>
```

2. Install dependencies
```bash
npm install
```

3. Create a .env file in the root directory with the following variables:
```
PORT=8000
JWT_SECRET=your_jwt_secret_key
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development
```

4. Start the server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (protected)

### Products
- `GET /products` - Get all products
- `POST /products` - Create a new product (protected)
- `PUT /products/:id` - Update a product (protected)
- `DELETE /products/:id` - Delete a product (admin only)

## License

This project is licensed under the MIT License. 