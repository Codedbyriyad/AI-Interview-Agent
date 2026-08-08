import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000";

export const generateInterviewQuestion = async ({
  role,
  experienceLevel,
  interviewType,
}) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/interview/question`,
    {
      role,
      experience_level: experienceLevel,
      interview_type: interviewType,
    }
  );

  return response.data;
};

export const evaluateInterviewAnswer = async ({
  role,
  experienceLevel,
  interviewType,
  question,
  answer,
}) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/interview/evaluate`,
    {
      role,
      experience_level: experienceLevel,
      interview_type: interviewType,
      question,
      answer,
    }
  );

  return response.data;
};

export const generateFinalInterviewFeedback = async ({
  role,
  experienceLevel,
  interviewType,
  evaluations,
}) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/interview/final-feedback`,
    {
      role,
      experience_level: experienceLevel,
      interview_type: interviewType,
      evaluations,
    }
  );

  return response.data;
};