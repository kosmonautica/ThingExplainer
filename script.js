const input = document.getElementById('input');
const backdrop = document.getElementById('backdrop');
const countOk = document.getElementById('countOk');
const countBad = document.getElementById('countBad');
var wordSet = new Set();
const irregulars = new Map([
  ['bin','sein'],['bist','sein'],['ist','sein'],['sind','sein'],['seid','sein'],['war','sein'],['warst','sein'],['waren','sein'],['wart','sein'],['gewesen','sein'],['sei','sein'],['seien','sein'],['waere','sein'],['wäre','sein'],['waeren','sein'],['wären','sein'],
  ['habe','haben'],['hast','haben'],['hat','haben'],['habt','haben'],['hatte','haben'],['hattest','haben'],['hatten','haben'],['hattet','haben'],['gehabt','haben'],['haette','haben'],['hätte','haben'],['haettest','haben'],['hättest','haben'],['haetten','haben'],['hätten','haben'],['haettet','haben'],['hättet','haben'],
  ['werde','werden'],['wirst','werden'],['wird','werden'],['werdet','werden'],['wurde','werden'],['wurdest','werden'],['wurden','werden'],['wurdet','werden'],['geworden','werden'],['wuerde','werden'],['würde','werden'],['wuerdest','werden'],['würdest','werden'],['wuerden','werden'],['würden','werden'],
  ['kann','können'],['kannst','können'],['koennt','können'],['könnt','können'],['konnte','können'],['konntest','können'],['konnten','können'],['konntet','können'],['gekonnt','können'],['koennte','können'],['könnte','können'],['koenntest','können'],['könntest','können'],['koennten','können'],['könnten','können'],
  ['muss','müssen'],['musst','müssen'],['muesst','müssen'],['müsst','müssen'],['musste','müssen'],['musstest','müssen'],['mussten','müssen'],['musstet','müssen'],['gemusst','müssen'],['muesste','müssen'],['müsste','müssen'],['muesstest','müssen'],['müsstest','müssen'],['muessten','müssen'],['müssten','müssen'],
  ['soll','sollen'],['sollst','sollen'],['sollt','sollen'],['sollte','sollen'],['solltest','sollen'],['sollten','sollen'],['solltet','sollen'],['gesollt','sollen'],
  ['will','wollen'],['willst','wollen'],['wollt','wollen'],['wollte','wollen'],['wolltest','wollen'],['wollten','wollen'],['wolltet','wollen'],['gewollt','wollen'],
  ['darf','dürfen'],['darfst','dürfen'],['duerft','dürfen'],['dürft','dürfen'],['durfte','dürfen'],['durftest','dürfen'],['durften','dürfen'],['durftet','dürfen'],['gedurft','dürfen'],
  ['mag','mögen'],['magst','mögen'],['moeget','mögen'],['möget','mögen'],['mochte','mögen'],['mochtest','mögen'],['mochten','mögen'],['mochtet','mögen'],['gemocht','mögen'],
  ['moechte','möchten'],['möchte','möchten'],['moechtest','möchten'],['möchtest','möchten'],['moechtet','möchten'],['möchtet','möchten'],
  ['ging','gehen'],['gingst','gehen'],['gingen','gehen'],['gingt','gehen'],['gegangen','gehen'],
  ['kam','kommen'],['kamst','kommen'],['kamen','kommen'],['kamt','kommen'],['gekommen','kommen'],
  ['sah','sehen'],['sahst','sehen'],['sahen','sehen'],['saht','sehen'],['gesehen','sehen'],['siehst','sehen'],['sieht','sehen'],['seht','sehen'],
  ['gab','geben'],['gabst','geben'],['gaben','geben'],['gabt','geben'],['gegeben','geben'],['gibst','geben'],['gibt','geben'],
  ['nahm','nehmen'],['nahmst','nehmen'],['nahmen','nehmen'],['nahmt','nehmen'],['genommen','nehmen'],['nimmst','nehmen'],['nimmt','nehmen'],
  ['fuhr','fahren'],['fuhrst','fahren'],['fuhren','fahren'],['fuhrt','fahren'],['gefahren','fahren'],['faehrst','fahren'],['fährst','fahren'],['faehrt','fahren'],['fährt','fahren'],
  ['lief','laufen'],['liefst','laufen'],['liefen','laufen'],['lieft','laufen'],['gelaufen','laufen'],['laeufst','laufen'],['läufst','laufen'],['laeuft','laufen'],['läuft','laufen'],
  ['hielt','halten'],['hieltest','halten'],['hielten','halten'],['hieltet','halten'],['gehalten','halten'],['haeltst','halten'],['hältst','halten'],['haelt','halten'],['hält','halten'],
  ['wusste','wissen'],['wusstest','wissen'],['wussten','wissen'],['wusstet','wissen'],['gewusst','wissen'],['weiss','wissen'],['weisst','wissen'],['wisst','wissen'],
  ['dachte','denken'],['dachtest','denken'],['dachten','denken'],['gedacht','denken'],
  ['brachte','bringen'],['brachtest','bringen'],['brachten','bringen'],['gebracht','bringen'],
  ['hiess','heißen'],['hieß','heißen'],['heiß','heißen'],['hiesst','heißen'],['heißt','heißen'],['hiessen','heißen'],['hießen','heißen'],['geheissen','heißen'],['geheißen','heißen'],
  ['tu','tun'],['tust','tun'],['tut','tun'],['tat','tun'],['tatst','tun'],['taten','tun'],['tatet','tun'],['getan','tun'],
  ['schlief','schlafen'],['schliefst','schlafen'],['schliefen','schlafen'],['geschlafen','schlafen'],['schlaefst','schlafen'],['schläfst','schlafen'],['schlaeft','schlafen'],['schläft','schlafen'],
  ['las','lesen'],['last','lesen'],['lasen','lesen'],['gelesen','lesen'],['liest','lesen'],['lest','lesen'],
  ['ass','essen'],['aß','essen'],['asst','essen'],['aßt','essen'],['assen','essen'],['aßen','essen'],['gegessen','essen'],['isst','essen'],['esst','essen'],
  ['trug','tragen'],['trugst','tragen'],['trugen','tragen'],['getragen','tragen'],['traegst','tragen'],['trägst','tragen'],['traegt','tragen'],['trägt','tragen'],
  ['fand','finden'],['fandst','finden'],['fanden','finden'],['gefunden','finden'],
  ['sprach','sprechen'],['sprachst','sprechen'],['sprachen','sprechen'],['gesprochen','sprechen'],['sprichst','sprechen'],['spricht','sprechen'],['sprecht','sprechen'],
  ['schrieb','schreiben'],['schriebst','schreiben'],['schrieben','schreiben'],['geschrieben','schreiben'],
  ['rief','rufen'],['riefst','rufen'],['riefen','rufen'],['gerufen','rufen'],
  ['stand','stehen'],['standst','stehen'],['standen','stehen'],['gestanden','stehen'],
  ['lag','liegen'],['lagst','liegen'],['lagen','liegen'],['gelegen','liegen'],
  ['sass','sitzen'],['saß','sitzen'],['sasst','sitzen'],['saßt','sitzen'],['sassen','sitzen'],['saßen','sitzen'],['gesessen','sitzen'],
  ['fiel','fallen'],['fielst','fallen'],['fielen','fallen'],['gefallen','fallen'],['faellt','fallen'],['fällt','fallen'],
  ['vergass','vergessen'],['vergaß','vergessen'],['vergasst','vergessen'],['vergassen','vergessen'],['vergaßen','vergessen'],['vergessen','vergessen'],['vergisst','vergessen'],['vergesst','vergessen'],
  ['schlug','schlagen'],['schlugst','schlagen'],['schlugen','schlagen'],['geschlagen','schlagen'],['schlaegst','schlagen'],['schlägst','schlagen'],['schlaegt','schlagen'],['schlägt','schlagen'],
  ['bat','bitten'],['baten','bitten'],['gebeten','bitten'],
  ['bot','bieten'],['boten','bieten'],['geboten','bieten'],
  ['lud','laden'],['ludst','laden'],['luden','laden'],['geladen','laden'],
  ['liess','lassen'],['ließ','lassen'],['liesst','lassen'],['ließt','lassen'],['liessen','lassen'],['ließen','lassen'],['gelassen','lassen'],['laesst','lassen'],['lässt','lassen'],['lasst','lassen'],
  ['zog','ziehen'],['zogst','ziehen'],['zogen','ziehen'],['gezogen','ziehen'],
  ['trank','trinken'],['trankst','trinken'],['tranken','trinken'],['getrunken','trinken'],['trinkst','trinken'],['trinkt','trinken'],
  ['schwamm','schwimmen'],['geschwommen','schwimmen'],['flog','fliegen'],['geflogen','fliegen'],
  ['gewann','gewinnen'],['gewonnen','gewinnen'],['verlor','verlieren'],['verloren','verlieren'],
  ['empfahl','empfehlen'],['empfohlen','empfehlen'],['entschied','entscheiden'],['entschieden','entscheiden'],
  ['half','helfen'],['halfen','helfen'],['geholfen','helfen'],['hilfst','helfen'],['hilft','helfen'],
  ['verstand','verstehen'],['verstanden','verstehen'],
  ['begann','beginnen'],['begannen','beginnen'],['begonnen','beginnen'],
  ['stieg','steigen'],['gestiegen','steigen'],['sank','sinken'],['gesunken','sinken'],
  ['wuchs','wachsen'],['gewachsen','wachsen'],['waechst','wachsen'],
]);
const suffixes = ['ungsweise','ungsgemaess','ungen','ung','heiten','heit','keiten','keit','schaften','schaft','lichen','lichem','licher','liches','liche','lich','ischen','ischem','ischer','isches','ische','isch','enden','endem','ender','endes','ende','end','igsten','igster','igstem','igstes','igste','igst','ige','igen','igem','iger','iges','ig','test','tet','ten','te','sten','ster','stem','stes','ste','st','est','et','en','em','er','es','e','n','t'];
function umlautBack(s) { return s.replace(/ä/g,'a').replace(/ö/g,'o').replace(/ü/g,'u').replace(/ß/g,'s').replace(/ae/g,'a').replace(/oe/g,'o').replace(/ue/g,'u').replace(/ss/g,'s'); }
function checkStem(stem) {
  if (stem.length < 2) return false;
  if (wordSet.has(stem)) return true;
  if (wordSet.has(stem + 'en')) return true;
  if (wordSet.has(stem + 'n')) return true;
  const d = umlautBack(stem);
  if (d !== stem) {
    if (wordSet.has(d)) return true;
    if (wordSet.has(d + 'en')) return true;
    if (wordSet.has(d + 'n')) return true;
  }
  return false;
}
function isAllowed(rawWord) { const word = rawWord.toLowerCase(); if (!word) return false; const lemma = irregulars.get(word); if (lemma !== undefined) return wordSet.has(lemma); if (wordSet.has(word)) return true; for (const s of suffixes) { if (word.endsWith(s) && word.length - s.length >= 2) { if (checkStem(word.slice(0, -s.length))) return true; } } if (word.startsWith('ge') && word.length > 4) { const body = word.slice(2); if (checkStem(body)) return true; if (body.endsWith('et') && checkStem(body.slice(0, -2))) return true; if (body.endsWith('t') && checkStem(body.slice(0, -1))) return true; } const d = umlautBack(word); return d !== word && wordSet.has(d); }
function escapeHtml(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function render() { const tokens = input.value.match(/[a-zA-ZäöüÄÖÜß]+|[^a-zA-ZäöüÄÖÜß]+/g) || []; let ok = 0, bad = 0, html = ''; for (const token of tokens) { if (/[a-zA-ZäöüÄÖÜß]/.test(token)) { if (isAllowed(token)) { ok++; html += '<mark class="ok">' + escapeHtml(token) + '</mark>'; } else { bad++; html += '<mark class="bad">' + escapeHtml(token) + '</mark>'; } } else { html += escapeHtml(token); } } backdrop.innerHTML = html + '\n'; backdrop.scrollTop = input.scrollTop; countOk.textContent = ok; countBad.textContent = bad; }
input.addEventListener('input', render);
input.addEventListener('scroll', () => { backdrop.scrollTop = input.scrollTop; });
fetch('words.json').then(r => r.json()).then(words => { wordSet = new Set(words); render(); });
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js');

const wlSearch = document.getElementById('wlSearch');
const wlCount = document.getElementById('wlCount');
const wlAZ = document.getElementById('wlAZ');

'abcdefghijklmnopqrstuvwxyz'.split('').forEach(letter => {
  const btn = document.createElement('button');
  btn.textContent = letter.toUpperCase();
  btn.className = 'wl-az-btn';
  btn.dataset.letter = letter;
  btn.addEventListener('click', () => {
    const h = document.getElementById('wl-letter-' + letter);
    if (h) h.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  wlAZ.appendChild(btn);
});

function fletter(w) { return w[0].replace(/[äÄ]/g,'a').replace(/[öÖ]/g,'o').replace(/[üÜ]/g,'u').replace(/ß/g,'s'); }
function normSearch(s) { return s.toLowerCase().replace(/ä/g,'a').replace(/ö/g,'o').replace(/ü/g,'u').replace(/ß/g,'s'); }

function renderWordlist(q) {
  q = q.trim().toLowerCase();
  const all = [...wordSet].sort((a, b) => a.localeCompare(b, 'de'));
  const words = q ? all.filter(w => w.includes(q) || normSearch(w).includes(normSearch(q))) : all;
  const active = new Set();
  let html = '', cur = null;
  for (const w of words) {
    const fl = fletter(w);
    if (fl !== cur) { cur = fl; active.add(fl); html += '<div class="wl-letter-heading" id="wl-letter-' + fl + '">' + fl.toUpperCase() + '</div>'; }
    html += '<span class="wl-word">' + escapeHtml(w) + '</span>';
  }
  document.getElementById('wordlistContent').innerHTML = html || '<span class="wl-empty">Keine Wörter gefunden</span>';
  wlCount.textContent = q ? words.length + ' von ' + wordSet.size : wordSet.size + ' Wörter';
  wlAZ.querySelectorAll('.wl-az-btn').forEach(btn => btn.classList.toggle('disabled', !active.has(btn.dataset.letter)));
}

document.getElementById('btnWordlist').addEventListener('click', () => {
  wlSearch.value = '';
  renderWordlist('');
  document.getElementById('wordlistModal').hidden = false;
  wlSearch.focus();
});
wlSearch.addEventListener('input', () => renderWordlist(wlSearch.value));
document.getElementById('closeWordlist').addEventListener('click', () => {
  document.getElementById('wordlistModal').hidden = true;
});
document.getElementById('wordlistModal').addEventListener('click', e => {
  if (e.target === e.currentTarget) e.currentTarget.hidden = true;
});
