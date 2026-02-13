
import { GoogleGenAI, Type } from "@google/genai";
import { DocumentType, RiskLevel } from "../types";

export const generateLegalDocument = async (params: {
  type: DocumentType;
  fullName: string;
  address: string;
  city: string;
  duration?: string;
  amount?: string;
  customClauses?: string;
}) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `
    Act as a senior legal expert. Generate a professional and legally sound ${params.type} document based on these details:
    - Parties Involved: ${params.fullName} residing at ${params.address}, ${params.city}.
    - Term: ${params.duration || 'N/A'}
    - Financials: ${params.amount || 'N/A'}
    - Custom Requirements: ${params.customClauses || 'None'}
    
    Format the document with standard headings and signature blocks.
    
    ALSO, provide a structural evaluation:
    1. Risk Level: Assess if this document/scenario has Low, Medium, or High legal risk.
    2. Legal Basis: List 2-3 specific Acts or Statutes (e.g. Indian Contract Act, 1872) relevant to this document.
    
    Return the response in this specific format:
    ---DOC_START---
    [Markdown Document Content]
    ---DOC_END---
    ---RISK---
    [Low/Medium/High]
    ---ACTS---
    [Act 1, Act 2]
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.6,
      }
    });

    const text = response.text || "";
    const docMatch = text.match(/---DOC_START---([\s\S]*?)---DOC_END---/);
    const riskMatch = text.match(/---RISK---([\s\S]*?)---ACTS---/);
    const actsMatch = text.match(/---ACTS---([\s\S]*)/);

    return {
      content: docMatch ? docMatch[1].trim() : text,
      risk: (riskMatch ? riskMatch[1].trim() : RiskLevel.LOW) as RiskLevel,
      acts: actsMatch ? actsMatch[1].trim().split(',').map(a => a.trim()) : ['General Civil Law']
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("Legal drafting engine unavailable.");
  }
};
