import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Users, Box, HardDrive, Cpu, ChevronLeft, ChevronRight } from 'lucide-react';

const mockTableData = Array.from({ length: 24 }, (_, i) => ({
  id: `TX-89${100 + i}`,
  target: `IngestCluster_${String.fromCharCode(65 + (i % 4))}`,
  status: i % 5 === 0 ? 'Degraded' : 'Operational',
  throughput: `${(94.2 + (i * 0.23)).toFixed(1)} Mb/s`,
  updated: `${4 + i} mins ago`
}));

export default function AnalyticsView() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(mockTableData.length / itemsPerPage);

  const paginatedData = mockTableData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Nodes", val: "3,891", change: "+12.3%", up: true, icon: <Users size={16} className="text-indigo-500" /> },
          { label: "Memory Ingest", val: "14.2 TB", change: "+4.1%", up: true, icon: <Box size={16} className="text-emerald-500" /> },
          { label: "Network Draw", val: "89.4 Gb/s", change: "-1.8%", up: false, icon: <HardDrive size={16} className="text-rose-500" /> },
          { label: "CPU Saturation", val: "42.11%", change: "+0.4%", up: true, icon: <Cpu size={16} className="text-amber-500" /> }
        ].map((card, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-center text-slate-400 text-xs font-semibold uppercase tracking-wider">
              <span>{card.label}</span> {card.icon}
            </div>
            <div className="text-2xl font-bold tracking-tight mt-2 text-slate-900 dark:text-white">{card.val}</div>
            <div className={`text-xs font-medium flex items-center mt-1 ${card.up ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
              {card.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} <span>{card.change} vs baseline</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold tracking-tight text-slate-400 uppercase mb-4">Pipeline Cluster Throughput Vector</h3>
        <div className="w-full h-48 bg-slate-50 dark:bg-slate-950/60 rounded-xl relative overflow-hidden flex items-end px-2 pt-6">
          <svg className="w-full h-full" viewBox="0 0 600 120" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2"/>
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <path d="M0,90 Q50,30 100,70 T200,40 T300,80 T400,20 T500,60 T600,10 L600,120 L0,120 Z" fill="url(#chartGrad)" />
            <path d="M0,90 Q50,30 100,70 T200,40 T300,80 T400,20 T500,60 T600,10" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800"><h3 className="font-bold text-sm">Cluster Status Node Array</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-950/50 text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider">
                <th className="px-6 py-3.5">Deployment ID</th>
                <th className="px-6 py-3.5">Target Cluster</th>
                <th className="px-6 py-3.5">Operational Status</th>
                <th className="px-6 py-3.5">Telemetry Rate</th>
                <th className="px-6 py-3.5">Last Sync Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60">
              {paginatedData.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">{row.id}</td>
                  <td className="px-6 py-4 font-medium">{row.target}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full font-medium text-[10px] ${row.status === 'Operational' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400' : 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400'}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono">{row.throughput}</td>
                  <td className="px-6 py-4 text-slate-400">{row.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, mockTableData.length)} of {mockTableData.length} entries</span>
          <div className="flex items-center space-x-2">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40"><ChevronLeft size={14} /></button>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40"><ChevronRight size={14} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}