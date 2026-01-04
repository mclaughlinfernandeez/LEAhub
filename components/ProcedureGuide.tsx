
import React from 'react';
import { CheckCircle2, Circle, ArrowRight, ClipboardCheck, Shield, FileText, Scale, Gavel } from 'lucide-react';
import { AppView } from '../types';

interface ProcedureGuideProps {
  onNavigate: (view: AppView) => void;
}

const ProcedureGuide: React.FC<ProcedureGuideProps> = ({ onNavigate }) => {
  const steps = [
    {
      id: 1,
      title: "Diagnostic Screening",
      desc: "Complete the ASRS or CADI screeners to build clinical evidence for disability impact.",
      icon: ClipboardCheck,
      view: AppView.SCREENING,
      status: 'completed'
    },
    {
      id: 2,
      title: "Evidence Vaulting",
      desc: "Securely upload medical records and IEP/504 evaluations to the HIPAA-compliant vault.",
      icon: Shield,
      view: AppView.MEDICAL_RECORDS,
      status: 'current'
    },
    {
      id: 3,
      title: "504 Plan Drafting",
      desc: "Request reasonable accommodations and formalize support structures with the LEA.",
      icon: FileText,
      view: AppView.PLAN_504,
      status: 'pending'
    },
    {
      id: 4,
      title: "Benefit Claims",
      desc: "Prepare SSI/SSDI application briefs using the automated case builder.",
      icon: Scale,
      view: AppView.SSI_SSDI,
      status: 'pending'
    },
    {
      id: 5,
      title: "Civil Litigation",
      desc: "File § 1983 claims for constitutional violations or due process failures.",
      icon: Gavel,
      view: AppView.CIVIL_RIGHTS,
      status: 'pending'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">The Advocate's Roadmap</h2>
        <p className="text-slate-500 max-w-xl mx-auto">
          Follow this 5-step validated procedure to build a comprehensive legal and clinical case for disability rights.
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-[27px] top-0 bottom-0 w-0.5 bg-slate-200 z-0"></div>
        
        <div className="space-y-12">
          {steps.map((step, idx) => (
            <div key={step.id} className="relative z-10 flex group">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-sm ${
                step.status === 'completed' ? 'bg-emerald-100 text-emerald-600' :
                step.status === 'current' ? 'bg-indigo-600 text-white shadow-indigo-200 shadow-xl scale-110' :
                'bg-white border border-slate-200 text-slate-300'
              }`}>
                {step.status === 'completed' ? <CheckCircle2 size={24} /> : <step.icon size={24} />}
              </div>
              
              <div className="ml-8 flex-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group-hover:border-indigo-100">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg text-slate-800">Phase {step.id}: {step.title}</h3>
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded ${
                    step.status === 'completed' ? 'bg-emerald-50 text-emerald-600' :
                    step.status === 'current' ? 'bg-indigo-50 text-indigo-600' :
                    'bg-slate-50 text-slate-400'
                  }`}>
                    {step.status}
                  </span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{step.desc}</p>
                <button 
                  onClick={() => onNavigate(step.view)}
                  className="flex items-center text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  Go to Module <ArrowRight size={14} className="ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 p-8 bg-slate-900 rounded-3xl text-white text-center">
        <h3 className="text-xl font-bold mb-2">Ready to initiate your claim?</h3>
        <p className="text-slate-400 text-sm mb-6">Our Legal AI is ready to draft your first brief based on these roadmap steps.</p>
        <button 
          onClick={() => onNavigate(AppView.LEGAL_CHAT)}
          className="px-8 py-3 bg-indigo-500 rounded-xl font-bold hover:bg-indigo-400 transition-colors shadow-lg shadow-indigo-500/20"
        >
          Consult Legal AI
        </button>
      </div>
    </div>
  );
};

export default ProcedureGuide;
