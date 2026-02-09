
import { TopicalTheme } from '../types';

export const EXPANDED_TOPICAL_BIBLE: TopicalTheme[] = [
  {
    id: "faith",
    title: "1. A Doutrina da Fé",
    description: "A base inabalável do relacionamento entre o Criador e a criatura regenerada.",
    subthemes: [
      { title: "Definição e Natureza da Fé", verses: ["HEB 11:1", "HEB 11:6", "ROM 10:17", "2CO 5:7", "JHN 20:29", "HAB 2:4", "ROM 1:17", "GAL 3:11", "HEB 10:38", "MAT 17:20", "MAR 11:22"] },
      { title: "Fé para a Salvação", verses: ["EPH 2:8", "ROM 5:1", "ACT 16:31", "ROM 10:9", "ROM 10:10", "JHN 3:16", "MAR 16:16", "JHN 1:12", "ACT 10:43", "GAL 2:16", "ROM 3:22"] },
      { title: "A Fé nas Aflições e Provações", verses: ["JAM 1:3", "1PE 1:7", "PSA 27:13", "PSA 125:1", "ISA 43:2", "MAT 8:26", "MAT 14:31", "2TI 4:7", "1JN 5:4", "PSA 34:19", "ROM 8:37"] },
      { title: "A Fé Demonstrada por Obras", verses: ["JAM 2:14", "JAM 2:17", "JAM 2:18", "JAM 2:20", "JAM 2:22", "JAM 2:26", "GAL 5:6", "1TH 1:3", "2TH 1:11", "TIT 3:8", "MAT 7:21"] },
      { title: "O Escudo da Fé (Batalha)", verses: ["EPH 6:16", "1TH 5:8", "1TI 6:12", "2TI 4:7", "1JN 5:4", "1JN 5:5", "2TI 1:12"] }
    ]
  },
  {
    id: "grace",
    title: "2. A Graça Divina",
    description: "O favor imerecido de Deus manifestado na salvação e preservação dos eleitos.",
    subthemes: [
      { title: "Suficiência e Poder da Graça", verses: ["2CO 12:9", "ROM 5:20", "ROM 5:21", "EPH 1:7", "ACT 20:24", "ACT 20:32", "2CO 9:8", "2TI 2:1", "HEB 4:16", "JHN 1:16", "2CO 8:9"] },
      { title: "Graça versus Obras da Lei", verses: ["ROM 3:24", "ROM 6:14", "ROM 11:6", "EPH 2:8", "EPH 2:9", "GAL 2:21", "GAL 5:4", "TIT 3:5", "JHN 1:17", "ACT 15:11", "ROM 4:4", "ROM 4:16"] },
      { title: "A Graça que Santifica e Educa", verses: ["TIT 2:11", "TIT 2:12", "1CO 15:10", "2PE 3:18", "COL 4:6", "HEB 13:9", "JAM 4:6", "1PE 4:10", "1PE 5:10", "2TH 2:16"] }
    ]
  },
  {
    id: "god_attributes",
    title: "3. Atributos de Deus",
    description: "A essência, o caráter e a natureza absoluta do Deus Todo-Poderoso.",
    subthemes: [
      { title: "Santidade e Pureza", verses: ["ISA 6:3", "REV 4:8", "1PE 1:15", "1PE 1:16", "EXO 15:11", "PSA 99:5", "PSA 99:9", "HAB 1:13", "LEV 11:44", "EXO 3:5", "1SA 2:2"] },
      { title: "Amor, Bondade e Misericórdia", verses: ["1JN 4:8", "1JN 4:16", "JHN 3:16", "ROM 5:8", "PSA 136:1", "PSA 103:8", "PSA 103:13", "LAM 3:22", "LAM 3:23", "EPH 2:4", "TIT 3:4", "PSA 145:9", "EXO 34:6"] },
      { title: "Soberania e Providência", verses: ["PSA 115:3", "DAN 4:35", "EPH 1:11", "ROM 8:28", "PSA 103:19", "JOB 42:2", "ISA 46:10", "MAT 10:29", "MAT 10:30", "1CH 29:11", "PSA 135:6"] },
      { title: "Omnisciência e Sabedoria", verses: ["PSA 139:1", "PSA 139:2", "PSA 139:3", "PSA 139:4", "PSA 139:6", "HEB 4:13", "ROM 11:33", "1JN 3:20", "JOB 37:16", "PSA 147:5", "ISA 40:28"] },
      { title: "Omnipresença e Eternidade", verses: ["PSA 139:7", "PSA 139:8", "PSA 139:9", "PSA 139:10", "JER 23:24", "ACT 17:27", "ACT 17:28", "PSA 90:2", "1TI 1:17", "REV 1:8", "DEU 33:27"] }
    ]
  },
  {
    id: "christology",
    title: "4. Cristologia (Jesus)",
    description: "A Pessoa e Obra de Cristo: Sua divindade, humanidade e ofício redentor.",
    subthemes: [
      { title: "Divindade e Pré-existência", verses: ["JHN 1:1", "JHN 1:2", "JHN 8:58", "JHN 10:30", "JHN 20:28", "COL 1:15", "COL 1:16", "COL 1:17", "COL 2:9", "PHI 2:6", "HEB 1:3", "HEB 1:8", "TIT 2:13", "1JN 5:20", "ISA 9:6"] },
      { title: "Nascimento Virginal e Encarnação", verses: ["MAT 1:23", "LUK 1:35", "JHN 1:14", "GAL 4:4", "HEB 2:14", "HEB 2:17", "1TI 3:16", "ROM 1:3", "ROM 8:3", "PHI 2:7"] },
      { title: "Sacrifício Vicário (Cruz)", verses: ["ISA 53:4", "ISA 53:5", "ISA 53:6", "ROM 5:8", "2CO 5:21", "1PE 2:24", "1PE 3:18", "GAL 3:13", "1JN 2:2", "REV 5:9", "EPH 1:7", "COL 1:20"] },
      { title: "Ressurreição Vitoriosa", verses: ["1CO 15:3", "1CO 15:4", "1CO 15:20", "ROM 1:4", "ROM 4:25", "LUK 24:6", "ACT 1:3", "ACT 2:32", "JHN 11:25", "MAT 28:6", "REV 1:18"] }
    ]
  },
  {
    id: "pneumatology",
    title: "5. Pneumatologia (Espírito Santo)",
    description: "A divindade, personalidade e as operações do Consolador.",
    subthemes: [
      { title: "Divindade e Personalidade", verses: ["ACT 5:3", "ACT 5:4", "1CO 3:16", "1CO 6:19", "MAT 28:19", "2CO 13:14", "EPH 4:30", "JHN 14:16", "JHN 14:17", "JHN 15:26", "ACT 13:2", "HEB 9:14"] },
      { title: "O Fruto do Espírito", verses: ["GAL 5:22", "GAL 5:23", "EPH 5:9", "PHI 1:11", "JAM 3:17", "ROM 14:17", "COL 3:12", "PSA 1:3", "JHN 15:5"] },
      { title: "Dons Espirituais", verses: ["1CO 12:4", "1CO 12:7", "1CO 12:8", "1CO 12:9", "1CO 12:10", "1CO 12:11", "ROM 12:6", "ROM 12:7", "ROM 12:8", "EPH 4:11", "1PE 4:10", "1CO 14:1"] },
      { title: "Batismo e Enchimento", verses: ["ACT 1:5", "ACT 1:8", "ACT 2:4", "ACT 4:31", "EPH 5:18", "1CO 12:13", "ACT 10:44", "ACT 19:6"] }
    ]
  },
  {
    id: "soteriology",
    title: "6. Soteriologia (Salvação)",
    description: "O plano redentor: da eleição eterna à glorificação final.",
    subthemes: [
      { title: "Eleição e Predestinação", verses: ["EPH 1:4", "EPH 1:5", "EPH 1:11", "ROM 8:29", "ROM 8:30", "ROM 9:11", "2TH 2:13", "1PE 1:2", "JHN 15:16", "2TI 1:9"] },
      { title: "Regeneração (Novo Nascimento)", verses: ["JHN 3:3", "JHN 3:5", "JHN 3:7", "TIT 3:5", "1PE 1:3", "1PE 1:23", "2CO 5:17", "EPH 2:1", "JAM 1:18", "1JN 3:9"] },
      { title: "Justificação pela Fé", verses: ["ROM 3:24", "ROM 3:28", "ROM 4:5", "ROM 5:1", "ROM 5:9", "GAL 2:16", "GAL 3:11", "PHI 3:9", "TIT 3:7", "ACT 13:39"] },
      { title: "Santificação", verses: ["1TH 4:3", "1TH 5:23", "HEB 12:14", "JHN 17:17", "2CO 3:18", "2CO 7:1", "ROM 6:19", "ROM 6:22", "1PE 1:15", "EPH 4:24"] }
    ]
  },
  {
    id: "bibliology",
    title: "7. Bibliologia (A Palavra)",
    description: "A autoridade, inspiração e inerrância das Escrituras Sagradas.",
    subthemes: [
      { title: "Inspiração Divina", verses: ["2TI 3:16", "2PE 1:20", "2PE 1:21", "2SA 23:2", "ACT 1:16", "HEB 1:1", "1TH 2:13"] },
      { title: "Autoridade e Poder", verses: ["HEB 4:12", "PSA 119:105", "PSA 119:11", "ISA 40:8", "MAT 4:4", "JHN 17:17", "ROM 1:16", "PSA 19:7", "PSA 19:8"] },
      { title: "Suficiência e Perfeição", verses: ["PSA 19:7", "PSA 119:96", "PRO 30:5", "DEU 4:2", "REV 22:18", "REV 22:19", "GAL 1:8"] }
    ]
  },
  {
    id: "prayer",
    title: "8. Oração e Comunhão",
    description: "O exercício da dependência espiritual e o diálogo com o Pai.",
    subthemes: [
      { title: "Persistência e Fervor", verses: ["LUK 18:1", "1TH 5:17", "ROM 12:12", "COL 4:2", "EPH 6:18", "JAM 5:16", "PSA 55:17", "DAN 6:10", "LUK 11:9", "MAT 26:41"] },
      { title: "Promessas de Resposta", verses: ["MAT 7:7", "MAT 21:22", "MAR 11:24", "JHN 14:13", "JHN 15:7", "1JN 3:22", "1JN 5:14", "1JN 5:15", "JER 33:3", "PSA 34:15", "PSA 145:18"] },
      { title: "Oração Intercessória", verses: ["1TI 2:1", "JAM 5:14", "EPH 6:19", "COL 4:3", "ROM 15:30", "1SA 12:23", "JOB 42:10", "ACT 12:5"] }
    ]
  },
  {
    id: "family",
    title: "9. Família e Casamento",
    description: "O projeto de Deus para a união conjugal e a educação dos filhos.",
    subthemes: [
      { title: "Instituição do Matrimônio", verses: ["GEN 2:24", "MAT 19:4", "MAT 19:5", "MAT 19:6", "HEB 13:4", "EPH 5:31", "PRO 18:22", "MAL 2:14"] },
      { title: "Deveres dos Cônjuges", verses: ["EPH 5:22", "EPH 5:25", "EPH 5:33", "COL 3:18", "COL 3:19", "1PE 3:1", "1PE 3:7", "1CO 7:3", "PRO 31:10", "PRO 19:14"] },
      { title: "Criação de Filhos", verses: ["PRO 22:6", "EPH 6:4", "COL 3:21", "DEU 6:6", "DEU 6:7", "PSA 127:3", "PSA 127:4", "PRO 13:24", "PRO 29:17", "2TI 3:15"] }
    ]
  },
  {
    id: "eschatology",
    title: "10. Escatologia (Fim dos Tempos)",
    description: "A consumação de todas as coisas e o Reino Eterno de Cristo.",
    subthemes: [
      { title: "Sinais e Apostasia", verses: ["MAT 24:3", "MAT 24:7", "MAT 24:12", "2TI 3:1", "2TI 3:2", "2TI 3:5", "1TI 4:1", "2TH 2:3", "2PE 3:3", "LUK 21:11"] },
      { title: "O Arrebatamento", verses: ["1TH 4:13", "1TH 4:16", "1TH 4:17", "1CO 15:51", "1CO 15:52", "JHN 14:1", "JHN 14:3", "PHI 3:20", "TIT 2:13", "1JN 3:2"] },
      { title: "Segunda Vinda e Milênio", verses: ["REV 1:7", "REV 19:11", "REV 19:16", "REV 20:2", "REV 20:4", "MAT 24:30", "ACT 1:11", "ZEC 14:4", "ISA 11:6"] },
      { title: "Estado Eterno", verses: ["REV 21:1", "REV 21:4", "REV 21:23", "REV 22:1", "REV 22:5", "2PE 3:13", "ISA 65:17", "JHN 14:2", "PSA 16:11"] }
    ]
  },
  { id: "sin", title: "11. Hamartiologia (O Pecado)", description: "A queda, a rebelião e a depravação da natureza humana.", subthemes: [
    { title: "Origem e Universalidade", verses: ["GEN 3:6", "ROM 5:12", "ROM 3:23", "PSA 51:5", "ECC 7:20", "1JN 1:8", "ROM 3:10", "GAL 3:22"] },
    { title: "Consequências Mortais", verses: ["ROM 6:23", "ISA 59:2", "EPH 2:1", "JAM 1:15", "EZE 18:4", "GEN 2:17", "MAT 25:46"] }
  ]},
  { id: "angels", title: "12. Angelologia", description: "O estudo dos anjos eleitos e sua função no plano de Deus.", subthemes: [
    { title: "Natureza e Função", verses: ["HEB 1:14", "PSA 103:20", "PSA 34:7", "MAT 18:10", "HEB 13:2", "LUK 15:10", "PSA 91:11", "REV 5:11"] },
    { title: "Hierarquias e Poder", verses: ["COL 1:16", "EPH 1:21", "1PE 3:22", "JUDE 1:9", "DAN 10:13", "ISA 6:2", "GEN 3:24"] }
  ]},
  { id: "church", title: "13. Eclesiologia (A Igreja)", description: "A assembleia dos santos, o corpo e a noiva de Cristo.", subthemes: [
    { title: "Cristo, o Cabeça", verses: ["EPH 1:22", "COL 1:18", "EPH 5:23", "MAT 16:18", "ACT 20:28", "1CO 12:27", "ROM 12:5"] },
    { title: "Missão e Ordenanças", verses: ["MAT 28:19", "MAR 16:15", "ACT 1:8", "ACT 2:42", "1CO 11:23", "1CO 11:26", "EPH 4:11", "1TI 3:1"] }
  ]},
  { id: "providence", title: "14. Providência Divina", description: "O governo contínuo de Deus sobre toda a criação.", subthemes: [
    { title: "Preservação do Mundo", verses: ["COL 1:17", "HEB 1:3", "PSA 104:10", "MAT 6:26", "ACT 17:28", "PSA 145:15", "NEH 9:6"] },
    { title: "Cuidado com os Santos", verses: ["ROM 8:28", "PSA 23:1", "PHI 4:19", "MAT 10:30", "GEN 50:20", "PSA 37:25", "PSA 121:3"] }
  ]},
  { id: "trinity", title: "15. A Santíssima Trindade", description: "A doutrina de um só Deus em três pessoas co-eternas.", subthemes: [
    { title: "Unidade e Pluralidade", verses: ["DEU 6:4", "MAT 28:19", "2CO 13:14", "GEN 1:26", "ISA 6:8", "MAT 3:16", "1PE 1:2", "JUDE 1:20"] },
    { title: "Divindade do Pai, Filho e Espírito", verses: ["JHN 1:1", "ACT 5:3", "JHN 10:30", "COL 2:9", "1CO 3:16", "EPH 4:4", "HEB 1:8"] }
  ]},
  { id: "wisdom", title: "16. Sabedoria e Prudência", description: "Vivendo de forma que agrade a Deus em todas as decisões.", subthemes: [
    { title: "O Temor do Senhor", verses: ["PRO 1:7", "PSA 111:10", "PRO 9:10", "JOB 28:28", "ECC 12:13", "PRO 8:13", "PRO 14:27"] },
    { title: "Buscando Sabedoria", verses: ["JAM 1:5", "PRO 2:6", "PRO 4:7", "COL 2:3", "EPH 5:15", "PRO 16:16", "DAN 2:21"] }
  ]},
  { id: "holiness", title: "17. Santidade e Consagração", description: "A separação do mundo para o serviço exclusivo de Deus.", subthemes: [
    { title: "Chamado à Pureza", verses: ["1PE 1:15", "1TH 4:7", "HEB 12:14", "2CO 7:1", "1TH 5:23", "LEV 20:7", "ROM 12:1"] },
    { title: "Santidade Prática", verses: ["2TI 2:21", "PHI 4:8", "EPH 4:24", "1JN 3:3", "PSA 24:3", "PSA 24:4", "MAT 5:8"] }
  ]},
  { id: "suffering", title: "18. Sofrimento e Provações", description: "O propósito de Deus através das aflições temporais.", subthemes: [
    { title: "Consolo na Dor", verses: ["2CO 1:3", "2CO 1:4", "PSA 23:4", "PSA 34:18", "MAT 5:4", "JHN 16:33", "ROM 8:18", "REV 21:4"] },
    { title: "Refino da Fé", verses: ["JAM 1:2", "ROM 5:3", "1PE 1:7", "1PE 4:12", "PSA 119:71", "JOB 23:10", "HEB 12:11"] }
  ]},
  { id: "joy", title: "19. Alegria no Senhor", description: "O contentamento inabalável baseado na salvação eterna.", subthemes: [
    { title: "Fonte de Alegria", verses: ["PHI 4:4", "NEH 8:10", "PSA 16:11", "GAL 5:22", "ROM 15:13", "PSA 100:2", "HAB 3:18"] },
    { title: "Alegria nas Tribulações", verses: ["ACT 16:25", "ACT 5:41", "JAM 1:2", "2CO 6:10", "1PE 4:13", "HEB 12:2", "PSA 30:5"] }
  ]},
  { id: "money", title: "20. Mordomia e Finanças", description: "O uso dos recursos materiais para a glória do Reino.", subthemes: [
    { title: "Dízimos e Ofertas", verses: ["MAL 3:10", "2CO 9:7", "PRO 3:9", "LUK 6:38", "GEN 14:20", "1CO 16:2", "MAT 23:23"] },
    { title: "Amor ao Dinheiro", verses: ["1TI 6:10", "HEB 13:5", "MAT 6:24", "LUK 12:15", "PRO 23:4", "ECC 5:10", "MAT 19:23"] }
  ]},
  { id: "work", title: "21. Trabalho e Diligência", description: "A glorificação de Deus através do labor honesto.", subthemes: [
    { title: "Como para o Senhor", verses: ["COL 3:23", "EPH 6:7", "1CO 10:31", "ECC 9:10", "PRO 22:29", "TIT 2:9", "1CO 15:58"] },
    { title: "Preguiça e Disciplina", verses: ["PRO 6:6", "PRO 10:4", "2TH 3:10", "ROM 12:11", "PRO 13:4", "PRO 20:4", "1TI 5:8"] }
  ]},
  { id: "love_agape", title: "22. Amor Ágape", description: "O amor sacrificial que é a essência do caráter cristão.", subthemes: [
    { title: "O Mandamento Maior", verses: ["MAT 22:37", "JHN 13:34", "1JN 4:7", "1JN 4:11", "ROM 13:8", "GAL 5:14", "1JN 3:16"] },
    { title: "Prática do Amor", verses: ["1CO 13:1", "1CO 13:4", "1CO 13:13", "1PE 4:8", "COL 3:14", "EPH 5:2", "1JN 3:18"] }
  ]},
  { id: "forgiveness", title: "23. Perdão e Reconciliação", description: "Liberando a dívida alheia como fomos perdoados por Deus.", subthemes: [
    { title: "Perdão Divino", verses: ["1JN 1:9", "PSA 103:12", "MIC 7:19", "ISA 43:25", "EPH 1:7", "COL 1:14", "PSA 32:1"] },
    { title: "Perdoando o Próximo", verses: ["COL 3:13", "EPH 4:32", "MAT 18:21", "MAT 6:14", "MAR 11:25", "LUK 17:3", "PRO 17:9"] }
  ]},
  { id: "speech", title: "24. A Língua e a Palavra", description: "O poder da fala para edificar ou destruir.", subthemes: [
    { title: "Poder das Palavras", verses: ["PRO 18:21", "JAM 3:5", "JAM 3:9", "PRO 15:1", "PRO 12:18", "MAT 12:36", "MAT 15:11"] },
    { title: "Mentira e Verdade", verses: ["EPH 4:25", "PRO 12:22", "COL 3:9", "PSA 120:2", "REV 21:8", "PRO 19:5", "EXO 20:16"] }
  ]},
  { id: "integrity", title: "25. Integridade e Retidão", description: "A coerência entre a fé professada e a conduta oculta.", subthemes: [
    { title: "Andando na Verdade", verses: ["PSA 15:1", "PSA 15:2", "PRO 10:9", "PRO 20:7", "2CO 8:21", "PHI 4:8", "3JN 1:4"] },
    { title: "Honestidade", verses: ["ROM 12:17", "PRO 11:1", "PRO 16:11", "LEV 19:35", "1TH 4:12", "HEB 13:18", "2CO 4:2"] }
  ]},
  { id: "justice", title: "26. Justiça e Oprimidos", description: "O coração de Deus em defesa dos desamparados.", subthemes: [
    { title: "Cuidado Social", verses: ["JAM 1:27", "PSA 68:5", "ISA 1:17", "PRO 19:17", "MAT 25:40", "ZEC 7:10", "PSA 82:3"] },
    { title: "Justiça de Deus", verses: ["PSA 89:14", "ISA 30:18", "ROM 12:19", "PSA 37:6", "DEU 32:4", "REV 19:11", "PSA 11:7"] }
  ]},
  { id: "missions", title: "27. Missões e Evangelismo", description: "O Ide de Jesus para todas as nações.", subthemes: [
    { title: "A Grande Comissão", verses: ["MAT 28:19", "MAR 16:15", "ACT 1:8", "LUK 24:47", "JHN 20:21", "ROM 10:14", "ISA 6:8"] },
    { title: "Amor pelas Almas", verses: ["PSA 126:6", "PRO 11:30", "DAN 12:3", "ROM 9:1", "1CO 9:22", "JAM 5:20", "2TI 4:2"] }
  ]},
  { id: "disciple", title: "28. Discipulado", description: "O custo e a jornada de seguir a Cristo.", subthemes: [
    { title: "Negando a si mesmo", verses: ["MAT 16:24", "LUK 14:27", "GAL 2:20", "PHI 3:7", "MAT 10:38", "JHN 12:24", "ROM 12:1"] },
    { title: "Permanecendo na Palavra", verses: ["JHN 8:31", "JHN 15:7", "COL 3:16", "2TI 3:14", "PSA 119:9", "JOSH 1:8", "JAM 1:22"] }
  ]},
  { id: "leadership", title: "29. Liderança e Pastoreio", description: "Servindo ao rebanho de Deus com humildade e temor.", subthemes: [
    { title: "O Líder Servo", verses: ["MAT 20:26", "JHN 13:14", "1PE 5:2", "1PE 5:3", "PHI 2:5", "MAR 10:43", "ACT 20:28"] },
    { title: "Requisitos Ministeriais", verses: ["1TI 3:1", "TIT 1:5", "TIT 1:9", "HEB 13:17", "2TI 2:2", "JER 3:15", "ACT 6:3"] }
  ]},
  { id: "parables", title: "30. Parábolas de Jesus", description: "O ensino figurativo sobre as realidades do Reino.", subthemes: [
    { title: "O Semeador e Solos", verses: ["MAT 13:3", "MAT 13:18", "MAR 4:3", "LUK 8:5"] },
    { title: "O Filho Pródigo", verses: ["LUK 15:11", "LUK 15:20", "LUK 15:32"] },
    { title: "O Bom Samaritano", verses: ["LUK 10:30", "LUK 10:33", "LUK 10:37"] }
  ]},
  { id: "miracles", title: "31. Milagres e Sinais", description: "A manifestação do poder de Deus sobre a natureza e a doença.", subthemes: [
    { title: "Cura Divina", verses: ["PSA 103:3", "MAT 8:16", "ACT 3:6", "JAM 5:14", "EXO 15:26", "ISA 53:5", "LUK 5:17"] },
    { title: "Poder sobre a Morte", verses: ["JHN 11:43", "LUK 7:14", "MAT 28:6", "ACT 9:40", "1CO 15:55", "REV 1:18"] }
  ]},
  { id: "covenants", title: "32. Alianças Bíblicas", description: "Os pactos de Deus com Seu povo ao longo da história.", subthemes: [
    { title: "Abrâmica e Davídica", verses: ["GEN 12:2", "GEN 15:18", "2SA 7:12", "PSA 89:3", "GAL 3:16", "ROM 4:13"] },
    { title: "A Nova Aliança", verses: ["JER 31:31", "HEB 8:8", "LUK 22:20", "1CO 11:25", "HEB 12:24", "2CO 3:6", "HEB 9:15"] }
  ]},
  { id: "warfare_spirit", title: "33. Batalha Espiritual", description: "Nossa luta contra as hostes das trevas.", subthemes: [
    { title: "A Armadura de Deus", verses: ["EPH 6:11", "EPH 6:18", "ROM 13:12", "1TH 5:8", "2CO 10:4", "ISA 59:17", "1PE 5:8"] },
    { title: "Vitória em Cristo", verses: ["REV 12:11", "JAM 4:7", "1JN 4:4", "LUK 10:19", "ROM 16:20", "COL 2:15", "1CO 15:57"] }
  ]},
  { id: "peace_rest", title: "34. Paz e Descanso", description: "A tranquilidade da alma em Deus.", subthemes: [
    { title: "Paz que Excede Entendimento", verses: ["PHI 4:7", "JHN 14:27", "ISA 26:3", "ROM 5:1", "JHN 16:33", "PSA 119:165", "COL 3:15"] },
    { title: "Descanso no Senhor", verses: ["MAT 11:28", "PSA 23:2", "PSA 62:1", "HEB 4:9", "PSA 37:7", "ISA 30:15", "JER 6:16"] }
  ]},
  { id: "patience_wait", title: "35. Paciência e Espera", description: "A virtude de aguardar o tempo soberano de Deus.", subthemes: [
    { title: "Esperando no Senhor", verses: ["PSA 40:1", "ISA 40:31", "PSA 27:14", "PSA 37:34", "LAM 3:25", "MIC 7:7", "PRO 20:22"] },
    { title: "Longanimidade", verses: ["GAL 5:22", "COL 3:12", "JAM 5:7", "JAM 5:10", "ROM 12:12", "1CO 13:4", "2TI 4:2"] }
  ]},
  { id: "temptation_victory", title: "36. Tentação e Vitória", description: "Como vencer as ciladas do pecado.", subthemes: [
    { title: "O Escape de Deus", verses: ["1CO 10:13", "JAM 1:12", "MAT 26:41", "2PE 2:9", "HEB 4:15", "HEB 2:18", "JAM 4:7"] },
    { title: "Vigilância", verses: ["1PE 5:8", "MAR 14:38", "1CO 16:13", "EPH 6:18", "REV 3:2", "COL 4:2", "1TH 5:6"] }
  ]},
  { id: "creation_science", title: "37. Criação e Design", description: "Deus como o Arquiteto e Sustentador do Universo.", subthemes: [
    { title: "Ex-Nihilo", verses: ["GEN 1:1", "PSA 33:6", "HEB 11:3", "JHN 1:3", "COL 1:16", "PSA 102:25", "REV 4:11"] },
    { title: "Revelação Natural", verses: ["PSA 19:1", "ROM 1:20", "ACT 14:17", "JOB 12:7", "PSA 8:3", "ISA 40:26", "PSA 147:4"] }
  ]},
  { id: "names_elohim", title: "38. Nomes de Deus", description: "Revelando o caráter divino através de Seus títulos.", subthemes: [
    { title: "Eu Sou e Jeová", verses: ["EXO 3:14", "GEN 22:14", "EXO 17:15", "JDG 6:24", "PSA 23:1", "JER 23:6", "EZE 48:35"] },
    { title: "El Shaddai e Adonai", verses: ["GEN 17:1", "PSA 91:1", "PSA 8:1", "MAL 1:6", "ISA 6:1", "GEN 14:19", "PSA 97:5"] }
  ]},
  { id: "holy_life_spirit", title: "39. Vida no Espírito", description: "A regência diária do Consolador sobre o crente.", subthemes: [
    { title: "Andar no Espírito", verses: ["GAL 5:16", "GAL 5:25", "ROM 8:4", "ROM 8:14", "EPH 5:18", "ACT 9:31", "GAL 5:18"] },
    { title: "Mente Espiritual", verses: ["ROM 8:5", "ROM 8:6", "1CO 2:14", "1CO 2:16", "COL 3:2", "PHI 2:5", "ROM 12:2"] }
  ]},
  { id: "gratitude_thanks", title: "40. Gratidão e Ações de Graças", description: "O reconhecimento da bondade de Deus em todas as circunstâncias.", subthemes: [
    { title: "Em tudo dai Graças", verses: ["1TH 5:18", "EPH 5:20", "COL 3:17", "PSA 100:4", "PSA 107:1", "PHI 4:6", "HEB 13:15"] },
    { title: "Louvor Continuo", verses: ["PSA 34:1", "PSA 146:2", "PSA 147:1", "ACT 16:25", "COL 2:7", "COL 4:2", "PSA 103:1"] }
  ]},
  { id: "char_abraham", title: "41. Biografia: Abraão", description: "O Patriarca e Pai da Fé.", subthemes: [
    { title: "O Chamado", verses: ["GEN 12:1", "GEN 12:3", "ACT 7:2", "HEB 11:8", "GEN 15:1"] },
    { title: "A Prova de Isaque", verses: ["GEN 22:1", "GEN 22:12", "HEB 11:17", "JAM 2:21", "GEN 22:18"] }
  ]},
  { id: "char_moses", title: "42. Biografia: Moisés", description: "O Legislador e Libertador de Israel.", subthemes: [
    { title: "O Êxodo", verses: ["EXO 3:2", "EXO 14:13", "EXO 14:31", "HEB 11:24", "ACT 7:22"] },
    { title: "A Lei e Mansidão", verses: ["EXO 20:1", "NUM 12:3", "DEU 34:10", "MAT 17:3", "JHN 1:17"] }
  ]},
  { id: "char_david", title: "43. Biografia: Davi", description: "O Rei e Salmista de Israel.", subthemes: [
    { title: "O Pastor Ungido", verses: ["1SA 16:13", "1SA 17:45", "2SA 7:16", "ACT 13:22", "PSA 23:1"] },
    { title: "Pecado e Arrependimento", verses: ["2SA 11:1", "2SA 12:13", "PSA 51:1", "PSA 32:1", "1KI 15:5"] }
  ]},
  { id: "char_paul", title: "44. Biografia: Paulo", description: "O Apóstolo dos Gentios e Teólogo da Graça.", subthemes: [
    { title: "Conversão", verses: ["ACT 9:1", "ACT 9:6", "ACT 22:6", "ACT 26:14", "GAL 1:15"] },
    { title: "Carreira e Sofrimento", verses: ["2CO 11:23", "2CO 12:7", "2CO 12:9", "PHI 1:21", "2TI 4:7", "ACT 20:24"] }
  ]},
  { id: "char_peter", title: "45. Biografia: Pedro", description: "O Pescador transformado em Rocha.", subthemes: [
    { title: "Negação e Restauração", verses: ["MAT 26:75", "JHN 21:15", "JHN 21:17", "LUK 22:31", "MAT 16:16"] },
    { title: "Pentecostes e Ministério", verses: ["ACT 2:14", "ACT 3:6", "ACT 4:13", "ACT 10:34", "1PE 1:1"] }
  ]},
  { id: "parable_kingdom", title: "46. Parábolas do Reino", description: "O crescimento e o valor do Reino de Deus.", subthemes: [
    { title: "A Pérola e o Tesouro", verses: ["MAT 13:44", "MAT 13:46", "MAT 6:33", "PHI 3:8"] },
    { title: "O Grão de Mostarda", verses: ["MAT 13:31", "MAT 13:32", "MAR 4:31", "LUK 13:19"] }
  ]},
  { id: "law_gospel_rel", title: "47. Lei e Evangelho", description: "A relação entre o Antigo e o Novo Testamento.", subthemes: [
    { title: "A Lei como Aio", verses: ["GAL 3:24", "ROM 10:4", "ROM 7:12", "GAL 2:16", "ROM 3:20", "MAT 5:17"] },
    { title: "Liberdade em Cristo", verses: ["GAL 5:1", "GAL 5:13", "ROM 6:14", "ROM 8:2", "JHN 8:36", "2CO 3:17"] }
  ]},
  { id: "truth_liberty", title: "48. A Verdade que Liberta", description: "O conhecimento da realidade divina contra o engano.", subthemes: [
    { title: "Conhecereis a Verdade", verses: ["JHN 8:32", "JHN 14:6", "JHN 17:17", "PSA 119:160", "EPH 4:21", "2TI 2:15"] },
    { title: "O Engano do Mundo", verses: ["EPH 4:14", "COL 2:8", "2TI 4:3", "1JN 4:1", "2JN 1:7", "REV 12:9"] }
  ]},
  { id: "salt_light", title: "49. Sal e Luz", description: "A influência e o testemunho do cristão no mundo.", subthemes: [
    { title: "Vós sois o Sal", verses: ["MAT 5:13", "MAR 9:50", "LUK 14:34", "COL 4:6"] },
    { title: "Vós sois a Luz", verses: ["MAT 5:14", "MAT 5:16", "EPH 5:8", "PHI 2:15", "JHN 8:12", "1JN 1:7"] }
  ]},
  { id: "new_birth_regener", title: "50. Novo Nascimento", description: "A transformação radical operada pelo Espírito.", subthemes: [
    { title: "Nascer da Água e do Espirito", verses: ["JHN 3:3", "JHN 3:5", "JHN 3:8", "TIT 3:5", "JAM 1:18", "1PE 1:23"] },
    { title: "Nova Criatura", verses: ["2CO 5:17", "GAL 6:15", "EPH 4:24", "COL 3:10", "ROM 6:4"] }
  ]},
  { id: "humility_exalt", title: "51. Humildade e Orgulho", description: "A inversão de valores do Reino de Deus.", subthemes: [
    { title: "Deus Resiste aos Soberbos", verses: ["JAM 4:6", "1PE 5:5", "PRO 16:18", "MAT 23:12", "LUK 14:11", "ISA 57:15"] },
    { title: "O Caminho da Humildade", verses: ["PHI 2:3", "PHI 2:8", "MAT 11:29", "MIC 6:8", "PRO 15:33", "PSA 25:9"] }
  ]},
  { id: "perseverance_saints", title: "52. Perseverança dos Santos", description: "A segurança eterna dos que foram chamados por Deus.", subthemes: [
    { title: "Ninguém os Arrebatará", verses: ["JHN 10:28", "JHN 10:29", "ROM 8:38", "ROM 8:39", "PHI 1:6", "JUDE 1:24", "2TI 1:12"] },
    { title: "Fiel até o Fim", verses: ["MAT 24:13", "REV 2:10", "HEB 3:14", "HEB 10:39", "1CO 1:8", "1TH 5:24"] }
  ]},
  { id: "repentance_true", title: "53. Arrependimento Verdadeiro", description: "A mudança de mente que leva à mudança de vida.", subthemes: [
    { title: "Metanoia", verses: ["ACT 3:19", "LUK 13:3", "ACT 2:38", "ACT 17:30", "2CO 7:10", "ROM 2:4", "MAT 3:8"] },
    { title: "Confissão de Pecados", verses: ["1JN 1:9", "PRO 28:13", "PSA 32:5", "PSA 51:3", "JAM 5:16", "LUK 15:21"] }
  ]},
  { id: "restitution_ethics", title: "54. Restituição e Ética", description: "Corrigindo danos causados a outrem como prova de fé.", subthemes: [
    { title: "Zaqueu e a Restituição", verses: ["LUK 19:8", "EXO 22:1", "LEV 6:5", "NUM 5:7", "EZE 33:15"] },
    { title: "Viver Honestamente", verses: ["ROM 12:17", "2CO 8:21", "1TH 4:12", "HEB 13:18", "1PE 2:12"] }
  ]},
  { id: "fasting_biblical", title: "55. Jejum Bíblico", description: "A abstinência física para foco espiritual e quebrantamento.", subthemes: [
    { title: "O Jejum que Agrada", verses: ["ISA 58:6", "ISA 58:7", "MAT 6:16", "MAT 6:18", "ACT 13:2", "JOE 2:12"] },
    { title: "Exemplos de Jejum", verses: ["MAT 4:2", "DAN 9:3", "ACT 14:23", "EST 4:16", "EXO 34:28", "1KI 19:8"] }
  ]},
  { id: "body_temple", title: "56. O Corpo como Templo", description: "A responsabilidade de cuidar da morada do Espírito Santo.", subthemes: [
    { title: "Santuário de Deus", verses: ["1CO 6:19", "1CO 6:20", "1CO 3:16", "1CO 3:17", "ROM 12:1", "1CO 10:31"] },
    { title: "Fugindo da Imundícia", verses: ["1TH 4:3", "1CO 6:18", "2CO 6:16", "EPH 5:3", "COL 3:5", "1PE 2:11"] }
  ]},
  { id: "unity_church", title: "57. Unidade da Igreja", description: "O desejo de Cristo para que sejamos um só corpo.", subthemes: [
    { title: "Um Só Corpo", verses: ["JHN 17:21", "EPH 4:3", "EPH 4:6", "1CO 1:10", "ROM 12:4", "PHI 2:2", "PSA 133:1"] },
    { title: "Diversidade de Membros", verses: ["1CO 12:12", "1CO 12:27", "ROM 12:5", "EPH 4:15", "COL 3:11", "GAL 3:28"] }
  ]},
  { id: "woman_virtue", title: "58. A Mulher Cristã", description: "A dignidade e o papel da mulher nos planos de Deus.", subthemes: [
    { title: "A Mulher Virtuosa", verses: ["PRO 31:10", "PRO 31:31", "PRO 12:4", "TIT 2:3", "TIT 2:5", "1PE 3:1", "1PE 3:4"] },
    { title: "Mulheres no Ministério", verses: ["LUK 8:1", "LUK 8:3", "ROM 16:1", "ACT 16:14", "ACT 18:26", "2TI 1:5", "JHN 20:17"] }
  ]},
  { id: "youth_strength", title: "59. Juventude e Vigor", description: "Servindo a Deus na força e entusiasmo da mocidade.", subthemes: [
    { title: "Lembre-se do Criador", verses: ["ECC 12:1", "1TI 4:12", "PSA 119:9", "PSA 119:11", "PRO 20:29", "1JN 2:14"] },
    { title: "Fugindo das Paixões", verses: ["2TI 2:22", "PSA 25:7", "ECC 11:9", "1PE 5:5", "PRO 1:8", "PRO 3:1"] }
  ]},
  { id: "elder_wisdom", title: "60. Velhice e Maturidade", description: "Honrando a experiência e a fidelidade dos anciãos.", subthemes: [
    { title: "Cabelos Brancos, Coroa", verses: ["PRO 16:31", "PRO 20:29", "LEV 19:32", "JOB 12:12", "PSA 92:14", "PSA 71:18"] },
    { title: "Exemplo para os Novos", verses: ["TIT 2:2", "PSA 71:9", "ISA 46:4", "PHM 1:9", "JOB 32:7", "DEU 32:7"] }
  ]},
  { id: "will_of_god", title: "61. Vontade de Deus", description: "Discernindo e obedecendo o querer soberano do Pai.", subthemes: [
    { title: "Discernimento", verses: ["ROM 12:2", "EPH 5:17", "COL 1:9", "PSA 143:10", "1TH 4:3", "MAT 6:10", "JHN 7:17"] },
    { title: "Buscando Primeiro o Reino", verses: ["MAT 6:33", "PSA 40:8", "JAM 4:15", "1JN 2:17", "HEB 13:21", "ACT 13:22"] }
  ]},
  { id: "hope_future", title: "62. Esperança Cristã", description: "A expectativa alegre baseada na ressurreição.", subthemes: [
    { title: "Âncora da Alma", verses: ["HEB 6:19", "ROM 5:5", "ROM 8:24", "ROM 15:13", "1PE 1:3", "1PE 1:21", "COL 1:27"] },
    { title: "Nossa Herança", verses: ["1PE 1:4", "COL 1:5", "TIT 2:13", "1JN 3:3", "PSA 71:5", "JER 29:11", "ROM 12:12"] }
  ]},
  { id: "truth_vs_lies", title: "63. Verdade vs Mentira", description: "O combate espiritual contra o engano do inimigo.", subthemes: [
    { title: "Deus da Verdade", verses: ["PSA 31:5", "JHN 14:6", "TIT 1:2", "HEB 6:18", "JHN 17:17", "ROM 3:4"] },
    { title: "O Pai da Mentira", verses: ["JHN 8:44", "ACT 5:3", "REV 21:8", "PRO 12:22", "EPH 4:25", "REV 22:15"] }
  ]},
  { id: "giving_joy", title: "64. Generosidade Real", description: "Dando como expressão de amor e não por obrigação.", subthemes: [
    { title: "Doador Alegre", verses: ["2CO 9:7", "ACT 20:35", "PRO 11:24", "PRO 11:25", "LUK 6:38", "MAT 10:8"] },
    { title: "A Viúva Pobre", verses: ["MAR 12:42", "MAR 12:44", "LUK 21:1", "LUK 21:4", "2CO 8:2", "2CO 8:12"] }
  ]},
  { id: "light_vs_dark", title: "65. Luz vs Trevas", description: "A separação ética entre o Reino de Deus e o mundo.", subthemes: [
    { title: "Filhos da Luz", verses: ["EPH 5:8", "1TH 5:5", "1JN 1:7", "JHN 12:36", "MAT 5:14", "PHI 2:15"] },
    { title: "Obras das Trevas", verses: ["EPH 5:11", "ROM 13:12", "JHN 3:19", "1JN 1:6", "1JN 2:11", "COL 1:13"] }
  ]},
  { id: "salt_preserv", title: "66. O Sal da Terra", description: "O papel do cristão como agente de preservação moral.", subthemes: [
    { title: "Sabor e Preservação", verses: ["MAT 5:13", "MAR 9:50", "LUK 14:34", "LUK 14:35", "COL 4:6"] }
  ]},
  { id: "idolatry_heart", title: "67. Fugindo da Idolatria", description: "Não permitindo que nada ocupe o trono de Deus no coração.", subthemes: [
    { title: "Não terás outros deuses", verses: ["EXO 20:3", "1JN 5:21", "1CO 10:14", "COL 3:5", "EPH 5:5", "MAT 6:24"] },
    { title: "Idolatria Espiritual", verses: ["PHI 3:19", "EZE 14:3", "JER 2:13", "ROM 1:23", "ROM 1:25", "PSA 115:4", "PSA 115:8"] }
  ]},
  { id: "restoration_soul", title: "68. Restauração da Alma", description: "O trabalho de cura interior realizado pelo Bom Pastor.", subthemes: [
    { title: "Refrigera a minha alma", verses: ["PSA 23:3", "PSA 147:3", "ISA 61:1", "MAT 11:28", "JER 31:25", "PSA 51:12"] },
    { title: "Cura e Consolo", verses: ["ISA 57:18", "JER 30:17", "PSA 34:18", "2CO 1:4", "LUK 4:18", "ISA 40:1"] }
  ]},
  { id: "armor_of_god", title: "69. A Armadura Completa", description: "Os equipamentos defensivos e ofensivos do soldado de Cristo.", subthemes: [
    { title: "Verdade e Justiça", verses: ["EPH 6:14", "ISA 11:5", "ISA 59:17", "2CO 6:7"] },
    { title: "Espada do Espírito", verses: ["EPH 6:17", "HEB 4:12", "REV 1:16", "REV 19:15", "MAT 4:4", "MAT 4:7", "MAT 4:10"] }
  ]},
  { id: "second_birth", title: "70. Regeneração", description: "A obra invisível do Espírito que nos torna filhos de Deus.", subthemes: [
    { title: "Lavagem da Regeneração", verses: ["TIT 3:5", "JHN 1:13", "1JN 2:29", "1JN 3:9", "1JN 4:7", "1JN 5:1", "1JN 5:18"] }
  ]},
  { id: "god_justice_final", title: "71. O Juízo Final", description: "A prestação de contas definitiva de toda a humanidade perante o Trono Branco.", subthemes: [
    { title: "O Trono Branco", verses: ["REV 20:11", "REV 20:12", "REV 20:15", "ACT 17:31", "ROM 2:5", "ROM 2:16", "2CO 5:10", "HEB 9:27", "MAT 12:36", "ECC 12:14"] }
  ]},
  { id: "everlasting_life", title: "72. Vida Eterna", description: "A realidade da comunhão ininterrupta com Deus no porvir.", subthemes: [
    { title: "O Dom Gratuito", verses: ["ROM 6:23", "JHN 3:16", "JHN 10:28", "JHN 17:3", "1JN 5:11", "1JN 5:13", "TIT 1:2", "JUDE 1:21", "JHN 5:24", "JHN 6:47"] }
  ]}
];
