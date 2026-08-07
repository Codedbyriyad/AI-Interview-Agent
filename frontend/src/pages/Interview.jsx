import { useState } from "react";

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

function Interview() {
  const [selectedRole, setSelectedRole] = useState("");

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto max-w-5xl px-6">

        <h1 className="text-center text-5xl font-black">
          Interview Setup
        </h1>

        <p className="mt-4 text-center text-gray-600">
          Step 1 of 4 — Choose your target role
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">

          {roles.map((role) => (

            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`rounded-2xl border p-6 text-left transition

              ${
                selectedRole === role
                  ? "border-blue-600 bg-blue-50"
                  : "bg-white hover:border-blue-300 hover:shadow-lg"
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

        <button
          disabled={!selectedRole}
          className="mt-10 w-full rounded-xl bg-blue-600 py-4 font-bold text-white disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          Continue
        </button>

      </div>
    </div>
  );
}

export default Interview;