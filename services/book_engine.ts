
import { PS119_LITERAL_CHUNKS, PS119_BOOK_MANIFEST } from '../data/book_psalm119';
import { BookChunk, ModuleManifest } from '../types';

/**
 * DABAR BOOK ENGINE v1.0
 * Gerenciador de conteúdo literal para o livro Salmo 119.
 */

/**
 * Recupera todos os chunks de um módulo específico em ordem canônica.
 */
export const getModuleLiteralContent = (moduleId: string): string[] => {
  return Object.values(PS119_LITERAL_CHUNKS)
    .filter(chunk => chunk.moduleId === moduleId)
    .sort((a, b) => a.order - b.order)
    .flatMap(chunk => chunk.content);
};

/**
 * Recupera metadados de um chunk específico para referências cruzadas.
 */
export const getChunkDetails = (chunkId: string): BookChunk | undefined => {
  return PS119_LITERAL_CHUNKS[chunkId];
};

/**
 * Busca por termos dentro de todos os chunks carregados.
 * Retorna IDs de módulos onde o termo foi encontrado.
 */
export const searchBookLiteral = (query: string): string[] => {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return [];

  const foundModuleIds = new Set<string>();

  Object.values(PS119_LITERAL_CHUNKS).forEach(chunk => {
    // Busca no conteúdo literal
    const inContent = chunk.content.some(p => p.toLowerCase().includes(normalizedQuery));
    // Busca nas âncoras (tags)
    const inAnchors = chunk.anchors.some(a => a.toLowerCase().includes(normalizedQuery));

    if (inContent || inAnchors) {
      foundModuleIds.add(chunk.moduleId);
    }
  });

  return Array.from(foundModuleIds);
};

/**
 * Retorna o Manifesto completo para construção de menus/sumários.
 */
export const getBookManifest = (): ModuleManifest[] => {
  return PS119_BOOK_MANIFEST;
};

/**
 * Função de Recuperação Rápida por ID de Módulo.
 */
export const getModuleInfo = (moduleId: string): ModuleManifest | undefined => {
  return PS119_BOOK_MANIFEST.find(m => m.id === moduleId);
};
