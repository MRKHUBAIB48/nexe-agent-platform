import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layers, LayoutDashboard, FileText, Component, Radio, Sun, Moon, 
  Menu, X, CheckCircle, ChevronRight, HelpCircle, Bell, ArrowRight, User
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

// --- MOCK DATA FOR INTERMEDIATE DASHBOARD ---
const chartData = [
  { name: 'Jan', Analytics: 4000, Agents: 2400 },
  { name: 'Feb', Analytics: 3000, Agents: 1398 },
  { name: 'Mar', Analytics: 2000, Agents: 9800 },
  { name: 'Apr', Analytics: 2780, Agents: 3908 },
  { name: 'May', Analytics: 1890, Agents: 4800 },
  { name: 'Jun', Analytics: 2390, Agents: 3800 },
];

const tableData = [
  { id: 'NX-001', workspace: 'Alpha Core', status: 'Active', load: '42%' },
  { id: 'NX-002', workspace: 'Beta Neural', status: 'Idle', load: '12%' },
  { id: 'NX-003', workspace: 'Khubaib Custom LLM', status: 'Active', load: '89%' },
  { id: 'NX-004', workspace: 'Delta Search', status: 'Offline', load: '0%' },
  { id: 'NX-005', workspace: 'Epsilon Vision', status: 'Active', load: '61%' },
  { id: 'NX-006', workspace: 'Zeta Agent Pool', status: 'Active', load: '34%' },
];

