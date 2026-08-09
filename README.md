# 🤖 AI Interview Agent

**AI-powered technical interview practice platform built for the ABTalks AI Hackathon 2026.**

AI Interview Agent helps candidates practice technical interviews through AI-generated questions and structured evaluation. Candidates can configure their **job role, experience level, interview type, and interview length**, then receive personalized interview questions and actionable performance feedback.

## 🚀 Live Demo

**Frontend:**
https://ai-interview-agent-three-theta.vercel.app/

**Interview:**
https://ai-interview-agent-three-theta.vercel.app/interview

**Backend API / Swagger Docs:**
https://ai-interview-agent-backend-pmvc.onrender.com/docs

## ✨ Features

* 🎯 Personalized interview setup
* 💼 Role-based interview questions
* 📊 Experience-level-aware questioning
* 💻 Technical interviews
* 🗣️ Behavioral interviews
* ⚡ Mixed interview mode
* ⏱️ Multiple interview lengths
* 🤖 AI-generated interview questions
* 🧠 AI-powered answer evaluation
* 📈 Technical accuracy scoring
* 💬 Communication scoring
* 🎯 Relevance scoring
* 🧩 Problem-solving scoring
* ⭐ Overall performance score
* 💪 Strength identification
* 🔧 Personalized improvement suggestions
* 📝 Example of a stronger answer
* 📊 Interview performance dashboard
* 📚 Interview history

## 🧠 How It Works

```text
Candidate
   │
   ▼
Configure Interview
   │
   ├── Role
   ├── Experience Level
   ├── Interview Type
   └── Interview Length
   │
   ▼
AI Generates Interview Question
   │
   ▼
Candidate Answers
   │
   ▼
AI Evaluates Answer
   │
   ├── Technical Accuracy
   ├── Communication
   ├── Relevance
   └── Problem Solving
   │
   ▼
Score + Feedback
   │
   ▼
Final Interview Report
```

## 🏗️ Architecture

```text
┌─────────────────────────────┐
│        React Frontend       │
│       Vite + Tailwind       │
└──────────────┬──────────────┘
               │
               │ HTTP / REST API
               ▼
┌─────────────────────────────┐
│       FastAPI Backend       │
│                             │
│  API Routes                 │
│  Interview Services         │
│  Evaluation Logic           │
└───────┬─────────────┬───────┘
        │             │
        ▼             ▼
┌──────────────┐  ┌──────────────┐
│ OpenAI API   │  │ SQLite DB    │
│ AI Questions │  │ SQLAlchemy   │
│ Evaluation   │  │              │
└──────────────┘  └──────────────┘
```

## 🛠️ Tech Stack

### Frontend

* React 19
* Vite
* Tailwind CSS v4
* React Router
* Axios
* Framer Motion
* Lucide React

### Backend

* Python
* FastAPI
* Uvicorn
* SQLAlchemy
* Pydantic
* Python-dotenv

### AI

* OpenAI API
* Configurable OpenAI model

### Database

* SQLite
* SQLAlchemy ORM

### Deployment

* Vercel — Frontend
* Render — Backend

## 📁 Project Structure

```text
AI-Interview-Agent/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── routes.py
│   │   ├── core/
│   │   │   └── config.py
│   │   ├── db/
│   │   │   └── database.py
│   │   ├── models/
│   │   │   └── interview.py
│   │   ├── schemas/
│   │   │   └── interview.py
│   │   ├── services/
│   │   │   └── openai_service.py
│   │   └── main.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── services/
│   ├── package.json
│   └── vite.config.js
│
└── ai-usage-log.md
```

## ⚙️ Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/Codedbyriyad/AI-Interview-Agent.git
cd AI-Interview-Agent
```

### 2. Backend Setup

```bash
cd backend

pip install -r requirements.txt
```

Create a `.env` file:

```env
OPENAI_API_KEY=your_openai_api_key
MODEL_NAME=gpt-4o-mini
```

Start the backend:

```bash
uvicorn app.main:app --reload
```

Backend will run at:

```text
http://localhost:8000
```

API documentation:

```text
http://localhost:8000/docs
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run at:

```text
http://localhost:5173
```

For local development, configure:

```env
VITE_API_URL=http://localhost:8000
```

## 🔐 Environment Variables

### Backend

| Variable         | Description                          |
| ---------------- | ------------------------------------ |
| `OPENAI_API_KEY` | OpenAI API key                       |
| `MODEL_NAME`     | OpenAI model used by the application |

### Frontend

| Variable       | Description            |
| -------------- | ---------------------- |
| `VITE_API_URL` | URL of the backend API |

**Never commit API keys or other secrets to GitHub.**

## 📊 AI Evaluation

Each candidate response is evaluated across four dimensions:

| Criterion          | Description                                         |
| ------------------ | --------------------------------------------------- |
| Technical Accuracy | Correctness of the technical explanation            |
| Communication      | Clarity and quality of communication                |
| Relevance          | How directly the answer addresses the question      |
| Problem Solving    | Ability to reason and approach problems effectively |

The system also generates:

* Overall score
* Strengths
* Areas for improvement
* Example of a stronger answer
* Final interview summary

## 🎯 Hackathon Problem

This project addresses **Problem Statement 2 — The Interview Agent** from the ABTalks AI Hackathon 2026.

> Build the interviewer, not the interview.

The goal is to help candidates practice technical interviews and better communicate their technical knowledge through AI-powered questioning and evaluation.

## 🤖 AI Usage

AI tools were used during the development of this project for:

* Frontend architecture
* Project structure
* UI development
* Tailwind CSS configuration
* Backend development
* API integration
* OpenAI integration
* Debugging
* Deployment configuration
* Development assistance

Detailed AI usage information is available in:

```text
ai-usage-log.md
```

## 👨‍💻 Built For

**ABTalks AI Hackathon 2026**

Built with ❤️ using React, FastAPI, OpenAI, and modern AI-assisted development workflows.

## 📄 License

This project was created for the **ABTalks AI Hackathon 2026**.
