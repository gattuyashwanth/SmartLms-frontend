# SmartLMS — React Frontend

A modern React Single Page Application (SPA) for **SmartLMS (Smart Learning Management System)**. The application provides a learning platform where students can access courses and video lessons, while teachers and administrators access role-based features.

## 🚀 Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite 5
- **Routing:** React Router v6
- **Styling:** TailwindCSS
- **State Management:** React Context API
- **Authentication:** JWT-based authentication
- **Client-Side Storage:** LocalStorage
- **Real-Time Messaging:** WebSocket client
- **Backend:** Java Spring Boot REST API
- **Database:** MySQL
- **Database Hosting:** Aiven
- **Backend Deployment:** Render
- **Frontend Deployment:** Vercel

## ✨ Features

- User login and registration
- Role-based access for administrators, teachers, and students
- Course browsing and course details
- Embedded YouTube video lessons
- Assignment management
- Student assignment submissions
- File attachments
- REST API integration
- Real-time messaging support
- Responsive user interface
- Cloud-hosted database integration

## 🔑 Demo Login Credentials

Use the following teacher account to test the teacher features of SmartLMS.

| Field | Details |
|---|---|
| Role | Teacher |
| Name | ram |
| Email | `ram@gmail.com` |
| Password | `12345678` |

**Important:** These credentials are intended for demonstration only. If this README is hosted in a public GitHub repository, anyone can view them. Use a dedicated demo account with no sensitive data, and change the password before using the account for real work.

## 📚 Available Courses

SmartLMS includes the following six courses:

1. C Programming
2. Java Programming
3. Python Programming
4. HTML & CSS
5. Database Management Systems (DBMS)
6. React JS

Each course includes course information and an associated video lesson.

## 🛠️ Prerequisites

Install the following tools before running the frontend:

- Node.js
- npm
- Git

## 📂 Project Structure

```text
smartlms-frontend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
├── vercel.json
└── README.md
```

*Note: This is a representative structure. Your actual directory names may differ.*

## ⚙️ Environment Variables

Create a `.env` file in the frontend root directory for local development:

```env
VITE_API_BASE_URL=http://localhost:8008/api
```

This example assumes your local Spring Boot backend runs on port `8008` and exposes the expected API under `/api`.

### Production Environment

Configure the following variable in Vercel under **Project Settings → Environment Variables**.

| Variable | Example Value | Description |
|---|---|---|
| `VITE_API_BASE_URL` | `https://smartlms-backend-2miu.onrender.com/api` | Base URL for backend API requests |

Replace the example URL with your actual Render backend API URL.

**Security:** Never put database passwords, JWT signing secrets, or other private credentials in frontend environment variables. Vite variables are included in the client-side build.

## 💻 Local Development

### 1. Clone the Repository

```bash
git clone YOUR_FRONTEND_REPOSITORY_URL
cd smartlms-frontend
```

Replace `YOUR_FRONTEND_REPOSITORY_URL` with your actual GitHub repository URL.

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure the Environment

Create a `.env` file and add:

```env
VITE_API_BASE_URL=http://localhost:8008/api
```

Ensure your backend is running and accessible at the configured URL.

### 4. Start the Development Server

```bash
npm run dev
```

Vite commonly starts at:

```text
http://localhost:5173
```

The actual port may differ depending on your configuration. Check the terminal output for the exact local URL.

### 5. Build the Application

```bash
npm run build
```

The production build is generated in the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

## 🌐 Deployment on Vercel

### Step 1: Push the Frontend to GitHub

Commit and push your frontend code to your GitHub repository.

### Step 2: Import the Repository

1. Open [Vercel](https://vercel.com/).
2. Sign in to your account.
3. Select **Add New → Project**.
4. Import your SmartLMS frontend repository.

### Step 3: Configure Build Settings

| Setting | Value |
|---|---|
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

### Step 4: Configure Environment Variables

Add `VITE_API_BASE_URL` with your deployed backend API URL.

Example:

```text
https://your-render-backend.onrender.com/api
```

### Step 5: Deploy

Click **Deploy** and wait for the build to complete.

### Step 6: Configure React Router

Ensure `vercel.json` contains a suitable rewrite rule directing frontend routes to `index.html`, so refreshing nested React Router pages does not return a 404 error.

## 🔗 Backend and Database

SmartLMS uses a separate Spring Boot backend and a MySQL database.

- **Backend:** Java and Spring Boot
- **Backend Hosting:** Render
- **Database:** MySQL
- **Database Hosting:** Aiven

The frontend communicates with the backend through API requests and configured WebSocket connections. It must never connect directly to MySQL.

## 🔐 Security

- Store passwords using the backend's configured password encoder.
- Keep database credentials and JWT secrets out of GitHub.
- Enforce authorization on the backend.
- Validate uploaded files and restrict access appropriately.
- Use HTTPS for production connections.
- Configure CORS to allow the deployed frontend domain.
- Avoid publishing personal or production account credentials.

## 🐛 Troubleshooting

### API requests fail

- Verify `VITE_API_BASE_URL`.
- Confirm the Render backend is running.
- Check API endpoint paths and the `/api` prefix.
- Inspect the browser's Network and Console tabs.
- Verify the backend's CORS configuration.

### Environment changes do not appear

Trigger a new Vercel deployment after changing environment variables.

### Login succeeds but the teacher dashboard does not appear

- Confirm the user's database role.
- Log out and log in again to refresh authentication state.
- Verify that backend role checks and frontend route handling use compatible role names.

### Refreshing a nested route returns 404

Check the SPA rewrite configuration in `vercel.json`.

## 🔮 Future Enhancements

- Student learning progress tracking
- Course recommendations
- Improved teacher and student dashboards
- Assignment feedback and evaluation
- Additional learning resources
- Enhanced accessibility and monitoring

## 🎯 Project Objective

The objective of SmartLMS is to provide a centralized online learning platform where students can access programming courses and video lessons, and teachers can organize course content and assignments.

## 👨‍💻 Author

**Gattu Yashwanth**

- **GitHub:** [gattuyashwanth](https://github.com/gattuyashwanth)
- **LinkedIn:** [Gattu Yashwanth](https://www.linkedin.com/in/gattu-yashwanth-864670322/)

---

**SmartLMS — Making online learning simple, accessible, and organized.**