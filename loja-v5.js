/* ============================================================
   ÁREA DA LOJA · TELAS
   ============================================================ */

/* ---------------- ícones ---------------- */
const IC = (d, w) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w || 1.7}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const I = {
  inicio: IC('<path d="M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z"/>'),
  estoque: IC('<path d="M12 7.2a2.1 2.1 0 1 1 2.1-2.1"/><path d="M12 7.2v1.9l-8.6 6.6A1.6 1.6 0 0 0 4.4 18.6h15.2a1.6 1.6 0 0 0 1-2.9L12 9.1"/>'),
  pedidos: IC('<path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>'),
  transferencias: IC('<path d="M7 4L3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7"/>'),
  avisos: IC('<path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20a2 2 0 0 0 4 0"/>'),
  clientes: IC('<rect x="3.5" y="9" width="17" height="11" rx="1.5"/><path d="M3.5 13h17M12 9v11"/><path d="M12 9c-1.5-3.5-5.5-4.2-5.5-1.6C6.5 9 9.5 9 12 9zM12 9c1.5-3.5 5.5-4.2 5.5-1.6C17.5 9 14.5 9 12 9z"/>'),
  bf: IC('<path d="M3 12V4h8l10 10-8 8z"/><path d="M7 8h.01"/><path d="M10.5 14.5l4-4"/>'),
  catalogo: IC('<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.4"/>'),
  historico: IC('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>'),
  relatorios: IC('<path d="M5 20v-9M11 20V5M17 20v-6M3 20h18"/>'),
  site: IC('<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.4 3.6 5.3 3.6 8.5s-1.1 6.1-3.6 8.5c-2.5-2.4-3.6-5.3-3.6-8.5S9.5 5.9 12 3.5z"/>'),
  equipe: IC('<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.8c1.9.7 3.1 2.4 3.5 5.2"/>'),
  mais: IC('<circle cx="5" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="19" cy="12" r="1.2"/>', 2.2),
  search: IC('<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>'),
  plus: IC('<path d="M12 5v14M5 12h14"/>'),
  minus: IC('<path d="M5 12h14"/>'),
  x: IC('<path d="M6 6l12 12M18 6L6 18"/>'),
  chev: IC('<path d="M6 9l6 6 6-6"/>'),
  sair: IC('<path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 16l-4-4 4-4M6 12h10"/>'),
  check: IC('<path d="M5 12.5l4.5 4.5L19 7.5"/>'),
  up: IC('<path d="M12 16V4M7 9l5-5 5 5M4 20h16"/>'),
  down: IC('<path d="M12 4v12M7 11l5 5 5-5M4 20h16"/>'),
  edit: IC('<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M14 6l4 4"/>'),
  ext: IC('<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>'),
  menu: IC('<path d="M4 7h16M4 12h16M4 17h16"/>'),
  alert: IC('<path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17v.5"/>'),
  wa: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.9 6.99c0 5.45-4.44 9.88-9.9 9.88z"/></svg>'
};
const MARK = '<img class="bs" src="aqualupe-simbolo.svg" alt="" width="36" height="42">';
const NOME = '<img class="bn" src="aqualupe-nome.svg" alt="Aqualupe" width="96" height="22">';

/* ---------------- ilustração da peça (a mesma do site) ---------------- */
const SH = {
  vlongo:{d:'M152 112 Q200 134 248 112 L244 196 Q238 226 230 246 L306 474 Q200 496 94 474 L170 246 Q162 226 156 196 Z',yc:281},
  vmidi:{d:'M152 112 Q200 134 248 112 L244 196 Q238 226 230 246 L290 392 Q200 410 110 392 L170 246 Q162 226 156 196 Z',yc:238},
  vcurto:{d:'M152 112 Q200 134 248 112 L244 196 Q238 226 230 246 L276 318 Q200 334 124 318 L170 246 Q162 226 156 196 Z',yc:200},
  blusa:{d:'M140 108 L182 92 Q200 112 218 92 L260 108 L296 200 L256 214 L252 340 L148 340 L144 214 L104 200 Z',yc:216},
  calca:{d:'M148 120 L252 120 L266 478 L214 478 L200 262 L186 478 L134 478 Z',yc:299},
  saia:{d:'M156 150 L244 150 L312 410 Q200 432 88 410 Z',yc:285},
  conjc:{d:'M144 96 L184 82 Q200 100 216 82 L256 96 L286 170 L252 184 L248 238 L152 238 L148 184 L114 170 Z M154 246 L246 246 L258 478 L212 478 L200 320 L188 478 L142 478 Z',yc:280},
  conjs:{d:'M144 96 L184 82 Q200 100 216 82 L256 96 L286 170 L252 184 L248 238 L152 238 L148 184 L114 170 Z M158 246 L242 246 L304 440 Q200 460 96 440 Z',yc:271},
  macacao:{d:'M150 104 Q200 128 250 104 L248 214 L262 478 L214 478 L200 290 L186 478 L138 478 L152 214 Z',yc:272},
  chapeu:{d:'M130 292 Q130 170 200 170 Q270 170 270 292 Z M52 306 Q200 266 348 306 Q200 346 52 306 Z',yc:258},
  bolsa:{d:'M110 230 L290 230 L310 420 Q310 440 290 440 L110 440 Q90 440 90 420 Z',yc:290}
};
function hex2rgb(h){ h = String(h || '#999999').replace('#', ''); if(h.length === 3) h = h.split('').map(x => x + x).join(''); return [0, 2, 4].map(i => parseInt(h.substr(i, 2), 16) || 0); }
function mix(a, b, t){ const A = hex2rgb(a), B2 = hex2rgb(b); return '#' + A.map((v, i) => Math.round(v * (1 - t) + B2[i] * t).toString(16).padStart(2, '0')).join(''); }
let UID = 0;
function pattern(id, est, base, acc){
  if(!est) return '';
  acc = acc || '#FFFFFF';
  if(est === 'poa') return `<pattern id="lp${id}" width="22" height="22" patternUnits="userSpaceOnUse"><rect width="22" height="22" fill="${base}"/><circle cx="11" cy="11" r="3.4" fill="${acc}"/></pattern>`;
  if(est === 'tropical') return `<pattern id="lp${id}" width="40" height="40" patternUnits="userSpaceOnUse"><rect width="40" height="40" fill="${base}"/><ellipse cx="11" cy="11" rx="10" ry="3.4" transform="rotate(-35 11 11)" fill="${acc}"/><ellipse cx="29" cy="29" rx="10" ry="3.4" transform="rotate(35 29 29)" fill="${acc}"/></pattern>`;
  const f = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${acc}"><circle cx="0" cy="-4" r="2.6"/><circle cx="4" cy="0" r="2.6"/><circle cx="0" cy="4" r="2.6"/><circle cx="-4" cy="0" r="2.6"/></g>`;
  return `<pattern id="lp${id}" width="34" height="34" patternUnits="userSpaceOnUse"><rect width="34" height="34" fill="${base}"/>${f(9, 9, 1)}${f(26, 26, .75)}</pattern>`;
}
function art(tipo, cor){
  const id = ++UID, S2 = SH[tipo] || SH.vlongo, h = cor.h || '#999999';
  return `<svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Ilustração da peça"><defs><linearGradient id="lb${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix(h, '#FFFFFF', .9)}"/><stop offset="1" stop-color="${mix(h, '#F1D2DC', .8)}"/></linearGradient>${pattern(id, cor.est, h, cor.acc)}</defs><rect width="400" height="500" fill="url(#lb${id})"/><g transform="translate(0 ${250 - S2.yc})"><path d="${S2.d}" fill="${h}"/>${cor.est ? `<path d="${S2.d}" fill="url(#lp${id})"/>` : ''}</g></svg>`;
}
function thumb(p, cor, cls){
  cor = cor || (p.cores || [])[0] || { h:'#ccc' };
  if(cor.sf && cor.sf.length) return `<div class="th ${cls || ''}"><img src="${esc(cor.sf[0])}" alt="${esc(p.nome + ', ' + cor.n)}" loading="lazy"></div>`;
  if(cor.nf > 0) return `<div class="th ${cls || ''}"><img data-f="${esc(fotoId(p.sku, cor.id))}" data-v="${cor.fv || 0}" alt="${esc(p.nome + ', ' + cor.n)}"></div>`;
  return `<div class="th ${cls || ''}">${art(p.tipo, cor)}</div>`;
}
function hydrate(root){
  $$('img[data-f]:not([src])', root || document).forEach(im => {
    const id = im.dataset.f, c = FOTO[id];
    if(c && c.t){ im.src = c.t; return; }
    (c && c.p ? c.p : (FOTO[id] = { p: B.getFotos(id, false) }).p).then(r => {
      FOTO[id] = Object.assign(FOTO[id] || {}, { t: r.t });
      $$(`img[data-f="${CSS.escape(id)}"]`).forEach(x => { if(r.t) x.src = r.t; });
    }).catch(() => {});
  });
}

/* ---------------- avisos visuais ---------------- */
function toast(t, err){ const el = $('#toast'); el.textContent = t; el.className = 'toast on' + (err ? ' err' : ''); clearTimeout(toast._t); toast._t = setTimeout(() => el.classList.remove('on'), err ? 4200 : 2600); }
window.onDataError = e => toast(errMsg(e), true);
function openDlg(o){
  const d = $('#dlg');
  d.className = 'dlg' + (o.wide ? ' wide' : '');
  d.innerHTML = `<div class="hd"><h2 id="dlgt">${o.title}</h2><button class="ib" data-close aria-label="Fechar">${I.x}</button></div><div class="bd" id="dlgb"></div>${o.foot === false ? '' : '<div class="ft" id="dlgf"></div>'}`;
  d.setAttribute('aria-labelledby', 'dlgt');
  $('#veil').classList.add('on');
  openDlg.cur = o;
  if(o.render) o.render();
  setTimeout(() => { const f = d.querySelector('[autofocus]'); if(f) f.focus(); }, 60);
}
function closeDlg(){ $('#veil').classList.remove('on'); openDlg.cur = null; }
$('#veil').addEventListener('click', e => { if(e.target.id === 'veil' || e.target.closest('[data-close]')) closeDlg(); });
function ask(o){
  return new Promise(res => {
    const d = $('#dlg2');
    d.innerHTML = `<div class="hd"><h2>${esc(o.title)}</h2></div><div class="bd"><p style="margin:0">${o.html || esc(o.text || '')}</p>${o.input ? `<label class="fld">${esc(o.input)}<textarea class="txt" id="askIn" style="min-height:70px"></textarea></label>` : ''}</div><div class="ft"><button class="btn" data-r="0">${esc(o.no || 'Voltar')}</button><button class="btn ${o.danger ? 'danger' : 'pri'}" data-r="1">${esc(o.ok || 'Confirmar')}</button></div>`;
    $('#veil2').classList.add('on');
    d.onclick = e => { const b = e.target.closest('[data-r]'); if(!b) return; $('#veil2').classList.remove('on'); const v = $('#askIn') ? $('#askIn').value.trim() : true; res(b.dataset.r === '1' ? v || true : false); };
  });
}
async function busy(btn, fn){
  const t = btn ? btn.innerHTML : '';
  if(btn){ btn.disabled = true; btn.innerHTML = '<span class="spin" style="width:16px;height:16px;border-width:2px"></span>'; }
  try{ return await fn(); }
  catch(e){ console.error(e); toast(errMsg(e), true); return undefined; }
  finally{ if(btn && btn.isConnected){ btn.disabled = false; btn.innerHTML = t; } }
}
const stepHtml = (id, v, min, max) => `<div class="step" data-step="${id}"><button type="button" data-s="-1" aria-label="Diminuir">−</button><input id="${id}" inputmode="numeric" value="${v}" data-min="${min}" data-max="${max == null ? '' : max}" aria-label="Quantidade"><button type="button" data-s="1" aria-label="Aumentar">+</button></div>`;
document.addEventListener('click', e => {
  const b = e.target.closest('[data-step] button'); if(!b) return;
  const inp = b.parentNode.querySelector('input'), mn = +inp.dataset.min || 0, mx = inp.dataset.max === '' ? Infinity : +inp.dataset.max;
  inp.value = Math.min(mx, Math.max(mn, (parseInt(inp.value, 10) || 0) + (+b.dataset.s)));
  inp.dispatchEvent(new Event('change', { bubbles:true }));
});
function lojaOpts(sel, incluirTodas){ return (incluirTodas ? `<option value="">Todas as lojas</option>` : '') + AQ.LOJAS.map(l => `<option value="${l.k}"${sel === l.k ? ' selected' : ''}>${l.nome}</option>`).join(''); }
const pillSt = n => { const s = stV(n); return `<span class="pill ${s}">${AQ.STATUS_TXT[s]}</span>`; };
const qtyTxt = n => n + (Math.abs(n) === 1 ? ' peça' : ' peças');

/* ============================================================
   LOGIN
   ============================================================ */
function renderLogin(){
  const msg = S.loginMsg; S.loginMsg = null;
  $('#root').innerHTML = `<div class="login">
    <section class="lg-art">
      <div class="ring"></div><div class="ring2"></div>
      <div class="mark"><img src="aqualupe-logo-web.svg" alt="Aqualupe" width="190" height="113"></div>
      <div><h1>Área da Loja</h1><p>Estoque da loja online, pedidos do site, catálogo e Clube Aqualupe em um lugar só. O que muda aqui aparece no site na hora.</p></div>
      <div class="tags">${AQ.LOJAS.map(l => `<span>${l.nome}</span>`).join('')}</div>
    </section>
    <section class="lg-form"><div class="lg-box">
      <h2>Entrar</h2>
      <p class="sub">Use o e-mail e a senha cadastrados pela administração.</p>
      ${msg ? `<div class="msg ${msg.ok ? 'ok' : 'err'}">${esc(msg.t || msg)}</div>` : ''}
      <form id="lgf" class="lg-box" style="gap:14px" novalidate>
        <label class="fld">E-mail<input class="inp" id="lgEmail" type="email" autocomplete="username" ${DEMO ? 'disabled' : 'autofocus'}></label>
        <label class="fld">Senha<span class="pw"><input class="inp" id="lgPass" type="password" autocomplete="current-password" ${DEMO ? 'disabled' : ''}><button type="button" id="lgShow">Mostrar</button></span></label>
        <div id="lgMsg" hidden></div>
        <button class="btn pri" id="lgBtn" type="submit" ${DEMO ? 'disabled' : ''} style="min-height:46px">Entrar</button>
        <button class="linkbtn" type="button" id="lgReset" ${DEMO ? 'hidden' : ''}>Esqueci a senha</button>
      </form>
      ${DEMO ? `<div class="demo-box">
        <p><b style="color:var(--ink)">Demonstração.</b> O Firebase ainda não foi conectado, então o login está desligado. Escolha um perfil para ver a Área da Loja com dados de exemplo. Tudo fica salvo só neste navegador.</p>
        <div class="demo-grid">
          <button data-demo="demo-admin"><b>Flávia</b><small>Administração</small></button>
          ${AQ.LOJAS.map(l => `<button data-demo="demo-${l.k}"><b>Equipe ${l.curto}</b><small>Vendedora da loja</small></button>`).join('')}
        </div></div>` : ''}
      <a class="note" href="index.html" style="justify-self:start">Voltar para o site</a>
    </div></section></div>`;
  $('#lgShow').onclick = () => { const p = $('#lgPass'); p.type = p.type === 'password' ? 'text' : 'password'; $('#lgShow').textContent = p.type === 'password' ? 'Mostrar' : 'Ocultar'; };
  $$('[data-demo]').forEach(b => b.onclick = () => B.loginDemo(b.dataset.demo));
  const say = (t, ok) => { const m = $('#lgMsg'); m.hidden = false; m.className = 'msg ' + (ok ? 'ok' : 'err'); m.textContent = t; };
  $('#lgf').onsubmit = e => {
    e.preventDefault();
    const em = $('#lgEmail').value.trim(), pw = $('#lgPass').value;
    if(!em || !pw){ say('Preencha o e-mail e a senha.'); return; }
    busy($('#lgBtn'), () => B.login(em, pw).catch(err => say(errMsg(err))));
  };
  $('#lgReset').onclick = () => {
    const em = $('#lgEmail').value.trim();
    if(!em){ say('Digite o seu e-mail no campo acima e toque em "Esqueci a senha" de novo.'); return; }
    B.reset(em).then(() => say('Enviamos um link para criar uma nova senha. Confira o e-mail, inclusive a caixa de spam.', true)).catch(err => say(errMsg(err)));
  };
}

/* ============================================================
   ESTRUTURA DO PAINEL
   ============================================================ */
const NAV = [
  { id:'inicio', t:'Início' },
  { id:'estoque', t:'Estoque' },
  { id:'pedidos', t:'Pedidos do site', n: () => S.ped.filter(x => x.status === 'novo').length },
  { id:'transferencias', t:'Entre lojas', n: () => S.trf.filter(trfAcao).length },
  { id:'avisos', t:'Avise-me', n: () => S.avi.filter(a => a.status === 'aguardando' && avisoDisp(a) > 0).length },
  { id:'clientes', t:'Clube Aqualupe', n: () => niverHoje().length },
  { id:'catalogo', t:'Catálogo' },
  { id:'historico', t:'Histórico' },
  { grp:'Gestão do site', admin:true },
  { id:'relatorios', t:'Relatórios', admin:true },
  { id:'site', t:'Configurações do site', admin:true },
  { id:'equipe', t:'Equipe', admin:true }
];
const TABS = ['inicio', 'estoque', 'pedidos', 'catalogo'];
const navOk = n => (!n.admin || isAdmin()) && (n.id !== 'transferencias' || MULTI);
function papel(m){ m = m || S.me; return m.perfil === 'admin' ? 'Administração' + (m.loja ? ' · ' + LOJA(m.loja).curto : '') : 'Loja ' + (LOJA(m.loja) || { curto:'?' }).curto; }
const iniciais = n => String(n || '?').trim().split(/\s+/).slice(0, 2).map(x => x[0]).join('').toUpperCase();

