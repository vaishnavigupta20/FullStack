# 📍 Local Job Portal - Full Stack Application

## 🚀 Project Overview
A location-based digital marketplace designed to bridge the gap between local service providers (workers) and employers. This application uses **Geospatial Indexing** to allow users to find job opportunities based on their real-time physical proximity.



## 🛠️ Tech Stack
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (with 2dsphere Geospatial Indexing)
* **Authentication:** JWT (JSON Web Tokens) with Bcryptjs hashing
* **Media Storage:** Cloudinary API for profile pictures/avatars
* **Backend Testing:** Postman API Documentation



## ✨ Key Features
* **Role-Based Access:** Separate dashboards and permissions for 'Employers' and 'Workers'.
* **Proximity Search:** Find jobs within a specific radius (e.g., 5km) using MongoDB's `$near` operator.
* **Secure Authentication:** Private routes protected by custom JWT middleware.
* **Profile Management:** Full CRUD operations for user profiles including image uploads.



## 📄 Software Requirements Specification (SRS)

### 1. Introduction
The **Local Job Portal** aims to provide a platform for daily-wage and skilled labor to find work within their immediate vicinity without third-party intermediaries.

### 2. Functional Requirements (FR)
* **FR1: User Auth:** System shall allow registration and login with encrypted passwords.
* **FR2: Geo-Search:** System shall filter jobs by `longitude` and `latitude`.
* **FR3: Job Management:** Employers shall be able to Create, Read, Update, and Delete (CRUD) job posts.
* **FR4: Image Processing:** System shall handle image compression and cloud storage via Cloudinary.

### 3. Non-Functional Requirements (NFR)
* **Security:** High-standard password salting and secure environment variable management.
* **Latency:** Geospatial queries must return results in under 200ms using 2dsphere indexes.
* **Scalability:** Modular "Model-Controller-Route" architecture for easy feature expansion.

---

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/vaishnavigupta20/FullStack.git](https://github.com/vaishnavigupta20/FullStack.git)
   cd FullStack/server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the `/server` folder:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   NODE_ENV=development
   ```

4. **Run the application:**
   ```bash
   npm run dev
   ```

---

## 🗺️ API Endpoints Summary
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| POST | `/api/auth/register` | Create a new user account | No |
| POST | `/api/auth/login` | Authenticate user & get token | No |
| GET | `/api/jobs/nearby` | Search jobs by GPS coordinates | No |
| POST | `/api/jobs` | Post a new local job vacancy | Yes (Bearer) |
| GET | `/api/users/profile` | Retrieve current user details | Yes (Bearer) |

