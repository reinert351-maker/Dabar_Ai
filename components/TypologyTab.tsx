
import React, { useState } from 'react';
import { UserState, Sermon, SermonBlock } from '../types';
import { ICON_SERMON, ICON_BIBLE, ICON_TYPOLOGY } from '../constants';
import { saveSermon, getSermons } from '../services/database';

interface TypologyEntry {
  id: string;
  title: string;
  shadow: string;
  reality: string;
  paragraphs: string[];
  refs: string[];
  color: string;
}

const TYPOLOGY_DATA: TypologyEntry[] = [
  {
    id: 'adam',
    title: 'Adão',
    shadow: 'A Cabeça da Humanidade Caída',
    reality: 'Cristo, o Último Adão',
    color: 'border-l-slate-500',
    refs: ['Gênesis 2', 'Romanos 5:12-21', '1 Coríntios 15:45'],
    paragraphs: [
      "Adão é estabelecido como o 'tipo' original de Cristo, servindo como o representante federal de toda a raça humana. No Éden, ele foi colocado em uma posição de perfeição e autoridade, mas sua queda trouxe a morte e a separação para todos os seus descendentes. Enquanto o primeiro Adão é a fonte da nossa natureza terrena e corruptível, Cristo surge no Novo Testamento como o 'Último Adão', a nova cabeça de uma humanidade redimida e glorificada.",
      "A prova de Adão ocorreu em um jardim de delícias, onde ele falhou em obedecer a um único mandamento negativo. Em contraste, a vitória de Cristo começou em um jardim de agonia (Getsêmani) e culminou em um deserto de provação, onde Ele obedeceu perfeitamente em meio à privação total. A desobediência de um trouxe condenação; a obediência do Outro trouxe justificação e vida eterna para muitos.",
      "O sono profundo de Adão para a formação de Eva é uma das sombras mais belas da cruz. Do lado aberto de Adão adormecido, Deus tirou a costela para formar sua noiva. Do lado traspassado de Cristo na cruz, morto em 'sono profundo', fluiu o sangue e a água que deram origem à Igreja, Sua noiva celestial. Adão reconheceu Eva como 'carne da minha carne', assim como Cristo nos vê como membros de Seu próprio corpo.",
      "A expulsão do Éden e as túnicas de peles revelam a necessidade de um sacrifício para cobrir a vergonha do pecado. O primeiro Adão tentou se cobrir com folhas de figueira (obras humanas), mas Deus o cobriu com a morte de um inocente. Cristo é o nosso revestimento definitivo, a justiça divina que não murcha como as folhas, mas que nos permite caminhar novamente na presença do Pai sem medo da maldição.",
      "Em suma, a tipologia adâmica nos ensina que a nossa identidade biológica nos liga à derrota, mas nossa identidade espiritual em Cristo nos liga ao triunfo. Onde o pecado abundou por meio do primeiro homem, a graça superabundou por meio do Homem Celestial. Adão nos deu uma herança de labor e morte; Cristo nos dá uma herança de descanso e imortalidade na Nova Jerusalém."
    ]
  },
  {
    id: 'ark',
    title: 'Arca de Noé',
    shadow: 'O Refúgio Único na Ira',
    reality: 'Cristo, o Nosso Abrigo Eterno',
    color: 'border-l-blue-500',
    refs: ['Gênesis 6-8', '1 Pedro 3:20-21'],
    paragraphs: [
      "A Arca de Noé constitui um dos tipos mais vívidos da salvação em Cristo em todo o Antigo Testamento. Assim como Deus determinou um julgamento hídrico sobre a iniquidade da raça humana, a Arca foi projetada por decreto divino para ser o único meio de escape. Noé não inventou o design; ele apenas obedeceu ao projeto do Arquiteto Universal, assim como nós não inventamos o plano de salvação, mas entramos naquele que Deus já estabeleceu em Seu Filho.",
      "Um detalhe arquitetônico fundamental era a porta única da Arca. Não havia múltiplas entradas para diferentes crenças ou méritos; havia apenas uma via de acesso. Cristo, no Novo Testamento, ecoa essa tipologia ao declarar: 'Eu sou a porta'. Estar do lado de fora significava perecer sob o peso da justiça; estar do lado de dentro significava segurança absoluta, não pela força dos que estavam dentro, mas pela integridade da estrutura que os cercava.",
      "A Arca foi revestida de betume (piche) por dentro e por fora, o que no hebraico compartilha a mesma raiz da palavra 'expiação' (kaphar). Esse revestimento impedia que as águas do juízo penetrassem o refúgio. Tipologicamente, o sangue de Cristo é o nosso revestimento de expiação que nos isola da condenação eterna. Enquanto as águas batiam no exterior da Arca, os que estavam dentro desfrutavam de paz, pois a Arca recebiva os golpes que seriam destinados aos passageiros.",
      "A preservação através da Arca não foi um mérito da família de Noé, mas uma demonstração da graça eletiva. O próprio Deus fechou a porta por fora, garantindo que ninguém se perdesse e que nenhum estranho entrasse após o tempo da graça. Da mesma forma, a nossa segurança em Cristo não depende da nossa capacidade de segurar na mão de Deus, mas da mão de Deus que nos segura dentro da Arca da Salvação, prometendo que 'ninguém as arrebatará da minha mão'.",
      "Finalmente, a Arca repousou sobre o Monte Ararat no sétimo mês, no dia dezessete — curiosamente a mesma data em que, séculos mais tarde, Cristo ressuscitaria dentre os mortos. O fim da tempestade marcou o início de uma nova aliança e de uma nova humanidade. A Arca nos ensina que o juízo de Deus é real, mas que Sua provisão de refúgio em Cristo é perfeita, inabalável e totalmente suficiente para todos os que atendem ao chamado de entrar."
    ]
  },
  {
    id: 'isaac',
    title: 'Isaque',
    shadow: 'O Filho da Promessa no Altar',
    reality: 'O Sacrifício do Filho Unigênito',
    color: 'border-l-amber-500',
    refs: ['Gênesis 22', 'João 3:16', 'Gálatas 3:16'],
    paragraphs: [
      "Isaque é o tipo quintessencial de Cristo como o Filho amado e submisso. Sua própria concepção foi um milagre, nascendo de uma madre considerada morta e de um pai em idade avançada, prefigurando o nascimento sobrenatural do Messias. Como o herdeiro legítimo das promessas feitas a Abraão, Isaque carregava sobre seus ombros o futuro da aliança, assim como Cristo carrega sobre Si o cumprimento de todas as promessas de redenção feitas à humanidade.",
      "O evento no Monte Moriá é a cena mais profunda de tipologia substitutiva da Bíblia. Abraão, o pai, leva seu único filho, o filho a quem ama, para o sacrifício. Esse cenário espelha perfeitamente o coração do Pai Celestial que não poupou Seu próprio Filho, mas o entregou por todos nós. A caminhada de três dias até o monte simboliza o tempo entre a morte e a ressurreição de Cristo, período no qual, na mente de Abraão, Isaque já estava morto e foi 'recebido de volta' figuradamente.",
      "A submissão de Isaque é um dos traços mais impactantes. Sendo um jovem vigoroso, ele poderia facilmente ter resistido ao seu pai idoso, mas ele escolheu se deitar sobre o altar. Cristo, no Getsêmani e no Calvário, não foi levado à cruz contra Sua vontade; Ele entregou Sua vida voluntariamente, dizendo: 'Ninguém a tira de mim, mas eu de mim mesmo a dou'. Isaque carregando a lenha para o seu próprio sacrifício é a imagem exata de Jesus carregando o madeiro da cruz rumo ao Gólgota.",
      "No clímax da narrativa, a intervenção divina revela o carneiro preso pelos chifres no matagal. O carneiro assume o lugar de Isaque, morrendo para que o filho vivesse. Aqui vemos a substituição penal clara: a justiça exige um sacrifício, mas o amor de Deus provê o substituto. Cristo é o Cordeiro de Deus que, ao contrário do carneiro de Abraão, foi de fato sacrificado para que todos os 'Isaquess' da história pudessem ser libertos das cordas da morte.",
      "A benção que segue o teste de Moriá confirma que, através da semente de Abraão, todas as nações seriam benditas. Isaque sobreviveu para dar continuidade à linhagem que culminaria em Jesus. O estudo de Isaque nos leva a contemplar a profundidade do amor do Pai e a perfeição da obediência do Filho, mostrando que a história da salvação não é um plano de emergência, mas uma melodia orquestrada desde a fundação do mundo através de sombras e realidades."
    ]
  },
  {
    id: 'joseph',
    title: 'José',
    shadow: 'Da Cova ao Trono do Egito',
    reality: 'A Humilhação e Exaltação do Messias',
    color: 'border-l-emerald-500',
    refs: ['Gênesis 37-50', 'Atos 7:9-10'],
    paragraphs: [
      "José é talvez o paralelo biográfico mais exaustivo de Jesus Cristo nas Escrituras. Amado de forma especial por seu pai, ele foi enviado para buscar seus irmãos, que o odiavam sem causa. Jesus, o Filho amado, veio para os Seus, mas os Seus não O receberam. A inveja dos irmãos de José, motivada pelas revelações de sua futura soberania, espelha a perseguição que os líderes religiosos moveram contra Cristo por Sua reivindicação de ser o Rei dos Judeus.",
      "A traição sofrida por José foi física e financeira: vendido por moedas de prata por seus próprios parentes. O paralelo com Judas Iscariotes vendendo o Mestre por trinta moedas de prata é inegável. José foi lançado em uma cova e dado como morto pelo seu pai, uma 'descida' que prefigura a morte e o sepultamento de Cristo. No Egito, ele foi tentado mas permaneceu impecável, sofrendo injustamente e sendo contado entre malfeitores na prisão, assim como Cristo foi crucificado entre ladrões.",
      "A exaltação de José ao trono do Egito é uma imagem poderosa da ressurreição e ascensão de Jesus. De um prisioneiro esquecido, ele se torna o senhor da nação mais poderosa da terra, e o comando é dado: 'Aclemai!'. Todo joelho deveria se dobrar diante de José para obter pão. Do mesmo modo, Deus exaltou Jesus sobremodo e Lhe deu o Nome que está acima de todo nome, declarando que somente n’Ele há o Pão da Vida para um mundo faminto de esperança.",
      "O propósito do sofrimento de José foi revelado na sua frase clássica: 'Vós bem intentastes mal contra mim; porém Deus o tornou em bem, para manter com vida a muito povo'. Essa é a lógica da cruz. O que os homens fizeram com malícia contra Jesus, Deus usou soberanamente para operar a maior salvação da história. José tornou-se o provedor de vida para os gentios (egípcios) e para os seus próprios irmãos judeus que o haviam rejeitado anteriormente.",
      "A reconciliação final de José com seus irmãos prefigura o reconhecimento futuro de Israel para com o Messias. Ele se revelou a eles em particular e os perdoou plenamente, provendo-lhes a melhor parte da terra. José nos ensina que o caminho para o trono passa pela cruz, que a injustiça humana está sob a soberania divina e que o Messias é Aquele que guarda o suprimento infinito de graça para todos os que se aproximam d’Ele em arrependimento."
    ]
  },
  {
    id: 'moses',
    title: 'Moisés',
    shadow: 'O Libertador e Mediador da Lei',
    reality: 'O Grande Libertador e Mediador da Graça',
    color: 'border-l-indigo-600',
    refs: ['Êxodo 2-3', 'Deuteronômio 18:15', 'Hebreus 3:1-6'],
    paragraphs: [
      "Moisés é o tipo de Cristo no seu ofício profético e mediador. Sua preservação milagrosa no nascimento, quando Faraó decretou a morte dos meninos hebreus, ecoa o livramento de Jesus da fúria de Herodes. Moisés deixou o palácio real para se identificar com o sofrimento de seus irmãos escravos, assim como Cristo deixou Sua glória celestial para assumir a forma de servo e se identificar com a nossa miséria sob o pecado.",
      "No deserto, Moisés atuou como o mediador entre um Deus santo e um povo rebelde. Ele subiu ao monte para receber a vontade divina e desceu para entregá-la ao povo. Jesus é o Mediador de uma superior aliança; Ele não apenas subiu ao monte, mas subiu aos céus, e não trouxe apenas tábuas de pedra, mas gravou a lei da graça nos nossos corações pelo Espírito. Moisés intercedeu pelo povo para que a ira divina não os consumisse, exatamente como Cristo vive sempre para interceder por nós.",
      "Moisés foi o libertador que tirou Israel do jugo físico do Egito através de sinais e prodígios. Jesus é o Libertador que nos retira do domínio das trevas e da escravidão espiritual de Satanás. A travessia do Mar Vermelho, liderada por Moisés, simboliza o batismo e a passagem da morte para a vida, uma obra completada perfeitamente por Cristo em Sua ressurreição, garantindo que nossos inimigos espirituais sejam afogados no mar do Seu perdão.",
      "A promessa de Deuteronômio 18:15, onde Moisés afirma que Deus levantaria um 'profeta como ele', aponta diretamente para o Messias. Moisés deu o maná (pão temporário); Jesus é o Pão Vivo que desceu do céu para dar vida eterna. Moisés feriu a rocha para que saísse água; Cristo foi ferido no Calvário para que de Seu lado fluíssem rios de água viva que saciam a sede da alma para sempre.",
      "Contudo, a superioridade de Cristo sobre Moisés é enfatizada em Hebreus: Moisés foi fiel em toda a casa de Deus como servo, mas Cristo o é como Filho sobre Sua própria casa. Enquanto Moisés nos aponta para o padrão de santidade da lei, Jesus nos concede o poder de cumprir essa santidade através da regeneração. Moisés viu a glória de Deus de relance; Jesus é a própria irradiação da glória do Pai, o Mediador final que nos introduz no descanso eterno."
    ]
  },
  {
    id: 'melchizedek',
    title: 'Melquisedeque',
    shadow: 'O Sacerdote-Rei sem Genealogia',
    reality: 'O Sacerdócio Eterno de Cristo',
    color: 'border-l-indigo-500',
    refs: ['Gênesis 14', 'Salmos 110:4', 'Hebreus 7'],
    paragraphs: [
      "Melquisedeque surge nas páginas da Bíblia como uma figura misteriosa e majestosa, portando dois títulos simultâneos: Rei de Salém (Rei de Paz) e Rei de Justiça (seu nome no hebraico). Esse duplo ofício de rei e sacerdote era proibido na lei de Moisés, mas em Melquisedeque vemos o protótipo do Messias, que uniria em Sua própria Pessoa a autoridade governamental e a mediação sacrificial, sendo o nosso Rei-Sacerdote perfeito.",
      "A ausência de genealogia registrada de Melquisedeque — sem pai, sem mãe, sem início de dias ou fim de vida no texto — é uma escolha literária deliberada do Espírito Santo para tipificar a eternidade de Cristo. Enquanto os sacerdotes levitas dependiam de sua linhagem biológica e morriam, o sacerdócio de Melquisedeque permanece por um poder de vida indissolúvel. Cristo não é sacerdote pela linhagem de Arão, mas pela ordem de Melquisedeque, transcendendo as limitações temporais do Antigo Pacto.",
      "O encontro de Melquisedeque com Abraão estabelece a superioridade do seu sacerdócio. Abraão, o patriarca e antepassado de Levi, pagou dízimos a Melquisedeque e foi por ele abençoado. O autor de Hebreus argumenta que o menor é abençoado pelo maior, provando que mesmo antes da instituição da lei mosaica, já existia um padrão de sacerdócio superior que apontava para Jesus, Aquele que abençoa o próprio Abraão e todos os Seus descendentes pela fé.",
      "Melquisedeque trouxe pão e vinho para Abraão após a batalha. Esse gesto é profundamente profético e eucarístico. Milênios antes da Última Ceia, a tipologia já apontava para os elementos que simbolizariam o corpo e o sangue do Messias. Melquisedeque não ofereceu sacrifícios de animais naquele momento, mas apresentou os sinais da comunhão e do sustento, reforçando a natureza espiritual e nutritiva do ministério de Cristo para com o Seu povo exausto da peleja.",
      "A promessa do Salmo 110:4: 'Tu és um sacerdote eterno, segundo a ordem de Melquisedeque', é a âncora da nossa segurança teológica. Jesus entrou no santuário celestial não com sangue alheio, mas com Seu próprio valor intrínseco. Ele vive para sempre para interceder por nós. Melquisedeque nos convida a olhar para além dos ritos terrenos e encontrar em Cristo um Sumo Sacerdote que possui justiça total, promove paz real e oferece um acesso direto e eterno ao trono da graça."
    ]
  },
  {
    id: 'boaz',
    title: 'Boaz',
    shadow: 'O Goel (Parente Resgatador)',
    reality: 'Cristo, o Resgatador da Nossa Herança',
    color: 'border-l-amber-600',
    refs: ['Rute 2-4', 'Levítico 25:25', 'Efésios 1:14'],
    paragraphs: [
      "Boaz é o tipo perfeito de Cristo como o 'Goel', o Parente Resgatador. Na lei de Israel, o Goel deveria preencher três requisitos: ter o direito de resgatar (ser parente próximo), ter o poder financeiro para o resgate e ter a vontade de fazê-lo. Boaz se qualificou ao demonstrar compaixão por Rute, uma forasteira pobre, assim como Cristo Se tornou carne para ser nosso 'parente', possui toda a riqueza da graça e voluntariamente Se entregou por nós.",
      "A herança de Noemi e Rute estava perdida e sob dívida, uma sombra da nossa condição espiritual sob a queda de Adão. Boaz não apenas comprou de volta a terra, mas tomou Rute como sua noiva, restaurando-lhe a dignidade e a linhagem. Cristo faz o mesmo conosco: Ele paga a nossa dívida impagável e nos une a Ele em uma aliança de amor eterno, tornando-nos co-herdeiros de Sua glória celestial.",
      "A bondade de Boaz no campo de colheita prefigura a providência de Cristo para com os humildes. Ele ordenou que deixassem cair punhados de propósito para Rute e garantiu sua proteção contra insultos. Jesus é o Senhor da Colheita que nos provê sustento espiritual abundante na Sua Palavra e nos protege dos ataques do acusador enquanto peregrinamos neste mundo em busca da nossa porção divina.",
      "O ato final de Boaz na porta da cidade, diante das testemunhas, selou juridicamente o resgate. Isso tipifica a obra pública e legal de Cristo na cruz. A salvação não foi um arranjo secreto, mas um ato de justiça divina realizado aos olhos de todos, onde o preço foi pago integralmente e o documento de dívida foi cancelado, garantindo-nos a posse legal da vida eterna.",
      "A união de Boaz e Rute resultou no nascimento de Obede, avô de Davi, inserindo a forasteira na linhagem messiânica. Através do nosso Resgatador Jesus, nós que éramos 'estranhos às alianças da promessa' fomos inseridos na família de Deus. Boaz nos ensina que o amor de Deus é prático e protetor, e que o nosso Resgatador não descansou até que tivesse completado toda a obra de nos trazer de volta para casa."
    ]
  },
  {
    id: 'david',
    title: 'Davi',
    shadow: 'O Rei Pastor e Guerreiro',
    reality: 'Cristo, o Bom Pastor e Rei dos Reis',
    color: 'border-l-blue-700',
    refs: ['1 Samuel 16-17', 'Salmo 23', 'Apocalipse 19:16'],
    paragraphs: [
      "Davi prefigura Cristo em Sua trajetória da humildade à exaltação. Como o filho mais novo, pastoreando ovelhas nos campos de Belém, ele era desprezado por seus irmãos mas escolhido por Deus. Jesus também nasceu em Belém e viveu em obscuridade antes de ser manifestado como o Grande Pastor. A vitória de Davi sobre Golias é o tipo clássico de Cristo vencendo Satanás: o campeão de Israel luta sozinho para dar a vitória a todo o povo que estava paralisado pelo medo.",
      "O período de Davi no deserto, perseguido por Saul, tipifica o tempo em que Cristo é rejeitado pelo sistema religioso estabelecido do mundo. Davi reuniu em torno de si os aflitos, os endividados e os amargurados de espírito, transformando-os em valentes; assim Jesus nos chama em nossas misérias para nos tornar soldados de Seu Reino espiritual. A lealdade dos seguidores de Davi na caverna de Adulão ecoa a devoção da Igreja ao seu Senhor rejeitado.",
      "Como Rei em Jerusalém, Davi estabeleceu o trono da justiça e da adoração. Ele foi o 'homem segundo o coração de Deus' que buscou trazer a Arca para o centro da nação. Cristo é o Herdeiro do Trono de Davi, aquele cujo reino não terá fim. Enquanto o reino de Davi foi marcado por guerras físicas para estabelecer a paz, o Reino de Jesus vence as potências espirituais para nos conceder a Shalom (paz) que excede todo o entendimento.",
      "As falhas de Davi servem para destacar a perfeição de Cristo. Davi pecou e sofreu as consequências, mas Cristo permaneceu impecável em todas as Suas provações. A tipologia aqui é de contraste: Davi aponta para a necessidade de um Rei perfeito que não falharia com o Seu povo. As promessas feitas a Davi em 2 Samuel 7 encontram seu 'Sim' e 'Amém' na Pessoa de Jesus, o Leão da tribo de Judá.",
      "Finalmente, o papel de Davi como salmista revela a profundidade da vida interior do Messias. Muitos salmos de Davi são profecias diretas das dores e do triunfo de Cristo. Davi nos ensina que o Rei de Deus é também um servo sofredor, um pastor zeloso e um conquistador invencível. Estudar Davi é contemplar a majestade e a humanidade de Jesus, o Filho de Davi que é, simultaneamente, o Senhor de Davi."
    ]
  },
  {
    id: 'tabernacle_type',
    title: 'Tabernáculo',
    shadow: 'A Tenda da Habitação Divina',
    reality: 'O Verbo que Tabernaculou entre Nós',
    color: 'border-l-rose-500',
    refs: ['Êxodo 25-40', 'João 1:14', 'Hebreus 9'],
    paragraphs: [
      "O Tabernáculo é o 'mapa arquitetônico' de Cristo. Quando o evangelista João afirma que o Verbo se fez carne e 'habitou' (literalmente: tabernaculou) entre nós, ele estava conectando Jesus diretamente à tenda do deserto. Assim como o Tabernáculo era a habitação visível de Deus no meio do acampamento de Israel, Cristo é a manifestação plena da divindade em forma humana, o Emanuel, Deus conosco.",
      "Externamente, o Tabernáculo era humilde, coberto com peles de animais sem beleza aparente, o que escondia a glória de ouro e linho bordado em seu interior. Isso prefigura a encarnação de Jesus, que 'não tinha parecer nem formosura' para o mundo caído, escondendo Sua glória divina sob a 'tenda' da humanidade sofredora. Apenas aqueles que entravam pela porta podiam ver a magnificência do ouro e a luz do candelabro, assim como somente pela fé contemplamos a glória do Unigênito do Pai.",
      "Cada peça do mobiliário é um atributo messiânico. O Altar de Bronze fala de Sua morte expiatória; a Pia de Bronze de Sua purificação; a Mesa dos Pães de Sua provisão; o Candelabro de Sua iluminação; e o Altar de Incenso de Sua intercessão contínua. No coração de tudo, a Arca da Aliança continha a lei de Deus, assim como Cristo declarou: 'Tua lei está no meio do meu coração'. Ele é o cumprimento perfeito de cada exigência do santuário, sendo Ele mesmo o Altar, o Sacrifício e o Sumo Sacerdote.",
      "O Véu que separava o Lugar Santo do Santo dos Santos é especificamente identificado em Hebreus como a 'carne de Cristo'. No momento de Sua morte, o véu do Templo rasgou-se de alto a baixo, significando que o caminho para a presença imediata de Deus foi aberto pelo rompimento de seu corpo. Não há mais separação para os que estão em Cristo; o Tabernáculo que antes era um limite, tornou-se em Jesus uma porta aberta para a eternidade.",
      "Estudar o Tabernáculo como tipo de Cristo é entender que Deus planejou cada detalhe da nossa comunhão com Ele. Ele não habita em templos feitos por mãos humanas, mas estabeleceu Sua habitação definitiva em Cristo, e por meio d’Ele, habita em nós pelo Espírito Santo. O Tabernáculo nos ensina que a aproximação de Deus exige santidade, sacrifício e mediação, e que todas essas demandas são plenamente satisfeitas na obra consumada de Jesus no Calvário."
    ]
  }
];

