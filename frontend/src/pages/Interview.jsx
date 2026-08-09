import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { generateInterviewQuestion } from "../services/interviewService";

const roles = [
  {
    title: "Frontend Developer",
    desc: "React, JavaScript, CSS, Web Performance",
  },
  {
    title: "Backend Developer",
    desc: "Node.js, Python, APIs, Databases",
  },
  {
    title: "Full-Stack Engineer",
    desc: "Frontend, Backend & System Integration",
  },
  {
    title: "AI / Machine Learning Engineer",
    desc: "Python, ML, Deep Learning & LLMs",
  },
  {
    title: "DevOps / SRE",
    desc: "Cloud, CI/CD, Docker & Infrastructure",
  },
  {
    title: "Other (Custom)",
    desc: "Create your own interview role",
  },
];

const experienceLevels = [
  {
    value: "Entry Level",
    title: "Entry Level / Junior",
    desc: "0–2 years • Fundamentals & practical basics",
  },
  {
    value: "Mid Level",
    title: "Mid Level",
    desc: "2–5 years • Applied concepts & architecture",
  },
  {
    value: "Senior Level",
    title: "Senior / Lead",
    desc: "5+ years • Architecture, optimization & leadership",
  },
];

const focusAreas = [
  {
    value: "Technical Deep Dive",
    title: "Technical Deep Dive",
    desc: "Core concepts, syntax, architecture and implementation",
  },
  {
    value: "Problem Solving & DSA",
    title: "Problem Solving & DSA",
    desc: "Algorithms, data structures and logical thinking",
  },
  {
    value: "System Architecture",
    title: "System Architecture",
    desc: "Scalability, APIs, databases and system design",
  },
  {
    value: "Behavioral & Soft Skills",
    title: "Behavioral & Soft Skills",
    desc: "STAR method, teamwork, leadership and communication",
  },
];

const lengths = [
  {
    value: 5,
    title: "Quick Practice",
    duration: "5 Questions",
    desc: "Fast interview practice",
  },
  {
    value: 10,
    title: "Standard Interview",
    duration: "10 Questions",
    desc: "Balanced complete interview",
  },
  {
    value: 15,
    title: "Deep Practice",
    duration: "15 Questions",
    desc: "Detailed adaptive interview",
  },
];

const modes = [
  {
    value: "Technical",
    icon: "💻",
    title: "Technical",
    desc: "Technical concepts & problem solving",
  },
  {
    value: "Behavioral",
    icon: "🗣️",
    title: "Behavioral",
    desc: "Experience & situational questions",
  },
  {
    value: "Mixed",
    icon: "⚡",
    title: "Mixed",
    desc: "Technical + behavioral",
  },
];

