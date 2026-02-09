
import React from 'react';

export const APP_NAME = "Dabar Logos";
export const BIBLE_VERSION = "ACF";

export interface BibleBookMetadata {
  id: string;
  name: string;
  chapters: number;
  category: string;
}

export const BIBLE_METADATA: Record<string, BibleBookMetadata> = {
  "GEN": { id: "GEN", name: "Gênesis", chapters: 50, category: "Pentateuco" },
  "EXO": { id: "EXO", name: "Êxodo", chapters: 40, category: "Pentateuco" },
  "LEV": { id: "LEV", name: "Levítico", chapters: 27, category: "Pentateuco" },
  "NUM": { id: "NUM", name: "Números", chapters: 36, category: "Pentateuco" },
  "DEU": { id: "DEU", name: "Deuteronômio", chapters: 34, category: "Pentateuco" },
  "JOS": { id: "JOS", name: "Josué", chapters: 24, category: "Históricos" },
  "JDG": { id: "JDG", name: "Juízes", chapters: 21, category: "Históricos" },
  "RUT": { id: "RUT", name: "Rute", chapters: 4, category: "Históricos" },
  "1SA": { id: "1SA", name: "1 Samuel", chapters: 31, category: "Históricos" },
  "2SA": { id: "2SA", name: "2 Samuel", chapters: 24, category: "Históricos" },
  "1KI": { id: "1KI", name: "1 Reis", chapters: 22, category: "Históricos" },
  "2KI": { id: "2KI", name: "2 Reis", chapters: 25, category: "Históricos" },
  "1CH": { id: "1CH", name: "1 Crônicas", chapters: 29, category: "Históricos" },
  "2CH": { id: "2CH", name: "2 Crônicas", chapters: 36, category: "Históricos" },
  "EZR": { id: "EZR", name: "Esdras", chapters: 10, category: "Históricos" },
  "NEH": { id: "NEH", name: "Neemias", chapters: 13, category: "Históricos" },
  "EST": { id: "EST", name: "Ester", chapters: 10, category: "Históricos" },
  "JOB": { id: "JOB", name: "Jó", chapters: 42, category: "Poéticos" },
  "PSA": { id: "PSA", name: "Salmos", chapters: 150, category: "Poéticos" },
  "PRO": { id: "PRO", name: "Provérbios", chapters: 31, category: "Poéticos" },
  "ECC": { id: "ECC", name: "Eclesiastes", chapters: 12, category: "Poéticos" },
  "SNG": { id: "SNG", name: "Cantares", chapters: 8, category: "Poéticos" },
  "ISA": { id: "ISA", name: "Isaías", chapters: 66, category: "Profetas Maiores" },
  "JER": { id: "JER", name: "Jeremias", chapters: 52, category: "Profetas Maiores" },
  "LAM": { id: "LAM", name: "Lamentações", chapters: 5, category: "Profetas Maiores" },
  "EZE": { id: "EZE", name: "Ezequiel", chapters: 48, category: "Profetas Maiores" },
  "DAN": { id: "DAN", name: "Daniel", chapters: 12, category: "Profetas Maiores" },
  "HOS": { id: "HOS", name: "Oseias", chapters: 14, category: "Profetas Menores" },
  "JOE": { id: "JOE", name: "Joel", chapters: 3, category: "Profetas Menores" },
  "AMO": { id: "AMO", name: "Amós", chapters: 9, category: "Profetas Menores" },
  "OBA": { id: "OBA", name: "Obadias", chapters: 1, category: "Profetas Menores" },
  "JON": { id: "JON", name: "Jonas", chapters: 4, category: "Profetas Menores" },
  "MIC": { id: "MIC", name: "Miqueias", chapters: 7, category: "Profetas Menores" },
  "NAH": { id: "NAH", name: "Naum", chapters: 3, category: "Profetas Menores" },
  "HAB": { id: "HAB", name: "Habacuque", chapters: 3, category: "Profetas Menores" },
  "ZEP": { id: "ZEP", name: "Sofonia", chapters: 3, category: "Profetas Menores" },
  "HAG": { id: "HAG", name: "Ageu", chapters: 2, category: "Profetas Menores" },
  "ZEC": { id: "ZEC", name: "Zacarias", chapters: 14, category: "Profetas Menores" },
  "MAL": { id: "MAL", name: "Malaquias", chapters: 4, category: "Profetas Menores" },
  "MAT": { id: "MAT", name: "Mateus", chapters: 28, category: "Evangelhos" },
  "MRK": { id: "MRK", name: "Marcos", chapters: 16, category: "Evangelhos" },
  "LUK": { id: "LUK", name: "Lucas", chapters: 24, category: "Evangelhos" },
  "JHN": { id: "JHN", name: "João", chapters: 21, category: "Evangelhos" },
  "ACT": { id: "ACT", name: "Atos", chapters: 28, category: "Histórico NT" },
  "ROM": { id: "ROM", name: "Romanos", chapters: 16, category: "Epístolas Paulinas" },
  "1CO": { id: "1CO", name: "1 Coríntios", chapters: 16, category: "Epístolas Paulinas" },
  "2CO": { id: "2CO", name: "2 Coríntios", chapters: 13, category: "Epístolas Paulinas" },
  "GAL": { id: "GAL", name: "Gálatas", chapters: 6, category: "Epístolas Paulinas" },
  "EPH": { id: "EPH", name: "Efésios", chapters: 6, category: "Epístolas Paulinas" },
  "PHI": { id: "PHI", name: "Filipenses", chapters: 4, category: "Epístolas Paulinas" },
  "COL": { id: "COL", name: "Colossenses", chapters: 4, category: "Epístolas Paulinas" },
  "1TH": { id: "1TH", name: "1 Tessalonicenses", chapters: 5, category: "Epístolas Paulinas" },
  "2TH": { id: "2TH", name: "2 Tessalonicenses", chapters: 3, category: "Epístolas Paulinas" },
  "1TI": { id: "1TI", name: "1 Timóteo", chapters: 6, category: "Epístolas Paulinas" },
  "2TI": { id: "2TI", name: "2 Timóteo", chapters: 4, category: "Epístolas Paulinas" },
  "TIT": { id: "TIT", name: "Tito", chapters: 3, category: "Epístolas Paulinas" },
  "PHM": { id: "PHM", name: "Filemom", chapters: 1, category: "Epístolas Paulinas" },
  "HEB": { id: "HEB", name: "Hebreus", chapters: 13, category: "Epístolas Gerais" },
  "JAM": { id: "JAM", name: "Tiago", chapters: 5, category: "Epístolas Gerais" },
  "1PE": { id: "1PE", name: "1 Pedro", chapters: 5, category: "Epístolas Gerais" },
  "2PE": { id: "2PE", name: "2 Pedro", chapters: 3, category: "Epístolas Gerais" },
  "1JN": { id: "1JN", name: "1 João", chapters: 5, category: "Epístolas Gerais" },
  "2JN": { id: "2JN", name: "2 João", chapters: 1, category: "Epístolas Gerais" },
  "3JN": { id: "3JN", name: "3 João", chapters: 1, category: "Epístolas Gerais" },
  "JUD": { id: "JUD", name: "Judas", chapters: 1, category: "Epístolas Gerais" },
  "REV": { id: "REV", name: "Apocalipse", chapters: 22, category: "Revelação" }
};