function renderShell(){
  $('#root').innerHTML = `<div class="shell">
    <aside class="side">
      <a class="brand" href="#inicio">${MARK}<span>${NOME}<small>Área da Loja</small></span></a>
      <nav class="nav" id="nav" aria-label="Seções"></nav>
      <div class="me">
        ${DEMO ? '<div class="demo-tag">Demonstração: dados de exemplo, salvos só neste navegador.</div>' : ''}
        <div class="who"><span class="av">${esc(iniciais(S.me.nome))}</span><span><b>${esc(S.me.nome)}</b><small>${esc(papel())}</small></span></div>
        <div class="row"><a class="btn sm" href="index.html" target="_blank" rel="noopener">${I.ext}Ver o site</a><button class="btn sm" data-sair>${I.sair}Sair</button></div>
      </div>
    </aside>
    <div style="min-width:0">
      <header class="top"><a class="brand" href="#inicio">${MARK}<span>${NOME}</span></a><span class="where">${esc(S.me.nome)}<br>${esc(papel())}</span><button class="ib" data-mais aria-label="Abrir menu">${I.menu}</button></header>
      <main class="main" id="main"></main>
    </div>
    <nav class="tabs" id="tabs" aria-label="Seções principais"></nav>
  </div>
  <div class="save" id="savebar" hidden></div>`;
  $$('[data-sair]').forEach(b => b.onclick = () => B.logout());
  $('[data-mais]').onclick = openMais;
  go(true);
}
function drawNav(){
  const nav = $('#nav'); if(!nav) return;
  nav.innerHTML = NAV.filter(navOk).map(n => n.grp ? `<div class="grp">${n.grp}</div>` : `<a href="#${n.id}" class="${S.view === n.id ? 'on' : ''}">${I[n.id]}<span>${n.t}</span>${n.n && n.n() ? `<span class="n">${n.n()}</span>` : ''}</a>`).join('');
  const maisN = NAV.filter(n => n.id && !TABS.includes(n.id) && navOk(n) && n.n).reduce((a, n) => a + n.n(), 0);
  $('#tabs').innerHTML = TABS.map(id => { const n = NAV.find(x => x.id === id), c = n.n ? n.n() : 0; return `<a href="#${id}" class="${S.view === id ? 'on' : ''}">${I[id]}<span>${id === 'pedidos' ? 'Pedidos' : n.t}</span>${c ? `<span class="n">${c}</span>` : ''}</a>`; }).join('')
    + `<button data-mais class="${TABS.includes(S.view) ? '' : 'on'}">${I.mais}<span>Mais</span>${maisN ? `<span class="n">${maisN}</span>` : ''}</button>`;
  $('#tabs [data-mais]').onclick = openMais;
}
function openMais(){
  openDlg({ title:'Menu', foot:false, render(){
    $('#dlgb').innerHTML = `<div class="list panel">${NAV.filter(n => n.id && navOk(n)).map(n => `<a class="li" href="#${n.id}" data-close><span class="ic">${I[n.id]}</span><span class="tx"><b>${n.t}</b></span>${n.n && n.n() ? `<span class="pill acc nodot">${n.n()}</span>` : ''}</a>`).join('')}</div>
      <div class="row"><a class="btn" href="index.html" target="_blank" rel="noopener">${I.ext}Ver o site</a><button class="btn" id="mSair">${I.sair}Sair</button></div>
      ${DEMO ? `<div class="row"><button class="btn sm ghost" id="mReset">Reiniciar a demonstração</button></div>` : ''}`;
    $('#mSair').onclick = () => { closeDlg(); B.logout(); };
    if($('#mReset')) $('#mReset').onclick = async () => { if(await ask({ title:'Reiniciar a demonstração?', text:'Os dados de exemplo voltam ao início. Isso só afeta este navegador.', ok:'Reiniciar', danger:true })){ B.reiniciar(); closeDlg(); toast('Demonstração reiniciada'); } };
  }});
}

