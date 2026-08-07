import Container from "../common/Container";
import Button from "../ui/Button";

function CTA() {
  return (
    <section className="bg-blue-600 py-24 text-center text-white">
      <Container>
        <h2 className="text-4xl font-black">
          Ready to Ace Your Next Interview?
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-blue-100">
          Practice smarter with AI and build confidence before the real interview.
        </p>

        <Button
          className="mt-10 bg-white text-blue-600 hover:bg-gray-100"
        >
          Start Practicing
        </Button>
      </Container>
    </section>
  );
}

export default CTA;