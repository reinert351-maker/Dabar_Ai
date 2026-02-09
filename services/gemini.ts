
import { GoogleGenAI } from "@google/genai";
import { aiLimitService } from "./aiLimitService";

export const generateSermonWithAI = async (topic: string, verses: string[], type: 'sermon' | 'lesson' = 'sermon') => {
  if (!aiLimitService.canUseFeature('sermon_generator')) {
    throw new Error("Limite diário de 1 geração de sermão atingido.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const instruction = type === 'sermon' 
    ? `Gere um esboço de SERMÃO EXPOSITIVO (homilética de púlpito). Foco em: Proclamação, Exortação e Aplicação de vida.`
    : `Gere um esboço de AULA TEMÁTICA (didática de ensino). Foco em: Explicação histórica, Análise gramatical e Conexões teológicas sistemáticas.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Como um teólogo profundo e mestre em exegese, ${instruction} 
    Tema: "${topic}". 
    Versículos base: ${verses.join(", ")}. 
    Estruture em: Introdução, 3 Pontos com referências, Aplicação Prática e Conclusão. 
    Responda em Português do Brasil com tom solene e acadêmico. Use Markdown para formatação.`,
    config: {
      temperature: 0.7,
      topP: 0.95,
    }
  });

  aiLimitService.recordUsage('sermon_generator');
  return response.text;
};