/* ---------------- navegação ---------------- */
const V = {};
function go(force){
  let v = (location.hash || '#inicio').slice(1).split('/')[0] || 'inicio';
  const n = NAV.find(x => x.id === v);
  if(!n || !navOk(n)) v = 'inicio';
  if(v === S.view && !force) return;
  S.view = v; S.mounted = null;
  closeDlg();
  draw(true);
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', () => { if(S.me) go(); });
let rafId = 0;
function changed(){ cancelAnimationFrame(rafId); rafId = requestAnimationFrame(() => draw(false)); }
function draw(mount){
  if(!S.me || !$('#main')) return;
  drawNav(); drawSave();
  const main = $('#main');
  if(!S.loaded.cat || !S.loaded.est){ main.innerHTML = '<div class="loading"><div class="spin"></div><span>Carregando o estoque...</span></div>'; S.mounted = null; return; }
  if(!S.cat){ S.mounted = null; viewPreparo(main); return; }
  const v = V[S.view];
  try{ drawView(v, main, mount); }
  catch(e){ console.error(e); S.mounted = null; main.innerHTML = `<div class="loading"><p style="max-width:46ch;text-align:center">Não foi possível abrir esta tela. Recarregue a página; se continuar, limpe o cache do navegador.</p><button class="btn pri" onclick="location.reload()">Recarregar</button></div>`; }
}
function drawView(v, main, mount){
  if(mount || S.mounted !== S.view){ S.mounted = S.view; v.mount(main); }
  const ae = document.activeElement;
  if(!mount && ae && ae.matches && ae.matches('[data-keep] input, [data-keep] textarea, [data-keep] select')){ S.pendingDraw = true; return; }
  v.draw();
  hydrate(main);
  if(openDlg.cur && openDlg.cur.live) openDlg.cur.render();
}
document.addEventListener('focusout', () => { if(S.pendingDraw){ S.pendingDraw = false; setTimeout(changed, 50); } });
function head(t, p, acts){ return `<div class="ph"><div><h1>${t}</h1>${p ? `<p>${p}</p>` : ''}</div>${acts ? `<div class="acts">${acts}</div>` : ''}</div>`; }

/* ============================================================
   PRIMEIRO ACESSO
   ============================================================ */
function viewPreparo(main){
  if(!isAdmin()){ main.innerHTML = `<div class="wrapx">${head('Quase pronto', 'A administração ainda está preparando o estoque. Assim que terminar, esta tela se atualiza sozinha.')}</div>`; return; }
  main.innerHTML = `<div class="wrapx">${head('Vamos preparar a Área da Loja', 'É só uma vez. Escolha como começar o estoque. Depois você pode cadastrar peças novas, trocar fotos e ajustar quantidades.')}
    <div class="cards two">
      <div class="card"><h3>Começar com as 24 peças do site</h3><p class="note">As peças que já estão no catálogo entram com o estoque zerado. Cada loja lança as quantidades na tela Estoque.</p><div class="acts"><button class="btn pri" id="prepA">Começar com as peças do site</button></div></div>
      <div class="card"><h3>Importar a planilha de estoque</h3><p class="note">Use a planilha Estoque_Aqualupe_Site.xlsx. As quantidades da aba ou da coluna ${AQ.LOJAS.map(l => l.curto).join(', ')} entram sozinhas.</p><div class="acts"><button class="btn" id="prepB">${I.up}Escolher a planilha</button></div></div>
    </div></div>`;
  $('#prepA').onclick = e => busy(e.currentTarget, async () => { await B.seed(); toast('Catálogo criado. Agora é só lançar o estoque.'); });
  $('#prepB').onclick = e => busy(e.currentTarget, async () => { await B.seed(); await new Promise(r => setTimeout(r, 400)); location.hash = '#estoque'; setTimeout(dlgImport, 300); });
}

/* ============================================================
   INÍCIO
   ============================================================ */
function trfAcao(t){
  if(t.status === 'solicitada') return isAdmin() || S.me.loja === t.de;
  if(t.status === 'enviada') return isAdmin() || S.me.loja === t.para;
  return false;
}
function avisoDisp(a){
  const p = prod(a.sku); if(!p || p.ativo === false) return 0;
  if(a.tam) return dispV(a.sku, a.corId, a.tam);
  return AQ.sizesOf(p).reduce((s, t) => s + dispV(a.sku, a.corId, t), 0);
}
V.inicio = {
  mount(main){ main.innerHTML = '<div class="wrapx" id="vw"></div>'; },
  draw(){
    const st = sett(), P = prods().filter(p => p.ativo !== false), me = S.me;
    let esg = 0, ult = 0, noSite = 0;
    P.forEach(p => { let any = false; variants(p).forEach(v => { const n = dispV(p.sku, v.c.id, v.t); if(n === 0) esg++; else { any = true; if(n < st.limite) ult++; } }); if(any) noSite++; });
    const novos = S.ped.filter(x => x.status === 'novo'), trfs = MULTI ? S.trf.filter(trfAcao) : [], nivs = niverHoje(), back = S.avi.filter(a => a.status === 'aguardando' && avisoDisp(a) > 0);
    const h = new Date().getHours(), oi = h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
    const hoje = new Date().toLocaleDateString('pt-BR', { weekday:'long', day:'numeric', month:'long' });
    const minhas = me.loja ? prods().reduce((a, p) => a + prodTotal(p, me.loja), 0) : 0;
    const tot = AQ.LOJAS.map(l => ({ l, n: prods().reduce((a, p) => a + prodTotal(p, l.k), 0) }));
    const mx = Math.max(1, ...tot.map(x => x.n));
    const aten = [
      ...novos.map(x => `<button class="li" data-ped="${esc(x.id)}"><span class="ic">${I.pedidos}</span><span class="tx"><b>Pedido ${esc(x.no)} · ${esc(x.cliente.nome)}</b><small>${qtyTxt(x.itens.reduce((a, i) => a + i.qtd, 0))} · ${x.receb === 'entrega' ? 'Entrega' : 'Retirada'} · ${quando(x.ts)}</small></span><span class="pill acc nodot">Novo</span></button>`),
      ...trfs.map(t => `<a class="li" href="#transferencias"><span class="ic last">${I.transferencias}</span><span class="tx"><b>${t.status === 'solicitada' ? `${LOJA(t.para).curto} pediu ${qtyTxt(t.itens.reduce((a, i) => a + i.qtd, 0))} ao ${LOJA(t.de).curto}` : `${qtyTxt(t.itens.reduce((a, i) => a + i.qtd, 0))} a caminho do ${LOJA(t.para).curto}`}</b><small>${esc(t.itens.map(i => i.prod).join(', '))}</small></span><span class="pill ${TRF_ST[t.status].c} nodot">${t.status === 'solicitada' ? 'Enviar' : 'Receber'}</span></a>`),
      ...nivs.map(c => `<a class="li" href="${waTo(c.tel, msgNiver(c))}" target="_blank" rel="noopener"><span class="ic acc">${I.clientes}</span><span class="tx"><b>Hoje é aniversário de ${esc(primeiro(c.nome))}</b><small>Clube Aqualupe · ${esc(c.tel)}</small></span><span class="pill ok nodot">Dar parabéns</span></a>`),
      ...back.map(a => `<a class="li" href="#avisos"><span class="ic ok">${I.avisos}</span><span class="tx"><b>Avisar ${esc(primeiro(a.nome))}: a peça voltou</b><small>${esc(a.prod)} · ${esc(a.cor)}${a.tam ? ' · ' + esc(a.tam) : ''}</small></span><span class="pill ok nodot">Avisar</span></a>`)
    ];
    $('#vw').innerHTML = `${head(`${oi}, ${esc(primeiro(me.nome))}`, `${hoje.charAt(0).toUpperCase() + hoje.slice(1)} · ${me.loja ? LOJA(me.loja).nome : (MULTI ? 'Todas as lojas' : 'Estoque do ' + AQ.LOJAS[0].nome)}`)}
      <div class="kpis">
        ${me.loja ? `<a class="kpi" href="#estoque"><small>Peças no ${LOJA(me.loja).curto}</small><b>${minhas}</b><span>somando todos os tamanhos</span></a>` : `<a class="kpi" href="#catalogo"><small>Peças à venda no site</small><b>${noSite}</b><span>de ${P.length} ativas no catálogo</span></a>`}
        <a class="kpi ${esg ? 'bad' : ''}" href="#estoque" data-st="out"><small>Tamanhos esgotados</small><b>${esg}</b><span>aparecem riscados no site</span></a>
        <a class="kpi ${ult ? 'warn' : ''}" href="#estoque" data-st="last"><small>Últimas unidades</small><b>${ult}</b><span>menos de ${st.limite} peças no estoque do site</span></a>
        <a class="kpi" href="#pedidos"><small>Pedidos do site para confirmar</small><b>${novos.length}</b><span>${novos.length ? 'o mais antigo ' + quando(novos[novos.length - 1].ts) : 'nenhum esperando'}</span></a>
      </div>
      <div class="cols">
        <section class="panel"><div class="hd"><h2>Precisa de atenção</h2></div>
          ${aten.length ? `<div class="list">${aten.join('')}</div>` : `<div class="empty"><p>Tudo em dia. Pedidos novos, aniversariantes do dia e clientes para avisar aparecem aqui.</p></div>`}
        </section>
        <div style="display:grid;gap:20px;align-content:start">
          <section class="panel"><div class="hd"><h2>${MULTI ? 'Peças em cada loja' : 'Peças no estoque do site'}</h2><a href="#estoque">Ver estoque</a></div><div class="bd bars">
            ${tot.map(x => `<div class="bar"><span>${x.l.curto}</span><span class="tr"><i style="width:${Math.round(x.n / mx * 100)}%"></i></span><b>${x.n}</b></div>`).join('')}
          </div></section>
          <section class="panel"><div class="hd"><h2>Últimas movimentações</h2><a href="#historico">Ver histórico</a></div>
            ${S.mov.length ? `<div class="list">${S.mov.slice(0, 6).map(movLi).join('')}</div>` : '<div class="empty"><p>As vendas, entradas e ajustes aparecem aqui.</p></div>'}
          </section>
        </div>
      </div>`;
    $$('#vw [data-st]').forEach(a => a.onclick = () => { S.f.st = a.dataset.st; });
    $$('#vw [data-ped]').forEach(b => b.onclick = () => dlgPedido(b.dataset.ped));
  }
};
function movLi(m){
  const t = TIPOS[m.tipo] || { t: m.tipo, c:'' };
  return `<div class="li"><span class="ic ${m.qtd > 0 ? 'ok' : 'out'}">${m.qtd > 0 ? I.plus : I.minus}</span><span class="tx"><b>${esc(m.prod)} · ${esc(m.cor)}${m.tam === 'Único' ? '' : ' ' + esc(m.tam)}</b><small>${t.t} · ${LOJA(m.loja) ? LOJA(m.loja).curto : ''} · ${esc(m.por || '')} · ${quando(m.ts)}</small></span><span class="q ${m.qtd > 0 ? 'p' : 'n'}">${m.qtd > 0 ? '+' : ''}${m.qtd}</span></div>`;
}

/* ============================================================
   ESTOQUE
   ============================================================ */
const sk = (sku, corId, tam, l) => [sku, corId, tam, l].join('\u0001');
V.estoque = {
  mount(main){
    main.innerHTML = `<div class="wrapx">
      ${head('Estoque', S.me.loja && !isAdmin() ? `Você lança as quantidades do ${LOJA(S.me.loja).nome}. As outras lojas aparecem para consulta.` : (MULTI ? 'Quantidade de cada cor e tamanho em cada loja. O site mostra a soma, já com a regra de disponibilidade.' : `Quantidade de cada cor e tamanho no ${AQ.LOJAS[0].nome}, que é o estoque da loja online. O site mostra o que está aqui, já com a regra de disponibilidade.`),
        `<button class="btn pri" data-lanc="venda">${I.minus}Registrar venda</button><button class="btn" data-lanc="entrada">${I.plus}Registrar entrada</button>`)}
      <div class="tools" data-keep>
        <label class="search"><span class="sr">Buscar</span>${I.search}<input class="inp" id="eq" placeholder="Buscar por nome, código ou cor" value="${esc(S.f.q)}"></label>
        <select class="sel" id="ecat" aria-label="Categoria"><option value="">Todas as categorias</option>${AQ.CATS.map(c => `<option value="${c.slug}"${S.f.cat === c.slug ? ' selected' : ''}>${c.nome}</option>`).join('')}</select>
      </div>
      <div class="row" style="justify-content:space-between">
        <div class="chips" id="echips"></div>
        ${isAdmin() ? `<div class="row"><button class="btn sm" id="eimp">${I.up}Importar planilha</button><button class="btn sm" id="eexp">${I.down}Baixar planilha</button></div>` : ''}
      </div>
      <div class="stk" id="stk"></div>
    </div>`;
    $('#eq').oninput = e => { S.f.q = e.target.value; this.draw(true); };
    $('#ecat').onchange = e => { S.f.cat = e.target.value; this.draw(); };
    $$('[data-lanc]', main).forEach(b => b.onclick = () => dlgLancar(b.dataset.lanc));
    if($('#eimp')) $('#eimp').onclick = dlgImport;
    if($('#eexp')) $('#eexp').onclick = e => busy(e.currentTarget, exportEstoque);
    const stk = $('#stk');
    stk.addEventListener('click', e => {
      const t = e.target.closest('[data-tog]'); if(t){ const s = t.dataset.tog; S.open.has(s) ? S.open.delete(s) : S.open.add(s); this.draw(); return; }
      const b = e.target.closest('.step button[data-a]'); if(b){ const st = b.closest('.step'); const inp = st.querySelector('input'); setStage(st.dataset, Math.max(0, (parseInt(inp.value, 10) || 0) + (b.dataset.a === 'inc' ? 1 : -1)), st); return; }
      const ed = e.target.closest('[data-edit]'); if(ed){ dlgProduto(ed.dataset.edit); return; }
      const hs = e.target.closest('[data-hist]'); if(hs){ S.f.hsku = hs.dataset.hist; S.f.hp = 'all'; location.hash = '#historico'; }
    });
    stk.addEventListener('change', e => { const inp = e.target.closest('.step input[data-a]'); if(inp){ const st = inp.closest('.step'); setStage(st.dataset, Math.max(0, parseInt(inp.value, 10) || 0), st); } });
    stk.addEventListener('keydown', e => { if(e.key === 'Enter' && e.target.matches('.step input')) e.target.blur(); });
  },
  draw(soft){
    const q = AQ.norm(S.f.q), st = S.f.st;
    const counts = { '':0, ok:0, last:0, out:0 };
    const list = [];
    prods().forEach(p => {
      if(S.f.cat && p.cat !== S.f.cat) return;
      if(q && !AQ.norm([p.nome, p.sku, catOf(p.cat).nome, p.sub, ...p.cores.map(c => c.n), ...refsOf(p)].join(' ')).includes(q)) return;
      const vs = variants(p).map(v => Object.assign(v, { n: dispV(p.sku, v.c.id, v.t) }));
      vs.forEach(v => { counts['']++; counts[stV(v.n)]++; });
      const vis = st ? vs.filter(v => stV(v.n) === st) : vs;
      if(st && !vis.length) return;
      list.push({ p, vs, vis });
    });
    $('#echips').innerHTML = [['', 'Todos'], ['ok', 'Disponível'], ['last', 'Últimas unidades'], ['out', 'Esgotado']].map(([k, t]) => `<button class="chip${S.f.st === k ? ' on' : ''}" data-chip="${k}">${t} <b>${counts[k]}</b></button>`).join('');
    $$('#echips [data-chip]').forEach(b => b.onclick = () => { S.f.st = b.dataset.chip; this.draw(); });
    const auto = (q || st) && list.length <= 3;
    $('#stk').innerHTML = list.length ? list.map(x => prow(x.p, x.vs, x.vis, auto)).join('') : `<div class="panel empty"><p>Nenhuma peça encontrada com esses filtros.</p><button class="btn" id="eclr">Limpar filtros</button></div>`;
    if($('#eclr')) $('#eclr').onclick = () => { S.f.q = ''; S.f.cat = ''; S.f.st = ''; this.mount($('#main')); this.draw(); };
    if(!soft) hydrate($('#stk'));
    else hydrate($('#stk'));
  }
};
function prow(p, vs, vis, auto){
  const open = auto || S.open.has(p.sku);
  const esg = vs.filter(v => v.n === 0).length, ult = vs.filter(v => stV(v.n) === 'last').length;
  const total = prodTotal(p), mine = S.me.loja ? prodTotal(p, S.me.loja) : null;
  const sum = [p.ativo === false ? '<span class="pill nodot keep">Fora do site</span>' : '', esg ? `<span class="pill out">${esg} esgotado${esg > 1 ? 's' : ''}</span>` : '', ult ? `<span class="pill last">${ult} acabando</span>` : ''].join('');
  return `<article class="prow${open ? ' open' : ''}${p.ativo === false ? ' off' : ''}">
    <button class="ph2" data-tog="${esc(p.sku)}" aria-expanded="${open}">${thumb(p, p.cores[0])}<span class="nm"><b>${esc(p.nome)}</b><small>${esc(p.sku)}${refsOf(p).length ? ' · Ref. ' + esc(refsOf(p).join(', ')) : ''} · ${esc(catOf(p.cat).nome)} · ${esc(p.sub)}</small></span><span class="sm">${sum}<span class="tot">${mine != null ? `<b>${mine}</b> na loja · ` : ''}<b>${total}</b> no total</span></span><span class="chev">${I.chev}</span></button>
    ${open ? `<div style="overflow-x:auto"><table class="vt"><thead><tr><th>Cor e tamanho</th>${AQ.LOJAS.map(l => `<th class="num">${l.curto}</th>`).join('')}<th class="num">No site</th><th>Status</th></tr></thead><tbody>
      ${vis.map(v => vrow(p, v)).join('')}
    </tbody></table></div>
    <div class="pfoot"><button class="btn sm ghost" data-hist="${esc(p.sku)}">${I.historico}Histórico da peça</button>${isAdmin() ? `<button class="btn sm" data-edit="${esc(p.sku)}">${I.edit}Editar peça</button>` : ''}</div>` : ''}
  </article>`;
}
function vrow(p, v){
  const q = qOf(p.sku, v.c.id, v.t);
  const ch = AQ.LOJAS.some(l => S.stage[sk(p.sku, v.c.id, v.t, l.k)]);
  const cells = AQ.LOJAS.map(l => {
    const key = sk(p.sku, v.c.id, v.t, l.k), sg = S.stage[key], val = sg ? sg.val : q[l.k];
    if(!canEdit(l.k)) return `<td class="lj num" data-l="${l.curto}"><span class="ro${q[l.k] ? '' : ' z'}">${q[l.k]}</span><span class="dlt"></span></td>`;
    const d = sg ? sg.val - sg.base : 0;
    return `<td class="lj num" data-l="${l.curto}"><div class="step${sg ? ' chg' : ''}" data-sku="${esc(p.sku)}" data-cor="${esc(v.c.id)}" data-tam="${esc(v.t)}" data-l="${l.k}"><button type="button" data-a="dec" aria-label="Tirar uma peça do ${l.curto}">−</button><input data-a="val" inputmode="numeric" value="${val}" aria-label="${esc(v.c.n + ' ' + v.t)} no ${l.curto}"><button type="button" data-a="inc" aria-label="Somar uma peça no ${l.curto}">+</button></div><span class="dlt">${d ? (d > 0 ? '+' : '') + d : ''}</span></td>`;
  }).join('');
  return `<tr class="${ch ? 'ch' : ''}"><td class="cvt"><span class="cv"><i class="sw" style="background:${esc(v.c.h)}"></i><b>${esc(v.c.n)}</b>${v.t === 'Único' ? '' : `<span>${esc(v.t)}</span>`}${v.c.ref ? `<small style="color:var(--mute,#8a7f84);font-size:11px">Ref. ${esc(v.c.ref)}</small>` : ''}</span><span class="m-only">${pillSt(v.n)}</span></td>${cells}<td class="num site"><b>${v.n}</b></td><td class="st">${pillSt(v.n)}</td></tr>`;
}
function setStage(ds, val, stepEl){
  const key = sk(ds.sku, ds.cor, ds.tam, ds.l), base = qOf(ds.sku, ds.cor, ds.tam)[ds.l];
  const cur = S.stage[key];
  const b = cur ? cur.base : base;
  if(val === b) delete S.stage[key]; else S.stage[key] = { sku: ds.sku, corId: ds.cor, tam: ds.tam, loja: ds.l, base: b, val };
  if(stepEl){
    stepEl.querySelector('input').value = val;
    stepEl.classList.toggle('chg', !!S.stage[key]);
    const d = val - b; stepEl.parentNode.querySelector('.dlt').textContent = d ? (d > 0 ? '+' : '') + d : '';
    const tr = stepEl.closest('tr'); tr.classList.toggle('ch', !!tr.querySelector('.step.chg'));
  }
  drawSave();
}
function drawSave(){
  const bar = $('#savebar'); if(!bar) return;
  const L = Object.values(S.stage);
  if(!L.length){ bar.hidden = true; document.body.style.paddingBottom = ''; return; }
  const pos = L.every(x => x.val > x.base), neg = L.every(x => x.val < x.base);
  const sug = neg ? 'venda' : pos ? 'entrada' : 'ajuste';
  const cur = bar.hidden ? sug : ($('#sbMot') && $('#sbMot').value) || sug;
  bar.hidden = false;
  bar.innerHTML = `<b>${L.length} ${L.length === 1 ? 'alteração não salva' : 'alterações não salvas'}</b>
    <select class="sel" id="sbMot" aria-label="Motivo">${MOTIVOS.map(m => `<option value="${m.v}"${m.v === cur ? ' selected' : ''}>${m.t}</option>`).join('')}</select>
    <span class="sp"></span><button class="btn" id="sbDesc">Descartar</button><button class="btn pri" id="sbSave">${I.check}Salvar estoque</button>`;
  $('#sbDesc').onclick = () => { S.stage = {}; drawSave(); if(S.view === 'estoque') V.estoque.draw(); };
  $('#sbSave').onclick = e => saveStage(e.currentTarget);
  if(innerWidth < 1024) document.body.style.paddingBottom = '70px';
}
async function saveStage(btn){
  const mot = MOTIVOS.find(m => m.v === $('#sbMot').value), L = Object.values(S.stage);
  if(mot.sinal < 0 && L.some(x => x.val > x.base)){ toast(`"${mot.t}" só tira peças do estoque. Use "Ajuste de contagem" para corrigir quantidades para mais e para menos.`, true); return; }
  if(mot.sinal > 0 && L.some(x => x.val < x.base)){ toast(`"${mot.t}" só soma peças. Use "Ajuste de contagem" para corrigir quantidades para mais e para menos.`, true); return; }
  const itens = L.map(x => mot.v === 'ajuste' ? { sku:x.sku, corId:x.corId, tam:x.tam, loja:x.loja, set:x.val } : { sku:x.sku, corId:x.corId, tam:x.tam, loja:x.loja, delta:x.val - x.base });
  const ok = await busy(btn, () => B.apply({ tipo: mot.v, motivo: mot.t, itens }));
  if(ok){ S.stage = {}; drawSave(); toast(`Estoque salvo · ${L.length} ${L.length === 1 ? 'alteração' : 'alterações'}`); changed(); }
}

/* ---------- registrar venda / entrada ---------- */
function pickProdHtml(q, lojaK, onlyWith){
  const n = AQ.norm(q);
  const L = prods().filter(p => !n || AQ.norm(p.nome + ' ' + p.sku + ' ' + p.cores.map(c => c.n).join(' ') + ' ' + refsOf(p).join(' ')).includes(n)).slice(0, 40);
  if(!L.length) return '<div class="empty"><p>Nenhuma peça com esse nome ou código.</p></div>';
  return L.map(p => { const t = lojaK ? prodTotal(p, lojaK) : prodTotal(p); return `<button type="button" data-pick="${esc(p.sku)}"${onlyWith && !t ? ' disabled style="opacity:.45"' : ''}>${thumb(p, p.cores[0])}<span class="tx" style="flex:1;min-width:0"><b style="display:block;font-weight:500">${esc(p.nome)}</b><small style="color:var(--muted)">${esc(p.sku)} · ${t} ${lojaK ? 'no ' + LOJA(lojaK).curto : 'no total'}</small></span></button>`; }).join('');
}
function dlgLancar(mode){
  const L = { mode, q:'', sku:null, corId:null, tam:null, loja: S.me.loja || (isAdmin() ? '' : ''), qtd:1, mot: mode === 'venda' ? 'venda' : 'entrada' };
  if(!L.loja && !isAdmin()) L.loja = S.me.loja;
  if(!L.loja || !AQ.LOJAS.some(l => l.k === L.loja)) L.loja = AQ.LOJAS[0].k;
  const venda = mode === 'venda';
  openDlg({ title: venda ? 'Registrar venda' : 'Registrar entrada', render(){
    const p = L.sku ? prod(L.sku) : null;
    const lojaSel = isAdmin() && MULTI ? `<label class="fld">Loja<select class="sel" id="lLoja">${lojaOpts(L.loja)}</select></label>` : `<p class="note">Loja: <b style="color:var(--ink)">${LOJA(L.loja).nome}</b></p>`;
    let corpo;
    if(!p){
      corpo = `<label class="fld">Peça<span class="search" style="flex:none">${I.search}<input class="inp" id="lQ" placeholder="Digite o nome ou o código" value="${esc(L.q)}" autofocus autocomplete="off"></span></label><div class="pick" id="lPick">${pickProdHtml(L.q, L.loja, venda)}</div>`;
    } else {
      const cor = L.corId ? corOf(p, L.corId) : null;
      corpo = `<div class="line">${thumb(p, cor || p.cores[0])}<span class="tx"><b>${esc(p.nome)}</b><small>${esc(p.sku)}</small></span><button class="btn sm ghost" id="lTroca">Trocar peça</button></div>
        <div class="sec"><h3>Cor</h3><div class="opts">${p.cores.map(c => { const n = AQ.sizesOf(p).reduce((a, t) => a + qOf(p.sku, c.id, t)[L.loja], 0); return `<button type="button" class="opt${L.corId === c.id ? ' on' : ''}" data-cor="${esc(c.id)}"${venda && !n ? ' disabled' : ''}><i class="sw" style="background:${esc(c.h)}"></i>${esc(c.n)} <small>${n}</small></button>`; }).join('')}</div></div>
        ${L.corId ? `<div class="sec"><h3>Tamanho <span class="note" style="font-weight:400">· quantidade no ${LOJA(L.loja).curto}</span></h3><div class="opts">${AQ.sizesOf(p).map(t => { const n = qOf(p.sku, L.corId, t)[L.loja]; return `<button type="button" class="opt${L.tam === t ? ' on' : ''}" data-tam="${esc(t)}"${venda && !n ? ' disabled' : ''}>${esc(t)} <small>${n}</small></button>`; }).join('')}</div></div>` : ''}
        ${L.tam ? `<div class="grid2"><label class="fld">Quantidade${stepHtml('lQtd', L.qtd, 1, venda ? qOf(p.sku, L.corId, L.tam)[L.loja] : 999)}</label>
          <label class="fld">Motivo<select class="sel" id="lMot">${(venda ? MOTIVOS.filter(m => m.sinal < 0) : MOTIVOS.filter(m => m.sinal > 0)).map(m => `<option value="${m.v}"${L.mot === m.v ? ' selected' : ''}>${m.t}</option>`).join('')}</select></label></div>
          <p class="note">Depois de salvar: ${LOJA(L.loja).curto} fica com <b id="lDepois" style="color:var(--ink)">${qOf(p.sku, L.corId, L.tam)[L.loja] + (venda ? -L.qtd : L.qtd)}</b>. O site passa a mostrar <b id="lSite" style="color:var(--ink)"></b>.</p>` : ''}`;
    }
    $('#dlgb').innerHTML = lojaSel + corpo;
    $('#dlgf').innerHTML = `<button class="btn" data-close>Fechar</button><button class="btn pri" id="lOk"${L.tam ? '' : ' disabled'}>${venda ? 'Registrar venda' : 'Registrar entrada'}</button>`;
    const upd = () => {
      if(!$('#lSite')) return;
      const q = Object.assign({}, qOf(p.sku, L.corId, L.tam)); q[L.loja] += venda ? -L.qtd : L.qtd;
      const n = AQ.dispOf(q, sett().reserva); $('#lDepois').textContent = q[L.loja]; $('#lSite').innerHTML = AQ.STATUS_TXT[stV(n)].toLowerCase() + ' (' + n + ')';
    };
    upd();
    if($('#lLoja')) $('#lLoja').onchange = e => { L.loja = e.target.value; L.tam = null; L.qtd = 1; this.render(); };
    if($('#lQ')){ $('#lQ').oninput = e => { L.q = e.target.value; $('#lPick').innerHTML = pickProdHtml(L.q, L.loja, venda); hydrate($('#lPick')); }; }
    $('#dlgb').onclick = e => {
      const pk = e.target.closest('[data-pick]'); if(pk && !pk.disabled){ L.sku = pk.dataset.pick; const pp = prod(L.sku); L.corId = pp.cores.length === 1 ? pp.cores[0].id : null; L.tam = null; L.qtd = 1; this.render(); return; }
      if(e.target.closest('#lTroca')){ L.sku = null; L.corId = null; L.tam = null; this.render(); return; }
      const c = e.target.closest('[data-cor]'); if(c && !c.disabled){ L.corId = c.dataset.cor; L.tam = AQ.sizesOf(prod(L.sku)).length === 1 ? AQ.sizesOf(prod(L.sku))[0] : null; L.qtd = 1; this.render(); return; }
      const t = e.target.closest('[data-tam]'); if(t && !t.disabled){ L.tam = t.dataset.tam; L.qtd = 1; this.render(); }
    };
    if($('#lQtd')) $('#lQtd').onchange = e => { L.qtd = Math.max(1, parseInt(e.target.value, 10) || 1); upd(); };
    if($('#lMot')) $('#lMot').onchange = e => { L.mot = e.target.value; };
    $('#lOk').onclick = async e => {
      const mot = MOTIVOS.find(m => m.v === L.mot), pp = prod(L.sku), c = corOf(pp, L.corId);
      const ok = await busy(e.currentTarget, () => B.apply({ tipo: L.mot, motivo: mot.t, itens:[{ sku:L.sku, corId:L.corId, tam:L.tam, loja:L.loja, delta: venda ? -L.qtd : L.qtd }] }));
      if(ok){ toast(`${mot.t}: ${pp.nome}, ${c.n} ${L.tam === 'Único' ? '' : L.tam} (${qtyTxt(L.qtd)})`); L.sku = null; L.corId = null; L.tam = null; L.qtd = 1; L.q = ''; this.render(); }
    };
    hydrate($('#dlgb'));
  }});
}

/* ============================================================
   HISTÓRICO
   ============================================================ */
V.historico = {
  mount(main){
    main.innerHTML = `<div class="wrapx">${head('Histórico', 'Cada venda, entrada, ajuste e transferência fica registrada com quem fez e quando.')}
      <div class="tools" data-keep>
        <label class="search"><span class="sr">Buscar</span>${I.search}<input class="inp" id="hq" placeholder="Buscar peça, cor ou pessoa" value="${esc(S.f.hq)}"></label>
        ${MULTI ? `<select class="sel" id="hl" aria-label="Loja">${lojaOpts(S.f.hl, true)}</select>` : ''}
        <select class="sel" id="ht" aria-label="Tipo"><option value="">Todos os tipos</option>${Object.entries(TIPOS).map(([k, t]) => `<option value="${k}"${S.f.ht === k ? ' selected' : ''}>${t.t}</option>`).join('')}</select>
      </div>
      <div class="row" style="justify-content:space-between"><div class="seg" id="hp">${[['1', 'Hoje'], ['7', '7 dias'], ['30', '30 dias'], ['all', 'Tudo']].map(([k, t]) => `<button data-p="${k}" class="${S.f.hp === k ? 'on' : ''}">${t}</button>`).join('')}</div><span id="hsku"></span></div>
      <div id="hlist"></div></div>`;
    $('#hq').oninput = e => { S.f.hq = e.target.value; this.draw(); };
    if($('#hl')) $('#hl').onchange = e => { S.f.hl = e.target.value; this.draw(); };
    $('#ht').onchange = e => { S.f.ht = e.target.value; this.draw(); };
    $$('#hp button').forEach(b => b.onclick = () => { S.f.hp = b.dataset.p; $$('#hp button').forEach(x => x.classList.toggle('on', x === b)); this.draw(); });
  },
  draw(){
    const q = AQ.norm(S.f.hq), from = S.f.hp === 'all' ? 0 : (S.f.hp === '1' ? new Date().setHours(0, 0, 0, 0) : now() - (+S.f.hp) * DAY);
    const L = S.mov.filter(m => m.ts >= from && (!S.f.hl || m.loja === S.f.hl) && (!S.f.ht || m.tipo === S.f.ht) && (!S.f.hsku || m.sku === S.f.hsku) && (!q || AQ.norm([m.prod, m.cor, m.tam, m.por, m.sku, m.ref].join(' ')).includes(q)));
    $('#hsku').innerHTML = S.f.hsku ? `<button class="chip on" id="hskuX">Só ${esc((prod(S.f.hsku) || { nome:S.f.hsku }).nome)} ${I.x.replace('<svg', '<svg width="14" height="14"')}</button>` : '';
    if($('#hskuX')) $('#hskuX').onclick = () => { S.f.hsku = ''; this.draw(); };
    $('#hlist').innerHTML = L.length ? `<div class="tw"><table class="tb"><thead><tr><th>Quando</th><th>Peça</th><th>Loja</th><th>Movimento</th><th class="r">Qtd.</th><th class="r">Ficou</th><th>Por</th></tr></thead><tbody>
      ${L.slice(0, 300).map(m => { const t = TIPOS[m.tipo] || { t:m.tipo, c:'' }; return `<tr><td>${quando(m.ts)}</td><td>${esc(m.prod)}<small>${esc(m.cor)}${m.tam === 'Único' ? '' : ' · ' + esc(m.tam)} · ${esc(m.sku)}</small></td><td>${LOJA(m.loja) ? LOJA(m.loja).curto : ''}</td><td><span class="pill ${t.c} nodot">${t.t}</span>${m.ref ? `<small>${esc(m.ref)}</small>` : ''}</td><td class="r"><span class="q ${m.qtd > 0 ? 'p' : 'n'}">${m.qtd > 0 ? '+' : ''}${m.qtd}</span></td><td class="r">${m.depois}</td><td>${esc(m.por || '')}</td></tr>`; }).join('')}
      </tbody></table></div>${L.length > 300 ? '<p class="note">Mostrando as 300 mais recentes. Use os filtros para achar movimentações mais antigas.</p>' : ''}` : '<div class="panel empty"><p>Nenhuma movimentação nesse período.</p></div>';
  }
};

/* ============================================================
   ENTRE LOJAS (TRANSFERÊNCIAS)
   ============================================================ */
V.transferencias = {
  mount(main){
    main.innerHTML = `<div class="wrapx">${head('Entre lojas', 'Peça uma peça a outra loja ou envie o que está sobrando. O estoque sai de uma loja no envio e entra na outra quando ela confirma o recebimento.',
      `<button class="btn pri" id="tPed">${I.transferencias}Pedir peça a outra loja</button><button class="btn" id="tEnv">Enviar peça</button>`)}
      <div class="seg" id="tf">${[['acao', 'Precisa de ação'], ['andamento', 'Em andamento'], ['fim', 'Concluídas']].map(([k, t]) => `<button data-f="${k}" class="${S.f.tf === k ? 'on' : ''}">${t}</button>`).join('')}</div>
      <div class="cards two" id="tlist"></div></div>`;
    $('#tPed').onclick = () => dlgTransf('pedido');
    $('#tEnv').onclick = () => dlgTransf('envio');
    $$('#tf button').forEach(b => b.onclick = () => { S.f.tf = b.dataset.f; $$('#tf button').forEach(x => x.classList.toggle('on', x === b)); this.draw(); });
    $('#tlist').onclick = e => { const b = e.target.closest('[data-ta]'); if(b) trfAct(b.dataset.id, b.dataset.ta, b); };
  },
  draw(){
    const mine = t => isAdmin() || t.de === S.me.loja || t.para === S.me.loja;
    const f = S.f.tf;
    const L = S.trf.filter(mine).filter(t => f === 'acao' ? trfAcao(t) : f === 'andamento' ? ['solicitada', 'enviada'].includes(t.status) : ['recebida', 'recusada', 'cancelada'].includes(t.status));
    $('#tlist').innerHTML = L.length ? L.map(trfCard).join('') : `<div class="panel empty" style="grid-column:1/-1"><p>${f === 'acao' ? 'Nenhuma transferência esperando por você.' : f === 'andamento' ? 'Nenhuma transferência em andamento.' : 'Nenhuma transferência concluída ainda.'}</p></div>`;
    hydrate($('#tlist'));
  }
};
function trfCard(t){
  const st = TRF_ST[t.status], n = t.itens.reduce((a, i) => a + i.qtd, 0);
  const steps = ['solicitada', 'enviada', 'recebida'], idx = steps.indexOf(t.status);
  const acts = [];
  if(t.status === 'solicitada' && (isAdmin() || S.me.loja === t.de)){ acts.push(`<button class="btn sm pri" data-ta="enviar" data-id="${t.id}">${I.check}Enviar as peças</button>`, `<button class="btn sm" data-ta="recusar" data-id="${t.id}">Recusar</button>`); }
  if(t.status === 'solicitada' && (isAdmin() || S.me.loja === t.para)) acts.push(`<button class="btn sm ghost" data-ta="cancelar" data-id="${t.id}">Cancelar pedido</button>`);
  if(t.status === 'enviada' && (isAdmin() || S.me.loja === t.para)) acts.push(`<button class="btn sm pri" data-ta="receber" data-id="${t.id}">${I.check}Confirmar recebimento</button>`);
  const last = (t.hist || []).slice(-1)[0];
  return `<div class="card">
    <div class="top2"><div><h3>${LOJA(t.de).curto} → ${LOJA(t.para).curto}</h3><div class="meta">${t.tipo === 'pedido' ? `Pedido feito por ${esc(t.criadoPor || LOJA(t.para).curto)}` : `Envio feito por ${esc(t.criadoPor || LOJA(t.de).curto)}`} · ${quando(t.ts)}</div></div><span class="pill ${st.c}">${st.t}</span></div>
    <div class="its">${t.itens.map(i => { const p = prod(i.sku); return `<div>${p ? thumb(p, corOf(p, i.corId)) : ''}<span>${esc(i.prod)} · ${esc(i.cor)}${i.tam === 'Único' ? '' : ' · ' + esc(i.tam)}</span><b>${i.qtd}×</b></div>`; }).join('')}</div>
    ${t.obs ? `<p class="note">“${esc(t.obs)}”</p>` : ''}
    ${t.motivo ? `<p class="note">Motivo: ${esc(t.motivo)}</p>` : ''}
    ${idx >= 0 ? `<div class="flow">${steps.map((s, i) => `<span class="${i <= idx ? 'on' : ''}">${['Pedida', 'Enviada', 'Recebida'][i]}</span>`).join('<i></i>')}</div>` : ''}
    ${last ? `<p class="note">Última atualização: ${TRF_ST[last.s] ? TRF_ST[last.s].t.toLowerCase() : last.s} por ${esc(last.por)}, ${quando(last.ts)}.</p>` : ''}
    ${acts.length ? `<div class="acts">${acts.join('')}</div>` : ''}
    <span class="note">${qtyTxt(n)}</span>
  </div>`;
}
async function trfAct(id, a, btn){
  const t = S.trf.find(x => x.id === id); if(!t) return;
  const hist = (t.hist || []).concat([{ s: a === 'enviar' ? 'enviada' : a === 'receber' ? 'recebida' : a === 'recusar' ? 'recusada' : 'cancelada', ts: now(), por: S.me.nome }]);
  if(a === 'enviar'){
    const ok = await busy(btn, () => B.apply({ tipo:'trf_saida', motivo:'Para o ' + LOJA(t.para).curto, ref: id, itens: t.itens.map(i => ({ sku:i.sku, corId:i.corId, tam:i.tam, loja:t.de, delta:-i.qtd })), docs:[{ col:'transferencias', id, data:{ status:'enviada', hist } }] }));
    if(ok) toast(`Peças enviadas. O ${LOJA(t.para).curto} confirma quando receber.`);
  } else if(a === 'receber'){
    const ok = await busy(btn, () => B.apply({ tipo:'trf_entrada', motivo:'Do ' + LOJA(t.de).curto, ref: id, itens: t.itens.map(i => ({ sku:i.sku, corId:i.corId, tam:i.tam, loja:t.para, delta:i.qtd })), docs:[{ col:'transferencias', id, data:{ status:'recebida', hist } }] }));
    if(ok) toast('Recebimento confirmado. As peças entraram no estoque.');
  } else if(a === 'recusar'){
    const m = await ask({ title:'Recusar o pedido?', text:`O ${LOJA(t.para).curto} vai ver que o pedido foi recusado.`, input:'Motivo (opcional)', ok:'Recusar pedido', danger:true });
    if(m !== false) busy(btn, () => B.setDoc('transferencias', id, { status:'recusada', motivo: typeof m === 'string' ? m : '', hist }).then(() => toast('Pedido recusado')));
  } else if(a === 'cancelar'){
    if(await ask({ title:'Cancelar o pedido?', text:'O pedido some da lista do ' + LOJA(t.de).curto + '.', ok:'Cancelar pedido', danger:true })) busy(btn, () => B.setDoc('transferencias', id, { status:'cancelada', hist }).then(() => toast('Pedido cancelado')));
  }
}
function dlgTransf(kind){
  const minha = S.me.loja;
  const T2 = { kind, de: kind === 'envio' ? (minha || 'b') : (minha === 'b' ? 'c' : 'b'), para: kind === 'pedido' ? (minha || 'c') : (minha === 'c' ? 'b' : 'c'), itens:[], obs:'', q:'', sku:null, corId:null, tam:null, qtd:1 };
  openDlg({ title: kind === 'pedido' ? 'Pedir peça a outra loja' : 'Enviar peça para outra loja', wide:true, render(){
    const fixDe = kind === 'envio' && !isAdmin(), fixPara = kind === 'pedido' && !isAdmin();
    const p = T2.sku ? prod(T2.sku) : null;
    const qtxt = (sku, c, t) => { const q = qOf(sku, c, t); return AQ.LOJAS.map(l => `${l.curto[0]} ${q[l.k]}`).join(' · '); };
    let pick;
    if(!p) pick = `<span class="search" style="flex:none">${I.search}<input class="inp" id="tQ" placeholder="Buscar a peça" value="${esc(T2.q)}" autocomplete="off"></span><div class="pick" id="tPick" style="max-height:220px">${pickProdHtml(T2.q, null)}</div>`;
    else pick = `<div class="line">${thumb(p, T2.corId ? corOf(p, T2.corId) : p.cores[0])}<span class="tx"><b>${esc(p.nome)}</b><small>Estoque por loja (B Bangu · C Carioca · A Américas)</small></span><button class="btn sm ghost" id="tTroca">Trocar peça</button></div>
      <div class="opts">${p.cores.map(c => `<button type="button" class="opt${T2.corId === c.id ? ' on' : ''}" data-cor="${esc(c.id)}"><i class="sw" style="background:${esc(c.h)}"></i>${esc(c.n)}</button>`).join('')}</div>
      ${T2.corId ? `<div class="opts">${AQ.sizesOf(p).map(t => `<button type="button" class="opt${T2.tam === t ? ' on' : ''}" data-tam="${esc(t)}">${esc(t)} <small>${qtxt(p.sku, T2.corId, t)}</small></button>`).join('')}</div>` : ''}
      ${T2.tam ? `<div class="row"><label class="fld">Quantidade${stepHtml('tQtd', T2.qtd, 1, 99)}</label><button class="btn" id="tAdd" style="align-self:end">${I.plus}Adicionar à lista</button></div>` : ''}`;
    $('#dlgb').innerHTML = `<div class="grid2">
        <label class="fld">Sai da loja<select class="sel" id="tDe"${fixDe ? ' disabled' : ''}>${lojaOpts(T2.de)}</select></label>
        <label class="fld">Vai para a loja<select class="sel" id="tPara"${fixPara ? ' disabled' : ''}>${lojaOpts(T2.para)}</select></label>
      </div>
      <div class="sec"><h3>Peças</h3>${T2.itens.length ? `<div class="lines">${T2.itens.map((i, k) => { const ok = qOf(i.sku, i.corId, i.tam)[T2.de] >= i.qtd; return `<div class="line"><span class="tx"><b>${i.qtd}× ${esc(i.prod)}</b><small>${esc(i.cor)}${i.tam === 'Único' ? '' : ' · ' + esc(i.tam)} · ${LOJA(T2.de).curto} tem ${qOf(i.sku, i.corId, i.tam)[T2.de]}</small></span>${ok ? '' : '<span class="pill out">Falta no estoque</span>'}<button class="ib" data-rm="${k}" aria-label="Tirar da lista">${I.x}</button></div>`; }).join('')}</div>` : '<p class="note">Nenhuma peça na lista ainda. Escolha abaixo.</p>'}</div>
      <div class="sec" style="border-top:1px solid var(--line);padding-top:14px"><h3>Adicionar peça</h3>${pick}</div>
      <label class="fld">Recado para a outra loja (opcional)<textarea class="txt" id="tObs" style="min-height:64px" placeholder="Ex.: cliente vem buscar sábado de manhã">${esc(T2.obs)}</textarea></label>`;
    $('#dlgf').innerHTML = `<button class="btn" data-close>Fechar</button><button class="btn pri" id="tOk"${T2.itens.length ? '' : ' disabled'}>${kind === 'pedido' ? 'Enviar pedido' : 'Registrar envio'}</button>`;
    const re = () => this.render();
    $('#tDe').onchange = e => { T2.de = e.target.value; re(); };
    $('#tPara').onchange = e => { T2.para = e.target.value; re(); };
    $('#tObs').oninput = e => { T2.obs = e.target.value; };
    if($('#tQ')) $('#tQ').oninput = e => { T2.q = e.target.value; $('#tPick').innerHTML = pickProdHtml(T2.q, null); hydrate($('#tPick')); };
    if($('#tQtd')) $('#tQtd').onchange = e => { T2.qtd = Math.max(1, parseInt(e.target.value, 10) || 1); };
    $('#dlgb').onclick = e => {
      const pk = e.target.closest('[data-pick]'); if(pk){ T2.sku = pk.dataset.pick; const pp = prod(T2.sku); T2.corId = pp.cores.length === 1 ? pp.cores[0].id : null; T2.tam = null; re(); return; }
      if(e.target.closest('#tTroca')){ T2.sku = null; T2.corId = null; T2.tam = null; re(); return; }
      const c = e.target.closest('[data-cor]'); if(c){ T2.corId = c.dataset.cor; T2.tam = null; re(); return; }
      const t = e.target.closest('[data-tam]'); if(t){ T2.tam = t.dataset.tam; re(); return; }
      const rm = e.target.closest('[data-rm]'); if(rm){ T2.itens.splice(+rm.dataset.rm, 1); re(); return; }
      if(e.target.closest('#tAdd')){ const pp = prod(T2.sku), cc = corOf(pp, T2.corId); const ex = T2.itens.find(i => i.sku === T2.sku && i.corId === T2.corId && i.tam === T2.tam); if(ex) ex.qtd += T2.qtd; else T2.itens.push({ sku:T2.sku, prod:pp.nome, corId:T2.corId, cor:cc.n, tam:T2.tam, qtd:T2.qtd }); T2.sku = null; T2.corId = null; T2.tam = null; T2.qtd = 1; T2.q = ''; re(); }
    };
    $('#tOk').onclick = async e => {
      if(T2.de === T2.para){ toast('Escolha lojas diferentes para a saída e a chegada.', true); return; }
      const hist = [{ s: kind === 'pedido' ? 'solicitada' : 'enviada', ts: now(), por: S.me.nome }];
      const doc = { tipo: kind, de:T2.de, para:T2.para, itens:T2.itens, obs:T2.obs.trim(), status: kind === 'pedido' ? 'solicitada' : 'enviada', criadoPor:S.me.nome, hist };
      if(kind === 'pedido'){
        const ok = await busy(e.currentTarget, () => B.addDoc('transferencias', doc));
        if(ok){ closeDlg(); toast(`Pedido enviado ao ${LOJA(T2.de).curto}`); }
      } else {
        const id = 't' + now().toString(36) + Math.random().toString(36).slice(2, 6);
        doc.ts = DEMO ? now() : B.TS();
        const ok = await busy(e.currentTarget, () => B.apply({ tipo:'trf_saida', motivo:'Para o ' + LOJA(T2.para).curto, ref:id, itens: T2.itens.map(i => ({ sku:i.sku, corId:i.corId, tam:i.tam, loja:T2.de, delta:-i.qtd })), docs:[{ col:'transferencias', id, data:doc }] }));
        if(ok){ closeDlg(); toast(`Envio registrado. O ${LOJA(T2.para).curto} confirma quando receber.`); }
      }
    };
    hydrate($('#dlgb'));
  }});
}

/* ============================================================
   PEDIDOS DO SITE
   ============================================================ */
const PED_F = [['novo', 'Novos'], ['andamento', 'Em andamento'], ['concluido', 'Concluídos'], ['cancelado', 'Cancelados'], ['', 'Todos']];
const pedMatch = (x, f) => !f ? true : f === 'andamento' ? ['confirmado', 'pago', 'pronto', 'saiu'].includes(x.status) : x.status === f;
V.pedidos = {
  mount(main){
    main.innerHTML = `<div class="wrapx">${head('Pedidos do site', 'Todo pedido feito no site chega aqui e no WhatsApp. Ao confirmar, você escolhe de qual loja sai cada peça e o estoque baixa sozinho.')}
      <div class="chips" id="pf"></div><div class="cards two" id="plist"></div></div>`;
    $('#plist').onclick = e => { const c = e.target.closest('[data-ped]'); if(c) dlgPedido(c.dataset.ped); };
  },
  draw(){
    $('#pf').innerHTML = PED_F.map(([k, t]) => `<button class="chip${S.f.pf === k ? ' on' : ''}" data-f="${k}">${t} <b>${S.ped.filter(x => pedMatch(x, k)).length}</b></button>`).join('');
    $$('#pf [data-f]').forEach(b => b.onclick = () => { S.f.pf = b.dataset.f; this.draw(); });
    const L = S.ped.filter(x => pedMatch(x, S.f.pf));
    $('#plist').innerHTML = L.length ? L.map(x => { const st = PED_ST[x.status] || { t:x.status, c:'' }, n = x.itens.reduce((a, i) => a + i.qtd, 0); return `<button class="card" data-ped="${esc(x.id)}">
      <div class="top2"><div><h3>${esc(x.cliente.nome)}</h3><div class="meta">${esc(x.no)} · ${quando(x.ts)}</div></div><span class="pill ${st.c}">${st.t}</span></div>
      <div class="its">${x.itens.slice(0, 3).map(i => `<div><i class="sw" style="background:${esc((corOf(prod(i.sku) || { cores:[] }, i.corId) || {}).h || '#ccc')}"></i><span>${i.qtd}× ${esc(i.nome)} · ${esc(i.cor)}${i.tam === 'Único' ? '' : ' ' + esc(i.tam)}</span></div>`).join('')}${x.itens.length > 3 ? `<div class="note">e mais ${x.itens.length - 3}</div>` : ''}</div>
      <div class="top2"><span class="meta">${x.receb === 'entrega' ? 'Entrega · ' + esc((x.frete && x.frete.zona && x.frete.zona.nome) || (x.endereco && x.endereco.cidade) || '') : 'Retirada · ' + esc(x.loja || 'qualquer loja')}</span><b>${BRL(x.total)}</b></div>
      <span class="note">${qtyTxt(n)} · ${esc(x.pag)}</span></button>`; }).join('') : `<div class="panel empty" style="grid-column:1/-1"><p>${S.f.pf === 'novo' ? 'Nenhum pedido novo. Quando uma cliente finalizar a compra no site, o pedido aparece aqui.' : 'Nenhum pedido nesta lista.'}</p></div>`;
  }
};
function pedMsgs(x){
  const n = primeiro(x.cliente.nome), ret = x.receb !== 'entrega';
  return [
    ['Pedido confirmado', `Oi, ${n}! Aqui é da Aqualupe. Seu pedido ${x.no} está confirmado e as peças já estão separadas. ${x.pag === 'Pix' ? 'Vou te mandar a chave Pix para o pagamento.' : 'Vamos combinar o pagamento?'}`],
    [ret ? 'Pronto para retirada' : 'Saiu para entrega', ret ? `Oi, ${n}! Seu pedido ${x.no} já está pronto para retirada no ${x.loja && x.loja.indexOf('Qualquer') < 0 ? x.loja : 'shopping combinado'}. É só falar seu nome no balcão. Te esperamos!` : `Oi, ${n}! Seu pedido ${x.no} saiu para entrega. O motoboy deve chegar em breve.`],
    ['Peça indisponível', `Oi, ${n}! Aqui é da Aqualupe, sobre o pedido ${x.no}. Infelizmente uma das peças acabou de esgotar. Posso te sugerir outra cor ou tamanho?`]
  ];
}
function dlgPedido(id){
  openDlg({ title:'Pedido', wide:true, live:true, render(){
    const x = S.ped.find(p => p.id === id); if(!x){ $('#dlgb').innerHTML = '<div class="empty"><p>Este pedido não existe mais.</p></div>'; $('#dlgf').innerHTML = ''; return; }
    const st = PED_ST[x.status] || { t:x.status, c:'' };
    $('#dlgt').textContent = 'Pedido ' + x.no;
    const end = x.endereco;
    const ret = x.receb !== 'entrega';
    $('#dlgb').innerHTML = `<div class="top2" style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap"><span class="pill ${st.c}">${st.t}</span><span class="note">Feito em ${dataHora(x.ts)}</span></div>
      <div class="grid2">
        <div class="sec"><h3>Cliente</h3><dl class="kv"><dt>Nome</dt><dd>${esc(x.cliente.nome)}</dd><dt>WhatsApp</dt><dd>${esc(x.cliente.tel)}</dd><dt>Pagamento</dt><dd>${esc(x.pag)}</dd></dl>
          <div class="row"><a class="btn sm wa" href="${waTo(x.cliente.tel)}" target="_blank" rel="noopener">${I.wa}Abrir conversa</a></div></div>
        <div class="sec"><h3>${ret ? 'Retirada' : 'Entrega'}</h3><dl class="kv">${ret ? `<dt>Loja</dt><dd>${esc(x.loja || 'A equipe indica')}</dd>` : `<dt>Endereço</dt><dd>${esc(end.rua)}, ${esc(end.num)}${end.comp ? ' · ' + esc(end.comp) : ''}<br>${esc(end.bairro)} · ${esc(end.cidade)}<br>CEP ${esc(end.cep)}</dd><dt>Frete</dt><dd>${x.frete && x.frete.tipo === 'zona' ? BRL(x.frete.preco) + ' · ' + esc(x.frete.zona.nome) + ' · D+' + x.frete.zona.prazo : 'A combinar'}</dd>`}</dl></div>
      </div>
      ${x.obs ? `<div class="msg">Observação da cliente: ${esc(x.obs)}</div>` : ''}
      <div class="sec"><h3>Peças</h3><div class="lines">${x.itens.map(i => { const p = prod(i.sku), q = qOf(i.sku, i.corId, i.tam), bx = (x.baixa || []).find(b => b.sku === i.sku && b.corId === i.corId && b.tam === i.tam);
        return `<div class="line">${p ? thumb(p, corOf(p, i.corId)) : ''}<span class="tx"><b>${i.qtd}× ${esc(i.nome)}</b><small>${esc(i.cor)}${i.tam === 'Único' ? '' : ' · Tam. ' + esc(i.tam)} · ${esc(i.sku)} · ${bx ? 'saiu do ' + LOJA(bx.loja).curto : 'Agora no estoque: ' + AQ.LOJAS.map(l => l.curto + ' ' + q[l.k]).join(', ')}</small></span><b>${BRL(i.preco * i.qtd)}</b></div>`; }).join('')}</div>
        <dl class="kv" style="justify-content:end;text-align:right;grid-template-columns:1fr auto"><dt>Peças</dt><dd>${BRL(x.subtotal)}</dd><dt>Frete</dt><dd>${x.frete && x.frete.preco ? BRL(x.frete.preco) : ret ? 'Grátis' : 'A combinar'}</dd><dt><b style="color:var(--ink)">Total</b></dt><dd><b>${BRL(x.total)}</b></dd></dl></div>
      <div class="sec"><h3>Mensagens prontas para o WhatsApp</h3><div class="row">${pedMsgs(x).map(([t, m]) => `<a class="btn sm" href="${waTo(x.cliente.tel, m)}" target="_blank" rel="noopener">${I.wa}${t}</a>`).join('')}</div></div>
      ${(x.hist || []).length ? `<div class="sec"><h3>Andamento</h3><div class="list">${x.hist.map(h => `<div class="li" style="padding:8px 0"><span class="tx"><b>${(PED_ST[h.s] || { t:h.s }).t}</b><small>${esc(h.por)} · ${dataHora(h.ts)}${h.obs ? ' · ' + esc(h.obs) : ''}</small></span></div>`).join('')}</div></div>` : ''}`;
    const next = { novo:null, confirmado:['pago', 'Marcar como pago'], pago: ret ? ['pronto', 'Pronto para retirada'] : ['saiu', 'Saiu para entrega'], pronto:['concluido', 'Cliente retirou'], saiu:['concluido', 'Entrega concluída'] }[x.status];
    const canCancel = !['concluido', 'cancelado'].includes(x.status);
    $('#dlgf').innerHTML = `${canCancel ? '<button class="btn danger" id="pCanc">Cancelar pedido</button>' : ''}<span style="flex:1"></span>
      ${x.status === 'novo' ? `<button class="btn pri" id="pConf">${I.check}Confirmar e separar as peças</button>` : ''}
      ${next ? `<button class="btn pri" id="pNext">${I.check}${next[1]}</button>` : ''}`;
    if($('#pConf')) $('#pConf').onclick = () => dlgConfirmarPedido(x);
    if($('#pNext')) $('#pNext').onclick = e => busy(e.currentTarget, () => B.setDoc('pedidos', x.id, { status: next[0], hist:(x.hist || []).concat([{ s: next[0], ts: now(), por: S.me.nome }]) }).then(() => toast('Pedido atualizado: ' + PED_ST[next[0]].t.toLowerCase())));
    if($('#pCanc')) $('#pCanc').onclick = async e => {
      const m = await ask({ title:'Cancelar este pedido?', html: x.baixa ? 'As peças que já tinham saído do estoque <b>voltam para as lojas</b>.' : 'O estoque não muda, porque o pedido ainda não tinha sido confirmado.', input:'Motivo (opcional)', ok:'Cancelar pedido', danger:true });
      if(m === false) return;
      const hist = (x.hist || []).concat([{ s:'cancelado', ts: now(), por: S.me.nome, obs: typeof m === 'string' ? m : '' }]);
      if(x.baixa && x.baixa.length) busy(e.currentTarget, () => B.apply({ tipo:'estorno', motivo:'Pedido ' + x.no + ' cancelado', ref:x.no, itens: x.baixa.map(b => ({ sku:b.sku, corId:b.corId, tam:b.tam, loja:b.loja, delta:b.qtd })), docs:[{ col:'pedidos', id:x.id, data:{ status:'cancelado', hist } }] }).then(() => toast('Pedido cancelado e peças devolvidas ao estoque')));
      else busy(e.currentTarget, () => B.setDoc('pedidos', x.id, { status:'cancelado', hist }).then(() => toast('Pedido cancelado')));
    };
    hydrate($('#dlgb'));
  }});
}
function dlgConfirmarPedido(x){
  const lojaRet = (AQ.LOJAS.find(l => x.loja && x.loja.indexOf(l.nome) === 0) || {}).k;
  const esc2 = x.itens.map(i => { const q = qOf(i.sku, i.corId, i.tam); const pref = lojaRet && q[lojaRet] >= i.qtd ? lojaRet : (S.me.loja && q[S.me.loja] >= i.qtd ? S.me.loja : AQ.LOJAS.map(l => l.k).sort((a, b) => q[b] - q[a])[0]); return q[pref] >= i.qtd ? pref : null; });
  openDlg({ title:'Separar as peças', wide:true, render(){
    $('#dlgb').innerHTML = `<p class="note">Escolha de qual loja sai cada peça. Ao confirmar, o estoque dessa loja baixa e o site se atualiza.${lojaRet ? ` A cliente vai retirar no <b style="color:var(--ink)">${LOJA(lojaRet).curto}</b>; se a peça sair de outra loja, peça uma transferência.` : ''}</p>
      ${x.itens.map((i, k) => { const q = qOf(i.sku, i.corId, i.tam); return `<div class="sec"><h3>${i.qtd}× ${esc(i.nome)} · ${esc(i.cor)}${i.tam === 'Único' ? '' : ' · ' + esc(i.tam)}</h3><div class="opts">${AQ.LOJAS.map(l => `<button type="button" class="opt${esc2[k] === l.k ? ' on' : ''}" data-it="${k}" data-l="${l.k}"${q[l.k] < i.qtd ? ' disabled' : ''}>${l.curto} <small>${q[l.k]} em estoque</small></button>`).join('')}</div>${AQ.LOJAS.every(l => q[l.k] < i.qtd) ? '<span class="pill out">Nenhuma loja tem esta peça. Avise a cliente pelo WhatsApp.</span>' : ''}</div>`; }).join('')}`;
    $('#dlgf').innerHTML = `<button class="btn" id="cVolta">Voltar</button><button class="btn pri" id="cOk"${esc2.every(Boolean) ? '' : ' disabled'}>${I.check}Confirmar pedido e baixar estoque</button>`;
    $('#dlgb').onclick = e => { const b = e.target.closest('[data-it]'); if(b && !b.disabled){ esc2[+b.dataset.it] = b.dataset.l; this.render(); } };
    $('#cVolta').onclick = () => dlgPedido(x.id);
    $('#cOk').onclick = async e => {
      const baixa = x.itens.map((i, k) => ({ sku:i.sku, corId:i.corId, tam:i.tam, loja:esc2[k], qtd:i.qtd }));
      const ok = await busy(e.currentTarget, () => B.apply({ tipo:'site', motivo:'Pedido ' + x.no, ref:x.no, itens: baixa.map(b => ({ sku:b.sku, corId:b.corId, tam:b.tam, loja:b.loja, delta:-b.qtd })), docs:[{ col:'pedidos', id:x.id, data:{ status:'confirmado', baixa, hist:(x.hist || []).concat([{ s:'confirmado', ts: now(), por: S.me.nome }]) } }] }));
      if(ok){ toast('Pedido confirmado e estoque atualizado'); dlgPedido(x.id); }
    };
  }});
}

/* ============================================================
   AVISE-ME
   ============================================================ */
V.avisos = {
  mount(main){
    main.innerHTML = `<div class="wrapx">${head('Avise-me', 'Clientes que pediram aviso quando uma peça esgotada voltar. Quando a peça volta ao estoque, ela aparece no topo com o botão para avisar no WhatsApp.')}
      <div class="seg" id="af">${[['aguardando', 'Aguardando'], ['avisada', 'Já avisadas'], ['', 'Todas']].map(([k, t]) => `<button data-f="${k}" class="${S.f.af === k ? 'on' : ''}">${t}</button>`).join('')}</div>
      <div class="cards" id="alist"></div></div>`;
    $$('#af button').forEach(b => b.onclick = () => { S.f.af = b.dataset.f; $$('#af button').forEach(x => x.classList.toggle('on', x === b)); this.draw(); });
    $('#alist').onclick = async e => {
      const b = e.target.closest('[data-av]'); if(!b) return;
      const a = S.avi.find(x => x.id === b.dataset.id);
      if(b.dataset.av === 'ok') busy(b, () => B.setDoc('avisos', a.id, { status:'avisada', avisadaEm: now(), avisadaPor: S.me.nome }).then(() => toast(primeiro(a.nome) + ' marcada como avisada')));
      if(b.dataset.av === 'del' && await ask({ title:'Excluir este pedido de aviso?', text:'Use quando a cliente desistir ou o pedido for repetido.', ok:'Excluir', danger:true })) busy(b, () => B.delDoc('avisos', a.id));
    };
  },
  draw(){
    const L = S.avi.filter(a => !S.f.af || a.status === S.f.af);
    const g = {};
    L.forEach(a => { const k = a.sku + '|' + a.corId + '|' + (a.tam || ''); (g[k] = g[k] || []).push(a); });
    const groups = Object.values(g).map(arr => ({ arr, d: avisoDisp(arr[0]) })).sort((a, b) => (b.d > 0) - (a.d > 0) || b.arr.length - a.arr.length);
    $('#alist').innerHTML = groups.length ? groups.map(({ arr, d }) => {
      const a0 = arr[0], p = prod(a0.sku);
      return `<div class="card"><div class="top2"><div class="row" style="flex-wrap:nowrap;min-width:0">${p ? thumb(p, corOf(p, a0.corId)) : ''}<div style="min-width:0"><h3>${esc(a0.prod)}</h3><div class="meta">${esc(a0.cor)} · ${a0.tam ? 'tamanho ' + esc(a0.tam) : 'qualquer tamanho'} · ${arr.length} ${arr.length === 1 ? 'cliente' : 'clientes'}</div></div></div>${d > 0 ? `<span class="pill ok">Voltou: ${d} no site</span>` : '<span class="pill out">Ainda esgotada</span>'}</div>
        <div class="lines">${arr.map(a => { const msg = `Oi, ${primeiro(a.nome)}! Aqui é da Aqualupe. O ${a.prod} na cor ${a.cor}${a.tam ? ', tamanho ' + a.tam : ''}, que você pediu para avisar, voltou ao estoque. Quer que a gente separe para você? ${siteUrl('#/p/' + a.sku)}`;
          return `<div class="line"><span class="tx"><b>${esc(a.nome)}</b><small>${esc(a.tel)} · pediu ${quando(a.ts)}${a.status === 'avisada' ? ' · avisada por ' + esc(a.avisadaPor || '') + ' ' + quando(a.avisadaEm) : ''}</small></span>
            <span class="row" style="gap:6px;justify-content:flex-end">${a.status === 'aguardando' ? `<a class="btn sm ${d > 0 ? 'wa' : ''}" href="${waTo(a.tel, msg)}" target="_blank" rel="noopener">${I.wa}Avisar</a><button class="btn sm" data-av="ok" data-id="${esc(a.id)}">${I.check}Avisada</button>` : ''}${isAdmin() ? `<button class="ib" data-av="del" data-id="${esc(a.id)}" aria-label="Excluir">${I.x}</button>` : ''}</span></div>`; }).join('')}</div></div>`;
    }).join('') : `<div class="panel empty"><p>${S.f.af === 'aguardando' ? 'Ninguém esperando aviso. Quando uma cliente tocar em "Avise-me quando chegar" no site, o pedido aparece aqui.' : 'Nada por aqui.'}</p></div>`;
    hydrate($('#alist'));
  }
};

/* ============================================================
   CLUBE AQUALUPE (cadastro com mês de aniversário)
   ============================================================ */
// um cadastro por WhatsApp: se a cliente se cadastrou duas vezes, vale o mais recente
function clientes(){
  const m = new Map();
  S.cli.slice().sort((a, b) => (a.ts || 0) - (b.ts || 0)).forEach(c => { const k = telDigits(c.tel) || c.id; m.set(k, Object.assign({ ids: ((m.get(k) || {}).ids || []).concat(c.id) }, c)); });
  return [...m.values()];
}
const niverHoje = () => { const d = new Date(); return clientes().filter(c => +c.mes === d.getMonth() + 1 && +c.dia === d.getDate()); };
const msgNiver = c => (sett().clube.msgNiver || '').replace(/\{nome\}/g, primeiro(c.nome)) + ' ' + siteUrl('#/');
const niverTxt = c => String(c.dia).padStart(2, '0') + '/' + String(c.mes).padStart(2, '0');
function diasAte(c){ const h = new Date(); h.setHours(0, 0, 0, 0); let d = new Date(h.getFullYear(), c.mes - 1, c.dia); if(d < h) d = new Date(h.getFullYear() + 1, c.mes - 1, c.dia); return Math.round((d - h) / DAY); }
function exportClientes(L){
  const head2 = ['Nome', 'WhatsApp', 'E-mail', 'Aniversário (dia/mês)', 'Mês', 'Cadastro'];
  const rows = L.map(c => [c.nome, c.tel, c.email || '', niverTxt(c), MESES[c.mes - 1], dataHora(c.ts)]);
  const csv = '﻿' + [head2].concat(rows).map(r => r.map(x => `"${String(x == null ? '' : x).replace(/"/g, '""')}"`).join(';')).join('\r\n');
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type:'text/csv;charset=utf-8' })); a.download = 'Clube_Aqualupe.csv'; document.body.appendChild(a); a.click(); a.remove();
  toast('Lista gerada');
}
V.clientes = {
  mount(main){
    main.innerHTML = `<div class="wrapx">${head('Clube Aqualupe', 'Clientes que se cadastraram no site para receber novidades e promoções. Use o mês de aniversário para mandar parabéns e ofertas especiais.', `<button class="btn" id="kExp">${I.down}Baixar lista</button>`)}
      <div class="kpis" id="kk"></div>
      <div class="tools" data-keep><label class="search"><span class="sr">Buscar</span>${I.search}<input class="inp" id="kq" placeholder="Buscar por nome, WhatsApp ou e-mail" value="${esc(S.f.kq)}"></label></div>
      <div class="mesbar" id="km"></div>
      <div id="klist"></div>
      <p class="note">Os dados foram autorizados pela cliente no cadastro (LGPD). Se ela pedir para sair da lista, exclua o cadastro aqui.</p></div>`;
    $('#kq').oninput = e => { S.f.kq = e.target.value; this.draw(); };
    $('#km').onclick = e => { const b = e.target.closest('[data-m]'); if(b){ S.f.km = b.dataset.m; this.draw(); } };
    $('#kExp').onclick = () => exportClientes(this.cur || []);
    $('#klist').onclick = async e => {
      const b = e.target.closest('[data-kdel]'); if(!b) return;
      const c = clientes().find(x => x.id === b.dataset.kdel); if(!c) return;
      if(await ask({ title:'Excluir este cadastro?', text:`${c.nome} sai do Clube Aqualupe. Use quando a cliente pedir para não receber mais mensagens.`, ok:'Excluir', danger:true }))
        busy(b, () => Promise.all(c.ids.map(id => B.delDoc('clientes', id))).then(() => toast('Cadastro excluído')));
    };
  },
  draw(){
    const all = clientes(), hj = new Date(), mesAtual = hj.getMonth() + 1;
    const q = AQ.norm(S.f.kq), m = S.f.km;
    const porMes = MESES.map((_, i) => all.filter(c => +c.mes === i + 1).length);
    const semana = all.filter(c => diasAte(c) <= 7).length, novas = all.filter(c => c.ts >= now() - 30 * DAY).length;
    $('#kk').innerHTML = `<div class="kpi"><small>Cadastradas</small><b>${all.length}</b><span>no Clube Aqualupe</span></div>
      <button class="kpi" data-m="${mesAtual}" style="text-align:left;cursor:pointer"><small>Aniversariantes de ${MESES[mesAtual - 1].toLowerCase()}</small><b>${porMes[mesAtual - 1]}</b><span>${niverHoje().length ? niverHoje().length + ' fazem aniversário hoje' : 'no mês atual'}</span></button>
      <div class="kpi"><small>Nos próximos 7 dias</small><b>${semana}</b><span>aniversários chegando</span></div>
      <div class="kpi"><small>Novas em 30 dias</small><b>${novas}</b><span>cadastros pelo site</span></div>`;
    $$('#kk [data-m]').forEach(b => b.onclick = () => { S.f.km = b.dataset.m; this.draw(); });
    $('#km').innerHTML = `<button data-m="" class="${!m ? 'on' : ''}">Todas <b>${all.length}</b></button>` + MESES.map((n, i) => `<button data-m="${i + 1}" class="${m === String(i + 1) ? 'on' : ''}${i + 1 === mesAtual ? ' now' : ''}">${n.slice(0, 3)} <b>${porMes[i]}</b></button>`).join('');
    let L = all.filter(c => (!m || String(c.mes) === m) && (!q || AQ.norm([c.nome, c.tel, c.email].join(' ')).includes(q)));
    L = m ? L.sort((a, b) => a.dia - b.dia || String(a.nome).localeCompare(b.nome)) : L.sort((a, b) => diasAte(a) - diasAte(b));
    this.cur = L;
    $('#klist').innerHTML = L.length ? `<div class="panel"><div class="hd"><h2>${m ? 'Aniversariantes de ' + MESES[+m - 1].toLowerCase() : 'Todas, pelo próximo aniversário'}</h2><span class="note">${L.length} ${L.length === 1 ? 'cliente' : 'clientes'}</span></div><div class="list">${L.map(c => {
      const da = diasAte(c), hoje = da === 0;
      const quandoN = hoje ? '<span class="pill ok">Hoje</span>' : da <= 7 ? `<span class="pill last nodot">em ${da} ${da === 1 ? 'dia' : 'dias'}</span>` : '';
      return `<div class="li" style="flex-wrap:wrap"><span class="cake${hoje ? ' hj' : ''}"><b>${String(c.dia).padStart(2, '0')}</b><small>${MESES[c.mes - 1].slice(0, 3)}</small></span>
        <span class="tx"><b>${esc(c.nome)}</b><small>${esc(c.tel)}${c.email ? ' · ' + esc(c.email) : ''} · cadastro ${quando(c.ts)}</small></span>${quandoN}
        <span class="row" style="gap:6px"><a class="btn sm ${hoje || da <= 7 ? 'wa' : ''}" href="${waTo(c.tel, msgNiver(c))}" target="_blank" rel="noopener">${I.wa}Parabéns</a><a class="btn sm ghost" href="${waTo(c.tel)}" target="_blank" rel="noopener">Conversar</a>${isAdmin() ? `<button class="ib" data-kdel="${esc(c.id)}" aria-label="Excluir cadastro de ${esc(c.nome)}">${I.x}</button>` : ''}</span></div>`; }).join('')}</div></div>`
      : `<div class="panel empty"><p>${all.length ? 'Ninguém com esses filtros.' : 'Ainda não há cadastros. Quando uma cliente preencher a janela "Clube Aqualupe" no site, ela aparece aqui.'}</p></div>`;
  }
};

