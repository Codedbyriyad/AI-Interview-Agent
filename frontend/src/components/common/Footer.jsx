import Container from "./Container";

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-slate-950 text-white">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl" />

      <Container>
        {/* Final CTA */}
        <div className="relative py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />
              AI-powered interview practice
            </div>

            <h2 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Ready for your next
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
                interview?
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
              Practice with an AI interviewer, get personalized feedback,
              and improve with every interview session.
            </p>

            <a
              href="/interview"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-extrabold text-slate-950 shadow-lg shadow-blue-500/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-50"
            >
              Start New Interview
              <span className="text-lg">→</span>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-800" />

        {/* Footer content */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a
              href="/"
              className="inline-flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 text-lg font-black shadow-lg shadow-blue-500/20">
                AI
              </div>

              <div>
                <div className="text-base font-black tracking-tight">
                  AI Interview Agent
                </div>
                <div className="text-xs text-slate-500">
                  Practice Smarter. Interview Better.
                </div>
              </div>
            </a>

            <p className="mt-5 max-w-md text-sm leading-6 text-slate-400">
              A smarter way to prepare for technical, behavioral, and
              professional interviews with AI-powered practice and
              personalized evaluation.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-4 text-xs font-black uppercase tracking-widest text-slate-500">
              Product
            </h3>

            <div className="flex flex-col gap-3 text-sm">
              <a
                href="/interview"
                className="text-slate-400 transition hover:text-white"
              >
                Start Interview
              </a>

              <a
                href="/dashboard"
                className="text-slate-400 transition hover:text-white"
              >
                Dashboard
              </a>

              <a
                href="/history"
                className="text-slate-400 transition hover:text-white"
              >
                Interview History
              </a>
            </div>
          </div>

          {/* Experience */}
          <div>
            <h3 className="mb-4 text-xs font-black uppercase tracking-widest text-slate-500">
              Experience
            </h3>

            <div className="flex flex-col gap-3 text-sm">
              <span className="text-slate-400">
                AI Evaluation
              </span>

              <span className="text-slate-400">
                Personalized Feedback
              </span>

              <span className="text-slate-400">
                Performance Tracking
              </span>

              <span className="text-slate-400">
                Voice Interview
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 border-t border-slate-800 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 AI Interview Agent. All rights reserved.
          </p>

          <p className="flex items-center gap-1">
            Built for better interviews
            <span className="text-blue-400">✦</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;