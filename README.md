# Kasparro Aura

An AI-powered customer support orchestration platform designed to streamline merchant issue resolution through intelligent workflows, AI automation, voice interaction, vision-assisted verification, and operational orchestration.

---

# Live Demo

Frontend Deployment (only):

https://kasparro-eight.vercel.app/

---
# Video of Project Demo

https://drive.google.com/file/d/1aX_T6mHGCgOW_1RMhhiRsY5JpGXTqXt3/view?usp=sharing
---

# Published n8n Workflow

https://jaigurupaa.app.n8n.cloud/webhook/aura-live-orchestrator

---

# Core Features

- AI-powered customer complaint orchestration
- Voice-assisted support interaction
- YOLO-based damage verification pipeline
- Real-time operational workflow routing
- Automated escalation and governance handling
- WhatsApp customer notifications via Twilio
- Live claim journey tracking dashboard
- n8n-based workflow automation
- MongoDB-backed case management system
- AI-assisted evidence verification architecture

---

# Tech Stack

## Frontend
- React
- Vite
- Axios
- CSS

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## AI & Automation
- OpenAI
- n8n
- YOLOv8
- Twilio
- Browser Speech APIs

---

# Project Structure

```text
frontend/
backend/
n8n-workflow/
README.md
```

---

# Prerequisites

Install before setup:

- Node.js (v18+ recommended)
- MongoDB Community Server
- Python 3.10+
- pip
- Git
- n8n

---

# Local Installation & Setup

---

# 1. Clone Repository

```bash
git clone https://github.com/OJASVINMARWAH/Kasparro.git
cd Kasparro/aura
```

---

# 2. Frontend Setup

## Install Dependencies

```bash
cd frontend
npm install
```

---

## Create Frontend `.env`

Create:

```bash
frontend/.env
```

Add:

```env
VITE_API_URL=http://localhost:5000
VITE_N8N_WEBHOOK=http://localhost:5678/webhook-test/aura-live-orchestrator
```

---

## Run Frontend

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# 3. Backend Setup

Open new terminal:

```bash
cd backend
npm install
```

---

## Create Backend `.env`

Create:

```bash
backend/.env
```

Add:

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_URI

OPENAI_API_KEY=YOUR_OPENAI_API_KEY

N8N_WEBHOOK_URL=http://localhost:5678/webhook-test/aura-live-orchestrator

TWILIO_ACCOUNT_SID=YOUR_TWILIO_SID

TWILIO_AUTH_TOKEN=YOUR_TWILIO_AUTH_TOKEN

TWILIO_PHONE_NUMBER=YOUR_TWILIO_PHONE_NUMBER
```

---

## Run Backend

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

# 4. YOLO Vision Detection Setup

## Install Python Dependencies

Inside backend folder:

```bash
pip install ultralytics opencv-python flask flask-cors
```

---

## YOLO Model

The project uses:

```text
yolov8n.pt
```

The model downloads automatically during first execution.

---

## Run Vision Server

Inside backend:

```bash
python vision_server.py
```

OR:

```bash
python detect.py
```

depending on your project filename.

---

# 5. n8n Setup

## Install n8n

```bash
npm install -g n8n
```

---

## Start n8n

```bash
n8n
```

n8n runs on:

```text
http://localhost:5678
```

---

# 6. Import Workflow

1. Open:
```text
http://localhost:5678
```

2. Click:
```text
Import from File
```

3. Import:
```text
aura-workflow.json
```

4. Save workflow

5. Publish workflow

---

# 7. MongoDB

Ensure MongoDB service is running locally.

Default local MongoDB:

```text
mongodb://127.0.0.1:27017
```

---

# Full Startup Order

Run ALL services simultaneously.

---

## Terminal 1 — MongoDB

```bash
mongod
```

---

## Terminal 2 — Backend

```bash
cd backend
npm run dev
```

---

## Terminal 3 — Vision Server

```bash
cd backend
python vision_server.py
```

---

## Terminal 4 — n8n

```bash
n8n
```

---

## Terminal 5 — Frontend

```bash
cd frontend
npm run dev
```

---

# Final Running URLs

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:5000 |
| n8n | http://localhost:5678 |
| Vision Detection API | http://localhost:5000/api/vision/detect |

---

# API Endpoints

## AI Workflow Route

```http
POST /api/ai/workflow
```

---

## Vision Detection

```http
POST /api/vision/detect
```

---

# Demo Flow

1. Open:
```text
http://localhost:5173
```

2. Start voice session

3. Speak customer complaint

4. AI workflow orchestrates:
- intake analysis
- governance routing
- verification workflow
- backend synchronization
- WhatsApp notification

5. Dashboard updates in real-time.

---

# Contributors

## Ojasvin Marwah
- III Year Computer Science Engineering, TIET Patiala
- contact : omarwah_be23@thapar.edu

## Hurreet Kaur
-  III Year Computer Science Engineering, TIET Patiala
-  contact : hkaur6_be23@thapar.edu

---

# License

This project is intended for educational, research, and innovation purposes.
