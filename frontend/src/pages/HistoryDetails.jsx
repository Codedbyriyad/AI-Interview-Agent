import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getInterviewById,
  deleteInterview,
} from "../services/interviewService";


function HistoryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");


  useEffect(() => {
    const loadInterview = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getInterviewById(id);

        setInterview(data);
      } catch (err) {
        console.error("Interview Details Error:", err);

        const message =
          err.response?.data?.detail ||
          err.response?.data?.message ||
          err.message ||
          "Unable to load interview.";

        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadInterview();
  }, [id]);


  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this interview?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);
      setError("");

      await deleteInterview(id);

      navigate("/history");
    } catch (err) {
      console.error("Delete Interview Error:", err);

      const message =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        err.message ||
        "Unable to delete interview.";

      setError(message);
    } finally {
      setDeleting(false);
    }
  };


  const getScoreClass = (score) => {
    if (score >= 80) {
      return "text-green-600";
    }

    if (score >= 60) {
      return "text-yellow-600";
    }

    return "text-red-600";
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-5xl">

          <h1 className="text-center text-5xl font-black">
            Interview Details
          </h1>

          <div className="mt-12 animate-pulse rounded-3xl bg-white p-10 shadow-sm">
            <div className="h-8 w-1/3 rounded bg-gray-200" />

            <div className="mt-6 h-5 w-1/2 rounded bg-gray-200" />

            <div className="mt-10 grid gap-4 md:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-28 rounded-2xl bg-gray-200"
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    );
  }


  if (error || !interview) {
    return (
      <div className="min-h-screen bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-3xl">

          <h1 className="text-center text-5xl font-black">
            Interview Details
          </h1>

          <div className="mt-12 rounded-3xl border border-red-200 bg-red-50 p-8 text-center">

            <p className="font-semibold text-red-600">
              Unable to load interview.
            </p>

            <p className="mt-2 text-sm text-red-500">
              {error || "Interview not found."}
            </p>

            <button
              onClick={() => navigate("/history")}
              className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700"
            >
              Back to History
            </button>

          </div>

        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50 px-6 py-16">

      <div className="mx-auto max-w-5xl">

        {/* Header */}

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div>

            <p className="text-sm font-semibold uppercase tracking-wide text-gray-400">
              Interview #{interview.id}
            </p>

            <h1 className="mt-2 text-4xl font-black">
              {interview.role}
            </h1>

            <div className="mt-4 flex flex-wrap gap-2">

              <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                {interview.experience_level}
              </span>

              <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
                {interview.interview_type}
              </span>

            </div>

          </div>


          <div className="flex gap-3">

            <button
              onClick={() => navigate("/history")}
              className="rounded-xl border border-gray-300 bg-white px-5 py-3 font-bold text-gray-700 transition hover:bg-gray-100"
            >
              ← Back
            </button>

            <button
              onClick={handleDelete}
              disabled={deleting}
              className="rounded-xl bg-red-600 px-5 py-3 font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>

          </div>

        </div>


        {/* Overall Score */}

        <div className="mt-10 rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-xl">

          <p className="text-sm font-semibold uppercase tracking-wide text-gray-400">
            Overall Score
          </p>

          <p
            className={`mt-4 text-7xl font-black ${getScoreClass(
              interview.overall_score
            )}`}
          >
            {interview.overall_score}
          </p>

          <p className="mt-2 text-gray-500">
            out of 100
          </p>

        </div>


        {/* Score Breakdown */}

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border bg-white p-6 text-center shadow-sm">
            <p className="text-sm text-gray-500">
              Technical Accuracy
            </p>

            <p className="mt-2 text-3xl font-black text-blue-600">
              {interview.technical_accuracy}
            </p>
          </div>


          <div className="rounded-2xl border bg-white p-6 text-center shadow-sm">
            <p className="text-sm text-gray-500">
              Communication
            </p>

            <p className="mt-2 text-3xl font-black text-blue-600">
              {interview.communication}
            </p>
          </div>


          <div className="rounded-2xl border bg-white p-6 text-center shadow-sm">
            <p className="text-sm text-gray-500">
              Relevance
            </p>

            <p className="mt-2 text-3xl font-black text-blue-600">
              {interview.relevance}
            </p>
          </div>


          <div className="rounded-2xl border bg-white p-6 text-center shadow-sm">
            <p className="text-sm text-gray-500">
              Problem Solving
            </p>

            <p className="mt-2 text-3xl font-black text-blue-600">
              {interview.problem_solving}
            </p>
          </div>

        </div>


        {/* Summary */}

        <div className="mt-6 rounded-3xl border border-blue-200 bg-blue-50 p-8">

          <h2 className="text-2xl font-black text-blue-800">
            📝 Interview Summary
          </h2>

          <p className="mt-4 leading-relaxed text-gray-700">
            {interview.final_summary}
          </p>

        </div>


        {/* Strengths */}

        <div className="mt-6 rounded-3xl border border-green-200 bg-green-50 p-8">

          <h2 className="text-2xl font-black text-green-800">
            ✅ Strengths
          </h2>

          <ul className="mt-5 space-y-3">

            {interview.strengths?.map((strength, index) => (
              <li
                key={index}
                className="rounded-xl bg-white p-4 text-gray-700 shadow-sm"
              >
                {strength}
              </li>
            ))}

          </ul>

        </div>


        {/* Improvements */}

        <div className="mt-6 rounded-3xl border border-orange-200 bg-orange-50 p-8">

          <h2 className="text-2xl font-black text-orange-800">
            ⚠️ Areas to Improve
          </h2>

          <ul className="mt-5 space-y-3">

            {interview.improvements?.map((improvement, index) => (
              <li
                key={index}
                className="rounded-xl bg-white p-4 text-gray-700 shadow-sm"
              >
                {improvement}
              </li>
            ))}

          </ul>

        </div>


        {/* Recommendation */}

        <div className="mt-6 rounded-3xl border border-purple-200 bg-purple-50 p-8">

          <h2 className="text-2xl font-black text-purple-800">
            🤖 AI Recommendation
          </h2>

          <p className="mt-4 leading-relaxed text-gray-700">
            {interview.recommendation}
          </p>

        </div>


        {/* Date */}

        <p className="mt-8 text-center text-sm text-gray-400">
          {interview.created_at
            ? new Date(interview.created_at).toLocaleString()
            : "Date unavailable"}
        </p>

      </div>

    </div>
  );
}

export default HistoryDetails;