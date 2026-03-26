
---

# 📄 Software Requirement Specification (SRS)
**Project Title:** Local Job Portal (Full-Stack)  
**Stack:** MERN (MongoDB, Express, React, Node.js)

---

## 1. Introduction
### 1.1 Purpose
The purpose of this document is to define the functional and non-functional requirements for the "Local Job Portal" application. The system connects local service providers (Workers) with residents or businesses (Employers) based on geographic proximity.

### 1.2 Scope
The application will provide a web-based interface for user registration, job posting, and location-based job discovery using real-time GPS coordinates.

---

## 2. System Architecture
The system follows the **MERN** stack architecture:
* **Frontend:** React.js (State management, UI/UX, Routing)
* **Backend:** Node.js & Express (REST API, Auth Middleware)
* **Database:** MongoDB (Data storage, Geospatial Indexing)
* **Communication:** JSON via RESTful API calls.



---

## 3. Functional Requirements (FR)

### 3.1 User Authentication & Profile
* **FR1.1 Registration:** Users must be able to sign up as either an 'Employer' or a 'Worker'.
* **FR1.2 Login:** Secure login using JWT (JSON Web Tokens).
* **FR1.3 Profile Management:** Users can update their name, phone number, and upload a profile picture (stored via Cloudinary).

### 3.2 Employer Features (Job Management)
* **FR2.1 Post Job:** Employers can create job listings by providing a title, description, salary, and location (Latitude/Longitude).
* **FR2.2 Manage Jobs:** Employers can view, edit, or delete their own job postings.

### 3.3 Worker Features (Job Discovery)
* **FR3.1 Proximity Search:** Workers can view jobs within a specific radius (e.g., 5km) of their current location.
* **FR3.2 Contact:** Workers can view the employer's WhatsApp number to initiate contact.

### 3.4 Frontend Requirements (React)
* **FR4.1 Responsive Design:** UI built with HTML5/CSS3 (or Tailwind/Bootstrap) to work on mobile and desktop.
* **FR4.2 State Management:** Use React Hooks (`useState`, `useEffect`) to manage user sessions and job data.
* **FR4.3 Protected Routes:** Prevent unauthenticated users from accessing the 'Post Job' or 'Profile' pages.

---

## 4. Non-Functional Requirements (NFR)

* **NFR4.1 Security:** All passwords must be hashed using `bcryptjs` before being stored in MongoDB.
* **NFR4.2 Performance:** Proximity searches must use `2dsphere` indexing to ensure results are returned in under 300ms.
* **NFR4.3 Usability:** The frontend must provide clear feedback (loading spinners, success/error toasts) for API calls.

---

## 5. Data Requirements (Schema)

### 5.1 User Schema
| Field | Type | Description |
| :--- | :--- | :--- |
| `name` | String | Full name of the user |
| `email` | String | Unique email for login |
| `password` | String | Hashed password |
| `role` | String | 'worker' or 'employer' |
| `phoneNumber`| String | Contact number for job verification |

### 5.2 Job Schema
| Field | Type | Description |
| :--- | :--- | :--- |
| `title` | String | Name of the job |
| `location` | Object | GeoJSON Point (coordinates) |
| `salary` | String | Payment details |
| `postedBy` | ObjectId | Reference to the Employer |



---

## 6. External Interface Requirements
* **API:** RESTful endpoints.
* **Cloud Services:** Cloudinary for image hosting.
* **Deployment:** GitHub for version control (already configured).

---
