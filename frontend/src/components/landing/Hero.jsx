import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Mic,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

import Container from "../common/Container";
import Button from "../ui/Button";
import { APP } from "../../constants/theme";

function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-white">

      {/* ========================================= */}
      {/* BACKGROUND */}
      {/* ========================================= */}

      <div className="pointer-events-none absolute inset-0">

        <div className="absolute left-[-120px] top-[-120px] h-[420px] w-[420px] rounded-full bg-blue-400/10 blur-3xl" />

        <div className="absolute right-[-100px] top-[20%] h-[500px] w-[500px] rounded-full bg-indigo-400/10 blur-3xl" />

        <div className="absolute bottom-[-200px] left-[35%] h-[450px] w-[450px] rounded-full bg-cyan-300/10 blur-3xl" />

      </div>

      {/* ========================================= */}
      {/* CONTENT */}
      {/* ========================================= */}

      <Container>

        <div className="relative grid items-center gap-16 py-20 lg:min-h-[calc(100vh-80px)] lg:grid-cols-[1.05fr_0.95fr] lg:py-24">

          {/* ===================================== */}
          {/* LEFT */}
          {/* ===================================== */}

          <motion.div
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >

            {/* Badge */}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm"
            >
              <Sparkles size={16} />

              <span>AI-Powered Interview Coach</span>
            </motion.div>

            {/* Heading */}

            <h1 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-tight text-gray-950 sm:text-6xl lg:text-7xl">

              {APP.slogan}

            </h1>

            {/* Gradient accent */}

            <div className="mt-3 h-1.5 w-24 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600" />

            {/* Description */}

            <p className="mt-7 max-w-xl text-lg leading-8 text-gray-600 sm:text-xl">
              Practice realistic interviews with AI, receive instant
              personalized feedback, and build the confidence you need to
              land your dream job.
            </p>

            {/* CTA */}

            <div className="mt-9 flex flex-wrap items-center gap-4">

              <Link to="/interview">
                <Button>
                  <span className="flex items-center gap-2">
                    Start Interview
                    <ArrowRight size={18} />
                  </span>
                </Button>
              </Link>

              <a href="#how-it-works">
                <Button variant="secondary">
                  See How It Works
                </Button>
              </a>

            </div>

            {/* Trust indicators */}

            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm text-gray-500">

              <div className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-green-500" />
                AI-powered evaluation
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-green-500" />
                Personalized feedback
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-green-500" />
                Practice anytime
              </div>

            </div>

          </motion.div>

          {/* ===================================== */}
          {/* RIGHT — AI INTERVIEW PREVIEW */}
          {/* ===================================== */}

          <motion.div
            initial={{ opacity: 0, x: 35, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="relative"
          >

            {/* Floating badge */}

            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -right-3 -top-5 z-20 hidden items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-xl sm:flex"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                <Brain size={17} className="text-blue-600" />
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-400">
                  AI STATUS
                </p>

                <p className="text-sm font-bold text-gray-800">
                  Interview Ready
                </p>
              </div>
            </motion.div>

            {/* Main card */}

            <div className="relative overflow-hidden rounded-[2rem] border border-gray-200 bg-white p-5 shadow-2xl shadow-blue-900/10 sm:p-7">

              {/* Card top gradient */}

              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400" />

              {/* Header */}

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/20">
                    <Brain size={21} className="text-white" />
                  </div>

                  <div>
                    <p className="font-bold text-gray-900">
                      AI Interview Agent
                    </p>

                    <div className="mt-0.5 flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-green-500" />

                      <span className="text-xs text-gray-500">
                        Live session
                      </span>
                    </div>
                  </div>

                </div>

                <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-600">
                  Q 3 / 5
                </span>

              </div>

              {/* Question */}

              <div className="mt-7 rounded-2xl bg-gray-50 p-5">

                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Interview Question
                </p>

                <p className="mt-3 text-lg font-bold leading-7 text-gray-900">
                  Tell me about a challenging project you worked on and how
                  you solved the problem.
                </p>

              </div>

              {/* Voice indicator */}

              <div className="mt-5 flex items-center gap-4 rounded-2xl border border-blue-100 bg-blue-50/70 p-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600 shadow-lg shadow-blue-500/20">
                  <Mic size={19} className="text-white" />
                </div>

                <div className="flex-1">

                  <p className="text-sm font-bold text-gray-800">
                    Listening to your answer...
                  </p>

                  <div className="mt-2 flex h-5 items-center gap-1">
                    {[3, 6, 10, 7, 13, 8, 15, 6, 11, 5, 9, 4].map(
                      (height, index) => (
                        <motion.span
                          key={index}
                          animate={{
                            height: [
                              `${height}px`,
                              `${Math.max(4, height - 3)}px`,
                              `${height + 3}px`,
                            ],
                          }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            delay: index * 0.05,
                          }}
                          className="w-1 rounded-full bg-blue-500"
                        />
                      )
                    )}
                  </div>

                </div>

                <span className="text-xs font-semibold text-blue-600">
                  00:42
                </span>

              </div>

              {/* Progress */}

              <div className="mt-6">

                <div className="mb-2 flex justify-between text-xs font-semibold text-gray-400">
                  <span>Interview Progress</span>
                  <span>60%</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-gray-100">

                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "60%" }}
                    transition={{ duration: 1.2, delay: 0.5 }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-500"
                  />

                </div>

              </div>

              {/* Feedback */}

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">

                  <div className="flex items-center gap-2">
                    <TrendingUp size={16} className="text-green-500" />

                    <p className="text-xs font-semibold text-gray-500">
                      Confidence
                    </p>
                  </div>

                  <p className="mt-2 text-3xl font-black text-gray-900">
                    92<span className="text-lg text-gray-400">%</span>
                  </p>

                  <p className="mt-1 text-xs font-medium text-green-600">
                    Excellent performance
                  </p>

                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">

                  <p className="text-xs font-semibold text-gray-500">
                    AI Feedback
                  </p>

                  <p className="mt-2 text-sm font-semibold leading-5 text-gray-800">
                    Strong communication. Improve technical depth.
                  </p>

                </div>

              </div>

            </div>

            {/* Bottom floating score */}

            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-5 -left-4 hidden rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-xl sm:block"
            >
              <p className="text-xs font-semibold text-gray-400">
                AI READINESS
              </p>

              <div className="mt-1 flex items-end gap-2">
                <span className="text-2xl font-black text-gray-900">
                  87
                </span>

                <span className="pb-1 text-sm font-semibold text-green-600">
                  +12%
                </span>
              </div>
            </motion.div>

          </motion.div>

        </div>

      </Container>

    </section>
  );
}

export default Hero;