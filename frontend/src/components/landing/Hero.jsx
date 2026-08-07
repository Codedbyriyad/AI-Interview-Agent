import { motion } from "framer-motion";
import {
  Mic,
  Brain,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";

import Container from "../common/Container";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white py-24 lg:py-36">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl text-center"
        >
          <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            🚀 Built for ABTalks AI Hackathon 2026
          </span>

          <h1 className="mt-8 text-5xl font-extrabold leading-tight text-gray-900 lg:text-7xl">
            Master Every
            <span className="text-blue-600"> Interview </span>
            with AI
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-gray-600">
            Practice realistic interviews, receive instant AI feedback,
            improve communication skills, and boost your confidence.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <button className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700">
              Start Interview
              <ArrowRight size={20} />
            </button>

            <button className="rounded-xl border border-gray-300 px-8 py-4 font-semibold transition hover:bg-gray-100">
              Watch Demo
            </button>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <Mic className="mx-auto mb-4 text-blue-600" size={34} />
              <h3 className="font-bold">Voice Interview</h3>
              <p className="mt-2 text-sm text-gray-500">
                Talk naturally using AI voice conversation.
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <Brain className="mx-auto mb-4 text-blue-600" size={34} />
              <h3 className="font-bold">AI Feedback</h3>
              <p className="mt-2 text-sm text-gray-500">
                Receive detailed interview analysis instantly.
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <BadgeCheck className="mx-auto mb-4 text-blue-600" size={34} />
              <h3 className="font-bold">Track Progress</h3>
              <p className="mt-2 text-sm text-gray-500">
                Improve over time with personalized insights.
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export default Hero;