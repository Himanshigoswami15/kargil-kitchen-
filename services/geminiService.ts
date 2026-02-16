import { GoogleGenAI, Type } from "@google/genai";
import { PairingResponse } from "../types";

// Ensure we have a valid key or empty string to prevent crash
const apiKey = process.env.API_KEY || '';
// Initialize conditionally or with empty string, but handle empty string in function
const ai = new GoogleGenAI({ apiKey });

export const getWinePairing = async (dishName: string, dishDescription: string): Promise<PairingResponse> => {
  // Runtime check for API Key
  if (!apiKey) {
    console.warn("API_KEY is missing. Wine pairing will be unavailable.");
    return {
      wine: "Configuration Required",
      description: "API Key is missing. Please configure the application settings."
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
      description: "We apologize, but our digital sommelier is currently busy. Please ask your server."
    };
  }
};