/* ============================================================
   ÁREA DA LOJA · DADOS
   Estado em memória, regras de estoque e as duas formas de guardar:
   Firebase (de verdade) ou demonstração (só neste navegador).
   ============================================================ */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const BRL = n => (+n || 0).toLocaleString('pt-BR', { style:'currency', currency:'BRL' });
const LOJA = k => AQ.LOJAS.find(l => l.k === k) || AQ.LOJAS_TODAS.find(l => l.k === k) || { k, nome: k || '?', curto: k || '?' };
const MULTI = AQ.LOJAS.length > 1;   // com uma loja só, a tela "Entre lojas" sai do menu
const DEMO = !AQ.configured();
const now = () => Date.now();
const DAY = 86400000;

const TIPOS = {
  venda:      { t:'Venda na loja',          c:'out'  },
  site:       { t:'Pedido do site',         c:'acc'  },
  estorno:    { t:'Pedido cancelado',       c:'info' },
  entrada:    { t:'Entrada de mercadoria',  c:'ok'   },
  troca:      { t:'Troca de cliente',       c:'ok'   },
  defeito:    { t:'Defeito ou perda',       c:'out'  },
  ajuste:     { t:'Ajuste de contagem',     c:'info' },
  trf_saida:  { t:'Enviada a outra loja',   c:'last' },
  trf_entrada:{ t:'Recebida de outra loja', c:'ok'   },
  importacao: { t:'Importação da planilha', c:'info' }
};
const MOTIVOS = [
  { v:'venda',   t:'Venda na loja',         sinal:-1 },
  { v:'entrada', t:'Entrada de mercadoria', sinal: 1 },
  { v:'ajuste',  t:'Ajuste de contagem',    sinal: 0 },
  { v:'defeito', t:'Defeito ou perda',      sinal:-1 },
  { v:'troca',   t:'Troca de cliente',      sinal: 1 }
];
const PED_ST = {
  novo:       { t:'Novo',                 c:'acc'  },
  confirmado: { t:'Confirmado',           c:'info' },
  pago:       { t:'Pago',                 c:'ok'   },
  pronto:     { t:'Pronto para retirada', c:'last' },
  saiu:       { t:'Saiu para entrega',    c:'last' },
  concluido:  { t:'Concluído',            c:''     },
  cancelado:  { t:'Cancelado',            c:'out'  }
};
const TRF_ST = {
  solicitada: { t:'Pedida',     c:'acc'  },
  enviada:    { t:'A caminho',  c:'last' },
  recebida:   { t:'Recebida',   c:'ok'   },
  recusada:   { t:'Recusada',   c:'out'  },
  cancelada:  { t:'Cancelada',  c:''     }
};

/* ---------------- estado ---------------- */
const S = {
  user:null, me:null,
  cat:null, est:{}, mov:[], trf:[], ped:[], avi:[], eq:[], cli:[],
  loaded:{}, view:'inicio',
  stage:{},            // alterações de estoque ainda não salvas
  open:new Set(),      // peças abertas na tela de estoque
  f:{ q:'', cat:'', st:'', hq:'', hp:'7', hl:'', ht:'', hsku:'', cq:'', ccat:'', cv:'', pf:'novo', tf:'acao', af:'aguardando', rp:'30', kq:'', km:String(new Date().getMonth() + 1) }
};
const isAdmin = () => !!(S.me && S.me.perfil === 'admin');
const canEdit = k => isAdmin() || (S.me && S.me.loja === k);
const sett = () => { const s = Object.assign(AQ.clone(AQ.SETTINGS), (S.cat && S.cat.s) || {}); s.bf = AQ.bfConf(s); s.clube = Object.assign({}, AQ.SETTINGS.clube, s.clube || {}); return s; };

