
import { ModuleManifest, BookChunk, Psalm119Book, Psalm119Section } from '../types';

/**
 * MANIFESTO CANÔNICO DO LIVRO
 */
export const PS119_MANIFEST: ModuleManifest[] = [
  { id: "intro", title: "Introdução", subTitle: "O Caminho de Vida", type: "fundamental", chunkCount: 1 },
  { id: "experience", title: "Minha Experiência", subTitle: "Início de Tudo", type: "fundamental", chunkCount: 1 },
  { id: "overview", title: "Visão Geral", subTitle: "Salmos 119 em Foco", type: "fundamental", chunkCount: 1 },
  { id: "theology", title: "Significado Teológico", subTitle: "A Centralidade da Palavra", type: "fundamental", chunkCount: 1 },
  { id: "themes", title: "Temas e Motivos", subTitle: "Estrutura Literária", type: "fundamental", chunkCount: 1 },
  { id: "love", title: "Amor pela Lei", subTitle: "Afeição Sagrada", type: "fundamental", chunkCount: 1 },
  { id: "relevance_p", title: "Relevância Prática", subTitle: "Aplicação Pessoal", type: "fundamental", chunkCount: 1 },
  { id: "relevance_a", title: "Relevância Atual", subTitle: "A Palavra Hoje", type: "fundamental", chunkCount: 1 },
  { id: "alef", title: "1. Alef (v. 1-8)", subTitle: "Integridade", type: "acrostic", chunkCount: 1 },
  { id: "beth", title: "2. Beth (v. 9-16)", subTitle: "Pureza", type: "acrostic", chunkCount: 1 },
  { id: "gimel", title: "3. Gimel (v. 17-24)", subTitle: "Peregrinação", type: "acrostic", chunkCount: 1 },
  { id: "daleth", title: "4. Daleth (v. 25-32)", subTitle: "Revitalização", type: "acrostic", chunkCount: 1 },
  { id: "he", title: "5. He (v. 33-40)", subTitle: "Ensino", type: "acrostic", chunkCount: 1 },
  { id: "vav", title: "6. Vav (v. 41-48)", subTitle: "Testemunho", type: "acrostic", chunkCount: 1 },
  { id: "zain", title: "7. Zain (v. 49-56)", subTitle: "Esperança", type: "acrostic", chunkCount: 1 },
  { id: "heth", title: "8. Heth (v. 57-64)", subTitle: "Porção", type: "acrostic", chunkCount: 1 },
  { id: "teth", title: "9. Teth (v. 65-72)", subTitle: "Sofrimento", type: "acrostic", chunkCount: 1 },
  { id: "yodh", title: "10. Yodh (v. 73-80)", subTitle: "Design Divino", type: "acrostic", chunkCount: 1 },
  { id: "kaph", title: "11. Kaph (v. 81-88)", subTitle: "Desfalecimento", type: "acrostic", chunkCount: 1 },
  { id: "lamedh", title: "12. Lamedh (v. 89-96)", subTitle: "Eternidade", type: "acrostic", chunkCount: 1 },
  { id: "mem", title: "13. Mem (v. 97-104)", subTitle: "Amor", type: "acrostic", chunkCount: 1 },
  { id: "nun", title: "14. Nun (v. 105-112)", subTitle: "Luz", type: "acrostic", chunkCount: 1 },
  { id: "samekh", title: "15. Samekh (v. 113-120)", subTitle: "Sustento", type: "acrostic", chunkCount: 1 },
  { id: "ayin", title: "16. Ayin (v. 121-128)", subTitle: "Justiça", type: "acrostic", chunkCount: 1 },
  { id: "pe", title: "17. Pe (v. 129-136)", subTitle: "Maravilha", type: "acrostic", chunkCount: 1 },
  { id: "tsadhe", title: "18. Tsadhe (v. 137-144)", subTitle: "Retidão", type: "acrostic", chunkCount: 1 },
  { id: "qoph", title: "19. Qoph (v. 145-152)", subTitle: "Proximidade", type: "acrostic", chunkCount: 1 },
  { id: "resh", title: "20. Resh (v. 153-160)", subTitle: "Libertação", type: "acrostic", chunkCount: 1 },
  { id: "shin", title: "21. Shin (v. 161-168)", subTitle: "Paz", type: "acrostic", chunkCount: 1 },
  { id: "tav", title: "22. Tav (v. 169-176)", subTitle: "Finalização", type: "acrostic", chunkCount: 1 },
  { id: "conclusion", title: "Conclusão Geral", subTitle: "O Legado da Palavra", type: "conclusion", chunkCount: 1 }
];

