# SmartLMS — React Frontend

Modern React SPA frontend for Smart Learning Management System (SmartLMS), built with Vite and TailwindCSS.

## 🚀 Tech Stack
- **Framework:** React 18 + Vite 5
- **Routing:** React Router v6
- **Styling:** TailwindCSS
- **State/Auth:** React Context API + LocalStorage JWT
- **Real-Time Messaging:** WebSocket client (Class Connect)
- **Deployment:** Vercel

---

## ⚙️ Environment Variables

Create a `.env` file for local development:

```env
VITE_API_BASE_URL=http://localhost:8008/api
```

When deploying on **Vercel**, set this in **Project Settings** → **Environment Variables**:

| Variable | Example Value | Description |
| :--- | :--- | :--- |
| `VITE_API_BASE_URL` | `https://smartlms-backend-2miu.onrender.com/api` | Render backend URL + `/api` |

---

## 🛠️ Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev
```

App will run on `http://localhost:3000`.

---

## 🌐 Deploying to Vercel

1. Create a new repository on GitHub (e.g. `smartlms-frontend`) and push the `frontend` code to it.
2. Sign in to [Vercel](https://vercel.com/).
3. Click **Add New…** → **Project**.
4. Import your `smartlms-frontend` repository.
5. In project settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
6. Under **Environment Variables**, add:
   - Key: `VITE_API_BASE_URL`
   - Value: `https://<your-backend-app>.onrender.com/api`
7. Click **Deploy**.
8. The included `vercel.json` ensures all React Router routes work seamlessly without 404 errors.
