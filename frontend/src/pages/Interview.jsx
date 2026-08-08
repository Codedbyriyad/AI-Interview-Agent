import { useState } from "react";
import {
  generateInterviewQuestion,
  evaluateInterviewAnswer,
} from "../services/interviewService";

const roles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "React Developer",
  "Python Developer",
  "AI Engineer",
  "Machine Learning Engineer",
  "Data Scientist",
  "DevOps Engineer",
  "Software Engineer",
];

const experienceLevels = [
  "Beginner",
  "Junior",
  "Intermediate",
  "Senior",
];

const interviewTypes = [
  "Technical",
  "Behavioral",
  "Mixed",
];

function Interview() {
  const [step, setStep] = useState(1);

  const [selectedRole, setSelectedRole] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedInterviewType, setSelectedInterviewType] = useState("");

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [evaluation, setEvaluation] = useState(null);

  const [loading, setLoading] = useState(false);
  const [evaluating, setEvaluating] = useState(false);

  const [error, setError] = useState("");

  const handleContinue = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleStartInterview = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await generateInterviewQuestion({
        role: selectedRole,
        experienceLevel: selectedExperience,
        interviewType: selectedInterviewType,
      });

      setQuestion(data.question);
      setStep(4);
    } catch (err) {
      console.error("Interview Error:", err);

      const message =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        err.message ||
        "Unknown error";

      setError(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) {
      setError("Please write your answer before submitting.");
      return;
    }

    setEvaluating(true);
    setError("");

    try {
      const data = await evaluateInterviewAnswer({
        role: selectedRole,
        experienceLevel: selectedExperience,
        interviewType: selectedInterviewType,
        question,
        answer,
      });

      setEvaluation(data.evaluation);
      setStep(5);
    } catch (err) {
      console.error("Evaluation Error:", err);

      const message =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        err.message ||
        "Unable to evaluate your answer.";

      setError(`Error: ${message}`);
    } finally {
      setEvaluating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="mx-auto max-w-5xl">

        {/* HEADER */}

        <h1 className="text-center text-5xl font-black">
          {step === 4
            ? "AI Interview"
            : step === 5
              ? "Interview Feedback"
              : "Interview Setup"}
        </h1>

        <p className="mt-4 text-center text-gray-600">
          {step === 1 && "Step 1 of 3 — Choose your target role"}
          {step === 2 && "Step 2 of 3 — Select your experience level"}
          {step === 3 && "Step 3 of 3 — Choose interview type"}
          {step === 4 && "Your AI interviewer is ready"}
          {step === 5 && "AI-powered evaluation of your answer"}
        </p>

        {/* STEP 1 — ROLE */}

        {step === 1 && (
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`rounded-2xl border p-6 text-left transition ${
                  selectedRole === role
                    ? "border-blue-600 bg-blue-50 shadow-md"
                    : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-lg"
                }`}
              >
                <h3 className="text-xl font-bold">
                  {role}
                </h3>

                <p className="mt-2 text-gray-500">
                  Practice AI interviews for this role.
                </p>
              </button>
            ))}
          </div>
        )}

        {/* STEP 2 — EXPERIENCE */}

        {step === 2 && (
          <div className="mx-auto mt-12 grid max-w-2xl gap-5">
            {experienceLevels.map((level) => (
              <button
                key={level}
                onClick={() => setSelectedExperience(level)}
                className={`rounded-2xl border p-6 text-left transition ${
                  selectedExperience === level
                    ? "border-blue-600 bg-blue-50 shadow-md"
                    : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-lg"
                }`}
              >
                <h3 className="text-xl font-bold">
                  {level}
                </h3>

                <p className="mt-2 text-gray-500">
                  Questions will be adjusted to your experience level.
                </p>
              </button>
            ))}
          </div>
        )}

        {/* STEP 3 — INTERVIEW TYPE */}

        {step === 3 && (
          <div className="mx-auto mt-12 grid max-w-2xl gap-5">
            {interviewTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedInterviewType(type)}
                className={`rounded-2xl border p-6 text-left transition ${
                  selectedInterviewType === type
                    ? "border-blue-600 bg-blue-50 shadow-md"
                    : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-lg"
                }`}
              >
                <h3 className="text-xl font-bold">
                  {type} Interview
                </h3>

                <p className="mt-2 text-gray-500">
                  Practice with {type.toLowerCase()} interview questions.
                </p>
              </button>
            ))}
          </div>
        )}

        {/* STEP 4 — AI QUESTION */}

        {step === 4 && (
          <div className="mx-auto mt-12 max-w-3xl">
            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl">

              {/* INTERVIEW INFO */}

              <div className="mb-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                  {selectedRole}
                </span>

                <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700">
                  {selectedExperience}
                </span>

                <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
                  {selectedInterviewType}
                </span>
              </div>

              {/* QUESTION */}

              <p className="text-sm font-semibold uppercase tracking-wide text-gray-400">
                Question 1
              </p>

              <h2 className="mt-4 text-2xl font-bold leading-relaxed">
                {question}
              </h2>

              {/* ANSWER */}

              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className="mt-8 min-h-48 w-full resize-none rounded-2xl border border-gray-200 p-5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              {/* SUBMIT */}

              <button
                onClick={handleSubmitAnswer}
                disabled={!answer.trim() || evaluating}
                className="mt-6 w-full rounded-xl bg-blue-600 py-4 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {evaluating
                  ? "AI is evaluating your answer..."
                  : "Submit Answer"}
              </button>
            </div>
          </div>
        )}

        {/* STEP 5 — FEEDBACK */}

        {step === 5 && evaluation && (
          <div className="mx-auto mt-12 max-w-4xl">

            {/* OVERALL SCORE */}

            <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-gray-400">
                Overall Score
              </p>

              <div className="mt-4 text-7xl font-black text-blue-600">
                {evaluation.overall_score}
              </div>

              <p className="mt-2 text-gray-500">
                out of 100
              </p>
            </div>

            {/* SCORE CARDS */}

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              <div className="rounded-2xl border bg-white p-6 text-center shadow-sm">
                <p className="text-sm text-gray-500">
                  Technical Accuracy
                </p>

                <p className="mt-2 text-3xl font-black text-blue-600">
                  {evaluation.technical_accuracy}
                </p>
              </div>

              <div className="rounded-2xl border bg-white p-6 text-center shadow-sm">
                <p className="text-sm text-gray-500">
                  Communication
                </p>

                <p className="mt-2 text-3xl font-black text-blue-600">
                  {evaluation.communication}
                </p>
              </div>

              <div className="rounded-2xl border bg-white p-6 text-center shadow-sm">
                <p className="text-sm text-gray-500">
                  Relevance
                </p>

                <p className="mt-2 text-3xl font-black text-blue-600">
                  {evaluation.relevance}
                </p>
              </div>

              <div className="rounded-2xl border bg-white p-6 text-center shadow-sm">
                <p className="text-sm text-gray-500">
                  Problem Solving
                </p>

                <p className="mt-2 text-3xl font-black text-blue-600">
                  {evaluation.problem_solving}
                </p>
              </div>

            </div>

            {/* STRENGTHS + IMPROVEMENTS */}

            <div className="mt-6 grid gap-6 md:grid-cols-2">

              {/* STRENGTHS */}

              <div className="rounded-3xl border border-green-200 bg-green-50 p-7">
                <h3 className="text-xl font-bold text-green-800">
                  ✅ Strengths
                </h3>

                <ul className="mt-4 space-y-3">
                  {evaluation.strengths?.map((strength, index) => (
                    <li
                      key={index}
                      className="rounded-xl bg-white p-4 text-gray-700"
                    >
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>

              {/* IMPROVEMENTS */}

              <div className="rounded-3xl border border-orange-200 bg-orange-50 p-7">
                <h3 className="text-xl font-bold text-orange-800">
                  ⚠️ Areas to Improve
                </h3>

                <ul className="mt-4 space-y-3">
                  {evaluation.improvements?.map((improvement, index) => (
                    <li
                      key={index}
                      className="rounded-xl bg-white p-4 text-gray-700"
                    >
                      {improvement}
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* BETTER ANSWER */}

            <div className="mt-6 rounded-3xl border border-blue-200 bg-blue-50 p-7">
              <h3 className="text-xl font-bold text-blue-800">
                💡 Example of a Better Answer
              </h3>

              <p className="mt-4 leading-relaxed text-gray-700">
                {evaluation.better_answer}
              </p>
            </div>

            {/* TRY AGAIN */}

            <button
              onClick={() => {
                setAnswer("");
                setEvaluation(null);
                setError("");
                setStep(4);
              }}
              className="mt-8 w-full rounded-xl bg-blue-600 py-4 font-bold text-white transition hover:bg-blue-700"
            >
              Practice This Question Again
            </button>

          </div>
        )}

        {/* ERROR */}

        {error && (
          <div className="mx-auto mt-6 max-w-2xl rounded-xl border border-red-200 bg-red-50 p-4 text-center text-red-600">
            {error}
          </div>
        )}

        {/* NAVIGATION */}

        {step < 4 && (
          <div className="mx-auto mt-10 flex max-w-2xl gap-4">

            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="w-1/3 rounded-xl border border-gray-300 bg-white py-4 font-bold transition hover:bg-gray-100"
              >
                Back
              </button>
            )}

            {step < 3 && (
              <button
                onClick={handleContinue}
                disabled={
                  (step === 1 && !selectedRole) ||
                  (step === 2 && !selectedExperience)
                }
                className="flex-1 rounded-xl bg-blue-600 py-4 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                Continue
              </button>
            )}

            {step === 3 && (
              <button
                onClick={handleStartInterview}
                disabled={!selectedInterviewType || loading}
                className="flex-1 rounded-xl bg-blue-600 py-4 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {loading
                  ? "AI is preparing your question..."
                  : "Start Interview"}
              </button>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default Interview;