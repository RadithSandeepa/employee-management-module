# Employee Management Module

The Employee Management Module is a web-based system designed to help organizations efficiently manage their employees. This system allows administrators to add, edit, delete, and view employee records while ensuring secure authentication and data storage through a robust backend API. Built with React, TailwindCSS, Express, MongoDB, and Node.js, the application features modern, minimalistic user interfaces with a fully responsive design, making it accessible across all devices. TailwindCSS is used for efficient styling, ensuring a sleek and intuitive interface, while React-Hot-Toast enhances the user experience with real-time validation and feedback.

## Table of Contents

- [Screenshots](#Screenshots)
- [API Documentation](#API-Documentation)  
- [Folder Structure](#Folder-Structure)
- [Setup Instructions](#Setup-Instructions)

<a id="Screenshots"></a>
## Screenshots

![Login](https://github.com/RadithSandeepa/employee-management-module/blob/main/photos/login.png)

![Home](https://github.com/RadithSandeepa/employee-management-module/blob/main/photos/home.png)

![Profile](https://github.com/RadithSandeepa/employee-management-module/blob/main/photos/profile.png)

![Employees](https://github.com/RadithSandeepa/employee-management-module/blob/main/photos/employees.png)

![NewEmployee](https://github.com/RadithSandeepa/employee-management-module/blob/main/photos/newemployee.png)

![Employee](https://github.com/RadithSandeepa/employee-management-module/blob/main/photos/employee.png)

![EditEmployee](https://github.com/RadithSandeepa/employee-management-module/blob/main/photos/editemployee.png)

![Users](https://github.com/RadithSandeepa/employee-management-module/blob/main/photos/users.png)

![NewUser](https://github.com/RadithSandeepa/employee-management-module/blob/main/photos/newuser.png)

![User](https://github.com/RadithSandeepa/employee-management-module/blob/main/photos/user.png)

![EditUser](https://github.com/RadithSandeepa/employee-management-module/blob/main/photos/edituser.png)

<a id="API-Documentation"></a>
## API Documentation

### Base URL

```bash
 /api/auth
```

This API provides endpoints for user authentication, including registration, login, and logout functionality.

---
### **POST** `/register`

Registers a new user by creating a new user account with an encrypted password.

### Request Body

```json
{
  "username": "string",      // Required: Unique username for the user
  "email": "string",         // Required: Email address of the user
  "img": "string",           // Optional: URL or path to the user's profile image
  "phone": "string",         // Required: Phone number of the user
  "password": "string",      // Required: Plaintext password for the user
  "isAdmin": "boolean"       // Optional: Set to true if the user is an admin, default is false
}
```

### Response

- **Status Code**: `200 OK`

```json
{
  "message": "User has been created."
}
```

### Error Responses

- **400 Bad Request**: If required fields are missing or invalid data is provided.
- **500 Internal Server Error**: If there’s an issue during user creation.

---

### **POST** `/login`

Logs in a user by validating their username and password, and returns an authentication token.

### Request Body

```json
{
  "username": "string",      // Required: Username of the user
  "password": "string"       // Required: Plaintext password for the user
}
```

### Response

- **Status Code**: `200 OK`

```json
{
  "details": {
    "username": "string",  // User's username
    "email": "string",     // User's email
    // Other user details except password and isAdmin
  },
  "isAdmin": "boolean"      // User's admin status
}
```

### Cookies

- **access_token**: The authentication token is stored in a cookie for the user to authenticate further requests.

### Error Responses

- **404 Not Found**: If the username is not found.
- **400 Bad Request**: If the password is incorrect or invalid credentials are provided.

---

### **POST** `/logout`

Logs out the current user by clearing the authentication cookie.

### Response

- **Status Code**: `200 OK`

```json
{
  "message": "Logged out successfully!"
}
```

### Error Responses

- **500 Internal Server Error**: If there’s an issue during the logout process.

---

### Example Usage

### Register a User

```bash
POST /api/auth/register
{
  "username": "john_doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "password": "password123"
}
```

### Login a User

```bash
POST /api/auth/login
{
  "username": "john_doe",
  "password": "password123"
}
```

### Logout a User

```bash
POST /api/auth/logout
```

---

### Notes

- Passwords are hashed using `bcrypt` to ensure secure storage.
- Authentication is handled using JWT tokens.
- Cookies are used to store the JWT for authentication in subsequent requests.

### Base URL

```bash
/api/employees
```

This API provides endpoints for managing employees, including creating, updating, deleting, and fetching employee data.

---
### **POST** `/`

Creates a new employee in the system.

### Request Body

```json
{
  "name": "string",               // Required: Name of the employee
  "email": "string",              // Required: Unique email address of the employee
  "NIC": "string",                // Optional: URL or path to the employee's NIC
  "img": "string",                // Optional: URL or path to the employee's profile image
  "birthCertificate": "string",   // Optional: URL or path to the employee's birth certificate
  "position": "string",           // Required: Job position of the employee
  "contactNumber": "string",      // Required: Contact number of the employee
  "NIC_NO": "string"              // Optional: National Identity Card number of the employee
}
```

### Response

- **Status Code**: `200 OK`

```json
{
  "_id": "string",               // Employee ID (auto-generated)
  "name": "string",              // Employee's name
  "email": "string",             // Employee's email
  "NIC": "string",               // URL or path to the the employee's NIC
  "img": "string",               // URL or path to the employee's profile image
  "birthCertificate": "string",  // URL or path to the employee's birth certificate
  "position": "string",          // Employee's job position
  "contactNumber": "string",     // Employee's contact number
  "NIC_NO": "string",            // National Identity Card number of the employee
}
```

### Error Responses

- **400 Bad Request**: If required fields are missing or invalid data is provided.
- **500 Internal Server Error**: If there’s an issue during employee creation.

---

### **PUT** `/:id`

Updates an existing employee by their ID.

### Request Body

```json
{
  "name": "string",              // Optional: Updated name of the employee
  "email": "string",             // Optional: Updated email address of the employee
  "NIC": "string",               // Optional: Updated URL or path to the employee's NIC
  "img": "string",               // Optional: Updated URL or path to the employee's profile image
  "birthCertificate": "string",  // Optional: Updated URL or path to the employee's birth certificate
  "position": "string",          // Optional: Updated job position of the employee
  "contactNumber": "string",     // Optional: Updated contact number of the employee
  "NIC_NO": "string"             // Optional: Updated National Identity Card number of the employee
}
```

### Response

- **Status Code**: `200 OK`

```json
{
  "_id": "string",               // Employee ID (auto-generated)
  "name": "string",              // Employee's updated name
  "email": "string",             // Employee's updated email
  "NIC": "string",               // Updated URL or path to the employee's NIC
  "img": "string",               // Updated URL or path to the employee's profile image
  "birthCertificate": "string",  // Updated URL or path to the employee's birth certificate
  "position": "string",          // Updated job position
  "contactNumber": "string",     // Updated contact number
  "NIC_NO": "string",            // Updated National Identity Card number of the employee
}
```

### Error Responses

- **400 Bad Request**: If invalid data is provided.
- **500 Internal Server Error**: If there’s an issue during the update process.

---

### **DELETE** `/:id`

Deletes an employee by their ID.

### Response

- **Status Code**: `200 OK`

```json
{
  "message": "Employee has been deleted."
}
```

### Error Responses

- **404 Not Found**: If the employee with the given ID does not exist.
- **500 Internal Server Error**: If there’s an issue during the deletion process.

---

### **GET** `/:id`

Fetches a specific employee by their ID.

### Response

- **Status Code**: `200 OK`

```json
{
  "_id": "string",               // Employee ID
  "name": "string",              // Employee's name
  "email": "string",             // Employee's email
  "NIC": "string",               // URL or path to the employee's NIC
  "img": "string",               // URL or path to the employee's profile image
  "birthCertificate": "string",  // URL or path to the employee's birth certificate
  "position": "string",          // Employee's job position
  "contactNumber": "string",     // Employee's contact number
  "NIC_NO": "string",            // National Identity Card number
}
```

### Error Responses

- **404 Not Found**: If the employee with the given ID does not exist.
- **500 Internal Server Error**: If there’s an issue during the fetch process.

---

### **GET** `/`

Fetches a list of all employees.

### Response

- **Status Code**: `200 OK`

```json
[
  {
    "_id": "string",              // Employee ID
    "name": "string",             // Employee's name
    "email": "string",            // Employee's email
    "NIC": "string",              // URL or path to the employee's NIC
    "img": "string",              // URL or path to the employee's profile image
    "birthCertificate": "string", // URL or path to the employee's birth certificate
    "position": "string",         // Employee's job position
    "contactNumber": "string",    // Employee's contact number
    "NIC_NO": "string",           // National Identity Card number
  },
  ...
]
```

### Error Responses

- **500 Internal Server Error**: If there’s an issue fetching the list of employees.

---

### Example Usage

### Create an Employee

```bash
POST /api/employees
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "contactNumber": "+1234567890",
  "position": "Software Engineer",
  "NIC": "http://example.com/nic.pdf",
  "img": "http://example.com/profile.jpg",
  "birthCertificate": "http://example.com/birth-cert.pdf",
  "NIC_NO": "123456789V",
}
```

### Update an Employee

```bash
PUT /api/employees/:id
{
  "name": "Jane Smith",
  "email": "jane.smith@example.com",
  "position": "Senior Software Engineer"
}
```

### Delete an Employee

```bash
DELETE /api/employees/:id
```

### Get a Specific Employee

```bash
GET /api/employees/:id
```

### Get All Employees

```bash
GET /api/employees
```

---

### Notes

- Only an admin is authorized to perform create, update, delete, and fetch operations.
- Employee data is stored securely in the database, and sensitive information should be handled with care.

## Base URL

```bash
/api/users
```

This API provides endpoints for user management, including CRUD operations and password updates.

---
### **PUT** `/api/users/:id`

Updates an existing user by their ID.

### Request Body

```json
{
  "username": "string",      // Optional: Updated username of the user
  "email": "string",         // Optional: Updated email address of the user
  "phone": "string",         // Optional: Updated phone number of the user
  "img": "string"            // Optional: Updated profile image URL
}
```

### Response

- **Status Code**: `200 OK`

```json
{
  "_id": "string",           // User ID
  "username": "string",      // Updated username of the user
  "email": "string",         // Updated email address of the user
  "phone": "string",         // Updated phone number of the user
  "img": "string",           // Updated profile image URL
  "isAdmin": "boolean",      // Whether the user is an admin
  "createdAt": "string",     // Date when the user was created
  "updatedAt": "string"      // Date when the user was last updated
}
```

### Error Responses

- **400 Bad Request**: If invalid data is provided.
- **500 Internal Server Error**: If there’s an issue during the update process.

---

### **DELETE** `/api/users/:id`

Deletes a user by their ID.

### Response

- **Status Code**: `200 OK`

```json
{
  "message": "User has been deleted."
}
```

### Error Responses

- **404 Not Found**: If the user with the given ID does not exist.
- **500 Internal Server Error**: If there’s an issue during the deletion process.

---

### **GET** `/api/users/:id`

Fetches a specific user by their ID.

### Response

- **Status Code**: `200 OK`

```json
{
  "_id": "string",           // User ID
  "username": "string",      // User's username
  "email": "string",         // User's email
  "phone": "string",         // User's phone number
  "isAdmin": "boolean",      // Whether the user is an admin
  "img": "string",           // Profile image URL
  "createdAt": "string",     // Date when the user was created
  "updatedAt": "string"      // Date when the user was last updated
}
```

### Error Responses

- **404 Not Found**: If the user with the given ID does not exist.
- **500 Internal Server Error**: If there’s an issue during the fetch process.

---

### **GET** `/api/users`

Fetches a list of all users.

### Response

- **Status Code**: `200 OK`

```json
[
  {
    "_id": "string",           // User ID
    "username": "string",      // User's username
    "email": "string",         // User's email
    "phone": "string",         // User's phone number
    "isAdmin": "boolean",      // Whether the user is an admin
    "img": "string",           // Profile image URL
    "createdAt": "string",     // Date when the user was created
    "updatedAt": "string"      // Date when the user was last updated
  },
  ...
]
```

### Error Responses

- **500 Internal Server Error**: If there’s an issue fetching the list of users.

---

### **PUT** `/api/users/:id/changepassword`

Updates the password of an existing user.

### Request Body

```json
{
  "password": "string"      // Required: New password for the user
}
```

### Response

- **Status Code**: `200 OK`

```json
{
  "message": "Password updated successfully"
}
```

### Error Responses

- **400 Bad Request**: If the password is not provided or is invalid.
- **500 Internal Server Error**: If there’s an issue updating the password.

---

### Example Usage

### Update a User

```bash
PUT /api/users/:id
{
  "username": "johnSmith",
  "email": "john.smith@example.com"
}
```

### Delete a User

```bash
DELETE /api/users/:id
```

### Get a Specific User

```bash
GET /api/users/:id
```

### Get All Users

```bash
GET /api/users
```

### Update Password

```bash
PUT /api/users/:id/changepassword
{
  "password": "newpassword123"
}
```

---

### Notes

- Passwords are hashed using `bcrypt` to ensure secure storage.
- Authentication is handled by middleware to verify the user's identity (e.g., **verifyUser**, **verifyAdmin**).
- User data, including password changes, is updated in the database securely.

### **Authentication & Authorization Middlewares**

These middleware functions are used to authenticate users and restrict access based on their roles.

---

### **verifyToken**

Verifies whether a user has a valid authentication token.

#### **Usage**
- Ensures that a request contains a valid JWT token.
- Attaches the user’s information to the request object if the token is valid.

#### **Implementation**
```javascript
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};
```

#### **Error Responses**
- **401 Unauthorized**: If no token is provided.
- **403 Forbidden**: If the token is invalid.

---

### **verifyUser**

Ensures that only authenticated users can access or modify their own data.

#### **Usage**
- Allows a user to access their own data.
- Grants access if the user is an **admin**.

#### **Implementation**
```javascript
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};
```

#### **Error Responses**
- **403 Forbidden**: If the user is not the owner of the requested resource and is not an admin.

---

### **verifyAdmin**

Ensures that only **admins** can access certain routes.

#### **Usage**
- Restricts access to admin-only routes.

#### **Implementation**
```javascript
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};
```

#### **Error Responses**
- **403 Forbidden**: If the user is not an admin.

---

## **Example Usage in Routes**

### Protecting a Route with `verifyUser`
```javascript
router.put("/:id", verifyUser, updateUser);
```
**Allows:**  
- The user with the corresponding `id`  
-  Admin users  

### Protecting a Route with `verifyAdmin`
```javascript
router.get("/", verifyAdmin, getUsers);
```
**Allows:**  
-  Admin users only  

---

### **Notes**
- These middlewares use JWT authentication, with tokens stored in cookies.
- Admin privileges override normal user restrictions.
- If authentication fails, an error response is returned immediately.

<a id="Folder-Structure"></a>
## Folder Structure

```
backend/
├── controllers/            # Handles request logic
│   ├── auth.js             # Authentication-related controllers
│   ├── user.js             # User-related controllers
│   └── employee.js         # Employee-related controllers
├── models/                 # Database models
│   ├── User.js             # User schema
│   └── Employee.js         # Employee schema
├── routes/                 # API routes
│   ├── auth.js             # Authentication routes
│   ├── users.js            # User routes
│   └── employees.js        # Employee routes
├── utils/                  # Utility functions
│   ├── error.js            # Error handling
│   └── verifyToken.js      # Middleware for authentication
├── .env                    # Environment variables
├── .gitignore              # Git ignore file
├── index.js                # Main server entry point
├── package.json            # Dependencies and scripts
└── package-lock.json       # Dependency lock file
└── node_modules/           # Dependencies (auto-generated)
```
```
frontend/
├── public/                 # Static assets (favicons, etc.)
├── src/                    # Main source code
│   ├── components/         # Reusable UI components
│   ├── context/            # Global state management
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Main application pages
│   ├── App.jsx             # Main application component
│   ├── datatableSource.jsx # Data table configuration
│   ├── index.css           # Global CSS styles
│   └── main.jsx            # Application entry point
├── .gitignore              # Git ignore file
├── node_modules/           # Dependencies (auto-generated)
├── eslint.config.js        # ESLint configuration
├── index.html              # Main HTML file
├── package-lock.json       # Dependency lock file
├── package.json            # Project metadata and scripts
└── vite.config.js          # Vite configuration file
```


<a id="Setup-Instructions"></a>
## Setup Instructions

### Backend Setup

### **Install Dependencies**
Make sure you have **Node.js** installed, then run:
```bash
cd backend
npm install
```
This installs essential packages like **Express, Mongoose, bcryptjs, dotenv, cors, and jsonwebtoken**.

---

### **Create a `.env` file**  
Inside `backend/`, create a `.env` file and paste the following template:  

```env
MONGO=your_mongodb_connection_string
JWT=your_jwt_secret_key
```

Make sure to replace `your_mongodb_connection_string` and `your_jwt_secret_key` with your actual values.  

---

### **Run the Backend Server**
```bash
npm start
```
Your backend will run on **http://localhost:8800**.

---

### **Dummy Data (data.json)**
To populate your database, retrieve the `data.json` file from the repository and insert some sample data into MongoDB. Here's an example of user data from `data.json`:  
```json
[
  {
    "username": "john_doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "password": "hashed_password",
    "isAdmin": false
  },
  {
    "username": "admin_user",
    "email": "admin@example.com",
    "phone": "+9876543210",
    "password": "hashed_password",
    "isAdmin": true
  }
]
```

### Frontend Setup

### **Install Vite and React**
```bash
cd frontend
npm create vite@latest .
```
Choose `React` as the framework.

Then install dependencies:
```bash
npm install
```

---

### **Run the Frontend Server**
```bash
npm run dev
```
Your frontend will run on **http://localhost:5173**.