const TypologyTab: React.FC<{ userState: UserState, setUserState: any }> = ({ userState, setUserState }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const sendToStudio = async (entry: TypologyEntry) => {
    const sermons = await getSermons();
    let target = sermons.find(s => s.status === 'draft') || (sermons.length > 0 ? sermons[0] : null);
    
    if (!target) {
      target = {
        id: `sermon_${Date.now()}`,
        title: `Estudo: ${entry.title}`,
        type: 'expository',
        date: new Date().toISOString(),
        tags: ['Tipologia'],
        blocks: [],
        status: 'draft',
        version: 1,
        folder: 'Estudos de Tipologia'
      };
    }

    const newBlock: SermonBlock = {
      id: `type_${Date.now()}`,
      type: 'point',
      title: `Tipologia Completa: ${entry.title}`,
      content: `SOMBRA: ${entry.shadow}\nREALIDADE: ${entry.reality}\n\n${entry.paragraphs.join('\n\n')}`
    };

    await saveSermon({ ...target, blocks: [...target.blocks, newBlock] });
    alert(`Enviado para o Estúdio: ${target.title}`);
  };

  return (
    <div className="space-y-10 animate-in fade-in pb-40">
      {/* Header Premium */}
      <div className="bg-slate-900 p-10 md:p-14 rounded-[50px] md:rounded-[70px] text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-600/40 via-transparent to-amber-500/10 pointer-events-none"></div>
        <div className="relative z-10 w-20 h-20 bg-white/10 rounded-[28px] flex items-center justify-center text-amber-400 shadow-2xl border border-white/10 backdrop-blur-md">
           {ICON_TYPOLOGY('w-10 h-10')}
        </div>
        <div className="relative z-10 flex-1 text-center md:text-left">
          <span className="text-amber-400 font-black uppercase tracking-[0.5em] text-[9px] mb-2 block">Tipologia Logos • 42 Sombras Reais</span>
          <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-1 leading-tight">Tipos e Sombras de Cristo</h2>
          <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest italic">A Revelação de Jesus no Antigo Testamento</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {TYPOLOGY_DATA.map((entry) => (
          <div 
            key={entry.id}
            className={`bg-white dark:bg-slate-800 rounded-[50px] border border-slate-100 dark:border-slate-700 shadow-sm transition-all overflow-hidden border-l-[12px] ${entry.color} ${selectedId === entry.id ? 'ring-2 ring-indigo-500/20 shadow-xl' : 'hover:shadow-md'}`}
          >
            <button 
              onClick={() => setSelectedId(selectedId === entry.id ? null : entry.id)}
              className="w-full p-8 md:p-12 text-left flex justify-between items-center group"
            >
              <div className="flex-1">
                 <div className="flex items-center gap-4 mb-3">
                   <h3 className="text-2xl md:text-4xl font-black text-slate-800 dark:text-white uppercase italic tracking-tighter leading-none">{entry.title}</h3>
                   <span className="bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full text-[9px] font-black text-slate-400 uppercase tracking-widest">Sombra #{entry.id}</span>
                 </div>
                 <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-2">
                    <div className="flex items-center gap-2">
                       <span className="text-[10px] font-black text-slate-400 uppercase">Sombra:</span>
                       <span className="text-xs font-bold text-slate-600 dark:text-slate-300 italic">{entry.shadow}</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="text-[10px] font-black text-indigo-500 uppercase">Realidade:</span>
                       <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 italic font-serif">{entry.reality}</span>
                    </div>
                 </div>
              </div>
              <div className={`p-4 rounded-full transition-transform ${selectedId === entry.id ? 'rotate-180 bg-slate-100 dark:bg-slate-700' : 'bg-slate-50 dark:bg-slate-900 group-hover:scale-110'}`}>
                <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </button>

            {selectedId === entry.id && (
              <div className="px-8 md:px-12 pb-12 space-y-10 animate-in slide-in-from-top-4">
                 <div className="flex flex-wrap gap-2">
                    {entry.refs.map(r => (
                      <span key={r} className="px-4 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 text-[10px] font-black uppercase rounded-xl border border-indigo-100 dark:border-indigo-800">
                        {ICON_BIBLE('w-3 h-3 inline-block mr-1')} {r}
                      </span>
                    ))}
                 </div>

                 <div className="space-y-8 max-w-4xl">
                    {entry.paragraphs.map((p, i) => (
                      <p key={i} className="bible-text text-lg md:text-xl leading-relaxed text-slate-700 dark:text-slate-200 text-justify first-letter:text-4xl first-letter:font-black first-letter:text-indigo-600 first-letter:mr-1">
                        {p}
                      </p>
                    ))}
                 </div>

                 <div className="pt-10 border-t border-slate-50 dark:border-slate-700 flex flex-wrap gap-4">
                    <button 
                      onClick={() => sendToStudio(entry)}
                      className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl hover:bg-indigo-700 transition-all flex items-center gap-3"
                    >
                      {ICON_SERMON('w-5 h-5')} Capturar Todo Conteúdo
                    </button>
                    <button className="bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-200 transition-all">
                      Compartilhar Insight
                    </button>
                 </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <footer className="mt-20 py-20 border-t border-slate-100 dark:border-slate-800 text-center">
         <div className="w-16 h-1 bg-indigo-100 mx-auto mb-6 rounded-full"></div>
         <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">Dabar Logos • Typology Engine v1.1</p>
         <p className="text-[9px] text-slate-300 uppercase mt-2 italic">A glória do Novo está oculta no Antigo; o mistério do Antigo é revelado no Novo.</p>
      </footer>
    </div>
  );
};

export default TypologyTab;
