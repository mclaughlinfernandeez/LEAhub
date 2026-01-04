
import React from 'react';
import { AppView } from '../types';
import { 
  FileText, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  ArrowRight,
  Scale
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (view: AppView) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const stats = [
    { label: 'Active 504 Plans', value: '142', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Pending Screenings', value: '18', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Active Legal Claims', value: '12', icon: Scale, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Compliance Rate', value: '98.4%', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  const recentActivity = [
    { action: '504 Plan Approved', student: 'John Smith', time: '2 hours ago', status: 'success' },
    { action: 'Diagnostic Screener Completed', student: 'Jane Doe', time: '5 hours ago', status: 'info' },
    { action: 'SSI Appeal Brief Generated', student: 'Self', time: '1 day ago', status: 'warning' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Welcome Section */}
      <section className="bg-indigo-700 rounded-2xl p-8 text-white relative overflow-hidden shadow-lg shadow-indigo-200">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">Welcome Back, Advocate</h2>
          <p className="text-indigo-100 max-w-xl">
            Streamline your 504 plan management and legal case building. All data is protected 
            under HIPAA and GINA compliance protocols.
          </p>
          <div className="mt-6 flex space-x-4">
            <button 
              onClick={() => onNavigate(AppView.LEGAL_CHAT)}
              className="bg-white text-indigo-700 px-6 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition-colors flex items-center"
            >
              Start Legal Chat <ArrowRight size={18} className="ml-2" />
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-full opacity-10 flex items-center justify-center">
          <Scale size={200} />
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-stats-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon size={24} />
            </div>
            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Recent Activity</h3>
            <button className="text-indigo-600 text-sm font-medium hover:underline">View All</button>
          </div>
          <div className="divide-y divide-slate-100">
            {recentActivity.map((activity, i) => (
              <div key={i} className="p-6 flex items-center hover:bg-slate-50 transition-colors">
                <div className={`w-2 h-2 rounded-full mr-4 ${
                  activity.status === 'success' ? 'bg-emerald-500' : 
                  activity.status === 'info' ? 'bg-blue-500' : 'bg-amber-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-800">{activity.action}</p>
                  <p className="text-xs text-slate-500">Student: {activity.student}</p>
                </div>
                <span className="text-xs text-slate-400 font-medium">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Alerts */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h3 className="font-bold text-slate-800">Compliance Alerts</h3>
          <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex space-x-3">
            <AlertTriangle className="text-red-600 shrink-0" size={20} />
            <div>
              <p className="text-sm font-bold text-red-800">Review Required</p>
              <p className="text-xs text-red-700 mt-1">
                3 plans expire within 30 days. Procedural safeguards must be initiated.
              </p>
            </div>
          </div>
          <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex space-x-3">
            <AlertTriangle className="text-amber-600 shrink-0" size={20} />
            <div>
              <p className="text-sm font-bold text-amber-800">SSI Appeal Deadline</p>
              <p className="text-xs text-amber-700 mt-1">
                Response due for Case 25-1224 in 48 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
