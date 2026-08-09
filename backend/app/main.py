import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import router
from app.db.database import Base, engine
from app.models.interview import Interview


Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="AI Interview Agent API",
    description="Backend API for the AI Interview Agent",
    version="1.0.0",
)


frontend_url = os.getenv("FRONTEND_URL")

allowed_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

if frontend_url:
    allowed_origins.append(frontend_url)


app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(router)


@app.get("/")
def root():
    return {
        "message": "AI Interview Agent Backend Running 🚀",
        "docs": "/docs",
    }