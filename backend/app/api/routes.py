from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.openai_service import (
    test_openai,
    generate_interview_question,
    evaluate_interview_answer,
    generate_final_interview_feedback,
)


router = APIRouter()


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


@router.get("/health")
def health():
    return {
        "status": "ok"
    }


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
            detail=str(e)
        )


@router.post("/api/interview/question")
def generate_question(
    request: InterviewQuestionRequest
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
            detail=str(e)
        )


@router.post("/api/interview/evaluate")
def evaluate_answer(
    request: InterviewAnswerRequest
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
            detail=str(e)
        )

class FinalInterviewRequest(BaseModel):
    role: str
    experience_level: str
    interview_type: str
    evaluations: list


@router.post("/api/interview/final-feedback")
def final_feedback(
    request: FinalInterviewRequest
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
            detail=str(e)
        )