
import { 
  BookIntroduction, HistoricalContext, DictionaryEntry, 
  TheologicalTopic, SermonOutline, DevotionalReflection, 
  CommonError, TimelineEvent, DetailedDispensation,
  ThematicPrayer, BiblicalProfile, NT_OT_Connection,
  IntertestamentalContext
} from '../types';

// ============================================================================================
// --- PILAR 1: ESTRUTURAL (OS 66 LIVROS - PADRÃO PORTUGUÊS) ---
// ============================================================================================
export const BOOK_INTRODUCTIONS: Record<string, BookIntroduction> = {
  "GN": { bookId: "GN", author: "Moisés", date: "1440-1400 a.C.", audience: "Israelitas no deserto", genre: "Pentateuco", theme: "Origens e Aliança", outline: [{title: "Criação", range: "1-2"}, {title: "Queda e Juízo", range: "3-11"}, {title: "Patriarcas", range: "12-50"}] },
  "EX": { bookId: "EX", author: "Moisés", date: "1440-1400 a.C.", audience: "Nação de Israel", genre: "Pentateuco", theme: "Redenção e Lei", outline: [{title: "Saída do Egito", range: "1-18"}, {title: "Lei no Sinai", range: "19-24"}, {title: "Tabernáculo", range: "25-40"}] },
  "LV": { bookId: "LV", author: "Moisés", date: "1440 a.C.", audience: "Levitas e Povo", genre: "Pentateuco", theme: "Santidade e Sacrifício", outline: [{title: "Leis de Sacrifício", range: "1-7"}, {title: "Sacerdócio", range: "8-10"}, {title: "Pureza", range: "11-15"}, {title: "Dia da Expiação", range: "16"}, {title: "Vida Santa", range: "17-27"}] },
  "NM": { bookId: "NM", author: "Moisés", date: "1400 a.C.", audience: "Nova Geração", genre: "Pentateuco", theme: "Peregrinação e Disciplina", outline: [{title: "Censo e Preparo", range: "1-10"}, {title: "Rebelião e Atraso", range: "11-25"}, {title: "Preparação para Canaã", range: "26-36"}] },
  "DT": { bookId: "DT", author: "Moisés", date: "1400 a.C.", audience: "Israel em Moabe", genre: "Pentateuco", theme: "Renovação da Aliança", outline: [{title: "Retrospectiva", range: "1-4"}, {title: "Exposição da Lei", range: "5-26"}, {title: "Bênçãos e Maldições", range: "27-30"}, {title: "Despedida de Moisés", range: "31-34"}] },
  "JS": { bookId: "JS", author: "Josué (provável)", date: "1380 a.C.", audience: "Israel", genre: "Histórico", theme: "Conquista e Posse", outline: [{title: "Entrada em Canaã", range: "1-5"}, {title: "Conquista da Terra", range: "6-12"}, {title: "Divisão da Terra", range: "13-22"}, {title: "Exortação Final", range: "23-24"}] },
  "JZ": { bookId: "JZ", author: "Samuel (tradição)", date: "1050 a.C.", audience: "Israel Monárquico", genre: "Histórico", theme: "Ciclos de Apostasia", outline: [{title: "Causas do Declínio", range: "1-3"}, {title: "Os Grandes Juízes", range: "4-16"}, {title: "Anarquia Religiosa", range: "17-21"}] },
  "RT": { bookId: "RT", author: "Samuel (provável)", date: "1000 a.C.", audience: "Israel", genre: "Histórico", theme: "Resgate e Providência", outline: [{title: "Amargura em Moabe", range: "1"}, {title: "O Campo de Boaz", range: "2"}, {title: "Eira de Boaz", range: "3"}, {title: "Casamento e Linhagem", range: "4"}] },
  "1SM": { bookId: "1SM", author: "Samuel, Gade, Natã", date: "930 a.C.", audience: "Israel", genre: "Histórico", theme: "Transição para Realeza", outline: [{title: "Ministério de Samuel", range: "1-7"}, {title: "Reinado de Saul", range: "8-15"}, {title: "Davi e Saul", range: "16-31"}] },
  "2SM": { bookId: "2SM", author: "Gade, Natã", date: "930 a.C.", audience: "Israel", genre: "Histórico", theme: "Reinado de Davi", outline: [{title: "Triunfo de Davi", range: "1-10"}, {title: "Pecado e Consequência", range: "11-20"}, {title: "Apêndices", range: "21-24"}] },
  "1RS": { bookId: "1RS", author: "Jeremias (tradição)", date: "560 a.C.", audience: "Exilados", genre: "Histórico", theme: "Divisão do Reino", outline: [{title: "Reino de Salomão", range: "1-11"}, {title: "Reino Dividido", range: "12-22"}] },
  "2RS": { bookId: "2RS", author: "Jeremias (tradição)", date: "560 a.C.", audience: "Exilados", genre: "Histórico", theme: "Cativeiro e Queda", outline: [{title: "Elias e Eliseu", range: "1-13"}, {title: "Queda de Samaria", range: "14-17"}, {title: "Queda de Jerusalém", range: "18-25"}] },
  "1CR": { bookId: "1CR", author: "Esdras", date: "450 a.C.", audience: "Remanescente", genre: "Histórico", theme: "Herança Davídica", outline: [{title: "Genealogias", range: "1-9"}, {title: "O Trono de Davi", range: "10-29"}] },
  "2CR": { bookId: "2CR", author: "Esdras", date: "450 a.C.", audience: "Remanescente", genre: "Histórico", theme: "História Espiritual de Judá", outline: [{title: "Reinado de Salomão", range: "1-9"}, {title: "Reis de Judá", range: "10-36"}] },
  "ED": { bookId: "ED", author: "Esdras", date: "440 a.C.", audience: "Remanescente", genre: "Histórico", theme: "Restauração do Altar", outline: [{title: "Retorno sob Zorobabel", range: "1-6"}, {title: "Retorno sob Esdras", range: "7-10"}] },
  "NE": { bookId: "NE", author: "Neemias", date: "430 a.C.", audience: "Remanescente", genre: "Histórico", theme: "Restauração dos Muros", outline: [{title: "Reconstrução", range: "1-7"}, {title: "Reforma Espiritual", range: "8-13"}] },
  "ET": { bookId: "ET", author: "Desconhecido", date: "460 a.C.", audience: "Judeus na Pérsia", genre: "Histórico", theme: "Providência Silenciosa", outline: [{title: "Ameaça de Hamã", range: "1-4"}, {title: "Livramento Judeu", range: "5-10"}] },
  "JÓ": { bookId: "JÓ", author: "Desconhecido", date: "Era Patriarcal", audience: "Humanidade", genre: "Poético", theme: "Soberania e Sofrimento", outline: [{title: "Prólogo", range: "1-2"}, {title: "Debates", range: "3-37"}, {title: "Resposta Divina", range: "38-42"}] },
  "SL": { bookId: "SL", author: "Vários (Davi, Asafe, etc.)", date: "1400-450 a.C.", audience: "Adoradores", genre: "Poético", theme: "Louvor e Lamento", outline: [{title: "Cinco Livros de Salmos", range: "1-150"}] },
  "PV": { bookId: "PV", author: "Salomão, Agur, Lemuel", date: "950 a.C.", audience: "Jovens e Sábios", genre: "Sapiencial", theme: "Sabedoria Prática", outline: [{title: "Valor da Sabedoria", range: "1-9"}, {title: "Coleções de Provérbios", range: "10-31"}] },
  "EC": { bookId: "EC", author: "Salomão", date: "935 a.C.", audience: "Humanidade", genre: "Sapiencial", theme: "Vaidade e Propósito", outline: [{title: "A Busca Humana", range: "1-6"}, {title: "Conselhos de Sábio", range: "7-12"}] },
  "CT": { bookId: "CT", author: "Salomão", date: "965 a.C.", audience: "Casais", genre: "Poético", theme: "Amor Conjugal", outline: [{title: "O Cortejo", range: "1-3"}, {title: "O Casamento", range: "4-8"}] },
  "IS": { bookId: "IS", author: "Isaías", date: "740 a.C.", audience: "Judá", genre: "Profético", theme: "Juízo e Consolo Messianico", outline: [{title: "Condenação", range: "1-39"}, {title: "Consolo", range: "40-66"}] },
  "JR": { bookId: "JR", author: "Jeremias", date: "627-580 a.C.", audience: "Judá", genre: "Profético", theme: "Juízo Imunente", outline: [{title: "Chamado", range: "1"}, {title: "Profecias contra Judá", range: "2-45"}, {title: "Nações e Queda", range: "46-52"}] },
  "LM": { bookId: "LM", author: "Jeremias", date: "586 a.C.", audience: "Exilados", genre: "Poético", theme: "Luto por Jerusalém", outline: [{title: "Cinco Poemas de Dor", range: "1-5"}] },
  "EZ": { bookId: "EZ", author: "Ezequiel", date: "593-571 a.C.", audience: "Cativos na Babilônia", genre: "Profético", theme: "Glória de Deus", outline: [{title: "Juízo sobre Israel", range: "1-24"}, {title: "Sobre Nações", range: "25-32"}, {title: "Restauração Futura", range: "33-48"}] },
  "DN": { bookId: "DN", author: "Daniel", date: "535 a.C.", audience: "Judeus e Nações", genre: "Profético/Apocalíptico", theme: "Domínio de Deus na História", outline: [{title: "Narrativas", range: "1-6"}, {title: "Visões", range: "7-12"}] },
  "OS": { bookId: "OS", author: "Oseias", date: "750 a.C.", audience: "Israel (Norte)", genre: "Profeta Menor", theme: "Amor Fiel de Deus", outline: [{title: "O Casamento do Profeta", range: "1-3"}, {title: "O Adultério de Israel", range: "4-14"}] },
  "JL": { bookId: "JL", author: "Joel", date: "835 a.C.", audience: "Judá", genre: "Profeta Menor", theme: "O Dia do Senhor", outline: [{title: "Praga de Gafanhotos", range: "1"}, {title: "O Dia do Senhor", range: "2-3"}] },
  "AM": { bookId: "AM", author: "Amós", date: "760 a.C.", audience: "Israel (Norte)", genre: "Profeta Menor", theme: "Justiça Social e Juízo", outline: [{title: "Oito Juízos", range: "1-2"}, {title: "Três Sermões", range: "3-6"}, {title: "Cinco Visões", range: "7-9"}] },
  "OB": { bookId: "OB", author: "Obadias", date: "840 a.C.", audience: "Edom e Judá", genre: "Profeta Menor", theme: "Queda de Edom", outline: [{title: "O Juízo sobre Edom", range: "v.1-16"}, {title: "O Reino de Yahweh", range: "v.17-21"}] },
  "JN": { bookId: "JN", author: "Jonas", date: "760 a.C.", audience: "Nínive e Israel", genre: "Profeta Menor", theme: "Misericórdia aos Gentios", outline: [{title: "Fuga", range: "1"}, {title: "Oração", range: "2"}, {title: "Pregação", range: "3"}, {title: "Queixa", range: "4"}] },
  "MQ": { bookId: "MQ", author: "Miqueias", date: "735 a.C.", audience: "Judá e Israel", genre: "Profeta Menor", theme: "O Que Deus Requer", outline: [{title: "Ameaças de Juízo", range: "1-3"}, {title: "Promessas do Reino", range: "4-5"}, {title: "Controvérsia de Yahweh", range: "6-7"}] },
  "NA": { bookId: "NA", author: "Naum", date: "650 a.C.", audience: "Nínive e Judá", genre: "Profeta Menor", theme: "Destruição de Nínive", outline: [{title: "Juiz Majestoso", range: "1"}, {title: "Queda do Império", range: "2-3"}] },
  "HC": { bookId: "HC", author: "Habacuque", date: "605 a.C.", audience: "Judá", genre: "Profeta Menor", theme: "Fé em Tempos de Mal", outline: [{title: "Perguntas", range: "1"}, {title: "A Resposta de Deus", range: "2"}, {title: "Oração de Fé", range: "3"}] },
  "SF": { bookId: "SF", author: "Sofonias", date: "630 a.C.", audience: "Judá", genre: "Profeta Menor", theme: "Juízo sobre Todos", outline: [{title: "Juízo sobre Judá", range: "1"}, {title: "Sobre Nações", range: "2"}, {title: "Salvação do Remanescente", range: "3"}] },
  "AG": { bookId: "AG", author: "Ageu", date: "520 a.C.", audience: "Remanescente", genre: "Profeta Menor", theme: "Reconstrução do Templo", outline: [{title: "Despertamento", range: "1"}, {title: "Promessas de Glória", range: "2"}] },
  "ZC": { bookId: "ZC", author: "Zacarias", date: "520-480 a.C.", audience: "Remanescente", genre: "Profeta Menor", theme: "Messias, o Rei", outline: [{title: "Oito Visões", range: "1-6"}, {title: "Liderança e Juízo", range: "7-11"}, {title: "Libertação de Sião", range: "12-14"}] },
  "ML": { bookId: "ML", author: "Malaquias", date: "430 a.C.", audience: "Israel Pós-Exílico", genre: "Profeta Menor", theme: "Fidelidade e Corrupção", outline: [{title: "Amor de Deus", range: "1"}, {title: "Oração e Dízimo", range: "2-3"}, {title: "O Dia que Vem", range: "4"}] },
  "MT": { bookId: "MT", author: "Mateus", date: "60 d.C.", audience: "Judeus", genre: "Evangelho", theme: "Cristo, o Rei", outline: [{title: "Origem do Rei", range: "1-4"}, {title: "Sermão do Monte", range: "5-7"}, {title: "Mistérios do Reino", range: "8-25"}, {title: "Cruz e Triunfo", range: "26-28"}] },
  "MC": { bookId: "MC", author: "Marcos", date: "55 d.C.", audience: "Romanos", genre: "Evangelho", theme: "Cristo, o Servo", outline: [{title: "Preparo", range: "1"}, {title: "Ministério na Galileia", range: "1-10"}, {title: "Semana da Paixão", range: "11-16"}] },
  "LC": { bookId: "LC", author: "Lucas", date: "60 d.C.", audience: "Teófilo / Gentios", genre: "Evangelho", theme: "Cristo, o Filho do Homem", outline: [{title: "Nascimento", range: "1-2"}, {title: "Caminho de Jerusalém", range: "9-19"}, {title: "Ascensão", range: "20-24"}] },
  "JO": { bookId: "JO", author: "João", date: "85 d.C.", audience: "Igreja Universal", genre: "Evangelho", theme: "Cristo, o Filho de Deus", outline: [{title: "Encarnação", range: "1"}, {title: "Livro dos Sinais", range: "2-12"}, {title: "Livro da Glória", range: "13-21"}] },
  "AT": { bookId: "AT", author: "Lucas", date: "63 d.C.", audience: "Teófilo", genre: "Histórico", theme: "Expansão do Evangelho", outline: [{title: "Jerusalém", range: "1-7"}, {title: "Judeia e Samaria", range: "8-12"}, {title: "Confins da Terra", range: "13-28"}] },
  "RM": { bookId: "RM", author: "Paulo", date: "57 d.C.", audience: "Roma", genre: "Epístola", theme: "Justiça pela Fé", outline: [{title: "Necessidade", range: "1-3"}, {title: "Provisão", range: "4-8"}, {title: "Soberania", range: "9-11"}, {title: "Prática", range: "12-16"}] },
  "1CO": { bookId: "1CO", author: "Paulo", date: "55 d.C.", audience: "Corinto", genre: "Epístola", theme: "Ordem na Igreja", outline: [{title: "Divisões", range: "1-4"}, {title: "Imoralidade", range: "5-7"}, {title: "Adoração e Dons", range: "8-14"}, {title: "Ressurreição", range: "15-16"}] },
  "2CO": { bookId: "2CO", author: "Paulo", date: "56 d.C.", audience: "Corinto", genre: "Epístola", theme: "Defesa do Apostolado", outline: [{title: "Consolo", range: "1-7"}, {title: "Oferta", range: "8-9"}, {title: "Vindicação", range: "10-13"}] },
  "GL": { bookId: "GL", author: "Paulo", date: "49 d.C.", audience: "Galácia", genre: "Epístola", theme: "Liberdade da Lei", outline: [{title: "Autoridade de Paulo", range: "1-2"}, {title: "Fé vs Lei", range: "3-4"}, {title: "Vida no Espírito", range: "5-6"}] },
  "EF": { bookId: "EF", author: "Paulo", date: "62 d.C.", audience: "Éfeso", genre: "Epístola", theme: "O Mistério do Corpo", outline: [{title: "Posição em Cristo", range: "1-3"}, {title: "Andar de Crente", range: "4-6"}] },
  "FP": { bookId: "FP", author: "Paulo", date: "62 d.C.", audience: "Filipos", genre: "Epístola", theme: "Alegria no Sofrimento", outline: [{title: "Contentamento", range: "1"}, {title: "Mente de Cristo", range: "2"}, {title: "Alvo da Fé", range: "3-4"}] },
  "CL": { bookId: "CL", author: "Paulo", date: "62 d.C.", audience: "Colossos", genre: "Epístola", theme: "Suficiência de Cristo", outline: [{title: "Supremacia", range: "1-2"}, {title: "Nova Vida", range: "3-4"}] },
  "1TS": { bookId: "1TS", author: "Paulo", date: "51 d.C.", audience: "Tessalônica", genre: "Epístola", theme: "Vinda de Cristo", outline: [{title: "Exemplo", range: "1-3"}, {title: "Santidade e Vinda", range: "4-5"}] },
  "2TS": { bookId: "2TS", author: "Paulo", date: "51 d.C.", audience: "Tessalônica", genre: "Epístola", theme: "O Dia do Senhor", outline: [{title: "Perseguição", range: "1"}, {title: "O Homem do Pecado", range: "2-3"}] },
  "1TM": { bookId: "1TM", author: "Paulo", date: "64 d.C.", audience: "Timóteo", genre: "Pastoral", theme: "Conduta na Casa de Deus", outline: [{title: "Sã Doutrina", range: "1"}, {title: "Liderança", range: "2-3"}, {title: "Cuidado Pastoral", range: "4-6"}] },
  "2TM": { bookId: "2TM", author: "Paulo", date: "67 d.C.", audience: "Timóteo", genre: "Pastoral", theme: "Fidelidade até o Fim", outline: [{title: "Perseverança", range: "1-2"}, {title: "Apostasia", range: "3-4"}] },
  "TT": { bookId: "TT", author: "Paulo", date: "65 d.C.", audience: "Tito", genre: "Pastoral", theme: "Obras de Santidade", outline: [{title: "Ordem na Igreja", range: "1"}, {title: "Graça e Ética", range: "2-3"}] },
  "FM": { bookId: "FM", author: "Paulo", date: "62 d.C.", audience: "Filemom", genre: "Epístola", theme: "Perdão e Fraternidade", outline: [{title: "Intercessão por Onésimo", range: "v.1-25"}] },
  "HB": { bookId: "HB", author: "Anônimo", date: "68 d.C.", audience: "Hebreus", genre: "Epístola", theme: "Cristo é Superior", outline: [{title: "Superior aos Anjos", range: "1-2"}, {title: "A Moisés", range: "3-4"}, {title: "Sacerdócio Melquisedeque", range: "5-10"}, {title: "Galeria da Fé", range: "11-13"}] },
  "TG": { bookId: "TG", author: "Tiago", date: "45 d.C.", audience: "Dispersão", genre: "Epístola", theme: "Fé e Obras", outline: [{title: "Provas", range: "1"}, {title: "Língua e Sabedoria", range: "2-3"}, {title: "Religião Pura", range: "4-5"}] },
  "1PE": { bookId: "1PE", author: "Pedro", date: "64 d.C.", audience: "Forasteiros", genre: "Epístola", theme: "Esperança na Dor", outline: [{title: "Salvação", range: "1-2"}, {title: "Submissão", range: "2-3"}, {title: "Sofrimento", range: "4-5"}] },
  "2PE": { bookId: "2PE", author: "Pedro", date: "67 d.C.", audience: "Igreja Universal", genre: "Epístola", theme: "Conhecimento vs Falsos Mestres", outline: [{title: "Crescimento", range: "1"}, {title: "Falsos Mestres", range: "2"}, {title: "A Segunda Vinda", range: "3"}] },
  "1JO": { bookId: "1JO", author: "João", date: "90 d.C.", audience: "Igreja Universal", genre: "Epístola", theme: "Certeza da Salvação", outline: [{title: "Comunhão", range: "1-2"}, {title: "Amor Prático", range: "3-4"}, {title: "Vitória", range: "5"}] },
  "2JO": { bookId: "2JO", author: "João", date: "90 d.C.", audience: "A Senhora Eleita", genre: "Epístola", theme: "Andar na Verdade", outline: [{title: "Verdade e Amor", range: "v.1-13"}] },
  "3JO": { bookId: "3JO", author: "João", date: "90 d.C.", audience: "Gaio", genre: "Epístola", theme: "Hospitalidade", outline: [{title: "Elogio a Gaio", range: "v.1-14"}] },
  "JD": { bookId: "JD", author: "Judas", date: "65 d.C.", audience: "Igreja Universal", genre: "Epístola", theme: "Batalha pela Fé", outline: [{title: "Aviso sobre Apóstatas", range: "v.1-25"}] },
  "AP": { bookId: "AP", author: "João", date: "95 d.C.", audience: "Sete Igrejas", genre: "Apocalíptico", theme: "A Consumação", outline: [{title: "Cartas", range: "1-3"}, {title: "Trono e Selos", range: "4-7"}, {title: "Trombetas e Taças", range: "8-18"}, {title: "Novo Céu", range: "19-22"}] }
};

