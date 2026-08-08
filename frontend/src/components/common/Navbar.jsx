import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import Container from "./Container";
import Button from "../ui/Button";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/70 bg-white/90 backdrop-blur-xl">
      <Container>
        <nav className="flex h-20 items-center justify-between">

          {/* ============================= */}
          {/* LOGO */}
          {/* ============================= */}

          <Link
            to="/"
            onClick={closeMobileMenu}
            className="group flex items-center gap-3"
          >
            {/* Logo Icon */}
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-lg font-black text-white shadow-lg shadow-blue-500/20 transition duration-300 group-hover:scale-105">
              AI
            </div>

            {/* Brand */}
            <div className="hidden sm:block">
              <p className="text-lg font-black tracking-tight text-gray-900">
                AI Interview
              </p>

              <p className="-mt-1 text-xs font-medium text-gray-500">
                Agent
              </p>
            </div>
          </Link>

          {/* ============================= */}
          {/* DESKTOP NAVIGATION */}
          {/* ============================= */}

          <div className="hidden items-center gap-2 lg:flex">

            <a
              href="/#features"
              className="rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-blue-600"
            >
              Features
            </a>

            <a
              href="/#how-it-works"
              className="rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-blue-600"
            >
              How it Works
            </a>

            <a
              href="/#faq"
              className="rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-blue-600"
            >
              FAQ
            </a>

            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                }`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/history"
              className={({ isActive }) =>
                `rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                }`
              }
            >
              History
            </NavLink>
          </div>

          {/* ============================= */}
          {/* DESKTOP CTA */}
          {/* ============================= */}

          <div className="hidden lg:block">
            <Link to="/interview">
              <Button>Start Interview</Button>
            </Link>
          </div>

          {/* ============================= */}
          {/* MOBILE MENU BUTTON */}
          {/* ============================= */}

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 transition hover:border-blue-300 hover:text-blue-600 lg:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </nav>

        {/* ============================= */}
        {/* MOBILE NAVIGATION */}
        {/* ============================= */}

        {mobileOpen && (
          <div className="border-t border-gray-100 py-5 lg:hidden">

            <div className="flex flex-col gap-2">

              <a
                href="/#features"
                onClick={closeMobileMenu}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
              >
                Features
              </a>

              <a
                href="/#how-it-works"
                onClick={closeMobileMenu}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
              >
                How it Works
              </a>

              <a
                href="/#faq"
                onClick={closeMobileMenu}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
              >
                FAQ
              </a>

              <NavLink
                to="/dashboard"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }`
                }
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/history"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }`
                }
              >
                History
              </NavLink>

              <Link
                to="/interview"
                onClick={closeMobileMenu}
                className="mt-2"
              >
                <Button>Start Interview</Button>
              </Link>

            </div>
          </div>
        )}
      </Container>
    </header>
  );
}

export default Navbar;