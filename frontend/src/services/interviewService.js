import api from "./api";

export const generateInterviewQuestion = async ({
  role,
  experienceLevel,
  interviewType,
}) => {
  const response = await api.post("/api/interview/question", {
    role,
    experience_level: experienceLevel,
    interview_type: interviewType,
  });

  return response.data;
};

export const evaluateInterviewAnswer = async ({
  role,
  experienceLevel,
  interviewType,
  question,
  answer,
}) => {
  const response = await api.post("/api/interview/evaluate", {
    role,
    experience_level: experienceLevel,
    interview_type: interviewType,
    question,
    answer,
  });

  return response.data;
};

export const generateFinalInterviewFeedback = async ({
  role,
  experienceLevel,
  interviewType,
  evaluations,
}) => {
  const response = await api.post("/api/interview/final-feedback", {
    role,
    experience_level: experienceLevel,
    interview_type: interviewType,
    evaluations,
  });

  return response.data;
};

export const saveInterview = async (interviewData) => {
  const response = await api.post("/interviews", interviewData);

  return response.data;
};

export const getInterviews = async () => {
  const response = await api.get("/interviews");

  return response.data;
};

export const getInterviewById = async (id) => {
  const response = await api.get(`/interviews/${id}`);

  return response.data;
};


export const deleteInterview = async (id) => {
  const response = await api.delete(`/interviews/${id}`);

  return response.data;
};