// ============================================================================================
// --- PILAR 2: HISTÓRICO (CONTEXTO E CRONOLOGIA AMPLIADA) ---
// ============================================================================================
export const HISTORICAL_CONTEXTS: HistoricalContext[] = [
  { 
    id: "hc1", 
    title: "Pax Romana e o Evangelho", 
    category: "empire", 
    content: "A estabilidade militar e administrativa imposta pelo Império Romano, conhecida como Pax Romana, foi o 'veículo' providencial para a expansão do Reino.\n\n" +
    "1. Infraestrutura Viária: As famosas estradas romanas permitiram que Paulo e os apóstolos viajassem com segurança por todo o Mediterrâneo.\n" +
    "2. Unificação Linguística: O uso do Grego Koiné como língua franca facilitou a pregação unificada e a escrita dos manuscritos originais.\n" +
    "3. Sistema Jurídico: O direito romano ofereceu proteção legal mínima, como visto quando Paulo apelou para sua cidadania romana em situações de crise.\n" +
    "4. Segurança Marítima: A supressão da pirataria permitiu viagens missionárias por mar, conectando centros urbanos como Éfeso, Corinto e Roma.\n" +
    "5. Paz Relativa: A ausência de guerras civis de grande escala dentro das fronteiras imperiais proporcionou um ambiente favorável ao florescimento de novas ideias.\n" +
    "6. Dispersão Judaica: A presênça de sinagogas em cada grande cidade romana ofereceu um ponto de partida estratégico para o anúncio do Messias.\n" +
    "7. Urbanização Acelerada: O foco romano em cidades permitiu que o Evangelho se concentrasse em hubs populacionais para irradiação futura.\n" +
    "8. Correios Imperiais: A logística de comunicação romana permitiu que as epístolas apostólicas circulassem com rapidez entre as comunidades cristãs.\n" +
    "9. Sincretismo Religioso: Embora o paganismo fosse forte, a tolerância inicial permitiu que o cristianismo fosse visto como uma seita judaica protegida.\n" +
    "10. Plenitude do Tempo: Como diz Gálatas 4:4, Deus preparou a história humana para que Cristo viesse no momento exato dessa estabilidade política.\n" +
    "11. Economia de Troca: O comércio dinâmico facilitou que comerciantes cristãos levassem a fé para as fronteiras mais distantes como a Grã-Bretanha e a Índia.\n" +
    "12. Declínio Moral: A decadência da virtude clássica romana criou um vácuo espiritual que foi preenchido pela mensagem de esperança e santidade de Cristo.", 
    bibleRefs: ["ACT 1:8", "ROM 13:1-7", "GAL 4:4"] 
  },
  { 
    id: "hc2", 
    title: "O Exílio Babilônico", 
    category: "event", 
    content: "O cativeiro babilônico (586 a.C.) foi o cadinho de purificação que transformou radicalmente a identidade teológica e nacional de Israel.\n\n" +
    "1. Cura da Idolatria: Após 70 anos em contato com os ídolos pagãos, o remanescente voltou para Judá com uma aversão definitiva ao politeísmo.\n" +
    "2. Nascimento da Sinagoga: Sem o Templo em Jerusalém, os judeus começaram a se reunir em casas de oração para estudar a Torá, criando o modelo da igreja cristã.\n" +
    "3. Centralidade das Escrituras: O foco da fé mudou do ritual sacrificial no Altar para o estudo exegético da Palavra Escrita.\n" +
    "4. Preservação do Remanescente: Figuras como Daniel e Ezequiel atuaram como âncoras espirituais, mantendo a chama da esperança messiânica viva no cativeiro.\n" +
    "5. Universalidade de Deus: O povo entendeu que Deus não estava confinado a uma geografia, mas era soberano sobre os impérios mundiais (Babilônia, Pérsia).\n" +
    "6. Sistematização Literária: Acredita-se que grande parte do Antigo Testamento foi compilada e editada durante este período para evitar a perda da memória sagrada.\n" +
    "7. Desenvolvimento da Gematria: O estudo numérico e as interpretações mais profundas da lei ganharam força como forma de preservação cultural.\n" +
    "8. Teste de Fidelidade: O episódio da fornalha ardente e da cova dos leões estabeleceu o padrão de resistência civil por fidelidade religiosa.\n" +
    "9. Preparo para o Messias: A esperança em um Libertador mudou de um foco puramente político para um anseio espiritual por restauração total.\n" +
    "10. Interação com a Cultura Gentílica: Os judeus aprenderam a viver como 'estrangeiros e peregrinos', um conceito vital para a eclesiologia cristã posterior.\n" +
    "11. O Decreto de Ciro: O fim do exílio provou a fidelidade profética de Jeremias, reforçando a confiança na soberania absoluta de Deus sobre a história.\n" +
    "12. Purificação do Sacerdócio: O retorno exigiu uma verificação rigorosa das linhagens, focando na pureza da descendência e do serviço sagrado.", 
    bibleRefs: ["PSA 137", "DAN 9", "JER 29", "2KI 25"] 
  },
  { 
    id: "hc3", 
    title: "Helenização (Cultura Grega)", 
    category: "empire", 
    content: "A expansão de Alexandre, o Grande, espalhou a 'Paideia' grega, criando a ponte intelectual necessária para a universalização do Evangelho.\n\n" +
    "1. O Grego Koiné: Uma língua simplificada e dinâmica tornou-se acessível a escravos e filósofos, permitindo que o Novo Testamento fosse lido por todos.\n" +
    "2. A Septuaginta (LXX): A tradução do AT para o grego permitiu que os gentios conhecessem as profecias e o caráter do Deus de Israel antes de Cristo.\n" +
    "3. Estruturas Filosóficas: O pensamento grego forneceu categorias lógicas que os apóstolos usaram para explicar conceitos como o 'Logos' em João 1:1.\n" +
    "4. Sistema de Ensino: O modelo da academia e do ginásio influenciou a forma como as primeiras comunidades cristãs se organizavam para o ensino.\n" +
    "5. Cosmopolitismo: O ideal alexandrino de um cidadão do mundo preparou a mente humana para o conceito de uma fé que não distingue judeu de grego.\n" +
    "6. Arte e Estética: A valorização da forma influenciou a arquitetura cristã primitiva e a preservação dos manuscritos.\n" +
    "7. O Desafio Epistemológico: O encontro da fé judaica com o racionalismo grego forjou a Apologética cristã, como visto no Areópago com Paulo.\n" +
    "8. Ética Estóica e Epicureia: Paulo dialoga com estas correntes no Novo Testamento, contrastando-as com a ética superior do Reino de Deus.\n" +
    "9. Unificação de Mercados: A cultura helenista facilitou a circulação de livros e pergaminhos, essenciais para a formação do cânon bíblico.\n" +
    "10. O Conflito dos Macabeus: A resistência à helenização forçada preservou o monoteísmo puro que seria a base para o nascimento do Messias.\n" +
    "11. Individualismo: O foco no indivíduo na cultura grega facilitou o conceito de conversão e responsabilidade pessoal diante de Deus.\n" +
    "12. Bibliotecas da Antiguidade: Lugares como Alexandria tornaram-se centros de preservação do conhecimento sagrado em um ambiente intelectualizado.", 
    bibleRefs: ["JHN 19:20", "ACT 17:22-34", "1CO 1:22"] 
  }
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  { id: "e1", year: "2000 a.C.", title: "Abraão", category: "event", description: "Pai da fé sai de Ur.", refs: ["GN 12"] },
  { id: "e2", year: "1446 a.C.", title: "O Êxodo", category: "event", description: "Saída do Egito sob Moisés.", refs: ["EX 12"] },
  { id: "e3", year: "1010 a.C.", title: "Davi Rei", category: "event", description: "Auge da monarquia teocrática.", refs: ["2SM 5"] },
  { id: "e4", year: "586 a.C.", title: "Cativeiro", category: "event", description: "Destruição do 1º Templo.", refs: ["2RS 25"] },
  { id: "e5", year: "4 a.C.", title: "Cristo", category: "event", description: "O Verbo se faz carne.", refs: ["MT 1", "LC 2"] },
  { id: "e6", year: "33 d.C.", title: "Pentecostes", category: "event", description: "Descida do Espírito.", refs: ["AT 2"] },
  { id: "e7", year: "95 d.C.", title: "Apocalipse", category: "event", description: "João na ilha de Patmos.", refs: ["AP 1"] }
];

