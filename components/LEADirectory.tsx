
import React from 'react';
import { Search, MapPin, Phone, Globe, Shield, Activity, ChevronRight } from 'lucide-react';

const LEADirectory: React.FC = () => {
  const leas = [
    { name: 'District 01 - Metro Public Schools', jurisdiction: 'State Central', compliance: '98%', status: 'Active' },
    { name: 'West Valley Unified', jurisdiction: 'Region 4', compliance: '92%', status: 'Review' },
    { name: 'Summit County LEA', jurisdiction: 'Northern', compliance: '100%', status: 'Active' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800">LEA Directory</h2>
          <p className="text-slate-500 font-medium">Map student needs to Local Education Agency jurisdictions.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input type="text" placeholder="Search LEAs by name or zip..." className="pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl w-full md:w-80 shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none font-bold" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leas.map((lea, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                <Activity size={28} />
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded ${lea.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                {lea.status}
              </span>
            </div>
            <h4 className="font-black text-lg text-slate-800 mb-2">{lea.name}</h4>
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-xs text-slate-500"><MapPin size={14} className="mr-2" /> {lea.jurisdiction}</div>
              <div className="flex items-center text-xs text-slate-500"><Shield size={14} className="mr-2" /> {lea.compliance} Compliance Rate</div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-2 bg-slate-50 rounded-xl text-xs font-bold hover:bg-indigo-50 hover:text-indigo-600 transition-all">Contacts</button>
              <button className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LEADirectory;
