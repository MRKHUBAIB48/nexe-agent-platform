import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Cpu, Zap, Activity, Star, Moon, Sun } from 'lucide-react';

export default function LandingPage({ onEnterDashboard, darkMode, setDarkMode }) {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full selection:bg-indigo-500 selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-black tracking-wider">NX</div>
            <span className="font-bold tracking-tight text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-400">Nexe-Agent</span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            <button onClick={() => scrollToSection('features')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Features</button>
            <button onClick={() => scrollToSection('testimonials')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Testimonials</button>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 transition text-slate-700 dark:text-slate-300">
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={onEnterDashboard} className="px-4 py-2 text-sm font-medium bg-slate-950 text-white dark:bg-white dark:text-slate-950 rounded-xl hover:opacity-90 transition shadow-sm flex items-center space-x-1">
              <span>Launch Platform</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="absolute top-20 -z-10 w-72 h-72 bg-indigo-500/10 blur-3xl rounded-full dark:bg-indigo-500/5" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center space-x-2 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase mb-6 border border-indigo-100 dark:border-indigo-900/30">
          <Activity size={12} /> <span>AI-Powered Software Systems</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl bg-clip-text text-transparent bg-gradient-to-b from-slate-950 to-slate-700 dark:from-white dark:to-slate-400 leading-[1.15]">
          Automate Operations With Autonomous Agents
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-2xl font-normal leading-relaxed">
          Deploy high-fidelity frontend pipelines, interactive workspaces, and intelligent agents built for scaling operational logic natively.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <button onClick={onEnterDashboard} className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-xl font-medium shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition flex items-center justify-center space-x-2">
            <span>Explore Live Workspace</span> <ArrowRight size={18} />
          </button>
          <button onClick={() => scrollToSection('features')} className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
            View Core Metrics
          </button>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 border-t border-slate-200 dark:border-slate-900 bg-slate-100/50 dark:bg-slate-950/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Engineered for Technical Ecosystems</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-4">Modular processing layers built to handle standard web actions natively.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Zap className="text-amber-500" />, title: "Real-time Synchronization", desc: "Native state persistence powered by multi-channel streaming arrays." },
              { icon: <Cpu className="text-indigo-500" />, title: "Atomic Component Design", desc: "Rigid typography and component isolation frameworks built for flexibility." },
              { icon: <Shield className="text-emerald-500" />, title: "Secure Cryptographic Memory", desc: "Automated caching engines structured natively around browser local storage loops." }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900/60 p-8 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm backdrop-blur-sm">
                <div className="h-12 w-12 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center mb-6">{feature.icon}</div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight">Vetted by Leading Technologists</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { name: "Arsalan Raza", role: "Principal Cloud Architect", quote: "The component layouts scale perfectly without hydration gaps. The atomic documentation structure is incredibly well put together." },
            { name: "Zainab Malik", role: "Lead Systems Engineer", quote: "The implementation of the WebSocket pipeline handles complex state changes seamlessly. It updates instantly without reloading." }
          ].map((t, idx) => (
            <div key={idx} className="bg-slate-100/40 dark:bg-slate-900/40 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
              <p className="italic text-slate-700 dark:text-slate-300 text-base">"{t.quote}"</p>
              <div className="mt-6 flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-4">
                <div>
                  <h4 className="font-bold text-sm">{t.name}</h4>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
                <div className="flex space-x-0.5 text-amber-500"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-950 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-slate-500">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <span className="font-semibold text-slate-800 dark:text-white">Nexe-Agent Architecture</span>
          </div>
          <div className="flex space-x-6">
            <a href="mailto:nexeagent@gmail.com" className="hover:text-indigo-500 transition">nexeagent@gmail.com</a>
            <span className="text-slate-300 dark:text-slate-800">|</span>
            <span>03222100121</span>
          </div>
          <p className="mt-4 md:mt-0 text-xs">© 2026 Nexe-Agent Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}