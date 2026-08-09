import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Ambient background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-400/20 to-indigo-500/20 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Value Proposition, and CTAs */}
          <motion.div 
            className="lg:col-span-7 text-center lg:text-left space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs sm:text-sm font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              Next-Gen AI Mock Interviewer
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy-900 tracking-tight leading-[1.15]">
              Master Your Next <br className="hidden sm:inline" />
              <span className="gradient-text">Tech Interview</span> with AI
            </h1>

            {/* Subtitle / Description */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Simulate real-world technical and behavioral interviews. Receive instant detailed feedback, voice-enabled evaluation, and actionable analytics to boost your confidence.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link to="/interview" className="btn-primary w-full sm:w-auto text-base px-8 py-3.5 shadow-lg shadow-blue-500/25">
                Start Practice Session
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>

              <Link to="/dashboard" className="btn-secondary w-full sm:w-auto text-base px-8 py-3.5">
                View Performance Analytics
              </Link>
            </div>

            {/* Micro Social Proof / Key Stats */}
            <div className="pt-6 border-t border-slate-200/60 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 text-center lg:text-left">
              <div>
                <p className="text-2xl font-bold text-navy-900">10k+</p>
                <p className="text-xs text-slate-500 font-medium">Questions Evaluated</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-navy-900">98%</p>
                <p className="text-xs text-slate-500 font-medium">Feedback Accuracy</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-navy-900">24/7</p>
                <p className="text-xs text-slate-500 font-medium">AI Availability</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Simulated Live AI Mock Interface Display */}
          <motion.div 
            className="lg:col-span-5"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-card p-6 border-slate-200/90 relative overflow-hidden shadow-2xl">
              
              {/* Header Bar of Mock UI */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold flex items-center gap-1.5 border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Live Interview Active
                </div>
              </div>

              {/* AI Interviewer Speech Bubble */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2 shadow-md">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-blue-400">AI Senior Tech Lead</span>
                    <span>Question 2 of 5</span>
                  </div>
                  <p className="text-sm font-medium text-slate-200 leading-relaxed">
                    "Could you explain the key architectural differences between RESTful APIs and GraphQL?"
                  </p>
                </div>

                {/* Animated Voice Waveform Visualizer Placeholder */}
                <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                      AI
                    </div>
                    <div>
                      <p className="text-xs font-bold text-navy-900">Audio Input Active</p>
                      <p className="text-[11px] text-slate-500">Listening to candidate response...</p>
                    </div>
                  </div>
                  
                  {/* Waveform Bars */}
                  <div className="flex items-center gap-1 h-6">
                    <span className="w-1 bg-blue-500 rounded-full animate-wave-bar" style={{ animationDelay: '0s' }} />
                    <span className="w-1 bg-indigo-500 rounded-full animate-wave-bar" style={{ animationDelay: '0.2s' }} />
                    <span className="w-1 bg-blue-600 rounded-full animate-wave-bar" style={{ animationDelay: '0.4s' }} />
                    <span className="w-1 bg-indigo-600 rounded-full animate-wave-bar" style={{ animationDelay: '0.1s' }} />
                    <span className="w-1 bg-blue-400 rounded-full animate-wave-bar" style={{ animationDelay: '0.3s' }} />
                  </div>
                </div>

                {/* Live Real-Time Evaluation Score Badge Floating Overlay */}
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-800">Communication Score</p>
                      <p className="text-[11px] text-slate-500">Clear pacing & structured answer</p>
                    </div>
                  </div>
                  <span className="text-sm font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    92/100
                  </span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}