// ============================================================================================
// --- PILAR 3: LINGUÍSTICO (DICIONÁRIO LOGOS - DEZENAS DE TERMOS) ---
// ============================================================================================
export const LOGOS_DICTIONARY: DictionaryEntry[] = [
  { term: "Charis (Grego)", definition: "Graça: Favor imerecido, poder divino para agir.", usage: "Ef 2:8", keyRefs: ["EPH 2:8", "ROM 3:24"] },
  { term: "Hesed (Hebraico)", definition: "Misericórdia: Amor leal e fiel da aliança.", usage: "Sl 136", keyRefs: ["PSA 136", "EXO 34:6"] },
  { term: "Logos (Grego)", definition: "Palavra/Verbo: Razão divina e revelação encarnada.", usage: "Jo 1:1", keyRefs: ["JHN 1:1", "JHN 1:14"] },
  { term: "Shalom (Hebraico)", definition: "Paz: Plenitude, integridade, bem-estar total.", usage: "Nm 6:26", keyRefs: ["NUM 6:26", "ISA 9:6"] },
  { term: "Agapé (Grego)", definition: "Amor: Sacrifical, incondicional e volitivo.", usage: "1 Co 13", keyRefs: ["1CO 13", "1JN 4:8"] },
  { term: "Koinonia (Grego)", definition: "Comunhão: Participação mútua e parceria.", usage: "At 2:42", keyRefs: ["ACT 2:42", "1JN 1:3"] },
  { term: "Metanoia (Grego)", definition: "Arrependimento: Mudança de mente e direção.", usage: "Mc 1:15", keyRefs: ["MAR 1:15", "ACT 3:19"] },
  { term: "Hupomone (Grego)", definition: "Perseverança: Resistência sob pressão.", usage: "Tg 1:3", keyRefs: ["JAM 1:3", "ROM 5:3"] },
  { term: "Pneuma (Grego)", definition: "Espírito: Sopro, vento ou força vital divina.", usage: "Jo 3:8", keyRefs: ["JHN 3:8", "ACT 1:8"] },
  { term: "Doulos (Grego)", definition: "Escravo/Servo: Dedicação total por vontade própria.", usage: "Rm 1:1", keyRefs: ["ROM 1:1", "PHI 1:1"] },
  { term: "Qadosh (Hebraico)", definition: "Santo: Separado, consagrado, puro.", usage: "Lv 11:44", keyRefs: ["LEV 11:44", "ISA 6:3"] },
  { term: "Mishpat (Hebraico)", definition: "Justiça: Juízo reto e equidade social.", usage: "Am 5:24", keyRefs: ["AMO 5:24", "PSA 89:14"] },
  { term: "Parakletos (Grego)", definition: "Consolador: Aquele que é chamado para o lado.", usage: "Jo 14:16", keyRefs: ["JHN 14:16", "JHN 16:7"] },
  { term: "Ekklesia (Grego)", definition: "Igreja: Chamados para fora, assembleia.", usage: "Mt 16:18", keyRefs: ["MAT 16:18", "EPH 1:22"] },
  { term: "Kenosis (Grego)", definition: "Esvaziamento: Cristo abrindo mão de Sua glória.", usage: "Fp 2:7", keyRefs: ["PHI 2:7"] }
];

