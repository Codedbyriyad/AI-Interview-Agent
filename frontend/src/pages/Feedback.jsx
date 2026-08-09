import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function Feedback() {
  const location = useLocation();

  const interview = location.state?.interview;

  if (!interview) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-xl font-bold">
          No interview report found
        </h1>

        <Link
          to="/interview"
          className="btn-primary inline-block mt-4 px-5 py-2"
        >
          Start Interview
        </Link>
      </div>
    );
  }

  const metrics = [
    {
      label: 'Technical Accuracy',
      score: interview.technical_accuracy,
    },
    {
      label: 'Communication',
      score: interview.communication,
    },
    {
      label: 'Relevance',
      score: interview.relevance,
    },
    {
      label: 'Problem Solving',
      score: interview.problem_solving,
    },
  ];

  return (
    <div className="min-h-screen py-10 px-4 max-w-5xl mx-auto space-y-6">

      <div>
        <span className="text-xs font-bold text-blue-600">
          AI EVALUATION REPORT
        </span>

        <h1 className="text-3xl font-extrabold mt-2">
          Interview Performance Feedback
        </h1>

        <p className="text-sm text-slate-500">
          {interview.role} • {interview.interview_type}
        </p>
      </div>

      <div className="glass-card p-8 bg-white flex justify-between items-center">

        <div>
          <h2 className="text-xl font-bold">
            Overall Performance
          </h2>

          <p className="text-sm text-slate-600 mt-2 max-w-xl">
            {interview.final_summary}
          </p>
        </div>

        <div className="text-center">
          <span className="text-5xl font-black text-emerald-600">
            {interview.overall_score}%
          </span>

          <p className="text-xs font-bold text-slate-400">
            OVERALL SCORE
          </p>
        </div>

      </div>

      <div className="glass-card p-6 bg-white space-y-5">

        <h2 className="text-lg font-bold">
          Skill Breakdown
        </h2>

        {metrics.map((metric) => (
          <div key={metric.label}>

            <div className="flex justify-between text-sm font-bold">
              <span>{metric.label}</span>
              <span className="text-blue-600">
                {metric.score}%
              </span>
            </div>

            <div className="w-full bg-slate-100 h-3 rounded-full mt-2">
              <div
                className="bg-blue-600 h-full rounded-full"
                style={{ width: `${metric.score}%` }}
              />
            </div>

          </div>
        ))}

      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="glass-card p-6 bg-emerald-50">
          <h2 className="font-bold text-emerald-700 mb-4">
            ✨ Strengths
          </h2>

          <ul className="space-y-2">
            {interview.strengths.map((item, index) => (
              <li key={index} className="text-sm">
                ✓ {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-card p-6 bg-amber-50">
          <h2 className="font-bold text-amber-700 mb-4">
            💡 Areas to Improve
          </h2>

          <ul className="space-y-2">
            {interview.improvements.map((item, index) => (
              <li key={index} className="text-sm">
                → {item}
              </li>
            ))}
          </ul>
        </div>

      </div>

      <div className="glass-card p-6 bg-white">
        <h2 className="font-bold">
          AI Recommendation
        </h2>

        <p className="text-sm text-slate-600 mt-2">
          {interview.recommendation}
        </p>
      </div>

      <div className="flex justify-between">
        <Link
          to="/dashboard"
          className="btn-secondary px-5 py-2"
        >
          Dashboard
        </Link>

        <Link
          to="/history"
          className="btn-primary px-5 py-2"
        >
          View History →
        </Link>
      </div>

    </div>
  );
}