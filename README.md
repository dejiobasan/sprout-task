# Sprout Task

Sprout Task containing the folders `sprout-task-api` and `sprout-webapp`

---

## Prerequisites

Make sure you have all of the following installed:

- **Node.js** v22+ and **Yarn** — for local development
- **Docker** — for containerised development
- **PostgreSQL** — for database

---

## Running the Backend/Api

### 1. Navigate into the sprout-task-api folder

**macOS / Linux / Git Bash**
```bash
cd sprout-task-api
```

**Windows (Command Prompt)**
```cmd
cd sprout-task-api
```

**Windows (PowerShell)**
```powershell
Set-Location sprout-task-api
```

---

### 2. Create a `.env` file in the `sprout-task-api` folder and add the following variables

**macOS / Linux / Git Bash**
```bash
touch .env
```

**Windows (Command Prompt)**
```cmd
type nul > .env
```

**Windows (PowerShell)**
```powershell
New-Item -ItemType File -Name ".env"
```

Then copy the following into the `.env` file and replace the values with your own:

```env
PORT = "8000"

#postgres
POSTGRES_USER= "YOUR_USERNAME"
POSTGRES_PASSWORD= "YOUR_PASSWORD"
POSTGRES_DB= "sprout"
DATABASE_URL="postgresql://YOUR_USERNAME:YOUR_PASSWORD@sprout-db:5432/sprout?schema=public"

#Client Url
CORS_ORIGIN = "http://localhost:5173"
```

---

### 3. Run the Docker container

```bash
docker compose up --build
```

> Works the same on macOS, Linux, and Windows (Command Prompt, PowerShell, or Git Bash).

---

### 4. View the API documentation

Navigate to **http://localhost:8000/api** to view the Swagger documentation for the endpoints.

---

### 5. Run the tests

```bash
yarn test
```

> Works the same on all platforms.

---

## Running the Frontend/Webapp

### 1. Navigate into the sprout-webapp folder

**macOS / Linux / Git Bash**
```bash
cd sprout-webapp
```

**Windows (Command Prompt)**
```cmd
cd sprout-webapp
```

**Windows (PowerShell)**
```powershell
Set-Location sprout-webapp
```

---

### 2. Run the Docker container

**macOS / Linux / Git Bash**
```bash
docker build -t sprout-webapp . && docker run -p 5173:5173 sprout-webapp
```

**Windows (Command Prompt)** — `&&` may not work in older versions, run these separately:
```cmd
docker build -t sprout-webapp .
docker run -p 5173:5173 sprout-webapp
```

**Windows (PowerShell)**
```powershell
docker build -t sprout-webapp .; docker run -p 5173:5173 sprout-webapp
```

---

### 3. View the webapp

Navigate to **http://localhost:5173** to view the webapp.
