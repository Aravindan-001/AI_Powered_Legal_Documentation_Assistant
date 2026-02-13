
import { getAIClient } from '../config/geminiConfig.js';
import { Type } from "@google/genai";

export const generateDraft = async (params) => {
  const ai = getAIClient();
  
  const prompt = `
    Act as a senior legal expert. Generate a professional and legally sound ${params.documentType} document based on these details:
    - Parties Involved: ${params.fullName} residing at ${params.address}, ${params.cityState}.
    - Term: ${params.duration || 'N/A'}
    - Financials: ${params.amount || 'N/A'}
    - Custom Requirements: ${params.additionalClauses || 'None'}
    
    Format the document with standard headings, clear clauses, and formal signature blocks.
    
    ALSO, provide a structural evaluation:
    1. Risk Level: Assess if this document/scenario has Low, Medium, or High legal risk.
    2. Legal Basis: List 2-3 specific Acts or Statutes (e.g. Indian Contract Act, 1872) relevant to this document.
    
    Return the response strictly in this format:
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
        topP: 0.95,
        topK: 40,
      }
    });

    const text = response.text || "";
    
    // Extraction logic
    const docMatch = text.match(/---DOC_START---([\s\S]*?)---DOC_END---/);
    const riskMatch = text.match(/---RISK---([\s\S]*?)---ACTS---/);
    const actsMatch = text.match(/---ACTS---([\s\S]*)/);

    return {
      content: docMatch ? docMatch[1].trim() : text,
      riskLevel: (riskMatch ? riskMatch[1].trim() : 'Low'),
      relevantActs: actsMatch ? actsMatch[1].trim().split(',').map(a => a.trim()) : ['General Civil Law']
    };
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw new Error("The legal AI engine failed to generate a response. Please check your prompt or try again later.");
  }
};