export default function App() {
  const [currentTab, setCurrentTab] = useState('landing');
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Neural Gateway initialization complete.', time: 'Just now' }
  ]);

  // Sync dark mode class with DOM element
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  // --- REAL-TIME UI EFFECT (ADVANCED TASK 2) ---
  useEffect(() => {
    const interval = setInterval(() => {
      const mockAlerts = [
        'Incoming webhook synchronized successfully.',
        'High execution efficiency detected in Agent Node 3.',
        'API quota refreshing standard parameters.',
        'Khubaib Node completed a deep-learning synthesis step.'
      ];
      const randomAlert = mockAlerts[Math.floor(Math.random() * mockAlerts.length)];
      setNotifications(prev => [
        { id: Date.now(), message: randomAlert, time: 'Live' },
        ...prev.slice(0, 4)
      ]);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen font-sans transition-colors duration-200 bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      
      {/* GLOBAL WORKSPACE HEADER */}
      <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo & Toggle Mobile Menu Button */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="p-2 -ml-2 rounded-lg md:hidden text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-indigo-600 dark:text-indigo-400">
              <Layers className="h-6 w-6" />
              <span>Nexe-Agent Task Suite</span>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-lg text-sm font-medium">
            <button onClick={() => setCurrentTab('landing')} className={`px-3 py-1.5 rounded-md transition-all ${currentTab === 'landing' ? 'bg-white dark:bg-slate-800 shadow-sm text-indigo-500' : 'text-slate-600 dark:text-slate-400'}`}>Landing Page</button>
            <button onClick={() => setCurrentTab('dashboard')} className={`px-3 py-1.5 rounded-md transition-all ${currentTab === 'dashboard' ? 'bg-white dark:bg-slate-800 shadow-sm text-indigo-500' : 'text-slate-600 dark:text-slate-400'}`}>Admin Dashboard</button>
            <button onClick={() => setCurrentTab('form')} className={`px-3 py-1.5 rounded-md transition-all ${currentTab === 'form' ? 'bg-white dark:bg-slate-800 shadow-sm text-indigo-500' : 'text-slate-600 dark:text-slate-400'}`}>Multi-Step Form</button>
            <button onClick={() => setCurrentTab('library')} className={`px-3 py-1.5 rounded-md transition-all ${currentTab === 'library' ? 'bg-white dark:bg-slate-800 shadow-sm text-indigo-500' : 'text-slate-600 dark:text-slate-400'}`}>UI Library</button>
            <button onClick={() => setCurrentTab('realtime')} className={`px-3 py-1.5 rounded-md transition-all ${currentTab === 'realtime' ? 'bg-white dark:bg-slate-800 shadow-sm text-indigo-500' : 'text-slate-600 dark:text-slate-400'} flex items-center gap-1`}>
              <Radio className="h-3 w-3 text-emerald-500 animate-pulse" /> Live Feed
            </button>
          </nav>

          {/* User Controls and Utilities */}
          <div className="flex items-center gap-4">
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:opacity-80">
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <div className="flex items-center gap-2 text-xs font-medium border-l border-slate-200 dark:border-slate-800 pl-4">
              <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">A</div>
              <div className="hidden sm:block">
                <p className="dark:text-slate-200 font-semibold">Khubaib Amjad</p>
                <p className="text-slate-400 text-[10px]">Frontend Intern</p>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Mobile Dropdown Drawer Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }} 
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 space-y-1 shadow-inner overflow-hidden"
            >
              {[
                { id: 'landing', label: 'Landing Page' },
                { id: 'dashboard', label: 'Admin Dashboard' },
                { id: 'form', label: 'Multi-Step Form' },
                { id: 'library', label: 'UI Component Library' },
                { id: 'realtime', label: 'Live Data Feed', icon: true }
              ].map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => {
                    setCurrentTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between transition-colors ${
                    currentTab === tab.id 
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400' 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.icon && <Radio className="h-3 w-3 text-emerald-500 animate-pulse" />}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* RENDER ACTIVE TASKS SECTION */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div key={currentTab} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.25 }}>
            {currentTab === 'landing' && <LandingPageView />}
            {currentTab === 'dashboard' && <AdminDashboardView notifications={notifications} />}
            {currentTab === 'form' && <MultiStepFormView />}
            {currentTab === 'library' && <ComponentLibraryView />}
            {currentTab === 'realtime' && <RealTimeUiView notifications={notifications} />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

// ==========================================
// 1. BEGINNER: RESPONSIVE LANDING PAGE & ANIMATED MODAL
// ==========================================
function LandingPageView() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);

  return (
    <div className="space-y-20 pb-12">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-6 pt-6">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-400">
          Next-Generation AI Workspace Environments
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Optimize, configure, and monitor distributed localized autonomous software models directly inside an immutable web terminal shell framework.
        </p>
        <div className="flex justify-center gap-4">
          <button onClick={() => setIsOpen(true)} className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition shadow-lg shadow-indigo-600/20">
            Launch Agent Modal
          </button>
          <a href="#features" className="px-6 py-3 rounded-lg border border-slate-200 dark:border-slate-800 font-medium hover:bg-slate-100 dark:hover:bg-slate-900 transition">
            Explore Features
          </a>
        </div>
      </div>

      {/* Features Grid */}
      <div id="features" className="scroll-mt-24 space-y-8">
        <h2 className="text-2xl font-bold text-center">Core Platform Superpowers</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {['Asynchronous Pipelines', 'Localized Hot Reload', 'Framer Animation Engine'].map((feature, idx) => (
            <div key={idx} className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 space-y-3">
              <div className="h-10 w-10 rounded-lg bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">{idx + 1}</div>
              <h3 className="font-semibold text-lg">{feature}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Fulfill operational targets through atomic components structured dynamically within standard web configurations.</p>
            </div>
          ))}
        </div>
      </div>

      {/* Accordion Component List (Framer Motion) */}
      <div className="max-w-2xl mx-auto space-y-4">
        <h3 className="text-xl font-bold text-center">Frequently Asked Inquiries</h3>
        {[
          { q: 'Is progress preserved automatically?', a: 'Yes. The configuration framework stores form tracking datasets automatically inside localized storage.' },
          { q: 'How does real-time streaming handle latency?', a: 'Utilizing non-blocking state loops to inject updates securely into modular layouts.' }
        ].map((item, i) => (
          <div key={i} className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
            <button onClick={() => setActiveAccordion(activeAccordion === i ? null : i)} className="w-full p-4 text-left bg-slate-100 dark:bg-slate-900 flex justify-between font-medium">
              <span>{item.q}</span>
              <span>{activeAccordion === i ? '-' : '+'}</span>
            </button>
            <AnimatePresence>
              {activeAccordion === i && (
                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-white dark:bg-slate-950">
                  <p className="p-4 text-sm text-slate-500 dark:text-slate-400">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Testimonials */}
      <div className="bg-slate-100 dark:bg-slate-900 p-8 rounded-2xl text-center max-w-4xl mx-auto">
        <p className="text-lg italic text-slate-700 dark:text-slate-300">
          "The modular interface structures implemented inside Nexe-Agent allowed our systems development groups to verify and scale interface performance cleanly across layout layers."
        </p>
        <h4 className="mt-4 font-bold text-indigo-500">Khubaib Amjad</h4>
        <p className="text-xs text-slate-400">Platform Infrastructure Contributor</p>
      </div>

      {/* Modal Element */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-white dark:bg-slate-900 p-6 rounded-xl shadow-2xl max-w-md w-full border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="text-lg font-bold">Interactive Modal System</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia alias laudantium nihil et possimus error consectetur distinctio nam. At animi expedita deleniti illo odit voluptate nemo, in qui voluptatem doloribus adipisci nihil voluptatibus dolorum quibusdam quaerat ut assumenda recusandae quia?</p>
              <button onClick={() => setIsOpen(false)} className="w-full py-2 bg-slate-200 dark:bg-slate-800 rounded-lg text-sm font-medium hover:opacity-80 transition">Acknowledge</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="text-center text-xs text-slate-400 border-t border-slate-200 dark:border-slate-800 pt-6">
        © 2026 Nexe-Agent Workspaces. Built with React and Tailwind CSS.
      </footer>
    </div>
  );
}

// ==========================================
// 2. INTERMEDIATE: ADMIN DASHBOARD UI
// ==========================================
function AdminDashboardView({ notifications }) {
  const [page, setPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const currentTableData = tableData.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">System Status Control Room</h2>
          <p className="text-xs text-slate-400">Monitoring computational metrics across deployment pools.</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <h3 className="text-sm font-semibold mb-4 text-slate-400">Execution Velocity (LineChart)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Analytics" stroke="#6366f1" strokeWidth={2} />
                <Line type="monotone" dataKey="Agents" stroke="#a855f7" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <h3 className="text-sm font-semibold mb-4 text-slate-400">Node Load Balancer (BarChart)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip />
                <Bar dataKey="Agents" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Table with Pagination */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
        <h3 className="text-sm font-semibold mb-3 text-slate-400">Workspace Execution Clusters</h3>
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-medium">
              <th className="p-3">Cluster ID</th>
              <th className="p-3">Label Designation</th>
              <th className="p-3">Status Matrix</th>
              <th className="p-3">Overload Rate</th>
            </tr>
          </thead>
          <tbody>
            {currentTableData.map((row, i) => (
              <tr key={i} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                <td className="p-3 font-mono text-xs text-indigo-400">{row.id}</td>
                <td className="p-3 font-medium">{row.workspace}</td>
                <td className="p-3"><span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${row.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : row.status === 'Idle' ? 'bg-amber-500/10 text-amber-400' : 'bg-rose-500/10 text-rose-400'}`}>{row.status}</span></td>
                <td className="p-3 font-mono">{row.load}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4 pt-2">
          <span className="text-xs text-slate-400">Page {page + 1} of {totalPages}</span>
          <div className="flex gap-2">
            <button disabled={page === 0} onClick={() => setPage(p => p - 1)} className="px-3 py-1 rounded bg-slate-100 dark:bg-slate-800 text-xs font-medium disabled:opacity-40">Previous</button>
            <button disabled={page === totalPages - 1} onClick={() => setPage(p => p + 1)} className="px-3 py-1 rounded bg-slate-100 dark:bg-slate-800 text-xs font-medium disabled:opacity-40">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. INTERMEDIATE: MULTI-STEP FORM (LOCAL STORAGE)
// ==========================================
function MultiStepFormView() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('nexe_form_progress');
    return saved ? JSON.parse(saved) : { devName: 'Khubaib Amjad', role: 'Frontend Support', clusterKey: '', ack: false };
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    localStorage.setItem('nexe_form_progress', JSON.stringify(formData));
  }, [formData]);

  const validateStep = () => {
    let currentErrors = {};
    if (step === 1 && !formData.devName.trim()) currentErrors.devName = 'Developer moniker cannot be verified as clear.';
    if (step === 2 && !formData.clusterKey.trim()) currentErrors.clusterKey = 'A valid access token string hash configuration is required.';
    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep(s => s + 1);
  };

  return (
    <div className="max-w-xl mx-auto p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-6">
      {/* Steps Top Bar */}
      <div className="flex justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-3">
        <span className={step >= 1 ? 'text-indigo-400' : ''}>1. Profiling Matrix</span>
        <span className={step >= 2 ? 'text-indigo-400' : ''}>2. Access Crypt</span>
        <span className={step >= 3 ? 'text-indigo-400' : ''}>3. Final Submission</span>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <h3 className="font-bold text-lg">Cluster Node Allocation Identity</h3>
          <div className="space-y-1">
            <label className="text-xs text-slate-400 uppercase font-medium">Developer Verification Identity</label>
            <input type="text" className="w-full p-2.5 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500" value={formData.devName} onChange={e => setFormData({...formData, devName: e.target.value})} />
            {errors.devName && <p className="text-xs text-rose-400">{errors.devName}</p>}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h3 className="font-bold text-lg">Security Variable Layer</h3>
          <div className="space-y-1">
            <label className="text-xs text-slate-400 uppercase font-medium">Cluster Access Code Token</label>
            <input type="password" placeholder="e.g. nx_live_a982f..." className="w-full p-2.5 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500" value={formData.clusterKey} onChange={e => setFormData({...formData, clusterKey: e.target.value})} />
            {errors.clusterKey && <p className="text-xs text-rose-400">{errors.clusterKey}</p>}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4 text-center py-4">
          <CheckCircle className="h-12 w-12 text-emerald-400 mx-auto animate-bounce" />
          <h3 className="font-bold text-lg">Verification Staging Operational</h3>
          <p className="text-xs text-slate-400 px-4">All configuration tokens match baseline rules. State is cached inside storage configurations safely.</p>
          <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded text-left font-mono text-xs border border-slate-200 dark:border-slate-800">
            <p>ID: {formData.devName}</p>
            <p>Hash: Verified Secure</p>
          </div>
        </div>
      )}

      {/* Nav Buttons */}
      <div className="flex justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <button disabled={step === 1} onClick={() => setStep(s => s - 1)} className="px-4 py-2 rounded bg-slate-100 dark:bg-slate-800 text-sm font-medium disabled:opacity-40">Back</button>
        {step < 3 ? (
          <button onClick={handleNext} className="px-4 py-2 rounded bg-indigo-600 text-white text-sm font-medium">Continue</button>
        ) : (
          <button onClick={() => { localStorage.removeItem('nexe_form_progress'); alert('Workspace synced cleanly!'); setStep(1); }} className="px-4 py-2 rounded bg-emerald-600 text-white text-sm font-medium">Complete Deploy</button>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 4. ADVANCED: COMPONENT LIBRARY & DOCUMENTATION
// ==========================================
function ComponentLibraryView() {
  const [toasts, setToasts] = useState([]);

  const triggerToast = () => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, text: 'UI Component Toast validated successfully.' }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Sidebar Documentation List */}
      <div className="space-y-4 lg:col-span-1">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Library Docs Blueprint</h3>
        <div className="space-y-1 bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-mono">
          <p className="p-2 border-b border-slate-100 dark:border-slate-800 text-indigo-400 font-semibold">⚡ atomic-buttons.md</p>
          <p className="p-2 border-b border-slate-100 dark:border-slate-800">⚡ functional-toasts.md</p>
          <p className="p-2">⚡ input-matrices.md</p>
        </div>
        <div className="p-4 bg-indigo-950/20 rounded-xl border border-indigo-900/40 text-xs space-y-2">
          <p className="font-bold text-indigo-400">Atomic Component Standard Rules</p>
          <p className="text-slate-400">All blocks adhere directly to Tailwind rules to render consistently within responsive framework grids.</p>
        </div>
      </div>

      {/* Component Sandbox Canvas */}
      <div className="lg:col-span-2 space-y-6">
        <h3 className="text-xl font-bold">Workspace Component Inventory Showcase</h3>

        {/* Action Controls Group */}
        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
          <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400">Atomic Action Buttons</h4>
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 rounded bg-indigo-600 text-white font-medium text-xs shadow hover:opacity-90">Primary Button</button>
            <button className="px-4 py-2 rounded bg-slate-200 dark:bg-slate-800 font-medium text-xs hover:opacity-90">Secondary Button</button>
            <button onClick={triggerToast} className="px-4 py-2 rounded border border-indigo-500/40 text-indigo-400 font-medium text-xs hover:bg-indigo-500/10">Launch Global Toast</button>
          </div>
        </div>

        {/* Input Validation Matrix */}
        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
          <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400">Input Form Matrices</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400">Active Field Design</label>
              <input type="text" placeholder="Data string parameter..." className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded text-xs focus:outline-none focus:border-indigo-500" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400">Error State Simulation</label>
              <input type="text" value="Erroneous matrix parameter entry" readOnly className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-rose-500/60 text-rose-400 rounded text-xs focus:outline-none" />
            </div>
          </div>
        </div>

        {/* Toast Management Queue Container */}
        <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm w-full">
          <AnimatePresence>
            {toasts.map(toast => (
              <motion.div key={toast.id} initial={{ opacity: 0, x: 50, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 50, scale: 0.9 }} className="p-3 bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-semibold rounded-lg shadow-xl border border-slate-800 dark:border-slate-200 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>{toast.text}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. ADVANCED: REAL-TIME UI FEED
// ==========================================
function RealTimeUiView({ notifications }) {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="p-4 bg-slate-900 border border-slate-800 text-white rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </div>
          <div>
            <h3 className="font-mono text-sm font-bold tracking-tight">ws://nexe-agent.gateway.local:8080</h3>
            <p className="text-[10px] text-slate-400">Reactive transmission protocol link validated</p>
          </div>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase font-bold">Linked</span>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 px-1">Live Notifications Pipeline Tray</h3>
        <div className="space-y-2">
          <AnimatePresence initial={false}>
            {notifications.map(item => (
              <motion.div key={item.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="p-3.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  <span className="font-medium">{item.message}</span>
                </div>
                <span className="font-mono text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-950 px-1.5 py-0.5 rounded">{item.time}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}