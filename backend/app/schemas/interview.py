from datetime import datetime

from pydantic import BaseModel, ConfigDict


class InterviewCreate(BaseModel):
    role: str
    experience_level: str
    interview_type: str

    overall_score: int
    technical_accuracy: int
    communication: int
    relevance: int
    problem_solving: int

    strengths: list[str]
    improvements: list[str]

    recommendation: str
    final_summary: str


class InterviewResponse(InterviewCreate):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)