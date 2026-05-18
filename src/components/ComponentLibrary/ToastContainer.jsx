import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, CheckCircle, AlertTriangle } from 'lucide-react';

export default function ToastContainer({ toasts }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div key={toast.id} initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="pointer-events-auto w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-xl flex items-start space-x-3 backdrop-blur-md">
            <div className="mt-0.5">
              {toast.type === 'error' ? <AlertTriangle size={16} className="text-rose-500" /> : toast.type === 'info' ? <Info size={16} className="text-indigo-500" /> : <CheckCircle size={16} className="text-emerald-500" />}
            </div>
            <div className="flex-1 text-xs font-medium text-slate-700 dark:text-slate-300 leading-relaxed">{toast.message}</div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}