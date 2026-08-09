import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getInterviews } from '../services/interviewService';

export default function History() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInterviews()
      .then((data) => {
        setInterviews(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading interview history...
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 max-w-5xl mx-auto space-y-6">

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold">
            Interview History
          </h1>

          <p className="text-sm text-slate-500">
            Your previous interview sessions
          </p>
        </div>

        <Link
          to="/interview"
          className="btn-primary px-5 py-2"
        >
          + New Interview
        </Link>
      </div>

      <div className="space-y-4">

        {interviews.length === 0 ? (
          <div className="glass-card p-10 text-center">
            No interviews found.
          </div>
        ) : (
          interviews.map((item) => (
            <div
              key={item.id}
              className="glass-card p-5 bg-white flex justify-between items-center"
            >

              <div>
                <h3 className="font-bold">
                  {item.role}
                </h3>

                <p className="text-xs text-slate-500 mt-1">
                  {item.interview_type}
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  {new Date(item.created_at).toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-4">

                <div className="text-center">
                  <span className="text-xl font-black text-emerald-600">
                    {item.overall_score}%
                  </span>

                  <p className="text-[9px] uppercase text-slate-400">
                    Score
                  </p>
                </div>

                <Link
                  to={`/history/${item.id}`}
                  className="btn-secondary px-4 py-2 text-xs"
                >
                  Details →
                </Link>

              </div>

            </div>
          ))
        )}

      </div>
    </div>
  );
}