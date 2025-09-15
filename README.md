🚀 Containerized Redis Joke App
This project is a full-stack web application that uses Redis for storage, a Node.js backend, a React frontend, and Nginx as a reverse proxy. The app is fully containerized with Docker and deployed using a CI/CD pipeline with GitHub Actions and Docker Hub.

📂 Project Structure
containerized-redis-joke-app/
│── backend/           # Node.js backend (Express + Redis)
│── frontend/          # React frontend
│── nginx.conf         # Nginx reverse proxy configuration
│── docker-compose.yml # Multi-container setup
└── .github/workflows/ # GitHub Actions CI/CD pipeline

🛠️ Tech Stack

Frontend: React + Nginx

Backend: Node.js + Express

Database/Cache: Redis

Containerization: Docker & Docker Compose

CI/CD: GitHub Actions + Docker Hub + Azure VM

⚙️ Setup & Run Locally
git clone https://github.com/<your-username>/containerized-redis-joke-app.git
cd containerized-redis-joke-app
docker compose up -d --build

Frontend → http://localhost

Backend API → http://localhost:5000/api

Redis → port 6379

📦 Docker Images

Backend → dockerhub-username/redis-backend:latest

Frontend → dockerhub-username/redis-frontend:latest

Redis → redis:7-alpine

Nginx → nginx:alpine

🔄 How This Project Works

1.User Interaction

The user visits the frontend (React app served via Nginx).

The UI allows requesting a random joke.

Frontend → Backend

The frontend sends an HTTP request to the backend (Node.js Express server).

2.Backend → Redis

The backend first checks Redis for a cached joke.

If a cached joke exists → it is returned immediately.

If not → the backend fetches a joke from a third-party API (or generates it), stores it in Redis, and returns it.

3.Response

The joke is displayed on the frontend.

Redis caching ensures faster responses on repeated requests.

4.Nginx Proxy

Nginx acts as a reverse proxy, routing requests between the frontend, backend, and Redis services.

5.CI/CD Flow

On every push to master, GitHub Actions builds Docker images, pushes them to Docker Hub, then deploys on an Azure VM using docker compose.

🔄 CI/CD Pipeline

The pipeline (defined in .github/workflows/cicd.yml) automates:

1.Continuous Integration → Build & test backend and frontend

2.Continuous Deployment → Build & push Docker images → Deploy to Azure VM

📑 Improvements

✅ Cache dependencies in CI for faster builds

✅ Health checks in docker-compose.yml

✅ Separate staging & production environments

🔜 Add monitoring (Grafana/Prometheus)

🔜 Add auto rollback on failed deployment


🤝 Contributing

1.Fork the repo

2.Create a branch (feature-xyz)

3.Commit & push changes

4.Open a Pull Request
