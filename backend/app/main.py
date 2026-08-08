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


app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"https?://(localhost|127.0.0.1)(:\d+)?$",
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