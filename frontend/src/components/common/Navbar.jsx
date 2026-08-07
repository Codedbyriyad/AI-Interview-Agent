import Container from "./Container";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/80 backdrop-blur-md">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">
            AI Interview Agent
          </h1>

          <div className="hidden gap-8 md:flex">
            <a href="#" className="hover:text-blue-600">Features</a>
            <a href="#" className="hover:text-blue-600">How it Works</a>
            <a href="#" className="hover:text-blue-600">FAQ</a>
          </div>

          <button className="rounded-xl bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700">
            Start Practice
          </button>
        </nav>
      </Container>
    </header>
  );
}

export default Navbar;