
import { Verse, Dispensation, StrongEntry, CommentaryAuthor, Commentary, MapData, SpecialStudy } from './types';
import { PENTATEUCO_SEED } from './data/bible_pentateuco';
import { HISTORICOS_SEED } from './data/bible_historicos';
import { POETICOS_SEED } from './data/bible_poeticos';
import { PROFETAS_MAIORES_SEED } from './data/bible_profetas_maiores';
import { PROFETAS_MENORES_SEED } from './data/bible_profetas_menores';
import { EVANGELHOS_SEED } from './data/bible_evangelhos';
import { HISTORICO_NT_SEED } from './data/bible_historico_nt';
import { EPISTOLAS_SEED } from './data/bible_epistolas';
import { APOCALIPSE_SEED } from './data/bible_apocalipse';
import { EXPANDED_TOPICAL_BIBLE } from './data/topical_index';

export const INITIAL_SEED: Verse[] = [
  ...PENTATEUCO_SEED,
  ...HISTORICOS_SEED,
  ...POETICOS_SEED,
  ...PROFETAS_MAIORES_SEED,
  ...PROFETAS_MENORES_SEED,
  ...EVANGELHOS_SEED,
  ...HISTORICO_NT_SEED,
  ...EPISTOLAS_SEED,
  ...APOCALIPSE_SEED
];

export const TOPICAL_BIBLE = EXPANDED_TOPICAL_BIBLE;

