# RMS Backend API (Research Management System)

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

This is the backend server for the Research Management System. It's a REST API built with Node.js and Express that handles user authentication and data management for research projects.

---

## 🚀 Deployment

This API is deployed on **Azure App Service** and is configured for continuous integration and deployment (CI/CD) using **GitHub Actions**. Every push to the `main` branch automatically triggers a new deployment to the live environment.

**Live API Endpoint:** `https://your-backend-name.azurewebsites.net/api`

---

## 🛠️ Tech Stack

* **Server:** Node.js, Express.js
* **Database:** PostgreSQL
* **Authentication:** JSON Web Tokens (JWT)
* **Security:** Password hashing with `bcrypt.js`, Cross-Origin Resource Sharing (CORS)

---

## ⚙️ Configuration & Local Setup

To run this project locally, you must create a `.env` file in the root directory and add the following environment variables:

.env file for rms-backend
DATABASE_URL="postgresql://YOUR_DB_USER:YOUR_DB_PASSWORD@YOUR_DB_HOST:5432/YOUR_DB_NAME"
PORT=5001
CORS_ORIGIN=http://localhost:5173

Security
SECURITY_METHOD=jwt
JWT_SECRET=your-super-secret-and-long-string-for-jwt
JWT_EXPIRES_IN=1h


---

## 🏃‍♀️ Running Locally

1.  Clone the repository.
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
