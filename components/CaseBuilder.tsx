
import React, { useState } from 'react';
// Fix: Added 'Plus' to lucide-react imports
import { Gavel, Scale, ChevronRight, CheckCircle, FileText, Printer, ArrowLeft, Brain, Fingerprint, Database, Plus } from 'lucide-react';
import { generateLegalBrief } from '../services/geminiService';

interface CaseBuilderProps {
  type: 'SSI_SSDI' | 'CIVIL_RIGHTS';
}

const CaseBuilder: React.FC<CaseBuilderProps> = ({ type }) => {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [brief, setBrief] = useState<string | null>(null);

  const steps = [
    'Case Foundation',
    'Evidence Matrix',
    'Statutory Arguments',
    'Final Synthesis'
  ];

  const evidenceMatrix = [
    { finding: 'COMT Val/Val Genotype', impact: 'PFC Dopamine Hypoavailability', argument: 'Non-willful procedural failure' },
    { finding: 'DLPFC Hypoactivation', impact: 'Executive Function Paralysis', argument: 'ADA Substantial Limitation' },
    { finding: 'BDNF Met/Met Genotype', impact: 'Impaired Learning from Experience', argument: 'Need for structured support' }
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    const result = await generateLegalBrief({ type, matrix: evidenceMatrix });
    setBrief(result || "Failed to generate brief.");
    setIsGenerating(false);
    setStep(5);
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg">
              {type === 'SSI_SSDI' ? <Scale size={24} /> : <Gavel size={24} />}
            </div>
            <div>
              <h2 className="text-xl font-black">{type === 'SSI_SSDI' ? 'SSI/SSDI Case Hub' : '§ 1983 Litigation'}</h2>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Dissertation-Level Case Builder</p>
            </div>
          </div>
          <div className="flex gap-2">
            {steps.map((_, i) => (
              <div key={i} className={`h-1.5 w-10 rounded-full transition-all ${i + 1 <= step ? 'bg-indigo-500' : 'bg-slate-700'}`}></div>
            ))}
          </div>
        </div>

        <div className="p-10">
          {step === 1 && (
            <div className="space-y-8 animate-in slide-in-from-right-4">
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-800">Case Foundation</h3>
                <p className="text-slate-500 text-sm">Define the primary legal objective and factual background.</p>
              </div>
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Case Title / Reference</label>
                  <input type="text" className="w-full p-4 bg-slate-50 border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold" placeholder="e.g., ADA Title II Claim - Local District 2025" />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Statement of Facts</label>
                  <textarea rows={6} className="w-full p-4 bg-slate-50 border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-sm" placeholder="Detailed factual narrative of the incident or disability onset..."></textarea>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in slide-in-from-right-4">
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-800">Technical-Legal-Medical Evidence Matrix</h3>
                <p className="text-slate-500 text-sm">Mapping biological findings directly to legal arguments to rebut "willfulness" and establish MDI.</p>
              </div>
              <div className="space-y-4">
                {evidenceMatrix.map((item, i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-slate-50 border border-slate-100 rounded-2xl group hover:border-indigo-200 transition-all">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center">
                        {item.finding.includes('Genotype') ? <Fingerprint size={12} className="mr-1 text-indigo-500" /> : <Brain size={12} className="mr-1 text-indigo-500" />} 
                        Finding
                      </p>
                      <p className="font-bold text-slate-800">{item.finding}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Functional Impact</p>
                      <p className="font-medium text-slate-600 text-sm">{item.impact}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">Legal Argument</p>
                      <p className="font-bold text-indigo-700 text-sm">{item.argument}</p>
                    </div>
                  </div>
                ))}
                <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold hover:bg-slate-50 flex items-center justify-center">
                  <Plus size={18} className="mr-2" /> Pull from Medical Vault
                </button>
              </div>
            </div>
          )}

          {step === 5 && brief && (
            <div className="space-y-8 animate-in zoom-in-95">
              <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-3xl flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200">
                    <CheckCircle size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-emerald-900">Brief Fully Synthesized</h3>
                    <p className="text-emerald-700 font-medium">Ready for federal district court submission.</p>
                  </div>
                </div>
                <button className="bg-emerald-600 text-white px-8 py-3 rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 flex items-center">
                  <Printer size={18} className="mr-2" /> Download Brief
                </button>
              </div>
              <div className="bg-slate-900 p-10 rounded-3xl font-mono text-xs leading-relaxed text-slate-300 max-h-[600px] overflow-y-auto custom-scrollbar border border-slate-800 shadow-2xl">
                {brief}
              </div>
            </div>
          )}

          {step < 5 && (
            <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between">
              <button 
                onClick={() => setStep(s => s - 1)}
                disabled={step === 1}
                className="px-8 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-2xl disabled:opacity-0 transition-all flex items-center"
              >
                <ArrowLeft size={18} className="mr-2" /> Back
              </button>
              <button 
                onClick={() => step === 4 ? handleGenerate() : setStep(s => s + 1)}
                className="bg-indigo-600 text-white px-10 py-3 rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center"
              >
                {isGenerating ? 'Synthesizing...' : step === 4 ? 'Finalize Brief' : 'Next Phase'} <ChevronRight size={18} className="ml-2" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseBuilder;