/* ============================================================
   CATÁLOGO
   ============================================================ */
V.catalogo = {
  mount(main){
    main.innerHTML = `<div class="wrapx">${head('Catálogo', isAdmin() ? 'As peças que aparecem no site. Aqui você cadastra peças novas, troca fotos, preço e tira peças do ar.' : 'As peças que aparecem no site. Só a administração edita o catálogo.', isAdmin() ? `<button class="btn pri" id="cNova">${I.plus}Nova peça</button>` : '')}
      <div class="tools" data-keep>
        <label class="search"><span class="sr">Buscar</span>${I.search}<input class="inp" id="cq" placeholder="Buscar peça ou código" value="${esc(S.f.cq)}"></label>
        <select class="sel" id="ccat" aria-label="Categoria"><option value="">Todas as categorias</option>${AQ.CATS.map(c => `<option value="${c.slug}"${S.f.ccat === c.slug ? ' selected' : ''}>${c.nome}</option>`).join('')}</select>
      </div>
      <div class="seg" id="cv">${[['', 'Todas'], ['on', 'No site'], ['off', 'Fora do site'], ['sem', 'Sem foto'], ['bf', 'Black Friday']].map(([k, t]) => `<button data-f="${k}" class="${S.f.cv === k ? 'on' : ''}">${t}</button>`).join('')}</div>
      <div id="cnovas"></div>
      <div class="cgrid" id="cgrid"></div></div>`;
    if($('#cNova')) $('#cNova').onclick = () => dlgProduto(null);
    this.novas();
    $('#cq').oninput = e => { S.f.cq = e.target.value; this.draw(); };
    $('#ccat').onchange = e => { S.f.ccat = e.target.value; this.draw(); };
    $$('#cv button').forEach(b => b.onclick = () => { S.f.cv = b.dataset.f; $$('#cv button').forEach(x => x.classList.toggle('on', x === b)); this.draw(); });
    $('#cgrid').onclick = e => { const b = e.target.closest('[data-ed]'); if(b){ if(isAdmin()) dlgProduto(b.dataset.ed); else { S.f.q = prod(b.dataset.ed).nome; S.open.add(b.dataset.ed); location.hash = '#estoque'; } } };
    $('#cgrid').onchange = e => { const t = e.target.closest('[data-ativo]'); if(t){ const sku = t.dataset.ativo, v = t.checked; B.setProdField(sku, 'ativo', v).then(() => toast(v ? 'A peça voltou para o site' : 'A peça saiu do site')).catch(err => { toast(errMsg(err), true); t.checked = !v; }); } };
  },
  /* Peças com fotos reais que ainda não entraram no catálogo salvo */
  novas(){
    const box = $('#cnovas'); if(!box) return;
    const falta = isAdmin() && S.cat && S.cat.p ? AQ.reaisFaltando(S.cat) : [];
    const semBF = isAdmin() && S.cat && S.cat.p && !S.cat.reaisBF ? AQ.REAIS.filter(x => !AQ.COLECAO(x)).map(x => x.sku).filter(k => S.cat.p[k] && !S.cat.p[k].bf) : [];
    if(!falta.length && semBF.length){
      box.innerHTML = `<div class="panel" style="display:flex;gap:14px;align-items:center;flex-wrap:wrap;margin-bottom:18px"><div style="flex:1;min-width:220px"><strong>Colocar ${semBF.length} peças na Black Friday</strong><br><span class="note">As peças com fotos reais entram na categoria Black Friday do site. Depois é só lançar o preço de cada uma, entre ${BRL(sett().bf.min)} e ${BRL(sett().bf.max)}.</span></div><button class="btn pri" id="cBF">Colocar na Black Friday</button></div>`;
      $('#cBF').onclick = e => busy(e.currentTarget, async () => { await B.marcarReaisBF(semBF); toast(semBF.length + ' peças na Black Friday'); this.novas(); });
      return;
    }
    if(!falta.length){ box.innerHTML = ''; return; }
    const cores = falta.reduce((a, [, p]) => a + p.cores.length, 0);
    box.innerHTML = `<div class="panel" style="display:flex;gap:14px;align-items:center;flex-wrap:wrap;margin-bottom:18px"><div style="flex:1;min-width:220px"><strong>${falta.length} ${falta.length === 1 ? 'peça nova pronta' : 'peças novas prontas'} para entrar no site</strong><br><span class="note">${cores} cores com fotos. Entram sem estoque (aparecem como Esgotado) e com preço zerado: depois é só lançar a quantidade em Estoque e o preço em cada peça.</span></div><button class="btn pri" id="cAddNovas">${I.plus}Adicionar ao catálogo</button></div>`;
    $('#cAddNovas').onclick = e => busy(e.currentTarget, async () => {
      for(const [sku, p] of falta) await B.saveProduto(sku, p);
      toast(falta.length + ' peças adicionadas ao catálogo'); this.novas();
    });
  },
  draw(){
    const q = AQ.norm(S.f.cq), f = S.f.cv;
    const L = prods().filter(p => (!S.f.ccat || p.cat === S.f.ccat) && (!q || AQ.norm(p.nome + ' ' + p.sku).includes(q))
      && (f === 'on' ? p.ativo !== false : f === 'off' ? p.ativo === false : f === 'sem' ? !p.cores.some(c => c.nf > 0 || (c.sf && c.sf.length)) : f === 'novo' ? p.novo : f === 'bf' ? naBF(p) || p.bf : true));
    $('#cgrid').innerHTML = L.length ? L.map(p => {
      const d = prodDisp(p), c0 = p.cores.find(c => c.nf > 0 || (c.sf && c.sf.length)) || p.cores[0];
      const tag = p.ativo === false ? '<span class="pill nodot">Fora do site</span>' : d === 0 ? '<span class="pill out">Esgotada</span>' : naBF(p) ? '<span class="pill bfp nodot">Black Friday</span>' : p.bf ? '<span class="pill last nodot">BF: preço fora da faixa</span>' : '';
      return `<article class="ccard${p.ativo === false ? ' off' : ''}"><button class="im" data-ed="${esc(p.sku)}" aria-label="${isAdmin() ? 'Editar' : 'Ver estoque de'} ${esc(p.nome)}">${c0.sf && c0.sf.length ? `<img src="${esc(c0.sf[0])}" alt="" loading="lazy">` : c0.nf > 0 ? `<img data-f="${esc(fotoId(p.sku, c0.id))}" alt="">` : art(p.tipo, c0)}</button>
        <div class="bd">${tag ? `<div>${tag}</div>` : ''}<h3>${esc(p.nome)}</h3><span class="note">${esc(p.sku)} · ${esc(p.sub)} · ${p.cores.length} ${p.cores.length === 1 ? 'cor' : 'cores'}</span>
          <span class="pr">${p.promo > 0 && p.promo < p.preco ? `<s>${BRL(p.preco)}</s>${BRL(p.promo)}` : BRL(p.preco)}</span>
          <div class="tg2"><span>${d} no site</span>${isAdmin() ? `<label class="row" style="gap:8px">No site <input type="checkbox" class="tg" data-ativo="${esc(p.sku)}"${p.ativo !== false ? ' checked' : ''} aria-label="Mostrar ${esc(p.nome)} no site"></label>` : ''}</div></div></article>`;
    }).join('') : '<div class="panel empty" style="grid-column:1/-1"><p>Nenhuma peça encontrada.</p></div>';
    hydrate($('#cgrid'));
  }
};

