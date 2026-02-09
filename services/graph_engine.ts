
import { TeiaGraph, TeiaNode, TeiaEdge, TeiaNodeType } from '../types';
import { TOPICAL_BIBLE } from '../data';
import { KINGS_DATA } from '../data/kings_data';
import { PROPHECIES_DATA } from '../data/prophecies_data';
import { aiLimitService } from './aiLimitService';
import { GoogleGenAI } from "@google/genai";

export const generateTeiaOffline = async (query: string, existingGraph?: TeiaGraph): Promise<TeiaGraph> => {
  const normalizedQuery = query.toLowerCase().trim();
  const nodes: TeiaNode[] = existingGraph ? [...existingGraph.nodes] : [];
  const edges: TeiaEdge[] = existingGraph ? [...existingGraph.edges] : [];
  const queryHash = btoa(normalizedQuery);

  const addUniqueNode = (newNode: TeiaNode) => {
    if (!nodes.find(n => n.id === newNode.id)) nodes.push(newNode);
  };

  const addUniqueEdge = (newEdge: TeiaEdge) => {
    if (!edges.find(e => e.from === newEdge.from && e.to === newEdge.to)) edges.push(newEdge);
  };

  if (!existingGraph) {
    addUniqueNode({
      id: 'root',
      type: 'theme',
      title: query.toUpperCase(),
      summary: `Ponto de partida da investigação teológica sobre "${query}".`,
      refs: [],
      tags: [query],
      score: 100
    });
  }

  const rootId = existingGraph ? nodes.find(n => n.title.toLowerCase().includes(normalizedQuery))?.id || 'root' : 'root';

  TOPICAL_BIBLE.filter(t => t.title.toLowerCase().includes(normalizedQuery) || t.description.toLowerCase().includes(normalizedQuery))
    .slice(0, 5).forEach(t => {
      const id = `theme_${t.id}`;
      addUniqueNode({ id, type: 'doctrine', title: t.title, summary: t.description, refs: t.subthemes.flatMap(s => s.verses).slice(0, 3), tags: ['Doutrina'], score: 85 });
      addUniqueEdge({ id: `e_${rootId}_${id}`, from: rootId, to: id, relationType: 'related_to' });
    });

  const allKings = [...KINGS_DATA.united, ...KINGS_DATA.judah, ...KINGS_DATA.israel];
  allKings.filter(k => k.name.toLowerCase().includes(normalizedQuery) || k.summary.toLowerCase().includes(normalizedQuery))
    .slice(0, 3).forEach(k => {
      const id = `king_${k.id}`;
      addUniqueNode({ id, type: 'person', title: k.name, summary: k.summary, refs: [k.bibleRef], tags: ['História', k.dynasty], score: 75 });
      addUniqueEdge({ id: `e_${rootId}_${id}`, from: rootId, to: id, relationType: 'exemplifies' });
    });

  PROPHECIES_DATA.filter(p => p.theme.toLowerCase().includes(normalizedQuery) || p.prophecyText.toLowerCase().includes(normalizedQuery))
    .slice(0, 3).forEach(p => {
      const id = `prophecy_${p.id}`;
      addUniqueNode({ id, type: 'bible_ref', title: p.theme, summary: p.description, refs: [p.prophecyRef], tags: ['Profético'], score: 70 });
      addUniqueEdge({ id: `e_${rootId}_${id}`, from: rootId, to: id, relationType: 'supports' });
    });

  return { nodes, edges, queryHash, createdAt: Date.now() };
};

export const enrichTeiaWithAI = async (graph: TeiaGraph, node: TeiaNode): Promise<TeiaGraph> => {
  if (!aiLimitService.canUseFeature('teia_ai')) {
    alert("Você já usou seu enriquecimento visual diário. Tente novamente amanhã.");
    return graph;
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Como um Arquiteto de Conhecimento Bíblico, expanda a teia para o conceito "${node.title}" (${node.type}). 
    Retorne 3 novos nós relacionados em formato JSON:
    { "newNodes": [ { "type": "...", "title": "...", "summary": "...", "relation": "..." } ] }
    Use tipos: theme, bible_ref, person, doctrine. Relações: appears_in, supports, exemplifies, related_to, contrasts_with, explains.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });

    const data = JSON.parse(response.text || '{"newNodes":[]}');
    const newGraph = { ...graph };

    data.newNodes.forEach((n: any, i: number) => {
      const id = `ai_ext_${node.id}_${i}`;
      newGraph.nodes.push({
        id,
        type: n.type,
        title: n.title,
        summary: n.summary,
        refs: [],
        tags: ['IA Enrichment'],
        score: 50
      });
      newGraph.edges.push({
        id: `e_ai_${id}`,
        from: node.id,
        to: id,
        relationType: n.relation
      });
    });

    aiLimitService.recordUsage('teia_ai');
    return newGraph;
  } catch (e) {
    console.error("AI Enrichment failed", e);
    return graph;
  }
};
