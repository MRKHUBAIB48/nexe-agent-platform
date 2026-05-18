import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';

export default function MultiStepForm({ addToast }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ tokenName: '', webhookUrl: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const cached = localStorage.getItem('nx_form_cache');
    if (cached) {
      try { setFormData(JSON.parse(cached)); } catch (e) { console.error(e); }
    }
  }, []);

  const updateField = (field, value) => {
    const nextState = { ...formData, [field]: value };
    setFormData(nextState);
    localStorage.setItem('nx_form_cache', JSON.stringify(nextState));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateStep = () => {
    const nextErrors = {};
    if (step === 1 && !formData.tokenName.trim()) nextErrors.tokenName = 'Token designation code identifier required.';
    if (step === 2 && !formData.webhookUrl.trim()) nextErrors.webhookUrl = 'Endpoint ingestion URL array target required.';
    
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep(s => s + 1);
  };

  const handleSubmit = () => {
    if (!validateStep()) return;
    addToast("Cluster Pipeline Config Matched & Deployed Successfully.", "success");
    localStorage.removeItem('nx_form_cache');
    setFormData({ tokenName: '', webhookUrl: '' });
    setStep(1);
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-8">
      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 dark:bg-slate-800 -translate-y-1/2 -z-10" />
        {[1, 2, 3].map((s) => (
          <div key={s} className={`h-8 w-8 rounded-full font-bold text-xs flex items-center justify-center transition-all ${step >= s ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' : 'bg-slate-100 text-slate-400 dark:bg-slate-800'}`}>
            {step > s ? <Check size={14} /> : s}
          </div>
        ))}
      </div>

      <div className="min-h-[180px]">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} key="step1" className="space-y-4">
              <div><h3 className="text-base font-bold">Node Identification Setup</h3><p className="text-xs text-slate-400 mt-0.5">Assign cluster identities mapping variables directly to infrastructure matrices.</p></div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Cluster Token Tokenizer Name</label>
                <input type="text" placeholder="e.g., Core Ingest Loop Alpha" value={formData.tokenName} onChange={e => updateField('tokenName', e.target.value)} className="w-full text-sm px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 font-medium text-slate-900 dark:text-white" />
                {errors.tokenName && <p className="text-[11px] text-rose-500 font-medium">{errors.tokenName}</p>}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} key="step2" className="space-y-4">
              <div><h3 className="text-base font-bold">Telemetry Stream Targets</h3><p className="text-xs text-slate-400 mt-0.5">Target ingestion routers routing live socket packet sequences natively.</p></div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Webhook Ingestion Endpoint Target URL</label>
                <input type="url" placeholder="https://api.nexeagent.internal/v1/stream" value={formData.webhookUrl} onChange={e => updateField('webhookUrl', e.target.value)} className="w-full text-sm px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 font-medium text-slate-900 dark:text-white" />
                {errors.webhookUrl && <p className="text-[11px] text-rose-500 font-medium">{errors.webhookUrl}</p>}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} key="step3" className="space-y-4">
              <div><h3 className="text-base font-bold">Review Pipeline Directives</h3><p className="text-xs text-slate-400 mt-0.5">Validate configuration parameters prior to full node matrix compilation.</p></div>
              <div className="p-4 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-100 dark:border-slate-800/80 font-mono text-xs space-y-1 text-slate-600 dark:text-slate-400">
                <p><span className="text-slate-400 font-sans">Token Name:</span> {formData.tokenName}</p>
                <p><span className="text-slate-400 font-sans">Ingest Router Target:</span> {formData.webhookUrl}</p>
                <p><span className="text-slate-400 font-sans">Persistence State:</span> Cached/Valid</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex justify-between items-center mt-8 pt-4 border-t border-slate-100 dark:border-slate-800">
        <button disabled={step === 1} onClick={() => setStep(s => s - 1)} className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 font-medium text-xs flex items-center space-x-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition disabled:opacity-30">
          <ArrowLeft size={14} /> <span>Previous</span>
        </button>
        {step < 3 ? (
          <button onClick={handleNext} className="px-5 py-2.5 bg-slate-950 text-white dark:bg-white dark:text-slate-950 rounded-xl font-medium text-xs flex items-center space-x-1.5 hover:opacity-90 transition">
            <span>Continue Journey</span> <ArrowRight size={14} />
          </button>
        ) : (
          <button onClick={handleSubmit} className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold text-xs flex items-center space-x-1.5 hover:bg-indigo-700 transition shadow-md shadow-indigo-500/10">
            <span>Compile & Build Node</span> <Check size={14} />
          </button>
        )}
      </div>
    </div>
  );
}