export const DISPENSATIONS_DATA: Dispensation[] = [
  { 
    id: "d1", 
    title: "Inocência", 
    period: "Gênesis 1:26 – 3:24", 
    duration: "Indeterminada", 
    color: "#10b981", 
    startText: "Criação de Adão", 
    startRef: "GEN 1:26", 
    endText: "A Queda", 
    endRef: "GEN 3:24", 
    description: "Estado de perfeição original antes da entrada do pecado no mundo.", 
    responsibility: "Manter a comunhão com Deus e não comer da Árvore do Conhecimento.",
    humanFailure: "Desobediência motivada pela incredulidade e orgulho (comer do fruto).",
    divineJudgment: "Morte espiritual imediata, maldição da terra e expulsão do Éden.",
    divineGrace: "Promessa do Protoevangelho (Gn 3:15) e provisão das túnicas de peles.",
    transition: "Transição do estado de perfeição para o estado de pecado e morte.",
    keyTexts: ["Gn 1:26-28", "Gn 2:15-17", "Gn 3:1-15"],
    promisesLink: "Promessa da Semente da Mulher que esmagaria a cabeça da serpente.",
    covenantsLink: "Aliança Edênica: Mandato de domínio e preservação da vida.",
    todayLessons: "Ensina sobre a soberania de Deus e a seriedade da desobediência mínima.",
    interpretationErrors: "Achar que Adão era 'divino' ou que o pecado foi sexual.",
    howToNotConfuse: "Não confunda com a Era do Reino; aqui a perfeição era provisória sob teste.",
    events: [
      { title: "Criação Ex-Nihilo", ref: "GEN 1:1", description: "O início da matéria e do tempo por decreto divino." },
      { title: "Antropogênese", ref: "GEN 1:27", description: "O homem criado como Imago Dei (Imagem de Deus)." },
      { title: "Sábado da Criação", ref: "GEN 2:2", description: "O descanso sagrado como memorial da atividade criativa." },
      { title: "O Jardim do Éden", ref: "GEN 2:8", description: "A habitação perfeita preparada por Deus para o homem." },
      { title: "Instituição do Matrimônio", ref: "GEN 2:22", description: "A primeira união sagrada e base da sociedade humana." },
      { title: "A Prova do Conhecimento", ref: "GEN 2:17", description: "O estabelecimento do limite moral através da árvore proibida." },
      { title: "A Queda", ref: "GEN 3:6", description: "A entrada do pecado e da morte na experiência humana." }
    ] 
  },
  { 
    id: "d2", 
    title: "Consciência", 
    period: "Gênesis 3:23 – 8:14", 
    duration: "1656 anos", 
    color: "#f59e0b", 
    startText: "Expulsão do Éden", 
    startRef: "GEN 3:23", 
    endText: "O Dilúvio", 
    endRef: "GEN 7:11", 
    description: "Governo pela bússola moral interna após o conhecimento do bem e do mal.", 
    responsibility: "Fazer o bem conforme guiado pela consciência e oferecer sacrifícios de sangue.",
    humanFailure: "Malícia generalizada, violência extrema e corrupção total da carne.",
    divineJudgment: "O Dilúvio Universal que exterminou a civilização antediluviana.",
    divineGrace: "Preservação da semente messiânica através de Noé e sua família na Arca.",
    transition: "Fim do governo puramente individual para o início da responsabilidade civil delegada.",
    keyTexts: ["Gn 4:7", "Gn 6:5-13", "1 Pe 3:20"],
    promisesLink: "Preservação da linhagem de Sete (Semente da Promessa).",
    covenantsLink: "Aliança Adâmica (pós-queda): Esperança na redenção em meio ao labor.",
    todayLessons: "A consciência sozinha não salva; ela serve para nos mostrar a necessidade de Cristo.",
    interpretationErrors: "Achar que os homens eram salvos por 'seguir seu coração'.",
    howToNotConfuse: "Não confunda com o Governo Humano; aqui não havia magistratura ou pena capital civil.",
    events: [
      { title: "A Primeira Oferta", ref: "GEN 4:4", description: "Caim e Abel: o contraste entre a religião de obras e a fé do sacrifício." },
      { title: "O Primeiro Homicídio", ref: "GEN 4:8", description: "A evidência da degradação rápida da natureza humana caída." },
      { title: "Linhagem de Sete", ref: "GEN 4:26", description: "O início da invocação pública do nome do Senhor." },
      { title: "Arrebatamento de Enoque", ref: "GEN 5:24", description: "Um sinal profético de que a morte não teria a última palavra." },
      { title: "Gigantes (Nephilim)", ref: "GEN 6:4", description: "A invasão angélica e a corrupção genética da raça humana." },
      { title: "Construção da Arca", ref: "GEN 6:14", description: "Cento e vinte anos de pregação e preparação para o juízo." },
      { title: "O Dilúvio Universal", ref: "GEN 7:11", description: "O juízo total das águas sobre a civilização rebelde." }
    ] 
  },
  { 
    id: "d3", 
    title: "Governo Humano", 
    period: "Gênesis 8:15 – 11:9", 
    duration: "427 anos", 
    color: "#3b82f6", 
    startText: "Saída da Arca", 
    startRef: "GEN 9:1", 
    endText: "Babel", 
    endRef: "GEN 11:9", 
    description: "Responsabilidade civil delegada para conter a violência na terra através da autoridade pública.", 
    responsibility: "Povoar a terra, governar com justiça e aplicar a pena capital.",
    humanFailure: "Concentração ilícita de poder e rebelião humanista para não se espalharem.",
    divineJudgment: "Confusão das línguas em Babel e dispersão forçada das nações.",
    divineGrace: "Promessa de estabilidade planetária e o Arco-íris como sinal de paciência divina.",
    transition: "Da humanidade genérica para o chamado de um povo específico por meio de Abraão.",
    keyTexts: ["Gn 9:1-7", "Gn 10:8-10", "Gn 11:1-9"],
    promisesLink: "Preservação da raça humana para que o Messias pudesse nascer.",
    covenantsLink: "Aliança Noética: Instituição do governo e segurança da biosfera.",
    todayLessons: "O governo é uma instituição divina, mas quando se torna autônomo, vira um ídolo.",
    interpretationErrors: "Confundir pena capital bíblica com vingança social ou desgoverno.",
    howToNotConfuse: "Não confunda com a era da Promessa; aqui o foco é a organização das nações.",
    events: [
      { title: "Aliança do Arco-Íris", ref: "GEN 9:12", description: "Garantia divina de que a terra não será mais destruída por águas." },
      { title: "Lei da Pena Capital", ref: "GEN 9:6", description: "O estabelecimento da santidade da vida através da justiça civil." },
      { title: "Império de Nimrode", ref: "GEN 10:8", description: "O surgimento do primeiro tirano global e sistema religioso falso." },
      { title: "A Torre de Babel", ref: "GEN 11:4", description: "A tentativa humanista de alcançar o céu sem Deus e por esforços próprios." },
      { title: "Confusão das Línguas", ref: "GEN 11:7", description: "O milagre do juízo que gerou a diversidade linguística e étnica." },
      { title: "O Povoamento da Terra", ref: "GEN 10", description: "A dispersão das famílias de Noé pelas três grandes linhagens (Sem, Cam e Jafé)." },
      { title: "A Vida de Jó", ref: "JOB 1:1", description: "Acredita-se que Jó viveu neste período de transição patriarcal." }
    ] 
  },
  { 
    id: "d4", 
    title: "Promessa", 
    period: "Gênesis 12:1 – Êxodo 18:27", 
    duration: "430 anos", 
    color: "#8b5cf6", 
    startText: "Chamado de Abraão", 
    startRef: "GEN 12:1", 
    endText: "Entrega da Lei", 
    endRef: "EXO 19:1", 
    description: "Deus escolhe uma família para ser o canal exclusivo de bênção para todas as nações.", 
    responsibility: "Crer em Deus e habitar na terra prometida (Canaã) aguardando o Messias.",
    humanFailure: "Incredulidade persistente, ida ao Egito por medo da fome e impaciência com a promessa.",
    divineJudgment: "Escravidão no Egito por 400 anos para purificação da linhagem.",
    divineGrace: "O Êxodo sobrenatural, o maná no deserto e a vitória sobre Faraó.",
    transition: "De um grupo familiar (tribos) para uma nação teocrática sob lei escrita.",
    keyTexts: ["Gn 12:1-3", "Gn 15:6", "Gl 3:16-18"],
    promisesLink: "Terra, descendência inumerável e bênção universal pelo Messias.",
    covenantsLink: "Aliança Abrâmica: Pacto incondicional que sustenta toda a história bíblica.",
    todayLessons: "A salvação sempre foi pela fé. A Promessa antecede e é superior à Lei.",
    interpretationErrors: "Achar que a terra de Israel era um prêmio e não uma promessa soberana.",
    howToNotConfuse: "Não confunda com a Lei; a Lei foi dada 430 anos depois para outro propósito.",
    events: [
      { title: "O Chamado de Abraão", ref: "GEN 12:1", description: "A ordem de deixar o paganismo de Ur para seguir a Deus em fé." },
      { title: "Encontro com Melquisedeque", ref: "GEN 14:18", description: "O reconhecimento do sacerdócio eterno que prefigura o Messias." },
      { title: "O Sacrifício de Isaque", ref: "GEN 22:2", description: "A maior prova de fé e a mais clara imagem do Calvário no AT." },
      { title: "Luta de Jacó com Deus", ref: "GEN 32:24", description: "A transformação de um enganador em Israel (Príncipe com Deus)." },
      { title: "José no Egito", ref: "GEN 41:40", description: "A providência divina preservando a família da promessa da fome total." },
      { title: "A Sarça Ardente", ref: "EXO 3:2", description: "O chamado de Moisés e a revelação do nome YAHWEH." },
      { title: "A Primeira Páscoa", ref: "EXO 12:13", description: "A redenção pelo sangue do cordeiro antes da saída do Egito." },
      { title: "A Travessia do Mar Vermelho", ref: "EXO 14:21", description: "A libertação final do domínio gentílico pela mão forte de Deus." }
    ] 
  },
  { 
    id: "d5", 
    title: "Lei", 
    period: "Êxodo 19:1 – Atos 1:26", 
    duration: "1524 anos", 
    color: "#ef4444", 
    startText: "Monte Sinai", 
    startRef: "EXO 20:1", 
    endText: "Pentecostes", 
    endRef: "ACT 2:1", 
    description: "Israel é provado sob a santidade da Lei para evidenciar a impossibilidade humana de atingir a perfeição.", 
    responsibility: "Obediência perfeita aos 613 mandamentos para manter a comunhão e a posse da terra.",
    humanFailure: "Idolatria crônica, legalismo hipócrita e, por fim, a rejeição e crucificação do Messias.",
    divineJudgment: "Exílios (Assírio e Babilônico) e a destruição final de Jerusalém em 70 d.C.",
    divineGrace: "A vinda do Filho de Deus em carne e a provisão do sacrifício que a lei apenas prefigurava.",
    transition: "Da sombra (Lei/Templo) para a realidade (Cristo/Igreja) e a habitação do Espírito.",
    keyTexts: ["Ex 19:5", "Mt 5:17", "Gl 3:24"],
    promisesLink: "Cumprimento das profecias messiânicas específicas.",
    covenantsLink: "Aliança Mosaica (Condicional), Davídica (Trono) e a Nova Aliança iniciada na Ceia.",
    todayLessons: "Ninguém se justifica por obras. A lei serve para calar a boca do orgulho humano.",
    interpretationErrors: "Tentar mesclar ritos levíticos (guarda de sábado, dietas) com a liberdade em Cristo.",
    howToNotConfuse: "Diferente da Graça; aqui a bênção era dependente do 'fazer' para 'receber'.",
    events: [
      { title: "Entrega do Decálogo", ref: "EXO 20:1", description: "A revelação do padrão moral absoluto no Monte Sinai." },
      { title: "O Tabernáculo", ref: "EXO 25:8", description: "Deus habitando no meio do povo através de um sistema de sacrifícios." },
      { title: "A Queda de Jericó", ref: "JOS 6:20", description: "A entrada triunfal na terra sob o governo da teocracia militar." },
      { title: "Reinado de Davi", ref: "2SA 7:12", description: "O auge da monarquia e a promessa de um sucessor eterno." },
      { title: "Dedicação do Templo", ref: "1KI 8:10", description: "A Glória Shekinah enchendo o Templo construído por Salomão." },
      { title: "O Cativeiro Babilônico", ref: "2KI 25:8", description: "O juízo severo pela idolatria e a perda temporária da terra." },
      { title: "O Ministério de João Batista", ref: "MAT 3:1", description: "A voz no deserto preparando o caminho para o Rei." },
      { title: "A Morte e Ressurreição de Cristo", ref: "LUK 23:33", description: "O cumprimento cabal das exigências da lei e o véu rasgado." }
    ] 
  },
  { 
    id: "d6", 
    title: "Graça", 
    period: "Atos 2:1 – Arrebatamento", 
    duration: "~2000 anos", 
    color: "#ec4899", 
    startText: "Pentecostes", 
    startRef: "ACT 2:1", 
    endText: "Arrebatamento", 
    endRef: "1TH 4:17", 
    description: "A era do Mistério da Igreja. O homem é provado pela aceitação da obra consumada de Cristo.", 
    responsibility: "Crer em Jesus Cristo e andar pelo poder do Espírito Santo em santidade.",
    humanFailure: "Rejeição generalizada do evangelho e apostasia nos últimos dias (mornidão).",
    divineJudgment: "A Grande Tribulação (Juízo sobre as nações que rejeitaram o Cordeiro).",
    divineGrace: "Justificação gratuita, perdão total, habitação do Espírito e o sacerdócio de todos os crentes.",
    transition: "Do 'tempo dos gentios' para a restauração teocrática literal de Israel.",
    keyTexts: ["Jo 1:17", "Ef 2:8-10", "Rm 6:14"],
    promisesLink: "O Arrebatamento, a recepção do corpo glorificado e o Tribunal de Cristo.",
    covenantsLink: "A Nova Aliança plena: Selada no sangue de Cristo para a remissão de pecados.",
    todayLessons: "Tudo é pela fé, mas a fé sem obras (fruto do Espírito) é morta.",
    interpretationErrors: "Antinomianismo (achar que a graça é licença para pecar).",
    howToNotConfuse: "Diferente do Reino; aqui a Igreja é peregrina, sofredora e testificadora, não governante da terra.",
    events: [
      { title: "Descida do Espírito Santo", ref: "ACT 2:1", description: "O nascimento do Corpo de Cristo e o início da dispensação." },
      { title: "Martírio de Estevão", ref: "ACT 7:59", description: "O início da perseguição que espalhou o evangelho pelo mundo." },
      { title: "Conversão de Saulo", ref: "ACT 9:4", description: "O chamado do Apóstolo dos Gentios para revelar o mistério da Igreja." },
      { title: "Concílio de Jerusalém", ref: "ACT 15:6", description: "A decisão oficial de que a salvação é pela graça, sem necessidade da lei." },
      { title: "Destruição de Jerusalém", ref: "MAT 24:2", description: "O fim do sistema judaico visível e a dispersão dos judeus (70 d.C.)." },
      { title: "Abertura do Cânon do NT", ref: "2TI 3:16", description: "A entrega das Escrituras completas para a orientação da Igreja." },
      { title: "A Grande Apostasia", ref: "2TI 4:3", description: "O esfriamento do amor e a multiplicação de falsos mestres no fim da era." },
      { title: "O Arrebatamento", ref: "1TH 4:16", description: "A retirada sobrenatural da Noiva antes do início dos juízos apocalípticos." }
    ] 
  },
  { 
    id: "d7", 
    title: "Reino", 
    period: "Segunda Vinda – Eternidade", 
    duration: "1000 anos + Estado Eterno", 
    color: "#6366f1", 
    startText: "Segunda Vinda", 
    startRef: "REV 19:11", 
    endText: "Trono Branco", 
    endRef: "REV 20:11", 
    description: "O reinado teocrático literal de Cristo sobre a terra, cumprindo as promessas a Israel e às nações.", 
    responsibility: "Obediência direta ao Rei visível e adoração anual em Jerusalém.",
    humanFailure: "Rebelião final liderada por Satanás (após solto) com os nascidos no milênio que não creram de coração.",
    divineJudgment: "Fogo do céu sobre os rebeldes e o Juízo do Grande Trono Branco.",
    divineGrace: "Restauração da ecologia, paz universal entre animais e homens, e a comunhão eterna no novo céu.",
    transition: "Da história temporal amaldiçoada para o Estado Eterno glorificado.",
    keyTexts: ["Is 11:1-9", "Ap 20:4-6", "Zc 14"],
    promisesLink: "Israel como cabeça das nações e a terra cheia do conhecimento do Senhor.",
    covenantsLink: "Consumação de todas as alianças (Abrâmica, Davídica e a restauração de Israel).",
    todayLessons: "A justiça social perfeita só virá quando o Justo reinar pessoalmente.",
    interpretationErrors: "Espiritualizar o milênio como sendo apenas o 'progresso da igreja' hoje.",
    howToNotConfuse: "Não confunda com o Céu; o Milênio ocorre na terra atual, ainda que restaurada, com pessoas em corpos naturais.",
    events: [
      { title: "Segunda Vinda (Parousia)", ref: "REV 19:11", description: "O retorno visível e glorioso de Cristo com Seus santos." },
      { title: "Batalha do Armagedom", ref: "REV 19:19", description: "A derrota definitiva dos exércitos do Anticristo no vale de Megido." },
      { title: "Prisão de Satanás", ref: "REV 20:2", description: "O início de mil anos sem influência demoníaca sobre as nações." },
      { title: "O Reino Milenar", ref: "REV 20:4", description: "Cristo reinando no trono de Davi com justiça perfeita e paz mundial." },
      { title: "Revolta de Gogue e Magogue", ref: "REV 20:8", description: "A prova final da rebeldia do coração humano após o fim do milênio." },
      { title: "Juízo do Trono Branco", ref: "REV 20:11", description: "O julgamento final de todos os mortos não salvos de todas as eras." },
      { title: "Novo Céu e Nova Terra", ref: "REV 21:1", description: "A criação glorificada sem mais pecado, dor, pranto ou morte." },
      { title: "A Nova Jerusalém", ref: "REV 21:2", description: "A descida da cidade celestial onde Deus habitará plenamente com o homem." }
    ] 
  }
];

