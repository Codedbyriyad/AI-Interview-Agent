import { useEffect, useState } from "react";
import { getInterviews } from "../services/interviewService";

function History() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedInterview, setSelectedInterview] = useState(null);

  useEffect(() => {
    const loadInterviews = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getInterviews();

        setInterviews(data);
      } catch (err) {
        console.error("History Error:", err);

        const message =
          err.response?.data?.detail ||
          err.response?.data?.message ||
          err.message ||
          "Unable to load interview history.";

        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadInterviews();
  }, []);

  const getScoreClass = (score) => {
    if (score >= 80) {
      return "text-green-600";
    }

    if (score >= 60) {
      return "text-yellow-600";
    }

    return "text-red-600";
  };

  const getScoreBgClass = (score) => {
    if (score >= 80) {
      return "bg-green-50 border-green-200";
    }

    if (score >= 60) {
      return "bg-yellow-50 border-yellow-200";
    }

    return "bg-red-50 border-red-200";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-center text-5xl font-black">
            Interview History
          </h1>

          <p className="mt-4 text-center text-gray-600">
            Loading your previous interviews...
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-64 animate-pulse rounded-3xl bg-white shadow-sm"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-center text-5xl font-black">
            Interview History
          </h1>

          <div className="mt-12 rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-600">
            <p className="font-semibold">
              Unable to load interview history.
            </p>

            <p className="mt-2 text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl font-black">
            Interview History
          </h1>

          <p className="mt-4 text-gray-600">
            Review your previous AI-powered interviews and performance.
          </p>
        </div>

        {/* Empty State */}
        {interviews.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-gray-200 bg-white p-12 text-center shadow-sm">
            <div className="text-6xl">📋</div>

            <h2 className="mt-6 text-2xl font-bold">
              No interviews yet
            </h2>

            <p className="mt-3 text-gray-500">
              Complete your first AI interview and your results
              will appear here.
            </p>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="mt-12 grid gap-5 sm:grid-cols-3">

              <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                <p className="text-sm font-semibold text-gray-500">
                  Total Interviews
                </p>

                <p className="mt-2 text-4xl font-black text-blue-600">
                  {interviews.length}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                <p className="text-sm font-semibold text-gray-500">
                  Average Score
                </p>

                <p className="mt-2 text-4xl font-black text-purple-600">
                  {Math.round(
                    interviews.reduce(
                      (sum, interview) =>
                        sum + Number(interview.overall_score || 0),
                      0
                    ) / interviews.length
                  )}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                <p className="text-sm font-semibold text-gray-500">
                  Best Score
                </p>

                <p className="mt-2 text-4xl font-black text-green-600">
                  {Math.max(
                    ...interviews.map(
                      (interview) =>
                        Number(interview.overall_score || 0)
                    )
                  )}
                </p>
              </div>

            </div>

            {/* Interview Cards */}
            <div className="mt-10 grid gap-6 md:grid-cols-2">

              {interviews.map((interview) => (

                <div
                  key={interview.id}
                  className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >

                  {/* Top */}
                  <div className="flex items-start justify-between gap-4">

                    <div>
                      <h2 className="text-2xl font-black">
                        {interview.role}
                      </h2>

                      <p className="mt-2 text-sm text-gray-500">
                        Interview #{interview.id}
                      </p>
                    </div>

                    {/* Score */}
                    <div className="text-right">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Score
                      </p>

                      <p
                        className={`text-4xl font-black ${getScoreClass(
                          interview.overall_score
                        )}`}
                      >
                        {interview.overall_score}
                      </p>
                    </div>

                  </div>

                  {/* Tags */}
                  <div className="mt-5 flex flex-wrap gap-2">

                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                      {interview.experience_level}
                    </span>

                    <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700">
                      {interview.interview_type}
                    </span>

                  </div>

                  {/* Score Breakdown */}
                  <div className="mt-6 grid grid-cols-2 gap-3">

                    <div className="rounded-xl bg-gray-50 p-4">
                      <p className="text-xs text-gray-500">
                        Technical
                      </p>

                      <p className="mt-1 text-xl font-bold">
                        {interview.technical_accuracy}
                      </p>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-4">
                      <p className="text-xs text-gray-500">
                        Communication
                      </p>

                      <p className="mt-1 text-xl font-bold">
                        {interview.communication}
                      </p>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-4">
                      <p className="text-xs text-gray-500">
                        Relevance
                      </p>

                      <p className="mt-1 text-xl font-bold">
                        {interview.relevance}
                      </p>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-4">
                      <p className="text-xs text-gray-500">
                        Problem Solving
                      </p>

                      <p className="mt-1 text-xl font-bold">
                        {interview.problem_solving}
                      </p>
                    </div>

                  </div>

                  {/* Summary */}
                  {interview.final_summary && (
                    <div className="mt-6 rounded-2xl bg-blue-50 p-5">

                      <p className="text-sm font-bold text-blue-800">
                        📝 Summary
                      </p>

                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-700">
                        {interview.final_summary}
                      </p>

                    </div>
                  )}

                  {/* Strengths */}
                  {interview.strengths?.length > 0 && (
                    <div className="mt-5">

                      <p className="text-sm font-bold text-green-700">
                        ✅ Strengths
                      </p>

                      <ul className="mt-2 space-y-1">

                        {interview.strengths
                          .slice(0, 2)
                          .map((strength, index) => (
                            <li
                              key={index}
                              className="text-sm text-gray-600"
                            >
                              • {strength}
                            </li>
                          ))}

                      </ul>

                    </div>
                  )}

                  {/* Date */}
                  <div className="mt-6 border-t border-gray-100 pt-4">

                    <p className="text-xs text-gray-400">
                      {interview.created_at
                        ? new Date(
                            interview.created_at
                          ).toLocaleString()
                        : "Date unavailable"}
                    </p>

                  </div>

                  {/* View Details */}
                  <button
                    onClick={() => setSelectedInterview(interview)}
                    className="mt-5 w-full rounded-xl bg-blue-600 py-3 font-bold text-white transition hover:bg-blue-700"
                  >
                    View Full Details
                  </button>

                </div>

              ))}

            </div>
          </>
        )}

      </div>

      {/* ========================================= */}
      {/* DETAILS MODAL */}
      {/* ========================================= */}

      {selectedInterview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8 backdrop-blur-sm"
          onClick={() => setSelectedInterview(null)}
        >

          <div
            className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >

            {/* Modal Header */}
            <div className="sticky top-0 z-10 border-b border-gray-100 bg-white px-6 py-5 sm:px-8">

              <div className="flex items-start justify-between gap-4">

                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-gray-400">
                    Interview #{selectedInterview.id}
                  </p>

                  <h2 className="mt-1 text-3xl font-black">
                    {selectedInterview.role}
                  </h2>

                  <div className="mt-3 flex flex-wrap gap-2">

                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                      {selectedInterview.experience_level}
                    </span>

                    <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700">
                      {selectedInterview.interview_type}
                    </span>

                  </div>
                </div>

                <button
                  onClick={() => setSelectedInterview(null)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xl font-bold text-gray-500 transition hover:bg-gray-200 hover:text-gray-800"
                  aria-label="Close"
                >
                  ×
                </button>

              </div>

            </div>

            {/* Modal Content */}
            <div className="space-y-6 p-6 sm:p-8">

              {/* Overall Score */}
              <div
                className={`rounded-3xl border p-7 text-center ${getScoreBgClass(
                  selectedInterview.overall_score
                )}`}
              >

                <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                  Overall Score
                </p>

                <p
                  className={`mt-2 text-7xl font-black ${getScoreClass(
                    selectedInterview.overall_score
                  )}`}
                >
                  {selectedInterview.overall_score}
                </p>

                <p className="mt-1 text-gray-500">
                  out of 100
                </p>

              </div>

              {/* Score Breakdown */}
              <div>

                <h3 className="text-xl font-black">
                  Performance Breakdown
                </h3>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">

                  <div className="rounded-2xl bg-gray-50 p-5">
                    <p className="text-sm text-gray-500">
                      Technical Accuracy
                    </p>

                    <p className="mt-2 text-3xl font-black text-blue-600">
                      {selectedInterview.technical_accuracy}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-gray-50 p-5">
                    <p className="text-sm text-gray-500">
                      Communication
                    </p>

                    <p className="mt-2 text-3xl font-black text-blue-600">
                      {selectedInterview.communication}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-gray-50 p-5">
                    <p className="text-sm text-gray-500">
                      Relevance
                    </p>

                    <p className="mt-2 text-3xl font-black text-blue-600">
                      {selectedInterview.relevance}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-gray-50 p-5">
                    <p className="text-sm text-gray-500">
                      Problem Solving
                    </p>

                    <p className="mt-2 text-3xl font-black text-blue-600">
                      {selectedInterview.problem_solving}
                    </p>
                  </div>

                </div>

              </div>

              {/* Summary */}
              {selectedInterview.final_summary && (
                <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6">

                  <h3 className="text-xl font-black text-blue-800">
                    📝 Final Interview Summary
                  </h3>

                  <p className="mt-4 leading-relaxed text-gray-700">
                    {selectedInterview.final_summary}
                  </p>

                </div>
              )}

              {/* Strengths */}
              {selectedInterview.strengths?.length > 0 && (
                <div className="rounded-3xl border border-green-200 bg-green-50 p-6">

                  <h3 className="text-xl font-black text-green-800">
                    ✅ Strengths
                  </h3>

                  <ul className="mt-4 space-y-3">

                    {selectedInterview.strengths.map(
                      (strength, index) => (
                        <li
                          key={index}
                          className="rounded-xl bg-white p-4 text-gray-700 shadow-sm"
                        >
                          {strength}
                        </li>
                      )
                    )}

                  </ul>

                </div>
              )}

              {/* Improvements */}
              {selectedInterview.improvements?.length > 0 && (
                <div className="rounded-3xl border border-orange-200 bg-orange-50 p-6">

                  <h3 className="text-xl font-black text-orange-800">
                    ⚠️ Areas to Improve
                  </h3>

                  <ul className="mt-4 space-y-3">

                    {selectedInterview.improvements.map(
                      (improvement, index) => (
                        <li
                          key={index}
                          className="rounded-xl bg-white p-4 text-gray-700 shadow-sm"
                        >
                          {improvement}
                        </li>
                      )
                    )}

                  </ul>

                </div>
              )}

              {/* Recommendation */}
              {selectedInterview.recommendation && (
                <div className="rounded-3xl border border-purple-200 bg-purple-50 p-6">

                  <h3 className="text-xl font-black text-purple-800">
                    🤖 AI Recommendation
                  </h3>

                  <p className="mt-4 leading-relaxed text-gray-700">
                    {selectedInterview.recommendation}
                  </p>

                </div>
              )}

              {/* Date */}
              <div className="border-t border-gray-100 pt-5">

                <p className="text-sm text-gray-400">
                  Interview completed:{" "}
                  {selectedInterview.created_at
                    ? new Date(
                        selectedInterview.created_at
                      ).toLocaleString()
                    : "Date unavailable"}
                </p>

              </div>

            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-100 bg-gray-50 px-6 py-5 sm:px-8">

              <button
                onClick={() => setSelectedInterview(null)}
                className="w-full rounded-xl bg-gray-900 py-3 font-bold text-white transition hover:bg-gray-800"
              >
                Close Details
              </button>

            </div>

          </div>

        </div>
      )}
    </div>
  );
}

export default History;