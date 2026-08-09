import { useState } from "react";
import axios from "axios";


const API_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";


export default function useInterview() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  // =====================================================
  // CREATE INTERVIEW
  // =====================================================

  const createInterview = async ({
    role,
    experience_level,
    interview_type,
  }) => {

    setLoading(true);
    setError(null);

    try {

      const response = await axios.post(
        `${API_URL}/interviews`,
        {
          role,
          experience_level,
          interview_type,
        }
      );

      return response.data;

    } catch (err) {

      console.error(
        "Create interview error:",
        err.response?.data || err.message
      );

      const message =
        err.response?.data?.detail ||
        "Failed to create interview session.";

      setError(message);

      throw err;

    } finally {

      setLoading(false);

    }
  };


  // =====================================================
  // GET SINGLE INTERVIEW
  // =====================================================

  const getInterview = async (interviewId) => {

    setLoading(true);
    setError(null);

    try {

      const response = await axios.get(
        `${API_URL}/interviews/${interviewId}`
      );

      return response.data;

    } catch (err) {

      console.error(
        "Get interview error:",
        err.response?.data || err.message
      );

      setError(
        err.response?.data?.detail ||
        "Failed to load interview."
      );

      throw err;

    } finally {

      setLoading(false);

    }
  };


  return {
    createInterview,
    getInterview,
    loading,
    error,
  };
}