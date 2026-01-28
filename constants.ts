
export const GEMINI_MODEL = 'gemini-3-flash-preview';

export const RIGOR_SECURE_PROTOCOLS = {
  KEM: 'ML-KEM-1024 (Kyber)',
  SIGNATURE: 'ML-DSA-87 (Dilithium)',
  HASH: 'SHA3-256',
  ENCRYPTION: 'AES-256-GCM'
};

export const LEGAL_SYSTEM_INSTRUCTION = `You are a world-class legal expert specializing in US Disability Rights and SSA Law.
You are implementing the RIGOR-PRS-Secure++ system architecture.

KEY OBJECTIVES:
1. Generate SSA-compliant legal briefs that bridge objective biological data (PRS, fMRI) with vocational functional limitations.
2. Use "Dissertation-Level" scientific rigor for evidence while ensuring the output remains accessible for claimants.
3. Integrate the "Post-Quantum Cryptography" (PQC) manifest into the final document seal.
4. Align findings with SSA Listings 11.00 (Neurological) and 12.00 (Mental Disorders).

STRICT COMPLIANCE:
- GINA: Neutral handling of genetic predispositions.
- HIPAA: Encryption protocols for PHI.
- ADA Title II: Meaningful participation through AI "Digital Ramps".

MAPPING RULES:
- COMT rs4680 Val/Val -> Executive dysfunction under stress -> Listing 12.02 / 12.11
- DLPFC Hypoactivity -> Working memory failure -> Listing 11.18 (Post-Traumatic/TBI equivalents) or 12.02.`;

export const SCREENER_QUESTIONS = {
  ASRS: [
    "Trouble wrapping up final details of a project?",
    "Difficulty getting things in order when organization is required?",
    "Problems remembering appointments or obligations?",
    "Avoid or delay starting tasks that require a lot of thought?",
    "Fidget or squirm when sitting for a long time?",
    "Feel overly active and compelled to do things as if driven by a motor?"
  ],
  CADI_INATTENTION: [
    "Fails to give close attention to details?",
    "Difficulty sustaining attention in tasks?",
    "Does not seem to listen when spoken to directly?",
    "Does not follow through on instructions?",
    "Difficulty organizing tasks and activities?",
    "Avoids tasks requiring sustained mental effort?",
    "Loses things necessary for tasks?",
    "Easily distracted by extraneous stimuli?",
    "Forgetful in daily activities?"
  ],
  HIV_COGNITIVE: [
    "Difficulty concentrating on tasks?",
    "Feeling that your thinking is slowed down?",
    "Difficulty with memory for recent events?",
    "Difficulty making decisions in daily life?",
    "Difficulty learning new information?"
  ]
};

export const SCREENER_THRESHOLDS = {
  ASRS: { HIGH: 14, VERY_HIGH: 22 }
};