// ============================================================================================
// --- PILAR 4: TEOLÓGICO (DIFERENCIAIS DOCTRINÁRIOS - SISTEMÁTICA COMPLETA) ---
// ============================================================================================
export const THEOLOGICAL_TOPICS: TheologicalTopic[] = [
  { 
    id: "theo1", 
    title: "Bibliologia (Doutrina da Palavra)", 
    development: "A Bibliologia estabelece o fundamento jurídico e espiritual sobre o qual toda a fé cristã é construída, afirmando a autoridade suprema das Escrituras.\n\n" +
    "1. Inspiração Divina: A Bíblia é 'Theopneustos' (soprada por Deus), um processo onde o Espírito Santo guiou autores humanos sem anular suas personalidades.\n" +
    "2. Inerrância: Afirmamos que os manuscritos originais estão isentos de erro em tudo o que afirmam, seja em questões de fé, história ou ciência.\n" +
    "3. Infalibilidade: A Palavra de Deus nunca falha em seu propósito salvífico e em sua direção moral para a humanidade caída.\n" +
    "4. Autoridade Final: Sola Scriptura. A Bíblia é a regra de fé e prática superior a tradições, sentimentos ou filosofias humanas.\n" +
    "5. Suficiência: As Escrituras contêm tudo o que o homem necessita para a salvação, santificação e serviço fiel a Deus.\n" +
    "6. Cânon Sagrado: O reconhecimento dos 66 livros como inspirados foi um processo de discernimento da igreja sob a direção do Espírito Santo.\n" +
    "7. Preservação: Deus velou pela Sua Palavra através dos séculos, garantindo que a mensagem original chegasse intacta às nossas mãos hoje.\n" +
    "8. Clareza (Perspicuidade): A mensagem essencial da salvação é clara o suficiente para ser entendida até pelos mais simples, sob a iluminação do Espírito.\n" +
    "9. Unidade Orgânica: Apesar de ter sido escrita por 40 autores em 1600 anos, a Bíblia apresenta uma história única e coerente de redenção.\n" +
    "10. Revelação Progressiva: Deus se revelou em estágios, culminando plenamente na Pessoa e Obra de Jesus Cristo.\n" +
    "11. Eficácia: A Palavra é viva e eficaz (Hb 4:12), operando regeneração e transformação no coração do ouvinte crente.\n" +
    "12. Iluminação: A necessidade do Espírito Santo para que o leitor compreenda e aplique as verdades espirituais às realidades da vida.\n" +
    "13. Testemunho Interno: O Espírito Santo confirma no coração do crente que as Escrituras são, de fato, a voz de Deus.\n" +
    "14. Crítica Textual: O estudo científico dos manuscritos que confirma a confiabilidade extraordinária do texto bíblico em comparação a qualquer obra da antiguidade.\n" +
    "15. Hermenêutica: O princípio de que 'A Escritura interpreta a Escritura', evitando interpretações isoladas e fantasiosas.\n" +
    "16. Cristocentrismo: Todo o Cânon aponta para Cristo; o AT em promessa e o NT em cumprimento.\n" +
    "17. Necessidade: Sem a revelação escrita, o homem permaneceria em trevas sobre o caráter de Deus e o caminho do resgate.\n" +
    "18. Atemporalidade: A Palavra permanece para sempre, suas leis morais são imutáveis e relevantes para todas as culturas e épocas.\n" +
    "19. Diferença entre Logos e Rhema: A distinção entre a palavra escrita e a palavra aplicada vivamente pelo Espírito em situações específicas.\n" +
    "20. Consequências da Rejeição: Ignorar a Palavra leva ao relativismo moral, apostasia teológica e naufrágio espiritual pessoal e coletivo.", 
    systematic: "Revelação Geral (Natureza/Consciência) e Especial (Cristo/Escrituras).", 
    refs: ["2TI 3:16", "2PE 1:21", "PSA 119", "HEB 4:12"] 
  },
  { 
    id: "theo2", 
    title: "Cristologia (A Pessoa de Cristo)", 
    development: "A Cristologia é o coração da teologia sistemática, focando na natureza, ofícios e obra mediadora de Jesus Cristo, o Verbo encarnado.\n\n" +
    "1. Divindade Ontológica: Jesus não é apenas um mestre moral, mas Deus em essência, co-eterno e co-igual ao Pai em glória e majestade.\n" +
    "2. Humanidade Real: Na encarnação, Ele assumiu uma natureza humana completa (corpo, alma e espírito), sujeitando-se às limitações humanas sem pecado.\n" +
    "3. União Hipostática: O mistério de duas naturezas perfeitas e distintas unidas inseparavelmente em uma única Pessoa divina.\n" +
    "4. Nascimento Virginal: A intervenção sobrenatural que permitiu a encarnação sem a transmissão da semente corrompida de Adão.\n" +
    "5. Pré-existência: Cristo existia antes da fundação do mundo; Ele é o Criador de todas as coisas e o sustentador do universo.\n" +
    "6. Ofício de Profeta: Ele é a revelação final de Deus ao homem, trazendo a mensagem completa da verdade celestial.\n" +
    "7. Ofício de Sacerdote: Ele ofereceu o sacrifício perfeito (Si mesmo) e intercede continuamente por Seu povo diante do Pai.\n" +
    "8. Ofício de Rei: Ele governa sobre a Igreja agora e governará sobre as nações no Seu Reino milenar e eterno.\n" +
    "9. Vida Impecável: Sua obediência ativa à lei de Deus o qualificou como o Cordeiro sem mancha para morrer por nossos pecados.\n" +
    "10. Expiação Substitutiva: Na cruz, Ele recebeu o juízo que nós merecíamos, operando a propiciação da ira divina contra o pecado.\n" +
    "11. Ressurreição Corpórea: O selo de aprovação do Pai sobre Sua obra e a garantia da nossa futura ressurreição e glorificação.\n" +
    "12. Ascensão e Exaltação: Cristo retornou ao trono da glória, recebendo o Nome que está acima de todo nome.\n" +
    "13. Mediação Exclusiva: Só há um mediador entre Deus e os homens, Jesus Cristo, o homem que é Deus (1 Tm 2:5).\n" +
    "14. Senhorio de Cristo: A exigência de submissão total da vida individual e coletiva à vontade do Rei Jesus.\n" +
    "15. O Messias do AT: O cumprimento exato de centenas de profecias específicas que identificam Sua identidade e missão.\n" +
    "16. A Kenosis: O esvaziamento voluntário de Sua glória visível para assumir a forma de servo em favor da humanidade.\n" +
    "17. Imutabilidade: Jesus Cristo é o mesmo ontem, hoje e o será para sempre (Hb 13:8).\n" +
    "18. Segunda Vinda: A promessa de Seu retorno visível e glorioso para julgar os vivos e mortos e consumar o Reino.\n" +
    "19. Cabeça da Igreja: Ele é a autoridade suprema e a fonte de vida de onde flui todo o crescimento do Corpo.\n" +
    "20. Adoração a Cristo: Como Deus, Ele é o objeto legítimo de adoração cristã, recebendo louvor de anjos e homens por toda a eternidade.", 
    systematic: "União Hipostática: Verdadeiramente Deus e Verdadeiramente Homem.", 
    refs: ["JHN 1:1", "PHI 2:5-11", "COL 1:15-20", "HEB 1:1-8"] 
  },
  { 
    id: "theo7", 
    title: "Soteriologia (Doutrina da Salvação)", 
    development: "A Soteriologia descreve o 'Ordo Salutis' (Ordem da Salvação), o processo pelo qual a graça divina alcança o pecador e o restaura à comunhão eterna.\n\n" +
    "1. Depravação Total: O homem, após a queda, é incapaz de buscar a Deus ou cooperar com a sua própria salvação por suas forças naturais.\n" +
    "2. Eleição Incondicional: Deus, antes da fundação do mundo, escolheu para Si um povo, baseado meramente em Sua vontade soberana e amor.\n" +
    "3. Expiação Limitada (Particular): A eficácia da morte de Cristo é aplicada especificamente aos eleitos, garantindo sua redenção plena.\n" +
    "4. Graça Irresistível: O chamado eficaz do Espírito Santo que remove a resistência do coração humano, levando-o à fé salvadora.\n" +
    "5. Perseverança dos Santos: Aqueles que são verdadeiramente salvos são guardados pelo poder de Deus até o fim da jornada.\n" +
    "6. Regeneração: O ato monergista do Espírito Santo que concede nova vida espiritual, o 'novo nascimento'.\n" +
    "7. Conversão (Arrependimento e Fé): A resposta humana ao chamado divino, consistindo em abandonar o pecado e confiar apenas em Cristo.\n" +
    "8. Justificação: O ato jurídico de Deus declarando o pecador justo, com base na imputação da justiça de Cristo à conta do crente.\n" +
    "9. Adoção: O privilégio legal de ser recebido na família de Deus, tornando-se co-herdeiro com Cristo e tendo acesso ao Pai.\n" +
    "10. Santificação Posicional: A separação imediata do crente para Deus no momento da salvação.\n" +
    "11. Santificação Progressiva: O processo contínuo de crescimento em santidade e conformidade à imagem de Jesus pelo Espírito.\n" +
    "12. Glorificação: A etapa final e eterna onde o crente é livre da presença do pecado e recebe um corpo imortal.\n" +
    "13. União com Cristo: A realidade mística e legal onde o crente é inserido em Cristo, compartilhando Seus benefícios redentores.\n" +
    "14. Segurança da Salvação: A certeza bíblica fundamentada na promessa de Deus e não nas flutuações das emoções humanas.\n" +
    "15. Obras como Fruto: A salvação é apenas pela fé, mas a fé que salva nunca está sozinha, produzindo frutos de justiça.\n" +
    "16. Remissão de Pecados: O apagamento total da dívida moral diante de Deus através do sangue derramado na cruz.\n" +
    "17. Reconciliação: A restauração da paz entre Deus e o homem, removendo a inimizade causada pela transgressão.\n" +
    "18. Resgate (Redenção): O pagamento do preço necessário para libertar o pecador da escravidão de Satanás e da morte.\n" +
    "19. Propiciação: A satisfação da justiça divina que aplaca a ira santa contra a rebelião humana.\n" +
    "20. Universalidade do Convite: O mandamento de pregar o Evangelho a toda criatura, sabendo que Deus opera através dos meios.", 
    systematic: "Justificação, Adoção e Santificação pela Sola Fide.", 
    refs: ["EPH 2:8", "ROM 5:1", "ROM 8:29-30", "TIT 3:5"] 
  },
  { 
    id: "theo9", 
    title: "Escatologia (As Últimas Coisas)", 
    development: "A Escatologia não é apenas sobre o futuro, mas sobre a consumação do plano de Deus para a criação, a redenção e o governo final do Reino.\n\n" +
    "1. O Estado Intermediário: O que acontece imediatamente após a morte: o crente vai para a presença de Cristo (Paraíso/Céu) e o incrédulo para o Hades.\n" +
    "2. Sinais dos Tempos: Eventos que precedem a vinda de Cristo, como apostasia, guerras, pestes e a pregação do Evangelho às nações.\n" +
    "3. O Arrebatamento da Igreja: O momento em que Cristo buscará Sua Noiva, tirando-a da terra antes ou durante os juízos finais.\n" +
    "4. A Grande Tribulação: Um período de juízo divino sem precedentes sobre a terra sob o domínio do Anticristo.\n" +
    "5. O Anticristo e o Falso Profeta: Personagens escatológicos que liderarão a rebelião final contra o Messias e Seus santos.\n" +
    "6. A Segunda Vinda (Parousia): O retorno visível, corpóreo e glorioso de Jesus para destruir o mal e estabelecer Seu Reino.\n" +
    "7. O Tribunal de Cristo (Bema): Onde os crentes serão recompensados por suas obras realizadas na fé (não para salvação).\n" +
    "8. O Milênio: O reinado de mil anos de Cristo sobre a terra, cumprindo as promessas literais feitas a Israel.\n" +
    "9. A Revolta Final: A soltura de Satanás após o milênio e sua derrota definitiva no lago de fogo.\n" +
    "10. O Juízo do Grande Trono Branco: O julgamento final de todos os mortos não salvos de todas as eras.\n" +
    "11. A Ressurreição dos Mortos: Todos receberão corpos imortais, uns para a glória eterna e outros para o castigo eterno.\n" +
    "12. Novo Céu e Nova Terra: A restauração total da criação, livre da maldição do pecado e da morte.\n" +
    "13. A Nova Jerusalém: A cidade celestial, morada eterna de Deus com Seu povo redimido.\n" +
    "14. Inferno (Lago de Fogo): A realidade eterna da separação de Deus e do sofrimento justo para aqueles que rejeitaram a graça.\n" +
    "15. O Banquete das Bodas do Cordeiro: A celebração da união eterna entre Cristo e Sua Igreja.\n" +
    "16. A Restauração de Israel: O papel escatológico do povo judeu e seu reconhecimento coletivo de Jesus como o Messias.\n" +
    "17. Fim da Morte e do Choro: A promessa consoladora de que as consequências da queda serão totalmente eliminadas.\n" +
    "18. A Glória de Deus como Luz: No estado eterno, a presença de Deus iluminará tudo, não havendo mais necessidade de sol ou lua.\n" +
    "19. Governo com Cristo: O privilégio dos santos de participarem da administração do Reino eterno.\n" +
    "20. Maranata: A atitude de vigilância e anseio da Igreja pela vinda de seu Senhor.", 
    systematic: "Parousia, Milênio e Estado Eterno Glorificado.", 
    refs: ["MAT 24", "1TH 4", "REV 20-22", "1CO 15"] 
  }
];

