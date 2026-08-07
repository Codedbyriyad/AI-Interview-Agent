from fastapi import FastAPI
from app.api.routes import router

app = FastAPI(
    title="AI Interview Agent API",
    description="Backend API for the AI Interview Agent",
    version="1.0.0",
)

app.include_router(router)

@app.get("/")
def root():
    return {
        "message": "AI Interview Agent Backend Running 🚀",
        "docs": "/docs"
    }