export default function Interview() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    role: "Frontend Developer",
    customRole: "",
    experience: "Entry Level",
    focusArea: "Technical Deep Dive",
    length: 10,
    mode: "Technical",
  });

  const updateForm = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));

    setError("");
  };

  const validateStep = () => {
    if (step === 1) {
      if (
        formData.role === "Other (Custom)" &&
        !formData.customRole.trim()
      ) {
        setError("Please enter your custom job role.");
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;

    if (step < 4) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setError("");

    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleStartInterview = async () => {
    if (!validateStep()) return;

    setLoading(true);
    setError("");

    const finalRole =
      formData.role === "Other (Custom)"
        ? formData.customRole.trim()
        : formData.role;

    // The focus area is folded into the interview type so the AI
    // still tailors questions to it, since the backend only stores
    // a single free-text interview_type field.
    const interviewType =
      formData.mode === "Behavioral"
        ? formData.mode
        : `${formData.mode} (${formData.focusArea})`;

    try {
      const data = await generateInterviewQuestion({
        role: finalRole,
        experienceLevel: formData.experience,
        interviewType,
      });

      navigate("/interview/session", {
        state: {
          config: {
            role: finalRole,
            experienceLevel: formData.experience,
            interviewType,
            questionCount: formData.length,
          },
          firstQuestion: data.question,
        },
      });
    } catch (err) {
      console.error(err);

      const message =
        err.response?.data?.detail ||
        err.message ||
        "Failed to create interview session.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] px-4 py-10">
      <div className="max-w-3xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-8">
          <span className="inline-flex px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider">
            Interview Configuration
          </span>

          <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900">
            Setup Your AI Interview Session
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Configure your role, experience, focus and interview length.
          </p>
        </div>

        {/* PROGRESS */}
        <div className="relative max-w-md mx-auto mb-8">
          <div className="absolute top-1/2 left-5 right-5 h-1 bg-slate-200 -translate-y-1/2" />

          <div className="relative flex justify-between">
            {[1, 2, 3, 4].map((number) => (
              <div
                key={number}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-4 border-white transition-all ${
                  step >= number
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                {number}
              </div>
            ))}
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* CARD */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-lg p-6 sm:p-8">

          <AnimatePresence mode="wait">

            {/* STEP 1 */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    1. Select Target Job Role
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Choose the role you want to practice for.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  {roles.map((role) => (
                    <button
                      key={role.title}
                      type="button"
                      onClick={() =>
                        updateForm("role", role.title)
                      }
                      className={`text-left p-4 rounded-xl border transition-all ${
                        formData.role === role.title
                          ? "border-blue-600 bg-blue-50 shadow-sm"
                          : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                      }`}
                    >
                      <div className="font-bold text-sm text-slate-900">
                        {role.title}
                      </div>

                      <div className="text-xs text-slate-500 mt-1">
                        {role.desc}
                      </div>
                    </button>
                  ))}
                </div>

                {formData.role === "Other (Custom)" && (
                  <input
                    value={formData.customRole}
                    onChange={(e) =>
                      updateForm("customRole", e.target.value)
                    }
                    placeholder="e.g. AI Engineer"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                )}
              </motion.div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    2. Select Experience Level
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    AI will adjust question difficulty automatically.
                  </p>
                </div>

                <div className="space-y-3">
                  {experienceLevels.map((level) => (
                    <button
                      key={level.value}
                      type="button"
                      onClick={() =>
                        updateForm("experience", level.value)
                      }
                      className={`w-full text-left p-5 rounded-xl border transition-all ${
                        formData.experience === level.value
                          ? "border-blue-600 bg-blue-50"
                          : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                      }`}
                    >
                      <div className="font-bold text-slate-900">
                        {level.title}
                      </div>

                      <div className="text-xs text-slate-500 mt-1">
                        {level.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    3. Select Interview Focus
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Choose what the AI interviewer should focus on.
                  </p>
                </div>

                <div className="space-y-3">
                  {focusAreas.map((area) => (
                    <button
                      key={area.value}
                      type="button"
                      onClick={() =>
                        updateForm("focusArea", area.value)
                      }
                      className={`w-full text-left p-5 rounded-xl border transition-all ${
                        formData.focusArea === area.value
                          ? "border-blue-600 bg-blue-50"
                          : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                      }`}
                    >
                      <div className="font-bold text-slate-900">
                        {area.title}
                      </div>

                      <div className="text-xs text-slate-500 mt-1">
                        {area.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-7"
              >
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    4. Interview Format
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Decide how long and what type of interview you want.
                  </p>
                </div>

                {/* LENGTH */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    Interview Length
                  </h3>

                  <div className="grid sm:grid-cols-3 gap-3">
                    {lengths.map((length) => (
                      <button
                        key={length.value}
                        type="button"
                        onClick={() =>
                          updateForm("length", length.value)
                        }
                        className={`text-left p-4 rounded-xl border transition-all ${
                          formData.length === length.value
                            ? "border-blue-600 bg-blue-50"
                            : "border-slate-200 hover:border-blue-300"
                        }`}
                      >
                        <div className="font-bold text-sm">
                          {length.title}
                        </div>

                        <div className="text-xs text-blue-600 font-semibold mt-1">
                          {length.duration}
                        </div>

                        <div className="text-[11px] text-slate-500 mt-1">
                          {length.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* MODE */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    Interview Mode
                  </h3>

                  <div className="grid sm:grid-cols-3 gap-3">
                    {modes.map((mode) => (
                      <button
                        key={mode.value}
                        type="button"
                        onClick={() =>
                          updateForm("mode", mode.value)
                        }
                        className={`p-4 rounded-xl border text-center transition-all ${
                          formData.mode === mode.value
                            ? "border-blue-600 bg-blue-50"
                            : "border-slate-200 hover:border-blue-300"
                        }`}
                      >
                        <div className="text-2xl">
                          {mode.icon}
                        </div>

                        <div className="font-bold text-sm mt-2">
                          {mode.title}
                        </div>

                        <div className="text-[11px] text-slate-500 mt-1">
                          {mode.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CONTROLS */}
          <div className="flex items-center justify-between border-t border-slate-100 mt-8 pt-6">

            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-100"
              >
                ← Back
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition"
              >
                Continue →
              </button>
            ) : (
              <button
                type="button"
                disabled={loading}
                onClick={handleStartInterview}
                className="px-6 py-3 rounded-lg bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
              >
                {loading
                  ? "Starting AI Interview..."
                  : `🚀 Start Interview (${formData.length} Questions)`}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}