/* ---------------- catálogo ---------------- */
function prods(){
  if(!S.cat || !S.cat.p) return [];
  return Object.entries(S.cat.p).map(([sku, p]) => Object.assign({ sku }, p))
    .sort((a, b) => (a.ordem ?? 999) - (b.ordem ?? 999) || a.sku.localeCompare(b.sku));
}
const prod = sku => (S.cat && S.cat.p && S.cat.p[sku]) ? Object.assign({ sku }, S.cat.p[sku]) : null;
const catOf = slug => AQ.CATS.find(c => c.slug === slug) || { nome: slug || 'Sem categoria', subs: [], tipo:'vlongo' };
const corOf = (p, id) => (p.cores || []).find(c => c.id === id) || { id, n: id, h:'#999999' };
const refsOf = p => [...new Set((p.cores || []).map(c => c.ref).filter(Boolean))];   // refs da etiqueta da loja (por cor)
const qOf = (sku, corId, tam) => Object.assign({ b:0, c:0, a:0 }, ((S.est[sku] || {}).q || {})[AQ.vkey(corId, tam)]);
const dispV = (sku, corId, tam) => AQ.dispOf(qOf(sku, corId, tam), sett().reserva);
const stV = n => AQ.statusOf(n, sett().limite);
function variants(p){ const out = []; (p.cores || []).forEach(c => AQ.sizesOf(p).forEach(t => out.push({ c, t, k: AQ.vkey(c.id, t) }))); return out; }
function prodTotal(p, loja){ return variants(p).reduce((a, v) => { const q = qOf(p.sku, v.c.id, v.t); return a + (loja ? q[loja] : AQ.LOJAS.reduce((x, l) => x + (+q[l.k] || 0), 0)); }, 0); }
function prodDisp(p){ return variants(p).reduce((a, v) => a + dispV(p.sku, v.c.id, v.t), 0); }
const precoEf = p => (p.promo > 0 && p.promo < p.preco) ? p.promo : (p.preco || 0);
const naBF = p => AQ.naBF(p, sett());
const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
function nextSku(){
  const nums = Object.keys((S.cat && S.cat.p) || {}).map(s => +(/(\d+)$/.exec(s) || [0, 0])[1]);
  return 'AQ-' + String(Math.max(1000, ...nums) + 1).padStart(4, '0');
}

