import React from 'react';
import { Terminal, Activity, ShieldCheck } from 'lucide-react';

export default function RealTimePanel({ events }) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-base flex items-center space-x-2">
            <Activity size={16} className="text-indigo-500 animate-pulse" />
            <span>Active WebSocket Handshake Array</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">Live data streams render seamlessly using single-instance reactive rendering without forced page resets.</p>
        </div>
        <div className="inline-flex items-center space-x-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 border border-emerald-100 dark:border-emerald-900/30 rounded-xl text-xs font-semibold">
          <ShieldCheck size={14}/> <span>Pipeline Handshake Valid</span>
        </div>
      </div>

      <div className="bg-slate-950 text-slate-100 rounded-2xl border border-slate-800 shadow-2xl p-6 font-mono text-xs overflow-hidden relative">
        <div className="absolute top-4 right-4 flex items-center space-x-1.5 text-slate-500"><Terminal size={12}/> <span className="text-[10px] uppercase font-bold tracking-wider">Live Socket Logs</span></div>
        <div className="space-y-2 max-h-[340px] overflow-y-auto pr-2">
          {events.length === 0 ? (
            <div className="text-slate-500 italic animate-pulse">Awaiting WebSocket frame events from cluster pipelines...</div>
          ) : (
            events.map((evt, index) => (
              <div key={evt.id} className={`flex items-start space-x-2 transition-all duration-300 ${index === 0 ? 'text-indigo-400 font-bold' : 'text-slate-400 opacity-70'}`}>
                <span className="text-slate-600 select-none">[{evt.timestamp}]</span>
                <span>[CLUSTER INGEST] Pipeline node response packet resolved safely: <span className="text-amber-400">"{evt.system} - {evt.action}"</span></span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}