/* ---------- editor de peça ---------- */
const EST_OPTS = [['', 'Lisa'], ['floral', 'Floral'], ['poa', 'Poá'], ['tropical', 'Tropical']];
const TAM_OPTS = ['PP', 'P', 'M', 'G', 'GG', 'XG', '36', '38', '40', '42', '44', '46', 'Único'];
function tipoDe(cat, sub){ const c = catOf(cat); if(cat === 'conjuntos') return sub === 'Saia' ? 'conjs' : 'conjc'; if(cat === 'acessorios') return sub === 'Bolsas' ? 'bolsa' : 'chapeu'; return c.tipo; }
function parsePreco(v){ let s = String(v || '').replace(/[^\d.,]/g, ''); if(!s) return 0; if(s.includes(',')){ s = s.replace(/\./g, '').replace(',', '.'); } const n = parseFloat(s); return isNaN(n) ? 0 : Math.round(n * 100) / 100; }
const fmtPreco = n => n ? n.toFixed(2).replace('.', ',') : '';
async function thumbFrom(hd){ const im = await new Promise((ok, no) => { const i = new Image(); i.onload = () => ok(i); i.onerror = no; i.src = hd; }); return toJpeg(im, DEMO ? 280 : 360, DEMO ? 350 : 450, DEMO ? 22000 : 42000); }
function dlgProduto(sku){
  const p = sku ? prod(sku) : null;
  const E = p ? { isNew:false, sku, nome:p.nome, cat:p.cat, sub:p.sub, desc:p.desc || '', preco:fmtPreco(p.preco), promo:fmtPreco(p.promo), tam:AQ.sizesOf(p).slice(), ativo:p.ativo !== false, novo:!!p.novo, bf:!!p.bf, ordem:p.ordem,
      cores: p.cores.map(c => ({ id:c.id, n:c.n, ref:c.ref || '', h:c.h, est:c.est || '', acc:c.acc || '#FFFFFF', nf:c.nf || 0, fv:c.fv || 0, sf:(c.sf || []).slice(), fotos:null, mud:false })) }
    : { isNew:true, sku: nextSku(), nome:'', cat:'vestido-longo', sub:'Liso', desc:'', preco:'', promo:'', tam:['P', 'M', 'G', 'GG'], ativo:true, novo:true, bf:false, ordem: prods().length, cores:[{ id:'', n:'', h:'#9A4A6A', est:'', acc:'#FFFFFF', nf:0, fotos:[], mud:false }] };
  E.cores.forEach((c, i) => { if(c.nf > 0){ c.fotos = 'carregando'; B.getFotos(fotoId(sku, c.id), true).then(r => { c.fotos = r.f.map((hd, k) => ({ hd, t: k === 0 ? r.t : null })); if(openDlg.cur && openDlg.cur.E === E) openDlg.cur.render(); }).catch(() => { c.fotos = []; }); } else if(!c.fotos) c.fotos = []; });
  openDlg({ title: p ? 'Editar peça' : 'Nova peça', wide:true, E, render(){
    const c = catOf(E.cat);
    if(!c.subs.includes(E.sub)) E.sub = c.subs[0] || '';
    $('#dlgb').innerHTML = `<div class="grid2">
        <label class="fld">Nome da peça<input class="inp" id="pNome" value="${esc(E.nome)}" placeholder="Ex.: Vestido Longo Alças Finas"></label>
        <label class="fld">Código<input class="inp" id="pSku" value="${esc(E.sku)}"${E.isNew ? '' : ' disabled'}><span class="h">${E.isNew ? 'Gerado sozinho. Pode trocar pelo código da etiqueta.' : 'O código não muda depois de criado.'}</span></label>
        <label class="fld">Categoria<select class="sel" id="pCat">${AQ.CATS.map(k => `<option value="${k.slug}"${E.cat === k.slug ? ' selected' : ''}>${k.nome}</option>`).join('')}</select></label>
        <label class="fld">Subcategoria<select class="sel" id="pSub">${c.subs.map(s => `<option${E.sub === s ? ' selected' : ''}>${esc(s)}</option>`).join('')}</select></label>
      </div>
      <label class="fld">Descrição no site<textarea class="txt" id="pDesc" placeholder="${esc(AQ.DESC[tipoDe(E.cat, E.sub)] || '')}">${esc(E.desc)}</textarea><span class="h">Se ficar vazio, o site usa o texto padrão da categoria.</span></label>
      <div class="grid2">
        <label class="fld">Preço (R$)<input class="inp" id="pPreco" inputmode="decimal" value="${esc(E.preco)}" placeholder="0,00"></label>
        <label class="fld">Preço promocional (R$)<input class="inp" id="pPromo" inputmode="decimal" value="${esc(E.promo)}" placeholder="Opcional"><span class="h">Preenchido, o site mostra o preço antigo riscado.</span></label>
      </div>
      <div class="sec"><h3>Tamanhos</h3><div class="tams">${TAM_OPTS.map(t => `<button type="button" class="opt${E.tam.includes(t) ? ' on' : ''}" data-tm="${t}">${t}</button>`).join('')}</div></div>
      <div class="sec"><div class="row" style="justify-content:space-between"><h3>Cores e fotos</h3><span class="note">Até 3 fotos por cor. A primeira é a capa.</span></div>
        <div class="cores">${E.cores.map((k, i) => `<div class="corx">
          <div class="r1"><input type="color" value="${esc(k.h)}" data-ci="${i}" data-cf="h" aria-label="Cor"><input class="inp" value="${esc(k.n)}" data-ci="${i}" data-cf="n" placeholder="Nome da cor, ex.: Verde Oliva"><input class="inp" style="max-width:150px" value="${esc(k.ref || '')}" data-ci="${i}" data-cf="ref" placeholder="Ref. da etiqueta" aria-label="Referência da etiqueta"><button class="ib" data-rmcor="${i}" aria-label="Remover cor"${E.cores.length < 2 ? ' disabled' : ''}>${I.x}</button></div>
          <div class="r2">Estampa <select class="sel" style="width:auto;min-height:36px" data-ci="${i}" data-cf="est">${EST_OPTS.map(([v, t]) => `<option value="${v}"${k.est === v ? ' selected' : ''}>${t}</option>`).join('')}</select>${k.est ? `<label class="row" style="gap:6px">cor do desenho <input type="color" value="${esc(k.acc)}" data-ci="${i}" data-cf="acc" style="width:36px;height:34px"></label>` : ''}</div>
          <div class="fotos">${k.fotos === 'carregando' ? '<span class="note">Carregando fotos...</span>' : (() => { const L = (k.sf || []).map(u => ({ t: '' + u })).concat(k.fotos || []); return [0, 1, 2].map(j => { const f = L[j]; return f ? `<div class="fslot"><img src="${esc(f.t || f.hd)}" alt="Foto ${j + 1}"><button class="x" data-rmf="${i}:${j}" aria-label="Remover foto">×</button></div>` : (j === L.length ? `<label class="fslot">${I.up.replace('<svg', '<svg width="20" height="20"')}<span>Adicionar foto</span><input type="file" accept="image/*" data-up="${i}"></label>` : '<div class="fslot" style="cursor:default;opacity:.5"></div>'); }).join(''); })()}</div>
        </div>`).join('')}</div>
        <button class="btn" id="pAddCor" type="button">${I.plus}Adicionar cor</button></div>
      <div class="sec"><h3>No site</h3>
        <label class="chk"><input type="checkbox" id="pAtivo"${E.ativo ? ' checked' : ''}><span>Mostrar esta peça no site</span></label>
        <label class="chk"><input type="checkbox" id="pBF"${E.bf ? ' checked' : ''}><span>Entrar na Black Friday</span></label>
        <span class="h" id="pBFh"></span></div>`;
    const bfh = () => { const b = sett().bf, v = parsePreco(E.promo) && parsePreco(E.promo) < parsePreco(E.preco) ? parsePreco(E.promo) : parsePreco(E.preco), ok = v >= b.min - .001 && v <= b.max + .001;
      $('#pBFh').innerHTML = !b.on ? 'A Black Friday está desligada em Configurações do site.' : (!v && E.bf) ? `Ainda sem preço: a peça aparece na Black Friday e passa a seguir a faixa de ${BRL(b.min)} a ${BRL(b.max)} quando o preço for lançado.` : b.modo === 'faixa' ? `Modo automático: toda peça com preço final entre ${BRL(b.min)} e ${BRL(b.max)} entra sozinha.` : `Preço final ${BRL(v)}. ${ok ? (E.bf ? 'Esta peça aparece na Black Friday.' : 'Está dentro da faixa: marque para entrar.') : `Para aparecer, o preço final (ou o promocional) precisa ficar entre ${BRL(b.min)} e ${BRL(b.max)}.`}`;
      $('#pBFh').style.color = E.bf && b.on && b.modo !== 'faixa' && !ok ? '#B4552D' : ''; };
    $('#dlgf').innerHTML = `${E.isNew ? '' : '<button class="btn danger" id="pDel">Excluir peça</button>'}<span style="flex:1"></span><button class="btn" data-close>Cancelar</button><button class="btn pri" id="pSave">${I.check}Salvar peça</button>`;
    const bind = (id, k, ev) => { $(id)[ev || 'oninput'] = e => { E[k] = e.target.type === 'checkbox' ? e.target.checked : e.target.value; }; };
    bind('#pNome', 'nome'); bind('#pSku', 'sku'); bind('#pDesc', 'desc'); bind('#pPreco', 'preco'); bind('#pPromo', 'promo'); bind('#pAtivo', 'ativo', 'onchange');
    $('#pBF').onchange = e => { E.bf = e.target.checked; bfh(); }; $('#pPreco').addEventListener('input', bfh); $('#pPromo').addEventListener('input', bfh); bfh();
    $('#pCat').onchange = e => { E.cat = e.target.value; E.sub = catOf(E.cat).subs[0]; if(E.cat === 'acessorios') E.tam = ['Único']; this.render(); };
    $('#pSub').onchange = e => { E.sub = e.target.value; };
    $('#pAddCor').onclick = () => { E.cores.push({ id:'', n:'', h:'#C9B38C', est:'', acc:'#FFFFFF', nf:0, fotos:[], mud:false }); this.render(); };
    const b = $('#dlgb');
    b.oninput = e => { const t = e.target.closest('[data-cf]'); if(t){ E.cores[+t.dataset.ci][t.dataset.cf] = t.value; } };
    b.onchange = async e => {
      const t = e.target.closest('[data-cf]'); if(t){ E.cores[+t.dataset.ci][t.dataset.cf] = t.value; if(t.dataset.cf === 'est') this.render(); return; }
      const up = e.target.closest('[data-up]');
      if(up && up.files[0]){
        const k = E.cores[+up.dataset.up];
        up.parentNode.innerHTML = '<span class="spin" style="width:20px;height:20px;border-width:2px"></span>';
        try{ const f = await prepFoto(up.files[0]); k.fotos.push(f); k.mud = true; }catch(err){ toast(err.message, true); }
        this.render();
      }
    };
    b.onclick = e => {
      const tm = e.target.closest('[data-tm]'); if(tm){ const v = tm.dataset.tm; E.tam = E.tam.includes(v) ? E.tam.filter(x => x !== v) : TAM_OPTS.filter(x => E.tam.includes(x) || x === v); this.render(); return; }
      const rc = e.target.closest('[data-rmcor]'); if(rc){ E.cores.splice(+rc.dataset.rmcor, 1); this.render(); return; }
      const rf = e.target.closest('[data-rmf]'); if(rf){ const [i, j] = rf.dataset.rmf.split(':').map(Number), k = E.cores[i], ns = (k.sf || []).length; if(j < ns) k.sf.splice(j, 1); else { k.fotos.splice(j - ns, 1); k.mud = true; } this.render(); }
    };
    if($('#pDel')) $('#pDel').onclick = async () => {
      const tot = prodTotal(prod(E.sku));
      if(tot > 0){ toast(`Esta peça ainda tem ${qtyTxt(tot)} no estoque. Zere o estoque ou só tire a peça do site.`, true); return; }
      if(await ask({ title:'Excluir esta peça?', text:'Ela sai do site e do catálogo, com as fotos. O histórico de movimentações continua guardado.', ok:'Excluir peça', danger:true })){ await busy($('#pDel'), () => B.deleteProduto(E.sku)); closeDlg(); toast('Peça excluída'); }
    };
    $('#pSave').onclick = e => busy(e.currentTarget, () => salvarProduto(E, p));
  }});
}
async function salvarProduto(E, antes){
  const nome = E.nome.trim(), sku = E.sku.trim().toUpperCase();
  if(!nome) throw new Error('Dê um nome para a peça.');
  if(!/^[A-Z0-9][A-Z0-9-]{1,23}$/.test(sku)) throw new Error('O código só pode ter letras, números e hífen. Ex.: AQ-0123.');
  if(E.isNew && S.cat.p[sku]) throw new Error('Já existe uma peça com o código ' + sku + '.');
  if(!E.tam.length) throw new Error('Escolha pelo menos um tamanho.');
  if(E.cores.some(c => c.fotos === 'carregando')) throw new Error('Espere as fotos terminarem de carregar.');
  const nomes = E.cores.map(c => c.n.trim());
  if(nomes.some(n => !n)) throw new Error('Dê um nome para cada cor.');
  if(new Set(nomes.map(AQ.norm)).size !== nomes.length) throw new Error('Há duas cores com o mesmo nome.');
  const preco = parsePreco(E.preco), promo = parsePreco(E.promo);
  if(promo && promo >= preco) throw new Error('O preço promocional precisa ser menor que o preço normal.');
  const usados = new Set();
  E.cores.forEach(c => { if(!c.id){ let base = AQ.slug(c.n.trim()) || 'cor', id = base, i = 2; while(usados.has(id) || (antes && antes.cores.some(x => x.id === id))) id = base + '-' + i++; c.id = id; } usados.add(c.id); });
  if(antes){
    const q = (S.est[sku] || {}).q || {};
    const falta = [];
    Object.entries(q).forEach(([k, v]) => { const [cid, t] = k.split('|'), n = (+v.b || 0) + (+v.c || 0) + (+v.a || 0); if(n > 0 && (!E.cores.some(c => c.id === cid) || !E.tam.includes(t))) falta.push(`${corOf(antes, cid).n} ${t} (${n})`); });
    if(falta.length) throw new Error('Ainda há peças no estoque de: ' + falta.slice(0, 4).join(', ') + '. Zere essas quantidades antes de remover a cor ou o tamanho.');
  }
  for(const c of E.cores){
    if(!c.mud) continue;
    const fotos = c.fotos || [];
    let t = fotos[0] ? fotos[0].t : '';
    if(fotos[0] && !t) t = await thumbFrom(fotos[0].hd);
    await B.saveFotos(fotoId(sku, c.id), t, fotos.map(f => f.hd));
    c.nf = fotos.length; c.fv = now();
  }
  if(antes) for(const c of antes.cores) if(!E.cores.some(x => x.id === c.id) && c.nf) await B.saveFotos(fotoId(sku, c.id), '', []);
  const obj = { nome, cat:E.cat, sub:E.sub, tipo: tipoDe(E.cat, E.sub), desc:E.desc.trim(), tam:E.tam.slice(), preco, promo,
    cores: E.cores.map(c => Object.assign({ id:c.id, n:c.n.trim(), h:c.h, est:c.est || '', acc:c.est ? c.acc : '', nf:c.nf || 0, fv:c.fv || 0 }, (c.sf && c.sf.length) ? { sf: c.sf.slice() } : {}, (c.ref || '').trim() ? { ref: c.ref.trim() } : {})),
    ativo:!!E.ativo, novo:!!E.novo, bf:!!E.bf, ordem: typeof E.ordem === 'number' ? E.ordem : prods().length };
  await B.saveProduto(sku, obj);
  closeDlg(); toast(E.isNew ? 'Peça cadastrada' + (obj.ativo ? ' e já está no site' : '') : 'Peça salva');
}

