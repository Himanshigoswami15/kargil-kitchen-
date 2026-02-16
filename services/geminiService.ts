import { GoogleGenAI, Type } from "@google/genai";
import { PairingResponse } from "../types";

// Declare process to avoid TypeScript errors in the client-side code
// and to comply with the guideline to use process.env.API_KEY.
declare const process: {
  env: {
    API_KEY: string;
  };
};

export const getWinePairing = async (dishName: string, dishDescription: string): Promise<PairingResponse> => {
  // The guidelines require using process.env.API_KEY exclusively.
  // We assume this variable is available in the execution context as per instructions.
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    console.error("API_KEY is not defined.");
    return {
      wine: "Configuration Required",
      description: "API Key is missing."
    };
  }

  const ai = new GoogleGenAI({ apiKey });

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
          },
          propertyOrdering: ["wine", "description"]
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