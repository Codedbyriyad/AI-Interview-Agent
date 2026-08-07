import { motion } from "framer-motion";
import {
  Brain,
  Mic,
  BarChart3,
  MessageSquare,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

import Container from "../common/Container";
import Card from "../ui/Card";
import SectionTitle from "../ui/SectionTitle";

const features = [
  {
    icon: Brain,
    title: "AI Interviewer",
    description:
      "Practice with an intelligent interviewer that adapts to your answers.",
  },
  {
    icon: Mic,
    title: "Voice Conversation",
    description:
      "Speak naturally using AI-powered voice interaction.",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description:
      "Track confidence, communication, and technical performance.",
  },
  {
    icon: MessageSquare,
    title: "Instant Feedback",
    description:
      "Receive detailed suggestions immediately after each interview.",
  },
  {
    icon: Sparkles,
    title: "Personalized Coaching",
    description:
      "Get AI-generated improvement plans based on previous interviews.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Private",
    description:
      "Your interview history stays private and securely stored.",
  },
];

function Features() {
  return (
    <section id="features" className="py-24">
      <Container>
        <SectionTitle
          title="Everything You Need"
          subtitle="Powerful AI features to help you prepare for real-world interviews."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                }}
                viewport={{ once: true }}
              >
                <Card>
                  <div className="mb-5 inline-flex rounded-xl bg-blue-100 p-3">
                    <Icon className="text-blue-600" size={28} />
                  </div>

                  <h3 className="text-xl font-bold">
                    {feature.title}
                  </h3>

                  <p className="mt-3 leading-7 text-gray-600">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default Features;