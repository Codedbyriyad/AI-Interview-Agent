import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Mic,
  Sparkles,
} from "lucide-react";

import Container from "../common/Container";
import Button from "../ui/Button";
import Card from "../ui/Card";
import { APP } from "../../constants/theme";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-blue-50 py-24 lg:py-32">

      {/* Background Blur */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl"></div>
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl"></div>

      <Container>

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* LEFT */}

          <motion.div
            initial={{ opacity:0, x:-40 }}
            animate={{ opacity:1, x:0 }}
            transition={{ duration:0.7 }}
          >

            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              <Sparkles size={16}/>
              Built for ABTalks AI Hackathon
            </div>

            <h1 className="text-5xl font-black leading-tight lg:text-7xl">
              {APP.slogan}
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-gray-600">
              Practice realistic AI interviews,
              receive personalized feedback,
              improve confidence,
              and get ready for your dream job.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <Button>
                Start Interview
              </Button>

              <Button variant="secondary">
                Learn More
              </Button>

            </div>

          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{ opacity:0, x:40 }}
            animate={{ opacity:1, x:0 }}
            transition={{ duration:0.8 }}
          >

            <Card>

              <div className="space-y-6">

                <div className="flex items-center gap-4">

                  <div className="rounded-xl bg-blue-100 p-3">
                    <Mic className="text-blue-600"/>
                  </div>

                  <div>
                    <h3 className="font-bold">
                      AI Interview Started
                    </h3>

                    <p className="text-sm text-gray-500">
                      Tell me about yourself...
                    </p>
                  </div>

                </div>

                <div className="h-2 rounded bg-gray-200">

                  <div className="h-full w-3/4 rounded bg-blue-600"></div>

                </div>

                <div className="grid gap-4">

                  <div className="rounded-xl bg-slate-100 p-4">
                    Confidence Score
                    <div className="mt-2 text-3xl font-bold">
                      92%
                    </div>
                  </div>

                  <div className="rounded-xl bg-slate-100 p-4">
                    AI Feedback
                    <div className="mt-2 text-gray-600">
                      Great eye contact, strong communication,
                      improve technical depth.
                    </div>
                  </div>

                </div>

              </div>

            </Card>

          </motion.div>

        </div>

      </Container>

    </section>
  );
}

export default Hero;