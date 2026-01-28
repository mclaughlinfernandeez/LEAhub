
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { GEMINI_MODEL, LEGAL_SYSTEM_INSTRUCTION } from "../constants";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const chatWithLegalAIStream = async (message: string, history: any[] = []) => {
  const ai = getAI();
  const chat = ai.chats.create({
    model: GEMINI_MODEL,
    config: {
      systemInstruction: LEGAL_SYSTEM_INSTRUCTION,
      temperature: 0.7,
    },
  });

  return await chat.sendMessageStream({ message });
};

export const generateLegalBrief = async (caseData: any) => {
  const ai = getAI();
  const prompt = `
    TASK: Generate a "RIGOR-Secure++" Certified Legal Brief for an SSA Disability Claim.
    
    SYSTEM ARCHITECTURE DATA:
    Manifest ID: ${caseData.manifest.id}
    PQC Seal: ${caseData.manifest.pqcSeal}
    Integrity Hash: ${caseData.manifest.integrityHash}
    
    CLAIMANT DATA (SSA-3368 & SSA-3373 Simplified):
    ${JSON.stringify(caseData.formData)}
    
    INSTRUCTIONS:
    1. bridge biological standing (Genetic PRS, fMRI) to legal concepts of disability.
    2. REBUT "WILLFULNESS": Explain how executive function collapse (e.g., COMT marker) prevents standard procedural compliance without assistive AI.
    3. ALIGN with SSA Listings: Specifically Listing 12.02 (Neurocognitive) or 12.11 (Neurodevelopmental).
    4. STRUCTURE: 
       - Table of Contents
       - Statement of Scientific Standing (RIGOR-Secure++ Verification)
       - Statement of Facts (Simplified Narrative)
       - Technical-Legal-Medical Argument (Dissertation-Level Analysis)
       - Conclusion & Request for "Digital Ramps" (AI Accommodations).
    5. ADD a "Cryptographic Verification Seal" block at the end referencing the Manifest ID.
  `;
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      systemInstruction: LEGAL_SYSTEM_INSTRUCTION,
      temperature: 0.2, 
    },
  });
  
  return response.text;
};

export const findNearbyLegalResources = async (lat: number, lng: number) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: "What are the nearest legal aid offices specializing in disability rights or Section 504 advocacy?",
    config: {
      tools: [{ googleMaps: {} }],
      toolConfig: {
        retrievalConfig: {
          latLng: {
            latitude: lat,
            longitude: lng
          }
        }
      }
    },
  });
  
  return {
    text: response.text,
    grounding: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
};
