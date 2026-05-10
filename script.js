const APP_VERSION = '4.0';

// === i18n: UI-Strings ===
const i18n = {
  de: {
    counterAllowed: 'erlaubt',
    counterForbidden: 'verboten',
    btnWordlist: 'Wortliste',
    placeholderInput: 'Tippe deine Erklaerung hier ...',
    modalTitle: 'Erlaubte Wörter',
    btnClose: 'Schließen',
    placeholderSearch: 'Suchen …',
    emptySearch: 'Keine Wörter gefunden',
    countWords: 'Wörter',
    countOf: 'von',
  },
  en: {
    counterAllowed: 'allowed',
    counterForbidden: 'forbidden',
    btnWordlist: 'Word list',
    placeholderInput: 'Type your explanation here ...',
    modalTitle: 'Allowed words',
    btnClose: 'Close',
    placeholderSearch: 'Search …',
    emptySearch: 'No words found',
    countWords: 'words',
    countOf: 'of',
  },
};

// === DE: irreguläre Verben ===
const irregulars_de = new Map([
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

const suffixes_de = ['ungsweise','ungsgemaess','ungen','ung','heiten','heit','keiten','keit','schaften','schaft','lichen','lichem','licher','liches','liche','lich','ischen','ischem','ischer','isches','ische','isch','enden','endem','ender','endes','ende','end','igsten','igster','igstem','igstes','igste','igst','ige','igen','igem','iger','iges','ig','test','tet','ten','te','sten','ster','stem','stes','ste','st','est','et','en','em','er','es','e','n','t'];

function umlautBack(s) { return s.replace(/ä/g,'a').replace(/ö/g,'o').replace(/ü/g,'u').replace(/ß/g,'s').replace(/ae/g,'a').replace(/oe/g,'o').replace(/ue/g,'u').replace(/ss/g,'s'); }

function checkStem_de(stem) {
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

function isAllowed_de(rawWord) {
  const word = rawWord.toLowerCase();
  if (!word) return false;
  const lemma = irregulars_de.get(word);
  if (lemma !== undefined) return wordSet.has(lemma);
  if (wordSet.has(word)) return true;
  for (const s of suffixes_de) {
    if (word.endsWith(s) && word.length - s.length >= 2) {
      if (checkStem_de(word.slice(0, -s.length))) return true;
    }
  }
  if (word.startsWith('ge') && word.length > 4) {
    const body = word.slice(2);
    if (checkStem_de(body)) return true;
    if (body.endsWith('et') && checkStem_de(body.slice(0, -2))) return true;
    if (body.endsWith('t') && checkStem_de(body.slice(0, -1))) return true;
  }
  const d = umlautBack(word);
  return d !== word && wordSet.has(d);
}

// === EN: irreguläre Verben ===
const irregulars_en = new Map([
  ['am','be'],['is','be'],['are','be'],['was','be'],['were','be'],['been','be'],['being','be'],
  ['has','have'],['had','have'],['having','have'],
  ['does','do'],['did','do'],['done','do'],['doing','do'],
  ['said','say'],['says','say'],['saying','say'],
  ['went','go'],['gone','go'],['goes','go'],['going','go'],
  ['got','get'],['gotten','get'],['gets','get'],['getting','get'],
  ['made','make'],['makes','make'],['making','make'],
  ['knew','know'],['known','know'],['knows','know'],['knowing','know'],
  ['thought','think'],['thinks','think'],['thinking','think'],
  ['took','take'],['taken','take'],['takes','take'],['taking','take'],
  ['saw','see'],['seen','see'],['sees','see'],['seeing','see'],
  ['came','come'],['comes','come'],['coming','come'],
  ['gave','give'],['given','give'],['gives','give'],['giving','give'],
  ['found','find'],['finds','find'],['finding','find'],
  ['told','tell'],['tells','tell'],['telling','tell'],
  ['became','become'],['becomes','become'],['becoming','become'],
  ['left','leave'],['leaves','leave'],['leaving','leave'],
  ['felt','feel'],['feels','feel'],['feeling','feel'],
  ['brought','bring'],['brings','bring'],['bringing','bring'],
  ['began','begin'],['begun','begin'],['begins','begin'],['beginning','begin'],
  ['kept','keep'],['keeps','keep'],['keeping','keep'],
  ['held','hold'],['holds','hold'],['holding','hold'],
  ['wrote','write'],['written','write'],['writes','write'],['writing','write'],
  ['stood','stand'],['stands','stand'],['standing','stand'],
  ['heard','hear'],['hears','hear'],['hearing','hear'],
  ['meant','mean'],['means','mean'],['meaning','mean'],
  ['met','meet'],['meets','meet'],['meeting','meet'],
  ['ran','run'],['runs','run'],['running','run'],
  ['paid','pay'],['pays','pay'],['paying','pay'],
  ['sat','sit'],['sits','sit'],['sitting','sit'],
  ['spoke','speak'],['spoken','speak'],['speaks','speak'],['speaking','speak'],
  ['led','lead'],['leads','lead'],['leading','lead'],
  ['reads','read'],['reading','read'],
  ['grew','grow'],['grown','grow'],['grows','grow'],['growing','grow'],
  ['lost','lose'],['loses','lose'],['losing','lose'],
  ['fell','fall'],['fallen','fall'],['falls','fall'],['falling','fall'],
  ['sent','send'],['sends','send'],['sending','send'],
  ['built','build'],['builds','build'],['building','build'],
  ['understood','understand'],['understands','understand'],['understanding','understand'],
  ['drew','draw'],['drawn','draw'],['draws','draw'],['drawing','draw'],
  ['broke','break'],['broken','break'],['breaks','break'],['breaking','break'],
  ['spent','spend'],['spends','spend'],['spending','spend'],
  ['rose','rise'],['risen','rise'],['rises','rise'],['rising','rise'],
  ['drove','drive'],['driven','drive'],['drives','drive'],['driving','drive'],
  ['bought','buy'],['buys','buy'],['buying','buy'],
  ['wore','wear'],['worn','wear'],['wears','wear'],['wearing','wear'],
  ['chose','choose'],['chosen','choose'],['chooses','choose'],['choosing','choose'],
  ['caught','catch'],['catches','catch'],['catching','catch'],
  ['taught','teach'],['teaches','teach'],['teaching','teach'],
  ['threw','throw'],['thrown','throw'],['throws','throw'],['throwing','throw'],
  ['fought','fight'],['fights','fight'],['fighting','fight'],
  ['forgot','forget'],['forgotten','forget'],['forgets','forget'],['forgetting','forget'],
  ['ate','eat'],['eaten','eat'],['eats','eat'],['eating','eat'],
  ['shook','shake'],['shaken','shake'],['shakes','shake'],['shaking','shake'],
  ['slept','sleep'],['sleeps','sleep'],['sleeping','sleep'],
  ['swam','swim'],['swum','swim'],['swims','swim'],['swimming','swim'],
  ['woke','wake'],['woken','wake'],['wakes','wake'],['waking','wake'],
  ['shot','shoot'],['shoots','shoot'],['shooting','shoot'],
  ['rode','ride'],['ridden','ride'],['rides','ride'],['riding','ride'],
  ['sang','sing'],['sung','sing'],['sings','sing'],['singing','sing'],
  ['hid','hide'],['hidden','hide'],['hides','hide'],['hiding','hide'],
  ['bit','bite'],['bitten','bite'],['bites','bite'],['biting','bite'],
  ['blew','blow'],['blown','blow'],['blows','blow'],['blowing','blow'],
  ['flew','fly'],['flown','fly'],['flies','fly'],['flying','fly'],
  ['cost','cost'],['costs','cost'],['costing','cost'],
  ['cut','cut'],['cuts','cut'],['cutting','cut'],
  ['hit','hit'],['hits','hit'],['hitting','hit'],
  ['hurt','hurt'],['hurts','hurt'],['hurting','hurt'],
  ['put','put'],['puts','put'],['putting','put'],
  ['set','set'],['sets','set'],['setting','set'],
  ['shut','shut'],['shuts','shut'],['shutting','shut'],
  ['let','let'],['lets','let'],['letting','let'],
  ['lay','lay'],['lays','lay'],['laying','lay'],['laid','lay'],
  ['lent','lend'],['lends','lend'],['lending','lend'],
  ['fed','feed'],['feeds','feed'],['feeding','feed'],
  ['could','can'],['would','will'],['should','shall'],['might','may'],
]);

// === EN: Kontraktionen ===
const contractions_en = new Map([
  ["don't",'do'],["can't",'can'],["won't",'will'],
  ["i'm",'be'],["it's",'be'],["you're",'be'],["we're",'be'],["they're",'be'],["he's",'be'],["she's",'be'],
  ["isn't",'be'],["aren't",'be'],["wasn't",'be'],["weren't",'be'],
  ["doesn't",'do'],["didn't",'do'],
  ["haven't",'have'],["hasn't",'have'],["hadn't",'have'],
  ["i've",'have'],["you've",'have'],["we've",'have'],["they've",'have'],
  ["i'll",'will'],["you'll",'will'],["he'll",'will'],["she'll",'will'],["we'll",'will'],["they'll",'will'],["it'll",'will'],
  ["i'd",'would'],["you'd",'would'],["he'd",'would'],["she'd",'would'],["we'd",'would'],["they'd",'would'],
  ["wouldn't",'will'],["couldn't",'can'],["shouldn't",'shall'],
  ["let's",'let'],["that's",'be'],["who's",'be'],["what's",'be'],["there's",'be'],["here's",'be'],
]);

const suffixes_en = ['ation','ness','tion','ion','ment','less','able','ible','ful','ish','ous','ive','iest','ier','ied','ies','ing','est','ed','er','ly','es','s','e'];

function checkStem_en(stem) {
  if (stem.length < 2) return false;
  if (wordSet.has(stem)) return true;
  if (wordSet.has(stem + 'e')) return true;
  if (wordSet.has(stem + 'y')) return true;
  if (stem.length >= 3 && stem[stem.length-1] === stem[stem.length-2] && /[bcdfghjklmnpqrstvwxz]/.test(stem[stem.length-1])) {
    if (wordSet.has(stem.slice(0, -1))) return true;
  }
  return false;
}

function isAllowed_en(rawWord) {
  let word = rawWord.toLowerCase();
  if (!word) return false;
  const contractedLemma = contractions_en.get(word);
  if (contractedLemma !== undefined) return wordSet.has(contractedLemma);
  const lemma = irregulars_en.get(word);
  if (lemma !== undefined) return wordSet.has(lemma);
  if (wordSet.has(word)) return true;
  if (word.endsWith("'s") && word.length > 2) {
    const base = word.slice(0, -2);
    if (wordSet.has(base)) return true;
    const baseLemma = irregulars_en.get(base);
    if (baseLemma !== undefined && wordSet.has(baseLemma)) return true;
    word = base;
  }
  for (const s of suffixes_en) {
    if (word.endsWith(s) && word.length - s.length >= 2) {
      if (checkStem_en(word.slice(0, -s.length))) return true;
    }
  }
  return false;
}

// === Polymorphic dispatch ===
var currentLang = 'de';
try { if (typeof localStorage !== 'undefined') currentLang = localStorage.getItem('lang') || 'de'; } catch (e) {}
if (currentLang !== 'de' && currentLang !== 'en') currentLang = 'de';

var wordSet = new Set();

function isAllowed(rawWord) {
  return currentLang === 'en' ? isAllowed_en(rawWord) : isAllowed_de(rawWord);
}

function escapeHtml(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

const tokenizers = {
  de: /[a-zA-ZäöüÄÖÜß]+|[^a-zA-ZäöüÄÖÜß]+/g,
  en: /[a-zA-Z']+|[^a-zA-Z']+/g,
};
const wordTesters = {
  de: /[a-zA-ZäöüÄÖÜß]/,
  en: /[a-zA-Z]/,
};

const input = document.getElementById('input');
const backdrop = document.getElementById('backdrop');
const countOk = document.getElementById('countOk');
const countBad = document.getElementById('countBad');

function render() {
  const tokens = input.value.match(tokenizers[currentLang]) || [];
  const wordRe = wordTesters[currentLang];
  let ok = 0, bad = 0, html = '';
  for (const token of tokens) {
    if (wordRe.test(token)) {
      if (isAllowed(token)) { ok++; html += '<mark class="ok">' + escapeHtml(token) + '</mark>'; }
      else { bad++; html += '<mark class="bad">' + escapeHtml(token) + '</mark>'; }
    } else {
      html += escapeHtml(token);
    }
  }
  backdrop.innerHTML = html + '\n';
  backdrop.scrollTop = input.scrollTop;
  countOk.textContent = ok;
  countBad.textContent = bad;
}

input.addEventListener('input', render);
input.addEventListener('scroll', () => { backdrop.scrollTop = input.scrollTop; });

if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js');

document.getElementById('appVersion').textContent = 'v' + APP_VERSION;
document.getElementById('wlVersion').textContent = 'v' + APP_VERSION;

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

function fletter(w) {
  if (currentLang === 'de') return w[0].replace(/[äÄ]/g,'a').replace(/[öÖ]/g,'o').replace(/[üÜ]/g,'u').replace(/ß/g,'s');
  return w[0];
}
function normSearch(s) {
  if (currentLang === 'de') return s.toLowerCase().replace(/ä/g,'a').replace(/ö/g,'o').replace(/ü/g,'u').replace(/ß/g,'s');
  return s.toLowerCase();
}

function renderWordlist(q) {
  q = q.trim().toLowerCase();
  const all = [...wordSet].sort((a, b) => a.localeCompare(b, currentLang));
  const words = q ? all.filter(w => w.includes(q) || normSearch(w).includes(normSearch(q))) : all;
  const active = new Set();
  let html = '', cur = null;
  for (const w of words) {
    const fl = fletter(w);
    if (fl !== cur) { cur = fl; active.add(fl); html += '<div class="wl-letter-heading" id="wl-letter-' + fl + '">' + fl.toUpperCase() + '</div>'; }
    html += '<span class="wl-word">' + escapeHtml(w) + '</span>';
  }
  document.getElementById('wordlistContent').innerHTML = html || '<span class="wl-empty">' + escapeHtml(i18n[currentLang].emptySearch) + '</span>';
  wlCount.textContent = q ? words.length + ' ' + i18n[currentLang].countOf + ' ' + wordSet.size : wordSet.size + ' ' + i18n[currentLang].countWords;
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

// === i18n: DOM-Aktualisierung ===
function applyI18nDom() {
  const t = i18n[currentLang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.textContent = t[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (t[key] !== undefined) el.placeholder = t[key];
  });
  document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
    const key = el.dataset.i18nAriaLabel;
    if (t[key] !== undefined) el.setAttribute('aria-label', t[key]);
  });
  document.documentElement.lang = currentLang;
  const btnDe = document.getElementById('btnLangDe');
  const btnEn = document.getElementById('btnLangEn');
  if (btnDe) btnDe.classList.toggle('active', currentLang === 'de');
  if (btnEn) btnEn.classList.toggle('active', currentLang === 'en');
}

function loadWords(lang) {
  return fetch('words.' + lang + '.json').then(r => r.json()).then(words => {
    wordSet = new Set(words);
  });
}

function applyLanguage(lang) {
  if (lang !== 'de' && lang !== 'en') return;
  currentLang = lang;
  try { if (typeof localStorage !== 'undefined') localStorage.setItem('lang', lang); } catch (e) {}
  applyI18nDom();
  loadWords(lang).then(() => {
    render();
    const modal = document.getElementById('wordlistModal');
    if (modal && !modal.hidden) renderWordlist(wlSearch.value);
  });
}

document.getElementById('btnLangDe').addEventListener('click', () => applyLanguage('de'));
document.getElementById('btnLangEn').addEventListener('click', () => applyLanguage('en'));

// === Initial-Bootstrap ===
applyI18nDom();
loadWords(currentLang).then(() => render());
