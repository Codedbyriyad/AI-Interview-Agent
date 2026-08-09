import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getInterviews } from "../services/interviewService";

export default function Dashboard() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================================
  // LOAD REAL INTERVIEW DATA
  // =========================================================

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getInterviews();

        const sortedData = Array.isArray(data)
          ? [...data].sort(
              (a, b) =>
                new Date(b.created_at) -
                new Date(a.created_at)
            )
          : [];

        setInterviews(sortedData);
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

    loadDashboard();
  }, []);

  // =========================================================
  // CALCULATED STATISTICS
  // =========================================================

  const totalInterviews = interviews.length;

  const scores = interviews.map((interview) =>
    Number(interview.overall_score || 0)
  );

  const averageScore =
    scores.length > 0
      ? Math.round(
          scores.reduce((sum, score) => sum + score, 0) /
            scores.length
        )
      : 0;

  const bestScore =
    scores.length > 0
      ? Math.max(...scores)
      : 0;

  const latestInterview = interviews[0] || null;

  const latestScore = latestInterview
    ? Number(latestInterview.overall_score || 0)
    : 0;

  // =========================================================
  // PERFORMANCE TREND
  // =========================================================

  const chartInterviews = useMemo(() => {
    return [...interviews]
      .slice(0, 6)
      .reverse();
  }, [interviews]);

  const trend =
    chartInterviews.length >= 2
      ? Number(
          chartInterviews[chartInterviews.length - 1]
            .overall_score || 0
        ) -
        Number(chartInterviews[0].overall_score || 0)
      : 0;

  // =========================================================
  // READINESS BREAKDOWN
  // =========================================================

  const readiness = useMemo(() => {
    if (!interviews.length) {
      return {
        technical: 0,
        communication: 0,
        relevance: 0,
        problemSolving: 0,
      };
    }

    const average = (field) => {
      const values = interviews.map((interview) =>
        Number(interview[field] || 0)
      );

      return Math.round(
        values.reduce((sum, value) => sum + value, 0) /
          values.length
      );
    };

    return {
      technical: average("technical_accuracy"),
      communication: average("communication"),
      relevance: average("relevance"),
      problemSolving: average("problem_solving"),
    };
  }, [interviews]);

  // =========================================================
  // RECOMMENDED AREA
  // =========================================================

  const recommendation = useMemo(() => {
    const areas = [
      {
        name: "Technical Accuracy",
        score: readiness.technical,
        description:
          "Strengthen technical concepts and explain your decisions with more depth.",
      },
      {
        name: "Communication",
        score: readiness.communication,
        description:
          "Practice giving structured, concise and confident interview answers.",
      },
      {
        name: "Relevance",
        score: readiness.relevance,
        description:
          "Focus on answering exactly what the interviewer asks with concrete examples.",
      },
      {
        name: "Problem Solving",
        score: readiness.problemSolving,
        description:
          "Practice explaining your reasoning, trade-offs and step-by-step approach.",
      },
    ];

    return areas.reduce(
      (weakest, current) =>
        current.score < weakest.score
          ? current
          : weakest,
      areas[0]
    );
  }, [readiness]);

  // =========================================================
  // HELPERS
  // =========================================================

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleDateString(
      undefined,
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    );
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-600";
    if (score >= 60) return "text-amber-600";
    return "text-red-600";
  };

  const getProgressColor = (score) => {
    if (score >= 80) return "bg-emerald-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-red-500";
  };

  // =========================================================
  // LOADING STATE
  // =========================================================

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="animate-pulse">
            <div className="h-10 w-72 rounded-lg bg-slate-200" />
            <div className="mt-3 h-5 w-96 max-w-full rounded bg-slate-200" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-32 rounded-2xl bg-white shadow-sm animate-pulse"
              />
            ))}
          </div>

          <div className="h-80 rounded-2xl bg-white shadow-sm animate-pulse" />

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="h-72 rounded-2xl bg-white shadow-sm animate-pulse lg:col-span-2" />
            <div className="h-72 rounded-2xl bg-white shadow-sm animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // ERROR STATE
  // =========================================================

  if (error) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-2xl rounded-3xl border border-red-200 bg-white p-10 text-center shadow-sm">
          <div className="text-5xl">⚠️</div>

          <h1 className="mt-5 text-2xl font-black text-slate-900">
            Unable to load dashboard
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // =========================================================
  // EMPTY STATE
  // =========================================================

  if (interviews.length === 0) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <div className="text-6xl">🎯</div>

            <h1 className="mt-6 text-3xl font-black text-slate-900">
              Your Interview Dashboard
            </h1>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500">
              Complete your first AI interview to start
              tracking your performance, strengths and
              improvement areas.
            </p>

            <Link
              to="/interview"
              className="mt-7 inline-flex rounded-xl bg-blue-600 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700"
            >
              Start Your First Interview →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // MAIN DASHBOARD
  // =========================================================

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* =================================================
            HEADER
        ================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-slate-200 bg-gradient-to-r from-white via-blue-50/40 to-white p-6 shadow-sm sm:p-8"
        >
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                  Good evening, Riyad 👋
                </h1>
              </div>

              <p className="mt-2 text-sm font-medium text-slate-500">
                Keep practicing — your performance is
                tracked automatically.
              </p>
            </div>

            <Link
              to="/interview"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              Start New Interview
              <span>→</span>
            </Link>
          </div>
        </motion.div>

        {/* =================================================
            STAT CARDS
        ================================================= */}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {[
            {
              label: "Total Interviews",
              value: totalInterviews,
              description: "Practice sessions completed",
              icon: "🎯",
              color: "text-blue-600",
              bg: "bg-blue-50",
            },
            {
              label: "Average Score",
              value: `${averageScore}%`,
              description: "Overall performance",
              icon: "📊",
              color: "text-emerald-600",
              bg: "bg-emerald-50",
            },
            {
              label: "Best Score",
              value: `${bestScore}%`,
              description: "Personal best",
              icon: "🏆",
              color: "text-purple-600",
              bg: "bg-purple-50",
            },
            {
              label: "Latest Score",
              value: `${latestScore}%`,
              description: latestInterview
                ? "Most recent interview"
                : "No interviews yet",
              icon: "✨",
              color: getScoreColor(latestScore),
              bg:
                latestScore >= 80
                  ? "bg-emerald-50"
                  : latestScore >= 60
                  ? "bg-amber-50"
                  : "bg-red-50",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: index * 0.08,
              }}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg}`}
                >
                  <span>{stat.icon}</span>
                </div>
              </div>

              <p className="mt-5 text-xs font-bold uppercase tracking-wider text-slate-400">
                {stat.label}
              </p>

              <p className={`mt-1 text-3xl font-black ${stat.color}`}>
                {stat.value}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* =================================================
            PERFORMANCE CHART
        ================================================= */}

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">

          <div className="flex flex-col justify-between gap-3 border-b border-slate-100 pb-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Performance Overview
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Score progress across your recent interview sessions
              </p>
            </div>

            <div
              className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                trend > 0
                  ? "bg-emerald-50 text-emerald-700"
                  : trend < 0
                  ? "bg-red-50 text-red-700"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {trend > 0
                ? `📈 +${trend}% growth`
                : trend < 0
                ? `📉 ${trend}% change`
                : "→ Stable performance"}
            </div>
          </div>

          <div className="mt-6">

            <div className="flex h-56 items-end gap-2 sm:gap-4">
              {chartInterviews.map((interview, index) => {
                const score = Number(
                  interview.overall_score || 0
                );

                return (
                  <div
                    key={interview.id}
                    className="group flex h-full flex-1 flex-col items-center justify-end"
                  >
                    <div className="relative flex h-full w-full items-end justify-center">
                      <div
                        className="w-full max-w-12 rounded-t-xl bg-gradient-to-t from-blue-600 to-cyan-400 transition-all duration-500 group-hover:from-blue-700 group-hover:to-cyan-500"
                        style={{
                          height: `${Math.max(score, 8)}%`,
                        }}
                      >
                        <div className="relative -top-7 text-center text-[10px] font-black text-slate-700">
                          {score}%
                        </div>
                      </div>
                    </div>

                    <span className="mt-3 text-[10px] font-semibold text-slate-400">
                      #{interviews.length - index}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 border-t border-slate-100 pt-3 text-center text-[10px] font-semibold text-slate-400">
              Recent interview sessions
            </div>
          </div>
        </div>

        {/* =================================================
            LOWER SECTION
        ================================================= */}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

          {/* =================================================
              RECENT SESSIONS
          ================================================= */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">

            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-black text-slate-900">
                  Recent Interview Sessions
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Your latest AI interview results
                </p>
              </div>

              <Link
                to="/history"
                className="text-xs font-bold text-blue-600 transition hover:text-blue-700"
              >
                View History →
              </Link>
            </div>

            <div className="mt-5 space-y-3">

              {interviews.slice(0, 5).map((interview) => {
                const score = Number(
                  interview.overall_score || 0
                );

                return (
                  <motion.div
                    key={interview.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 transition hover:border-blue-200 hover:bg-white hover:shadow-sm sm:flex-row sm:items-center"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-black text-slate-900">
                          {interview.role}
                        </h3>

                        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-600">
                          {interview.interview_type}
                        </span>
                      </div>

                      <p className="mt-1 text-xs text-slate-400">
                        {interview.experience_level}
                        {" • "}
                        {formatDate(interview.created_at)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-5 sm:justify-end">

                      <div className="text-right">
                        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                          Score
                        </p>

                        <p
                          className={`text-xl font-black ${getScoreColor(
                            score
                          )}`}
                        >
                          {score}%
                        </p>
                      </div>

                      <Link
                        to={`/history/${interview.id}`}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-blue-300 hover:text-blue-600"
                      >
                        Details
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* =================================================
              READINESS
          ================================================= */}

          <div className="space-y-6">

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="text-lg font-black text-slate-900">
                Interview Readiness
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Average performance across all completed interviews
              </p>

              <div className="mt-6 space-y-5">

                {[
                  {
                    label: "Technical Accuracy",
                    score: readiness.technical,
                  },
                  {
                    label: "Communication",
                    score: readiness.communication,
                  },
                  {
                    label: "Relevance",
                    score: readiness.relevance,
                  },
                  {
                    label: "Problem Solving",
                    score: readiness.problemSolving,
                  },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="mb-1.5 flex justify-between text-xs font-bold">
                      <span className="text-slate-700">
                        {item.label}
                      </span>

                      <span
                        className={getScoreColor(item.score)}
                      >
                        {item.score}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${item.score}%`,
                        }}
                        transition={{
                          duration: 0.8,
                        }}
                        className={`h-full rounded-full ${getProgressColor(
                          item.score
                        )}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* =================================================
                RECOMMENDATION
            ================================================= */}

            <div className="rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-orange-50 p-6 shadow-sm">

              <div className="flex items-center gap-2">
                <span className="text-lg">🎯</span>

                <h3 className="text-sm font-black text-slate-900">
                  Recommended Next Practice
                </h3>
              </div>

              <p className="mt-4 text-lg font-black text-slate-900">
                {recommendation.name}
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-600">
                Your current weakest area is{" "}
                <span className="font-bold text-amber-700">
                  {recommendation.score}%
                </span>
                . Focus your next practice session here
                to improve your overall readiness.
              </p>

              <Link
                to="/interview"
                className="mt-5 flex w-full items-center justify-center rounded-xl bg-amber-600 px-4 py-3 text-xs font-bold text-white shadow-lg shadow-amber-500/20 transition hover:bg-amber-700"
              >
                Practice This Area →
              </Link>
            </div>
          </div>
        </div>

        {/* =================================================
            BOTTOM CTA
        ================================================= */}

        <div className="rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-600 to-indigo-600 p-7 text-white shadow-xl shadow-blue-500/10 sm:p-8">

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

            <div>
              <h2 className="text-xl font-black">
                Ready for your next interview?
              </h2>

              <p className="mt-1 text-sm text-blue-100">
                Practice again and let AI help you improve.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/interview"
                className="rounded-xl bg-white px-5 py-2.5 text-xs font-black text-blue-600 transition hover:bg-blue-50"
              >
                Start Interview
              </Link>

              <Link
                to="/history"
                className="rounded-xl border border-white/30 bg-white/10 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-white/20"
              >
                View History
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}