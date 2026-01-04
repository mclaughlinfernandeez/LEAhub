
import React, { useState } from 'react';
import { Shield, Lock, Activity, Database, FileText, Eye, EyeOff, Brain, Fingerprint } from 'lucide-react';

const MedicalVault: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'RECORDS' | 'GENETIC' | 'NEURO'>('RECORDS');
  const [showSensitive, setShowSensitive] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-indigo-600 rounded-2xl p-8 text-white flex items-center justify-between shadow-xl shadow-indigo-100">
        <div className="space-y-2">
          <h2 className="text-2xl font-black">Secure Evidence Vault</h2>
          <p className="text-indigo-100 max-w-xl text-sm opacity-90">
            Encrypted storage for high-stakes medical evidence. All genetic data is tokenized per GINA protocols.
            Compliant with NIST Kyber post-quantum standards.
          </p>
        </div>
        <button 
          onClick={() => setShowSensitive(!showSensitive)}
          className="bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition-all border border-white/20"
        >
          {showSensitive ? <EyeOff size={24} /> : <Eye size={24} />}
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-slate-100">
          <button 
            onClick={() => setActiveTab('RECORDS')}
            className={`flex-1 flex items-center justify-center space-x-2 py-4 text-sm font-bold ${activeTab === 'RECORDS' ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600' : 'text-slate-500'}`}
          >
            <FileText size={18} /> <span>Medical Records</span>
          </button>
          <button 
            onClick={() => setActiveTab('GENETIC')}
            className={`flex-1 flex items-center justify-center space-x-2 py-4 text-sm font-bold ${activeTab === 'GENETIC' ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600' : 'text-slate-500'}`}
          >
            <Fingerprint size={18} /> <span>Genetic Data</span>
          </button>
          <button 
            onClick={() => setActiveTab('NEURO')}
            className={`flex-1 flex items-center justify-center space-x-2 py-4 text-sm font-bold ${activeTab === 'NEURO' ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600' : 'text-slate-500'}`}
          >
            <Brain size={18} /> <span>Neuroimaging</span>
          </button>
        </div>

        <div className="p-8">
          {activeTab === 'RECORDS' && (
            <div className="space-y-4">
              {[
                { name: 'IEP Evaluation 2023', type: 'PDF', date: '2023-10-12', status: 'Verified' },
                { name: 'Physician Diagnostic Note', type: 'DOCX', date: '2024-01-05', status: 'Signed' }
              ].map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500"><FileText size={20} /></div>
                    <div>
                      <p className="font-bold text-slate-800">{doc.name}</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">{doc.date} • {doc.type}</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-1 rounded font-black">{doc.status}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'GENETIC' && (
            <div className="space-y-6">
              <div className="p-6 bg-slate-900 rounded-2xl text-white">
                <div className="flex items-center space-x-3 mb-4">
                  <Fingerprint className="text-indigo-400" />
                  <h4 className="font-bold">GINA Tokenized Profiles</h4>
                </div>
                {!showSensitive ? (
                  <div className="py-10 text-center border-2 border-dashed border-slate-700 rounded-xl text-slate-500 font-medium">
                    Sensitive Genetic Information Masked
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                      <p className="text-xs text-slate-400 font-bold uppercase mb-1">COMT rs4680</p>
                      <p className="text-xl font-black text-indigo-300">Val/Val</p>
                      <p className="text-xs mt-2 opacity-80 leading-relaxed">Rapid dopamine catabolism in PFC. Rebuts "willfulness" in legal brief.</p>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                      <p className="text-xs text-slate-400 font-bold uppercase mb-1">BDNF rs6265</p>
                      <p className="text-xl font-black text-indigo-300">Met/Met</p>
                      <p className="text-xs mt-2 opacity-80 leading-relaxed">Impaired activity-dependent BDNF secretion. Affects memory consolidation.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'NEURO' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-slate-200 rounded-2xl overflow-hidden group">
                  <div className="h-48 bg-slate-100 flex items-center justify-center relative overflow-hidden">
                    <Brain size={64} className="text-slate-200" />
                    <div className="absolute inset-0 bg-indigo-600/10 mix-blend-multiply"></div>
                    <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-[10px] font-black uppercase text-indigo-600">fMRI Scanning</div>
                  </div>
                  <div className="p-6">
                    <h5 className="font-bold text-slate-800 mb-2">DLPFC Activation Map</h5>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">Functional scan during n-back working memory task. Shows significant hypoactivation in BA 46/9.</p>
                    <button className="w-full py-2 border border-slate-200 rounded-lg text-xs font-bold hover:bg-slate-50">View Heatmap</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalVault;
