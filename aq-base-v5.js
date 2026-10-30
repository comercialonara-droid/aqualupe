/* ============================================================
   AQUALUPE · BASE COMPARTILHADA
   Usada pelo site (index.html) e pela Área da Loja (loja/).
   Catálogo inicial, lojas, regras de estoque, conexão com o
   Firebase e o modo demonstração (quando o Firebase não está ligado).
   ============================================================ */
(function(){
'use strict';

/* Todas as lojas da marca (o histórico antigo ainda pode citar Bangu e Carioca) */
const LOJAS_TODAS = [
  { k:'b', nome:'Bangu Shopping',    curto:'Bangu'    },
  { k:'c', nome:'Carioca Shopping',  curto:'Carioca'  },
  { k:'a', nome:'Americas Shopping', curto:'Américas' }
];
/* GESTÃO INTERNA: o estoque do site sai só destas lojas.
   Decisão de 20/10/2026 com a Flávia: só o Americas Shopping.
   Para voltar às três lojas, use ['b','c','a']. O público nunca vê isso:
   para as clientes é sempre a loja online da Aqualupe. */
const LOJAS_SITE = ['a'];
const LOJAS = LOJAS_TODAS.filter(l => LOJAS_SITE.includes(l.k));
const T = ['P','M','G','GG'];

/* Categorias do site (as fotos dos círculos ficam no próprio site) */
const CATS = [
  { slug:'vestido-longo',  nome:'Vestido Longo',  tipo:'vlongo',  cor:'#6B7A4B', subs:['Liso','Estampado'] },
  { slug:'vestido-midi',   nome:'Vestido Midi',   tipo:'vmidi',   cor:'#7A2E45', subs:['Liso','Estampado'] },
  { slug:'vestido-curto',  nome:'Vestido Curto',  tipo:'vcurto',  cor:'#D9A5B3', subs:['Liso','Estampado'] },
  { slug:'conjuntos',      nome:'Conjuntos',      tipo:'conjc',   cor:'#C9B38C', subs:['Calça','Saia'] },
  { slug:'blusas',         nome:'Blusas',         tipo:'blusa',   cor:'#EFE6D8', subs:['Regatas e tops','Cropped','Coletes','Camisas','Tricot'] },
  { slug:'calcas',         nome:'Calças',         tipo:'calca',   cor:'#26364F', subs:['Alfaiataria','Jeans','Leggings'] },
  { slug:'saias-e-shorts', nome:'Saias e Shorts', tipo:'saia',    cor:'#9DAE8E', subs:['Saias','Shorts'] },
  { slug:'macacoes',       nome:'Macacões',       tipo:'macacao', cor:'#2B2528', subs:['Liso','Estampado'] },
  { slug:'macaquinhos',    nome:'Macaquinhos',    tipo:'macacao', cor:'#4A2E22', subs:['Liso','Estampado'] },
  { slug:'acessorios',     nome:'Acessórios',     tipo:'chapeu',  cor:'#D9BF8C', subs:['Bolsas','Chapéus'] }
];

const DESC = {
  vlongo:'Caimento fluido, do busto à barra. Uma peça só para o dia e a noite.',
  vmidi:'Comprimento midi, versátil para trabalho, passeio e festa.',
  vcurto:'Leve e prática, para o dia a dia e programas de verão.',
  conjc:'Conjunto de blusa e calça para montar um look completo em um passo.',
  conjs:'Conjunto de blusa e saia com acabamento elegante.',
  blusa:'Peça-base para combinar com calça, saia ou short.',
  calca:'Modelagem confortável e fácil de combinar.',
  saia:'Peça leve que valoriza o look.',
  macacao:'Look completo em uma peça só, com caimento elegante.',
  bolsa:'Acessório para fechar o look.',
  chapeu:'Acessório leve e charmoso para os dias de sol.'
};

/* Peças de exemplo (as 24 que estavam no site antes das fotos reais) */
const EXEMPLOS = [
  {sku:'AQ-0401',nome:'Conjunto Alfaiataria',cat:'conjuntos',sub:'Calça',tipo:'conjc',cores:[{n:'Areia',h:'#C9B38C'},{n:'Preto',h:'#2B2528'},{n:'Verde Oliva',h:'#6B7A4B'}]},
  {sku:'AQ-0411',nome:'Conjunto Saia e Blusa',cat:'conjuntos',sub:'Saia',tipo:'conjs',novo:1,cores:[{n:'Rosa',h:'#E8A3B8'},{n:'Off-white',h:'#EFE6D8'}]},
  {sku:'AQ-0501',nome:'Top Cropped',cat:'blusas',sub:'Regatas e tops',tipo:'blusa',cores:[{n:'Off-white',h:'#EFE6D8'},{n:'Preto',h:'#2B2528'},{n:'Rosa',h:'#E8A3B8'}]},
  {sku:'AQ-0511',nome:'Camisa Alongada',cat:'blusas',sub:'Camisas',tipo:'blusa',cores:[{n:'Azul Céu',h:'#A8C4DA'},{n:'Branco',h:'#F6F2EE'}]},
  {sku:'AQ-0521',nome:'Blusa de Tricot',cat:'blusas',sub:'Tricot',tipo:'blusa',cores:[{n:'Nude',h:'#D9BBA6'},{n:'Vinho',h:'#7A2E45'}]},
  {sku:'AQ-0601',nome:'Calça de Alfaiataria',cat:'calcas',sub:'Alfaiataria',tipo:'calca',cores:[{n:'Preto',h:'#2B2528'},{n:'Areia',h:'#C9B38C'}]},
  {sku:'AQ-0611',nome:'Calça Jeans Reta',cat:'calcas',sub:'Jeans',tipo:'calca',cores:[{n:'Jeans Médio',h:'#4E6E8E'},{n:'Jeans Escuro',h:'#26364F'}]},
  {sku:'AQ-0621',nome:'Legging Cintura Alta',cat:'calcas',sub:'Leggings',tipo:'calca',cores:[{n:'Preto',h:'#2B2528'},{n:'Grafite',h:'#5A5558'}]},
  {sku:'AQ-0701',nome:'Saia Midi Plissada',cat:'saias-e-shorts',sub:'Saias',tipo:'saia',novo:1,cores:[{n:'Verde Sálvia',h:'#9DAE8E'},{n:'Rosa Antigo',h:'#D9A5B3'},{n:'Preto',h:'#2B2528'}]},
  {sku:'AQ-0711',nome:'Short de Alfaiataria',cat:'saias-e-shorts',sub:'Shorts',tipo:'saia',cores:[{n:'Areia',h:'#C9B38C'},{n:'Preto',h:'#2B2528'}]},
  {sku:'AQ-0801',nome:'Bolsa Estruturada',cat:'acessorios',sub:'Bolsas',tipo:'bolsa',tam:['Único'],cores:[{n:'Caramelo',h:'#B97A4A'},{n:'Preto',h:'#2B2528'}]},
  {sku:'AQ-0811',nome:'Chapéu de Palha',cat:'acessorios',sub:'Chapéus',tipo:'chapeu',tam:['Único'],cores:[{n:'Palha',h:'#D9BF8C'}]}
];
/* Peças reais com fotos (cadastradas em 26/10/2026). Modelos iguais que só mudam de cor ficam juntos.
   Fotos em img/pecas/. Preço e estoque são lançados na Área da Loja. */
const REAIS = [
  {"sku": "AQ-1001", "nome": "Camisa Manga Bufante com Punho Largo", "cat": "blusas", "sub": "Camisas", "tipo": "blusa", "desc": "Camisa de tecido texturizado com gola, botões e manga longa bufante finalizada em punho largo. Fica linda solta ou por dentro da calça.", "novo": 1, "bf": 1, "cores": [{"n": "Verde Limão", "h": "#8CC63F", "sf": ["img/pecas/aq-1001-verde-limao-1.jpg", "img/pecas/aq-1001-verde-limao-2.jpg", "img/pecas/aq-1001-verde-limao-3.jpg"]}, {"n": "Amarelo Limão", "h": "#C9D22E", "sf": ["img/pecas/aq-1001-amarelo-limao-1.jpg", "img/pecas/aq-1001-amarelo-limao-2.jpg", "img/pecas/aq-1001-amarelo-limao-3.jpg"]}, {"n": "Laranja", "h": "#F28B30", "sf": ["img/pecas/aq-1001-laranja-1.jpg", "img/pecas/aq-1001-laranja-2.jpg", "img/pecas/aq-1001-laranja-3.jpg"]}], "ordem": -100},
  {"sku": "AQ-1002", "nome": "Camisa Manga Longa Ampla", "cat": "blusas", "sub": "Camisas", "tipo": "blusa", "desc": "Camisa de modelagem ampla, com gola, botões e manga longa. Básica que vai do trabalho ao fim de semana.", "novo": 1, "bf": 1, "cores": [{"n": "Coral", "h": "#E0503A", "sf": ["img/pecas/aq-1002-coral-1.jpg", "img/pecas/aq-1002-coral-2.jpg", "img/pecas/aq-1002-coral-3.jpg"]}, {"n": "Pink", "h": "#C2307A", "sf": ["img/pecas/aq-1002-pink-1.jpg", "img/pecas/aq-1002-pink-2.jpg"]}, {"n": "Roxo", "h": "#8E3A9A", "sf": ["img/pecas/aq-1002-roxo-1.jpg", "img/pecas/aq-1002-roxo-2.jpg"]}, {"n": "Azul Índigo", "h": "#4B4F8C", "sf": ["img/pecas/aq-1002-azul-indigo-1.jpg", "img/pecas/aq-1002-azul-indigo-2.jpg"]}], "ordem": -99},
  {"sku": "AQ-1003", "nome": "Camisa com Bolso e Vivo Vazado", "cat": "blusas", "sub": "Camisas", "tipo": "blusa", "desc": "Camisa de manga longa com bolso no peito e acabamento vazado na carcela e nos punhos.", "novo": 1, "bf": 1, "cores": [{"n": "Verde Oliva", "h": "#7E8C62", "sf": ["img/pecas/aq-1003-verde-oliva-1.jpg", "img/pecas/aq-1003-verde-oliva-2.jpg"]}], "ordem": -98},
  {"sku": "AQ-1004", "nome": "Cropped Manga Bufante Decote Quadrado", "cat": "blusas", "sub": "Cropped", "tipo": "blusa", "desc": "Cropped de decote quadrado com manga curta bufante e lastex nas costas, que ajusta ao corpo.", "novo": 1, "bf": 1, "cores": [{"n": "Lavanda", "h": "#A9B3DD", "sf": ["img/pecas/aq-1004-lavanda-1.jpg", "img/pecas/aq-1004-lavanda-2.jpg", "img/pecas/aq-1004-lavanda-3.jpg"]}, {"n": "Branco", "h": "#F4F1EA", "sf": ["img/pecas/aq-1004-branco-1.jpg", "img/pecas/aq-1004-branco-2.jpg"]}, {"n": "Coral", "h": "#E0503A", "sf": ["img/pecas/aq-1004-coral-1.jpg", "img/pecas/aq-1004-coral-2.jpg", "img/pecas/aq-1004-coral-3.jpg"]}, {"n": "Preto", "h": "#1F1D1E", "sf": ["img/pecas/aq-1004-preto-1.jpg", "img/pecas/aq-1004-preto-2.jpg", "img/pecas/aq-1004-preto-3.jpg"]}, {"n": "Verde Menta", "h": "#A9CDB5", "sf": ["img/pecas/aq-1004-verde-menta-1.jpg", "img/pecas/aq-1004-verde-menta-2.jpg", "img/pecas/aq-1004-verde-menta-3.jpg"]}], "ordem": -97},
  {"sku": "AQ-1005", "nome": "Cropped Manga Bufante com Amarração", "cat": "blusas", "sub": "Cropped", "tipo": "blusa", "desc": "Cropped de tecido texturizado com manga bufante e amarração no busto para ajustar o decote.", "novo": 1, "bf": 1, "cores": [{"n": "Verde Limão", "h": "#8CC63F", "sf": ["img/pecas/aq-1005-verde-limao-1.jpg", "img/pecas/aq-1005-verde-limao-2.jpg", "img/pecas/aq-1005-verde-limao-3.jpg"]}], "ordem": -96},
  {"sku": "AQ-1006", "nome": "Cropped Alça Larga com Faixa", "cat": "blusas", "sub": "Cropped", "tipo": "blusa", "desc": "Cropped de alça larga com faixa dobrada no busto e lastex nas costas.", "novo": 1, "bf": 1, "cores": [{"n": "Azul", "h": "#7C9CCB", "sf": ["img/pecas/aq-1006-azul-1.jpg", "img/pecas/aq-1006-azul-2.jpg", "img/pecas/aq-1006-azul-3.jpg"]}], "ordem": -95},
  {"sku": "AQ-1007", "nome": "Cropped Decote Coração", "cat": "blusas", "sub": "Cropped", "tipo": "blusa", "desc": "Cropped de alça larga com decote coração e lastex nas costas.", "novo": 1, "bf": 1, "cores": [{"n": "Marrom Chocolate", "h": "#4A2F28", "sf": ["img/pecas/aq-1007-marrom-chocolate-1.jpg", "img/pecas/aq-1007-marrom-chocolate-2.jpg", "img/pecas/aq-1007-marrom-chocolate-3.jpg"]}], "ordem": -94},
  {"sku": "AQ-1008", "nome": "Cropped Alças Franzidas", "cat": "blusas", "sub": "Cropped", "tipo": "blusa", "desc": "Cropped de decote levemente curvo, alças largas franzidas e lastex nas costas.", "novo": 1, "bf": 1, "cores": [{"n": "Rosa", "h": "#E77FB0", "sf": ["img/pecas/aq-1008-rosa-1.jpg", "img/pecas/aq-1008-rosa-2.jpg", "img/pecas/aq-1008-rosa-3.jpg"]}], "ordem": -93},
  {"sku": "AQ-1009", "nome": "Cropped com Nó no Busto", "cat": "blusas", "sub": "Cropped", "tipo": "blusa", "desc": "Cropped com torção no busto, alças finas reguláveis e zíper nas costas.", "novo": 1, "bf": 1, "cores": [{"n": "Roxo", "h": "#7B2D8B", "sf": ["img/pecas/aq-1009-roxo-1.jpg", "img/pecas/aq-1009-roxo-2.jpg", "img/pecas/aq-1009-roxo-3.jpg"]}], "ordem": -92},
  {"sku": "AQ-1010", "nome": "Cropped Decote V Torcido", "cat": "blusas", "sub": "Cropped", "tipo": "blusa", "desc": "Cropped de decote V com torção no busto, alças reguláveis e lastex com babadinho nas costas.", "novo": 1, "bf": 1, "cores": [{"n": "Preto", "h": "#1F1D1E", "sf": ["img/pecas/aq-1010-preto-1.jpg", "img/pecas/aq-1010-preto-2.jpg", "img/pecas/aq-1010-preto-3.jpg"]}], "ordem": -91},
  {"sku": "AQ-1011", "nome": "Cropped Alça Larga Franzida", "cat": "blusas", "sub": "Cropped", "tipo": "blusa", "desc": "Cropped de decote reto com alças largas franzidas e zíper nas costas.", "novo": 1, "bf": 1, "cores": [{"n": "Azul Lavanda", "h": "#A7B4DA", "sf": ["img/pecas/aq-1011-azul-lavanda-1.jpg", "img/pecas/aq-1011-azul-lavanda-2.jpg", "img/pecas/aq-1011-azul-lavanda-3.jpg"]}], "ordem": -90},
  {"sku": "AQ-1012", "nome": "Regata Cropped Gola Redonda", "cat": "blusas", "sub": "Regatas e tops", "tipo": "blusa", "desc": "Regata cropped de corte reto e gola redonda. Básica para usar com cintura alta.", "novo": 1, "bf": 1, "cores": [{"n": "Azul Marinho", "h": "#232A3D", "sf": ["img/pecas/aq-1012-azul-marinho-1.jpg", "img/pecas/aq-1012-azul-marinho-2.jpg", "img/pecas/aq-1012-azul-marinho-3.jpg"]}], "ordem": -89},
  {"sku": "AQ-1013", "nome": "Regata de Cetim com Renda", "cat": "blusas", "sub": "Regatas e tops", "tipo": "blusa", "desc": "Regata de cetim com renda no decote e alças finas. Vai bem sozinha ou por baixo de blazer.", "novo": 1, "bf": 1, "cores": [{"n": "Lilás", "h": "#C7C9E0", "sf": ["img/pecas/aq-1013-lilas-1.jpg", "img/pecas/aq-1013-lilas-2.jpg", "img/pecas/aq-1013-lilas-3.jpg"]}, {"n": "Off-white", "h": "#EFE6D3", "sf": ["img/pecas/aq-1013-off-white-1.jpg", "img/pecas/aq-1013-off-white-2.jpg", "img/pecas/aq-1013-off-white-3.jpg"]}], "ordem": -88},
  {"sku": "AQ-1014", "nome": "Regata Decote U com Fendas", "cat": "blusas", "sub": "Regatas e tops", "tipo": "blusa", "desc": "Regata de decote U com fendas laterais na barra.", "novo": 1, "bf": 1, "cores": [{"n": "Vermelho", "h": "#D9363E", "sf": ["img/pecas/aq-1014-vermelho-1.jpg", "img/pecas/aq-1014-vermelho-2.jpg", "img/pecas/aq-1014-vermelho-3.jpg"]}], "ordem": -87},
  {"sku": "AQ-1015", "nome": "Blusa Alça Larga com Botões Dourados", "cat": "blusas", "sub": "Regatas e tops", "tipo": "blusa", "desc": "Blusa de alça larga com decote coração e botões dourados na frente. Acinturada, com barra levemente evasê.", "novo": 1, "bf": 1, "cores": [{"n": "Verde Militar", "h": "#4B5A3A", "sf": ["img/pecas/aq-1015-verde-militar-1.jpg", "img/pecas/aq-1015-verde-militar-2.jpg", "img/pecas/aq-1015-verde-militar-3.jpg"]}, {"n": "Preto", "h": "#1F1D1E", "sf": ["img/pecas/aq-1015-preto-1.jpg", "img/pecas/aq-1015-preto-2.jpg", "img/pecas/aq-1015-preto-3.jpg"]}, {"n": "Off-white", "h": "#EFE9DC", "sf": ["img/pecas/aq-1015-off-white-1.jpg", "img/pecas/aq-1015-off-white-2.jpg", "img/pecas/aq-1015-off-white-3.jpg"]}, {"n": "Marrom", "h": "#5A3A28", "sf": ["img/pecas/aq-1015-marrom-1.jpg", "img/pecas/aq-1015-marrom-2.jpg", "img/pecas/aq-1015-marrom-3.jpg"]}], "ordem": -86},
  {"sku": "AQ-1016", "nome": "Blusa Frente Única Torcida", "cat": "blusas", "sub": "Regatas e tops", "tipo": "blusa", "desc": "Blusa frente única com torção no pescoço, abertura em gota e alças cruzadas nas costas. Tecido texturizado.", "novo": 1, "bf": 1, "cores": [{"n": "Verde Limão", "h": "#B5D334", "sf": ["img/pecas/aq-1016-verde-limao-1.jpg", "img/pecas/aq-1016-verde-limao-2.jpg", "img/pecas/aq-1016-verde-limao-3.jpg"]}, {"n": "Verde Água", "h": "#3BAA7E", "sf": ["img/pecas/aq-1016-verde-agua-1.jpg"]}, {"n": "Laranja", "h": "#F07F2E", "sf": ["img/pecas/aq-1016-laranja-1.jpg", "img/pecas/aq-1016-laranja-2.jpg", "img/pecas/aq-1016-laranja-3.jpg"]}], "ordem": -85},
  {"sku": "AQ-1017", "nome": "Blusa Peplum Babado Duplo", "cat": "blusas", "sub": "Regatas e tops", "tipo": "blusa", "desc": "Blusa de alça fina transpassada, com decote V na frente e nas costas e barra peplum com babado duplo.", "novo": 1, "bf": 1, "cores": [{"n": "Preto", "h": "#1F1D1E", "sf": ["img/pecas/aq-1017-preto-1.jpg", "img/pecas/aq-1017-preto-2.jpg", "img/pecas/aq-1017-preto-3.jpg"]}, {"n": "Vermelho", "h": "#D9363E", "sf": ["img/pecas/aq-1017-vermelho-1.jpg", "img/pecas/aq-1017-vermelho-2.jpg", "img/pecas/aq-1017-vermelho-3.jpg"]}], "ordem": -84},
  {"sku": "AQ-1018", "nome": "Blusa Reta Alça Fina com Fendas", "cat": "blusas", "sub": "Regatas e tops", "tipo": "blusa", "desc": "Blusa reta de alça fina e decote reto, com fendas laterais e zíper nas costas.", "novo": 1, "bf": 1, "cores": [{"n": "Preto", "h": "#1F1D1E", "sf": ["img/pecas/aq-1018-preto-1.jpg", "img/pecas/aq-1018-preto-2.jpg", "img/pecas/aq-1018-preto-3.jpg"]}, {"n": "Azul Claro", "h": "#A9C1E3", "sf": ["img/pecas/aq-1018-azul-claro-1.jpg", "img/pecas/aq-1018-azul-claro-2.jpg", "img/pecas/aq-1018-azul-claro-3.jpg"]}], "ordem": -83},
  {"sku": "AQ-1019", "nome": "Blusa Trapézio Alça Fina", "cat": "blusas", "sub": "Regatas e tops", "tipo": "blusa", "desc": "Blusa trapézio de alça fina e decote reto, em tecido com toque de linho.", "novo": 1, "bf": 1, "cores": [{"n": "Preto", "h": "#1F1D1E", "sf": ["img/pecas/aq-1019-preto-1.jpg", "img/pecas/aq-1019-preto-2.jpg", "img/pecas/aq-1019-preto-3.jpg"]}], "ordem": -82},
  {"sku": "AQ-1020", "nome": "Blusa Alça Fina com Botões", "cat": "blusas", "sub": "Regatas e tops", "tipo": "blusa", "desc": "Blusa de alça fina com botões na frente, recorte abaixo do busto e abertura na barra.", "novo": 1, "bf": 1, "cores": [{"n": "Preto", "h": "#1F1D1E", "sf": ["img/pecas/aq-1020-preto-1.jpg", "img/pecas/aq-1020-preto-2.jpg", "img/pecas/aq-1020-preto-3.jpg"]}], "ordem": -81},
  {"sku": "AQ-1021", "nome": "Blusa Transpassada com Amarração", "cat": "blusas", "sub": "Regatas e tops", "tipo": "blusa", "desc": "Blusa sem manga transpassada, com amarração lateral, recorte vazado no ombro e zíper nas costas.", "novo": 1, "bf": 1, "cores": [{"n": "Azul Claro", "h": "#A9C1E3", "sf": ["img/pecas/aq-1021-azul-claro-1.jpg", "img/pecas/aq-1021-azul-claro-2.jpg", "img/pecas/aq-1021-azul-claro-3.jpg"]}], "ordem": -80},
  {"sku": "AQ-1022", "nome": "Blusa Barra em Ponta com Zíper", "cat": "blusas", "sub": "Regatas e tops", "tipo": "blusa", "desc": "Blusa sem manga com recortes diagonais, barra em ponta e zíper aparente prateado nas costas.", "novo": 1, "bf": 1, "cores": [{"n": "Nude", "h": "#EBDDD0", "sf": ["img/pecas/aq-1022-nude-1.jpg", "img/pecas/aq-1022-nude-2.jpg", "img/pecas/aq-1022-nude-3.jpg"]}], "ordem": -79},
  {"sku": "AQ-1023", "nome": "Blusa Gola Grande com Botões Flor", "cat": "blusas", "sub": "Regatas e tops", "tipo": "blusa", "desc": "Blusa sem manga com gola grande arredondada e botões dourados em formato de flor.", "novo": 1, "bf": 1, "cores": [{"n": "Preto", "h": "#1F1D1E", "sf": ["img/pecas/aq-1023-preto-1.jpg", "img/pecas/aq-1023-preto-2.jpg", "img/pecas/aq-1023-preto-3.jpg"]}], "ordem": -78},
  {"sku": "AQ-1024", "nome": "Blusa Ciganinha", "cat": "blusas", "sub": "Regatas e tops", "tipo": "blusa", "desc": "Blusa ombro a ombro com elástico no decote e corpo amplo e rodado.", "novo": 1, "bf": 1, "cores": [{"n": "Coral", "h": "#D9483A", "sf": ["img/pecas/aq-1024-coral-1.jpg", "img/pecas/aq-1024-coral-2.jpg", "img/pecas/aq-1024-coral-3.jpg"]}], "ordem": -77},
  {"sku": "AQ-1025", "nome": "Blusa Alça Larga com Fenda Frontal", "cat": "blusas", "sub": "Regatas e tops", "tipo": "blusa", "desc": "Blusa de alça larga e decote quadrado, com recortes horizontais, fenda na barra e elástico nas costas.", "novo": 1, "bf": 1, "cores": [{"n": "Verde Menta", "h": "#A3C9B0", "sf": ["img/pecas/aq-1025-verde-menta-1.jpg", "img/pecas/aq-1025-verde-menta-2.jpg", "img/pecas/aq-1025-verde-menta-3.jpg"]}], "ordem": -76},
  {"sku": "AQ-1026", "nome": "Blusa Um Ombro Só com Babado", "cat": "blusas", "sub": "Regatas e tops", "tipo": "blusa", "desc": "Blusa assimétrica de um ombro só, com babado de acabamento branco, botões na lateral e lastex nas costas.", "novo": 1, "bf": 1, "cores": [{"n": "Verde Limão Claro", "h": "#D5E39A", "sf": ["img/pecas/aq-1026-verde-limao-claro-1.jpg", "img/pecas/aq-1026-verde-limao-claro-2.jpg", "img/pecas/aq-1026-verde-limao-claro-3.jpg"]}], "ordem": -75},
  {"sku": "AQ-1027", "nome": "Blusa Drapeada Alças Franzidas", "cat": "blusas", "sub": "Regatas e tops", "tipo": "blusa", "desc": "Blusa de alças largas franzidas e decote reto, com drapeado assimétrico na frente e zíper nas costas.", "novo": 1, "bf": 1, "cores": [{"n": "Verde Sálvia", "h": "#9DB5A0", "sf": ["img/pecas/aq-1027-verde-salvia-1.jpg", "img/pecas/aq-1027-verde-salvia-2.jpg", "img/pecas/aq-1027-verde-salvia-3.jpg"]}], "ordem": -74},
  {"sku": "AQ-1028", "nome": "Blusa Tomara que Caia", "cat": "blusas", "sub": "Regatas e tops", "tipo": "blusa", "desc": "Blusa tomara que caia com elástico no decote e franzido lateral.", "novo": 1, "bf": 1, "cores": [{"n": "Caramelo", "h": "#C08A4D", "sf": ["img/pecas/aq-1028-caramelo-1.jpg", "img/pecas/aq-1028-caramelo-2.jpg", "img/pecas/aq-1028-caramelo-3.jpg"]}], "ordem": -73},
  {"sku": "AQ-1029", "nome": "Blusa Frente Única com Fivela", "cat": "blusas", "sub": "Regatas e tops", "tipo": "blusa", "desc": "Blusa frente única assimétrica com fivela dourada no ombro e frente transpassada aberta na barra.", "novo": 1, "bf": 1, "cores": [{"n": "Rosa Claro", "h": "#F2B8BF", "sf": ["img/pecas/aq-1029-rosa-claro-1.jpg", "img/pecas/aq-1029-rosa-claro-2.jpg", "img/pecas/aq-1029-rosa-claro-3.jpg"]}], "ordem": -72},
  {"sku": "AQ-1030", "nome": "Blusa Cropped Couro Ecológico", "cat": "blusas", "sub": "Regatas e tops", "tipo": "blusa", "desc": "Blusa cropped de couro ecológico com manga longa, barra e punhos brancos sobrepostos e zíper nas costas.", "novo": 1, "bf": 1, "cores": [{"n": "Preto", "h": "#1F1D1E", "sf": ["img/pecas/aq-1030-preto-1.jpg", "img/pecas/aq-1030-preto-2.jpg", "img/pecas/aq-1030-preto-3.jpg"]}], "ordem": -71},
  {"sku": "AQ-1031", "nome": "Colete Frente Única", "cat": "blusas", "sub": "Coletes", "tipo": "blusa", "desc": "Colete frente única de decote V com botões e costas nuas.", "novo": 1, "bf": 1, "cores": [{"n": "Verde Sálvia", "h": "#6F8C6E", "sf": ["img/pecas/aq-1031-verde-salvia-1.jpg", "img/pecas/aq-1031-verde-salvia-2.jpg", "img/pecas/aq-1031-verde-salvia-3.jpg"]}, {"n": "Cinza Chumbo", "h": "#5E6170", "sf": ["img/pecas/aq-1031-cinza-chumbo-1.jpg", "img/pecas/aq-1031-cinza-chumbo-2.jpg", "img/pecas/aq-1031-cinza-chumbo-3.jpg"]}, {"n": "Bege", "h": "#BBA58F", "sf": ["img/pecas/aq-1031-bege-1.jpg", "img/pecas/aq-1031-bege-2.jpg", "img/pecas/aq-1031-bege-3.jpg"]}], "ordem": -70},
  {"sku": "AQ-1032", "nome": "Colete Cropped Bicolor", "cat": "blusas", "sub": "Coletes", "tipo": "blusa", "desc": "Colete cropped bicolor de decote quadrado, botões prateados, alças reguláveis e barra em ponta.", "novo": 1, "bf": 1, "cores": [{"n": "Bege e Branco", "h": "#D8C4A8", "sf": ["img/pecas/aq-1032-bege-e-branco-1.jpg", "img/pecas/aq-1032-bege-e-branco-2.jpg", "img/pecas/aq-1032-bege-e-branco-3.jpg"]}, {"n": "Caqui e Branco", "h": "#A08A63", "sf": ["img/pecas/aq-1032-caqui-e-branco-1.jpg", "img/pecas/aq-1032-caqui-e-branco-2.jpg", "img/pecas/aq-1032-caqui-e-branco-3.jpg"]}], "ordem": -69},
  {"sku": "AQ-1033", "nome": "Colete Curto Decote V", "cat": "blusas", "sub": "Coletes", "tipo": "blusa", "desc": "Colete curto de decote V com quatro botões encapados e barra em ponta.", "novo": 1, "bf": 1, "cores": [{"n": "Cinza Claro", "h": "#C9D1CF", "sf": ["img/pecas/aq-1033-cinza-claro-1.jpg", "img/pecas/aq-1033-cinza-claro-2.jpg"]}], "ordem": -68},
  {"sku": "AQ-1034", "nome": "Colete Alças Cruzadas", "cat": "blusas", "sub": "Coletes", "tipo": "blusa", "desc": "Colete com alças cruzadas no pescoço, botões encapados e lapelas de bolso. Costas com botão e abertura em gota.", "novo": 1, "bf": 1, "cores": [{"n": "Azul Royal", "h": "#3F4FB8", "sf": ["img/pecas/aq-1034-azul-royal-1.jpg", "img/pecas/aq-1034-azul-royal-2.jpg", "img/pecas/aq-1034-azul-royal-3.jpg"]}], "ordem": -67},
  {"sku": "AQ-1035", "nome": "Colete Decote V com Lapelas", "cat": "blusas", "sub": "Coletes", "tipo": "blusa", "desc": "Colete sem manga com decote V na frente e nas costas e lapelas de bolso.", "novo": 1, "bf": 1, "cores": [{"n": "Preto", "h": "#1F1D1E", "sf": ["img/pecas/aq-1035-preto-1.jpg", "img/pecas/aq-1035-preto-2.jpg", "img/pecas/aq-1035-preto-3.jpg"]}], "ordem": -66},
  {"sku": "AQ-1036", "nome": "Colete Costas Nuas", "cat": "blusas", "sub": "Coletes", "tipo": "blusa", "desc": "Colete de decote V com um botão e costas nuas com elástico.", "novo": 1, "bf": 1, "cores": [{"n": "Marrom Chocolate", "h": "#4A2F28", "sf": ["img/pecas/aq-1036-marrom-chocolate-1.jpg", "img/pecas/aq-1036-marrom-chocolate-2.jpg", "img/pecas/aq-1036-marrom-chocolate-3.jpg"]}], "ordem": -65},
  {"sku": "AQ-1037", "nome": "Colete Gola Pontuda", "cat": "blusas", "sub": "Coletes", "tipo": "blusa", "desc": "Colete com gola grande pontuda e três botões.", "novo": 1, "bf": 1, "cores": [{"n": "Preto", "h": "#1F1D1E", "sf": ["img/pecas/aq-1037-preto-1.jpg", "img/pecas/aq-1037-preto-2.jpg", "img/pecas/aq-1037-preto-3.jpg"]}], "ordem": -64},
  {"sku": "AQ-1038", "nome": "Maxicolete Gola Redonda", "cat": "blusas", "sub": "Coletes", "tipo": "blusa", "desc": "Maxicolete de alfaiataria com gola redonda, botões encapados e bolsos-faca.", "novo": 1, "bf": 1, "cores": [{"n": "Laranja", "h": "#F2A04A", "sf": ["img/pecas/aq-1038-laranja-1.jpg", "img/pecas/aq-1038-laranja-2.jpg", "img/pecas/aq-1038-laranja-3.jpg"]}], "ordem": -63},
  {"sku": "AQ-1039", "nome": "Maxicolete Decote V", "cat": "blusas", "sub": "Coletes", "tipo": "blusa", "desc": "Maxicolete de alfaiataria com decote V, seis botões e bolsos-faca.", "novo": 1, "bf": 1, "cores": [{"n": "Preto", "h": "#2A2A2C", "sf": ["img/pecas/aq-1039-preto-1.jpg", "img/pecas/aq-1039-preto-2.jpg"]}], "ordem": -62},
  {"sku": "AQ-1040", "nome": "Vestido Curto Floral com Babados", "cat": "vestido-curto", "sub": "Estampado", "tipo": "vcurto", "desc": "Vestido curto de alça fina com babado no decote e na barra.", "novo": 1, "bf": 1, "cores": [{"n": "Floral Azul", "h": "#F3E9C6", "sf": ["img/pecas/aq-1040-floral-azul-1.jpg", "img/pecas/aq-1040-floral-azul-2.jpg", "img/pecas/aq-1040-floral-azul-3.jpg"], "est": "floral", "acc": "#5B8BD8"}], "ordem": -61},
  {"sku": "AQ-1041", "nome": "Vestido Curto Floral Decote nas Costas", "cat": "vestido-curto", "sub": "Estampado", "tipo": "vcurto", "desc": "Vestido curto de alça fina com decote V nas costas e babado na barra.", "novo": 1, "bf": 1, "cores": [{"n": "Floral Vermelho", "h": "#F4EEE2", "sf": ["img/pecas/aq-1041-floral-vermelho-1.jpg", "img/pecas/aq-1041-floral-vermelho-2.jpg", "img/pecas/aq-1041-floral-vermelho-3.jpg"], "est": "floral", "acc": "#D0484F"}], "ordem": -60},
  {"sku": "AQ-1042", "nome": "Vestido Longo Tomara que Caia", "cat": "vestido-longo", "sub": "Liso", "tipo": "vlongo", "desc": "Vestido longo tomara que caia com busto franzido, detalhe central e saia fluida.", "novo": 1, "bf": 1, "cores": [{"n": "Mostarda", "h": "#E3A62A", "sf": ["img/pecas/aq-1042-mostarda-1.jpg", "img/pecas/aq-1042-mostarda-2.jpg", "img/pecas/aq-1042-mostarda-3.jpg"]}], "ordem": -59},
  /* Peças com foto de modelo (30/10/2026). pend = ref, tamanho e preço ainda a confirmar pela lista do WhatsApp */
  {"sku": "AQ-1043", "nome": "Macacão Tomara que Caia Pantalona", "cat": "macacoes", "sub": "Liso", "tipo": "macacao", "desc": "Macacão tomara que caia com franzido no corpo e pantalona ampla de malha fluida.", "novo": 1, "bf": 0, "pend": 1, "cores": [{"n": "Azul Royal", "h": "#2F55C8", "sf": ["img/pecas/aq-1043-azul-royal-1.jpg", "img/pecas/aq-1043-azul-royal-2.jpg", "img/pecas/aq-1043-azul-royal-3.jpg"]}], "ordem": -120},
  {"sku": "AQ-1044", "nome": "Macacão Alcinha com Franzido no Busto", "cat": "macacoes", "sub": "Liso", "tipo": "macacao", "desc": "Macacão de alças finas com busto franzido, cós marcado com pregas e pantalona com bolsos.", "novo": 1, "bf": 0, "pend": 1, "cores": [{"n": "Rosa", "h": "#F2B8D8", "sf": ["img/pecas/aq-1044-rosa-1.jpg", "img/pecas/aq-1044-rosa-2.jpg", "img/pecas/aq-1044-rosa-3.jpg"]}, {"n": "Vermelho", "h": "#C8323A"}, {"n": "Preto", "h": "#1F1D1E"}, {"n": "Bege", "h": "#D8C3A5"}, {"n": "Amarelo Manteiga", "h": "#F3E3A1"}, {"n": "Branco", "h": "#F6F4EE"}], "ordem": -119},
  {"sku": "AQ-1045", "nome": "Vestido Curto Frente Única Conchas", "cat": "vestido-curto", "sub": "Estampado", "tipo": "vcurto", "desc": "Vestido curto frente única com amarração no pescoço e costas nuas, em malha com estampa de conchas degradê.", "novo": 1, "bf": 0, "pend": 1, "cores": [{"n": "Conchas Azul", "h": "#3E6FD0", "sf": ["img/pecas/aq-1045-conchas-azul-1.jpg", "img/pecas/aq-1045-conchas-azul-2.jpg", "img/pecas/aq-1045-conchas-azul-3.jpg"]}], "ordem": -118, "tam": ["Único"]},
  {"sku": "AQ-1046", "nome": "Vestido Curto com Laços", "cat": "vestido-curto", "sub": "Liso", "tipo": "vcurto", "desc": "Vestido curto de alças finas com dois laços vazados no busto, saia evasê e zíper nas costas.", "novo": 1, "bf": 0, "pend": 1, "cores": [{"n": "Rosa Claro", "h": "#F3CFE3", "sf": ["img/pecas/aq-1046-rosa-claro-1.jpg", "img/pecas/aq-1046-rosa-claro-2.jpg", "img/pecas/aq-1046-rosa-claro-3.jpg"]}], "ordem": -117},
  {"sku": "AQ-1047", "nome": "Vestido Curto com Cordão Bordado", "cat": "vestido-curto", "sub": "Liso", "tipo": "vcurto", "desc": "Vestido curto reto de alças finas com aplicação de cordão ondulado nas laterais e lastex nas costas.", "novo": 1, "bf": 0, "pend": 1, "cores": [{"n": "Off-white", "h": "#F4F0E6", "sf": ["img/pecas/aq-1047-off-white-1.jpg", "img/pecas/aq-1047-off-white-2.jpg", "img/pecas/aq-1047-off-white-3.jpg"]}], "ordem": -116},
  {"sku": "AQ-1048", "nome": "Vestido Curto Floral com Argola", "cat": "vestido-curto", "sub": "Estampado", "tipo": "vcurto", "desc": "Vestido curto evasê de alças largas com argola no decote, bolsos e estampa floral gráfica.", "novo": 1, "bf": 0, "pend": 1, "cores": [{"n": "Floral Preto e Off", "h": "#2A2A2E", "sf": ["img/pecas/aq-1048-floral-preto-e-off-1.jpg", "img/pecas/aq-1048-floral-preto-e-off-2.jpg", "img/pecas/aq-1048-floral-preto-e-off-3.jpg"]}], "ordem": -115},
  {"sku": "AQ-1049", "nome": "Vestido Midi Costas com Amarração", "cat": "vestido-midi", "sub": "Liso", "tipo": "vmidi", "desc": "Vestido midi de alças finas com decote V franzido e costas abertas com amarração cruzada.", "novo": 1, "bf": 0, "pend": 1, "cores": [{"n": "Off-white", "h": "#F4F0E6", "sf": ["img/pecas/aq-1049-off-white-1.jpg", "img/pecas/aq-1049-off-white-2.jpg", "img/pecas/aq-1049-off-white-3.jpg"]}, {"n": "Rosa", "h": "#F2B8D8"}, {"n": "Azul", "h": "#8FB0E3"}, {"n": "Verde Água", "h": "#7FCFC0"}], "ordem": -114},
  {"sku": "AQ-1050", "nome": "Vestido Longo Tomara que Caia com Recorte", "cat": "vestido-longo", "sub": "Estampado", "tipo": "vlongo", "desc": "Vestido longo tomara que caia com recorte vazado e regulagem na cintura, fenda e estampa floral azul.", "novo": 1, "bf": 0, "pend": 1, "cores": [{"n": "Floral Azul e Branco", "h": "#2F55C8", "sf": ["img/pecas/aq-1050-floral-azul-e-branco-1.jpg"]}], "ordem": -113},
  {"sku": "AQ-1051", "nome": "Vestido Longo Frente Única Conchas", "cat": "vestido-longo", "sub": "Estampado", "tipo": "vlongo", "desc": "Vestido longo frente única com babadinho no decote, recortes nas laterais e estampa de conchas degradê.", "novo": 1, "bf": 0, "pend": 1, "cores": [{"n": "Conchas Azul", "h": "#3E6FD0", "sf": ["img/pecas/aq-1051-conchas-azul-1.jpg", "img/pecas/aq-1051-conchas-azul-2.jpg"]}], "ordem": -112},
  {"sku": "AQ-1052", "nome": "Vestido Longo Coqueiros com Franzido", "cat": "vestido-longo", "sub": "Estampado", "tipo": "vlongo", "desc": "Vestido longo de alças com busto franzido e amarração, saia evasê e estampa de coqueiros.", "novo": 1, "bf": 0, "pend": 1, "cores": [{"n": "Coqueiros Azul e Mostarda", "h": "#2B3F8C", "sf": ["img/pecas/aq-1052-coqueiros-azul-e-mostarda-1.jpg", "img/pecas/aq-1052-coqueiros-azul-e-mostarda-2.jpg", "img/pecas/aq-1052-coqueiros-azul-e-mostarda-3.jpg"]}], "ordem": -111},
  {"sku": "AQ-1053", "nome": "Vestido Longo Três Marias", "cat": "vestido-longo", "sub": "Liso", "tipo": "vlongo", "desc": "Vestido longo de alças finas e decote V, com cintura marcada e saia em camadas.", "novo": 1, "bf": 0, "pend": 1, "cores": [{"n": "Azul Serenity", "h": "#8FB0E3", "sf": ["img/pecas/aq-1053-azul-serenity-1.jpg", "img/pecas/aq-1053-azul-serenity-2.jpg"]}], "ordem": -110},
  {"sku": "AQ-1054", "nome": "Vestido Longo Frente Única Limões", "cat": "vestido-longo", "sub": "Estampado", "tipo": "vlongo", "desc": "Vestido longo frente única de decote V profundo, costas nuas com amarração e estampa de limões e azulejos.", "novo": 1, "bf": 0, "pend": 1, "cores": [{"n": "Limões", "h": "#E9C93B", "sf": ["img/pecas/aq-1054-limoes-1.jpg", "img/pecas/aq-1054-limoes-2.jpg", "img/pecas/aq-1054-limoes-3.jpg"]}], "ordem": -109},
  {"sku": "AQ-1055", "nome": "Vestido Longo Palmeiras e Tucanos", "cat": "vestido-longo", "sub": "Estampado", "tipo": "vlongo", "desc": "Vestido longo de alças com busto franzido e argola, lastex nas costas e estampa de palmeiras e tucanos.", "novo": 1, "bf": 0, "pend": 1, "cores": [{"n": "Palmeiras Azul", "h": "#1F4FB5", "sf": ["img/pecas/aq-1055-palmeiras-azul-1.jpg", "img/pecas/aq-1055-palmeiras-azul-2.jpg", "img/pecas/aq-1055-palmeiras-azul-3.jpg"]}], "ordem": -108},
  {"sku": "AQ-1056", "nome": "Vestido Longo Tucanos e Cajus", "cat": "vestido-longo", "sub": "Estampado", "tipo": "vlongo", "desc": "Vestido longo de alças com faixas listradas no busto, bolsos e estampa de tucanos, coqueiros e cajus.", "novo": 1, "bf": 0, "pend": 1, "cores": [{"n": "Tucanos e Cajus", "h": "#E9DDC2", "sf": ["img/pecas/aq-1056-tucanos-e-cajus-1.jpg", "img/pecas/aq-1056-tucanos-e-cajus-2.jpg", "img/pecas/aq-1056-tucanos-e-cajus-3.jpg"]}], "ordem": -107},
  {"sku": "AQ-1057", "nome": "Vestido Longo Azulejo com Botões", "cat": "vestido-longo", "sub": "Estampado", "tipo": "vlongo", "desc": "Vestido longo de alças largas com botões na frente, saia evasê e estampa de azulejo em preto e branco.", "novo": 1, "bf": 0, "pend": 1, "cores": [{"n": "Azulejo Preto", "h": "#1E1E22", "sf": ["img/pecas/aq-1057-azulejo-preto-1.jpg", "img/pecas/aq-1057-azulejo-preto-2.jpg", "img/pecas/aq-1057-azulejo-preto-3.jpg"]}], "ordem": -106},
  {"sku": "AQ-1058", "nome": "Vestido Longo Abacaxis Alça Dupla", "cat": "vestido-longo", "sub": "Estampado", "tipo": "vlongo", "desc": "Vestido longo de alça dupla assimétrica, recortes acinturados e estampa de abacaxis, cajus e coqueiros.", "novo": 1, "bf": 0, "pend": 1, "cores": [{"n": "Abacaxis Laranja", "h": "#E8712E", "sf": ["img/pecas/aq-1058-abacaxis-laranja-1.jpg"]}], "ordem": -105},
  {"sku": "AQ-1059", "nome": "Vestido Longo Floral Preto Alça Dupla", "cat": "vestido-longo", "sub": "Estampado", "tipo": "vlongo", "desc": "Vestido longo de alça dupla assimétrica, recortes acinturados, lastex nas costas e estampa de flores grandes sobre fundo preto.", "novo": 1, "bf": 0, "pend": 1, "cores": [{"n": "Floral Preto", "h": "#1C1C1F", "sf": ["img/pecas/aq-1059-floral-preto-1.jpg", "img/pecas/aq-1059-floral-preto-2.jpg", "img/pecas/aq-1059-floral-preto-3.jpg"]}], "ordem": -140},
  {"sku": "AQ-1060", "nome": "Vestido Midi Arara Tropical", "cat": "vestido-midi", "sub": "Estampado", "tipo": "vmidi", "desc": "Vestido midi de alças listradas, decote reto, fenda lateral e estampa tropical de araras, abacaxis e hibiscos.", "novo": 1, "bf": 0, "pend": 1, "cores": [{"n": "Arara Tropical", "h": "#E8622E", "sf": ["img/pecas/aq-1060-arara-tropical-1.jpg", "img/pecas/aq-1060-arara-tropical-2.jpg", "img/pecas/aq-1060-arara-tropical-3.jpg"]}], "ordem": -139},
  {"sku": "AQ-1061", "nome": "Vestido Longo Floral Pintado com Amarração", "cat": "vestido-longo", "sub": "Estampado", "tipo": "vlongo", "desc": "Vestido longo de alças com amarração no busto, lastex nas costas, fenda frontal e estampa de flores pintadas.", "novo": 1, "bf": 0, "pend": 1, "cores": [{"n": "Floral Colorido", "h": "#D9482B", "sf": ["img/pecas/aq-1061-floral-colorido-1.jpg", "img/pecas/aq-1061-floral-colorido-2.jpg", "img/pecas/aq-1061-floral-colorido-3.jpg"]}], "ordem": -138},
  {"sku": "AQ-1062", "nome": "Macaquinho Floral Preto com Argola", "cat": "macaquinhos", "sub": "Estampado", "tipo": "macacao", "desc": "Macaquinho de alças finas com argola no decote, lastex nas laterais e estampa de magnólias sobre fundo preto.", "novo": 1, "bf": 0, "pend": 1, "cores": [{"n": "Magnólias Preto", "h": "#15171C", "sf": ["img/pecas/aq-1062-magnolias-preto-1.jpg", "img/pecas/aq-1062-magnolias-preto-2.jpg", "img/pecas/aq-1062-magnolias-preto-3.jpg"]}], "ordem": -137},
  {"sku": "AQ-1063", "nome": "Macaquinho Transpassado Poá", "cat": "macaquinhos", "sub": "Estampado", "tipo": "macacao", "desc": "Macaquinho transpassado com manga ampla, faixa para amarrar na cintura e estampa de poá.", "novo": 1, "bf": 0, "pend": 1, "cores": [{"n": "Poá Marrom", "h": "#4A2E22", "sf": ["img/pecas/aq-1063-poa-marrom-1.jpg", "img/pecas/aq-1063-poa-marrom-2.jpg", "img/pecas/aq-1063-poa-marrom-3.jpg"]}], "ordem": -136},
  {"sku": "AQ-1064", "nome": "Vestido Longo Três Marias Decote Reto", "cat": "vestido-longo", "sub": "Liso", "tipo": "vlongo", "desc": "Vestido longo de alças e decote reto, lastex nas costas e saia em camadas, em tecido com toque de linho.", "novo": 1, "bf": 0, "pend": 1, "cores": [{"n": "Bege", "h": "#C9B07A", "sf": ["img/pecas/aq-1064-bege-1.jpg", "img/pecas/aq-1064-bege-2.jpg"]}], "ordem": -135},
  {"sku": "AQ-1065", "nome": "Vestido Longo Floral Pássaros com Amarração", "cat": "vestido-longo", "sub": "Estampado", "tipo": "vlongo", "desc": "Vestido longo de alças com busto franzido e cordão de amarração, saia evasê e estampa floral de pássaros com barrado.", "novo": 1, "bf": 0, "pend": 1, "cores": [{"n": "Floral Pássaros", "h": "#E8A23A", "sf": ["img/pecas/aq-1065-floral-passaros-1.jpg", "img/pecas/aq-1065-floral-passaros-2.jpg", "img/pecas/aq-1065-floral-passaros-3.jpg"]}], "ordem": -160},
  {"sku": "AQ-1066", "nome": "Vestido Longo Araras e Coqueiros com Botões", "cat": "vestido-longo", "sub": "Estampado", "tipo": "vlongo", "desc": "Vestido longo de alças com botões na frente, lastex nas costas e estampa de araras, coqueiros e sóis com barrado geométrico.", "novo": 1, "bf": 0, "pend": 1, "cores": [{"n": "Araras Off-white", "h": "#F1EBE0", "sf": ["img/pecas/aq-1066-araras-off-white-1.jpg", "img/pecas/aq-1066-araras-off-white-2.jpg", "img/pecas/aq-1066-araras-off-white-3.jpg"]}], "ordem": -159},
  {"sku": "AQ-1067", "nome": "Vestido Longo Floral Azul com Botões", "cat": "vestido-longo", "sub": "Estampado", "tipo": "vlongo", "desc": "Vestido longo de alças com botões na frente, lastex nas costas e estampa floral off-white sobre azul com barrado.", "novo": 1, "bf": 0, "pend": 1, "cores": [{"n": "Azul Floral", "h": "#7FA6E6", "sf": ["img/pecas/aq-1067-azul-floral-1.jpg", "img/pecas/aq-1067-azul-floral-2.jpg", "img/pecas/aq-1067-azul-floral-3.jpg"]}], "ordem": -158},
  {"sku": "AQ-1068", "nome": "Vestido Curto Tucanos com Argola", "cat": "vestido-curto", "sub": "Estampado", "tipo": "vcurto", "desc": "Vestido curto de alças com argola no decote, bolsos, lastex nas costas e estampa de tucanos, coqueiros e cajus.", "novo": 1, "bf": 0, "pend": 1, "cores": [{"n": "Tucanos Bege", "h": "#F1E3C6", "sf": ["img/pecas/aq-1068-tucanos-bege-1.jpg", "img/pecas/aq-1068-tucanos-bege-2.jpg", "img/pecas/aq-1068-tucanos-bege-3.jpg"]}], "ordem": -157},
  {"sku": "AQ-1069", "nome": "Vestido Longo Um Ombro Só com Recorte", "cat": "vestido-longo", "sub": "Estampado", "tipo": "vlongo", "desc": "Vestido longo de um ombro só com recorte vazado e franzido na cintura, fenda lateral e estampa floral azul sobre off-white.", "novo": 1, "bf": 0, "pend": 1, "cores": [{"n": "Floral Azul e Off", "h": "#2F4FB8", "sf": ["img/pecas/aq-1069-floral-azul-e-off-1.jpg", "img/pecas/aq-1069-floral-azul-e-off-2.jpg"]}], "ordem": -156, "tam": ["Único"]},
  {"sku": "AQ-1070", "nome": "Macaquinho Floral Azul", "cat": "macaquinhos", "sub": "Estampado", "tipo": "macacao", "desc": "Macaquinho de alças reguláveis com lastex nas costas, zíper e estampa floral off-white sobre azul com barrado.", "novo": 1, "bf": 0, "pend": 1, "cores": [{"n": "Azul Floral", "h": "#7FA6E6", "sf": ["img/pecas/aq-1070-azul-floral-1.jpg"]}], "ordem": -155},
  {"sku": "AQ-1071", "nome": "Vestido Curto Floral Azul com Miçangas", "cat": "vestido-curto", "sub": "Estampado", "tipo": "vcurto", "desc": "Vestido curto de decote reto com alças de miçangas, lastex nas laterais, fendinhas na barra e estampa floral sobre azul.", "novo": 1, "bf": 0, "pend": 1, "cores": [{"n": "Azul Floral", "h": "#7FA6E6", "sf": ["img/pecas/aq-1071-azul-floral-1.jpg", "img/pecas/aq-1071-azul-floral-2.jpg"]}], "ordem": -154}
];
/* CADASTRO DA LOJA (30/10/2026): referência da etiqueta, preço e unidades por tamanho
   das peças conferidas no cabide e associadas às fotos de manequim acima.
   ref = código da etiqueta da loja (por cor, porque a mesma peça pode ter refs diferentes).
   q   = unidades por tamanho no estoque do site (Américas). Tamanho não listado = 0.
   Blusas sem preço na etiqueta = R$ 39,99. preco:null = mantém o preço que já estava. */
const CAD_V = 12;   // aumente ao mudar o CADASTRO: reaplica nas demonstrações já abertas
const CADASTRO = {
  'AQ-1001': { preco:99.99,  cores:{ 'Laranja':      { ref:'02.03.0037', q:{ P:1 } },
                                     'Verde Limão':  { ref:'02.03.0037', q:{ M:2, G:1 } },
                                     'Amarelo Limão':{ ref:'02.03.0037', q:{ M:2 } } } },
  'AQ-1002': { preco:39.99,  cores:{ 'Coral':        { ref:'02.03.0083', q:{ G:1 } },
                                     'Pink':         { ref:'02.03.0063', q:{ G:1 } },
                                     'Roxo':         { ref:'02.03.0063', q:{ G:1 } },
                                     'Azul Índigo':  { ref:'02.03.0063', q:{ G:1 } } } },
  'AQ-1003': { preco:39.99,  cores:{ 'Verde Oliva':  { ref:'02.03.0082', q:{ P:1 } } } },
  'AQ-1004': { preco:39.99,  cores:{ 'Verde Menta':  { ref:'',           q:{ G:1 } },          // etiqueta sem ref
                                     'Branco':       { ref:'02.03.0062', q:{ GG:2 } },
                                     'Lavanda':      { ref:'02.03.0062', q:{ GG:1 } },
                                     'Coral':        { ref:'02.03.0062', q:{ P:1, M:1, G:1 } },
                                     'Preto':        { ref:'02.03.0062', q:{ P:2, G:1 } } } },
  'AQ-1005': { preco:39.99,  cores:{ 'Verde Limão':  { ref:'02.03.0035', q:{ M:1 } } } },
  'AQ-1006': { preco:39.99,  cores:{ 'Azul':         { ref:'02.03.0072', q:{ G:1 } } } },
  'AQ-1007': { preco:39.99,  cores:{ 'Marrom Chocolate': { ref:'02.04.0006', q:{ M:2 } } } },
  'AQ-1008': { preco:39.99,  cores:{ 'Rosa':         { ref:'02.04.0056', q:{ M:2 } } } },
  'AQ-1009': { preco:39.99,  cores:{ 'Roxo':         { ref:'02.04.0087', q:{ P:1, M:1, G:1 } } } },
  'AQ-1010': { preco:39.99,  cores:{ 'Preto':        { ref:'02.04.0083', q:{ M:1 } } } },
  'AQ-1011': { preco:39.99,  cores:{ 'Azul Lavanda': { ref:'02.04.0122', q:{ P:1, G:3, GG:2 } } } },
  'AQ-1012': { preco:39.99,  cores:{ 'Azul Marinho': { ref:'02.04.0081', q:{ G:2 } } } },        // no cabide parece preta
  'AQ-1013': { preco:39.99,  cores:{ 'Lilás':        { ref:'02.04.0126', q:{ M:1 } },
                                     'Off-white':    { ref:'02.04.0126', q:{ G:1 } } } },
  'AQ-1014': { preco:39.99,  cores:{ 'Vermelho':     { ref:'02.04.0121', q:{ M:1, G:1 } } } },
  'AQ-1015': { preco:39.99,  cores:{ 'Off-white':    { ref:'02.04.0137', q:{ G:1 } },
                                     'Marrom':       { ref:'02.04.0137', q:{ G:1 } },
                                     'Preto':        { ref:'02.03.0137', q:{ M:1 } },           // etiqueta diz 02.03 (as outras cores 02.04)
                                     'Verde Militar':{ ref:'03.10.0003', q:{} } } },            // etiqueta "Único" (1 peça): zerado até definir o tamanho
  'AQ-1016': { preco:39.99,  cores:{ 'Verde Limão':  { ref:'02.04.0070', q:{ P:2, G:2 } },
                                     'Verde Água':   { ref:'02.04.0070', q:{ G:1 } },
                                     'Laranja':      { ref:'02.04.0070', q:{ P:1 } } } },   // veio 2x: 2P/1G e 2P/2G, valeu a última
  'AQ-1017': { preco:39.99,  cores:{ 'Vermelho':     { ref:'02.04.0077', q:{ M:1 } },
                                     'Preto':        { ref:'',           q:{ GG:2 } } } },        // preta: etiqueta sem ref
  'AQ-1018': { preco:39.99,  cores:{ 'Azul Claro':   { ref:'09.30.0055', q:{ G:1 } },
                                     'Preto':        { ref:'02.04.0113', q:{ G:1 } } } },
  'AQ-1019': { preco:39.99,  cores:{ 'Preto':        { ref:'02.04.0002', q:{ G:1 } } } },
  'AQ-1021': { preco:39.99,  cores:{ 'Azul Claro':   { ref:'02.04.0085', q:{ M:1, G:1 } } } },
  'AQ-1020': { preco:39.99,  cores:{ 'Preto':        { ref:'',           q:{ M:1 } } } },        // etiqueta sem ref
  'AQ-1022': { preco:39.99,  cores:{ 'Nude':         { ref:'02.04.0066', q:{ P:1, G:1 } } } },
  'AQ-1023': { preco:39.99,  cores:{ 'Preto':        { ref:'02.04.0159', q:{ P:1 } } } },
  'AQ-1024': { preco:39.99,  cores:{ 'Coral':        { ref:'02.04.0080', q:{ M:3 } } } },
  'AQ-1025': { preco:39.99,  cores:{ 'Verde Menta':  { ref:'',           q:{ G:1 } } } },        // etiqueta sem ref
  'AQ-1026': { preco:39.99,  cores:{ 'Verde Limão Claro': { ref:'02.04.0038', q:{ G:1 } } } },
  'AQ-1028': { preco:39.99,  cores:{ 'Caramelo':     { ref:'02.04.0034', q:{ G:1 } } } },
  'AQ-1029': { preco:39.99,  cores:{ 'Rosa Claro':   { ref:'02.04.0042', q:{ G:1 } } } },
  'AQ-1031': { preco:39.99,  cores:{ 'Cinza Chumbo': { ref:'02.04.0009', q:{ P:1, M:4, G:2 } },
                                     'Verde Sálvia': { ref:'02.04.0009', q:{ M:1 } },
                                     'Bege':         { ref:'02.04.0132', q:{ G:1 } } } },
  'AQ-1032': { preco:39.99,  cores:{ 'Bege e Branco':{ ref:'02.04.0121', q:{ P:1, M:1, G:1 } } } },
  'AQ-1033': { preco:39.99,  cores:{ 'Cinza Claro':  { ref:'02.04.0098', q:{ GG:1 } } } },
  'AQ-1034': { preco:39.99,  cores:{ 'Azul Royal':   { ref:'02.04.0048', q:{ G:1 } } } },
  'AQ-1035': { preco:39.99,  cores:{ 'Preto':        { ref:'02.04.0091', q:{ G:1 } } } },
  'AQ-1036': { preco:39.99,  cores:{ 'Marrom Chocolate': { ref:'02.04.0010', q:{ G:1 } } } },
  'AQ-1037': { preco:39.99,  cores:{ 'Preto':        { ref:'02.04.0156', q:{ P:1 } } } },
  'AQ-1038': { preco:39.99,  cores:{ 'Laranja':      { ref:'02.04.0068', q:{ M:1 } } } },
  'AQ-1039': { preco:39.99,  cores:{ 'Preto':        { ref:'02.04.0127', q:{ M:1 } } } },
  'AQ-1040': { preco:null,   cores:{ 'Floral Azul':  { ref:'10.34.0160', q:{ P:1, M:1, G:1 } } } },  // vestido sem preço na etiqueta
  'AQ-1041': { preco:null,   cores:{ 'Floral Vermelho': { ref:'',        q:{ P:1, G:2 } } } },        // vestido sem ref e sem preço
  /* Peças de modelo: dados da lista do WhatsApp (foto IMG_xxxx). Sem quantidade na mensagem = 1 por tamanho. */
  'AQ-1044': { preco:null,   cores:{ 'Rosa':         { ref:'11400038', q:{ P:1, M:1 } },             // IMG_1700
                                     'Vermelho':     { ref:'11400038', q:{ P:1, M:1 } },             // cores sem foto, conforme a mensagem
                                     'Preto':        { ref:'11400038', q:{ P:1, M:1 } },
                                     'Bege':         { ref:'11400038', q:{ P:1, M:1 } },
                                     'Amarelo Manteiga': { ref:'11400038', q:{ P:1, M:1 } },
                                     'Branco':       { ref:'11400038', q:{ P:1, M:1 } } } },
  'AQ-1049': { preco:null,   cores:{ 'Off-white':    { ref:'10340164', q:{ M:1, G:1 } },             // IMG_1715 (cor da foto)
                                     'Rosa':         { ref:'10340164', q:{ M:1, G:1 } },             // cores sem foto, conforme a mensagem
                                     'Azul':         { ref:'10340164', q:{ M:1, G:1 } },
                                     'Verde Água':   { ref:'10340164', q:{ M:1, G:1 } } } },
  'AQ-1053': { preco:null,   cores:{ 'Azul Serenity':{ ref:'10340157', q:{ M:1, G:1 } } } },         // IMG_1703
  'AQ-1057': { preco:null,   cores:{ 'Azulejo Preto':{ ref:'10340051', q:{ P:1, M:1, G:1 } } } },    // IMG_1726 (+ IMG_1730)
  'AQ-1059': { preco:null,   cores:{ 'Floral Preto': { ref:'10340051', q:{ P:1, M:1 } } } },          // IMG_1734 (+1735, 1739)
  'AQ-1060': { preco:null,   cores:{ 'Arara Tropical':{ ref:'10330041', q:{ P:1, M:1, G:1, GG:1 } } } }, // IMG_1737 (+1736, 1738)
  'AQ-1061': { preco:null,   cores:{ 'Floral Colorido':{ ref:'10340051', q:{ P:1 } } } },             // IMG_2005 (+2007, 2009)
  'AQ-1062': { preco:null,   cores:{ 'Magnólias Preto':{ ref:'11390017', q:{ P:1 } } } },             // IMG_2010 (+2006, 2008)
  'AQ-1063': { preco:null,   cores:{ 'Poá Marrom':   { ref:'11390017', q:{ GG:1 } } } },              // IMG_2011 (+2012)
  'AQ-1045': { preco:null,   cores:{ 'Conchas Azul': { ref:'10330063', q:{ 'Único':3 } } } },        // IMG_2036
  'AQ-1065': { preco:null,   cores:{ 'Floral Pássaros':{ ref:'10340051', q:{ P:1, M:1, G:1 } } } },   // IMG_2020 (+2017, 2018)
  'AQ-1066': { preco:null,   cores:{ 'Araras Off-white':{ ref:'10340051', q:{ P:1, M:1, GG:1 } } } }, // IMG_2021 (+2019, 2022)
  'AQ-1067': { preco:null,   cores:{ 'Azul Floral':  { ref:'10340051', q:{ G:1, GG:1 } } } },         // IMG_2024 (+2027, 2028)
  'AQ-1068': { preco:null,   cores:{ 'Tucanos Bege': { ref:'10330060', q:{ P:1, M:1 } } } },          // IMG_2032 (+2031, 2035) · 2 un
  'AQ-1069': { preco:null,   cores:{ 'Floral Azul e Off':{ ref:'10340192', q:{ 'Único':1 } } } },     // IMG_2033 (+2034)
  'AQ-1064': { preco:null,   cores:{ 'Bege':         { ref:'10340051', q:{ P:1, G:1, GG:1 } } } },    // IMG_2013 (+2014)
  'AQ-1042': { preco:119.99, cores:{ 'Mostarda':     { ref:'02.03.0075', q:{ M:1 } } } }    // "Kimono" na etiqueta
};
/* Leva o cadastro para o catálogo: preço na peça e ref em cada cor */
REAIS.forEach(p => {
  const c0 = CADASTRO[p.sku]; if(!c0) return;
  if(c0.preco != null){ p.preco = c0.preco; p.promo = 0; }
  p.cores.forEach(c => { const x = c0.cores[c.n]; if(x && x.ref) c.ref = x.ref; });
});
/* Unidades cadastradas de uma cor (ou null se a cor ainda não foi conferida) */
function cadQ(sku, corNome){ const c0 = CADASTRO[sku]; const x = c0 && c0.cores[corNome]; return (x && x.q) ? x.q : null; }   // q:null = só a ref, estoque continua como está
/* Catálogo inicial: as peças reais (com fotos) vêm primeiro, depois as de exemplo */
const PRODUTOS = REAIS.concat(EXEMPLOS);
const EX_SKUS = new Set(EXEMPLOS.map(x => x.sku));
/* Ilustrações tiradas do site porque a categoria já tem peças reais (30/10/2026) */
const EX_REMOVIDAS = ["AQ-0101", "AQ-0102", "AQ-0111", "AQ-0112", "AQ-0201", "AQ-0202", "AQ-0211", "AQ-0212", "AQ-0301", "AQ-0311", "AQ-0901", "AQ-0911"];

const SETTINGS = {
  limite: 3,                 // 3 ou mais = Disponível; 1 a 2 = Últimas unidades; 0 = Esgotado
  reserva: 0,                // peças guardadas em cada loja para a venda física (não aparecem no site)
  whatsapp: '5521993047271', // número que recebe os pedidos do site
  mostrarPreco: true,
  pausado: false,
  pausaMsg: 'Os pedidos pelo site estão pausados no momento. Fale com a gente pelo WhatsApp.',
  aviso: { on:false, texto:'' },
  // Black Friday: categoria própria no site, faixa, banner e selo nas peças
  bf: { on:true, modo:'marcadas', min:9.99, max:119.99, titulo:'Black Friday Aqualupe', faixa:'Peças a partir de R$ 9,99' },
  // Clube Aqualupe: janela de cadastro com mês de aniversário
  clube: { on:true, espera:8, msgNiver:'Oi, {nome}! Aqui é da Aqualupe. Feliz aniversário! 🎉 Neste mês você tem uma condição especial na nossa loja online. Quer que eu te mostre as novidades?' },
  frete: [
    { id:'sul',     nome:'Zona Sul',           preco:17.30, prazo:1 },
    { id:'centro',  nome:'Centro',             preco:17.30, prazo:1 },
    { id:'norte',   nome:'Zona Norte',         preco:17.30, prazo:1 },
    { id:'oeste',   nome:'Zona Oeste',         preco:17.30, prazo:1 },
    { id:'baixada', nome:'Baixada Fluminense', preco:30.90, prazo:2 },
    { id:'niteroi', nome:'Niterói',            preco:33.40, prazo:2 }
  ]
};

/* ---------------- utilitários ---------------- */
const norm = s => String(s == null ? '' : s).normalize('NFD').replace(/[̀-ͯ]/g,'').trim().toLowerCase();
const slug = s => String(s).normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
function hash(s){ let h = 2166136261; for(let i = 0; i < s.length; i++){ h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
const vkey = (corId, tam) => corId + '|' + tam;            // chave de uma variação (cor + tamanho)
const sizesOf = p => (p.tam && p.tam.length) ? p.tam : T;
const clone = o => JSON.parse(JSON.stringify(o));

/* Quantidade que o site pode vender: soma das lojas do site (hoje só o Américas), descontando a reserva */
function dispOf(q, reserva){
  q = q || {}; reserva = Math.max(0, +reserva || 0);
  return LOJAS.reduce((a, l) => a + Math.max(0, (+q[l.k] || 0) - reserva), 0);
}
function statusOf(n, limite){ return n >= (limite || 3) ? 'ok' : (n > 0 ? 'last' : 'out'); }
const STATUS_TXT = { ok:'Disponível', last:'Últimas unidades', out:'Esgotado' };

/* Estoque de exemplo (o mesmo que o site mostrava na demonstração), na ordem de LOJAS_TODAS */
function stockExemplo(sku, corNome, tam){
  const cq = cadQ(sku, corNome);
  if(cq) return [0, 0, +cq[tam] || 0];   // cor conferida na loja: unidades reais, tudo no Américas
  const h = hash(sku + corNome + tam);
  return [0,1,2].map(i => { const v = (h >> (i*5)) & 7; return v < 3 ? 0 : (v < 6 ? 1 : (i === 2 ? 3 : 2)); });
}
function dispExemplo(sku, corNome, tam){
  const v = stockExemplo(sku, corNome, tam);
  return LOJAS_TODAS.reduce((a, l, i) => a + (LOJAS_SITE.includes(l.k) ? v[i] : 0), 0);
}
/* Peças de exemplo da Black Friday na demonstração: [preço normal, preço Black Friday] */
/* Black Friday só com as peças reais (fotos). As peças de exemplo não entram mais. */
const DEMO_BF = {};
/* Black Friday: a peça entra se estiver marcada (ou se o modo for "faixa") e o preço final estiver dentro da faixa */
function bfConf(s){ return Object.assign({}, SETTINGS.bf, (s && s.bf) || {}); }
function precoFinal(p){ return (p.promo > 0 && p.promo < (p.preco || 0)) ? p.promo : (+p.preco || 0); }
function naBF(p, s){
  const b = bfConf(s); if(!b.on) return false;
  if(EX_SKUS.has(p.sku)) return false;   // peças de ilustração nunca entram na Black Friday
  if(COLECAO(p)) return false;   // vestidos, macacões e macaquinhos são coleção
  const v = precoFinal(p);
  if(!v) return !!p.bf;   // marcada e ainda sem preço cadastrado: entra até o preço ser lançado
  if(!(v >= b.min - 0.001 && v <= b.max + 0.001)) return false;
  return b.modo === 'faixa' ? true : !!p.bf;
}

/* Catálogo público a partir da lista de produtos */
function produtoPublico(p, i){
  return {
    nome: p.nome, cat: p.cat, sub: p.sub, tipo: p.tipo,
    desc: p.desc || '', tam: sizesOf(p).slice(),
    cores: p.cores.map(c => Object.assign({ id: c.id || slug(c.n), n: c.n, h: c.h, est: c.est || '', acc: c.acc || '', nf: c.nf || 0, fv: c.fv || 0 }, (c.sf && c.sf.length) ? { sf: c.sf.slice() } : {}, c.ref ? { ref: c.ref } : {})),
    preco: typeof p.preco === 'number' ? p.preco : 0, promo: typeof p.promo === 'number' ? p.promo : 0,
    ativo: p.ativo !== false, novo: !!p.novo, bf: !!p.bf, pend: !!p.pend, ordem: typeof p.ordem === 'number' ? p.ordem : i,
    d: p.d || {}
  };
}
/* Peças reais que ainda não estão no catálogo salvo (Firebase ou demonstração).
   As que a administração excluiu ficam em cat.ign e não voltam. */
function reaisFaltando(cat){
  const p = (cat && cat.p) || {}, ign = new Set((cat && cat.ign) || []);
  return REAIS.map((x, i) => [x.sku, produtoPublico(x, i)]).filter(([sku]) => !p[sku] && !ign.has(sku));
}
/* Demonstração: preço normal e preço de Black Friday de exemplo das peças reais */
const BF_DEMO_REAIS = [[129.9, 49.9], [149.9, 59.9], [159.9, 69.9], [179.9, 79.9], [189.9, 89.9], [199.9, 99.9]];
/* Vestidos, macacões e macaquinhos são coleção: nunca entram na Black Friday (decisão de 30/10/2026) */
/* Exceções pedidas em 30/10/2026: estes vestidos entram na Black Friday */
const BF_EXCECAO = new Set(["AQ-1040", "AQ-1041", "AQ-1042"]);
const COLECAO = p => !BF_EXCECAO.has(p.sku) && (/^vestido-/.test(p.cat) || p.cat === "macacoes" || p.cat === "macaquinhos");
function demoBFReal(pr, i){
  const x = REAIS[i], c0 = x && CADASTRO[x.sku];
  if(x && COLECAO(x)){ pr.bf = false; pr.promo = 0; pr.preco = (c0 && c0.preco != null) ? c0.preco : 0; return; }   // coleção: sem BF, sem preço de exemplo
  if(c0 && c0.preco != null){ pr.preco = c0.preco; pr.promo = 0; pr.bf = true; return; }   // peça com preço real: não usa preço de exemplo
  if(x && BF_EXCECAO.has(x.sku)){ pr.preco = 0; pr.promo = 0; pr.bf = true; return; }        // na Black Friday, preço ainda não informado
  if(x && x.pend){ pr.preco = 0; pr.promo = 0; pr.bf = true; return; }                        // preço ainda não informado: não inventa preço
  const [a, b] = BF_DEMO_REAIS[i % BF_DEMO_REAIS.length]; pr.preco = a; pr.promo = b; pr.bf = true;
}
/* Aplica o cadastro da loja (ref, preço e unidades) num catálogo já salvo antes dele existir */
function aplicarCadastro(cat, est, reserva){
  let mudou = false;
  Object.entries(CADASTRO).forEach(([sku, c0]) => {
    const pr = cat && cat.p && cat.p[sku]; if(!pr) return;
    if(c0.preco != null){ pr.preco = c0.preco; pr.promo = 0; }
    const e = est[sku] = est[sku] || { q:{} }; e.q = e.q || {}; pr.d = pr.d || {};
    pr.cores.forEach(c => {
      const x = c0.cores[c.n]; if(!x) return;
      if(x.ref) c.ref = x.ref; else delete c.ref;
      if(!x.q) return;
      sizesOf(pr).forEach(t => { const k = vkey(c.id, t); e.q[k] = { b:0, c:0, a: +x.q[t] || 0 }; pr.d[k] = dispOf(e.q[k], reserva); });
    });
    mudou = true;
  });
  return mudou;
}
const PRECO_DEMO = { 'vestido-longo':289.9, 'vestido-midi':239.9, 'vestido-curto':179.9, 'conjuntos':319.9, 'blusas':129.9, 'calcas':199.9, 'saias-e-shorts':149.9, 'macacoes':269.9, 'acessorios':159.9 };
/* Demonstração: acrescenta as peças reais novas com estoque de exemplo */
function demoAcrescentar(db){
  if(!db || !db.cat || !db.cat.p) return false;
  let mudou = false;
  if(!db.cat.exSemBF){ EXEMPLOS.forEach(x => { const pr = db.cat.p[x.sku]; if(pr){ pr.bf = false; pr.promo = 0; } }); db.cat.exSemBF = 1; mudou = true; }
  if(!db.cat.reaisBF){ REAIS.forEach((x, i) => { const pr = db.cat.p[x.sku]; if(pr) demoBFReal(pr, i); }); db.cat.reaisBF = 1; mudou = true; }
  if(!db.cat.semIlust1){ db.cat.ign = db.cat.ign || []; EX_REMOVIDAS.forEach(sku => { delete db.cat.p[sku]; if(db.est) delete db.est[sku]; if(!db.cat.ign.includes(sku)) db.cat.ign.push(sku); }); db.cat.semIlust1 = 1; mudou = true; }
  if(db.cat.cad !== CAD_V){ db.est = db.est || {};
    if(db.cat.s && db.cat.s.bf && (+db.cat.s.bf.max || 0) < 119.99) db.cat.s.bf.max = 119.99;   // teto da BF subiu para caber o vestido mostarda
    REAIS.forEach((x, i) => { const pr = db.cat.p[x.sku]; if(pr) pr.cat = x.cat; if(pr && COLECAO(x)) demoBFReal(pr, i); if(pr && x.pend){ const np = produtoPublico(x, i); pr.cores = np.cores; pr.tam = np.tam; } });   /* cores novas das peças em cadastro */
    aplicarCadastro(db.cat, db.est, ((db.cat.s || {}).reserva) || 0); db.cat.cad = CAD_V; mudou = true; }
  const falta = reaisFaltando(db.cat); if(!falta.length) return mudou;
  const res = ((db.cat.s || {}).reserva) || 0;
  db.est = db.est || {};
  falta.forEach(([sku, pr]) => {
    const q = {}, d = {};
    pr.cores.forEach(c => pr.tam.forEach(t => { const [b, cc, a] = stockExemplo(sku, c.n, t); const k = vkey(c.id, t); q[k] = { b, c: cc, a }; d[k] = dispOf(q[k], res); }));
    pr.d = d; demoBFReal(pr, REAIS.findIndex(x => x.sku === sku));
    db.cat.p[sku] = pr; db.est[sku] = { q };
  });
  return true;
}
function seedProdutos(){ const o = {}; PRODUTOS.forEach((p, i) => { o[p.sku] = produtoPublico(p, i); }); return o; }

/* ---------------- Firebase ---------------- */
const FB_VER = '10.14.1';
function configured(){ const c = window.AQ_FIREBASE; return !!(c && c.apiKey && c.projectId); }
function loadScript(src){
  return new Promise((ok, no) => { const s = document.createElement('script'); s.src = src; s.async = false; s.onload = ok; s.onerror = () => no(new Error('Não carregou ' + src)); document.head.appendChild(s); });
}
let fbPromise = null;
function loadFirebase(mods){
  if(fbPromise) return fbPromise;
  const list = ['app'].concat(mods || ['firestore']);
  const from = base => list.reduce((p, m) => p.then(() => loadScript(base + 'firebase-' + m + '-compat.js')), Promise.resolve());
  fbPromise = from('https://www.gstatic.com/firebasejs/' + FB_VER + '/')
    .catch(() => from('https://cdn.jsdelivr.net/npm/firebase@' + FB_VER + '/'))
    .then(() => { if(!firebase.apps.length) firebase.initializeApp(window.AQ_FIREBASE); return firebase; });
  return fbPromise;
}

/* ---------------- Modo demonstração (dados só neste navegador) ---------------- */
const DEMO_KEY = 'aq_demo_loja_v2';
const demo = {
  get(){
    try{
      let r = localStorage.getItem(DEMO_KEY);
      if(!r){ // aproveita a demonstração anterior (v1) e libera o espaço dela
        const old = localStorage.getItem('aq_demo_loja_v1');
        if(old){ const db = JSON.parse(old); db.v = 2; db.cli = db.cli || {}; localStorage.removeItem('aq_demo_loja_v1'); localStorage.setItem(DEMO_KEY, JSON.stringify(db)); r = JSON.stringify(db); }
      }
      const db = r ? JSON.parse(r) : null;
      if(demoAcrescentar(db)){ try{ localStorage.setItem(DEMO_KEY, JSON.stringify(db)); }catch(e){} }
      return db;
    }catch(e){ return null; }
  },
  set(db){ localStorage.setItem(DEMO_KEY, JSON.stringify(db)); },   // pode lançar erro de espaço (fotos)
  clear(){ try{ localStorage.removeItem(DEMO_KEY); }catch(e){} },
  on(cb){ window.addEventListener('storage', e => { if(e.key === DEMO_KEY) cb(); }); },
  key: DEMO_KEY,
  // cadastros do Clube feitos no site antes de a demonstração da Área da Loja existir
  CLI_KEY: 'aq_demo_clientes_v1'
};

window.AQ = { COLECAO, EX_REMOVIDAS, demoBFReal, REAIS, EXEMPLOS, reaisFaltando, demoAcrescentar, PRECO_DEMO, LOJAS, LOJAS_TODAS, LOJAS_SITE, DEMO_BF, bfConf, precoFinal, naBF, dispExemplo, T, CATS, DESC, PRODUTOS, SETTINGS, norm, slug, hash, vkey, sizesOf, clone, dispOf, statusOf, STATUS_TXT,
  stockExemplo, produtoPublico, CADASTRO, cadQ, aplicarCadastro, seedProdutos, configured, loadFirebase, demo, FB_VER };
})();