// ============================================================================================
// --- PILAR 5: ENSINO (ESBOÇOS HOMILÉTICOS COMPLETOS) ---
// ============================================================================================
export const SERMON_OUTLINES: SermonOutline[] = [
  { 
    id: "out1", 
    title: "A Suficiência da Palavra (Salmo 119:105)", 
    keyVerse: "PSA 119:105", 
    points: [
      { 
        title: "A Lâmpada para os Pés (Orientação Imediata)", 
        explanation: "O salmista utiliza a metáfora da 'lâmpada' para descrever a função prática da Bíblia na vida diária. Em uma época onde as lâmpadas eram pequenos vasos de óleo que iluminavam apenas o próximo passo, a Palavra de Deus se revela como o guia para as decisões de curto prazo.\n\n" +
        "Esta orientação imediata nos protege de tropeços morais e armadilhas sutis do inimigo no 'agora'. Deus não nos dá um mapa completo de 20 anos, mas nos dá a luz necessária para o passo que devemos dar hoje, exigindo de nós uma dependência contínua e um caminhar passo a passo em Sua presença.\n\n" +
        "A aplicação deste conceito implica que devemos consultar as Escrituras antes de cada movimento significativo, permitindo que a ética bíblica filtre nossos impulsos e reações imediatas.", 
        ref: "v. 105a" 
      },
      { 
        title: "A Luz para o Caminho (Visão de Destino)", 
        explanation: "Enquanto a lâmpada foca no passo presente, a 'luz' representa a iluminação do horizonte, o destino final do cristão. A Palavra de Deus nos oferece uma cosmovisão que explica de onde viemos, por que estamos aqui e para onde vamos.\n\n" +
        "Sem esta luz panorâmica, o caminhante se sente perdido no vazio existencial. As Escrituras lançam brilho sobre o propósito eterno de Deus, permitindo que o crente veja além das névoas das circunstâncias temporais e mantenha o foco no Reino de Deus e em Sua justiça.\n\n" +
        "A luz para o caminho nos dá esperança nas tempestades, pois sabemos que a estrada pela qual seguimos foi traçada pelo Arquiteto do universo, e que ela termina na glória eterna.", 
        ref: "v. 105b" 
      },
      { 
        title: "A Autoridade da Luz contra as Trevas", 
        explanation: "Onde a Palavra brilha, as trevas do engano teológico e da confusão moral são dissipadas. A luz não apenas guia, ela também revela o que estava oculto. Ela expõe o pecado em nosso coração e a falsidade nas ideologias do mundo.\n\n" +
        "A suficiência da Palavra significa que não precisamos de 'luzes auxiliares' de filosofias vãs ou revelações extra-bíblicas para nossa caminhada de santificação. O Cânon está completo e sua luz é plena.\n\n" +
        "Caminhar na luz da Palavra exige honestidade espiritual para aceitar o que ela revela sobre nós, submetendo nossa vontade à claridade absoluta de Deus.", 
        ref: "JHN 8:12" 
      }
    ], 
    applications: { 
      general: "Desenvolva o hábito da leitura diária sistemática. Não espere a crise para acender a lâmpada. A Palavra deve ser o primeiro filtro para todas as suas decisões, desde as financeiras até as relacionais.\n\n" +
      "1. Estabeleça um horário fixo de leitura para que a lâmpada nunca fique sem óleo.\n" +
      "2. Memorize versículos-chave para situações de emergência espiritual.\n" +
      "3. Deixe que a luz da Bíblia confronte sua cultura, em vez de deixar sua cultura apagar a Bíblia.\n" +
      "4. Ensine seus filhos a usarem a própria lâmpada, preparando a próxima geração.\n" +
      "5. Valorize a pregação expositiva como a amplificação da luz para a comunidade local." 
    }, 
    questions: [
      "Como a Bíblia mudou sua decisão mais recente nesta semana?", 
      "Quais 'áreas de trevas' em sua vida você ainda tem medo de expor à luz da Palavra?",
      "Você tem buscado orientações em 'luzes artificiais' (filosofias, horóscopos, opinião pública) em vez das Escrituras?",
      "O seu caminho parece escuro porque você esqueceu de acender a lâmpada?",
      "Qual a diferença entre conhecer a Bíblia e caminhar pela Bíblia?"
    ] 
  },
  { 
    id: "out5", 
    title: "A Armadura de Deus (Efésios 6:10-18)", 
    keyVerse: "EPH 6:11", 
    points: [
      { 
        title: "O Cinto da Verdade (Integridade como Base)", 
        explanation: "O cinto romano ('balteus') não era apenas um acessório, mas o suporte que mantinha toda a armadura e a túnica no lugar, permitindo agilidade no combate. Espiritualmente, a Verdade (integridade e sã doutrina) é o que sustenta o caráter do cristão.\n\n" +
        "Sem a verdade prática de uma vida honesta e a verdade teológica de uma fé bíblica, as outras peças da armadura perdem sua eficácia. A mentira cria frestas onde o inimigo insere suas setas.\n\n" +
        "Estar cingido com a verdade significa que o crente não tem nada a esconder; sua vida é transparente diante de Deus e dos homens, proporcionando a liberdade necessária para lutar sem medo de ser desmascarado.", 
        ref: "v. 14a" 
      },
      { 
        title: "A Couraça da Justiça (Proteção do Coração)", 
        explanation: "A couraça protegia os órgãos vitais, especialmente o coração e os pulmões. Na batalha espiritual, somos protegidos pela Justiça de Cristo (imputada na justificação) e pela nossa prática de justiça (santificação).\n\n" +
        "Quando Satanás, o acusador, ataca nossas emoções e consciência, a couraça da justiça nos lembra que estamos firmados no sacrifício perfeito de Jesus, e não em nossos méritos. Ao mesmo tempo, uma vida de justiça prática evita que o remorso ou a culpa real abram brechas em nossa proteção.\n\n" +
        "Manter a couraça polida exige vigilância sobre as afeições e motivações profundas, garantindo que o coração permaneça guardado para Deus.", 
        ref: "v. 14b" 
      },
      { 
        title: "O Escudo da Fé (Defesa contra o Mal)", 
        explanation: "O escudo romano ('scutum') era grande e capaz de cobrir o soldado por inteiro, muitas vezes molhado para apagar setas incendiárias. O escudo da fé é a confiança inabalável nas promessas e na Pessoa de Deus.\n\n" +
        "Os 'dardos inflamados do maligno' são dúvidas, medos e tentações súbitas que buscam incendiar a alma com ansiedade ou pecado. A fé age como o bloqueio que intercepta esses ataques antes que eles atinjam o interior.\n\n" +
        "Fé aqui não é um sentimento, mas uma decisão de crer no que Deus disse, mesmo quando as circunstâncias dizem o contrário. É o levantamento da Palavra como barreira protetora contra o ceticismo mundano.", 
        ref: "v. 16" 
      }
    ], 
    applications: { 
      general: "Entenda que a guerra é espiritual, não carnal. Não lute contra pessoas; lute contra as potestades através da oração e da palavra. Revista-se conscientemente todas as manhãs.\n\n" +
      "1. Identifique em qual peça da armadura você tem falhado mais ultimamente.\n" +
      "2. Use a oração no Espírito (v.18) como o combustível que ativa cada arma.\n" +
      "3. Busque a companhia de outros soldados (igreja), pois os escudos romanos eram feitos para se unirem em formação de tartaruga.\n" +
      "4. Estude a 'Espada do Espírito' para saber como contra-atacar o erro com a verdade específica.\n" +
      "5. Lembre-se que a armadura não tem proteção para as costas; o cristão nunca deve fugir da batalha." 
    }, 
    questions: [
      "Qual dardo do inimigo mais tem atingido você ultimamente?", 
      "Você está tentando lutar com suas próprias armas em vez da armadura de Deus?",
      "Sua vida de oração é o fecho que une toda a sua armadura ou é apenas um apêndice?",
      "Como o Capacete da Salvação protege sua mente de pensamentos de derrota?",
      "Você conhece a Bíblia bem o suficiente para usá-la como espada defensiva e ofensiva?"
    ] 
  }
];

