import Container from "./Container";

function Footer() {
  return (
    <footer className="border-t py-8">
      <Container>
        <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
          <p className="text-sm text-gray-500">
            © 2026 AI Interview Agent
          </p>

          <p className="text-sm text-gray-500">
            Built for ABTalks AI Hackathon
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;