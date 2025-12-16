import { GoogleGenAI, Type } from "@google/genai";
import { AIRecognitionResponse } from "../types";

const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

export const getAIRecommendations = async (userQuery: string): Promise<AIRecognitionResponse> => {
  if (!apiKey) {
    console.warn("No API Key found. Returning mock data.");
    return { recommendations: [] };
  }

  try {
    const model = "gemini-2.5-flash";
    const prompt = `
      Você é um motor de recomendação de filmes para o serviço de streaming "P+".
      O usuário perguntou: "${userQuery}".
      
      Gere 6 recomendações de filmes ou séries (reais ou fictícias) que se encaixem nesse pedido.
      Responda APENAS em Português do Brasil.
      
      Para 'visualKey', escolha EXATAMENTE uma dessas palavras (em inglês) que melhor descreva o estilo visual:
      'nature', 'city', 'space', 'fantasy', 'action', 'romance', 'horror', 'cartoon'.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  genre: { type: Type.STRING },
                  visualKey: { type: Type.STRING }
                },
                required: ["title", "description", "genre", "visualKey"]
              }
            }
          }
        }
      }
    });

    const jsonText = response.text || "{}";
    return JSON.parse(jsonText) as AIRecognitionResponse;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return { recommendations: [] };
  }
};