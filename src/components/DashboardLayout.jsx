import React, { useState, useEffect } from 'react';
import { LayoutDashboard, FileText, Package, Radio, ArrowLeft, Sun, Moon, Menu, Bell, Circle, X } from 'lucide-react';
import AnalyticsView from './AnalyticsView';
import MultiStepForm from './MultiStepForm';
import ComponentLibraryView from './ComponentLibraryView';
import RealTimePanel from './RealTimePanel';

export default function DashboardLayout({ onExit, darkMode, setDarkMode, addToast }) {
  const [activeTab, setActiveTab] = useState('analytics');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [liveEvents, setLiveEvents] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);

  // Responsive Fix: Start with the sidebar collapsed automatically on smaller screens
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, []);

  useEffect(() => {
    const systems = ['Auth Engine', 'Database Core', 'Ingest Node', 'Pipeline-Alpha'];
    const actions = ['Cache Purged', 'Token Rotated', 'Payload Dispatched', 'Memory Collected'];
    
    const interval = setInterval(() => {
      const mockEvent = {
        id: Date.now(),
        system: systems[Math.floor(Math.random() * systems.length)],
        action: actions[Math.floor(Math.random() * actions.length)],
        timestamp: new Date().toLocaleTimeString()
      };
      setLiveEvents(prev => [mockEvent, ...prev.slice(0, 14)]);
      setUnreadCount(c => c + 1);
      addToast(`[${mockEvent.system}] ${mockEvent.action}`, 'info');
    }, 9000);

    return () => clearInterval(interval);
  }, [addToast]);

  const navItems = [
    { id: 'analytics', label: 'Admin Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'form', label: 'Multi-Step Journey', icon: <FileText size={18} /> },
    { id: 'components', label: 'Component System', icon: <Package size={18} /> },
    { id: 'realtime', label: 'Live Socket Stream', icon: <Radio size={18} /> }
  ];

  // Responsive Fix: Auto-close drawer on mobile layouts when navigating tabs
  const handleTabSelection = (tabId) => {
    setActiveTab(tabId);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden w-full relative">
      
      {/* RESPONSIVE FIX: Darkened Blur Backdrop for Mobile Overlays */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300"
        />
      )}

      {/* Sidebar Panel Drawer */}
      <aside className={`fixed inset-y-0 left-0 z-40 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 flex flex-col justify-between ${sidebarOpen ? 'w-64 transform-none' : 'w-64 -translate-x-full lg:translate-x-0 lg:w-20'}`}>
        <div>
          <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800">
            <div className={`flex items-center space-x-2 ${!sidebarOpen && 'lg:hidden'}`}>
              <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">NX</div>
              <span className="font-bold tracking-tight text-sm text-slate-900 dark:text-white">Workspace</span>
            </div>
            
            {/* Responsive Fix: Close icon replaces hamburger button when panel sits open over mobile screen formats */}
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
              {window.innerWidth < 1024 && sidebarOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
          
          <div className="p-3 space-y-1">
            {navItems.map((item) => (
              <button 
                key={item.id} 
                onClick={() => handleTabSelection(item.id)} 
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${activeTab === item.id ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'}`}
              >
                {item.icon}
                <span className={`${!sidebarOpen && 'lg:hidden'} transition-opacity`}>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-1">
          <button onClick={onExit} className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition">
            <ArrowLeft size={18} />
            <span className={`${!sidebarOpen && 'lg:hidden'}`}>Exit Workspace</span>
          </button>
        </div>
      </aside>

      {/* Main Content Workspace Layout View */}
      <div className={`flex-1 flex flex-col h-full min-w-0 transition-all duration-300 ${sidebarOpen ? 'lg:pl-64' : 'lg:pl-20'}`}>
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-6 flex items-center justify-between z-30">
          <div className="flex items-center space-x-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden text-slate-600 dark:text-slate-300">
              <Menu size={18} />
            </button>
            <h1 className="text-lg font-bold tracking-tight capitalize">{activeTab.replace('-', ' ')} Workspace</h1>
          </div>
          
          <div className="flex items-center space-x-3 relative">
            <div className="relative">
              <button onClick={() => { setShowNotificationDropdown(!showNotificationDropdown); setUnreadCount(0); }} className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 relative">
                <Bell size={18} />
                {unreadCount > 0 && <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />}
              </button>
              {showNotificationDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl py-2 z-50 max-h-96 overflow-y-auto">
                  <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                    <span className="font-bold text-xs tracking-wide uppercase text-slate-400">Live system logs</span>
                    <Circle size={8} className="fill-indigo-500 text-indigo-500 animate-ping" />
                  </div>
                  {liveEvents.length === 0 ? (
                    <div className="px-4 py-6 text-center text-xs text-slate-400">Awaiting stream handshake...</div>
                  ) : (
                    liveEvents.map((evt) => (
                      <div key={evt.id} className="px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800/30 text-xs last:border-0">
                        <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300"><span>{evt.system}</span><span className="text-[10px] opacity-60">{evt.timestamp}</span></div>
                        <p className="text-slate-500 dark:text-slate-400 mt-0.5">{evt.action}</p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-slate-50/50 dark:bg-slate-950/20">
          {activeTab === 'analytics' && <AnalyticsView />}
          {activeTab === 'form' && <MultiStepForm addToast={addToast} />}
          {activeTab === 'components' && <ComponentLibraryView addToast={addToast} />}
          {activeTab === 'realtime' && <RealTimePanel events={liveEvents} />}
        </main>
      </div>
    </div>
  );
}