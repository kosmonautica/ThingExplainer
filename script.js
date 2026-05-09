const input = document.getElementById('input');
const backdrop = document.getElementById('backdrop');
const countOk = document.getElementById('countOk');
const countBad = document.getElementById('countBad');
let wordSet = new Set();
const irregulars = new Map([
  ['bin','sein'],['bist','sein'],['ist','sein'],['sind','sein'],['seid','sein'],['war','sein'],['warst','sein'],['waren','sein'],['wart','sein'],['gewesen','sein'],['sei','sein'],['seien','sein'],['waere','sein'],['waeren','sein'],
  ['habe','haben'],['hast','haben'],['hat','haben'],['habt','haben'],['hatte','haben'],['hattest','haben'],['hatten','haben'],['hattet','haben'],['gehabt','haben'],['haette','haben'],['haettest','haben'],['haetten','haben'],['haettet','haben'],
  ['werde','werden'],['wirst','werden'],['wird','werden'],['werdet','werden'],['wurde','werden'],['wurdest','werden'],['wurden','werden'],['wurdet','werden'],['geworden','werden'],['wuerde','werden'],['wuerdest','werden'],['wuerden','werden'],
  ['kann','koennen'],['kannst','koennen'],['koennt','koennen'],['konnte','koennen'],['konntest','koennen'],['konnten','koennen'],['konntet','koennen'],['gekonnt','koennen'],['koennte','koennen'],['koenntest','koennen'],['koennten','koennen'],
  ['muss','muessen'],['musst','muessen'],['muesst','muessen'],['musste','muessen'],['musstest','muessen'],['mussten','muessen'],['musstet','muessen'],['gemusst','muessen'],['muesste','muessen'],['muesstest','muessen'],['muessten','muessen'],
  ['soll','sollen'],['sollst','sollen'],['sollt','sollen'],['sollte','sollen'],['solltest','sollen'],['sollten','sollen'],['solltet','sollen'],['gesollt','sollen'],
  ['will','wollen'],['willst','wollen'],['wollt','wollen'],['wollte','wollen'],['wolltest','wollen'],['wollten','wollen'],['wolltet','wollen'],['gewollt','wollen'],
  ['darf','duerfen'],['darfst','duerfen'],['duerft','duerfen'],['durfte','duerfen'],['durftest','duerfen'],['durften','duerfen'],['durftet','duerfen'],['gedurft','duerfen'],
  ['mag','moegen'],['magst','moegen'],['moeget','moegen'],['mochte','moegen'],['mochtest','moegen'],['mochten','moegen'],['mochtet','moegen'],['gemocht','moegen'],
  ['moechte','moechten'],['moechtest','moechten'],['moechtet','moechten'],
  ['ging','gehen'],['gingst','gehen'],['gingen','gehen'],['gingt','gehen'],['gegangen','gehen'],
  ['kam','kommen'],['kamst','kommen'],['kamen','kommen'],['kamt','kommen'],['gekommen','kommen'],
  ['sah','sehen'],['sahst','sehen'],['sahen','sehen'],['saht','sehen'],['gesehen','sehen'],['siehst','sehen'],['sieht','sehen'],['seht','sehen'],
  ['gab','geben'],['gabst','geben'],['gaben','geben'],['gabt','geben'],['gegeben','geben'],['gibst','geben'],['gibt','geben'],
  ['nahm','nehmen'],['nahmst','nehmen'],['nahmen','nehmen'],['nahmt','nehmen'],['genommen','nehmen'],['nimmst','nehmen'],['nimmt','nehmen'],
  ['fuhr','fahren'],['fuhrst','fahren'],['fuhren','fahren'],['fuhrt','fahren'],['gefahren','fahren'],['faehrst','fahren'],['faehrt','fahren'],
  ['lief','laufen'],['liefst','laufen'],['liefen','laufen'],['lieft','laufen'],['gelaufen','laufen'],['laeufst','laufen'],['laeuft','laufen'],
  ['hielt','halten'],['hieltest','halten'],['hielten','halten'],['hieltet','halten'],['gehalten','halten'],['haeltst','halten'],['haelt','halten'],
  ['wusste','wissen'],['wusstest','wissen'],['wussten','wissen'],['wusstet','wissen'],['gewusst','wissen'],['weiss','wissen'],['weisst','wissen'],['wisst','wissen'],
  ['dachte','denken'],['dachtest','denken'],['dachten','denken'],['gedacht','denken'],
  ['brachte','bringen'],['brachtest','bringen'],['brachten','bringen'],['gebracht','bringen'],
  ['hiess','heissen'],['hiesst','heissen'],['hiessen','heissen'],['geheissen','heissen'],
  ['schlief','schlafen'],['schliefst','schlafen'],['schliefen','schlafen'],['geschlafen','schlafen'],['schlaefst','schlafen'],['schlaeft','schlafen'],
  ['las','lesen'],['last','lesen'],['lasen','lesen'],['gelesen','lesen'],['liest','lesen'],['lest','lesen'],
  ['ass','essen'],['asst','essen'],['assen','essen'],['gegessen','essen'],['isst','essen'],['esst','essen'],
  ['trug','tragen'],['trugst','tragen'],['trugen','tragen'],['getragen','tragen'],['traegst','tragen'],['traegt','tragen'],
  ['fand','finden'],['fandst','finden'],['fanden','finden'],['gefunden','finden'],
  ['sprach','sprechen'],['sprachst','sprechen'],['sprachen','sprechen'],['gesprochen','sprechen'],['sprichst','sprechen'],['spricht','sprechen'],['sprecht','sprechen'],
  ['schrieb','schreiben'],['schriebst','schreiben'],['schrieben','schreiben'],['geschrieben','schreiben'],
  ['rief','rufen'],['riefst','rufen'],['riefen','rufen'],['gerufen','rufen'],
  ['stand','stehen'],['standst','stehen'],['standen','stehen'],['gestanden','stehen'],
  ['lag','liegen'],['lagst','liegen'],['lagen','liegen'],['gelegen','liegen'],
  ['sass','sitzen'],['sasst','sitzen'],['sassen','sitzen'],['gesessen','sitzen'],
  ['fiel','fallen'],['fielst','fallen'],['fielen','fallen'],['gefallen','fallen'],['faellt','fallen'],
  ['vergass','vergessen'],['vergasst','vergessen'],['vergassen','vergessen'],['vergessen','vergessen'],['vergisst','vergessen'],['vergesst','vergessen'],
  ['schlug','schlagen'],['schlugst','schlagen'],['schlugen','schlagen'],['geschlagen','schlagen'],['schlaegst','schlagen'],['schlaegt','schlagen'],
  ['bat','bitten'],['baten','bitten'],['gebeten','bitten'],
  ['bot','bieten'],['boten','bieten'],['geboten','bieten'],
  ['lud','laden'],['ludst','laden'],['luden','laden'],['geladen','laden'],
  ['liess','lassen'],['liesst','lassen'],['liessen','lassen'],['gelassen','lassen'],['laesst','lassen'],['lasst','lassen'],
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
function umlautBack(s) { return s.replace(/ae/g,'a').replace(/oe/g,'o').replace(/ue/g,'u').replace(/ss/g,'s'); }
function checkStem(stem) { if (stem.length < 2) return false; if (wordSet.has(stem)) return true; const d = umlautBack(stem); return d !== stem && wordSet.has(d); }
function isAllowed(rawWord) { const word = rawWord.toLowerCase(); if (!word) return false; const lemma = irregulars.get(word); if (lemma !== undefined) return wordSet.has(lemma); if (wordSet.has(word)) return true; for (const s of suffixes) { if (word.endsWith(s) && word.length - s.length >= 2) { if (checkStem(word.slice(0, -s.length))) return true; } } const d = umlautBack(word); return d !== word && wordSet.has(d); }
function escapeHtml(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function render() { const tokens = input.value.match(/[a-zA-ZaouAOUssäöüÄÖÜß]+|[^a-zA-ZäöüÄÖÜß]+/g) || []; let ok = 0, bad = 0, html = ''; for (const token of tokens) { if (/[a-zA-ZäöüÄÖÜß]/.test(token)) { if (isAllowed(token)) { ok++; html += '<mark class="ok">' + escapeHtml(token) + '</mark>'; } else { bad++; html += '<mark class="bad">' + escapeHtml(token) + '</mark>'; } } else { html += escapeHtml(token); } } backdrop.innerHTML = html + '\n'; backdrop.scrollTop = input.scrollTop; countOk.textContent = ok; countBad.textContent = bad; }
input.addEventListener('input', render);
input.addEventListener('scroll', () => { backdrop.scrollTop = input.scrollTop; });
fetch('words.json').then(r => r.json()).then(words => { wordSet = new Set(words); render(); });
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js');