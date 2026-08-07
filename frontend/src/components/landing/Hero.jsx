import { motion } from "framer-motion";
import Container from "../common/Container";

function Hero() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-36">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl text-center"
        >
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            🚀 ABTalks AI Hackathon 2026
          </span>

          <h1 className="mt-8 text-5xl font-extrabold leading-tight lg:text-7xl">
            Master Every
            <span className="text-blue-600"> Interview </span>
            with AI
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg text-gray-600">
            Practice realistic interviews, receive instant AI feedback,
            improve communication, and land your dream job.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <button className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white hover:bg-blue-700">
              Start Free Interview
            </button>

            <button className="rounded-xl border px-8 py-4 font-semibold hover:bg-gray-100">
              Learn More
            </button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export default Hero;