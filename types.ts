
export type TheologicalLens = 'expository' | 'historical' | 'lexical' | 'doctrinal' | 'homiletical';

export interface Entitlement {
  status: 'ACTIVE' | 'PAST_DUE' | 'CANCELED' | 'REVOKED';
  validUntil: number; // Timestamp
  lastCheckedAt: number; // Timestamp
  planType: 'monthly' | 'yearly' | 'none';
}

export interface UserState {
  isPremium: boolean;
  entitlement?: Entitlement;
  theme: 'light' | 'dark' | 'sepia' | 'midnight' | 'ocean' | 'forest';
  fontFamily: 'serif' | 'sans';
  fontSize: 'small' | 'medium' | 'large' | 'xl';
  savedForSermons: string[];
  devotionalEntries: DevotionalEntry[];
  installedPacks: string[];
  aiPreference: 'lite' | 'deep';
  theologicalMode: 'christian' | 'neutral';
}

export interface Verse {
  id: string;
  bookId: string;
  book: string;
  chapter: number;
  verse: number;
  text: string;
  strongs?: string[];
}

export interface Dispensation {
  id: string;
  title: string;
  period: string;
  duration: string;
  color: string;
  startText: string;
  startRef: string;
  endText: string;
  endRef: string;
  description: string;
  responsibility: string;
  humanFailure: string;
  divineJudgment: string;
  divineGrace: string;
  transition: string;
  keyTexts: string[];
  promisesLink: string;
  covenantsLink: string;
  todayLessons: string;
  interpretationErrors: string;
  howToNotConfuse: string;
  events: { title: string; ref: string; description: string }[];
}

export interface StrongEntry {
  id: string;
  original: string;
  transliteration: string;
  definition: string;
  occurrences: number;
}

export interface CommentaryAuthor {
  id: string;
  name: string;
  period: string;
  bio: string;
}

export interface Commentary {
  id: string;
  authorId: string;
  bookId: string;
  chapter: number;
  title: string;
  content: string;
  references: string[];
}

export interface MapData {
  id: string;
  name: string;
  description: string;
  regions: { name: string; bibleRef: string }[];
}

export interface SpecialStudy {
  id: string;
  title: string;
  content: string;
}

export type SermonType = 'expository' | 'thematic' | 'bible-class' | 'theological-study';

export type SermonBlockType = 
  | 'text-base' | 'introduction' | 'context' | 'exegesis' 
  | 'point' | 'strong-word' | 'illustration' | 'application' 
  | 'conclusion' | 'note' | 'chronology' | 'student-questions' 
  | 'lesson-goal' | 'ai-commentary' | 'library-clip' | 'coaching-insight';

export interface SermonBlock {
  id: string;
  type: SermonBlockType;
  title: string;
  content: string;
  metadata?: any;
}

export interface Sermon {
  id: string;
  title: string;
  type: SermonType;
  date: string;
  tags: string[];
  blocks: SermonBlock[];
  status: 'draft' | 'completed';
  version: number;
  folder?: string;
}

export interface DevotionalEntry {
  date: string;
  text: string;
}

export type CommentaryKind = 'micro' | 'expository' | 'doctrinal' | 'homiletical' | 'historical';

export interface CommentaryPack {
  id: string;
  name: string;
  author: string;
  description: string;
  kind: CommentaryKind;
  isPremium: boolean;
  size: string;
}

export interface CommentaryEntry {
  id: string;
  packId: string;
  scope: 'verse' | 'chapter' | 'book';
  refStart: string;
  refEnd?: string;
  kind: CommentaryKind;
  title: string;
  body: string;
}

export interface AICommentCache {
  id: string;
  scope: 'verse' | 'range';
  refStart: string;
  refEnd: string;
  mode: 'christian' | 'neutral';
  lenses: Record<TheologicalLens, string>;
  createdAt: number;
}

export interface LibraryClip {
  id: string;
  type: 'ocr' | 'voice' | 'text';
  title: string;
  content: string;
  tags: string[];
  bibleRefs: string[];
  createdAt: number;
}

export interface PulpitSession {
  id: string;
  sermonId: string;
  duration: number;
  date: string;
}

export interface CoachingReport {
  id: string;
  sessionId: string;
  metrics: {
    totalDuration: number;
    avgWordsPerMinute: number;
    energyVariance: number;
    silencePercentage: number;
  };
  suggestions: string;
  createdAt: number;
}

export type TeiaNodeType = 'theme' | 'bible_ref' | 'person' | 'doctrine' | 'user_sermon';

