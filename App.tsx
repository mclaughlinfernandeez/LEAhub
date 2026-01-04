
import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  FileText, 
  Scale, 
  Search, 
  ClipboardCheck, 
  MessageSquare, 
  Activity, 
  Users, 
  Gavel, 
  Menu, 
  X,
  Bell,
  Lock,
  ChevronRight,
  Plus,
  Map,
  Database
} from 'lucide-react';
import { AppView, PlanStatus, Student, Plan504, AuditLogEntry, AppNotification } from './types';
import Dashboard from './components/Dashboard';
import PlanManager from './components/PlanManager';
import ScreenerModule from './components/ScreenerModule';
import LegalChat from './components/LegalChat';
import CaseBuilder from './components/CaseBuilder';
import ComplianceCenter from './components/ComplianceCenter';
import ProcedureGuide from './components/ProcedureGuide';
import NotificationCenter from './components/NotificationCenter';
import MedicalVault from './components/MedicalVault';
import LEADirectory from './components/LEADirectory';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: '1',
      title: '504 Plan Expiring',
      message: 'John Smith\'s plan (504-2023-001) expires in 12 days. Review required.',
      type: 'warning',
      timestamp: '2h ago',
      isRead: false,
      linkTo: AppView.PLAN_504
    },
    {
      id: '2',
      title: 'Brief Generated',
      message: 'The SSI Appeal brief for Case 25-1224 is ready for download.',
      type: 'success',
      timestamp: '5h ago',
      isRead: false,
      linkTo: AppView.SSI_SSDI
    }
  ]);

  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const navItems = [
    { view: AppView.DASHBOARD, label: 'Dashboard', icon: Activity },
    { view: AppView.ROADMAP, label: 'Case Roadmap', icon: Map },
    { view: AppView.PLAN_504, label: '504 Plans', icon: FileText },
    { view: AppView.SCREENING, label: 'Diagnostics', icon: ClipboardCheck },
    { view: AppView.LEGAL_CHAT, label: 'Legal Advisor', icon: MessageSquare },
    { view: AppView.SSI_SSDI, label: 'SSI/SSDI Case', icon: Scale },
    { view: AppView.CIVIL_RIGHTS, label: '§ 1983 Claims', icon: Gavel },
    { view: AppView.MEDICAL_RECORDS, label: 'Evidence Vault', icon: Shield },
    { view: AppView.LEA_DIRECTORY, label: 'LEA Directory', icon: Database },
    { view: AppView.COMPLIANCE, label: 'Compliance Hub', icon: Lock },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-24'} transition-all duration-500 bg-slate-900 text-white flex flex-col z-50 border-r border-slate-800`}>
        <div className="p-8 flex items-center justify-between">
          {isSidebarOpen ? <span className="font-black text-2xl tracking-tighter">LEA<span className="text-indigo-500">HUB</span></span> : <Activity className="text-indigo-500" size={32} />}
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-800 rounded-xl transition-colors">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <nav className="flex-1 mt-4 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.view}
              onClick={() => {
                setCurrentView(item.view);
                setShowNotifications(false);
              }}
              className={`w-full flex items-center p-5 transition-all hover:bg-indigo-600/10 border-l-4 ${
                currentView === item.view ? 'bg-indigo-600/10 border-indigo-500 text-indigo-400 font-black' : 'border-transparent text-slate-400 font-bold'
              }`}
            >
              <item.icon size={22} />
              {isSidebarOpen && <span className="ml-4 text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 flex flex-col relative overflow-hidden bg-slate-50">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10 z-20 shadow-sm">
          <div className="flex items-center space-x-4">
             <h1 className="text-xl font-black text-slate-800 capitalize tracking-tight">{currentView.replace('_', ' ')}</h1>
          </div>
          <div className="flex items-center space-x-8">
            <div className="relative hidden lg:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="text" placeholder="Search statutes, cases..." className="pl-12 pr-6 py-3 bg-slate-50 border-slate-100 rounded-2xl text-sm outline-none w-80 focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all font-bold"/>
            </div>
            
            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative p-3 rounded-2xl transition-all ${showNotifications ? 'bg-indigo-50 text-indigo-600 shadow-inner' : 'text-slate-500 hover:bg-slate-100'}`}
              >
                <Bell size={22} />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 w-5 h-5 bg-red-500 text-white text-[9px] font-black rounded-full border-2 border-white flex items-center justify-center animate-bounce">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <NotificationCenter 
                  notifications={notifications}
                  onClose={() => setShowNotifications(false)}
                  onMarkRead={markAsRead}
                  onMarkAllRead={markAllRead}
                  onNavigate={setCurrentView}
                />
              )}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-10 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            {currentView === AppView.DASHBOARD && <Dashboard onNavigate={setCurrentView} />}
            {currentView === AppView.ROADMAP && <ProcedureGuide onNavigate={setCurrentView} />}
            {currentView === AppView.PLAN_504 && <PlanManager />}
            {currentView === AppView.SCREENING && <ScreenerModule />}
            {currentView === AppView.LEGAL_CHAT && <LegalChat />}
            {currentView === AppView.SSI_SSDI && <CaseBuilder type="SSI_SSDI" />}
            {currentView === AppView.CIVIL_RIGHTS && <CaseBuilder type="CIVIL_RIGHTS" />}
            {currentView === AppView.COMPLIANCE && <ComplianceCenter />}
            {currentView === AppView.MEDICAL_RECORDS && <MedicalVault />}
            {currentView === AppView.LEA_DIRECTORY && <LEADirectory />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