/* ---------------- datas ---------------- */
function quando(ms){
  if(!ms) return 'agora';
  const d = now() - ms;
  if(d < 60000) return 'agora';
  if(d < 3600000) return 'há ' + Math.floor(d / 60000) + ' min';
  const dt = new Date(ms), hj = new Date();
  const hm = dt.toLocaleTimeString('pt-BR', { hour:'2-digit', minute:'2-digit' });
  if(dt.toDateString() === hj.toDateString()) return 'hoje, ' + hm;
  const on = new Date(hj.getTime() - DAY);
  if(dt.toDateString() === on.toDateString()) return 'ontem, ' + hm;
  return dt.toLocaleDateString('pt-BR', { day:'2-digit', month:'2-digit' }) + ', ' + hm;
}
const dataHora = ms => ms ? new Date(ms).toLocaleString('pt-BR', { day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit' }) : '';
const telDigits = t => { let d = String(t || '').replace(/\D/g, ''); if(d.length === 10 || d.length === 11) d = '55' + d; return d; };
const waTo = (tel, msg) => 'https://wa.me/' + telDigits(tel) + (msg ? '?text=' + encodeURIComponent(msg) : '');
const primeiro = n => String(n || '').trim().split(/\s+/)[0] || '';
const siteUrl = h => { try{ return new URL('index.html' + (h || ''), location.href).href; }catch(e){ return 'index.html' + (h || ''); } };

/* ============================================================
   REGRA ÚNICA DE MOVIMENTAÇÃO
   Recebe o estoque atual e a operação; devolve o novo estoque,
   os registros do histórico e a disponibilidade para o site.
   ============================================================ */
function planApply(estAtual, op){
  const est = {}, movs = [], disp = {};
  const res = sett().reserva;
  op.itens.forEach(it => {
    if(!est[it.sku]) est[it.sku] = AQ.clone((estAtual[it.sku] && estAtual[it.sku].q) || {});
    const k = AQ.vkey(it.corId, it.tam);
    const e = est[it.sku][k] = Object.assign({ b:0, c:0, a:0 }, est[it.sku][k]);
    const antes = +e[it.loja] || 0;
    const depois = it.set != null ? Math.max(0, Math.round(+it.set)) : antes + Math.round(+it.delta || 0);
    const p = prod(it.sku) || { nome: it.sku, cores: [] }, c = corOf(p, it.corId);
    if(depois < 0) throw new Error(`Sem estoque suficiente: ${p.nome}, ${c.n} ${it.tam} tem ${antes} ${antes === 1 ? 'peça' : 'peças'} no ${LOJA(it.loja).curto}.`);
    e[it.loja] = depois;
    disp[it.sku + '\u0001' + k] = { sku: it.sku, k, v: AQ.dispOf(e, res) };
    if(depois !== antes) movs.push({
      ts: now(), uid: S.me.uid, por: S.me.nome, loja: it.loja, tipo: op.tipo, motivo: op.motivo || '',
      sku: it.sku, prod: p.nome, corId: it.corId, cor: c.n, tam: it.tam, qtd: depois - antes, antes, depois, ref: op.ref || ''
    });
  });
  return { est, movs, disp: Object.values(disp) };
}
function dispMapFor(sku, q, res){ const d = {}; Object.entries(q || {}).forEach(([k, v]) => { d[k] = AQ.dispOf(v, res); }); return d; }

/* ---------------- fotos ---------------- */
function loadImg(file){
  return new Promise((ok, no) => { const u = URL.createObjectURL(file), im = new Image(); im.onload = () => { ok(im); URL.revokeObjectURL(u); }; im.onerror = () => no(new Error('Não foi possível abrir esta imagem. Use JPG, PNG ou WEBP.')); im.src = u; });
}
function toJpeg(im, maxW, maxH, alvo){
  let s = Math.min(1, maxW / im.naturalWidth, maxH / im.naturalHeight);
  let q = .84, out = '';
  for(let i = 0; i < 9; i++){
    const w = Math.max(1, Math.round(im.naturalWidth * s)), h = Math.max(1, Math.round(im.naturalHeight * s));
    const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
    const cx = cv.getContext('2d'); cx.fillStyle = '#fff'; cx.fillRect(0, 0, w, h); cx.drawImage(im, 0, 0, w, h);
    out = cv.toDataURL('image/jpeg', q);
    if(out.length <= alvo) break;
    if(q > .56) q -= .08; else s *= .85;
  }
  return out;
}
async function prepFoto(file){
  const im = await loadImg(file);
  return {
    hd: DEMO ? toJpeg(im, 640, 800, 95000) : toJpeg(im, 1000, 1250, 290000),
    t:  DEMO ? toJpeg(im, 280, 350, 22000) : toJpeg(im, 360, 450, 42000)
  };
}
const FOTO = {};   // cache: id -> {t, f}
function fotoId(sku, corId){ return sku + '~' + corId; }

/* ============================================================
   DEMONSTRAÇÃO
   ============================================================ */
function demoDb(){
  const p = AQ.seedProdutos(), est = {}, s = AQ.clone(AQ.SETTINGS);
  Object.entries(p).forEach(([sku, pr]) => {
    const q = {};
    pr.cores.forEach(c => pr.tam.forEach(t => { const [b, cc, a] = AQ.stockExemplo(sku, c.n, t); q[AQ.vkey(c.id, t)] = { b, c: cc, a }; }));
    est[sku] = { q };
    pr.d = dispMapFor(sku, q, s.reserva);
  });
  // preços de exemplo para os relatórios não ficarem zerados
  const precos = { 'vestido-longo':289.9, 'vestido-midi':239.9, 'vestido-curto':179.9, 'conjuntos':319.9, 'blusas':129.9, 'calcas':199.9, 'saias-e-shorts':149.9, 'macacoes':269.9, 'acessorios':159.9 };
  Object.values(p).forEach(pr => { pr.preco = precos[pr.cat] || 0; });
  if(p['AQ-0112']) p['AQ-0112'].promo = 249.9;
  Object.entries(AQ.DEMO_BF).forEach(([sku, [preco, promo]]) => { if(p[sku]){ p[sku].preco = preco; p[sku].promo = promo; p[sku].bf = true; } });
  AQ.REAIS.forEach((x, i) => { if(p[x.sku]) AQ.demoBFReal(p[x.sku], i); });
  const eq = {
    'demo-admin': { nome:'Flávia', email:'flavia@exemplo.com', perfil:'admin', loja:null, ativo:true, criado: now() - 40 * DAY },
    'demo-a':     { nome:'Equipe Américas', email:'americas@exemplo.com', perfil:'loja', loja:'a', ativo:true, criado: now() - 30 * DAY }
  };
  // histórico de exemplo dos últimos 30 dias
  const mov = {}; let n = 0;
  const skus = Object.keys(p);
  for(let i = 0; i < 46; i++){
    const h = AQ.hash('m' + i), sku = skus[h % skus.length], pr = p[sku], c = pr.cores[(h >>> 4) % pr.cores.length], t = pr.tam[(h >>> 7) % pr.tam.length];
    const lj = AQ.LOJAS[(h >>> 9) % AQ.LOJAS.length].k, tipo = i % 5 === 0 ? 'entrada' : (i % 7 === 0 ? 'site' : 'venda');
    const qtd = tipo === 'entrada' ? 2 + (h % 3) : -1, depois = est[sku].q[AQ.vkey(c.id, t)][lj];
    const who = Object.entries(eq).find(([, e]) => e.loja === lj) || Object.entries(eq)[0];
    mov['dm' + (n++)] = { ts: now() - (i * 15.5 + 1) * 3600000, uid: who[0], por: who[1].nome, loja: lj, tipo, motivo:'', sku, prod: pr.nome, corId: c.id, cor: c.n, tam: t, qtd, antes: depois - qtd, depois, ref:'' };
  }
  const ped = {
    'AQ-261020-K7P2': { no:'AQ-261020-K7P2', ts: now() - 25 * 60000, origem:'site', status:'novo', cliente:{ nome:'Ana Exemplo', tel:'(21) 99999-0001' }, receb:'retirada', loja:'Retirada combinada com a equipe', endereco:null, frete:{ tipo:'retirada', preco:0 }, pag:'Pix', obs:'Pedido de exemplo da demonstração.',
      itens:[{ sku:'AQ-0101', nome:'Vestido Longo Alças Finas', corId:'verde-oliva', cor:'Verde Oliva', tam:'M', qtd:1, preco:289.9 }, { sku:'AQ-0801', nome:'Bolsa Estruturada', corId:'caramelo', cor:'Caramelo', tam:'Único', qtd:1, preco:159.9 }], subtotal:449.8, total:449.8, hist:[] },
    'AQ-261019-3QLM': { no:'AQ-261019-3QLM', ts: now() - 20 * 3600000, origem:'site', status:'confirmado', cliente:{ nome:'Beatriz Exemplo', tel:'(21) 98888-0002' }, receb:'entrega', loja:'', endereco:{ rua:'Rua de Exemplo', num:'100', comp:'apto 201', bairro:'Campo Grande', cidade:'Rio de Janeiro', cep:'23000-000' }, frete:{ tipo:'zona', zona:{ id:'oeste', nome:'Zona Oeste', preco:17.3, prazo:1 }, preco:17.3 }, pag:'Cartão de crédito', obs:'',
      itens:[{ sku:'AQ-0211', nome:'Vestido Midi Poá', corId:'poa-preto', cor:'Poá Preto', tam:'G', qtd:1, preco:239.9 }], subtotal:239.9, total:257.2, baixa:[{ sku:'AQ-0211', corId:'poa-preto', tam:'G', loja:'a', qtd:1 }], hist:[{ s:'confirmado', ts: now() - 19 * 3600000, por:'Equipe Américas' }] },
    'AQ-261015-ZP8D': { no:'AQ-261015-ZP8D', ts: now() - 5 * DAY, origem:'site', status:'concluido', cliente:{ nome:'Carla Exemplo', tel:'(21) 97777-0003' }, receb:'retirada', loja:'Retirada combinada com a equipe', endereco:null, frete:{ tipo:'retirada', preco:0 }, pag:'Pix', obs:'',
      itens:[{ sku:'AQ-0401', nome:'Conjunto Alfaiataria', corId:'areia', cor:'Areia', tam:'P', qtd:1, preco:319.9 }], subtotal:319.9, total:319.9, baixa:[{ sku:'AQ-0401', corId:'areia', tam:'P', loja:'a', qtd:1 }], hist:[{ s:'confirmado', ts: now() - 5 * DAY + 3600000, por:'Equipe Américas' }, { s:'pago', ts: now() - 5 * DAY + 4000000, por:'Equipe Américas' }, { s:'concluido', ts: now() - 4 * DAY, por:'Equipe Américas' }] }
  };
  // aviso de exemplo para uma variação que tem estoque (aparece como "peça de volta")
  const back = Object.entries(est).map(([sku, e]) => [sku, Object.entries(e.q).find(([, q]) => AQ.dispOf(q, 0) >= 2)]).find(x => x[1]);
  const [bsku, [bk]] = back, [bcor, btam] = bk.split('|'), bp = p[bsku], bc = bp.cores.find(c => c.id === bcor);
  const avi = {
    'da1': { ts: now() - 2 * DAY, nome:'Daniela Exemplo', tel:'(21) 96666-0004', sku: bsku, prod: bp.nome, corId: bcor, cor: bc.n, tam: btam, status:'aguardando' },
    'da2': { ts: now() - 3 * 3600000, nome:'Elisa Exemplo', tel:'(21) 95555-0005', sku:'AQ-0111', prod:'Vestido Longo Floral', corId:'floral-rosa', cor:'Floral Rosa', tam:'GG', status:'aguardando' }
  };
  const trf = {};
  // Clube Aqualupe: cadastros de exemplo, com aniversariantes deste mês (uma faz aniversário hoje)
  const hj = new Date(), mes = hj.getMonth() + 1, dia = hj.getDate();
  const dd = d => Math.min(28, Math.max(1, d));
  const cli = {
    'dc1': { ts: now() - 3 * DAY, nome:'Fernanda Exemplo', tel:'(21) 98111-0001', email:'fernanda@exemplo.com', dia, mes, origem:'site' },
    'dc2': { ts: now() - 9 * DAY, nome:'Juliana Exemplo', tel:'(21) 98222-0002', email:'', dia: dd(dia + 3), mes, origem:'site' },
    'dc3': { ts: now() - 15 * DAY, nome:'Patrícia Exemplo', tel:'(21) 98333-0003', email:'patricia@exemplo.com', dia: dd(dia - 6), mes, origem:'site' },
    'dc4': { ts: now() - 1 * DAY, nome:'Renata Exemplo', tel:'(21) 98444-0004', email:'', dia: 12, mes: mes % 12 + 1, origem:'site' },
    'dc5': { ts: now() - 20 * DAY, nome:'Camila Exemplo', tel:'(21) 98555-0005', email:'camila@exemplo.com', dia: 4, mes: (mes + 4) % 12 + 1, origem:'site' }
  };
  return { v:2, cat:{ s, p, reaisBF:1, exSemBF:1 }, est, mov, ped, avi, trf, eq, cli, fotos:{}, fotosHD:{} };
}

const DCOL = { pedidos:'ped', transferencias:'trf', avisos:'avi', equipe:'eq', movimentos:'mov', clientes:'cli' };
const dcol = c => DCOL[c] || c;
const DemoB = {
  db:null, cbs:null, sessKey:'aq_demo_sessao',
  init(){ this.db = AQ.demo.get(); this.mergeCli(); AQ.demo.on(() => { this.db = AQ.demo.get(); this.emit(); }); window.addEventListener('storage', e => { if(e.key === AQ.demo.CLI_KEY && this.mergeCli()) this.write(); }); return Promise.resolve(); },
  // cadastros do Clube feitos no site antes de existir a demonstração
  mergeCli(){ let x = null; try{ x = JSON.parse(localStorage.getItem(AQ.demo.CLI_KEY) || 'null'); }catch(e){} if(!x || !this.db) return false; this.db.cli = Object.assign(this.db.cli || {}, x); try{ localStorage.removeItem(AQ.demo.CLI_KEY); }catch(e){} return true; },
  write(){ try{ AQ.demo.set(this.db); }catch(e){ this.db = AQ.demo.get(); throw new Error('O navegador ficou sem espaço para guardar a demonstração. Use fotos menores ou reinicie a demonstração.'); } this.emit(); },
  list(o){ return Object.entries(o || {}).map(([id, d]) => Object.assign({ id }, d)).sort((a, b) => (b.ts || 0) - (a.ts || 0)); },
  emit(){
    if(!this.cbs) return; const d = this.db || {}, c = this.cbs;
    setTimeout(() => { c.cat(d.cat || null); c.est(d.est || {}); c.mov(this.list(d.mov).slice(0, 400)); c.trf(this.list(d.trf)); c.ped(this.list(d.ped)); c.avi(this.list(d.avi)); c.cli(this.list(d.cli)); c.eq(this.list(d.eq).map(x => Object.assign(x, { uid: x.id }))); }, 0);
  },
  onAuth(cb){ let uid = null; try{ uid = sessionStorage.getItem(this.sessKey); }catch(e){} this._auth = cb; cb(uid ? { uid, demo:true } : null); },
  login(){ return Promise.reject(new Error('demo')); },
  loginDemo(uid){ if(!this.db){ this.db = demoDb(); this.mergeCli(); this.write(); } try{ sessionStorage.setItem(this.sessKey, uid); }catch(e){} this._auth({ uid, demo:true }); },
  logout(){ try{ sessionStorage.removeItem(this.sessKey); }catch(e){} this._auth(null); return Promise.resolve(); },
  reset(){ return Promise.resolve(); },
  reiniciar(){ this.db = demoDb(); this.write(); },
  profile(u){ if(!this.db){ this.db = demoDb(); this.write(); } const e = this.db.eq[u.uid]; return Promise.resolve(e && e.ativo ? Object.assign({ uid: u.uid }, e) : null); },
  subscribe(cbs){ this.cbs = cbs; this.emit(); },
  seed(){ this.db = demoDb(); this.write(); return Promise.resolve(); },
  apply(op){
    const pl = planApply(this.db.est, op);
    Object.entries(pl.est).forEach(([sku, q]) => { this.db.est[sku] = { q }; });
    pl.disp.forEach(x => { const pp = this.db.cat.p[x.sku]; if(pp){ pp.d = pp.d || {}; pp.d[x.k] = x.v; } });
    pl.movs.forEach(m => { this.db.mov['m' + now().toString(36) + Math.random().toString(36).slice(2, 6)] = m; });
    (op.docs || []).forEach(d => { const k = dcol(d.col), col = this.db[k] = this.db[k] || {}; col[d.id] = Object.assign(col[d.id] || {}, d.data); });
    this.write(); return Promise.resolve(pl);
  },
  saveProduto(sku, obj){ const q = (this.db.est[sku] || {}).q || {}; this.db.cat.p[sku] = Object.assign({}, obj, { d: dispMapFor(sku, q, sett().reserva) }); if(!this.db.est[sku]) this.db.est[sku] = { q:{} }; this.write(); return Promise.resolve(); },
  marcarReaisBF(skus){ skus.forEach(k => { if(this.db.cat.p[k]) this.db.cat.p[k].bf = true; }); this.db.cat.reaisBF = 1; this.write(); return Promise.resolve(); },
  setProdField(sku, field, val){ if(this.db.cat.p[sku]){ this.db.cat.p[sku][field] = val; this.write(); } return Promise.resolve(); },
  deleteProduto(sku){ if(AQ.REAIS.some(x => x.sku === sku)) this.db.cat.ign = [...new Set((this.db.cat.ign || []).concat(sku))]; delete this.db.cat.p[sku]; delete this.db.est[sku]; Object.keys(this.db.fotos).filter(k => k.indexOf(sku + '~') === 0).forEach(k => { delete this.db.fotos[k]; delete this.db.fotosHD[k]; }); this.write(); return Promise.resolve(); },
  saveFotos(id, t, f){ if(f.length){ this.db.fotos[id] = t; this.db.fotosHD[id] = f; } else { delete this.db.fotos[id]; delete this.db.fotosHD[id]; } delete FOTO[id]; this.write(); return Promise.resolve(); },
  getFotos(id){ return Promise.resolve({ t: this.db.fotos[id] || '', f: this.db.fotosHD[id] || [] }); },
  saveSettings(s){ this.db.cat.s = s; this.recalc(); return Promise.resolve(); },
  recalc(){ const res = this.db.cat.s.reserva; Object.entries(this.db.cat.p).forEach(([sku, pp]) => { pp.d = dispMapFor(sku, (this.db.est[sku] || {}).q, res); }); this.write(); return Promise.resolve(); },
  setDoc(col, id, data){ col = dcol(col); const c = this.db[col] = this.db[col] || {}; c[id] = Object.assign(c[id] || {}, data); this.write(); return Promise.resolve(); },
  addDoc(col, data){ const id = 'd' + now().toString(36) + Math.random().toString(36).slice(2, 6); data.ts = now(); return this.setDoc(col, id, data).then(() => id); },
  delDoc(col, id){ col = dcol(col); if(this.db[col]) delete this.db[col][id]; this.write(); return Promise.resolve(); },
  createMember(m){ const uid = 'demo-' + now().toString(36); this.db.eq[uid] = { nome:m.nome, email:m.email, perfil:m.perfil, loja:m.loja, ativo:true, criado: now() }; this.write(); return Promise.resolve(uid); },
  loadMov(from){ return Promise.resolve(this.list(this.db.mov).filter(m => m.ts >= from)); }
};

/* ============================================================
   FIREBASE
   ============================================================ */
const FireB = {
  async init(){
    await AQ.loadFirebase(['auth', 'firestore']);
    this.fsNs = firebase.firestore; this.db = firebase.firestore(); this.auth = firebase.auth();
    this.TS = () => this.fsNs.FieldValue.serverTimestamp();
  },
  onAuth(cb){ this.auth.onAuthStateChanged(cb); },
  login(e, p){ return this.auth.signInWithEmailAndPassword(e, p); },
  logout(){ (this.unsubs || []).forEach(u => u()); this.unsubs = []; return this.auth.signOut(); },
  reset(e){ return this.auth.sendPasswordResetEmail(e); },
  fix(d, id){ const o = Object.assign({ id }, d); Object.keys(o).forEach(k => { if(o[k] && typeof o[k].toMillis === 'function') o[k] = o[k].toMillis(); }); if(o.ts == null) o.ts = now(); return o; },
  async profile(u){
    const ref = this.db.collection('equipe').doc(u.uid);
    const sn = await ref.get();
    if(sn.exists){ const d = sn.data(); return d.ativo ? Object.assign({ uid: u.uid }, d) : null; }
    const donos = (window.AQ_DONOS || []).map(x => String(x).toLowerCase());
    if(donos.includes(String(u.email || '').toLowerCase())){
      const d = { nome: primeiro((u.email || '').split('@')[0]).replace(/^./, c => c.toUpperCase()), email: u.email, perfil:'admin', loja:null, ativo:true, criado: this.TS() };
      await ref.set(d); return Object.assign({ uid: u.uid }, d);
    }
    return null;
  },
  subscribe(cbs){
    const db = this.db, u = this.unsubs = [], err = e => { console.warn(e); if(window.onDataError) onDataError(e); };
    const col = (name, cb, lim) => u.push(db.collection(name).orderBy('ts', 'desc').limit(lim).onSnapshot(qs => cb(qs.docs.map(d => this.fix(d.data({ serverTimestamps:'estimate' }), d.id))), err));
    u.push(db.doc('publico/catalogo').onSnapshot(sn => cbs.cat(sn.exists ? sn.data() : null), err));
    u.push(db.collection('estoque').onSnapshot(qs => { const o = {}; qs.forEach(d => { o[d.id] = d.data(); }); cbs.est(o); }, err));
    col('movimentos', cbs.mov, 400); col('transferencias', cbs.trf, 200); col('pedidos', cbs.ped, 300); col('avisos', cbs.avi, 300); col('clientes', cbs.cli, 5000);
    u.push(db.collection('equipe').onSnapshot(qs => cbs.eq(qs.docs.map(d => Object.assign(this.fix(d.data(), d.id), { uid: d.id }))), err));
  },
  async seed(){
    const s = AQ.clone(AQ.SETTINGS), p = AQ.seedProdutos(), b = this.db.batch();
    const est = {}; Object.keys(p).forEach(sku => { p[sku].d = {}; });
    AQ.aplicarCadastro({ p }, est, s.reserva);   // peças já conferidas na loja entram com as unidades reais
    Object.keys(p).forEach(sku => { b.set(this.db.collection('estoque').doc(sku), { q: (est[sku] || {}).q || {}, atualizado: this.TS() }); });
    b.set(this.db.doc('publico/catalogo'), { v:1, s, p, atualizado: this.TS() });
    await b.commit();
  },
  async apply(op){
    const db = this.db, FP = this.fsNs.FieldPath;
    const skus = [...new Set(op.itens.map(i => i.sku))];
    let plano;
    await db.runTransaction(async tx => {
      const snaps = await Promise.all(skus.map(s => tx.get(db.collection('estoque').doc(s))));
      const atual = {}; snaps.forEach((sn, i) => { atual[skus[i]] = sn.exists ? sn.data() : { q:{} }; });
      plano = planApply(atual, op);
      Object.entries(plano.est).forEach(([sku, q]) => tx.set(db.collection('estoque').doc(sku), { q, atualizado: this.TS() }));
      const args = [];
      plano.disp.forEach(x => { if(S.cat && S.cat.p[x.sku]) args.push(new FP('p', x.sku, 'd', x.k), x.v); });
      if(args.length) tx.update(db.doc('publico/catalogo'), 'atualizado', this.TS(), ...args);
      plano.movs.forEach(m => { m.ts = this.TS(); tx.set(db.collection('movimentos').doc(), m); });
      (op.docs || []).forEach(d => tx.set(db.collection(d.col).doc(d.id), d.data, { merge:true }));
    });
    return plano;
  },
  async saveProduto(sku, obj){
    const q = (S.est[sku] || {}).q || {};
    const val = Object.assign({}, obj, { d: dispMapFor(sku, q, sett().reserva) });
    const b = this.db.batch();
    b.update(this.db.doc('publico/catalogo'), new this.fsNs.FieldPath('p', sku), val, 'atualizado', this.TS());
    if(!S.est[sku]) b.set(this.db.collection('estoque').doc(sku), { q:{}, atualizado: this.TS() });
    await b.commit();
  },
  marcarReaisBF(skus){ const FP = this.fsNs.FieldPath, a = []; skus.forEach(k => a.push(new FP('p', k, 'bf'), true)); return this.db.doc('publico/catalogo').update('reaisBF', 1, 'atualizado', this.TS(), ...a); },
  setProdField(sku, field, val){ return this.db.doc('publico/catalogo').update(new this.fsNs.FieldPath('p', sku, field), val, 'atualizado', this.TS()); },
  async deleteProduto(sku){
    const b = this.db.batch(), p = prod(sku);
    if(AQ.REAIS.some(x => x.sku === sku)) b.update(this.db.doc('publico/catalogo'), new this.fsNs.FieldPath('p', sku), this.fsNs.FieldValue.delete(), 'ign', this.fsNs.FieldValue.arrayUnion(sku));
    else b.update(this.db.doc('publico/catalogo'), new this.fsNs.FieldPath('p', sku), this.fsNs.FieldValue.delete());
    b.delete(this.db.collection('estoque').doc(sku));
    (p ? p.cores : []).forEach(c => { b.delete(this.db.collection('fotos').doc(fotoId(sku, c.id))); b.delete(this.db.collection('fotosHD').doc(fotoId(sku, c.id))); });
    await b.commit();
  },
  async saveFotos(id, t, f){
    delete FOTO[id];
    if(!f.length){ await Promise.all([this.db.collection('fotos').doc(id).delete(), this.db.collection('fotosHD').doc(id).delete()]); return; }
    await this.db.collection('fotosHD').doc(id).set({ f, ts: this.TS() });
    await this.db.collection('fotos').doc(id).set({ t, ts: this.TS() });
  },
  async getFotos(id, hd){
    const a = await this.db.collection('fotos').doc(id).get();
    const r = { t: a.exists ? a.data().t : '', f: [] };
    if(hd){ const b = await this.db.collection('fotosHD').doc(id).get(); r.f = b.exists ? b.data().f || [] : []; }
    return r;
  },
  saveSettings(s){ return this.db.doc('publico/catalogo').update({ s, atualizado: this.TS() }).then(() => this.recalc(s.reserva)); },
  recalc(res){
    if(res == null) res = sett().reserva;
    const args = [];
    prods().forEach(p => args.push(new this.fsNs.FieldPath('p', p.sku, 'd'), dispMapFor(p.sku, (S.est[p.sku] || {}).q, res)));
    return args.length ? this.db.doc('publico/catalogo').update('atualizado', this.TS(), ...args) : Promise.resolve();
  },
  setDoc(col, id, data){ return this.db.collection(col).doc(id).set(data, { merge:true }); },
  async addDoc(col, data){ data.ts = this.TS(); const r = await this.db.collection(col).add(data); return r.id; },
  delDoc(col, id){ return this.db.collection(col).doc(id).delete(); },
  async createMember(m){
    const sec = firebase.apps.find(a => a.name === 'cadastro') || firebase.initializeApp(window.AQ_FIREBASE, 'cadastro');
    const cred = await sec.auth().createUserWithEmailAndPassword(m.email, m.senha);
    const uid = cred.user.uid;
    await sec.auth().signOut();
    await this.db.collection('equipe').doc(uid).set({ nome:m.nome, email:m.email, perfil:m.perfil, loja:m.loja, ativo:true, criado: this.TS() });
    return uid;
  },
  async loadMov(from){
    const qs = await this.db.collection('movimentos').where('ts', '>=', firebase.firestore.Timestamp.fromMillis(from)).orderBy('ts', 'desc').limit(5000).get();
    return qs.docs.map(d => this.fix(d.data(), d.id));
  }
};

const B = DEMO ? DemoB : FireB;

/* Erros do Firebase em português */
function errMsg(e){
  const c = (e && e.code) || '';
  const M = {
    'auth/invalid-credential':'E-mail ou senha incorretos.', 'auth/wrong-password':'E-mail ou senha incorretos.', 'auth/user-not-found':'E-mail ou senha incorretos.',
    'auth/invalid-email':'Este e-mail não é válido.', 'auth/too-many-requests':'Muitas tentativas seguidas. Espere alguns minutos e tente de novo.',
    'auth/network-request-failed':'Sem conexão com a internet. Confira a rede e tente de novo.', 'auth/email-already-in-use':'Já existe uma conta com este e-mail.',
    'auth/weak-password':'A senha precisa ter pelo menos 6 caracteres.', 'permission-denied':'Você não tem permissão para fazer isso. Fale com a administração.',
    'unavailable':'Sem conexão com o banco de dados. Confira a internet e tente de novo.'
  };
  return M[c] || (e && e.message) || 'Algo deu errado. Tente de novo.';
}
