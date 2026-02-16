import { GoogleGenAI, Type } from "@google/genai";
import { PairingResponse } from "../types";

// Access API key using Vite's standard import.meta.env
// We handle both VITE_API_KEY (standard) and API_KEY (custom config) to be safe
const apiKey = import.meta.env.VITE_API_KEY || '';

// Lazy initialization function
const getAI = () => {
  if (!apiKey) {
    console.error("VITE_API_KEY is not defined.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const getWinePairing = async (dishName: string, dishDescription: string): Promise<PairingResponse> => {
  const ai = getAI();
  
  if (!ai) {
    return {
      wine: "Configuration Required",
      description: "API Key is missing. Please ensure VITE_API_KEY is set in your .env file."
    };
  }

  try {
    const modelId = 'gemini-3-flash-preview';
    const prompt = `Suggest a perfect wine pairing for a dish named "${dishName}" which is described as: "${dishDescription}".
    Provide the response in JSON with two fields: "wine" (the name/type of wine) and "description" (a brief, elegant explanation of why it pairs well, max 30 words).`;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            wine: { type: Type.STRING },
            description: { type: Type.STRING }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    return JSON.parse(text) as PairingResponse;
  } catch (error) {
    console.error("Error fetching pairing:", error);
    return {
      wine: "Sommelier Unavailable",
      description: "Our digital sommelier is currently assisting other guests. Please try again momentarily."
    };
  }
};