/* ============================================================
   RELATÓRIOS
   ============================================================ */
V.relatorios = {
  mount(main){
    main.innerHTML = `<div class="wrapx">${head('Relatórios', 'O que vendeu, onde e pelo quê. Calculado a partir do histórico de movimentações.', `<button class="btn" id="rXls">${I.down}Baixar planilha de estoque</button><button class="btn" id="rCsv">${I.down}Baixar movimentações</button>`)}
      <div class="seg" id="rp">${[['7', '7 dias'], ['30', '30 dias'], ['90', '90 dias'], ['mes', 'Este mês']].map(([k, t]) => `<button data-p="${k}" class="${S.f.rp === k ? 'on' : ''}">${t}</button>`).join('')}</div>
      <div id="rbody"><div class="loading" style="min-height:30vh"><div class="spin"></div></div></div>
      <p class="note" id="rnote"></p></div>`;
    $$('#rp button').forEach(b => b.onclick = () => { S.f.rp = b.dataset.p; $$('#rp button').forEach(x => x.classList.toggle('on', x === b)); this.load(); });
    $('#rXls').onclick = e => busy(e.currentTarget, exportEstoque);
    $('#rCsv').onclick = e => busy(e.currentTarget, () => exportMov(this.movs || []));
    if(window.top !== window) $('#rnote').textContent = 'Na prévia do Claude os downloads podem ficar bloqueados. No site publicado eles funcionam normalmente.';
    this.load();
  },
  from(){ if(S.f.rp === 'mes'){ const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 1).getTime(); } return now() - (+S.f.rp) * DAY; },
  async load(){ this.movs = null; try{ this.movs = await B.loadMov(this.from()); }catch(e){ toast(errMsg(e), true); this.movs = []; } this.draw(); },
  draw(){
    if(!this.movs){ return; }
    const M = this.movs, from = this.from();
    const vend = M.filter(m => m.tipo === 'venda' || m.tipo === 'site'), est = M.filter(m => m.tipo === 'estorno');
    const sumN = arr => arr.reduce((a, m) => a + Math.abs(m.qtd), 0);
    const vendidas = sumN(vend) - sumN(est), loja = sumN(vend.filter(m => m.tipo === 'venda')), site = sumN(vend.filter(m => m.tipo === 'site')) - sumN(est);
    const entr = sumN(M.filter(m => m.tipo === 'entrada'));
    const peds = S.ped.filter(p => p.ts >= from && p.status !== 'cancelado'), pedConf = peds.filter(p => p.status !== 'novo');
    const valor = pedConf.reduce((a, p) => a + (p.subtotal || 0), 0);
    const porLoja = AQ.LOJAS.map(l => ({ l, n: sumN(vend.filter(m => m.loja === l.k)) - sumN(est.filter(m => m.loja === l.k)) })), mx = Math.max(1, ...porLoja.map(x => x.n));
    const top = {}; vend.forEach(m => { const k = m.sku + '|' + m.corId; top[k] = top[k] || { m, n:0 }; top[k].n += Math.abs(m.qtd); });
    const tops = Object.values(top).sort((a, b) => b.n - a.n).slice(0, 8);
    const vendSku = new Set(vend.map(m => m.sku));
    const parados = prods().filter(p => p.ativo !== false && !vendSku.has(p.sku)).map(p => ({ p, n: prodTotal(p) })).filter(x => x.n > 0).sort((a, b) => b.n - a.n).slice(0, 8);
    const estLoja = AQ.LOJAS.map(l => ({ l, n: prods().reduce((a, p) => a + prodTotal(p, l.k), 0), v: prods().reduce((a, p) => a + prodTotal(p, l.k) * precoEf(p), 0) })), mxe = Math.max(1, ...estLoja.map(x => x.n));
    $('#rbody').innerHTML = `<div style="display:grid;gap:20px">
      <div class="kpis">
        <div class="kpi"><small>Peças vendidas</small><b>${vendidas}</b><span>${loja} nas lojas · ${site} pelo site</span></div>
        <div class="kpi"><small>Pedidos do site</small><b>${peds.length}</b><span>${pedConf.length} confirmados · ticket médio ${BRL(pedConf.length ? valor / pedConf.length : 0)}</span></div>
        <div class="kpi"><small>Vendido pelo site</small><b style="font-size:30px">${BRL(valor)}</b><span>pedidos confirmados, sem frete</span></div>
        <div class="kpi"><small>Peças que chegaram</small><b>${entr}</b><span>entradas de mercadoria</span></div>
      </div>
      <div class="cols">
        <section class="panel"><div class="hd"><h2>Mais vendidas</h2></div>${tops.length ? `<div class="list">${tops.map((x, i) => { const p = prod(x.m.sku); return `<div class="li">${p ? thumb(p, corOf(p, x.m.corId)) : ''}<span class="tx"><b>${esc(x.m.prod)}</b><small>${esc(x.m.cor)} · ${esc(x.m.sku)}</small></span><b>${x.n}</b></div>`; }).join('')}</div>` : '<div class="empty"><p>Nenhuma venda registrada nesse período.</p></div>'}</section>
        <div style="display:grid;gap:20px;align-content:start">
          <section class="panel"><div class="hd"><h2>${MULTI ? 'Vendas por loja' : 'Vendas: balcão e site'}</h2></div><div class="bd bars">${porLoja.map(x => `<div class="bar"><span>${x.l.curto}</span><span class="tr"><i style="width:${Math.round(Math.max(0, x.n) / mx * 100)}%"></i></span><b>${x.n}</b></div>`).join('')}<div class="bar"><span>Site</span><span class="tr"><i style="width:${Math.round(Math.max(0, site) / Math.max(mx, site, 1) * 100)}%;background:var(--rosa)"></i></span><b>${site}</b></div><p class="note">As vendas do site contam na loja de onde a peça saiu e também na linha Site.</p></div></section>
          <section class="panel"><div class="hd"><h2>Estoque agora</h2></div><div class="bd bars">${estLoja.map(x => `<div class="bar"><span>${x.l.curto}</span><span class="tr"><i style="width:${Math.round(x.n / mxe * 100)}%"></i></span><b>${x.n}</b></div>`).join('')}<p class="note">Valor em estoque pelo preço de venda: ${BRL(estLoja.reduce((a, x) => a + x.v, 0))}.</p></div></section>
        </div>
      </div>
      <section class="panel"><div class="hd"><h2>Peças paradas</h2><span class="note">com estoque e sem nenhuma venda no período</span></div>${parados.length ? `<div class="list">${parados.map(x => `<div class="li">${thumb(x.p, x.p.cores[0])}<span class="tx"><b>${esc(x.p.nome)}</b><small>${esc(x.p.sku)} · ${esc(catOf(x.p.cat).nome)}</small></span><span class="note">${qtyTxt(x.n)}</span></div>`).join('')}</div>` : '<div class="empty"><p>Todas as peças com estoque venderam pelo menos uma vez no período.</p></div>'}</section>
    </div>`;
    hydrate($('#rbody'));
  }
};

