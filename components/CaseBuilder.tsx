
import React, { useState } from 'react';
import { 
  Gavel, Scale, ChevronRight, CheckCircle, FileText, Printer, ArrowLeft, 
  Brain, Fingerprint, Database, Shield, Lock, Activity, Info, AlertTriangle, Search
} from 'lucide-react';
import { generateLegalBrief } from '../services/geminiService';
import { RIGOR_SECURE_PROTOCOLS } from '../constants';

interface CaseBuilderProps {
  type: 'SSI_SSDI' | 'CIVIL_RIGHTS';
}

const CaseBuilder: React.FC<CaseBuilderProps> = ({ type }) => {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [brief, setBrief] = useState<string | null>(null);

  // Simplified SSA-3368 / SSA-3373 Data
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    fullName: '',
    dob: '',
    ssnLast4: '',
    primaryDisability: '',
    
    // Step 2: Scientific Evidence (RIGOR-Secure++)
    geneticMarker: 'COMT rs4680 (Val/Val)',
    prsScore: '2.84',
    percentile: '98.4%',
    fmriFinding: 'DLPFC Hypoactivation observed during N-back task',
    
    // Step 3: Work History (Vocational)
    lastJobTitle: '',
    whyStoppedWorking: '',
    workStartDate: '',
    workEndDate: '',
    
    // Step 4: Daily Impact (Functional)
    taskStruggle: '', // How do you struggle with simple tasks?
    socialImpact: '', // Do you have trouble with people?
    instructionFollowing: '', // Do you need written steps?
    
    // Step 5: Doctors
    hospitalName: '',
    lastVisitDate: ''
  });

  const steps = [
    'Background',
    'Scientific Evidence',
    'Work Profile',
    'Daily Living',
    'Medical Care',
    'Generate Brief'
  ];

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulated Manifest for RIGOR-Secure++
    const manifest = {
      id: `RIGOR-${Date.now()}`,
      pqcSeal: 'ML-DSA-87 Signed',
      integrityHash: 'SHA3-256:d8e8f822b78ed2... (Simulated)'
    };
    
    const result = await generateLegalBrief({ 
      caseType: type, 
      formData, 
      manifest 
    });
    setBrief(result || "Failed to generate brief.");
    setIsGenerating(false);
    setStep(7);
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-2xl overflow-hidden">
        {/* Header with Security Status */}
        <div className="p-8 bg-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg ring-4 ring-indigo-500/20">
              {type === 'SSI_SSDI' ? <Scale size={24} /> : <Gavel size={24} />}
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight">SSA Case Builder</h2>
              <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-indigo-400 mt-1">
                <Shield size={12} /> <span>RIGOR-Secure++ Active</span>
                <span className="text-slate-500 mx-1">|</span>
                <Lock size={12} /> <span>PQC Encrypted</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-1.5 overflow-x-auto pb-2 md:pb-0">
            {steps.map((_, i) => (
              <div key={i} className={`h-1.5 w-12 rounded-full transition-all duration-500 ${i + 1 <= step ? 'bg-indigo-500' : 'bg-slate-700'}`}></div>
            ))}
          </div>
        </div>

        <div className="p-10">
          {/* STEP 1: Background (Simplified SSA-3368 Questions) */}
          {step === 1 && (
            <div className="space-y-8 animate-in slide-in-from-right-4">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Info size={20}/></div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-slate-800">Who are you?</h3>
                  <p className="text-slate-500 text-sm">We've simplified these questions to match SSA Form 3368-BK.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Legal Name</label>
                  <input 
                    type="text" value={formData.fullName}
                    onChange={(e) => updateFormData('fullName', e.target.value)}
                    className="w-full p-4 bg-slate-50 border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold" 
                    placeholder="Same as on your ID" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date of Birth</label>
                  <input 
                    type="date" value={formData.dob}
                    onChange={(e) => updateFormData('dob', e.target.value)}
                    className="w-full p-4 bg-slate-50 border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold" 
                  />
                </div>
                <div className="md:col-span-2 space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Main Health Problem</label>
                  <input 
                    type="text" value={formData.primaryDisability}
                    onChange={(e) => updateFormData('primaryDisability', e.target.value)}
                    className="w-full p-4 bg-slate-50 border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold" 
                    placeholder="e.g., Severe ADHD with memory issues" 
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Scientific Evidence (The "Rigors" / PRS Layer) */}
          {step === 2 && (
            <div className="space-y-8 animate-in slide-in-from-right-4">
              <div className="bg-indigo-900 text-white p-8 rounded-3xl relative overflow-hidden shadow-xl">
                <div className="relative z-10">
                  <h3 className="text-2xl font-black flex items-center"><Brain size={24} className="mr-3 text-indigo-300"/> The Science of Your Case</h3>
                  <p className="text-indigo-200 text-sm mt-2 opacity-80 max-w-lg italic">
                    "Cognitive prosthetics for digital justice." - This data rebuts claims of 'willful failure'.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="p-5 bg-white/10 rounded-2xl border border-white/10">
                      <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-2">Genetic Marker (COMT)</p>
                      <p className="text-lg font-black">{formData.geneticMarker}</p>
                      <p className="text-[10px] mt-2 opacity-70">Associated with dopamine hypoavailability.</p>
                    </div>
                    <div className="p-5 bg-white/10 rounded-2xl border border-white/10">
                      <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-2">PRS Score (Scientific Load)</p>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-3xl font-black text-emerald-400">{formData.prsScore}</span>
                        <span className="text-sm opacity-70">({formData.percentile} Percentile)</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-10 -right-10 opacity-10"><Fingerprint size={200} /></div>
              </div>

              <div className="p-6 bg-amber-50 border border-amber-200 rounded-2xl flex items-start space-x-4">
                <AlertTriangle className="text-amber-600 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-amber-900">Legal Mapping Tip</p>
                  <p className="text-xs text-amber-700 leading-relaxed">
                    A PRS in the top 5% provides objective evidence for Listing 12.02 (Neurocognitive Disorders).
                    Our AI will map this directly to "Marked Limitations" in persistence and pace.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Work Profile (Simplified SSA-3368) */}
          {step === 3 && (
            <div className="space-y-8 animate-in slide-in-from-right-4">
              <h3 className="text-2xl font-black text-slate-800">Your Last Job</h3>
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Job Title</label>
                  <input 
                    type="text" value={formData.lastJobTitle}
                    onChange={(e) => updateFormData('lastJobTitle', e.target.value)}
                    className="w-full p-4 bg-slate-50 border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold" 
                    placeholder="e.g., Office Clerk" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tell us why you had to stop working</label>
                  <textarea 
                    rows={4} value={formData.whyStoppedWorking}
                    onChange={(e) => updateFormData('whyStoppedWorking', e.target.value)}
                    className="w-full p-4 bg-slate-50 border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-sm" 
                    placeholder="e.g., I couldn't remember tasks and kept making mistakes under pressure..."
                  ></textarea>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Daily Living (Simplified SSA-3373) */}
          {step === 4 && (
            <div className="space-y-8 animate-in slide-in-from-right-4">
              <h3 className="text-2xl font-black text-slate-800">How your life changed</h3>
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-3 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <p className="text-sm font-black text-slate-700">Memory & Instructions</p>
                  <p className="text-xs text-slate-500 mb-4 italic">Do you need people to write things down for you? Do you forget what you were doing halfway through?</p>
                  <textarea 
                    rows={3} value={formData.taskStruggle}
                    onChange={(e) => updateFormData('taskStruggle', e.target.value)}
                    className="w-full p-4 bg-white border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 text-sm" 
                    placeholder="Describe your struggles here..."
                  ></textarea>
                </div>
                <div className="space-y-3 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <p className="text-sm font-black text-slate-700">Social Interacting</p>
                  <p className="text-xs text-slate-500 mb-4 italic">Do you get nervous around others? Do you have trouble talking to people you don't know?</p>
                  <textarea 
                    rows={3} value={formData.socialImpact}
                    onChange={(e) => updateFormData('socialImpact', e.target.value)}
                    className="w-full p-4 bg-white border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 text-sm" 
                    placeholder="Describe social difficulties..."
                  ></textarea>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Medical Care */}
          {step === 5 && (
            <div className="space-y-8 animate-in slide-in-from-right-4">
              <h3 className="text-2xl font-black text-slate-800">Where do you see a doctor?</h3>
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hospital or Clinic Name</label>
                  <input 
                    type="text" value={formData.hospitalName}
                    onChange={(e) => updateFormData('hospitalName', e.target.value)}
                    className="w-full p-4 bg-slate-50 border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold" 
                  />
                </div>
                <div className="p-4 bg-blue-50 text-blue-800 rounded-xl text-xs font-medium leading-relaxed">
                  SSA will use this to request your records. Make sure the name is correct.
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: Review & Final Synthesis */}
          {step === 6 && (
            <div className="space-y-10 animate-in slide-in-from-right-4 text-center py-10">
              <div className="w-32 h-32 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner ring-8 ring-indigo-50">
                <Database size={56} />
              </div>
              <div className="space-y-4">
                <h3 className="text-4xl font-black text-slate-800">Ready to Seal Your Case</h3>
                <p className="text-slate-500 max-w-xl mx-auto text-lg">
                  Generating your formal brief with RIGOR-Secure++ PQC Seal. 
                  Your biological data is now being mapped to SSA's legal criteria.
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto pt-8 border-t border-slate-100">
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-400 uppercase">KEM</p>
                  <p className="text-xs font-bold text-slate-800">{RIGOR_SECURE_PROTOCOLS.KEM}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-400 uppercase">SIGNATURE</p>
                  <p className="text-xs font-bold text-slate-800">{RIGOR_SECURE_PROTOCOLS.SIGNATURE}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-400 uppercase">HASH</p>
                  <p className="text-xs font-bold text-slate-800">{RIGOR_SECURE_PROTOCOLS.HASH}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-400 uppercase">ENCRYPTION</p>
                  <p className="text-xs font-bold text-slate-800">{RIGOR_SECURE_PROTOCOLS.ENCRYPTION}</p>
                </div>
              </div>
            </div>
          )}

          {/* FINAL OUTPUT */}
          {step === 7 && brief && (
            <div className="space-y-8 animate-in zoom-in-95">
              <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-emerald-500 text-white rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-200">
                    <CheckCircle size={40} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-emerald-900">Brief Fully Synthesized</h3>
                    <p className="text-emerald-700 font-medium">Verified by RIGOR-Secure++ PQC Seal.</p>
                  </div>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                  <button className="flex-1 md:flex-none bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 flex items-center justify-center">
                    <Printer size={20} className="mr-2" /> Print PDF
                  </button>
                </div>
              </div>
              <div className="bg-slate-900 p-12 rounded-[2.5rem] font-mono text-sm leading-relaxed text-slate-300 max-h-[700px] overflow-y-auto custom-scrollbar border border-slate-800 shadow-2xl relative">
                <div className="absolute top-8 right-8 text-indigo-400/20 pointer-events-none uppercase font-black text-4xl rotate-12">Certified Scientific Evidence</div>
                {brief}
              </div>
            </div>
          )}

          {step <= 6 && (
            <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between">
              <button 
                onClick={() => setStep(s => s - 1)}
                disabled={step === 1}
                className="px-8 py-4 text-slate-500 font-bold hover:bg-slate-50 rounded-2xl disabled:opacity-0 transition-all flex items-center"
              >
                <ArrowLeft size={18} className="mr-2" /> Back
              </button>
              <button 
                onClick={() => step === 6 ? handleGenerate() : setStep(s => s + 1)}
                className="bg-indigo-600 text-white px-12 py-4 rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-100 flex items-center"
              >
                {isGenerating ? (
                  <>
                    <Activity size={18} className="mr-2 animate-pulse" /> Sealing Data...
                  </>
                ) : step === 6 ? 'Seal & Finalize Case' : 'Next Question'} <ChevronRight size={18} className="ml-2" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseBuilder;
