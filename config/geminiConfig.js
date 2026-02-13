
import { GoogleGenAI } from "@google/genai";

// Standard initialization as per SDK guidelines
export const getAIClient = () => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not defined");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};
