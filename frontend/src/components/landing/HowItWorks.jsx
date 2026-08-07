import { Mic, Brain, BarChart3 } from "lucide-react";
import SectionTitle from "../ui/SectionTitle";
import Card from "../ui/Card";
import Container from "../common/Container";

const steps = [
  {
    icon: Mic,
    title: "Start Interview",
    description:
      "Choose your interview role and begin speaking naturally with AI.",
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description:
      "Our AI evaluates your answers, confidence and communication.",
  },
  {
    icon: BarChart3,
    title: "Improve",
    description:
      "Receive detailed feedback and improve with every interview.",
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-slate-50 py-24">
      <Container>
        <SectionTitle
          title="How It Works"
          subtitle="Three simple steps to improve your interview skills."
        />

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <Card key={step.title}>
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100">
                  <Icon className="text-blue-600" />
                </div>

                <div className="mb-3 text-sm font-bold text-blue-600">
                  Step {index + 1}
                </div>

                <h3 className="text-xl font-bold">
                  {step.title}
                </h3>

                <p className="mt-3 text-gray-600">
                  {step.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default HowItWorks;