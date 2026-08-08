from datetime import datetime

from sqlalchemy import Column, DateTime, Integer, String, Text

from app.db.database import Base


class Interview(Base):
    __tablename__ = "interviews"

    id = Column(Integer, primary_key=True, index=True)

    role = Column(String, nullable=False)
    experience_level = Column(String, nullable=False)
    interview_type = Column(String, nullable=False)

    overall_score = Column(Integer, nullable=False)
    technical_accuracy = Column(Integer, nullable=False)
    communication = Column(Integer, nullable=False)
    relevance = Column(Integer, nullable=False)
    problem_solving = Column(Integer, nullable=False)

    strengths = Column(Text, nullable=False)
    improvements = Column(Text, nullable=False)

    recommendation = Column(Text, nullable=False)
    final_summary = Column(Text, nullable=False)

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )