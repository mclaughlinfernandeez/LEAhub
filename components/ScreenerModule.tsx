
import React, { useState } from 'react';
import { ClipboardCheck, Download, AlertCircle, CheckCircle2, ChevronRight, Activity } from 'lucide-react';
import { SCREENER_QUESTIONS, SCREENER_THRESHOLDS } from '../constants';

const ScreenerModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ASRS' | 'CADI' | 'HIV'>('ASRS');
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [score, setScore] = useState<{ total: number; interpretation: string } | null>(null);

  const handleResponse = (key: string, val: number) => {
    setResponses(prev => ({ ...prev, [key]: val }));
  };

  const calculateResults = () => {
    const keys = activeTab === 'ASRS' ? SCREENER_QUESTIONS.ASRS : 
                 activeTab === 'CADI' ? SCREENER_QUESTIONS.CADI_INATTENTION : 
                 SCREENER_QUESTIONS.HIV_COGNITIVE;
    
    let total = 0;
    keys.forEach((_, i) => {
      total += responses[`${activeTab}_${i}`] || 0;
    });

    let interpretation = "";
    if (activeTab === 'ASRS') {
      if (total >= SCREENER_THRESHOLDS.ASRS.VERY_HIGH) interpretation = "Very High likelihood of adult ADHD. Documented executive dysfunction.";
      else if (total >= SCREENER_THRESHOLDS.ASRS.HIGH) interpretation = "High likelihood of ADHD. Recommended clinical evaluation.";
      else interpretation = "Low probability of ADHD based on this screen.";
    } else if (activeTab === 'HIV') {
      interpretation = total > 10 ? "Possible HAND (HIV-Associated Neurocognitive Disorder) detected. Differentiating from ADHD is critical." : "Cognitive profile appears stable.";
    } else {
      interpretation = total >= 18 ? "Meets clinical criteria for inattentive presentation. Building case for 504 accommodations." : "Sub-threshold symptoms detected.";
    }

    setScore({ total, interpretation });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-slate-100">
          {(['ASRS', 'CADI', 'HIV'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setScore(null); }}
              className={`flex-1 px-6 py-4 text-sm font-bold transition-all ${
                activeTab === tab ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {tab === 'HIV' ? 'HIV+ Aging' : tab === 'ASRS' ? 'ASRS v1.1' : 'CADI Assessment'}
            </button>
          ))}
        </div>

        <div className="p-8">
          <div className="mb-8">
            <h3 className="text-xl font-black text-slate-800">
              {activeTab === 'ASRS' && "WHO Adult ADHD Self-Report Scale"}
              {activeTab === 'CADI' && "Comprehensive Diagnostic Interview"}
              {activeTab === 'HIV' && "HIV+ Aging & Comorbidity Screener"}
            </h3>
            <p className="text-slate-500 text-sm mt-2 max-w-2xl">
              {activeTab === 'ASRS' && "The primary 6-item validated screener used by medical professionals to detect executive function deficits."}
              {activeTab === 'CADI' && "A dissertation-level assessment covering 9 symptoms of inattention required for SSI/SSDI determination."}
              {activeTab === 'HIV' && "Differentiates between HIV-Associated Neurocognitive Disorder (HAND) and ADHD comorbidity."}
            </p>
          </div>

          <div className="space-y-6">
            {(activeTab === 'ASRS' ? SCREENER_QUESTIONS.ASRS : 
              activeTab === 'CADI' ? SCREENER_QUESTIONS.CADI_INATTENTION : 
              SCREENER_QUESTIONS.HIV_COGNITIVE).map((q, i) => (
              <div key={i} className="pb-6 border-b border-slate-50 last:border-0">
                <p className="text-slate-800 font-medium mb-4">{i + 1}. {q}</p>
                <div className="flex flex-wrap gap-3">
                  {["Never", "Rarely", "Sometimes", "Often", "Very Often"].map((label, val) => (
                    <button
                      key={val}
                      onClick={() => handleResponse(`${activeTab}_${i}`, val)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        responses[`${activeTab}_${i}`] === val 
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' 
                        : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-300'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <button 
              onClick={calculateResults}
              className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-xl shadow-slate-200 flex items-center"
            >
              Calculate Scientific Findings <ChevronRight size={18} className="ml-2" />
            </button>
          </div>
        </div>
      </div>

      {score && (
        <div className="bg-indigo-900 text-white p-8 rounded-3xl shadow-2xl animate-in slide-in-from-bottom-6 duration-500">
          <div className="flex items-center space-x-3 text-indigo-300 font-black uppercase tracking-widest text-xs mb-6">
            <Activity size={16} /> <span>Diagnostic Profile Generated</span>
          </div>
          <div className="flex items-end space-x-6 mb-6">
            <div className="text-7xl font-black">{score.total}</div>
            <div className="text-indigo-400 mb-2 font-bold">Scientific Score Magnitude</div>
          </div>
          <p className="text-xl font-medium leading-relaxed mb-8 max-w-3xl">
            {score.interpretation}
          </p>
          <div className="flex gap-4">
            <button className="flex items-center space-x-2 bg-white text-indigo-900 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50">
              <Download size={18} /> <span>Generate Physician Brief</span>
            </button>
            <button className="flex items-center space-x-2 bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-600">
              <AlertCircle size={18} /> <span>Notify Legal Vault</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScreenerModule;
