
import React, { useState } from 'react';
import { PlanStatus, Plan504, Accommodation } from '../types';
import { Plus, FileText, ChevronRight, History, CheckCircle, Clock, Search, X, Trash2, Info } from 'lucide-react';

const PREDEFINED_ACCOMMODATIONS: Omit<Accommodation, 'id'>[] = [
  { category: 'Executive Function', title: 'Extended Deadlines', description: 'Additional 3-5 days for long-term project submissions.' },
  { category: 'Executive Function', title: 'Assignment Checklists', description: 'Detailed breakdown of multi-step tasks into manageable sub-tasks.' },
  { category: 'Attention', title: 'Preferential Seating', description: 'Seating away from high-traffic areas and environmental distractions.' },
  { category: 'Attention', title: 'Frequent Check-ins', description: 'Teacher verification of task understanding and focus every 15-20 minutes.' },
  { category: 'Working Memory', title: 'Written Instructions', description: 'Provision of written or digital copies of all oral instructions.' },
  { category: 'Working Memory', title: 'Note-taking Support', description: 'Access to teacher-provided guided notes or peer note-taker.' },
  { category: 'Impulse Control', title: 'Private Signal System', description: 'Non-verbal cue between student and teacher to manage impulsive behaviors.' },
  { category: 'Impulse Control', title: 'Movement Breaks', description: 'Permitted short, supervised breaks to manage restlessness.' },
  { category: 'Stress Management', title: 'Separate Testing Space', description: 'Quiet environment with minimal distractions for all summative assessments.' },
  { category: 'Stress Management', title: 'Extended Testing Time', description: '1.5x or 2x time for quizzes and exams.' },
  { category: 'Technology', title: 'Assistive Text-to-Speech', description: 'Usage of screen readers for all reading-intensive materials.' },
  { category: 'Technology', title: 'Digital Organizer', description: 'Provision and training on shared digital calendar and reminder tools.' },
];

