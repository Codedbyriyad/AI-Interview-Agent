import Container from "./Container";

function Footer() {
  return (
    <footer className="border-t py-8">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <h2 className="font-bold text-blue-600">
            AI Interview Agent
          </h2>

          <p className="text-sm text-gray-500">
            © 2026 AI Interview Agent. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;