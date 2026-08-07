import Container from "../common/Container";
import SectionTitle from "../ui/SectionTitle";

function FAQ() {
  return (
    <section id="faq" className="py-24">
      <Container>
        <SectionTitle
          title="Frequently Asked Questions"
          subtitle="Everything you need to know."
        />

        <div className="space-y-6">
          <div className="rounded-xl border p-6">
            <h3 className="font-bold">
              Is the interview AI powered?
            </h3>

            <p className="mt-2 text-gray-600">
              Yes. The interview is powered by OpenAI models.
            </p>
          </div>

          <div className="rounded-xl border p-6">
            <h3 className="font-bold">
              Can I practice multiple times?
            </h3>

            <p className="mt-2 text-gray-600">
              Absolutely. Practice as much as you want.
            </p>
          </div>

          <div className="rounded-xl border p-6">
            <h3 className="font-bold">
              Will I receive feedback?
            </h3>

            <p className="mt-2 text-gray-600">
              Every interview includes AI-generated feedback and suggestions.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default FAQ;