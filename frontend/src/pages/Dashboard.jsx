import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getInterviews } from "../services/interviewService";

function Dashboard() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadInterviews = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getInterviews();

        setInterviews(data);
      } catch (err) {
        console.error("Dashboard Error:", err);

        const message =
          err.response?.data?.detail ||
          err.response?.data?.message ||
          err.message ||
          "Unable to load dashboard data.";

        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadInterviews();
  }, []);

  // ----------------------------------------
  // HELPERS
  // ----------------------------------------

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBg = (score) => {
    if (score >= 80) return "bg-green-50 border-green-200";
    if (score >= 60) return "bg-yellow-50 border-yellow-200";
    return "bg-red-50 border-red-200";
  };

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleDateString();
  };

  // ----------------------------------------
  // LOADING
  // ----------------------------------------

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-7xl">

          <div className="animate-pulse">
            <div className="mx-auto h-12 max-w-md rounded-xl bg-gray-200" />

            <div className="mx-auto mt-4 h-5 max-w-xl rounded bg-gray-200" />

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-36 rounded-3xl bg-white shadow-sm"
                />
              ))}
            </div>

            <div className="mt-8 h-96 rounded-3xl bg-white shadow-sm" />
          </div>

        </div>
      </div>
    );
  }

  // ----------------------------------------
  // ERROR
  // ----------------------------------------

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-3xl">

          <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">

            <div className="text-5xl">⚠️</div>

            <h2 className="mt-4 text-2xl font-bold text-red-800">
              Unable to load dashboard
            </h2>

            <p className="mt-2 text-red-600">
              {error}
            </p>

          </div>

        </div>
      </div>
    );
  }

  // ----------------------------------------
  // EMPTY STATE
  // ----------------------------------------

  if (interviews.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-5xl">

          <div className="text-center">

            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              AI Interview Coach
            </p>

            <h1 className="mt-3 text-5xl font-black tracking-tight">
              Performance Dashboard
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Track your interview performance, identify weaknesses,
              and improve with AI-powered feedback.
            </p>

          </div>

          <div className="mt-16 rounded-3xl border border-gray-200 bg-white p-12 text-center shadow-sm">

            <div className="text-7xl">
              🎯
            </div>

            <h2 className="mt-6 text-3xl font-black">
              Your interview journey starts here
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-gray-500">
              Complete your first AI-powered interview and your
              performance analytics will appear here.
            </p>

            <Link
              to="/interview"
              className="mt-8 inline-block rounded-xl bg-blue-600 px-8 py-4 font-bold text-white transition hover:bg-blue-700"
            >
              Start New Interview
            </Link>

          </div>

        </div>
      </div>
    );
  }

  // ----------------------------------------
  // CALCULATIONS
  // ----------------------------------------

  const totalInterviews = interviews.length;

  const averageScore = Math.round(
    interviews.reduce(
      (sum, interview) =>
        sum + Number(interview.overall_score || 0),
      0
    ) / totalInterviews
  );

  const bestScore = Math.max(
    ...interviews.map((interview) =>
      Number(interview.overall_score || 0)
    )
  );

  const latestInterview = interviews[0];

  const latestScore = Number(
    latestInterview.overall_score || 0
  );

  // ----------------------------------------
  // MAIN DASHBOARD
  // ----------------------------------------

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">

      <div className="mx-auto max-w-7xl">

        {/* ========================================= */}
        {/* HEADER */}
        {/* ========================================= */}

        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              AI Interview Coach
            </p>

            <h1 className="mt-2 text-4xl font-black tracking-tight md:text-5xl">
              Performance Dashboard
            </h1>

            <p className="mt-4 max-w-2xl text-lg text-gray-600">
              Track your interview performance, identify weaknesses,
              and improve with AI-powered feedback.
            </p>

          </div>

          <Link
            to="/interview"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-4 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-700"
          >
            🎯 Start New Interview
          </Link>

        </div>

        {/* ========================================= */}
        {/* STATS */}
        {/* ========================================= */}

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {/* Total */}

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-semibold text-gray-500">
                  Total Interviews
                </p>

                <p className="mt-2 text-4xl font-black text-blue-600">
                  {totalInterviews}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Practice sessions completed
                </p>

              </div>

              <div className="rounded-2xl bg-blue-50 p-4 text-2xl">
                🎯
              </div>

            </div>

          </div>

          {/* Average */}

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-semibold text-gray-500">
                  Average Score
                </p>

                <p className="mt-2 text-4xl font-black text-purple-600">
                  {averageScore}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Overall performance
                </p>

              </div>

              <div className="rounded-2xl bg-purple-50 p-4 text-2xl">
                📊
              </div>

            </div>

          </div>

          {/* Best */}

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-semibold text-gray-500">
                  Best Score
                </p>

                <p className="mt-2 text-4xl font-black text-green-600">
                  {bestScore}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Personal best
                </p>

              </div>

              <div className="rounded-2xl bg-green-50 p-4 text-2xl">
                🏆
              </div>

            </div>

          </div>

          {/* Latest */}

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-semibold text-gray-500">
                  Latest Score
                </p>

                <p
                  className={`mt-2 text-4xl font-black ${getScoreColor(
                    latestScore
                  )}`}
                >
                  {latestScore}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Keep practicing
                </p>

              </div>

              <div className="rounded-2xl bg-orange-50 p-4 text-2xl">
                🚀
              </div>

            </div>

          </div>

        </div>

        {/* ========================================= */}
        {/* LATEST INTERVIEW + PERFORMANCE */}
        {/* ========================================= */}

        <div className="mt-8 grid gap-6 lg:grid-cols-3">

          {/* Latest Interview */}

          <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm lg:col-span-2">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-bold uppercase tracking-wider text-gray-400">
                  Latest Interview
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  {latestInterview.role}
                </h2>

              </div>

              <Link
                to={`/history/${latestInterview.id}`}
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                View Details →
              </Link>

            </div>

            <div className="mt-5 flex flex-wrap gap-2">

              <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                {latestInterview.experience_level}
              </span>

              <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
                {latestInterview.interview_type}
              </span>

            </div>

            {/* Latest Score */}

            <div className="mt-8 flex items-center gap-6">

              <div
                className={`flex h-28 w-28 items-center justify-center rounded-full border-8 ${getScoreBg(
                  latestScore
                )}`}
              >
                <span
                  className={`text-4xl font-black ${getScoreColor(
                    latestScore
                  )}`}
                >
                  {latestScore}
                </span>
              </div>

              <div>

                <p className="text-sm font-semibold text-gray-500">
                  Interview Score
                </p>

                <p className="mt-1 text-2xl font-black">
                  {latestScore >= 80
                    ? "Excellent performance"
                    : latestScore >= 60
                      ? "Good progress"
                      : "Keep practicing"}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {formatDate(latestInterview.created_at)}
                </p>

              </div>

            </div>

            {/* Performance Breakdown */}

            <div className="mt-8">

              <h3 className="text-lg font-black">
                Performance Breakdown
              </h3>

              <div className="mt-5 space-y-5">

                {[
                  {
                    label: "Technical Accuracy",
                    value: latestInterview.technical_accuracy,
                  },
                  {
                    label: "Communication",
                    value: latestInterview.communication,
                  },
                  {
                    label: "Relevance",
                    value: latestInterview.relevance,
                  },
                  {
                    label: "Problem Solving",
                    value: latestInterview.problem_solving,
                  },
                ].map((item) => (

                  <div key={item.label}>

                    <div className="mb-2 flex justify-between">

                      <span className="text-sm font-semibold text-gray-600">
                        {item.label}
                      </span>

                      <span className="text-sm font-bold">
                        {item.value}
                      </span>

                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-gray-100">

                      <div
                        className="h-full rounded-full bg-blue-600 transition-all duration-700"
                        style={{
                          width: `${item.value}%`,
                        }}
                      />

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

          {/* AI Assessment */}

          <div className="rounded-3xl border border-blue-200 bg-blue-50 p-7">

            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              AI Assessment
            </p>

            <h2 className="mt-3 text-2xl font-black text-gray-900">
              {latestScore >= 80
                ? "Interview Ready 🚀"
                : latestScore >= 60
                  ? "Getting There 💪"
                  : "Keep Practicing 🤖"}
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              Based on your latest interview performance, your
              current interview readiness score is:
            </p>

            <div className="mt-6 rounded-2xl bg-white p-6 text-center shadow-sm">

              <p
                className={`text-6xl font-black ${getScoreColor(
                  latestScore
                )}`}
              >
                {latestScore}
              </p>

              <p className="mt-2 text-sm font-semibold text-gray-500">
                Readiness Score
              </p>

            </div>

            <p className="mt-5 text-sm font-semibold text-gray-700">
              {latestScore >= 80
                ? "You're showing strong interview readiness. Keep sharpening your skills."
                : "Keep practicing to improve your interview performance."}
            </p>

            <Link
              to="/interview"
              className="mt-6 block rounded-xl bg-blue-600 py-3 text-center font-bold text-white transition hover:bg-blue-700"
            >
              Practice Again
            </Link>

          </div>

        </div>

        {/* ========================================= */}
        {/* AI COACH SUMMARY */}
        {/* ========================================= */}

        {latestInterview.final_summary && (

          <div className="mt-8 rounded-3xl border border-purple-200 bg-purple-50 p-7">

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-white p-3 text-xl">
                🤖
              </div>

              <div>

                <p className="text-sm font-bold uppercase tracking-wider text-purple-600">
                  AI Coach
                </p>

                <h2 className="text-2xl font-black text-gray-900">
                  AI Coach Summary
                </h2>

              </div>

            </div>

            <p className="mt-5 max-w-5xl leading-relaxed text-gray-700">
              {latestInterview.final_summary}
            </p>

          </div>

        )}

        {/* ========================================= */}
        {/* RECENT ACTIVITY */}
        {/* ========================================= */}

        <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-7 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-bold uppercase tracking-wider text-gray-400">
                Activity
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Recent Interviews
              </h2>

            </div>

            <Link
              to="/history"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              View All →
            </Link>

          </div>

          <div className="mt-6 divide-y divide-gray-100">

            {interviews.slice(0, 5).map((interview) => (

              <Link
                key={interview.id}
                to={`/history/${interview.id}`}
                className="flex items-center justify-between gap-4 py-5 transition hover:bg-gray-50"
              >

                <div>

                  <h3 className="font-bold text-gray-900">
                    {interview.role}
                  </h3>

                  <div className="mt-1 flex flex-wrap gap-2">

                    <span className="text-sm text-gray-500">
                      {interview.experience_level}
                    </span>

                    <span className="text-gray-300">
                      •
                    </span>

                    <span className="text-sm text-gray-500">
                      {interview.interview_type}
                    </span>

                  </div>

                </div>

                <div className="text-right">

                  <p
                    className={`text-2xl font-black ${getScoreColor(
                      interview.overall_score
                    )}`}
                  >
                    {interview.overall_score}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    {formatDate(interview.created_at)}
                  </p>

                </div>

              </Link>

            ))}

          </div>

        </div>

        {/* ========================================= */}
        {/* FINAL CTA */}
        {/* ========================================= */}

        <div className="mt-8 rounded-3xl bg-gray-900 p-8 text-center text-white md:p-12">

          <div className="text-4xl">
            🚀
          </div>

          <h2 className="mt-4 text-3xl font-black">
            Ready for your next interview?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-gray-300">
            Practice again and let AI analyze your answers,
            identify your weaknesses, and help you improve.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">

            <Link
              to="/interview"
              className="rounded-xl bg-white px-7 py-3 font-bold text-gray-900 transition hover:bg-gray-100"
            >
              Start Interview
            </Link>

            <Link
              to="/history"
              className="rounded-xl border border-gray-600 px-7 py-3 font-bold text-white transition hover:bg-gray-800"
            >
              View History
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;