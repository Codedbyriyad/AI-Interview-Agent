import { Link } from "react-router-dom";

import Container from "./Container";
import Button from "../ui/Button";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-lg">
      <Container>
        <nav className="flex h-20 items-center justify-between">

          <Link
            to="/"
            className="text-2xl font-black text-blue-600"
          >
            AI Interview Agent
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            <a href="#features" className="hover:text-blue-600">
              Features
            </a>

            <a href="#how-it-works" className="hover:text-blue-600">
              How it Works
            </a>

            <a href="#faq" className="hover:text-blue-600">
              FAQ
            </a>
          </div>

          <Button>
            Get Started
          </Button>

        </nav>
      </Container>
    </header>
  );
}

export default Navbar;