export const ICON_BIBLE = (className?: string) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

export const ICON_TYPOLOGY = (className?: string) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

export const ICON_MEASURES = (className?: string) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
  </svg>
);

export const ICON_TABERNACLE = (className?: string) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10zM9 21v-4a3 3 0 016 0v4" />
  </svg>
);

export const ICON_LIBRARY = (className?: string) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
  </svg>
);

export const ICON_ASSISTANT = (className?: string) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
  </svg>
);

export const ICON_COACH = (className?: string) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

export const ICON_STRONG = (className?: string) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5c1.382 0 2.67.456 3.71 1.232L19 4" />
  </svg>
);

export const ICON_THEME = (className?: string) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
  </svg>
);

export const ICON_CHRONOLOGY = (className?: string) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const ICON_MAPS = (className?: string) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
  </svg>
);

export const ICON_SERMON = (className?: string) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11l-8 8-4-4 8-8 4 4zM5 19h14" />
  </svg>
);

export const ICON_STUDY = (className?: string) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
  </svg>
);

export const ICON_DIFFERENTIALS = (className?: string) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

export const ICON_SETTINGS = (className?: string) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const ICON_NOTE = (className?: string) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

export const ICON_DEVOTIONAL = (className?: string) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

export const ICON_QUOTES = (className?: string) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4" />
  </svg>
);
