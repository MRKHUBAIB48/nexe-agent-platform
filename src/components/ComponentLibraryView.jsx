import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Terminal, Play, HelpCircle, ChevronDown } from 'lucide-react';

export default function ComponentLibraryView({ addToast }) {
  const [activeTab, setActiveTab] = useState('interactive');
  const [modalOpen, setModalOpen] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex border-b border-slate-200 dark:border-slate-800 items-center justify-between">
        <div className="flex space-x-6 text-sm font-medium">
          <button onClick={() => setActiveTab('interactive')} className={`pb-3 ${activeTab === 'interactive' ? 'border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'text-slate-400 hover:text-slate-200'}`}>Interactive Test Bench</button>
          <button onClick={() => setActiveTab('docs')} className={`pb-3 ${activeTab === 'docs' ? 'border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'text-slate-400 hover:text-slate-200'}`}>System Documentation</button>
        </div>
      </div>

      {activeTab === 'interactive' ? (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5"><Layers size={12}/> <span>Button Tokens</span></h4>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => addToast("Primary Action Triggered", "success")} className="px-4 py-2 bg-indigo-600 text-white font-medium text-xs rounded-lg hover:bg-indigo-700 transition shadow-sm">Primary</button>
              <button onClick={() => addToast("Secondary Vector Active", "info")} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition">Secondary</button>
              <button onClick={() => addToast("Destructive Event Isolated", "error")} className="px-4 py-2 bg-rose-600 text-white font-medium text-xs rounded-lg hover:bg-rose-700 transition">Destructive</button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5"><Terminal size={12}/> <span>Text Ingest Inputs</span></h4>
            <div className="relative">
              <input type="text" placeholder="Isolated alphanumeric code string input..." className="w-full text-xs px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:border-indigo-500 font-medium text-slate-900 dark:text-white" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5"><Play size={12}/> <span>Animated Overlay (Modal)</span></h4>
            <button onClick={() => setModalOpen(true)} className="px-4 py-2.5 border border-slate-200 dark:border-slate-800 text-xs font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition text-slate-700 dark:text-slate-300">Mount Modal Node</button>
            
            <AnimatePresence>
              {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModalOpen(false)} className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" />
                  <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl max-w-sm w-full relative z-10 shadow-2xl text-slate-900 dark:text-white">
                    <h3 className="font-bold text-base">Modal Portal Overlay mounted</h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">Framer Motion physics loop running smoothly. Tap escape overlay border or button node below to unmount tracking matrix frames safely.</p>
                    <button onClick={() => setModalOpen(false)} className="w-full mt-6 py-2 bg-indigo-600 text-white font-medium text-xs rounded-xl hover:bg-indigo-700 transition">Unmount Frame</button>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5"><HelpCircle size={12}/> <span>Physics Accordion Array</span></h4>
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              <button onClick={() => setAccordionOpen(!accordionOpen)} className="w-full px-4 py-3 flex items-center justify-between text-xs font-semibold bg-slate-50 dark:bg-slate-950 transition text-slate-700 dark:text-slate-300">
                <span>Core Framework Dependency Logic</span>
                <ChevronDown size={14} className={`transform transition-transform duration-200 ${accordionOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence initial={false}>
                {accordionOpen && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-white dark:bg-slate-900/40">
                    <p className="p-4 text-xs text-slate-400 leading-relaxed border-t border-slate-200 dark:border-slate-800">
                      Natively optimized utilizing layout-id projection properties to eliminate viewport stutter during render sequences.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 space-y-6">
          <div><h2 className="text-xl font-bold tracking-tight">System Specification Manifest</h2><p className="text-xs text-slate-400 mt-1">Technical matrix detailing atomic token parameters and structural specifications.</p></div>
          <div className="space-y-4 text-xs text-slate-600 dark:text-slate-400">
            <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl">
              <h5 className="font-bold text-slate-900 dark:text-white mb-1">🚀 Atomic Button Layout Core Tokens</h5>
              <code className="text-[11px] text-indigo-500 font-mono">className="px-4 py-2 bg-indigo-600 font-medium text-xs rounded-lg shadow-sm"</code>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl">
              <h5 className="font-bold text-slate-900 dark:text-white mb-1">📡 Ingest Input Logic Variables</h5>
              <code className="text-[11px] text-indigo-500 font-mono">className="w-full text-xs bg-slate-50 border border-slate-200 focus:border-indigo-500"</code>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}