export const STRONGS_DATA: Record<string, StrongEntry> = {
  "H7225": { id: "H7225", original: "רֵאשִׁית", transliteration: "reshith", definition: "Princípio, começo, primícias. Refere-se à primeira parte ou ao tempo inicial de um evento.", occurrences: 51 },
  "H430": { id: "H430", original: "אֱלֹהִים", transliteration: "elohim", definition: "Deus. Plural de majestade. O Ser Supremo, Criador e Juiz de toda a terra.", occurrences: 2598 },
  "H1254": { id: "H1254", original: "בָּרָא", transliteration: "bara", definition: "Criar, formar. Usado quase exclusivamente para a atividade criativa divina do nada (ex-nihilo).", occurrences: 54 },
  "G3056": { id: "G3056", original: "λόγος", transliteration: "logos", definition: "Verbo, Palavra, Razão Divina. A expressão externa do pensamento íntimo de Deus.", occurrences: 331 },
  "G746": { id: "G746", original: "ἀρχή", transliteration: "arche", definition: "Início, origem, primazia. Refere-se à causa primária ou ao ponto de partida temporal.", occurrences: 58 },
  "G2316": { id: "G2316", original: "θεός", transliteration: "theos", definition: "Deus. Usado para o Deus verdadeiro ou para divindades pagãs em minúsculo.", occurrences: 1317 },
  "H1": { id: "H1", original: "אָב", transliteration: "ab", definition: "Pai, antepassado, originador de uma família ou tribo.", occurrences: 1215 },
  "G1": { id: "G1", original: "Alpha", transliteration: "alpha", definition: "A primeira letra do alfabeto grego, simbolizando o princípio.", occurrences: 4 },
  "G5590": { id: "G5590", original: "ψυχή", transliteration: "psyche", definition: "Alma, sopro de vida, o eu interior, a sede das emoções e vontade.", occurrences: 105 }
};