const PlanManager: React.FC = () => {
  const [plans, setPlans] = useState<Plan504[]>([
    {
      id: '1',
      studentId: 'S-100',
      planNumber: '504-2023-001',
      status: PlanStatus.ACTIVE,
      effectiveDate: '2023-09-01',
      expirationDate: '2024-09-01',
      version: 2,
      accommodations: [
        { id: 'acc-1', category: 'Attention', title: 'Preferential Seating', description: 'Seating near the teacher.' }
      ]
    }
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAccs, setSelectedAccs] = useState<Accommodation[]>([]);
  const [customAcc, setCustomAcc] = useState({ title: '', category: 'Other' as Accommodation['category'], description: '' });

  const addPredefined = (acc: Omit<Accommodation, 'id'>) => {
    const newAcc: Accommodation = { ...acc, id: `acc-${Date.now()}-${Math.random()}` };
    setSelectedAccs(prev => [...prev, newAcc]);
  };

  const removeAcc = (id: string) => {
    setSelectedAccs(prev => prev.filter(a => a.id !== id));
  };

  const addCustom = () => {
    if (!customAcc.title || !customAcc.description) return;
    const newAcc: Accommodation = { ...customAcc, id: `custom-${Date.now()}` };
    setSelectedAccs(prev => [...prev, newAcc]);
    setCustomAcc({ title: '', category: 'Other', description: '' });
  };

  const filteredPredefined = PREDEFINED_ACCOMMODATIONS.filter(acc => 
    acc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    acc.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Section 504 Plan Inventory</h2>
          <p className="text-slate-500 font-medium">Manage student accommodations and compliance workflows.</p>
        </div>
        {!isCreating && (
          <button 
            onClick={() => setIsCreating(true)}
            className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black hover:bg-indigo-700 transition-all flex items-center shadow-lg shadow-indigo-100"
          >
            <Plus size={18} className="mr-2" /> New 504 Plan
          </button>
        )}
      </div>

      {isCreating && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
          <div className="p-8 bg-slate-900 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-black">Accommodation Builder</h3>
                <p className="text-slate-400 text-sm mt-1">Design a comprehensive support structure tailored to specific functional limitations.</p>
              </div>
              <button onClick={() => setIsCreating(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left Column: Selector */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Library Search</label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search predefined accommodations..." 
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold" 
                  />
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 h-[400px] overflow-y-auto custom-scrollbar space-y-4">
                {filteredPredefined.map((acc, i) => (
                  <button 
                    key={i}
                    onClick={() => addPredefined(acc)}
                    className="w-full text-left p-4 bg-white border border-slate-100 rounded-2xl hover:border-indigo-300 hover:shadow-md transition-all group"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[10px] font-black uppercase text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded">{acc.category}</span>
                      <Plus size={14} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                    </div>
                    <p className="font-bold text-slate-800 text-sm">{acc.title}</p>
                    <p className="text-xs text-slate-500 line-clamp-1">{acc.description}</p>
                  </button>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-100">
                <h4 className="text-sm font-black text-slate-800 mb-4">Custom Accommodation</h4>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <input 
                      type="text" 
                      placeholder="Title" 
                      value={customAcc.title}
                      onChange={(e) => setCustomAcc({...customAcc, title: e.target.value})}
                      className="flex-1 p-3 bg-slate-50 border-slate-200 rounded-xl text-sm font-bold outline-none" 
                    />
                    <select 
                      value={customAcc.category}
                      onChange={(e) => setCustomAcc({...customAcc, category: e.target.value as any})}
                      className="p-3 bg-slate-50 border-slate-200 rounded-xl text-sm font-bold outline-none"
                    >
                      <option>Executive Function</option>
                      <option>Attention</option>
                      <option>Working Memory</option>
                      <option>Impulse Control</option>
                      <option>Stress Management</option>
                      <option>Technology</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <textarea 
                    placeholder="Description of the support..." 
                    value={customAcc.description}
                    onChange={(e) => setCustomAcc({...customAcc, description: e.target.value})}
                    className="w-full p-3 bg-slate-50 border-slate-200 rounded-xl text-sm font-medium outline-none h-20 resize-none"
                  ></textarea>
                  <button 
                    onClick={addCustom}
                    className="w-full py-3 bg-slate-800 text-white rounded-xl font-black text-sm hover:bg-slate-700 transition-colors"
                  >
                    Add Custom Support
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Preview/Summary */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-black text-slate-800">Plan Preview</h4>
                <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">{selectedAccs.length} Selected</span>
              </div>

              {selectedAccs.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                  <div className="w-20 h-20 bg-slate-200 rounded-3xl flex items-center justify-center">
                    <FileText size={40} className="text-slate-400" />
                  </div>
                  <p className="font-bold text-slate-500 max-w-[200px]">Select accommodations from the library to begin building the plan.</p>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2">
                  {selectedAccs.map((acc) => (
                    <div key={acc.id} className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm group animate-in slide-in-from-right-2">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-[10px] font-black uppercase text-indigo-500 mb-1">{acc.category}</p>
                          <h5 className="font-black text-slate-800 text-sm leading-tight">{acc.title}</h5>
                        </div>
                        <button onClick={() => removeAcc(acc.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed italic border-l-2 border-indigo-100 pl-3">"{acc.description}"</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-8 space-y-4">
                <div className="p-4 bg-indigo-900 text-white rounded-2xl flex items-start space-x-3">
                  <Info size={18} className="text-indigo-300 shrink-0 mt-0.5" />
                  <p className="text-[10px] font-medium leading-relaxed opacity-80">
                    This selection is automatically cross-referenced with the Technical-Legal-Medical Evidence Matrix for GINA/HIPAA compliance before finalizing.
                  </p>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setIsCreating(false)} className="flex-1 py-4 bg-white border border-slate-200 rounded-2xl font-black text-slate-600 hover:bg-slate-50 transition-all">Cancel</button>
                  <button className="flex-[2] py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">Finalize 504 Plan</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-all group">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-5">
                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                  <FileText size={32} />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-lg">{plan.planNumber}</h4>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Student ID: {plan.studentId} • Version {plan.version}</p>
                  <div className="flex gap-1 mt-2">
                    {plan.accommodations.slice(0, 3).map((a, i) => (
                      <span key={i} className="text-[9px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-black uppercase tracking-tighter">{a.category}</span>
                    ))}
                    {plan.accommodations.length > 3 && <span className="text-[9px] text-slate-400 font-bold ml-1">+{plan.accommodations.length - 3} more</span>}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-8">
                <div className="text-right hidden lg:block">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">STATUS</p>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 uppercase tracking-tighter">
                    {plan.status}
                  </span>
                </div>
                <div className="text-right hidden lg:block">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">EXPIRATION</p>
                  <p className="text-sm font-black text-slate-700">{plan.expirationDate}</p>
                </div>
                <button className="p-3 bg-slate-50 rounded-2xl text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center space-x-6">
              <button className="flex items-center text-xs font-black text-indigo-600 hover:text-indigo-800 uppercase tracking-widest">
                <History size={14} className="mr-2" /> View History
              </button>
              <button className="flex items-center text-xs font-black text-indigo-600 hover:text-indigo-800 uppercase tracking-widest">
                <CheckCircle size={14} className="mr-2" /> Verify Compliance
              </button>
              <button className="flex items-center text-xs font-black text-indigo-600 hover:text-indigo-800 uppercase tracking-widest">
                <Clock size={14} className="mr-2" /> Procedural Timeline
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanManager;
