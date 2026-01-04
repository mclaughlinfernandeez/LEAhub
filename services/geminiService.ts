
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
  const prompt = `Generate a formal legal brief based on the following case data: ${JSON.stringify(caseData)}. Ensure it follows Federal District Court formatting. Include Sections: Table of Authorities, Statement of Facts, Argument, and Conclusion.`;
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      systemInstruction: LEGAL_SYSTEM_INSTRUCTION,
      temperature: 0.3,
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
