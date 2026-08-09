function CTA() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-16 sm:py-24 text-white">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-96 w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-violet-600/10 blur-3xl" />

      {/* Built-in Container Wrapper */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 p-8 sm:p-12 lg:p-16 backdrop-blur-xl shadow-2xl shadow-blue-950/20">
          {/* Inner card subtle glow accents */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            {/* Top Pill Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
              </span>
              Take Your Preparation To The Next Level
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl leading-tight sm:leading-tight">
              Ace your upcoming interview with{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
                real-time AI feedback
              </span>
            </h2>

            {/* Subtitle */}
            <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
              Simulate real scenario questions, get instant scoring, and practice until you're completely confident.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/interview"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-extrabold text-slate-950 shadow-xl shadow-blue-500/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-blue-500/20"
              >
                Start Free Practice
                <span className="text-lg">→</span>
              </a>

              <a
                href="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 px-7 py-3.5 text-sm font-extrabold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:border-slate-600"
              >
                Explore Features
              </a>
            </div>

            {/* Feature Highlights / Trust badge */}
            <div className="mt-10 pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="text-blue-400 font-bold">✓</span> No Credit Card Required
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-400 font-bold">✓</span> Instant Score Analysis
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-400 font-bold">✓</span> 100+ Interview Scenarios
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;