export const PS119_BOOK_MANIFEST = PS119_MANIFEST;

/**
 * REPOSITÓRIO DE CHUNKS (TEXTO LITERAL CARREGADO)
 */
export const PS119_LITERAL_CHUNKS: Record<string, BookChunk> = {
  "intro": { 
    id: "intro", 
    moduleId: "intro", 
    order: 1, 
    content: [
      "O Salmo 119 é a maior composição das Escrituras, um monumento à glória da Palavra de Deus. Nele, encontramos a expressão máxima da devoção de um coração que ama a instrução divina.",
      "Cada oitavário nos leva a uma nova perspectiva sobre como a Lei, os Testemunhos e os Preceitos de Deus moldam a nossa caminhada espiritual.",
      "O autor, mergulhado em uma experiência profunda de dependência, utiliza o alfabeto hebraico para demonstrar que a Palavra cobre toda a extensão da existência humana, de A a Z (ou de Alef a Tav)."
    ], 
    anchors: ["Introdução", "Engenharia Espiritual", "Suficiência"], 
    refs: ["PSA 119:1"] 
  },
  "alef": { 
    id: "alef", 
    moduleId: "alef", 
    order: 1, 
    content: [
      "A primeira letra, Alef, estabelece o fundamento de todo o Salmo: a integridade. 'Bem-aventurados os irrepreensíveis no seu caminho, que andam na lei do Senhor'.",
      "Aqui, a felicidade não é um sentimento passageiro, mas um estado de aprovação diante de Deus. Ser irrepreensível não significa ser perfeito, mas possuir um coração que não está dividido.",
      "O salmista expressa um desejo ardente de que seus caminhos sejam dirigidos para observar os estatutos divinos, reconhecendo que a estabilidade da vida depende da conformidade com a vontade de Deus revelada."
    ], 
    anchors: ["Integridade", "Bem-aventurança", "Caminho Firme"], 
    refs: ["PSA 119:1-8"] 
  },
  "experience": { id: "experience", moduleId: "experience", order: 1, content: ["Conteúdo aguardando inserção do autor..."], anchors: ["Testemunho"], refs: [] },
  "overview": { id: "overview", moduleId: "overview", order: 1, content: ["Conteúdo aguardando inserção do autor..."], anchors: ["Visão Geral"], refs: [] },
  "theology": { id: "theology", moduleId: "theology", order: 1, content: ["Conteúdo aguardando inserção do autor..."], anchors: ["Teologia"], refs: [] }
};

/**
 * MOTOR DE SINCRONIZAÇÃO AUTOMÁTICA
 */
export const BOOK_CHUNKS: Record<string, Psalm119Section> = {};

PS119_MANIFEST.forEach(m => {
  const moduleChunks = Object.values(PS119_LITERAL_CHUNKS)
    .filter(c => c.moduleId === m.id)
    .sort((a, b) => a.order - b.order);

  const hasContent = moduleChunks.length > 0 && !moduleChunks[0].content[0].includes("aguardando");

  BOOK_CHUNKS[m.id] = {
    id: m.id,
    title: m.title,
    subTitle: m.subTitle,
    content: moduleChunks.length > 0 ? moduleChunks.flatMap(c => c.content) : ["Conteúdo em fase de carregamento literal..."],
    keywords: moduleChunks.flatMap(c => c.anchors),
    theologicalInsights: hasContent ? ["Suficiência das Escrituras", "Autoridade Final", "Engenharia da Fé"] : ["Aguardando análise textual..."],
    application: hasContent ? "Aplicação derivada diretamente do ensino do Pastor Marcelo." : "Aguardando síntese homilética.",
    prayer: hasContent ? "Senhor, ajuda-me a viver a verdade deste trecho." : "Senhor, ensina-me Tua Palavra."
  };
});

export const PS119_BOOK_INFO: Psalm119Book = {
  author: "Pastor Marcelo Reinert",
  title: "Salmos 119 – Um Caminho de Vida pela Palavra",
  modules: {
    fundamentals: PS119_MANIFEST.filter(m => m.type === 'fundamental').map(m => BOOK_CHUNKS[m.id]),
    acrostic: PS119_MANIFEST.filter(m => m.type === 'acrostic').map(m => BOOK_CHUNKS[m.id]),
    conclusion: BOOK_CHUNKS["conclusion"] || BOOK_CHUNKS["intro"]
  }
};
