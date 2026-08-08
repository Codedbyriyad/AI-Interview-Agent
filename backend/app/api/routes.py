import json

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.interview import Interview
from app.schemas.interview import InterviewCreate, InterviewResponse

from app.services.openai_service import (
    test_openai,
    generate_interview_question,
    evaluate_interview_answer,
    generate_final_interview_feedback,
)


router = APIRouter()


# =========================================================
# REQUEST SCHEMAS
# =========================================================

class InterviewQuestionRequest(BaseModel):
    role: str
    experience_level: str
    interview_type: str


class InterviewAnswerRequest(BaseModel):
    role: str
    experience_level: str
    interview_type: str
    question: str
    answer: str


class FinalInterviewRequest(BaseModel):
    role: str
    experience_level: str
    interview_type: str
    evaluations: list


# =========================================================
# HEALTH CHECK
# =========================================================

@router.get("/health")
def health():
    return {
        "status": "ok"
    }


# =========================================================
# TEST OPENAI
# =========================================================

@router.get("/test-openai")
def test_openai_endpoint():

    try:
        result = test_openai()

        return {
            "success": True,
            "response": result,
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


# =========================================================
# GENERATE INTERVIEW QUESTION
# =========================================================

@router.post("/api/interview/question")
def generate_question(
    request: InterviewQuestionRequest,
):

    try:

        question = generate_interview_question(
            role=request.role,
            experience_level=request.experience_level,
            interview_type=request.interview_type,
        )

        return {
            "success": True,
            "question": question,
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


# =========================================================
# EVALUATE INTERVIEW ANSWER
# =========================================================

@router.post("/api/interview/evaluate")
def evaluate_answer(
    request: InterviewAnswerRequest,
):

    try:

        evaluation = evaluate_interview_answer(
            role=request.role,
            experience_level=request.experience_level,
            interview_type=request.interview_type,
            question=request.question,
            answer=request.answer,
        )

        return {
            "success": True,
            "evaluation": evaluation,
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


# =========================================================
# GENERATE FINAL INTERVIEW FEEDBACK
# =========================================================

@router.post("/api/interview/final-feedback")
def final_feedback(
    request: FinalInterviewRequest,
):

    try:

        feedback = generate_final_interview_feedback(
            role=request.role,
            experience_level=request.experience_level,
            interview_type=request.interview_type,
            evaluations=request.evaluations,
        )

        return {
            "success": True,
            "feedback": feedback,
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


# =========================================================
# SAVE COMPLETED INTERVIEW
# =========================================================

@router.post(
    "/interviews",
    response_model=InterviewResponse,
)
def create_interview(
    interview: InterviewCreate,
    db: Session = Depends(get_db),
):

    db_interview = Interview(

        role=interview.role,
        experience_level=interview.experience_level,
        interview_type=interview.interview_type,

        overall_score=interview.overall_score,
        technical_accuracy=interview.technical_accuracy,
        communication=interview.communication,
        relevance=interview.relevance,
        problem_solving=interview.problem_solving,

        strengths=json.dumps(interview.strengths),
        improvements=json.dumps(interview.improvements),

        recommendation=interview.recommendation,
        final_summary=interview.final_summary,
    )

    db.add(db_interview)
    db.commit()
    db.refresh(db_interview)

    # Convert JSON strings back to Python lists
    db_interview.strengths = json.loads(
        db_interview.strengths
    )

    db_interview.improvements = json.loads(
        db_interview.improvements
    )

    return db_interview


# =========================================================
# GET ALL INTERVIEW HISTORY
# =========================================================

@router.get(
    "/interviews",
    response_model=list[InterviewResponse],
)
def get_interviews(
    db: Session = Depends(get_db),
):

    interviews = (
        db.query(Interview)
        .order_by(Interview.created_at.desc())
        .all()
    )

    for interview in interviews:

        interview.strengths = json.loads(
            interview.strengths
        )

        interview.improvements = json.loads(
            interview.improvements
        )

    return interviews


# =========================================================
# GET SINGLE INTERVIEW
# =========================================================

@router.get(
    "/interviews/{interview_id}",
    response_model=InterviewResponse,
)
def get_interview(
    interview_id: int,
    db: Session = Depends(get_db),
):

    interview = (
        db.query(Interview)
        .filter(Interview.id == interview_id)
        .first()
    )

    if not interview:

        raise HTTPException(
            status_code=404,
            detail="Interview not found.",
        )

    interview.strengths = json.loads(
        interview.strengths
    )

    interview.improvements = json.loads(
        interview.improvements
    )

    return interview


# =========================================================
# DELETE INTERVIEW
# =========================================================

@router.delete("/interviews/{interview_id}")
def delete_interview(
    interview_id: int,
    db: Session = Depends(get_db),
):

    interview = (
        db.query(Interview)
        .filter(Interview.id == interview_id)
        .first()
    )

    if not interview:

        raise HTTPException(
            status_code=404,
            detail="Interview not found.",
        )

    db.delete(interview)
    db.commit()

    return {
        "success": True,
        "message": "Interview deleted successfully.",
    }