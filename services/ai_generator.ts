
import { GoogleGenAI, Type } from "@google/genai";
import { BIBLE_METADATA } from '../constants';
import { Verse, TheologicalLens, AICommentCache } from '../types';
import { getAICache, saveAICache } from './database';
import { aiLimitService } from './aiLimitService';
import { BOOK_INTRODUCTIONS, THEOLOGICAL_TOPICS, HISTORICAL_CONTEXTS, SERMON_OUTLINES } from '../data/logos_hub';

export interface MultiLensResult {
  lenses: Record<TheologicalLens, string>;
}

export const generateMultiLensStudy = async (
  verses: Verse[],
  mode: 'christian' | 'neutral',
  type: 'lite' | 'deep'
): Promise<Record<TheologicalLens, string>> => {
  const cacheId = `lens_v5_${verses.map(v => v.id).join('_')}_${mode}`;
  const cached = await getAICache(cacheId);
  if (cached) return cached.lenses;

  // Só checa limite se for DEEP (IA Real)
  if (type === 'deep' && !aiLimitService.canUseFeature('multi_lens_study')) {
     alert("Você já usou sua análise profunda diária. Ativando modo Lite (Offline).");
     return generateLiteLenses(verses, mode);
  }

  let results: Record<TheologicalLens, string>;

  if (type === 'deep' && navigator.onLine) {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Atue como um Arquiteto Teológico Sênior. Analise o trecho: ${verses.map(v => v.id).join(', ')}.
      TEXTO: ${verses.map(v => `${v.id}: ${v.text}`).join('\n')}
      
      Gere 5 perspectivas (lentes) teológicas, cada uma com 5 a 10 linhas:
      1. EXPOSITIVA: Ideia central, fluxo do argumento e conexão com contexto imediato.
      2. HISTÓRICO-CULTURAL: Ambiente do século I (ou época do AT), costumes, destinatários e intenção original.
      3. LÉXICA: 2-3 palavras-chave, sentidos no original (Grego/Hebraico) e ênfases gramaticais.
      4. DOUTRINÁRIA: Doutrina envolvida (ex: Soteriologia), implicações teológicas e equilíbrio bíblico.
      5. HOMILÉTICA: 3 pontos de esboço, 2 aplicações práticas e 2 perguntas para aula.

      MODO: ${mode === 'christian' ? 'Teológico Cristão (assuma a fé)' : 'Acadêmico Neutro (imparcial)'}.
      Responda em JSON seguindo este esquema:
      { "expository": "...", "historical": "...", "lexical": "...", "doctrinal": "...", "homiletical": "..." }`;

      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });

      const parsed = JSON.parse(result.text || "{}");
      results = {
        expository: parsed.expository || "Falha na lente expositiva.",
        historical: parsed.historical || "Falha na lente histórica.",
        lexical: parsed.lexical || "Falha na lente léxica.",
        doctrinal: parsed.doctrinal || "Falha na lente doutrinária.",
        homiletical: parsed.homiletical || "Falha na lente homilética."
      };
      
      aiLimitService.recordUsage('multi_lens_study');
    } catch (e) {
      console.warn("Deep AI falhou, usando Lite mode.", e);
      results = generateLiteLenses(verses, mode);
    }
  } else {
    results = generateLiteLenses(verses, mode);
  }

  await saveAICache({
    id: cacheId,
    scope: verses.length > 1 ? 'range' : 'verse',
    refStart: verses[0].id,
    refEnd: verses[verses.length - 1].id,
    mode: mode,
    lenses: results,
    createdAt: Date.now()
  });

  return results;
};

const generateLiteLenses = (verses: Verse[], mode: 'christian' | 'neutral'): Record<TheologicalLens, string> => {
  const book = BIBLE_METADATA[verses[0].bookId];
  const intro = BOOK_INTRODUCTIONS[verses[0].bookId];
  const topic = THEOLOGICAL_TOPICS.find(t => t.refs.some(r => r.includes(verses[0].bookId)));
  const historical = HISTORICAL_CONTEXTS.find(hc => hc.bibleRefs.some(r => r.includes(verses[0].bookId)));
  const outline = SERMON_OUTLINES.find(o => o.keyVerse.includes(verses[0].bookId));
  
  return {
    expository: `Análise do trecho ${verses[0].id}. ${intro ? `Este livro foi escrito por ${intro.author} para um público de ${intro.audience}. O tema central é: ${intro.theme}.` : `O texto está inserido em ${book.name} (${book.category}).`} No fluxo do capítulo ${verses[0].chapter}, este verso serve como um ponto de fundamentação para o ensino local.`,
    historical: `${historical ? historical.content : `Contexto de ${book.name}. Escrito originalmente para um público que vivia sob as tensões de sua época, buscando trazer clareza sobre a vontade divina.`} O ambiente histórico de ${book.category} influencia a linguagem e as metáforas utilizadas pelo autor sagrado.`,
    lexical: `Palavras-chave detectadas: ${verses[0].strongs?.join(', ') || 'Termos gerais de fé'}. No original, a estrutura gramatical sugere uma ação contínua e deliberada. O uso de termos específicos de ${verses[0].book} reforça a unidade literária do livro.`,
    doctrinal: `${topic ? `Conexão Doutrinária: ${topic.title}. ${topic.systematic}` : `Base doutrinária: Teologia Geral.`} Este texto contribui para a compreensão da soberania e do plano de Deus. Em modo ${mode}, destaca-se a revelação progressiva que culmina na obra redentora de Cristo.`,
    homiletical: `${outline ? `Esboço Sugerido (Hub): ${outline.title}. Pontos: ${outline.points.map(p => p.title).join('; ')}.` : `Esboço Sugerido:\n1. A revelação contida no texto.\n2. A resposta esperada do homem.\n3. O resultado da obediência.`} Aplicação: Medite nesta verdade hoje.`
  };
};