// ============================================================================================
// --- PILAR 6: DEVOCIONAL (MEDITAÇÕES E CLAMORES) ---
// ============================================================================================
/**
 * Adicionado para resolver erro de exportação em LogosHub.tsx
 */
export const DEVOTIONALS: DevotionalReflection[] = [
  { 
    id: "dev1", 
    title: "A Doce Meditação", 
    content: "O prazer de um crente na Palavra é o termômetro de sua saúde espiritual. Meditar não é apenas ler, mas digerir a verdade até que ela se torne parte do nosso ser.", 
    prayer: "Senhor, que a Tua Palavra seja mais doce que o mel ao meu paladar.", 
    ref: "PSA 119:103" 
  },
  { 
    id: "dev2", 
    title: "A Esperança no Vale", 
    content: "Mesmo quando o caminho é cercado por sombras, a luz da Palavra é suficiente para o próximo passo. Deus não nos abandona na escuridão.", 
    prayer: "Pai, ensina-me a confiar no Teu cajado mesmo quando não vejo o fim do vale.", 
    ref: "PSA 23:4" 
  }
];

/**
 * Adicionado para resolver erro de exportação em LogosHub.tsx
 */
export const THEMATIC_PRAYERS: ThematicPrayer[] = [
  { id: "pr1", theme: "Sabedoria", title: "Clamor por Discernimento", content: "Dá-me, Senhor, sabedoria para lidar com as decisões deste dia conforme a Tua Lei.", baseRef: "JAM 1:5" },
  { id: "pr2", theme: "Santidade", title: "Clamor por Pureza", content: "Purifica o meu coração de ídolos ocultos e firma os meus passos na Tua retidão.", baseRef: "PSA 51:10" }
];

