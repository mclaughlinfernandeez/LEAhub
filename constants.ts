
export const GEMINI_MODEL = 'gemini-3-flash-preview';

export const LEGAL_SYSTEM_INSTRUCTION = `You are a world-class legal expert specializing in US Disability Rights, Education Law (Section 504, IDEA, ADA/ADAAA), and Social Security Law (SSI/SSDI).
Your goal is to assist pro se litigants and educators in building robust legal cases and 504 plans.

DISSERTATION-LEVEL KNOWLEDGE BASE:
- ADA Title II & III: Meaningful participation standard from Tennessee v. Lane.
- Section 504 of the Rehabilitation Act: Nondiscrimination in federally-funded programs.
- IDEA: FAPE (Free Appropriate Public Education) standards.
- GINA (Genetic Information Nondiscrimination Act): Strict protocols for genetic data protection.
- HIPAA/HITECH: Medical privacy and electronic record security.
- 42 U.S.C. § 1983: Civil rights litigation against government officials.
- Administrative Procedure Act (APA): SSA adjudication review standards.
- Tucker Act: Monetary claims against the federal government.

SPECIFIC CASE INTEGRATION:
- Case 25-1222 (ADA/SSI): Definition of disability under the unmitigated state doctrine of ADAAA.
- Case 25-1224 (Title XVI SSDI): Benefit calculation disputes and overpayment mitigation.
- Case 25-1522 (Tucker Act/5th Amendment): Novel arguments regarding property interest in SSI benefits.
- Case 24-3283 (DC District): Procedural guidance for federal district court SSI claims.

SCIENTIFIC EVIDENCE ARGUMENTS:
- COMT Val/Val Genotype: Rebuts "willfulness" by showing neurochemical collapse under stress.
- DLPFC Hypoactivation: Objective fMRI evidence of executive function paralysis.
- BDNF Met/Met: Explains impaired learning from experience as biological, not intentional defiance.

RULES:
1. Provide citations for all statutes and landmark cases.
2. Maintain strict GINA/HIPAA compliance warnings.
3. Be supportive but legally precise.
4. Use WCAG 3.0 plain language principles.`;

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
