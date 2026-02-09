
import { Verse, Sermon, CommentaryEntry, AICommentCache, LibraryClip, PulpitSession, CoachingReport, TeiaGraph } from '../types';

const DB_NAME = 'DabarLogosDB';
const DB_VERSION = 32; // Incrementado para Teia
const STORES = {
  VERSES: 'verses',
  SERMONS: 'sermons',
  PACKS: 'commentary_packs',
  ENTRIES: 'commentary_entries',
  AI_CACHE: 'ai_comment_cache',
  LIBRARY: 'library_clips',
  SESSIONS: 'pulpit_sessions',
  COACHING: 'coaching_reports',
  GRAPH_CACHE: 'graph_cache'
};

let dbInstance: IDBDatabase | null = null;

export const initDB = (): Promise<IDBDatabase> => {
  if (dbInstance) return Promise.resolve(dbInstance);

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      if (!db.objectStoreNames.contains(STORES.VERSES)) {
        const store = db.createObjectStore(STORES.VERSES, { keyPath: 'id' });
        store.createIndex('book_chapter', ['bookId', 'chapter'], { unique: false });
      }
      if (!db.objectStoreNames.contains(STORES.SERMONS)) db.createObjectStore(STORES.SERMONS, { keyPath: 'id' });
      if (!db.objectStoreNames.contains(STORES.PACKS)) db.createObjectStore(STORES.PACKS, { keyPath: 'id' });
      if (!db.objectStoreNames.contains(STORES.ENTRIES)) {
        const store = db.createObjectStore(STORES.ENTRIES, { keyPath: 'id' });
        store.createIndex('refStart', 'refStart', { unique: false });
        store.createIndex('packId', 'packId', { unique: false });
      }
      if (!db.objectStoreNames.contains(STORES.AI_CACHE)) db.createObjectStore(STORES.AI_CACHE, { keyPath: 'id' });
      if (!db.objectStoreNames.contains(STORES.LIBRARY)) {
        const store = db.createObjectStore(STORES.LIBRARY, { keyPath: 'id' });
        store.createIndex('type', 'type', { unique: false });
      }
      if (!db.objectStoreNames.contains(STORES.SESSIONS)) db.createObjectStore(STORES.SESSIONS, { keyPath: 'id' });
      if (!db.objectStoreNames.contains(STORES.COACHING)) db.createObjectStore(STORES.COACHING, { keyPath: 'id' });
      if (!db.objectStoreNames.contains(STORES.GRAPH_CACHE)) db.createObjectStore(STORES.GRAPH_CACHE, { keyPath: 'queryHash' });
    };

    request.onsuccess = () => {
      dbInstance = request.result;
      resolve(dbInstance);
    };
    request.onerror = () => reject(request.error);
  });
};

// --- Teia Helpers ---
export const saveTeiaCache = async (graph: TeiaGraph): Promise<void> => {
  const db = await initDB();
  const tx = db.transaction(STORES.GRAPH_CACHE, 'readwrite');
  tx.objectStore(STORES.GRAPH_CACHE).put(graph);
};

export const getTeiaCache = async (queryHash: string): Promise<TeiaGraph | null> => {
  const db = await initDB();
  return new Promise((resolve) => {
    const tx = db.transaction(STORES.GRAPH_CACHE, 'readonly');
    const request = tx.objectStore(STORES.GRAPH_CACHE).get(queryHash);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => resolve(null);
  });
};

// --- (RESTO DO ARQUIVO MANTIDO INTEGRALMENTE) ---

export const saveLibraryClip = async (clip: LibraryClip): Promise<void> => {
  const db = await initDB();
  const tx = db.transaction(STORES.LIBRARY, 'readwrite');
  tx.objectStore(STORES.LIBRARY).put(clip);
};

export const getLibraryClips = async (): Promise<LibraryClip[]> => {
  const db = await initDB();
  return new Promise((resolve) => {
    const tx = db.transaction(STORES.LIBRARY, 'readonly');
    const request = tx.objectStore(STORES.LIBRARY).getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => resolve([]);
  });
};

export const deleteLibraryClip = async (id: string): Promise<void> => {
  const db = await initDB();
  const tx = db.transaction(STORES.LIBRARY, 'readwrite');
  tx.objectStore(STORES.LIBRARY).delete(id);
};

export const saveCoachingReport = async (report: CoachingReport): Promise<void> => {
  const db = await initDB();
  const tx = db.transaction(STORES.COACHING, 'readwrite');
  tx.objectStore(STORES.COACHING).put(report);
};

export const getCoachingReports = async (): Promise<CoachingReport[]> => {
  const db = await initDB();
  return new Promise((resolve) => {
    const tx = db.transaction(STORES.COACHING, 'readonly');
    const request = tx.objectStore(STORES.COACHING).getAll();
    request.onsuccess = () => resolve(request.result || []);
  });
};

