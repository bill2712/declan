import { GoogleGenAI } from "@google/genai";
import { BlessingRequest } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateFancyBlessing = async (request: BlessingRequest): Promise<string> => {
  try {
    const prompt = `
      You are a poetic assistant creating a beautiful, warm, and traditional Chinese blessing for a baby named Declan Tsang (Date of birth: Feb 20, 2026).
      The parents are Bill Tsang and Cher Leung.

      The user details are:
      - Name: ${request.senderName}
      - Relationship to baby: ${request.relationship}
      - Their simple wish: "${request.message}"

      Please rewrite this wish into a fancy, touching, and elegant paragraph in Traditional Chinese (Cantonese style if appropriate, but formal written Chinese is best).
      Include specific well-wishes for health, happiness, and intelligence.
      Keep it under 100 words.
      Return ONLY the text of the blessing.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 } 
      }
    });

    return response.text || "祝福傳送失敗，請稍後再試。";
  } catch (error) {
    console.error("Error generating blessing:", error);
    return "系統繁忙，請稍後再試。";
  }
};