// ============================================================================================
// --- EXTRAS PARA INTEGRIDADE DE INTERFACE ---
// ============================================================================================
export const COMMON_ERRORS: CommonError[] = [
  { id: "err1", mistake: "Anacronismo teológico", correction: "Analise o texto dentro de sua própria dispensação antes de aplicar a realidade da Graça.", context: "Hermenêutica", ref: "2TI 2:15" },
  { id: "err2", mistake: "Individualismo exegético", correction: "Nenhuma profecia é de particular interpretação; busque a analogia da fé.", context: "Fundamentos", ref: "2PE 1:20" }
];

export const NT_OT_CONNECTIONS: NT_OT_Connection[] = [
  { id: "conn1", ot_shadow: "O Cordeiro Pascal", nt_fulfillment: "Cristo, nossa Páscoa", type: "typology", description: "O sangue nos umbrais que livra da morte." },
  { id: "conn2", ot_shadow: "O Maná no Deserto", nt_fulfillment: "O Pão da Vida", type: "typology", description: "O sustento sobrenatural que desce do céu." }
];

export const BIBLICAL_PROFILES: BiblicalProfile[] = [
  { id: "prof1", name: "Enoque", strengths: ["Andou com Deus", "Fé inabalável"], failures: [], mainLessons: "A comunhão íntima rompe a barreira da morte.", appearances: ["GN 5", "HEB 11"] },
  { id: "prof2", name: "Gideão", strengths: ["Obediência estratégica"], failures: ["Dúvida inicial", "Efode de ouro"], mainLessons: "Deus usa o menor para confundir os fortes.", appearances: ["JDG 6-8"] }
];

export const INTERTESTAMENTAL_CONTEXT: IntertestamentalContext[] = [
  { id: "it1", title: "A Revolta dos Macabeus", group: "event", description: "A resistência judaica contra a helenização forçada de Antíoco Epifânio.", impact: "Preservou a identidade monoteísta e purificou o Templo." }
];

export const DISPENSATIONS_DETAILED: DetailedDispensation[] = [];
