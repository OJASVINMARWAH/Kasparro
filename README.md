# Kasparro Aura

An AI-powered customer support orchestration platform designed to streamline merchant issue resolution through intelligent workflows, multilingual assistance, workflow automation, operational intelligence, voice interaction, and AI-assisted evidence verification.

---

# Live Demo

## Frontend Deployment

https://kasparro-eight.vercel.app/

---

# Published n8n Workflow

https://jaigurupaa.app.n8n.cloud/webhook/aura-live-orchestrator

---

# Overview

Kasparro Aura is designed as a modern AI-driven support ecosystem that combines:

- Conversational AI
- Workflow orchestration
- Operational routing
- Multilingual customer support
- Evidence handling
- Escalation management
- Vision-assisted workflows
- Voice interaction placeholders
- WhatsApp notification pipelines
- Real-time operational synchronization

The platform integrates:

- React + Vite frontend
- Express backend APIs
- MongoDB database
- n8n workflow orchestration
- OpenAI-powered AI assistance
- YOLO-based vision detection
- Twilio notification support

---

# Core Features

## AI Customer Support

Aura acts as a multilingual AI support assistant capable of:

- Understanding customer complaints
- Providing empathetic responses
- Guiding users through workflows
- Generating operational insights
- Performing intelligent orchestration

---

## Workflow Orchestration with n8n

The system uses n8n to coordinate intelligent operational flows including:

- Governance pipelines
- Decision routing
- Escalation handling
- Resolution management
- Evidence workflows
- Notification systems
- Backend synchronization

---

## Merchant & Case Intelligence

Aura supports:

- Case creation
- Complaint tracking
- Evidence management
- Workflow escalation
- Operational synchronization
- Real-time journey updates

---

## Voice Interaction Placeholder

The frontend currently includes browser-based speech synthesis to simulate conversational voice support.

This architecture is extensible toward:

- Real-time voice agents
- ElevenLabs integration
- Streaming AI conversations
- OpenAI speech systems

---

## Vision Pipeline Support

The backend architecture includes computer vision workflow preparation using:

- YOLO-based detection pipeline
- Python vision utilities
- Evidence-oriented processing
- Damage detection simulation

---

# System Architecture

```text
Frontend (React + Vite)
        ↓
Express Backend APIs
        ↓
n8n Workflow Orchestration
        ↓
AI / Governance / Routing Engines
        ↓
MongoDB + Notifications + Voice Layer
```

---

# User Flow

## Customer Interaction Flow

```text
User submits complaint
        ↓
Frontend sends request to backend
        ↓
Backend triggers n8n orchestration workflow
        ↓
Workflow routes issue intelligently
        ↓
AI processes operational context
        ↓
Notifications and workflow actions execute
        ↓
Customer receives response
```

---

# Tech Stack

## Frontend

- React
- Vite
- Axios
- CSS

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- OpenAI SDK
- Axios

---

## Workflow & Automation

- n8n Cloud
- Webhook orchestration
- Operational routing

---

## AI & Intelligence

- OpenAI GPT models
- Conversational AI workflows
- AI orchestration architecture
- YOLO Vision Detection

---

# Project Structure

```text
frontend/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── styles/
│
backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── services/
│       ├── agents/
│       └── orchestration/
│
n8n-workflow/
```

---

# Prerequisites

Install the following before running locally:

- Node.js (v18+ recommended)
- MongoDB Community Server
- Python 3.10+
- pip
- Git
- n8n

---

# Local Installation

## 1. Clone Repository

```bash
git clone https://github.com/OJASVINMARWAH/Kasparro.git
cd Kasparro
```

---

# Frontend Setup

## Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

## Frontend `.env`

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

# Backend Setup

## Install Backend Dependencies

```bash
cd ../backend
npm install
```

---

## Backend `.env`

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

# YOLO Vision Detection Setup

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

# n8n Setup

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

# Import Workflow

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

# MongoDB

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

## Transcript Analysis

```http
POST /api/ai/analyze-transcript
```

---

## Vision Detection

```http
POST /api/vision/detect
```

---

# Deployment

## Frontend Deployment

Frontend is deployed using:

- Vercel

---

## Backend Deployment

Backend deployment architecture supports:

- Vercel serverless functions
- Local Node.js deployment

---

## Workflow Deployment

Workflow orchestration is deployed using:

- n8n Cloud

---

# Features Demonstrated

- Voice complaint intake
- AI workflow orchestration
- Live object verification
- Automated case routing
- WhatsApp notifications
- Real-time claim journey tracking
- Human escalation pipeline
- AI operational intelligence

---

# Future Roadmap

- Real-time AI voice agents
- Advanced vision intelligence
- Autonomous escalation systems
- Live operational dashboards
- Streaming conversational workflows
- Merchant analytics layer
- Multi-agent orchestration
- Enterprise support tooling

---

# Development Philosophy

Kasparro Aura focuses on building:

- Human-centric AI systems
- Operational intelligence layers
- Workflow-first automation
- Scalable support ecosystems
- AI-assisted merchant experiences

---

# Contributors

Built by:

## Ojasvin Marwah

- 3rd Year Computer Science Engineering Student
- Thapar Institute of Engineering & Technology, Patiala

## Hurreet Kaur

- 3rd Year Computer Science Engineering Student
- Thapar Institute of Engineering & Technology, Patiala

---

# License

This project is intended for educational, research, and innovation purposes.
