import json
from openai import OpenAI

from app.core.config import OPENAI_API_KEY, MODEL_NAME


client = OpenAI(api_key=OPENAI_API_KEY)


def test_openai():
    response = client.responses.create(
        model=MODEL_NAME,
        input="Say hello to my AI Interview Agent in one short sentence.",
    )

    return response.output_text.strip()


def generate_interview_question(
    role: str,
    experience_level: str,
    interview_type: str,
) -> str:

    prompt = f"""
You are an expert professional interviewer.

You are conducting a {interview_type} interview
for a candidate applying for the role of {role}.

Candidate experience level:
{experience_level}

Generate exactly ONE interview question.

Requirements:

- The question must be appropriate for the candidate's experience level.
- The question must be relevant to the selected role.
- The question must match the interview type.
- Keep the question clear and professional.
- Do not provide the answer.
- Do not provide explanations.
- Do not number the question.
- Return only the interview question.
"""

    response = client.responses.create(
        model=MODEL_NAME,
        input=prompt,
    )

    return response.output_text.strip()


def evaluate_interview_answer(
    role: str,
    experience_level: str,
    interview_type: str,
    question: str,
    answer: str,
) -> dict:

    prompt = f"""
You are an expert professional interview evaluator.

Evaluate the candidate's answer based on the following information.

Job Role:
{role}

Experience Level:
{experience_level}

Interview Type:
{interview_type}

Interview Question:
{question}

Candidate Answer:
{answer}

Evaluate the answer using these criteria:

1. Technical Accuracy
2. Communication
3. Relevance
4. Problem Solving

Give each criterion a score from 0 to 100.

Then calculate an overall score from 0 to 100.

Also provide:

- strengths: exactly 2 short points
- improvements: exactly 2 short points
- better_answer: a concise example of a stronger answer

Return ONLY valid JSON in exactly this structure:

{{
    "technical_accuracy": 0,
    "communication": 0,
    "relevance": 0,
    "problem_solving": 0,
    "overall_score": 0,
    "strengths": [
        "strength 1",
        "strength 2"
    ],
    "improvements": [
        "improvement 1",
        "improvement 2"
    ],
    "better_answer": "Example of a stronger answer."
}}
"""

    response = client.responses.create(
        model=MODEL_NAME,
        input=prompt,
    )

    result = json.loads(response.output_text)

    return result


def generate_final_interview_feedback(
    role,
    experience_level,
    interview_type,
    evaluations,
):
    prompt = f"""
You are an expert interview coach.

Analyze the complete interview performance below.

Role: {role}
Experience Level: {experience_level}
Interview Type: {interview_type}

Interview evaluations:
{json.dumps(evaluations, indent=2)}

Create a final interview report.

Return ONLY valid JSON with exactly these fields:

{{
    "overall_score": 0,
    "technical_accuracy": 0,
    "communication": 0,
    "relevance": 0,
    "problem_solving": 0,
    "strengths": [],
    "improvements": [],
    "recommendation": "",
    "final_summary": ""
}}

Requirements:

- All scores must be integers between 0 and 100.
- strengths must contain 2-4 items.
- improvements must contain 2-4 items.
- recommendation must be practical and specific.
- final_summary must summarize the candidate's overall performance.
"""

    response = client.responses.create(
        model=MODEL_NAME,
        input=prompt,
    )

    return json.loads(response.output_text)