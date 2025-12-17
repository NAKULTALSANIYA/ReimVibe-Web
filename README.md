# ReimVibe Backend - Admin System & CORS Configuration

This document explains the new admin system and CORS configuration implemented in the ReimVibe backend.

## Table of Contents

1. [CORS Configuration](#cors-configuration)
2. [Admin System](#admin-system)
3. [API Endpoints](#api-endpoints)
4. [Setup Instructions](#setup-instructions)
5. [Environment Variables](#environment-variables)

## CORS Configuration

The backend now includes a properly configured CORS setup that allows cross-origin requests from your frontend application.

### Features:
- Configurable origin based on environment variable
- Credential support for authentication
- Explicitly allowed HTTP methods
- Explicitly allowed headers for API requests

### Configuration:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

## Admin System

The admin system provides user authentication and authorization for administrative functions.

### Features:
- JWT-based authentication
- Password hashing with bcryptjs
- Role-based access control (admin/superadmin)
- Admin user management (CRUD operations)
- Secure password comparison
- Account activation/deactivation

### Admin Roles:
- **admin**: Standard admin with limited permissions
- **superadmin**: Full access to all admin functions including creating, updating, and deleting other admins

## API Endpoints

### Authentication Endpoints (Public)

#### 1. Setup Initial Admin
```http
POST /api/admin/setup
Content-Type: application/json

{
  "username": "your-username",
  "email": "admin@example.com",
  "password": "your-password"
}
```

**Note**: This endpoint only works if no admin users exist in the database. The first created admin automatically gets "superadmin" role.

#### 2. Admin Login
```http
POST /api/admin/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "your-password"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt-token-here",
  "admin": {
    "id": "admin-id",
    "username": "admin-username",
    "email": "admin@example.com",
    "role": "admin",
    "lastLogin": "2024-01-01T00:00:00.000Z"
  }
}
```

### Protected Endpoints (Require Authentication)

#### 3. Get Admin Profile
```http
GET /api/admin/profile
Authorization: Bearer <jwt-token>
```

#### 4. Get All Admins (Superadmin only)
```http
GET /api/admin/all
Authorization: Bearer <jwt-token>
```

#### 5. Create New Admin (Superadmin only)
```http
POST /api/admin/create
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "username": "new-admin",
  "email": "newadmin@example.com",
  "password": "secure-password",
  "role": "admin"
}
```

#### 6. Update Admin (Superadmin only)
```http
PUT /api/admin/:id
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "username": "updated-username",
  "email": "updated@example.com",
  "role": "admin",
  "isActive": true
}
```

#### 7. Delete Admin (Superadmin only)
```http
DELETE /api/admin/:id
Authorization: Bearer <jwt-token>
```

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Copy the `.env.example` file to `.env` and update the values:

```bash
cp .env.example .env
```

Edit `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/reimvibe
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-here
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

### 3. Start the Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

### 4. Setup Initial Admin
1. Start the server
2. Use a tool like Postman or curl to call the setup endpoint:
```bash
curl -X POST http://localhost:5000/api/admin/setup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "superadmin",
    "email": "admin@reimvibe.com",
    "password": "SuperSecure123"
  }'
```

3. The response will include a JWT token that you can use for subsequent API calls

### 5. Use the Admin System
- Use the returned JWT token for authenticated requests
- Include the token in the Authorization header: `Bearer <token>`

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/reimvibe` |
| `PORT` | Server port | `5000` |
| `JWT_SECRET` | Secret key for JWT token signing | Required |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |
| `NODE_ENV` | Environment mode | `development` |

## Security Notes

1. **JWT Secret**: Use a strong, unique secret key in production
2. **Password Requirements**: Minimum 6 characters
3. **Token Expiration**: JWT tokens expire after 7 days
4. **Role Restrictions**: Only superadmins can manage other admin users
5. **Account Protection**: Admins cannot delete their own accounts
6. **Inactive Accounts**: Inactive admin accounts cannot authenticate

## Database Schema

### Admin Model Fields:
- `username`: String (required, unique, min 3 chars)
- `email`: String (required, unique)
- `password`: String (required, min 6 chars, hashed)
- `role`: String (enum: 'admin', 'superadmin', default: 'admin')
- `isActive`: Boolean (default: true)
- `lastLogin`: Date
- `createdAt`: Date (auto-generated)
- `updatedAt`: Date (auto-generated)

## Error Handling

The API uses standard HTTP status codes:
- `200`: Success
- `201`: Created successfully
- `400`: Bad request (validation errors)
- `401`: Unauthorized (invalid or missing token)
- `403`: Forbidden (insufficient permissions)
- `404`: Not found
- `500`: Server error

All error responses include a descriptive message:
```json
{
  "message": "Error description",
  "error": "Detailed error message (if available)"
}