export interface TeiaNode {
  id: string;
  type: TeiaNodeType;
  title: string;
  summary: string;
  refs: string[];
  tags: string[];
  score: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

export interface TeiaEdge {
  id: string;
  from: string;
  to: string;
  relationType: string;
}

export interface TeiaGraph {
  nodes: TeiaNode[];
  edges: TeiaEdge[];
  queryHash: string;
  createdAt: number;
}

export interface Subtheme {
  title: string;
  verses: string[];
}

export interface TopicalTheme {
  id: string;
  title: string;
  description: string;
  subthemes: Subtheme[];
}

export interface King {
  id: string;
  name: string;
  years: string;
  duration: string;
  prophets: string[];
  evaluation: 'good' | 'bad' | 'mixed';
  dynasty: string;
  summary: string;
  bibleRef: string;
  spiritualProfile?: string;
  relationshipWithGod?: string;
  spiritualInfluence?: string;
  keyEvents?: { title: string; desc: string }[];
  contemporaryProphetsDesc?: string;
  leadershipLessons?: string;
  spiritualAlerts?: string;
  homileticalPrinciples?: string;
  booksWritten?: string[];
  dispensationContext?: string;
}

export interface MonarchyData {
  united: King[];
  judah: King[];
  israel: King[];
}

export interface Prophecy {
  id: string;
  testament: 'OT' | 'NT';
  prophet: string;
  year: string;
  ruler: {
    king?: string;
    priest?: string;
    judge?: string;
  };
  theme: string;
  prophecyRef: string;
  prophecyText: string;
  fulfillmentStatus: 'fulfilled' | 'pending';
  fulfillmentRef?: string;
  fulfillmentText?: string;
  description: string;
}

export interface BookIntroduction {
  bookId: string;
  author: string;
  date: string;
  audience: string;
  genre: string;
  theme: string;
  outline: { title: string; range: string }[];
}

export interface HistoricalContext {
  id: string;
  title: string;
  category: string;
  content: string;
  bibleRefs: string[];
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  category: string;
  description: string;
  refs: string[];
}

export interface DetailedDispensation {
  id: string;
  order: number;
  title: string;
  startYear: string;
  endYear: string;
  startRef: string;
  endRef: string;
  description: string;
  majorEvents: { title: string; ref: string }[];
  theologicalTheme: string;
}

export interface DictionaryEntry {
  term: string;
  definition: string;
  usage: string;
  keyRefs: string[];
}

export interface TheologicalTopic {
  id: string;
  title: string;
  development: string;
  systematic: string;
  refs: string[];
}

export interface SermonOutline {
  id: string;
  title: string;
  keyVerse: string;
  points: { title: string; explanation: string; ref: string }[];
  applications: { general: string };
  questions: string[];
}

export interface DevotionalReflection {
  id: string;
  title: string;
  content: string;
  prayer: string;
  ref: string;
}

export interface ThematicPrayer {
  id: string;
  theme: string;
  title: string;
  content: string;
  baseRef: string;
}

export interface CommonError {
  id: string;
  mistake: string;
  correction: string;
  context: string;
  ref: string;
}

export interface BiblicalProfile {
  id: string;
  name: string;
  strengths: string[];
  failures: string[];
  mainLessons: string;
  appearances: string[];
}

export interface NT_OT_Connection {
  id: string;
  ot_shadow: string;
  nt_fulfillment: string;
  type: 'typology' | 'prophecy';
  description: string;
}

export interface IntertestamentalContext {
  id: string;
  title: string;
  group: string;
  description: string;
  impact: string;
}

export interface ModuleManifest {
  id: string;
  title: string;
  subTitle: string;
  type: 'fundamental' | 'acrostic' | 'conclusion';
  chunkCount: number;
}

export interface BookChunk {
  id: string;
  moduleId: string;
  order: number;
  content: string[];
  anchors: string[];
  refs: string[];
}

export interface Psalm119Section {
  id: string;
  title: string;
  subTitle: string;
  content: string[];
  keywords: string[];
  theologicalInsights: string[];
  application: string;
  prayer: string;
}

export interface Psalm119Book {
  author: string;
  title: string;
  modules: {
    fundamentals: Psalm119Section[];
    acrostic: Psalm119Section[];
    conclusion: Psalm119Section;
  };
}

export interface Quote {
  id: string;
  text: string;
  author: string;
  century: string;
  category: 'father' | 'reformer' | 'puritan' | 'revivalist' | 'modern' | 'contemporary';
  bio?: string;
}
