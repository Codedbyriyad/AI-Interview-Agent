import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { getInterviewById } from '../services/interviewService';

export default function HistoryDetails() {
  const { id } = useParams();

  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInterviewById(id)
      .then((data) => {
        setInterview(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-xl font-bold">
          Interview not found
        </h1>

        <Link
          to="/history"
          className="btn-primary inline-block mt-4 px-5 py-2"
        >
          Back to History
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 max-w-5xl mx-auto space-y-6">

      <Link
        to="/history"
        className="text-sm text-blue-600"
      >
        ← Back to History
      </Link>

      <div className="glass-card p-8 bg-white flex justify-between items-center">

        <div>
          <span className="text-xs font-bold text-blue-600">
            {interview.interview_type}
          </span>

          <h1 className="text-3xl font-extrabold mt-2">
            {interview.role}
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            {new Date(interview.created_at).toLocaleString()}
          </p>
        </div>

        <div className="text-center">
          <span className="text-4xl font-black text-emerald-600">
            {interview.overall_score}%
          </span>

          <p className="text-xs text-slate-400">
            FINAL SCORE
          </p>
        </div>

      </div>

      <div className="glass-card p-6 bg-white">

        <h2 className="text-lg font-bold mb-5">
          Performance Breakdown
        </h2>

        {[
          ['Technical Accuracy', interview.technical_accuracy],
          ['Communication', interview.communication],
          ['Relevance', interview.relevance],
          ['Problem Solving', interview.problem_solving],
        ].map(([label, score]) => (
          <div key={label} className="mb-4">

            <div className="flex justify-between text-sm font-bold">
              <span>{label}</span>
              <span>{score}%</span>
            </div>

            <div className="bg-slate-100 h-2 rounded-full mt-2">
              <div
                className="bg-blue-600 h-full rounded-full"
                style={{ width: `${score}%` }}
              />
            </div>

          </div>
        ))}

      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="glass-card p-6 bg-emerald-50">
          <h2 className="font-bold text-emerald-700 mb-3">
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
          <h2 className="font-bold text-amber-700 mb-3">
            💡 Improvements
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
          Recommendation
        </h2>

        <p className="text-sm text-slate-600 mt-2">
          {interview.recommendation}
        </p>

        <h2 className="font-bold mt-6">
          Final Summary
        </h2>

        <p className="text-sm text-slate-600 mt-2">
          {interview.final_summary}
        </p>
      </div>

    </div>
  );
}