import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    step: '01',
    title: 'Configure Your Session',
    description: 'Select target job role (Frontend, Backend, AI/ML), experience level, and interview type.',
  },
  {
    step: '02',
    title: 'Simulate the Interview',
    description: 'Answer AI-generated technical questions via text or live voice input in real time.',
  },
  {
    step: '03',
    title: 'Analyze & Improve',
    description: 'Review instant scoring analytics, identified strengths, and recommended improvement steps.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-blue-600 text-xs sm:text-sm font-bold tracking-widest uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            3-Step Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            How AI Interview Agent Works
          </h2>
        </div>

        {/* Workflow Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Connector Line for Desktop */}
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-dashed border-t-2 border-slate-200 -z-0" />

          {steps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative z-10 glass-card p-8 text-center space-y-4 border-slate-200/70 hover:border-blue-300 transition-all"
            >
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-xl flex items-center justify-center shadow-md shadow-blue-500/20">
                {item.step}
              </div>
              <h3 className="text-xl font-bold text-navy-900">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}