export const COMMENTARY_AUTHORS: CommentaryAuthor[] = [
  { id: 'matthew-henry', name: 'Matthew Henry', period: '1662-1714', bio: 'O "Príncipe dos Comentaristas", mestre em aplicações devocionais.' },
  { id: 'john-calvin', name: 'João Calvino', period: '1509-1564', bio: 'Reformador, focava na exegese gramático-histórica.' },
  { id: 'spurgeon', name: 'Charles Spurgeon', period: '1834-1892', bio: 'Pregador batista com profunda visão evangelística.' }
];

export const COMMENTARY_DATA: Commentary[] = [
  { id: 'c1', authorId: 'matthew-henry', bookId: 'GEN', chapter: 1, title: 'O Início de Tudo', content: 'Deus, no princípio, criou. Nada existia antes de Sua vontade soberana. A criação é o palco de Sua glória.', references: ['GEN 1:1', 'PSA 33:6'] },
  { id: 'c2', authorId: 'john-calvin', bookId: 'JHN', chapter: 1, title: 'A Eternidade do Filho', content: 'O Verbo era Deus. Isso afirma a co-eternidade e co-essência do Filho com o Pai.', references: ['JHN 1:1', 'COL 1:16'] }
];

export const MAPS_DATA: MapData[] = [
  { id: 'm1', name: 'Israel Antigo', description: 'Divisão das 12 tribos.', regions: [{ name: 'Judá', bibleRef: 'JOS 15:1' }] }
];

export const SPECIAL_STUDIES_DATA: SpecialStudy[] = [
  { id: 's1', title: 'A Justificação pela Fé', content: 'Um mergulho na doutrina central da Reforma Protestante.' }
];