export const saveAICache = async (cache: AICommentCache): Promise<void> => {
  const db = await initDB();
  const tx = db.transaction(STORES.AI_CACHE, 'readwrite');
  tx.objectStore(STORES.AI_CACHE).put(cache);
};

export const getAICache = async (id: string): Promise<AICommentCache | null> => {
  const db = await initDB();
  return new Promise((resolve) => {
    const tx = db.transaction(STORES.AI_CACHE, 'readonly');
    const request = tx.objectStore(STORES.AI_CACHE).get(id);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => resolve(null);
  });
};

export const getChapter = async (bookId: string, chapter: number): Promise<Verse[]> => {
  const db = await initDB();
  return new Promise((resolve) => {
    const tx = db.transaction(STORES.VERSES, 'readonly');
    const index = tx.objectStore(STORES.VERSES).index('book_chapter');
    const request = index.getAll(IDBKeyRange.only([bookId, chapter]));
    
    request.onsuccess = (e: any) => {
      const results = e.target.result || [];
      results.sort((a: Verse, b: Verse) => a.verse - b.verse);
      resolve(results);
    };
    request.onerror = () => resolve([]);
  });
};

export const getVerseByRef = async (ref: string): Promise<Verse | null> => {
  const db = await initDB();
  return new Promise((resolve) => {
    const tx = db.transaction(STORES.VERSES, 'readonly');
    const store = tx.objectStore(STORES.VERSES);
    const request = store.get(ref);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => resolve(null);
  });
};

export const saveSermon = async (sermon: Sermon): Promise<void> => {
  const db = await initDB();
  const tx = db.transaction(STORES.SERMONS, 'readwrite');
  tx.objectStore(STORES.SERMONS).put(sermon);
};

export const getSermons = async (): Promise<Sermon[]> => {
  const db = await initDB();
  return new Promise((resolve) => {
    const tx = db.transaction(STORES.SERMONS, 'readonly');
    tx.objectStore(STORES.SERMONS).getAll().onsuccess = (e: any) => resolve(e.target.result || []);
  });
};

export const deleteSermon = async (id: string): Promise<void> => {
  const db = await initDB();
  const tx = db.transaction(STORES.SERMONS, 'readwrite');
  tx.objectStore(STORES.SERMONS).delete(id);
};

export const bulkInsertVerses = async (verses: Verse[], onProgress?: (percent: number) => void) => {
  const db = await initDB();
  const tx = db.transaction(STORES.VERSES, 'readwrite');
  const store = tx.objectStore(STORES.VERSES);
  const total = verses.length;
  let count = 0;
  for (const v of verses) {
    store.put(v);
    count++;
    if (onProgress && count % 500 === 0) onProgress(Math.floor((count / total) * 100));
  }
  return new Promise<void>((resolve) => {
    tx.oncomplete = () => { if (onProgress) onProgress(100); resolve(); };
  });
};

export const searchVersesByKeyword = async (keyword: string): Promise<Verse[]> => {
  const db = await initDB();
  return new Promise((resolve) => {
    const tx = db.transaction(STORES.VERSES, 'readonly');
    const store = tx.objectStore(STORES.VERSES);
    const results: Verse[] = [];
    const request = store.openCursor();
    request.onsuccess = (event: any) => {
      const cursor = event.target.result;
      if (cursor) {
        const verse = cursor.value as Verse;
        if (verse.text.toLowerCase().includes(keyword.toLowerCase())) results.push(verse);
        cursor.continue();
      } else resolve(results);
    };
  });
};

export const getDBStats = async () => {
  const db = await initDB();
  return new Promise<{count: number}>(r => {
    db.transaction(STORES.VERSES, 'readonly').objectStore(STORES.VERSES).count().onsuccess = (e:any) => r({count: e.target.result});
  });
};

export const resetDatabase = async () => {
  const db = await initDB();
  db.transaction(STORES.VERSES, 'readwrite').objectStore(STORES.VERSES).clear();
};

export const saveCommentaryEntries = async (entries: CommentaryEntry[]) => {
  const db = await initDB();
  const tx = db.transaction(STORES.ENTRIES, 'readwrite');
  entries.forEach(e => tx.objectStore(STORES.ENTRIES).put(e));
};

export const getCommentariesForRef = async (ref: string): Promise<CommentaryEntry[]> => {
  const db = await initDB();
  return new Promise((resolve) => {
    const index = db.transaction(STORES.ENTRIES, 'readonly').objectStore(STORES.ENTRIES).index('refStart');
    index.getAll(ref).onsuccess = (e: any) => resolve(e.target.result || []);
  });
};