/* ---------- planilhas ---------- */
let xlsxP = null;
function loadXLSX(){ return xlsxP || (xlsxP = new Promise((ok, no) => { const s = document.createElement('script'); s.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'; s.onload = () => ok(window.XLSX); s.onerror = () => { xlsxP = null; no(new Error('Não foi possível carregar o leitor de planilhas. Confira a internet.')); }; document.head.appendChild(s); })); }
const abaDe = l => l.k === 'a' ? 'Americas' : l.curto;
function linhasEstoque(){
  const out = [];
  prods().forEach(p => variants(p).forEach(v => { const q = qOf(p.sku, v.c.id, v.t), n = dispV(p.sku, v.c.id, v.t); const r = { SKU:p.sku, Produto:p.nome, Categoria:catOf(p.cat).nome, Subcategoria:p.sub, Cor:v.c.n, Tamanho:v.t };
    AQ.LOJAS.forEach(l => { r[abaDe(l)] = q[l.k]; }); r.Total = AQ.LOJAS.reduce((a, l) => a + q[l.k], 0);
    Object.assign(r, { 'No site':n, Status:AQ.STATUS_TXT[stV(n)], Preco:precoEf(p), 'Black Friday':naBF(p) ? 'SIM' : 'NÃO', Ativo:p.ativo !== false ? 'SIM' : 'NÃO' }); out.push(r); }));
  return out;
}
async function exportEstoque(){
  const X = await loadXLSX(), wb = X.utils.book_new(), L = linhasEstoque();
  X.utils.book_append_sheet(wb, X.utils.json_to_sheet(L), 'Site');
  AQ.LOJAS.forEach(l => X.utils.book_append_sheet(wb, X.utils.json_to_sheet(L.map(r => ({ SKU:r.SKU, Produto:r.Produto, Cor:r.Cor, Tamanho:r.Tamanho, Quantidade:r[abaDe(l)] }))), abaDe(l)));
  X.writeFile(wb, 'Estoque_Aqualupe_' + new Date().toISOString().slice(0, 10) + '.xlsx');
  toast('Planilha gerada');
}
function exportMov(M){
  const head2 = ['Data', 'Loja', 'Movimento', 'SKU', 'Produto', 'Cor', 'Tamanho', 'Quantidade', 'Ficou', 'Por', 'Referência'];
  const rows = M.map(m => [dataHora(m.ts), LOJA(m.loja) ? LOJA(m.loja).nome : '', (TIPOS[m.tipo] || { t:m.tipo }).t, m.sku, m.prod, m.cor, m.tam, m.qtd, m.depois, m.por, m.ref || '']);
  const csv = '﻿' + [head2].concat(rows).map(r => r.map(c => `"${String(c == null ? '' : c).replace(/"/g, '""')}"`).join(';')).join('\r\n');
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type:'text/csv;charset=utf-8' })); a.download = 'Movimentacoes_Aqualupe.csv'; document.body.appendChild(a); a.click(); a.remove();
  toast('Arquivo gerado');
}
function dlgImport(){
  const IM = { res:null, nome:'' };
  openDlg({ title:'Importar planilha de estoque', wide:true, render(){
    const r = IM.res;
    $('#dlgb').innerHTML = `<p class="note">Funciona com a planilha <b style="color:var(--ink)">Estoque_Aqualupe_Site.xlsx</b> (aba ${AQ.LOJAS.map(abaDe).join(', ')}) ou com qualquer planilha que tenha as colunas SKU, Cor, Tamanho e a quantidade${MULTI ? ' de cada loja' : ` do ${AQ.LOJAS[0].curto}`}. Abas de outras lojas são ignoradas. As quantidades encontradas substituem as atuais; o resto do estoque não muda.</p>
      <label class="btn" style="justify-self:start;position:relative;overflow:hidden">${I.up}${IM.nome ? 'Trocar arquivo' : 'Escolher arquivo (.xlsx ou .csv)'}<input type="file" id="imF" accept=".xlsx,.xls,.csv" style="position:absolute;inset:0;opacity:0;cursor:pointer"></label>
      ${IM.nome ? `<p class="note">Arquivo: ${esc(IM.nome)}</p>` : ''}
      ${r ? `<div class="kpis"><div class="kpi"><small>Variações encontradas</small><b>${r.itens.length / AQ.LOJAS.length | 0}</b><span>cor e tamanho</span></div>${AQ.LOJAS.map(l => `<div class="kpi"><small>${l.curto}</small><b>${r.itens.filter(i => i.loja === l.k).reduce((a, i) => a + i.set, 0)}</b><span>peças na planilha</span></div>`).join('')}</div>
        ${r.fora.length ? `<div class="msg err">${r.fora.length} ${r.fora.length === 1 ? 'linha não bateu' : 'linhas não bateram'} com o catálogo e ${r.fora.length === 1 ? 'vai ficar' : 'vão ficar'} de fora: ${esc(r.fora.slice(0, 6).join('; '))}${r.fora.length > 6 ? '...' : ''}. Cadastre a peça ou a cor no Catálogo e importe de novo.</div>` : '<div class="msg ok">Todas as linhas bateram com o catálogo.</div>'}` : ''}`;
    $('#dlgf').innerHTML = `<button class="btn" data-close>Cancelar</button><button class="btn pri" id="imOk"${r && r.itens.length ? '' : ' disabled'}>Substituir o estoque pela planilha</button>`;
    $('#imF').onchange = async e => {
      const f = e.target.files[0]; if(!f) return; IM.nome = f.name;
      try{ IM.res = await lerPlanilha(f); }catch(err){ IM.res = null; toast(err.message, true); }
      this.render();
    };
    $('#imOk').onclick = async e => {
      const porSku = {}; r.itens.forEach(i => (porSku[i.sku] = porSku[i.sku] || []).push(i));
      const ok = await busy(e.currentTarget, async () => { for(const [sku, its] of Object.entries(porSku)) await B.apply({ tipo:'importacao', motivo:'Planilha ' + IM.nome, itens: its }); return true; });
      if(ok){ closeDlg(); toast('Estoque importado da planilha'); }
    };
  }});
}
async function lerPlanilha(file){
  const X = await loadXLSX();
  const wb = X.read(await file.arrayBuffer(), { type:'array' });
  const val = {}, fora = new Set();
  const lojaDaAba = n => { n = AQ.norm(n); const k = n.includes('bangu') ? 'b' : n.includes('carioca') ? 'c' : n.includes('americas') ? 'a' : null; return k && AQ.LOJAS.some(l => l.k === k) ? k : (k ? 'x' : null); };
  const achar = (sku, cor, tam) => {
    const p = prod(String(sku).trim().toUpperCase()); if(!p) return null;
    const c = p.cores.find(x => AQ.norm(x.n) === AQ.norm(cor) || x.id === AQ.slug(cor)); if(!c) return null;
    const t = AQ.sizesOf(p).find(x => AQ.norm(x) === AQ.norm(tam)); if(!t) return null;
    return { sku:p.sku, corId:c.id, tam:t };
  };
  let lojaAbas = 0;
  const abas = wb.SheetNames.map(n => ({ n, rows: X.utils.sheet_to_json(wb.Sheets[n], { header:1, defval:'' }) }));
  abas.forEach(a => { if(lojaDaAba(a.n)) lojaAbas++; });
  abas.forEach(a => {
    const hi = a.rows.findIndex(r => r.some(c => AQ.norm(c) === 'sku') && r.some(c => AQ.norm(c) === 'cor'));
    if(hi < 0) return;
    const h = a.rows[hi].map(AQ.norm), col = n => h.findIndex(x => x === n || x.startsWith(n));
    const iS = col('sku'), iC = col('cor'), iT = h.findIndex(x => x === 'tamanho' || x === 'tam' || x === 'tam.');
    const iQ = h.findIndex(x => x === 'quantidade' || x === 'qtd' || x === 'estoque');
    const iL = { b: col('bangu'), c: col('carioca'), a: col('americas') };
    const lAba = lojaDaAba(a.n);
    if(iT < 0 || lAba === 'x') return;
    const usarLojas = !lAba && AQ.LOJAS.some(l => iL[l.k] >= 0) && lojaAbas === 0;
    if(!(lAba && iQ >= 0) && !usarLojas) return;
    a.rows.slice(hi + 1).forEach(r => {
      if(!r[iS]) return;
      const v = achar(r[iS], r[iC], r[iT]);
      if(!v){ fora.add(`${r[iS]} ${r[iC]} ${r[iT]}`); return; }
      const num = x => Math.max(0, Math.round(+String(x).replace(',', '.')) || 0);
      if(lAba) val[[v.sku, v.corId, v.tam, lAba].join('|')] = num(r[iQ]);
      else AQ.LOJAS.forEach(l => { if(iL[l.k] >= 0) val[[v.sku, v.corId, v.tam, l.k].join('|')] = num(r[iL[l.k]]); });
    });
  });
  const keys = Object.keys(val);
  if(!keys.length && !fora.size) throw new Error('Não encontramos colunas de estoque nesta planilha. Ela precisa ter SKU, Cor, Tamanho e as quantidades.');
  const varKeys = new Set(keys.map(k => k.split('|').slice(0, 3).join('|')));
  const itens = [];
  varKeys.forEach(vk => { const [sku, corId, tam] = vk.split('|'); AQ.LOJAS.forEach(l => { const k = vk + '|' + l.k; itens.push({ sku, corId, tam, loja:l.k, set: k in val ? val[k] : qOf(sku, corId, tam)[l.k] }); }); });
  return { itens, fora:[...fora] };
}

/* ============================================================
   CONFIGURAÇÕES DO SITE
   ============================================================ */
V.site = {
  mount(main){
    this.d = AQ.clone(sett());
    main.innerHTML = `<div class="wrapx" style="max-width:860px">${head('Configurações do site', 'Regras que o site segue. As mudanças valem para todas as clientes assim que você salvar.', `<a class="btn" href="index.html" target="_blank" rel="noopener">${I.ext}Abrir o site</a>`)}<div id="sbody" style="display:grid;gap:20px"></div></div>`;
    this.draw();
  },
  draw(){
    if(document.activeElement && $('#sbody') && $('#sbody').contains(document.activeElement)) return;
    const d = this.d, exQ = { b:2, c:1, a:3 }, ex = AQ.dispOf(exQ, d.reserva), nBF = prods().filter(p => p.ativo !== false && AQ.naBF(p, d)).length;
    $('#sbody').innerHTML = `
      <section class="panel"><div class="hd"><h2>Disponibilidade no site</h2></div><div class="bd" style="display:grid;gap:14px">
        <div class="grid2">
          <label class="fld">"Últimas unidades" abaixo de<input class="inp" id="sLim" type="number" min="1" max="20" value="${d.limite}"><span class="h">Com ${d.limite} ou mais peças no estoque do site, o site mostra Disponível.</span></label>
          <label class="fld">Reserva em cada loja<input class="inp" id="sRes" type="number" min="0" max="20" value="${d.reserva}"><span class="h">Peças guardadas para a venda no balcão${MULTI ? ', em cada loja' : ' do ' + AQ.LOJAS[0].curto}. Não aparecem no site.</span></label>
        </div>
        <p class="note">O estoque do site vem ${MULTI ? 'da soma das lojas' : 'só do <b style="color:var(--ink)">' + AQ.LOJAS[0].nome + '</b> (gestão interna; as clientes veem apenas a loja online da Aqualupe)'}. Exemplo: com ${AQ.LOJAS.map(l => l.curto + ' ' + exQ[l.k]).join(', ')}, o site mostra <b style="color:var(--ink)">${ex} ${ex === 1 ? 'peça' : 'peças'} · ${AQ.STATUS_TXT[AQ.statusOf(ex, d.limite)]}</b>.</p>
      </div></section>
      <section class="panel"><div class="hd"><h2>Pedidos</h2></div><div class="bd" style="display:grid;gap:14px">
        <label class="fld">WhatsApp que recebe os pedidos<input class="inp" id="sWa" inputmode="tel" value="${esc(d.whatsapp)}"><span class="h">Com DDI e DDD, só números. Ex.: 5521999998888</span></label>
        <label class="chk"><input type="checkbox" id="sPreco"${d.mostrarPreco ? ' checked' : ''}><span>Mostrar os preços no site</span></label>
        <label class="chk"><input type="checkbox" id="sPausa"${d.pausado ? ' checked' : ''}><span>Pausar os pedidos pelo site (o catálogo continua no ar, mas a sacola fica fechada)</span></label>
        ${d.pausado ? `<label class="fld">Mensagem para as clientes<input class="inp" id="sPmsg" value="${esc(d.pausaMsg)}" maxlength="140"></label>` : ''}
      </div></section>
      <section class="panel"><div class="hd"><h2>Faixa de aviso no topo do site</h2></div><div class="bd" style="display:grid;gap:14px">
        <label class="chk"><input type="checkbox" id="sAv"${d.aviso.on ? ' checked' : ''}><span>Mostrar a faixa</span></label>
        <label class="fld">Texto<input class="inp" id="sAvT" value="${esc(d.aviso.texto)}" maxlength="90" placeholder="Ex.: Black Friday Aqualupe · peças de R$ 9,99 a R$ 99,90"></label>
        ${d.aviso.on && d.aviso.texto ? `<div class="preview-bar">${esc(d.aviso.texto)}</div>` : ''}
      </div></section>
      <section class="panel"><div class="hd"><h2>Frete por região</h2><span class="note">Retirada combinada pelo WhatsApp é grátis</span></div>
        <div class="tw" style="border:0;border-radius:0"><table class="tb" style="min-width:420px"><thead><tr><th>Região</th><th>Preço (R$)</th><th>Prazo (dias após o pagamento)</th></tr></thead><tbody>
        ${d.frete.map((z, i) => `<tr><td>${esc(z.nome)}</td><td><input class="inp" style="max-width:120px" data-fr="${i}" data-k="preco" inputmode="decimal" value="${fmtPreco(z.preco)}"></td><td><input class="inp" style="max-width:90px" type="number" min="0" max="15" data-fr="${i}" data-k="prazo" value="${z.prazo}"></td></tr>`).join('')}
        </tbody></table></div></section>
      <section class="panel"><div class="hd"><h2>Black Friday</h2><span class="note">${nBF} ${nBF === 1 ? 'peça entra' : 'peças entram'} agora</span></div><div class="bd" style="display:grid;gap:14px">
        <label class="chk"><input type="checkbox" id="sBf"${d.bf.on ? ' checked' : ''}><span>Black Friday no ar (categoria, banner do carrossel, faixa e selo nas peças)</span></label>
        <div class="grid2">
          <label class="fld">Preço mínimo (R$)<input class="inp" id="sBfMin" inputmode="decimal" value="${fmtPreco(d.bf.min)}"></label>
          <label class="fld">Preço máximo (R$)<input class="inp" id="sBfMax" inputmode="decimal" value="${fmtPreco(d.bf.max)}"></label>
        </div>
        <label class="fld">Quais peças entram<select class="sel" id="sBfModo"><option value="marcadas"${d.bf.modo !== 'faixa' ? ' selected' : ''}>Só as que eu marcar no Catálogo (com preço dentro da faixa)</option><option value="faixa"${d.bf.modo === 'faixa' ? ' selected' : ''}>Todas as peças com preço final dentro da faixa</option></select><span class="h">O preço final é o promocional, quando existir. Na Black Friday, use o preço promocional para o site mostrar "de/por".</span></label>
        <label class="fld">Frase da faixa (opcional)<input class="inp" id="sBfFx" maxlength="80" value="${esc(d.bf.faixa)}" placeholder="Peças de ${BRL(d.bf.min)} a ${BRL(d.bf.max)}"></label>
      </div></section>
      <section class="panel"><div class="hd"><h2>Clube Aqualupe</h2><span class="note">${S.cli.length} ${S.cli.length === 1 ? 'cadastro' : 'cadastros'}</span></div><div class="bd" style="display:grid;gap:14px">
        <label class="chk"><input type="checkbox" id="sCl"${d.clube.on ? ' checked' : ''}><span>Abrir a janela de cadastro (nome, WhatsApp, e-mail e aniversário) para quem visita o site</span></label>
        <label class="fld">Abrir depois de (segundos)<input class="inp" id="sClT" type="number" min="3" max="60" value="${d.clube.espera}"><span class="h">Quem fecha a janela só vê de novo depois de 7 dias. Quem se cadastra não vê mais.</span></label>
        <label class="fld">Mensagem de parabéns no WhatsApp<textarea class="txt" id="sClM" maxlength="400">${esc(d.clube.msgNiver)}</textarea><span class="h">Use {nome} para o primeiro nome da cliente.</span></label>
      </div></section>
      <div class="row" style="justify-content:flex-end"><button class="btn" id="sDesf">Desfazer</button><button class="btn pri" id="sSave">${I.check}Salvar configurações</button></div>`;
    const re = () => { this.draw(); };
    $('#sLim').onchange = e => { d.limite = Math.max(1, parseInt(e.target.value, 10) || 1); re(); };
    $('#sRes').onchange = e => { d.reserva = Math.max(0, parseInt(e.target.value, 10) || 0); re(); };
    $('#sWa').onchange = e => { d.whatsapp = e.target.value.replace(/\D/g, ''); };
    $('#sPreco').onchange = e => { d.mostrarPreco = e.target.checked; };
    $('#sPausa').onchange = e => { d.pausado = e.target.checked; re(); };
    if($('#sPmsg')) $('#sPmsg').onchange = e => { d.pausaMsg = e.target.value.trim(); };
    $('#sAv').onchange = e => { d.aviso.on = e.target.checked; re(); };
    $('#sAvT').onchange = e => { d.aviso.texto = e.target.value.trim(); re(); };
    $$('[data-fr]').forEach(inp => inp.onchange = e => { const z = d.frete[+inp.dataset.fr]; if(inp.dataset.k === 'preco') z.preco = parsePreco(e.target.value); else z.prazo = Math.max(0, parseInt(e.target.value, 10) || 0); });
    $('#sBf').onchange = e => { d.bf.on = e.target.checked; re(); };
    $('#sBfMin').onchange = e => { d.bf.min = parsePreco(e.target.value); re(); };
    $('#sBfMax').onchange = e => { d.bf.max = parsePreco(e.target.value); re(); };
    $('#sBfModo').onchange = e => { d.bf.modo = e.target.value; re(); };
    $('#sBfFx').onchange = e => { d.bf.faixa = e.target.value.trim(); };
    $('#sCl').onchange = e => { d.clube.on = e.target.checked; };
    $('#sClT').onchange = e => { d.clube.espera = Math.min(60, Math.max(3, parseInt(e.target.value, 10) || 8)); };
    $('#sClM').onchange = e => { d.clube.msgNiver = e.target.value.trim(); };
    $('#sDesf').onclick = () => { this.d = AQ.clone(sett()); re(); };
    $('#sSave').onclick = e => {
      if(d.whatsapp.length < 12){ toast('Confira o WhatsApp: precisa ter DDI 55, DDD e o número.', true); return; }
      if(!(d.bf.max > d.bf.min)){ toast('Na Black Friday, o preço máximo precisa ser maior que o mínimo.', true); return; }
      busy(e.currentTarget, () => B.saveSettings(AQ.clone(d)).then(() => toast('Configurações salvas. O site já está usando as novas regras.')));
    };
  }
};

/* ============================================================
   EQUIPE
   ============================================================ */
V.equipe = {
  mount(main){
    main.innerHTML = `<div class="wrapx" style="max-width:960px">${head('Equipe', 'Quem pode entrar na Área da Loja. A vendedora só lança o estoque da própria loja; a administração vê e muda tudo.', `<button class="btn pri" id="qAdd">${I.plus}Adicionar pessoa</button>`)}<div class="panel" id="qlist"></div>
      ${DEMO ? '' : '<p class="note">Para apagar uma conta de vez, use o painel do Firebase em Authentication. Desativar aqui já bloqueia o acesso na hora.</p>'}</div>`;
    $('#qAdd').onclick = () => dlgMembro(null);
    $('#qlist').onclick = async e => {
      const b = e.target.closest('[data-q]'); if(!b) return;
      const m = S.eq.find(x => x.uid === b.dataset.id);
      if(b.dataset.q === 'ed') dlgMembro(m);
      if(b.dataset.q === 'tog'){ if(m.uid === S.me.uid){ toast('Você não pode desativar o seu próprio acesso.', true); return; } busy(b, () => B.setDoc('equipe', m.uid, { ativo: !m.ativo }).then(() => toast(m.ativo ? 'Acesso desativado' : 'Acesso reativado'))); }
      if(b.dataset.q === 'pw') busy(b, () => B.reset(m.email).then(() => toast('Link de nova senha enviado para ' + m.email)));
    };
  },
  draw(){
    const L = S.eq.slice().sort((a, b) => (b.perfil === 'admin') - (a.perfil === 'admin') || String(a.nome).localeCompare(b.nome));
    $('#qlist').innerHTML = L.length ? `<div class="list">${L.map(m => `<div class="li" style="flex-wrap:wrap"><span class="av">${esc(iniciais(m.nome))}</span><span class="tx"><b>${esc(m.nome)}${m.uid === S.me.uid ? ' (você)' : ''}</b><small>${esc(m.email || '')}</small></span><span class="pill ${m.perfil === 'admin' ? 'acc' : 'info'} nodot">${esc(papel(m))}</span>${m.ativo ? '' : '<span class="pill out">Desativada</span>'}
      <span class="row" style="gap:6px"><button class="btn sm" data-q="ed" data-id="${esc(m.uid)}">${I.edit}Editar</button>${DEMO ? '' : `<button class="btn sm ghost" data-q="pw" data-id="${esc(m.uid)}">Enviar nova senha</button>`}<button class="btn sm ${m.ativo ? 'danger' : ''}" data-q="tog" data-id="${esc(m.uid)}">${m.ativo ? 'Desativar' : 'Reativar'}</button></span></div>`).join('')}</div>` : '<div class="empty"><p>Ninguém cadastrado ainda.</p></div>';
  }
};
function dlgMembro(m){
  const M2 = m ? { nome:m.nome, email:m.email, perfil:m.perfil, loja:m.loja || '' } : { nome:'', email:'', senha:'', perfil:'loja', loja:AQ.LOJAS[0].k };
  openDlg({ title: m ? 'Editar acesso' : 'Adicionar pessoa', render(){
    $('#dlgb').innerHTML = `<label class="fld">Nome<input class="inp" id="mNome" value="${esc(M2.nome)}" placeholder="Como aparece no histórico"></label>
      ${m ? `<p class="note">E-mail: ${esc(m.email)}</p>` : `<label class="fld">E-mail<input class="inp" id="mEmail" type="email" value="${esc(M2.email)}"></label>
      <label class="fld">Senha inicial<input class="inp" id="mSenha" value="${esc(M2.senha)}" placeholder="Pelo menos 6 caracteres"><span class="h">Passe a senha para a pessoa. Ela pode trocar depois em "Esqueci a senha".</span></label>`}
      <label class="fld">Perfil<select class="sel" id="mPerf"><option value="loja"${M2.perfil === 'loja' ? ' selected' : ''}>Vendedora de loja</option><option value="admin"${M2.perfil === 'admin' ? ' selected' : ''}>Administração</option></select></label>
      <label class="fld">Loja<select class="sel" id="mLoja">${M2.perfil === 'admin' ? '<option value="">Nenhuma (vê tudo)</option>' : ''}${lojaOpts(M2.loja)}</select></label>`;
    $('#dlgf').innerHTML = `<button class="btn" data-close>Cancelar</button><button class="btn pri" id="mOk">${m ? 'Salvar' : 'Criar acesso'}</button>`;
    $('#mNome').oninput = e => { M2.nome = e.target.value; };
    if($('#mEmail')){ $('#mEmail').oninput = e => { M2.email = e.target.value.trim(); }; $('#mSenha').oninput = e => { M2.senha = e.target.value; }; }
    $('#mPerf').onchange = e => { M2.perfil = e.target.value; if(M2.perfil === 'loja' && !M2.loja) M2.loja = AQ.LOJAS[0].k; this.render(); };
    $('#mLoja').onchange = e => { M2.loja = e.target.value; };
    $('#mOk').onclick = e => {
      if(!M2.nome.trim()){ toast('Preencha o nome.', true); return; }
      if(m && m.uid === S.me.uid && M2.perfil !== 'admin'){ toast('Você não pode tirar a sua própria administração.', true); return; }
      const loja = M2.perfil === 'loja' ? (M2.loja || AQ.LOJAS[0].k) : (M2.loja || null);
      if(m) busy(e.currentTarget, () => B.setDoc('equipe', m.uid, { nome:M2.nome.trim(), perfil:M2.perfil, loja }).then(() => { closeDlg(); toast('Acesso atualizado'); }));
      else {
        if(!/^\S+@\S+\.\S+$/.test(M2.email)){ toast('Confira o e-mail.', true); return; }
        if((M2.senha || '').length < 6){ toast('A senha precisa ter pelo menos 6 caracteres.', true); return; }
        busy(e.currentTarget, () => B.createMember({ nome:M2.nome.trim(), email:M2.email, senha:M2.senha, perfil:M2.perfil, loja }).then(() => { closeDlg(); toast('Acesso criado para ' + M2.nome.trim()); }));
      }
    };
  }});
}

/* ============================================================
   INÍCIO DO APP
   ============================================================ */
async function boot(){
  if(!AQ.bfConf || !AQ.LOJAS_TODAS){ $('#root').innerHTML = '<div class="loading"><p style="max-width:44ch;text-align:center">A Área da Loja foi atualizada. Recarregue a página para carregar a versão nova.</p><button class="btn pri" onclick="location.reload(true)">Recarregar</button></div>'; return; }
  try{ await B.init(); }
  catch(e){ $('#root').innerHTML = `<div class="loading"><p style="max-width:44ch;text-align:center">Não foi possível conectar ao banco de dados. Confira a internet e recarregue a página.</p><button class="btn" onclick="location.reload()">Recarregar</button></div>`; return; }
  B.onAuth(async u => {
    if(!u){ S.user = null; S.me = null; S.loaded = {}; S.stage = {}; renderLogin(); return; }
    S.user = u;
    let me = null;
    try{ me = await B.profile(u); }
    catch(e){ S.loginMsg = errMsg(e); await B.logout(); return; }
    if(!me){ S.loginMsg = 'Seu acesso ainda não foi liberado ou foi desativado. Peça para a administração cadastrar o seu e-mail na Área da Loja.'; await B.logout(); return; }
    S.me = me;
    renderShell();
    const set = k => v => { S[k] = v; S.loaded[k] = true; if(k === 'eq'){ const eu = v.find(x => x.uid === S.me.uid); if(eu){ if(!eu.ativo){ S.loginMsg = 'Seu acesso foi desativado.'; B.logout(); return; } const mudou = eu.perfil !== S.me.perfil || eu.loja !== S.me.loja || eu.nome !== S.me.nome; S.me = Object.assign(S.me, eu); if(mudou){ renderShell(); return; } } } changed(); };
    B.subscribe({ cat:set('cat'), est:set('est'), mov:set('mov'), trf:set('trf'), ped:set('ped'), avi:set('avi'), cli:set('cli'), eq:set('eq') });
  });
}
boot();
