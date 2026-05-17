# Kasparro Aura

An AI-powered customer support orchestration platform designed to streamline merchant issue resolution through intelligent workflows, multilingual assistance, workflow automation, and operational intelligence.

---

# Live Demo

Frontend Deployment:

[https://kasparro-eight.vercel.app/](https://kasparro-eight.vercel.app/)

---

# Overview

Kasparro Aura is designed as a modern AI-driven support ecosystem that combines:

* Conversational AI
* Workflow orchestration
* Operational routing
* Multilingual customer support
* Evidence handling
* Escalation management
* Vision-assisted workflows
* Voice interaction placeholders
* WhatsApp notification pipelines

The platform integrates:

* React + Vite frontend
* Express backend APIs
* MongoDB database
* n8n workflow orchestration
* OpenAI-powered AI assistance
* Twilio notification support

---

# Core Features

## AI Customer Support

Aura acts as a multilingual AI support assistant capable of:

* Understanding customer complaints
* Providing empathetic responses
* Guiding users through workflows
* Generating operational insights

---

## Workflow Orchestration with n8n

The system uses n8n to coordinate intelligent operational flows including:

* Governance pipelines
* Decision routing
* Escalation handling
* Resolution management
* Evidence workflows
* Notification systems

---

## Merchant & Case Intelligence

Aura supports:

* Case creation
* Complaint tracking
* Evidence management
* Workflow escalation
* Operational synchronization

---

## Voice Interaction Placeholder

The frontend currently includes placeholder browser speech synthesis to simulate conversational voice support.

This architecture is extensible toward:

* Real-time voice agents
* ElevenLabs integration
* Streaming AI conversations
* OpenAI speech systems

---

## Vision Pipeline Support

The backend architecture includes computer vision workflow preparation using:

* YOLO-based detection pipeline
* Python vision utilities
* Evidence-oriented processing

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

* React
* Vite
* Axios
* CSS

---

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* OpenAI SDK
* Axios

---

## Workflow & Automation

* n8n Cloud
* Webhook orchestration
* Operational routing

---

## AI & Intelligence

* OpenAI GPT models
* Conversational AI workflows
* AI orchestration architecture

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
```

---

# Local Installation

## 1. Clone Repository

```bash
git clone https://github.com/OJASVINMARWAH/Kasparro.git
```

---

## 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

## 3. Install Backend Dependencies

```bash
cd ../backend
npm install
```

---

# Environment Variables

## Backend `.env`

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_URI

OPENAI_API_KEY=YOUR_OPENAI_API_KEY

N8N_WEBHOOK_URL=YOUR_N8N_WEBHOOK_URL
```

---

## Frontend `.env`

```env
VITE_API_URL=YOUR_BACKEND_URL
```

---

# Running Locally

## Start Backend

```bash
npm start
```

---

## Start Frontend

```bash
npm run dev
```

---

# Deployment

## Frontend Deployment

Frontend is deployed using:

* Vercel

---

## Backend Deployment

Backend deployment uses:

* Vercel serverless functions

---

## Workflow Deployment

Workflow orchestration is deployed using:

* n8n Cloud

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

# Future Roadmap

* Real-time AI voice agents
* Advanced vision intelligence
* Autonomous escalation systems
* Live operational dashboards
* Streaming conversational workflows
* Merchant analytics layer
* Multi-agent orchestration
* Enterprise support tooling

---

# Development Philosophy

Kasparro Aura focuses on building:

* Human-centric AI systems
* Operational intelligence layers
* Workflow-first automation
* Scalable support ecosystems
* AI-assisted merchant experiences

---

# Contributors

Built by:

* Ojasvin Marwah

---

# License

This project is intended for educational, research, and innovation purposes.
