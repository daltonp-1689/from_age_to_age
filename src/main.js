import { loadState, saveState, logExamResult, setUserId } from './storage.js';
import { initAuth } from './auth.js';
import { supabase } from './supabase.js';
import { L1_QUESTIONS, L2_QUESTIONS, L3_QUESTIONS, L4_QUESTIONS, M0_QUESTIONS, M1_QUESTIONS, M2_QUESTIONS, M4_QUESTIONS, M5_QUESTIONS, M6_QUESTIONS, M7_QUESTIONS, M8_QUESTIONS, M9_QUESTIONS, M10_QUESTIONS, M11_QUESTIONS, M12_QUESTIONS, M13_QUESTIONS, M14_QUESTIONS, M15_QUESTIONS, M16_QUESTIONS, M17_QUESTIONS, M18_QUESTIONS, M19_QUESTIONS, M20_QUESTIONS, M21_QUESTIONS, M22_QUESTIONS, M23_QUESTIONS, M24_QUESTIONS, M25_QUESTIONS, M26_QUESTIONS, M27_QUESTIONS, M28_QUESTIONS, M29_QUESTIONS, M30_QUESTIONS, M31_QUESTIONS } from './questions.js';
import { A1_QUESTIONS, A2_QUESTIONS, A3_QUESTIONS, A4_QUESTIONS, A5_QUESTIONS, A6_QUESTIONS, A7_QUESTIONS, A8_QUESTIONS, A9_QUESTIONS, A10_QUESTIONS, A11_QUESTIONS, A12_QUESTIONS, A13_QUESTIONS, A14_QUESTIONS, A15_QUESTIONS, A16_QUESTIONS, A17_QUESTIONS, A18_QUESTIONS, A19_QUESTIONS, A20_QUESTIONS, A21_QUESTIONS, A22_QUESTIONS, A23_QUESTIONS, A24_QUESTIONS, A25_QUESTIONS, A26_QUESTIONS, A27_QUESTIONS, A28_QUESTIONS, A29_QUESTIONS, A30_QUESTIONS, A31_QUESTIONS, A32_QUESTIONS, A_FINAL_QUESTIONS, A_ERA_EVENTS_1, A_ERA_EVENTS_2, A_ERA_EVENTS_3, A_PERSON_POOL_1, A_PERSON_POOL_2, A_PERSON_POOL_3 } from './questions_america.js';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Practice bias: favor questions whose answer is a concrete fact (a person,
// event, year, place, or key term) and de-emphasize true/false and conceptual
// "why did this happen" questions. Returns a relative selection weight.
function _questionWeight(q){
  if(q.type==='tf') return 0.35;
  if(q.type==='quote') return 2.0;     // answer is a person's name
  if(q.type==='timeline') return 1.6;  // chronology / years
  // mc:
  const text=(q.q||'').toLowerCase();
  const ans=(q.correct||'').trim();
  const conceptual=/^\s*why\b/.test(text)
    || /\bbecause\b/.test(text)
    || /relationship between/.test(text)
    || /best (describes|captures|summary|summarizes)/.test(text)
    || /\b(significance|significant|contribution|achievement|legacy|impact|long-term|role)\b/.test(text);
  const isYear=/\b\d{3,4}\b/.test(ans);
  const words=ans.split(/\s+/).filter(Boolean).length;
  const concrete=isYear || (words<=4 && /^[A-Z0-9]/.test(ans));
  let w=1.0;
  if(concrete) w+=1.0;
  if(conceptual) w-=0.65;
  return Math.max(0.3,w);
}

// Weighted sample without replacement, ordered by draw. Items with higher
// _questionWeight are more likely to appear earlier / be selected.
function _weightedSample(items,n){
  const pool=items.map(it=>({it,w:_questionWeight(it)}));
  const count=Math.min(n,pool.length);
  const out=[];
  while(out.length<count){
    let total=0;
    for(const p of pool) total+=p.w;
    let r=Math.random()*total;
    let idx=0;
    for(;idx<pool.length-1;idx++){ r-=pool[idx].w; if(r<=0)break; }
    out.push(pool[idx].it);
    pool.splice(idx,1);
  }
  return out;
}

async function signOut() {
  await supabase.auth.signOut();
  location.reload();
}

// ═══════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════
let S = {xp:0,level:1,streak:0,lastStudied:null,tracks:{track1:{lessons:{l1:0,l2:0,l3:0,l4:0}}}};
function save(){ saveState(S); }
function today(){return new Date().toDateString();}

// XP & level
const XP_THRESHOLDS=[0,50,150,300,500,800,1200,1800,2600,3600];
const LEVEL_TITLES=['Catechumen','Acolyte','Lector','Confessor','Apologist','Deacon','Scholar','Bishop','Doctor','Doctor Ecclesiae'];
function addXP(amt,x,y){
  S.xp+=amt;
  for(let i=XP_THRESHOLDS.length-1;i>=0;i--){if(S.xp>=XP_THRESHOLDS[i]){S.level=i+1;break;}}
  save();
  updateTopbar();
  if(x!==undefined)floatXP('+'+amt+' XP',x,y);
}
function updateTopbar(){
  const lv=S.level;
  const curr=XP_THRESHOLDS[lv-1]||0;
  const next=XP_THRESHOLDS[lv]||9999;
  const pct=Math.min(100,Math.round((S.xp-curr)/(next-curr)*100));
  // legacy hidden elements (JS still writes to them)
  document.getElementById('lvl-label').textContent='Level '+lv+' · '+LEVEL_TITLES[Math.min(lv,10)-1];
  document.getElementById('xp-next-label').textContent=(next-S.xp)+' XP to next level';
  document.getElementById('xp-fill').style.width=pct+'%';
  document.getElementById('streak-disp').textContent=S.streak;
  document.getElementById('total-xp-disp').textContent=S.xp;
  // new editorial stats bar
  const statsEl=document.getElementById('topbar-stats-text');
  if(statsEl) statsEl.textContent=`Church History · Level ${lv} · ${S.xp.toLocaleString()} XP · ${S.streak}D Streak`;
}
function floatXP(txt,x,y){
  const el=document.createElement('div');
  el.className='xp-pop';
  el.textContent=txt;
  el.style.left=x+'px';el.style.top=y+'px';
  document.body.appendChild(el);
  el.style.animation='floatup 1.2s ease forwards';
  setTimeout(()=>el.remove(),1300);
}
function showToast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg;t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),1800);
}

// ═══════════════════════════════════════════
// TRACK DATA
// ═══════════════════════════════════════════
const TRACKS=[
  {
    id:'track1',
    name:'Survey of Church History',
    eyebrow:'Foundations — General Survey',
    desc:'A sweeping introduction to church history from Pentecost to the present day.',
    icon:'ti-book-2',
    pills:['Early Church','Medieval','Reformation','Modern'],
    lessons:[
      {id:'l1',name:'The Early Church & Persecution',meta:'12 questions · Centuries 1–3',questions:L1_QUESTIONS(),readMeta:'~3 min read · Sections I–II'},
      {id:'l2',name:'Councils & Creeds',meta:'12 questions · 4th–5th century',questions:L2_QUESTIONS(),readMeta:'~2 min read · Section III'},
      {id:'l3',name:'Medieval Church & Schism',meta:'12 questions · 6th–15th century',questions:L3_QUESTIONS(),readMeta:'~2 min read · Section IV'},
      {id:'l4',name:'Reformation & Modern Era',meta:'12 questions · 16th–20th century',questions:L4_QUESTIONS(),readMeta:'~3 min read · Sections V–VI'},
    ]
  },
  {id:'track2',name:'The Reformation Era',eyebrow:'Eras — Reformation',desc:'Luther, Calvin, Zwingli, and the fracturing of Western Christianity.',icon:'ti-flame',pills:['Luther','Calvin','Zwingli','Anabaptists'],lessons:[]},
  {
    id:'track3',
    name:'The Medieval Church',
    eyebrow:'Eras — Medieval Era',
    desc:'Monasticism, papal power, the Great Schism, the Crusades, and scholastic theology.',
    icon:'ti-building-church',
    pills:['Monasticism','Papacy','Schism','Scholasticism'],
    lessons:[
      {id:'l0',name:'The Medieval Church',eraLabel:'c. 500–1500',essayTitle:'The Medieval Church — A Thousand-Year Bridge',meta:'8 questions · Overview',questions:M0_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l1',name:'Justinian I',eraLabel:'527–565',essayTitle:'Justinian I — Emperor, Lawgiver, Builder',meta:'8 questions · 6th century',questions:M1_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l2',name:'Benedict & the Holy Rule',eraLabel:'c. 480–547',essayTitle:'Benedict of Nursia — The Patriarch of Monasticism',meta:'8 questions · 6th century',questions:M2_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l4',name:'Gregory the Great',eraLabel:'590–604',essayTitle:'Gregory the Great — Servant of the Servants of God',meta:'8 questions · 6th–7th century',questions:M4_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l5',name:'Mohammed & the Rise of Islam',eraLabel:'7th c.',essayTitle:'Mohammed & the Rise of Islam',meta:'8 questions · 7th century',questions:M5_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l6',name:'The Synod of Whitby',eraLabel:'664',essayTitle:'The Synod of Whitby — Tonsures and Easter while Islam Swept',meta:'8 questions · 7th century',questions:M6_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l31',name:'Maximus the Confessor',eraLabel:'c. 580–662',essayTitle:'Maximus the Confessor — The Two Wills of Christ',meta:'8 questions · 7th century',questions:M31_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l7',name:'The Iconoclastic Controversy',eraLabel:'726–787',essayTitle:'The Iconoclastic Controversy & the Second Council of Nicaea',meta:'8 questions · 8th century',questions:M7_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l8',name:'Boniface, Apostle of the Germans',eraLabel:'c. 680–754',essayTitle:'Boniface — Apostle of the Germans',meta:'8 questions · 8th century',questions:M8_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l9',name:'Olopan & the Gospel in China',eraLabel:'635–845',essayTitle:'Olopan & the Luminous Religion in Tang China',meta:'8 questions · 7th–9th century',questions:M9_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l10',name:'Nicholas I, Photios & the Filioque',eraLabel:'858–867',essayTitle:'Nicholas I, Photios & the Filioque',meta:'8 questions · 9th century',questions:M10_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l11',name:'Cyril & Methodius',eraLabel:'862–885',essayTitle:'Cyril & Methodius — Apostles to the Slavs',meta:'8 questions · 9th century',questions:M11_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l12',name:'Gottschalk & Ratramnus',eraLabel:'9th c.',essayTitle:'Gottschalk, Ratramnus & the Recovery of Augustine',meta:'8 questions · 9th century',questions:M12_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l13',name:'The Dark Ages',eraLabel:'10th c.',essayTitle:'The Dark Ages — Pornocracy, Raiders & Otto the Great',meta:'8 questions · 10th century',questions:M13_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l14',name:'The Cluniac Reform',eraLabel:'910–1109',essayTitle:'The Cluniac Reform — A Monastery Answering Only to Rome',meta:'8 questions · 10th–11th century',questions:M14_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l15',name:'Vladimir & the Baptism of Russia',eraLabel:'988',essayTitle:'Vladimir & the Baptism of Russia',meta:'8 questions · 10th century',questions:M15_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l16',name:'The Great Schism of 1054',eraLabel:'1054',essayTitle:'The Great Schism — East and West Break Communion',meta:'8 questions · 11th century',questions:M16_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l17',name:'Anselm & Cur Deus Homo',eraLabel:'1033–1109',essayTitle:'Anselm of Canterbury — Why the God-Man',meta:'8 questions · 11th century',questions:M17_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l18',name:'Gregory VII & the Investiture Controversy',eraLabel:'1073–1122',essayTitle:'Gregory VII & the Investiture Controversy',meta:'8 questions · 11th–12th century',questions:M18_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l19',name:'The Crusades',eraLabel:'1095–1291',essayTitle:'The Crusades — The Church Takes Up the Sword',meta:'8 questions · 11th–13th century',questions:M19_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l20',name:'Abelard, Lombard & Scholastic Method',eraLabel:'12th c.',essayTitle:'Abelard, Lombard & the Scholastic Method',meta:'8 questions · 12th century',questions:M20_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l21',name:'Peter Waldo & the Waldenses',eraLabel:'1173–1184',essayTitle:'Peter Waldo & the Waldenses — Vernacular Scripture, Voluntary Poverty',meta:'8 questions · 12th century',questions:M21_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l22',name:'Francis of Assisi',eraLabel:'1182–1226',essayTitle:'Francis of Assisi — Lady Poverty & the Friars Minor',meta:'8 questions · 13th century',questions:M22_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l23',name:'The Mendicant Orders',eraLabel:'1215–1256',essayTitle:'The Mendicant Orders — Dominicans, Augustinians & Carmelites',meta:'8 questions · 13th century',questions:M23_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l24',name:'Thomas Aquinas',eraLabel:'1225–1274',essayTitle:'Thomas Aquinas — Philosophy as Handmaiden of Theology',meta:'8 questions · 13th century',questions:M24_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l25',name:'Boniface VIII & the Avignon Captivity',eraLabel:'1302–1377',essayTitle:'Boniface VIII & the Avignon Captivity',meta:'8 questions · 14th century',questions:M25_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l26',name:'Catherine of Siena & the Papal Schism',eraLabel:'1377–1417',essayTitle:'Catherine of Siena & the Western Schism',meta:'8 questions · 14th–15th century',questions:M26_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l27',name:'John Wycliffe',eraLabel:'c. 1330–1384',essayTitle:'John Wycliffe — Morning Star of the Reformation',meta:'8 questions · 14th century',questions:M27_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l28',name:'The Renaissance & Ad Fontes',eraLabel:'15th c.',essayTitle:'The Renaissance & Ad Fontes — Recovering Greek and Hebrew',meta:'8 questions · 15th century',questions:M28_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l29',name:'Jan Huss',eraLabel:'c. 1369–1415',essayTitle:'Jan Huss — The Goose Burned at Constance',meta:'8 questions · 15th century',questions:M29_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l30',name:'Savonarola',eraLabel:'1452–1498',essayTitle:'Savonarola — Florence, the Bonfires & the Borgia Pope',meta:'8 questions · 15th century',questions:M30_QUESTIONS(),readMeta:'~2 min read'},
    ]
  },
  {id:'track4',name:'Baptist History',eyebrow:'Traditions — Baptist Tradition',desc:'From the English Separatists to Spurgeon and the modern Baptist movement.',icon:'ti-droplet',pills:['Separatists','1689 Confession','Spurgeon','Missions'],lessons:[]},
  {
    id:'track6',
    name:'Introduction to Church History',
    eyebrow:'Foundations — Introduction',
    desc:'Ten short lessons answering "why does church history matter?" — each grounded in a moment that makes the answer concrete.',
    icon:'ti-door-enter',
    pills:['Why History','Heresy','Faithfulness','Our Story'],
    lessons:[
      {id:'i1', name:'History Is a Command',                eraLabel:'1 Cor 10',    essayTitle:'History Is a Command, Not a Hobby',                  meta:'~2 min · Read & Learn', questions:[], readMeta:'~2 min read'},
      {id:'i2', name:'The Bible Is Church History',         eraLabel:'Acts',        essayTitle:'The Bible Itself Is Church History',                 meta:'~2 min · Read & Learn', questions:[], readMeta:'~2 min read'},
      {id:'i3', name:'God Is Lord of History',              eraLabel:'AD 64–313',   essayTitle:'God Is Lord of History',                              meta:'~2 min · Read & Learn', questions:[], readMeta:'~2 min read'},
      {id:'i4', name:'Guard Against Heresy',                eraLabel:'325 AD',      essayTitle:'Guard Against Heresy — Old Errors in New Clothes',   meta:'~2 min · Read & Learn', questions:[], readMeta:'~2 min read'},
      {id:'i5', name:'Guard Against Foolish Mistakes',      eraLabel:'1558',        essayTitle:'Guard Against Foolish Mistakes',                      meta:'~2 min · Read & Learn', questions:[], readMeta:'~2 min read'},
      {id:'i6', name:'God Has Never Abandoned His Church',  eraLabel:'1517',        essayTitle:'God Has Never Abandoned His Church',                  meta:'~2 min · Read & Learn', questions:[], readMeta:'~2 min read'},
      {id:'i7', name:"You Have a Family You've Never Met",  eraLabel:'451 AD',      essayTitle:"You Have a Family You've Never Met",                  meta:'~2 min · Read & Learn', questions:[], readMeta:'~2 min read'},
      {id:'i8', name:'Heroes Were Sinners Too',             eraLabel:'1095–1291',   essayTitle:'Heroes Were Sinners Too',                             meta:'~2 min · Read & Learn', questions:[], readMeta:'~2 min read'},
      {id:'i9', name:'The Cloud of Witnesses',              eraLabel:'1555–1558',   essayTitle:'The Cloud of Witnesses — Let Them Push You Forward', meta:'~2 min · Read & Learn', questions:[], readMeta:'~2 min read'},
      {id:'i10',name:'We Are In the Story Too',             eraLabel:'20th–21st c.',essayTitle:'We Are In the Story Too',                             meta:'~2 min · Read & Learn', questions:[], readMeta:'~2 min read'},
    ]
  },
  {
    id:'track5',
    name:'History of the Church in America',
    eyebrow:'Traditions — American Christianity',
    desc:'From Puritan Massachusetts to the Great Awakening and beyond.',
    icon:'ti-flag',
    pills:['Puritans','Colonial','Great Awakening','Pluralism'],
    lessons:[
      {id:'l1',name:'Colonial Foundations I',eraLabel:'1607–1619',essayTitle:'Colonial Foundations I — Anglican Virginia',meta:'9 questions · 1607–1619',questions:A1_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l2',name:'Colonial Foundations II',eraLabel:'1620–1636',essayTitle:'Colonial Foundations II — Pilgrims & Puritans',meta:'11 questions · 1620–1636',questions:A2_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l3',name:'Dissent & Toleration',eraLabel:'1636–1681',essayTitle:'Dissent & Toleration',meta:'10 questions · 1636–1681',questions:A3_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l4',name:'Decline & Crisis',eraLabel:'1662–1692',essayTitle:'Decline & Crisis — Half-Way Covenant & Salem',meta:'9 questions · 1662–1692',questions:A4_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l5',name:'The First Awakening I',eraLabel:'1720–1738',essayTitle:'The First Awakening I — Embers Before the Blaze',meta:'10 questions · 1720–1738',questions:A5_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l6',name:'The First Awakening II',eraLabel:'1739–1746',essayTitle:'The First Awakening II — The Grand Itinerant',meta:'10 questions · 1739–1746',questions:A6_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l7',name:'The First Awakening III',eraLabel:'1742–1760',essayTitle:'The First Awakening III — Its Legacies',meta:'9 questions · 1742–1760',questions:A7_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l8',name:'Religion & the Revolution',eraLabel:'1763–1776',essayTitle:'Religion & the Revolution — The Patriot Pulpit',meta:'8 questions · 1763–1776',questions:A8_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l9',name:'Disestablishment in Virginia',eraLabel:'1776–1786',essayTitle:'Disestablishment in Virginia — The Statute for Religious Freedom',meta:'9 questions · 1776–1786',questions:A9_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l10',name:'The Constitution & the First Amendment',eraLabel:'1787–1791',essayTitle:'The Constitution & the First Amendment',meta:'9 questions · 1787–1791',questions:A10_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l11',name:'The Second Awakening I',eraLabel:'1790–1805',essayTitle:'The Second Awakening I — Cane Ridge & the Frontier',meta:'9 questions · 1790–1805',questions:A11_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l12',name:'The Second Awakening II',eraLabel:'1784–1830',essayTitle:'The Second Awakening II — Circuit Riders',meta:'9 questions · 1784–1830',questions:A12_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l13',name:'Finney & the Burned-Over District',eraLabel:'1820–1840',essayTitle:'Finney & the Burned-Over District',meta:'9 questions · 1820–1840',questions:A13_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l14',name:'Critics of the Revival',eraLabel:'1843–1860',essayTitle:'Critics of the Revival — Hodge, Nevin & the Mercersburg Theology',meta:'9 questions · 1843–1860',questions:A14_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l15',name:'New Ideas',eraLabel:'1830–1875',essayTitle:'New Ideas — Mormonism, Millerism & Dispensationalism',meta:'9 questions · 1830–1875',questions:A15_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l16',name:"The Second Awakening's Legacy",eraLabel:'1820–1850',essayTitle:"The Second Awakening's Legacy — Reform & Abolitionism",meta:'9 questions · 1820–1850',questions:A16_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l17',name:'The Churches Divide Over Slavery',eraLabel:'1831–1845',essayTitle:'The Churches Divide Over Slavery',meta:'9 questions · 1831–1845',questions:A17_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l18',name:'Abolitionists & Black Christians',eraLabel:'1831–1861',essayTitle:'Abolitionists & Black Christians — the Bible War',meta:'9 questions · 1831–1861',questions:A18_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l19',name:'Lincoln, War & Reconstruction',eraLabel:'1861–1895',essayTitle:'Lincoln, War & Reconstruction',meta:'9 questions · 1861–1895',questions:A19_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l20',name:'Moody & Urban Mass Evangelism',eraLabel:'1873–1899',essayTitle:'Moody & Urban Mass Evangelism',meta:'9 questions · 1873–1899',questions:A20_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l21',name:'The Social Gospel',eraLabel:'1880–1910',essayTitle:'The Social Gospel — Gladden & Rauschenbusch',meta:'8 questions · 1880–1910',questions:A21_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l22',name:'Azusa Street & Pentecostalism',eraLabel:'1901–1909',essayTitle:'Azusa Street & Pentecostalism',meta:'9 questions · 1901–1909',questions:A22_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l23',name:'The Fundamentals & the Coming Storm',eraLabel:'1910–1920',essayTitle:'The Fundamentals & the Coming Storm',meta:'8 questions · 1910–1920',questions:A23_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l24',name:'The Fundamentalist-Modernist Controversy',eraLabel:'1922–1925',essayTitle:'The Fundamentalist-Modernist Controversy',meta:'8 questions · 1922–1925',questions:A24_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l25',name:'The Scopes Trial & Fundamentalist Withdrawal',eraLabel:'1925–1942',essayTitle:'The Scopes Trial & Fundamentalist Withdrawal',meta:'8 questions · 1925–1942',questions:A25_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l26',name:'Neo-Orthodoxy & Christian Realism',eraLabel:'1919–1960',essayTitle:'Neo-Orthodoxy & Christian Realism — Barth & Niebuhr',meta:'5 questions · 1919–1960',questions:A26_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l27',name:'Neo-Evangelicalism & Billy Graham',eraLabel:'1942–1960',essayTitle:'Neo-Evangelicalism & Billy Graham',meta:'5 questions · 1942–1960',questions:A27_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l28',name:'The Civil Rights Movement & the Black Church',eraLabel:'1955–1968',essayTitle:'The Civil Rights Movement & the Black Church',meta:'6 questions · 1955–1968',questions:A28_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l29',name:'Vatican II & Catholic Transformation',eraLabel:'1962–1965',essayTitle:'Vatican II & Catholic Transformation',meta:'5 questions · 1962–1965',questions:A29_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l30',name:'The Religious Right & the Culture Wars',eraLabel:'1973–1989',essayTitle:'The Religious Right & the Culture Wars',meta:'5 questions · 1973–1989',questions:A30_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l31',name:'Megachurches, Pentecostal Growth & the Rise of the Nones',eraLabel:'1970–Present',essayTitle:'Megachurches, Pentecostal Growth & the Rise of the Nones',meta:'5 questions · 1970–Present',questions:A31_QUESTIONS(),readMeta:'~2 min read'},
      {id:'l32',name:'The Bible Wars',eraLabel:'1970s–1990s',essayTitle:'The Bible Wars — Inerrancy, Historical Criticism & the Authority of Scripture',meta:'10 questions · 1970s–1990s',questions:A32_QUESTIONS(),readMeta:'~2 min read'},
    ]
  },
];

const COMING_SOON_TRACKS=[
  {id:'beginner-intro',name:'Introduction to Church History',eyebrow:'Foundations — Introduction',desc:'What is the church, why does its history matter, and how do we read it faithfully?',icon:'ti-door-enter',pills:['What is the Church','Why History Matters','Reading History','Key Terms']},
  {id:'medium-early',name:'Early Church',eyebrow:'Eras — Early Church',desc:'A deep dive into the apostolic fathers, councils, creeds, and the church before Christendom.',icon:'ti-columns',pills:['Apostolic Fathers','Councils','Creeds','Persecution']},
  {id:'medium-medieval',name:'Medieval Church',eyebrow:'Eras — Medieval Era',desc:'Monasticism, the Great Schism, the Crusades, and scholastic theology.',icon:'ti-building-church',pills:['Monasticism','Schism','Crusades','Scholasticism']},
  {id:'medium-modern',name:'Modern Church',eyebrow:'Eras — Modern Era',desc:'Revivals, missions, liberalism, and the church in the 19th and 20th centuries.',icon:'ti-globe',pills:['Revivals','Missions','Liberalism','Neo-orthodoxy']},
  {id:'traditions-america',name:'History of the Church in America',eyebrow:'Traditions — American Christianity',desc:'From the Puritan settlements to the evangelical movement and beyond.',icon:'ti-flag',pills:['Puritans','Great Awakening','Frontier','Evangelicalism']},
  {id:'deep-dives-puritans',name:'The Puritans',eyebrow:'Deep Dives — Puritanism',desc:'Covenant theology, Westminster, New England Puritanism, and Jonathan Edwards.',icon:'ti-book',pills:['Covenant Theology','Westminster','New England','Edwards']},
  {id:'deep-dives-scholasticism',name:'Protestant Scholasticism',eyebrow:'Deep Dives — Reformed Scholasticism',desc:'The post-Reformation scholastic tradition: Turretin, Voetius, and federal theology.',icon:'ti-school',pills:['Turretin','Voetius','Federal Theology','Metaphysics']},
];

const DIFFICULTY_GROUPS=[
  {id:'foundations',label:'Foundations',desc:'An introduction to church history. Start here.',tracks:[
    TRACKS.find(t=>t.id==='track6'),
    TRACKS.find(t=>t.id==='track1'),
  ]},
  {id:'eras',label:'Eras',desc:'Deeper dives into the major eras of church history.',tracks:[
    COMING_SOON_TRACKS[1],
    TRACKS.find(t=>t.id==='track3'),
    TRACKS.find(t=>t.id==='track2'),
    COMING_SOON_TRACKS[3],
  ]},
  {id:'traditions',label:'Traditions',desc:'Study the distinct traditions that shaped global Christianity.',tracks:[
    TRACKS.find(t=>t.id==='track5'),
    TRACKS.find(t=>t.id==='track4'),
  ]},
  {id:'deep-dives',label:'Deep Dives',desc:'Advanced study of specialized theological traditions.',tracks:[
    COMING_SOON_TRACKS[5],
    COMING_SOON_TRACKS[6],
  ]},
];

const AMERICA_ERA_CHECKS=[
  {id:'ec1',afterLessonIdx:9, label:'Era Check I',   pool:A_ERA_EVENTS_1},
  {id:'ec2',afterLessonIdx:19,label:'Era Check II',  pool:A_ERA_EVENTS_2},
  {id:'ec3',afterLessonIdx:30,label:'Era Check III', pool:A_ERA_EVENTS_3},
];

const AMERICA_PERSON_CHECKS=[
  {id:'pc1',afterLessonIdx:4, label:'Person Check I',   pool:A_PERSON_POOL_1},
  {id:'pc2',afterLessonIdx:14,label:'Person Check II',  pool:A_PERSON_POOL_2},
  {id:'pc3',afterLessonIdx:24,label:'Person Check III', pool:A_PERSON_POOL_3},
];

// ═══════════════════════════════════════════
// LEARN DATA
// ═══════════════════════════════════════════
const L1_LEARN=[
  // ── Tier 1 ──────────────────────────────────────────────────────────────
  {sentence:"The early church was born inside the borders of the _____ Empire.",answer:"Roman",options:["Roman","Ottoman","British","Aztec"],explanation:"The entire story of the early church — Jerusalem, Antioch, Corinth, Rome — unfolded within the Roman Empire.",tier:1},
  {sentence:"Peter preached his first sermon and the church began in the city of _____.",answer:"Jerusalem",options:["Jerusalem","London","Rome","Cairo"],explanation:"The church was born in Jerusalem on the day of Pentecost, when Peter preached and 3,000 were baptized.",tier:1},
  {sentence:"Paul's letters, written in the 50s AD, are the _____ surviving Christian documents — older than the Gospels themselves.",answer:"oldest",options:["oldest","longest","most copied","most disputed"],explanation:"The reading states that Paul's letters, written in the 50s AD, are the oldest surviving Christian documents, predating the four Gospels.",tier:1},
  {sentence:"Tertullian of Carthage coined the word _____ (Trinity) and the formula 'one substance, three persons.'",answer:"Trinitas",options:["Trinitas","Ecclesia","Logos","Fides"],explanation:"The article credits Tertullian with inventing the word Trinitas and the formula 'one substance, three persons' — effectively creating Western theological vocabulary.",tier:1},
  {sentence:"Emperor Nero blamed Christians for the Great Fire of _____ in 64 AD.",answer:"Rome",options:["Rome","London","Athens","Paris"],explanation:"Nero used Christians as scapegoats for the Great Fire of Rome in 64 AD, executing them with theatrical cruelty.",tier:1},
  {sentence:"The Holy Spirit fell on the disciples on the day of _____.",answer:"Pentecost",options:["Pentecost","Christmas","Easter","Halloween"],explanation:"Pentecost — fifty days after Passover — is when the Spirit fell and Peter preached, with 3,000 baptized that day.",tier:1},
  {sentence:"According to Acts, about _____ people were baptized after Peter's sermon on Pentecost.",answer:"3,000",options:["3,000","3 million","30","3 billion"],explanation:"Acts 2:41 records that about three thousand were added to the church on Pentecost — the explosive birth of the Christian movement.",tier:1},
  {sentence:"The article says within two _____ of Pentecost, Christian communities existed as far away as the empire's capital.",answer:"decades",options:["decades","centuries","years","generations"],explanation:"The article states: 'Within two decades, communities of believers existed in Jerusalem, Antioch, Corinth, Ephesus, and Rome itself' — a remarkably rapid expansion.",tier:1},
  {sentence:"Polycarp of Smyrna was a disciple of the Apostle _____, making him a direct link to the eyewitness generation.",answer:"John",options:["John","Peter","Paul","James"],explanation:"The article states Polycarp was a disciple of the Apostle John — a living bridge between the apostles and the next generation.",tier:1},
  {sentence:"Ignatius wrote his famous letters while being transported under guard to _____ for execution.",answer:"Rome",options:["Rome","Jerusalem","Antioch","Athens"],explanation:"Ignatius was arrested in Antioch and escorted to Rome, writing letters to churches along his route before being martyred there.",tier:1},
  // ── Tier 2 ──────────────────────────────────────────────────────────────
  {sentence:"Christians were considered politically dangerous by Rome primarily because they refused to offer _____ to the emperor's image.",answer:"incense",options:["incense","taxes","military service","tribute"],explanation:"Refusing to honor the emperor's image was read as treason — Christians saw it as idolatry, Rome saw it as civic disloyalty.",tier:2},
  {sentence:"Early Christian writers who composed sophisticated defenses of the faith to Roman emperors were called _____.",answer:"Apologists",options:["Apologists","Martyrs","Gnostics","Deacons"],explanation:"Justin Martyr, Tertullian, and Origen argued Christianity was philosophically serious and Christians were loyal citizens.",tier:2},
  {sentence:"Tertullian's famous paradox was that 'The _____ of the martyrs is the seed of the church' — persecution spread the faith.",answer:"blood",options:["blood","courage","death","witness"],explanation:"The article quotes Tertullian's famous line directly: 'The blood of the martyrs is the seed of the church.'",tier:2},
  {sentence:"John wrote the book of Revelation while exiled to the island of _____ under Emperor Domitian.",answer:"Patmos",options:["Patmos","Cyprus","Crete","Malta"],explanation:"The article's key dates box states: 'Domitian persecution; John writes Revelation from Patmos' around AD 95.",tier:2},
  {sentence:"Romans accused early Christians of _____ — a misreading of the Eucharistic language about eating flesh and drinking blood.",answer:"cannibalism",options:["cannibalism","treason","arson","sorcery"],explanation:"The article says Christians were accused of atheism, cannibalism, and political sedition — the cannibalism charge arose from misunderstanding of Eucharistic practice.",tier:2},
  {sentence:"The three Apologists mentioned in the article are Justin Martyr, Origen, and _____.",answer:"Tertullian",options:["Tertullian","Polycarp","Ignatius","Clement"],explanation:"The article lists Justin Martyr, Tertullian, and Origen as the Apologists who wrote sophisticated defenses of Christianity to Roman emperors.",tier:2},
  {sentence:"Peter and Paul were both martyred in _____ during the Neronian persecution of 64–68 AD.",answer:"Rome",options:["Rome","Jerusalem","Antioch","Athens"],explanation:"The article's key dates box records 'Neronian persecution; Peter and Paul martyred in Rome' under 64–68 AD.",tier:2},
  {sentence:"The Council of Jerusalem, where early disputes were first resolved, took place around _____ AD.",answer:"48",options:["48","70","95","30"],explanation:"The article's key dates box lists 'Paul's first missionary journey; Council of Jerusalem' at c. 48 AD.",tier:2},
  {sentence:"Polycarp of Smyrna refused to _____ Christ before the Roman magistrate and was burned alive.",answer:"renounce",options:["renounce","honor","worship","deny"],explanation:"The article states Polycarp 'refused at eighty-six to curse Christ before the magistrate' — his martyrdom is one of the earliest detailed accounts outside the New Testament.",tier:2},
  {sentence:"Ignatius wrote _____ letters to churches while being escorted to Rome under armed guard.",answer:"seven",options:["seven","three","twelve","four"],explanation:"Ignatius's seven letters — written along his route to martyrdom — are among the earliest evidence of episcopal church structure.",tier:2},
  // ── Tier 3 ──────────────────────────────────────────────────────────────
  {sentence:"Though the church was born in Jerusalem, _____ became the first great Gentile Christian center and Paul's missionary base.",answer:"Antioch",options:["Antioch","Rome","Corinth","Ephesus"],explanation:"The term 'Christian' was first used in Antioch (Acts 11:26). It was the base of Paul's three missionary journeys.",tier:3},
  {sentence:"Rome destroyed Jerusalem and the Temple in _____ AD, scattering the Jewish-Christian community.",answer:"70",options:["70","64","95","135"],explanation:"In 70 AD Roman armies destroyed Jerusalem and the Temple — a catastrophic event recorded in the article's key dates box.",tier:3},
  {sentence:"The article states that Paul's letters 'would eventually become half the _____' — the largest literary legacy of any New Testament figure.",answer:"New Testament",options:["New Testament","Old Testament","Bible","canon"],explanation:"The article credits Paul with planting churches and writing letters that 'would eventually become half the New Testament.'",tier:3},
  {sentence:"The article records that Paul's first missionary journey and the Council of _____ both occurred around 48 AD.",answer:"Jerusalem",options:["Jerusalem","Antioch","Corinth","Rome"],explanation:"The key dates box in the article lists both events — Paul's first missionary journey and the Council of Jerusalem — at c. 48 AD.",tier:3},
  {sentence:"The article says Polycarp declared he had served Christ for _____ years before being burned alive.",answer:"86",options:["86","70","94","60"],explanation:"The article's pull-quote records Polycarp's words: 'Eighty-six years I have served him, and he has done me no wrong. How can I blaspheme my King?'",tier:3},
  {sentence:"Polycarp served as bishop of _____, the city whose church received one of the seven letters in the book of Revelation.",answer:"Smyrna",options:["Smyrna","Antioch","Ephesus","Philippi"],explanation:"The article identifies Polycarp as 'Bishop of Smyrna and disciple of the Apostle John' — Smyrna is one of the seven churches in Revelation.",tier:3},
  {sentence:"The article says Christians were accused of _____ — meaning they denied the traditional Roman gods — as well as cannibalism and sedition.",answer:"atheism",options:["atheism","disloyalty","cowardice","superstition"],explanation:"The article lists three specific charges against Christians: 'atheism, cannibalism, and political sedition' — all reflecting Roman misunderstanding of Christian worship.",tier:3},
  {sentence:"The article says the Apologists included Justin Martyr, Tertullian, and _____ — who all argued Christianity was philosophically serious.",answer:"Origen",options:["Origen","Polycarp","Ignatius","Clement"],explanation:"The article names all three: 'Thinkers called the Apologists — Justin Martyr, Tertullian, Origen — wrote sophisticated defenses of Christianity.'",tier:3},
  {sentence:"According to the article, the first Christians expected Jesus to return _____ — and when he did not, hard questions about organization and belief emerged.",answer:"quickly",options:["quickly","in their lifetime","within a generation","soon"],explanation:"The article states 'The first Christians expected Jesus to return quickly. When he did not, hard questions emerged: How do we organize? What do we believe?'",tier:3},
];

const L2_LEARN=[
  // ── Tier 1 ──────────────────────────────────────────────────────────────
  {sentence:"The _____ Creed was produced at the council of 325 AD to condemn the teaching of Arius.",answer:"Nicene",options:["Nicene","Apostles'","Athanasian","Chalcedonian"],explanation:"The Council of Nicaea in 325 produced the Nicene Creed to refute Arius's claim that the Son was a created being.",tier:1},
  {sentence:"Arius taught that the Son was _____ by the Father — not eternal, but having a beginning in time.",answer:"created",options:["created","adopted","inspired","diminished"],explanation:"Arius's slogan was 'there was a time when he was not' — the Son was a creature, not co-eternal with the Father.",tier:1},
  {sentence:"Emperor Constantine convened the Council of Nicaea in _____ to resolve the Arian controversy.",answer:"325",options:["325","313","381","451"],explanation:"Constantine called the council primarily to unify the empire — the Arian dispute threatened imperial stability, not just theology.",tier:1},
  {sentence:"The Edict of Milan in 313 AD transformed Christianity from a persecuted sect into the religion of the Roman Empire within a single _____.",answer:"generation",options:["generation","century","decade","year"],explanation:"The article states the church 'went from persecuted minority to imperial establishment in a single generation' — all within the lifespan of people who had known persecution.",tier:1},
  {sentence:"The Council of _____ in 451 defined that Christ has two complete natures — divine and human — in one person.",answer:"Chalcedon",options:["Chalcedon","Nicaea","Constantinople","Ephesus"],explanation:"Chalcedon defined the hypostatic union: Christ is fully divine and fully human, two natures in one person without mixture.",tier:1},
  {sentence:"Athanasius defended Nicene orthodoxy so persistently he earned the title 'Athanasius contra _____.'",answer:"mundum",options:["mundum","omnia","errorem","tempora"],explanation:"'Athanasius against the world' — he was exiled five times by emperors seeking compromise, yet outlasted all of them.",tier:1},
  {sentence:"Before the battle that won him the empire, Constantine reportedly saw a _____ — an event the article presents as pivotal to his embrace of Christianity.",answer:"vision",options:["vision","dream","sign","cross"],explanation:"The article states that 'In 312 AD, the general Constantine reportedly saw a vision before battle and won the empire' — leading directly to the Edict of Milan in 313.",tier:1},
  {sentence:"At Ephesus in 431, Mary was declared _____ — meaning 'God-bearer' — to protect the unity of Christ's person.",answer:"Theotokos",options:["Theotokos","Christotokos","Pneumatokos","Theophoros"],explanation:"The article states Ephesus declared Mary Theotokos to affirm 'the unity of Christ's person' — it was a Christological statement, not primarily about Mary.",tier:1},
  {sentence:"Arius captured his teaching in the slogan: 'There was a _____ when he was not.'",answer:"time",options:["time","place","reason","moment"],explanation:"This slogan is the clearest summary of Arianism: the Son had a beginning — he was the Father's first creation, not co-eternal God.",tier:1},
  {sentence:"Constantine reportedly saw a vision in _____ AD, the year before he legalized Christianity with the Edict of Milan.",answer:"312",options:["312","313","325","380"],explanation:"The article says 'In 312 AD, the general Constantine reportedly saw a vision before battle and won the empire.' The Edict of Milan followed in 313.",tier:1},
  // ── Tier 2 ──────────────────────────────────────────────────────────────
  {sentence:"The Greek term _____ means 'of one substance' and was the key word used at Nicaea to define the Son's equality with the Father.",answer:"homoousios",options:["homoousios","homoiousios","hypostasis","theotokos"],explanation:"Homoousios was chosen precisely because homoiousios ('of similar substance') — differing by one Greek letter — was too ambiguous.",tier:2},
  {sentence:"The council that declared Mary the 'God-bearer' (Theotokos) and condemned Nestorius was the Council of _____ in 431.",answer:"Ephesus",options:["Ephesus","Nicaea","Constantinople","Chalcedon"],explanation:"Ephesus affirmed Theotokos to protect Christology — if Christ is truly God, then his mother bore God.",tier:2},
  {sentence:"Athanasius was exiled _____ times for defending Nicene orthodoxy against emperors who favored Arianism.",answer:"five",options:["five","three","two","seven"],explanation:"Five exiles across multiple emperors — yet Athanasius outlasted them all, cementing the Nicene formula as orthodoxy.",tier:2},
  {sentence:"According to the article, Constantine convened the Council of Nicaea primarily to resolve a dispute that threatened _____ stability, not just theology.",answer:"imperial",options:["imperial","theological","episcopal","regional"],explanation:"The article says 'Constantine convened the First Council of Nicaea in 325 AD to resolve the Arian crisis' — the Arian dispute threatened imperial stability.",tier:2},
  {sentence:"The Council of Constantinople in _____ completed the Nicene Creed by adding a full affirmation of the Holy Spirit's divinity.",answer:"381",options:["381","325","431","451"],explanation:"The creed was first drafted at Nicaea (325), but finalized at Constantinople (381) with a robust statement on the Spirit.",tier:2},
  {sentence:"The article says Athanasius 'outlasted every _____ who opposed him' — surviving five exiles to see Nicene orthodoxy triumph.",answer:"emperor",options:["emperor","bishop","council","rival"],explanation:"The article describes Athanasius's lonely endurance: 'He outlasted every emperor who opposed him' — his survival was as significant as his theology.",tier:2},
  {sentence:"The Council of Chalcedon in 451 defined the hypostatic union: Christ has two natures in _____ person.",answer:"one",options:["one","two","three","four"],explanation:"The article states Chalcedon defined 'the hypostatic union: Christ has two complete natures — fully divine, fully human — in one person, without mixture or confusion.'",tier:2},
  {sentence:"Nestorius was condemned at Ephesus (431) for effectively dividing Christ into two distinct _____ — one divine and one human.",answer:"persons",options:["persons","natures","wills","souls"],explanation:"Nestorius distinguished the divine Logos from the human Jesus so sharply that critics said he worshiped two Sons. Ephesus condemned this as a division of Christ's one person.",tier:2},
  {sentence:"The article says Chalcedon defined the hypostatic union as two natures in one person 'without _____ or confusion.'",answer:"mixture",options:["mixture","separation","addition","reduction"],explanation:"The article quotes the Chalcedonian formula: Christ has two complete natures in one person 'without mixture or confusion' — ruling out any blending of the divine and human.",tier:2},
  {sentence:"The article's figure caption identifies Constantine as the emperor who legalized Christianity with the Edict of Milan in _____ AD.",answer:"313",options:["313","312","325","380"],explanation:"The figure caption states: 'In 313 AD Constantine legalized Christianity with the Edict of Milan, transforming the faith from a persecuted sect into the religion of the Roman Empire.'",tier:2},
  // ── Tier 3 ──────────────────────────────────────────────────────────────
  {sentence:"The article says Constantine 'reportedly saw a vision before battle' in 312 AD and then won the _____.",answer:"empire",options:["empire","battle","East","throne"],explanation:"The article states: 'In 312 AD, the general Constantine reportedly saw a vision before battle and won the empire' — linking the vision directly to his rise to sole power.",tier:3},
  {sentence:"The Theotokos controversy at Ephesus was fundamentally about the _____ of Christ, not the veneration of Mary.",answer:"identity",options:["identity","birth","divinity","humanity"],explanation:"Theotokos ('God-bearer') was affirmed to protect Christology — if Mary bore only a human, that implied a divided or merely adopted Christ.",tier:3},
  {sentence:"The article says that after Constantine won the empire in 312, the church went from persecuted _____ to imperial establishment within a single generation.",answer:"minority",options:["minority","religion","movement","sect"],explanation:"The article states: 'The church went from persecuted minority to imperial establishment in a single generation' — one of the most dramatic reversals in religious history.",tier:3},
  {sentence:"Chalcedon defined that Christ is fully divine and fully human — two complete natures in one person 'without mixture or _____.'",answer:"confusion",options:["confusion","separation","division","change"],explanation:"The article quotes Chalcedon's formula directly: Christ has two natures in one person 'without mixture or confusion' — a precise ruling against both Nestorianism and its opposite.",tier:3},
  {sentence:"The article presents Athanasius as the great defender of _____ orthodoxy — exiled five times, yet never recanting.",answer:"Nicene",options:["Nicene","Arian","Alexandrian","Eastern"],explanation:"The article says 'The great defender of Nicene orthodoxy was Athanasius of Alexandria' — the Nicene formula he defended eventually triumphed over Arianism.",tier:3},
  {sentence:"Arius taught that the Son was _____ to the Father — meaning not co-equal, but dependent and derivative.",answer:"subordinate",options:["subordinate","identical","superior","unrelated"],explanation:"If the Son was created, he was by definition less than the Father — a subordinate being, not the same God revealing himself.",tier:3},
  {sentence:"The article describes the Nicene Creed as the product of a council convened by _____ in 325 AD to resolve the Arian crisis.",answer:"Constantine",options:["Constantine","Athanasius","Leo I","Theodosius"],explanation:"The article states 'Constantine convened the First Council of Nicaea in 325 AD to resolve the Arian crisis' — he called the council, not a church leader.",tier:3},
  {sentence:"The Nicene Creed was first drafted at Nicaea (325) and then finalized at _____ (381) with a statement on the Holy Spirit.",answer:"Constantinople",options:["Constantinople","Ephesus","Chalcedon","Antioch"],explanation:"The article's key dates box shows the creed's two-stage development: Nicaea defined the Son's nature in 325; Constantinople completed it in 381 with the Spirit's full divinity.",tier:3},
  {sentence:"The article's key dates box records that Ephesus (431) both declared Mary Theotokos and condemned _____ for dividing Christ's person.",answer:"Nestorius",options:["Nestorius","Arius","Donatus","Apollinarius"],explanation:"The key dates box states: 'Ephesus — Mary declared Theotokos; Nestorius condemned' — both actions were two sides of the same Christological ruling.",tier:3},
];

const L3_LEARN=[
  // ── Tier 1 ──────────────────────────────────────────────────────────────
  {sentence:"The word _____ was added by Rome to the Nicene Creed to say the Spirit proceeds from both the Father and the Son.",answer:"filioque",options:["filioque","homoousios","theotokos","ecclesia"],explanation:"Filioque means 'and the Son' in Latin. Rome's unilateral addition to the creed was a major cause of the Great Schism of 1054.",tier:1},
  {sentence:"Benedict of Nursia founded Monte Cassino in 529 and wrote the _____ that shaped Western monasticism for over a millennium.",answer:"Rule",options:["Rule","Creed","Summa","Confessions"],explanation:"The Rule of Benedict balanced prayer, work, and community — becoming the blueprint for Western monastic life for over a thousand years.",tier:1},
  {sentence:"The article says medieval monasteries ran the only _____ in Europe, preserved literacy, and copied manuscripts.",answer:"hospitals",options:["hospitals","schools","libraries","courts"],explanation:"The article states monasteries 'preserved literacy, copied manuscripts, and ran the only hospitals in Europe' as the Roman Empire collapsed in the West.",tier:1},
  {sentence:"Thomas Aquinas wrote the _____ Theologica, a massive synthesis of Aristotelian philosophy and Christian doctrine.",answer:"Summa",options:["Summa","City of","Confessions","Institutes"],explanation:"Aquinas's Summa Theologica (1265–1274) was over 1.5 million words — left unfinished after a mystical experience in 1273.",tier:1},
  {sentence:"The Great Schism of _____ split Christianity into Roman Catholic and Eastern Orthodox branches.",answer:"1054",options:["1054","1378","1415","1095"],explanation:"In 1054, Rome and Constantinople exchanged mutual excommunications over papal authority and filioque — a division never officially healed.",tier:1},
  {sentence:"Jan Hus was burned at the _____ in 1415 despite being promised safe conduct to attend.",answer:"Council of Constance",options:["Council of Constance","Diet of Worms","Council of Trent","Fourth Lateran Council"],explanation:"Hus, influenced by Wycliffe, was condemned and burned at Constance — an act of treachery that sparked the Hussite Wars.",tier:1},
  {sentence:"Pope Leo III crowned Charlemagne Holy Roman Emperor on Christmas Day, _____ AD.",answer:"800",options:["800","529","1054","1095"],explanation:"Charlemagne's Christmas Day coronation in 800 established the pattern of entangled papal and imperial authority that defined medieval Europe.",tier:1},
  {sentence:"Charlemagne was crowned Holy Roman Emperor by Pope _____ on Christmas Day, 800 AD.",answer:"Leo III",options:["Leo III","Gregory I","Innocent III","Urban II"],explanation:"The article states: 'On Christmas Day 800, Charlemagne was crowned Holy Roman Emperor by Pope Leo III' — cementing the entanglement of political and ecclesiastical authority.",tier:1},
  {sentence:"The article says Anselm of Canterbury (1033–1109) developed the _____ theory of atonement.",answer:"satisfaction",options:["satisfaction","ransom","moral influence","penal substitution"],explanation:"The article specifically credits Anselm with developing 'the satisfaction theory of atonement' — arguing only a God-man could provide infinite satisfaction for sin.",tier:1},
  {sentence:"Anselm of Canterbury's work 'Cur Deus Homo' translates as '_____ God Became Man.'",answer:"Why",options:["Why","How","When","That"],explanation:"Cur Deus Homo (c. 1098) argued the Incarnation was logically necessary — only a God-man could provide the infinite satisfaction humanity owed to God for sin.",tier:1},
  // ── Tier 2 ──────────────────────────────────────────────────────────────
  {sentence:"The Great Schism of 1054 was caused by disputes over _____ authority and the filioque addition to the Nicene Creed.",answer:"papal",options:["papal","imperial","monastic","episcopal"],explanation:"Rome's claim to universal jurisdiction over all bishops was as offensive to the East as the theological change to the creed.",tier:2},
  {sentence:"John Wycliffe is historically significant because he translated the Bible into _____ and challenged papal authority.",answer:"English",options:["English","Latin","German","French"],explanation:"Wycliffe's English Bible and attacks on papal power directly influenced Jan Hus and, through him, Luther and the Reformation.",tier:2},
  {sentence:"The article says Wycliffe influenced the Bohemian priest Jan Hus, who was burned in 1415 — an act of treachery that set _____ ablaze.",answer:"Bohemia",options:["Bohemia","England","Germany","Rome"],explanation:"The article states Wycliffe influenced 'the Bohemian priest Jan Hus, who was burned at the Council of Constance in 1415 despite a promise of safe conduct — an act of treachery that set Bohemia ablaze.'",tier:2},
  {sentence:"The article says the Great Schism of 1054 produced two explosive issues: Rome's claim to _____ jurisdiction and the filioque addition.",answer:"universal",options:["universal","imperial","absolute","exclusive"],explanation:"The article states: 'The papacy's claim to universal jurisdiction and Rome's unilateral insertion of filioque into the Nicene Creed were the two explosive issues.'",tier:2},
  {sentence:"The article says Aquinas's Summa Theologica was left _____ after a mystical experience in which he called all his work 'straw.'",answer:"unfinished",options:["unfinished","unpublished","revised","incomplete"],explanation:"The article states Aquinas left the Summa unfinished — near death, after a mystical experience, 'he described his entire life's work as straw.'",tier:2},
  {sentence:"Aquinas synthesized _____ philosophy with Christian theology in the Summa Theologica.",answer:"Aristotelian",options:["Aristotelian","Platonic","Stoic","Neo-Platonic"],explanation:"Aquinas rehabilitated Aristotle — whose philosophy had been viewed as dangerous — as a tool for systematic Christian theology.",tier:2},
  {sentence:"Medieval monasteries played a key role in preserving _____ and ancient texts during the collapse of the Roman Empire.",answer:"literacy",options:["literacy","trade","Roman law","military strategy"],explanation:"Monasteries were the primary centers of manuscript copying, education, and healthcare in early medieval Europe.",tier:2},
  {sentence:"The article says the Great Schism produced _____ excommunications — each side formally condemning the other.",answer:"mutual",options:["mutual","unilateral","papal","imperial"],explanation:"The article states 'The two sides exchanged mutual excommunications, dividing Christianity into Roman Catholic and Eastern Orthodox branches that remain separate to this day.'",tier:2},
  {sentence:"The article says Benedict of Nursia founded _____ in 529 and wrote his Rule that shaped Western monasticism for a thousand years.",answer:"Monte Cassino",options:["Monte Cassino","Cluny","Clairvaux","Canterbury"],explanation:"The article states 'Benedict of Nursia (529) founded Monte Cassino and wrote his Rule, shaping Western monasticism for a thousand years.'",tier:2},
  {sentence:"The article says Charlemagne's coronation cemented the pattern of _____ political and ecclesiastical authority that defined medieval Europe.",answer:"entangled",options:["entangled","competing","unified","separated"],explanation:"The article describes Charlemagne's coronation as 'cementing the pattern of entangled political and ecclesiastical authority that would define medieval Europe and produce endless conflict between popes and kings.'",tier:2},
  // ── Tier 3 ──────────────────────────────────────────────────────────────
  {sentence:"The East's rejection of filioque was not only theological but also procedural — Rome had no right to alter the creed _____.",answer:"unilaterally",options:["unilaterally","permanently","secretly","arbitrarily"],explanation:"The East objected both to the theology and the process: Rome changed a universally agreed creed without an ecumenical council.",tier:3},
  {sentence:"Jan Hus was a direct _____ between Wycliffe and Luther, transmitting reform ideas across a century.",answer:"link",options:["link","rival","critic","student"],explanation:"Wycliffe (d. 1384) → Hus (d. 1415) → Luther (b. 1483) — the reform impulse passed through these figures across a century.",tier:3},
  {sentence:"After a mystical experience in 1273, Aquinas stopped writing and called all his work _____.",answer:"straw",options:["straw","dust","incomplete","insufficient"],explanation:"Aquinas reportedly said: 'All that I have written seems like straw compared to what I have seen.' He died three months later.",tier:3},
  {sentence:"The article says Hus was burned at Constance 'despite a promise of safe conduct' — an act of _____ that set Bohemia ablaze.",answer:"treachery",options:["treachery","error","cowardice","violence"],explanation:"The article calls the burning of Hus 'an act of treachery' — the promise of safe conduct was broken, and the resulting outrage ignited the Hussite Wars in Bohemia.",tier:3},
  {sentence:"The medieval conflict between popes and kings was fundamentally about who held ultimate _____ in Europe.",answer:"authority",options:["authority","land","taxes","armies"],explanation:"The papacy claimed spiritual authority over all temporal rulers — including the power to excommunicate and depose kings — causing endless conflict.",tier:3},
  {sentence:"The Great Schism of 1054 has _____ been officially healed — Rome and Constantinople remain separate communions.",answer:"never",options:["never","recently","formally","almost"],explanation:"Though mutual excommunications were lifted in 1964, Rome and Constantinople remain separate — full communion has never been restored.",tier:3},
  {sentence:"The article says Aquinas's Summa Theologica was over 1.5 million _____ — yet he called it all 'straw' after a mystical experience.",answer:"words",options:["words","pages","chapters","volumes"],explanation:"The article specifies the Summa was 'over 1.5 million words' — an enormous work that Aquinas nonetheless dismissed as 'straw' compared to what he had seen in contemplation.",tier:3},
  {sentence:"The article identifies Anselm of Canterbury's dates as 1033–1109, placing him in the _____ church era rather than the Reformation.",answer:"medieval",options:["medieval","early","modern","patristic"],explanation:"The article explicitly dates Anselm as '1033–1109' and includes him among the great thinkers of 'The Medieval Church (500–1400).'",tier:3},
  {sentence:"The article says the Great Schism of 1054 divided Christianity into Roman Catholic and Eastern _____ branches that remain separate to this day.",answer:"Orthodox",options:["Orthodox","Protestant","Coptic","Armenian"],explanation:"The article states the mutual excommunications divided Christianity 'into Roman Catholic and Eastern Orthodox branches that remain separate to this day.'",tier:3},
];

const L4_LEARN=[
  // ── Tier 1 ──────────────────────────────────────────────────────────────
  {sentence:"Martin Luther published his _____ Theses in 1517, challenging the sale of indulgences.",answer:"95",options:["95","39","12","500"],explanation:"Luther's 95 Theses, circulated on October 31, 1517, challenged indulgences and ignited the Protestant Reformation.",tier:1},
  {sentence:"The Latin phrase 'Sola _____' means 'by Scripture alone' — the Reformation's principle of biblical authority.",answer:"Scriptura",options:["Scriptura","Fide","Gratia","Christus"],explanation:"Sola Scriptura declared the Bible, not tradition or the pope, as the supreme authority for Christian doctrine.",tier:1},
  {sentence:"Luther refused to recant at the Diet of _____ in 1521 and was declared an outlaw of the empire.",answer:"Worms",options:["Worms","Augsburg","Trent","Speyer"],explanation:"Luther's famous stand at Worms — 'Here I stand; I can do no other' — ended in his condemnation and shelter at Wartburg Castle.",tier:1},
  {sentence:"John Calvin published the first edition of his Institutes of the Christian Religion at age _____.",answer:"26",options:["26","32","40","21"],explanation:"Calvin published the Institutes in 1536 at just 26 — in Latin. He revised it until 1559, expanding from 6 to 80 chapters.",tier:1},
  {sentence:"The Council of _____ (1545–1563) was Rome's systematic response to the Protestant Reformation.",answer:"Trent",options:["Trent","Constance","Nicaea","Basel"],explanation:"Trent reaffirmed tradition alongside Scripture, seven sacraments, and justification by faith and works — hardening the Catholic-Protestant divide.",tier:1},
  {sentence:"William Carey pioneered the modern Protestant missions movement when he sailed to _____ in 1793.",answer:"India",options:["India","China","Africa","Brazil"],explanation:"Carey spent 41 years in India translating Scripture into dozens of languages — establishing the pattern for Protestant foreign missions.",tier:1},
  {sentence:"The Second Vatican Council (Vatican II) permitted Mass to be celebrated in _____ languages instead of Latin.",answer:"local",options:["local","ancient","national","approved"],explanation:"Vatican II (1962–65) allowed vernacular Mass, opened dialogue with Protestants and Jews, and affirmed religious liberty.",tier:1},
  {sentence:"George Whitefield preached to enormous outdoor crowds, becoming the central figure of the First Great _____.",answer:"Awakening",options:["Awakening","Revival","Reformation","Renewal"],explanation:"The First Great Awakening (c. 1730s–1750s) swept Britain and colonial America — Whitefield was its most celebrated preacher, drawing tens of thousands to open-air meetings.",tier:1},
  {sentence:"John Wesley's movement of disciplined Christian living eventually became the _____ church — one of the largest Protestant denominations.",answer:"Methodist",options:["Methodist","Baptist","Presbyterian","Anglican"],explanation:"Wesley never intended to leave the Church of England — Methodism began as a renewal movement and became a separate denomination only after his death in 1791.",tier:1},
  {sentence:"The article says William Carey spent _____ years in India translating Scripture into dozens of languages.",answer:"41",options:["41","25","30","50"],explanation:"The article states Carey 'spent 41 years in India translating Scripture into dozens of languages, establishing the pattern for Protestant foreign missions.'",tier:1},
  // ── Tier 2 ──────────────────────────────────────────────────────────────
  {sentence:"The Council of Trent affirmed that _____ stands alongside Scripture as equally authoritative for Catholic doctrine.",answer:"tradition",options:["tradition","reason","experience","conscience"],explanation:"Trent's affirmation of tradition alongside Scripture was a direct rejection of sola Scriptura — a key Reformation debate point.",tier:2},
  {sentence:"William Tyndale translated the New Testament into English in 1526 and was _____ in 1536.",answer:"burned",options:["burned","beheaded","hanged","exiled"],explanation:"The article states Tyndale 'was burned in 1536' — his dying prayer, 'Lord, open the King of England's eyes,' was answered within two years when Henry VIII authorized an English Bible.",tier:2},
  {sentence:"The article says Luther translated the New Testament into _____ while hiding at Wartburg Castle after the Diet of Worms.",answer:"German",options:["German","Latin","English","French"],explanation:"The article states: 'While in hiding at Wartburg Castle, he translated the New Testament into German' — making Scripture accessible to ordinary German speakers.",tier:2},
  {sentence:"Benjamin Franklin estimated that at least _____ people could hear George Whitefield preach in the open air.",answer:"30,000",options:["30,000","5,000","10,000","50,000"],explanation:"Franklin, a skeptic, calculated by geometry that 30,000 people could hear Whitefield clearly — without any amplification.",tier:2},
  {sentence:"The Westminster Confession of Faith was produced in _____ and remains the doctrinal standard for many Presbyterian churches.",answer:"1647",options:["1647","1536","1689","1517"],explanation:"The Westminster Assembly (1643–1649) produced the Confession and Catechisms — still the primary standard for Presbyterian and many Reformed churches.",tier:2},
  {sentence:"The Edinburgh Missionary Conference of _____ is considered the birth of the modern ecumenical movement.",answer:"1910",options:["1910","1890","1948","1962"],explanation:"Over 1,200 Protestant delegates gathered in Edinburgh to coordinate global mission — launching the trajectory toward the World Council of Churches.",tier:2},
  {sentence:"John Wesley's Methodism transformed _____ working-class life through open-air revival preaching and disciplined small-group meetings.",answer:"English",options:["English","American","Scottish","Welsh"],explanation:"Wesley's genius was combining revival preaching with organizational structure — transforming English working-class communities.",tier:2},
  {sentence:"The article says the Westminster Assembly (1643–1649) produced the Westminster Confession — described as the 'definitive statement of _____ theology.'",answer:"Reformed",options:["Reformed","Lutheran","Catholic","Baptist"],explanation:"The article calls the Westminster Confession 'the definitive statement of Reformed theology, still used by Presbyterians worldwide.'",tier:2},
  {sentence:"Calvin's most controversial doctrine holds that God has eternally chosen certain individuals for salvation, independent of any foreseen merit — known as _____.",answer:"predestination",options:["predestination","sanctification","election","providence"],explanation:"Calvin's doctrine of double predestination — God elects some to salvation and passes over others — shaped Presbyterians, Congregationalists, and Baptists for centuries.",tier:2},
  {sentence:"The article says Tyndale's dying prayer — 'Lord, open the King of England's eyes' — was answered within two _____ when Henry VIII authorized an English Bible.",answer:"years",options:["years","months","decades","generations"],explanation:"The article states Tyndale was burned in 1536 and his prayer was 'answered within two years' — Henry VIII's Great Bible was authorized in 1539, largely built on Tyndale's work.",tier:2},
  // ── Tier 3 ──────────────────────────────────────────────────────────────
  {sentence:"Luther's 95 Theses spread rapidly across Europe because of the recently invented _____.",answer:"printing press",options:["printing press","postal system","universities","translation guilds"],explanation:"Gutenberg's printing press (c. 1440) made mass reproduction possible — within weeks Luther's Theses had spread across Europe in a way impossible before print.",tier:3},
  {sentence:"Calvin's primary contribution was giving Reformed theology its _____ foundation in the Institutes.",answer:"systematic",options:["systematic","devotional","pastoral","historical"],explanation:"Where Luther was a preacher and polemicist, Calvin was a systematician — his Institutes gave Reformed theology a comprehensive, organized framework.",tier:3},
  {sentence:"Tyndale's dying prayer was answered when Henry VIII authorized an English Bible largely built on Tyndale's own _____.",answer:"translation",options:["translation","writings","scholarship","notes"],explanation:"Within two years of Tyndale's 1536 death, Henry VIII authorized the Great Bible (1539) — largely composed of Tyndale's work. A profound irony.",tier:3},
  {sentence:"The center of gravity of global Christianity has shifted from Western Europe to the _____ South in the 21st century.",answer:"Global",options:["Global","American","Eastern","Northern"],explanation:"Sub-Saharan Africa, Latin America, and South Korea are now the most vibrant centers of Christian growth — the story has moved well beyond Europe.",tier:3},
  {sentence:"Spurgeon preached to an estimated 10 million people in his lifetime without any _____, drawing 6,000 to the Metropolitan Tabernacle each Sunday.",answer:"amplification",options:["amplification","preparation","notes","training"],explanation:"Spurgeon (1834–1892) died before radio or public address systems existed — his reach was entirely through his natural voice and printed sermons.",tier:3},
  {sentence:"The article says the Council of Trent reaffirmed _____ alongside faith as part of justification — a direct rejection of the Reformation's position.",answer:"works",options:["works","tradition","Scripture","sacraments"],explanation:"The article states Trent affirmed 'works alongside faith' — hardening the divide with Protestantism by rejecting the Reformers' insistence on faith alone.",tier:3},
  {sentence:"The article says the Edinburgh Missionary Conference of 1910 gathered _____ Protestant delegates to coordinate global mission.",answer:"1,200",options:["1,200","500","2,000","800"],explanation:"The article specifies '1,200 Protestant delegates' gathered in Edinburgh in 1910 — launching the modern ecumenical movement.",tier:3},
  {sentence:"The article says Calvin's doctrines of divine sovereignty, predestination, and covenant shaped Presbyterians, Congregationalists, and _____.",answer:"Baptists",options:["Baptists","Lutherans","Methodists","Anglicans"],explanation:"The article states Calvin's theology 'shaped Presbyterians, Congregationalists, and Baptists for centuries' — three of the major Reformed denominations.",tier:3},
  {sentence:"The article says Vatican II (1962–65) opened unprecedented dialogue with Protestants and _____, and affirmed religious liberty.",answer:"Jews",options:["Jews","Muslims","Orthodox","Buddhists"],explanation:"The article states Vatican II opened 'unprecedented dialogue with Protestants and Jews' and 'affirmed religious liberty' — a dramatic shift from earlier Catholic positions.",tier:3},
];

// ═══════════════════════════════════════════
// STUDY DATA
// ═══════════════════════════════════════════
const L1_STUDY={
  cards:[
    {
      text:"The church was born on Pentecost in Jerusalem when Peter preached and 3,000 were baptized. Paul drove early expansion, planting churches from Antioch to Rome. His letters — written in the 50s AD — are the oldest surviving Christian documents, predating the Gospels.",
      terms:[
        {word:"Pentecost",def:"The Jewish feast 50 days after Passover — the day the Holy Spirit fell and Peter preached to 3,000 new believers in Jerusalem."},
        {word:"Paul",def:"Born Saul of Tarsus, a Pharisee who converted on the Damascus road and planted churches across the Roman Empire."},
      ],
      questions:[
        {q:"Where and when did the church begin?",a:"Jerusalem, on the day of Pentecost (c. AD 30) — when Peter preached and 3,000 were baptized (Acts 2)."},
        {q:"Why are Paul's letters historically significant?",a:"Written in the 50s AD, they are the oldest surviving Christian documents — predating the four Gospels."},
        {q:"What was Paul's name before his conversion?",a:"Saul of Tarsus — a Pharisee who persecuted Christians before his encounter with Jesus on the Damascus road."},
      ]
    },
    {
      text:"Rome viewed Christians as dangerous because they refused to offer incense to the emperor's image — which Rome read as treason. Polycarp of Smyrna, a disciple of the Apostle John, was burned alive at age 86. Ignatius of Antioch wrote seven letters to churches while being transported under armed guard to his execution in Rome.",
      terms:[
        {word:"Polycarp",def:"Bishop of Smyrna and disciple of John. Martyred c. AD 155 at age 86 — refused to deny Christ before his Roman executioners."},
        {word:"Ignatius",def:"Bishop of Antioch — wrote seven letters to churches en route to martyrdom in Rome, providing early evidence of episcopal church structure."},
      ],
      questions:[
        {q:"Why did Rome persecute Christians?",a:"They refused to offer incense to the emperor's image — Rome read this as treason; Christians saw it as idolatry."},
        {q:"Who was Polycarp?",a:"Bishop of Smyrna and disciple of the Apostle John — burned alive at 86 (c. AD 155), a living link between the apostles and the next generation."},
        {q:"What makes Ignatius's letters significant?",a:"Written en route to his execution, they provide some of the earliest evidence of episcopal (bishop-led) church structure."},
      ]
    },
    {
      text:"Thinkers called Apologists — including Tertullian of Carthage — wrote sophisticated defenses of Christianity to Roman emperors. Tertullian coined the word Trinitas, giving the West its vocabulary for the three-in-one God. Constantine's Edict of Milan in 313 AD made Christianity legal throughout the empire.",
      terms:[
        {word:"Apologists",def:"Early Christian writers like Justin Martyr and Tertullian who argued that Christianity was philosophically serious and Christians were loyal citizens."},
        {word:"Tertullian",def:"North African theologian who coined 'Trinitas' (Trinity) and the formula 'one substance, three persons' — foundational to Western theology."},
        {word:"Edict of Milan",def:"Constantine's 313 AD decree legalizing Christianity throughout the Roman Empire, ending three centuries of persecution."},
      ],
      questions:[
        {q:"What did the Apologists do?",a:"They wrote sophisticated defenses of Christianity to Roman emperors, arguing it was philosophically serious and Christians were loyal citizens."},
        {q:"What did Tertullian contribute?",a:"He coined Trinitas (Trinity) and the formula 'one substance, three persons' — giving Western theology its foundational vocabulary."},
        {q:"What changed in 313 AD?",a:"Constantine's Edict of Milan legalized Christianity throughout the empire, ending three centuries of persecution."},
      ]
    }
  ],
};

const L2_STUDY={
  cards:[
    {
      text:"Arius taught that the Son was a created being — not co-eternal with the Father. His slogan: 'There was a time when he was not.' The Council of Nicaea (325) condemned this and affirmed the Son is homoousios — of one substance — with the Father. Athanasius of Alexandria defended this truth through five exiles.",
      terms:[
        {word:"Arius",def:"A popular priest who taught the Son was created and subordinate to the Father — not truly God. His teaching was condemned at Nicaea (325)."},
        {word:"homoousios",def:"Greek for 'of one substance' — the Nicene Creed's key word affirming the Son is fully and equally God, not a lesser created being."},
        {word:"Athanasius",def:"Bishop of Alexandria who defended Nicene orthodoxy through five exiles across multiple emperors. 'Athanasius contra mundum' — against the world."},
      ]
    },
    {
      text:"Later councils refined the church's understanding. Constantinople (381) completed the Nicene Creed by adding a full affirmation of the Holy Spirit's divinity. Ephesus (431) declared Mary Theotokos — God-bearer — to protect the unity of Christ's person. Chalcedon (451) defined the hypostatic union: two complete natures in one undivided person.",
      terms:[
        {word:"Theotokos",def:"Greek for 'God-bearer' — affirmed at Ephesus (431) to protect Christology: if Christ is truly God, his mother bore God."},
        {word:"hypostatic union",def:"Chalcedon's definition (451): Christ is fully divine and fully human — two complete natures in one undivided person, without mixture or confusion."},
      ]
    },
    {
      text:"The Cappadocian Fathers — Basil of Caesarea, Gregory of Nyssa, and Gregory of Nazianzus — formalized Trinitarian grammar as 'one ousia, three hypostaseis.' Augustine of Hippo opened his Confessions: 'Our heart is restless until it rests in Thee.' These figures gave the church its theological language for the next thousand years.",
      terms:[
        {word:"Cappadocian Fathers",def:"Basil of Caesarea, Gregory of Nyssa, and Gregory of Nazianzus — who refined Trinitarian theology and gave the church its grammar of 'one substance, three persons.'"},
        {word:"ousia",def:"Greek for substance or essence — the 'one' in the Trinitarian formula 'one substance, three persons.'"},
        {word:"Augustine",def:"Bishop of Hippo (354–430) — wrote the Confessions and The City of God, shaping Western theology and spirituality for over a millennium."},
      ]
    }
  ],
  questions:[
    {q:"What did Arius teach, and why was it condemned?",a:"Arius taught the Son was a created being — not co-eternal with the Father. Nicaea condemned this because a created Son could not truly redeem or reveal God."},
    {q:"What does homoousios mean?",a:"'Of one substance' — the Son is the same God as the Father, not merely similar (homoiousios differs by one Greek letter: iota)."},
    {q:"What is the hypostatic union?",a:"The Chalcedonian definition (451): Christ has two complete natures — fully divine, fully human — in one undivided person, without mixture or confusion."},
    {q:"Why was Mary called Theotokos?",a:"Not primarily to honor Mary, but to protect Christology — if Christ is truly God, then his mother bore God. It's an argument about who Jesus is."},
    {q:"Who were the Cappadocian Fathers?",a:"Basil of Caesarea, Gregory of Nyssa, and Gregory of Nazianzus — who formalized the Trinitarian formula 'one ousia, three hypostaseis.'"},
  ]
};

const L3_STUDY={
  cards:[
    {
      text:"As the Roman Empire collapsed, monasteries became the primary centers of literacy, manuscript copying, and healthcare. Benedict of Nursia founded Monte Cassino in 529 and wrote the Rule that shaped Western monasticism for over a thousand years. Charlemagne's Christmas Day coronation in 800 entangled church and imperial power for centuries.",
      terms:[
        {word:"Benedict",def:"Founded Monte Cassino (529) and wrote the Rule — a balanced rhythm of prayer, work, and community that became the blueprint for Western monastic life."},
        {word:"Charlemagne",def:"Crowned Holy Roman Emperor by Pope Leo III on Christmas Day, 800 AD — cementing the entanglement of ecclesiastical and political authority in medieval Europe."},
        {word:"Rule",def:"Benedict's guidelines for monastic life — balancing prayer, work, and community in a daily rhythm. Used by Western monasteries for over 1,000 years."},
      ]
    },
    {
      text:"The Great Schism of 1054 split Christianity into Roman Catholic and Eastern Orthodox. The two key causes: Rome's claim to universal jurisdiction over all bishops, and its unilateral addition of filioque to the Nicene Creed. The divide has never been officially healed.",
      terms:[
        {word:"filioque",def:"Latin for 'and the Son' — Rome's addition to the Nicene Creed saying the Spirit proceeds from Father and Son. The East rejected this as theologically wrong and procedurally illegitimate."},
        {word:"Great Schism",def:"The 1054 mutual excommunications between Rome and Constantinople — splitting Christianity into Catholic and Orthodox branches, still unhealed today."},
      ]
    },
    {
      text:"Thomas Aquinas synthesized Aristotelian philosophy with Christian theology in the Summa Theologica — over 1.5 million words, left unfinished. John Wycliffe translated the Bible into English and attacked papal authority, directly influencing Jan Hus. Hus was burned at the Council of Constance in 1415 despite a promise of safe conduct — a direct bridge to the Reformation.",
      terms:[
        {word:"Aquinas",def:"Dominican theologian (1225–1274) who wrote the Summa Theologica — a vast synthesis of Aristotle and Christian doctrine, left unfinished after a mystical experience."},
        {word:"Wycliffe",def:"English reformer who translated the Bible into English and attacked papal authority — directly influencing Jan Hus and, through him, Martin Luther."},
        {word:"Jan Hus",def:"Bohemian priest burned at the Council of Constance (1415) despite a promise of safe conduct — a century before Luther, a direct forerunner of the Reformation."},
      ]
    }
  ],
  questions:[
    {q:"What caused the Great Schism of 1054?",a:"Two causes: Rome's claim to universal jurisdiction over all bishops, and its unilateral addition of filioque ('and the Son') to the Nicene Creed."},
    {q:"What is filioque?",a:"Latin for 'and the Son' — Rome's addition saying the Spirit proceeds from Father and Son. The East objected to both the theology and Rome acting without an ecumenical council."},
    {q:"What did Benedict of Nursia contribute?",a:"He founded Monte Cassino (529) and wrote the Rule — the blueprint for Western monastic life for over 1,000 years, balancing prayer, work, and community."},
    {q:"Who was Jan Hus?",a:"A Bohemian priest burned at the Council of Constance (1415) despite a promise of safe conduct. Influenced by Wycliffe, he was a direct forerunner of Martin Luther."},
    {q:"What did Aquinas accomplish?",a:"He synthesized Aristotelian philosophy with Christian theology in the Summa Theologica — over 1.5 million words, left unfinished when he called all his writing 'straw' after a mystical experience."},
  ]
};

const L4_STUDY={
  cards:[
    {
      text:"Martin Luther published his 95 Theses on October 31, 1517, challenging the sale of indulgences. The printing press spread them across Europe within weeks. At the Diet of Worms in 1521, Luther refused to recant before Emperor Charles V: 'Here I stand; I can do no other.' He was declared an outlaw of the empire.",
      terms:[
        {word:"95 Theses",def:"Luther's 1517 challenge to the sale of indulgences — the igniting spark of the Protestant Reformation, spread by the printing press."},
        {word:"indulgences",def:"Church certificates offering remission of punishment for sin — sold to finance St. Peter's Basilica. Luther's challenge to these ignited the Reformation."},
        {word:"Diet of Worms",def:"The 1521 imperial assembly where Luther refused to recant before Emperor Charles V and was declared an outlaw of the empire."},
      ]
    },
    {
      text:"John Calvin published the Institutes of the Christian Religion at age 26, giving Reformed theology its systematic foundation — emphasizing divine sovereignty, predestination, and covenant. The Council of Trent (1545–1563) was Rome's systematic response, reaffirming tradition alongside Scripture. The Westminster Confession of Faith (1647) remains the defining statement of Reformed theology.",
      terms:[
        {word:"Sola Scriptura",def:"'By Scripture alone' — the Reformation's formal principle that the Bible, not tradition or the papacy, is the supreme authority for doctrine."},
        {word:"Calvin",def:"John Calvin (1509–1564) — published the Institutes at 26, shaping Presbyterians, Congregationalists, and Baptists for centuries with his systematic Reformed theology."},
        {word:"Council of Trent",def:"Rome's Counter-Reformation council (1545–1563) that reaffirmed tradition alongside Scripture and seven sacraments — hardening the Catholic-Protestant divide."},
      ]
    },
    {
      text:"William Carey pioneered Protestant foreign missions by sailing to India in 1793, spending 41 years translating Scripture into dozens of languages. George Whitefield and John Wesley led the First Great Awakening across Britain and America. Today Christianity's center of gravity has shifted to the Global South — Africa, Latin America, and South Korea.",
      terms:[
        {word:"William Carey",def:"A Baptist cobbler who sailed to India in 1793 — spent 41 years translating Scripture into dozens of languages, establishing the pattern for Protestant foreign missions."},
        {word:"Wesley",def:"John Wesley (1703–1791) — whose Methodism transformed English working-class life through open-air preaching and disciplined small-group meetings."},
        {word:"Global South",def:"Sub-Saharan Africa, Latin America, and South Korea — now the most vibrant centers of Christian growth in the 21st century."},
      ]
    }
  ],
  questions:[
    {q:"What were Luther's 95 Theses?",a:"A 1517 challenge to the sale of indulgences — the igniting spark of the Protestant Reformation, spread across Europe by the printing press within weeks."},
    {q:"What does Sola Scriptura mean?",a:"'By Scripture alone' — the Bible, not tradition or the papacy, is the supreme authority for Christian doctrine and practice."},
    {q:"What did Calvin contribute to the Reformation?",a:"His Institutes gave Reformed theology its systematic foundation — doctrines of divine sovereignty, predestination, and covenant that shaped Presbyterians, Congregationalists, and Baptists."},
    {q:"What was the Council of Trent?",a:"Rome's Counter-Reformation response (1545–1563), reaffirming tradition alongside Scripture, seven sacraments, and justification by faith and works — hardening the divide with Protestants."},
    {q:"Who was William Carey?",a:"A Baptist cobbler who sailed to India in 1793, pioneering the modern Protestant foreign missions movement — spent 41 years translating Scripture into dozens of languages."},
  ]
};

// ═══════════════════════════════════════════
// COLD OPEN DATA
// ═══════════════════════════════════════════
const _CDN='https://cdn.jsdelivr.net/gh/daltonp-1689/from_age_to_age@main/images/';
const COLD_OPEN_CARDS=[
  // Lesson 1 — Early Church & Persecution
  {_bg:_CDN+'polycarp.jpg',cards:[
    {label:'The World Before',text:'The Roman Empire rules the known world — and its emperor is a god.',size:'lg'},
    {label:'The Crisis',text:'A Jewish carpenter is executed in Jerusalem. His followers claim he rose from the dead.',size:'xl'},
    {label:'The Stakes',text:'If they\'re right, everything Rome stands for is wrong. If they keep talking, they will die for it.',size:'md'},
    {label:'The Key Figures',text:'Peter. Paul. Ignatius. Polycarp. Ordinary men who refused to stay quiet.',size:'xl'},
    {label:'The Surprise',text:'Three centuries of bloodshed didn\'t kill the church. It made it grow faster.',size:'lg'},
    {label:'The Bridge',text:'Here\'s how a movement of fishermen became the faith of an empire.',size:'md'},
  ]},
  // Lesson 2 — Councils & Creeds
  {_bg:_CDN+'constantine.jpg',cards:[
    {label:'The World Before',text:'Christianity is suddenly legal. After 300 years underground, the church steps into daylight.',size:'lg'},
    {label:'The Crisis',text:'A popular preacher named Arius has a question: Was Jesus actually God — or just the greatest creature God ever made?',size:'md'},
    {label:'The Stakes',text:'The answer will split the empire. It will determine what Christians believe about Jesus forever.',size:'lg'},
    {label:'The Key Figures',text:'Constantine. Arius. Athanasius. A single Greek letter separates orthodoxy from heresy.',size:'xl'},
    {label:'The Surprise',text:'The man who defended the faith was exiled five times — and still won.',size:'xl'},
    {label:'The Bridge',text:'Here\'s the story of how the church learned to say who Jesus is — in words that still echo every Sunday.',size:'md'},
  ]},
  // Lesson 3 — Medieval Church & Schism
  {_bg:_CDN+'hagia-sophia.jpg',cards:[
    {label:'The World Before',text:'Rome has fallen. Europe is in ruins. The church is the last institution standing.',size:'lg'},
    {label:'The Crisis',text:'Power corrupts. By the 11th century, the Pope and the Emperor are at war — and the church splits in two.',size:'md'},
    {label:'The Stakes',text:'One billion people today are Catholic or Orthodox because of decisions made in this era.',size:'lg'},
    {label:'The Key Figures',text:'Benedict. Charlemagne. Aquinas. Wycliffe. Builders and reformers who shaped a thousand years.',size:'xl'},
    {label:'The Surprise',text:'The church that dominated medieval Europe was already planting the seeds of its own destruction.',size:'xl'},
    {label:'The Bridge',text:'Here\'s the story of the church\'s longest chapter — and the cracks that would eventually break it open.',size:'md'},
  ]},
  // Lesson 4 — Reformation & Modern Era
  {_bg:_CDN+'luther.jpg',cards:[
    {label:'The World Before',text:'It is 1517. The church controls everything — your baptism, your burial, even your place in heaven.',size:'lg'},
    {label:'The Crisis',text:'A monk in Germany nails a list of questions to a church door. Within weeks, they\'re printed across Europe.',size:'xl'},
    {label:'The Stakes',text:'Luther is asking: Can a billion people be wrong? Is salvation by faith — or by buying it?',size:'lg'},
    {label:'The Key Figures',text:'Luther. Calvin. Tyndale. Men who would rather burn than stop translating.',size:'xl'},
    {label:'The Surprise',text:'The Reformation didn\'t just split the church. It rewired the entire Western world.',size:'xl'},
    {label:'The Bridge',text:'Here\'s how one monk with a printing press changed history — and why that story is still unfolding today.',size:'md'},
  ]},
];

// ─── COLD OPEN ENGINE ───
let _co={cards:[],idx:0,timer:null,lessonCallback:null};
const CO_DURATION=7000;

function showColdOpen(coData,callback){
  const data=coData;
  _co.cards=data.cards;
  _co.idx=0;
  _co.lessonCallback=callback;
  document.getElementById('co-bg').style.backgroundImage=`url('${data._bg}')`;
  const el=document.getElementById('cold-open');
  el.style.opacity='1';
  el.style.display='flex';
  _renderColdCard();
}

function _renderColdCard(){
  const card=_co.cards[_co.idx];
  const textEl=document.getElementById('co-text');
  textEl.style.opacity='0';
  setTimeout(()=>{
    textEl.textContent=card.text;
    textEl.className='co-text';
    const rem=Math.max(1.8,Math.min(4.2,220/card.text.length));
    textEl.style.fontSize=rem+'rem';
    textEl.style.opacity='1';
  },250);
  const bar=document.getElementById('co-bar');
  bar.style.transition='none';
  bar.style.width='0%';
  requestAnimationFrame(()=>{
    requestAnimationFrame(()=>{
      bar.style.transition=`width ${CO_DURATION}ms linear`;
      bar.style.width='100%';
    });
  });
  clearTimeout(_co.timer);
  _co.timer=setTimeout(advanceColdOpen,CO_DURATION);
}

function advanceColdOpen(){
  clearTimeout(_co.timer);
  if(_co.idx<_co.cards.length-1){_co.idx++;_renderColdCard();}
  else{skipColdOpen();}
}

function skipColdOpen(){
  clearTimeout(_co.timer);
  const el=document.getElementById('cold-open');
  el.style.opacity='0';
  setTimeout(()=>{el.style.display='none';_co.lessonCallback();},400);
}

// ═══════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════
let currentTrack=null;
let currentLessonIdx=null;

let currentScreenName='home';
function showScreen(id){
  currentScreenName=id;
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('screen-'+id).classList.add('active');
  document.getElementById('main-scroll').scrollTop=0;
  document.getElementById('report-panel').classList.remove('open');
}

function goHome(){
  renderHome();
  showScreen('home');
}

function goTrack(){
  renderTrackDetail(currentTrack);
  showScreen('track');
}

// ═══════════════════════════════════════════
// HOME
// ═══════════════════════════════════════════

// Era anchor years for the resume card "Anno Domini" label
const ERA_ANNO=['64','325','1054','1517'];
// Essay display titles for the resume card
const ESSAY_ANNO_TITLES=['The Early Church','Constantine & the Councils','The Medieval Church','Reformation & Modern Era'];

let _resumeTrack=null; // module-scoped for topbar resume button

function findNextLesson(){
  for(const group of DIFFICULTY_GROUPS){
    for(const tr of group.tracks){
      if(!tr.lessons||!tr.lessons.length) continue;
      const ts=S.tracks[tr.id]||{lessons:{}};
      for(let i=0;i<tr.lessons.length;i++){
        const les=tr.lessons[i];
        const stars=ts.lessons[les.id]||0;
        const prevDone=i===0?true:(ts.lessons[tr.lessons[i-1].id]||0)>=1;
        if(!prevDone) break;
        if(stars===0) return {track:tr,lesson:les,lessonIdx:i,ts};
      }
    }
  }
  return null;
}

function handleTopbarResume(){
  if(_resumeTrack){currentTrack=_resumeTrack;renderTrackDetail(_resumeTrack);showScreen('track');}
}

function renderHome(){
  const c=document.getElementById('tracks-container');
  c.innerHTML='';

  // ── Resume card ─────────────────────────────
  const next=findNextLesson();
  _resumeTrack=next?next.track:null;
  const trBtn=document.getElementById('topbar-resume-btn');
  if(trBtn) trBtn.classList.toggle('visible',!!next);

  if(next){
    const {track,lesson,lessonIdx,ts}=next;
    const totalLessons=track.lessons.length;
    const doneLessons=track.lessons.filter(l=>(ts.lessons[l.id]||0)>=1).length;
    const pct=Math.round(doneLessons/totalLessons*100);
    const annoYear=ERA_ANNO[lessonIdx]||ERA_ANNO[0];
    const rawTitle=lesson.essayTitle||ESSAY_ANNO_TITLES[lessonIdx]||lesson.name;
    // Make title italic after "&" if present, else italic whole
    const titleHtml=rawTitle.includes(' & ')
      ?rawTitle.replace(' & ',' <span style="font-family:Karla,sans-serif;font-size:17px;">&amp;</span> <em>').concat('</em>')
      :`<em>${rawTitle}</em>`;
    const remaining=totalLessons-doneLessons;
    const resumeCard=document.createElement('div');
    resumeCard.className='resume-card';
    resumeCard.innerHTML=`
      <div class="resume-card-body">
        <div class="resume-eyebrow"><i class="ti ti-star-filled"></i> Continue — Anno Domini ${annoYear}</div>
        <div class="resume-title">${titleHtml}</div>
        <div class="resume-prog-row">
          <span class="resume-pct">${pct}%</span>
          <div class="resume-bar-track"><div class="resume-bar-fill" style="width:${pct}%"></div></div>
          <span class="resume-remaining">${remaining} lesson${remaining!==1?'s':''} remaining</span>
        </div>
      </div>
      <button class="resume-action-btn">Resume →</button>`;
    const doResume=()=>{currentTrack=track;renderTrackDetail(track);showScreen('track');};
    resumeCard.querySelector('.resume-action-btn').onclick=e=>{e.stopPropagation();doResume();};
    resumeCard.onclick=doResume;
    c.appendChild(resumeCard);
  }

  // ── Practice CTA ────────────────────────────
  const practiceCard=document.createElement('div');
  practiceCard.className='practice-cta-card';
  practiceCard.innerHTML=`
    <div class="practice-cta-icon"><i class="ti ti-bolt"></i></div>
    <div class="practice-cta-text">
      <div class="practice-cta-name">Practice</div>
      <div class="practice-cta-desc">Endless questions from any track — no lives, no limits.</div>
    </div>
    <div class="practice-cta-arrow"><i class="ti ti-chevron-right"></i></div>`;
  practiceCard.onclick=openPracticeSelect;
  c.appendChild(practiceCard);

  // ── Tracks heading ───────────────────────────
  const heading=document.createElement('div');
  heading.className='tracks-heading';
  heading.textContent='Your tracks';
  c.appendChild(heading);

  DIFFICULTY_GROUPS.forEach(group=>{
    const section=document.createElement('div');
    section.className='diff-section';
    section.innerHTML=`<div class="diff-header"><span class="diff-label">${group.label}</span><span class="diff-desc">${group.desc}</span></div>`;
    c.appendChild(section);
    group.tracks.forEach(tr=>{
      const isComingSoon=!tr.lessons||tr.lessons.length===0;
      const ts=S.tracks[tr.id]||{lessons:{}};
      const totalLessons=tr.lessons?tr.lessons.length:0;
      const doneLessons=totalLessons===0?0:tr.lessons.filter(l=>(ts.lessons[l.id]||0)>=1).length;
      const pct=totalLessons===0?0:Math.round(doneLessons/totalLessons*100);
      const isComplete=!isComingSoon&&pct===100;
      let badgeCls,badgeTxt;
      if(isComingSoon){badgeCls='badge-soon';badgeTxt='Coming Soon';}
      else if(isComplete){badgeCls='badge-done';badgeTxt='Complete';}
      else if(doneLessons>0){badgeCls='badge-progress';badgeTxt=doneLessons+'/'+totalLessons+' done';}
      else{badgeCls='badge-new';badgeTxt='New';}
      const div=document.createElement('div');
      div.className='track-card'+(isComingSoon?' coming-soon':'')+(tr.id==='track5'?' american':'');
      div.innerHTML=`
        <div class="tc-body">
          <div class="tc-icon${isComplete?' complete':''}"><i class="ti ${isComplete?'ti-check':tr.icon}"></i></div>
          <div class="tc-text">
            <div class="tc-name">${tr.name}</div>
            <div class="tc-desc">${tr.desc}</div>
            <div class="tc-pills">${tr.pills.map(p=>`<span class="tc-pill">${p}</span>`).join('')}</div>
          </div>
        </div>
        <div class="tc-footer">
          <span>${tr.eyebrow}</span>
          <div class="tc-progress-track"><div class="tc-progress-fill${isComplete?' done':''}" style="width:${pct}%"></div></div>
          <span class="tc-badge ${badgeCls}">${badgeTxt}</span>
          ${(ts.exam&&ts.exam.passed)?`<span class="wax-seal"><i class="ti ti-award"></i> Passed</span>`:''}
        </div>`;
      if(!isComingSoon) div.onclick=()=>{currentTrack=tr;renderTrackDetail(tr);showScreen('track');};
      c.appendChild(div);
    });
  });
}

// ═══════════════════════════════════════════
// TRACK DETAIL
// ═══════════════════════════════════════════
function renderTrackDetail(tr){
  document.getElementById('screen-track').classList.toggle('american',tr.id==='track5');
  document.getElementById('td-eyebrow').textContent=tr.eyebrow;
  document.getElementById('td-title').textContent=tr.name;
  document.getElementById('td-desc').textContent=tr.desc;
  const ts=S.tracks[tr.id]||{lessons:{}};
  const c=document.getElementById('lessons-container');
  c.innerHTML='';

  const eraLabels=['c. AD 30–313','AD 313–451','AD 500–1400','AD 1517–present'];
  const essayTitles=['The Early Church','Constantine & the Councils','The Medieval Church','Reformation & Modern Era'];
  const getEraLabel=(les,i)=>les.eraLabel||eraLabels[i]||'';
  const getEssayTitle=(les,i)=>les.essayTitle||essayTitles[i]||les.name;

  const list=document.createElement('div');
  list.className='tl-list';
  const spine=document.createElement('div');
  spine.className='tl-spine';
  list.appendChild(spine);

  const groupEls=[];
  let firstActiveIdx=-1;

  tr.lessons.forEach((les,i)=>{
    const stars=ts.lessons[les.id]||0;
    const lesRead=ts['read_'+les.id]||false;
    const learnDone=!!ts['learn_'+les.id];
    const studyDone=!!ts['study_'+les.id];
    const prevDone=i===0?true:(ts.lessons[tr.lessons[i-1].id]||0)>=1;
    const isLocked=!prevDone;
    const isComplete=stars>=1;

    if(!isLocked&&!isComplete&&firstActiveIdx===-1) firstActiveIdx=i;

    const group=document.createElement('div');
    group.className='ll-group';
    groupEls.push(group);

    const numStr=String(i+1).padStart(2,'0');
    const nodeCls=isComplete?'done':(!isLocked?'active':'');
    group.innerHTML=`
      <div class="ll-era-row">
        <div class="ll-node ${nodeCls}"></div>
        <span class="ll-era-sep">|</span>
        <span class="ll-era-label">${getEraLabel(les,i)}</span>
      </div>`;

    const card=document.createElement('div');
    card.className='ll-card'+(isLocked?' locked':'')+(isComplete?' complete':'');

    const statusIcon=isComplete
      ? `<i class="ti ti-circle-check ll-status done"></i>`
      : `<i class="ti ti-chevron-right ll-status"></i>`;

    const qCount=les.meta.match(/\d+/)?.[0]??'12';
    const hasQuiz=les.questions&&les.questions.length>0;
    const readPill=`<span class="ll-pill read${lesRead?' done':''}" data-action="read"><i class="ti ti-book-2"></i> Reading</span>`;
    const learnPill=les.learn
      ?`<span class="ll-pill learn${learnDone?' done':(!lesRead?' dim':'')}" data-action="learn"><i class="ti ti-pencil"></i> Learn</span>`:'';
    const studyPill=les.study
      ?`<span class="ll-pill study${studyDone?' done':(!learnDone?' dim':'')}" data-action="study">Study</span>`:'';
    const quizPill=hasQuiz
      ?`<span class="ll-pill quiz${isComplete?' done':''}" data-action="quiz"><i class="ti ti-help-circle"></i> Quiz${!isLocked?` · ${qCount} q`:''}</span>`:'';

    card.innerHTML=`
      <div class="ll-card-top">
        <div class="ll-lesson-name"><span class="ll-num">${numStr}</span>${les.name}</div>
        ${statusIcon}
      </div>
      <div class="ll-pills">${readPill}${learnPill}${studyPill}${quizPill}</div>`;

    if(!isLocked){
      card.addEventListener('click',()=>startLesson(tr,i));
      card.querySelector('[data-action="read"]').addEventListener('click',e=>{
        e.stopPropagation();currentTrack=tr;currentLessonIdx=i;openLessonArticle(tr,i);
      });
      if(les.learn&&lesRead){
        card.querySelector('[data-action="learn"]').addEventListener('click',e=>{
          e.stopPropagation();currentTrack=tr;currentLessonIdx=i;startLearn(tr,i);
        });
      }
      if(les.study&&learnDone){
        card.querySelector('[data-action="study"]').addEventListener('click',e=>{
          e.stopPropagation();currentTrack=tr;currentLessonIdx=i;startStudy(tr,i);
        });
      }
      const quizEl=card.querySelector('[data-action="quiz"]');
      if(quizEl) quizEl.addEventListener('click',e=>{
        e.stopPropagation();startLesson(tr,i);
      });
    }

    group.appendChild(card);
    list.appendChild(group);

    // Era Check and Person Check checkpoint cards (America track only)
    if(tr.id==='track5'){
      const ec=AMERICA_ERA_CHECKS.find(c=>c.afterLessonIdx===i);
      if(ec){
        const ecLocked=!isComplete;
        const ecDone=!!(ts[ec.id]);
        const ecBest=ts[ec.id+'_best']||0;
        const ecGroup=document.createElement('div');
        ecGroup.className='ll-group ec-group';
        ecGroup.innerHTML=renderEraCheckCard(ec,ecLocked,ecDone,ecBest);
        if(!ecLocked){
          ecGroup.querySelector('.era-check-card').addEventListener('click',()=>startEraCheck(ec.id));
        }
        list.appendChild(ecGroup);
      }
      const pc=AMERICA_PERSON_CHECKS.find(c=>c.afterLessonIdx===i);
      if(pc){
        const pcLocked=!isComplete;
        const pcDone=!!(ts[pc.id]);
        const pcBest=ts[pc.id+'_best']||0;
        const pcGroup=document.createElement('div');
        pcGroup.className='ll-group pc-group';
        pcGroup.innerHTML=renderPersonCheckCard(pc,pcLocked,pcDone,pcBest);
        if(!pcLocked){
          pcGroup.querySelector('.person-check-card').addEventListener('click',()=>startPersonCheck(pc.id));
        }
        list.appendChild(pcGroup);
      }
    }
  });

  if(firstActiveIdx>0){
    const btn=document.createElement('button');
    btn.className='scroll-current-btn';
    btn.innerHTML=`<i class="ti ti-arrow-down"></i> Jump to current lesson`;
    btn.onclick=()=>groupEls[firstActiveIdx].scrollIntoView({behavior:'smooth',block:'start'});
    c.appendChild(btn);
  }

  c.appendChild(list);

  // Exam CTA — show when all lessons complete
  const allDone=tr.lessons.length>0&&tr.lessons.every(l=>(ts.lessons[l.id]||0)>=1);
  if(allDone){
    const examDiv=document.createElement('div');
    examDiv.className='exam-cta';
    const ex=ts.exam;
    if(ex){
      const starsHtml=[1,2,3].map(i=>`<i class="ti ti-star" style="color:${i<=ex.stars?'var(--gold)':'var(--parch2)'};font-size:18px;margin:0 2px;"></i>`).join('');
      examDiv.innerHTML=`
        <div class="exam-cta-eyebrow">Track Examination</div>
        <div style="margin-bottom:6px;">${starsHtml}</div>
        <p>Best score: ${ex.score}%${ex.passed?' · Passed':' · Not yet passed'}</p>
        <button class="btn btn-primary" onclick="startExam('${tr.id}')"><i class="ti ti-refresh"></i> Retake Examination</button>`;
    } else {
      examDiv.innerHTML=`
        <div class="exam-cta-eyebrow">Track Examination</div>
        <p>You\'ve completed all four lessons. Prove your mastery with the final examination.</p>
        <button class="btn btn-primary" style="background:var(--crimson);border-color:var(--crimson2);" onclick="startExam('${tr.id}')"><i class="ti ti-award"></i> Take the Examination</button>`;
    }
    c.appendChild(examDiv);
  }
}

// ═══════════════════════════════════════════
// ARTICLE HTML
// Images use data-wiki="Page_Title" — resolved at runtime via Wikipedia REST API
// Paul's journey uses a Leaflet map rendered after article is injected
// ═══════════════════════════════════════════

const L1_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 1 · Sections I–II</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~3 min</span>
</div>
<h1 class="article-title">The Early Church</h1>
<p class="article-sub">From Pentecost to persecution — how a movement born in an upper room survived three centuries of Roman opposition.</p>
<div class="art-divider"></div>
<div class="article-body">

<h3><span class="rn">I.</span><span>Beginnings: The First Century<small>c. AD 30–100</small></span></h3>
<p class="lead"><span class="smc">The church was</span> born not in a cathedral but in a crowd. Fifty days after the resurrection of Jesus of Nazareth, his disciples gathered in Jerusalem for the Jewish feast of <strong>Pentecost</strong>. The Holy Spirit fell on them, and the fisherman Peter stood up and preached to pilgrims from across the known world. Three thousand were baptized that day. That is where the story begins.</p>
<p>What happened next was remarkable in its speed. Within two decades, communities of believers existed in Jerusalem, Antioch, Corinth, Ephesus, and Rome itself — the very capital of the empire that would later persecute them. The Apostle <strong>Paul</strong> drove much of this expansion, planting churches and writing letters that would eventually become half the New Testament. His letters, written in the 50s AD, are the oldest surviving Christian documents — older than the Gospels themselves.</p>

<figure style="margin:1.75rem 0;border:1px solid rgba(20,8,12,0.1);overflow:hidden;">
  <img src="https://cdn.jsdelivr.net/gh/daltonp-1689/from_age_to_age@main/images/paul-journeys.png"
       style="width:100%;display:block;object-fit:contain;max-height:420px;background:#faf8f5;">
  <figcaption><strong>Paul's Missionary Journeys</strong> Between roughly AD 46 and 60, Paul traveled thousands of miles by ship and on foot — planting churches from Antioch to Rome.</figcaption>
</figure>

<p>The first Christians expected Jesus to return quickly. When he did not, hard questions emerged: How do we organize? What do we believe? Which writings are authoritative? These questions would define the next three centuries.</p>

<div class="atl-box">
  <div class="atl-label">Key dates — First century</div>
  <div class="atl-row"><div class="atl-year">c. 30</div><div class="atl-text">Pentecost — the church begins in Jerusalem</div></div>
  <div class="atl-row"><div class="atl-year">c. 48</div><div class="atl-text">Paul's first missionary journey; Council of Jerusalem</div></div>
  <div class="atl-row"><div class="atl-year">64–68</div><div class="atl-text">Neronian persecution; Peter and Paul martyred in Rome</div></div>
  <div class="atl-row"><div class="atl-year">70</div><div class="atl-text">Romans destroy Jerusalem and the Temple</div></div>
  <div class="atl-row"><div class="atl-year">c. 95</div><div class="atl-text">Domitian persecution; John writes Revelation from Patmos</div></div>
</div>

<h3><span class="rn">II.</span><span>Persecution and Apology<small>100–313</small></span></h3>
<p>For the first three centuries, to be Christian was to risk your life. Rome tolerated many religions, but Christians refused to offer incense to the emperor's image — a gesture Rome understood as civic loyalty, not religious devotion. This refusal was read as treason. Christians were accused of atheism, cannibalism, and political sedition.</p>
<p>The persecutions were sporadic, varying by region and emperor. Under <strong>Nero</strong> (64 AD), Christians were blamed for the Great Fire of Rome and executed with theatrical cruelty. <strong>Ignatius of Antioch</strong> wrote seven letters to churches while being transported to Rome for execution. <strong>Polycarp of Smyrna</strong> — a disciple of the Apostle John — refused at eighty-six to curse Christ before the magistrate.</p>

<div class="pull-quote"><p>"Eighty-six years I have served him, and he has done me no wrong. How can I blaspheme my King who saved me?"</p><cite>Polycarp of Smyrna &nbsp;·&nbsp; before his martyrdom, c. AD 155</cite></div>

<!-- Polycarp -->
<figure class="art-fig portrait">
  <div class="fig-img-wrap"><img src="https://cdn.jsdelivr.net/gh/daltonp-1689/from_age_to_age@main/images/polycarp.jpg" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block;"></div>
  <div class="fig-body">
    <div class="fig-label">Martyrdom · c. AD 155</div>
    <div class="fig-title">Polycarp of Smyrna</div>
    <div class="fig-desc">Bishop of Smyrna and disciple of the Apostle John, burned alive at age 86 after refusing to renounce Christ. His martyrdom is one of the earliest and most detailed accounts of a Christian execution outside the New Testament.</div>
  </div>
</figure>

<p>Out of persecution came theology. Thinkers called the Apologists — Justin Martyr, <strong>Tertullian</strong>, Origen — wrote sophisticated defenses of Christianity. Tertullian of Carthage coined the word <em>Trinitas</em> (Trinity) and the formula "one substance, three persons," effectively inventing Western theological vocabulary. His famous line: "The blood of the martyrs is the seed of the church."</p>

</div>`;

const L2_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 2 · Section III</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min</span>
</div>
<h1 class="article-title">Constantine &amp; the Councils</h1>
<p class="article-sub">How the church moved from persecuted minority to imperial religion — and wrestled to define who Jesus really is.</p>
<div class="art-divider"></div>
<div class="article-body">

<h3><span class="rn">III.</span><span>Constantine and the Councils<small>313–451</small></span></h3>

<!-- Constantine -->
<figure class="art-fig portrait">
  <div class="fig-img-wrap"><img src="https://cdn.jsdelivr.net/gh/daltonp-1689/from_age_to_age@main/images/constantine.jpg" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block;"></div>
  <div class="fig-body">
    <div class="fig-label">Emperor · r. 306–337</div>
    <div class="fig-title">Constantine the Great</div>
    <div class="fig-desc">In 313 AD Constantine legalized Christianity with the Edict of Milan, transforming the faith from a persecuted sect into the religion of the Roman Empire within a single generation.</div>
  </div>
</figure>

<p class="lead"><span class="smc">In 312 AD,</span> the general <strong>Constantine</strong> reportedly saw a vision before battle and won the empire. The following year, the Edict of Milan legalized Christianity. Within decades it became the official religion of Rome. The church went from persecuted minority to imperial establishment in a single generation.</p>
<p>Constantine convened the <strong>First Council of Nicaea</strong> in 325 AD to resolve the Arian crisis. A priest named <strong>Arius</strong> had been teaching that the Son was a created being — exalted, yes, but not eternal. His slogan: "There was a time when he was not." The council condemned Arius and produced the Nicene Creed, affirming the Son is <em>homoousios</em> — of one substance — with the Father.</p>

<!-- Council of Nicaea -->
<figure class="art-fig">
  <div class="fig-img-wrap" style="min-height:240px;"><img src="https://cdn.jsdelivr.net/gh/daltonp-1689/from_age_to_age@main/images/nicaea.jpg" style="width:100%;max-height:360px;object-fit:cover;display:block;"></div>
  <figcaption><strong>The First Council of Nicaea, 325 AD</strong> Roughly 300 bishops gathered to condemn Arianism and produce the Nicene Creed — the first ecumenical council of the Christian church, convened by Emperor Constantine.</figcaption>
</figure>

<p>The great defender of Nicene orthodoxy was <strong>Athanasius of Alexandria</strong>, who was exiled five times by emperors favoring Arianism. The phrase "Athanasius contra mundum" — Athanasius against the world — captured his lonely courage. He outlasted every emperor who opposed him.</p>
<p>Later councils refined the picture. <strong>Constantinople (381)</strong> affirmed the Holy Spirit's full divinity. <strong>Ephesus (431)</strong> declared Mary Theotokos — God-bearer — affirming the unity of Christ's person. <strong>Chalcedon (451)</strong> defined the hypostatic union: Christ has two complete natures — fully divine, fully human — in one person, without mixture or confusion.</p>

<div class="atl-box">
  <div class="atl-label">The great councils</div>
  <div class="atl-row"><div class="atl-year">325</div><div class="atl-text">Nicaea — Son is homoousios with the Father; Arianism condemned</div></div>
  <div class="atl-row"><div class="atl-year">381</div><div class="atl-text">Constantinople — Holy Spirit's full divinity affirmed</div></div>
  <div class="atl-row"><div class="atl-year">431</div><div class="atl-text">Ephesus — Mary declared Theotokos; Nestorius condemned</div></div>
  <div class="atl-row"><div class="atl-year">451</div><div class="atl-text">Chalcedon — two natures in one person (hypostatic union)</div></div>
</div>

</div>`;

const L3_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 3 · Section IV</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min</span>
</div>
<h1 class="article-title">The Medieval Church</h1>
<p class="article-sub">How monasteries held civilization together, popes clashed with kings, and the church split in two — setting the stage for reform.</p>
<div class="art-divider"></div>
<div class="article-body">

<h3><span class="rn">IV.</span><span>The Medieval Church<small>500–1400</small></span></h3>
<p class="lead"><span class="smc">As the Roman Empire</span> collapsed in the West, the church became the primary institution holding European civilization together. Monasteries preserved literacy, copied manuscripts, and ran the only hospitals in Europe. <strong>Benedict of Nursia</strong> (529) founded Monte Cassino and wrote his Rule, shaping Western monasticism for a thousand years.</p>
<p>The papacy grew in power and ambition. On Christmas Day 800, <strong>Charlemagne</strong> was crowned Holy Roman Emperor by Pope Leo III — cementing the pattern of entangled political and ecclesiastical authority that would define medieval Europe and produce endless conflict between popes and kings.</p>
<p>In 1054, the long-simmering tensions between Rome and Constantinople erupted into the <strong>Great Schism</strong>. The papacy's claim to universal jurisdiction and Rome's unilateral insertion of "filioque" ("and the Son") into the Nicene Creed were the two explosive issues. The two sides exchanged mutual excommunications, dividing Christianity into Roman Catholic and Eastern Orthodox branches that remain separate to this day.</p>

<!-- Hagia Sophia -->
<figure class="art-fig">
  <div class="fig-img-wrap" style="min-height:220px;"><img src="https://cdn.jsdelivr.net/gh/daltonp-1689/from_age_to_age@main/images/hagia-sophia.jpg" style="width:100%;max-height:360px;object-fit:cover;display:block;"></div>
  <figcaption><strong>Hagia Sophia, Constantinople</strong> Built by Emperor Justinian (532–537), the greatest church in Christendom for nearly a thousand years — the spiritual heart of Eastern Orthodox Christianity until the Ottoman conquest of 1453.</figcaption>
</figure>

<!-- Aquinas -->
<figure class="art-fig portrait">
  <div class="fig-img-wrap"><img src="https://cdn.jsdelivr.net/gh/daltonp-1689/from_age_to_age@main/images/aquinas.jpg" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block;"></div>
  <div class="fig-body">
    <div class="fig-label">Theologian · 1225–1274</div>
    <div class="fig-title">Thomas Aquinas</div>
    <div class="fig-desc">Aquinas wrote the Summa Theologica — over 1.5 million words synthesizing Aristotelian philosophy with Christian theology. Near death he called it all "straw" compared to what he had seen in contemplation.</div>
  </div>
</figure>

<p>Great thinkers defined this era. <strong>Anselm of Canterbury</strong> (1033–1109) developed the satisfaction theory of atonement. <strong>Thomas Aquinas</strong> (1225–1274) synthesized Aristotelian philosophy with Christian theology in the massive Summa Theologica. Near death, after a mystical experience, he described his entire life's work as "straw."</p>
<p>The era also produced reform movements that anticipated the Reformation. In England, <strong>John Wycliffe</strong> translated the Bible into English and attacked papal authority, influencing the Bohemian priest <strong>Jan Hus</strong>, who was burned at the Council of Constance in 1415 despite a promise of safe conduct — an act of treachery that set Bohemia ablaze.</p>

</div>`;

const L4_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 4 · Sections V–VI</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~3 min</span>
</div>
<h1 class="article-title">Reformation &amp; the Modern Era</h1>
<p class="article-sub">From Luther's 95 Theses to two billion believers worldwide — how the church fractured, revived, and spread to every continent.</p>
<div class="art-divider"></div>
<div class="article-body">

<h3><span class="rn">V.</span><span>The Reformation<small>1517–1648</small></span></h3>

<!-- Luther -->
<figure class="art-fig portrait">
  <div class="fig-img-wrap"><img src="https://cdn.jsdelivr.net/gh/daltonp-1689/from_age_to_age@main/images/luther.jpg" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block;"></div>
  <div class="fig-body">
    <div class="fig-label">Reformer · 1483–1546</div>
    <div class="fig-title">Martin Luther</div>
    <div class="fig-desc">Luther's 95 Theses (1517) ignited the Protestant Reformation. Summoned before Emperor Charles V at the Diet of Worms in 1521, he refused to recant: "Here I stand; I can do no other."</div>
  </div>
</figure>

<p class="lead"><span class="smc">On October 31, 1517,</span> an Augustinian monk named <strong>Martin Luther</strong> published 95 theses against the sale of indulgences. The printing press turned what might have been an academic dispute into a continent-wide crisis. Luther was summoned to the Diet of Worms in 1521, where he refused to recant before Emperor Charles V. While in hiding at Wartburg Castle, he translated the New Testament into German.</p>

<!-- Calvin -->
<figure class="art-fig portrait">
  <div class="fig-img-wrap"><img src="https://cdn.jsdelivr.net/gh/daltonp-1689/from_age_to_age@main/images/calvin.png" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block;"></div>
  <div class="fig-body">
    <div class="fig-label">Reformer · 1509–1564</div>
    <div class="fig-title">John Calvin</div>
    <div class="fig-desc">Calvin published the first edition of his Institutes of the Christian Religion at age 26, giving Reformed theology its systematic foundation — shaping Presbyterians, Congregationalists, and Baptists for centuries.</div>
  </div>
</figure>

<p>The Reformation fractured quickly into competing streams. <strong>John Calvin</strong> (1509–1564), writing his Institutes at 26, gave Reformed theology its systematic foundation — with doctrines of divine sovereignty, predestination, and covenant that shaped Presbyterians, Congregationalists, and Baptists for centuries. <strong>William Tyndale</strong> translated the New Testament into English in 1526 and was burned in 1536. His dying prayer — "Lord, open the King of England's eyes" — was answered within two years.</p>
<p>The Roman Catholic Church responded with the Council of Trent (1545–1563), reaffirming tradition alongside Scripture, works alongside faith, and seven sacraments. The Westminster Assembly (1643–1649) produced the Westminster Confession of Faith — the definitive statement of Reformed theology, still used by Presbyterians worldwide.</p>

<h3><span class="rn">VI.</span><span>The Modern Era<small>1700–Present</small></span></h3>
<p>The eighteenth century brought revival. <strong>George Whitefield</strong> and <strong>John Wesley</strong> led the First Great Awakening, preaching to tens of thousands in open fields across Britain and America. Whitefield's voice, without amplification, could reportedly reach 30,000 listeners at once — a fact Benjamin Franklin verified by calculation.</p>

<!-- Spurgeon -->
<figure class="art-fig portrait">
  <div class="fig-img-wrap"><img src="https://cdn.jsdelivr.net/gh/daltonp-1689/from_age_to_age@main/images/spurgeon.jpg" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block;"></div>
  <div class="fig-body">
    <div class="fig-label">Preacher · 1834–1892</div>
    <div class="fig-title">Charles Spurgeon</div>
    <div class="fig-desc">The "Prince of Preachers" drew 6,000 listeners to London's Metropolitan Tabernacle every Sunday without amplification, and preached to an estimated 10 million people in his lifetime.</div>
  </div>
</figure>

<p>The modern missions movement was born when <strong>William Carey</strong>, a Baptist cobbler, sailed for India in 1793 and spent 41 years translating Scripture into dozens of languages, establishing the pattern for Protestant foreign missions. In the following century, <strong>Charles Spurgeon</strong> — the "Prince of Preachers" — drew 6,000 to London's Metropolitan Tabernacle every Sunday and preached to an estimated 10 million people in his lifetime without a microphone.</p>
<p>The Edinburgh Missionary Conference of 1910 launched the modern ecumenical movement, gathering 1,200 Protestant delegates to coordinate global mission. The Second Vatican Council (1962–65) transformed Roman Catholicism — permitting Mass in local languages, affirming religious liberty, and opening unprecedented dialogue with Protestants and Jews.</p>
<p>Today, Christianity is the world's largest religion, with roughly two billion adherents. Its center of gravity has shifted dramatically southward — the most vibrant growth is now in sub-Saharan Africa, Latin America, and South Korea, not in the declining churches of Western Europe where the story began. The story is far from over.</p>

</div>`;

// Wire article HTML and matching data into lessons after constants are defined
TRACKS[0].lessons[0].articleHtml=L1_ARTICLE_HTML;
TRACKS[0].lessons[1].articleHtml=L2_ARTICLE_HTML;
TRACKS[0].lessons[2].articleHtml=L3_ARTICLE_HTML;
TRACKS[0].lessons[3].articleHtml=L4_ARTICLE_HTML;
TRACKS[0].lessons[0].learn=L1_LEARN;
TRACKS[0].lessons[1].learn=L2_LEARN;
TRACKS[0].lessons[2].learn=L3_LEARN;
TRACKS[0].lessons[3].learn=L4_LEARN;
TRACKS[0].lessons[0].study=L1_STUDY;
TRACKS[0].lessons[1].study=L2_STUDY;
TRACKS[0].lessons[2].study=L3_STUDY;
TRACKS[0].lessons[3].study=L4_STUDY;

// ═══════════════════════════════════════════
// AMERICAN CHURCH HISTORY — TRACK 5 DATA
// 30-Lesson Track · Lessons 1–6 implemented
// ═══════════════════════════════════════════


const A1_LEARN=[
  {sentence:'In 1607, the first colonists at _____ planted a cross on the shore of Cape Henry.',answer:'Jamestown',options:['Jamestown','Plymouth','Boston','Roanoke'],explanation:'Jamestown, founded in 1607, was the first permanent English settlement in North America.',tier:1},
  {sentence:'The first colonists at Jamestown planted a cross on the shore of Cape _____.',answer:'Henry',options:['Henry','Cod','Fear','Hatteras'],explanation:'The 1607 landing site at Cape Henry is commemorated as the first English act of Christian worship in the colony.',tier:1},
  {sentence:'The Jamestown colonists erected a sail-cloth chapel between four _____.',answer:'trees',options:['trees','posts','stones','ships'],explanation:'Their first place of worship was an open-air chapel improvised from a ship\'s sail.',tier:1},
  {sentence:'The first Jamestown colonists were _____, members of the Church of England.',answer:'Anglicans',options:['Anglicans','Puritans','Catholics','Quakers'],explanation:'The Church of England came to Virginia with the very first colonists in 1607.',tier:1},
  {sentence:'The Church of England was the _____ church of Virginia from the colony\'s first day.',answer:'established',options:['established','dominant','official','only'],explanation:'An established church is one supported by the state and recognized by law as official.',tier:1},
  {sentence:'The Church of England was formally established in Virginia by the House of _____ in 1619.',answer:'Burgesses',options:['Burgesses','Commons','Lords','Delegates'],explanation:'The House of Burgesses was Virginia\'s colonial legislative assembly.',tier:1},
  {sentence:'The Church of England was formally established in Virginia by the House of Burgesses in the year _____.',answer:'1619',options:['1619','1607','1624','1649'],explanation:'This made Virginia the first colony to legally establish the Anglican church.',tier:1},
  {sentence:'Religion in Virginia was less an experiment than a _____ of the English establishment.',answer:'transplant',options:['transplant','copy','shadow','reform'],explanation:'Unlike New England, Virginia copied England\'s existing church rather than founding a new kind of church.',tier:1},
  {sentence:'Virginia\'s parishes used the same _____ book, vestries, and parish geography as England.',answer:'prayer',options:['prayer','hymn','service','common'],explanation:'The Book of Common Prayer governed Anglican worship in Virginia as in England.',tier:1},
  {sentence:'The Anglican establishment was supported by parish _____.',answer:'taxes',options:['taxes','tithes','dues','offerings'],explanation:'Colonists were taxed to fund the established Anglican church.',tier:1},
  {sentence:'Catholics could not legally worship openly in Virginia until the year _____.',answer:'1781',options:['1781','1700','1776','1619'],explanation:'Anglican dominance excluded open Catholic worship for most of the colonial era.',tier:1},
  {sentence:'The Anglican establishment remained the dominant religious force in Virginia until the _____.',answer:'Revolution',options:['Revolution','Civil War','Reformation','Restoration'],explanation:'Disestablishment came only with the American Revolution and the Virginia Statute for Religious Freedom.',tier:1},
];

const A2_LEARN=[
  {sentence:'In 1620, a congregation of _____ Puritans who had fled to Holland sailed for Virginia.',answer:'Separatist',options:['Separatist','Non-Separatist','Anglican','Catholic'],explanation:'The Pilgrims were Separatists who had broken entirely from the Church of England.',tier:1},
  {sentence:'The Pilgrims had fled England for _____ before sailing to America.',answer:'Holland',options:['Holland','France','Scotland','Germany'],explanation:'They lived in Leiden, Holland for over a decade before the Mayflower voyage.',tier:1},
  {sentence:'The Pilgrims sailed for Virginia, missed it, and landed at Cape _____.',answer:'Cod',options:['Cod','Henry','Fear','Hatteras'],explanation:'Blown off course, they made landfall in present-day Massachusetts.',tier:1},
  {sentence:'Before going ashore, the men of the Mayflower signed a covenant called the Mayflower _____.',answer:'Compact',options:['Compact','Charter','Agreement','Covenant'],explanation:'It bound them into a "civil body politic" under God.',tier:1},
  {sentence:'The Mayflower Compact bound the signers into a "civil body _____."',answer:'politic',options:['politic','covenant','assembly','church'],explanation:'This was an early act of self-government among English settlers.',tier:1},
  {sentence:'A much larger Puritan migration was led by John _____ in 1630.',answer:'Winthrop',options:['Winthrop','Bradford','Cotton','Williams'],explanation:'Winthrop was the first governor of the Massachusetts Bay Colony.',tier:1},
  {sentence:'John Winthrop led 700 settlers and _____ ships to Massachusetts Bay in 1630.',answer:'11',options:['11','5','17','3'],explanation:'This launched the Great Migration of Puritans to New England.',tier:1},
  {sentence:'Winthrop preached that the colony would be "as a city upon a _____."',answer:'hill',options:['hill','rock','light','mount'],explanation:'The image, drawn from Matthew 5:14, became one of the most enduring metaphors in American rhetoric.',tier:1},
  {sentence:'The "city upon a hill" image comes from the Gospel of _____.',answer:'Matthew',options:['Matthew','Mark','Luke','John'],explanation:'Matthew 5:14 — "A city set on a hill cannot be hidden."',tier:1},
  {sentence:'The Massachusetts churches were _____: each gathered church was self-governing.',answer:'Congregational',options:['Congregational','Presbyterian','Episcopal','Baptist'],explanation:'There was no bishop or synod ruling over the local church.',tier:1},
  {sentence:'Massachusetts Congregational churches had no _____ ruling above them.',answer:'bishop',options:['bishop','synod','presbyter','king'],explanation:'Each congregation governed itself, unlike the episcopal Church of England.',tier:1},
  {sentence:'_____ College was chartered in 1636 to train a literate ministry.',answer:'Harvard',options:['Harvard','Yale','Princeton','William & Mary'],explanation:'The General Court feared leaving "an illiterate ministry to the churches."',tier:1},
];

const A3_LEARN=[
  {sentence:'Roger Williams was a separatist minister at _____ before his banishment.',answer:'Salem',options:['Salem','Boston','Plymouth','Cambridge'],explanation:'Williams served at Salem, in the Massachusetts Bay Colony.',tier:1},
  {sentence:'Roger Williams was banished in early _____ for his views on conscience.',answer:'1636',options:['1636','1630','1649','1638'],explanation:'The General Court convicted him of spreading dangerous opinions.',tier:1},
  {sentence:'Williams argued that civil _____ had no authority over conscience.',answer:'magistrates',options:['magistrates','churches','ministers','kings'],explanation:'He insisted the state had no power to compel religious belief.',tier:1},
  {sentence:'After his banishment, Williams was sheltered by the _____.',answer:'Narragansett',options:['Narragansett','Wampanoag','Pequot','Mohegan'],explanation:'The Narragansett people protected him through the winter.',tier:1},
  {sentence:'Williams founded _____ as the first government in the English-speaking world to guarantee religious liberty.',answer:'Providence',options:['Providence','Newport','Portsmouth','Hartford'],explanation:'Providence became the heart of the Rhode Island colony.',tier:1},
  {sentence:'Anne Hutchinson accused ministers of preaching a covenant of works instead of a covenant of _____.',answer:'grace',options:['grace','faith','mercy','love'],explanation:'This dispute became known as the Antinomian Controversy.',tier:1},
  {sentence:'Like Williams, Anne Hutchinson was also _____ from Massachusetts.',answer:'banished',options:['banished','exiled','imprisoned','executed'],explanation:'She was tried and exiled in 1638.',tier:1},
  {sentence:'Cecil Calvert\'s Maryland was founded in 1634 as a refuge for English _____.',answer:'Catholics',options:['Catholics','Quakers','Puritans','Jews'],explanation:'The Calvert family were prominent English Catholics.',tier:1},
  {sentence:'Maryland passed the Act Concerning _____ in 1649.',answer:'Religion',options:['Religion','Toleration','Conscience','Worship'],explanation:'It was the first toleration law in the English colonies.',tier:1},
  {sentence:'Maryland\'s 1649 act guaranteed free exercise to all _____ Christians.',answer:'Trinitarian',options:['Trinitarian','Protestant','baptized','peaceable'],explanation:'Protection was limited to those affirming the Trinity.',tier:1},
  {sentence:'The Quaker William Penn founded Pennsylvania in 1681 as a "holy _____."',answer:'experiment',options:['experiment','refuge','commonwealth','charter'],explanation:'Penn welcomed believers of many kinds to his colony.',tier:1},
  {sentence:'Pennsylvania welcomed Mennonites, German Pietists, Huguenots, and Jews, making it the most religiously _____ of the colonies.',answer:'plural',options:['plural','tolerant','open','diverse'],explanation:'No other colony matched Pennsylvania\'s religious diversity.',tier:1},
];

const A4_LEARN=[
  {sentence:'By mid-century, the heirs of the original "visible saints" struggled with declining _____.',answer:'piety',options:['piety','membership','faith','attendance'],explanation:'The intense conversion experiences of the founders were not reproduced in later generations.',tier:1},
  {sentence:'The original full church members were known as "visible _____."',answer:'saints',options:['saints','members','converts','elect'],explanation:'Only those who could relate a conversion experience were admitted to full membership.',tier:1},
  {sentence:'The 1662 compromise that baptized grandchildren of full members was the Half-Way _____.',answer:'Covenant',options:['Covenant','Platform','Synod','Accord'],explanation:'It granted partial membership without requiring a conversion narrative.',tier:1},
  {sentence:'The Half-Way Covenant was adopted in the year _____.',answer:'1662',options:['1662','1648','1676','1692'],explanation:'A synod approved it to address declining membership.',tier:1},
  {sentence:'The Half-Way Covenant baptized the _____ of full members without a conversion narrative.',answer:'grandchildren',options:['grandchildren','children','spouses','servants'],explanation:'It extended the covenant to a third generation that had not professed conversion.',tier:1},
  {sentence:'Critics said the Half-Way Covenant _____ the Puritan vision.',answer:'diluted',options:['diluted','betrayed','destroyed','strengthened'],explanation:'They feared it weakened the standard of a regenerate church membership.',tier:1},
  {sentence:'In early 1692, accusations of _____ in Salem produced a panic.',answer:'witchcraft',options:['witchcraft','heresy','sedition','blasphemy'],explanation:'The Salem episode became the most infamous witch panic in American history.',tier:1},
  {sentence:'The Salem magistrates accepted _____ evidence — testimony about visions and apparitions.',answer:'spectral',options:['spectral','circumstantial','hearsay','physical'],explanation:'Spectral evidence could not be verified or disproven, making convictions easy.',tier:1},
  {sentence:'The Salem panic swept up roughly _____ accused.',answer:'150',options:['150','50','200','300'],explanation:'The accusations spread far beyond Salem Village itself.',tier:1},
  {sentence:'The Salem trials ended with nineteen people hanged and one pressed to _____.',answer:'death',options:['death','exile','prison','flight'],explanation:'Giles Corey was pressed to death with stones for refusing to enter a plea.',tier:1},
  {sentence:'_____ Mather cautioned against the use of spectral evidence.',answer:'Increase',options:['Increase','Cotton','Samuel','Richard'],explanation:'His warnings helped turn opinion against the trials.',tier:1},
  {sentence:'Governor _____ dissolved the special court that had conducted the Salem trials.',answer:'Phips',options:['Phips','Dudley','Andros','Winthrop'],explanation:'His action in October 1692 effectively ended the prosecutions.',tier:1},
];

const A5_LEARN=[
  {sentence:'By the early eighteenth century, the Puritan _____ had cooled.',answer:'flame',options:['flame','doctrine','polity','tradition'],explanation:'Religious intensity had declined since the founding generation.',tier:1},
  {sentence:'The Half-Way Covenant had broadened church membership at the cost of _____.',answer:'intensity',options:['intensity','numbers','doctrine','unity'],explanation:'Wider membership came with weaker spiritual fervor.',tier:1},
  {sentence:'Enlightenment _____ was creeping into Boston pulpits.',answer:'rationalism',options:['rationalism','deism','skepticism','secularism'],explanation:'Reason-centered thinking competed with revivalist piety.',tier:1},
  {sentence:'The Dutch Reformed pietist who stirred New Jersey revivals was Theodorus _____.',answer:'Frelinghuysen',options:['Frelinghuysen','Tennent','Edwards','Whitefield'],explanation:'His preaching from the 1720s is often called the first stirring of the Awakening.',tier:1},
  {sentence:'Frelinghuysen belonged to the Dutch _____ church.',answer:'Reformed',options:['Reformed','Presbyterian','Baptist','Lutheran'],explanation:'He brought continental pietism into the Middle Colonies.',tier:1},
  {sentence:'Frelinghuysen preached urgent personal _____.',answer:'conversion',options:['conversion','holiness','repentance','baptism'],explanation:'He demanded a real experience of grace, not mere church membership.',tier:1},
  {sentence:'Frelinghuysen\'s example shaped a young Presbyterian named Gilbert _____.',answer:'Tennent',options:['Tennent','Edwards','Whitefield','Chauncy'],explanation:'Tennent became a leading revivalist of the Awakening.',tier:1},
  {sentence:'Gilbert Tennent was the son of William Tennent of the "_____ College."',answer:'Log',options:['Log','New','Old','Free'],explanation:'The Log College was a one-room academy training revivalist ministers.',tier:1},
  {sentence:'The Log College was located in the colony of _____.',answer:'Pennsylvania',options:['Pennsylvania','New Jersey','Virginia','New York'],explanation:'It was the seed of what became Princeton.',tier:1},
  {sentence:'Jonathan Edwards pastored a church in _____, Massachusetts.',answer:'Northampton',options:['Northampton','Boston','Salem','Cambridge'],explanation:'His congregation experienced a town-wide awakening in 1734–35.',tier:1},
  {sentence:'Edwards\'s congregation experienced a sudden awakening in the years 1734 to _____.',answer:'1735',options:['1735','1737','1739','1740'],explanation:'Hundreds professed conversion in a short period.',tier:1},
  {sentence:'Edwards described the revival in A Faithful _____ of the Surprising Work of God.',answer:'Narrative',options:['Narrative','Account','Record','History'],explanation:'Published in 1737, it circulated across the Atlantic and named the era.',tier:1},
];

const A6_LEARN=[
  {sentence:'The blaze came with the arrival of George _____, the young Anglican priest.',answer:'Whitefield',options:['Whitefield','Wesley','Tennent','Edwards'],explanation:'Whitefield became the central figure of the First Great Awakening.',tier:1},
  {sentence:'George Whitefield was a young _____ priest.',answer:'Anglican',options:['Anglican','Methodist','Presbyterian','Baptist'],explanation:'He was ordained in the Church of England in 1736.',tier:1},
  {sentence:'Whitefield\'s voice could carry to crowds of _____ thousand in an open field.',answer:'twenty',options:['twenty','five','ten','fifty'],explanation:'His remarkable oratorical power drew enormous outdoor crowds.',tier:1},
  {sentence:'Whitefield preached _____, weeping openly and drawing converts across denominations.',answer:'extemporaneously',options:['extemporaneously','from notes','from memory','in Latin'],explanation:'He spoke without notes, unlike most settled ministers of his day.',tier:1},
  {sentence:'Whitefield became known as the "Grand _____."',answer:'Itinerant',options:['Itinerant','Preacher','Revivalist','Awakener'],explanation:'He traveled an intercolonial circuit rather than serving one parish.',tier:1},
  {sentence:'On July 8, 1741, in _____, Connecticut, Edwards preached "Sinners in the Hands of an Angry God."',answer:'Enfield',options:['Enfield','Hartford','New Haven','Northampton'],explanation:'It became the most famous sermon in American history.',tier:1},
  {sentence:'Edwards\'s most famous sermon was titled "Sinners in the Hands of an _____ God."',answer:'Angry',options:['Angry','Righteous','Holy','Sovereign'],explanation:'Its vivid imagery of judgment produced strong emotional reactions.',tier:1},
  {sentence:'Gilbert Tennent\'s 1740 sermon accused fellow ministers of being unconverted "_____-Teachers."',answer:'Pharisee',options:['Pharisee','False','Dead','Blind'],explanation:'The sermon inflamed tensions among Presbyterians.',tier:1},
  {sentence:'In Boston, the Old Light pastor Charles _____ denounced the revival as dangerous enthusiasm.',answer:'Chauncy',options:['Chauncy','Mather','Sewall','Cooper'],explanation:'Chauncy was the leading critic of the Awakening.',tier:1},
  {sentence:'Chauncy denounced the revival as dangerous _____.',answer:'enthusiasm',options:['enthusiasm','emotion','fanaticism','zeal'],explanation:'"Enthusiasm" was an 18th-century pejorative for self-deluded emotional zeal.',tier:1},
  {sentence:'The colonial Presbyterian Synod split in 1741 into Old Side and _____ Side.',answer:'New',options:['New','Free','True','Reformed'],explanation:'New Side favored the revival; Old Side opposed it.',tier:1},
  {sentence:'The Presbyterian Old Side / New Side schism lasted _____ years.',answer:'seventeen',options:['seventeen','seven','twenty','ten'],explanation:'The two sides reunited in 1758.',tier:1},
];

const A1_STUDY={
  cards:[{
    text:'In 1607, Anglicans planted the Church of England at Jamestown. Religion in Virginia was a transplant of the English establishment — the same prayer book, vestries, and parish structure — rather than a fresh religious experiment like the New England colonies that followed.',
    terms:[
      {word:'Established church',def:'A state-supported church recognized by law as the official religion of a colony or country; the Church of England held this status in Virginia.'},
    ],
    questions:[
      {q:'How did religion in Virginia differ from the later New England colonies?',a:'Virginia transplanted the existing Church of England establishment, while New England colonies were founded as Puritan/Congregationalist experiments aimed at building a purer church.'},
    ]
  }],
  questions:[
    {q:'How did religion in Virginia differ from the later New England colonies?',a:'Virginia transplanted the existing Church of England establishment, while New England colonies were founded as Puritan/Congregationalist experiments aimed at building a purer church.'},
  ]
};

const A2_STUDY={
  cards:[{
    text:'The Pilgrims (Separatists) signed the Mayflower Compact at Plymouth in 1620; Puritan non-Separatists, led by Winthrop, founded Massachusetts Bay in 1630 as a covenanted "city upon a hill." The Massachusetts churches were Congregational — each self-governing, without bishops. Harvard was chartered in 1636 to train a literate ministry.',
    terms:[
      {word:'Separatist',def:'A Puritan who concluded the Church of England was beyond reform and broke from it entirely. The Plymouth Pilgrims were Separatists.'},
      {word:'Congregationalism',def:'The Massachusetts system in which each gathered church was self-governing, with no presbytery, synod, or bishop ruling over it.'},
    ],
    questions:[
      {q:'How did the Plymouth Pilgrims differ theologically from the Massachusetts Bay Puritans?',a:'The Pilgrims were Separatists who had broken from the Church of England entirely; the Massachusetts Bay Puritans were non-Separatists who hoped to purify the Church of England from within.'},
    ]
  }],
  questions:[
    {q:'How did the Plymouth Pilgrims differ theologically from the Massachusetts Bay Puritans?',a:'The Pilgrims were Separatists who had broken from the Church of England entirely; the Massachusetts Bay Puritans were non-Separatists who hoped to purify the Church of England from within.'},
  ]
};

const A3_STUDY={
  cards:[{
    text:'Roger Williams (banished 1636) founded Rhode Island with liberty of conscience; Anne Hutchinson was banished in 1638 in the Antinomian Controversy. Maryland (1649) and Pennsylvania (1681) experimented with toleration — Catholic-friendly Maryland under the Calverts, and Quaker Pennsylvania under Penn.',
    terms:[
      {word:'Liberty of conscience',def:'Roger Williams\'s phrase for the freedom of individual religious belief, untouched by civil power; written into Rhode Island\'s founding documents.'},
      {word:'Toleration Act of 1649',def:'Maryland\'s "Act Concerning Religion," which protected free exercise for all Trinitarian Christians — the first such law in the English colonies.'},
    ],
    questions:[
      {q:'Why was Roger Williams banished, and what did he establish?',a:'He argued the civil magistrate had no authority over religious matters. In Providence (1636) he founded the first government in the English-speaking world to guarantee religious liberty.'},
    ]
  }],
  questions:[
    {q:'Why was Roger Williams banished, and what did he establish?',a:'He argued the civil magistrate had no authority over religious matters. In Providence (1636) he founded the first government in the English-speaking world to guarantee religious liberty.'},
  ]
};

const A4_STUDY={
  cards:[{
    text:'As the founding generation aged, the 1662 Half-Way Covenant extended baptism to the children of unconverted members. The era ended in crisis at Salem in 1692, when the courts\' acceptance of spectral evidence led to nineteen hangings before Increase Mather and Governor Phips stopped it.',
    terms:[
      {word:'Half-Way Covenant',def:'The 1662 synod compromise allowing the children of baptized but unconverted Puritans to be baptized — partial membership without the Lord\'s Supper.'},
      {word:'Spectral evidence',def:'Courtroom testimony about dreams, visions, or apparitions of the accused. Its admission in 1692 made the Salem trials possible; its rejection ended them.'},
    ],
    questions:[
      {q:'What problem did the Half-Way Covenant try to solve?',a:'Declining church membership: as the first generation of converts died, their children and grandchildren often had no conversion narrative to report. The Covenant extended baptism without full communion.'},
      {q:'What ended the Salem witch trials?',a:'Public criticism by ministers — most prominently Increase Mather, who argued against spectral evidence — and Governor Phips\'s dissolution of the special court in October 1692.'},
    ]
  }],
  questions:[
    {q:'What problem did the Half-Way Covenant try to solve?',a:'Declining church membership: as the first generation of converts died, their children and grandchildren often had no conversion narrative to report. The Covenant extended baptism without full communion.'},
    {q:'What ended the Salem witch trials?',a:'Public criticism by ministers — most prominently Increase Mather, who argued against spectral evidence — and Governor Phips\'s dissolution of the special court in October 1692.'},
  ]
};

const A5_STUDY={
  cards:[{
    text:'By 1700 the Puritan flame had cooled. But revival embers persisted: Frelinghuysen\'s Dutch Reformed pietism in New Jersey, the Tennent family\'s Log College, and Edwards\'s 1734–35 Northampton awakening, whose Faithful Narrative turned scattered embers into a recognized movement.',
    terms:[
      {word:'Pietism',def:'A continental Protestant movement emphasizing heart religion, personal conversion, and practical holiness; it influenced Frelinghuysen.'},
      {word:'Log College',def:'William Tennent\'s Pennsylvania training school for revivalist Presbyterian ministers; precursor to Princeton.'},
    ],
    questions:[
      {q:'What conditions made the Awakening possible?',a:'Declining piety, Enlightenment rationalism, the Half-Way Covenant\'s diluted membership, and a sense that inherited religion had replaced personal conversion. Localized revivals had already begun in the 1720s under Frelinghuysen.'},
      {q:'Why was Edwards\'s A Faithful Narrative so influential?',a:'It gave the Atlantic evangelical world a model account of how revival began and spread. Whitefield, Wesley, and others read it and came to America expecting a similar work of the Spirit.'},
    ]
  }],
  questions:[
    {q:'What conditions made the Awakening possible?',a:'Declining piety, Enlightenment rationalism, the Half-Way Covenant\'s diluted membership, and a sense that inherited religion had replaced personal conversion. Localized revivals had already begun in the 1720s under Frelinghuysen.'},
    {q:'Why was Edwards\'s A Faithful Narrative so influential?',a:'It gave the Atlantic evangelical world a model account of how revival began and spread. Whitefield, Wesley, and others read it and came to America expecting a similar work of the Spirit.'},
  ]
};

const A6_STUDY={
  cards:[{
    text:'The blaze came with George Whitefield in 1739. He preached extemporaneously to massive outdoor crowds, transcending denominations. Edwards preached "Sinners in the Hands of an Angry God" at Enfield (1741); Tennent attacked unconverted clergy; Chauncy led an Old Light counterattack. The Presbyterian Synod split into Old Side and New Side in 1741.',
    terms:[
      {word:'New Lights / Old Lights',def:'New Lights embraced revivalism, conversion, and personal experience; Old Lights defended educated clergy, parish boundaries, and formal worship.'},
      {word:'Enthusiasm',def:'An 18th-century pejorative for emotional religious zeal believed to be self-deluded; the standard Old Light charge against the revival.'},
    ],
    questions:[
      {q:'What made George Whitefield\'s preaching distinctive?',a:'Extemporaneous, theatrical, outdoor, intercolonial, and unconcerned with parish boundaries. He united listeners of many denominations under a common message of personal new birth.'},
      {q:'What did Old Lights like Charles Chauncy object to?',a:'The "extravagant emotion" of revivalist preaching, itinerants invading settled parishes, and the implication that converted experience trumped educated ordination. They feared the revival was self-deceived enthusiasm.'},
    ]
  }],
  questions:[
    {q:'What made George Whitefield\'s preaching distinctive?',a:'Extemporaneous, theatrical, outdoor, intercolonial, and unconcerned with parish boundaries. He united listeners of many denominations under a common message of personal new birth.'},
    {q:'What did Old Lights like Charles Chauncy object to?',a:'The "extravagant emotion" of revivalist preaching, itinerants invading settled parishes, and the implication that converted experience trumped educated ordination. They feared the revival was self-deceived enthusiasm.'},
  ]
};

const A1_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 1 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">Colonial Foundations I</h1>
<p class="article-sub">Anglican Virginia · 1607–1619</p>
<div class="art-divider"></div>
<div class="article-body">
<p>How the Church of England was transplanted, largely unchanged, into the soil of Virginia.</p>
<p>American Christianity does not have a single starting point. In 1607, the first colonists at Jamestown planted a cross on the shore of Cape Henry and erected a sail-cloth chapel between four trees. They were Anglicans, and the <strong>Church of England</strong> was the established church of Virginia from the colony's first day, formally fixed by the <strong>House of Burgesses in 1619</strong>.</p>
<figure style="margin:1.75rem 0;border:1px solid rgba(20,8,12,0.1);overflow:hidden;">
  <img src="/images/america/L1_Jamestown.jpeg" style="width:100%;display:block;object-fit:cover;max-height:360px;">
  <figcaption><strong>Jamestown, Virginia · 1607</strong> The first permanent English settlement in America, where colonists planted a cross and erected a sail-cloth chapel on the shore of Cape Henry.</figcaption>
</figure>
<p>Religion in Virginia was less an experiment than a transplant: the same prayer book, the same vestries, the same parish geography stretched thin across the tobacco country. The colony's most prominent early minister, <strong>Alexander Whitaker</strong> — known as the "Apostle of Virginia" — baptized <strong>Pocahontas</strong> at Henrico in 1613, a signal moment in the church's early colonial life. Catholics could not legally worship openly in Virginia until 1781. The Anglican establishment, supported by parish taxes and centered on the Book of Common Prayer, would remain the dominant religious force in Virginia until the Revolution.</p>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">1607</div><div class="atl-text">Jamestown founded; Church of England arrives in Virginia</div></div>
  <div class="atl-row"><div class="atl-year">1613</div><div class="atl-text">Alexander Whitaker baptizes Pocahontas at Henrico</div></div>
  <div class="atl-row"><div class="atl-year">1619</div><div class="atl-text">House of Burgesses formally establishes Anglicanism in Virginia</div></div>
</div>
</div>`;

const A2_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 2 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">Colonial Foundations II</h1>
<p class="article-sub">Pilgrims &amp; Puritans · 1620–1636</p>
<div class="art-divider"></div>
<div class="article-body">
<p>How Separatist Pilgrims and non-Separatist Puritans built a covenanted society in New England.</p>
<p>In 1620, a small congregation of Separatist Puritans who had fled England for Holland sailed for Virginia, missed it, and landed at Cape Cod. Before going ashore, the men of the <strong>Mayflower</strong> signed a covenant — the <strong>Mayflower Compact</strong> — binding themselves into a "civil body politic" under God. They were Pilgrims; they had come to be a pure church.</p>
<p>A decade later, a much larger Puritan migration began. <strong>John Winthrop</strong> led 700 settlers and 11 ships to Massachusetts Bay in 1630, preaching that they would be <strong>"as a city upon a hill"</strong> — a covenanted society whose success or failure all the world would watch. The Massachusetts churches were <strong>Congregational</strong>: each gathered church was self-governing, with no bishop above it. <strong>Harvard College</strong> was chartered in 1636 to train a literate ministry.</p>
<figure class="art-fig portrait">
  <div class="fig-img-wrap"><img src="/images/america/L2_Winthrop.jpeg" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block;"></div>
  <div class="fig-body">
    <div class="fig-label">Massachusetts Bay · 1630</div>
    <div class="fig-title">John Winthrop</div>
    <div class="fig-desc">Governor of the Massachusetts Bay Colony, Winthrop preached the founding sermon "A Model of Christian Charity" aboard the Arbella, calling the new colony to be "as a city upon a hill."</div>
  </div>
</figure>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">1620</div><div class="atl-text">Pilgrims sign the Mayflower Compact; Plymouth Colony founded</div></div>
  <div class="atl-row"><div class="atl-year">1630</div><div class="atl-text">Winthrop leads the Great Migration to Massachusetts Bay</div></div>
  <div class="atl-row"><div class="atl-year">1636</div><div class="atl-text">Harvard College founded to train a literate ministry</div></div>
</div>
<div class="pull-quote">
  <p>"For we must consider that we shall be as a city upon a hill. The eyes of all people are upon us."</p>
  <cite>— John Winthrop, "A Model of Christian Charity," c. 1630</cite>
</div>
</div>`;

const A3_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 3 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">Dissent &amp; Toleration</h1>
<p class="article-sub">Williams, Hutchinson, Maryland &amp; Penn · 1636–1681</p>
<div class="art-divider"></div>
<div class="article-body">
<p>How banished dissenters and tolerant proprietors planted the first seeds of religious liberty.</p>
<p><strong>Roger Williams</strong>, a separatist minister at Salem, was banished in early 1636 for arguing that civil magistrates had no authority over conscience. He fled south, was sheltered by the Narragansett, and founded Providence as the first government in the English-speaking world to guarantee religious liberty in its charter. A year later, <strong>Anne Hutchinson</strong> was tried for accusing Massachusetts ministers of preaching a <strong>covenant of works</strong> instead of a covenant of grace. She, too, was banished.</p>
<figure class="art-fig portrait">
  <div class="fig-img-wrap"><img src="/images/america/L3_RogerWilliams.jpeg" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block;"></div>
  <div class="fig-body">
    <div class="fig-label">Providence · 1636</div>
    <div class="fig-title">Roger Williams</div>
    <div class="fig-desc">Banished from Massachusetts for arguing that civil magistrates had no authority over conscience, Williams founded Providence — the first government in the English-speaking world to guarantee religious liberty in its charter.</div>
  </div>
</figure>
<p>To the south, other colonies experimented with toleration. Cecil Calvert's <strong>Maryland</strong>, founded in 1634 as a refuge for English Catholics, passed the <strong>Act Concerning Religion in 1649</strong>, guaranteeing free exercise to all Trinitarian Christians. Decades later, the Quaker <strong>William Penn</strong> founded <strong>Pennsylvania in 1681</strong> as a "holy experiment," welcoming Mennonites, German Pietists, Huguenots, and Jews — the most religiously plural of the colonies.</p>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">1636</div><div class="atl-text">Roger Williams banished; founds Providence</div></div>
  <div class="atl-row"><div class="atl-year">1638</div><div class="atl-text">Anne Hutchinson banished — Antinomian Controversy</div></div>
  <div class="atl-row"><div class="atl-year">1649</div><div class="atl-text">Maryland passes the Act Concerning Religion</div></div>
  <div class="atl-row"><div class="atl-year">1681</div><div class="atl-text">William Penn founds Pennsylvania as a "holy experiment"</div></div>
</div>
<div class="pull-quote">
  <p>"It is the will and command of God that…a permission of the most paganish, Jewish, Turkish, or anti-Christian consciences and worships, be granted to all men."</p>
  <cite>— Roger Williams, The Bloudy Tenent of Persecution, 1644</cite>
</div>
</div>`;

const A4_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 4 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">Decline &amp; Crisis</h1>
<p class="article-sub">Half-Way Covenant &amp; Salem · 1662–1692</p>
<div class="art-divider"></div>
<div class="article-body">
<p>How declining piety and the Salem panic shook the moral authority of the Puritan commonwealth.</p>
<p>By mid-century, the heirs of the original "visible saints" struggled with declining piety. Their answer was the <strong>Half-Way Covenant of 1662</strong>, which baptized the grandchildren of full members without requiring a conversion narrative — but explicitly denied them the Lord's Supper or a vote in church affairs, a compromise that critics said diluted the Puritan vision.</p>
<p>The decades that followed brought further crisis. <strong>King Philip's War (1676)</strong>, a devastating conflict with the Wampanoag and their allies, killed thousands and razed dozens of New England towns. Puritan ministers interpreted the catastrophe as God's judgment on a backsliding people.</p>
<p>The century closed in fire. In early 1692, accusations of witchcraft in Salem — and the magistrates' acceptance of <strong>spectral evidence</strong> — produced a panic that swept up more than 150 accused and ended with <strong>nineteen people hanged</strong> and one pressed to death. <strong>Cotton Mather</strong> defended the prosecutions in <em>Wonders of the Invisible World</em> (1692); his father <strong>Increase Mather</strong> took the opposite stance, arguing against spectral evidence and helping persuade Governor <strong>Phips</strong> to dissolve the special court. In 1697, Judge <strong>Samuel Sewall</strong> stood in Boston's Old South Church while a public confession of his guilt was read aloud — the only Salem judge to repent openly. The Puritan commonwealth's moral authority had been shaken beyond recovery.</p>
<figure style="margin:1.75rem 0;border:1px solid rgba(20,8,12,0.1);overflow:hidden;">
  <img src="/images/america/L4_Salem.jpeg" style="width:100%;display:block;object-fit:cover;max-height:360px;">
  <figcaption><strong>The Salem Witch Trials · 1692</strong> Nineteen people were hanged and one pressed to death before Governor Phips dissolved the special court — the most infamous episode in Puritan history.</figcaption>
</figure>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">1662</div><div class="atl-text">Half-Way Covenant adopted by the Massachusetts Synod</div></div>
  <div class="atl-row"><div class="atl-year">1676</div><div class="atl-text">King Philip's War devastates New England</div></div>
  <div class="atl-row"><div class="atl-year">1692</div><div class="atl-text">Salem witch trials; 19 hanged, 1 pressed to death</div></div>
  <div class="atl-row"><div class="atl-year">1697</div><div class="atl-text">Judge Sewall publicly repents his role in the trials</div></div>
</div>
</div>`;

const A5_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 5 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">The First Awakening I</h1>
<p class="article-sub">Embers Before the Blaze · 1720–1738</p>
<div class="art-divider"></div>
<div class="article-body">
<p>How scattered embers of revival began to glow before the great blaze of the 1740s.</p>
<p>By the early eighteenth century, the Puritan flame had cooled. The Half-Way Covenant had broadened church membership at the cost of intensity, and Enlightenment rationalism was creeping into Boston pulpits. Yet embers still glowed. The Dutch Reformed pietist <strong>Theodorus Frelinghuysen</strong>, ministering in New Jersey from the 1720s, preached urgent personal conversion and stirred local revivals. His most controversial requirement was demanding evidence of genuine personal conversion before admitting anyone to <strong>communion</strong> — a practice that created conflict in his denomination but deepened the revival's roots.</p>
<p>His example shaped a young Presbyterian named <strong>Gilbert Tennent</strong>, son of William Tennent of the <strong>"Log College"</strong> — a one-room academy in Pennsylvania training a generation of revivalist ministers. Meanwhile in <strong>Northampton, Massachusetts</strong>, <strong>Jonathan Edwards</strong> watched his congregation experience a sudden, town-wide spiritual awakening in <strong>1734–35</strong>. His account of it — <strong>A Faithful Narrative of the Surprising Work of God</strong> (1737) — circulated across the Atlantic and gave the next decade its name.</p>
<figure style="margin:1.75rem 0;border:1px solid rgba(20,8,12,0.1);overflow:hidden;">
  <img src="/images/america/L5_SinnersInTheHands.jpeg" style="width:100%;display:block;object-fit:cover;object-position:top center;max-height:360px;">
  <figcaption><strong>"Sinners in the Hands of an Angry God" · Enfield, CT, 1741</strong> Jonathan Edwards's most famous sermon, preached as the Great Awakening crested, became the defining text of American revivalism.</figcaption>
</figure>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">1720s</div><div class="atl-text">Frelinghuysen preaches revival in New Jersey's Raritan Valley</div></div>
  <div class="atl-row"><div class="atl-year">1727</div><div class="atl-text">William Tennent establishes the Log College in Pennsylvania</div></div>
  <div class="atl-row"><div class="atl-year">1734</div><div class="atl-text">Edwards's Northampton revival begins</div></div>
  <div class="atl-row"><div class="atl-year">1737</div><div class="atl-text">Edwards publishes A Faithful Narrative</div></div>
</div>
<div class="pull-quote">
  <p>"There was scarcely a single person in the town, either old or young, that was left unconcerned about the great things of the eternal world."</p>
  <cite>— Jonathan Edwards, A Faithful Narrative, 1737</cite>
</div>
</div>`;

const A6_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 6 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">The First Awakening II</h1>
<p class="article-sub">The Grand Itinerant · 1739–1746</p>
<div class="art-divider"></div>
<div class="article-body">
<p>How an itinerant preacher and a famous sermon brought the revival to a continental peak — and split the churches.</p>
<p>The blaze came with the arrival of <strong>George Whitefield</strong>, the young Anglican priest whose voice could carry to crowds of twenty thousand in an open field. He preached extemporaneously, wept openly, and drew converts across denominational lines. Between 1739 and 1741 he traveled an intercolonial circuit, becoming the <strong>"Grand Itinerant."</strong></p>
<figure class="art-fig portrait">
  <div class="fig-img-wrap"><img src="/images/america/L6_Whitefield.jpeg" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block;"></div>
  <div class="fig-body">
    <div class="fig-label">The Grand Itinerant · 1739–1741</div>
    <div class="fig-title">George Whitefield</div>
    <div class="fig-desc">The young Anglican priest whose voice could carry to crowds of twenty thousand. He preached extemporaneously, wept openly, and drew converts across denominational lines — becoming the first celebrity of colonial America.</div>
  </div>
</figure>
<p>On July 8, 1741, in Enfield, Connecticut, Jonathan Edwards preached <strong>"Sinners in the Hands of an Angry God."</strong> That same season, Gilbert Tennent's 1740 sermon accusing fellow ministers of being unconverted <strong>"Pharisee-Teachers"</strong> tore through New England. In Boston the Old Light pastor <strong>Charles Chauncy</strong> denounced the revival as dangerous enthusiasm. The colonial Presbyterian Synod split in <strong>1741</strong> into Old Side and New Side — a schism that lasted seventeen years.</p>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">1739</div><div class="atl-text">Whitefield's colonial tour begins the intercolonial revival</div></div>
  <div class="atl-row"><div class="atl-year">1740</div><div class="atl-text">Tennent's "Danger of an Unconverted Ministry" at Nottingham, PA</div></div>
  <div class="atl-row"><div class="atl-year">1741</div><div class="atl-text">Edwards preaches at Enfield; Presbyterian Synod splits Old/New Side</div></div>
  <div class="atl-row"><div class="atl-year">1746</div><div class="atl-text">Princeton (College of New Jersey) founded by New Side Presbyterians</div></div>
</div>
<div class="pull-quote">
  <p>"The God that holds you over the pit of hell, much as one holds a spider, or some loathsome insect, over the fire, abhors you, and is dreadfully provoked."</p>
  <cite>— Jonathan Edwards, "Sinners in the Hands of an Angry God," Enfield, CT, July 8, 1741</cite>
</div>
</div>`;

// Wire track5 lesson data
const _track5=TRACKS.find(t=>t.id==='track5');
_track5.lessons[0].articleHtml=A1_ARTICLE_HTML;
_track5.lessons[1].articleHtml=A2_ARTICLE_HTML;
_track5.lessons[2].articleHtml=A3_ARTICLE_HTML;
_track5.lessons[3].articleHtml=A4_ARTICLE_HTML;
_track5.lessons[4].articleHtml=A5_ARTICLE_HTML;
_track5.lessons[5].articleHtml=A6_ARTICLE_HTML;
_track5.lessons[0].learn=A1_LEARN;
_track5.lessons[1].learn=A2_LEARN;
_track5.lessons[2].learn=A3_LEARN;
_track5.lessons[3].learn=A4_LEARN;
_track5.lessons[4].learn=A5_LEARN;
_track5.lessons[5].learn=A6_LEARN;
_track5.lessons[0].study=A1_STUDY;
_track5.lessons[1].study=A2_STUDY;
_track5.lessons[2].study=A3_STUDY;
_track5.lessons[3].study=A4_STUDY;
_track5.lessons[4].study=A5_STUDY;
_track5.lessons[5].study=A6_STUDY;
_track5.lessons[0].coldOpen={_bg:'/images/america/L1_Jamestown.jpeg',cards:[
  {label:'The World Before',text:'A century after the Reformation, Europe is still bleeding over which church is the true one.',size:'lg'},
  {label:'The Crisis',text:'Anglicans board ships for a new coast, carrying the Church of England with them.',size:'xl'},
  {label:'The Key Figures',text:'The Virginia colonists. The House of Burgesses.',size:'lg'},
  {label:'The Bridge',text:'Here is how English Christianity first planted itself in America — as a transplant, not an experiment.',size:'md'},
]};
_track5.lessons[1].coldOpen={_bg:'/images/america/L2_Winthrop.jpeg',cards:[
  {label:'The World Before',text:'A small congregation flees England for Holland, seeking a pure church.',size:'lg'},
  {label:'The Crisis',text:'They sail for Virginia, miss it, and land at Cape Cod instead.',size:'xl'},
  {label:'The Key Figures',text:'William Bradford. John Winthrop.',size:'lg'},
  {label:'The Bridge',text:'Here is how the Puritan vision of a covenanted society took root in New England.',size:'md'},
]};
_track5.lessons[2].coldOpen={_bg:'/images/america/L3_RogerWilliams.jpeg',cards:[
  {label:'The Crisis',text:'The Puritan project produces its own dissenters almost immediately.',size:'xl'},
  {label:'The Key Figures',text:'Roger Williams. Anne Hutchinson. William Penn.',size:'lg'},
  {label:'The Surprise',text:'The colonies founded for one church\'s freedom became the seedbed of religious liberty for all.',size:'xl'},
  {label:'The Bridge',text:'Here is how banished dissenters and tolerant proprietors planted the first seeds of religious liberty.',size:'md'},
]};
_track5.lessons[3].coldOpen={_bg:'/images/america/L4_Salem.jpeg',cards:[
  {label:'The World Before',text:'A century after the Puritans landed, their grandchildren no longer wept in church.',size:'lg'},
  {label:'The Crisis',text:'Declining piety, then a witch panic, shake the Puritan commonwealth.',size:'xl'},
  {label:'The Key Figures',text:'Increase Mather. Cotton Mather. Governor Phips.',size:'lg'},
  {label:'The Bridge',text:'Here is how declining piety and the Salem panic shook the moral authority of the Puritan commonwealth.',size:'md'},
]};
_track5.lessons[4].coldOpen={_bg:'/images/america/L5_SinnersInTheHands.jpeg',cards:[
  {label:'The World Before',text:'A century after the Puritans landed, the fire of conversion has gone out.',size:'lg'},
  {label:'The Crisis',text:'Rationalist Enlightenment is creeping into every pulpit.',size:'xl'},
  {label:'The Key Figures',text:'Theodorus Frelinghuysen. The Tennents. Jonathan Edwards.',size:'lg'},
  {label:'The Bridge',text:'Here is how scattered embers of revival began to glow before the great blaze of the 1740s.',size:'md'},
]};
_track5.lessons[5].coldOpen={_bg:'/images/america/L6_Whitefield.jpeg',cards:[
  {label:'The Crisis',text:'The embers need a wind. In 1739, the wind arrives.',size:'xl'},
  {label:'The Key Figures',text:'George Whitefield. Jonathan Edwards. Gilbert Tennent. Charles Chauncy.',size:'lg'},
  {label:'The Surprise',text:'The fire that returns will not stay inside the established churches — it will build new ones.',size:'xl'},
  {label:'The Bridge',text:'Here is how an itinerant preacher and a famous sermon brought the revival to a continental peak — and split the churches.',size:'md'},
]};


// ═══════════════════════════════════════════
// TRACK 5 LESSONS 7–12 DATA
// ═══════════════════════════════════════════

const A7_LEARN=[
  {sentence:'The Awakening\'s most lasting marks were _____.',answer:'institutional',options:['institutional','emotional','theological','political'],explanation:'Colleges and new denominations outlasted the emotional revival itself.',tier:1},
  {sentence:'New Light parties founded _____ in 1746 to train revival-friendly ministers.',answer:'Princeton',options:['Princeton','Harvard','Yale','Brown'],explanation:'Then called the College of New Jersey, it grew out of the Log College tradition.',tier:1},
  {sentence:'The Baptist college founded in 1764 in the revival\'s wake was _____.',answer:'Brown',options:['Brown','Rutgers','Dartmouth','Princeton'],explanation:'Brown was founded by Baptists in Rhode Island.',tier:1},
  {sentence:'The Dutch Reformed founded _____ in 1766.',answer:'Rutgers',options:['Rutgers','Brown','Dartmouth','Princeton'],explanation:'Originally Queen\'s College in New Jersey.',tier:1},
  {sentence:'The college founded in 1769, partly to train ministers to Native peoples, was _____.',answer:'Dartmouth',options:['Dartmouth','Rutgers','Brown','Princeton'],explanation:'Dartmouth grew out of an Indian charity school in New Hampshire.',tier:1},
  {sentence:'The revival fueled the explosive growth of the _____.',answer:'Baptists',options:['Baptists','Anglicans','Lutherans','Catholics'],explanation:'Especially the Separate Baptists who formed congregations of the converted.',tier:1},
  {sentence:'The fast-growing revivalist Baptists were called "_____ Baptists."',answer:'Separate',options:['Separate','Free','New','Reform'],explanation:'They separated from established churches to form gathered congregations.',tier:1},
  {sentence:'Separate Baptists formed congregations of the _____.',answer:'converted',options:['converted','baptized','elect','saved'],explanation:'They admitted only those who professed a genuine conversion.',tier:1},
  {sentence:'The revival had _____ as much as it united.',answer:'divided',options:['divided','weakened','confused','scattered'],explanation:'It split denominations into New Light and Old Light factions.',tier:1},
  {sentence:'_____ Lights embraced conversion and itinerant preaching.',answer:'New',options:['New','Old','True','Free'],explanation:'New Lights prized personal experience and revival methods.',tier:1},
  {sentence:'_____ Lights defended educated clergy and parish order.',answer:'Old',options:['Old','New','High','Low'],explanation:'Old Lights distrusted emotional revivalism and itinerancy.',tier:1},
  {sentence:'The Awakening planted a confidence in personal _____ over inherited authority.',answer:'experience',options:['experience','reason','scripture','tradition'],explanation:'This emphasis would echo in the democratic temper of the Revolution.',tier:1},
];

const A8_LEARN=[
  {sentence:'When tensions with Britain rose, _____ were among the most influential voices in the colonies.',answer:'ministers',options:['ministers','lawyers','merchants','soldiers'],explanation:'The pulpit was a primary channel of public opinion in colonial America.',tier:1},
  {sentence:'Many _____ and Presbyterian preachers framed the patriot cause in religious terms.',answer:'Congregational',options:['Congregational','Anglican','Baptist','Methodist'],explanation:'These were the dominant Reformed traditions of New England and the Middle Colonies.',tier:1},
  {sentence:'Patriot preachers drew on a tradition of resistance to _____.',answer:'tyranny',options:['tyranny','taxation','monarchy','England'],explanation:'Reformed political thought had long justified resistance to unjust rulers.',tier:1},
  {sentence:'Patriot preaching drew on the Awakening\'s habit of _____ appeal.',answer:'mass',options:['mass','emotional','colonial','biblical'],explanation:'Revival had taught preachers to reach large, cross-colonial audiences.',tier:1},
  {sentence:'The British called New England\'s patriot clergy the "Black _____."',answer:'Regiment',options:['Regiment','Guard','Army','Company'],explanation:'The name referred to their black preaching robes.',tier:1},
  {sentence:'The "Black Regiment" was named for the preachers\' black preaching _____.',answer:'robes',options:['robes','coats','hats','bands'],explanation:'Clergy wore black Geneva-style robes in the pulpit.',tier:1},
  {sentence:'Most _____ clergy remained loyalists during the Revolution.',answer:'Anglican',options:['Anglican','Baptist','Presbyterian','Congregational'],explanation:'They were bound by ordination oaths to the king.',tier:1},
  {sentence:'Anglican clergy were bound by ordination _____ to the king.',answer:'oaths',options:['oaths','salaries','taxes','licenses'],explanation:'This made open support for independence a violation of their vows.',tier:1},
  {sentence:'Many loyalist Anglican clergy fled or fell _____.',answer:'silent',options:['silent','abroad','imprisoned','executed'],explanation:'Open loyalism became dangerous as the war progressed.',tier:1},
  {sentence:'_____ and other pacifists refused to take up arms.',answer:'Quakers',options:['Quakers','Baptists','Methodists','Lutherans'],explanation:'Their pacifist convictions forbade participation in war.',tier:1},
  {sentence:'The dominant religious energy ran toward _____.',answer:'independence',options:['independence','loyalty','neutrality','pacifism'],explanation:'Despite loyalist and pacifist exceptions, most religious momentum favored the patriots.',tier:1},
  {sentence:'The language of covenant, providence, and _____ saturated revolutionary rhetoric.',answer:'liberty',options:['liberty','justice','equality','freedom'],explanation:'Biblical and Reformed political vocabulary shaped the patriot cause.',tier:1},
];

const A9_LEARN=[
  {sentence:'Virginia had jailed _____ preachers for unlicensed preaching before the Revolution.',answer:'Baptist',options:['Baptist','Catholic','Quaker','Lutheran'],explanation:'These persecuted dissenters became strong advocates for disestablishment.',tier:1},
  {sentence:'Virginia jailed Baptist preachers for _____ preaching.',answer:'unlicensed',options:['unlicensed','seditious','public','outdoor'],explanation:'The establishment required ministers to be licensed by the state.',tier:1},
  {sentence:'After independence, dissenters joined with Enlightenment _____ to end the Anglican establishment.',answer:'statesmen',options:['statesmen','clergy','courts','governors'],explanation:'An unusual alliance of pious Baptists and rationalist statesmen formed.',tier:1},
  {sentence:'James Madison\'s 1785 argument against religious funding was titled the "Memorial and _____."',answer:'Remonstrance',options:['Remonstrance','Petition','Address','Declaration'],explanation:'It helped defeat a bill to fund Christian teachers in Virginia.',tier:1},
  {sentence:'Madison\'s "Memorial and Remonstrance" argued against state support for _____.',answer:'religion',options:['religion','clergy','monarchy','tradition'],explanation:'He held that compelled support corrupted both church and state.',tier:1},
  {sentence:'Madison\'s Memorial and Remonstrance was written in the year _____.',answer:'1785',options:['1785','1776','1791','1789'],explanation:'It cleared the way for Jefferson\'s Statute the following year.',tier:1},
  {sentence:'The Virginia Statute for Religious Freedom was authored by Thomas _____.',answer:'Jefferson',options:['Jefferson','Madison','Mason','Henry'],explanation:'Jefferson drafted it years earlier; Madison secured its passage.',tier:1},
  {sentence:'The Virginia Statute for Religious Freedom passed in the year _____.',answer:'1786',options:['1786','1776','1791','1789'],explanation:'It became law a year after Madison\'s Remonstrance.',tier:1},
  {sentence:'The Statute declared that no one could be _____ to support any religious worship.',answer:'compelled',options:['compelled','taxed','licensed','encouraged'],explanation:'It abolished mandatory financial support for churches.',tier:1},
  {sentence:'Jefferson ranked the Statute among his three proudest _____.',answer:'achievements',options:['achievements','writings','laws','legacies'],explanation:'He listed it on his tombstone alongside the Declaration and the University of Virginia.',tier:1},
  {sentence:'Jefferson listed the Statute alongside the Declaration of Independence and the founding of the University of _____.',answer:'Virginia',options:['Virginia','America','Pennsylvania','Maryland'],explanation:'These were the three achievements he chose for his epitaph.',tier:1},
  {sentence:'Virginia\'s experiment became the model for religious liberty in the national _____.',answer:'Constitution',options:['Constitution','Congress','courts','government'],explanation:'It directly shaped the First Amendment\'s religion clauses.',tier:1},
];

const A10_LEARN=[
  {sentence:'The 1787 Constitution mentioned religion only once — to forbid any religious _____ for federal office.',answer:'test',options:['test','oath','title','establishment'],explanation:'Article VI bans religious tests for holding office.',tier:1},
  {sentence:'The Constitution\'s only mention of religion concerned holding federal _____.',answer:'office',options:['office','courts','elections','treaties'],explanation:'No officeholder could be required to pass a religious test.',tier:1},
  {sentence:'The Constitution\'s silence meant the new nation declined to name an official _____.',answer:'faith',options:['faith','language','holiday','currency'],explanation:'This was a deliberate and remarkable choice.',tier:1},
  {sentence:'The First Amendment was ratified in the year _____.',answer:'1791',options:['1791','1787','1789','1776'],explanation:'It came four years after the Constitution itself.',tier:1},
  {sentence:'Congress could make no law "respecting an _____ of religion."',answer:'establishment',options:['establishment','practice','teaching','promotion'],explanation:'This is the Establishment Clause.',tier:1},
  {sentence:'Congress could make no law "prohibiting the _____ exercise thereof."',answer:'free',options:['free','public','private','lawful'],explanation:'This is the Free Exercise Clause.',tier:1},
  {sentence:'The First Amendment\'s twin guarantees were no establishment and _____ exercise.',answer:'free',options:['free','equal','lawful','public'],explanation:'Together they frame American church-state relations.',tier:1},
  {sentence:'The religion clauses set the framework for American _____ relations ever after.',answer:'church-state',options:['church-state','civil-religious','faith-government','sacred-secular'],explanation:'They remain the foundation of religious liberty law.',tier:1},
  {sentence:'The First Amendment applied at first only to the _____ government.',answer:'federal',options:['federal','state','local','colonial'],explanation:'States kept their own establishments for decades.',tier:1},
  {sentence:'Several _____ kept their religious establishments for decades after 1791.',answer:'states',options:['states','counties','cities','territories'],explanation:'Disestablishment at the state level came gradually.',tier:1},
  {sentence:'_____ was the last state to disestablish, in 1833.',answer:'Massachusetts',options:['Massachusetts','Connecticut','Virginia','New York'],explanation:'It maintained a Congregational establishment longest.',tier:1},
  {sentence:'The principle was set: religion would be voluntary, plural, and free of federal _____.',answer:'control',options:['control','taxes','oversight','sponsorship'],explanation:'This voluntary principle shaped American religious life.',tier:1},
];

const A11_LEARN=[
  {sentence:'As Americans pushed _____, a second great wave of revival broke out around 1800.',answer:'west',options:['west','south','north','east'],explanation:'The frontier outpaced the reach of settled churches.',tier:1},
  {sentence:'The second wave of revival broke out around the year _____.',answer:'1800',options:['1800','1740','1770','1830'],explanation:'It is known as the Second Great Awakening.',tier:1},
  {sentence:'The signature form of frontier revival was the _____ meeting.',answer:'camp',options:['camp','prayer','revival','outdoor'],explanation:'A multi-day outdoor gathering of thousands.',tier:1},
  {sentence:'At a camp meeting, thousands camped, sang, prayed, and heard preaching around the _____.',answer:'clock',options:['clock','fire','altar','tent'],explanation:'Meetings ran continuously for days.',tier:1},
  {sentence:'The most famous camp meeting was at Cane Ridge, _____, in 1801.',answer:'Kentucky',options:['Kentucky','Tennessee','Ohio','Virginia'],explanation:'It became the iconic event of the frontier revival.',tier:1},
  {sentence:'The most famous camp meeting was held at Cane _____ in 1801.',answer:'Ridge',options:['Ridge','Creek','Fork','Run'],explanation:'An estimated 10,000–20,000 attended.',tier:1},
  {sentence:'The Cane Ridge meeting took place in the year _____.',answer:'1801',options:['1801','1800','1803','1798'],explanation:'It drew enormous crowds amid intense emotional fervor.',tier:1},
  {sentence:'An estimated 10,000 to _____ gathered at Cane Ridge.',answer:'20,000',options:['20,000','5,000','50,000','2,000'],explanation:'The crowd dwarfed the surrounding frontier population.',tier:1},
  {sentence:'Where Edwards had stressed God\'s _____, frontier revivalists emphasized human choice.',answer:'sovereignty',options:['sovereignty','wrath','grace','love'],explanation:'The theological tone shifted from the First Awakening.',tier:1},
  {sentence:'Frontier revivalists emphasized human choice and the call to _____ for Christ.',answer:'decide',options:['decide','pray','repent','convert'],explanation:'This decisional emphasis shaped later American evangelism.',tier:1},
  {sentence:'The revival fueled the rapid growth of the Methodists and _____.',answer:'Baptists',options:['Baptists','Presbyterians','Lutherans','Quakers'],explanation:'Both were well-suited to frontier conditions.',tier:1},
  {sentence:'The Second Awakening set in motion a more activist, _____ American Protestantism.',answer:'optimistic',options:['optimistic','Calvinist','academic','ritualistic'],explanation:'It encouraged confidence in human effort and reform.',tier:1},
];

const A12_LEARN=[
  {sentence:'The denominations that thrived on the frontier were those that could reach _____ settlers.',answer:'scattered',options:['scattered','educated','wealthy','urban'],explanation:'Frontier population was thin and widely dispersed.',tier:1},
  {sentence:'The Methodists deployed _____ riders — traveling preachers.',answer:'circuit',options:['circuit','frontier','field','itinerant'],explanation:'They rode loops through the wilderness to serve congregations.',tier:1},
  {sentence:'Circuit riders rode endless loops through the _____.',answer:'wilderness',options:['wilderness','colonies','countryside','settlements'],explanation:'They brought preaching to settlers too remote for settled churches.',tier:1},
  {sentence:'The Methodist circuit system was led by Bishop Francis _____.',answer:'Asbury',options:['Asbury','Wesley','Coke','McKendree'],explanation:'Asbury was the central organizer of early American Methodism.',tier:1},
  {sentence:'The leader of the Methodist circuit system held the office of _____.',answer:'Bishop',options:['Bishop','Elder','Superintendent','Moderator'],explanation:'Asbury was the first American Methodist bishop.',tier:1},
  {sentence:'The Baptists relied on the _____-preacher.',answer:'farmer',options:['farmer','traveling','lay','tent'],explanation:'A local convert who farmed and preached without salary.',tier:1},
  {sentence:'The Baptist farmer-preacher supported himself by _____.',answer:'farming',options:['farming','donations','government grants','trade'],explanation:'He needed no church salary to minister.',tier:1},
  {sentence:'The farmer-preacher preached without needing salary or _____.',answer:'seminary',options:['seminary','license','congregation','building'],explanation:'No formal education was required, unlike older denominations.',tier:1},
  {sentence:'These low-cost, high-_____ systems let Methodists and Baptists outgrow older denominations.',answer:'mobility',options:['mobility','energy','appeal','fervor'],explanation:'Mobility let them follow the moving frontier.',tier:1},
  {sentence:'By the mid-nineteenth century, Methodists and Baptists were the two _____ Protestant bodies in America.',answer:'largest',options:['largest','fastest','newest','most educated'],explanation:'They overtook the older, better-educated denominations.',tier:1},
  {sentence:'The frontier reshaped American Christianity into something more _____.',answer:'democratic',options:['democratic','ancient','foreign','hierarchical'],explanation:'It became more popular and less elite.',tier:1},
  {sentence:'Frontier Christianity became far less dependent on educated, settled _____.',answer:'clergy',options:['clergy','buildings','colleges','traditions'],explanation:'Mobile, self-supporting preachers replaced the old parish model.',tier:1},
];

const A7_STUDY={
  cards:[{
    text:'The Awakening\'s deepest legacy was institutional: a wave of colleges (Princeton, Brown, Rutgers, Dartmouth) and the explosive growth of Separate Baptists. It also divided denominations into New Light and Old Light factions and planted a confidence in personal experience over inherited authority.',
    terms:[
      {word:'Separate Baptists',def:'Baptists who broke from established churches to form congregations of the converted; they grew rapidly after the Awakening.'},
      {word:'New Side / Old Side',def:'The pro-revival (New Side) and anti-revival (Old Side) factions within colonial Presbyterianism produced by the Awakening.'},
    ],
    questions:[
      {q:'What was the Awakening\'s most lasting legacy?',a:'Its institutional legacy — the founding of revival-friendly colleges and the rapid growth of new denominations, especially the Separate Baptists.'},
      {q:'How did the revival divide the churches?',a:'Into New Lights (pro-revival, emphasizing conversion and itinerancy) and Old Lights (defending educated clergy and parish order). The split ran through nearly every denomination.'},
    ]
  }],
  questions:[
    {q:'What was the Awakening\'s most lasting legacy?',a:'Its institutional legacy — the founding of revival-friendly colleges and the rapid growth of new denominations, especially the Separate Baptists.'},
    {q:'How did the revival divide the churches?',a:'Into New Lights (pro-revival, emphasizing conversion and itinerancy) and Old Lights (defending educated clergy and parish order). The split ran through nearly every denomination.'},
  ]
};

const A8_STUDY={
  cards:[{
    text:'The colonial pulpit was a powerful force for revolution. Congregational and Presbyterian preachers — the British-named "Black Regiment" — framed the patriot cause in religious terms, while most Anglican clergy remained loyalists and pacifists like the Quakers abstained. The language of covenant, providence, and liberty saturated revolutionary rhetoric.',
    terms:[
      {word:'Black Regiment',def:'The British nickname for New England\'s patriot clergy, after their black preaching robes.'},
      {word:'Loyalist',def:'A colonist who remained loyal to the British Crown; most Anglican clergy were loyalists.'},
    ],
    questions:[
      {q:'Why was the pulpit so influential in the Revolution?',a:'Ministers were among the most influential public voices in the colonies, and the Awakening had taught them to make mass appeals across colonial lines. They framed resistance in the religious vocabulary of covenant and liberty.'},
      {q:'Which Christians did not support the Revolution?',a:'Most Anglican clergy, bound by ordination oaths to the king, remained loyalists; pacifist groups like the Quakers refused to take up arms.'},
    ]
  }],
  questions:[
    {q:'Why was the pulpit so influential in the Revolution?',a:'Ministers were among the most influential public voices in the colonies, and the Awakening had taught them to make mass appeals across colonial lines. They framed resistance in the religious vocabulary of covenant and liberty.'},
    {q:'Which Christians did not support the Revolution?',a:'Most Anglican clergy, bound by ordination oaths to the king, remained loyalists; pacifist groups like the Quakers refused to take up arms.'},
  ]
};

const A9_STUDY={
  cards:[{
    text:'Virginia, which had jailed Baptist preachers, became the first state to disestablish its church. An alliance of persecuted dissenters and Enlightenment statesmen — Madison\'s 1785 Memorial and Remonstrance and Jefferson\'s 1786 Statute for Religious Freedom — ended state support for religion and modeled the liberty soon written into the Constitution.',
    terms:[
      {word:'Disestablishment',def:'The ending of state support for and recognition of an official church; Virginia disestablished the Anglican church in the 1780s.'},
      {word:'Memorial and Remonstrance',def:'James Madison\'s 1785 argument against state funding of religion in Virginia.'},
    ],
    questions:[
      {q:'Who allied to disestablish the church in Virginia?',a:'Persecuted Baptist dissenters joined with Enlightenment statesmen like Madison and Jefferson — an unusual coalition of the devout and the rationalist.'},
      {q:'Why does the Virginia Statute matter nationally?',a:'It declared that no one could be compelled to support religious worship or penalized for belief, and it became the direct model for the religious liberty protections in the U.S. Constitution.'},
    ]
  }],
  questions:[
    {q:'Who allied to disestablish the church in Virginia?',a:'Persecuted Baptist dissenters joined with Enlightenment statesmen like Madison and Jefferson — an unusual coalition of the devout and the rationalist.'},
    {q:'Why does the Virginia Statute matter nationally?',a:'It declared that no one could be compelled to support religious worship or penalized for belief, and it became the direct model for the religious liberty protections in the U.S. Constitution.'},
  ]
};

const A10_STUDY={
  cards:[{
    text:'The 1787 Constitution mentioned religion only to ban religious tests for office. The 1791 First Amendment added the Establishment and Free Exercise clauses. These applied only federally at first — states kept establishments until Massachusetts disestablished last in 1833 — but set the principle of voluntary, plural, federally-unregulated religion.',
    terms:[
      {word:'Establishment Clause',def:'The First Amendment provision barring Congress from making any law "respecting an establishment of religion."'},
      {word:'Free Exercise Clause',def:'The First Amendment provision barring Congress from "prohibiting the free exercise" of religion.'},
    ],
    questions:[
      {q:'What was remarkable about the Constitution\'s treatment of religion?',a:'Its silence: it mentioned religion only to forbid religious tests for office, declining to name any official faith — a deliberate and unusual choice for the era.'},
      {q:'Did the First Amendment immediately end all religious establishments?',a:'No. It restricted only the federal government. Several states kept their establishments for decades; Massachusetts was the last to disestablish, in 1833.'},
    ]
  }],
  questions:[
    {q:'What was remarkable about the Constitution\'s treatment of religion?',a:'Its silence: it mentioned religion only to forbid religious tests for office, declining to name any official faith — a deliberate and unusual choice for the era.'},
    {q:'Did the First Amendment immediately end all religious establishments?',a:'No. It restricted only the federal government. Several states kept their establishments for decades; Massachusetts was the last to disestablish, in 1833.'},
  ]
};

const A11_STUDY={
  cards:[{
    text:'Around 1800, a second wave of revival swept the frontier through the camp meeting — multi-day outdoor gatherings, the most famous at Cane Ridge, Kentucky (1801), drawing 10,000–20,000. It shifted emphasis from God\'s sovereignty toward human choice, fueled Methodist and Baptist growth, and produced a more activist, optimistic Protestantism.',
    terms:[
      {word:'Camp meeting',def:'A multi-day outdoor revival gathering where thousands camped, sang, prayed, and heard preaching around the clock; the signature form of the Second Great Awakening.'},
      {word:'Cane Ridge',def:'The site in Kentucky of the most famous camp meeting (1801), where an estimated 10,000–20,000 gathered.'},
    ],
    questions:[
      {q:'What was a camp meeting?',a:'A multi-day outdoor revival gathering where thousands camped, sang, prayed, and heard preaching around the clock — the signature form of frontier revival in the Second Great Awakening.'},
      {q:'How did the Second Awakening differ in tone from the First?',a:'Where Edwards stressed God\'s sovereignty, frontier revivalists emphasized human choice and the call to decide for Christ, producing a more activist and optimistic Protestantism.'},
    ]
  }],
  questions:[
    {q:'What was a camp meeting?',a:'A multi-day outdoor revival gathering where thousands camped, sang, prayed, and heard preaching around the clock — the signature form of frontier revival in the Second Great Awakening.'},
    {q:'How did the Second Awakening differ in tone from the First?',a:'Where Edwards stressed God\'s sovereignty, frontier revivalists emphasized human choice and the call to decide for Christ, producing a more activist and optimistic Protestantism.'},
  ]
};

const A12_STUDY={
  cards:[{
    text:'Methodists and Baptists won the frontier by out-organizing it: Methodist circuit riders under Bishop Francis Asbury rode loops through the wilderness, while Baptist farmer-preachers supported themselves and needed no seminary. These low-cost, mobile systems made them the two largest Protestant bodies in America and reshaped Christianity into something more democratic and popular.',
    terms:[
      {word:'Circuit rider',def:'A traveling Methodist preacher who rode loops through the wilderness to serve scattered frontier congregations.'},
      {word:'Farmer-preacher',def:'A local Baptist convert who supported himself by farming and preached to neighbors without salary or seminary training.'},
    ],
    questions:[
      {q:'What were circuit riders and farmer-preachers?',a:'Circuit riders were traveling Methodist preachers who rode loops through the wilderness; farmer-preachers were local Baptist converts who farmed for a living and preached without salary or seminary. Both models were cheap and mobile.'},
      {q:'Why did Methodists and Baptists outgrow the older denominations?',a:'Their low-cost, high-mobility systems could follow the moving frontier and reach scattered settlers without requiring educated, salaried clergy — letting them become the two largest Protestant bodies by mid-century.'},
    ]
  }],
  questions:[
    {q:'What were circuit riders and farmer-preachers?',a:'Circuit riders were traveling Methodist preachers who rode loops through the wilderness; farmer-preachers were local Baptist converts who farmed for a living and preached without salary or seminary. Both models were cheap and mobile.'},
    {q:'Why did Methodists and Baptists outgrow the older denominations?',a:'Their low-cost, high-mobility systems could follow the moving frontier and reach scattered settlers without requiring educated, salaried clergy — letting them become the two largest Protestant bodies by mid-century.'},
  ]
};

const A7_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 7 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">The First Awakening III</h1>
<p class="article-sub">Colleges, Baptists &amp; a Divided Church · 1742–1760</p>
<div class="art-divider"></div>
<div class="article-body">
<p>How the Awakening reshaped American religion long after the crowds dispersed.</p>
<p>The Awakening's most lasting marks were institutional. To train revival-friendly ministers, New Light and New Side parties founded a wave of colleges: <strong>Princeton (1746)</strong>, <strong>Brown (1764)</strong>, <strong>Rutgers (1766)</strong>, and <strong>Dartmouth (1769)</strong>. The revival also fueled the explosive growth of the Baptists, especially the <strong>"Separate" Baptists</strong> who broke from established churches to form congregations of the converted.</p>
<p>The revival had divided as much as it united. <strong>New Lights</strong> embraced conversion and itinerant preaching; <strong>Old Lights</strong> defended educated clergy and parish order. This split ran through nearly every denomination. Yet the Awakening also planted ideas that reached beyond church walls — a confidence in personal experience over inherited authority, and a habit of mass appeal across colonial lines that would echo in the Revolution to come.</p>
<figure style="margin:1.75rem 0;border:1px solid rgba(20,8,12,0.1);overflow:hidden;">
  <img src="/images/america/L7_Princeton.jpeg" style="width:100%;display:block;object-fit:cover;max-height:360px;">
  <figcaption><strong>Princeton (College of New Jersey) · Founded 1746</strong> One of four colleges founded in the wake of the Great Awakening to train revival-friendly ministers — the Awakening's most durable institutional legacy.</figcaption>
</figure>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">1746</div><div class="atl-text">Princeton (College of New Jersey) founded by New Side Presbyterians</div></div>
  <div class="atl-row"><div class="atl-year">1764</div><div class="atl-text">Brown University founded by Baptists</div></div>
  <div class="atl-row"><div class="atl-year">1766</div><div class="atl-text">Rutgers (Queen's College) founded by Dutch Reformed</div></div>
  <div class="atl-row"><div class="atl-year">1769</div><div class="atl-text">Dartmouth founded, partly to train ministers to Native peoples</div></div>
</div>
</div>`;

const A8_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 8 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">Religion &amp; the Revolution</h1>
<p class="article-sub">The Patriot Pulpit · 1763–1776</p>
<div class="art-divider"></div>
<div class="article-body">
<p>How the colonial pulpit helped move a people toward revolution.</p>
<p>When tensions with Britain rose, ministers were among the most influential voices in the colonies. Many Congregational and Presbyterian preachers framed the patriot cause in religious terms, drawing on a tradition of resistance to tyranny and the Awakening's habit of mass appeal. The British called New England's patriot clergy the <strong>"Black Regiment,"</strong> after their black preaching robes.</p>
<p>Not all Christians agreed. Most <strong>Anglican clergy</strong>, bound by ordination oaths to the king, remained loyalists, and many fled or fell silent. <strong>Quakers</strong> and other pacifists refused to take up arms. But the dominant religious energy ran toward independence, and the language of <strong>covenant, providence, and liberty</strong> saturated the rhetoric of the Revolution.</p>
<figure class="art-fig portrait">
  <div class="fig-img-wrap"><img src="/images/america/L8_Muhlenburg.jpeg" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block;"></div>
  <div class="fig-body">
    <div class="fig-label">Virginia · 1776</div>
    <div class="fig-title">Peter Muhlenberg</div>
    <div class="fig-desc">Lutheran pastor who reportedly threw off his clerical robes to reveal a Continental Army uniform, declaring "there is a time to preach and a time to pray, but there is also a time to fight." One of the most famous patriot clergy of the Revolution.</div>
  </div>
</figure>
<div class="atl-box">
  <div class="atl-label">Key figures</div>
  <div class="atl-row"><div class="atl-year">Black Regiment</div><div class="atl-text">Patriot Congregational and Presbyterian clergy in black robes</div></div>
  <div class="atl-row"><div class="atl-year">Loyalists</div><div class="atl-text">Most Anglican clergy — bound by ordination oaths to the Crown</div></div>
  <div class="atl-row"><div class="atl-year">Pacifists</div><div class="atl-text">Quakers and others who refused to take up arms</div></div>
</div>
</div>`;

const A9_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 9 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">Disestablishment in Virginia</h1>
<p class="article-sub">The Statute for Religious Freedom · 1776–1786</p>
<div class="art-divider"></div>
<div class="article-body">
<p>How Virginia became the first state to dismantle its established church.</p>
<p>Virginia had jailed Baptist preachers for unlicensed preaching in the years before the Revolution. After independence, these dissenters joined with Enlightenment statesmen to end the Anglican establishment. <strong>James Madison's</strong> 1785 <strong>"Memorial and Remonstrance"</strong> argued powerfully against state support for religion, and the next year the legislature passed <strong>Thomas Jefferson's Virginia Statute for Religious Freedom (1786)</strong>.</p>
<p>The Statute declared that no one could be compelled to support any religious worship or be penalized for their beliefs. Jefferson ranked it among his three proudest achievements, alongside the Declaration of Independence and the founding of the University of Virginia. Virginia's experiment became the model for the religious liberty soon written into the national Constitution.</p>
<figure style="margin:1.75rem 0;border:1px solid rgba(20,8,12,0.1);overflow:hidden;">
  <img src="/images/america/L9_Disestablishment.jpeg" style="width:100%;display:block;object-fit:cover;max-height:360px;">
  <figcaption><strong>Virginia Statute for Religious Freedom · 1786</strong> Thomas Jefferson's landmark legislation — drafted in 1777, passed in 1786 — became the model for the First Amendment's religion clauses and remains one of the foundational documents of American religious liberty.</figcaption>
</figure>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">1768</div><div class="atl-text">Baptist preachers jailed for unlicensed preaching in Virginia</div></div>
  <div class="atl-row"><div class="atl-year">1785</div><div class="atl-text">Madison's Memorial and Remonstrance published</div></div>
  <div class="atl-row"><div class="atl-year">1786</div><div class="atl-text">Virginia Statute for Religious Freedom passed</div></div>
</div>
<div class="pull-quote">
  <p>"It was the dissenting Baptists, not the skeptics, who pushed hardest for the wall of separation."</p>
  <cite>— Historical observation on Virginia disestablishment</cite>
</div>
</div>`;

const A10_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 10 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">The Constitution &amp; the First Amendment</h1>
<p class="article-sub">No Establishment, Free Exercise · 1787–1791</p>
<div class="art-divider"></div>
<div class="article-body">
<p>How the new nation chose neither to establish nor to suppress religion.</p>
<p>The 1787 Constitution mentioned religion only once — to forbid any <strong>religious test for federal office</strong>. This silence was itself remarkable: the new nation declined to name an official faith. Four years later, the <strong>First Amendment (1791)</strong> added two clauses on religion: Congress could make no law <strong>"respecting an establishment of religion, or prohibiting the free exercise thereof."</strong></p>
<p>These twin guarantees — no establishment, and free exercise — set the framework for American church-state relations ever after. They applied at first only to the federal government; several states kept their establishments for decades, with <strong>Massachusetts</strong> the last to disestablish, in <strong>1833</strong>. But the principle had been set: religion would be voluntary, plural, and free of federal control.</p>
<figure style="margin:1.75rem 0;border:1px solid rgba(20,8,12,0.1);overflow:hidden;">
  <img src="/images/america/L10_FirstAmmendment.jpeg" style="width:100%;display:block;object-fit:cover;max-height:360px;">
  <figcaption><strong>The First Amendment · Ratified 1791</strong> The twin religion clauses — no establishment and free exercise — set the framework for American church-state relations and made the United States an experiment unique in the Christian world.</figcaption>
</figure>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">1787</div><div class="atl-text">Constitution bans religious tests for federal office (Art. VI)</div></div>
  <div class="atl-row"><div class="atl-year">1791</div><div class="atl-text">First Amendment ratified — Establishment &amp; Free Exercise clauses</div></div>
  <div class="atl-row"><div class="atl-year">1833</div><div class="atl-text">Massachusetts — last state to disestablish its official church</div></div>
</div>
<div class="pull-quote">
  <p>"Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof."</p>
  <cite>— First Amendment, 1791</cite>
</div>
</div>`;

const A11_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 11 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">The Second Awakening I</h1>
<p class="article-sub">Cane Ridge &amp; the Frontier · 1790–1805</p>
<div class="art-divider"></div>
<div class="article-body">
<p>How a second wave of revival swept the frontier through the camp meeting.</p>
<p>As Americans pushed west, a second great wave of revival broke out around 1800. Its signature form was the <strong>camp meeting</strong> — a multi-day outdoor gathering where thousands camped, sang, prayed, and heard preaching around the clock. The most famous was at <strong>Cane Ridge, Kentucky, in 1801</strong>, where an estimated 10,000–20,000 gathered in scenes of intense emotional fervor, including falling, weeping, and shouting.</p>
<p>The Second Great Awakening differed from the first in tone. Where Edwards had stressed God's sovereignty, frontier revivalists increasingly emphasized <strong>human choice</strong> and the call to decide for Christ. This revival fueled the rapid growth of the <strong>Methodists and Baptists</strong>, who were well-suited to the frontier, and it set in motion a more activist, optimistic American Protestantism.</p>
<figure style="margin:1.75rem 0;border:1px solid rgba(20,8,12,0.1);overflow:hidden;">
  <img src="/images/america/L11_2Awakening.jpeg" style="width:100%;display:block;object-fit:cover;max-height:360px;">
  <figcaption><strong>Cane Ridge Camp Meeting · Kentucky, 1801</strong> An estimated 10,000–20,000 gathered at Cane Ridge — the largest camp meeting of the Second Great Awakening and a defining moment in American religious history.</figcaption>
</figure>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">~1800</div><div class="atl-text">Camp meetings begin on the Kentucky frontier</div></div>
  <div class="atl-row"><div class="atl-year">1801</div><div class="atl-text">Cane Ridge, Kentucky — est. 10,000–20,000 gather</div></div>
</div>
</div>`;

const A12_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 12 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">The Second Awakening II</h1>
<p class="article-sub">Circuit Riders · 1784–1830</p>
<div class="art-divider"></div>
<div class="article-body">
<p>How Methodists and Baptists out-organized the frontier and became the largest American churches.</p>
<p>The denominations that thrived on the frontier were those that could reach scattered settlers. The Methodists deployed <strong>circuit riders</strong> — traveling preachers, led by Bishop <strong>Francis Asbury</strong>, who rode endless loops through the wilderness to serve far-flung congregations. The Baptists relied on the <strong>farmer-preacher</strong>, a local convert who supported himself by farming and preached to his neighbors without needing salary or seminary.</p>
<p>These low-cost, high-mobility systems let Methodists and Baptists vastly outgrow the older, better-educated denominations. By the mid-nineteenth century they had become the <strong>two largest Protestant bodies</strong> in America. The frontier had reshaped American Christianity into something more democratic, more popular, and far less dependent on educated, settled clergy.</p>
<figure class="art-fig portrait">
  <div class="fig-img-wrap"><img src="/images/america/L12_CircuitRider.jpeg" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block;"></div>
  <div class="fig-body">
    <div class="fig-label">The American Frontier · c. 1800–1840</div>
    <div class="fig-title">The Circuit Rider</div>
    <div class="fig-desc">Methodist circuit riders — traveling preachers organized by Bishop Francis Asbury — rode endless loops through the wilderness to reach scattered settlers. Their low-cost, high-mobility model transformed American Protestantism.</div>
  </div>
</figure>
<div class="atl-box">
  <div class="atl-label">Key figures</div>
  <div class="atl-row"><div class="atl-year">Francis Asbury</div><div class="atl-text">Bishop who organized the Methodist circuit-riding system in America</div></div>
  <div class="atl-row"><div class="atl-year">Circuit rider</div><div class="atl-text">Traveling Methodist preacher serving far-flung frontier congregations</div></div>
  <div class="atl-row"><div class="atl-year">Farmer-preacher</div><div class="atl-text">Self-supporting Baptist local preacher needing no salary or seminary</div></div>
</div>
</div>`;

// Wire lessons 7–12
_track5.lessons[6].articleHtml=A7_ARTICLE_HTML;
_track5.lessons[7].articleHtml=A8_ARTICLE_HTML;
_track5.lessons[8].articleHtml=A9_ARTICLE_HTML;
_track5.lessons[9].articleHtml=A10_ARTICLE_HTML;
_track5.lessons[10].articleHtml=A11_ARTICLE_HTML;
_track5.lessons[11].articleHtml=A12_ARTICLE_HTML;
_track5.lessons[6].learn=A7_LEARN;
_track5.lessons[7].learn=A8_LEARN;
_track5.lessons[8].learn=A9_LEARN;
_track5.lessons[9].learn=A10_LEARN;
_track5.lessons[10].learn=A11_LEARN;
_track5.lessons[11].learn=A12_LEARN;
_track5.lessons[6].study=A7_STUDY;
_track5.lessons[7].study=A8_STUDY;
_track5.lessons[8].study=A9_STUDY;
_track5.lessons[9].study=A10_STUDY;
_track5.lessons[10].study=A11_STUDY;
_track5.lessons[11].study=A12_STUDY;
_track5.lessons[6].coldOpen={_bg:'/images/america/L7_Princeton.jpeg',cards:[
  {label:'The World After',text:'The fire has passed. Now the churches must live with what it left behind.',size:'lg'},
  {label:'The Key Figures',text:'The New Side Presbyterians. The Separate Baptists.',size:'lg'},
  {label:'The Surprise',text:'The revival\'s deepest legacy was not emotion but institutions — colleges and new denominations.',size:'xl'},
]};
_track5.lessons[7].coldOpen={_bg:'/images/america/L8_Muhlenburg.jpeg',cards:[
  {label:'The World Before',text:'A king rules by divine right — and many colonists are not so sure.',size:'lg'},
  {label:'The Crisis',text:'Taxes, troops, and a question: may a Christian resist his king?',size:'xl'},
  {label:'The Key Figures',text:'The patriot preachers. The loyalist Anglicans.',size:'lg'},
]};
_track5.lessons[8].coldOpen={_bg:'/images/america/L9_Disestablishment.jpeg',cards:[
  {label:'The Crisis',text:'A new nation must decide: should the state still fund a church?',size:'xl'},
  {label:'The Key Figures',text:'Thomas Jefferson. James Madison. The persecuted Baptists.',size:'lg'},
  {label:'The Surprise',text:'It was dissenting Baptists, not skeptics, who pushed hardest for the wall of separation.',size:'xl'},
]};
_track5.lessons[9].coldOpen={_bg:'/images/america/L10_FirstAmmendment.jpeg',cards:[
  {label:'The Crisis',text:'Thirteen states, many churches, no agreement on an official faith.',size:'xl'},
  {label:'The Key Figures',text:'The framers. James Madison.',size:'lg'},
  {label:'The Surprise',text:'The Constitution\'s most striking religious statement was its silence.',size:'xl'},
]};
_track5.lessons[10].coldOpen={_bg:'/images/america/L11_2Awakening.jpeg',cards:[
  {label:'The World Before',text:'A new nation pushes west, faster than its churches can follow.',size:'lg'},
  {label:'The Crisis',text:'On the frontier, the gospel needs a new delivery system.',size:'xl'},
  {label:'The Key Figures',text:'The frontier preachers. The Cane Ridge multitudes.',size:'lg'},
]};
_track5.lessons[11].coldOpen={_bg:'/images/america/L12_CircuitRider.jpeg',cards:[
  {label:'The Crisis',text:'How do you reach a people scattered across a thousand miles of wilderness?',size:'xl'},
  {label:'The Key Figures',text:'Francis Asbury. The circuit riders. The farmer-preachers.',size:'lg'},
  {label:'The Surprise',text:'The churches that won the frontier were the ones willing to go to it.',size:'xl'},
]};

// — Lessons 13–18 —

const A13_LEARN=[
  {sentence:'Charles Grandison Finney was a _____ turned revivalist.',answer:'lawyer',options:['lawyer','teacher','doctor','minister'],explanation:'His legal background shaped his direct, argumentative style.',tier:1},
  {sentence:'Finney swept through upstate New York in the 1820s to _____ with his new measures.',answer:'1830s',options:['1830s','1840s','1810s','1850s'],explanation:'He worked primarily in western New York, the Burned-Over District.',tier:1},
  {sentence:'The front pew where nearly-converted persons sat under prayer was called the anxious _____.',answer:'bench',options:['bench','seat','pew','row'],explanation:'It was Finney\'s most famous new measure.',tier:1},
  {sentence:'Finney\'s revival meetings that ran for days were called _____ meetings.',answer:'protracted',options:['protracted','extended','long','continuous'],explanation:'They could run for days at a stretch.',tier:1},
  {sentence:'One of Finney\'s measures was praying for unconverted _____ by name.',answer:'neighbors',options:['neighbors','scholars','bishops','senators'],explanation:'Public naming was controversial but effective.',tier:1},
  {sentence:'The region so frequently swept by revival it was called the "Burned-Over _____."',answer:'District',options:['District','Region','Territory','Valley'],explanation:'Western New York was said to have no spiritual fuel left.',tier:1},
  {sentence:'Finney rejected the _____ view that conversion was God\'s sovereign act.',answer:'Calvinist',options:['Calvinist','Lutheran','Baptist','Catholic'],explanation:'He believed sinners had the natural ability to choose God.',tier:1},
  {sentence:'Finney taught that sinners had the natural _____ to choose God at any moment.',answer:'ability',options:['ability','desire','urge','freedom'],explanation:'This was a major departure from Calvinist sovereignty.',tier:1},
  {sentence:'For Finney, revival was not a miracle but the predictable result of using the right _____.',answer:'means',options:['means','words','music','preacher'],explanation:'He systematized revival as a set of techniques.',tier:1},
  {sentence:'Finney\'s shift from Calvinist _____ to human choice reshaped American evangelicalism.',answer:'sovereignty',options:['sovereignty','tradition','liturgy','authority'],explanation:'It made human decision central to the revival tradition.',tier:1},
  {sentence:'Finney set the template for mass evangelism that _____ Graham would inherit a century later.',answer:'Billy',options:['Billy','Franklin','Dwight','Charles'],explanation:'Graham\'s crusade methods descended directly from Finney\'s innovations.',tier:1},
  {sentence:'Finney\'s new measures shifted emphasis from God\'s sovereignty to human _____.',answer:'choice',options:['choice','ceremony','tradition','structure'],explanation:'The convert\'s decision became the climactic moment of revival.',tier:1},
];

const A14_LEARN=[
  {sentence:'Charles Hodge was the dominant theologian at _____ Seminary from the 1820s to the 1870s.',answer:'Princeton',options:['Princeton','Yale','Andover','Harvard'],explanation:'Princeton was the center of Old School Presbyterian confessional theology.',tier:1},
  {sentence:'Hodge published his three-volume Systematic Theology in 1872 to _____.',answer:'1873',options:['1873','1875','1870','1880'],explanation:'It became the definitive statement of Old School Presbyterian orthodoxy.',tier:1},
  {sentence:'Hodge boasted that no new _____ had ever originated at Princeton.',answer:'idea',options:['idea','doctrine','book','minister'],explanation:"Princeton's job was to guard orthodoxy, not innovate.",tier:1},
  {sentence:"Hodge argued Finney's teaching on human ability was _____ — the heresy that humans could save themselves.",answer:'Pelagianism',options:['Pelagianism','Arminianism','Gnosticism','Arianism'],explanation:'Pelagianism had been condemned at the Council of Carthage in 418 AD.',tier:1},
  {sentence:"Hodge's theology rested on the inerrancy of Scripture and the _____ Confession.",answer:'Westminster',options:['Westminster','Augsburg','Helvetic','Belgic'],explanation:'The Westminster Confession was the doctrinal standard of Old School Presbyterianism.',tier:1},
  {sentence:"John Williamson Nevin published The Anxious _____ in 1843.",answer:'Bench',options:['Bench','Seat','Pew','Meeting'],explanation:"It was a direct theological rebuttal of Finney's new measures.",tier:1},
  {sentence:"Nevin argued Finney's methods assumed conversion was a _____ crisis produced by emotional pressure.",answer:'psychological',options:['psychological','spiritual','religious','personal'],explanation:'He saw this as a distortion of genuine Christian conversion.',tier:1},
  {sentence:'Nevin countered that true Christianity was received through the _____ and the life of the church.',answer:'sacraments',options:['sacraments','preaching','Bible','ministry'],explanation:'Word and sacrament, not the anxious bench, were the proper means of grace.',tier:1},
  {sentence:'Nevin and Philip Schaff taught at the German Reformed seminary in _____, Pennsylvania.',answer:'Mercersburg',options:['Mercersburg','Philadelphia','Lancaster','Pittsburgh'],explanation:'The tiny seminary became an unlikely center of theological sophistication.',tier:1},
  {sentence:'Philip Schaff brought _____ Reformed scholarly training to Mercersburg.',answer:'European',options:['European','American','Scottish','Anglican'],explanation:'He had trained in Germany and Switzerland under leading Protestant scholars.',tier:1},
  {sentence:'The Mercersburg Theology emphasized the church as a living _____ continuous with the ancient church.',answer:'organism',options:['organism','body','institution','community'],explanation:"This historical and organic view of the church contrasted sharply with revivalism's individualism.",tier:1},
  {sentence:'Hodge and Nevin both criticized Finney but from _____ directions.',answer:'opposite',options:['opposite','similar','different','compatible'],explanation:'Hodge from Calvinist confessionalism; Nevin from sacramental, historical theology.',tier:1},
];

const A15_LEARN=[
  {sentence:'Joseph Smith founded the Church of Jesus Christ of Latter-day Saints in _____.',answer:'1830',options:['1830','1838','1844','1820'],explanation:'He organized the church on April 6, 1830, in western New York.',tier:1},
  {sentence:'Smith founded his church in the same region as Finney\'s revivals — the Burned-Over _____.',answer:'District',options:['District','Region','Territory','Valley'],explanation:'Western New York was the epicenter of both movements.',tier:1},
  {sentence:'Smith claimed new scripture in the form of the Book of _____.',answer:'Mormon',options:['Mormon','Revelation','Daniel','Nephi'],explanation:'He said he translated it from golden plates.',tier:1},
  {sentence:'William Miller was a _____ lay preacher who predicted Christ\'s return.',answer:'Baptist',options:['Baptist','Methodist','Presbyterian','Congregationalist'],explanation:'He was not formally trained clergy.',tier:1},
  {sentence:'Miller calculated from Daniel and Revelation that Christ would return in _____.',answer:'1844',options:['1844','1842','1848','1850'],explanation:'He revised his dates several times before the final prediction.',tier:1},
  {sentence:'Miller\'s following numbered up to _____ people.',answer:'100,000',options:['100,000','10,000','50,000','500,000'],explanation:'It was one of the largest millennial movements in American history.',tier:1},
  {sentence:'The passing of Miller\'s predicted date was called the Great _____.',answer:'Disappointment',options:['Disappointment','Failure','Collapse','Crisis'],explanation:'His followers were devastated when 1844 passed without Christ\'s return.',tier:1},
  {sentence:'John Nelson Darby was an Irish-born _____ Brethren minister.',answer:'Plymouth',options:['Plymouth','Reformed','Wesleyan','Independent'],explanation:'Darby developed dispensationalism within the Plymouth Brethren movement.',tier:1},
  {sentence:'Darby\'s system for reading Scripture across history was called _____.',answer:'dispensationalism',options:['dispensationalism','premillennialism','covenant theology','historicism'],explanation:'Dispensationalism divided history into distinct ages in which God dealt with humanity differently.',tier:1},
  {sentence:'Darby made multiple tours of _____ in the 1860s and 1870s.',answer:'America',options:['America','England','Scotland','Canada'],explanation:'He planted dispensationalism in prophetic Bible conferences and evangelical networks across America.',tier:1},
  {sentence:'The same millennial hunger that produced Smith and Miller also produced John Nelson _____.',answer:'Darby',options:['Darby','Moody','Hodge','Nevin'],explanation:'All three responded to the same era of expectation — in very different ways.',tier:1},
  {sentence:'Darby spread dispensationalism through prophetic Bible _____ in America.',answer:'conferences',options:['conferences','revivals','crusades','meetings'],explanation:'These conferences were the primary channel through which Darby\'s ideas entered American evangelicalism.',tier:1},
];

const A16_LEARN=[
  {sentence:'The Second Awakening\'s activist theology produced a wave of voluntary _____ societies.',answer:'reform',options:['reform','church','missionary','charity'],explanation:'Optimism about human ability extended into social improvement.',tier:1},
  {sentence:'The network of reform organizations was called the "Benevolent _____."',answer:'Empire',options:['Empire','Network','League','Alliance'],explanation:'It encompassed dozens of national voluntary societies.',tier:1},
  {sentence:'The American _____ Society, founded in 1816, was part of the Benevolent Empire.',answer:'Bible',options:['Bible','Tract','Temperance','Mission'],explanation:'It distributed Bibles widely across the nation.',tier:1},
  {sentence:'The American Tract Society was founded in _____.',answer:'1825',options:['1825','1816','1830','1820'],explanation:'It distributed religious pamphlets and moral literature.',tier:1},
  {sentence:'The reform organizations targeted temperance, Sabbath observance, and _____ reform.',answer:'prison',options:['prison','school','hospital','court'],explanation:'Reformers believed social institutions could be perfected.',tier:1},
  {sentence:'Many _____ found in voluntary societies their first sphere of organized public action.',answer:'women',options:['women','ministers','farmers','merchants'],explanation:'They gained organizational experience that fueled later suffrage movements.',tier:1},
  {sentence:'Evangelical abolitionists argued from _____ that slavery was sin.',answer:'Scripture',options:['Scripture','reason','conscience','tradition'],explanation:'They used the Bible against those who used it to defend slavery.',tier:1},
  {sentence:'Theodore Dwight Weld and the _____ brothers funded antislavery organizing.',answer:'Tappan',options:['Tappan','Lewis','Arthur','Beecher'],explanation:'Lewis and Arthur Tappan were wealthy New York merchants who bankrolled abolitionism.',tier:1},
  {sentence:'Charles Finney declared that slaveholders should be barred from _____.',answer:'communion',options:['communion','church','fellowship','baptism'],explanation:'He treated slaveholding as a sin disqualifying one from the Lord\'s Supper.',tier:1},
  {sentence:'The revival\'s logic was that every soul had equal _____ before God.',answer:'worth',options:['worth','standing','dignity','position'],explanation:'This equality was irreconcilable with slavery.',tier:1},
  {sentence:'The revival\'s logic could not comfortably coexist with _____.',answer:'slavery',options:['slavery','poverty','ignorance','violence'],explanation:'The tension eventually tore the churches apart.',tier:1},
  {sentence:'The tension between revival theology and slavery would eventually _____ the churches apart.',answer:'tear',options:['tear','heal','bind','unite'],explanation:'Denominational splits over slavery came in the 1840s.',tier:1},
];

const A17_LEARN=[
  {sentence:'The two largest Protestant denominations split over slavery before the _____ did.',answer:'nation',options:['nation','government','Congress','courts'],explanation:'The church splits of 1844–45 presaged the national division of 1861.',tier:1},
  {sentence:'The Methodist Episcopal Church divided in _____ over a slaveholding bishop.',answer:'1844',options:['1844','1845','1861','1831'],explanation:'The question was whether Bishop James O. Andrew could continue in office.',tier:1},
  {sentence:'The Methodist split was over whether a _____ bishop could continue in office.',answer:'slaveholding',options:['slaveholding','Northern','abolitionist','elected'],explanation:'Northern Methodists said no; Southern Methodists disagreed.',tier:1},
  {sentence:'The Methodist Episcopal Church _____ was founded the year after the split.',answer:'South',options:['South','West','North','Southern'],explanation:'It was organized in 1845.',tier:1},
  {sentence:'The Baptists split in _____ over a slaveholding missionary candidate.',answer:'1845',options:['1845','1844','1861','1831'],explanation:'Northern missionary boards refused to appoint slaveholders.',tier:1},
  {sentence:'Southern Baptists formed the Southern Baptist _____ in 1845.',answer:'Convention',options:['Convention','Church','Assembly','Association'],explanation:'It became one of the largest Protestant bodies in America.',tier:1},
  {sentence:'Southerners developed a "_____ defense of slavery" using Scripture.',answer:'biblical',options:['biblical','theological','scriptural','sacred'],explanation:'They marshaled specific passages to argue slavery was divinely sanctioned.',tier:1},
  {sentence:'Southerners argued from Scripture passages that slavery was divinely _____.',answer:'sanctioned',options:['sanctioned','condemned','opposed','restricted'],explanation:'They cited Noah\'s curse on Canaan and Paul\'s letters among other texts.',tier:1},
  {sentence:'Northerners countered with the Bible\'s broader themes of liberation and human _____.',answer:'dignity',options:['dignity','conquest','commerce','empire'],explanation:'They read the Bible\'s arc as pointing toward freedom.',tier:1},
  {sentence:'By the eve of the Civil War, the same _____ was being used to argue both sides.',answer:'Bible',options:['Bible','tradition','authority','institution'],explanation:'This made the conflict both theological and irresolvable by Scripture alone.',tier:1},
  {sentence:'The denominational splits of the 1840s _____ the national split of 1861.',answer:'presaged',options:['presaged','followed','delayed','reversed'],explanation:'The church divisions were a preview of the coming war.',tier:1},
  {sentence:'The splits were not merely organizational — they were _____.',answer:'theological',options:['theological','political','personal','financial'],explanation:'They represented a deep divide over Scripture and the nature of slavery as sin.',tier:1},
];

const A18_LEARN=[
  {sentence:'Richard Allen founded the AME Church in _____ in 1816.',answer:'Philadelphia',options:['Philadelphia','New York','Baltimore','Boston'],explanation:'Allen founded the African Methodist Episcopal Church after Black worshipers were pulled from their knees at a white Methodist church.',tier:1},
  {sentence:'Allen founded the AME after Black worshipers were pulled from their _____ during prayer.',answer:'knees',options:['knees','seats','pews','feet'],explanation:'The incident at St. George\'s Methodist Church in Philadelphia made clear that Black Christians needed their own institution.',tier:1},
  {sentence:'The AME was the first major institution owned and governed entirely by _____ Americans.',answer:'Black',options:['Black','African','formerly enslaved','free'],explanation:'It became a center of community life, literacy, and resistance.',tier:1},
  {sentence:'The abolitionist movement was deeply _____.',answer:'Christian',options:['Christian','secular','political','academic'],explanation:'Garrison, Stowe, Weld, Douglass, and Tubman all drew on religious conviction.',tier:1},
  {sentence:'Frederick Douglass was a formerly _____ man and the movement\'s greatest orator.',answer:'enslaved',options:['enslaved','indentured','impoverished','exiled'],explanation:'He escaped slavery in Maryland in 1838.',tier:1},
  {sentence:'Douglass argued American Christianity had produced a "slaveholding _____" and a true Christianity.',answer:'religion',options:['religion','faith','church','gospel'],explanation:'He distinguished the faith used to justify slavery from the faith of Jesus.',tier:1},
  {sentence:'The _____ church was the institutional heart of the abolitionist cause.',answer:'Black',options:['Black','white','Southern','Catholic'],explanation:'AME churches and Black Baptist congregations sustained the movement.',tier:1},
  {sentence:'Invisible worship gatherings in the slave quarters were called "hush _____."',answer:'arbors',options:['arbors','meetings','churches','gatherings'],explanation:'They were secret worship meetings outside slaveholder supervision.',tier:1},
  {sentence:'Harriet Tubman was deeply shaped by biblical _____.',answer:'visions',options:['visions','stories','teachings','promises'],explanation:'She experienced vivid divine guidance that she attributed to God.',tier:1},
  {sentence:'Tubman led hundreds to freedom on the Underground _____.',answer:'Railroad',options:['Railroad','Road','Route','Network'],explanation:'It was a network of safe houses and routes to the North.',tier:1},
  {sentence:'Tubman called herself _____ because she led her people out of bondage.',answer:'Moses',options:['Moses','Miriam','Deborah','Esther'],explanation:'The Exodus story was central to enslaved Christians\' self-understanding.',tier:1},
  {sentence:'For enslaved believers, the Exodus story was not allegory — it was _____.',answer:'promise',options:['promise','history','poetry','prophecy'],explanation:'It sustained hope for literal freedom.',tier:1},
];

const A19_LEARN=[
  {sentence:'By 1865 the Civil War had killed _____ Americans.',answer:'620,000',options:['620,000','300,000','400,000','1,000,000'],explanation:'It remains the deadliest conflict in American history.',tier:1},
  {sentence:'Lincoln delivered the Second Inaugural Address in _____.',answer:'1865',options:['1865','1863','1861','1864'],explanation:'It was delivered on March 4, 1865, weeks before the war ended.',tier:1},
  {sentence:'Lincoln noted that both sides "read the same _____ and prayed to the same God."',answer:'Bible',options:['Bible','Scripture','faith','prayers'],explanation:'He refused to simply claim God for the Union cause.',tier:1},
  {sentence:'Lincoln suggested the war was God\'s _____ on the nation for slavery.',answer:'judgment',options:['judgment','blessing','favor','approval'],explanation:'He treated slavery as a national sin for which both North and South were accountable.',tier:1},
  {sentence:'The Second Inaugural is called the greatest American _____ statement by a political figure.',answer:'theological',options:['theological','moral','political','historical'],explanation:'Its depth of religious reflection is unmatched in American political oratory.',tier:1},
  {sentence:'After the war, freed people flooded into independent Black _____ and AME churches.',answer:'Baptist',options:['Baptist','Methodist','Presbyterian','Episcopal'],explanation:'They left white-supervised churches to form their own institutions.',tier:1},
  {sentence:'The AME Church grew from 20,000 to _____ members between 1860 and 1870.',answer:'400,000',options:['400,000','100,000','200,000','1,000,000'],explanation:'A twentyfold increase in a single decade.',tier:1},
  {sentence:'Black churches became organizing centers providing schools, political leadership, and _____ institutions.',answer:'community',options:['community','military','commercial','industrial'],explanation:'They were the backbone of Black civic life during Reconstruction.',tier:1},
  {sentence:'Reconstruction ran from 1865 to _____.',answer:'1877',options:['1877','1880','1875','1870'],explanation:'When federal troops withdrew, the gains of Reconstruction were largely dismantled.',tier:1},
  {sentence:'The end of Reconstruction left Black churches vulnerable to the violence of Jim _____.',answer:'Crow',options:['Crow','Crow laws','Crow violence','Crow era'],explanation:'Jim Crow laws and racial violence dismantled many Reconstruction-era gains.',tier:1},
  {sentence:'Lincoln delivered the Second Inaugural _____ before Lee\'s surrender.',answer:'weeks',options:['weeks','months','days','years'],explanation:'The war ended just over a month after the address.',tier:1},
  {sentence:'Lincoln refused to claim God _____ for the Union cause.',answer:'straightforwardly',options:['straightforwardly','triumphantly','eternally','unconditionally'],explanation:'This theological humility made the address remarkable.',tier:1},
];

const A20_LEARN=[
  {sentence:'Dwight L. Moody was a Chicago _____ salesman turned evangelist.',answer:'shoe',options:['shoe','book','dry goods','hardware'],explanation:'He had no formal theological training.',tier:1},
  {sentence:'Moody pioneered the modern urban _____ with singer Ira Sankey.',answer:'crusade',options:['crusade','revival','meeting','campaign'],explanation:'They rented large halls, used choirs, and organized local churches.',tier:1},
  {sentence:'Moody and Sankey\'s British campaigns ran from 1873 to _____.',answer:'1875',options:['1875','1877','1880','1871'],explanation:'They drew enormous crowds and made Moody internationally famous.',tier:1},
  {sentence:'Moody\'s message was simpler and warmer, preaching a God of _____ more than judgment.',answer:'love',options:['love','grace','mercy','peace'],explanation:'This distinguished his tone from Finney\'s more confrontational approach.',tier:1},
  {sentence:'Moody founded the Moody Bible Institute in Chicago in _____.',answer:'1886',options:['1886','1875','1880','1890'],explanation:'It trained lay workers and evangelists.',tier:1},
];

const A21_LEARN=[
  {sentence:'The Social Gospel argued the gospel had implications for _____ as well as souls.',answer:'society',options:['society','families','nations','communities'],explanation:'It extended Christian concern from individual salvation to social justice.',tier:1},
  {sentence:'Washington Gladden was a _____ minister who defended workers\' rights.',answer:'Congregational',options:['Congregational','Methodist','Baptist','Presbyterian'],explanation:'He was among the first prominent ministers to support labor unions.',tier:1},
  {sentence:'Walter Rauschenbusch ministered for eleven years in the _____ Kitchen neighborhood of New York.',answer:'Hell\'s',options:['Hell\'s','Five Points\'','East','Clinton\'s'],explanation:'His experience with urban poverty shaped his theology.',tier:1},
  {sentence:'Rauschenbusch published Christianity and the Social _____ in 1907.',answer:'Crisis',options:['Crisis','Order','Problem','Question'],explanation:'It became the defining text of the Social Gospel movement.',tier:1},
  {sentence:'Rauschenbusch\'s term for sin embedded in unjust institutions was "social _____."',answer:'sin',options:['sin','evil','wrong','failure'],explanation:'It extended the concept of sin beyond individual moral failure.',tier:1},
  {sentence:'The Social Gospel produced the Federal Council of Churches in _____.',answer:'1908',options:['1908','1910','1900','1905'],explanation:'It united mainline denominations for cooperative social action.',tier:1},
];

const A22_LEARN=[
  {sentence:'The Azusa Street revival began on April 9, _____.',answer:'1906',options:['1906','1901','1910','1904'],explanation:'A prayer group in Los Angeles began speaking in tongues.',tier:1},
  {sentence:'The Azusa Street Mission was located at 312 Azusa Street in _____.',answer:'Los Angeles',options:['Los Angeles','San Francisco','Chicago','Houston'],explanation:'The old stable became a revival center for three years.',tier:1},
  {sentence:'The Azusa Street Mission operated in an abandoned _____.',answer:'stable',options:['stable','warehouse','church','schoolhouse'],explanation:'It was an unlikely setting for what became a world-changing revival.',tier:1},
  {sentence:'The revival was led by William J. _____.',answer:'Seymour',options:['Seymour','Parham','Bartleman','Durham'],explanation:'A one-eyed Black preacher from Louisiana.',tier:1},
  {sentence:'Seymour had learned his theology of Spirit baptism from Charles _____.',answer:'Parham',options:['Parham','Price','Boddy','Mason'],explanation:'Parham first connected tongues with Spirit baptism in Kansas in 1901.',tier:1},
  {sentence:'Pentecostalism\'s defining doctrine is that Spirit baptism is evidenced by speaking in _____.',answer:'tongues',options:['tongues','prophecy','prayer','healing'],explanation:'This is called glossolalia.',tier:1},
];

const A23_LEARN=[
  {sentence:'By 1910, conservative Protestants felt besieged by higher biblical _____.',answer:'criticism',options:['criticism','scholarship','liberalism','academia'],explanation:'It treated the Bible as a historical document subject to scholarly analysis.',tier:1},
  {sentence:'Two wealthy California _____ men funded The Fundamentals.',answer:'oil',options:['oil','railroad','banking','timber'],explanation:'Lyman and Milton Stewart of Union Oil Company paid for the project.',tier:1},
  {sentence:'The Fundamentals consisted of _____ essays published between 1910 and 1915.',answer:'ninety',options:['ninety','twelve','fifty','twenty-four'],explanation:'They covered core Protestant doctrines.',tier:1},
  {sentence:'The essays were mailed free to every pastor, missionary, and theology _____ in America.',answer:'student',options:['student','professor','doctor','bishop'],explanation:'This mass distribution gave the movement enormous reach.',tier:1},
  {sentence:'The Fundamentals defended the virgin birth, the physical resurrection, and Scripture\'s _____.',answer:'inerrancy',options:['inerrancy','authority','inspiration','sufficiency'],explanation:'These were the core doctrines under attack from modernism.',tier:1},
  {sentence:'The term "fundamentalist" was coined in _____ by Baptist editor Curtis Lee Laws.',answer:'1920',options:['1920','1910','1915','1925'],explanation:'He described those ready for "battle royal" for the faith.',tier:1},
];

const A24_LEARN=[
  {sentence:'Harry Emerson Fosdick\'s 1922 sermon was titled "Shall the Fundamentalists _____?"',answer:'Win',options:['Win','Divide','Leave','Rule'],explanation:'It directly challenged fundamentalist influence in mainline denominations.',tier:1},
  {sentence:'Fosdick argued modern believers should reinterpret doctrines in the light of modern _____.',answer:'knowledge',options:['knowledge','tradition','authority','revelation'],explanation:'He represented the modernist approach to theology.',tier:1},
  {sentence:'Fosdick was a _____ preaching at a Presbyterian church in New York.',answer:'Baptist',options:['Baptist','Methodist','Congregationalist','Lutheran'],explanation:'He was a guest preacher at First Presbyterian Church.',tier:1},
  {sentence:'The Presbyterian establishment forced Fosdick to _____.',answer:'resign',options:['resign','recant','leave New York','publish a retraction'],explanation:'His liberal theology was incompatible with Presbyterian confessional standards.',tier:1},
  {sentence:'Machen published Christianity and _____ in 1923.',answer:'Liberalism',options:['Liberalism','Modernism','Culture','Doubt'],explanation:'It became the most rigorous conservative response to modernism.',tier:1},
  {sentence:'Machen argued liberalism was not a revised Christianity but an entirely _____ religion.',answer:'different',options:['different','secular','modern','human'],explanation:'This was a sharper claim than most conservatives made.',tier:1},
];

const A25_LEARN=[
  {sentence:'In 1925 Tennessee passed the _____ Act, banning the teaching of human evolution.',answer:'Butler',options:['Butler','Bryan','Davidson','Tennessee'],explanation:'It made it illegal to teach any theory denying divine creation.',tier:1},
  {sentence:'John _____ was recruited as a teacher to test the Butler Act.',answer:'Scopes',options:['Scopes','Darrow','Bryan','Mencken'],explanation:'He was a high school teacher in Dayton, Tennessee.',tier:1},
  {sentence:'William Jennings _____ argued for the prosecution.',answer:'Bryan',options:['Bryan','Darrow','Stewart','McKenzie'],explanation:'He was a three-time presidential candidate and populist hero.',tier:1},
  {sentence:'Clarence _____ cross-examined Bryan on his literal reading of Genesis.',answer:'Darrow',options:['Darrow','Mencken','Malone','Hays'],explanation:'The cross-examination became one of the most famous courtroom scenes in American history.',tier:1},
  {sentence:'Scopes was convicted and fined _____ dollars.',answer:'one hundred',options:['one hundred','fifty','five hundred','one thousand'],explanation:'The conviction was later overturned on a technicality.',tier:1},
  {sentence:'Bryan died _____ days after the trial ended.',answer:'five',options:['five','ten','thirty','two'],explanation:'He died in his sleep in Dayton on July 26, 1925.',tier:1},
];

const A26_LEARN=[
  {sentence:'The Social Gospel rested on an _____ view of human nature.',answer:'optimistic',options:['optimistic','pessimistic','realistic','neutral'],explanation:'It believed education and reform could perfect society — shattered by WWI.',tier:1},
  {sentence:'The carnage of World War _____ shattered liberal optimism in Europe.',answer:'I',options:['I','II','III','IV'],explanation:'The trenches made the idea of inevitable human progress theologically impossible.',tier:1},
  {sentence:'Karl Barth was a _____ Reformed pastor.',answer:'Swiss',options:['Swiss','German','French','Dutch'],explanation:'He watched his German liberal theology professors support the Kaiser\'s war.',tier:1},
  {sentence:'Barth concluded liberal theology had made God in _____ image.',answer:"humanity's",options:["humanity's",'nature\'s','reason\'s','culture\'s'],explanation:'Liberal theology identified God with human culture — Barth said this was idolatry.',tier:1},
  {sentence:'Barth\'s 1919 commentary on _____ announced his new theology.',answer:'Romans',options:['Romans','Galatians','John','Genesis'],explanation:'The Epistle to the Romans was a theological bombshell in postwar Europe.',tier:1},
  {sentence:'Reinhold Niebuhr developed what he called "Christian _____."',answer:'Realism',options:['Realism','Optimism','Socialism','Nationalism'],explanation:'Christian Realism applied the doctrine of original sin to politics and group behavior.',tier:1},
];

const A27_LEARN=[
  {sentence:'Neo-evangelicals were dissatisfied with fundamentalism\'s _____ and intellectual withdrawal.',answer:'separatism',options:['separatism','pacifism','legalism','sectarianism'],explanation:'They wanted to re-engage culture and scholarship rather than withdraw.',tier:1},
  {sentence:'Neo-evangelicals formed the National Association of _____ in 1942.',answer:'Evangelicals',options:['Evangelicals','Churches','Christians','Protestants'],explanation:'The NAE was a moderate alternative to both separatist and liberal coalitions.',tier:1},
  {sentence:'Carl F. H. Henry published The Uneasy Conscience of Modern Fundamentalism in _____.',answer:'1947',options:['1947','1942','1952','1955'],explanation:'It charged fundamentalism with abandoning social concern along with liberalism.',tier:1},
  {sentence:'Fuller Theological Seminary was founded in 1947 in _____, California.',answer:'Pasadena',options:['Pasadena','Los Angeles','San Francisco','San Diego'],explanation:'It combined conservative doctrine with serious scholarship.',tier:1},
  {sentence:'Billy Graham burst onto the national scene at his 1949 _____ crusade.',answer:'Los Angeles',options:['Los Angeles','New York','Chicago','Houston'],explanation:'Hearst\'s newspapers gave Graham overnight national coverage.',tier:1},
  {sentence:'Graham\'s 1957 New York crusade drew over _____ million people.',answer:'two',options:['two','one','three','five'],explanation:'It ran sixteen weeks at Madison Square Garden.',tier:1},
];

const A28_LEARN=[
  {sentence:'The Civil Rights Movement was organized primarily through the _____ church.',answer:'Black',options:['Black','Methodist','Baptist','Presbyterian'],explanation:'Church sanctuaries, networks, and clergy leadership formed the movement\'s backbone.',tier:1},
  {sentence:'The Southern Christian Leadership Conference was founded in _____.',answer:'1957',options:['1957','1955','1960','1963'],explanation:'It was led by Black Baptist and Methodist ministers.',tier:1},
  {sentence:'Martin Luther King Jr. held a doctorate in systematic _____ from Boston University.',answer:'theology',options:['theology','philosophy','ethics','history'],explanation:'He earned it in 1955, the year of the Montgomery Bus Boycott.',tier:1},
  {sentence:'King drew on Gandhi\'s _____ resistance.',answer:'nonviolent',options:['nonviolent','passive','armed','civil'],explanation:'He adapted Gandhi\'s methods to the American context.',tier:1},
  {sentence:'The church provided mass meetings in _____, training, and moral authority.',answer:'sanctuaries',options:['sanctuaries','schools','courthouses','universities'],explanation:'The church building was the movement\'s organizational home.',tier:1},
  {sentence:'King was assassinated on April 4, _____.',answer:'1968',options:['1968','1963','1965','1970'],explanation:'He was killed in Memphis, Tennessee.',tier:1},
];

const A29_LEARN=[
  {sentence:'The Second Vatican Council ran from 1962 to _____.',answer:'1965',options:['1965','1963','1966','1970'],explanation:'It was the most significant Catholic event since the Reformation.',tier:1},
  {sentence:'Vatican II was convened by Pope John _____.',answer:'XXIII',options:['XXIII','Paul VI','Pius XII','Benedict XVI'],explanation:'He called it as an aggiornamento — a bringing up to date.',tier:1},
  {sentence:'John XXIII called the Council an _____ — a bringing up to date.',answer:'aggiornamento',options:['aggiornamento','reformation','renewal','ressourcement'],explanation:'He wanted the Church to open its windows to the modern world.',tier:1},
  {sentence:'The Council replaced the Latin liturgy with worship in the _____.',answer:'vernacular',options:['vernacular','Greek','English','national language'],explanation:'Catholics now heard Mass in their own language.',tier:1},
  {sentence:'John F. _____ was elected the first Catholic president in 1960.',answer:'Kennedy',options:['Kennedy','Johnson','McCarthy','Eisenhower'],explanation:'His election signaled Catholics\' full arrival into the American mainstream.',tier:1},
  {sentence:'After Vatican II, thousands of priests and _____ left religious life.',answer:'nuns',options:['nuns','deacons','monks','bishops'],explanation:'The post-conciliar era saw dramatic declines in religious vocations.',tier:1},
];

const A30_LEARN=[
  {sentence:'After the Scopes Trial, conservative Protestants largely _____ from national politics.',answer:'withdrew',options:['withdrew','engaged','dominated','reformed'],explanation:'They built a separate subculture and disengaged from the public square.',tier:1},
  {sentence:'School prayer was removed from public schools in _____.',answer:'1962',options:['1962','1973','1954','1968'],explanation:'The Supreme Court\'s Engel v. Vitale decision banned state-sponsored school prayer.',tier:1},
  {sentence:'The IRS threatened to revoke the tax-exempt status of _____ Christian academies in 1978.',answer:'segregated',options:['segregated','liberal','charismatic','independent'],explanation:'This threat directly mobilized the Religious Right.',tier:1},
  {sentence:'Jerry Falwell Sr. was a Baptist pastor in _____, Virginia.',answer:'Lynchburg',options:['Lynchburg','Richmond','Roanoke','Norfolk'],explanation:'He founded Thomas Road Baptist Church there.',tier:1},
  {sentence:'Falwell founded the Moral _____ in 1979.',answer:'Majority',options:['Majority','Coalition','Alliance','Movement'],explanation:'It became the flagship organization of the Religious Right.',tier:1},
  {sentence:'The Moral Majority helped deliver evangelical votes to Ronald _____ in 1980.',answer:'Reagan',options:['Reagan','Nixon','Ford','Bush'],explanation:'It was a decisive shift in evangelical political alignment.',tier:1},
];

const A31_LEARN=[
  {sentence:'A megachurch is a congregation of _____ thousand or more regular attendees.',answer:'two',options:['two','five','ten','one'],explanation:'The standard sociological threshold for a megachurch.',tier:1},
  {sentence:'Megachurches drew on marketing, seeker-sensitive worship, and _____ group infrastructure.',answer:'small',options:['small','large','house','cell'],explanation:'Small groups provided pastoral care at massive scale.',tier:1},
  {sentence:'Saddleback Community Church, a pioneering megachurch, is located in _____.',answer:'California',options:['California','Illinois','Texas','Florida'],explanation:'Founded by Rick Warren in Orange County.',tier:1},
  {sentence:'Americans identifying with no religion are called the "_____."',answer:'Nones',options:['Nones','Secular','Agnostics','Unchurched'],explanation:'They check "none" on religious affiliation surveys.',tier:1},
  {sentence:'The Nones rose from roughly 5% in 1970 to over _____ % by the 2020s.',answer:'25',options:['25','10','15','20'],explanation:'The rise makes the unaffiliated the largest single "religious" category in America.',tier:1},
  {sentence:'The decline was steepest among _____ Protestants and American Catholics.',answer:'mainline',options:['mainline','evangelical','Pentecostal','Baptist'],explanation:'They saw the sharpest drops in affiliation and attendance.',tier:1},
];

const A32_LEARN=[
  {sentence:'Over _____ evangelical scholars gathered in Chicago in 1978 to define inerrancy.',answer:'300',options:['300','100','500','1,000'],explanation:'The broad coalition gave the Statement institutional weight.',tier:1},
  {sentence:'_____ Theological Seminary had quietly moved away from strict inerrancy, helping trigger the Chicago Statement.',answer:'Fuller',options:['Fuller','Princeton','Dallas','Westminster'],explanation:'Fuller\'s drift was one of the direct triggers for the Chicago Statement.',tier:1},
  {sentence:'The Chicago Statement defined Scripture as without error in all that it _____.',answer:'affirms',options:['affirms','contains','records','intends'],explanation:'The precise wording — "all that it affirms" — was carefully chosen.',tier:1},
  {sentence:'The Chicago Statement applied inerrancy to Scripture\'s original _____.',answer:'manuscripts',options:['manuscripts','translations','editions','copies'],explanation:'Also called autographs — no original manuscripts survive.',tier:1},
  {sentence:'Robert _____ launched the Jesus Seminar in 1985.',answer:'Funk',options:['Funk','Borg','Crossan','Ehrman'],explanation:'Funk was a New Testament scholar who wanted to reach a popular audience.',tier:1},
  {sentence:'The Jesus Seminar voted on Jesus\'s sayings using colored _____.',answer:'beads',options:['beads','ballots','cards','tokens'],explanation:'Red meant authentic; black meant inauthentic.',tier:1},
];

const A13_STUDY={
  cards:[{
    text:'Charles Finney, a lawyer-turned-revivalist, swept western New York (the "Burned-Over District") with "new measures" — the anxious bench, protracted meetings, and naming the unconverted in prayer. He rejected Calvinist sovereignty, teaching revival was predictable if the right means were used. This human-choice theology set the template for all later American mass evangelism.',
    terms:[
      {word:'New measures',def:'Finney\'s revival techniques: the anxious bench, protracted meetings, and public prayer for the unconverted by name.'},
      {word:'Burned-Over District',def:'Western New York, so frequently swept by revival that it was said to have no spiritual fuel left.'},
    ],
    questions:[
      {q:'What made Finney\'s theology controversial?',a:'He rejected the Calvinist view that conversion was God\'s sovereign act, teaching instead that sinners could choose God at any moment and revival was the predictable result of using the right means.'},
      {q:'What was the Burned-Over District?',a:'Western New York, so frequently swept by revival that it was said to have no spiritual fuel left.'},
    ]
  }],
  questions:[
    {q:'What made Finney\'s theology controversial?',a:'He rejected the Calvinist view that conversion was God\'s sovereign act, teaching instead that sinners could choose God at any moment and revival was the predictable result of using the right means.'},
    {q:'What was the Burned-Over District?',a:'Western New York, so frequently swept by revival that it was said to have no spiritual fuel left.'},
  ]
};

const A14_STUDY={
  cards:[{
    text:"Two orthodox Protestant theologians attacked Finney from opposite directions. Charles Hodge (Princeton) charged that Finney's teaching on human ability was Pelagianism — a denial of Calvinist total depravity. John Williamson Nevin (Mercersburg) charged in The Anxious Bench (1843) that Finney's methods were a false theology replacing sacramental church life with manufactured psychological crisis. With Philip Schaff, Nevin developed the Mercersburg Theology: high-church Reformed, sacramental, and historically rooted. Both critiques were largely ignored by American Christianity, which ran in Finney's direction.",
    terms:[
      {word:'Princeton Theology',def:"Charles Hodge's conservative Reformed theology, resting on scriptural inerrancy and strict adherence to the Westminster Confession."},
      {word:'Mercersburg Theology',def:'The high-church Reformed theology of Nevin and Schaff emphasizing the Incarnation, real presence in the Eucharist, and the church as a living historical organism.'},
    ],
    questions:[
      {q:"How did Hodge's and Nevin's critiques of Finney differ?",a:"Hodge attacked from strict Calvinist confessionalism — Finney's human-ability theology was Pelagianism. Nevin attacked from a sacramental and historical direction — Finney's methods substituted psychological pressure for word and sacrament in the life of the church. Their critiques were both aimed at Finney but incompatible with each other."},
      {q:'Why does the Mercersburg Theology matter historically, even though it lost?',a:"It represents the most sophisticated theological alternative to revivalism's individualism in 19th-century America. Its emphasis on sacraments, the church as organism, and historical continuity anticipates later ecumenical, liturgical, and patristic renewal movements — roads American Christianity largely did not take."},
    ]
  }],
  questions:[
    {q:"How did Hodge's and Nevin's critiques of Finney differ?",a:"Hodge attacked from strict Calvinist confessionalism — Finney's human-ability theology was Pelagianism. Nevin attacked from a sacramental and historical direction — Finney's methods substituted psychological pressure for word and sacrament in the life of the church. Their critiques were both aimed at Finney but incompatible with each other."},
    {q:'Why does the Mercersburg Theology matter historically, even though it lost?',a:"It represents the most sophisticated theological alternative to revivalism's individualism in 19th-century America. Its emphasis on sacraments, the church as organism, and historical continuity anticipates later ecumenical, liturgical, and patristic renewal movements — roads American Christianity largely did not take."},
  ]
};

const A15_STUDY={
  cards:[{
    text:'The revival era produced three responses to the same millennial question. Joseph Smith founded the LDS Church in 1830 claiming new scripture and continuing revelation. William Miller predicted Christ\'s 1844 return — his 100,000 followers were devastated by the Great Disappointment. John Nelson Darby developed dispensationalism — a framework dividing history into distinct ages — and brought it to America in the 1860s and 1870s. Three men, three answers to: what is God about to do?',
    terms:[
      {word:'Great Disappointment',def:'The crisis among William Miller\'s followers when Christ did not return on the predicted date of 1844.'},
      {word:'Dispensationalism',def:'John Nelson Darby\'s framework dividing history into distinct ages in which God dealt with humanity differently; it became enormously influential in American fundamentalism.'},
    ],
    questions:[
      {q:'What did Joseph Smith, William Miller, and John Nelson Darby have in common?',a:'All three responded to the same era of millennial expectation — but in very different ways: Smith claimed new scripture, Miller set a date and was devastated, Darby built a theological framework that would outlast them both.'},
      {q:'What was dispensationalism, and why did it spread?',a:'Darby\'s system divided history into distinct ages of God\'s dealings with humanity. It spread through American prophetic Bible conferences in the 1860s–70s, offering evangelical networks a framework for reading prophecy — and would become enormously influential in fundamentalism.'},
    ]
  }],
  questions:[
    {q:'What did Joseph Smith, William Miller, and John Nelson Darby have in common?',a:'All three responded to the same era of millennial expectation — but in very different ways: Smith claimed new scripture, Miller set a date and was devastated, Darby built a theological framework that would outlast them both.'},
    {q:'What was dispensationalism, and why did it spread?',a:'Darby\'s system divided history into distinct ages of God\'s dealings with humanity. It spread through American prophetic Bible conferences in the 1860s–70s, offering evangelical networks a framework for reading prophecy — and would become enormously influential in fundamentalism.'},
  ]
};

const A16_STUDY={
  cards:[{
    text:'The Second Awakening\'s activist, optimistic theology — humans can choose good, society can be perfected — produced the "Benevolent Empire" of reform societies and fueled evangelical abolitionism. Finney, Weld, and the Tappan brothers argued slavery was sin. The revival\'s logic of equal souls before God could not coexist with slavery, and the tension would tear the churches apart.',
    terms:[
      {word:'Benevolent Empire',def:'The network of voluntary reform societies — Bible, tract, temperance, and others — produced by Second Awakening activism.'},
      {word:'Evangelical abolitionism',def:'The antislavery movement rooted in revival theology, arguing from Scripture that slavery was sin.'},
    ],
    questions:[
      {q:'What was the Benevolent Empire?',a:'The network of voluntary reform societies — the American Bible Society, American Tract Society, and dozens of organizations targeting temperance, prison reform, and Sabbath observance — produced by Second Awakening activism.'},
      {q:'Why was the Second Awakening\'s theology incompatible with slavery?',a:'If every soul has equal worth before God and the natural ability to choose good, slavery — which denies both freedom and equality — is sin. Evangelical abolitionists drew this conclusion directly.'},
    ]
  }],
  questions:[
    {q:'What was the Benevolent Empire?',a:'The network of voluntary reform societies — the American Bible Society, American Tract Society, and dozens of organizations targeting temperance, prison reform, and Sabbath observance — produced by Second Awakening activism.'},
    {q:'Why was the Second Awakening\'s theology incompatible with slavery?',a:'If every soul has equal worth before God and the natural ability to choose good, slavery — which denies both freedom and equality — is sin. Evangelical abolitionists drew this conclusion directly.'},
  ]
};

const A17_STUDY={
  cards:[{
    text:'The Methodist Episcopal Church split in 1844 over a slaveholding bishop; the Southern Baptist Convention formed in 1845 over slaveholding missionaries. Southerners built a biblical defense of slavery; Northerners countered with liberation themes. The church splits of the 1840s were a theological preview of the national war of 1861.',
    terms:[
      {word:'Southern Baptist Convention',def:'Founded in 1845 when Southern Baptists split from the national convention over the appointment of slaveholding missionaries.'},
      {word:'Biblical defense of slavery',def:'The theological argument developed by Southern clergy marshaling specific Scripture passages to claim slavery was divinely sanctioned.'},
    ],
    questions:[
      {q:'Why did the Methodist and Baptist churches split?',a:'The Methodists in 1844 over whether a slaveholding bishop could remain in office; the Baptists in 1845 over slaveholding missionary appointments. Both splits came when compromise between slaveholders and abolitionists became impossible.'},
      {q:'How did both sides use the Bible?',a:'Southerners cited specific passages — Noah\'s curse, Paul\'s instructions to slaves — to claim biblical sanction for slavery. Northerners countered with the Bible\'s broader themes of liberation and equal human dignity.'},
    ]
  }],
  questions:[
    {q:'Why did the Methodist and Baptist churches split?',a:'The Methodists in 1844 over whether a slaveholding bishop could remain in office; the Baptists in 1845 over slaveholding missionary appointments. Both splits came when compromise between slaveholders and abolitionists became impossible.'},
    {q:'How did both sides use the Bible?',a:'Southerners cited specific passages — Noah\'s curse, Paul\'s instructions to slaves — to claim biblical sanction for slavery. Northerners countered with the Bible\'s broader themes of liberation and equal human dignity.'},
  ]
};

const A18_STUDY={
  cards:[{
    text:'Richard Allen founded the AME Church in Philadelphia in 1816 — the first major Black-owned institution in America — providing the organizational bedrock on which the abolitionist movement was built. The cause itself was deeply Christian: Frederick Douglass distinguished a "slaveholding religion" from the true Christianity of Christ. The Black church — AME churches, Black Baptist congregations, and secret hush arbors — sustained hope and resistance. Harriet Tubman, guided by biblical visions, led hundreds to freedom and called herself Moses; for enslaved believers the Exodus was promise, not allegory.',
    terms:[
      {word:'AME Church',def:'The African Methodist Episcopal Church, founded by Richard Allen in Philadelphia in 1816 — the first major institution owned and governed entirely by Black Americans.'},
      {word:'Hush arbor',def:'A secret worship gathering held by enslaved people, often in the woods or slave quarters, outside the supervision of slaveholders.'},
      {word:'Underground Railroad',def:'The network of safe houses and routes by which enslaved people escaped to the North; Harriet Tubman was its most famous conductor.'},
    ],
    questions:[
      {q:'How did Frederick Douglass distinguish between two kinds of American Christianity?',a:'He separated the "slaveholding religion" — Christianity used to bless the whip and justify bondage — from the true Christianity of Christ, which condemned slavery.'},
      {q:'What role did the Black church play in the abolitionist era?',a:'It was the institutional heart of the movement — built on the foundation Richard Allen laid with the AME Church in 1816, and sustained through AME churches, Black Baptist congregations, and hush arbor gatherings.'},
    ]
  }],
  questions:[
    {q:'How did Frederick Douglass distinguish between two kinds of American Christianity?',a:'He separated the "slaveholding religion" — Christianity used to bless the whip and justify bondage — from the true Christianity of Christ, which condemned slavery.'},
    {q:'What role did the Black church play in the abolitionist era?',a:'It was the institutional heart of the movement — built on the foundation Richard Allen laid with the AME Church in 1816, and sustained through AME churches, Black Baptist congregations, and hush arbor gatherings.'},
  ]
};

const A19_STUDY={
  cards:[{
    text:'Lincoln\'s 1865 Second Inaugural, noting both sides "read the same Bible," interpreted the war as God\'s judgment on the national sin of slavery — the deepest theological statement of any American president. After emancipation, the AME Church grew from 20,000 to 400,000 in a decade. Black churches became Reconstruction\'s organizing centers until Jim Crow dismantled their gains.',
    terms:[
      {word:'Second Inaugural Address',def:'Lincoln\'s 1865 speech, widely considered the greatest American theological statement by a political figure, interpreting the war as divine judgment on the nation for slavery.'},
      {word:'Reconstruction',def:'The post–Civil War era (1865–1877) in which the federal government attempted to reintegrate the South; Black churches flourished as organizing centers before Jim Crow dismantled many gains.'},
    ],
    questions:[
      {q:'What made Lincoln\'s Second Inaugural theologically remarkable?',a:'He refused to claim God simply for the Union, instead interpreting the war\'s terrible cost as God\'s judgment on the whole nation for slavery — a level of theological humility and depth rare in any political speech.'},
      {q:'What happened to Black churches after emancipation?',a:'They exploded in growth — the AME alone grew from 20,000 to 400,000 in a decade — and became the organizing centers of Black community life during Reconstruction, providing schools, political leadership, and institutions.'},
    ]
  }],
  questions:[
    {q:'What made Lincoln\'s Second Inaugural theologically remarkable?',a:'He refused to claim God simply for the Union, instead interpreting the war\'s terrible cost as God\'s judgment on the whole nation for slavery — a level of theological humility and depth rare in any political speech.'},
    {q:'What happened to Black churches after emancipation?',a:'They exploded in growth — the AME alone grew from 20,000 to 400,000 in a decade — and became the organizing centers of Black community life during Reconstruction, providing schools, political leadership, and institutions.'},
  ]
};

const A20_STUDY={
  cards:[{
    text:'Dwight L. Moody, a Chicago shoe salesman with no seminary training, became the dominant post-Civil War evangelist. With Ira Sankey he pioneered the urban crusade — large halls, popular music, organized follow-up. He preached a God of love, founded the Moody Bible Institute (1886) and Northfield schools, and built the institutional network that anchored American fundamentalism.',
    terms:[
      {word:'Urban crusade',def:'Moody\'s innovation: renting large city halls, using choirs and popular music with Sankey, and organizing local churches for systematic follow-up on converts.'},
      {word:'Moody Bible Institute',def:'Founded in Chicago in 1886, it trained lay evangelists and workers and became a center of American fundamentalism.'},
    ],
    questions:[
      {q:'What innovations did Moody bring to mass evangelism?',a:'Renting large urban halls, using choirs and popular music with Sankey, and organizing local churches for systematic follow-up on converts — adapting Finney\'s rural revival methods to the industrial city.'},
      {q:'How did Moody\'s legacy extend beyond his own campaigns?',a:'The Moody Bible Institute and Northfield schools trained a generation of lay evangelists and workers, building the institutional network that would anchor American fundamentalism.'},
    ]
  }],
  questions:[
    {q:'What innovations did Moody bring to mass evangelism?',a:'Renting large urban halls, using choirs and popular music with Sankey, and organizing local churches for systematic follow-up on converts — adapting Finney\'s rural revival methods to the industrial city.'},
    {q:'How did Moody\'s legacy extend beyond his own campaigns?',a:'The Moody Bible Institute and Northfield schools trained a generation of lay evangelists and workers, building the institutional network that would anchor American fundamentalism.'},
  ]
};

const A21_STUDY={
  cards:[{
    text:'The Social Gospel argued industrial-era Christianity had to address poverty and injustice, not only personal salvation. Washington Gladden defended labor in the 1880s; Rauschenbusch\'s 1907 Christianity and the Social Crisis named "social sin" in unjust institutions. The movement produced the Federal Council of Churches (1908) but divided Protestantism between mainline and conservative wings.',
    terms:[
      {word:'Social sin',def:'Rauschenbusch\'s term for sin embedded in unjust social institutions — distinct from individual moral failure.'},
      {word:'Federal Council of Churches',def:'Founded in 1908, it united mainline Protestant denominations for cooperative social action — a product of the Social Gospel movement.'},
    ],
    questions:[
      {q:'What was Rauschenbusch\'s central argument?',a:'That the church had focused too narrowly on individual salvation while ignoring social sin — injustice embedded in institutions like exploitative labor and poverty.'},
      {q:'Why did the Social Gospel divide American Protestantism?',a:'Conservatives saw it as reducing the gospel to social work and neglecting personal conversion; the tension foreshadowed the fundamentalist-modernist split.'},
    ]
  }],
  questions:[
    {q:'What was Rauschenbusch\'s central argument?',a:'That the church had focused too narrowly on individual salvation while ignoring social sin — injustice embedded in institutions like exploitative labor and poverty.'},
    {q:'Why did the Social Gospel divide American Protestantism?',a:'Conservatives saw it as reducing the gospel to social work and neglecting personal conversion; the tension foreshadowed the fundamentalist-modernist split.'},
  ]
};

const A22_STUDY={
  cards:[{
    text:'The Azusa Street Mission (1906–09), led by Black preacher William J. Seymour in Los Angeles, launched global Pentecostalism. Seymour\'s theology of Spirit baptism evidenced by tongues came from Charles Parham (1901). The revival was interracial in a segregated era and sent missionaries worldwide. Pentecostalism now counts over 600 million adherents globally.',
    terms:[
      {word:'Glossolalia',def:'Speaking in tongues — Pentecostalism\'s defining sign of Spirit baptism, first connected to this doctrine by Charles Parham in 1901.'},
      {word:'Azusa Street Mission',def:'The Los Angeles revival center (1906–09) led by William J. Seymour that launched global Pentecostalism.'},
    ],
    questions:[
      {q:'What made the Azusa Street revival socially remarkable?',a:'In rigidly segregated 1906 America, Seymour\'s mission drew white, Black, and Hispanic worshipers together under Black pastoral leadership — an extraordinary integration.'},
      {q:'Why is Pentecostalism historically significant?',a:'Beginning at Azusa Street in 1906, it became the fastest-growing segment of global Christianity — now over 600 million — spreading fastest among the poor and in the global South.'},
    ]
  }],
  questions:[
    {q:'What made the Azusa Street revival socially remarkable?',a:'In rigidly segregated 1906 America, Seymour\'s mission drew white, Black, and Hispanic worshipers together under Black pastoral leadership — an extraordinary integration.'},
    {q:'Why is Pentecostalism historically significant?',a:'Beginning at Azusa Street in 1906, it became the fastest-growing segment of global Christianity — now over 600 million — spreading fastest among the poor and in the global South.'},
  ]
};

const A23_STUDY={
  cards:[{
    text:'By 1910, higher criticism, Darwinism, and the Social Gospel had alarmed conservative Protestants. Two California oilmen funded The Fundamentals (1910–15) — ninety essays defending virgin birth, resurrection, and inerrancy, mailed free to every pastor in America. The term "fundamentalist" was coined in 1920. The movement had a network of Bible institutes and was heading toward open war with the mainline.',
    terms:[
      {word:'The Fundamentals',def:'Ninety essays (1910–15) funded by oilmen Lyman and Milton Stewart, mailed free to every pastor and theology student, defending core Protestant doctrines against modernism.'},
      {word:'Fundamentalist',def:'A term coined in 1920 by Baptist editor Curtis Lee Laws for those willing to do "battle royal" for the fundamentals of the faith.'},
    ],
    questions:[
      {q:'What three developments alarmed conservative Protestants by 1910?',a:'Higher biblical criticism in the seminaries, Darwinian evolution challenging Genesis, and the Social Gospel appearing to replace personal salvation with social reform.'},
      {q:'What was significant about how The Fundamentals were distributed?',a:'They were mailed free to every pastor, missionary, and theology student in America — a massive, organized effort to reach the entire Protestant clergy before the controversy fully erupted.'},
    ]
  }],
  questions:[
    {q:'What three developments alarmed conservative Protestants by 1910?',a:'Higher biblical criticism in the seminaries, Darwinian evolution challenging Genesis, and the Social Gospel appearing to replace personal salvation with social reform.'},
    {q:'What was significant about how The Fundamentals were distributed?',a:'They were mailed free to every pastor, missionary, and theology student in America — a massive, organized effort to reach the entire Protestant clergy before the controversy fully erupted.'},
  ]
};

const A24_STUDY={
  cards:[{
    text:'In 1922 Fosdick\'s sermon "Shall the Fundamentalists Win?" challenged fundamentalist influence; he was forced to resign. Machen\'s Christianity and Liberalism (1923) argued liberalism was not revised Christianity but a different religion that replaced redemption with moral improvement. Forced out of Princeton, Machen founded Westminster Seminary in 1929.',
    terms:[
      {word:'Harry Emerson Fosdick',def:'Liberal Baptist preacher whose 1922 sermon "Shall the Fundamentalists Win?" challenged fundamentalist influence in mainline denominations.'},
      {word:'J. Gresham Machen',def:'Princeton theologian who argued in Christianity and Liberalism (1923) that liberalism was not a revised Christianity but a different religion; founded Westminster Seminary in 1929.'},
    ],
    questions:[
      {q:'What was Fosdick\'s argument in "Shall the Fundamentalists Win?"',a:'That modern believers should be free to reinterpret doctrines like the virgin birth and Second Coming in light of modern knowledge — a direct challenge to fundamentalist influence in the mainline.'},
      {q:'How did Machen\'s response differ from typical fundamentalist arguments?',a:'Where many fundamentalists argued emotionally or from Scripture, Machen made a precise intellectual case: liberalism had not revised Christianity but replaced the gospel of redemption with a gospel of moral improvement, making it a different religion entirely.'},
    ]
  }],
  questions:[
    {q:'What was Fosdick\'s argument in "Shall the Fundamentalists Win?"',a:'That modern believers should be free to reinterpret doctrines like the virgin birth and Second Coming in light of modern knowledge — a direct challenge to fundamentalist influence in the mainline.'},
    {q:'How did Machen\'s response differ from typical fundamentalist arguments?',a:'Where many fundamentalists argued emotionally or from Scripture, Machen made a precise intellectual case: liberalism had not revised Christianity but replaced the gospel of redemption with a gospel of moral improvement, making it a different religion entirely.'},
  ]
};

const A25_STUDY={
  cards:[{
    text:'The 1925 Scopes Trial pitted Bryan (prosecution) against Darrow (defense) over Tennessee\'s Butler Act banning evolution teaching. Scopes was convicted, but Mencken\'s mocking press coverage made fundamentalists look ignorant. Having won legally but lost culturally, fundamentalists withdrew to build Bible institutes, radio programs, and separate institutions — not re-engaging the public square until the 1970s.',
    terms:[
      {word:'Butler Act',def:'Tennessee\'s 1925 law making it illegal to teach human evolution in public schools — the law Scopes violated.'},
      {word:'Fundamentalist withdrawal',def:'The post-Scopes retreat from public life, building a separate subculture of Bible institutes, radio programs, and independent institutions; not re-engaging broadly until the 1970s.'},
    ],
    questions:[
      {q:'Why is the Scopes Trial considered a turning point for fundamentalism?',a:'Despite winning the legal case, fundamentalists lost the war of public opinion. Mencken\'s coverage made them look like ignorant rurals, driving many to withdraw from public culture and build separate institutions.'},
      {q:'What did the post-Scopes fundamentalist withdrawal look like?',a:'Bible institutes, radio programs, independent mission agencies, and eventually separate colleges and seminaries — a parallel subculture that kept conservative Christianity alive while disengaging from the mainstream.'},
    ]
  }],
  questions:[
    {q:'Why is the Scopes Trial considered a turning point for fundamentalism?',a:'Despite winning the legal case, fundamentalists lost the war of public opinion. Mencken\'s coverage made them look like ignorant rurals, driving many to withdraw from public culture and build separate institutions.'},
    {q:'What did the post-Scopes fundamentalist withdrawal look like?',a:'Bible institutes, radio programs, independent mission agencies, and eventually separate colleges and seminaries — a parallel subculture that kept conservative Christianity alive while disengaging from the mainstream.'},
  ]
};

const A26_STUDY={
  cards:[{
    text:'World War I shattered the Social Gospel\'s optimism. Karl Barth, shocked by his professors\' support for the Kaiser, recovered God\'s radical transcendence in his 1919 Romans commentary. In America, Reinhold Niebuhr\'s Christian Realism applied the doctrine of original sin to politics: groups inevitably serve self-interest, power must check power. His 1932 Moral Man and Immoral Society influenced American foreign policy and the labor movement.',
    terms:[
      {word:'Neo-orthodoxy',def:'The theological movement associated with Karl Barth that rejected liberal optimism and recovered God\'s transcendence and the authority of Scripture against human cultural accommodation.'},
      {word:'Christian Realism',def:'Reinhold Niebuhr\'s theology rooted in original sin, arguing groups inevitably serve self-interest and political idealism must be tempered by realism.'},
    ],
    questions:[
      {q:'What provoked Karl Barth to abandon liberal theology?',a:'Seeing his liberal theology professors sign a manifesto supporting the Kaiser\'s war convinced him that liberal theology had made God the servant of human culture rather than its judge.'},
      {q:'What was Niebuhr\'s central insight in Moral Man and Immoral Society?',a:'That while individuals could act morally, groups — nations, classes, races — inevitably serve their own interests. The doctrine of original sin was a more realistic guide to politics than the Social Gospel\'s optimism.'},
    ]
  }],
  questions:[
    {q:'What provoked Karl Barth to abandon liberal theology?',a:'Seeing his liberal theology professors sign a manifesto supporting the Kaiser\'s war convinced him that liberal theology had made God the servant of human culture rather than its judge.'},
    {q:'What was Niebuhr\'s central insight in Moral Man and Immoral Society?',a:'That while individuals could act morally, groups — nations, classes, races — inevitably serve their own interests. The doctrine of original sin was a more realistic guide to politics than the Social Gospel\'s optimism.'},
  ]
};

const A27_STUDY={
  cards:[{
    text:'Neo-evangelicals broke from fundamentalist separatism: the NAE (1942), Carl Henry\'s Uneasy Conscience (1947), and Fuller Seminary (1947) formed a new movement. Billy Graham, launched by the 1949 Los Angeles crusade, combined Moody\'s crusade machinery with broad denominational appeal. His 1957 New York crusade drew two million. He became the face of mid-century American evangelicalism.',
    terms:[
      {word:'Neo-evangelicalism',def:'The 1940s–50s movement of conservatives who broke from fundamentalist separatism to re-engage culture, scholarship, and social concern while maintaining orthodox doctrine.'},
      {word:'Fuller Theological Seminary',def:'Founded in 1947 in Pasadena as an academically serious evangelical institution — a middle way between fundamentalist Bible institutes and liberal seminaries.'},
    ],
    questions:[
      {q:'What distinguished neo-evangelicalism from fundamentalism?',a:'Neo-evangelicals rejected fundamentalist separatism and intellectual withdrawal, wanting to re-engage culture, serious scholarship, and social concern while maintaining conservative doctrine.'},
      {q:'Why was Billy Graham controversial among strict fundamentalists?',a:'He partnered with mainline churches in his crusades rather than demanding separation from them — which separatist fundamentalists saw as compromising with liberalism.'},
    ]
  }],
  questions:[
    {q:'What distinguished neo-evangelicalism from fundamentalism?',a:'Neo-evangelicals rejected fundamentalist separatism and intellectual withdrawal, wanting to re-engage culture, serious scholarship, and social concern while maintaining conservative doctrine.'},
    {q:'Why was Billy Graham controversial among strict fundamentalists?',a:'He partnered with mainline churches in his crusades rather than demanding separation from them — which separatist fundamentalists saw as compromising with liberalism.'},
  ]
};

const A28_STUDY={
  cards:[{
    text:'The Civil Rights Movement was a church movement. The SCLC (1957), led by Black clergy, used church sanctuaries, networks, and moral authority as its infrastructure. King, a Baptist pastor with a Boston University doctorate, synthesized the Black church tradition, the Social Gospel, Gandhi\'s nonviolence, and Niebuhr\'s Christian Realism into a theology of redemptive suffering. His Birmingham Jail letter (1963) and Washington speech were saturated with Scripture and theology.',
    terms:[
      {word:'Southern Christian Leadership Conference (SCLC)',def:'The organization of Black Baptist and Methodist ministers founded in 1957 to lead the Civil Rights Movement, with King as its president.'},
      {word:'Redemptive suffering',def:'King\'s theology that suffering endured nonviolently for justice had redemptive power — drawn from the Black church tradition and the cross.'},
    ],
    questions:[
      {q:'Why is it accurate to call the Civil Rights Movement a church movement?',a:'Its leadership was Black clergy (SCLC), its infrastructure was church sanctuaries and networks, its theology was prophetic Black Christianity, and its president was a Baptist pastor with a doctorate in systematic theology.'},
      {q:'What did King draw on in constructing his theology of redemptive suffering?',a:'The Black church\'s prophetic tradition, the Social Gospel\'s concern for justice, Gandhi\'s nonviolent resistance, and Niebuhr\'s Christian Realism — a synthesis of multiple traditions.'},
    ]
  }],
  questions:[
    {q:'Why is it accurate to call the Civil Rights Movement a church movement?',a:'Its leadership was Black clergy (SCLC), its infrastructure was church sanctuaries and networks, its theology was prophetic Black Christianity, and its president was a Baptist pastor with a doctorate in systematic theology.'},
    {q:'What did King draw on in constructing his theology of redemptive suffering?',a:'The Black church\'s prophetic tradition, the Social Gospel\'s concern for justice, Gandhi\'s nonviolent resistance, and Niebuhr\'s Christian Realism — a synthesis of multiple traditions.'},
  ]
};

const A29_STUDY={
  cards:[{
    text:'Vatican II (1962–65), Pope John XXIII\'s aggiornamento, replaced the Latin Mass with vernacular worship, affirmed religious liberty, and opened ecumenical dialogue. For American Catholics, it arrived alongside Kennedy\'s 1960 election. After the Council, Mass attendance declined, thousands left religious life, and a progressive-traditional divide deepened — a tension still unresolved.',
    terms:[
      {word:'Aggiornamento',def:'Italian for "bringing up to date"; Pope John XXIII\'s word for Vatican II\'s purpose of opening the Church to the modern world.'},
      {word:'Vernacular',def:'The local spoken language; Vatican II replaced the universal Latin Mass with worship in the vernacular of each country.'},
    ],
    questions:[
      {q:'What were Vatican II\'s most significant changes?',a:'Replacing the Latin Mass with vernacular worship, affirming religious liberty, acknowledging the Spirit\'s work outside the Church, and opening ecumenical dialogue with Protestants and Jews.'},
      {q:'Why did Vatican II deepen rather than resolve divisions in American Catholicism?',a:'Progressive Catholics embraced the reforms as an overdue opening; traditionalists saw them as a betrayal of the Church\'s heritage. The reforms also coincided with broader cultural upheaval in the 1960s, amplifying the divisions.'},
    ]
  }],
  questions:[
    {q:'What were Vatican II\'s most significant changes?',a:'Replacing the Latin Mass with vernacular worship, affirming religious liberty, acknowledging the Spirit\'s work outside the Church, and opening ecumenical dialogue with Protestants and Jews.'},
    {q:'Why did Vatican II deepen rather than resolve divisions in American Catholicism?',a:'Progressive Catholics embraced the reforms as an overdue opening; traditionalists saw them as a betrayal of the Church\'s heritage. The reforms also coincided with broader cultural upheaval in the 1960s, amplifying the divisions.'},
  ]
};

const A30_STUDY={
  cards:[{
    text:'After Scopes, conservatives withdrew from politics. The 1960s–70s — the sexual revolution, court-ordered school desegregation, removal of school prayer (1962), Roe v. Wade (1973), and the 1978 IRS threat to Christian academies — drew them back. Falwell\'s Moral Majority (1979) delivered evangelical votes to Reagan in 1980. The Religious Right permanently fused evangelical identity with Republican politics.',
    terms:[
      {word:'Moral Majority',def:'The political organization founded by Jerry Falwell Sr. in 1979 that mobilized conservative evangelicals for Republican politics.'},
      {word:'Culture wars',def:'The 1980s conflicts between conservative religious coalitions and progressive secular coalitions over abortion, school prayer, sex education, and related issues.'},
    ],
    questions:[
      {q:'What triggered the Religious Right\'s return to politics?',a:'A cluster of changes: the sexual revolution, school desegregation, the removal of school prayer (1962), Roe v. Wade (1973), and especially the 1978 IRS threat to segregated Christian academies.'},
      {q:'What was the lasting political effect of the Religious Right?',a:'It permanently fused evangelical Protestant identity with Republican political affiliation — a relationship that did not exist before the 1970s and that continues to shape American politics.'},
    ]
  }],
  questions:[
    {q:'What triggered the Religious Right\'s return to politics?',a:'A cluster of changes: the sexual revolution, school desegregation, the removal of school prayer (1962), Roe v. Wade (1973), and especially the 1978 IRS threat to segregated Christian academies.'},
    {q:'What was the lasting political effect of the Religious Right?',a:'It permanently fused evangelical Protestant identity with Republican political affiliation — a relationship that did not exist before the 1970s and that continues to shape American politics.'},
  ]
};

const A31_STUDY={
  cards:[{
    text:'Late-twentieth-century American Christianity split two ways: megachurches drew tens of thousands with seeker-sensitive worship, and global Pentecostalism moved Christianity\'s center outside the West. At the same time, the "Nones" rose from 5% to over 25%. Mainline Protestants and Catholics declined most sharply. American Christianity ends its fourth century more globally influential and more domestically fragile than at any point in its history.',
    terms:[
      {word:'Megachurch',def:'A Protestant congregation with two thousand or more average weekly attendees, often featuring seeker-sensitive worship and small-group infrastructure.'},
      {word:'Nones',def:'Americans who identify with no religion; rose from roughly 5% in 1970 to over 25% by the 2020s, making them the largest single "religious" category in America.'},
    ],
    questions:[
      {q:'How did megachurches reshape Protestant life in the late twentieth century?',a:'By drawing on marketing, seeker-sensitive worship, and small-group infrastructure, megachurches like Willow Creek and Saddleback drew tens of thousands weekly — remaking the scale and style of Protestant congregational life.'},
      {q:'What factors do scholars identify as causes of the rise of the Nones?',a:'The alignment of Christianity with partisan politics, abuse scandals in Catholic and evangelical institutions, generational disaffiliation, and the broader secularization of Western culture.'},
    ]
  }],
  questions:[
    {q:'How did megachurches reshape Protestant life in the late twentieth century?',a:'By drawing on marketing, seeker-sensitive worship, and small-group infrastructure, megachurches like Willow Creek and Saddleback drew tens of thousands weekly — remaking the scale and style of Protestant congregational life.'},
    {q:'What factors do scholars identify as causes of the rise of the Nones?',a:'The alignment of Christianity with partisan politics, abuse scandals in Catholic and evangelical institutions, generational disaffiliation, and the broader secularization of Western culture.'},
  ]
};

const A32_STUDY={
  cards:[{
    text:'In 1978, over 300 evangelical scholars signed the Chicago Statement on Biblical Inerrancy, drawing a line against doctrinal drift in schools like Fuller. Seven years later, Robert Funk\'s Jesus Seminar used colored-bead votes to conclude only 18% of Jesus\'s gospel sayings were authentic — splashing the question across Newsweek and Time. The two projects were mirror images: one defending Scripture\'s total reliability, the other publicly dismantling it. Together they brought the fundamentalist-modernist controversy\'s core question — what kind of book is the Bible? — back into the center of American public life.',
    terms:[
      {word:'Biblical inerrancy',def:'The doctrine that Scripture, in its original manuscripts, is without error in all that it affirms — the position defined and defended by the 1978 Chicago Statement.'},
      {word:'Chicago Statement on Biblical Inerrancy',def:'A 1978 document signed by over 300 evangelical scholars defining inerrancy precisely, in response to drift in evangelical institutions away from a high view of Scripture.'},
      {word:'Jesus Seminar',def:'A group of roughly 150 scholars founded by Robert Funk in 1985, who voted on the historical authenticity of Jesus\'s sayings using colored beads; their skeptical conclusions received wide media coverage.'},
    ],
    questions:[
      {q:'Why was the Chicago Statement necessary in 1978?',a:'Because evangelical institutions including Fuller Seminary were quietly moving away from strict inerrancy. The Statement drew a precise line — inerrancy extends to all that Scripture affirms, including history and science — that institutions and denominations spent the following decades fighting over.'},
      {q:'Was the Jesus Seminar primarily a scholarly or a cultural project?',a:'Both, but deliberately more cultural. Its bead-voting method was designed for media attention, its conclusions were publicized in mainstream magazines rather than just journals, and its founder Robert Funk explicitly wanted to reach a popular audience. Critics said this made it sensationalist; supporters said it brought genuine scholarly questions to the public who deserved to hear them.'},
    ]
  }],
  questions:[
    {q:'Why was the Chicago Statement necessary in 1978?',a:'Because evangelical institutions including Fuller Seminary were quietly moving away from strict inerrancy. The Statement drew a precise line — inerrancy extends to all that Scripture affirms, including history and science — that institutions and denominations spent the following decades fighting over.'},
    {q:'Was the Jesus Seminar primarily a scholarly or a cultural project?',a:'Both, but deliberately more cultural. Its bead-voting method was designed for media attention, its conclusions were publicized in mainstream magazines rather than just journals, and its founder Robert Funk explicitly wanted to reach a popular audience. Critics said this made it sensationalist; supporters said it brought genuine scholarly questions to the public who deserved to hear them.'},
  ]
};

const A13_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 13 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">Finney &amp; the Burned-Over District</h1>
<p class="article-sub">New Measures Revival in New York · 1820–1840</p>
<div class="art-divider"></div>
<div class="article-body">
<p>How Charles Finney's "new measures" transformed American revivalism.</p>
<p>Charles Grandison Finney was a lawyer-turned-revivalist who swept through upstate New York in the 1820s–30s with what he called <strong>"new measures"</strong>: the <strong>anxious bench</strong> (a front pew where the nearly-converted sat under prayer), protracted meetings running for days, and the practice of praying publicly by name for unconverted neighbors. The region had been so frequently swept by revival that it became known as the <strong>"Burned-Over District."</strong></p>
<p>Finney's theology was as controversial as his methods. He rejected the Calvinist view that conversion was God's sovereign act and taught instead that sinners had the natural ability to choose God at any moment. Revival was not a miracle — it was the predictable result of using the right means. This shift from Calvinist sovereignty to human choice reshaped American evangelicalism and set the template for mass evangelism that <strong>Billy Graham</strong> would inherit a century later.</p>
<figure class="art-fig portrait">
  <div class="fig-img-wrap"><img src="/images/america/L13_Finney.jpeg" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block;"></div>
  <div class="fig-body">
    <div class="fig-label">The Burned-Over District · 1820s–1830s</div>
    <div class="fig-title">Charles Grandison Finney</div>
    <div class="fig-desc">Lawyer-turned-revivalist whose "new measures" — the anxious bench, protracted meetings, public prayer for the unconverted by name — revolutionized American revivalism and set the template for mass evangelism for the next two centuries.</div>
  </div>
</figure>
<div class="atl-box">
  <div class="atl-label">Key terms</div>
  <div class="atl-row"><div class="atl-year">New measures</div><div class="atl-text">The anxious bench, protracted meetings, and public prayer for the unconverted by name</div></div>
  <div class="atl-row"><div class="atl-year">Burned-Over District</div><div class="atl-text">Western New York, so repeatedly swept by revival it was said to have no spiritual fuel left</div></div>
  <div class="atl-row"><div class="atl-year">Protracted meetings</div><div class="atl-text">Multi-day revival services designed to sustain momentum until conversions occurred</div></div>
</div>
</div>`;

const A14_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 14 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">Critics of the Revival</h1>
<p class="article-sub">Hodge, Nevin &amp; the Mercersburg Theology · 1843–1860</p>
<div class="art-divider"></div>
<div class="article-body">
<p>Two searching critiques of Finney came from within Protestant orthodoxy — and from opposite directions. <strong>Charles Hodge</strong> at Princeton charged that Finney's teaching on human ability was <strong>Pelagianism</strong> — the ancient heresy that humans could save themselves. Princeton's job, Hodge famously boasted, was to guard orthodoxy, not innovate.</p>
<figure class="art-fig portrait">
  <div class="fig-img-wrap"><img src="/images/america/L14_Critics.jpeg" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block;"></div>
  <div class="fig-body">
    <div class="fig-label">Princeton Seminary · 1820s–1870s</div>
    <div class="fig-title">Charles Hodge</div>
    <div class="fig-desc">The dominant theologian of 19th-century American Presbyterianism, who famously boasted that no new idea had ever originated at Princeton — and charged Finney's revival theology with the ancient heresy of Pelagianism.</div>
  </div>
</figure>
<p><strong>John Williamson Nevin</strong> attacked differently. In <em>The Anxious Bench</em> (1843) he argued Finney's new measures were a bad theology: they assumed conversion was a psychological crisis produced by emotional pressure, replacing the true means of grace — word and sacrament in the life of the church. With <strong>Philip Schaff</strong>, Nevin developed the <strong>"Mercersburg Theology"</strong> at a small German Reformed seminary in Pennsylvania: a high-church Reformed vision emphasizing the Incarnation, real presence in the Eucharist, and the church as a living organism continuous with the ancient church. American Christianity ran in Finney's direction. Both roads not taken.</p>
<div class="atl-box">
  <div class="atl-label">Key terms</div>
  <div class="atl-row"><div class="atl-year">Princeton Theology</div><div class="atl-text">Hodge's conservative Reformed theology — scriptural inerrancy and strict Westminster Confession adherence</div></div>
  <div class="atl-row"><div class="atl-year">Pelagianism</div><div class="atl-text">Ancient heresy (condemned 418 AD) that humans can save themselves — Hodge's charge against Finney</div></div>
  <div class="atl-row"><div class="atl-year">The Anxious Bench (1843)</div><div class="atl-text">Nevin's critique: Finney's new measures were a false theology of conversion as psychological crisis</div></div>
  <div class="atl-row"><div class="atl-year">Mercersburg Theology</div><div class="atl-text">High-church Reformed vision emphasizing sacraments, Incarnation, and the church as a living historical organism</div></div>
</div>
</div>`;

const A15_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 15 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">New Ideas</h1>
<p class="article-sub">Mormonism, Millerism &amp; Dispensationalism · 1830–1875</p>
<div class="art-divider"></div>
<div class="article-body">
<p>How the millennial hunger of the revival era produced three very different responses to the same question: what is God about to do?</p>
<p>The same spiritual ferment that produced Finney also generated movements that went far beyond Protestant boundaries. <strong>Joseph Smith</strong> founded the Church of Jesus Christ of Latter-day Saints in <strong>1830</strong>, claiming new scripture (the Book of Mormon) and continuing revelation. <strong>William Miller</strong>, a Baptist lay preacher, calculated from Daniel and Revelation that Christ would return in 1844; his following of up to 100,000 was devastated by the <strong>"Great Disappointment"</strong> when the date passed. Some of his followers went on to form Seventh-day Adventism from the wreckage.</p>
<p>The same millennial hunger that produced Joseph Smith and William Miller also produced <strong>John Nelson Darby</strong>. An Irish-born Plymouth Brethren minister, Darby developed a new system for reading the whole of Scripture called <strong>dispensationalism</strong> — the idea that God had dealt with humanity differently across distinct ages of history. Where Miller had set a date and been devastated, Darby built a framework. He made multiple tours of America in the 1860s and 1870s, planting his ideas in prophetic Bible conferences and among the same evangelical networks that read Moody. The full flowering of his influence would come later — but the seed was planted in this same era of millennial expectation.</p>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">1830</div><div class="atl-text">Joseph Smith organizes the LDS Church in western New York</div></div>
  <div class="atl-row"><div class="atl-year">1844</div><div class="atl-text">The "Great Disappointment" — Miller's predicted return of Christ passes</div></div>
  <div class="atl-row"><div class="atl-year">1860s–70s</div><div class="atl-text">John Nelson Darby makes multiple tours of America, spreading dispensationalism</div></div>
</div>
</div>`;

const A16_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 16 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">The Second Awakening's Legacy</h1>
<p class="article-sub">Reform, Abolition &amp; the Benevolent Empire · 1820–1850</p>
<div class="art-divider"></div>
<div class="article-body">
<p>How the Second Awakening's optimism spilled over into social reform movements.</p>
<p>The Second Awakening's activist, optimistic theology — the belief that humans could choose good, and that society could be perfected — produced a wave of voluntary reform societies. The <strong>"Benevolent Empire,"</strong> as it was called, included the <strong>American Bible Society (1816)</strong>, the <strong>American Tract Society (1825)</strong>, and dozens of organizations targeting temperance, Sabbath observance, and prison reform. Many were led by women who found in voluntary societies their first sphere of organized public action.</p>
<p>The most explosive application of revival energy was abolitionism. Evangelical abolitionists like <strong>Theodore Dwight Weld</strong> and the <strong>Tappan brothers</strong> funded antislavery organizing and argued from Scripture that slavery was sin. Finney himself declared that slaveholders should be barred from communion. The revival's logic — that every soul had equal worth before God and the ability to choose good — could not comfortably coexist with slavery, and the tension between them would eventually tear the churches apart.</p>
<figure style="margin:1.75rem 0;border:1px solid rgba(20,8,12,0.1);overflow:hidden;">
  <img src="/images/america/L15_2AL.jpeg" style="width:100%;display:block;object-fit:cover;max-height:360px;">
  <figcaption><strong>The Benevolent Empire · 1816–1850s</strong> The Second Awakening's activist theology generated a network of voluntary reform societies — Bible and tract societies, temperance organizations, and eventually the abolitionist movement — that reshaped American public life.</figcaption>
</figure>
<div class="atl-box">
  <div class="atl-label">Key terms</div>
  <div class="atl-row"><div class="atl-year">Benevolent Empire</div><div class="atl-text">The network of voluntary reform societies produced by Second Awakening activism</div></div>
  <div class="atl-row"><div class="atl-year">American Bible Society</div><div class="atl-text">Founded 1816 — one of the first major Benevolent Empire organizations</div></div>
  <div class="atl-row"><div class="atl-year">Evangelical abolitionism</div><div class="atl-text">Antislavery movement rooted in revival theology, arguing from Scripture that slavery was sin</div></div>
</div>
</div>`;

const A17_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 17 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">The Churches Divide Over Slavery</h1>
<p class="article-sub">Denominational Splits · 1831–1845</p>
<div class="art-divider"></div>
<div class="article-body">
<p>How American denominations fractured along North-South lines over slavery a decade before the Civil War.</p>
<p>The two largest Protestant denominations in America split over slavery before the nation itself did. The <strong>Methodist Episcopal Church</strong> divided in <strong>1844</strong> over whether a slaveholding bishop could continue in office; the <strong>Methodist Episcopal Church South</strong> was founded the following year. The <strong>Baptists</strong> split in <strong>1845</strong> when Southern missionary boards rejected a slaveholding candidate, leading to the formation of the <strong>Southern Baptist Convention</strong>.</p>
<p>These splits were not merely organizational — they were theological. Southerners developed a <strong>"biblical defense of slavery,"</strong> marshaling Scripture passages to argue that slavery was divinely sanctioned. Northerners countered with the Bible's broader themes of liberation and human dignity. By the eve of the Civil War, the same Bible was being used to argue both sides. The denominational splits of the 1840s presaged the national split of 1861.</p>
<figure style="margin:1.75rem 0;border:1px solid rgba(20,8,12,0.1);overflow:hidden;">
  <img src="/images/america/L16_Prayer.jpeg" style="width:100%;display:block;object-fit:cover;max-height:360px;">
  <figcaption><strong>A Nation at Prayer — and at War With Itself · 1844–1861</strong> As the denominational splits over slavery made clear, the same pews that united Americans in worship could not hold together those who disagreed on whether slavery was sin or Scripture's sanction.</figcaption>
</figure>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">1844</div><div class="atl-text">Methodist Episcopal Church splits over slaveholding bishop James O. Andrew</div></div>
  <div class="atl-row"><div class="atl-year">1845</div><div class="atl-text">Southern Baptist Convention founded over slaveholding missionary appointments</div></div>
  <div class="atl-row"><div class="atl-year">1861</div><div class="atl-text">The theological preview becomes national war at Fort Sumter</div></div>
</div>
</div>`;

const A18_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 18 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">Abolitionists &amp; Black Christians</h1>
<p class="article-sub">The Bible War Over Slavery · 1831–1861</p>
<div class="art-divider"></div>
<div class="article-body">
<p>How Black Christians and evangelical abolitionists fought the theological battle over slavery.</p>
<p>The institutional foundation for the abolitionist era was laid decades earlier. <strong>Richard Allen</strong>, a formerly enslaved man, founded the <strong>African Methodist Episcopal Church</strong> in Philadelphia in <strong>1816</strong> after Black worshipers were pulled from their knees during prayer at a white Methodist church. The AME became the first major institution owned and governed entirely by Black Americans — a center of community life, literacy, and resistance. It was the organizational bedrock on which everything in this lesson was built.</p>
<p>The abolitionist movement was deeply Christian. <strong>William Lloyd Garrison</strong>, who began publishing the antislavery newspaper <strong><em>The Liberator</em></strong> in 1831, Harriet Beecher Stowe, and Theodore Dwight Weld all drew on religious conviction. But the most compelling voices were those of Black Christians themselves. <strong>Frederick Douglass</strong>, a formerly enslaved man and the movement's greatest orator, argued that American Christianity had produced two versions of the faith: a <strong>"slaveholding religion"</strong> that blessed the whip, and the true Christianity of Christ, which condemned it.</p>
<p>The Black church was the institutional heart of the abolitionist cause. AME churches, independent Black Baptist congregations, and invisible <strong>"hush arbor"</strong> worship gatherings in the slave quarters sustained a faith that held together hope and resistance. <strong>Harriet Tubman</strong>, deeply shaped by biblical visions, led hundreds to freedom on the <strong>Underground Railroad</strong> and called herself Moses. For enslaved believers, the Exodus story was not allegory — it was promise.</p>
<figure class="art-fig portrait">
  <div class="fig-img-wrap"><img src="/images/america/L17_HarietTubman.jpeg" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block;"></div>
  <div class="fig-body">
    <div class="fig-label">The Underground Railroad · 1849–1860</div>
    <div class="fig-title">Harriet Tubman</div>
    <div class="fig-desc">Deeply shaped by biblical visions and prayer, Tubman led approximately 70 enslaved people to freedom on the Underground Railroad and called herself Moses. "I never ran my train off the track," she later said, "and I never lost a passenger."</div>
  </div>
</figure>
<div class="atl-box">
  <div class="atl-label">Key terms</div>
  <div class="atl-row"><div class="atl-year">AME Church</div><div class="atl-text">African Methodist Episcopal Church, founded by Richard Allen in Philadelphia in 1816 — the first major institution owned and governed entirely by Black Americans</div></div>
  <div class="atl-row"><div class="atl-year">Hush arbor</div><div class="atl-text">Secret worship gatherings held by enslaved people outside slaveholder supervision</div></div>
  <div class="atl-row"><div class="atl-year">Underground Railroad</div><div class="atl-text">Network of safe houses and routes to the North; Harriet Tubman was its most famous conductor</div></div>
</div>
<div class="pull-quote">
  <p>"I never ran my train off the track and I never lost a passenger."</p>
  <cite>— Harriet Tubman</cite>
</div>
</div>`;

const A19_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 19 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">Lincoln, War &amp; Reconstruction</h1>
<p class="article-sub">The Second Inaugural &amp; After · 1861–1895</p>
<div class="art-divider"></div>
<div class="article-body">
<p>How the Civil War reshaped American religion and produced Lincoln's theological masterpiece.</p>
<p>By 1865 the Civil War had killed 620,000 Americans. Abraham Lincoln, in his <strong>Second Inaugural Address</strong>, wrestled with the theological meaning of the war with uncommon depth. He noted that both sides <strong>"read the same Bible and prayed to the same God,"</strong> and he refused to claim God straightforwardly for the Union cause, suggesting instead that the war was God's judgment on a nation for the sin of slavery. The address has been called the greatest American theological statement ever made by a political figure.</p>
<p>After the war, the Black church exploded in growth. Freed people who had worshiped under white supervision flooded into independent Black Baptist and AME churches. By 1870, the <strong>AME Church</strong> alone had grown from 20,000 to <strong>400,000 members</strong>. These churches became the organizing centers of Black life during <strong>Reconstruction</strong> — providing schools, political leadership, and community institutions — until the end of Reconstruction left them vulnerable to the violence of Jim Crow.</p>
<figure class="art-fig portrait">
  <div class="fig-img-wrap"><img src="/images/america/L18_Lincoln.jpeg" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block;"></div>
  <div class="fig-body">
    <div class="fig-label">Washington, D.C. · March 4, 1865</div>
    <div class="fig-title">Abraham Lincoln</div>
    <div class="fig-desc">Lincoln's Second Inaugural Address — delivered five weeks before his assassination — has been called the greatest American theological statement ever made by a political figure. He refused to claim God for the Union cause, suggesting the war was divine judgment on a nation for the sin of slavery.</div>
  </div>
</figure>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">1865</div><div class="atl-text">Lincoln's Second Inaugural Address — "both read the same Bible"</div></div>
  <div class="atl-row"><div class="atl-year">1865–1877</div><div class="atl-text">Reconstruction — Black churches become organizing centers of community life</div></div>
  <div class="atl-row"><div class="atl-year">1870</div><div class="atl-text">AME Church grows from 20,000 to 400,000 members in one decade</div></div>
</div>
<div class="pull-quote">
  <p>"Both read the same Bible and pray to the same God, and each invokes His aid against the other."</p>
  <cite>— Abraham Lincoln, Second Inaugural Address, 1865</cite>
</div>
</div>`;

const A20_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 20 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">Moody &amp; Urban Mass Evangelism</h1>
<p class="article-sub">The Gilded Age Crusade · 1873–1899</p>
<div class="art-divider"></div>
<div class="article-body">
<p>How Dwight L. Moody adapted mass evangelism to the industrial city.</p>
<p>Dwight L. Moody was a Chicago shoe salesman turned evangelist who became the dominant revivalist of the post-Civil War era. With singer <strong>Ira Sankey</strong>, he pioneered the modern urban crusade: renting the largest halls available, using choirs and popular music, and organizing local churches to prepare and follow up on converts. His campaigns in Britain (1873–75) and across American cities drew hundreds of thousands.</p>
<p>Moody's message was simpler and warmer than Finney's — he preached a <strong>God of love</strong> more than a God of judgment. He founded the <strong>Moody Bible Institute</strong> in Chicago (1886) and the Northfield schools in Massachusetts to train lay workers and evangelists. Together these institutions built a network that would anchor American fundamentalism in the next generation and carry the Finney-to-Moody revivalist tradition into the twentieth century.</p>
<figure class="art-fig portrait">
  <div class="fig-img-wrap"><img src="/images/america/L19_Moody.jpeg" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block;"></div>
  <div class="fig-body">
    <div class="fig-label">Chicago &amp; Beyond · 1873–1899</div>
    <div class="fig-title">Dwight L. Moody</div>
    <div class="fig-desc">A Chicago shoe salesman with no seminary training, Moody became the most influential evangelist of the Gilded Age — pioneering the urban crusade format that Billy Graham would inherit a generation later.</div>
  </div>
</figure>
<div class="atl-box">
  <div class="atl-label">Key terms</div>
  <div class="atl-row"><div class="atl-year">Urban crusade</div><div class="atl-text">Renting large city halls, using choirs and popular music, and organizing church follow-up on converts</div></div>
  <div class="atl-row"><div class="atl-year">Moody Bible Institute</div><div class="atl-text">Founded 1886 in Chicago — trained lay evangelists and became a center of American fundamentalism</div></div>
  <div class="atl-row"><div class="atl-year">Ira Sankey</div><div class="atl-text">Moody's singer and partner — his popular gospel music transformed revivalist worship</div></div>
</div>
</div>`;

const A21_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 21 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">The Social Gospel</h1>
<p class="article-sub">Gladden, Rauschenbusch &amp; the Kingdom of God · 1880–1910</p>
<div class="art-divider"></div>
<div class="article-body">
<p>How Protestant ministers turned the gospel toward poverty, labor, and social justice.</p>
<p>As industrialization concentrated wealth and packed immigrants into urban tenements, a movement of Protestant ministers argued that the gospel had social implications. <strong>Washington Gladden</strong>, a Congregational minister, defended workers' rights to organize in the 1880s. <strong>Walter Rauschenbusch</strong>, who had ministered for eleven years in the Hell's Kitchen neighborhood of New York, published <em>Christianity and the Social Crisis</em> in 1907 — the movement's defining text. He argued that the church had focused too narrowly on individual salvation and neglected the <strong>"social sin"</strong> embedded in unjust institutions.</p>
<p>The Social Gospel never captured all of Protestantism. Conservatives accused it of reducing the gospel to social work and neglecting personal conversion. But it reshaped mainline Protestant denominations, produced the <strong>Federal Council of Churches (1908)</strong>, and planted seeds that flowered in the New Deal and the Civil Rights Movement a generation later.</p>
<figure class="art-fig portrait">
  <div class="fig-img-wrap"><img src="/images/america/L20_Rauschenbeuch.jpeg" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block;"></div>
  <div class="fig-body">
    <div class="fig-label">Hell's Kitchen, New York · 1880s–1900s</div>
    <div class="fig-title">Walter Rauschenbusch</div>
    <div class="fig-desc">After eleven years ministering among New York's urban poor, Rauschenbusch wrote <em>Christianity and the Social Crisis</em> (1907) — the defining text of the Social Gospel movement — arguing that the gospel demanded justice for the poor, not only salvation of souls.</div>
  </div>
</figure>
<div class="atl-box">
  <div class="atl-label">Key terms</div>
  <div class="atl-row"><div class="atl-year">Social sin</div><div class="atl-text">Rauschenbusch's term — sin embedded in unjust institutions, distinct from individual moral failure</div></div>
  <div class="atl-row"><div class="atl-year">Federal Council of Churches</div><div class="atl-text">Founded 1908 — united mainline denominations for cooperative social action</div></div>
  <div class="atl-row"><div class="atl-year">Washington Gladden</div><div class="atl-text">Congregational minister who defended workers' rights to organize in the 1880s</div></div>
</div>
</div>`;

const A22_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 22 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">Azusa Street &amp; Pentecostalism</h1>
<p class="article-sub">The Fire Falls in Los Angeles · 1901–1909</p>
<div class="art-divider"></div>
<div class="article-body">
<p>How the Azusa Street revival launched the global Pentecostal movement.</p>
<p>On April 9, 1906, a small prayer group meeting in a house on Bonnie Brae Street in Los Angeles began speaking in tongues. Days later they moved to an abandoned stable at <strong>312 Azusa Street</strong>, and for three years the Azusa Street Mission became the most remarkable revival center in American history. Led by <strong>William J. Seymour</strong> — a one-eyed, soft-spoken Black preacher from Louisiana — the mission drew white, Black, and Hispanic worshipers together in an era of rigid segregation. Seymour had learned his theology of Spirit baptism from <strong>Charles Parham</strong>, a white Holiness preacher in Kansas, who had first connected tongues-speaking with the baptism of the Holy Spirit in <strong>1901</strong>.</p>
<p>The Azusa Street revival sent missionaries across the world and planted Pentecostal denominations on every continent. Pentecostalism's defining doctrine was that Spirit baptism was evidenced by speaking in tongues. It spread fastest among the poor, the marginalized, and the global South — today representing over <strong>600 million Christians</strong> worldwide and making it the fastest-growing segment of global Christianity.</p>
<figure class="art-fig portrait">
  <div class="fig-img-wrap"><img src="/images/america/L21_Azusa.jpeg" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block;"></div>
  <div class="fig-body">
    <div class="fig-label">Los Angeles · 1906–1909</div>
    <div class="fig-title">William J. Seymour &amp; Azusa Street</div>
    <div class="fig-desc">Seymour, a one-eyed Black preacher from Louisiana, led the Azusa Street Mission's interracial revival — a social miracle in 1906 America. The revival launched global Pentecostalism, now the fastest-growing segment of Christianity worldwide.</div>
  </div>
</figure>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">1901</div><div class="atl-text">Charles Parham first connects tongues-speaking with Spirit baptism — in Topeka, Kansas</div></div>
  <div class="atl-row"><div class="atl-year">1906</div><div class="atl-text">Azusa Street revival begins — interracial worship in a Los Angeles stable</div></div>
  <div class="atl-row"><div class="atl-year">Today</div><div class="atl-text">Over 600 million Pentecostal and charismatic Christians worldwide</div></div>
</div>
<div class="pull-quote">
  <p>"The color line was washed away in the blood."</p>
  <cite>— Frank Bartleman, eyewitness at Azusa Street, 1906</cite>
</div>
</div>`;

const A23_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 23 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">The Fundamentals &amp; the Coming Storm</h1>
<p class="article-sub">Conservative Protestantism Organizes · 1910–1920</p>
<div class="art-divider"></div>
<div class="article-body">
<p>How conservative Protestants began organizing against modernism before the great controversy of the 1920s.</p>
<p>By 1910, conservative Protestants felt besieged. <strong>Higher biblical criticism</strong> — treating the Bible as a historical document subject to scholarly analysis — had entered the mainline seminaries. Darwinian evolution challenged the Genesis account. The Social Gospel seemed to replace personal salvation with social reform. In response, two wealthy California oilmen funded the publication of ninety essays collected in <em><strong>The Fundamentals</strong></em> (1910–1915), mailed free to every pastor, missionary, and theology student in America. The essays defended the virgin birth, the physical resurrection, the inerrancy of Scripture, and the literal Second Coming.</p>
<p>The term <strong>"fundamentalist"</strong> — coined in 1920 by Baptist editor <strong>Curtis Lee Laws</strong> — described those ready to do "battle royal" for the fundamentals of the faith. The movement had a network of Bible institutes (Moody, Dallas, Philadelphia), a summer conference circuit, and a growing popular press. It was organized, energized, and heading toward a collision with the modernist establishment in the mainline denominations.</p>
<figure class="art-fig portrait">
  <div class="fig-img-wrap"><img src="/images/america/L22_Fundamentals.jpeg" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block;"></div>
  <div class="fig-body">
    <div class="fig-label">1910–1915</div>
    <div class="fig-title">The Fundamentals</div>
    <div class="fig-desc">Ninety essays defending core Protestant doctrine, funded by California oilmen Lyman and Milton Stewart and mailed free to every pastor and theology student in the English-speaking world — the conservative countermovement's opening salvo.</div>
  </div>
</figure>
<div class="atl-box">
  <div class="atl-label">Key terms</div>
  <div class="atl-row"><div class="atl-year">The Fundamentals</div><div class="atl-text">Ninety essays (1910–15) mailed free to every pastor, defending virgin birth, resurrection, and inerrancy</div></div>
  <div class="atl-row"><div class="atl-year">Fundamentalist</div><div class="atl-text">Term coined 1920 by Curtis Lee Laws — those ready to do "battle royal" for core doctrines</div></div>
  <div class="atl-row"><div class="atl-year">Higher criticism</div><div class="atl-text">Treating Scripture as a historical document subject to scholarly analysis — the method conservatives opposed</div></div>
</div>
</div>`;

const A24_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 24 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">The Fundamentalist-Modernist Controversy</h1>
<p class="article-sub">Fosdick, Machen &amp; the Battle for the Denominations · 1922–1925</p>
<div class="art-divider"></div>
<div class="article-body">
<p>How the conflict between fundamentalism and modernism tore through the mainline denominations.</p>
<p>The battle came to a head in 1922 when <strong>Harry Emerson Fosdick</strong>, a liberal Baptist preaching at First Presbyterian Church in New York, delivered a sermon titled <strong>"Shall the Fundamentalists Win?"</strong> He argued that modern believers should be free to reinterpret doctrines like the virgin birth and the Second Coming in the light of modern knowledge. The Presbyterian establishment forced him to resign.</p>
<p>The most rigorous conservative response came not from a revivalist but from Princeton theologian <strong>J. Gresham Machen</strong>, who argued in <em>Christianity and Liberalism</em> (1923) that liberalism was not a revised Christianity but an entirely different religion. Machen's case was intellectual and precise: liberal theology had abandoned the historic gospel of redemption and replaced it with a gospel of human moral improvement. He was eventually forced out of the Presbyterian denomination and founded <strong>Westminster Theological Seminary</strong> in 1929.</p>
<figure class="art-fig portrait">
  <div class="fig-img-wrap"><img src="/images/america/L23_Descent.jpeg" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block;"></div>
  <div class="fig-body">
    <div class="fig-label">Princeton &amp; Philadelphia · 1920s</div>
    <div class="fig-title">J. Gresham Machen</div>
    <div class="fig-desc">Princeton's most rigorous conservative theologian argued that liberalism was not a revised form of Christianity but "a different religion altogether" — one that had replaced the gospel of redemption with a gospel of moral improvement. Forced out of Princeton, he founded Westminster Seminary in 1929.</div>
  </div>
</figure>
<div class="atl-box">
  <div class="atl-label">Key figures</div>
  <div class="atl-row"><div class="atl-year">Fosdick</div><div class="atl-text">"Shall the Fundamentalists Win?" (1922) — called for freedom to reinterpret doctrine in light of modern knowledge</div></div>
  <div class="atl-row"><div class="atl-year">Machen</div><div class="atl-text">Christianity and Liberalism (1923) — argued liberalism was not revised Christianity but a different religion</div></div>
  <div class="atl-row"><div class="atl-year">Westminster</div><div class="atl-text">Founded by Machen in 1929 as a confessionally Reformed alternative to the increasingly moderate Princeton</div></div>
</div>
<div class="pull-quote">
  <p>"In the sphere of religion…liberalism is not a religion within Christianity at all, but a different religion altogether."</p>
  <cite>— J. Gresham Machen, Christianity and Liberalism, 1923</cite>
</div>
</div>`;

const A25_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 25 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">The Scopes Trial &amp; Fundamentalist Withdrawal</h1>
<p class="article-sub">Dayton, Tennessee · 1925–1942</p>
<div class="art-divider"></div>
<div class="article-body">
<p>How the Scopes Trial humiliated fundamentalism publicly and drove it to build a parallel culture.</p>
<p>In 1925 the state of Tennessee passed the <strong>Butler Act</strong>, making it illegal to teach human evolution in public schools. John Scopes, a high school teacher, was recruited to test the law. The resulting trial became a national spectacle. <strong>William Jennings Bryan</strong>, the three-time presidential candidate and populist hero, argued for the prosecution. <strong>Clarence Darrow</strong>, the most famous defense attorney in America, cross-examined Bryan on his literal reading of Genesis in one of the most memorable courtroom scenes in American history. Scopes was convicted and fined one hundred dollars. Bryan died five days later.</p>
<p>The press coverage — especially <strong>H. L. Mencken's</strong> vicious dispatches from Dayton, Tennessee — ridiculed fundamentalists as ignorant rurals. Though fundamentalists had won the legal case, they lost the culture war of public opinion decisively. Over the next two decades many withdrew from mainline institutions to build a separate fundamentalist culture: Bible institutes, radio programs, mission agencies, and eventually their own colleges and seminaries. This withdrawal set the pattern for a conservative subculture that would re-engage the public square only in the 1970s.</p>
<figure class="art-fig portrait">
  <div class="fig-img-wrap"><img src="/images/america/L24_ScopesTrial.jpeg" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block;"></div>
  <div class="fig-body">
    <div class="fig-label">Dayton, Tennessee · 1925</div>
    <div class="fig-title">The Scopes Trial</div>
    <div class="fig-desc">Clarence Darrow's cross-examination of William Jennings Bryan became one of the most famous courtroom scenes in American history. Fundamentalists won the verdict but lost the nation's opinion — and retreated to build their own world.</div>
  </div>
</figure>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">1925</div><div class="atl-text">Tennessee's Butler Act bans evolution teaching — Scopes recruited to test it</div></div>
  <div class="atl-row"><div class="atl-year">July 1925</div><div class="atl-text">Scopes convicted, Bryan dies five days after trial, Mencken's mockery shapes public opinion</div></div>
  <div class="atl-row"><div class="atl-year">1970s</div><div class="atl-text">Fundamentalists re-engage the public square — the end of two generations of withdrawal</div></div>
</div>
</div>`;

// Wire lessons 13–19
_track5.lessons[12].articleHtml=A13_ARTICLE_HTML;
_track5.lessons[13].articleHtml=A14_ARTICLE_HTML;
_track5.lessons[14].articleHtml=A15_ARTICLE_HTML;
_track5.lessons[15].articleHtml=A16_ARTICLE_HTML;
_track5.lessons[16].articleHtml=A17_ARTICLE_HTML;
_track5.lessons[17].articleHtml=A18_ARTICLE_HTML;
_track5.lessons[18].articleHtml=A19_ARTICLE_HTML;
_track5.lessons[12].learn=A13_LEARN;
_track5.lessons[13].learn=A14_LEARN;
_track5.lessons[14].learn=A15_LEARN;
_track5.lessons[15].learn=A16_LEARN;
_track5.lessons[16].learn=A17_LEARN;
_track5.lessons[17].learn=A18_LEARN;
_track5.lessons[18].learn=A19_LEARN;
_track5.lessons[12].study=A13_STUDY;
_track5.lessons[13].study=A14_STUDY;
_track5.lessons[14].study=A15_STUDY;
_track5.lessons[15].study=A16_STUDY;
_track5.lessons[16].study=A17_STUDY;
_track5.lessons[17].study=A18_STUDY;
_track5.lessons[18].study=A19_STUDY;
_track5.lessons[12].coldOpen={_bg:'/images/america/L13_Finney.jpeg',cards:[
  {label:'The World Before',text:'The frontier camp meeting was wild and western. Finney brought revival to the city.',size:'lg'},
  {label:'The Key Figures',text:'Charles Grandison Finney.',size:'lg'},
  {label:'The Surprise',text:'Finney treated revival not as a divine miracle but as a human technique.',size:'xl'},
]};
_track5.lessons[13].coldOpen={_bg:'/images/america/L14_Critics.jpeg',cards:[
  {label:'The World Before',text:"Finney says revival is a technique — fill the anxious bench, pray names aloud, run a protracted meeting, and conversion will follow.",size:'lg'},
  {label:'The Key Figures',text:'Charles Hodge. John Williamson Nevin. Philip Schaff.',size:'lg'},
  {label:'The Surprise',text:'The most penetrating critiques of American revivalism came not from skeptics but from two of the most learned theologians in the country.',size:'xl'},
]};
_track5.lessons[14].coldOpen={_bg:'/images/america/L14_AME.jpeg',cards:[
  {label:'The World Before',text:'The Second Awakening promised personal access to God — and not everyone stopped at Methodism.',size:'lg'},
  {label:'The Key Figures',text:'Joseph Smith. William Miller. John Nelson Darby.',size:'lg'},
  {label:'The Connection',text:'Three men. Three responses to the same question: what is God about to do?',size:'xl'},
]};
_track5.lessons[15].coldOpen={_bg:'/images/america/L15_2AL.jpeg',cards:[
  {label:'The World Before',text:'Revival saves souls. But what does it do to society?',size:'lg'},
  {label:'The Key Figures',text:'The reform societies. The abolitionist evangelicals.',size:'lg'},
  {label:'The Surprise',text:'The revival that swept the nation also launched the first great wave of American social reform.',size:'xl'},
]};
_track5.lessons[16].coldOpen={_bg:'/images/america/L16_Prayer.jpeg',cards:[
  {label:'The Crisis',text:'Can one denomination hold slaveholders and abolitionists in the same pew?',size:'xl'},
  {label:'The Key Figures',text:'The Methodist Episcopal Church South. The Southern Baptist Convention.',size:'lg'},
  {label:'The Surprise',text:'The churches split over slavery before the nation did.',size:'xl'},
]};
_track5.lessons[17].coldOpen={_bg:'/images/america/L17_HarietTubman.jpeg',cards:[
  {label:'The Crisis',text:'The Bible is being used to defend slavery. What do its opponents say?',size:'xl'},
  {label:'The Key Figures',text:'Frederick Douglass. Harriet Tubman. The Black church.',size:'lg'},
  {label:'The Surprise',text:'The most powerful abolitionists were not skeptics but deeply devout Christians.',size:'xl'},
]};
_track5.lessons[18].coldOpen={_bg:'/images/america/L18_Lincoln.jpeg',cards:[
  {label:'The Crisis',text:'A nation is tearing itself apart. Both sides pray to the same God.',size:'xl'},
  {label:'The Key Figures',text:'Abraham Lincoln. The freedmen\'s churches.',size:'lg'},
  {label:'The Surprise',text:'The most theologically profound document of the Civil War came from neither a minister nor a theologian.',size:'xl'},
]};

// Wire lessons 19–24
_track5.lessons[19].articleHtml=A20_ARTICLE_HTML;
_track5.lessons[20].articleHtml=A21_ARTICLE_HTML;
_track5.lessons[21].articleHtml=A22_ARTICLE_HTML;
_track5.lessons[22].articleHtml=A23_ARTICLE_HTML;
_track5.lessons[23].articleHtml=A24_ARTICLE_HTML;
_track5.lessons[24].articleHtml=A25_ARTICLE_HTML;
_track5.lessons[19].learn=A20_LEARN;
_track5.lessons[20].learn=A21_LEARN;
_track5.lessons[21].learn=A22_LEARN;
_track5.lessons[22].learn=A23_LEARN;
_track5.lessons[23].learn=A24_LEARN;
_track5.lessons[24].learn=A25_LEARN;
_track5.lessons[19].study=A20_STUDY;
_track5.lessons[20].study=A21_STUDY;
_track5.lessons[21].study=A22_STUDY;
_track5.lessons[22].study=A23_STUDY;
_track5.lessons[23].study=A24_STUDY;
_track5.lessons[24].study=A25_STUDY;
_track5.lessons[19].coldOpen={_bg:'/images/america/L19_Moody.jpeg',cards:[
  {label:'The World Before',text:'The Civil War is over. The cities are exploding. The old parish church cannot keep up.',size:'lg'},
  {label:'The Key Figures',text:'Dwight L. Moody. Ira Sankey.',size:'lg'},
  {label:'The Surprise',text:'The greatest evangelist of the Gilded Age was a shoe salesman with no formal theological training.',size:'xl'},
]};
_track5.lessons[20].coldOpen={_bg:'/images/america/L20_Rauschenbeuch.jpeg',cards:[
  {label:'The World Before',text:'The cities are full of immigrants living in squalor. The churches are preaching about heaven.',size:'lg'},
  {label:'The Key Figures',text:'Washington Gladden. Walter Rauschenbusch.',size:'lg'},
  {label:'The Surprise',text:'A new theology argued the gospel was not just about saving souls — it was about saving society.',size:'xl'},
]};
_track5.lessons[21].coldOpen={_bg:'/images/america/L21_Azusa.jpeg',cards:[
  {label:'The Crisis',text:'Mainline churches argue about society. Holiness people hunger for the Spirit.',size:'xl'},
  {label:'The Key Figures',text:'William J. Seymour. Charles Parham.',size:'lg'},
  {label:'The Surprise',text:'The most globally influential American religious movement of the twentieth century began in a Los Angeles stable.',size:'xl'},
]};
_track5.lessons[22].coldOpen={_bg:'/images/america/L22_Fundamentals.jpeg',cards:[
  {label:'The World Before',text:'Biblical criticism, Darwinism, and the Social Gospel are remaking mainline Protestantism.',size:'lg'},
  {label:'The Key Figures',text:'The Niagara Bible Conference. The anonymous donors of The Fundamentals.',size:'lg'},
  {label:'The Bridge',text:'A conservative countermovement is gathering — and it is about to name itself.',size:'xl'},
]};
_track5.lessons[23].coldOpen={_bg:'/images/america/L23_Descent.jpeg',cards:[
  {label:'The Crisis',text:'Two visions of Christianity are now fighting for the same denominations.',size:'xl'},
  {label:'The Key Figures',text:'Harry Emerson Fosdick. J. Gresham Machen.',size:'lg'},
  {label:'The Surprise',text:'The most articulate defender of orthodoxy was not a revivalist — he was a Princeton scholar.',size:'xl'},
]};
_track5.lessons[24].coldOpen={_bg:'/images/america/L24_ScopesTrial.jpeg',cards:[
  {label:'The Crisis',text:'A Tennessee teacher is put on trial for teaching evolution. The world is watching.',size:'xl'},
  {label:'The Key Figures',text:'William Jennings Bryan. Clarence Darrow. John Scopes.',size:'lg'},
  {label:'The Surprise',text:'Fundamentalists won the trial and lost the culture — and retreated to build their own.',size:'xl'},
]};

const A26_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 26 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">Neo-Orthodoxy &amp; Christian Realism</h1>
<p class="article-sub">Barth, Niebuhr &amp; the Limits of Liberalism · 1919–1960</p>
<div class="art-divider"></div>
<div class="article-body">
<p>How the catastrophe of the World Wars broke liberal optimism and produced a chastened, realistic theology.</p>
<p>The Social Gospel had rested on an optimistic view of human nature — that education, reform, and the right institutions could perfect society. The carnage of World War I shattered that optimism in Europe. <strong>Karl Barth</strong>, a Swiss Reformed pastor, watched his liberal theology professors sign a manifesto supporting the Kaiser's war and concluded that liberal theology had made God in humanity's image. His 1919 commentary on Romans announced a theology that recovered God's radical transcendence and the absolute difference between divine revelation and human religion.</p>
<p>In America, <strong>Reinhold Niebuhr</strong> developed what he called "Christian Realism." Drawing on the doctrine of original sin, Niebuhr argued in <em>Moral Man and Immoral Society</em> (1932) that while individuals could act morally, groups — nations, classes, races — inevitably served their own interests and could not be reformed by idealism alone. Power had to be checked by power. This theological realism influenced American foreign policy, the labor movement, and the architects of the postwar liberal order, making Niebuhr one of the most politically influential theologians in American history.</p>
<figure class="art-fig portrait">
  <div class="fig-img-wrap"><img src="/images/america/L25_Riehman.jpeg" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block;"></div>
  <div class="fig-body">
    <div class="fig-label">Europe &amp; America · 1919–1960</div>
    <div class="fig-title">Barth &amp; Niebuhr</div>
    <div class="fig-desc">Karl Barth's 1919 Romans commentary recovered God's radical transcendence. Reinhold Niebuhr's 1932 Moral Man and Immoral Society applied original sin to politics — together reshaping Protestant theology on both sides of the Atlantic.</div>
  </div>
</figure>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">1919</div><div class="atl-text">Barth's Romans commentary — God's radical transcendence against liberal accommodation</div></div>
  <div class="atl-row"><div class="atl-year">1932</div><div class="atl-text">Niebuhr's Moral Man and Immoral Society — original sin applied to politics</div></div>
  <div class="atl-row"><div class="atl-year">1940s–50s</div><div class="atl-text">Niebuhr's Christian Realism shapes American foreign policy and the labor movement</div></div>
</div>
</div>`;

const A27_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 27 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">Neo-Evangelicalism &amp; Billy Graham</h1>
<p class="article-sub">The New Evangelical Movement · 1942–1960</p>
<div class="art-divider"></div>
<div class="article-body">
<p>How a new generation of evangelicals broke from fundamentalist withdrawal and re-engaged culture.</p>
<p>By the early 1940s, a younger generation of conservatives — who would call themselves "neo-evangelicals" — were dissatisfied with fundamentalism's separatism and intellectual withdrawal. In 1942 they formed the <strong>National Association of Evangelicals</strong>. Carl F. H. Henry's 1947 book <em>The Uneasy Conscience of Modern Fundamentalism</em> charged that fundamentalism had abandoned social concern along with liberalism. <strong>Fuller Theological Seminary</strong> was founded in 1947 in Pasadena as an academically serious evangelical alternative to both fundamentalist Bible institutes and liberal seminaries.</p>
<p>The face of neo-evangelicalism was <strong>Billy Graham</strong>. The young North Carolina evangelist burst onto the national scene at his 1949 Los Angeles crusade, where publisher William Randolph Hearst famously ordered his papers to "puff Graham." Graham's genius was combining Moody's crusade machinery with a simple, warm gospel message and an ability to work across denominational lines. By the mid-1950s he was the most recognized Protestant in America, and his 1957 New York crusade at Madison Square Garden drew over two million people across sixteen weeks.</p>
<figure class="art-fig portrait">
  <div class="fig-img-wrap"><img src="/images/america/L26_BillyGraham.jpeg" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block;"></div>
  <div class="fig-body">
    <div class="fig-label">America · 1942–1960</div>
    <div class="fig-title">Billy Graham &amp; the New Evangelicalism</div>
    <div class="fig-desc">The 1949 Los Angeles crusade launched Graham to national prominence overnight. His ability to draw across denominational lines made him both the face of the new evangelicalism and the target of separatist criticism.</div>
  </div>
</figure>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">1942</div><div class="atl-text">National Association of Evangelicals founded — a moderate alternative to separatism</div></div>
  <div class="atl-row"><div class="atl-year">1947</div><div class="atl-text">Henry's Uneasy Conscience and Fuller Seminary — intellectual evangelical renewal</div></div>
  <div class="atl-row"><div class="atl-year">1949</div><div class="atl-text">Graham's LA crusade — Hearst's papers launch him to national fame overnight</div></div>
  <div class="atl-row"><div class="atl-year">1957</div><div class="atl-text">New York crusade at Madison Square Garden draws two million over sixteen weeks</div></div>
</div>
</div>`;

const A28_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 28 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">The Civil Rights Movement &amp; the Black Church</h1>
<p class="article-sub">The Church at the Heart of the Movement · 1955–1968</p>
<div class="art-divider"></div>
<div class="article-body">
<p>How the Black church provided the theology, institutions, and leadership of the Civil Rights Movement.</p>
<p>The Civil Rights Movement was not primarily a legal or political movement — it was a church movement. The <strong>Southern Christian Leadership Conference (SCLC)</strong>, founded in 1957, was led by Black Baptist and Methodist ministers. Its president, <strong>Martin Luther King Jr.</strong>, was a Baptist pastor with a doctorate in systematic theology from Boston University. King drew on the Black church's tradition of prophetic preaching, the Social Gospel, Gandhi's nonviolent resistance, and Niebuhr's Christian Realism to develop a theology of <em>redemptive suffering</em> that placed the movement within the biblical story of liberation.</p>
<p>The church provided the infrastructure: mass meetings in sanctuaries, training in nonviolent resistance, networks of communication, and the moral authority that made the movement's suffering legible to the watching nation. King's "Letter from Birmingham Jail" (1963) and his "I Have a Dream" speech at the March on Washington were saturated with Scripture and theology. When King was assassinated on April 4, 1968, the movement lost its most theologically articulate voice — but the Black church's role in American public life had been permanently established.</p>
<figure class="art-fig portrait">
  <div class="fig-img-wrap"><img src="/images/america/L27_KingMarching.jpeg" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block;"></div>
  <div class="fig-body">
    <div class="fig-label">America · 1955–1968</div>
    <div class="fig-title">Martin Luther King Jr. &amp; the SCLC</div>
    <div class="fig-desc">King's Letter from Birmingham Jail and his March on Washington speech were theological documents as much as political ones — products of the Black church's long tradition of prophetic preaching.</div>
  </div>
</figure>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">1957</div><div class="atl-text">SCLC founded — Black clergy lead the movement from church infrastructure</div></div>
  <div class="atl-row"><div class="atl-year">1963</div><div class="atl-text">Letter from Birmingham Jail and March on Washington speech — theology in public</div></div>
  <div class="atl-row"><div class="atl-year">1968</div><div class="atl-text">King assassinated in Memphis — the movement's most theologically articulate voice silenced</div></div>
</div>
</div>`;

const A29_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 29 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">Vatican II &amp; Catholic Transformation</h1>
<p class="article-sub">The Council That Changed Catholicism · 1962–1965</p>
<div class="art-divider"></div>
<div class="article-body">
<p>How the Second Vatican Council reshaped Catholicism and changed its relationship to American Christianity.</p>
<p>The <strong>Second Vatican Council</strong> (1962–65), convened by Pope John XXIII and concluded under Paul VI, was the most significant event in Catholicism since the Reformation. John XXIII called it an <em>aggiornamento</em> — a bringing up to date. The Council reformed the Mass, replacing the Latin liturgy with worship in the vernacular. It affirmed religious liberty, acknowledged that the Holy Spirit could work outside the visible Catholic Church, and opened a new era of ecumenical dialogue with Protestants and Jews.</p>
<p>For American Catholicism, Vatican II arrived alongside other transformations. John F. Kennedy's 1960 election as the first Catholic president had already signaled the full arrival of Catholics into the American mainstream. After Vatican II, the church's worship, theology, and self-understanding shifted substantially. Thousands of priests and nuns left religious life; Mass attendance declined; and a conservative reaction eventually produced a deepening division between progressive and traditional Catholics that persists today.</p>
<figure class="art-fig portrait">
  <div class="fig-img-wrap"><img src="/images/america/L28_VaticanII.jpeg" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block;"></div>
  <div class="fig-body">
    <div class="fig-label">Rome · 1962–1965</div>
    <div class="fig-title">The Second Vatican Council</div>
    <div class="fig-desc">Pope John XXIII opened the Council's first session in October 1962. His word aggiornamento — bringing up to date — captured the spirit of an institution opening its windows to the modern world after centuries of resistance.</div>
  </div>
</figure>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">1960</div><div class="atl-text">JFK elected — first Catholic president signals Catholic arrival in American mainstream</div></div>
  <div class="atl-row"><div class="atl-year">1962–65</div><div class="atl-text">Vatican II — vernacular Mass, religious liberty, ecumenical dialogue</div></div>
  <div class="atl-row"><div class="atl-year">Post-1965</div><div class="atl-text">Mass attendance declines, religious vocations drop, progressive-traditional divide deepens</div></div>
</div>
</div>`;

const A30_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 30 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">The Religious Right &amp; the Culture Wars</h1>
<p class="article-sub">Conservative Christianity Re-enters Politics · 1973–1989</p>
<div class="art-divider"></div>
<div class="article-body">
<p>How conservative evangelicals and fundamentalists re-entered American politics after decades of withdrawal.</p>
<p>After the Scopes Trial, conservative Protestants largely withdrew from national politics. What drew them back was not Roe v. Wade (1973) alone, but a cluster of changes: the sexual revolution, rising crime, court-ordered school desegregation, the removal of prayer from public schools (1962), and especially the IRS's 1978 threat to revoke the tax-exempt status of segregated Christian academies. <strong>Jerry Falwell Sr.</strong>, a Baptist pastor in Lynchburg, Virginia, founded the <strong>Moral Majority</strong> in 1979 with the help of political strategists Paul Weyrich and Richard Viguerie, creating a political infrastructure that helped deliver evangelical votes to Ronald Reagan in 1980.</p>
<p>The culture wars of the 1980s pitted a broadly conservative religious coalition — evangelicals, Catholics, and traditionalist Jews — against a broadly progressive secular and mainline coalition over abortion, school prayer, sex education, and the Equal Rights Amendment. The Religious Right made conservative Christianity a major force in Republican politics and permanently altered the relationship between evangelical identity and partisan affiliation in America.</p>
<figure class="art-fig portrait">
  <div class="fig-img-wrap"><img src="/images/america/L29_Falwell.jpeg" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block;"></div>
  <div class="fig-body">
    <div class="fig-label">America · 1973–1989</div>
    <div class="fig-title">The Moral Majority &amp; the Culture Wars</div>
    <div class="fig-desc">Jerry Falwell Sr.'s Moral Majority, founded in 1979, mobilized millions of evangelical voters — permanently fusing conservative Christian identity with Republican politics in a way that reshaped American public life.</div>
  </div>
</figure>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">1962</div><div class="atl-text">Supreme Court removes school prayer — a galvanizing moment for conservative Christians</div></div>
  <div class="atl-row"><div class="atl-year">1978</div><div class="atl-text">IRS threatens segregated Christian academies' tax exemption — mobilizing the Religious Right</div></div>
  <div class="atl-row"><div class="atl-year">1979</div><div class="atl-text">Falwell founds Moral Majority — delivering evangelical votes to Reagan in 1980</div></div>
</div>
</div>`;

const A32_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 32 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">The Bible Wars</h1>
<p class="article-sub">Inerrancy, Historical Criticism &amp; the Authority of Scripture · 1970s–1990s</p>
<div class="art-divider"></div>
<div class="article-body">
<p>How the question of biblical authority divided evangelical institutions and entered the national media in the same decade.</p>
<p>By the 1970s, evangelical institutions were drifting. <strong>Fuller Theological Seminary</strong> — founded in 1947 as a doctrinally conservative alternative to liberal seminaries — had quietly moved away from strict biblical inerrancy. Other evangelical schools followed. In response, a coalition of over 300 evangelical scholars gathered in Chicago in 1978 and produced the <strong>Chicago Statement on Biblical Inerrancy</strong>. It offered a precise, carefully worded definition: Scripture, in its original manuscripts, is without error in all that it affirms — not just in matters of faith and practice, but in history and science as well. The Statement drew a line that institutions and denominations would spend the next decades fighting over. The Southern Baptist Convention\'s conservative resurgence, which began in 1979, was partly a battle to enforce exactly this kind of inerrancy across SBC seminaries.</p>
<p>Seven years later, in 1985, New Testament scholar <strong>Robert Funk</strong> launched the <strong>Jesus Seminar</strong> — a group of roughly 150 academics who met twice yearly to vote on the historical authenticity of Jesus\'s words and deeds using colored beads. A red bead meant Jesus almost certainly said it; black meant he almost certainly did not. Their conclusion — that only about 18% of the sayings attributed to Jesus in the gospels were authentic — received enormous mainstream media coverage through the late 1980s and 1990s. The Seminar was as much a cultural intervention as a scholarly project, deliberately designed to reach a popular audience rather than just academic journals. Critics, including many mainstream scholars, charged that its methods were sensationalist and its conclusions predetermined. But it put the question of who Jesus really was onto the front page of <em>Newsweek</em> and <em>Time</em>, and it forced evangelicals to articulate publicly why they trusted the gospels — a debate the Chicago Statement had already prepared them for.</p>
<figure class="art-fig portrait">
  <div class="fig-img-wrap"><img src="/images/america/L32_BibleWars.jpeg" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block;"></div>
  <div class="fig-body">
    <div class="fig-label">America · 1970s–1990s</div>
    <div class="fig-title">The Chicago Statement &amp; the Jesus Seminar</div>
    <div class="fig-desc">In the same decade, two groups asked the same question — what kind of book is the Bible? — and reached opposite conclusions. The Chicago Statement defined inerrancy in unprecedented detail; the Jesus Seminar dismantled the historicity of Jesus\'s gospel sayings on the pages of <em>Newsweek</em> and <em>Time</em>.</div>
  </div>
</figure>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">1978</div><div class="atl-text">Chicago Statement on Biblical Inerrancy — 300+ evangelical scholars define inerrancy</div></div>
  <div class="atl-row"><div class="atl-year">1979</div><div class="atl-text">SBC conservative resurgence begins — inerrancy becomes a denominational test</div></div>
  <div class="atl-row"><div class="atl-year">1985</div><div class="atl-text">Robert Funk founds the Jesus Seminar — bead votes on the historical Jesus</div></div>
</div>
</div>`;

const A31_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 31 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">Megachurches, Pentecostal Growth &amp; the Rise of the Nones</h1>
<p class="article-sub">American Christianity at the End of Its Fourth Century · 1970–Present</p>
<div class="art-divider"></div>
<div class="article-body">
<p>How American Christianity simultaneously expanded globally and contracted domestically in the late twentieth century.</p>
<p>The late twentieth century brought contradictory trends to American Christianity. On one hand, <strong>megachurches</strong> — congregations of two thousand or more — reshaped Protestant life. Drawing on marketing, seeker-sensitive worship, and small-group infrastructure, churches like Willow Creek Community Church in Illinois and Saddleback Community Church in California drew tens of thousands weekly. Simultaneously, the global Pentecostal explosion seeded by Azusa Street continued to reshape world Christianity, with the majority of the world's Christians now living outside the West.</p>
<p>On the other hand, the number of Americans identifying with no religion — the <strong>"Nones"</strong> — rose from roughly 5% in 1970 to over 25% by the 2020s, making the religiously unaffiliated the largest single "religious" category in America. The decline was steepest among mainline Protestants and American Catholics. Evangelicals held steadier but began declining after 2000. Scholars debate the causes: the alignment of Christianity with partisan politics, the abuse scandals in Catholic and evangelical institutions, generational disaffiliation, and the broader secularization of Western culture. American Christianity at the end of its fourth century is simultaneously more globally influential and more domestically fragile than at any point in its history.</p>
<figure class="art-fig portrait">
  <div class="fig-img-wrap"><img src="/images/america/L30_Megachurch.jpeg" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block;"></div>
  <div class="fig-body">
    <div class="fig-label">America · 1970–Present</div>
    <div class="fig-title">The Megachurch &amp; the Nones</div>
    <div class="fig-desc">Willow Creek and Saddleback drew tens of thousands with seeker-sensitive worship. Meanwhile the "Nones" — Americans with no religious affiliation — rose from 5% to over 25%, making them the largest single religious category in the country.</div>
  </div>
</figure>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">1970s–80s</div><div class="atl-text">Megachurches emerge — Willow Creek, Saddleback reshape Protestant congregational life</div></div>
  <div class="atl-row"><div class="atl-year">1970–2020s</div><div class="atl-text">Nones rise from 5% to over 25% — the largest "religious" category in America</div></div>
  <div class="atl-row"><div class="atl-year">Present</div><div class="atl-text">American Christianity: more globally influential, more domestically fragile than ever</div></div>
</div>
</div>`;

// Wire lessons 25–30
_track5.lessons[25].articleHtml=A26_ARTICLE_HTML;
_track5.lessons[26].articleHtml=A27_ARTICLE_HTML;
_track5.lessons[27].articleHtml=A28_ARTICLE_HTML;
_track5.lessons[28].articleHtml=A29_ARTICLE_HTML;
_track5.lessons[29].articleHtml=A30_ARTICLE_HTML;
_track5.lessons[30].articleHtml=A31_ARTICLE_HTML;
_track5.lessons[31].articleHtml=A32_ARTICLE_HTML;
_track5.lessons[25].learn=A26_LEARN;
_track5.lessons[26].learn=A27_LEARN;
_track5.lessons[27].learn=A28_LEARN;
_track5.lessons[28].learn=A29_LEARN;
_track5.lessons[29].learn=A30_LEARN;
_track5.lessons[30].learn=A31_LEARN;
_track5.lessons[31].learn=A32_LEARN;
_track5.lessons[25].study=A26_STUDY;
_track5.lessons[26].study=A27_STUDY;
_track5.lessons[27].study=A28_STUDY;
_track5.lessons[28].study=A29_STUDY;
_track5.lessons[29].study=A30_STUDY;
_track5.lessons[30].study=A31_STUDY;
_track5.lessons[31].study=A32_STUDY;
_track5.lessons[25].coldOpen={_bg:'/images/america/L25_Barth.jpeg',cards:[
  {label:'The World Before',text:'Liberal theology promised human progress. Then came the trenches of World War I.',size:'lg'},
  {label:'The Key Figures',text:'Karl Barth. Reinhold Niebuhr.',size:'lg'},
  {label:'The Surprise',text:'The most powerful theological response to modernity came not from fundamentalists but from within the liberal world itself.',size:'xl'},
]};
_track5.lessons[26].coldOpen={_bg:'/images/america/L26_BillyGraham.jpeg',cards:[
  {label:'The World Before',text:'Fundamentalists have withdrawn. But a younger generation wants back into the conversation.',size:'lg'},
  {label:'The Key Figures',text:'Billy Graham. Carl F. H. Henry. Fuller Theological Seminary.',size:'lg'},
  {label:'The Bridge',text:'Here is how evangelicalism was born as a deliberate alternative to both fundamentalism and liberalism.',size:'xl'},
]};
_track5.lessons[27].coldOpen={_bg:'/images/america/L27_KingMarching.jpeg',cards:[
  {label:'The Crisis',text:'A century after emancipation, Black Americans still cannot vote, eat, or sit where they choose.',size:'xl'},
  {label:'The Key Figures',text:'Martin Luther King Jr. The Black church.',size:'lg'},
  {label:'The Surprise',text:'The movement that changed America was organized from the church pew, not the courthouse.',size:'xl'},
]};
_track5.lessons[28].coldOpen={_bg:'/images/america/L28_VaticanII.jpeg',cards:[
  {label:'The World Before',text:'For four centuries the Catholic Church has responded to modernity mostly by saying no.',size:'lg'},
  {label:'The Key Figures',text:'Pope John XXIII. Pope Paul VI. The Council Fathers.',size:'lg'},
  {label:'The Surprise',text:'The largest religious institution on earth called a council — and opened the windows.',size:'xl'},
]};
_track5.lessons[29].coldOpen={_bg:'/images/america/L29_Falwell.jpeg',cards:[
  {label:'The World Before',text:'After Scopes, fundamentalists withdrew. But the 1960s changed everything.',size:'lg'},
  {label:'The Key Figures',text:'Jerry Falwell Sr. The Moral Majority. Ronald Reagan.',size:'lg'},
  {label:'The Surprise',text:'The movement that re-entered politics was not primarily about abortion — it was about race and education.',size:'xl'},
]};
_track5.lessons[30].coldOpen={_bg:'/images/america/L30_Megachurch.jpeg',cards:[
  {label:'The World Before',text:'For three centuries, the church shaped American culture. Now America is shaping the church.',size:'lg'},
  {label:'The Key Figures',text:'The megachurch. The global Pentecostal. The "None."',size:'lg'},
  {label:'The Bridge',text:'Here is where American Christianity stands at the end of four centuries — and where it is going.',size:'xl'},
]};
_track5.lessons[31].coldOpen={_bg:'/images/america/L32_BibleWars.jpeg',cards:[
  {label:'The World Before',text:'The fundamentalist-modernist controversy of the 1920s never really ended. It just went underground.',size:'lg'},
  {label:'The Crisis',text:'In the same decade, two groups ask the same question — what kind of book is the Bible? — and reach opposite conclusions.',size:'xl'},
  {label:'The Key Figures',text:'The Chicago Statement signers. Robert Funk and the Jesus Seminar.',size:'lg'},
  {label:'The Surprise',text:'The most consequential battle over Scripture in late 20th-century America was fought not in courtrooms but in seminaries, hotel ballrooms, and the pages of the New York Times.',size:'xl'},
]};

function openLessonArticle(tr,lessonIdx){
  const les=tr.lessons[lessonIdx];
  const coData=les.coldOpen||COLD_OPEN_CARDS[lessonIdx];
  const hasQuiz=les.questions&&les.questions.length>0;
  const readyLabel=hasQuiz?'Ready to start the quiz!':'Ready for Learn!';
  const showArticle=()=>{
    document.getElementById('article-content').innerHTML=les.articleHtml;
    document.getElementById('art-read-label').textContent='';
    const ms=document.getElementById('main-scroll');
    ms.onscroll=()=>{
      const pct=Math.round(ms.scrollTop/(ms.scrollHeight-ms.clientHeight)*100);
      document.getElementById('read-bar-fill').style.width=Math.min(100,pct)+'%';
      document.getElementById('art-read-label').textContent=pct>=90?readyLabel:'';
    };
    showScreen('article');
  };
  if(coData&&coData.cards&&coData.cards.length) showColdOpen(coData,showArticle);
  else showArticle();
}

function completeLessonArticle(){
  if(!S.tracks[currentTrack.id]) S.tracks[currentTrack.id]={lessons:{}};
  const les=currentTrack.lessons[currentLessonIdx];
  const key='read_'+les.id;
  const wasNew=!S.tracks[currentTrack.id][key];
  S.tracks[currentTrack.id][key]=true;
  save();
  if(wasNew){addXP(15);showToast('Reading complete! +15 XP');}
  startLearn(currentTrack,currentLessonIdx);
}

// ═══════════════════════════════════════════
// LEARN ENGINE
// ═══════════════════════════════════════════
let learnState=null;

const TIER_COLORS={1:'var(--green2)',2:'#c4a030',3:'var(--crimson)'};

function startLearn(tr,lessonIdx){
  const les=tr.lessons[lessonIdx];
  if(!les.learn||!les.learn.length){startQuiz(tr,lessonIdx);return;}

  // Shuffle and cap at 8 items per session
  const pool=les.learn.length>8
    ?shuffle(les.learn).slice(0,8)
    :les.learn;

  // Group questions by tier, tag each with its original index
  const byTier=[[],[],[]];
  pool.forEach((q,i)=>byTier[(q.tier||1)-1].push({...q,_idx:i}));

  // Resume from saved tier progress (0 = start over)
  const savedTier=(S.tracks[tr.id]&&S.tracks[tr.id]['learn_tier_'+les.id])||0;
  // If fully complete, restart from scratch as review
  let startTierIdx=savedTier<byTier.length?savedTier:0;
  while(startTierIdx<byTier.length&&byTier[startTierIdx].length===0)startTierIdx++;
  if(startTierIdx>=byTier.length)startTierIdx=0;

  // Pre-populate correctSet with all questions from already-completed tiers
  const correctSet=new Set();
  if(savedTier<byTier.length){
    for(let t=0;t<startTierIdx;t++)byTier[t].forEach(q=>correctSet.add(q._idx));
  }

  learnState={
    trackId:tr.id,lessonId:les.id,
    total:pool.length,
    _byTier:byTier,
    queue:[...byTier[startTierIdx]],
    retryQueue:[],
    correctSet,
    retriedSet:new Set(),
    firstTryCorrect:0,
    tierIdx:startTierIdx,
    lastShownTier:startTierIdx,  // suppress transition card at resume point
    answered:false,
  };
  renderLearnQuestion();
  showScreen('learn');
}

function renderLearnQuestion(){
  const ls=learnState;
  const q=ls.queue[0];

  // Tier transition card — only fires once per tier entry
  const qTier=q.tier||1;
  if(qTier>ls.lastShownTier){
    if(ls.lastShownTier>0){
      const msg=qTier===2
        ?"Good start. Let's go a little deeper."
        :"You're getting it. Here's the real test.";
      document.getElementById('learn-inner').innerHTML=`
        <div class="learn-transition">
          <div class="learn-transition-text">${msg}</div>
        </div>`;
      ls.lastShownTier=qTier;
      setTimeout(()=>renderLearnQuestion(),2000);
      return;
    }
    ls.lastShownTier=qTier;
  }

  const pct=Math.round((ls.correctSet.size/ls.total)*100);
  q._shuffledOpts=shuffle(q.options);
  const optionsHtml=q._shuffledOpts.map((opt,i)=>
    `<button class="learn-opt" id="lopt-${i}" onclick="selectLearnOpt(${i})">${opt}</button>`
  ).join('');

  document.getElementById('learn-inner').innerHTML=`
    <div class="learn-wrap">
      <div class="learn-header">
        <div class="learn-back" onclick="goTrack()"><i class="ti ti-arrow-left"></i> Back</div>
      </div>
      <div class="learn-prog-bar-track">
        <div class="learn-prog-bar" id="learn-prog-bar" style="width:${pct}%;background:${TIER_COLORS[q.tier||1]};"></div>
      </div>
      <div class="learn-question-card">
        <div class="learn-sentence">${q.sentence}</div>
        <div class="learn-wordbank" id="learn-wordbank" style="display:none;">${optionsHtml}</div>
        <div class="learn-reveal-hint" id="learn-reveal-hint" onclick="revealLearnOptions()">
          <span class="learn-reveal-key">Space</span> to reveal options
        </div>
        <div class="learn-explanation" id="learn-explanation" style="display:none;"></div>
        <div id="learn-next-wrap" style="display:none;margin-top:12px;"></div>
      </div>
    </div>`;
  ls.answered=false;
  ls.optionsRevealed=false;
}

function revealLearnOptions(){
  const ls=learnState;
  if(!ls||ls.answered||ls.optionsRevealed)return;
  ls.optionsRevealed=true;
  const wb=document.getElementById('learn-wordbank');
  if(wb)wb.style.display='';
  const hint=document.getElementById('learn-reveal-hint');
  if(hint)hint.remove();
}

function selectLearnOpt(optIdx){
  const ls=learnState;
  if(ls.answered||!ls.optionsRevealed)return;
  ls.answered=true;
  const q=ls.queue[0];
  const opts=q._shuffledOpts||q.options;
  const isCorrect=opts[optIdx]===q.answer;

  if(isCorrect){
    if(!ls.retriedSet.has(q._idx))ls.firstTryCorrect++;
    ls.correctSet.add(q._idx);
    // Advance bar
    const bar=document.getElementById('learn-prog-bar');
    if(bar)bar.style.width=Math.round((ls.correctSet.size/ls.total)*100)+'%';
  } else {
    ls.retriedSet.add(q._idx);
    ls.retryQueue.push(q);
  }

  opts.forEach((opt,i)=>{
    const btn=document.getElementById('lopt-'+i);
    if(!btn)return;
    btn.classList.add('answered');
    if(i===optIdx)btn.classList.add(isCorrect?'correct':'wrong');
    if(!isCorrect&&opt===q.answer)btn.classList.add('correct');
  });

  const expEl=document.getElementById('learn-explanation');
  if(expEl){
    expEl.innerHTML=`<i class="ti ${isCorrect?'ti-check-circle':'ti-info-circle'}"></i> ${q.explanation}`;
    expEl.className='learn-explanation show '+(isCorrect?'correct':'wrong');
    expEl.style.display='';
  }

  const nw=document.getElementById('learn-next-wrap');
  if(nw){
    nw.innerHTML=`<button class="continue-btn" onclick="advanceLearn()"><i class="ti ti-arrow-right"></i> Next</button>`;
    nw.style.display='block';
  }
}

function advanceLearn(){
  const ls=learnState;
  ls.queue.shift();

  if(ls.queue.length===0){
    if(ls.retryQueue.length>0){
      // Still wrong ones in this tier — loop them back
      ls.queue=[...ls.retryQueue];
      ls.retryQueue=[];
    } else {
      // Tier fully mastered — save progress, advance to next non-empty tier
      if(!S.tracks[ls.trackId])S.tracks[ls.trackId]={lessons:{}};
      S.tracks[ls.trackId]['learn_tier_'+ls.lessonId]=ls.tierIdx+1;
      save();
      ls.tierIdx++;
      while(ls.tierIdx<ls._byTier.length&&ls._byTier[ls.tierIdx].length===0)ls.tierIdx++;
      if(ls.tierIdx>=ls._byTier.length){finishLearn();return;}
      ls.queue=[...ls._byTier[ls.tierIdx]];
      ls.retryQueue=[];
    }
  }
  renderLearnQuestion();
}

function finishLearn(){
  const ls=learnState;
  const xpEarned=ls.firstTryCorrect*5;

  if(!S.tracks[ls.trackId])S.tracks[ls.trackId]={lessons:{}};
  S.tracks[ls.trackId]['learn_'+ls.lessonId]=true;
  S.tracks[ls.trackId]['learn_tier_'+ls.lessonId]=3;

  // For learn-only lessons (no quiz), award 1 star so the next lesson unlocks.
  const les=currentTrack&&currentTrack.lessons[currentLessonIdx];
  const isLearnOnly=les&&(!les.questions||les.questions.length===0);
  if(isLearnOnly){
    const prev=S.tracks[ls.trackId].lessons[ls.lessonId]||0;
    S.tracks[ls.trackId].lessons[ls.lessonId]=Math.max(prev,1);
  }

  save();updateTopbar();
  if(xpEarned>0)addXP(xpEarned);
  showToast(`Learn complete! +${xpEarned} XP`);

  const nextBtn=isLearnOnly
    ?`<button class="btn btn-primary btn-full" style="max-width:280px;margin:1rem auto 0;" onclick="goTrack()"><i class="ti ti-arrow-right"></i> Back to track</button>`
    :`<button class="btn btn-primary btn-full" style="max-width:280px;margin:1rem auto 0;" onclick="continueToStudy()"><i class="ti ti-bulb"></i> Continue to Study</button>`;

  document.getElementById('learn-inner').innerHTML=`
    <div class="learn-result">
      <div style="margin-bottom:6px;"><i class="ti ti-check-circle" style="font-size:52px;color:var(--green2);"></i></div>
      <div class="learn-result-title">Learn complete!</div>
      <div class="learn-result-sub">${ls.firstTryCorrect} of ${ls.total} on the first try · ${xpEarned} XP earned</div>
      <div class="learn-result-stats">
        <div class="rst"><div class="n">${ls.firstTryCorrect}</div><div class="l">First try</div></div>
        <div class="rst"><div class="n">${ls.total-ls.firstTryCorrect}</div><div class="l">Reviewed</div></div>
        <div class="rst"><div class="n">${xpEarned}</div><div class="l">XP</div></div>
      </div>
      ${nextBtn}
    </div>`;
}

function continueToStudy(){startStudy(currentTrack,currentLessonIdx);}

// ═══════════════════════════════════════════
// ERA CHECK ENGINE
// ═══════════════════════════════════════════
let eraCheckState=null;

function renderEraCheckCard(ec,isLocked,isDone,best){
  const total=10;
  const badge=isDone?`<span class="ec-best-badge">${best}/${total} best</span>`:'';
  return `
    <div class="era-check-card${isLocked?' locked':''}${isDone?' done':''}">
      <div class="ec-left"><i class="ti ti-calendar-check ec-icon"></i></div>
      <div class="ec-body">
        <div class="ec-label">${ec.label}</div>
        <div class="ec-sub">2 rounds · 5 events each</div>
      </div>
      <div class="ec-right">
        ${badge}
        ${isLocked?'<i class="ti ti-lock ec-lock-icon"></i>':'<i class="ti ti-chevron-right ec-chev"></i>'}
      </div>
    </div>`;
}

function _pickEraRound(pool,WIN,excludeWs){
  const years=pool.map(e=>e.year);
  const minY=Math.min(...years);
  const maxY=Math.max(...years);
  for(let attempt=0;attempt<30;attempt++){
    const start=minY+Math.floor(Math.random()*(maxY-minY-WIN+1));
    if(excludeWs!=null&&Math.abs(start-excludeWs)<WIN)continue;
    const ins=pool.filter(e=>e.year>=start&&e.year<=start+WIN-1);
    const out=pool.filter(e=>e.year<start-5||e.year>start+WIN+4);
    if(ins.length>=2&&out.length>=2){
      const inCount=Math.min(ins.length,3);
      const outCount=Math.min(out.length,5-inCount);
      const events=shuffle([...shuffle(ins).slice(0,inCount),...shuffle(out).slice(0,outCount)]);
      return{ws:start,we:start+WIN-1,events};
    }
  }
  return null;
}

function startEraCheck(checkId){
  const ec=AMERICA_ERA_CHECKS.find(c=>c.id===checkId);
  const pool=ec.pool;
  const WIN=25;
  const r1=_pickEraRound(pool,WIN,null)||{ws:pool[0].year,we:pool[0].year+WIN-1,events:pool.slice(0,5)};
  const r2=_pickEraRound(pool,WIN,r1.ws)||_pickEraRound(pool,WIN,null)||r1;
  eraCheckState={checkId,rounds:[r1,r2],roundIdx:0,idx:0,correct:0,xpEarned:0};
  showScreen('era-check');
  renderEraCheckQuestion();
}

function _ecTotals(){
  const s=eraCheckState;
  const total=s.rounds.reduce((n,r)=>n+r.events.length,0);
  const done=s.rounds.slice(0,s.roundIdx).reduce((n,r)=>n+r.events.length,0)+s.idx;
  return{total,done};
}

function renderEraCheckQuestion(){
  const s=eraCheckState;
  const round=s.rounds[s.roundIdx];
  const ev=round.events[s.idx];
  const{total,done}=_ecTotals();
  const prog=`${done+1} of ${total}`;
  const pct=Math.round(done/total*100);
  const roundLabel=`Round ${s.roundIdx+1} of ${s.rounds.length}`;
  document.getElementById('era-check-inner').innerHTML=`
    <div class="learn-wrap">
      <div class="learn-header">
        <span class="learn-back" onclick="goTrack()"><i class="ti ti-arrow-left"></i> Lessons</span>
        <span class="learn-prog-label" style="margin-left:auto;">${prog}</span>
      </div>
      <div class="learn-prog-bar-track" style="margin-bottom:22px;">
        <div class="learn-prog-bar" style="width:${pct}%;background:#1b3a6b;"></div>
      </div>
      <div class="ec-screen-eyebrow">${roundLabel}</div>
      <div class="ec-window-banner">
        <span class="ec-window-years">${round.ws} – ${round.we}</span>
        <span class="ec-window-label">the era in question</span>
      </div>
      <p class="ec-question-prompt">Did this event happen within this era?</p>
      <div class="ec-event-card">
        <div class="ec-event-text">${ev.label}</div>
      </div>
      <div class="ec-buttons" id="ec-buttons">
        <button class="ec-btn-yes" onclick="selectEraAnswer(true)"><i class="ti ti-check"></i> Yes, in this era</button>
        <button class="ec-btn-no" onclick="selectEraAnswer(false)"><i class="ti ti-x"></i> No, different era</button>
      </div>
      <div id="ec-feedback" style="display:none;margin-top:16px;"></div>
    </div>`;
}

function selectEraAnswer(isInEra){
  const s=eraCheckState;
  const round=s.rounds[s.roundIdx];
  const ev=round.events[s.idx];
  const correctAnswer=ev.year>=round.ws&&ev.year<=round.we;
  const isCorrect=isInEra===correctAnswer;

  const yesBtn=document.querySelector('.ec-btn-yes');
  const noBtn=document.querySelector('.ec-btn-no');
  yesBtn.disabled=true;
  noBtn.disabled=true;

  if(isCorrect){
    s.correct++;
    s.xpEarned+=5;
    addXP(5);
    (isInEra?yesBtn:noBtn).classList.add('ec-correct');
  } else {
    (isInEra?yesBtn:noBtn).classList.add('ec-wrong');
    (correctAnswer?yesBtn:noBtn).classList.add('ec-correct');
  }

  const isLastOfRound=s.idx+1>=round.events.length;
  const isLastRound=s.roundIdx+1>=s.rounds.length;
  const nextLabel=isLastOfRound&&isLastRound
    ?'See results <i class="ti ti-arrow-right"></i>'
    :isLastOfRound
    ?'Next round <i class="ti ti-arrow-right"></i>'
    :'Next <i class="ti ti-arrow-right"></i>';

  const feedback=document.getElementById('ec-feedback');
  feedback.style.display='block';
  feedback.innerHTML=`
    <div class="ec-feedback-inner${isCorrect?' correct':' wrong'}">
      <i class="ti ${isCorrect?'ti-circle-check':'ti-circle-x'}"></i>
      <span>${isCorrect?'Correct!':'Not quite.'} This happened in <strong>${ev.year}</strong>${correctAnswer?' — within':' — outside'} this era.</span>
    </div>
    <button class="btn btn-primary btn-full" style="margin-top:4px;" onclick="advanceEraCheck()">
      ${nextLabel}
    </button>`;
}

function advanceEraCheck(){
  const s=eraCheckState;
  s.idx++;
  const round=s.rounds[s.roundIdx];
  if(s.idx<round.events.length){
    renderEraCheckQuestion();
  } else if(s.roundIdx+1<s.rounds.length){
    renderEraCheckRoundTransition();
  } else {
    finishEraCheck();
  }
}

function renderEraCheckRoundTransition(){
  const s=eraCheckState;
  const nextRound=s.rounds[s.roundIdx+1];
  const{total,done}=_ecTotals();
  const pct=Math.round(done/total*100);
  document.getElementById('era-check-inner').innerHTML=`
    <div class="learn-wrap">
      <div class="learn-header">
        <span class="learn-back" onclick="goTrack()"><i class="ti ti-arrow-left"></i> Lessons</span>
        <span class="learn-prog-label" style="margin-left:auto;">${done} of ${total}</span>
      </div>
      <div class="learn-prog-bar-track" style="margin-bottom:22px;">
        <div class="learn-prog-bar" style="width:${pct}%;background:#1b3a6b;"></div>
      </div>
      <div class="ec-screen-eyebrow">Round 2</div>
      <p class="ec-question-prompt">New era, new events. Ready?</p>
      <div class="ec-window-banner">
        <span class="ec-window-years">${nextRound.ws} – ${nextRound.we}</span>
        <span class="ec-window-label">the era in question</span>
      </div>
      <button class="btn btn-primary btn-full ec-round-start-btn" style="margin-top:20px;" onclick="beginNextEraRound()">
        Start Round 2 <i class="ti ti-arrow-right"></i>
      </button>
    </div>`;
}

function beginNextEraRound(){
  eraCheckState.roundIdx++;
  eraCheckState.idx=0;
  renderEraCheckQuestion();
}

function finishEraCheck(){
  const s=eraCheckState;
  if(!S.tracks['track5'])S.tracks['track5']={lessons:{}};
  const prev=S.tracks['track5'][s.checkId+'_best']||0;
  S.tracks['track5'][s.checkId]=true;
  S.tracks['track5'][s.checkId+'_best']=Math.max(prev,s.correct);
  save();
  if(s.xpEarned>0)showToast(`Era Check complete! +${s.xpEarned} XP`);

  const total=s.rounds.reduce((n,r)=>n+r.events.length,0);
  const starsHtml=[1,2,3].map(i=>`<i class="ti ti-star" style="color:${s.correct>=Math.ceil(total*i/3)?'var(--gold)':'var(--parch2)'};font-size:28px;margin:0 3px;"></i>`).join('');

  document.getElementById('era-check-inner').innerHTML=`
    <div class="learn-wrap">
      <div class="result-screen" style="padding-top:2.5rem;">
        <div style="margin-bottom:8px;">${starsHtml}</div>
        <div class="learn-result-title">Era Check complete!</div>
        <div class="learn-result-sub">${s.correct} of ${total} correct · ${s.xpEarned} XP earned</div>
        <div class="learn-result-stats" style="margin-top:20px;">
          <div class="rst"><div class="n">${s.correct}</div><div class="l">Correct</div></div>
          <div class="rst"><div class="n">${total-s.correct}</div><div class="l">Missed</div></div>
          <div class="rst"><div class="n">${s.xpEarned}</div><div class="l">XP</div></div>
        </div>
        <button class="btn btn-primary btn-full" style="max-width:280px;margin:1.5rem auto 0;" onclick="goTrack()">
          <i class="ti ti-arrow-left"></i> Back to Lessons
        </button>
        <button class="btn btn-full" style="max-width:280px;margin:10px auto 0;" onclick="startEraCheck('${s.checkId}')">
          <i class="ti ti-refresh"></i> Play again
        </button>
      </div>
    </div>`;
}

// ═══════════════════════════════════════════
// PERSON CHECK ENGINE
// ═══════════════════════════════════════════
let personCheckState=null;

function renderPersonCheckCard(pc,isLocked,isDone,best){
  const total=10;
  const badge=isDone?`<span class="pc-best-badge">${best}/${total} best</span>`:'';
  return `
    <div class="person-check-card${isLocked?' locked':''}${isDone?' done':''}">
      <div class="pc-left"><i class="ti ti-user-circle pc-icon"></i></div>
      <div class="pc-body">
        <div class="pc-label">${pc.label}</div>
        <div class="pc-sub">2 rounds · 5 statements each</div>
      </div>
      <div class="pc-right">
        ${badge}
        ${isLocked?'<i class="ti ti-lock pc-lock-icon"></i>':'<i class="ti ti-chevron-right pc-chev"></i>'}
      </div>
    </div>`;
}

function _pickPersonRound(pool,excludeName){
  const available=pool.filter(p=>p.name!==excludeName);
  if(!available.length)return null;
  const person=available[Math.floor(Math.random()*available.length)];
  const facts=shuffle(person.facts).slice(0,3).map(t=>({text:t,isTrue:true}));
  const foils=shuffle(person.foils).slice(0,2).map(t=>({text:t,isTrue:false}));
  return{person:{name:person.name,descriptor:person.descriptor},statements:shuffle([...facts,...foils])};
}

function startPersonCheck(checkId){
  const pc=AMERICA_PERSON_CHECKS.find(c=>c.id===checkId);
  const r1=_pickPersonRound(pc.pool,null);
  const r2=_pickPersonRound(pc.pool,r1?r1.person.name:null)||r1;
  personCheckState={checkId,rounds:[r1,r2],roundIdx:0,idx:0,correct:0,xpEarned:0};
  showScreen('person-check');
  renderPersonCheckQuestion();
}

function _pcTotals(){
  const s=personCheckState;
  const total=s.rounds.reduce((n,r)=>n+r.statements.length,0);
  const done=s.rounds.slice(0,s.roundIdx).reduce((n,r)=>n+r.statements.length,0)+s.idx;
  return{total,done};
}

function renderPersonCheckQuestion(){
  const s=personCheckState;
  const round=s.rounds[s.roundIdx];
  const stmt=round.statements[s.idx];
  const{total,done}=_pcTotals();
  const prog=`${done+1} of ${total}`;
  const pct=Math.round(done/total*100);
  const roundLabel=`Round ${s.roundIdx+1} of ${s.rounds.length}`;
  document.getElementById('person-check-inner').innerHTML=`
    <div class="learn-wrap">
      <div class="learn-header">
        <span class="learn-back" onclick="goTrack()"><i class="ti ti-arrow-left"></i> Lessons</span>
        <span class="learn-prog-label" style="margin-left:auto;">${prog}</span>
      </div>
      <div class="learn-prog-bar-track" style="margin-bottom:22px;">
        <div class="learn-prog-bar" style="width:${pct}%;background:var(--crimson);"></div>
      </div>
      <div class="pc-screen-eyebrow">${roundLabel}</div>
      <div class="pc-person-banner">
        <span class="pc-person-name">${round.person.name}</span>
        <span class="pc-person-descriptor">${round.person.descriptor}</span>
      </div>
      <p class="pc-question-prompt">Does this statement describe this person?</p>
      <div class="pc-statement-card">
        <div class="pc-statement-text">${stmt.text}</div>
      </div>
      <div class="pc-buttons" id="pc-buttons">
        <button class="pc-btn-yes" onclick="selectPersonAnswer(true)"><i class="ti ti-check"></i> Yes, this applies</button>
        <button class="pc-btn-no" onclick="selectPersonAnswer(false)"><i class="ti ti-x"></i> No, doesn't apply</button>
      </div>
      <div id="pc-feedback" style="display:none;margin-top:16px;"></div>
    </div>`;
}

function selectPersonAnswer(isTrue){
  const s=personCheckState;
  const round=s.rounds[s.roundIdx];
  const stmt=round.statements[s.idx];
  const isCorrect=isTrue===stmt.isTrue;

  const yesBtn=document.querySelector('.pc-btn-yes');
  const noBtn=document.querySelector('.pc-btn-no');
  yesBtn.disabled=true;
  noBtn.disabled=true;

  if(isCorrect){
    s.correct++;
    s.xpEarned+=5;
    addXP(5);
    (isTrue?yesBtn:noBtn).classList.add('pc-correct');
  } else {
    (isTrue?yesBtn:noBtn).classList.add('pc-wrong');
    (stmt.isTrue?yesBtn:noBtn).classList.add('pc-correct');
  }

  const isLastOfRound=s.idx+1>=round.statements.length;
  const isLastRound=s.roundIdx+1>=s.rounds.length;
  const nextLabel=isLastOfRound&&isLastRound
    ?'See results <i class="ti ti-arrow-right"></i>'
    :isLastOfRound
    ?'Next round <i class="ti ti-arrow-right"></i>'
    :'Next <i class="ti ti-arrow-right"></i>';

  const resultText=isCorrect
    ?`Correct! This statement <strong>${stmt.isTrue?'does':'does not'}</strong> apply.`
    :`Not quite. This statement <strong>${stmt.isTrue?'does':'does not'}</strong> apply to ${round.person.name}.`;

  const feedback=document.getElementById('pc-feedback');
  feedback.style.display='block';
  feedback.innerHTML=`
    <div class="pc-feedback-inner${isCorrect?' correct':' wrong'}">
      <i class="ti ${isCorrect?'ti-circle-check':'ti-circle-x'}"></i>
      <span>${resultText}</span>
    </div>
    <button class="btn btn-primary btn-full" style="margin-top:4px;" onclick="advancePersonCheck()">
      ${nextLabel}
    </button>`;
}

function advancePersonCheck(){
  const s=personCheckState;
  s.idx++;
  const round=s.rounds[s.roundIdx];
  if(s.idx<round.statements.length){
    renderPersonCheckQuestion();
  } else if(s.roundIdx+1<s.rounds.length){
    renderPersonCheckRoundTransition();
  } else {
    finishPersonCheck();
  }
}

function renderPersonCheckRoundTransition(){
  const s=personCheckState;
  const nextRound=s.rounds[s.roundIdx+1];
  const{total,done}=_pcTotals();
  const pct=Math.round(done/total*100);
  document.getElementById('person-check-inner').innerHTML=`
    <div class="learn-wrap">
      <div class="learn-header">
        <span class="learn-back" onclick="goTrack()"><i class="ti ti-arrow-left"></i> Lessons</span>
        <span class="learn-prog-label" style="margin-left:auto;">${done} of ${total}</span>
      </div>
      <div class="learn-prog-bar-track" style="margin-bottom:22px;">
        <div class="learn-prog-bar" style="width:${pct}%;background:var(--crimson);"></div>
      </div>
      <div class="pc-screen-eyebrow">Round 2</div>
      <p class="pc-question-prompt">New person, new statements. Ready?</p>
      <div class="pc-person-banner">
        <span class="pc-person-name">${nextRound.person.name}</span>
        <span class="pc-person-descriptor">${nextRound.person.descriptor}</span>
      </div>
      <button class="btn btn-primary btn-full pc-round-start-btn" style="margin-top:20px;background:var(--crimson);border-color:var(--crimson2);" onclick="beginNextPersonRound()">
        Start Round 2 <i class="ti ti-arrow-right"></i>
      </button>
    </div>`;
}

function beginNextPersonRound(){
  personCheckState.roundIdx++;
  personCheckState.idx=0;
  renderPersonCheckQuestion();
}

function finishPersonCheck(){
  const s=personCheckState;
  if(!S.tracks['track5'])S.tracks['track5']={lessons:{}};
  const prev=S.tracks['track5'][s.checkId+'_best']||0;
  S.tracks['track5'][s.checkId]=true;
  S.tracks['track5'][s.checkId+'_best']=Math.max(prev,s.correct);
  save();
  if(s.xpEarned>0)showToast(`Person Check complete! +${s.xpEarned} XP`);

  const total=s.rounds.reduce((n,r)=>n+r.statements.length,0);
  const starsHtml=[1,2,3].map(i=>`<i class="ti ti-star" style="color:${s.correct>=Math.ceil(total*i/3)?'var(--gold)':'var(--parch2)'};font-size:28px;margin:0 3px;"></i>`).join('');

  document.getElementById('person-check-inner').innerHTML=`
    <div class="learn-wrap">
      <div class="result-screen" style="padding-top:2.5rem;">
        <div style="margin-bottom:8px;">${starsHtml}</div>
        <div class="learn-result-title">Person Check complete!</div>
        <div class="learn-result-sub">${s.correct} of ${total} correct · ${s.xpEarned} XP earned</div>
        <div class="learn-result-stats" style="margin-top:20px;">
          <div class="rst"><div class="n">${s.correct}</div><div class="l">Correct</div></div>
          <div class="rst"><div class="n">${total-s.correct}</div><div class="l">Missed</div></div>
          <div class="rst"><div class="n">${s.xpEarned}</div><div class="l">XP</div></div>
        </div>
        <button class="btn btn-primary btn-full" style="max-width:280px;margin:1.5rem auto 0;background:var(--crimson);border-color:var(--crimson2);" onclick="goTrack()">
          <i class="ti ti-arrow-left"></i> Back to Lessons
        </button>
        <button class="btn btn-full" style="max-width:280px;margin:10px auto 0;" onclick="startPersonCheck('${s.checkId}')">
          <i class="ti ti-refresh"></i> Play again
        </button>
      </div>
    </div>`;
}

// ═══════════════════════════════════════════
// STUDY ENGINE
// ═══════════════════════════════════════════
let studyState=null;

function startStudy(tr,lessonIdx){
  tr=tr||currentTrack;
  lessonIdx=lessonIdx!==undefined?lessonIdx:currentLessonIdx;
  const les=tr.lessons[lessonIdx];
  if(!les||!les.study){startQuiz(tr,lessonIdx);return;}
  studyState={
    trackId:tr.id,
    lessonId:les.id,
    cards:les.study.cards,
    questions:les.study.questions||les.study.cards.flatMap(c=>c.questions||[]),
    cardIdx:0,
    activeDef:null,
    activeQ:null,
  };
  renderStudy();
  showScreen('study');
}

function _applyTermHighlights(text,terms){
  const sorted=terms.map((t,i)=>({...t,origIdx:i})).sort((a,b)=>b.word.length-a.word.length);
  sorted.forEach(term=>{
    text=text.split(term.word).join(
      `<span class="study-kw" onclick="studyToggleDef(${term.origIdx})">${term.word}</span>`
    );
  });
  return text;
}

function renderStudy(){
  const ss=studyState;
  const card=ss.cards[ss.cardIdx];
  const isLast=ss.cardIdx===ss.cards.length-1;

  const processedText=_applyTermHighlights(card.text,card.terms);

  const dots=ss.cards.map((_,i)=>
    `<span class="study-dot${i===ss.cardIdx?' active':''}"></span>`
  ).join('');

  const defHtml=ss.activeDef!==null
    ?`<div class="study-def-box">
        <div class="study-def-word">${card.terms[ss.activeDef].word}</div>
        <div class="study-def-text">${card.terms[ss.activeDef].def}</div>
       </div>`
    :'';

  const qChips=ss.questions.map((q,i)=>
    `<button class="study-q-chip${ss.activeQ===i?' open':''}" onclick="studyToggleQ(${i})">${q.q}</button>`
  ).join('');

  const ansHtml=ss.activeQ!==null
    ?`<div class="study-q-answer"><i class="ti ti-arrow-right" style="font-size:12px;color:var(--gold2);margin-right:6px;flex-shrink:0;"></i>${ss.questions[ss.activeQ].a}</div>`
    :'';

  document.getElementById('study-inner').innerHTML=`
    <div class="study-wrap">
      <div class="study-header">
        <div class="study-back" onclick="goTrack()"><i class="ti ti-arrow-left"></i> Back</div>
        <div class="study-eyebrow"><i class="ti ti-bulb"></i> Study</div>
      </div>

      <div class="study-card">
        <div class="study-card-count">Summary ${ss.cardIdx+1} of ${ss.cards.length}</div>
        <div class="study-card-text">${processedText}</div>
        ${defHtml}
      </div>

      <div class="study-nav">
        <div class="study-dots">${dots}</div>
        <div class="study-nav-btns">
          ${ss.cardIdx>0
            ?`<button class="study-btn-prev" onclick="studyPrev()"><i class="ti ti-arrow-left"></i> Prev</button>`
            :'<span></span>'}
          ${isLast
            ?`<button class="btn btn-primary study-btn-quiz" onclick="studyGoQuiz()"><i class="ti ti-pencil"></i> Start Quiz</button>`
            :`<button class="study-btn-next" onclick="studyNext()">Next <i class="ti ti-arrow-right"></i></button>`}
        </div>
      </div>

      <div class="study-q-section">
        <div class="study-q-label"><i class="ti ti-message-question"></i> Ask a question</div>
        <div class="study-q-chips">${qChips}</div>
        ${ansHtml}
      </div>
    </div>`;
}

function studyToggleDef(termIdx){
  studyState.activeDef=studyState.activeDef===termIdx?null:termIdx;
  renderStudy();
}

function studyToggleQ(qIdx){
  studyState.activeQ=studyState.activeQ===qIdx?null:qIdx;
  renderStudy();
}

function studyNext(){
  if(studyState.cardIdx<studyState.cards.length-1){
    studyState.cardIdx++;
    studyState.activeDef=null;
    renderStudy();
  }
}

function studyPrev(){
  if(studyState.cardIdx>0){
    studyState.cardIdx--;
    studyState.activeDef=null;
    renderStudy();
  }
}

function studyGoQuiz(){
  if(!S.tracks[studyState.trackId])S.tracks[studyState.trackId]={lessons:{}};
  S.tracks[studyState.trackId]['study_'+studyState.lessonId]=true;
  save();
  startQuiz(currentTrack,currentLessonIdx);
}

// ═══════════════════════════════════════════
// LESSON ENGINE
// ═══════════════════════════════════════════
let lessonState=null;

const YEAR_Q_EXEMPT=new Set(['313','325','553','680','787','800','1054','1095','1274','1607','1791','1830','1925','1962']);
function buildMCOpts(q){
  const isYearQ=/\byear\b/i.test(q.q)&&/^\d{3,4}$/.test(q.correct);
  if(isYearQ&&!YEAR_Q_EXEMPT.has(q.correct)){
    const yr=parseInt(q.correct);
    const pool=[yr-200,yr-100,yr+100,yr+200].filter(y=>y>0).map(String);
    const wrong=pool.slice(0,3);
    const all=[q.correct,...wrong].sort((a,b)=>parseInt(a)-parseInt(b));
    return{opts:all,answerIdx:all.indexOf(q.correct)};
  }
  const wrong=shuffle(q.wrong).slice(0,3);
  const all=shuffle([q.correct,...wrong]);
  return{opts:all,answerIdx:all.indexOf(q.correct)};
}

function startLesson(tr,lessonIdx){
  currentLessonIdx=lessonIdx;
  const les=tr.lessons[lessonIdx];
  const ts=S.tracks[tr.id]||{lessons:{}};
  if(!ts['read_'+les.id]){openLessonArticle(tr,lessonIdx);return;}
  const isLearnOnly=!les.questions||les.questions.length===0;
  const stars=ts.lessons[les.id]||0;
  const learnDone=!!ts['learn_'+les.id];
  if(isLearnOnly){
    if(learnDone) openLessonArticle(tr,lessonIdx);
    else startLearn(tr,lessonIdx);
    return;
  }
  if(stars>0||learnDone)startQuiz(tr,lessonIdx);
  else startLearn(tr,lessonIdx);
}

function startQuiz(tr,lessonIdx){
  currentLessonIdx=lessonIdx;
  const les=tr.lessons[lessonIdx];
  const reviewCount=lessonIdx>0?4:0;
  const current=shuffle(les.questions).slice(0,12-reviewCount);
  const prevPool=tr.lessons.slice(0,lessonIdx).flatMap(l=>l.questions);
  const review=shuffle(prevPool).slice(0,reviewCount);
  const pool=shuffle([...current,...review]);
  const questions=pool.map(q=>{
    if(q.type==='mc'||q.type==='quote'){
      const{opts,answerIdx}=buildMCOpts(q);
      return{...q,opts,answer:answerIdx};
    }
    if(q.type==='timeline'){
      const shuffled=shuffle(q.events);
      const sorted=[...q.events].sort((a,b)=>a.year-b.year);
      const order=sorted.map(ev=>shuffled.indexOf(ev));
      return{...q,shuffled,order,timelineStep:0};
    }
    return q;
  });
  lessonState={
    trackId:tr.id,
    lessonId:les.id,
    lessonName:les.name,
    questions,
    qIdx:0,
    lives:3,
    correct:0,
    wrong:0,
    xpEarned:0,
    answered:false,
  };
  renderQuestion();
  showScreen('lesson');
}

function renderQuestion(){
  const ls=lessonState;
  if(ls.qIdx>=ls.questions.length){finishLesson();return;}
  const q=ls.questions[ls.qIdx];
  ls.answered=false;
  const pct=Math.round(ls.qIdx/ls.questions.length*100);

  const heartsHtml=[1,2,3].map(i=>`<span class="heart ${i<=ls.lives?'full':'empty'}" id="heart-${i}"><i class="ti ti-heart${i<=ls.lives?'':'-broken'}" style="font-size:22px;"></i></span>`).join('');

  let qBody='';
  if(q.type==='mc'||q.type==='quote'){
    const quoteBlock=q.type==='quote'?`<div class="pull-quote" style="margin-bottom:1rem;"><p>${q.quote}</p><cite>${q.cite}</cite></div>`:'';
    qBody=quoteBlock+`<div class="options" id="opts-container">`+
      q.opts.map((o,i)=>`<button class="opt" onclick="selectOpt(${i})" id="opt-${i}"><span class="opt-letter">${'ABCD'[i]}</span>${o}</button>`).join('')+
    `</div>`;
  } else if(q.type==='timeline'){
    qBody=`<div id="timeline-container" style="display:flex;flex-direction:column;gap:8px;margin-top:1rem;">`+
      q.shuffled.map((ev,i)=>{
        const isDone=q.order.slice(0,q.timelineStep).includes(i);
        return `<button class="opt${isDone?' tl-done':''}" ${isDone?'disabled':`onclick="selectTimeline(${i})"`} id="tl-opt-${i}"><span class="opt-letter">${isDone?(q.order.indexOf(i)+1):'·'}</span>${ev.label}</button>`;
      }).join('')+
    `</div>`;
  } else {
    qBody=`<div class="tf-row">
      <button class="tf-btn" onclick="selectTF(true)" id="tf-true"><i class="ti ti-check tf-icon"></i><span class="tf-label">True</span></button>
      <button class="tf-btn" onclick="selectTF(false)" id="tf-false"><i class="ti ti-x tf-icon"></i><span class="tf-label">False</span></button>
    </div>`;
  }

  document.getElementById('lesson-inner').innerHTML=`
    <div class="lives-bar">
      <div class="lives-display">${heartsHtml}</div>
      <div class="lesson-prog-wrap">
        <div class="lesson-prog-track"><div class="lesson-prog-fill" style="width:${pct}%"></div></div>
        <div class="lesson-prog-label">${ls.qIdx}/${ls.questions.length}</div>
      </div>
    </div>
    <div class="q-card" id="q-card">
      <div class="q-card-header">
        <span class="q-era">${q.era}</span>
        <span class="q-type-badge">${q.type==='tf'?'True / False':q.type==='timeline'?'Order the timeline':q.type==='quote'?'Quote':'Multiple choice'}</span>
      </div>
      <div class="q-body">
        <div class="q-text">${q.q}</div>
        ${qBody}
      </div>
    </div>
    <div class="q-feedback" id="q-feedback"></div>
    <button class="continue-btn" id="continue-btn" style="display:none;" onclick="nextQ()">
      <i class="ti ti-arrow-right"></i> Continue
    </button>`;
}

function selectOpt(idx){
  if(lessonState.answered) return;
  lessonState.answered=true;
  const q=lessonState.questions[lessonState.qIdx];
  const correct=(idx===q.answer);
  document.querySelectorAll('.opt').forEach(o=>{o.onclick=null;o.style.cursor='default';});
  document.getElementById('opt-'+q.answer).classList.add('correct');
  if(!correct) document.getElementById('opt-'+idx).classList.add('wrong');
  handleResult(correct,q.explain);
}

function selectTF(val){
  if(lessonState.answered) return;
  lessonState.answered=true;
  const q=lessonState.questions[lessonState.qIdx];
  const correct=(val===q.answer);
  const trueBtn=document.getElementById('tf-true');
  const falseBtn=document.getElementById('tf-false');
  if(trueBtn){trueBtn.onclick=null;trueBtn.style.cursor='default';}
  if(falseBtn){falseBtn.onclick=null;falseBtn.style.cursor='default';}
  const chosenBtn=document.getElementById(val?'tf-true':'tf-false');
  const otherBtn=document.getElementById(val?'tf-false':'tf-true');
  if(correct){
    if(chosenBtn) chosenBtn.classList.add('correct');
  } else {
    if(chosenBtn) chosenBtn.classList.add('wrong');
    if(otherBtn) otherBtn.classList.add('correct');
  }
  handleResult(correct,q.explain);
}

function selectTimeline(displayIdx){
  if(lessonState.answered) return;
  const q=lessonState.questions[lessonState.qIdx];
  const expectedIdx=q.order[q.timelineStep];
  if(displayIdx===expectedIdx){
    q.timelineStep++;
    const btn=document.getElementById('tl-opt-'+displayIdx);
    if(btn){btn.classList.add('tl-done');btn.onclick=null;btn.style.cursor='default';const l=btn.querySelector('.opt-letter');if(l)l.textContent=q.timelineStep;}
    if(q.timelineStep===q.events.length){
      lessonState.answered=true;
      lessonState.correct++;
      lessonState.xpEarned+=10;
      addXP(10);
      const fb=document.getElementById('q-feedback');
      fb.className='q-feedback show correct';
      fb.innerHTML='<strong>Correct order!</strong> '+q.explain;
      const cb=document.getElementById('continue-btn');
      if(cb)cb.style.display='flex';
    }
  } else {
    lessonState.answered=true;
    lessonState.wrong++;
    lessonState.lives--;
    const heartEl=document.getElementById('heart-'+(lessonState.lives+1));
    if(heartEl)heartEl.classList.add('lost');
    const wrongBtn=document.getElementById('tl-opt-'+displayIdx);
    if(wrongBtn){wrongBtn.classList.add('shake');setTimeout(()=>wrongBtn.classList.remove('shake'),450);}
    const fb=document.getElementById('q-feedback');
    fb.className='q-feedback show wrong';
    fb.innerHTML='<strong>Wrong.</strong> '+q.explain;
    if(lessonState.lives<=0){
      setTimeout(()=>showDeathScreen(),1600);
    } else {
      const cb=document.getElementById('continue-btn');
      if(cb)cb.style.display='flex';
    }
  }
}

function handleResult(correct,explain){
  if(correct){
    lessonState.correct++;
    lessonState.xpEarned+=10;
    addXP(10);
  } else {
    lessonState.wrong++;
    lessonState.lives--;
    const heartEl=document.getElementById('heart-'+(lessonState.lives+1));
    if(heartEl) heartEl.classList.add('lost');
    const card=document.getElementById('q-card');
    if(card){card.classList.add('shake');setTimeout(()=>card.classList.remove('shake'),450);}
  }
  const fb=document.getElementById('q-feedback');
  fb.className='q-feedback show '+(correct?'correct':'wrong');
  fb.innerHTML='<strong>'+(correct?'Correct!':'Wrong.')+'</strong> '+explain;
  if(!correct && lessonState.lives<=0){
    setTimeout(()=>showDeathScreen(),1600);
  } else {
    const btn=document.getElementById('continue-btn');
    if(btn) btn.style.display='flex';
  }
}

function nextQ(){
  lessonState.qIdx++;
  renderQuestion();
}

function showDeathScreen(){
  const ls=lessonState;
  document.getElementById('lesson-result-content').innerHTML=`
    <div class="result-icon red"><i class="ti ti-heart-broken"></i></div>
    <div class="result-title">Out of lives!</div>
    <div class="result-sub">You ran out of hearts on <strong>${ls.lessonName}</strong>. Review the reading and try again.</div>
    <div class="result-stats">
      <div class="rst"><div class="n">${ls.correct}</div><div class="l">Correct</div></div>
      <div class="rst"><div class="n">${ls.wrong}</div><div class="l">Wrong</div></div>
    </div>
    <div class="result-btns">
      <button class="btn btn-primary btn-full" onclick="retryLesson()"><i class="ti ti-refresh"></i> Try again</button>
      <button class="btn btn-full" onclick="goTrack()">Back to track</button>
    </div>`;
  showScreen('lesson-result');
}

function retryLesson(){
  startLesson(currentTrack,currentLessonIdx);
}

// ═══════════════════════════════════════════
// EXAM ENGINE
// ═══════════════════════════════════════════
let examState=null;

function startExam(trackId){
  currentTrack=TRACKS.find(t=>t.id===trackId)||currentTrack;
  const all=trackId==='track5'
    ?A_FINAL_QUESTIONS()
    :[...L1_QUESTIONS(),...L2_QUESTIONS(),...L3_QUESTIONS(),...L4_QUESTIONS()];
  const picked=shuffle(all).slice(0,20);
  const questions=picked.map(q=>{
    if(q.type==='mc'||q.type==='quote'){
      const{opts,answerIdx}=buildMCOpts(q);
      return{...q,opts,answer:answerIdx};
    }
    if(q.type==='timeline'){
      const shuffled=shuffle(q.events);
      const sorted=[...q.events].sort((a,b)=>a.year-b.year);
      const order=sorted.map(ev=>shuffled.indexOf(ev));
      return{...q,shuffled,order,timelineStep:0,examWrongCounted:false};
    }
    return{...q};
  });
  examState={trackId,questions,qIdx:0,correct:0,wrong:0};
  renderExamQuestion();
  showScreen('exam');
}

function renderExamQuestion(){
  const es=examState;
  if(es.qIdx>=es.questions.length){finishExam();return;}
  const q=es.questions[es.qIdx];
  const prog=`${es.qIdx+1} / ${es.questions.length}`;

  let qBody='';
  if(q.type==='mc'||q.type==='quote'){
    const quoteBlock=q.type==='quote'?`<div class="pull-quote" style="margin-bottom:1rem;"><p>${q.quote}</p><cite>${q.cite}</cite></div>`:'';
    qBody=quoteBlock+`<div class="options" id="exam-opts-container">`+
      q.opts.map((o,i)=>`<button class="opt" onclick="selectExamOpt(${i})" id="exam-opt-${i}"><span class="opt-letter">${'ABCD'[i]}</span>${o}</button>`).join('')+
    `</div>`;
  } else if(q.type==='tf'){
    qBody=`<div class="options" id="exam-opts-container">
      <button class="opt" onclick="selectExamTF(true)" id="exam-opt-true"><span class="opt-letter">T</span>True</button>
      <button class="opt" onclick="selectExamTF(false)" id="exam-opt-false"><span class="opt-letter">F</span>False</button>
    </div>`;
  } else if(q.type==='timeline'){
    qBody=`<div id="exam-timeline-container" style="display:flex;flex-direction:column;gap:8px;margin-top:1rem;">`+
      q.shuffled.map((ev,i)=>{
        const isDone=q.order.slice(0,q.timelineStep).includes(i);
        return `<button class="opt${isDone?' tl-done':''}" ${isDone?'disabled':`onclick="selectExamTimeline(${i})"`} id="exam-tl-opt-${i}"><span class="opt-letter">${isDone?(q.order.indexOf(i)+1):'·'}</span>${ev.label}</button>`;
      }).join('')+`</div>`;
  }

  const badgeTxt=q.type==='tf'?'True / False':q.type==='timeline'?'Order the timeline':q.type==='quote'?'Quote':'Multiple choice';

  const trackName=(TRACKS.find(t=>t.id===es.trackId)||{}).name||'Track';
  document.getElementById('exam-inner').innerHTML=`
    <div class="exam-seal-bar">
      <div class="exam-eyebrow">${trackName} Examination</div>
      <div class="exam-title">Final Examination</div>
      <div class="exam-prog">${prog}</div>
    </div>
    <div class="q-type-badge">${badgeTxt}</div>
    <div class="q-text">${q.q}</div>
    ${qBody}
    <div class="q-feedback" id="exam-feedback"></div>
    <div class="q-continue" id="exam-continue-btn" style="display:none;">
      <button class="btn btn-primary" onclick="nextExamQ()"><i class="ti ti-arrow-right"></i> Continue</button>
    </div>`;
}

function selectExamOpt(idx){
  const q=examState.questions[examState.qIdx];
  const correct=idx===q.answer;
  document.querySelectorAll('#exam-opts-container .opt').forEach((b,i)=>{
    b.disabled=true;
    if(i===q.answer) b.classList.add('correct');
    else if(i===idx&&!correct) b.classList.add('wrong');
  });
  handleExamResult(correct,q.explain);
}

function selectExamTF(val){
  const q=examState.questions[examState.qIdx];
  const correct=val===q.answer;
  ['true','false'].forEach(v=>{
    const b=document.getElementById('exam-opt-'+v);
    if(b){b.disabled=true;if(String(q.answer)===v) b.classList.add('correct');else if(String(val)===v&&!correct) b.classList.add('wrong');}
  });
  handleExamResult(correct,q.explain);
}

function selectExamTimeline(displayIdx){
  const q=examState.questions[examState.qIdx];
  if(displayIdx===q.order[q.timelineStep]){
    const btn=document.getElementById('exam-tl-opt-'+displayIdx);
    if(btn){btn.disabled=true;btn.classList.add('tl-done');btn.querySelector('.opt-letter').textContent=q.timelineStep+1;}
    q.timelineStep++;
    if(q.timelineStep===q.events.length){
      handleExamResult(true,q.explain);
    }
  } else {
    const btn=document.getElementById('exam-tl-opt-'+displayIdx);
    if(btn){btn.classList.add('wrong');setTimeout(()=>btn.classList.remove('wrong'),600);}
    q.timelineStep=0;
    const fb=document.getElementById('exam-feedback');
    fb.className='q-feedback show wrong';
    fb.innerHTML='<strong>Wrong order</strong> — start over.';
    setTimeout(renderExamQuestion,900);
  }
}

function handleExamResult(correct,explain){
  if(correct) examState.correct++; else examState.wrong++;
  const fb=document.getElementById('exam-feedback');
  fb.className='q-feedback show '+(correct?'correct':'wrong');
  fb.innerHTML='<strong>'+(correct?'Correct!':'Wrong.')+'</strong> '+explain;
  document.getElementById('exam-continue-btn').style.display='flex';
}

function nextExamQ(){
  examState.qIdx++;
  renderExamQuestion();
}

function finishExam(){
  const es=examState;
  const pct=Math.round(es.correct/20*100);
  let stars=0;
  if(pct>=90) stars=3;
  else if(pct>=75) stars=2;
  else if(pct>=60) stars=1;
  const passed=stars>=1;
  if(!S.tracks[es.trackId]) S.tracks[es.trackId]={lessons:{}};
  const prev=S.tracks[es.trackId].exam||{stars:0};
  if(stars>=prev.stars){
    S.tracks[es.trackId].exam={passed,score:pct,stars,takenAt:new Date().toISOString()};
  }
  save();
  logExamResult(es.trackId, {passed, score:pct, stars});
  const starsHtml=[1,2,3].map(i=>`<i class="ti ${i<=stars?'ti-star-filled':'ti-star'}" style="font-size:28px;color:${i<=stars?'var(--gold)':'var(--parch2)'};margin:0 3px;"></i>`).join('');
  document.getElementById('exam-result-content').innerHTML=`
    <div class="result-icon ${passed?'green':'red'}"><i class="ti ${passed?'ti-award':'ti-heart-broken'}"></i></div>
    <div class="result-title">${passed?'Examination passed!':'Not quite'}</div>
    <div style="margin-bottom:1rem;">${starsHtml}</div>
    <div class="result-sub">${pct}% correct</div>
    <div class="result-stats">
      <div class="rst"><div class="n">${es.correct}</div><div class="l">Correct</div></div>
      <div class="rst"><div class="n">${es.wrong}</div><div class="l">Wrong</div></div>
      <div class="rst"><div class="n">${pct}%</div><div class="l">Score</div></div>
    </div>
    <div class="result-btns">
      ${!passed?`<button class="btn btn-gold btn-full" onclick="startExam('${es.trackId}')"><i class="ti ti-refresh"></i> Retake</button>`:''}
      <button class="btn btn-primary btn-full" onclick="goTrack()"><i class="ti ti-arrow-right"></i> Back to track</button>
    </div>`;
  showScreen('exam-result');
}

function finishLesson(){
  const ls=lessonState;
  const pct=Math.round(ls.correct/ls.questions.length*100);
  let stars=1;
  if(ls.wrong===0) stars=3;
  else if(ls.wrong<=1) stars=2;
  if(!S.tracks[ls.trackId]) S.tracks[ls.trackId]={lessons:{}};
  const prev=S.tracks[ls.trackId].lessons[ls.lessonId]||0;
  S.tracks[ls.trackId].lessons[ls.lessonId]=Math.max(prev,stars);
  if(S.lastStudied!==today()){
    const yesterday=new Date();yesterday.setDate(yesterday.getDate()-1);
    S.streak=S.lastStudied===yesterday.toDateString()?(S.streak||0)+1:1;
    S.lastStudied=today();
  }
  save();updateTopbar();

  const starsHtml=[1,2,3].map(i=>`<i class="ti ${i<=stars?'ti-star-filled':'ti-star'}" style="font-size:28px;color:${i<=stars?'var(--gold)':'var(--parch2)'};margin:0 3px;"></i>`).join('');

  document.getElementById('lesson-result-content').innerHTML=`
    <div class="result-icon green"><i class="ti ti-trophy"></i></div>
    <div class="result-title">Lesson complete!</div>
    <div style="margin-bottom:1rem;">${starsHtml}</div>
    <div class="result-sub">${pct}% correct · ${ls.xpEarned} XP earned</div>
    <div class="result-stats">
      <div class="rst"><div class="n">${ls.correct}</div><div class="l">Correct</div></div>
      <div class="rst"><div class="n">${ls.wrong}</div><div class="l">Wrong</div></div>
      <div class="rst"><div class="n">${ls.xpEarned}</div><div class="l">XP</div></div>
    </div>
    <div class="result-btns">
      ${ls.wrong>0?`<button class="btn btn-gold btn-full" onclick="retryLesson()"><i class="ti ti-refresh"></i> Improve score</button>`:''}
      <button class="btn btn-primary btn-full" onclick="goTrack()"><i class="ti ti-arrow-right"></i> Back to track</button>
      <button class="btn btn-full" onclick="openQuickPracticeSelect()"><i class="ti ti-bolt"></i> Quick Practice</button>
    </div>`;
  showScreen('lesson-result');
}

// ═══════════════════════════════════════════
// QUICK PRACTICE (post-quiz cross-track)
// ═══════════════════════════════════════════
let quickPracticeState=null;

function openQuickPracticeSelect(){
  const tracks=TRACKS.filter(t=>t.lessons&&t.lessons.length>0&&t.lessons.some(l=>l.questions&&l.questions.length>0));
  const overlay=document.createElement('div');
  overlay.id='quick-practice-overlay';
  overlay.className='quick-practice-overlay';
  overlay.innerHTML=`
    <div class="quick-practice-modal">
      <div class="qp-header">
        <div class="qp-eyebrow"><i class="ti ti-bolt"></i> Quick Practice</div>
        <h2>Choose a track</h2>
        <p>10 questions · no lives · any track</p>
      </div>
      <div class="qp-track-list">
        ${tracks.map(tr=>`
          <button class="qp-track-btn" onclick="startQuickPractice('${tr.id}')">
            <i class="ti ${tr.icon} qp-track-icon"></i>
            <div class="qp-track-text">
              <div class="qp-track-name">${tr.name}</div>
              <div class="qp-track-era">${tr.eyebrow||''}</div>
            </div>
            <i class="ti ti-chevron-right"></i>
          </button>`).join('')}
      </div>
      <button class="btn btn-ghost qp-cancel" onclick="document.getElementById('quick-practice-overlay').remove()">Cancel</button>
    </div>`;
  document.body.appendChild(overlay);
}

function startQuickPractice(trackId){
  const tr=TRACKS.find(t=>t.id===trackId);
  if(!tr)return;
  const overlay=document.getElementById('quick-practice-overlay');
  if(overlay)overlay.remove();

  const allQ=tr.lessons.flatMap(l=>l.questions||[]).filter(q=>q.type!=='tf'&&q.type!=='timeline');
  const pool=_weightedSample(allQ,10).map(q=>{
    if(q.type==='mc'||q.type==='quote'){
      const{opts,answerIdx}=buildMCOpts(q);
      return{...q,opts,answer:answerIdx};
    }
    if(q.type==='timeline'){
      const shuffled=shuffle(q.events);
      const sorted=[...q.events].sort((a,b)=>a.year-b.year);
      const order=sorted.map(ev=>shuffled.indexOf(ev));
      return{...q,shuffled,order,timelineStep:0};
    }
    return{...q};
  });

  quickPracticeState={trackId,trackName:tr.name,pool,qIdx:0,correct:0,total:0,answered:false,optionsRevealed:false};
  renderQuickPracticeQuestion();
  showScreen('quick-practice');
}

function renderQuickPracticeQuestion(){
  const qs=quickPracticeState;
  if(qs.qIdx>=qs.pool.length){
    finishQuickPractice();
    return;
  }
  const q=qs.pool[qs.qIdx];
  qs.answered=false;
  qs.optionsRevealed=false;
  const prog=`${qs.qIdx+1} / ${qs.pool.length}`;

  let qBody='';
  if(q.type==='mc'||q.type==='quote'){
    const quoteBlock=q.type==='quote'?`<div class="pull-quote" style="margin-bottom:1rem;"><p>${q.quote}</p><cite>${q.cite}</cite></div>`:'';
    qBody=quoteBlock+
      `<div class="options" id="qp-opts-container" style="display:none;">`+
        q.opts.map((o,i)=>`<button class="opt" onclick="selectQPOpt(${i})" id="qpopt-${i}"><span class="opt-letter">${'ABCD'[i]}</span>${o}</button>`).join('')+
      `</div>`+
      `<div class="learn-reveal-hint" id="qp-reveal-hint" onclick="revealQPOptions()"><span class="learn-reveal-key">Space</span> to reveal options</div>`;
  } else if(q.type==='tf'){
    qs.optionsRevealed=true;
    qBody=`<div class="options" id="qp-opts-container">
      <button class="opt" onclick="selectQPTF(true)" id="qptf-true"><span class="opt-letter">T</span>True</button>
      <button class="opt" onclick="selectQPTF(false)" id="qptf-false"><span class="opt-letter">F</span>False</button>
    </div>`;
  } else if(q.type==='timeline'){
    qs.optionsRevealed=false;
    qBody=`<div class="learn-reveal-hint" id="qp-reveal-hint" onclick="revealQPOptions()"><span class="learn-reveal-key">Space</span> to reveal options</div>`+
      `<div id="qp-timeline-container" style="display:none;flex-direction:column;gap:8px;margin-top:1rem;">`+
        q.shuffled.map((ev,i)=>`<button class="opt" onclick="selectQPTimeline(${i})" id="qptl-opt-${i}"><span class="opt-letter">·</span>${ev.label}</button>`).join('')+
      `</div>`;
  }

  document.getElementById('quick-practice-inner').innerHTML=`
    <div class="qp-topbar">
      <button class="back-btn" onclick="goHome()"><i class="ti ti-x"></i></button>
      <div class="qp-prog-wrap"><div class="qp-prog-bar" style="width:${(qs.qIdx/qs.pool.length)*100}%"></div></div>
      <div class="qp-prog-label">${prog}</div>
    </div>
    <div class="qp-question-wrap">
      <div class="qp-track-badge">${qs.trackName}</div>
      <div class="question-text">${q.q}</div>
      ${qBody}
      <div class="q-feedback" id="qp-feedback"></div>
      <button class="btn btn-primary continue-btn" id="qp-continue-btn" style="display:none;" onclick="nextQPQuestion()">
        <i class="ti ti-arrow-right"></i> Continue
      </button>
    </div>`;
}

function revealQPOptions(){
  const qs=quickPracticeState;
  if(!qs||qs.answered||qs.optionsRevealed)return;
  qs.optionsRevealed=true;
  document.getElementById('qp-reveal-hint')?.remove();
  const opts=document.getElementById('qp-opts-container');
  if(opts)opts.style.display='';
  const tl=document.getElementById('qp-timeline-container');
  if(tl)tl.style.display='flex';
}

function selectQPOpt(idx){
  const qs=quickPracticeState;
  if(qs.answered||!qs.optionsRevealed)return;
  qs.answered=true;
  const q=qs.pool[qs.qIdx];
  const correct=idx===q.answer;
  document.querySelectorAll('#qp-opts-container .opt').forEach(o=>{o.onclick=null;o.style.cursor='default';});
  document.getElementById('qpopt-'+q.answer).classList.add('correct');
  if(!correct)document.getElementById('qpopt-'+idx).classList.add('wrong');
  handleQPResult(correct,q.explain);
}

function selectQPTF(val){
  const qs=quickPracticeState;
  if(qs.answered)return;
  qs.answered=true;
  const q=qs.pool[qs.qIdx];
  const correct=val===q.answer;
  ['qptf-true','qptf-false'].forEach(id=>{const b=document.getElementById(id);if(b){b.onclick=null;b.style.cursor='default';}});
  const chosen=document.getElementById(val?'qptf-true':'qptf-false');
  const other=document.getElementById(val?'qptf-false':'qptf-true');
  if(correct){if(chosen)chosen.classList.add('correct');}
  else{if(chosen)chosen.classList.add('wrong');if(other)other.classList.add('correct');}
  handleQPResult(correct,q.explain);
}

function selectQPTimeline(displayIdx){
  const qs=quickPracticeState;
  if(qs.answered||!qs.optionsRevealed)return;
  const q=qs.pool[qs.qIdx];
  const expectedIdx=q.order[q.timelineStep];
  if(displayIdx===expectedIdx){
    q.timelineStep++;
    const btn=document.getElementById('qptl-opt-'+displayIdx);
    if(btn){btn.classList.add('tl-done');btn.onclick=null;btn.style.cursor='default';const l=btn.querySelector('.opt-letter');if(l)l.textContent=q.timelineStep;}
    if(q.timelineStep===q.events.length){qs.answered=true;handleQPResult(true,q.explain);}
  } else {
    const btn=document.getElementById('qptl-opt-'+displayIdx);
    if(btn){btn.classList.add('shake');setTimeout(()=>btn.classList.remove('shake'),450);}
    const fb=document.getElementById('qp-feedback');
    if(fb){fb.className='q-feedback show wrong';fb.innerHTML='<strong>Wrong order</strong> — keep trying.';}
  }
}

function handleQPResult(correct,explain){
  const qs=quickPracticeState;
  qs.total++;
  if(correct){qs.correct++;addXP(10);}
  const fb=document.getElementById('qp-feedback');
  if(fb){fb.className='q-feedback show '+(correct?'correct':'wrong');fb.innerHTML='<strong>'+(correct?'Correct!':'Wrong.')+'</strong> '+explain;}
  const btn=document.getElementById('qp-continue-btn');
  if(btn)btn.style.display='flex';
}

function nextQPQuestion(){
  quickPracticeState.qIdx++;
  renderQuickPracticeQuestion();
}

function finishQuickPractice(){
  const qs=quickPracticeState;
  const pct=Math.round((qs.correct/qs.total)*100);
  document.getElementById('quick-practice-inner').innerHTML=`
    <div class="qp-question-wrap" style="text-align:center;padding-top:3rem;">
      <div class="result-icon green"><i class="ti ti-bolt"></i></div>
      <div class="result-title">Practice done!</div>
      <div class="result-sub">${qs.correct} of ${qs.total} correct · ${pct}%</div>
      <div class="result-stats">
        <div class="rst"><div class="n">${qs.correct}</div><div class="l">Correct</div></div>
        <div class="rst"><div class="n">${qs.total-qs.correct}</div><div class="l">Wrong</div></div>
      </div>
      <div class="result-btns" style="margin-top:2rem;">
        <button class="btn btn-primary btn-full" onclick="openQuickPracticeSelect()"><i class="ti ti-bolt"></i> Another track</button>
        <button class="btn btn-full" onclick="goHome()"><i class="ti ti-home"></i> Home</button>
      </div>
    </div>`;
}

// ═══════════════════════════════════════════
// PRACTICE MODE
// ═══════════════════════════════════════════
let practiceState=null;

function openPracticeSelect(){
  const availableTracks=TRACKS.filter(t=>{
    if(!t.lessons||t.lessons.length===0)return false;
    const ts=S.tracks[t.id]||{lessons:{}};
    return t.lessons.some(l=>(ts.lessons[l.id]||0)>=1);
  });
  practiceState={selectedTracks:new Set(availableTracks.map(t=>t.id))};

  const c=document.getElementById('practice-select-inner');
  if(availableTracks.length===0){
    c.innerHTML=`
      <div class="practice-select-wrap">
        <div class="back-btn" onclick="goHome()"><i class="ti ti-arrow-left"></i> Home</div>
        <div class="practice-select-header">
          <div class="practice-select-eyebrow">Practice Mode</div>
          <h2>No lessons completed yet</h2>
          <p>Complete at least one lesson quiz to unlock Practice Mode.</p>
        </div>
      </div>`;
    showScreen('practice-select');
    return;
  }

  c.innerHTML=`
    <div class="practice-select-wrap">
      <div class="back-btn" onclick="goHome()"><i class="ti ti-arrow-left"></i> Home</div>
      <div class="practice-select-header">
        <div class="practice-select-eyebrow">Practice Mode</div>
        <h2>Choose your tracks</h2>
        <p>Questions come from completed lessons only. No lives, no limits.</p>
      </div>
      <div class="practice-track-list" id="practice-track-list">
        ${availableTracks.map(tr=>{
          const ts=S.tracks[tr.id]||{lessons:{}};
          const doneLessons=tr.lessons.filter(l=>(ts.lessons[l.id]||0)>=1);
          const qCount=doneLessons.reduce((s,l)=>s+l.questions.length,0);
          return `<div class="practice-track-card selected" id="ptc-${tr.id}" onclick="togglePracticeTrack('${tr.id}')">
            <div class="ptc-check"><i class="ti ti-check"></i></div>
            <div class="ptc-icon"><i class="ti ${tr.icon}"></i></div>
            <div class="ptc-text">
              <div class="ptc-name">${tr.name}</div>
              <div class="ptc-meta">${qCount} questions · ${doneLessons.length} of ${tr.lessons.length} lessons</div>
            </div>
          </div>`;
        }).join('')}
      </div>
      <button class="btn btn-primary btn-full practice-start-btn" onclick="beginPractice()">
        <i class="ti ti-play"></i> Start Practice
      </button>
    </div>`;
  showScreen('practice-select');
}

function togglePracticeTrack(trackId){
  if(!practiceState)return;
  if(practiceState.selectedTracks.has(trackId)){
    if(practiceState.selectedTracks.size<=1)return;
    practiceState.selectedTracks.delete(trackId);
    document.getElementById('ptc-'+trackId)?.classList.remove('selected');
  } else {
    practiceState.selectedTracks.add(trackId);
    document.getElementById('ptc-'+trackId)?.classList.add('selected');
  }
}

function _buildPracticePool(){
  const allQ=[];
  TRACKS.forEach(tr=>{
    if(!practiceState.selectedTracks.has(tr.id))return;
    const ts=S.tracks[tr.id]||{lessons:{}};
    tr.lessons.forEach(les=>{
      if((ts.lessons[les.id]||0)>=1) allQ.push(...les.questions);
    });
  });
  const filteredQ=allQ.filter(q=>q.type!=='tf'&&q.type!=='timeline');
  return _weightedSample(filteredQ,filteredQ.length).map(q=>{
    if(q.type==='mc'||q.type==='quote'){
      const{opts,answerIdx}=buildMCOpts(q);
      return{...q,opts,answer:answerIdx};
    }
    if(q.type==='timeline'){
      const shuffled=shuffle(q.events);
      const sorted=[...q.events].sort((a,b)=>a.year-b.year);
      const order=sorted.map(ev=>shuffled.indexOf(ev));
      return{...q,shuffled,order,timelineStep:0};
    }
    return q;
  });
}

function beginPractice(){
  if(!practiceState||practiceState.selectedTracks.size===0)return;
  practiceState={
    ...practiceState,
    pool:_buildPracticePool(),
    qIdx:0,
    correct:0,
    total:0,
    streak:0,
    answered:false,
  };
  renderPracticeQuestion();
  showScreen('practice');
}

function renderPracticeQuestion(){
  const ps=practiceState;
  // Interlude every 10 questions
  if(ps.total>0&&ps.total%10===0&&ps.lastInterludeAt!==ps.total){
    ps.lastInterludeAt=ps.total;
    ps.interlude=_buildPracticeInterlude();
    if(ps.interlude){renderPracticeInterlude();return;}
  }
  ps.interlude=null;
  if(ps.qIdx>=ps.pool.length){
    ps.pool=_buildPracticePool();
    ps.qIdx=0;
  }
  const q=ps.pool[ps.qIdx];
  ps.answered=false;

  ps.optionsRevealed=false;
  let qBody='';
  if(q.type==='mc'||q.type==='quote'){
    const quoteBlock=q.type==='quote'?`<div class="pull-quote" style="margin-bottom:1rem;"><p>${q.quote}</p><cite>${q.cite}</cite></div>`:'';
    qBody=quoteBlock+
      `<div class="options" id="practice-opts-container" style="display:none;">`+
        q.opts.map((o,i)=>`<button class="opt" onclick="selectPracticeOpt(${i})" id="popt-${i}"><span class="opt-letter">${'ABCD'[i]}</span>${o}</button>`).join('')+
      `</div>`+
      `<div class="learn-reveal-hint" id="practice-reveal-hint" onclick="revealPracticeOptions()"><span class="learn-reveal-key">Space</span> to reveal options</div>`;
  } else if(q.type==='timeline'){
    qBody=
      `<div id="practice-timeline-container" style="display:none;flex-direction:column;gap:8px;margin-top:1rem;">`+
        q.shuffled.map((ev,i)=>{
          const isDone=q.order.slice(0,q.timelineStep).includes(i);
          return`<button class="opt${isDone?' tl-done':''}" ${isDone?'disabled':`onclick="selectPracticeTimeline(${i})"`} id="ptl-opt-${i}"><span class="opt-letter">${isDone?(q.order.indexOf(i)+1):'·'}</span>${ev.label}</button>`;
        }).join('')+
      `</div>`+
      `<div class="learn-reveal-hint" id="practice-reveal-hint" onclick="revealPracticeOptions()"><span class="learn-reveal-key">Space</span> to reveal options</div>`;
  } else {
    ps.optionsRevealed=true;
    qBody=`<div class="tf-row">
      <button class="tf-btn" onclick="selectPracticeTF(true)" id="ptf-true"><i class="ti ti-check tf-icon"></i><span class="tf-label">True</span></button>
      <button class="tf-btn" onclick="selectPracticeTF(false)" id="ptf-false"><i class="ti ti-x tf-icon"></i><span class="tf-label">False</span></button>
    </div>`;
  }

  const acc=ps.total>0?Math.round(ps.correct/ps.total*100):100;
  const streakHtml=ps.streak>=3?`<span class="practice-stat"><i class="ti ti-flame practice-streak-fire"></i> <span class="streak-val">${ps.streak}</span></span>`:'';

  document.getElementById('practice-inner').innerHTML=`
    <div class="practice-header-bar">
      <button class="practice-exit-btn" onclick="goHome()"><i class="ti ti-x"></i></button>
      <div class="practice-stats-row">
        <span class="practice-stat"><i class="ti ti-check"></i> ${ps.correct}/${ps.total}</span>
        <span class="practice-stat">${acc}%</span>
        ${streakHtml}
      </div>
    </div>
    <div class="q-card" id="practice-q-card">
      <div class="q-card-header">
        <span class="q-era">${q.era||''}</span>
        <span class="q-type-badge">${q.type==='tf'?'True / False':q.type==='timeline'?'Order the timeline':q.type==='quote'?'Quote':'Multiple choice'}</span>
      </div>
      <div class="q-body">
        <div class="q-text">${q.q}</div>
        ${qBody}
      </div>
    </div>
    <div class="q-feedback" id="practice-feedback"></div>
    <button class="continue-btn" id="practice-continue-btn" style="display:none;" onclick="nextPracticeQ()">
      <i class="ti ti-arrow-right"></i> Next
    </button>`;
}

function revealPracticeOptions(){
  const ps=practiceState;
  if(!ps||ps.answered||ps.optionsRevealed)return;
  ps.optionsRevealed=true;
  const hint=document.getElementById('practice-reveal-hint');
  if(hint)hint.remove();
  const opts=document.getElementById('practice-opts-container');
  if(opts)opts.style.display='';
  const tl=document.getElementById('practice-timeline-container');
  if(tl)tl.style.display='flex';
}

function selectPracticeOpt(idx){
  const ps=practiceState;
  if(ps.answered||!ps.optionsRevealed)return;
  ps.answered=true;
  const q=ps.pool[ps.qIdx];
  const correct=idx===q.answer;
  document.querySelectorAll('#practice-opts-container .opt').forEach(o=>{o.onclick=null;o.style.cursor='default';});
  document.getElementById('popt-'+q.answer).classList.add('correct');
  if(!correct)document.getElementById('popt-'+idx).classList.add('wrong');
  handlePracticeResult(correct,q.explain);
}

function selectPracticeTF(val){
  const ps=practiceState;
  if(ps.answered)return;
  ps.answered=true;
  const q=ps.pool[ps.qIdx];
  const correct=val===q.answer;
  const trueBtn=document.getElementById('ptf-true');
  const falseBtn=document.getElementById('ptf-false');
  if(trueBtn){trueBtn.onclick=null;trueBtn.style.cursor='default';}
  if(falseBtn){falseBtn.onclick=null;falseBtn.style.cursor='default';}
  const chosenBtn=document.getElementById(val?'ptf-true':'ptf-false');
  const otherBtn=document.getElementById(val?'ptf-false':'ptf-true');
  if(correct){if(chosenBtn)chosenBtn.classList.add('correct');}
  else{if(chosenBtn)chosenBtn.classList.add('wrong');if(otherBtn)otherBtn.classList.add('correct');}
  handlePracticeResult(correct,q.explain);
}

function selectPracticeTimeline(displayIdx){
  const ps=practiceState;
  if(ps.answered||!ps.optionsRevealed)return;
  const q=ps.pool[ps.qIdx];
  const expectedIdx=q.order[q.timelineStep];
  if(displayIdx===expectedIdx){
    q.timelineStep++;
    const btn=document.getElementById('ptl-opt-'+displayIdx);
    if(btn){btn.classList.add('tl-done');btn.onclick=null;btn.style.cursor='default';const l=btn.querySelector('.opt-letter');if(l)l.textContent=q.timelineStep;}
    if(q.timelineStep===q.events.length){
      ps.answered=true;
      handlePracticeResult(true,q.explain);
    }
  } else {
    const btn=document.getElementById('ptl-opt-'+displayIdx);
    if(btn){btn.classList.add('shake');setTimeout(()=>btn.classList.remove('shake'),450);}
    const fb=document.getElementById('practice-feedback');
    fb.className='q-feedback show wrong';
    fb.innerHTML='<strong>Wrong order</strong> — keep trying.';
  }
}

function handlePracticeResult(correct,explain){
  const ps=practiceState;
  ps.total++;
  if(correct){
    ps.correct++;
    ps.streak++;
    addXP(10);
  } else {
    ps.streak=0;
    // Re-queue this question 3 cards later so it comes back soon
    const wrongQ=ps.pool[ps.qIdx];
    const insertAt=Math.min(ps.qIdx+3,ps.pool.length);
    ps.pool.splice(insertAt,0,wrongQ);
  }
  const fb=document.getElementById('practice-feedback');
  fb.className='q-feedback show '+(correct?'correct':'wrong');
  fb.innerHTML='<strong>'+(correct?'Correct!':'Wrong.')+'</strong> '+explain;
  const btn=document.getElementById('practice-continue-btn');
  if(btn)btn.style.display='flex';
}

function nextPracticeQ(){
  practiceState.qIdx++;
  renderPracticeQuestion();
}

// ─── Practice Interludes (Era / Person / Century-Match every 10 Qs) ──────────

function _buildPracticeInterlude(){
  const sel=practiceState.selectedTracks;
  const hasMedieval=sel.has('track3');
  const onlyMedieval=hasMedieval&&sel.size===1;
  if(onlyMedieval){
    return _buildCenturyMatchInterlude();
  }
  const builders=[];
  if(hasMedieval){
    const cm=_buildCenturyMatchInterlude();
    if(cm) builders.push(()=>cm);
  }
  builders.push(_buildEraInterlude);
  builders.push(_buildPersonInterlude);
  const choice=builders[Math.floor(Math.random()*builders.length)];
  return choice();
}

function _buildEraInterlude(){
  const pools=[A_ERA_EVENTS_1,A_ERA_EVENTS_2,A_ERA_EVENTS_3];
  const pool=pools[Math.floor(Math.random()*pools.length)];
  const WIN=24;
  const years=pool.map(e=>e.year);
  const minY=Math.min(...years),maxY=Math.max(...years);
  let ws,we,inside,outside;
  for(let t=0;t<10;t++){
    ws=Math.floor(Math.random()*(maxY-WIN-minY+1))+minY;
    we=ws+WIN;
    inside=pool.filter(e=>e.year>=ws&&e.year<=we);
    outside=pool.filter(e=>e.year<ws-5||e.year>we+5);
    if(inside.length>=1&&outside.length>=1)break;
  }
  const useInside=Math.random()<0.5;
  const candidates=useInside?inside:outside;
  if(!candidates||!candidates.length)return null;
  const ev=candidates[Math.floor(Math.random()*candidates.length)];
  return{type:'era',ws,we,ev,correctAnswer:useInside};
}

function _buildPersonInterlude(){
  const pools=[A_PERSON_POOL_1,A_PERSON_POOL_2,A_PERSON_POOL_3];
  const pool=pools[Math.floor(Math.random()*pools.length)];
  const person=pool[Math.floor(Math.random()*pool.length)];
  const useTrue=Math.random()<0.5;
  const stmts=useTrue?person.facts:person.foils;
  if(!stmts||!stmts.length)return null;
  const stmt=stmts[Math.floor(Math.random()*stmts.length)];
  return{type:'person',person,stmt,correctAnswer:useTrue};
}

function _collectMedievalCenturyPools(){
  const ts=(S.tracks&&S.tracks.track3&&S.tracks.track3.lessons)||{};
  const track=TRACKS.find(t=>t.id==='track3');
  const map=new Map();
  if(!track)return map;
  track.lessons.forEach(les=>{
    if((ts[les.id]||0)<1)return;
    les.questions.forEach(q=>{
      if(q.type!=='timeline'||!Array.isArray(q.events))return;
      q.events.forEach(ev=>{
        if(typeof ev.year!=='number'||!ev.label)return;
        const century=Math.ceil(ev.year/100);
        if(!map.has(century))map.set(century,[]);
        map.get(century).push({label:ev.label,year:ev.year,century});
      });
    });
  });
  return map;
}

function _buildCenturyMatchInterlude(){
  const map=_collectMedievalCenturyPools();
  if(map.size<3)return null;
  const centuries=[...map.keys()].sort((a,b)=>a-b);
  const pickedEvents=centuries.map(c=>{
    const pool=map.get(c);
    return pool[Math.floor(Math.random()*pool.length)];
  });
  const eventRows=shuffle(pickedEvents);
  const centuryRows=centuries.map(c=>({
    century:c,
    correctEventIdx:eventRows.findIndex(ev=>ev.century===c),
  }));
  return{
    type:'centuryMatch',
    centuryRows,
    eventRows,
    pairs:{},
    active:null,
    checked:false,
  };
}

function ordinalCentury(n){
  if(n>=11&&n<=13)return n+'th';
  const last=n%10;
  if(last===1)return n+'st';
  if(last===2)return n+'nd';
  if(last===3)return n+'rd';
  return n+'th';
}

function renderPracticeInterlude(){
  const ps=practiceState;
  const il=ps.interlude;
  if(!il){ps.interlude=null;renderPracticeQuestion();return;}
  if(il.type==='centuryMatch'){ps.answered=false;renderCenturyMatchInterlude();return;}
  ps.answered=false;
  const acc=ps.total>0?Math.round(ps.correct/ps.total*100):100;
  const streakHtml=ps.streak>=3?`<span class="practice-stat"><i class="ti ti-flame practice-streak-fire"></i> <span class="streak-val">${ps.streak}</span></span>`:'';
  let banner,prompt,btnYes,btnNo;
  if(il.type==='era'){
    banner=`<div class="pil-window-banner">${il.ws} – ${il.we}</div>`;
    prompt='Did this happen within this era?';
    btnYes=`<button class="pil-btn pil-yes" id="pil-yes" onclick="selectPracticeInterlude(true)"><span class="pil-key">1</span>In this era</button>`;
    btnNo=`<button class="pil-btn pil-no" id="pil-no" onclick="selectPracticeInterlude(false)"><span class="pil-key">2</span>Not in this era</button>`;
  } else {
    banner=`<div class="pil-person-banner">${il.person.name}<span class="pil-person-desc">${il.person.descriptor}</span></div>`;
    prompt=`Does this statement apply to ${il.person.name}?`;
    btnYes=`<button class="pil-btn pil-yes" id="pil-yes" onclick="selectPracticeInterlude(true)"><span class="pil-key">1</span>Yes, applies</button>`;
    btnNo=`<button class="pil-btn pil-no" id="pil-no" onclick="selectPracticeInterlude(false)"><span class="pil-key">2</span>Doesn't apply</button>`;
  }
  document.getElementById('practice-inner').innerHTML=`
    <div class="practice-header-bar">
      <button class="practice-exit-btn" onclick="goHome()"><i class="ti ti-x"></i></button>
      <div class="practice-stats-row">
        <span class="practice-stat"><i class="ti ti-check"></i> ${ps.correct}/${ps.total}</span>
        <span class="practice-stat">${acc}%</span>
        ${streakHtml}
      </div>
    </div>
    <div class="q-card pil-card">
      <div class="q-card-header">
        <span class="q-era">${il.type==='era'?'Era Check':'Person Check'}</span>
        <span class="q-type-badge">Yes / No</span>
      </div>
      <div class="q-body">
        ${banner}
        <div class="pil-prompt">${prompt}</div>
        <div class="q-text">${il.type==='era'?il.ev.label:il.stmt}</div>
        <div class="pil-btn-row">${btnYes}${btnNo}</div>
      </div>
    </div>
    <div class="q-feedback" id="practice-feedback"></div>
    <button class="continue-btn" id="practice-continue-btn" style="display:none;" onclick="nextPracticeQ()">
      <i class="ti ti-arrow-right"></i> Next
    </button>`;
}

function selectPracticeInterlude(answer){
  const ps=practiceState;
  if(!ps||!ps.interlude||ps.answered)return;
  ps.answered=true;
  const il=ps.interlude;
  const correct=answer===il.correctAnswer;
  const yesBtn=document.getElementById('pil-yes');
  const noBtn=document.getElementById('pil-no');
  if(yesBtn){yesBtn.onclick=null;yesBtn.style.cursor='default';}
  if(noBtn){noBtn.onclick=null;noBtn.style.cursor='default';}
  if(il.correctAnswer===true){
    if(yesBtn)yesBtn.classList.add('correct');
    if(!correct&&noBtn)noBtn.classList.add('wrong');
  } else {
    if(noBtn)noBtn.classList.add('correct');
    if(!correct&&yesBtn)yesBtn.classList.add('wrong');
  }
  ps.total++;
  if(correct){
    ps.correct++;
    ps.streak++;
    addXP(10);
  } else {
    ps.streak=0;
  }
  let explain='';
  if(il.type==='era'){
    explain=correct
      ?`Correct! This event (${il.ev.year}) ${il.correctAnswer?'falls within':'falls outside'} ${il.ws}–${il.we}.`
      :`This event was in ${il.ev.year}, which ${il.correctAnswer?'is within':'is outside'} ${il.ws}–${il.we}.`;
  } else {
    explain=correct
      ?`Correct! That ${il.correctAnswer?'does apply to':'does not apply to'} ${il.person.name}.`
      :`Actually, that ${il.correctAnswer?'does':'does not'} apply to ${il.person.name}.`;
  }
  const fb=document.getElementById('practice-feedback');
  fb.className='q-feedback show '+(correct?'correct':'wrong');
  fb.innerHTML='<strong>'+(correct?'Correct!':'Wrong.')+'</strong> '+explain;
  const btn=document.getElementById('practice-continue-btn');
  if(btn)btn.style.display='flex';
}

// ─── Century Match Interlude (Medieval practice) ──────────────────────────────

function renderCenturyMatchInterlude(){
  const ps=practiceState;
  const il=ps.interlude;
  const acc=ps.total>0?Math.round(ps.correct/ps.total*100):100;
  const streakHtml=ps.streak>=3?`<span class="practice-stat"><i class="ti ti-flame practice-streak-fire"></i> <span class="streak-val">${ps.streak}</span></span>`:'';

  // Map paired event row idx → century row idx (reverse lookup)
  const pairedEvent=new Map();
  Object.keys(il.pairs).forEach(k=>{pairedEvent.set(il.pairs[k],parseInt(k,10));});
  // Insertion order of paired centuries → pair number
  const orderOfPairs=Object.keys(il.pairs).map(k=>parseInt(k,10));
  const pairNumByCentury={};
  orderOfPairs.forEach((cIdx,i)=>{pairNumByCentury[cIdx]=i+1;});

  const centuryCells=il.centuryRows.map((row,i)=>{
    const isPaired=il.pairs[i]!==undefined;
    const isActive=il.active&&il.active.side==='c'&&il.active.idx===i;
    let cls='cmatch-cell cmatch-century';
    if(isActive)cls+=' active';
    if(isPaired)cls+=' paired';
    if(il.checked){
      const correct=il.pairs[i]===row.correctEventIdx;
      cls+=correct?' correct':' wrong';
    }
    const badge=isPaired?`<span class="cmatch-badge">${pairNumByCentury[i]}</span>`:'';
    const click=il.checked?'':`onclick="selectCenturyMatchCell('c',${i})"`;
    return`<button class="${cls}" ${click} ${il.checked?'disabled':''}>${ordinalCentury(row.century)} c.${badge}</button>`;
  }).join('');

  const eventCells=il.eventRows.map((ev,i)=>{
    const cIdx=pairedEvent.has(i)?pairedEvent.get(i):undefined;
    const isPaired=cIdx!==undefined;
    const isActive=il.active&&il.active.side==='e'&&il.active.idx===i;
    let cls='cmatch-cell cmatch-event';
    if(isActive)cls+=' active';
    if(isPaired)cls+=' paired';
    if(il.checked&&isPaired){
      const correct=il.centuryRows[cIdx].correctEventIdx===i;
      cls+=correct?' correct':' wrong';
    }
    const badge=isPaired?`<span class="cmatch-badge">${pairNumByCentury[cIdx]}</span>`:'';
    const click=il.checked?'':`onclick="selectCenturyMatchCell('e',${i})"`;
    return`<button class="${cls}" ${click} ${il.checked?'disabled':''}>${ev.label}${badge}</button>`;
  }).join('');

  const allPaired=Object.keys(il.pairs).length===il.centuryRows.length;
  const checkBtn=il.checked?'':`<button class="btn btn-primary cmatch-check-btn" ${allPaired?'':'disabled'} onclick="checkCenturyMatch()">Check matches</button>`;

  document.getElementById('practice-inner').innerHTML=`
    <div class="practice-header-bar">
      <button class="practice-exit-btn" onclick="goHome()"><i class="ti ti-x"></i></button>
      <div class="practice-stats-row">
        <span class="practice-stat"><i class="ti ti-check"></i> ${ps.correct}/${ps.total}</span>
        <span class="practice-stat">${acc}%</span>
        ${streakHtml}
      </div>
    </div>
    <div class="q-card pil-card">
      <div class="q-card-header">
        <span class="q-era">Century Match</span>
        <span class="q-type-badge">Matching</span>
      </div>
      <div class="q-body">
        <div class="pil-prompt">Match each century to one event that happened in it.</div>
        <div class="cmatch-grid">
          <div class="cmatch-col cmatch-col-left">${centuryCells}</div>
          <div class="cmatch-col cmatch-col-right">${eventCells}</div>
        </div>
        ${checkBtn}
      </div>
    </div>
    <div class="q-feedback" id="practice-feedback"></div>
    <button class="continue-btn" id="practice-continue-btn" style="display:${il.checked?'flex':'none'};" onclick="nextPracticeQ()">
      <i class="ti ti-arrow-right"></i> Next
    </button>`;
}

function selectCenturyMatchCell(side,idx){
  const ps=practiceState;
  const il=ps&&ps.interlude;
  if(!il||il.type!=='centuryMatch'||il.checked)return;
  const isPairedAt=(s,i)=>{
    if(s==='c')return il.pairs[i]!==undefined;
    return Object.keys(il.pairs).some(k=>il.pairs[k]===i);
  };
  const clearPairAt=(s,i)=>{
    if(s==='c'){delete il.pairs[i];}
    else{
      for(const k of Object.keys(il.pairs)){
        if(il.pairs[k]===i){delete il.pairs[k];break;}
      }
    }
  };
  if(il.active){
    if(il.active.side===side){
      if(il.active.idx===idx){
        il.active=null;
      } else {
        if(isPairedAt(side,idx))clearPairAt(side,idx);
        il.active={side,idx};
      }
    } else {
      // Opposite side click → form a pair
      const otherIdx=il.active.idx;
      const cIdx=side==='c'?idx:otherIdx;
      const eIdx=side==='e'?idx:otherIdx;
      clearPairAt('c',cIdx);
      clearPairAt('e',eIdx);
      il.pairs[cIdx]=eIdx;
      il.active=null;
    }
  } else {
    if(isPairedAt(side,idx))clearPairAt(side,idx);
    il.active={side,idx};
  }
  renderCenturyMatchInterlude();
}

function checkCenturyMatch(){
  const ps=practiceState;
  const il=ps&&ps.interlude;
  if(!il||il.type!=='centuryMatch'||il.checked)return;
  if(Object.keys(il.pairs).length!==il.centuryRows.length)return;
  il.checked=true;
  il.active=null;
  ps.answered=true;
  let correctCount=0;
  il.centuryRows.forEach((row,cIdx)=>{
    if(il.pairs[cIdx]===row.correctEventIdx)correctCount++;
  });
  const total=il.centuryRows.length;
  const allCorrect=correctCount===total;
  ps.total++;
  if(allCorrect){
    ps.correct++;
    ps.streak++;
  } else {
    ps.streak=0;
  }
  const xp=correctCount*5;
  if(xp>0)addXP(xp);
  let explain;
  if(allCorrect){
    explain=`All ${total} matched correctly. +${xp} XP.`;
  } else {
    const fixes=[];
    il.centuryRows.forEach((row,cIdx)=>{
      if(il.pairs[cIdx]!==row.correctEventIdx){
        const ev=il.eventRows[row.correctEventIdx];
        fixes.push(`${ordinalCentury(row.century)} c. → ${ev.label} (${ev.year})`);
      }
    });
    explain=`${correctCount}/${total} correct. +${xp} XP.<br><span class="cmatch-fix">${fixes.join('<br>')}</span>`;
  }
  renderCenturyMatchInterlude();
  const fb=document.getElementById('practice-feedback');
  if(fb){
    fb.className='q-feedback show '+(allCorrect?'correct':'wrong');
    fb.innerHTML='<strong>'+(allCorrect?'Correct!':'Not quite.')+'</strong> '+explain;
  }
}

// ═══════════════════════════════════════════
// MEDIEVAL CHURCH — TRACK 3 DATA
// 30-Lesson Track (Church-101-driven) · L1 Justinian, L2 Benedict revamped
// ═══════════════════════════════════════════

const M1_LEARN=[
  {sentence:"Justinian I ruled as Roman emperor from 527 to _____.",answer:"565",options:["565","604","525","553"],explanation:"Justinian's long reign (527–565) brought a last great burst of imperial power to the Eastern Roman Empire."},
  {sentence:"Justinian built the great church of Holy Wisdom, the _____ _____, in Constantinople.",answer:"Hagia Sophia",options:["Hagia Sophia","St. Peter's","Monte Cassino","Lateran Basilica"],explanation:"Hagia Sophia (\"Holy Wisdom\"), completed in 537, was reckoned the greatest church in all Christendom."},
  {sentence:"Justinian's codification of Roman _____ became the foundation of legal systems across Europe.",answer:"law",options:["law","music","liturgy","grammar"],explanation:"The Corpus Juris Civilis gathered centuries of Roman law into one system that still underlies European civil law."},
  {sentence:"As a defender of orthodoxy, Justinian closed the pagan schools of the philosophers in _____.",answer:"Athens",options:["Athens","Rome","Antioch","Alexandria"],explanation:"In 529 Justinian shut the ancient Neoplatonic schools of Athens, a symbolic end to classical paganism."},
  {sentence:"Justinian recovered imperial lands from the barbarians in North Africa and _____.",answer:"Italy",options:["Italy","Britain","Persia","Spain"],explanation:"His generals reconquered North Africa from the Vandals and Italy from the Ostrogoths, briefly restoring the old Roman Mediterranean."},
  {sentence:"Justinian sought to reconcile the _____ — who denied Christ's two natures — to the orthodox faith.",answer:"Monophysites",options:["Monophysites","Montanists","Donatists","Pelagians"],explanation:"The Monophysites held that Christ had only one (divine) nature. Justinian spent much of his reign trying to win them back to Chalcedonian orthodoxy."},
  {sentence:"Justinian persecuted the _____ as heretics and dealt a blow to paganism.",answer:"Montanists",options:["Montanists","Benedictines","Franks","Picts"],explanation:"Church 101 lists the Montanists among the heretical groups Justinian moved against as a self-styled defender of orthodoxy."},
  {sentence:"Hagia Sophia was considered the greatest church in all of _____.",answer:"Christendom",options:["Christendom","Italy","Asia","Egypt"],explanation:"The vast domed basilica in Constantinople was the architectural wonder of the Christian world for nearly a thousand years."},
  {sentence:"In 553 Justinian summoned the Second Council of _____ to settle the Three Chapters dispute.",answer:"Constantinople",options:["Constantinople","Nicaea","Chalcedon","Ephesus"],explanation:"The Second Council of Constantinople (553) condemned the \"Three Chapters\" in an effort to conciliate the Monophysites."},
  {sentence:"The Second Council of Constantinople (553) was the _____ ecumenical council.",answer:"fifth",options:["fifth","fourth","sixth","seventh"],explanation:"It is the fifth of the seven ecumenical councils — and the first to fall within the medieval era."},
  {sentence:"Justinian's habit of governing the church as well as the state is known as _____.",answer:"caesaropapism",options:["caesaropapism","monasticism","scholasticism","iconoclasm"],explanation:"Caesaropapism names the emperor's control over church affairs — calling councils, naming bishops, and defining orthodoxy. Justinian is its classic example."},
  {sentence:"Justinian's reign represented a renewed _____ for the Roman Empire in the sixth century.",answer:"greatness",options:["greatness","poverty","collapse","obscurity"],explanation:"For one generation Justinian restored the territory, law, and grandeur of the old empire before it slipped away again after his death."},
];

const M1_STUDY={
  cards:[{
    text:'Justinian I (527–565) gave the Eastern Roman Empire its last age of greatness: he reconquered North Africa and Italy, codified Roman law, and built Hagia Sophia. But he ruled the church as freely as the state — calling councils, appointing bishops, defining doctrine — the classic pattern of caesaropapism.',
    terms:[
      {word:'Hagia Sophia',def:'Justinian\'s great domed church of Holy Wisdom in Constantinople (completed 537), reckoned the greatest church in Christendom for nearly a thousand years. "Solomon, I have surpassed thee."'},
      {word:'Corpus Juris Civilis',def:'Justinian\'s great codification of Roman law (the "Code of Justinian"). It preserved Roman legal thought and became the foundation of civil law across medieval and modern Europe.'},
      {word:'Caesaropapism',def:'A system in which the emperor controls the church — summoning councils, appointing bishops, and defining doctrine. Justinian is the classic example.'},
      {word:'Monophysites',def:'Those who held that Christ had only one (divine) nature. Justinian spent much of his reign trying to win them back to Chalcedonian orthodoxy — with limited success.'},
      {word:'Second Council of Constantinople (553)',def:'The fifth ecumenical council, summoned by Justinian to condemn the "Three Chapters" and conciliate the Monophysites. The first great council of the medieval era.'},
    ],
    questions:[
      {q:'Why is Justinian remembered as both a great Christian emperor and an example of caesaropapism?',a:'Justinian poured imperial power into the church — building Hagia Sophia, defending orthodoxy, and summoning the Second Council of Constantinople. But he did so as the church\'s master, not its servant: he called councils, dictated theology, and pressured bishops. The same energy that adorned the church also subjected it to the throne.'},
    ]
  }],
  questions:[
    {q:'Why is Justinian remembered as both a great Christian emperor and an example of caesaropapism?',a:'Justinian poured imperial power into the church — building Hagia Sophia, defending orthodoxy, and summoning the Second Council of Constantinople. But he did so as the church\'s master, not its servant: he called councils, dictated theology, and pressured bishops. The same energy that adorned the church also subjected it to the throne.'},
  ]
};

const M1_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 2 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">Justinian I</h1>
<p class="article-sub">Emperor, lawgiver, builder · 527–565</p>
<div class="art-divider"></div>
<div class="article-body">
<p>The last Roman emperor to rule a Christian Mediterranean — and the man who set the church under the throne.</p>
<figure style="margin:1.75rem 0;border:1px solid rgba(20,8,12,0.1);border-radius:10px;overflow:hidden;">
  <img src="/images/middle-ages/HagiaSophia.jpeg" style="width:100%;display:block;object-fit:cover;object-position:top center;max-height:400px;">
  <figcaption><strong>Hagia Sophia, Constantinople · 537</strong> Justinian's domed Church of Holy Wisdom, reckoned the greatest church in Christendom. "Solomon, I have surpassed thee."</figcaption>
</figure>
<p>The sixth century opened with a final burst of imperial greatness. <strong>Justinian I (527–565)</strong> recovered large parts of the empire lost to the barbarians, reconquering <strong>North Africa</strong> from the Vandals and <strong>Italy</strong> from the Ostrogoths. His jurists gathered a thousand years of Roman law into the <strong>Corpus Juris Civilis</strong> — the "Code of Justinian" — which became the foundation of legal systems across Europe. And his builders raised the domed church of Holy Wisdom, <strong>Hagia Sophia</strong>, reckoned the greatest church in Christendom.</p>
<p>Justinian saw himself as the defender of orthodoxy. He dealt a blow to paganism by <strong>closing the schools of the philosophers in Athens</strong>, persecuted the <strong>Montanists</strong> as heretics, and labored to reconcile the <strong>Monophysites</strong> — who denied Christ's two natures — to the catholic faith. To that end he summoned the <strong>Second Council of Constantinople in 553</strong>, the fifth ecumenical council, to condemn the "Three Chapters" and conciliate the East. But Justinian governed the church as freely as he governed the state — the classic pattern later called <strong>caesaropapism</strong>: the emperor as master of the bishops, not their servant.</p>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">527</div><div class="atl-text">Justinian becomes emperor</div></div>
  <div class="atl-row"><div class="atl-year">529</div><div class="atl-text">Closes the pagan schools of Athens; first law code issued</div></div>
  <div class="atl-row"><div class="atl-year">537</div><div class="atl-text">Hagia Sophia completed in Constantinople</div></div>
  <div class="atl-row"><div class="atl-year">553</div><div class="atl-text">Second Council of Constantinople — the fifth ecumenical council</div></div>
</div>
<div class="pull-quote">
  <p>"Solomon, I have surpassed thee!"</p>
  <cite>— Justinian, on entering the finished Hagia Sophia (traditional)</cite>
</div>
</div>`;

// Wire track3 lesson data
const _track3=TRACKS.find(t=>t.id==='track3');

// ── Lesson 1 (intro) — The Medieval Church: A Thousand-Year Bridge ───────

const M0_LEARN=[
  {sentence:"The medieval church spans roughly a _____ years, from the fall of Rome to the Reformation.",answer:"thousand",options:["thousand","hundred","five hundred","two thousand"],explanation:"The Middle Ages run about a thousand years — from the collapse of Rome (c. 500) to the eve of the Reformation (c. 1500)."},
  {sentence:"The Western Roman Empire fell in the year _____.",answer:"476",options:["476","1054","800","1517"],explanation:"The deposition of the last western emperor in 476 is the traditional marker for the fall of Rome and the dawn of the medieval era."},
  {sentence:"The medieval era is often said to end with the _____ of the sixteenth century.",answer:"Reformation",options:["Reformation","Renaissance","Enlightenment","Crusades"],explanation:"Church history conventionally closes the Middle Ages at the eve of the Protestant Reformation — Luther's 95 Theses in 1517."},
  {sentence:"The medieval ideal of a unified Christian civilization across Europe is called _____.",answer:"Christendom",options:["Christendom","Byzantium","Catholicism","the Empire"],explanation:"Christendom names the medieval order: a Latin Church bound to political rulers under a shared Christian culture."},
  {sentence:"After Rome fell, the empire survived in the East as _____, ruled from Constantinople.",answer:"Byzantium",options:["Byzantium","Gaul","Persia","Egypt"],explanation:"While the West fragmented into kingdoms, the Roman Empire lived on in the East as Byzantium, governed from Constantinople."},
  {sentence:"Germanic _____ peoples — Franks, Goths, and Vandals — carved the old empire into new kingdoms.",answer:"barbarian",options:["barbarian","Roman","Slavic","nomadic"],explanation:"Franks in Gaul, Visigoths in Spain, Ostrogoths in Italy, and Vandals in North Africa divided the old Western Empire among themselves."},
  {sentence:"Amid the ruins of Rome, the one institution that survived to rebuild civilization was the _____.",answer:"Church",options:["Church","Senate","army","university"],explanation:"As Roman institutions collapsed, the Church alone kept the organization, learning, and authority to civilize the new peoples."},
  {sentence:"This track tells the medieval story century by century, from the 6th to the _____ century.",answer:"15th",options:["15th","12th","10th","20th"],explanation:"The track runs from the 6th century (Justinian) to the 15th (the Renaissance and the eve of the Reformation)."},
  {sentence:"This track opens the medieval story with the 6th-century emperor _____.",answer:"Justinian",options:["Justinian","Constantine","Charlemagne","Theodosius"],explanation:"Justinian I (527–565) dominates the sixth century with his reconquests, his law code, and the building of Hagia Sophia."},
  {sentence:"When the medieval church begins, the religion of _____ has not yet arisen — it comes in the 7th century.",answer:"Islam",options:["Islam","Christianity","Judaism","Buddhism"],explanation:"Islam arises in the seventh century, after the medieval church is already underway; its rise is a later turning point, not the starting context."},
  {sentence:"In 476 the last Roman emperor in the West was _____, a traditional marker for the fall of Rome.",answer:"deposed",options:["deposed","crowned","baptized","martyred"],explanation:"The deposition of Romulus Augustulus in 476 conventionally marks the end of the Western Roman Empire."},
  {sentence:"Schaff calls Christianity the connecting _____ between the ancient world and the new.",answer:"link",options:["link","wall","road","river"],explanation:"Christianity is the thread that \"saved the best elements of the old, and directed and moulded the new order of things.\""},
];

const M0_STUDY={
  cards:[{
    text:'Rome has fallen (476), Germanic kingdoms rule the West, and Byzantium survives in the East. For a thousand years — roughly 500 to 1500 — one institution holds the new world together: the Church. This track tells that story century by century.',
    terms:[
      {word:'The Middle Ages',def:'The roughly thousand-year era of church history between the fall of Rome (c. 500) and the Reformation (c. 1500) — the bridge from the ancient world to the modern one.'},
      {word:'Christendom',def:'The medieval ideal of a unified Christian civilization spanning Europe — a Latin Church bound to political rulers under a shared Christian order.'},
      {word:'Byzantium',def:'The Eastern Roman Empire that survived the fall of the West, ruled from Constantinople. While western Europe fragmented into barbarian kingdoms, Byzantium preserved Roman law, Greek learning, and the church\'s theological tradition.'},
      {word:'476',def:'The year the last western emperor was deposed — the traditional marker for the fall of Rome and the beginning of the medieval era.'},
      {word:'Germanic peoples',def:'Franks, Visigoths, Ostrogoths, and Vandals who carved the Western Empire into new kingdoms after Rome fell — the raw material the medieval church would work to Christianize over the following centuries.'},
    ],
    questions:[
      {q:'Why is the medieval church called a "bridge"?',a:'It connects two worlds. On one side lies the collapsed Greco-Roman civilization of antiquity; on the other, the Christian Europe that would produce the Reformation and the modern West. Across a thousand years the Church carried learning, faith, and order from the old world into the new — the connecting link between them.'},
    ]
  }],
  questions:[
    {q:'Why is the medieval church called a "bridge"?',a:'It connects two worlds. On one side lies the collapsed Greco-Roman civilization of antiquity; on the other, the Christian Europe that would produce the Reformation and the modern West. Across a thousand years the Church carried learning, faith, and order from the old world into the new — the connecting link between them.'},
  ]
};

const M0_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 1 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">The Medieval Church</h1>
<p class="article-sub">A thousand-year bridge · c. 500–1500</p>
<div class="art-divider"></div>
<div class="article-body">
<p>Before we meet the emperors, monks, and reformers of the Middle Ages, it helps to stand back and see the whole bridge they built.</p>
<figure style="margin:1.75rem 0;border:1px solid rgba(20,8,12,0.1);border-radius:10px;overflow:hidden;">
  <img src="/images/middle-ages/FallofRome.jpeg" style="width:100%;display:block;object-fit:cover;object-position:top center;max-height:400px;">
  <figcaption><strong>The Fall of Rome · 476</strong> The Western Empire collapses and the Greco-Roman order breaks apart — leaving the church to bind the new world together.</figcaption>
</figure>
<p>The medieval church is the long middle stretch of church history — roughly <strong>a thousand years</strong> between the fall of Rome and the Reformation. Historians date its beginning to the collapse of the <strong>Western Roman Empire in 476</strong> and its close to the eve of the Protestant <strong>Reformation</strong> around 1500 (Luther's 95 Theses, 1517). This track tells that story century by century, from the <strong>6th to the 15th</strong>.</p>
<p>When the medieval church begins, the old order is in ruins. In 476 the last emperor in the West was deposed, and the Greco-Roman civilization that had governed the Mediterranean was breaking apart. Germanic <strong>"barbarian" peoples</strong> — Franks in Gaul, Visigoths in Spain, Ostrogoths in Italy, Vandals in North Africa — carved the empire into new kingdoms. In the East, Rome survived as <strong>Byzantium</strong>, ruled from Constantinople, where the emperor Justinian would soon try to win it all back.</p>
<p>Amid the wreckage, one institution survived with its organization, learning, and authority intact: the <strong>Church</strong>. It would convert the new peoples, preserve antiquity's learning in its monasteries, and bind kings and bishops into a single Christian civilization called <strong>Christendom</strong>. Islam had not yet arisen; the papacy was only beginning to claim supremacy; the great councils, crusades, and cathedrals all lay ahead. This is where their thousand-year story begins.</p>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">476</div><div class="atl-text">Western Roman Empire falls — the medieval era dawns</div></div>
  <div class="atl-row"><div class="atl-year">527</div><div class="atl-text">Justinian's reign begins — this track's first lesson</div></div>
  <div class="atl-row"><div class="atl-year">800</div><div class="atl-text">Charlemagne crowned emperor — Christendom takes shape</div></div>
  <div class="atl-row"><div class="atl-year">1517</div><div class="atl-text">Reformation — the close of the Middle Ages</div></div>
</div>
<div class="pull-quote">
  <p>"The connecting link is Christianity, which saved the best elements of the old, and directed and moulded the new order of things."</p>
  <cite>— Philip Schaff, History of the Christian Church</cite>
</div>
</div>`;

_track3.lessons[0].articleHtml=M0_ARTICLE_HTML;
_track3.lessons[0].learn=M0_LEARN;
_track3.lessons[0].study=M0_STUDY;
_track3.lessons[0].coldOpen={_bg:'/images/middle-ages/FallofRome.jpeg',cards:[
  {label:'The World Before',text:'Rome has fallen. The empire that ruled the Mediterranean for centuries is breaking into pieces.',size:'lg'},
  {label:'The Question',text:'A thousand years stretch ahead — from the rubble of Rome to the eve of the Reformation. What happens in between?',size:'xl'},
  {label:'The Survivor',text:'One institution outlives the empire, intact: the Church.',size:'lg'},
  {label:'The Bridge',text:'Here is the whole arc — when the Middle Ages begin, when they end, and the broken world the church inherited at the start.',size:'md'},
]};

_track3.lessons[1].articleHtml=M1_ARTICLE_HTML;
_track3.lessons[1].learn=M1_LEARN;
_track3.lessons[1].study=M1_STUDY;
_track3.lessons[1].coldOpen={_bg:'/images/middle-ages/HagiaSophia.jpeg',cards:[
  {label:'The World Before',text:'The Western Empire has fallen. In the East, one emperor dreams of taking it all back.',size:'lg'},
  {label:'The Reign',text:'Reconquest, a code of law, and the greatest church ever built — all in one generation.',size:'xl'},
  {label:'The Key Figure',text:'Justinian I — emperor, lawgiver, builder, defender of orthodoxy.',size:'lg'},
  {label:'The Tension',text:'Here is how one ruler adorned the church with glory — and bound it to the throne.',size:'md'},
]};

// ── Lesson 2 — Benedict & the Holy Rule (c. 480–547) ────────────────────

const M2_LEARN=[
  {sentence:"Benedict withdrew from the city of _____ to live as a hermit.",answer:"Rome",options:["Rome","Athens","Milan","Ravenna"],explanation:"Repelled by the vice of Rome, the young Benedict left the city to seek God alone in the wilderness."},
  {sentence:"Around 525 Benedict gathered his community at Monte _____.",answer:"Cassino",options:["Cassino","Cluny","Cordoba","Carthage"],explanation:"Monte Cassino, a hilltop south of Rome, became the mother house of Western monasticism."},
  {sentence:"Benedict wrote his famous \"Holy _____\" for the life of his monks.",answer:"Rule",options:["Rule","Creed","Summa","Office"],explanation:"The Rule (Regula) ordered the government, worship, and daily work of the community."},
  {sentence:"Benedict is remembered as \"the patriarch of _____.\"",answer:"Monasticism",options:["Monasticism","the Papacy","Scholasticism","the Crusades"],explanation:"Because his Rule shaped nearly all later Western monks, Benedict is called the patriarch — the founding father — of monasticism."},
  {sentence:"Benedict's Rule ordered the government, worship, and daily _____ of the monks.",answer:"work",options:["work","warfare","trade","travel"],explanation:"Church 101 sums up the Rule as a pattern for \"the government, worship, and daily work\" of the community."},
  {sentence:"Benedict was born around 480 in the Italian town of _____.",answer:"Nursia",options:["Nursia","Nola","Nicaea","Nantes"],explanation:"He is called Benedict of Nursia after his birthplace in the mountains of central Italy."},
  {sentence:"The Benedictine motto \"ora et labora\" means \"pray and _____.\"",answer:"work",options:["work","rest","fast","sing"],explanation:"Benedict balanced prayer (ora) and manual labor (labora) so that neither idleness nor mere devotion could rule the day."},
  {sentence:"Others first came to Benedict not as students but as _____ who wished to share his life.",answer:"disciples",options:["disciples","soldiers","merchants","pilgrims"],explanation:"Benedict set out to be a solitary hermit, but disciples gathered around him until he had to organize them into a community."},
  {sentence:"Communal monastic life, lived together under a common rule, is called _____ monasticism.",answer:"cenobitic",options:["cenobitic","eremitic","mendicant","itinerant"],explanation:"Cenobitic (community) monasticism, which Benedict perfected, is contrasted with the eremitic (solitary hermit) life he began with."},
  {sentence:"The fixed cycle of daily prayer services that structured Benedict's day is called the Divine _____.",answer:"Office",options:["Office","Mass","Rule","Vigil"],explanation:"The Divine Office — the \"work of God\" (opus Dei) — gathered the monks for prayer and psalms at set hours through the day and night."},
  {sentence:"Our chief source for Benedict's life is the Dialogues of Pope _____ the Great.",answer:"Gregory",options:["Gregory","Leo","Innocent","Nicholas"],explanation:"Gregory the Great devoted Book II of his Dialogues to Benedict — the main early account of his life and miracles."},
  {sentence:"Benedictine monks took a distinctive vow of _____, binding them to one community for life.",answer:"stability",options:["stability","poverty","silence","pilgrimage"],explanation:"Alongside obedience and conversion of life, Benedict required stability — a monk stayed in his own house rather than wandering, giving Western monasticism its rootedness."},
];

const M2_STUDY={
  cards:[{
    text:'Benedict of Nursia (c. 480–547) withdrew from Rome to live as a hermit, but disciples gathered — and around 525 he founded Monte Cassino and wrote the Holy Rule that shaped Western monasticism for a thousand years. His motto: ora et labora — "pray and work."',
    terms:[
      {word:'The Rule (Regula)',def:'Benedict\'s short, practical guide for monastic life. It balances prayer, manual labor, and study, and governs everything from the abbot\'s authority to the hours of the Divine Office. It shaped Western monasticism for a thousand years.'},
      {word:'Monte Cassino',def:'The hilltop monastery in central Italy where Benedict settled around 525 and wrote the Holy Rule — the mother house of Western monasticism.'},
      {word:'Ora et labora',def:'"Pray and work" — Benedict\'s guiding balance. Neither idleness nor pure asceticism; each day divided among liturgy, labor, and reading.'},
      {word:'Cenobitic monasticism',def:'Monks living together in community under a common rule and abbot — as opposed to the eremitic (solitary hermit) life. Benedict\'s Rule made the cenobitic form the Western standard.'},
      {word:'Divine Office',def:'The fixed cycle of daily prayer services — morning, evening, and the night office — that structured Benedict\'s day and formed the monks around Scripture and the Psalms.'},
      {word:'Stability',def:'Benedict\'s distinctive vow binding each monk to one house for life — instead of wandering, each monk remained in his own community, giving Western monasticism its rootedness and permanence.'},
    ],
    questions:[
      {q:'Why did Benedict\'s Rule succeed where harsher monastic experiments failed?',a:'Benedict aimed at moderation. Instead of the extreme fasting and isolation of the Eastern hermits, his Rule balanced prayer, work, and study under a stable community and a fatherly abbot. That livable, ordered pattern — and the vow of stability that kept monks rooted in one house — let Benedictine monasticism spread across Europe and endure for centuries.'},
    ]
  }],
  questions:[
    {q:'Why did Benedict\'s Rule succeed where harsher monastic experiments failed?',a:'Benedict aimed at moderation. Instead of the extreme fasting and isolation of the Eastern hermits, his Rule balanced prayer, work, and study under a stable community and a fatherly abbot. That livable, ordered pattern — and the vow of stability that kept monks rooted in one house — let Benedictine monasticism spread across Europe and endure for centuries.'},
  ]
};

const M2_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 3 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">Benedict & the Holy Rule</h1>
<p class="article-sub">The patriarch of Monasticism · c. 480–547</p>
<div class="art-divider"></div>
<div class="article-body">
<p>One man's rule for a small community of monks quietly shaped the next thousand years of the Western church.</p>
<figure style="margin:1.75rem 0;border:1px solid rgba(20,8,12,0.1);border-radius:10px;overflow:hidden;">
  <img src="/images/middle-ages/IonaValley.jpeg" style="width:100%;display:block;object-fit:cover;object-position:top center;max-height:400px;">
  <figcaption><strong>The monastic age · 6th century</strong> Stone abbeys and high crosses became the enduring image of medieval monasticism — the way of life Benedict's Rule shaped for the West.</figcaption>
</figure>
<p>As the old order crumbled, monasticism flourished — and its life is mirrored in one man. <strong>Benedict of Nursia</strong>, born about 480, withdrew from the corruption of <strong>Rome</strong> to live as a hermit. But others came to share his life, and the solitary hermit became the head of a community — exchanging the <strong>eremitic</strong> (solitary) life for the <strong>cenobitic</strong> (communal) one, monks living together under a common rule, that his Rule would make the Western standard. Around <strong>525</strong> he relocated his monks to <strong>Monte Cassino</strong> and there wrote his famous <strong>"Holy Rule"</strong> — a short, practical guide to the government, worship, and daily work of the monks under his charge. The church remembers him as <strong>"the patriarch of Monasticism."</strong> Almost all we know of his life comes from the <strong>Dialogues</strong> of <strong>Gregory the Great</strong>, written a generation later.</p>
<p>The genius of the Rule was its balance. Against the wild austerities of the Eastern hermits, Benedict set a moderate, livable pattern summed up in the motto <strong>ora et labora</strong> — "pray and work." The day was divided between the <strong>Divine Office</strong> of prayer, manual labor, and the reading of Scripture, all under a fatherly abbot and a vow of <strong>stability</strong> that kept each monk rooted in his own house. That ordered life let Benedictine houses spread across Europe — and as Roman institutions failed, they became the libraries, schools, and farms that carried learning and the faith through the dark centuries to come.</p>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">c. 480</div><div class="atl-text">Benedict born at Nursia in central Italy</div></div>
  <div class="atl-row"><div class="atl-year">c. 500</div><div class="atl-text">Withdraws from Rome to live as a hermit</div></div>
  <div class="atl-row"><div class="atl-year">c. 525</div><div class="atl-text">Founds Monte Cassino; writes the Holy Rule</div></div>
  <div class="atl-row"><div class="atl-year">c. 547</div><div class="atl-text">Death of Benedict</div></div>
</div>
<div class="pull-quote">
  <p>"Idleness is the enemy of the soul."</p>
  <cite>— The Rule of St. Benedict, ch. 48</cite>
</div>
</div>`;

_track3.lessons[2].articleHtml=M2_ARTICLE_HTML;
_track3.lessons[2].learn=M2_LEARN;
_track3.lessons[2].study=M2_STUDY;
_track3.lessons[2].coldOpen={_bg:'/images/middle-ages/IonaValley.jpeg',cards:[
  {label:'The World Before',text:'Rome is a ruin of vice and violence. A young student turns his back on the city and walks into the hills.',size:'lg'},
  {label:'The Turn',text:'He wants only to be alone with God — but disciples keep finding him.',size:'xl'},
  {label:'The Key Figure',text:'Benedict of Nursia — hermit, abbot, and the patriarch of Monasticism.',size:'lg'},
  {label:'The Rule',text:'Here is how a short rule for a hilltop monastery became the blueprint for Christian Europe.',size:'md'},
]};

// ── Lesson 4 — Gregory the Great (590–604) ─────────────────────────────

const M4_LEARN=[
  {sentence:"Gregory the Great was elected bishop of Rome in the year _____.",answer:"590",options:["590","525","604","680"],explanation:"Gregory was elected pope in 590 and reigned until his death in 604.",tier:1},
  {sentence:"Gregory was the first _____ to become pope.",answer:"monk",options:["monk","Greek","emperor","cardinal"],explanation:"Before his election Gregory had sold his estates, founded monasteries, and become a monk — the first monk-pope.",tier:1},
  {sentence:"Gregory signed his letters \"servant of the servants of _____.\"",answer:"God",options:["God","Christ","Rome","saints"],explanation:"Servus servorum Dei — servant of the servants of God — became the standard papal self-title from Gregory onward.",tier:1},
  {sentence:"Gregory's handbook on the bishop's office is called the _____ Rule.",answer:"Pastoral",options:["Pastoral","Holy","Apostolic","Benedictine"],explanation:"The Liber Regulae Pastoralis — Pastoral Rule — became the bishop's handbook for the entire Middle Ages.",tier:1},
  {sentence:"In 596 Gregory sent the monk _____ to evangelize the Anglo-Saxons.",answer:"Augustine",options:["Augustine","Boniface","Patrick","Columba"],explanation:"Augustine of Canterbury led a band of forty monks into Kent in 596 at Gregory's command.",tier:1},
  {sentence:"Gregory's mission to England aimed to convert the _____.",answer:"Anglo-Saxons",options:["Anglo-Saxons","Vikings","Slavs","Franks"],explanation:"The Anglo-Saxons had pushed Christian Britons westward; Gregory sent Augustine to evangelize them in 596.",tier:1},
  {sentence:"Gregory made peace with the Germanic _____ who threatened Rome.",answer:"Lombards",options:["Lombards","Vandals","Saxons","Huns"],explanation:"Gregory negotiated with the Lombard kings to spare Rome — taking on the role the emperor had abandoned.",tier:1},
  {sentence:"Gregory's mass-conversion strategy produced what is often called _____ Christianity — form without power.",answer:"nominal",options:["nominal","apostolic","Eastern","reformed"],explanation:"Whole nations baptized at their kings' command yielded a nominal Christianity the church has wrestled with ever since.",tier:1},
  {sentence:"Gregory the Great died in the year _____.",answer:"604",options:["604","590","680","596"],explanation:"Gregory reigned as pope until his death in 604.",tier:1},
  {sentence:"Gregory codified the worship of the Western church, giving his name to Gregorian _____.",answer:"chant",options:["chant","mass","creed","prayer"],explanation:"Tradition links Gregory to the codified liturgy and plainchant of the Western church — Gregorian chant.",tier:1},
  {sentence:"The last great Christological council, Constantinople III, met in the year _____.",answer:"680",options:["680","553","787","451"],explanation:"Constantinople III (680–681) closed the long era of Christological councils that began at Nicaea.",tier:1},
  {sentence:"Constantinople III condemned _____, the teaching that Christ had only one will.",answer:"Monothelitism",options:["Monothelitism","Arianism","Nestorianism","Iconoclasm"],explanation:"Monothelitism — Christ having one will only, the divine — was condemned at Constantinople III in 680–681.",tier:1},
];

const M4_STUDY={
  cards:[{
    text:'Gregory the Great (c. 540–604), the first monk to become pope, fed Rome, made peace with the Lombards, wrote the bishop\'s handbook, codified Gregorian chant, and sent Augustine to evangelize the Anglo-Saxons. He signed every letter "servant of the servants of God."',
    terms:[
      {word:'Servus servorum Dei',def:'"Servant of the servants of God" — Gregory\'s self-title, used by every pope since. A deliberate inversion of imperial ambition.'},
      {word:'Pastoral Rule',def:'Gregory\'s handbook on the bishop\'s office — the most-copied book on ministry through the Middle Ages.'},
      {word:'Augustine of Canterbury',def:'The monk Gregory sent with forty companions to evangelize the Anglo-Saxons in 596 — the founding mission of the English church.'},
      {word:'Gregorian chant',def:'The codified liturgical plainchant of the Western church, traditionally linked to Gregory\'s ordering of worship.'},
      {word:'Nominal Christianity',def:'Mass baptism of peoples by royal decree that produces outward conformity without inward faith — a pattern Gregory\'s missionary strategy produced and the church has wrestled with ever since.'},
      {word:'Constantinople III (680–681)',def:'The sixth ecumenical council — the last great Christological council — which condemned Monothelitism a generation after Gregory\'s death, closing the long age of doctrinal controversy that began at Nicaea.'},
    ],
    questions:[],
  }],
  questions:[
    {q:'Why is Gregory\'s mass-conversion strategy both celebrated and criticized?',a:'Gregory rightly desired to bring the nations into the church and succeeded beyond any previous pope. But his method — sending missionaries who baptized whole peoples at their kings\' command — produced a nominal Christianity: the form of godliness without its power. The long medieval problem of people who were baptized but not converted, of parishes that were Christian in name but pagan in practice, traces directly to this moment. Gregory\'s zeal was real; his method\'s cost was real too.'},
  ],
};

const M4_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 4 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">Gregory the Great</h1>
<p class="article-sub">Servant of the servants of God · 590–604</p>
<div class="art-divider"></div>
<div class="article-body">
<p>When Italy lay in ruins and the emperors had abandoned Rome, a monk became its bishop — and the medieval papacy began.</p>
<figure style="margin:1.75rem 0;border:1px solid rgba(20,8,12,0.1);border-radius:10px;overflow:hidden;">
  <img src="/images/middle-ages/GregorytheGreat.jpeg" style="width:100%;display:block;object-fit:cover;object-position:top center;max-height:420px;">
  <figcaption><strong>Gregory the Great · 590–604</strong> Roman aristocrat, monk, and reluctant pope. He took the title "servant of the servants of God" and set the medieval papacy on its course.</figcaption>
</figure>
<p><strong>Gregory the Great (c. 540–604)</strong> was the son of a wealthy Roman senator who sold his estates, founded monasteries, and became a monk. Elected pope in <strong>590</strong>, he was the <strong>first monk to hold the office</strong>. He fed Rome from papal lands, made peace with the Germanic <strong>Lombards</strong> who threatened the city, codified the liturgy and chant that would carry his name (<strong>Gregorian chant</strong>), and wrote the <strong>Pastoral Rule</strong> — the handbook every medieval bishop would carry. He signed his letters <em>servus servorum Dei</em>, "<strong>servant of the servants of God</strong>" — a title every pope has used since.</p>
<p>Gregory's vision was to bring the nations into the church. In <strong>596</strong> he sent the monk <strong>Augustine of Canterbury</strong> with forty companions to evangelize the <strong>Anglo-Saxons</strong>. Whole peoples were baptized at their kings' command. But the Christianity that resulted was often a form of godliness without its power — a <strong>nominal Christianity</strong> the church has wrestled with ever since. A generation after Gregory's death, the empire's last great Christological council, <strong>Constantinople III (680–681)</strong>, would condemn <strong>Monothelitism</strong> — the teaching that Christ had only one will — closing the long doctrinal age that began at Nicaea.</p>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">590</div><div class="atl-text">Gregory elected pope — the first monk to hold the office</div></div>
  <div class="atl-row"><div class="atl-year">596</div><div class="atl-text">Augustine sent to the Anglo-Saxons</div></div>
  <div class="atl-row"><div class="atl-year">604</div><div class="atl-text">Gregory dies</div></div>
  <div class="atl-row"><div class="atl-year">680–681</div><div class="atl-text">Constantinople III condemns Monothelitism</div></div>
</div>
<div class="pull-quote">
  <p>"Servant of the servants of God."</p>
  <cite>— Gregory's title for himself, used by every pope since</cite>
</div>
</div>`;

_track3.lessons[3].articleHtml=M4_ARTICLE_HTML;
_track3.lessons[3].learn=M4_LEARN;
_track3.lessons[3].study=M4_STUDY;
_track3.lessons[3].coldOpen={_bg:'/images/middle-ages/GregorytheGreat.jpeg',cards:[
  {label:'The World Before',text:'Italy is shattered — Rome plundered, schools shut, the emperor far away in Constantinople.',size:'lg'},
  {label:'The Crisis',text:'The Lombards are at the gates. A senator\'s son who became a monk is dragged from his cell and made pope.',size:'xl'},
  {label:'The Key Figures',text:'Gregory of Rome. Augustine, sent to the Angles. The Lombard kings who let Rome breathe.',size:'lg'},
  {label:'The Bridge',text:'Here is how a sick monk on a sickbed shaped the medieval papacy — and the long shadow of mass conversion without conversion.',size:'md'},
]};

// ── Lesson 5 — Mohammed & the Rise of Islam (7th c.) ────────────────────

const M5_LEARN=[
  {sentence:"Mohammed was born in the Arabian city of _____.",answer:"Mecca",options:["Mecca","Medina","Jerusalem","Damascus"],explanation:"Mohammed was born in Mecca in the late sixth century to a Quraysh family.",tier:1},
  {sentence:"The flight of Mohammed from Mecca to Medina in 622 is called the _____.",answer:"Hijra",options:["Hijra","Hajj","Jihad","Sunna"],explanation:"The Hijra (622) is the event from which Muslims date their calendar — Year One.",tier:1},
  {sentence:"Mohammed fled in 622 to the city of _____.",answer:"Medina",options:["Medina","Mecca","Jerusalem","Baghdad"],explanation:"Rejected at Mecca, Mohammed found his early following in Medina after the Hijra of 622.",tier:1},
  {sentence:"Mohammed claimed his first visions were of the archangel _____.",answer:"Gabriel",options:["Gabriel","Michael","Uriel","Raphael"],explanation:"Mohammed claimed Gabriel called him to be the prophet of Allah.",tier:1},
  {sentence:"Mohammed died in the year _____.",answer:"632",options:["632","622","570","711"],explanation:"After Mohammed's death in 632, his successors launched the conquests that swept the Near East and North Africa.",tier:1},
  {sentence:"The Muslim god is called _____.",answer:"Allah",options:["Allah","Yahweh","El","Brahma"],explanation:"Mohammed preached strict monotheism: there is no god but Allah.",tier:1},
  {sentence:"The Arabic word \"Islam\" means _____.",answer:"submission",options:["submission","peace","prayer","fasting"],explanation:"Islam means submission — to the will of Allah.",tier:1},
  {sentence:"Islam denied the _____ of Christ.",answer:"deity",options:["deity","humanity","resurrection","existence"],explanation:"Mohammed denied that Jesus is God, and also denied that Christ died on the cross.",tier:1},
  {sentence:"Mohammed denied that Christ died on the _____.",answer:"cross",options:["cross","Sabbath","feast","stone"],explanation:"Islam teaches that Christ did not actually die on the cross — denying the substitutionary atonement at the heart of the gospel.",tier:1},
  {sentence:"Islam advanced through Spain until the Frankish armies stopped it at _____ in 732.",answer:"Tours",options:["Tours","Poitiers","Toledo","Granada"],explanation:"Charles Martel halted the Muslim advance into western Europe at the Battle of Tours in 732.",tier:1},
  {sentence:"Within eighty years Islam had conquered Syria, Palestine, Egypt, and _____ Africa.",answer:"North",options:["North","South","East","West"],explanation:"Antioch, Alexandria, and Carthage — among the oldest Christian centers — fell to Islamic armies in a single generation.",tier:1},
  {sentence:"Mohammed taught that salvation comes through submission to Allah, not through a substitutionary _____.",answer:"atonement",options:["atonement","prayer","pilgrimage","baptism"],explanation:"Islam offers no substitutionary atonement — no Christ bearing the sins of fallen humanity on the cross.",tier:1},
];

const M5_STUDY={
  cards:[{
    text:'Mohammed claimed the angel Gabriel commissioned him as Allah\'s prophet. Rejected in Mecca, he fled to Medina in 622 — the Hijra. Within a century of his death, Arab armies had swept Syria, Egypt, North Africa, and Spain. The historic heartlands of the ancient church were gone.',
    terms:[
      {word:'Hijra',def:'Mohammed\'s flight from Mecca to Medina in 622 — the founding event of Islam and the start of the Muslim calendar.'},
      {word:'Substitutionary atonement',def:'The Christian teaching that Christ bore the sins of mankind on the cross — explicitly denied by Islam, which teaches that submission (islam) to Allah is the path of salvation.'},
      {word:'Tours (732)',def:'The battle where Charles Martel halted the Arab advance into western Europe — the high-water mark of the early Islamic conquests.'},
      {word:'Caliphate',def:'The Islamic political and religious succession after Mohammed\'s death (632), under which the Arab armies conquered Syria, Palestine, Egypt, North Africa, and Spain within eighty years.'},
      {word:'Antioch, Alexandria, Carthage',def:'Three of the ancient church\'s greatest centers — all lost to Islam within a century of Mohammed, reducing their Christian communities to minorities under Muslim rule.'},
    ],
    questions:[],
  }],
  questions:[
    {q:'What are Islam\'s core theological differences from Christianity, and why do they matter?',a:'Islam denies the two things at the heart of Christian faith: the divinity of Christ and his death on the cross. Where Christianity teaches that God himself became man to bear our sins in substitutionary sacrifice, Islam teaches that salvation comes through submission (islam) to God\'s commands — a religion of moral achievement, not of a Savior. These are not peripheral differences; they touch the very nature of God and the nature of salvation. A Christ who did not die and is not God cannot be the Redeemer.'},
  ],
};

const M5_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 5 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">Mohammed &amp; the Rise of Islam</h1>
<p class="article-sub">Hijra to conquest · 7th century</p>
<div class="art-divider"></div>
<div class="article-body">
<p>In a single generation, half the Christian world fell to a new faith.</p>
<figure style="margin:1.75rem 0;border:1px solid rgba(20,8,12,0.1);border-radius:10px;overflow:hidden;">
  <img src="/images/middle-ages/Mosque.jpeg" style="width:100%;display:block;object-fit:cover;object-position:top center;max-height:400px;">
  <figcaption><strong>The rise of Islam · 7th century</strong> Within a hundred years of Mohammed, Muslim armies had taken Syria, Egypt, North Africa, and Spain — lands the church had held for centuries.</figcaption>
</figure>
<p><strong>Mohammed</strong> was born in <strong>Mecca</strong> in the late sixth century. A trader who had married a wealthy older widow, he met Jews and Christians on his caravans — often from heterodox sects — and around the age of forty claimed visions of the archangel <strong>Gabriel</strong> calling him to be the prophet of <strong>Allah</strong>. Mecca rejected him. In <strong>622</strong> he fled to <strong>Medina</strong> — the <strong>Hijra</strong>, the flight from which Muslims date their calendar — and within a decade had gathered fifty thousand followers.</p>
<p>After Mohammed's death in <strong>632</strong>, his armies swept out of Arabia. Within eighty years Islam had taken <strong>Syria, Palestine, Egypt, and North Africa</strong>, advancing through Spain until the Frankish armies turned them back at <strong>Tours in 732</strong>. The historic Christian heartlands of Antioch, Alexandria, and Carthage were destroyed or reduced to oppressed minorities. Mohammed denied the <strong>deity of Christ</strong> and that Christ died on the <strong>cross</strong>. He taught that salvation comes through <em>islam</em> — <strong>submission</strong> — to Allah, not through grace in a <strong>substitutionary atonement</strong>. A manmade religion, in the end, cannot offer what only God can give in Christ.</p>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">622</div><div class="atl-text">The Hijra — Mohammed flees Mecca for Medina</div></div>
  <div class="atl-row"><div class="atl-year">632</div><div class="atl-text">Mohammed dies; the Arab conquests begin</div></div>
  <div class="atl-row"><div class="atl-year">732</div><div class="atl-text">Charles Martel halts the advance at Tours</div></div>
</div>
</div>`;

_track3.lessons[4].articleHtml=M5_ARTICLE_HTML;
_track3.lessons[4].learn=M5_LEARN;
_track3.lessons[4].study=M5_STUDY;
_track3.lessons[4].coldOpen={_bg:'/images/middle-ages/Mosque.jpeg',cards:[
  {label:'The World Before',text:'Arabia sits on the edge of the Persian and Byzantine empires. Caravan routes wind through Mecca, where pagan tribes ring a stone called the Kaaba.',size:'lg'},
  {label:'The Crisis',text:'A trader claims an angel speaks to him. Driven out of his city, he gathers an army.',size:'xl'},
  {label:'The Key Figures',text:'Mohammed of Mecca. The followers of the Hijra. Charles Martel at Tours.',size:'lg'},
  {label:'The Bridge',text:'Here is how a new faith, in eighty years, took half the Christian world.',size:'md'},
]};

// ── Lesson 6 — The Synod of Whitby (664) ─────────────────────────────────

const M6_LEARN=[
  {sentence:"The Synod of Whitby met in the year _____.",answer:"664",options:["664","680","732","597"],explanation:"The Synod of Whitby was convened in 664 to settle the Easter dispute between Celtic and Roman Christians in England.",tier:1},
  {sentence:"The synod was hosted by Abbess _____ at her double monastery.",answer:"Hilda",options:["Hilda","Clotilde","Scholastica","Brigid"],explanation:"Hilda, founder and abbess of the double monastery at Whitby, hosted the synod.",tier:1},
  {sentence:"The synod was held at the monastery of _____.",answer:"Whitby",options:["Whitby","Iona","Canterbury","Lindisfarne"],explanation:"The synod takes its name from Whitby, the Yorkshire monastery where it was held.",tier:1},
  {sentence:"The king who ruled the synod's verdict was _____ of Northumbria.",answer:"Oswiu",options:["Oswiu","Alfred","Egbert","Ethelbert"],explanation:"Oswiu, king of Northumbria, heard both sides and ruled in favor of Rome.",tier:1},
  {sentence:"The chief disputed issue at Whitby was the date of _____.",answer:"Easter",options:["Easter","Pentecost","Christmas","Lent"],explanation:"The Roman and Celtic missions used different reckonings for Easter — sometimes weeks apart.",tier:1},
  {sentence:"The other disputed issue at Whitby was the shape of the priest's _____.",answer:"tonsure",options:["tonsure","habit","cross","staff"],explanation:"Roman and Celtic clergy shaved their hair in different patterns — the tonsure.",tier:1},
  {sentence:"Oswiu ruled in favor of the _____ practice.",answer:"Roman",options:["Roman","Celtic","Greek","Frankish"],explanation:"Oswiu's decision anchored English Christianity to the wider Latin church.",tier:1},
  {sentence:"The Celtic mission to Northumbria had been planted from the island monastery of _____.",answer:"Iona",options:["Iona","Whitby","Lindisfarne","Canterbury"],explanation:"Iona, founded by Columba, sent Aidan to plant the Celtic mission at Lindisfarne in 635.",tier:1},
  {sentence:"The Celtic monastery in Northumbria stood on the tidal island of _____.",answer:"Lindisfarne",options:["Lindisfarne","Iona","Whitby","Jarrow"],explanation:"Aidan founded the Celtic mission at Lindisfarne in 635, on the Northumbrian coast.",tier:1},
  {sentence:"Oswiu sided with Rome because the apostle _____ held the keys of the kingdom.",answer:"Peter",options:["Peter","Paul","John","Andrew"],explanation:"Oswiu said he would not contradict the keeper of the keys of heaven — Peter, whose authority Rome claimed.",tier:1},
  {sentence:"While the synod debated Easter, Islam was conquering Syria, Palestine, Egypt, and _____ Africa.",answer:"North",options:["North","South","East","West"],explanation:"The synod has become a parable: the church can debate secondary issues while losing the lands of the Great Commission.",tier:1},
  {sentence:"The Roman mission to England had been planted by _____ at Canterbury in 597.",answer:"Augustine",options:["Augustine","Boniface","Patrick","Columba"],explanation:"Pope Gregory the Great sent Augustine of Canterbury to the Anglo-Saxons in 596–597.",tier:1},
];

const M6_STUDY={
  cards:[{
    text:'Two Christianities had grown in Britain — Roman from the south, Celtic from Iona in the north — using different Easter calendars and different tonsures. In 664 King Oswiu ruled for Rome at Whitby, anchoring England to the wider Latin church. The church was debating haircuts while Islam swept the ancient Christian lands of the East.',
    terms:[
      {word:'Tonsure',def:'The shaved haircut of clergy and monks. Roman and Celtic clergy used different patterns — one of the two disputes settled at Whitby.'},
      {word:'Iona',def:'The Scottish island monastery founded by Columba in 563, from which the Celtic mission spread across Northumbria into England.'},
      {word:'Lindisfarne',def:'The tidal-island monastery in Northumbria founded by Aidan from Iona in 635 — the heart of the Celtic mission in England.'},
      {word:'Oswiu of Northumbria',def:'The king who ruled at Whitby. He sided with Rome on the ground that Peter holds the keys of heaven — a theological claim as much as a political one.'},
      {word:'Abbess Hilda',def:'The abbess of the double monastery at Whitby who hosted the 664 synod — a woman of great learning and authority who herself sided with the Celtic tradition.'},
    ],
    questions:[],
  }],
  questions:[
    {q:'Why did Oswiu\'s decision at Whitby matter beyond just settling Easter dates?',a:'The technical question at Whitby — which calendar, which tonsure — was real but secondary. The bigger question was which tradition would define English Christianity: the Irish-Celtic stream from Iona, or the Roman stream from Canterbury. Oswiu\'s choice for Rome bound England to the wider Latin church and to the papacy, making the English church one of Rome\'s most loyal outposts for centuries. And the lesson the church has drawn from Whitby is the parable: while the bishops debated secondary issues, Islam was taking the ancient Christian world.'},
  ],
};

const M6_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 6 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">The Synod of Whitby</h1>
<p class="article-sub">Tonsures and Easter while Islam swept · 664</p>
<div class="art-divider"></div>
<div class="article-body">
<p>Bishops in northern England argued about haircuts while Islam took half the church's lands.</p>
<figure style="margin:1.75rem 0;border:1px solid rgba(20,8,12,0.1);border-radius:10px;overflow:hidden;">
  <img src="/images/middle-ages/Whitbey.jpeg" style="width:100%;display:block;object-fit:cover;object-position:top center;max-height:400px;">
  <figcaption><strong>Whitby Abbey, Northumbria · 664</strong> On this windswept headland the Synod of Whitby chose the Roman date of Easter and the Roman tonsure over Celtic practice — binding Britain to Rome.</figcaption>
</figure>
<p>Two Christianities had been quietly growing in Britain. The <strong>Roman mission</strong> planted at Canterbury by <strong>Augustine</strong> in 597 kept Rome's date for Easter and the Roman <strong>tonsure</strong>. The <strong>Celtic mission</strong> from <strong>Iona</strong> and <strong>Lindisfarne</strong>, founded by Irish monks, kept an older Easter reckoning and a different tonsure. One royal household ended up celebrating <strong>Easter</strong> while the other still fasted for Lent. In <strong>664</strong>, <strong>Abbess Hilda</strong> hosted a synod at her double monastery in <strong>Whitby</strong> to settle it. <strong>King Oswiu of Northumbria</strong> heard both sides and ruled in favor of <strong>Rome</strong> — anchoring English Christianity to the wider Latin church.</p>
<p>Whitby decided a real question. But it is remembered as a parable. In the very years bishops in England disputed haircuts and calendars, Islam was sweeping out of Arabia, taking Syria, Palestine, Egypt, and most of <strong>North Africa</strong>. The church can wrestle endlessly over secondary issues while losing the lands of the Great Commission. Oswiu's reason for siding with Rome was disarmingly simple — <strong>Peter</strong> holds the keys of the kingdom; he would not contradict the doorkeeper.</p>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">597</div><div class="atl-text">Augustine plants the Roman mission at Canterbury</div></div>
  <div class="atl-row"><div class="atl-year">635</div><div class="atl-text">Aidan founds the Celtic mission at Lindisfarne</div></div>
  <div class="atl-row"><div class="atl-year">664</div><div class="atl-text">Synod of Whitby — Oswiu rules for Rome</div></div>
</div>
<div class="pull-quote">
  <p>"I will not contradict the keeper of the keys of heaven."</p>
  <cite>— King Oswiu of Northumbria, paraphrased from Bede</cite>
</div>
</div>`;

_track3.lessons[5].articleHtml=M6_ARTICLE_HTML;
_track3.lessons[5].learn=M6_LEARN;
_track3.lessons[5].study=M6_STUDY;
_track3.lessons[5].coldOpen={_bg:'/images/middle-ages/Whitbey.jpeg',cards:[
  {label:'The World Before',text:'Two Christianities are growing in Britain — Roman from the south, Celtic from the north — using different calendars.',size:'lg'},
  {label:'The Crisis',text:'The Northumbrian king celebrates Easter while his wife still keeps Lent. Something has to give.',size:'xl'},
  {label:'The Key Figures',text:'Abbess Hilda hosts. King Oswiu rules. The bishops speak for Rome and for Iona.',size:'lg'},
  {label:'The Bridge',text:'Here is how a synod about haircuts revealed what the church loses when secondary issues become primary.',size:'md'},
]};

// ── Lesson 7 — Maximus the Confessor & the Two Wills of Christ (633–681) ─

const M31_LEARN=[
  {sentence:"The 7th-century doctrine that Christ had only one will was called _____.",answer:"Monothelitism",options:["Monothelitism","Monophysitism","Nestorianism","Iconoclasm"],explanation:"Monothelitism — Greek for 'one will' — held that the incarnate Christ had a single, divine will.",tier:1},
  {sentence:"Maximus the Confessor insisted that Christ has _____ wills.",answer:"two",options:["two","one","three","no"],explanation:"Maximus defended dyothelitism: Christ has two wills, divine and human.",tier:1},
  {sentence:"Christ's two wills correspond to his two _____.",answer:"natures",options:["natures","persons","energies","names"],explanation:"Two natures, divine and human, defined at Chalcedon, imply two wills.",tier:1},
  {sentence:"A human will that Christ did not assume would be a human will left _____.",answer:"unhealed",options:["unhealed","unspoken","unseen","unbroken"],explanation:"What is not assumed is not healed — so Christ had to take a real human will to redeem ours.",tier:1},
  {sentence:"In Gethsemane Christ's human will freely _____ to the divine: 'not my will, but thine.'",answer:"submitted",options:["submitted","vanished","objected","ascended"],explanation:"Gethsemane shows a genuine human will choosing to submit — proof Christ had one.",tier:1},
  {sentence:"Emperor _____ promoted the one-will teaching to win back the Monophysites.",answer:"Heraclius",options:["Heraclius","Justinian","Leo III","Constantine"],explanation:"Heraclius backed Monothelitism as a compromise with the Monophysite provinces.",tier:1},
  {sentence:"In 638 Heraclius proclaimed one will in a decree called the _____.",answer:"Ecthesis",options:["Ecthesis","Typos","Henotikon","Tome"],explanation:"The Ecthesis of 638 was Heraclius's decree affirming a single will in Christ.",tier:1},
  {sentence:"Emperor Constans II forbade all debate over the wills in his 648 edict, the _____.",answer:"Typos",options:["Typos","Ecthesis","Henotikon","Filioque"],explanation:"The Typos of 648 banned discussion of one or two wills — the silence Maximus refused to keep.",tier:1},
  {sentence:"Maximus and Pope _____ condemned Monothelitism at the Lateran Synod of 649.",answer:"Martin I",options:["Martin I","Gregory I","Leo III","Nicholas I"],explanation:"Pope Martin I joined Maximus at the Lateran Synod of 649 and was himself arrested for it.",tier:1},
  {sentence:"To silence him, Maximus's persecutors cut out his tongue and cut off his right _____.",answer:"hand",options:["hand","foot","ear","arm"],explanation:"They mutilated him to stop him speaking and writing; he died in exile in 662.",tier:1},
  {sentence:"Maximus died in exile in the year _____, earning the title 'the Confessor.'",answer:"662",options:["662","638","681","649"],explanation:"He died in 662 — a 'confessor' who suffered for the faith without being executed outright.",tier:1},
  {sentence:"Maximus was vindicated at the Third Council of _____ in 680–681.",answer:"Constantinople",options:["Constantinople","Nicaea","Ephesus","Chalcedon"],explanation:"The Third Council of Constantinople, the sixth ecumenical council, affirmed two wills in Christ.",tier:1},
];

const M31_STUDY={
  cards:[{
    text:'In the 7th century the emperors promoted Monothelitism — the teaching that Christ had only one will — to reconcile the Monophysite provinces. Maximus the Confessor (c. 580–662), once a high imperial official turned monk, insisted on two wills answering to Christ\'s two natures: a human will Christ truly assumed and, in Gethsemane, freely submitted to God. With Pope Martin I he condemned the doctrine at the Lateran Synod of 649. For defying the emperor he was tried, his tongue and right hand cut off, and he died in exile in 662. Twenty years later the Third Council of Constantinople (680–681) vindicated him.',
    terms:[
      {word:'Monothelitism',def:'The 7th-century doctrine that the incarnate Christ had only one will. Backed by emperors Heraclius (the Ecthesis, 638) and Constans II (the Typos, 648) as a compromise with the Monophysites.'},
      {word:'Two wills (dyothelitism)',def:'Maximus\'s position: because Christ has two natures, he has two wills, divine and human. A human will he did not assume would be a human will left unhealed; in Gethsemane that human will freely submitted to the divine.'},
      {word:'Third Council of Constantinople (680–681)',def:'The sixth ecumenical council, which condemned Monothelitism and affirmed two wills in Christ — vindicating Maximus nearly twenty years after his death.'},
    ],
    questions:[],
  }],
  questions:[
    {q:'Why did Maximus think one will versus two was worth losing his tongue and hand over?',a:'Because for Maximus it was the whole of salvation. The ancient principle was "what is not assumed is not healed": if Christ did not take a complete human nature — including a human will — then the very faculty in us that rebels against God was never redeemed. A Christ with only a divine will would be only half a savior. Maximus saw that the imperial "compromise," however politically convenient, quietly emptied the Incarnation of its saving power. So he refused it even when the emperor and the patriarchs had all signed on — and was vindicated at the Third Council of Constantinople in 681.'},
  ],
};

const M31_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 7 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">Maximus the Confessor</h1>
<p class="article-sub">The two wills of Christ · 7th century</p>
<div class="art-divider"></div>
<div class="article-body">
<p>A single question — did Christ have one will, or two? — cost a monk his tongue and his right hand, and split the papacy from the empire.</p>
<figure style="margin:1.75rem 0;border:1px solid rgba(20,8,12,0.1);border-radius:10px;overflow:hidden;">
  <img src="/images/middle-ages/HagiaSophia.jpeg" style="width:100%;display:block;object-fit:cover;object-position:top center;max-height:400px;">
  <figcaption><strong>Constantinople · 7th century</strong> The imperial capital pressed a theological compromise on the whole church. One monk, almost alone, refused it.</figcaption>
</figure>
<p>To win back the <strong>Monophysite</strong> provinces lost to Islam, the emperor <strong>Heraclius</strong> backed a compromise: <strong>Monothelitism</strong>, the teaching that the incarnate Christ had only one will. He proclaimed it in the <strong>Ecthesis</strong> of <strong>638</strong>; his successor <strong>Constans II</strong> went further, forbidding all debate in the <strong>Typos</strong> of <strong>648</strong>. Against emperor and patriarchs alike stood <strong>Maximus the Confessor</strong> (c. 580–662), once a high imperial official and then a monk. Christ has <strong>two wills</strong>, he argued — divine and human — answering to his two <strong>natures</strong> defined at Chalcedon.</p>
<p>For Maximus this was no abstraction. A human will that Christ did not assume would be a human will left <strong>unhealed</strong> — and in <strong>Gethsemane</strong> we watch a real human will freely <strong>submit</strong>: &quot;not my will, but thine.&quot; With Pope <strong>Martin I</strong> he condemned the one-will doctrine at the <strong>Lateran Synod</strong> of <strong>649</strong>. The emperor answered with force: Maximus was tried for defying the throne, his <strong>tongue</strong> cut out and his right <strong>hand</strong> cut off so he could neither speak nor write, and he died in exile in <strong>662</strong> — a <em>confessor</em>. He was vindicated at the <strong>Third Council of Constantinople</strong> (<strong>680–681</strong>), the sixth ecumenical council, which affirmed two wills in Christ.</p>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">638</div><div class="atl-text">Heraclius proclaims one will in the Ecthesis</div></div>
  <div class="atl-row"><div class="atl-year">649</div><div class="atl-text">Lateran Synod condemns Monothelitism</div></div>
  <div class="atl-row"><div class="atl-year">662</div><div class="atl-text">Maximus mutilated and exiled; dies a confessor</div></div>
  <div class="atl-row"><div class="atl-year">681</div><div class="atl-text">Third Council of Constantinople affirms two wills</div></div>
</div>
<div class="pull-quote">
  <p>&quot;Even if the whole world should enter into communion with the patriarch, I will not.&quot;</p>
  <cite>— attributed to Maximus the Confessor</cite>
</div>
</div>`;

_track3.lessons[6].articleHtml=M31_ARTICLE_HTML;
_track3.lessons[6].learn=M31_LEARN;
_track3.lessons[6].study=M31_STUDY;
_track3.lessons[6].coldOpen={_bg:'/images/middle-ages/HagiaSophia.jpeg',cards:[
  {label:'The World Before',text:'Half the Christian East has fallen to Islam. The emperor wants the Monophysite provinces back, and offers a theological compromise to win them.',size:'lg'},
  {label:'The Crisis',text:'The compromise quietly says Christ had only one will. Accept it and the empire is unified — refuse it and you defy the throne.',size:'xl'},
  {label:'The Key Figures',text:'Maximus the Confessor, the monk who would not sign. Pope Martin I, who stood with him. The emperors Heraclius and Constans II.',size:'lg'},
  {label:'The Bridge',text:'Here is how one man with no army held the line on the two wills of Christ — and lost his tongue and hand for it.',size:'md'},
]};

// ── Lesson 8 — The Iconoclastic Controversy & Nicaea II (8th c.) ────────

const M7_LEARN=[
  {sentence:"The 8th-century struggle over the use of sacred images was called the _____ Controversy.",answer:"Iconoclastic",options:["Iconoclastic","Filioque","Investiture","Monophysite"],explanation:"The Iconoclastic Controversy ran through the 8th century in the Byzantine East over whether icons violated the second commandment.",tier:1},
  {sentence:"In _____, Emperor Leo III ordered the removal of an icon of Christ from the palace gate.",answer:"726",options:["726","754","787","843"],explanation:"Leo III's order in 726 launched the iconoclast policy and opened the controversy.",tier:1},
  {sentence:"The Byzantine emperor who launched the iconoclast policy was _____.",answer:"Leo III",options:["Leo III","Constantine V","Justinian I","Heraclius"],explanation:"Leo III began the imperial assault on icons by ordering the image of Christ removed from the palace gate.",tier:1},
  {sentence:"Sacred images of Christ, Mary, and the saints used in Eastern worship are called _____.",answer:"icons",options:["icons","relics","sacraments","liturgies"],explanation:"Icons are the sacred images of Christ, Mary, and the saints at the heart of the controversy.",tier:1},
  {sentence:"Those who held that icons violated the second commandment were called _____.",answer:"iconoclasts",options:["iconoclasts","iconodules","Monophysites","Nestorians"],explanation:"Iconoclasts — literally 'image-breakers' — opposed and destroyed sacred images.",tier:1},
  {sentence:"Defenders of the icons argued that because the eternal Son took flesh, his _____ could rightly be honored.",answer:"image",options:["image","name","relics","robes"],explanation:"The iconodule argument turned on the Incarnation: a God who had become visible flesh could be visibly depicted.",tier:1},
  {sentence:"The chief defender of the icons, writing safely from Muslim-ruled Syria, was _____.",answer:"John of Damascus",options:["John of Damascus","Photios","Theodore the Studite","Maximus the Confessor"],explanation:"John of Damascus, beyond the emperor's reach in Muslim-ruled Syria, became the theological champion of the icons.",tier:1},
  {sentence:"John of Damascus defended the icons in his _____ Apologetic Treatises.",answer:"Three",options:["Three","Seven","Five","Two"],explanation:"His Three Apologetic Treatises Against Those Who Decry the Holy Images set out the iconodule case.",tier:1},
  {sentence:"John of Damascus called the worship that belongs to God alone _____.",answer:"latreia",options:["latreia","proskynesis","doxa","kenosis"],explanation:"Latreia is worship — due to God alone — in John's decisive distinction.",tier:1},
  {sentence:"He called the veneration rightly given to icons and saints _____.",answer:"proskynesis",options:["proskynesis","latreia","kenosis","theosis"],explanation:"Proskynesis is veneration — bowing or honoring — which icons and saints may receive, but not worship.",tier:1},
  {sentence:"The Second Council of Nicaea, which restored icon veneration, met in _____.",answer:"787",options:["787","726","843","680"],explanation:"Nicaea II met in 787 — the seventh ecumenical council, the last accepted by both East and West.",tier:1},
  {sentence:"The empress who summoned the council that restored the icons was _____.",answer:"Irene",options:["Irene","Theodora","Pulcheria","Helena"],explanation:"The Empress Irene called the Second Council of Nicaea in 787, ending the first phase of the controversy.",tier:1},
];

const M7_STUDY={
  cards:[{
    text:'In 726 Emperor Leo III ordered icons destroyed, launching sixty years of the Iconoclastic Controversy. John of Damascus defended the icons from Muslim-held Syria, arguing from the Incarnation: a God who became visible flesh can be depicted. Empress Irene called the Second Council of Nicaea (787) — the seventh ecumenical council — which restored the icons.',
    terms:[
      {word:'Icon',def:'A sacred image of Christ, Mary, or a saint — painted in tempera or gold leaf, venerated in Eastern worship, and the center of the 8th-century controversy.'},
      {word:'Iconoclasm',def:'The 8th-century imperial policy of destroying sacred images, beginning with Leo III in 726. Iconoclasts argued images violated the second commandment and confuse Christ\'s two natures.'},
      {word:'Latreia & Proskynesis',def:'John of Damascus\'s key distinction: latreia is worship, due to God alone; proskynesis is veneration, which may rightly be given to icons and saints.'},
      {word:'John of Damascus (c. 675–749)',def:'The monk in Muslim-held Syria, beyond the emperor\'s reach, who became the theological champion of the icons in his Three Apologetic Treatises.'},
      {word:'Second Council of Nicaea (787)',def:'The seventh ecumenical council, called by Empress Irene, which restored icon veneration — the last council recognized by both East and West alike.'},
      {word:'Empress Irene',def:'The Byzantine regent who convened the Second Council of Nicaea and ended the iconoclast era — the first woman to rule the empire in her own name.'},
    ],
    questions:[],
  }],
  questions:[
    {q:'What was at stake theologically in the Iconoclastic Controversy?',a:'More than images were at stake — the controversy was really about the Incarnation. John of Damascus argued that the reason Christ can be depicted is that God truly became flesh; to say you cannot paint Christ is to say the Incarnation was not real. Conversely, the iconoclasts\' instinct had merit: any depiction of divinity can become idolatry. John\'s answer — that icons receive veneration, not worship — drew the line. The Second Council of Nicaea\'s ruling was essentially a statement that the Incarnation changes everything, including what it means to honor a holy image.'},
  ],
};

const M7_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 8 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">The Iconoclastic Controversy</h1>
<p class="article-sub">Christ in paint, Christ in flesh · 8th century</p>
<div class="art-divider"></div>
<div class="article-body">
<p>For sixty years the Christian East tore itself apart over a question the West never thought to ask: was painting Christ idolatry, or fidelity?</p>
<figure style="margin:1.75rem 0;border:1px solid rgba(20,8,12,0.1);border-radius:10px;overflow:hidden;">
  <img src="/images/middle-ages/Nicaea2.jpeg" style="width:100%;display:block;object-fit:cover;object-position:top center;max-height:420px;">
  <figcaption><strong>Second Council of Nicaea · 787</strong> The seventh ecumenical council restored the veneration of icons after sixty years of imperial iconoclasm — the East's settled answer that an image of Christ is fidelity, not idolatry.</figcaption>
</figure>
<p>In <strong>726</strong>, the Byzantine emperor <strong>Leo III</strong> ordered the removal of an icon of Christ from the palace gate. What followed was the <strong>Iconoclastic Controversy</strong> — a century-long struggle over whether the Christian use of <strong>icons</strong>, sacred images of Christ, Mary, and the saints, violated the second commandment. The <strong>iconoclasts</strong> — &quot;image-breakers&quot; — said yes: any image of Christ either denied his divinity or split him in two. The defenders said no, drawing on the doctrine of the <strong>Incarnation</strong>: because the eternal Son took flesh, his flesh — and therefore his <strong>image</strong> — could rightly be honored.</p>
<p>The chief defender was <strong>John of Damascus</strong> (c. 675–749), a monk in Muslim-ruled Syria and so beyond the emperor's reach. In his <strong>Three Apologetic Treatises</strong> he drew the decisive distinction: only God receives <strong>latreia</strong> (worship); the saints and their images receive <strong>proskynesis</strong> (veneration). The matter was settled in <strong>787</strong> when the Empress <strong>Irene</strong> summoned the <strong>Second Council of Nicaea</strong> — the seventh ecumenical council, the last recognized by East and West alike — which restored the icons. The Latin West, much less troubled by the question, accepted the Greek ruling.</p>
<div class="pull-quote">
  <p>&quot;I do not worship matter; I worship the Creator of matter who became matter for my sake.&quot;</p>
  <cite>— John of Damascus</cite>
</div>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">726</div><div class="atl-text">Leo III orders the removal of icons</div></div>
  <div class="atl-row"><div class="atl-year">787</div><div class="atl-text">Second Council of Nicaea restores image veneration</div></div>
</div>
</div>`;

_track3.lessons[7].articleHtml=M7_ARTICLE_HTML;
_track3.lessons[7].learn=M7_LEARN;
_track3.lessons[7].study=M7_STUDY;
_track3.lessons[7].coldOpen={_bg:'/images/middle-ages/Nicaea2.jpeg',cards:[
  {label:'The World Before',text:'Icons fill every Byzantine church — Christ, Mary, the saints, gazing out in gold leaf and tempera, prayed to and kissed.',size:'lg'},
  {label:'The Crisis',text:'An emperor decides this is idolatry. Soldiers tear images down. Monks and bishops resist. The empire splits over paint.',size:'xl'},
  {label:'The Key Figures',text:'Leo III, the iconoclast emperor. John of Damascus, defender from beyond the empire. Empress Irene, who called the council.',size:'lg'},
  {label:'The Bridge',text:'Here is how the East fought through a generation of conflict to answer a question Western Christians barely thought to ask.',size:'md'},
]};

// ── Lesson 8 — Boniface, Apostle of the Germans (c. 680–754) ───────────

const M8_LEARN=[
  {sentence:"History gave Boniface the title 'Apostle of the _____.'",answer:"Germans",options:["Germans","Slavs","Frisians","Saxons"],explanation:"Boniface earned the title 'Apostle of the Germans' for his decisive mission to the pagan tribes east of the Rhine.",tier:1},
  {sentence:"Boniface's Anglo-Saxon birth name was _____.",answer:"Winfried",options:["Winfried","Wilfrid","Cuthbert","Aldhelm"],explanation:"Born Winfried, he received the Latin name Bonifatius from the pope.",tier:1},
  {sentence:"Boniface was born around 680 in the Anglo-Saxon kingdom of _____.",answer:"Wessex",options:["Wessex","Kent","Northumbria","Mercia"],explanation:"Wessex was Boniface's home kingdom in southern England.",tier:1},
  {sentence:"Pope _____ commissioned Boniface in 719 to evangelize east of the Rhine.",answer:"Gregory II",options:["Gregory II","Gregory the Great","Leo III","Stephen II"],explanation:"Gregory II gave Boniface his commission and later consecrated him a missionary bishop.",tier:1},
  {sentence:"In 723 Boniface felled a sacred oak of Thor at _____.",answer:"Geismar",options:["Geismar","Fulda","Mainz","Dockum"],explanation:"At Geismar Boniface cut down Thor's sacred oak before a crowd that expected him to be struck dead.",tier:1},
  {sentence:"From the wood of the felled oak Boniface built a chapel to St. _____.",answer:"Peter",options:["Peter","Paul","Michael","Boniface"],explanation:"The chapel of St. Peter, built from the fallen oak, marked the symbolic replacement of Thor by Christ.",tier:1},
  {sentence:"Boniface bound the new German bishops to swear loyalty directly to _____.",answer:"the pope",options:["the pope","the Frankish king","their own synods","the patriarch"],explanation:"Boniface organized dioceses, summoned synods, and bound the German bishops directly to Rome.",tier:1},
  {sentence:"The Frankish ruler who protected Boniface's mission was _____.",answer:"Charles Martel",options:["Charles Martel","Charlemagne","Pepin the Short","Clovis"],explanation:"Charles Martel's secular protection helped Boniface plant a Roman-allied church in Germany.",tier:1},
  {sentence:"In 743 Boniface was installed as Archbishop of _____.",answer:"Mainz",options:["Mainz","Cologne","Trier","Salzburg"],explanation:"Mainz became the seat from which Boniface organized the German church.",tier:1},
  {sentence:"In 744 Boniface founded the great monastery of _____.",answer:"Fulda",options:["Fulda","Geismar","St. Gallen","Reichenau"],explanation:"Fulda became the heart of the new German church under Boniface.",tier:1},
  {sentence:"In old age Boniface returned to evangelize the unconverted _____.",answer:"Frisians",options:["Frisians","Saxons","Slavs","Lombards"],explanation:"Boniface left his organizational work to return to the Frisian mission of his youth.",tier:1},
  {sentence:"Boniface was martyred in 754 at the Frisian village of _____.",answer:"Dockum",options:["Dockum","Utrecht","Fulda","Geismar"],explanation:"A pagan band killed Boniface at Dockum, his Gospel-book lifted over his head.",tier:1},
];

const M8_STUDY={
  cards:[{
    text:'Boniface (c. 680–754), born Winfried in Wessex, was commissioned by Pope Gregory II to evangelize the Germanic tribes east of the Rhine. In 723 he felled the sacred oak of Thor at Geismar — and survived. His deeper work was organization: dioceses, synods, and bishops bound directly to Rome.',
    terms:[
      {word:'Apostle of the Germans',def:'The title given to Boniface for his decisive 8th-century mission to the pagan tribes east of the Rhine.'},
      {word:'Geismar oak',def:'The sacred oak of Thor that Boniface felled in 723 before a crowd that expected the god to strike him dead. He survived; the oak fell; from its wood he built a chapel to St. Peter.'},
      {word:'Charles Martel',def:'The Frankish ruler whose secular protection gave Boniface the political cover to plant a Roman-allied church deep in Germany.'},
      {word:'Fulda',def:'The great monastery Boniface founded in 744 — the anchoring institution of the new German church and a center of learning for centuries.'},
      {word:'Archbishop of Mainz',def:'The office to which Boniface was installed in 743 — the primacy of the German church, binding it to Rome.'},
      {word:'Dockum (754)',def:'The site in Frisia where Boniface was martyred on his last mission — killed while preparing to baptize converts, his Gospel-book held over his head.'},
    ],
    questions:[],
  }],
  questions:[
    {q:'How did Boniface\'s method of binding the German church to Rome shape European Christianity?',a:'Boniface did not simply plant Christianity in Germany — he planted a specifically Roman Christianity. Every bishop he consecrated swore loyalty to the pope, every diocese answered to Rome, every synod was organized on the Roman model. This was deliberate policy, not incidental. The result was that when the medieval papacy rose to its height under Gregory VII and Innocent III, it had a church in Germany — and across Europe — that recognized Roman authority as axiomatic. Boniface\'s ecclesiastical architecture lasted seven centuries.'},
  ],
};

const M8_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 9 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">Boniface, Apostle of the Germans</h1>
<p class="article-sub">Hammer to the oak · 8th century</p>
<div class="art-divider"></div>
<div class="article-body">
<p>He took an axe to the oldest oak of the German gods — and changed a continent.</p>
<figure style="margin:1.75rem 0;border:1px solid rgba(20,8,12,0.1);border-radius:10px;overflow:hidden;">
  <img src="/images/middle-ages/Boniface.jpeg" style="width:100%;display:block;object-fit:cover;object-position:top center;max-height:420px;">
  <figcaption><strong>Boniface, Apostle of the Germans · c. 680–754</strong> The English missionary who felled the Oak of Donar at Geismar — and went on to Christianize the heart of Europe.</figcaption>
</figure>
<p><strong>Boniface</strong> (c. 680–754), born <strong>Winfried</strong> in Anglo-Saxon <strong>Wessex</strong>, became the most consequential missionary of the early Middle Ages. Commissioned by Pope <strong>Gregory II</strong> in 719 to evangelize the pagan tribes east of the Rhine, he made his name in <strong>723</strong> by felling the sacred oak of Thor at <strong>Geismar</strong> before a crowd that expected the god to strike him dead. He survived; the oak fell; and from its wood he built a chapel to <strong>St. Peter</strong>. The mission had found its hinge.</p>
<p>But Boniface's deeper work was organization. He planted dioceses, summoned synods, and bound the new German church directly to Rome — every bishop swearing loyalty to <strong>the pope</strong>. Backed by the Frankish ruler <strong>Charles Martel</strong>, he was installed as Archbishop of <strong>Mainz</strong> in 743 and founded the great monastery of <strong>Fulda</strong> in 744. In old age he returned to the unconverted <strong>Frisians</strong>, where in <strong>754</strong> a pagan band cut him down at <strong>Dockum</strong>, his Gospel-book lifted over his head. He had bound Germany to the church of Rome more firmly than any saint before him.</p>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">723</div><div class="atl-text">Fells the sacred oak at Geismar</div></div>
  <div class="atl-row"><div class="atl-year">744</div><div class="atl-text">Founds the monastery of Fulda</div></div>
  <div class="atl-row"><div class="atl-year">754</div><div class="atl-text">Martyred among the Frisians at Dockum</div></div>
</div>
</div>`;

_track3.lessons[8].articleHtml=M8_ARTICLE_HTML;
_track3.lessons[8].learn=M8_LEARN;
_track3.lessons[8].study=M8_STUDY;
_track3.lessons[8].coldOpen={_bg:'/images/middle-ages/Boniface.jpeg',cards:[
  {label:'The World Before',text:'East of the Rhine the old gods still hold — Thor, Wodan, sacred oaks in dim groves where blood is shed for harvest.',size:'lg'},
  {label:'The Test',text:'An English monk picks up an axe and walks into the grove. The villagers wait for lightning. None comes.',size:'xl'},
  {label:'The Key Figures',text:'Boniface, the English missionary. Pope Gregory II, who sent him. Charles Martel, who shielded him.',size:'lg'},
  {label:'The Bridge',text:'Here is how one Englishman bound the new German church to Rome — and gave his life among the Frisians.',size:'md'},
]};

// ── Lesson 9 — Olopan & the Gospel in China (635–845) ──────────────────

const M9_LEARN=[
  {sentence:"The Assyrian missionary who brought the gospel to Tang China was _____.",answer:"Olopan",options:["Olopan","Boniface","Cyril","Methodius"],explanation:"Olopan (also rendered Alopen) reached the Tang capital with Scriptures in 635.",tier:1},
  {sentence:"Olopan reached the Tang capital in the year _____.",answer:"635",options:["635","781","845","596"],explanation:"Olopan arrived in 635 — earlier than many of the Western missions to northern Europe.",tier:1},
  {sentence:"The Tang capital where Olopan arrived was _____.",answer:"Chang'an",options:["Chang'an","Beijing","Luoyang","Kaifeng"],explanation:"Chang'an, today's Sigan-Fu/Xi'an, was the cosmopolitan Tang capital.",tier:1},
  {sentence:"Olopan belonged to the _____ of the East.",answer:"Church",options:["Church","Synod","Sect","Mission"],explanation:"He belonged to the Assyrian Church of the East, sometimes labelled 'Nestorian.'",tier:1},
  {sentence:"Olopan brought Scriptures translated from _____.",answer:"Syriac",options:["Syriac","Latin","Greek","Persian"],explanation:"Syriac was the liturgical and theological language of the Church of the East.",tier:1},
  {sentence:"Olopan's church had spread east through Persia along the _____ Road.",answer:"Silk",options:["Silk","Spice","King's","Pilgrim's"],explanation:"The Silk Road carried the Church of the East from Persia into central Asia and China.",tier:1},
  {sentence:"The Tang emperor who received Olopan was _____.",answer:"Taizong",options:["Taizong","Wuzong","Xuanzong","Gaozu"],explanation:"Taizong received Olopan, ordered his books translated, and permitted Christian preaching.",tier:1},
  {sentence:"Christianity in China was called Jingjiao, the _____ Religion.",answer:"Luminous",options:["Luminous","Heavenly","Foreign","Western"],explanation:"Jingjiao means the 'Luminous Religion' — Christianity as it took shape under the Tang.",tier:1},
  {sentence:"In 781 a black stone slab recording the church's history was erected at _____.",answer:"Sigan-Fu",options:["Sigan-Fu","Chang'an","Beijing","Luoyang"],explanation:"The Nestorian Stele was erected at Sigan-Fu in 781 — bilingual in Chinese and Syriac.",tier:1},
  {sentence:"The Nestorian Stele was inscribed in Chinese characters and in _____.",answer:"Syriac",options:["Syriac","Greek","Latin","Arabic"],explanation:"The bilingual stele preserved the church's history in both Chinese characters and Syriac.",tier:1},
  {sentence:"The Tang emperor who suppressed Christianity along with Buddhism in 845 was _____.",answer:"Wuzong",options:["Wuzong","Taizong","Xuanzong","Kublai"],explanation:"Wuzong's 845 purge swept away the Luminous Religion along with Buddhism.",tier:1},
  {sentence:"The buried Nestorian Stele was rediscovered in the year _____.",answer:"1625",options:["1625","1453","1492","1066"],explanation:"The stele's 1625 rediscovery revealed that the gospel had reached China centuries before European missions.",tier:1},
];

const M9_STUDY={
  cards:[{
    text:'In 635 — centuries before any Latin missionary thought of the Far East — the Assyrian monk Olopan reached the Tang capital Chang\'an with Scriptures from Syriac. The faith took root as Jingjiao, the "Luminous Religion." In 845 Emperor Wuzong\'s purge swept it away — until a buried stele, rediscovered in 1625, testified that the gospel had reached China a thousand years before.',
    terms:[
      {word:'Olopan',def:'The Assyrian monk who arrived in Tang China in 635 — the first recorded Christian missionary to China, carrying Scriptures translated from Syriac.'},
      {word:'Church of the East',def:'The Assyrian Christian communion (sometimes called "Nestorian") that spread east through Persia and along the Silk Road into Tang China — a branch of Christianity almost entirely unknown to Latin Christendom.'},
      {word:'Jingjiao',def:'Chinese for "the Luminous Religion" — Christianity as it flourished under the Tang dynasty for two centuries.'},
      {word:'Nestorian Stele',def:'The bilingual Chinese-Syriac stone slab erected at Sigan-Fu in 781, recording the history of the Luminous Religion from Olopan\'s arrival. Rediscovered in 1625.'},
      {word:'Emperor Taizong',def:'The Tang emperor who received Olopan in 635, ordered his books translated, and permitted Christian preaching across China.'},
      {word:'Emperor Wuzong (845)',def:'The Tang emperor whose purge of foreign religions swept away both Buddhism and Christianity — ending the Luminous Religion in China.'},
    ],
    questions:[],
  }],
  questions:[
    {q:'What does Olopan\'s mission reveal about early Christianity\'s reach — and about how fragile that reach can be?',a:'Olopan\'s story demolishes the assumption that global Christianity was a modern Western export. The gospel reached China\'s imperial capital in 635, took root, produced two centuries of churches and a bilingual stele, and then vanished in a single emperor\'s purge. The lesson is double-edged: the gospel has always been more global than its Western custodians knew — and a Christianity that depends entirely on imperial favor can be erased by the next emperor\'s decree. Olopan\'s mission is both the high-water mark of early Christian global reach and a cautionary tale about shallow roots.'},
  ],
};

const M9_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 10 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">Olopan &amp; the Gospel in China</h1>
<p class="article-sub">The Luminous Religion at the Tang court · 7th–9th century</p>
<div class="art-divider"></div>
<div class="article-body">
<p>Centuries before any Latin missionary thought of the Far East, an Assyrian monk walked into the Tang capital with a satchel of Scriptures.</p>
<figure style="margin:1.75rem 0;border:1px solid rgba(20,8,12,0.1);border-radius:10px;overflow:hidden;">
  <img src="/images/middle-ages/NestorianStele.jpeg" style="width:100%;display:block;object-fit:cover;object-position:top center;max-height:420px;">
  <figcaption><strong>The Nestorian Stele · 781</strong> Erected in Chang'an under the Tang, the stele records the arrival of Olopan and the spread of the "Luminous Religion" — Christianity — in seventh-century China.</figcaption>
</figure>
<p>In <strong>635</strong>, the missionary <strong>Olopan</strong> (also rendered Alopen) arrived at <strong>Chang'an</strong> — modern <strong>Sigan-Fu</strong> — bearing Scriptures translated from <strong>Syriac</strong>. He belonged not to Rome or Constantinople but to the <strong>Church of the East</strong>, the Assyrian communion (sometimes labelled &quot;Nestorian&quot;) that had spread eastward through Persia along the <strong>Silk</strong> Road. The Tang emperor <strong>Taizong</strong> received him, ordered the books translated, and soon permitted Christian preaching across the empire. The new faith took root as <strong>Jingjiao</strong> — the <strong>&quot;Luminous Religion.&quot;</strong></p>
<p>For two centuries the Luminous Religion flourished. Its monasteries dotted the cities; its bishops sat at the imperial court. In <strong>781</strong>, Chinese and <strong>Syriac</strong> scholars erected the <strong>Nestorian Stele</strong> at <strong>Sigan-Fu</strong> — a black stone slab inscribed in both Chinese characters and Syriac that recorded the church's history and a Christian creed. But in <strong>845</strong>, the emperor <strong>Wuzong</strong>, suspicious of foreign religions, suppressed Buddhism and swept the Christians away with it. The Luminous Religion vanished from China. The stele lay buried until its rediscovery in <strong>1625</strong> — a silent witness that the gospel had reached the ends of the earth a thousand years before Europe sent its first envoy.</p>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">635</div><div class="atl-text">Olopan reaches Chang'an</div></div>
  <div class="atl-row"><div class="atl-year">781</div><div class="atl-text">Nestorian Stele erected at Sigan-Fu</div></div>
  <div class="atl-row"><div class="atl-year">845</div><div class="atl-text">Emperor Wuzong's purge sweeps Christianity away</div></div>
</div>
</div>`;

_track3.lessons[9].articleHtml=M9_ARTICLE_HTML;
_track3.lessons[9].learn=M9_LEARN;
_track3.lessons[9].study=M9_STUDY;
_track3.lessons[9].coldOpen={_bg:'/images/middle-ages/NestorianStele.jpeg',cards:[
  {label:'The World Before',text:'While Anglo-Saxons are still being baptized in muddy English rivers, the Tang Dynasty rules the largest, richest, most cosmopolitan empire on earth.',size:'lg'},
  {label:'The Arrival',text:'A monk from Persia, carrying scrolls in a language no Chinese scribe can read, asks the emperor for a hearing.',size:'xl'},
  {label:'The Key Figures',text:'Olopan, the Assyrian missionary. Emperor Taizong, who received him. Emperor Wuzong, who later swept Christianity away.',size:'lg'},
  {label:'The Bridge',text:'Here is how the gospel reached China in the 7th century — and was nearly forgotten until a buried stone was found a thousand years later.',size:'md'},
]};

// ── Lesson 10 — Nicholas I, Photios & the Filioque (9th c.) ────────────

const M10_LEARN=[
  {sentence:"The 9th-century pope who claimed jurisdiction over the whole church East and West was Nicholas _____.",answer:"I",options:["I","II","III","V"],explanation:"Pope Nicholas I (858–867) pushed papal authority to a new height.",tier:1},
  {sentence:"The Greek scholar made Patriarch of Constantinople in 858 was _____.",answer:"Photios",options:["Photios","Cerularius","Cyril","John of Damascus"],explanation:"Photios, the leading Greek scholar of his day, was raised straight from layman to patriarch in 858.",tier:1},
  {sentence:"The forged collection of decrees Nicholas drew on was the _____ Decretals.",answer:"Pseudo-Isidorean",options:["Pseudo-Isidorean","Donation of Constantine","Liber Pontificalis","Sentences"],explanation:"The Pseudo-Isidorean Decretals were a 9th-century forgery that exalted papal authority.",tier:1},
  {sentence:"Photios was raised from _____ to patriarch by the emperor's order.",answer:"layman",options:["layman","abbot","deacon","priest"],explanation:"Photios was still a layman when the emperor elevated him directly to the patriarchate.",tier:1},
  {sentence:"The Latin word added to the Nicene Creed and rejected by the Greeks was _____.",answer:"Filioque",options:["Filioque","Homoousios","Theotokos","Trinitas"],explanation:"Filioque ('and the Son') became the focal theological dispute between East and West.",tier:1},
  {sentence:"'Filioque' means 'and the _____.'",answer:"Son",options:["Son","Spirit","Father","Word"],explanation:"The Latin Filioque clause adds 'and the Son' to the creed's statement about the procession of the Spirit.",tier:1},
  {sentence:"The Filioque concerns the procession of the Holy _____.",answer:"Spirit",options:["Spirit","Son","Father","Word"],explanation:"The Filioque dispute asks whether the Spirit proceeds from the Father alone or from the Father and the Son.",tier:1},
  {sentence:"The original Nicene Creed says the Spirit proceeds from the _____.",answer:"Father",options:["Father","Son","Father and the Son","Church"],explanation:"The Nicene Creed in its original Greek form confessed that the Spirit proceeds from the Father.",tier:1},
  {sentence:"The Filioque was first added to the Creed in the Latin or _____ West.",answer:"Frankish",options:["Frankish","Italian","Spanish","African"],explanation:"The Filioque arose in Frankish lands before it became standard in Rome.",tier:1},
  {sentence:"In _____, Photios convened a council that denounced the Filioque and excommunicated Nicholas.",answer:"867",options:["867","858","1054","787"],explanation:"In 867 Photios's council at Constantinople denounced the Filioque and excommunicated Pope Nicholas.",tier:1},
  {sentence:"Photios said the Filioque was an unauthorized addition to the wording of the Nicene _____.",answer:"creed",options:["creed","council","canon","liturgy"],explanation:"For the Greeks, adding the Filioque was tampering with the creed shared with the East.",tier:1},
  {sentence:"The Nicholas–Photios quarrel set the stage for the Great _____ of 1054.",answer:"Schism",options:["Schism","Crusade","Council","Awakening"],explanation:"The Photian schism foreshadowed the final East–West rupture in 1054.",tier:1},
];

const M10_STUDY={
  cards:[{
    text:'Pope Nicholas I pushed papal authority to a new height in the 860s, claiming jurisdiction over the whole church East and West. Constantinople refused: Patriarch Photios denounced the Filioque and excommunicated Nicholas. The break was patched up — but the wound did not heal, and the Great Schism of 1054 finished what they began.',
    terms:[
      {word:'Filioque',def:'Latin for "and the Son" — the clause added in the Latin West to the Nicene Creed, asserting the Spirit proceeds from the Father and the Son. Rejected by the Greeks as unauthorized tampering and a Trinitarian error.'},
      {word:'Photios',def:'The great Greek scholar raised from layman to Patriarch of Constantinople in 858. He convened a council in 867 to denounce the Filioque and excommunicate Pope Nicholas I.'},
      {word:'Nicholas I',def:'Pope 858–867, who pushed papal authority to a new height by claiming universal jurisdiction East and West, drawing on forged documents (the Pseudo-Isidorean Decretals).'},
      {word:'Pseudo-Isidorean Decretals',def:'A 9th-century forged collection of church decrees exalting papal authority. Nicholas I drew on them to support his claim of universal jurisdiction; they were later proven false.'},
      {word:'Procession of the Spirit',def:'The Trinitarian question at the heart of the Filioque dispute: does the Holy Spirit proceed from the Father alone (Eastern view) or from the Father and the Son together (Western view)?'},
    ],
    questions:[],
  }],
  questions:[
    {q:'Why did the Filioque become the central theological dispute between East and West?',a:'Because it touched the very structure of the Trinity. The Eastern church believed that making the Spirit proceed from the Son as well as the Father compromised the Father\'s unique role as the source of divinity within the Trinity. But the dispute also crystallized a century of accumulated political and cultural grievance. The Filioque was simultaneously a real theological difference and a convenient emblem for everything dividing Greek east from Latin west — language, liturgy, jurisdiction, and pride. Nicholas and Photios made it the symbol of the fracture; 1054 made it permanent.'},
  ],
};

const M10_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 11 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">Nicholas I, Photios &amp; the Filioque</h1>
<p class="article-sub">The East-West fracture begins · 9th century</p>
<div class="art-divider"></div>
<div class="article-body">
<p>Two strong men, one creed, one word. The fracture that ended in 1054 began here.</p>
<figure style="margin:1.75rem 0;border:1px solid rgba(20,8,12,0.1);border-radius:10px;overflow:hidden;">
  <img src="/images/middle-ages/Filioque.jpeg" style="width:100%;display:block;object-fit:cover;object-position:top center;max-height:420px;">
  <figcaption><strong>The Filioque controversy · 9th century</strong> A single Latin word — "and from the Son" — added to the Nicene Creed in the West opened the long quarrel between Rome and Constantinople over the procession of the Spirit.</figcaption>
</figure>
<p>In the mid-9th century Pope <strong>Nicholas I</strong> (858–867) pushed papal authority to a new height. He drew on a freshly produced collection of decrees — the <strong>Pseudo-Isidorean Decretals</strong>, later proven forgeries — to claim that the pope held jurisdiction over the whole church, East and West. Constantinople was in no mood to submit. Its new patriarch was <strong>Photios</strong>, the leading scholar of the Greek world, raised straight from <strong>layman</strong> to patriarch in 858 by the emperor's order. Nicholas refused to recognize him.</p>
<p>The political quarrel hardened into theology over a single word: the <strong>Filioque</strong>. The Nicene <strong>creed</strong> confessed that the Holy <strong>Spirit</strong> proceeds from the <strong>Father</strong>; the Latin West, in <strong>Frankish</strong> lands, had begun adding &quot;<strong>and the Son</strong>&quot; — <em>Filioque</em> — to make the Spirit proceed also from Christ. To the Greeks, this was an unauthorized tampering with the ecumenical creed and an error about the Trinity itself. In <strong>867</strong> Photios convened a council at Constantinople, denounced the <em>Filioque</em>, and excommunicated Nicholas. The break was patched up at the time, but the wound did not heal. The full Great <strong>Schism</strong> of 1054 would only finish what Nicholas and Photios began.</p>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">858</div><div class="atl-text">Photios raised from layman to patriarch</div></div>
  <div class="atl-row"><div class="atl-year">867</div><div class="atl-text">Photios excommunicates Nicholas; rejects the Filioque</div></div>
  <div class="atl-row"><div class="atl-year">1054</div><div class="atl-text">The Great Schism finalizes the East–West break</div></div>
</div>
</div>`;

_track3.lessons[10].articleHtml=M10_ARTICLE_HTML;
_track3.lessons[10].learn=M10_LEARN;
_track3.lessons[10].study=M10_STUDY;
_track3.lessons[10].coldOpen={_bg:'/images/middle-ages/Filioque.jpeg',cards:[
  {label:'The World Before',text:'East and West still share one creed, one set of councils, one church — but barely. Two proud sees, two languages, two political worlds.',size:'lg'},
  {label:'The Quarrel',text:'A new pope claims authority over all Christendom. A new patriarch — yesterday a layman — refuses to bow. One word in the creed lights the fuse.',size:'xl'},
  {label:'The Key Figures',text:'Pope Nicholas I, claimant of universal jurisdiction. Patriarch Photios, the Greek scholar who said no.',size:'lg'},
  {label:'The Bridge',text:'Here is how a 9th-century quarrel over jurisdiction and one Latin word set the stage for the Great Schism of 1054.',size:'md'},
]};

// ── Lesson 11 — Cyril & Methodius (9th c.) ────────────

const M11_LEARN=[
  {sentence:"Cyril's brother and fellow apostle to the Slavs was _____.",answer:"Methodius",options:["Methodius","Olopan","Boniface","Photios"],explanation:"Cyril and Methodius were brothers from Thessalonica sent to evangelize the Slavs.",tier:1},
  {sentence:"Cyril and Methodius were Greek brothers from the city of _____.",answer:"Thessalonica",options:["Thessalonica","Constantinople","Antioch","Athens"],explanation:"The brothers grew up in Thessalonica, on the edge of the Slavic-speaking world.",tier:1},
  {sentence:"The Moravian prince who in 862 asked Constantinople for teachers was _____.",answer:"Rastislav",options:["Rastislav","Vladimir","Boris","Wenceslaus"],explanation:"Prince Rastislav of Moravia requested teachers who could preach to his people in Slavonic.",tier:1},
  {sentence:"The Patriarch of Constantinople who sent the brothers to Moravia was _____.",answer:"Photios",options:["Photios","Nicholas","Cerularius","Ignatius"],explanation:"Patriarch Photios sent Cyril and Methodius in response to Rastislav's appeal.",tier:1},
  {sentence:"The first alphabet Cyril created for the Slavs was the _____ alphabet.",answer:"Glagolitic",options:["Glagolitic","Cyrillic","Runic","Coptic"],explanation:"Cyril first created the Glagolitic alphabet; a later refinement became the Cyrillic.",tier:1},
  {sentence:"The alphabet later refined from Cyril's work and bearing his name is _____.",answer:"Cyrillic",options:["Cyrillic","Glagolitic","Hebrew","Latin"],explanation:"The Cyrillic alphabet, named for Cyril, became standard across the Slavic Orthodox world.",tier:1},
  {sentence:"The brothers translated Scripture and the liturgy into Old Church _____.",answer:"Slavonic",options:["Slavonic","Latin","Greek","Hebrew"],explanation:"They created a written form of the Slavic tongue — Old Church Slavonic — for Scripture and worship.",tier:1},
  {sentence:"German missionaries insisted that only Latin, Greek, and _____ were fit for worship.",answer:"Hebrew",options:["Hebrew","Aramaic","Coptic","Syriac"],explanation:"The Frankish clergy held a three-languages doctrine: Latin, Greek, and Hebrew alone.",tier:1},
  {sentence:"In 868 the Slavonic liturgy was approved by Pope _____ II.",answer:"Adrian",options:["Adrian","Nicholas","Gregory","Leo"],explanation:"Pope Adrian II in 868 approved the Slavonic liturgy and ordained Methodius bishop.",tier:1},
  {sentence:"Methodius died in the year _____.",answer:"885",options:["885","862","868","988"],explanation:"Methodius died in 885; afterward the brothers' disciples were driven out of Moravia.",tier:1},
  {sentence:"After Methodius's death the brothers' disciples were welcomed in _____.",answer:"Bulgaria",options:["Bulgaria","Russia","Germany","Serbia"],explanation:"Bulgaria received the disciples and became the seedbed of the Slavonic Christian world.",tier:1},
  {sentence:"The Cyrillic Scriptures rooted themselves across the Slavic world, becoming the heart of Eastern _____.",answer:"Orthodoxy",options:["Orthodoxy","Catholicism","Lutheranism","Anglicanism"],explanation:"The Slavonic Bible and liturgy spread into Russia and Serbia, becoming the heart of Eastern Orthodoxy.",tier:1},
];

const M11_STUDY={
  cards:[{
    text:'In 862, the Greek brothers Cyril and Methodius were sent from Constantinople to Moravia to preach in Slavonic. They invented an alphabet, translated Scripture, and created the liturgy in the people\'s language. German missionaries denounced them; Pope Adrian II approved them. From Bulgaria their work spread across the entire Slavic world.',
    terms:[
      {word:'Old Church Slavonic',def:'The literary Slavic tongue Cyril and Methodius created for Scripture and liturgy — the worship language of the Slavic Orthodox world for a thousand years.'},
      {word:'Glagolitic',def:'The first alphabet Cyril created for the Slavic peoples — later refined into the Cyrillic alphabet that bears his name.'},
      {word:'Cyrillic alphabet',def:'The alphabet refined from Cyril\'s Glagolitic, named for him, and still standard across the Slavic Orthodox world from Russia to Serbia.'},
      {word:'Rastislav of Moravia',def:'The prince who in 862 asked Constantinople for teachers who could preach to his people in Slavonic — the request that sent the brothers to Moravia.'},
      {word:'Pope Adrian II (868)',def:'The pope who approved the Slavonic liturgy and ordained Methodius bishop — overriding German missionaries who insisted only Latin, Greek, and Hebrew were fit for worship.'},
    ],
    questions:[],
  }],
  questions:[
    {q:'What made Cyril and Methodius\'s missionary approach distinctive — and why did it provoke resistance?',a:'Most Western missionaries of the era exported Latin along with the faith — Latin liturgy, Latin Bible, Latin learning. Cyril and Methodius took the opposite approach: they invented a new alphabet for a people who had none, translated Scripture into the people\'s living tongue, and created a liturgy that common Slavic speakers could understand. The German missionaries who denounced them at Rome objected not to any heresy but to this principle itself: they believed only Latin, Greek, and Hebrew were sacred tongues fit for worship. Pope Adrian II\'s approval was therefore not just a political ruling but a theological one — the gospel speaks every language.'},
  ],
};

const M11_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 12 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">Cyril &amp; Methodius — Apostles to the Slavs</h1>
<p class="article-sub">A Bible for a new tongue · 862–885</p>
<div class="art-divider"></div>
<div class="article-body">
<p>While the West argued over a single Latin word, two Greek brothers carried the gospel to a people who had no Bible in their own tongue.</p>
<figure style="margin:1.75rem 0;border:1px solid rgba(20,8,12,0.1);border-radius:10px;overflow:hidden;">
  <img src="/images/middle-ages/CyrilMethodius.jpeg" style="width:100%;display:block;object-fit:cover;object-position:top center;max-height:420px;">
  <figcaption><strong>Cyril & Methodius · 9th century</strong> The Greek brothers from Thessalonica who gave the Slavs an alphabet, a liturgy, and the Bible in their own tongue.</figcaption>
</figure>
<p><strong>Cyril</strong> (c. 826–869) and <strong>Methodius</strong> (c. 815–885) were brothers from <strong>Thessalonica</strong>. In 862 Prince <strong>Rastislav</strong> of Moravia asked Constantinople for teachers who could preach to his people in <strong>Slavonic</strong>. Patriarch <strong>Photios</strong> sent the brothers. They created an alphabet — <strong>Glagolitic</strong>, later refined into the <strong>Cyrillic</strong> that bears Cyril's name — and translated the Scriptures and the liturgy into Old Church Slavonic.</p>
<p>German missionaries, certain that only <strong>Latin</strong>, Greek, and <strong>Hebrew</strong> were sacred tongues fit for the worship of God, denounced them at Rome. Yet in <strong>868</strong> Pope <strong>Adrian II</strong> approved the Slavonic liturgy and ordained Methodius bishop. Cyril died in Rome; Methodius labored on until his death in <strong>885</strong>. When their disciples were then driven out of Moravia, they were welcomed in <strong>Bulgaria</strong> — and from there the Slavonic gospel rooted itself across the Slavic world, into Serbia, Russia, and the lands that would become the heart of Eastern <strong>Orthodoxy</strong>.</p>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">862</div><div class="atl-text">Rastislav of Moravia requests teachers</div></div>
  <div class="atl-row"><div class="atl-year">868</div><div class="atl-text">Pope Adrian II approves the Slavonic liturgy</div></div>
  <div class="atl-row"><div class="atl-year">885</div><div class="atl-text">Methodius dies; disciples driven into Bulgaria</div></div>
</div>
</div>`;

_track3.lessons[11].articleHtml=M11_ARTICLE_HTML;
_track3.lessons[11].learn=M11_LEARN;
_track3.lessons[11].study=M11_STUDY;
_track3.lessons[11].coldOpen={_bg:'/images/middle-ages/CyrilMethodius.jpeg',cards:[
  {label:'The World Before',text:'A vast Slavic-speaking world lies between Greek Constantinople and Frankish Aachen. Latin missionaries have entered, but their books and liturgy speak a foreign tongue.',size:'lg'},
  {label:'The Request',text:'A Moravian prince writes to Constantinople: "Send us teachers who can speak to my people."',size:'xl'},
  {label:'The Key Figures',text:'Cyril, who built the alphabet. Methodius, who outlived him to defend their work. Photios, who sent them.',size:'lg'},
  {label:'The Bridge',text:'Here is how a Bible in Slavonic — and an alphabet still in use today — was born of one prince\'s request.',size:'md'},
]};

// ── Lesson 12 — Gottschalk, Ratramnus & the Recovery of Augustine (9th c.) ────────────

const M12_LEARN=[
  {sentence:"The Saxon monk who preached double predestination was _____ of Orbais.",answer:"Gottschalk",options:["Gottschalk","Ratramnus","Paschasius","Hincmar"],explanation:"Gottschalk of Orbais revived the harder Augustinian doctrine of double predestination.",tier:1},
  {sentence:"Gottschalk drew his doctrine of double predestination from the writings of _____.",answer:"Augustine",options:["Augustine","Jerome","Ambrose","Origen"],explanation:"Gottschalk read Augustine's harder books and pressed their logic to its conclusion.",tier:1},
  {sentence:"Double predestination teaches that God elects some to salvation and others to _____.",answer:"damnation",options:["damnation","sanctification","purgatory","glory"],explanation:"The harder Augustinian line that Gottschalk preached: God eternally chooses some for salvation and others for damnation.",tier:1},
  {sentence:"The archbishop of Reims who led the campaign against Gottschalk was _____.",answer:"Hincmar",options:["Hincmar","Rabanus Maurus","Alcuin","Paschasius"],explanation:"Hincmar of Reims drove the synodal action that condemned and imprisoned Gottschalk.",tier:1},
  {sentence:"Gottschalk was condemned at the synods of Mainz (848) and _____ (849).",answer:"Quierzy",options:["Quierzy","Whitby","Aachen","Soissons"],explanation:"Mainz condemned him in 848; the synod of Quierzy in 849 defrocked and flogged him.",tier:1},
  {sentence:"Gottschalk died imprisoned at Hautvillers in the year _____.",answer:"868",options:["868","848","849","885"],explanation:"Gottschalk died at Hautvillers in 868 after some twenty years of imprisonment, still refusing to recant.",tier:1},
  {sentence:"The monk of Corbie who taught that the eucharist becomes the historical body of Christ was _____ Radbertus.",answer:"Paschasius",options:["Paschasius","Ratramnus","Berengar","Lanfranc"],explanation:"Paschasius Radbertus taught that the bread and wine become the same body of Christ born of Mary.",tier:1},
  {sentence:"The monk of Corbie who replied that the elements are Christ's body and blood spiritually and figuratively was _____.",answer:"Ratramnus",options:["Ratramnus","Paschasius","Gottschalk","Hincmar"],explanation:"Ratramnus of Corbie argued that the elements were Christ's body and blood spiritually and figuratively, not materially.",tier:1},
  {sentence:"Ratramnus wrote his reply at the request of the king _____ the Bald.",answer:"Charles",options:["Charles","Louis","Otto","Lothair"],explanation:"King Charles the Bald asked Ratramnus to evaluate Paschasius's teaching.",tier:1},
  {sentence:"Both Paschasius and Ratramnus claimed to rest their case on _____.",answer:"Augustine",options:["Augustine","Jerome","Origen","Ambrose"],explanation:"Both sides of the Corbie dispute appealed to Augustine — the same source Gottschalk used for predestination.",tier:1},
  {sentence:"Ratramnus's book resurfaced at the _____ to shape the Protestant rejection of transubstantiation.",answer:"Reformation",options:["Reformation","Crusades","Renaissance","Counter-Reformation"],explanation:"Ratramnus's book resurfaced in the 11th century and again at the Reformation, shaping Protestant eucharistic theology.",tier:1},
  {sentence:"The abbey where both monks debated the eucharist was _____.",answer:"Corbie",options:["Corbie","Cluny","Hautvillers","Fulda"],explanation:"Both Paschasius and Ratramnus belonged to the abbey of Corbie in northern Francia.",tier:1},
];

const M12_STUDY={
  cards:[{
    text:'Two Carolingian monks revived Augustine\'s hardest questions. Gottschalk preached double predestination, was flogged, imprisoned, and died still refusing to recant (868). At Corbie, Paschasius and Ratramnus argued whether the bread was the historical body of Christ or his body spiritually. Ratramnus\'s answer resurfaced at the Reformation to arm every Protestant rejection of transubstantiation.',
    terms:[
      {word:'Double predestination',def:'The harder Augustinian doctrine — revived by Gottschalk — that God eternally elects some to salvation and others to damnation.'},
      {word:'Gottschalk of Orbais (c. 808–868)',def:'The Saxon monk who read Augustine and preached double predestination — condemned at Mainz (848) and Quierzy (849), flogged, and imprisoned at Hautvillers until his death in 868 still refusing to recant.'},
      {word:'Hincmar of Reims',def:'The powerful archbishop who drove the condemnation of Gottschalk and organized the synodal action that imprisoned him — the face of 9th-century opposition to hard Augustinianism.'},
      {word:'Paschasius Radbertus',def:'The Corbie monk who argued that the bread and wine at the Eucharist become the very historical body of Christ — an early form of what later became transubstantiation.'},
      {word:'Ratramnus of Corbie',def:'Paschasius\'s fellow monk, who argued (at Charles the Bald\'s request) that the elements are Christ\'s body spiritually and figuratively. His book resurfaced at the Reformation to arm Protestant arguments against transubstantiation.'},
    ],
    questions:[],
  }],
  questions:[
    {q:'Why do the 9th-century debates in Carolingian monasteries matter for Reformation history?',a:'Because Gottschalk and Ratramnus were essentially pre-Reformers — not in context but in content. Gottschalk pressed Augustine\'s doctrine of election to conclusions Calvin would later embrace; Ratramnus argued a spiritual eucharistic presence that Cranmer and the English Reformers would appeal to by name. Both were suppressed or ignored in their own day, but books don\'t die. Ratramnus\'s tract on the Eucharist was printed at the Reformation as proof that the spiritual view of the Lord\'s Supper had ancient Catholic support. The Carolingian debates were the seedbed of arguments that would reshape Western Christianity seven centuries later.'},
  ],
};

const M12_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 13 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">Gottschalk, Ratramnus &amp; the Recovery of Augustine</h1>
<p class="article-sub">Two old questions catch fire again · 9th century</p>
<div class="art-divider"></div>
<div class="article-body">
<p>In the cooling embers of Charlemagne's empire, two of Augustine's harder questions caught fire again — does God truly choose whom He saves, and what really happens at the Lord's table?</p>
<figure style="margin:1.75rem 0;border:1px solid rgba(20,8,12,0.1);border-radius:10px;overflow:hidden;">
  <img src="/images/middle-ages/Carolingian.jpeg" style="width:100%;display:block;object-fit:cover;object-position:top center;max-height:420px;">
  <figcaption><strong>Carolingian theology · 9th century</strong> In the schools of Charlemagne's empire, scholars like Gottschalk and Ratramnus rekindled Augustine's harder questions on predestination and the Eucharist.</figcaption>
</figure>
<p><strong>Gottschalk</strong> of Orbais (c. 808–868), a Saxon monk forced into the cloister as a child, read <strong>Augustine</strong>'s harder books and began to preach <strong>double predestination</strong> — that God eternally elects some to salvation and others to <strong>damnation</strong>. Archbishop <strong>Hincmar</strong> of <strong>Reims</strong> hated the doctrine and the man. At synods at <strong>Mainz</strong> (848) and <strong>Quierzy</strong> (849) Gottschalk was condemned, defrocked, publicly flogged, and shut up in the monastery of Hautvillers, where he died in <strong>868</strong> still refusing to recant.</p>
<p>At the same abbey of <strong>Corbie</strong> two monks took up a different fight. <strong>Paschasius</strong> Radbertus taught that the bread and wine at the eucharist become the very <strong>historical body</strong> of Christ — the same flesh born of Mary, the same body that hung on the cross. <strong>Ratramnus</strong> of Corbie, writing at the request of King <strong>Charles the Bald</strong>, replied that the elements are Christ's body and blood <strong>spiritually</strong> and figuratively, not materially. Both rested their case on Augustine. The argument was forgotten for two centuries — but Ratramnus's little book would resurface at the <strong>Reformation</strong>, shaping every Protestant rejection of transubstantiation.</p>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">848</div><div class="atl-text">Synod of Mainz condemns Gottschalk</div></div>
  <div class="atl-row"><div class="atl-year">849</div><div class="atl-text">Synod of Quierzy defrocks and flogs him</div></div>
  <div class="atl-row"><div class="atl-year">868</div><div class="atl-text">Gottschalk dies at Hautvillers, still refusing to recant</div></div>
</div>
</div>`;

_track3.lessons[12].articleHtml=M12_ARTICLE_HTML;
_track3.lessons[12].learn=M12_LEARN;
_track3.lessons[12].study=M12_STUDY;
_track3.lessons[12].coldOpen={_bg:'/images/middle-ages/Carolingian.jpeg',cards:[
  {label:'The World Before',text:'Charlemagne is two generations dead. His empire is fragmenting, but his monasteries are still copying books — and reading them.',size:'lg'},
  {label:'The Crisis',text:'Two old Augustinian questions return with force. A monk preaches predestination and is flogged for it. Two more argue over whether the bread is really Christ.',size:'xl'},
  {label:'The Key Figures',text:'Gottschalk, imprisoned for grace. Paschasius and Ratramnus, two monks of Corbie taking opposite sides at the table.',size:'lg'},
  {label:'The Bridge',text:'Here is how a forgotten Carolingian quarrel quietly seeded the Reformation\'s rejection of transubstantiation 700 years later.',size:'md'},
]};

// ── Lesson 13 — The Dark Ages (10th c.) ────────────

const M13_LEARN=[
  {sentence:"The 10th century is often called the church's _____ Ages.",answer:"Dark",options:["Dark","Golden","Silver","Quiet"],explanation:"Later historians named the 10th century the church's Dark Ages — corrupt popes, ignorant clergy, raids on every coast.",tier:1},
  {sentence:"The Roman family that controlled the papacy for most of the 900s was the _____ family.",answer:"Theophylact",options:["Theophylact","Medici","Colonna","Orsini"],explanation:"The Theophylact family of Rome — through Theodora and Marozia — controlled the papacy through the first half of the 10th century.",tier:1},
  {sentence:"The mother–daughter pair who installed their lovers and sons on the papal throne were Theodora and _____.",answer:"Marozia",options:["Marozia","Adelaide","Theophano","Hildegard"],explanation:"Theodora and her daughter Marozia placed their lovers, sons, and grandsons on the papal throne.",tier:1},
  {sentence:"Later historians named this corrupt stretch of the papacy the _____.",answer:"pornocracy",options:["pornocracy","Avignon Captivity","Cluniac Reform","Great Schism"],explanation:"Historians called the early-10th-century papacy the pornocracy — the rule of the harlots.",tier:1},
  {sentence:"Marozia's grandson, made pope at eighteen in 955, was _____.",answer:"John XII",options:["John XII","John X","Leo VIII","Sergius III"],explanation:"John XII became pope at eighteen in 955 and turned the Lateran palace into a den of vice.",tier:1},
  {sentence:"The age was beset from the north by _____ raiders.",answer:"Viking",options:["Viking","Magyar","Slavic","Avar"],explanation:"Viking raiders pressed Christendom from the north throughout the 10th century, burning monasteries and emptying libraries.",tier:1},
  {sentence:"The age was beset from the south by _____ raiders.",answer:"Muslim",options:["Muslim","Viking","Slavic","Frankish"],explanation:"Muslim raiders from Sicily and North Africa pressed up the Italian peninsula.",tier:1},
  {sentence:"Many parish priests of this age could not even read the _____ Mass they recited.",answer:"Latin",options:["Latin","Greek","Slavonic","Frankish"],explanation:"Parish clergy were so ignorant that many could not read the Latin words of the Mass they performed.",tier:1},
  {sentence:"The German king who marched into Italy and was crowned emperor in 962 was _____ I.",answer:"Otto",options:["Otto","Henry","Frederick","Conrad"],explanation:"Otto I of Germany was crowned emperor by Pope John XII in Rome in 962.",tier:1},
  {sentence:"Otto's 962 coronation founded what would be called the Holy _____ Empire.",answer:"Roman",options:["Roman","German","Frankish","Christian"],explanation:"Otto I's coronation is reckoned the founding of the Holy Roman Empire.",tier:1},
  {sentence:"Within a year of his coronation, Otto deposed Pope John XII for murder and _____.",answer:"sacrilege",options:["sacrilege","heresy","schism","treason"],explanation:"In 963 Otto's Roman synod deposed John XII for murder, perjury, and sacrilege.",tier:1},
  {sentence:"The seed of recovery had been planted at a quiet monastery in Burgundy called _____.",answer:"Cluny",options:["Cluny","Monte Cassino","Corbie","Fulda"],explanation:"The reforming monastery of Cluny, founded in 910 in Burgundy, would become the seedbed of 10th-century reform.",tier:1},
];

const M13_STUDY={
  cards:[{
    text:'The tenth century was the church\'s nightmare: the pornocracy, in which the Theophylact family installed lovers and grandsons as popes; Viking and Muslim raids burning monasteries; clergy too ignorant to read the Latin Mass. Rescue came not from Rome but from Germany — Otto I was crowned emperor in 962 — and from a quiet Burgundian monastery called Cluny.',
    terms:[
      {word:'The pornocracy',def:'The corrupt 10th-century papacy under the Theophylact family, in which Theodora and her daughter Marozia placed their lovers, sons, and grandsons on the papal throne.'},
      {word:'Marozia',def:'The Roman noblewoman who wielded near-total control over the papacy in the 920s–930s, installing and deposing popes according to political and personal interest.'},
      {word:'John XII',def:'Marozia\'s grandson, made pope at eighteen in 955 — who turned the Lateran palace into a den of vice and was deposed by Otto I for murder and sacrilege.'},
      {word:'Otto I (Otto the Great)',def:'The German king crowned emperor by John XII in 962, who then deposed the same pope — founding the Holy Roman Empire and beginning German imperial influence over the papacy.'},
      {word:'Holy Roman Empire',def:'The German-led successor to Charlemagne\'s western empire, beginning with Otto I\'s coronation in 962. For centuries the emperor would hold a veto over papal elections.'},
    ],
    questions:[],
  }],
  questions:[
    {q:'How could the church fall so low in the 10th century — and what does its survival say?',a:'The church fell because it had become entangled in secular power at every level — popes were chosen by Roman noble families, bishoprics were treated as property, and parish clergy were no better than ignorant peasants with their benefices. The very institutional success of the church produced the rot. Yet the church survived — not through its corrupt leaders but through its monasteries. Cluny, founded in 910, quietly kept the Rule, kept the liturgy, kept the faith. When reform came, it came from the monks, not the popes. The 10th century proves the church can survive its own worst leaders.'},
  ],
};

const M13_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 14 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">The Dark Ages</h1>
<p class="article-sub">Pornocracy, raiders &amp; Otto the Great · 10th century</p>
<div class="art-divider"></div>
<div class="article-body">
<p>The tenth century was the church's nightmare hundred years — its <strong>Dark</strong> Ages. Corrupt popes installed by Roman nobles. Ignorant parish clergy. <strong>Viking</strong> raids from the north, <strong>Muslim</strong> raids from the south.</p>
<figure style="margin:1.75rem 0;border:1px solid rgba(20,8,12,0.1);border-radius:10px;overflow:hidden;">
  <img src="/images/middle-ages/DarkAges.jpeg" style="width:100%;display:block;object-fit:cover;object-position:top center;max-height:420px;">
  <figcaption><strong>The 10th-century papacy</strong> Corrupt popes installed by Roman nobles, parish clergy too ignorant to read the liturgy — the church's nightmare hundred years.</figcaption>
</figure>
<p>For most of the 900s the papacy was controlled by the <strong>Theophylact</strong> family of Rome, whose women — Theodora and her daughter <strong>Marozia</strong> — installed their lovers, sons, and grandsons on the papal throne. Later historians named this stretch the <strong>pornocracy</strong>. Marozia's grandson became <strong>John XII</strong>, made pope at eighteen in <strong>955</strong>, who turned the Lateran palace into a den of vice. Outside Rome things were no better. Viking raiders plundered the British Isles and the coasts of Francia; Muslim raiders struck up the Italian peninsula from Sicily and North Africa; monasteries burned, libraries were lost, and many parish clergy could not even read the <strong>Latin</strong> Mass they recited.</p>
<p>Rescue came not from Rome but from Germany. In <strong>962</strong> the German king <strong>Otto I</strong> marched into Italy and was crowned emperor by John XII — and within a year deposed the same pope for murder and <strong>sacrilege</strong>. Otto's coronation founded what would be called the Holy <strong>Roman</strong> Empire and gave the German emperors a veto over papal elections. The church had reached its lowest point in a thousand years. But the seed of recovery had already been planted — not at the Lateran, but in a quiet monastery in Burgundy called <strong>Cluny</strong>.</p>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">955</div><div class="atl-text">John XII becomes pope at eighteen</div></div>
  <div class="atl-row"><div class="atl-year">962</div><div class="atl-text">Otto I crowned emperor; Holy Roman Empire founded</div></div>
  <div class="atl-row"><div class="atl-year">963</div><div class="atl-text">Otto deposes John XII for murder and sacrilege</div></div>
</div>
</div>`;

_track3.lessons[13].articleHtml=M13_ARTICLE_HTML;
_track3.lessons[13].learn=M13_LEARN;
_track3.lessons[13].study=M13_STUDY;
_track3.lessons[13].coldOpen={_bg:'/images/middle-ages/DarkAges.jpeg',cards:[
  {label:'The World Before',text:'Charlemagne\'s empire has fractured. Rome is a violent provincial town ruled by feuding noble families. The pope is whoever they crown this season.',size:'lg'},
  {label:'The Crisis',text:'A Roman matriarch places her teenage grandson on the throne of Peter. Vikings burn the monasteries of Britain. Muslim ships strike up the Italian coast.',size:'xl'},
  {label:'The Key Figures',text:'Marozia, the matriarch of the pornocracy. John XII, the boy pope. Otto I of Germany, who marched in and put both crown and discipline on the papacy.',size:'lg'},
  {label:'The Bridge',text:'Here is how the church fell to its lowest point in a millennium — and how reform began, quietly, in a Burgundian monastery called Cluny.',size:'md'},
]};

const M14_LEARN=[
  {sentence:"Cluny was founded in the year _____ in Burgundy.",answer:"910",options:["910","962","988","1054"],explanation:"Duke William the Pious founded Cluny in 910 — the seedbed of medieval monastic reform.",tier:1},
  {sentence:"The founder of Cluny was Duke William the _____.",answer:"Pious",options:["Pious","Conqueror","Great","Fair"],explanation:"Duke William the Pious of Aquitaine gave the land and wrote the unusual foundation charter.",tier:1},
  {sentence:"Cluny was founded in the French region of _____.",answer:"Burgundy",options:["Burgundy","Normandy","Aquitaine","Provence"],explanation:"Cluny lies in Burgundy, in eastern France, and its name became shorthand for medieval reform.",tier:1},
  {sentence:"Cluny's charter made the abbey subject to no king, count, or bishop — only to _____.",answer:"Rome",options:["Rome","the emperor","the abbot","Canterbury"],explanation:"The famous clause placed Cluny under the protection of Peter and Paul — Rome alone.",tier:1},
  {sentence:"The strict rule Cluny returned to was the Rule of _____.",answer:"Benedict",options:["Benedict","Basil","Augustine","Francis"],explanation:"Cluny's reform was a strict recovery of Benedict's 6th-century Rule.",tier:1},
  {sentence:"At the heart of the Cluniac reform was a renewed emphasis on _____.",answer:"worship",options:["worship","preaching","study","manual labor"],explanation:"Cluny made the long Latin liturgy — worship — the center of monastic life.",tier:1},
  {sentence:"The first abbot of Cluny (910–927) was _____.",answer:"Berno",options:["Berno","Odo","Odilo","Hugh"],explanation:"Berno was the founding abbot of Cluny and the first in a long line of holy reforming abbots.",tier:1},
  {sentence:"The longest-serving Cluniac abbot, 1049–1109, was _____ the Great.",answer:"Hugh",options:["Hugh","Odo","Odilo","Berno"],explanation:"Hugh the Great served sixty years as abbot of Cluny and presided over the network at its height.",tier:1},
  {sentence:"Monasteries that joined the Cluniac reform and placed themselves under Cluny's authority were called _____ houses.",answer:"daughter",options:["daughter","sister","brother","grange"],explanation:"Reformed monasteries that submitted to Cluny were known as daughter houses; by the late 11th century the network exceeded a thousand.",tier:1},
  {sentence:"By the late 11th century, the Cluniac network exceeded a _____ daughter houses.",answer:"thousand",options:["thousand","hundred","million","dozen"],explanation:"At its height under Hugh the Great, Cluny had more than a thousand affiliated monasteries across Europe.",tier:1},
  {sentence:"The deep disease of the age that Cluny attacked was that the church was owned by _____.",answer:"laymen",options:["laymen","heretics","monks","emperors"],explanation:"Cluniacs preached that a monastery or bishopric was not a piece of property to be bought, sold, or inherited by lay lords.",tier:1},
  {sentence:"The Cluniac reformer who became Pope Gregory VII in 1073 was _____.",answer:"Hildebrand",options:["Hildebrand","Bernard","Anselm","Lanfranc"],explanation:"Hildebrand, formed in the Cluniac reform stream, became Pope Gregory VII in 1073 and turned monastic protest into papal program.",tier:1},
];

const M14_STUDY={
  cards:[{
    text:'In 910, Duke William the Pious founded Cluny with a startling charter: the monastery would answer to no king, count, or bishop — only to Rome. A succession of holy abbots turned one house into a movement of more than a thousand daughter houses. From Cluny\'s reform stream came the great 11th-century reforming popes.',
    terms:[
      {word:'The Cluniac Reform',def:'The 10th–11th century monastic renewal beginning at Cluny in Burgundy (910). Recovered strict Benedictine discipline, made worship the center of monastic life, and insisted the abbey answered to Rome alone.'},
      {word:'Duke William the Pious',def:'Founder of Cluny in 910, who wrote into its charter the unprecedented clause freeing the monastery from all feudal control — subject only to the Apostles Peter and Paul.'},
      {word:'Lay investiture',def:'The disease Cluny protested — treating church offices (abbacies, bishoprics) as property to be bought, sold, and granted by lay lords in exchange for political loyalty.'},
      {word:'Hugh the Great',def:'The long-reigning abbot of Cluny (1049–1109) under whom the network of daughter houses reached its peak of over a thousand. He was godfather to future popes.'},
      {word:'Gregory VII (Hildebrand)',def:'The reforming pope formed in the Cluniac stream who in 1073 turned monastic protest into a full papal program — the Investiture Controversy.'},
    ],
    questions:[],
  }],
  questions:[
    {q:'Why was Cluny\'s independence from feudal control the key to its reforming power?',a:'The deepest disease of the 10th-century church was that it was owned by laymen. Bishoprics and abbacies were treated as real estate — granted to political allies, inherited by sons, sold for cash. The reform that lasted could not come from within that system; it had to stand outside it. Cluny\'s charter freed it from every feudal lord, answerable to Rome alone. That freedom let it live the Rule without compromise, accumulate moral authority across a century, and eventually send its spiritual sons into the papacy itself. Reform in the church has always required some institutional space that the world does not control.'},
  ],
};

const M14_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 15 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">The Cluniac Reform</h1>
<p class="article-sub">A monastery answering only to Rome · 910–1109</p>
<div class="art-divider"></div>
<div class="article-body">
<p>While the 10th-century papacy was collapsing into the pornocracy, the seed of recovery was already sprouting in a quiet <strong>Burgundian</strong> valley. In <strong>910</strong>, Duke <strong>William the Pious</strong> founded the monastery of <strong>Cluny</strong>, and he wrote into its charter a clause unlike any other: the abbey would be subject to no king, no count, no bishop — only to <strong>Rome</strong>.</p>
<figure style="margin:1.75rem 0;border:1px solid rgba(20,8,12,0.1);border-radius:10px;overflow:hidden;">
  <img src="/images/middle-ages/Cluniac.jpeg" style="width:100%;display:block;object-fit:cover;object-position:top center;max-height:420px;">
  <figcaption><strong>The Cluniac Reform · 910</strong> Founded by Duke William the Pious and answerable only to Rome, Cluny planted a monastic reform that would reshape the medieval church.</figcaption>
</figure>
<p>Cluny's recovery was the strict <strong>Rule of Benedict</strong>, with <strong>worship</strong> — the long, beautiful Latin liturgy — restored to the center of monastic life. A succession of long-lived holy abbots — <strong>Berno</strong> (the first, 910–927), then Odo, Odilo, and <strong>Hugh the Great</strong> (1049–1109) — turned a single abbey into a movement. Reformed houses across Europe placed themselves under Cluny's authority; by the late 11th century the network of <strong>daughter houses</strong> exceeded a <strong>thousand</strong>.</p>
<p>The model spread because it answered the deepest disease of the age: the church was owned by <strong>laymen</strong>. A monastery was treated as a piece of property to be bought, sold, or inherited; a bishopric the same. Cluny was the living protest. From its reform stream came the great 11th-century reforming popes — chief among them <strong>Hildebrand</strong>, who in 1073 became Pope <strong>Gregory VII</strong> and turned monastic protest into a papal program.</p>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">910</div><div class="atl-text">William the Pious founds Cluny in Burgundy</div></div>
  <div class="atl-row"><div class="atl-year">1049</div><div class="atl-text">Hugh the Great becomes abbot; Cluny at its height</div></div>
  <div class="atl-row"><div class="atl-year">1073</div><div class="atl-text">Hildebrand — formed in the Cluniac stream — becomes Pope Gregory VII</div></div>
</div>
<div class="pull-quote">
  <p>"Subject neither to king, nor to bishop, nor to count — but only to the Apostles Peter and Paul."</p>
  <cite>— Foundation charter of Cluny, 910</cite>
</div>
</div>`;

_track3.lessons[14].articleHtml=M14_ARTICLE_HTML;
_track3.lessons[14].learn=M14_LEARN;
_track3.lessons[14].study=M14_STUDY;
_track3.lessons[14].coldOpen={_bg:'/images/middle-ages/Cluniac.jpeg',cards:[
  {label:'The World Before',text:'Rome has collapsed into the pornocracy. Bishoprics are sold like property. Most parish priests cannot read the Latin Mass they recite.',size:'lg'},
  {label:'The Crisis',text:'The church has become a piece of real estate — owned, inherited, and traded by lay lords. Where can renewal possibly come from?',size:'xl'},
  {label:'The Key Figures',text:'Duke William the Pious, founder of Cluny. Berno, its first abbot. Hugh the Great, who presided over a thousand daughter houses.',size:'lg'},
  {label:'The Bridge',text:'Here is how a single Burgundian valley re-set the moral compass of the medieval church — and seeded the great reforming popes.',size:'md'},
]};

const M15_LEARN=[
  {sentence:"The pagan warlord-prince of the Rus who became Russia's first Christian ruler was _____ of Kiev.",answer:"Vladimir",options:["Vladimir","Yaroslav","Sviatoslav","Igor"],explanation:"Vladimir of Kiev (c. 958–1015) chose Byzantine Christianity for the Rus and was baptized in 988.",tier:1},
  {sentence:"Vladimir's mass baptism of his people took place in the year _____.",answer:"988",options:["988","962","1054","800"],explanation:"Vladimir was baptized and ordered the mass baptism of Kiev in 988.",tier:1},
  {sentence:"Vladimir's envoys reported on Byzantine worship from inside _____ Sophia.",answer:"Hagia",options:["Hagia","Saint","Sancta","Holy"],explanation:"Vladimir's envoys observed the Divine Liturgy in Constantinople's Hagia Sophia and said they knew not whether they were in heaven or on earth.",tier:1},
  {sentence:"The Byzantine princess Vladimir married was named _____.",answer:"Anna",options:["Anna","Theodora","Eudoxia","Irene"],explanation:"Vladimir married Anna, sister of Byzantine Emperor Basil II, sealing his alliance with Constantinople.",tier:1},
  {sentence:"Anna was the sister of Byzantine Emperor _____ II.",answer:"Basil",options:["Basil","Justinian","Leo","Constantine"],explanation:"Princess Anna's brother was the Byzantine Emperor Basil II.",tier:1},
  {sentence:"The mass baptism of Vladimir's people took place in the river _____.",answer:"Dnieper",options:["Dnieper","Danube","Volga","Don"],explanation:"Vladimir ordered the people of Kiev herded into the Dnieper for mass baptism.",tier:1},
  {sentence:"Vladimir ruled from the city of _____.",answer:"Kiev",options:["Kiev","Moscow","Novgorod","Constantinople"],explanation:"Kiev was the capital of the Rus state and the site of the 988 mass baptism.",tier:1},
  {sentence:"Among the faiths Vladimir's envoys studied were Islam, Judaism, Latin Christianity from Germany, and Byzantine Christianity from _____.",answer:"Constantinople",options:["Constantinople","Rome","Antioch","Alexandria"],explanation:"Vladimir's envoys studied four faiths; Byzantine Christianity, observed in Constantinople, won the day.",tier:1},
  {sentence:"The Christianity planted by Vladimir's baptism would be known as Russian _____.",answer:"Orthodoxy",options:["Orthodoxy","Catholicism","Lutheranism","Arianism"],explanation:"From Vladimir's choice the Slavic east received Byzantine Christianity — Russian Orthodoxy, a daughter of Constantinople.",tier:1},
  {sentence:"Russian Orthodoxy was born as a daughter church of _____.",answer:"Constantinople",options:["Constantinople","Rome","Antioch","Jerusalem"],explanation:"Vladimir's choice tied the Slavic east to the Greek patriarchate of Constantinople, not the Latin patriarchate of Rome.",tier:1},
  {sentence:"The envoys' famous report on Hagia Sophia was that they knew not whether they were in heaven or on _____.",answer:"earth",options:["earth","Olympus","Zion","paradise"],explanation:'The line is preserved in the Russian Primary Chronicle: "We knew not whether we were in heaven or on earth."',tier:1},
  {sentence:"Vladimir's 988 baptism took place only decades before the East–West Schism of _____.",answer:"1054",options:["1054","962","988","800"],explanation:"Vladimir chose the Byzantine east just decades before the Schism of 1054 would harden the East–West divide.",tier:1},
];

const M15_STUDY={
  cards:[{
    text:'In the late 980s, the pagan warlord-prince Vladimir of Kiev sent envoys to study four faiths. They returned from a service in Hagia Sophia saying they knew not whether they were in heaven or on earth. Vladimir chose Byzantium. In 988 he was baptized and ordered his people into the Dnieper River.',
    terms:[
      {word:'Vladimir of Kiev (c. 958–1015)',def:'The pagan Rus prince who chose Byzantine Christianity for his people — founding Russian Orthodoxy and binding the Slavic east to Constantinople.'},
      {word:'Hagia Sophia vision',def:'The chronicle account of Vladimir\'s envoys who attended the Divine Liturgy in Constantinople: "We knew not whether we were in heaven or on earth." Their wonder drove Vladimir\'s choice.'},
      {word:'Princess Anna',def:'The Byzantine princess, sister of Emperor Basil II, whom Vladimir married as part of the baptism arrangement — cementing the political and religious bond between Kiev and Constantinople.'},
      {word:'988',def:'The year of Vladimir\'s baptism and the mass baptism of Kiev in the Dnieper River — the traditional founding date of Russian Orthodoxy.'},
      {word:'Russian Orthodoxy',def:'The Slavic-Byzantine Christianity planted by Vladimir\'s 988 baptism — a daughter church of Constantinople, shaping the spiritual and cultural life of Russia, Ukraine, and Belarus for a millennium.'},
    ],
    questions:[],
  }],
  questions:[
    {q:'What does Vladimir\'s conversion reveal about how the medieval church grew — and what it risked?',a:'Vladimir\'s conversion was a political act as much as a spiritual one — he chose a faith, negotiated a princess, and baptized his people by royal command. The medieval church\'s growth was deeply bound up with the conversion of kings; when a king converted, a people followed. But this method produced exactly what Gregory the Great saw after his Anglo-Saxon mission: a nominal Christianity, broad and shallow, where masses were baptized without teaching. Russian Orthodoxy\'s depth — its liturgy, mysticism, and culture — came layer by layer over centuries. The 988 event was the beginning, not the end.'},
  ],
};

const M15_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 16 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">Vladimir &amp; the Baptism of Russia</h1>
<p class="article-sub">The choosing of the Slavic east · 988</p>
<div class="art-divider"></div>
<div class="article-body">
<p>How did Russia become Orthodox? Through one man and one choice.</p>
<figure style="margin:1.75rem 0;border:1px solid rgba(20,8,12,0.1);border-radius:10px;overflow:hidden;">
  <img src="/images/middle-ages/licensed-image.jpeg" style="width:100%;display:block;object-fit:cover;object-position:top center;max-height:420px;">
  <figcaption><strong>The Baptism of Vladimir · 988</strong> Klavdy Lebedev's depiction of Vladimir of Kiev embracing Byzantine Christianity — and binding the Russian people to it.</figcaption>
</figure>
<p><strong>Vladimir of Kiev</strong> (c. 958–1015) was a pagan warlord-prince of the Rus. In the late 980s, looking to fix a religion for his people, he sent envoys to study the world's faiths — Islam, Judaism, Latin Christianity from Germany, and Byzantine Christianity from <strong>Constantinople</strong>. The chronicle says the envoys returned from a service inside <strong>Hagia Sophia</strong> and reported: <em>"We knew not whether we were in heaven or on earth."</em> Vladimir chose the Byzantine east.</p>
<p>In <strong>988</strong>, after his own baptism and his marriage to the Byzantine princess <strong>Anna</strong> (sister of Emperor <strong>Basil II</strong>), Vladimir ordered the mass baptism of his people in the <strong>Dnieper</strong> River at <strong>Kiev</strong>. Idols were smashed; churches rose; a Slavic-Byzantine Christianity was planted in the lands that would become Russia, Ukraine, and Belarus. <strong>Russian Orthodoxy</strong> was born — a daughter of Constantinople — drawing the Slavic east into the cultural orbit of the Greek church just decades before the East–West Schism of <strong>1054</strong> would harden the lines.</p>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">c. 987</div><div class="atl-text">Vladimir's envoys report on Hagia Sophia in Constantinople</div></div>
  <div class="atl-row"><div class="atl-year">988</div><div class="atl-text">Vladimir baptized; mass baptism of Kiev in the Dnieper</div></div>
</div>
<div class="pull-quote">
  <p>"We knew not whether we were in heaven or on earth — for surely there is no such splendor or beauty anywhere on earth."</p>
  <cite>— Vladimir's envoys, on the worship in Hagia Sophia</cite>
</div>
</div>`;

_track3.lessons[15].articleHtml=M15_ARTICLE_HTML;
_track3.lessons[15].learn=M15_LEARN;
_track3.lessons[15].study=M15_STUDY;
_track3.lessons[15].coldOpen={_bg:'/images/middle-ages/licensed-image.jpeg',cards:[
  {label:'The World Before',text:'Kievan Rus is a sprawling pagan principality astride the rivers between the Baltic and the Black Sea. Its prince, a hard warlord, is hunting a religion for his people.',size:'lg'},
  {label:'The Crisis',text:'Four faiths come courting: Islam from the Volga, Judaism from the Khazars, Latin Christianity from the Germans, Byzantine Christianity from Constantinople. Which will Vladimir choose?',size:'xl'},
  {label:'The Key Figures',text:'Vladimir of Kiev, the prince making the choice. His envoys, sent to see each faith. Princess Anna of Byzantium, whose marriage will seal the choice.',size:'lg'},
  {label:'The Bridge',text:'Here is how Vladimir\'s envoys returned from Hagia Sophia and decided the religious future of the Slavic east — for a thousand years.',size:'md'},
]};

const M16_LEARN=[
  {sentence:"The Great Schism between East and West occurred in the year _____.",answer:"1054",options:["1054","988","962","1095"],explanation:"On July 16, 1054, mutual excommunications between Rome and Constantinople broke the visible unity of the church.",tier:1},
  {sentence:"Pope Leo IX sent his legate to Constantinople — Cardinal _____ of Silva Candida.",answer:"Humbert",options:["Humbert","Hildebrand","Lanfranc","Anselm"],explanation:"Cardinal Humbert of Silva Candida was the abrasive papal legate sent to Constantinople in 1054.",tier:1},
  {sentence:"Humbert's antagonist, the Patriarch of Constantinople, was Michael _____.",answer:"Cerularius",options:["Cerularius","Photios","Bessarion","Palamas"],explanation:"Michael Cerularius was Patriarch of Constantinople; his collapse of negotiations with Humbert triggered the mutual anathemas.",tier:1},
  {sentence:"Humbert laid the bull of excommunication on the altar of _____ Sophia.",answer:"Hagia",options:["Hagia","Saint","Sancta","Holy"],explanation:"Humbert strode into Hagia Sophia during the liturgy on July 16, 1054, and laid the bull on the altar.",tier:1},
  {sentence:"The load-bearing theological dispute behind the Schism was the _____.",answer:"filioque",options:["filioque","tonsure","anathema","epiclesis"],explanation:"The filioque — a Latin clause added to the Nicene Creed — was the central doctrinal flashpoint.",tier:1},
  {sentence:"The filioque concerned the procession of the Holy _____.",answer:"Spirit",options:["Spirit","Father","Son","Trinity"],explanation:"The filioque clause concerns the procession of the Holy Spirit: whether from the Father alone, or from the Father and the Son.",tier:1},
  {sentence:'The Latin word "filioque" means "and from the _____."',answer:"Son",options:["Son","Father","Spirit","Cross"],explanation:'"Filioque" is Latin for "and from the Son" — the disputed addition to the creed.',tier:1},
  {sentence:"The creed the filioque was added to was the _____ Creed.",answer:"Nicene",options:["Nicene","Apostles’","Athanasian","Chalcedonian"],explanation:"The Nicene Creed — formed at Nicaea (325) and Constantinople (381) — was the text the Latins had altered.",tier:1},
  {sentence:"The pope who sent Humbert to Constantinople was _____ IX.",answer:"Leo",options:["Leo","Gregory","Nicholas","Innocent"],explanation:"Pope Leo IX (1049–1054) — one of the first reforming popes — sent the delegation under Humbert.",tier:1},
  {sentence:"Greek and Latin Christians had drifted apart in language, _____, and politics.",answer:"liturgy",options:["liturgy","architecture","music","painting"],explanation:"The cumulative drift was in language, liturgy, and politics — but the doctrinal flashpoint was the filioque.",tier:1},
  {sentence:"After 1054 the Greek east was known as the _____ Church.",answer:"Orthodox",options:["Orthodox","Catholic","Reformed","Coptic"],explanation:"Henceforth there was a Latin Roman Catholic church and a Greek Orthodox church.",tier:1},
  {sentence:"After 1054 the Latin west would be known as the Roman _____ Church.",answer:"Catholic",options:["Catholic","Orthodox","Anglican","Lutheran"],explanation:"From 1054 forward, the Latin west would be the Roman Catholic Church and the Greek east the Orthodox Church.",tier:1},
];

const M16_STUDY={
  cards:[{
    text:'On July 16, 1054, Cardinal Humbert walked into Hagia Sophia during the Divine Liturgy and laid a bull of excommunication on the altar. Patriarch Cerularius excommunicated Humbert in return. The break had been seven centuries in the making — language, liturgy, politics, and above all the Filioque. It has never been healed.',
    terms:[
      {word:'The Filioque',def:'The Latin clause "and from the Son" added to the Nicene Creed in the West. The Greek east rejected it as unauthorized tampering and made it the doctrinal core of the 1054 break.'},
      {word:'The Great Schism (1054)',def:'The mutual excommunications of July 16, 1054, in Hagia Sophia — breaking visible communion between the Roman Catholic west and the Greek Orthodox east.'},
      {word:'Cardinal Humbert',def:'The papal legate who walked into Hagia Sophia on July 16, 1054, and placed the bull of excommunication on the altar — the act that formally broke East-West communion.'},
      {word:'Michael Cerularius',def:'The Patriarch of Constantinople whose intransigence with Humbert triggered the 1054 exchange. He synodically excommunicated Humbert and Pope Leo IX in response.'},
      {word:'Pope Leo IX',def:'The reforming pope who sent Humbert\'s embassy to Constantinople. He died before the excommunications were issued, making Humbert\'s bull technically questionable — but the break held anyway.'},
    ],
    questions:[],
  }],
  questions:[
    {q:'Why has the Great Schism of 1054 never been healed — even after the mutual excommunications were lifted in 1964?',a:'The excommunications were personal and narrow — targeting individuals, not whole churches. Pope Paul VI and Patriarch Athenagoras lifted them in 1964 as a gesture of goodwill. But the real barriers remain: the Filioque (still in the Latin creed, still rejected by the East), the question of papal primacy and universal jurisdiction, and seven centuries of separate theological, liturgical, and cultural development. These are not misunderstandings to be cleared up with a handshake — they are deep structural differences about authority, Trinitarian theology, and the nature of the church. The 1054 break persists not because the personalities were wrong but because the issues were real.'},
  ],
};

const M16_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 17 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">The Great Schism of 1054</h1>
<p class="article-sub">East and West break communion · 1054</p>
<div class="art-divider"></div>
<div class="article-body">
<p>On July 16, <strong>1054</strong>, a Latin cardinal walked into <strong>Hagia Sophia</strong> during the Divine <strong>Liturgy</strong>, laid a bull of excommunication on the altar, and walked out. The Greek patriarch responded in kind. The visible unity of the church was broken — and has never been restored.</p>
<figure style="margin:1.75rem 0;border:1px solid rgba(20,8,12,0.1);border-radius:10px;overflow:hidden;">
  <img src="/images/middle-ages/Schism.jpeg" style="width:100%;display:block;object-fit:cover;object-position:top center;max-height:420px;">
  <figcaption><strong>The Great Schism · 1054</strong> Latin cardinals lay a bull of excommunication on the altar of Hagia Sophia. The visible unity of East and West is broken.</figcaption>
</figure>
<p>The break had been about seven centuries in the making. The Latin west and the Greek east had drifted apart in language, liturgy, and politics, but the load-bearing dispute was theological: the <strong>filioque</strong>. The Latin west had added a clause to the <strong>Nicene</strong> Creed declaring that the Holy <strong>Spirit</strong> proceeds from the Father <em>and from the Son</em> (Latin <em>filioque</em>, "and from the Son"). The Greeks called it unauthorized tampering with a council's creed.</p>
<p>In 1054 Pope <strong>Leo</strong> IX sent Cardinal <strong>Humbert</strong> of Silva Candida to Constantinople. Negotiations with Patriarch Michael <strong>Cerularius</strong> collapsed. Humbert's bull on the altar excommunicated Cerularius; Cerularius synodically excommunicated Humbert and the pope. Each side cursed specific individuals rather than the whole other church, but the symbolism was total. Henceforth there would be a Latin Roman <strong>Catholic</strong> Church and a Greek <strong>Orthodox</strong> Church — and a thousand-year wound between them.</p>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">1054</div><div class="atl-text">Humbert lays bull of excommunication on the altar of Hagia Sophia (July 16)</div></div>
  <div class="atl-row"><div class="atl-year">1054</div><div class="atl-text">Cerularius excommunicates Humbert and Pope Leo IX in return</div></div>
</div>
</div>`;

_track3.lessons[16].articleHtml=M16_ARTICLE_HTML;
_track3.lessons[16].learn=M16_LEARN;
_track3.lessons[16].study=M16_STUDY;
_track3.lessons[16].coldOpen={_bg:'/images/middle-ages/Schism.jpeg',cards:[
  {label:'The World Before',text:'Seven centuries of drift between Greek east and Latin west — different languages, different liturgies, different politics. One creed, with one disputed clause.',size:'lg'},
  {label:'The Crisis',text:'A Latin cardinal arrives in Constantinople with a charge: the filioque is orthodox. The patriarch refuses to discuss it. The negotiations collapse.',size:'xl'},
  {label:'The Key Figures',text:'Pope Leo IX, who sent the embassy. Cardinal Humbert of Silva Candida, who laid the bull on the altar. Patriarch Michael Cerularius, who returned the anathema.',size:'lg'},
  {label:'The Bridge',text:'Here is the moment the visible unity of the church broke — and has never been restored.',size:'md'},
]};

const M17_LEARN=[
  {sentence:"The Italian monk who became Archbishop of Canterbury and reshaped western atonement theology was _____.",answer:"Anselm",options:["Anselm","Aquinas","Abelard","Lanfranc"],explanation:"Anselm of Canterbury (1033–1109) was an Italian who became Archbishop of Canterbury and wrote two short books that defined medieval theology.",tier:1},
  {sentence:"Anselm became Archbishop of _____.",answer:"Canterbury",options:["Canterbury","Rome","York","Paris"],explanation:"Anselm was made Archbishop of Canterbury in 1093.",tier:1},
  {sentence:"Anselm's short book containing the ontological argument is the _____.",answer:"Proslogion",options:["Proslogion","Sentences","Confessions","Summa"],explanation:"Anselm's Proslogion (c. 1077) proposed what later thinkers called the ontological argument.",tier:1},
  {sentence:"Anselm defined God as that than which _____ greater can be conceived.",answer:"nothing",options:["nothing","something","anything","much"],explanation:'Anselm\'s formula: God is "that than which nothing greater can be conceived."',tier:1},
  {sentence:"What later thinkers called the _____ argument is Anselm's argument from the very idea of God to His existence.",answer:"ontological",options:["ontological","cosmological","teleological","moral"],explanation:"Anselm's argument from the idea of God to his necessary existence became known as the ontological argument.",tier:1},
  {sentence:'Anselm\'s second great book is _____ Deus Homo — "Why the God-Man."',answer:"Cur",options:["Cur","Quid","Quare","Quomodo"],explanation:'Cur Deus Homo (Latin for "Why the God-Man") was Anselm\'s 1098 treatise on the atonement.',tier:1},
  {sentence:"Cur Deus Homo was published in the year _____.",answer:"1098",options:["1098","1054","1077","1095"],explanation:"Anselm completed Cur Deus Homo in 1098.",tier:1},
  {sentence:"Earlier theologians had often described the cross as a ransom paid to the _____.",answer:"devil",options:["devil","Father","Spirit","angels"],explanation:"The ransom-to-the-devil theory was widespread; Anselm rejected it in Cur Deus Homo.",tier:1},
  {sentence:"For Anselm, the cross was not a ransom to the devil but a payment of _____ owed to God.",answer:"honor",options:["honor","fear","obedience","gratitude"],explanation:"For Anselm, sin is an offense against God's infinite honor — a debt only the God-Man can pay.",tier:1},
  {sentence:"Anselm's atonement theory came to be called the _____ theory.",answer:"satisfaction",options:["satisfaction","ransom","moral influence","governmental"],explanation:"Because Christ satisfies the debt of honor owed to God, Anselm's view is called the satisfaction theory.",tier:1},
  {sentence:"Only God can pay the debt of sin; only _____ owes it; so only a God-Man can pay it.",answer:"man",options:["man","the angel","the priest","the king"],explanation:"Anselm's logic: only God can pay, only man owes — so only a God-Man can satisfy.",tier:1},
  {sentence:"Anselm was a monk born in _____ before he was called north.",answer:"Italy",options:["Italy","France","England","Germany"],explanation:"Anselm was an Italian monk before he was eventually made Archbishop of Canterbury in England.",tier:1},
];

const M17_STUDY={
  cards:[{
    text:'Anselm of Canterbury (1033–1109) asked two questions that defined medieval theology. In the Proslogion (c. 1077) he argued God — "that than which nothing greater can be conceived" — must necessarily exist. In Cur Deus Homo (1098) he replaced the ransom-to-the-devil theory with the satisfaction theory: only a God-Man can pay the infinite debt human sin owes to God.',
    terms:[
      {word:'Proslogion (c. 1077)',def:'Anselm\'s short philosophical work containing the ontological argument — the argument from the very idea of God to his necessary existence.'},
      {word:'Ontological argument',def:'Anselm\'s proof: God is "that than which nothing greater can be conceived," and what exists in reality is greater than what exists only in thought — therefore God must exist in reality.'},
      {word:'Cur Deus Homo (1098)',def:'"Why the God-Man?" — Anselm\'s treatise on the atonement that displaced the ransom-to-the-devil theory and set the terms for medieval Western soteriology.'},
      {word:'Satisfaction theory',def:'Anselm\'s account of the cross: sin is an infinite offense against an infinite God, creating a debt of honor no creature can pay. Only God can pay; only man owes; so only a God-Man can satisfy.'},
      {word:'Ransom-to-the-devil theory',def:'The earlier account of the cross — that Christ\'s death was a ransom paid to the devil to free humanity from his claim. Anselm dismantled it in Cur Deus Homo, redirecting the payment to God.'},
    ],
    questions:[],
  }],
  questions:[
    {q:'Why is Anselm\'s satisfaction theory significant — and what does it get right that the ransom theory missed?',a:'The ransom-to-the-devil theory had a real problem: it made the devil a creditor to whom God was obligated. Anselm\'s shift was crucial — the offense is against God, not the devil, and it is God\'s own honor and justice that require satisfaction. The cross is not God paying a ransom to a third party but God himself, in Christ, making the payment his own justice requires. This is the structure of thought that runs through Reformation soteriology: the cross as the satisfaction of divine justice — penal substitution developed directly from the seed Anselm planted.'},
  ],
};

const M17_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 18 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">Anselm &amp; Cur Deus Homo</h1>
<p class="article-sub">Why the God-Man? · 1077–1098</p>
<div class="art-divider"></div>
<div class="article-body">
<p>Why a God-Man? <strong>Anselm</strong> of Canterbury (1033–1109) asked it as a logical question and changed how the West thought about the cross.</p>
<figure style="margin:1.75rem 0;border:1px solid rgba(20,8,12,0.1);border-radius:10px;overflow:hidden;">
  <img src="/images/middle-ages/Anselm.jpeg" style="width:100%;display:block;object-fit:cover;object-position:top center;max-height:420px;">
  <figcaption><strong>Anselm of Canterbury · 1033–1109</strong> His <em>Cur Deus Homo</em> ("Why a God-Man?") asked the question logically — and reshaped Western thinking about the cross.</figcaption>
</figure>
<p>An <strong>Italian</strong> monk who became Archbishop of <strong>Canterbury</strong>, Anselm wrote two short books that defined medieval theology. In the <strong>Proslogion</strong> (c. 1077) he proposed what later thinkers called the <strong>ontological</strong> argument: God is <em>"that than which <strong>nothing</strong> greater can be conceived"</em> — and what exists in reality is greater than what exists only in the mind. Therefore God must exist. It is the most discussed argument in the history of philosophy.</p>
<p>In <strong>Cur Deus Homo</strong> ("Why the God-<strong>Man</strong>," <strong>1098</strong>) Anselm reshaped the western doctrine of atonement. Earlier theologians had often said Christ's death was a <em>ransom paid to the <strong>devil</strong></em>. No, Anselm answered. Human sin is an infinite offense against an infinite God; the debt of <strong>honor</strong> owed cannot be paid by any creature. Only God can pay it; only man owes it. So the <strong>satisfaction</strong> can be made by no one but a God-Man. The cross was a payment to God — not to the devil — by the only one able to make it.</p>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">c. 1077</div><div class="atl-text">Proslogion — Anselm formulates the ontological argument</div></div>
  <div class="atl-row"><div class="atl-year">1093</div><div class="atl-text">Anselm becomes Archbishop of Canterbury</div></div>
  <div class="atl-row"><div class="atl-year">1098</div><div class="atl-text">Cur Deus Homo — satisfaction theory of the atonement</div></div>
</div>
<div class="pull-quote">
  <p>"God is that than which nothing greater can be conceived."</p>
  <cite>— Anselm, Proslogion</cite>
</div>
</div>`;

_track3.lessons[17].articleHtml=M17_ARTICLE_HTML;
_track3.lessons[17].learn=M17_LEARN;
_track3.lessons[17].study=M17_STUDY;
_track3.lessons[17].coldOpen={_bg:'/images/middle-ages/Anselm.jpeg',cards:[
  {label:'The World Before',text:'Western theology has explained the cross for centuries as a ransom paid to the devil — the price God paid to free humanity from Satan\'s claim.',size:'lg'},
  {label:'The Crisis',text:'Why a God-Man? Could God not simply forgive? An Italian monk in Canterbury thinks the explanations of the cross have grown muddled — and dangerous.',size:'xl'},
  {label:'The Key Figures',text:'Anselm of Canterbury — Italian monk, archbishop, philosopher — who will rewire the West\'s account of God\'s existence and the meaning of the atonement.',size:'lg'},
  {label:'The Bridge',text:'Here is how Anselm\'s two short books set the terms for a thousand years of Western theology — the ontological argument, and the satisfaction theory of the cross.',size:'md'},
]};

const M18_LEARN=[
  {sentence:"The medieval problem of kings and emperors handing bishops their rings and staffs was called lay _____.",answer:"investiture",options:["investiture","simony","tenure","patronage"],explanation:"Lay investiture was the practice of secular rulers conferring the symbols of spiritual office on bishops — and Gregory VII's target.",tier:1},
  {sentence:"Hildebrand became Pope _____ VII in 1073.",answer:"Gregory",options:["Gregory","Leo","Innocent","Nicholas"],explanation:"Hildebrand, formed in the Cluniac reform stream, became Pope Gregory VII in 1073.",tier:1},
  {sentence:"The reform stream that had shaped Hildebrand was the _____ Reform.",answer:"Cluniac",options:["Cluniac","Cistercian","Franciscan","Dominican"],explanation:"Hildebrand was formed in the Cluniac reform stream before his elevation as Gregory VII.",tier:1},
  {sentence:"In 1075 Gregory VII issued the _____ Papae, listing the rights of the pope.",answer:"Dictatus",options:["Dictatus","Donatio","Codex","Decretum"],explanation:"The Dictatus Papae of 1075 declared that the pope alone could depose emperors and that bishops could not be invested by laymen.",tier:1},
  {sentence:"The emperor who defied Gregory and was excommunicated was Henry _____.",answer:"IV",options:["IV","III","V","VI"],explanation:"Emperor Henry IV of Germany defied Gregory by appointing bishops; Gregory excommunicated him.",tier:1},
  {sentence:"In January 1077, Henry IV stood barefoot for three days at the castle of _____.",answer:"Canossa",options:["Canossa","Worms","Aachen","Pavia"],explanation:"Henry crossed the snowy Alps and waited barefoot three days outside Gregory's refuge at Canossa.",tier:1},
  {sentence:'"Going to _____" entered the language as a phrase for political humiliation.',answer:"Canossa",options:["Canossa","Rome","Worms","Aachen"],explanation:"Henry's humiliation at Canossa was so vivid the place-name itself became a phrase.",tier:1},
  {sentence:"The Dictatus Papae claimed the pope alone could _____ emperors.",answer:"depose",options:["depose","crown","absolve","ordain"],explanation:"Among the Dictatus Papae's most striking claims: the pope alone could depose emperors.",tier:1},
  {sentence:"The Investiture Controversy was finally settled by the Concordat of _____ in 1122.",answer:"Worms",options:["Worms","Canossa","Rome","Aachen"],explanation:"The Concordat of Worms (1122) ended the controversy and was ratified at Lateran I in 1123.",tier:1},
  {sentence:"The Concordat of Worms was ratified at the council of Lateran _____.",answer:"I",options:["I","II","III","IV"],explanation:"The First Lateran Council (1123) ratified the Concordat of Worms and closed the Investiture Controversy.",tier:1},
  {sentence:"Gregory excommunicated Henry; the German nobles threatened to _____ another king within a year.",answer:"elect",options:["elect","crown","murder","exile"],explanation:"The German princes warned their king that if he could not get the ban lifted within a year, they would elect another in his place.",tier:1},
  {sentence:"Gregory VII's simple program was that the _____ must be free.",answer:"church",options:["church","emperor","abbot","priest"],explanation:"Gregory's program: libertas ecclesiae — the church must be free of lay control.",tier:1},
];

const M18_STUDY={
  cards:[{
    text:'The Investiture Controversy was about who controlled the church\'s appointments. Gregory VII\'s 1075 Dictatus Papae declared the church must be free of lay lords. Emperor Henry IV defied him; Gregory excommunicated Henry; in January 1077 Henry stood barefoot three days in the snow at Canossa to be absolved. The Concordat of Worms (1122) finally settled it: the church was not royal property.',
    terms:[
      {word:'Lay investiture',def:'The practice by which kings and emperors handed bishops their rings and staffs — symbols of spiritual office — in exchange for political loyalty, making bishoprics royal property.'},
      {word:'Dictatus Papae (1075)',def:'Gregory VII\'s declaration of papal rights — including that bishops could not be invested by laymen and that the pope alone could depose emperors.'},
      {word:'Canossa (1077)',def:'The castle where Henry IV stood barefoot in the snow for three days awaiting Gregory\'s absolution. "Going to Canossa" entered the language as a phrase for political humiliation.'},
      {word:'Henry IV',def:'The Holy Roman Emperor who defied Gregory VII\'s investiture ban, was excommunicated, then made his famous submission at Canossa — only to resume the conflict afterward.'},
      {word:'Concordat of Worms (1122)',def:'The settlement ending the Investiture Controversy, ratified at Lateran I (1123). The emperor surrendered the ring and staff but kept a voice in choosing bishops.'},
    ],
    questions:[],
  }],
  questions:[
    {q:'What was really at stake in the Investiture Controversy — and who actually won?',a:'The immediate question was who appoints bishops: the pope or the emperor. But the deeper question was whether the church existed as an institution within secular society or above it. Gregory VII\'s Dictatus Papae claimed the pope could depose emperors — a maximalist claim no emperor could accept. The Concordat of Worms was a compromise: neither side got everything. The church won its essential point — bishoprics are not royal property. But emperors retained a voice in elections, and the political entanglement of church and state continued for centuries. The controversy was resolved, not solved.'},
  ],
};

const M18_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 19 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">Gregory VII &amp; the Investiture Controversy</h1>
<p class="article-sub">Canossa and the freedom of the church · 1073–1122</p>
<div class="art-divider"></div>
<div class="article-body">
<p>A barefoot king. A pope at the window. Three days in the snow. The medieval church's most famous showdown — and a battle over who controlled the church's appointments.</p>
<figure style="margin:1.75rem 0;border:1px solid rgba(20,8,12,0.1);border-radius:10px;overflow:hidden;">
  <img src="/images/middle-ages/GregoryVII.jpeg" style="width:100%;display:block;object-fit:cover;object-position:top center;max-height:420px;">
  <figcaption><strong>Gregory VII · 1073–1085</strong> The reforming pope whose showdown with Emperor Henry IV at Canossa pressed the question of who controls the church's appointments.</figcaption>
</figure>
<p>The problem was lay <strong>investiture</strong>: kings and emperors handed bishops their rings and staffs — the symbols of spiritual office — in exchange for political loyalty. Bishoprics had become royal property to be sold and granted. <strong>Hildebrand</strong>, formed in the <strong>Cluniac</strong> reform stream, became Pope <strong>Gregory</strong> VII in <strong>1073</strong> with a simple program: the <strong>church</strong> must be free. In 1075 he issued the <strong>Dictatus</strong> Papae, declaring that bishops could not be invested by laymen and that the pope alone could <strong>depose</strong> emperors.</p>
<p>Emperor Henry <strong>IV</strong> of Germany defied him by appointing bishops anyway. Gregory excommunicated Henry; the German nobles warned their king that if he could not get the ban lifted within a year, they would <strong>elect</strong> another. In January <strong>1077</strong>, Henry crossed the snowy Alps and stood barefoot for three days outside Gregory's castle at <strong>Canossa</strong> before the pope absolved him. <em>Going to Canossa</em> entered the language as a phrase for political humiliation. The conflict outlived both men. It was finally settled by the Concordat of <strong>Worms</strong> in 1122, ratified at Lateran <strong>I</strong> (1123): the king lost the ring and staff but kept a say in the choice. The church had won its essential point — it was not royal property.</p>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">1073</div><div class="atl-text">Hildebrand becomes Pope Gregory VII</div></div>
  <div class="atl-row"><div class="atl-year">1075</div><div class="atl-text">Dictatus Papae — pope alone may depose emperors; no lay investiture</div></div>
  <div class="atl-row"><div class="atl-year">1077</div><div class="atl-text">Henry IV stands barefoot three days at Canossa</div></div>
  <div class="atl-row"><div class="atl-year">1122</div><div class="atl-text">Concordat of Worms — settled at Lateran I (1123)</div></div>
</div>
</div>`;

_track3.lessons[18].articleHtml=M18_ARTICLE_HTML;
_track3.lessons[18].learn=M18_LEARN;
_track3.lessons[18].study=M18_STUDY;
_track3.lessons[18].coldOpen={_bg:'/images/middle-ages/GregoryVII.jpeg',cards:[
  {label:'The World Before',text:'Bishoprics are property. A king hands the bishop his ring and staff — and gets, in return, a loyal vassal. The Cluniac reform has called this disease by its name: lay investiture.',size:'lg'},
  {label:'The Crisis',text:'A reforming pope says: only the church may invest bishops. An emperor says: the church is mine. Who really rules Christendom?',size:'xl'},
  {label:'The Key Figures',text:'Hildebrand, the Cluniac monk who becomes Pope Gregory VII. Emperor Henry IV of Germany, who defies him. And the snow at Canossa where one humbles the other.',size:'lg'},
  {label:'The Bridge',text:'Here is how three days in the snow — and fifty years of struggle that followed — finally settled that the church was not royal property.',size:'md'},
]};

const M19_LEARN=[
  {sentence:"The Pope who called the First Crusade at Clermont in 1095 was Urban _____.",answer:"II",options:["II","III","IV","V"],explanation:"Pope Urban II preached the First Crusade at the Council of Clermont in 1095.",tier:1},
  {sentence:"The council at which Urban II preached the First Crusade was the Council of _____.",answer:"Clermont",options:["Clermont","Reims","Lyon","Piacenza"],explanation:"The Council of Clermont (1095) — where the cry \"Deus vult!\" swept the assembly.",tier:1},
  {sentence:"The First Crusade was preached in the year _____.",answer:"1095",options:["1095","1099","1147","1187"],explanation:"1095 — Urban II preached the First Crusade at Clermont.",tier:1},
  {sentence:"In 1099 the First Crusade captured the holy city of _____.",answer:"Jerusalem",options:["Jerusalem","Antioch","Constantinople","Cairo"],explanation:"The First Crusade captured Jerusalem in 1099, slaughtering Muslims and Jews in the streets.",tier:1},
  {sentence:"The cry that swept the Council of Clermont was \"Deus _____!\"",answer:"vult",options:["vult","caritas","amor","gloria"],explanation:'"Deus vult!" — God wills it! — the cry that swept Clermont in 1095.',tier:1},
  {sentence:"The monk who preached the Second Crusade was Bernard of _____.",answer:"Clairvaux",options:["Clairvaux","Citeaux","Cluny","Clermont"],explanation:"Bernard of Clairvaux preached the Second Crusade in 1147.",tier:1},
  {sentence:"The Second Crusade (1147) ultimately _____.",answer:"failed",options:["failed","triumphed","recovered Jerusalem","took Damascus"],explanation:"Despite Bernard's preaching, the Second Crusade failed.",tier:1},
  {sentence:"In 1187, _____ retook Jerusalem from the crusaders.",answer:"Saladin",options:["Saladin","Suleiman","Mehmed","Baybars"],explanation:"Saladin retook Jerusalem in 1187, prompting the Third Crusade.",tier:1},
  {sentence:"The year Saladin retook Jerusalem was _____.",answer:"1187",options:["1187","1147","1095","1204"],explanation:"Saladin retook Jerusalem in 1187 — the Third Crusade only partly recovered the lost ground.",tier:1},
  {sentence:"The Fourth Crusade (1204) sacked the Christian city of _____.",answer:"Constantinople",options:["Constantinople","Jerusalem","Rome","Antioch"],explanation:"The Fourth Crusade — Venetian-led — sacked Constantinople in 1204 and looted Hagia Sophia.",tier:1},
  {sentence:"The Fourth Crusade was led primarily by the _____.",answer:"Venetians",options:["Venetians","Genoese","French","Germans"],explanation:"The Fourth Crusade was Venetian-led; it was diverted to Constantinople instead of the Holy Land.",tier:1},
  {sentence:"The Crusades were called the bitter fruit of the _____.",answer:"Schism",options:["Schism","Inquisition","Investiture Controversy","Iconoclasm"],explanation:"The Crusades grew out of the bitter fruit of the East–West Schism of 1054.",tier:1},
];

const M19_STUDY={
  cards:[{
    text:'In 1095 Pope Urban II called the First Crusade at Clermont; the cry was Deus vult! — "God wills it!" The First Crusade captured Jerusalem in 1099. The Fourth Crusade (1204) never reached the Holy Land: it sacked Constantinople instead, deepening the East-West wound into hatred. By 1291 the crusader kingdoms were gone.',
    terms:[
      {word:'Urban II',def:'The reforming pope who preached the First Crusade at Clermont in 1095, promising spiritual reward to those who took up the cross to reclaim the Holy Land.'},
      {word:'Deus vult!',def:'"God wills it!" — the cry that swept the Council of Clermont when Urban II finished preaching. It became the battle cry of the crusading movement.'},
      {word:'Bernard of Clairvaux',def:'The great Cistercian abbot who preached the Second Crusade (1147) — which failed. His preaching of holy war sits uneasily alongside his mystical piety.'},
      {word:'Saladin',def:'The Muslim sultan who retook Jerusalem in 1187, ending the First Crusade\'s kingdom after less than a century.'},
      {word:'Fourth Crusade (1204)',def:'The Venetian-diverted crusade that sacked Constantinople and looted Hagia Sophia — deepening the East-West wound into a lasting hatred and further weakening the Byzantine Empire.'},
    ],
    questions:[],
  }],
  questions:[
    {q:'How should Christians evaluate the Crusades?',a:'The Crusades raise questions that don\'t have easy answers. There was a legitimate defensive concern: the Byzantine Empire was under siege from the Seljuk Turks, and centuries of Christian pilgrimage routes had been cut. Urban II\'s call was not simply aggression. But the methods were consistently brutal — Jerusalem\'s capture in 1099 was a massacre; the Fourth Crusade sacked a Christian city. And the theological framing — that killing for Christ earns spiritual merit — is a deep perversion of the gospel. The cross is not a weapon; the kingdom does not advance by armies. Christians can honor the genuine desire to defend the weak while recognizing that the crusading project was corrupted at its theological root.'},
  ],
};

const M19_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 20 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">The Crusades</h1>
<p class="article-sub">The church takes up the sword · 1095–1291</p>
<div class="art-divider"></div>
<div class="article-body">
<p>For two centuries the church took up the sword. Popes called, kings answered, monks preached — and Jerusalem changed hands again and again.</p>
<figure style="margin:1.75rem 0;border:1px solid rgba(20,8,12,0.1);border-radius:10px;overflow:hidden;">
  <img src="/images/middle-ages/Crusades.jpeg" style="width:100%;display:block;object-fit:cover;object-position:top center;max-height:420px;">
  <figcaption><strong>The Crusades · 1095–1291</strong> Popes called, kings answered, monks preached. For two centuries the church took up the sword and Jerusalem changed hands again and again.</figcaption>
</figure>
<p>The Crusades were the bitter fruit of the <strong>Schism</strong>. In <strong>1095</strong>, at the Council of <strong>Clermont</strong>, Pope <strong>Urban II</strong> preached an armed pilgrimage to take back the Holy Land from Muslim rule and to relieve the eastern Christians. Tens of thousands signed the cross. In <strong>1099</strong> the First Crusade captured <strong>Jerusalem</strong>, slaughtering Muslims and Jews in the streets, and a short-lived crusader kingdom rose along the Levantine coast.</p>
<p>When that kingdom faltered, <strong>Bernard of Clairvaux</strong> preached the Second Crusade (<strong>1147</strong>). It <strong>failed</strong>. In <strong>1187</strong>, <strong>Saladin</strong> retook Jerusalem. The Third Crusade only partly recovered. The Fourth Crusade (<strong>1204</strong>) never reached the Holy Land at all: <strong>Venetian</strong>-led, it sacked Christian <strong>Constantinople</strong>, looted Hagia Sophia, and deepened the East–West wound into a hatred. By the late 13th century the crusader kingdoms were gone. The church had taken up the sword and learned that swords cut both ways.</p>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">1095</div><div class="atl-text">Urban II calls the First Crusade at Clermont</div></div>
  <div class="atl-row"><div class="atl-year">1099</div><div class="atl-text">First Crusade captures Jerusalem</div></div>
  <div class="atl-row"><div class="atl-year">1187</div><div class="atl-text">Saladin retakes Jerusalem</div></div>
  <div class="atl-row"><div class="atl-year">1204</div><div class="atl-text">Fourth Crusade sacks Constantinople</div></div>
</div>
<div class="pull-quote">
  <p>"Deus vult!" — God wills it.</p>
  <cite>— The cry that swept the Council of Clermont, 1095</cite>
</div>
</div>`;

_track3.lessons[19].articleHtml=M19_ARTICLE_HTML;
_track3.lessons[19].learn=M19_LEARN;
_track3.lessons[19].study=M19_STUDY;
_track3.lessons[19].coldOpen={_bg:'/images/middle-ages/Crusades.jpeg',cards:[
  {label:'The World Before',text:'The East–West Schism is fifty years old. The Byzantine emperor is begging Western help against the Seljuk Turks who have overrun Asia Minor.',size:'lg'},
  {label:'The Crisis',text:'Can — should — the church send Christian armies to fight Muslims for control of the Holy Land? A pope answers yes, and tens of thousands sign the cross.',size:'xl'},
  {label:'The Key Figures',text:'Pope Urban II, who called the First Crusade at Clermont. Bernard of Clairvaux, who preached the Second. Saladin, who took Jerusalem back.',size:'lg'},
  {label:'The Bridge',text:'Here is how two centuries of armed pilgrimage reshaped both the church and its relation to the East — and learned that swords cut both ways.',size:'md'},
]};

const M20_LEARN=[
  {sentence:"The 12th-century method that put faith under the lamp of dialectic was the _____ method.",answer:"scholastic",options:["scholastic","monastic","mystical","patristic"],explanation:"Scholastic method took a question, ranged the fathers on each side, and resolved the contradiction with reason.",tier:1},
  {sentence:"The brilliant and brittle 12th-century scholastic who wrote Sic et Non was Peter _____.",answer:"Abelard",options:["Abelard","Lombard","Damian","Lanfranc"],explanation:"Peter Abelard (1079–1142) — brilliant, brittle, and the most controversial scholastic of the 12th century.",tier:1},
  {sentence:"Abelard's collection of 158 theological questions is the Sic et _____.",answer:"Non",options:["Non","Sic","Quaestio","Veritas"],explanation:"Sic et Non — Latin for \"Yes and No\" — Abelard's foundational document of scholastic method.",tier:1},
  {sentence:"\"Sic et Non\" is Latin for \"Yes and _____.\"",answer:"No",options:["No","Amen","So","If"],explanation:'Pairs of patristic quotations stood on opposite sides of each question — "Yes and No."',tier:1},
  {sentence:"Abelard rejected Anselm's _____ theory of the atonement.",answer:"satisfaction",options:["satisfaction","ransom","moral-influence","governmental"],explanation:"Abelard explicitly rejected Anselm's satisfaction theory and offered his moral-influence alternative.",tier:1},
  {sentence:"Abelard's atonement theory came to be called the _____-influence theory.",answer:"moral",options:["moral","governmental","penal","ransom"],explanation:"For Abelard, the cross is a moral example drawing our love in response — the moral-influence theory.",tier:1},
  {sentence:"The author of the medieval theology textbook The Sentences was Peter _____.",answer:"Lombard",options:["Lombard","Abelard","Damian","Hugh"],explanation:"Peter Lombard (c. 1100–1160) — Bishop of Paris and author of the Sentences.",tier:1},
  {sentence:"Peter Lombard was Bishop of _____.",answer:"Paris",options:["Paris","Rome","Reims","Lyon"],explanation:"Peter Lombard was Bishop of Paris.",tier:1},
  {sentence:"The textbook Lombard wrote about 1150 is called The _____.",answer:"Sentences",options:["Sentences","Summa","Proslogion","Confessions"],explanation:"The Sentences was Lombard's c. 1150 theology textbook — standard for 400 years.",tier:1},
  {sentence:"Peter Lombard fixed the medieval number of sacraments at _____.",answer:"seven",options:["seven","five","three","twelve"],explanation:"Lombard fixed the seven sacraments — baptism, confirmation, eucharist, penance, ordination, marriage, anointing of the sick.",tier:1},
  {sentence:"For about four _____ years every theology student in Europe wrote a commentary on the Sentences.",answer:"hundred",options:["hundred","thousand","dozen","score"],explanation:"For four hundred years every theology student in Europe wrote a commentary on the Sentences.",tier:1},
  {sentence:"A century after Lombard, Thomas _____ would build his Summa on this foundation.",answer:"Aquinas",options:["Aquinas","Bonaventure","Scotus","Ockham"],explanation:"Aquinas, a century later, built the Summa on the foundation Lombard laid.",tier:1},
];

const M20_STUDY={
  cards:[{
    text:'Scholastic method put faith under the lamp of dialectic: take a question, range the fathers on both sides, resolve with reason. Peter Abelard\'s Sic et Non posed 158 theological questions; Peter Lombard\'s Sentences (c. 1150) became the standard theology textbook for four hundred years. Lombard fixed the medieval number of sacraments at seven.',
    terms:[
      {word:'Scholastic method',def:'The medieval technique of theological reasoning: pose a question, cite authorities on both sides, resolve the contradiction with reasoned argument. Abelard\'s Sic et Non is its classic example.'},
      {word:'Sic et Non',def:'Abelard\'s c. 1140 collection of 158 theological questions with contradictory patristic quotations ranged on each side — a foundational document of scholastic method.'},
      {word:'The Sentences (c. 1150)',def:'Peter Lombard\'s theology textbook covering God, creation, the Incarnation, the sacraments, and the last things. Standard curriculum for 400 years; every major scholastic wrote a commentary on it.'},
      {word:'Moral-influence theory',def:'Abelard\'s alternative to Anselm\'s satisfaction theory — the cross is not a payment to God but a moral example, drawing our love by displaying God\'s love in Christ.'},
      {word:'Seven sacraments',def:'The number Peter Lombard fixed in the Sentences — baptism, confirmation, Eucharist, penance, ordination, marriage, anointing — which the medieval church accepted and Trent later defined as dogma.'},
    ],
    questions:[],
  }],
  questions:[
    {q:'Why did the scholastic method both serve and threaten medieval theology?',a:'The scholastic method served theology by taking it seriously as a discipline: organizing it, answering objections, defending it against philosophical attack. Aquinas\'s Summa is the method\'s greatest achievement — a coherent, comprehensive account of the faith that held for centuries. But the method also carried a danger: by placing faith under the lamp of dialectic, it implied that faith\'s claims must pass reason\'s bar. Abelard\'s more adventurous students drew conclusions the church condemned. And the method\'s architecture — textbooks, commentaries, academic disputations — could produce scholars who knew theology as an exercise rather than a living faith. The devotio moderna arose precisely as a counterweight.'},
  ],
};

const M20_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 21 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">Abelard, Lombard &amp; Scholastic Method</h1>
<p class="article-sub">Dialectic, atonement &amp; the textbook of the Middle Ages · 12th century</p>
<div class="art-divider"></div>
<div class="article-body">
<p>A method, a controversy, and a textbook. The 12th century was the scholastic boom.</p>
<figure style="margin:1.75rem 0;border:1px solid rgba(20,8,12,0.1);border-radius:10px;overflow:hidden;">
  <img src="/images/middle-ages/Lombard.jpeg" style="width:100%;display:block;object-fit:cover;object-position:top center;max-height:420px;">
  <figcaption><strong>Peter Lombard's <em>Sentences</em> · 12th century</strong> Lombard's textbook became the standard theology curriculum of the medieval West — every major scholastic wrote a commentary on it.</figcaption>
</figure>
<p>The <strong>scholastic</strong> method put faith under the lamp of dialectic: take a question, range the church fathers on each side, and resolve the contradiction with reason. <strong>Peter Abelard</strong> (1079–1142) was its most brilliant and brittle practitioner. His <strong>Sic et Non</strong> ("Yes and <strong>No</strong>") set 158 theological questions with contradictory patristic quotations on each side. Abelard also rejected Anselm's <strong>satisfaction</strong> theory of the atonement. The cross, he said, was not a payment to God but a <em>moral example</em> — Christ's love draws our love in response. This became the <strong>moral</strong>-influence theory of the atonement.</p>
<p><strong>Peter Lombard</strong> (c. 1100–1160), Bishop of <strong>Paris</strong>, produced the textbook the scholastic method needed. His <strong>Sentences</strong> (c. 1150) gathered the church's teaching on God, creation, the Incarnation, the sacraments, and the last things — each topic introduced, the fathers cited, the questions resolved. For the next four <strong>hundred</strong> years every theology student in Europe wrote a commentary on the Sentences. Lombard fixed the medieval number of sacraments at <strong>seven</strong> — baptism, confirmation, eucharist, penance, ordination, marriage, anointing of the sick. A century later, Thomas <strong>Aquinas</strong> would build his Summa on this foundation.</p>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">c. 1140</div><div class="atl-text">Abelard's Sic et Non — 158 theological questions in dialectic</div></div>
  <div class="atl-row"><div class="atl-year">c. 1150</div><div class="atl-text">Lombard's Sentences — the standard theology textbook for 400 years</div></div>
</div>
<div class="pull-quote">
  <p>"By doubting we come to inquiry; by inquiring we perceive the truth."</p>
  <cite>— Abelard, Sic et Non</cite>
</div>
</div>`;

_track3.lessons[20].articleHtml=M20_ARTICLE_HTML;
_track3.lessons[20].learn=M20_LEARN;
_track3.lessons[20].study=M20_STUDY;
_track3.lessons[20].coldOpen={_bg:'/images/middle-ages/Lombard.jpeg',cards:[
  {label:'The World Before',text:'Anselm has given the West a satisfaction theory of the atonement and a logical argument for God. A new generation of teachers wants to take his method further.',size:'lg'},
  {label:'The Crisis',text:'Can faith stand the questions reason throws at it? Two Parisian masters — one combative, one quiet — will set the terms.',size:'xl'},
  {label:'The Key Figures',text:'Peter Abelard, brilliant and abrasive, testing every doctrine by dialectic. Peter Lombard, Bishop of Paris, building the textbook the next four centuries would learn from.',size:'lg'},
  {label:'The Bridge',text:'Here is how the scholastic method took shape — and how Anselm\'s atonement got its first serious rival.',size:'md'},
]};

const M21_LEARN=[
  {sentence:"The wealthy merchant who founded the Waldensian movement was Peter _____.",answer:"Waldo",options:["Waldo","Lombard","Abelard","Damian"],explanation:"Peter Waldo of Lyon (c. 1140–1205) — wealthy merchant who took Christ's \"sell all you have\" literally.",tier:1},
  {sentence:"Peter Waldo was a merchant of the city of _____.",answer:"Lyon",options:["Lyon","Paris","Florence","Cologne"],explanation:"Waldo was a merchant of Lyon in southern France.",tier:1},
  {sentence:"Waldo's religious crisis came about the year _____.",answer:"1173",options:["1173","1095","1184","1209"],explanation:"About 1173 — Waldo had a religious crisis and began giving his wealth away.",tier:1},
  {sentence:"Waldo took Christ's command to \"sell all you have and give it to the _____\" literally.",answer:"poor",options:["poor","priests","Lord","temple"],explanation:"Waldo took Christ's command to the rich young man literally — sell all and give to the poor.",tier:1},
  {sentence:"Waldo paid clerics to translate parts of Scripture into the vernacular _____.",answer:"Provençal",options:["Provençal","German","English","Slavonic"],explanation:"Provençal — the first medieval-western Bible in the language of ordinary people.",tier:1},
  {sentence:"Waldo embraced voluntary _____ and began preaching in the streets.",answer:"poverty",options:["poverty","silence","fasting","celibacy"],explanation:"Voluntary poverty and street preaching defined the Waldensian movement.",tier:1},
  {sentence:"The council that refused the Waldenses' request to preach was Lateran _____.",answer:"III",options:["III","I","II","IV"],explanation:"Lateran III (1179) refused the Waldenses' preaching request.",tier:1},
  {sentence:"The pope who refused the Waldenses' request at Lateran III was _____ III.",answer:"Alexander",options:["Alexander","Innocent","Urban","Gregory"],explanation:"Pope Alexander III refused the Waldenses' request at Lateran III in 1179.",tier:1},
  {sentence:"The year of Lateran III was _____.",answer:"1179",options:["1179","1184","1209","1095"],explanation:"Lateran III met in 1179 under Alexander III.",tier:1},
  {sentence:"The Waldenses were formally banned and declared heretics in the year _____.",answer:"1184",options:["1184","1179","1095","1209"],explanation:"1184 — the formal ban and declaration of heresy.",tier:1},
  {sentence:"After the ban the Waldenses were driven into the Alpine valleys of _____.",answer:"Piedmont",options:["Piedmont","Provence","Catalonia","Bohemia"],explanation:"The Waldenses took refuge in the Alpine valleys of Piedmont.",tier:1},
  {sentence:"At the Reformation the surviving Waldenses joined the _____.",answer:"Protestants",options:["Protestants","Catholics","Orthodox","Hussites"],explanation:"At the Reformation the Waldenses joined the Protestants — the oldest continuous evangelical witness in the medieval west.",tier:1},
];

const M21_STUDY={
  cards:[{
    text:'Around 1173, the wealthy Lyon merchant Peter Waldo took Christ\'s "sell all and give to the poor" literally — paid for a Provençal Bible, gave away his fortune, and began preaching in the streets. Rome banned his movement in 1184. Driven into the Alps, the Waldenses survived everything the church sent against them — and joined the Protestants at the Reformation.',
    terms:[
      {word:'Peter Waldo',def:'Wealthy merchant of Lyon (c. 1140–1205) who around 1173 took Christ\'s "sell all you have" literally, commissioned a vernacular Provençal Bible, and began lay preaching. His movement was banned in 1184.'},
      {word:'Provençal Bible',def:'Waldo\'s commission to have portions of Scripture translated into the vernacular Provençal — the first time the Bible had been put into the language of ordinary people in the medieval West.'},
      {word:'Lateran III (1179)',def:'The council where Pope Alexander III refused the Waldenses\' request for permission to preach — the beginning of their official rejection by Rome.'},
      {word:'The Waldenses',def:'The movement Waldo founded; banned in 1184 as heretics, driven into the Alpine valleys of Piedmont, surviving papal armies and the Inquisition — and joining the Protestant Reformation.'},
      {word:'Voluntary poverty',def:'The Waldensian ideal of renouncing wealth and begging daily bread — a direct challenge to the wealthy institutional church, and the reason Rome feared them.'},
    ],
    questions:[],
  }],
  questions:[
    {q:'Why did Rome ban the Waldenses — and what does its choice reveal about the medieval church?',a:'Rome did not ban the Waldenses for heresy in 1179 — Pope Alexander III received them warmly at Lateran III, praising their piety, before refusing their request to preach. What Rome banned was not their doctrine but their practice: lay people reading the Bible and preaching without clerical authorization. The church\'s anxiety was institutional: if laypeople could preach Scripture on their own authority, the clergy\'s monopoly on spiritual instruction was broken. The deeper irony is that Waldo\'s convictions were essentially orthodox; Rome manufactured the heresy by driving him out. The Waldenses became heretics by surviving.'},
  ],
};

const M21_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 22 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">Peter Waldo &amp; the Waldenses</h1>
<p class="article-sub">Vernacular Scripture, voluntary poverty &amp; a long survival · 1173–1184</p>
<div class="art-divider"></div>
<div class="article-body">
<p>A rich merchant of Lyon hires translators, gives away his fortune, takes Christ's command to the rich young man at face value — and is banned for it.</p>
<figure style="margin:1.75rem 0;border:1px solid rgba(20,8,12,0.1);border-radius:10px;overflow:hidden;">
  <img src="/images/middle-ages/Waldenses.jpeg" style="width:100%;display:block;object-fit:cover;object-position:top center;max-height:420px;">
  <figcaption><strong>Peter Waldo & the Waldenses · 1173</strong> The merchant who gave away his fortune, commissioned a vernacular Scripture, and preached voluntary poverty — and was excommunicated for it.</figcaption>
</figure>
<p><strong>Peter Waldo</strong> of <strong>Lyon</strong> (c. 1140–1205), a wealthy merchant, around <strong>1173</strong> had a religious crisis and decided to take Christ's "sell all you have and give it to the <strong>poor</strong>" literally. He paid clerics to translate parts of Scripture into the vernacular <strong>Provençal</strong> — the first time the Bible had been put into the language of ordinary people in the medieval west. He gave away his wealth, embraced voluntary <strong>poverty</strong>, and began preaching the gospel in the streets.</p>
<p>Lay people reading the Bible and lay people preaching terrified Rome. At the Third Lateran Council (<strong>Lateran III</strong>) in <strong>1179</strong>, Pope <strong>Alexander III</strong> refused the Waldenses' request for permission to preach. In <strong>1184</strong> they were formally banned and declared heretics. Driven into the Alpine valleys of <strong>Piedmont</strong>, the Waldensian community survived everything — papal armies, the Inquisition, the centuries — emerging at the Reformation to join the <strong>Protestants</strong>. They are the oldest continuous evangelical witness in the medieval west.</p>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">c. 1173</div><div class="atl-text">Waldo's conversion and Provençal Bible translation</div></div>
  <div class="atl-row"><div class="atl-year">1179</div><div class="atl-text">Lateran III refuses the Waldenses permission to preach</div></div>
  <div class="atl-row"><div class="atl-year">1184</div><div class="atl-text">Waldenses formally banned and declared heretics</div></div>
</div>
<div class="pull-quote">
  <p>"Sell what you have and give to the poor."</p>
  <cite>— Matthew 19:21, the verse that gripped Peter Waldo</cite>
</div>
</div>`;

_track3.lessons[21].articleHtml=M21_ARTICLE_HTML;
_track3.lessons[21].learn=M21_LEARN;
_track3.lessons[21].study=M21_STUDY;
_track3.lessons[21].coldOpen={_bg:'/images/middle-ages/Waldenses.jpeg',cards:[
  {label:'The World Before',text:'The Cluniac and Investiture reforms have cleaned up the priesthood. The church is still rich, still distant, still in Latin. Crusader armies are marching east.',size:'lg'},
  {label:'The Crisis',text:'A rich merchant of Lyon reads Christ\'s command to the rich young man and decides to obey it. He gives his fortune away, hires translators, and starts preaching in the streets — without permission.',size:'xl'},
  {label:'The Key Figures',text:'Peter Waldo of Lyon, merchant turned preacher. Pope Alexander III at Lateran III, who refused his request. The Waldenses, who would outlive every army sent against them.',size:'lg'},
  {label:'The Bridge',text:'Here is how a layman\'s literal reading of Scripture became Rome\'s first major medieval heresy trial — and the oldest surviving evangelical movement.',size:'md'},
]};

const M22_LEARN=[
  {sentence:"The 13th-century Italian who founded the Friars Minor was Francis of _____.",answer:"Assisi",options:["Assisi","Aquino","Padua","Bologna"],explanation:"Francis of Assisi (1182–1226) — son of a wealthy cloth merchant who renounced everything to live the gospel.",tier:1},
  {sentence:"The Scripture passage that gripped Francis was Matthew _____.",answer:"10",options:["10","5","6","25"],explanation:"Francis heard Matthew 10 read in church — Christ sending the disciples out without purse, sandals, or staff — and took it literally.",tier:1},
  {sentence:"Francis was the son of a wealthy _____ merchant.",answer:"cloth",options:["cloth","wine","spice","grain"],explanation:"Francis's father was a wealthy cloth merchant — wealth Francis dramatically renounced.",tier:1},
  {sentence:"Francis renounced his inheritance by stripping his clothes in the public _____.",answer:"square",options:["square","cathedral","river","market"],explanation:"In a famous scene, Francis stripped his clothes in the public square and gave them back to his father.",tier:1},
  {sentence:"Francis embraced Lady _____ as his spiritual bride.",answer:"Poverty",options:["Poverty","Wisdom","Mercy","Charity"],explanation:"Francis embraced \"Lady Poverty\" as his bride and began preaching in the towns of Umbria.",tier:1},
  {sentence:"The order Francis founded was the Friars _____.",answer:"Minor",options:["Minor","Preachers","Mendicant","Hermit"],explanation:"The Friars Minor — \"Lesser Brothers\" — were the order Francis founded.",tier:1},
  {sentence:"\"Friars Minor\" means the \"_____ Brothers.\"",answer:"Lesser",options:["Lesser","Younger","Holy","Begging"],explanation:"\"Friars Minor\" is Latin for \"Lesser Brothers\" — the name Francis chose for his order.",tier:1},
  {sentence:"Pope _____ III gave verbal approval to Francis's brotherhood in 1209.",answer:"Innocent",options:["Innocent","Honorius","Gregory","Urban"],explanation:"Pope Innocent III gave verbal approval to Francis's brotherhood in 1209.",tier:1},
  {sentence:"The year of Innocent III's verbal approval was _____.",answer:"1209",options:["1209","1215","1224","1226"],explanation:"1209 — Innocent III\'s verbal approval; the Friars Minor were born.",tier:1},
  {sentence:"Francis famously preached to _____ and kissed lepers.",answer:"birds",options:["birds","wolves","horses","fish"],explanation:"Francis's gentleness to all creatures included his preaching to the birds and his embrace of the lepers.",tier:1},
  {sentence:"In 1224 Francis received the _____ — the wounds of Christ in his hands and feet.",answer:"stigmata",options:["stigmata","tonsure","pallium","chrism"],explanation:"In 1224 Francis received the stigmata — the first recorded case in the church.",tier:1},
  {sentence:"The year Francis received the stigmata was _____.",answer:"1224",options:["1224","1209","1215","1226"],explanation:"1224 — Francis received the stigmata two years before his death.",tier:1},
];

const M22_STUDY={
  cards:[{
    text:'Francis of Assisi (1182–1226) heard Matthew 10 as a young man, stripped himself naked in the town square, embraced Lady Poverty, and began preaching repentance across Umbria. Pope Innocent III gave verbal approval to his Friars Minor in 1209. In 1224 Francis received the stigmata — the wounds of Christ in his hands and feet — the first recorded case in the church.',
    terms:[
      {word:'Friars Minor',def:'"Lesser Brothers" — the order Francis founded after Innocent III\'s verbal approval in 1209. Total poverty, daily preaching, gentleness to all creatures. The most influential reform movement of the Middle Ages.'},
      {word:'Lady Poverty',def:'Francis\'s name for voluntary destitution — no property, no purse, no fixed home. He called poverty his bride and insisted the order own nothing. Sustaining this ideal as the Franciscans grew to thousands would prove impossible.'},
      {word:'Matthew 10',def:'Christ\'s command to go out without purse, sandals, or staff to preach the kingdom. Francis heard it read aloud and took it literally — the single moment that launched his entire movement.'},
      {word:'Innocent III',def:'The most powerful medieval pope (r. 1198–1216), who approved Francis\'s rule verbally in 1209 rather than banishing him as he had the Waldenses. His gamble was that a poverty movement inside the church was safer than one outside it.'},
      {word:'stigmata',def:'The wounds of Christ in hands and feet, received by Francis on Mount La Verna in 1224 — the first recorded case in the history of the church. He bore them until his death two years later.'},
    ],
    questions:[],
  }],
  questions:[
    {q:'What was Francis\'s vision, and why did the church struggle to contain it?',
     a:'Francis took the gospel literally — poverty, itinerant preaching, no institutional machinery. The church didn\'t know what to do with someone who refused property and hierarchy on principle. When the Friars Minor multiplied by the thousands, the order had to organize, build houses, take on university chairs. The very success that proved Francis right also made his ideal impossible to sustain. The institution that could spread his movement also diluted it.'},
  ],
};

const M22_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 23 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">Francis of Assisi</h1>
<p class="article-sub">Lady Poverty &amp; the Friars Minor · 1182–1226</p>
<div class="art-divider"></div>
<div class="article-body">
<p>A young Italian hears the gospel as if for the first time. He strips naked in the town square, walks out of his father's house, and starts the most influential reform movement of the Middle Ages.</p>
<figure style="margin:1.75rem 0;border:1px solid rgba(20,8,12,0.1);border-radius:10px;overflow:hidden;">
  <img src="/images/middle-ages/FrancisAssisi.jpeg" style="width:100%;display:block;object-fit:cover;object-position:top center;max-height:420px;">
  <figcaption><strong>Francis of Assisi · 1182–1226</strong> He embraced Lady Poverty and founded the Friars Minor — the most influential reform movement of the Middle Ages.</figcaption>
</figure>
<p><strong>Francis of Assisi</strong> (1182–1226), son of a wealthy <strong>cloth</strong> merchant, in his early twenties heard a priest read <strong>Matthew 10</strong> — Christ sending the disciples out without purse, sandals, or staff to preach the kingdom. Francis took it literally. He renounced his inheritance — in a famous scene, stripping his clothes in the public <strong>square</strong> and giving them back to his father — embraced Lady <strong>Poverty</strong> as his bride, and began preaching repentance and the love of God in the towns of Umbria.</p>
<p>Disciples gathered. Pope <strong>Innocent III</strong> gave verbal approval to Francis's little brotherhood in <strong>1209</strong>, and the Friars <strong>Minor</strong> ("Lesser Brothers") were born. Francis's rule was simple: total poverty, daily preaching, gentleness to all creatures. He preached to <strong>birds</strong>; he kissed lepers; he walked into a Crusader-Muslim battlefield to preach to the sultan. In <strong>1224</strong> he received the <strong>stigmata</strong> — the wounds of Christ in his hands and feet, the first recorded case in the church. He died at forty-four. The order he left behind reshaped medieval Christianity: reform not by institutional power but by simplicity.</p>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">1209</div><div class="atl-text">Innocent III gives verbal approval; Friars Minor founded</div></div>
  <div class="atl-row"><div class="atl-year">1224</div><div class="atl-text">Francis receives the stigmata</div></div>
  <div class="atl-row"><div class="atl-year">1226</div><div class="atl-text">Death of Francis</div></div>
</div>
</div>`;

_track3.lessons[22].articleHtml=M22_ARTICLE_HTML;
_track3.lessons[22].learn=M22_LEARN;
_track3.lessons[22].study=M22_STUDY;
_track3.lessons[22].coldOpen={_bg:'/images/middle-ages/FrancisAssisi.jpeg',cards:[
  {label:'The World Before',text:'The Crusades are draining the West. The hierarchy is rich, learned, and remote. Lay reform movements (like the Waldenses) have been driven out of the church.',size:'lg'},
  {label:'The Crisis',text:'A young soldier turned ascetic walks naked out of his father\'s house and asks the pope for permission to live the gospel — literally. Will the church embrace him, or banish him too?',size:'xl'},
  {label:'The Key Figures',text:'Francis of Assisi, son of a cloth merchant, in love with Lady Poverty. Pope Innocent III, who decides to approve rather than condemn.',size:'lg'},
  {label:'The Bridge',text:'Here is the reform that succeeded where the Waldenses were crushed — and reshaped medieval Christianity by simplicity, not power.',size:'md'},
]};

const M23_LEARN=[
  {sentence:"A \"mendicant\" is a _____.",answer:"beggar",options:["beggar","preacher","monk","hermit"],explanation:"A mendicant is a beggar — the 13th-c. orders begged their daily bread instead of owning lands.",tier:1},
  {sentence:"The Spaniard who founded the Order of Preachers in 1215 was _____.",answer:"Dominic",options:["Dominic","Francis","Bernard","Anthony"],explanation:"Dominic of Caleruega founded the Order of Preachers in 1215.",tier:1},
  {sentence:"The Order of Preachers is commonly known as the _____.",answer:"Dominicans",options:["Dominicans","Franciscans","Augustinians","Carmelites"],explanation:"The Order of Preachers became known as the Dominicans, after their founder.",tier:1},
  {sentence:"The Dominicans were founded to combat the _____ heresy in southern France.",answer:"Cathar",options:["Cathar","Waldensian","Arian","Lollard"],explanation:"Dominic founded the Order of Preachers to combat the Cathar heresy in southern France with learned preaching.",tier:1},
  {sentence:"Every Dominican was to be a trained _____.",answer:"theologian",options:["theologian","abbot","missionary","crusader"],explanation:"The Dominicans' weapon was learned preaching — every Dominican was to be a trained theologian.",tier:1},
  {sentence:"The most famous Dominican theologian was Thomas _____.",answer:"Aquinas",options:["Aquinas","Abelard","Bonaventure","Anselm"],explanation:"Thomas Aquinas — author of the Summa Theologica — was a Dominican.",tier:1},
  {sentence:"The Augustinians were consolidated as a mendicant order in the year _____.",answer:"1256",options:["1256","1215","1247","1209"],explanation:"In 1256 several hermit congregations were consolidated under the rule of Augustine.",tier:1},
  {sentence:"The Augustinians lived under the rule of _____.",answer:"Augustine",options:["Augustine","Benedict","Francis","Dominic"],explanation:"The Augustinians lived under the rule attributed to Augustine of Hippo.",tier:1},
  {sentence:"The most famous Augustinian friar would be Martin _____.",answer:"Luther",options:["Luther","Calvin","Knox","Cranmer"],explanation:"Martin Luther — the great reformer — was an Augustinian friar.",tier:1},
  {sentence:"The third mendicant order, organized as mendicants in 1247, was the _____.",answer:"Carmelites",options:["Carmelites","Cistercians","Hospitallers","Jesuits"],explanation:"The Carmelites were organized as a mendicant order in 1247.",tier:1},
  {sentence:"The Carmelites traced themselves to hermits on Mount _____.",answer:"Carmel",options:["Carmel","Athos","Sinai","Tabor"],explanation:"The Carmelites traced themselves to hermits on Mount Carmel in the Holy Land.",tier:1},
  {sentence:"Where the old monastic ideal had withdrawn from the world, the mendicant ideal walked _____ into it.",answer:"back",options:["back","quickly","once","slowly"],explanation:"The old monastic ideal had withdrawn from the world; the mendicant ideal walked back into it.",tier:1},
];

const M23_STUDY={
  cards:[{
    text:'A mendicant is a beggar. Unlike the landed Benedictine monasteries, the 13th-century orders took vows of poverty as institutions, owned nothing, and preached in the streets. The Dominicans (1215) targeted the Cathar heresy with learned preaching; the Augustinians (1256) would produce Martin Luther; the Carmelites (1247) traced themselves to hermits on Mount Carmel.',
    terms:[
      {word:'Mendicant',def:'"Beggar." The defining mark of the 13th-century orders: poverty taken as an institutional vow, not just a personal one. No endowments, no land, no fixed income — just begging and preaching.'},
      {word:'Dominicans',def:'The Order of Preachers, founded by Dominic of Caleruega in 1215 to combat the Cathar heresy in southern France with learned preaching. Every Dominican was to be a trained theologian. Thomas Aquinas was a Dominican.'},
      {word:'Cathar heresy',def:'A dualist sect in southern France that denied the goodness of the material world and rejected the sacraments. The Dominicans were founded specifically to answer it with better preaching.'},
      {word:'Augustinians',def:'Founded 1256, consolidating several hermit congregations under the rule of Augustine of Hippo. Martin Luther entered this order in 1505 — the friar who would ignite the Reformation.'},
      {word:'Carmelites',def:'Organized as a mendicant order in 1247; traced themselves to hermits on Mount Carmel in the Holy Land. Like the Augustinians, they walked the cities rather than staying in rural cloisters.'},
    ],
    questions:[],
  }],
  questions:[
    {q:'Why did the mendicant model succeed where settled monasticism couldn\'t?',
     a:'The old monasteries were rural, enclosed, and wealthy — shaped for withdrawal from the world. The 13th century belonged to growing cities, mobile heretics, and new universities. Friars could go where monasteries wouldn\'t: into the market square, the lecture hall, the Cathar village. Poverty gave them credibility in a church widely seen as corrupt and greedy. The mendicant model succeeded because it matched the shape of the world it was trying to reach.'},
  ],
};

const M23_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 24 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">The Mendicant Orders</h1>
<p class="article-sub">Dominicans, Augustinians &amp; Carmelites · 13th century</p>
<div class="art-divider"></div>
<div class="article-body">
<p>As Francis was preaching repentance, another order rose to preach truth. The mendicants — begging orders — would carry the church's message into the cities the old monasteries had never reached.</p>
<figure style="margin:1.75rem 0;border:1px solid rgba(20,8,12,0.1);border-radius:10px;overflow:hidden;">
  <img src="/images/middle-ages/MendicantOrders.jpeg" style="width:100%;display:block;object-fit:cover;object-position:top center;max-height:420px;">
  <figcaption><strong>The Mendicant Orders · 13th century</strong> Dominicans, Augustinians, and Carmelites carried the church's preaching into the cities the older monasteries had never reached.</figcaption>
</figure>
<p>A <strong>mendicant</strong> is a <strong>beggar</strong>. Where Benedictine monasteries had been wealthy land-owners, the new 13th-century orders took vows of poverty as institutions, not just individuals — owning nothing, begging their daily bread, preaching in the open. The Franciscans (covered last lesson) were the first. In <strong>1215</strong>, the year of Lateran IV, the Spaniard <strong>Dominic</strong> of Caleruega founded the <strong>Order of Preachers</strong> — known ever after as the <strong>Dominicans</strong>. Their target was the <strong>Cathar</strong> heresy in southern France, and their weapon was learned preaching: every Dominican was to be a trained <strong>theologian</strong>. Thomas <strong>Aquinas</strong> would be a Dominican.</p>
<p>Two more mendicant orders followed. The <strong>Augustinians</strong> (<strong>1256</strong>) consolidated several hermit congregations under the rule of <strong>Augustine</strong>; Martin <strong>Luther</strong> would be an Augustinian friar. The <strong>Carmelites</strong> (organized as a mendicant order in <strong>1247</strong>) traced themselves to hermits on Mount <strong>Carmel</strong>. Together the mendicants reshaped pastoral ministry: friars in the streets, friars in the new universities, friars hearing confessions and preaching where the parish system had grown thin. The old monastic ideal had withdrawn from the world; the mendicant ideal walked <strong>back</strong> into it.</p>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">1215</div><div class="atl-text">Dominic founds the Order of Preachers (Dominicans)</div></div>
  <div class="atl-row"><div class="atl-year">1247</div><div class="atl-text">Carmelites organized as a mendicant order</div></div>
  <div class="atl-row"><div class="atl-year">1256</div><div class="atl-text">Augustinians consolidated under the rule of Augustine</div></div>
</div>
</div>`;

_track3.lessons[23].articleHtml=M23_ARTICLE_HTML;
_track3.lessons[23].learn=M23_LEARN;
_track3.lessons[23].study=M23_STUDY;
_track3.lessons[23].coldOpen={_bg:'/images/middle-ages/MendicantOrders.jpeg',cards:[
  {label:'The World Before',text:'Francis\'s Friars Minor are spreading. The Cathar heresy is sweeping southern France. The old monasteries are wealthy and withdrawn from the cities.',size:'lg'},
  {label:'The Crisis',text:'How will the church reach people in the new urban Europe — and answer the heretics — when the monasteries stay in their cloisters?',size:'xl'},
  {label:'The Key Figures',text:'Dominic of Caleruega, whose Order of Preachers will become the church\'s intellectual elite. The Augustinians and Carmelites, who joined the mendicant wave.',size:'lg'},
  {label:'The Bridge',text:'Here is how begging friars in the streets, the universities, and the confessional reshaped the pastoral life of the medieval church.',size:'md'},
]};

const M24_LEARN=[
  {sentence:"The great 13th-century Dominican theologian was Thomas _____.",answer:"Aquinas",options:["Aquinas","Abelard","Lombard","Bonaventure"],explanation:"Thomas Aquinas (1225–1274) — Italian Dominican, author of the Summa Theologica.",tier:1},
  {sentence:"Aquinas's teacher at Paris was Albertus _____.",answer:"Magnus",options:["Magnus","Maximus","Major","Mirabilis"],explanation:"Albertus Magnus — the great German Dominican — was the first to integrate Aristotle into the Christian schools.",tier:1},
  {sentence:"Albertus Magnus was the first medieval to teach _____ in the Christian schools.",answer:"Aristotle",options:["Aristotle","Plato","Plotinus","Pythagoras"],explanation:"Aristotle — his texts came west through Arabic and Greek transmission and became the philosophical backbone of high scholasticism.",tier:1},
  {sentence:"Aquinas's great unfinished work is the Summa _____.",answer:"Theologica",options:["Theologica","Patristica","Doctrinae","Sacra"],explanation:"The Summa Theologica — begun c. 1265, unfinished at his death in 1274.",tier:1},
  {sentence:"For Aquinas, philosophy was the _____ of theology.",answer:"handmaiden",options:["handmaiden","enemy","equal","crown"],explanation:"Aquinas held that reason and revelation could not contradict each other — philosophy is the handmaiden (ancilla) of theology.",tier:1},
  {sentence:"Aquinas insisted on the _____ sense of Scripture as the foundation of all interpretation.",answer:"literal",options:["literal","allegorical","moral","anagogical"],explanation:"Aquinas insisted on the literal sense as the foundation — though always under the submission of the church.",tier:1},
  {sentence:"In 1274, Aquinas died on his way to the Second Council of _____.",answer:"Lyon",options:["Lyon","Vienne","Constance","Florence"],explanation:"The Second Council of Lyon (1274) was called to reunite the church with the East; Aquinas died en route.",tier:1},
  {sentence:"Aquinas was a friar of the _____ order.",answer:"Dominican",options:["Dominican","Franciscan","Augustinian","Carmelite"],explanation:"Aquinas was a Dominican — entering the Order of Preachers against his noble family's wishes.",tier:1},
  {sentence:"Aquinas died in the year _____.",answer:"1274",options:["1274","1265","1226","1215"],explanation:"Aquinas died in 1274, at forty-nine, on his way to the Second Council of Lyon.",tier:1},
  {sentence:"For Aquinas, reason and revelation could not _____ each other.",answer:"contradict",options:["contradict","replace","exclude","silence"],explanation:"The core of Aquinas's synthesis: reason and revelation in harmony, philosophy as the handmaiden of theology.",tier:1},
  {sentence:"Aquinas's famous line: \"Grace does not destroy nature, but _____ it.\"",answer:"perfects",options:["perfects","fulfills","supersedes","replaces"],explanation:"\"Grace does not destroy nature, but perfects it\" — a load-bearing Aquinas formula uniting reason and revelation.",tier:1},
  {sentence:"Four centuries later, the Council of _____ would make the Summa the standard Catholic textbook.",answer:"Trent",options:["Trent","Florence","Constance","Vienne"],explanation:"The Council of Trent (1545–63) made the Summa the standard textbook of Catholic theology.",tier:1},
];

const M24_STUDY={
  cards:[{
    text:'Thomas Aquinas (1225–1274), an Italian Dominican, studied under Albertus Magnus at Paris and became the greatest synthesizer of the medieval mind. His Summa Theologica organized all of Christian doctrine into thousands of questions, each posed, objected to, and answered. For Aquinas, philosophy was the handmaiden of theology — reason and revelation could not contradict each other.',
    terms:[
      {word:'Albertus Magnus',def:'German Dominican and Aquinas\'s teacher at Paris — the first medieval to teach Aristotle in the Christian schools. He convinced Aquinas that pagan philosophy could serve Christian theology rather than threaten it.'},
      {word:'Summa Theologica',def:'Aquinas\'s great unfinished masterwork (begun c. 1265): thousands of questions each posed, objected to, answered with "I answer that...," and the objections refuted. Became the standard textbook of Catholic theology at the Council of Trent.'},
      {word:'Aristotle',def:'Ancient Greek philosopher whose texts came west through Arabic translation in the 12th–13th centuries. Aquinas used Aristotle\'s logic and metaphysics to show that reason and revelation point the same direction.'},
      {word:'handmaiden',def:'Aquinas\'s metaphor for philosophy\'s role: it serves theology, doesn\'t replace it. His formula: "grace does not destroy nature, but perfects it." Faith and reason are not enemies.'},
      {word:'Council of Trent',def:'The 16th-century council (1545–63) that defined Catholic doctrine against the Reformers — and made the Summa Theologica the standard textbook of Catholic theology, cementing Aquinas\'s authority for centuries.'},
    ],
    questions:[],
  }],
  questions:[
    {q:'Why does Aquinas\'s synthesis of reason and revelation still matter?',
     a:'Aquinas asked whether Christianity was afraid of the truth. His answer was no — if God made the world, honest inquiry should lead toward God, not away from him. The risk in his synthesis is that when Aristotle\'s science was overturned, the theology built on it wobbled. But the core claim endures: faith doesn\'t require intellectual suicide. The tradition from Aquinas to C. S. Lewis runs on the conviction that you don\'t have to choose between reason and revelation.'},
  ],
};

const M24_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 25 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">Thomas Aquinas</h1>
<p class="article-sub">Philosophy as handmaiden of theology · 1225–1274</p>
<div class="art-divider"></div>
<div class="article-body">
<p>One Italian Dominican wrote a single book that ordered medieval theology for seven centuries. Aquinas's Summa.</p>
<figure style="margin:1.75rem 0;border:1px solid rgba(20,8,12,0.1);border-radius:10px;overflow:hidden;">
  <img src="/images/middle-ages/Aquinas.jpeg" style="width:100%;display:block;object-fit:cover;object-position:top center;max-height:420px;">
  <figcaption><strong>Thomas Aquinas · 1225–1274</strong> The Italian Dominican whose <em>Summa Theologiae</em> ordered medieval theology for seven centuries and made philosophy "the handmaiden of theology."</figcaption>
</figure>
<p><strong>Thomas Aquinas</strong> (1225–1274), born into Italian nobility, became a <strong>Dominican</strong> friar against his family's wishes. At the University of <strong>Paris</strong> he studied under <strong>Albertus Magnus</strong>, the first medieval to teach <strong>Aristotle</strong> in the Christian schools. From Aristotle Aquinas took the conviction that reason and revelation could not <strong>contradict</strong> each other; philosophy was the <strong>handmaiden</strong> of theology. What reason discovered, faith confirmed.</p>
<p>His great unfinished <strong>Summa Theologica</strong> (begun c. 1265) organized the whole of Christian doctrine into thousands of questions: each posed, objections raised, an authority cited ("I answer that..."), and the objections answered in turn. He insisted on the <strong>literal</strong> sense of Scripture as the foundation of all interpretation — yet always under the submission of the church. In <strong>1274</strong>, on his way to the Second Council of <strong>Lyon</strong> — called to reunite the church with the East — Aquinas died at forty-nine. Four centuries later the Council of <strong>Trent</strong> would make the Summa the standard textbook of Catholic theology.</p>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">c. 1265</div><div class="atl-text">Aquinas begins the Summa Theologica</div></div>
  <div class="atl-row"><div class="atl-year">1274</div><div class="atl-text">Aquinas dies on the way to Lyon II</div></div>
  <div class="atl-row"><div class="atl-year">1563</div><div class="atl-text">Trent makes the Summa the standard Catholic textbook</div></div>
</div>
<div class="pull-quote">
  <p>"Grace does not destroy nature, but perfects it."</p>
  <cite>— Aquinas, Summa Theologica I, q.1, a.8</cite>
</div>
</div>`;

_track3.lessons[24].articleHtml=M24_ARTICLE_HTML;
_track3.lessons[24].learn=M24_LEARN;
_track3.lessons[24].study=M24_STUDY;
_track3.lessons[24].coldOpen={_bg:'/images/middle-ages/Aquinas.jpeg',cards:[
  {label:'The World Before',text:'13th-c. universities are buzzing with newly translated Aristotle. The mendicant orders are reshaping pastoral life. The intellectual question of the age: can pagan philosophy serve Christian theology?',size:'lg'},
  {label:'The Crisis',text:'Aristotle teaches without God. Latin Averroists say his reason contradicts the faith. Are reason and revelation enemies?',size:'xl'},
  {label:'The Key Figures',text:'Albertus Magnus, who first taught Aristotle in the Christian schools. Thomas Aquinas, his Dominican student, who would build the greatest synthesis of the medieval mind.',size:'lg'},
  {label:'The Bridge',text:'Here is the book that ordered Catholic theology for seven centuries — and the line "grace does not destroy nature, but perfects it."',size:'md'},
]};

const M25_LEARN=[
  {sentence:"The pope who issued Unam Sanctam in 1302 was _____ VIII.",answer:"Boniface",options:["Boniface","Innocent","Gregory","Clement"],explanation:"Pope Boniface VIII issued Unam Sanctam in 1302 — the most extreme papal claim ever made.",tier:1},
  {sentence:"The bull Unam Sanctam was issued in the year _____.",answer:"1302",options:["1302","1303","1309","1377"],explanation:"1302 — Boniface VIII's Unam Sanctam, the apex of papal claim.",tier:1},
  {sentence:"Unam Sanctam declared that submission to the Roman pontiff is _____ necessary for salvation.",answer:"altogether",options:["altogether","probably","occasionally","spiritually"],explanation:'The bull\'s famous line: "altogether necessary for salvation."',tier:1},
  {sentence:"The French king who defied Boniface was _____ IV.",answer:"Philip",options:["Philip","Louis","Charles","Henry"],explanation:"Philip IV of France — \"Philip the Fair\" — broke the high medieval papacy.",tier:1},
  {sentence:"Philip IV's thugs attacked the elderly pope at _____ in 1303.",answer:"Anagni",options:["Anagni","Rome","Avignon","Viterbo"],explanation:"The \"Outrage of Anagni\" (1303) — Boniface was held briefly and died of shock weeks later.",tier:1},
  {sentence:"The first French pope of the Avignon line was _____ V.",answer:"Clement",options:["Clement","Innocent","Boniface","Gregory"],explanation:"Clement V — French, chosen under Philip's pressure — moved the papacy to Avignon in 1309.",tier:1},
  {sentence:"In 1309 Clement V moved the papal court to the city of _____.",answer:"Avignon",options:["Avignon","Lyon","Paris","Anagni"],explanation:"Avignon, on the Rhône — just outside France's border but effectively under French control.",tier:1},
  {sentence:"The Avignon Captivity lasted nearly _____ years.",answer:"seventy",options:["seventy","fifty","a hundred","thirty"],explanation:"1309 to 1377 — nearly seventy years of popes ruling from Avignon, not Rome.",tier:1},
  {sentence:"The poet who called Avignon \"the sewer of the world\" was _____.",answer:"Petrarch",options:["Petrarch","Dante","Boccaccio","Chaucer"],explanation:"Petrarch — Italian humanist — used the phrase to capture the corruption of the Avignon papacy.",tier:1},
  {sentence:"Clement V suppressed the _____ at the Council of Vienne.",answer:"Templars",options:["Templars","Hospitallers","Franciscans","Cathars"],explanation:"The Knights Templar were suppressed at the Council of Vienne (1311–12); their treasure went to the French crown.",tier:1},
  {sentence:"The council where Clement V suppressed the Templars was _____.",answer:"Vienne",options:["Vienne","Lyon","Lateran IV","Constance"],explanation:"The Council of Vienne (1311–12) under Clement V suppressed the Templars.",tier:1},
  {sentence:"The papacy returned to Rome in the year _____.",answer:"1377",options:["1377","1378","1309","1417"],explanation:"1377 — the papacy returned to Rome, ending the Avignon Captivity.",tier:1},
];

const M25_STUDY={
  cards:[{
    text:'Boniface VIII\'s bull Unam Sanctam (1302) declared that submission to the Roman pontiff is altogether necessary for salvation — the peak of papal claims. Philip IV of France sent thugs who arrested the elderly pope at Anagni (1303); Boniface died of shock weeks later. The papacy then moved to Avignon under French influence for nearly seventy years.',
    terms:[
      {word:'Unam Sanctam',def:'Boniface VIII\'s 1302 bull — the most extreme papal claim ever made — declaring that submission to the Roman pontiff is "altogether necessary for salvation." Within a year, the high medieval papacy lay broken.'},
      {word:'Anagni',def:'The "Outrage of Anagni" (1303): Philip IV\'s agents arrested the elderly Boniface VIII at his hometown residence. The pope was briefly held and humiliated; he died of shock weeks later.'},
      {word:'Philip IV',def:'"Philip the Fair" — king of France who defied Boniface VIII\'s authority, engineered the election of a French pope, and effectively moved the papacy to French territory. The king who broke the high medieval papal claim.'},
      {word:'Avignon Captivity',def:'The nearly seventy years (1309–1377) when the popes ruled from Avignon on the Rhône under French influence. Petrarch called it "the sewer of the world." The papacy returned to Rome only in 1377.'},
      {word:'Templars',def:'The Knights Templar — the great military order of the Crusades — suppressed by Clement V at the Council of Vienne (1311–12) at Philip IV\'s insistence. Their treasure went to the French crown.'},
    ],
    questions:[],
  }],
  questions:[
    {q:'What does the Avignon captivity reveal about the papacy\'s structural weaknesses?',
     a:'The papacy had staked its authority on spiritual supremacy but funded it through taxation and political leverage. When a strong French king decided the church\'s finances were his business, there was no theological wall to stop him. Avignon showed that papal power was partly an illusion sustained by weaker kings — once a strong monarch called the bluff, the institution followed. The spiritual claim of Unam Sanctam outlasted the political reality by less than a year.'},
  ],
};

const M25_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 26 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">Boniface VIII &amp; the Avignon Captivity</h1>
<p class="article-sub">Unam Sanctam, Anagni &amp; the papacy in France · 1302–1377</p>
<div class="art-divider"></div>
<div class="article-body">
<p>A pope claims the whole world. A French king crushes him. The papacy then moves to France for nearly seventy years.</p>
<figure style="margin:1.75rem 0;border:1px solid rgba(20,8,12,0.1);border-radius:10px;overflow:hidden;">
  <img src="/images/middle-ages/Anignon.jpeg" style="width:100%;display:block;object-fit:cover;object-position:top center;max-height:420px;">
  <figcaption><strong>The Avignon Papacy · 1309–1377</strong> After Boniface VIII's claim to universal power collapsed, the papacy moved to France for nearly seventy years — what critics called the "Babylonian Captivity."</figcaption>
</figure>
<p>At the end of the 13th century, <strong>Boniface VIII</strong> issued the most extreme claim of papal authority ever made. His bull <em>Unam Sanctam</em> (<strong>1302</strong>) declared that "submission to the Roman pontiff is <strong>altogether</strong> necessary for salvation." But the reigning kings no longer feared the pope. <strong>Philip IV</strong> of France defied Boniface, sent thugs who arrested the elderly pope at <strong>Anagni</strong> (1303), and he died of shock weeks later. The high medieval papacy was finished.</p>
<p>Philip then engineered the election of a French pope, <strong>Clement V</strong>, who in <strong>1309</strong> moved the papal court to <strong>Avignon</strong> on the Rhône — a town just outside France's border but effectively under French control. For nearly <strong>seventy</strong> years the popes ruled from Avignon, not Rome. The poet <strong>Petrarch</strong> called Avignon "the sewer of the world." Clement V suppressed the <strong>Templars</strong> at the Council of <strong>Vienne</strong> (1311–12), seizing their treasure for the French crown. The papacy finally returned to Rome in <strong>1377</strong> — and within a year a vacuum would open that split the church into rival popes.</p>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">1302</div><div class="atl-text">Boniface VIII issues Unam Sanctam</div></div>
  <div class="atl-row"><div class="atl-year">1303</div><div class="atl-text">Philip IV's thugs attack Boniface at Anagni</div></div>
  <div class="atl-row"><div class="atl-year">1309</div><div class="atl-text">Clement V moves papacy to Avignon</div></div>
  <div class="atl-row"><div class="atl-year">1377</div><div class="atl-text">Papacy returns to Rome</div></div>
</div>
<div class="pull-quote">
  <p>"Submission to the Roman pontiff is altogether necessary for salvation."</p>
  <cite>— Boniface VIII, Unam Sanctam, 1302</cite>
</div>
</div>`;

_track3.lessons[25].articleHtml=M25_ARTICLE_HTML;
_track3.lessons[25].learn=M25_LEARN;
_track3.lessons[25].study=M25_STUDY;
_track3.lessons[25].coldOpen={_bg:'/images/middle-ages/Anignon.jpeg',cards:[
  {label:'The World Before',text:'The high medieval papacy is at the height of its claims. The kings of France and England no longer fear it. The mendicant orders are everywhere; Aquinas has just died.',size:'lg'},
  {label:'The Crisis',text:'Boniface VIII makes the most extreme papal claim ever — and a French king sends thugs after the elderly pope. The papacy will not recover.',size:'xl'},
  {label:'The Key Figures',text:'Boniface VIII, who overreached. Philip IV of France, who broke him. Clement V, the first French pope of the Avignon line.',size:'lg'},
  {label:'The Bridge',text:'Here is how the papacy fell into France\'s lap for seventy years — and emerged into a century of schism.',size:'md'},
]};

const M26_LEARN=[
  {sentence:"The Italian mystic who urged the pope back from Avignon was Catherine of _____.",answer:"Siena",options:["Siena","Assisi","Florence","Bologna"],explanation:"Catherine of Siena (1347–1380) — Dominican tertiary and mystic — pleaded with Gregory XI in letters and in person.",tier:1},
  {sentence:"Catherine was a tertiary of the _____ order.",answer:"Dominican",options:["Dominican","Franciscan","Augustinian","Carmelite"],explanation:"Catherine was a Dominican tertiary — a lay member of the Order of Preachers under vow.",tier:1},
  {sentence:"The pope Catherine wrote to at Avignon was Gregory _____.",answer:"XI",options:["XI","XII","XIII","X"],explanation:"Gregory XI — the last Avignon pope — yielded to Catherine's appeals and returned to Rome in 1377.",tier:1},
  {sentence:"In 1377 Gregory XI returned the papacy to _____.",answer:"Rome",options:["Rome","Avignon","Florence","Pisa"],explanation:"1377 — Gregory XI returned the papacy to Rome, ending the Avignon Captivity.",tier:1},
  {sentence:"Gregory XI died in the year _____.",answer:"1378",options:["1378","1377","1380","1409"],explanation:"Gregory XI died in 1378, opening the vacuum that became the Western Schism.",tier:1},
  {sentence:"The Italian pope the Roman cardinals elected after Gregory XI was Urban _____.",answer:"VI",options:["VI","V","VII","VIII"],explanation:"Urban VI was elected by the Roman cardinals in 1378 — and quickly regretted by them.",tier:1},
  {sentence:"The French rival pope set up against Urban VI was Clement _____.",answer:"VII",options:["VII","V","VI","VIII"],explanation:"Clement VII — the antipope elected by the same cardinals after they regretted Urban VI.",tier:1},
  {sentence:"Clement VII set up his court back at _____.",answer:"Avignon",options:["Avignon","Pisa","Paris","Marseille"],explanation:"Clement VII re-established the Avignon court, beginning the Western Schism.",tier:1},
  {sentence:"After the failed Council of Pisa (1409), there were briefly _____ popes simultaneously.",answer:"three",options:["three","two","four","five"],explanation:"Pisa added a third claimant rather than ending the Schism — three popes at once.",tier:1},
  {sentence:"The council that finally healed the Schism was _____.",answer:"Constance",options:["Constance","Pisa","Basel","Florence"],explanation:"The Council of Constance (1414–18) deposed all the rival popes and elected Martin V.",tier:1},
  {sentence:"The pope elected at Constance to end the Schism was Martin _____.",answer:"V",options:["V","IV","VI","VII"],explanation:"Martin V — elected at Constance in 1417 — ended the Western Schism.",tier:1},
  {sentence:"The Western Schism lasted from 1378 to _____.",answer:"1417",options:["1417","1409","1414","1418"],explanation:"1378 to 1417 — almost forty years of rival popes excommunicating one another.",tier:1},
];

const M26_STUDY={
  cards:[{
    text:'Catherine of Siena\'s letters and personal appeals moved Pope Gregory XI to return the papacy from Avignon to Rome in 1377. When Gregory died the next year, rival cardinals elected two popes — Urban VI in Rome and Clement VII in Avignon. After a failed Council of Pisa briefly produced three simultaneous popes, the Council of Constance (1414–18) healed the break and elected Martin V.',
    terms:[
      {word:'Catherine of Siena',def:'Dominican tertiary and mystic (1347–1380) whose fierce letters urged Gregory XI to leave Avignon and reclaim his seat. She called him "our sweet Christ on earth" — and meant it as pressure, not flattery.'},
      {word:'Western Schism',def:'The 1378–1417 crisis in which rival claimants held the papacy simultaneously — Urban VI in Rome, Clement VII in Avignon — each excommunicating the other. Almost forty years of two (then briefly three) popes cursing each other.'},
      {word:'Council of Pisa (1409)',def:'An attempt to end the Schism that backfired: by deposing both existing popes and electing a third, it briefly produced three simultaneous papal claimants rather than ending the crisis.'},
      {word:'Council of Constance',def:'The council (1414–18) that finally ended the Western Schism by deposing all the rival claimants and electing Martin V in 1417. It also burned Jan Huss and condemned Wycliffe posthumously.'},
      {word:'Martin V',def:'The pope elected at the Council of Constance in 1417, ending the Western Schism. His election restored unity — but could not restore the prestige the papacy had lost watching three popes curse each other for forty years.'},
    ],
    questions:[],
  }],
  questions:[
    {q:'How did the Western Schism damage the medieval papal claim?',
     a:'The papacy had built its authority on being the singular head of the church — the one visible vicar of Christ. The Western Schism made that claim absurd. For forty years, every Catholic in Europe had to choose which pope to obey while the other excommunicated them. Three simultaneous popes cursing each other was not the image of apostolic succession Innocent III had projected. The damage was theological: if the church could survive four decades of rival papacies, maybe the papacy wasn\'t as essential as it claimed.'},
  ],
};

const M26_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 27 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">Catherine of Siena &amp; the Papal Schism</h1>
<p class="article-sub">A mystic recalls the pope; the church then splits in three · 1377–1417</p>
<div class="art-divider"></div>
<div class="article-body">
<p>A young Italian mystic writes letter after letter to a pope. He returns to Rome. Then dies. And the church has three popes at once.</p>
<figure style="margin:1.75rem 0;border:1px solid rgba(20,8,12,0.1);border-radius:10px;overflow:hidden;">
  <img src="/images/middle-ages/CatherineSiena.jpeg" style="width:100%;display:block;object-fit:cover;object-position:top center;max-height:420px;">
  <figcaption><strong>Catherine of Siena · 1347–1380</strong> The young mystic whose letters helped persuade Gregory XI to bring the papacy back from Avignon — only for the church to splinter into three obediences after her death.</figcaption>
</figure>
<p><strong>Catherine of Siena</strong> (1347–1380), a <strong>Dominican</strong> tertiary and a mystic, in her early thirties began writing fierce, motherly letters to Pope <strong>Gregory XI</strong> at Avignon, urging him to return to <strong>Rome</strong>. She also went in person. In <strong>1377</strong> Gregory yielded and returned the papacy to Rome — ending the seventy-year Avignon Captivity. Catherine had moved the chair of Peter by the force of her prayer and her pen.</p>
<p>Then, in <strong>1378</strong>, Gregory XI died. The Roman cardinals elected an Italian, <strong>Urban VI</strong>, but quickly regretted it and elected a French rival, <strong>Clement VII</strong>, who set up court back at <strong>Avignon</strong>. For forty years there were two popes — and after the failed Council of <strong>Pisa</strong> (1409), briefly <strong>three</strong>. Each excommunicated the others; each had his European supporters. The Western Schism (1378–<strong>1417</strong>) was finally healed at the Council of <strong>Constance</strong> (1414–18), which deposed all the rivals and elected <strong>Martin V</strong>. The medieval papal claim of universal authority did not survive the spectacle of three popes cursing one another.</p>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">1377</div><div class="atl-text">Gregory XI returns the papacy to Rome</div></div>
  <div class="atl-row"><div class="atl-year">1378</div><div class="atl-text">Western Schism begins; rival popes at Rome and Avignon</div></div>
  <div class="atl-row"><div class="atl-year">1409</div><div class="atl-text">Failed Council of Pisa — briefly three popes</div></div>
  <div class="atl-row"><div class="atl-year">1417</div><div class="atl-text">Council of Constance ends the Schism; elects Martin V</div></div>
</div>
</div>`;

_track3.lessons[26].articleHtml=M26_ARTICLE_HTML;
_track3.lessons[26].learn=M26_LEARN;
_track3.lessons[26].study=M26_STUDY;
_track3.lessons[26].coldOpen={_bg:'/images/middle-ages/CatherineSiena.jpeg',cards:[
  {label:'The World Before',text:'For seventy years the popes have ruled from Avignon, taxing all Europe. Christendom is sick of it.',size:'lg'},
  {label:'The Crisis',text:'A young Italian mystic writes to the pope at Avignon: come back. He does. Then he dies — and the cardinals elect two popes, then three.',size:'xl'},
  {label:'The Key Figures',text:'Catherine of Siena, the mystic. Gregory XI, who returned the papacy to Rome. Urban VI and Clement VII, the rival popes.',size:'lg'},
  {label:'The Bridge',text:'Here is the great public scandal that broke the medieval papal claim — and the Council of Constance that finally healed it.',size:'md'},
]};

const M27_LEARN=[
  {sentence:"The English theologian called the Morning Star of the Reformation was John _____.",answer:"Wycliffe",options:["Wycliffe","Huss","Tyndale","Knox"],explanation:"John Wycliffe (c. 1330–1384) — Oxford theologian whose ideas anticipated the Reformation by a century.",tier:1},
  {sentence:"Wycliffe taught at the University of _____.",answer:"Oxford",options:["Oxford","Cambridge","Paris","Prague"],explanation:"Wycliffe was an Oxford theologian and master.",tier:1},
  {sentence:"Wycliffe's first principle was that _____ alone is the rule of faith.",answer:"Scripture",options:["Scripture","the pope","tradition","the councils"],explanation:"Scripture alone — not pope, council, or tradition — was Wycliffe's rule of faith.",tier:1},
  {sentence:"The English translation of the Bible was completed by Wycliffe's disciples in the year _____.",answer:"1382",options:["1382","1384","1415","1428"],explanation:"The Wycliffe Bible — the first complete English Bible — was completed by his disciples in 1382.",tier:1},
  {sentence:"Wycliffe's lay followers who carried his Bible across England were called _____.",answer:"Lollards",options:["Lollards","Hussites","Waldenses","Cathars"],explanation:"The Lollards — Wycliffe's lay followers — spread his teaching and Bible throughout England.",tier:1},
  {sentence:"The council that condemned Wycliffe's doctrines in 1415 was _____.",answer:"Constance",options:["Constance","Pisa","Basel","Florence"],explanation:"The Council of Constance condemned Wycliffe's doctrines in 1415 — the same council that burned Huss.",tier:1},
  {sentence:"The year Constance condemned Wycliffe's doctrines was _____.",answer:"1415",options:["1415","1414","1428","1417"],explanation:"1415 — Constance condemned Wycliffe's doctrines posthumously.",tier:1},
  {sentence:"In 1428 Wycliffe's bones were exhumed and _____ at papal order.",answer:"burned",options:["burned","reburied","scattered at sea","enshrined"],explanation:"In 1428 — at papal order — Wycliffe's bones were exhumed and burned.",tier:1},
  {sentence:"Wycliffe taught that dominion belongs to _____ alone.",answer:"God",options:["God","the pope","the king","the bishop"],explanation:"Dominion belongs to God alone — popes and bishops who live in sin forfeit their authority, said Wycliffe.",tier:1},
  {sentence:"Wycliffe attacked the doctrine of _____ — the change of bread and wine into Christ's body and blood.",answer:"transubstantiation",options:["transubstantiation","consubstantiation","memorialism","receptionism"],explanation:"Wycliffe attacked transubstantiation as without scriptural warrant.",tier:1},
  {sentence:"Wycliffe denied the _____ authority of the pope.",answer:"temporal",options:["temporal","scriptural","ecclesial","liturgical"],explanation:"Wycliffe denied the temporal authority of the pope — only spiritual rule, and only insofar as the holder is righteous.",tier:1},
  {sentence:"Wycliffe is called the _____ Star of the Reformation.",answer:"Morning",options:["Morning","Evening","North","Bright"],explanation:"The Morning Star of the Reformation — preaching a century before Luther.",tier:1},
];

const M27_STUDY={
  cards:[{
    text:'John Wycliffe (c. 1330–1384), an Oxford theologian, taught that Scripture alone is the rule of faith and that dominion belongs to God alone — popes and bishops in sin forfeit their authority. He oversaw the first complete English Bible (1382), and his Lollard followers spread it across England. After his death the Council of Constance condemned his doctrines; in 1428 his bones were exhumed and burned.',
    terms:[
      {word:'Scripture alone',def:'Wycliffe\'s first principle: Scripture, not pope or council, is the final rule of faith. A century before Luther\'s sola scriptura, Wycliffe was making the same argument from Oxford.'},
      {word:'dominion',def:'Wycliffe\'s political theology: all authority belongs to God alone. Popes and bishops who live in sin have forfeited their right to rule — a radical claim that threatened both church and crown.'},
      {word:'transubstantiation',def:'The doctrine that the bread and wine become the body and blood of Christ at consecration. Wycliffe attacked it as without scriptural warrant — his most explosive claim, costing him official protection.'},
      {word:'Lollards',def:'Wycliffe\'s lay followers in England, who carried his English Bible and preaching across the country after his death. They were persecuted but never fully suppressed, keeping Wycliffe\'s ideas alive until the Reformation.'},
      {word:'Morning Star',def:'The title given to Wycliffe for anticipating the Reformation\'s central themes — Scripture alone, vernacular Bible, anti-papal authority — a full century before Luther. He named the issues; Luther had the nerve to act on them.'},
    ],
    questions:[],
  }],
  questions:[
    {q:'Why is Wycliffe called the Morning Star of the Reformation?',
     a:'Wycliffe raised every major issue Luther would raise — Scripture as the supreme authority, the corruption of the hierarchy, the rejection of transubstantiation, the translation of the Bible into the vernacular. He did it a century earlier and died peacefully in his bed. The title "Morning Star" recognizes that the Reformation wasn\'t a sudden break but a long dawn. Wycliffe named the light first; Luther arrived when enough of Europe was finally willing to look at it.'},
  ],
};

const M27_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 28 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">John Wycliffe</h1>
<p class="article-sub">The Morning Star of the Reformation · c. 1330–1384</p>
<div class="art-divider"></div>
<div class="article-body">
<p>An Oxford theologian, watching three popes curse one another, decided the church should answer to Scripture instead.</p>
<figure style="margin:1.75rem 0;border:1px solid rgba(20,8,12,0.1);border-radius:10px;overflow:hidden;">
  <img src="/images/middle-ages/Wycliffe.jpeg" style="width:100%;display:block;object-fit:cover;object-position:top center;max-height:420px;">
  <figcaption><strong>John Wycliffe · c. 1330–1384</strong> The "Morning Star of the Reformation" watched three popes curse one another and made Scripture, not the papacy, his standard of authority.</figcaption>
</figure>
<p><strong>John Wycliffe</strong> (c. 1330–1384), an English theologian at the University of <strong>Oxford</strong>, taught two ideas that scandalized the late-medieval church. First: <strong>Scripture</strong> alone is the rule of faith — not the pope, not the councils, not tradition. Second: <strong>dominion</strong> belongs to <strong>God</strong> alone; popes and bishops who live in sin forfeit their authority. He attacked <strong>transubstantiation</strong>; he attacked clerical wealth; he denied the <strong>temporal</strong> authority of the pope.</p>
<p>Wycliffe's most lasting work was the English Bible (completed by his disciples in <strong>1382</strong>), the first complete translation of Scripture into English. His lay followers, the <strong>Lollards</strong>, carried his preaching and his Bible across England. Wycliffe died peacefully in 1384, but his teaching outlived him. The Council of <strong>Constance</strong> condemned his doctrines in <strong>1415</strong> (the same council that burned Huss). In 1428 his bones were exhumed and <strong>burned</strong> at papal order — the most explicit refutation his teaching ever received. He is called the <strong>Morning</strong> Star of the Reformation: Luther was a century away, but Wycliffe had named the issues.</p>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">1382</div><div class="atl-text">Wycliffe's disciples complete the English Bible</div></div>
  <div class="atl-row"><div class="atl-year">1384</div><div class="atl-text">Wycliffe dies peacefully</div></div>
  <div class="atl-row"><div class="atl-year">1415</div><div class="atl-text">Constance condemns Wycliffe's doctrines</div></div>
  <div class="atl-row"><div class="atl-year">1428</div><div class="atl-text">Wycliffe's bones exhumed and burned at papal order</div></div>
</div>
<div class="pull-quote">
  <p>"Holy Scripture is the supreme authority for every Christian — the standard of faith and of all human perfection."</p>
  <cite>— Wycliffe, On the Truth of Holy Scripture</cite>
</div>
</div>`;

_track3.lessons[27].articleHtml=M27_ARTICLE_HTML;
_track3.lessons[27].learn=M27_LEARN;
_track3.lessons[27].study=M27_STUDY;
_track3.lessons[27].coldOpen={_bg:'/images/middle-ages/Wycliffe.jpeg',cards:[
  {label:'The World Before',text:'Three popes are cursing one another. The English church is wealthy, distant, in Latin. An Oxford theologian decides Scripture, not the pope, should be the rule.',size:'lg'},
  {label:'The Crisis',text:'Can the church be reformed by appeal to Scripture alone — over the head of pope and council? Wycliffe says yes.',size:'xl'},
  {label:'The Key Figures',text:'John Wycliffe, the Oxford theologian. His Lollards, who carried his English Bible across England.',size:'lg'},
  {label:'The Bridge',text:'Here is the "Morning Star" of the Reformation — preaching a century before Luther, condemned at Constance, and exhumed and burned to make the point.',size:'md'},
]};

const M28_LEARN=[
  {sentence:"The 15th-century Latin cry — \"to the sources\" — was _____ fontes.",answer:"ad",options:["ad","de","in","pro"],explanation:"\"Ad fontes\" — back to the sources — was the rallying cry of the Renaissance recovery of Scripture in its original languages.",tier:1},
  {sentence:"In 1453 Greek scholars fled west when _____ fell to the Ottomans.",answer:"Constantinople",options:["Constantinople","Athens","Vienna","Belgrade"],explanation:"The fall of Constantinople (1453) accelerated the migration of Greek scholarship into Latin Europe.",tier:1},
  {sentence:"The year Constantinople fell to the Ottomans was _____.",answer:"1453",options:["1453","1417","1431","1516"],explanation:"1453 — the fall of Constantinople sent Greek manuscripts and scholars west.",tier:1},
  {sentence:"The 1431–45 council that brought Greek learning back into Latin Europe was the Council of _____.",answer:"Florence",options:["Florence","Constance","Basel","Trent"],explanation:"The Council of Florence (1431–45) opened a channel for Greek scholarship into the west.",tier:1},
  {sentence:"Under ad fontes, Christians could read the NT in _____ and the OT in Hebrew.",answer:"Greek",options:["Greek","Aramaic","Coptic","Syriac"],explanation:"For the first time in a thousand years, the NT was readable in its original Greek — and the OT in Hebrew.",tier:1},
  {sentence:"The 15th-century spiritual current — \"the new devotion\" — was the devotio _____.",answer:"moderna",options:["moderna","antiqua","catholica","communis"],explanation:"The devotio moderna — \"the new devotion\" — was the Brethren of the Common Life's spiritual movement.",tier:1},
  {sentence:"The lay movement of the new devotion was the Brethren of the Common _____.",answer:"Life",options:["Life","Way","Spirit","Cross"],explanation:"The Brethren of the Common Life — lay men and women, not monks — gathered for shared Scripture, prayer, and work.",tier:1},
  {sentence:"The founder of the Brethren of the Common Life was Geert _____.",answer:"Groote",options:["Groote","Eckhart","Tauler","Suso"],explanation:"Geert Groote (1340–1384) founded the Brethren of the Common Life in the Netherlands.",tier:1},
  {sentence:"The Brethren of the Common Life arose in the Low _____.",answer:"Countries",options:["Countries","Lands","Cities","Rivers"],explanation:"The Brethren arose in the Low Countries — modern Netherlands and Belgium.",tier:1},
  {sentence:"The most-read devotional book of the late Middle Ages was the Imitation of _____.",answer:"Christ",options:["Christ","Saints","Mary","God"],explanation:"The Imitation of Christ — the most-read devotional book of the late Middle Ages.",tier:1},
  {sentence:"The author of the Imitation of Christ was Thomas à _____.",answer:"Kempis",options:["Kempis","Aquinas","Bradwardine","Eckhart"],explanation:"Thomas à Kempis (c. 1380–1471) — a Brother of the Common Life — wrote the Imitation of Christ.",tier:1},
  {sentence:"The Greek New Testament put into Luther's hands was printed by _____ in 1516.",answer:"Erasmus",options:["Erasmus","Reuchlin","Calvin","Tyndale"],explanation:"Erasmus of Rotterdam printed the Greek New Testament in 1516 — the year before Luther posted the 95 Theses.",tier:1},
];

const M28_STUDY={
  cards:[{
    text:'The 15th-century Renaissance gave Christianity a recovery of the original languages of Scripture — the cry was ad fontes, "to the sources." Constantinople fell to the Ottomans in 1453, sending Greek scholars west, and Erasmus printed the Greek New Testament in 1516. The devotio moderna — born among the Brethren of the Common Life — fed a parallel spiritual hunger through Thomas à Kempis\'s Imitation of Christ.',
    terms:[
      {word:'ad fontes',def:'Latin for "to the sources" — the Renaissance rallying cry. For the first time in a thousand years, Latin Christians could read the New Testament in Greek and the Old Testament in Hebrew. What they found reshaped everything.'},
      {word:'Constantinople',def:'The Byzantine capital that fell to the Ottoman Turks in 1453. Greek scholars fled west with their manuscripts, accelerating the flow of Greek learning into Latin Europe — one of the triggers of the Renaissance.'},
      {word:'Erasmus',def:'The Dutch humanist (c. 1466–1536) who published the first printed Greek New Testament in 1516 — a year before Luther posted the 95 Theses. His edition put the original text into scholars\' hands and exposed errors in the Latin Vulgate.'},
      {word:'devotio moderna',def:'"The new devotion" — a lay spiritual movement in the Low Countries, founded by Geert Groote (1340–1384). The Brethren of the Common Life lived simple shared lives of Scripture, prayer, and work. Thomas à Kempis was their most famous product.'},
      {word:'Imitation of Christ',def:'Thomas à Kempis\'s devotional classic — the most-read book of the late Middle Ages after the Bible. A guide to interior piety, humility, and following Christ that shaped generations before the Reformation arrived.'},
    ],
    questions:[],
  }],
  questions:[
    {q:'How did Renaissance humanism enable the Reformation?',
     a:'The humanists weren\'t trying to start a reformation — they wanted better scholarship. But ad fontes had theological consequences no one fully intended. When Erasmus compared his Greek New Testament to the Latin Vulgate, the discrepancies were glaring. When Luther read Paul in Greek, Romans 1:17 hit differently. The Renaissance gave the Reformers the tools to argue that the medieval church had been reading a translation, not the Word. The humanists supplied the scholarship; the Reformers supplied the nerve to act on it.'},
  ],
};

const M28_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 29 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">The Renaissance &amp; Ad Fontes</h1>
<p class="article-sub">Recovering Greek and Hebrew &middot; 15th century</p>
<div class="art-divider"></div>
<div class="article-body">
<p>"Back to the sources." A new generation of scholars opens up Greek and Hebrew, and the late medieval church is changed.</p>
<figure style="margin:1.75rem 0;border:1px solid rgba(20,8,12,0.1);border-radius:10px;overflow:hidden;">
  <img src="/images/middle-ages/Florence.jpeg" style="width:100%;display:block;object-fit:cover;object-position:top center;max-height:420px;">
  <figcaption><strong>Renaissance Florence · 15th century</strong> Humanists called out <em>ad fontes</em> — "back to the sources!" Greek and Hebrew returned to Western Christendom and reshaped the late medieval church.</figcaption>
</figure>
<p>The 15th-century Renaissance was, for Christianity, a recovery of the original languages of Scripture. The cry was <strong>ad fontes</strong> — "to the sources." Greek scholars fled west as <strong>Constantinople</strong> fell to the Ottomans (<strong>1453</strong>), and the Council of <strong>Florence</strong> (1431–45) had already begun bringing Greek learning back into Latin Europe. For the first time in a thousand years, Latin Christendom could read the New Testament in <strong>Greek</strong> and the Old Testament in Hebrew.</p>
<p>The spiritual current of the same age was the <strong>devotio moderna</strong> — "the new devotion" — born among the Brethren of the Common <strong>Life</strong> in the Low <strong>Countries</strong>, founded by <strong>Geert Groote</strong> (1340–1384). Lay men and women, not monks, living simple shared lives of Scripture, prayer, and work. From this movement came Thomas à <strong>Kempis</strong> (c. 1380–1471) and his <strong>Imitation of Christ</strong> — the most-read devotional book of the late Middle Ages. And on the horizon stood <strong>Erasmus</strong> of Rotterdam, who would print the Greek New Testament in 1516 — and put it into Luther's hands. The Reformation was a year away.</p>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">1431</div><div class="atl-text">Council of Florence opens; Greek learning flows west</div></div>
  <div class="atl-row"><div class="atl-year">1453</div><div class="atl-text">Constantinople falls to the Ottomans; Greek scholars flee west</div></div>
  <div class="atl-row"><div class="atl-year">1516</div><div class="atl-text">Erasmus prints the Greek New Testament</div></div>
</div>
<div class="pull-quote">
  <p>"Ad fontes!" — "To the sources!"</p>
  <cite>— Battle cry of the 15th-century recovery of Greek and Hebrew</cite>
</div>
</div>`;

_track3.lessons[28].articleHtml=M28_ARTICLE_HTML;
_track3.lessons[28].learn=M28_LEARN;
_track3.lessons[28].study=M28_STUDY;
_track3.lessons[28].coldOpen={_bg:'/images/middle-ages/Florence.jpeg',cards:[
  {label:'The World Before',text:'The Schism is healed, but the late medieval church is exhausted. New universities are flowering. Greek scholars are fleeing Ottoman pressure.',size:'lg'},
  {label:'The Crisis',text:'For a thousand years Latin Christendom has read the Bible in Latin. What happens when scholars open it in Greek and Hebrew again?',size:'xl'},
  {label:'The Key Figures',text:'Geert Groote and the Brethren of the Common Life. Thomas à Kempis. Erasmus of Rotterdam — and his 1516 Greek New Testament.',size:'lg'},
  {label:'The Bridge',text:'Here is the recovery of the original languages — ad fontes — that put the Greek New Testament into Luther\'s hands a year before the 95 Theses.',size:'md'},
]};

const M29_LEARN=[
  {sentence:"The Bohemian reformer burned at the Council of Constance in 1415 was Jan _____.",answer:"Huss",options:["Huss","Wycliffe","Tyndale","Knox"],explanation:"Jan Huss (c. 1369–1415) — Bohemian preacher and master at the University of Prague, burned at Constance.",tier:1},
  {sentence:"Huss preached at _____ Chapel in Prague.",answer:"Bethlehem",options:["Bethlehem","Wenceslas","Nicholas","Vitus"],explanation:"Bethlehem Chapel in Prague — built specifically for vernacular preaching — was Huss's pulpit.",tier:1},
  {sentence:"Huss was a master at the University of _____.",answer:"Prague",options:["Prague","Oxford","Paris","Bologna"],explanation:"Huss was a master at the University of Prague, the oldest in central Europe.",tier:1},
  {sentence:"Huss took up the central convictions of John _____.",answer:"Wycliffe",options:["Wycliffe","Calvin","Knox","Tyndale"],explanation:"Huss took up Wycliffe's central convictions and carried them into Bohemia in Czech.",tier:1},
  {sentence:"Huss preached in _____, not Latin.",answer:"Czech",options:["Czech","German","Polish","Slavonic"],explanation:"Huss preached in Czech, not Latin — making the gospel accessible to ordinary Bohemians.",tier:1},
  {sentence:"In Czech, \"Hus\" means _____.",answer:"goose",options:["goose","swan","eagle","dove"],explanation:"\"Hus\" means \"goose\" in Czech — the basis for Huss's reported final prophecy about a swan to come.",tier:1},
  {sentence:"Huss demanded communion in both kinds for the laity — bread and _____.",answer:"cup",options:["cup","oil","water","wafer"],explanation:"Huss demanded communion in both kinds — bread and cup — for the laity, not just for priests.",tier:1},
  {sentence:"The emperor who promised Huss safe conduct to Constance was _____.",answer:"Sigismund",options:["Sigismund","Charles IV","Frederick III","Wenceslaus"],explanation:"Emperor Sigismund's written safe conduct was the basis on which Huss came to Constance; the Council ignored it.",tier:1},
  {sentence:"Huss was burned at the Council of _____.",answer:"Constance",options:["Constance","Pisa","Basel","Florence"],explanation:"The Council of Constance (1414–18) — which also healed the Western Schism.",tier:1},
  {sentence:"The year Huss was burned at the stake was _____.",answer:"1415",options:["1415","1414","1417","1428"],explanation:"July 6, 1415 — Huss was burned at the stake at Constance.",tier:1},
  {sentence:"After the burning, Huss's ashes were scattered into the river _____.",answer:"Rhine",options:["Rhine","Danube","Vltava","Elbe"],explanation:"Huss's ashes were scattered into the Rhine — to prevent his grave becoming a shrine.",tier:1},
  {sentence:"A century after Huss, the \"swan\" who rose was Martin _____.",answer:"Luther",options:["Luther","Calvin","Knox","Tyndale"],explanation:"Luther called himself the swan of Huss's prophecy when he posted the 95 Theses in 1517.",tier:1},
];

const M29_STUDY={
  cards:[{
    text:'Jan Huss (c. 1369–1415), preacher at Bethlehem Chapel in Prague, took Wycliffe\'s convictions into Bohemia in Czech — Scripture as the rule of faith, communion in both kinds for the laity. Summoned to the Council of Constance under Emperor Sigismund\'s safe conduct, he was arrested, refused to recant, and burned on July 6, 1415. His ashes were scattered into the Rhine; his prophecy of the swan pointed to Luther.',
    terms:[
      {word:'Bethlehem Chapel',def:'The Prague chapel built specifically for Czech-language preaching — Huss\'s pulpit. Preaching in Czech rather than Latin was itself a reform: ordinary Bohemians could hear and understand the gospel.'},
      {word:'communion in both kinds',def:'Huss\'s demand that laypeople receive both the bread and the cup at communion, not just the bread as was customary. A pointed challenge to the medieval church\'s distinction between clergy and laity.'},
      {word:'Sigismund\'s safe conduct',def:'The written guarantee of safe passage issued by Emperor Sigismund to bring Huss to Constance. The Council of Constance ignored it, ruling that faith need not be kept with heretics. Huss came trusting it; the Council broke it.'},
      {word:'goose and swan',def:'Huss\'s reported final words at the stake, playing on his Czech name ("Hus" = "goose"): "Today you cook a goose, but in a hundred years there will rise a swan you will not silence." Luther, arriving exactly a century later, called himself the swan.'},
      {word:'Rhine',def:'The river into which Huss\'s ashes were scattered after his burning on July 6, 1415 — to prevent his grave becoming a pilgrimage shrine. The gesture showed how much the Council feared his memory.'},
    ],
    questions:[],
  }],
  questions:[
    {q:'What connects Huss to Luther, and what was the price of his faithfulness?',
     a:'Huss took Wycliffe\'s ideas and preached them in the people\'s own language, giving a whole nation a vocabulary for reform. The connection to Luther is direct: at Leipzig in 1519, when Eck accused Luther of being a "Hussite," Luther looked up Huss\'s condemned articles and said he agreed with most of them. The price Huss paid was death by a council that had the power to lie and the patience to wait. He trusted an imperial safe conduct and found it worthless when faith and politics collided.'},
  ],
};

const M29_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 30 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">Jan Huss</h1>
<p class="article-sub">The goose burned at Constance · c. 1369–1415</p>
<div class="art-divider"></div>
<div class="article-body">
<p>A Bohemian priest preaches Wycliffe to the Czechs in their own language. He is promised safe conduct to Constance. The promise is broken.</p>
<figure style="margin:1.75rem 0;border:1px solid rgba(20,8,12,0.1);border-radius:10px;overflow:hidden;">
  <img src="/images/middle-ages/JanHus.jpeg" style="width:100%;display:block;object-fit:cover;object-position:top center;max-height:420px;">
  <figcaption><strong>Jan Huss · c. 1369–1415</strong> Promised safe conduct to Constance, the Bohemian priest was burned for preaching Wycliffe to his people in their own tongue.</figcaption>
</figure>
<p><strong>Jan Huss</strong> (c. 1369–1415), preacher at <strong>Bethlehem</strong> Chapel in Prague and a master at the University of <strong>Prague</strong>, took up <strong>Wycliffe</strong>'s central convictions: Scripture as the rule of faith; popes and bishops in sin forfeit their authority; <strong>communion in both kinds</strong> for the laity (bread <em>and</em> <strong>cup</strong>). He preached in <strong>Czech</strong>, not Latin, and his preaching became the spiritual heart of a Bohemian national reform movement.</p>
<p>Summoned to the Council of <strong>Constance</strong> in 1414 under Emperor <strong>Sigismund</strong>'s written safe conduct, Huss arrived to defend his teaching. The Council instead arrested him, demanded total recantation, refused his appeal to Scripture, and on July 6, <strong>1415</strong> burned him at the stake; his ashes were scattered into the <strong>Rhine</strong>. His final reported words played on his Czech name (<em>Hus</em> = "<strong>goose</strong>"): <em>"Today you cook a goose, but in a hundred years there will rise a swan you will not silence."</em> A century later, in 1517, <strong>Luther</strong> — calling himself the swan — would post his Theses.</p>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">1414</div><div class="atl-text">Huss summoned to Constance under Sigismund's safe conduct</div></div>
  <div class="atl-row"><div class="atl-year">1415</div><div class="atl-text">Huss burned at the stake; ashes scattered into the Rhine (July 6)</div></div>
  <div class="atl-row"><div class="atl-year">1517</div><div class="atl-text">Luther — the "swan" — posts the 95 Theses</div></div>
</div>
<div class="pull-quote">
  <p>"Today you cook a goose, but in a hundred years there will rise a swan you will not silence."</p>
  <cite>— Attributed to Jan Huss at the stake, July 1415</cite>
</div>
</div>`;

_track3.lessons[29].articleHtml=M29_ARTICLE_HTML;
_track3.lessons[29].learn=M29_LEARN;
_track3.lessons[29].study=M29_STUDY;
_track3.lessons[29].coldOpen={_bg:'/images/middle-ages/JanHus.jpeg',cards:[
  {label:'The World Before',text:'Wycliffe is dead; his bones soon to be burned. His teaching has spread through Czech students who studied at Oxford. Bohemia is restive.',size:'lg'},
  {label:'The Crisis',text:'A Bohemian priest preaches Wycliffe to the Czechs in their own language. Summoned to Constance under imperial safe conduct, he goes — and is arrested.',size:'xl'},
  {label:'The Key Figures',text:'Jan Huss, the Bohemian preacher. Emperor Sigismund, who broke his safe conduct. The Council of Constance, which burned him.',size:'lg'},
  {label:'The Bridge',text:'Here is how a stake outside Constance — and a final reported prophecy about a goose and a swan — set the table for Luther a century later.',size:'md'},
]};

const M30_LEARN=[
  {sentence:"The Florentine Dominican friar hanged and burned in 1498 was _____ Savonarola.",answer:"Girolamo",options:["Girolamo","Lorenzo","Cosimo","Tommaso"],explanation:"Girolamo Savonarola (1452–1498) — Dominican friar who briefly ruled Florence and denounced a Borgia pope.",tier:1},
  {sentence:"Savonarola was a friar of the convent of San _____ in Florence.",answer:"Marco",options:["Marco","Lorenzo","Spirito","Miniato"],explanation:"Savonarola was a friar at the convent of San Marco in Florence.",tier:1},
  {sentence:"Savonarola was a friar of the _____ order.",answer:"Dominican",options:["Dominican","Franciscan","Augustinian","Carmelite"],explanation:"Savonarola was a Dominican — like Aquinas and Catherine of Siena before him.",tier:1},
  {sentence:"The ruling family that fell from Florence in 1494 was the _____.",answer:"Medici",options:["Medici","Borgias","Sforzas","Estes"],explanation:"The Medici fell from Florence in 1494; Savonarola then became its effective spiritual ruler.",tier:1},
  {sentence:"After the Medici fell, Savonarola effectively became the city's _____ ruler.",answer:"spiritual",options:["spiritual","civic","military","Frankish"],explanation:"Savonarola was not a magistrate, but his preaching set the moral and political tone of Florence.",tier:1},
  {sentence:"Savonarola organized the famous \"bonfires of the _____.\"",answer:"vanities",options:["vanities","heretics","books","idols"],explanation:"Florentines voluntarily burned luxury goods, gambling tools, and immodest books and paintings in the public square.",tier:1},
  {sentence:"The Borgia pope Savonarola denounced was _____ VI.",answer:"Alexander",options:["Alexander","Innocent","Julius","Pius"],explanation:"Pope Alexander VI — whose corruption was extreme even by Renaissance papal standards.",tier:1},
  {sentence:"The birth name of Pope Alexander VI was Rodrigo _____.",answer:"Borgia",options:["Borgia","della Rovere","de' Medici","Farnese"],explanation:"Rodrigo Borgia — patriarch of the notorious Borgia family — was Pope Alexander VI.",tier:1},
  {sentence:"Alexander VI excommunicated Savonarola in the year _____.",answer:"1497",options:["1497","1498","1494","1500"],explanation:"1497 — Alexander VI excommunicated Savonarola after years of denunciation from the Florentine pulpit.",tier:1},
  {sentence:"Savonarola was hanged and his body burned in the year _____.",answer:"1498",options:["1498","1497","1494","1517"],explanation:"May 23, 1498 — Savonarola was hanged and his body burned in the Piazza della Signoria.",tier:1},
  {sentence:"Savonarola was hanged and burned in the Piazza della _____.",answer:"Signoria",options:["Signoria","Repubblica","Duomo","San Marco"],explanation:"The Piazza della Signoria — Florence's civic heart — was the site of Savonarola's execution.",tier:1},
  {sentence:"Nineteen years after Savonarola's death, the reformer who kept a portrait of him was Martin _____.",answer:"Luther",options:["Luther","Calvin","Knox","Tyndale"],explanation:"Luther kept a portrait of Savonarola and counted him among the reformers before the Reformation.",tier:1},
];

const M30_STUDY={
  cards:[{
    text:'Girolamo Savonarola (1452–1498), a Dominican at San Marco in Florence, became the city\'s effective spiritual ruler after the Medici fell in 1494. He preached repentance, organized the bonfires of the vanities, and denounced Pope Alexander VI — Rodrigo Borgia. Excommunicated in 1497, he was hanged and his body burned in the Piazza della Signoria on May 23, 1498; Luther kept his portrait.',
    terms:[
      {word:'bonfires of the vanities',def:'Savonarola\'s public repentance events in which Florentines voluntarily burned luxury goods, mirrors, gambling tools, and immodest books and paintings. The bonfires were a genuine popular movement — and a sign of how far his preaching had reached into the city.'},
      {word:'Alexander VI',def:'Rodrigo Borgia, pope from 1492–1503 — whose nepotism, simony, and personal morality were extreme even by Renaissance papal standards. Savonarola denounced him from the pulpit; Alexander excommunicated him in 1497.'},
      {word:'San Marco',def:'The Dominican convent in Florence where Savonarola served as prior. It became his base for transforming the city — and the place where, when the mob came, he was arrested.'},
      {word:'Medici',def:'The banking dynasty that had ruled Florence for generations. When they fell in 1494, the resulting political vacuum let Savonarola\'s preaching fill the city\'s moral and political space.'},
      {word:'Piazza della Signoria',def:'Florence\'s civic heart — the same square where the bonfires of the vanities had burned. On May 23, 1498, Savonarola was hanged and his body burned there, nineteen years before Luther posted his Theses.'},
    ],
    questions:[],
  }],
  questions:[
    {q:'What does Savonarola\'s story reveal about the pre-Reformation church?',
     a:'Savonarola shows both the corruption and the hunger for something different. He was not a theologian like Wycliffe or Huss — his reform was moral, not doctrinal. He denounced the Borgia pope\'s simony and scandals; he demanded repentance from the richest city in Europe and got it, briefly. What killed him was not heresy but politics: he made too many powerful enemies at once — the pope, the Florentine oligarchs, rival factions. The church needed a Savonarola to prove how broken it was; it could not afford to let him live.'},
  ],
};

const M30_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 31 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">Savonarola</h1>
<p class="article-sub">Florence, the bonfires, and a Borgia pope · 1452–1498</p>
<div class="art-divider"></div>
<div class="article-body">
<p>A Dominican friar in Florence preaches doom, denounces a Borgia pope, briefly rules the most cultured city in Europe — and is hanged and burned in its main square.</p>
<figure style="margin:1.75rem 0;border:1px solid rgba(20,8,12,0.1);border-radius:10px;overflow:hidden;">
  <img src="/images/middle-ages/Savonarola.jpeg" style="width:100%;display:block;object-fit:cover;object-position:top center;max-height:420px;">
  <figcaption><strong>Girolamo Savonarola · 1452–1498</strong> The Dominican who preached doom in Florence, briefly ruled the city, and was hanged and burned in the Piazza della Signoria.</figcaption>
</figure>
<p><strong>Girolamo</strong> Savonarola (1452–1498), a <strong>Dominican</strong> friar at the convent of San <strong>Marco</strong> in <strong>Florence</strong>, began in the early 1490s preaching that God was about to scourge a corrupt church — beginning with corrupt Italy and a corrupt pope. When the <strong>Medici</strong> fell from Florence in 1494, Savonarola became effectively the city's <strong>spiritual</strong> ruler. He preached repentance, simplicity, and Scripture; he organized the famous "bonfires of the <strong>vanities</strong>," in which Florentines burned their luxury goods, gambling tools, immodest dress, and pornographic books and paintings in the public square.</p>
<p>Savonarola denounced Pope <strong>Alexander VI</strong> — <strong>Rodrigo Borgia</strong>, a man whose corruption was extreme even by Renaissance papal standards. Alexander excommunicated him in <strong>1497</strong>. In <strong>1498</strong> a hostile Florentine faction arrested him, the Inquisition tortured him into confession, and on May 23, 1498 he was hanged and his body burned in the Piazza della <strong>Signoria</strong>. The gospel — clearer Scripture, denunciation of papal corruption, public repentance — had been preached by an unlikely Dominican on the eve of the Reformation. Nineteen years later <strong>Luther</strong> posted his Theses; he kept a portrait of Savonarola.</p>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">1494</div><div class="atl-text">Medici fall; Savonarola becomes Florence's effective spiritual ruler</div></div>
  <div class="atl-row"><div class="atl-year">1497</div><div class="atl-text">Alexander VI excommunicates Savonarola</div></div>
  <div class="atl-row"><div class="atl-year">1498</div><div class="atl-text">Savonarola hanged and burned in the Piazza della Signoria (May 23)</div></div>
</div>
</div>`;

_track3.lessons[30].articleHtml=M30_ARTICLE_HTML;
_track3.lessons[30].learn=M30_LEARN;
_track3.lessons[30].study=M30_STUDY;
_track3.lessons[30].coldOpen={_bg:'/images/middle-ages/Savonarola.jpeg',cards:[
  {label:'The World Before',text:'The Borgia pope sits in Rome. The Medici have fallen in Florence. Renaissance Italy is at the height of its wealth — and its depravity.',size:'lg'},
  {label:'The Crisis',text:'A Dominican friar preaches doom in the cathedral of Florence — and the city listens. He becomes its spiritual ruler. He denounces the pope. The pope strikes back.',size:'xl'},
  {label:'The Key Figures',text:'Girolamo Savonarola, the Dominican preacher. Pope Alexander VI — Rodrigo Borgia — whom he denounced.',size:'lg'},
  {label:'The Bridge',text:'Here is the final reformer-before-the-Reformation — hanged in Florence\'s main square nineteen years before Luther posted his Theses.',size:'md'},
]};

// ═══════════════════════════════════════════
// INTRODUCTION TRACK (track6) — read + learn only
// ═══════════════════════════════════════════

// ── Lesson 1 — History Is a Command, Not a Hobby ─────────────────────────

const I1_LEARN=[
  {sentence:"According to the essay, the most repeated command in the Bible is not 'love' or 'obey' but _____.",answer:"remember",options:["remember","forgive","worship","obey"],explanation:"The lesson opens with this claim: 'remember' is the most repeated command in the Bible.",tier:1},
  {sentence:"Jesus instituted the Lord's Supper saying, 'Do this in _____ of me.'",answer:"remembrance",options:["remembrance","memory","honor","obedience"],explanation:"Luke 22:19 / 1 Cor 11:24 — the Lord's Supper itself is a command to remember.",tier:1},
  {sentence:"The Old Testament feast instituted so Israel would remember the night the angel passed over was the _____.",answer:"Passover",options:["Passover","Pentecost","Sabbath","Day of Atonement"],explanation:"The Passover is the founding remembrance-feast: Israel relives the night God spared them.",tier:1},
  {sentence:"In 1 Corinthians 10, Paul walks the Corinthians through Israel's _____ failures as warnings for the church.",answer:"wilderness",options:["wilderness","exile","temple","conquest"],explanation:"Paul uses Israel's grumbling, idolatry, and unbelief in the wilderness as direct examples for the church.",tier:1},
  {sentence:"Paul says Israel's failures 'were written down for our _____.'",answer:"instruction",options:["instruction","comfort","entertainment","conviction"],explanation:"1 Corinthians 10:11 — the historical record exists to instruct the church.",tier:1},
  {sentence:"The apostle who writes the warning in 1 Corinthians 10 is _____.",answer:"Paul",options:["Paul","Peter","John","James"],explanation:"Paul writes 1 Corinthians, including the wilderness-warning passage.",tier:1},
  {sentence:"According to the essay, forgetting is not neutral — it is spiritually _____.",answer:"dangerous",options:["dangerous","unhelpful","disappointing","wasteful"],explanation:"The essay's central claim: forgetting is not a minor lapse — it is spiritually dangerous.",tier:1},
  {sentence:"Israel was commanded to remember the day they left _____.",answer:"Egypt",options:["Egypt","Babylon","Sinai","Canaan"],explanation:"Exodus and Deuteronomy repeatedly command Israel to remember their deliverance from Egypt.",tier:1},
  {sentence:"The Psalms recount God's wonders so the next _____ would not lose them.",answer:"generation",options:["generation","prophet","king","temple"],explanation:"Psalm 78 in particular tells the story so the next generation will set its hope in God.",tier:1},
  {sentence:"The essay concludes that church history is not a hobby — it is a _____.",answer:"command",options:["command","luxury","tradition","skill"],explanation:"The lesson's thesis: remembering God's work is commanded, not optional.",tier:1},
];

const I1_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 1 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">History Is a Command, Not a Hobby</h1>
<p class="article-sub">Why "remember" is the most repeated command in the Bible</p>
<div class="art-divider"></div>
<div class="article-body">
<p>The most repeated command in the Bible is not "love" or "obey." It is <strong>"remember."</strong> Israel was commanded to remember the Sabbath, to remember the day they left Egypt, to remember the covenant. Every time God's people forgot, they fell.</p>
<p>The <strong>Passover</strong> existed so they would remember the night the angel passed over. The Psalms recount God's wonders so the next generation would not lose them. Jesus said of the Lord's Supper, <em>"Do this in remembrance of me."</em> Forgetting isn't neutral. Forgetting is spiritually dangerous.</p>
<p>The Apostle <strong>Paul</strong> makes this explicit. In <strong>1 Corinthians 10</strong> he walks the Corinthians through Israel's wilderness failures — the grumbling, the idolatry, the unbelief — and says: <em>"These things happened to them as examples, but they were written down for our instruction."</em> History was written so we would learn from it. Studying what God has done with His people across two thousand years isn't extra credit for the spiritually ambitious. It is part of what He has commanded. Church history is not a hobby. It is a command.</p>
<div class="pull-quote">
  <p>"Now these things took place as examples for us, that we might not desire evil as they did."</p>
  <cite>— 1 Corinthians 10:6</cite>
</div>
</div>`;

// ── Lesson 2 — The Bible Itself Is Church History ────────────────────────

const I2_LEARN=[
  {sentence:"The book of _____ tells the story of the early church spreading across the Roman Empire.",answer:"Acts",options:["Acts","Romans","Revelation","Hebrews"],explanation:"Acts is the New Testament's church-history book — Pentecost through Paul's arrival in Rome.",tier:1},
  {sentence:"Acts opens with roughly _____ disciples praying in an upper room in Jerusalem.",answer:"120",options:["120","12","3,000","500"],explanation:"Acts 1:15 — about 120 disciples gathered before Pentecost.",tier:1},
  {sentence:"Within a single generation, the gospel had reached the empire's capital, the city of _____.",answer:"Rome",options:["Rome","Athens","Alexandria","Constantinople"],explanation:"Paul writes to a church already established in Rome (Romans 1), and Acts ends with Paul there.",tier:1},
  {sentence:"Christ's command in Matthew 28 was to make disciples of all _____.",answer:"nations",options:["nations","Jews","Gentiles","peoples"],explanation:"The Great Commission targets every nation — a global, historical project.",tier:1},
  {sentence:"The Bible's story of God's people begins with the first family in the book of _____.",answer:"Genesis",options:["Genesis","Exodus","Job","Psalms"],explanation:"Adam, Eve, Cain, Abel — Genesis is the Bible's opening family history.",tier:1},
  {sentence:"The book of Acts was written by _____, a companion of Paul.",answer:"Luke",options:["Luke","Mark","John","Peter"],explanation:"Luke wrote both his Gospel and Acts; he traveled with Paul on parts of the missionary journeys.",tier:1},
  {sentence:"According to the essay, Acts stops not because the church stopped, but because the _____ closed.",answer:"canon",options:["canon","apostolic age","persecution","Roman Empire"],explanation:"The biblical record ends with the close of the canon — the church kept going.",tier:1},
  {sentence:"Cities the essay names as having early churches include Antioch, Corinth, _____, and Rome.",answer:"Ephesus",options:["Ephesus","Athens","Alexandria","Jerusalem"],explanation:"The essay lists Antioch, Corinth, Ephesus, and Rome as early Gentile-Christian centers.",tier:1},
  {sentence:"The essay says studying church history is the natural extension of reading the _____.",answer:"Bible",options:["Bible","creeds","Gospels","Old Testament"],explanation:"If the Bible itself is church history, studying its sequel is the obvious next step.",tier:1},
  {sentence:"According to the essay, Genesis is a _____ history.",answer:"family",options:["family","national","military","priestly"],explanation:"Genesis traces the line from Adam through Abraham — a family history.",tier:1},
];

const I2_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 2 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">The Bible Itself Is Church History</h1>
<p class="article-sub">Studying post-biblical history is the natural extension of reading Acts</p>
<div class="art-divider"></div>
<div class="article-body">
<p>The Bible is not only doctrine and prophecy. It is, in large part, the <strong>history of the people of God</strong> — from the first family in <strong>Genesis</strong> to the closing chapters of <strong>Acts</strong>. Genesis is a family history. Exodus is a deliverance narrative. The Gospels are biographies. Acts is a missionary report. The Bible itself tells the story of God's people across roughly two thousand years.</p>
<p>That story does not stop in Acts because the church stopped — it stops because the <strong>canon closed</strong>. The book of Acts opens with about <strong>120 disciples</strong> praying in an upper room in Jerusalem. Within a single generation, churches existed across the Roman Empire — in <strong>Antioch, Corinth, Ephesus,</strong> and <strong>Rome</strong> itself. The mission Christ commanded in Matthew 28 — <em>"make disciples of all nations"</em> — was already underway by the time <strong>Luke</strong> laid down his pen.</p>
<p>When we study post-biblical church history, we are simply continuing the story Acts began. The same Christ, the same Spirit, the same gospel, the same opposition — extended through two more millennia. Studying church history is the natural extension of reading your Bible.</p>
<div class="pull-quote">
  <p>"You will be my witnesses in Jerusalem and in all Judea and Samaria, and to the end of the earth."</p>
  <cite>— Acts 1:8</cite>
</div>
</div>`;

// ── Lesson 3 — God Is Lord of History ────────────────────────────────────

const I3_LEARN=[
  {sentence:"Roman emperor _____ blamed Christians for the great fire of Rome in 64 AD.",answer:"Nero",options:["Nero","Trajan","Diocletian","Domitian"],explanation:"Nero used Christians as scapegoats for the fire and executed them with theatrical cruelty.",tier:1},
  {sentence:"Christians were considered politically dangerous because they refused to offer _____ to the emperor's image.",answer:"incense",options:["incense","taxes","tribute","loyalty oaths"],explanation:"Refusing to honor the emperor's image was read as treason against Rome.",tier:1},
  {sentence:"The Edict of Milan in _____ legalized Christianity in the Roman Empire.",answer:"313",options:["313","325","380","476"],explanation:"In 313 AD Constantine and Licinius issued the Edict of Milan ending the persecutions.",tier:1},
  {sentence:"By _____ AD, Christianity was the official religion of the Roman Empire.",answer:"380",options:["380","313","325","451"],explanation:"In 380 Theodosius declared Nicene Christianity the official faith of the empire.",tier:1},
  {sentence:"The early Christian writer who said, 'The blood of the martyrs is the seed of the church,' was _____.",answer:"Tertullian",options:["Tertullian","Augustine","Origen","Polycarp"],explanation:"Tertullian of Carthage coined this famous paradox in the late 2nd century.",tier:1},
  {sentence:"The last great Roman persecutor of the church was emperor _____.",answer:"Diocletian",options:["Diocletian","Nero","Constantine","Marcus Aurelius"],explanation:"The 'Great Persecution' under Diocletian (303–311) was the empire's last attempt to crush Christianity.",tier:1},
  {sentence:"According to the essay, the Roman persecutions did not extinguish Christianity — they _____ it.",answer:"scattered",options:["scattered","silenced","weakened","divided"],explanation:"Persecution dispersed believers across the empire, multiplying churches rather than ending them.",tier:1},
  {sentence:"The essay says history is the canvas on which God displays His _____ plan.",answer:"sovereign",options:["sovereign","secret","gradual","redemptive"],explanation:"Divine providence: God's sovereign plan is displayed across the historical record.",tier:1},
  {sentence:"The Roman persecution of Christianity lasted nearly _____ centuries before the Edict of Milan.",answer:"three",options:["three","one","five","ten"],explanation:"From Nero (64 AD) to the Edict of Milan (313 AD) is roughly 250 years — nearly three centuries.",tier:1},
  {sentence:"By 380 AD, the empire's persecutors had become its _____ within a single generation.",answer:"patrons",options:["patrons","servants","critics","enemies"],explanation:"The dramatic reversal: the state that once burned Christians now sponsored them.",tier:1},
];

const I3_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 3 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">God Is Lord of History</h1>
<p class="article-sub">The Roman persecutions and the providence that overruled them · AD 64–313</p>
<div class="art-divider"></div>
<div class="article-body">
<p>For nearly three centuries, being a Christian in the Roman Empire was a capital offense. Emperor <strong>Nero</strong> blamed Christians for the great fire of Rome in <strong>64 AD</strong> and used them as torches in his gardens. Domitian, Trajan, Marcus Aurelius, Decius, and <strong>Diocletian</strong> — all of them, at different intensities, tried to erase the church. Christians refused to offer incense to the emperor's image, were branded atheists and traitors, and were burned, beheaded, and fed to beasts.</p>
<p>The empire had every advantage: armies, courts, prisons, and law. The church had no weapons at all. <em>And the church grew.</em> The persecutions did not extinguish Christianity. They scattered it. They produced witnesses whose courage drew others. <strong>Tertullian</strong>, writing in the second century, made the famous observation: <em>"The blood of the martyrs is the seed of the church."</em></p>
<p>In <strong>313 AD</strong>, the Edict of Milan legalized Christianity. By <strong>380</strong> it was the official religion of the empire. The persecutors had become patrons within a single generation. History is the canvas on which God displays His sovereign plan. Studying it trains the eye to see Him at work.</p>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">64</div><div class="atl-text">Neronian persecution begins after the great fire of Rome</div></div>
  <div class="atl-row"><div class="atl-year">303</div><div class="atl-text">Diocletian launches the Great Persecution — the last and worst</div></div>
  <div class="atl-row"><div class="atl-year">313</div><div class="atl-text">Edict of Milan — Christianity legalized</div></div>
  <div class="atl-row"><div class="atl-year">380</div><div class="atl-text">Theodosius makes Christianity the official religion of Rome</div></div>
</div>
</div>`;

// ── Lesson 4 — Guard Against Heresy ──────────────────────────────────────

const I4_LEARN=[
  {sentence:"The Alexandrian priest who taught 'There was a time when he was not' was _____.",answer:"Arius",options:["Arius","Athanasius","Origen","Nestorius"],explanation:"Arius taught that the Son was created — exalted, but not eternal God.",tier:1},
  {sentence:"The Council of _____ in 325 AD condemned Arianism.",answer:"Nicaea",options:["Nicaea","Chalcedon","Constantinople","Ephesus"],explanation:"Nicaea (325) was the first ecumenical council; it produced the Nicene Creed.",tier:1},
  {sentence:"Nicaea declared the Son to be homoousios — of one _____ — with the Father.",answer:"substance",options:["substance","mind","will","origin"],explanation:"Homoousios means 'of the same substance,' affirming the Son's full deity.",tier:1},
  {sentence:"The Roman emperor who convened the Council of Nicaea was _____.",answer:"Constantine",options:["Constantine","Diocletian","Theodosius","Justinian"],explanation:"Constantine called the council in 325 to settle the Arian controversy.",tier:1},
  {sentence:"According to the essay, _____ today teach a modern version of Arianism.",answer:"Jehovah's Witnesses",options:["Jehovah's Witnesses","Mormons","Pentecostals","Methodists"],explanation:"The essay names Jehovah's Witnesses as today's clearest carriers of an Arian Christology.",tier:1},
  {sentence:"Arius taught that Jesus was the greatest of all _____ beings.",answer:"created",options:["created","heavenly","spiritual","redeemed"],explanation:"That is the heart of Arianism: Christ as the highest creature, not eternal God.",tier:1},
  {sentence:"The Council of Nicaea included over _____ bishops.",answer:"300",options:["300","30","1000","75"],explanation:"Traditional accounts give about 318 bishops; the essay rounds to 'over 300.'",tier:1},
  {sentence:"According to the essay, the church councils did not invent orthodoxy — they _____ it.",answer:"defended",options:["defended","discovered","systematized","wrote"],explanation:"The lesson's central claim: councils responded to attacks; they did not author the faith.",tier:1},
  {sentence:"According to the essay, ancient heresies do not stay _____.",answer:"buried",options:["buried","forgotten","silent","local"],explanation:"Old errors keep returning under new names — that is why history matters.",tier:1},
  {sentence:"The Greek word the council used to define the Son's equality with the Father was _____.",answer:"homoousios",options:["homoousios","theotokos","hypostasis","logos"],explanation:"Homoousios — 'of one substance' — was the decisive theological term at Nicaea.",tier:1},
];

const I4_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 4 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">Guard Against Heresy</h1>
<p class="article-sub">Old errors in new clothes · The Council of Nicaea, 325 AD</p>
<div class="art-divider"></div>
<div class="article-body">
<p>The councils of the early church did not invent orthodoxy. They defended it.</p>
<p>Around 318 AD, an Alexandrian priest named <strong>Arius</strong> began teaching that Jesus was the greatest of all created beings — but not God Himself. His slogan was simple and memorable: <em>"There was a time when he was not."</em> Arianism was sophisticated, biblically argued, and enormously popular. Half the empire's bishops sided with it.</p>
<p>In <strong>325</strong>, Emperor <strong>Constantine</strong> convened the <strong>Council of Nicaea</strong> — over 300 bishops — to settle the question. The council ruled against Arius. The Son, they declared, is <em>homoousios</em> — of one substance — with the Father. The line they drew that summer still defines what Christianity is.</p>
<p>The councils still matter because ancient heresies do not stay buried. <strong>Jehovah's Witnesses</strong> today teach a version of Arianism, with the same slogan dressed in modern clothes. Mormonism revives early Gnostic ideas. Christians who don't know church history don't recognize the old errors when they reappear. Knowing what Nicaea condemned — and why — is part of how every generation guards the gospel.</p>
<div class="pull-quote">
  <p>"We believe in one Lord Jesus Christ… begotten, not made, of one substance with the Father."</p>
  <cite>— The Nicene Creed, 325 AD</cite>
</div>
</div>`;

// ── Lesson 5 — Guard Against Foolish Mistakes ────────────────────────────

const I5_LEARN=[
  {sentence:"The Scottish Reformer who published 'The First Blast of the Trumpet' in 1558 was _____.",answer:"John Knox",options:["John Knox","John Calvin","Martin Luther","John Wycliffe"],explanation:"Knox wrote the tract while in exile on the Continent.",tier:1},
  {sentence:"Knox's tract was an attack on the rule of _____ monarchs.",answer:"female",options:["female","Catholic","French","child"],explanation:"The 'Monstruous Regiment of Women' targeted female rule specifically.",tier:1},
  {sentence:"Knox's tract reached Queen _____ I of England just as she came to the throne.",answer:"Elizabeth",options:["Elizabeth","Mary","Anne","Victoria"],explanation:"Elizabeth I — Protestant, female, and newly crowned — read it and was offended.",tier:1},
  {sentence:"The Continental Reformer who warned Knox not to publish the tract was _____.",answer:"John Calvin",options:["John Calvin","Ulrich Zwingli","Martin Bucer","Theodore Beza"],explanation:"Calvin and others judged the timing reckless; Knox published anyway.",tier:1},
  {sentence:"The tract was titled 'The First Blast of the Trumpet against the Monstruous _____ of Women.'",answer:"Regiment",options:["Regiment","Reign","Realm","Race"],explanation:"'Regiment' is an older English word for 'rule' or 'government.'",tier:1},
  {sentence:"Knox published the tract in the year _____.",answer:"1558",options:["1558","1517","1560","1572"],explanation:"1558 — the same year Elizabeth I came to the English throne.",tier:1},
  {sentence:"Elizabeth I was a _____ monarch — making her a potential ally of the Reformation.",answer:"Protestant",options:["Protestant","Catholic","Anglican","Presbyterian"],explanation:"Elizabeth was Protestant; Knox's tract drove her away from the Genevan circle.",tier:1},
  {sentence:"According to the essay, the Genevan Reformation lost favor in _____ as a result of the tract.",answer:"England",options:["England","Scotland","France","Geneva"],explanation:"The English alliance with Geneva soured because of the tract.",tier:1},
  {sentence:"The essay concludes: not every deep _____ needs to be published.",answer:"conviction",options:["conviction","argument","opinion","sermon"],explanation:"The lesson is about prudence — knowing when to hold even a true conviction.",tier:1},
  {sentence:"The essay says wisdom about _____ is as biblical as wisdom about truth.",answer:"timing",options:["timing","speaking","silence","writing"],explanation:"Ecclesiastes 3 — 'a time to speak and a time to be silent' — the lesson Knox missed.",tier:1},
];

const I5_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 5 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">Guard Against Foolish Mistakes</h1>
<p class="article-sub">John Knox &amp; the tract that wrecked an alliance · 1558</p>
<div class="art-divider"></div>
<div class="article-body">
<p>Doctrine is not the only danger. History also teaches wisdom: when to speak, when to stay silent, when to publish, when to wait.</p>
<p>In <strong>1558</strong>, the Scottish Reformer <strong>John Knox</strong> published a tract titled <em>"The First Blast of the Trumpet against the Monstruous Regiment of Women."</em> It argued, at length, that the rule of female monarchs was an offense against nature and Scripture. Knox aimed the tract at the Catholic queens then on European thrones — Mary of Guise in Scotland and Mary Tudor in England. His allies on the Continent, including <strong>John Calvin</strong>, warned him not to publish it. He published anyway.</p>
<p>Months later, Mary Tudor died and <strong>Elizabeth I</strong> — a Protestant — came to the English throne. She read the tract. She was deeply offended. She never forgave Knox or anyone associated with him. The Genevan Reformation lost favor in England at the very moment the new queen could have advanced it.</p>
<p>Knox was right about doctrine and disastrously wrong about timing. The lesson stands: not every deep conviction needs to be published. Wisdom about timing is as biblical as wisdom about truth.</p>
<div class="pull-quote">
  <p>"For everything there is a season, and a time for every matter under heaven."</p>
  <cite>— Ecclesiastes 3:1</cite>
</div>
</div>`;

// ── Lesson 6 — God Has Never Abandoned His Church ────────────────────────

const I6_LEARN=[
  {sentence:"Martin Luther posted his 95 Theses on October 31, _____.",answer:"1517",options:["1517","1521","1545","1483"],explanation:"October 31, 1517 — the conventional starting date of the Protestant Reformation.",tier:1},
  {sentence:"Luther was an _____ monk before becoming a reformer.",answer:"Augustinian",options:["Augustinian","Dominican","Franciscan","Benedictine"],explanation:"Luther entered the Augustinian Eremites in 1505.",tier:1},
  {sentence:"The German town where Luther posted his theses was _____.",answer:"Wittenberg",options:["Wittenberg","Worms","Eisleben","Augsburg"],explanation:"Luther was a professor at the University of Wittenberg.",tier:1},
  {sentence:"Indulgences were slips of paper certifying time off _____.",answer:"purgatory",options:["purgatory","penance","fasting","pilgrimage"],explanation:"An indulgence shortened time the buyer (or a loved one) would spend in purgatory.",tier:1},
  {sentence:"The proceeds from the indulgence sale Luther opposed were going to finance the construction of _____ Basilica in Rome.",answer:"St. Peter's",options:["St. Peter's","Lateran","St. Paul's","St. Mary's"],explanation:"Pope Leo X needed funds for St. Peter's; the indulgence campaign in Germany was the means.",tier:1},
  {sentence:"The Reformation's central doctrine was justification by _____ alone.",answer:"faith",options:["faith","grace","Scripture","Christ"],explanation:"Sola fide — justification by faith alone — was the rallying cry.",tier:1},
  {sentence:"According to the essay, by 1516 almost no one expected _____.",answer:"reform",options:["reform","corruption","collapse","change"],explanation:"That is the lesson's point: God's faithfulness often appears where nothing seemed possible.",tier:1},
  {sentence:"Luther's writings circulated across Europe within _____ years.",answer:"three",options:["three","ten","one","twenty"],explanation:"The printing press carried Luther's writings across Europe with unprecedented speed.",tier:1},
  {sentence:"Before the Reformation, the Bible was locked in _____ and inaccessible to most Christians.",answer:"Latin",options:["Latin","Greek","Hebrew","Aramaic"],explanation:"The Latin Vulgate was the church's Bible; vernacular translations were banned in many places.",tier:1},
  {sentence:"According to the essay, church history is a record of God's _____ across centuries.",answer:"faithfulness",options:["faithfulness","sovereignty","mercy","providence"],explanation:"The lesson's thesis: God has never abandoned His church.",tier:1},
];

const I6_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 6 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">God Has Never Abandoned His Church</h1>
<p class="article-sub">The Protestant Reformation · 1517</p>
<div class="art-divider"></div>
<div class="article-body">
<p>By the early 1500s, the medieval Western church had drifted badly. <strong>Indulgences</strong> — slips of paper certifying time off purgatory — were being sold across Europe to finance <strong>St. Peter's Basilica</strong> in Rome. The papacy was a political dynasty riddled with corruption. The Bible was locked in <strong>Latin</strong> and inaccessible to most Christians. The gospel of grace had been buried under centuries of accretion.</p>
<p>In 1516, almost no one expected reform.</p>
<p>On <strong>October 31, 1517</strong>, an obscure <strong>Augustinian</strong> monk named <strong>Martin Luther</strong> posted 95 theses on the door of the <strong>Wittenberg</strong> castle church, intending an academic debate about indulgences. Within three years, his writings had circulated across Europe. Within twenty, the Reformation had broken the religious monopoly of Rome. The Bible was in the hands of common people. The gospel — justification by <strong>faith</strong> alone — was being preached freely again.</p>
<p>None of it looked possible in 1516. That is exactly the point. Church history is a record of God's faithfulness across centuries. When the church looks dark today, history says: He has done this before. He is faithful. He can do it again.</p>
<div class="atl-box">
  <div class="atl-label">Key dates</div>
  <div class="atl-row"><div class="atl-year">1517</div><div class="atl-text">Luther posts the 95 Theses at Wittenberg (October 31)</div></div>
  <div class="atl-row"><div class="atl-year">1521</div><div class="atl-text">Luther refuses to recant at the Diet of Worms</div></div>
  <div class="atl-row"><div class="atl-year">1534</div><div class="atl-text">Luther's German Bible published</div></div>
</div>
</div>`;

// ── Lesson 7 — You Have a Family You've Never Met ────────────────────────

const I7_LEARN=[
  {sentence:"The Council of _____ in 451 AD defined that Christ has two natures in one person.",answer:"Chalcedon",options:["Chalcedon","Nicaea","Constantinople","Ephesus"],explanation:"Chalcedon (451) gave the definitive statement of the hypostatic union.",tier:1},
  {sentence:"The Chalcedonian formula says Christ has two natures 'without confusion, change, division, or _____.'",answer:"separation",options:["separation","corruption","division","contradiction"],explanation:"The 'four adverbs' of Chalcedon: without confusion, change, division, or separation.",tier:1},
  {sentence:"Chalcedon affirmed that Christ is fully God and fully _____.",answer:"man",options:["man","Spirit","King","priest"],explanation:"Two complete natures — fully divine, fully human — in one person.",tier:1},
  {sentence:"Paul wrote that there is one body, one Spirit, one Lord, one faith, one _____.",answer:"baptism",options:["baptism","Father","church","God"],explanation:"Ephesians 4:5 — the unity of the church across nations and centuries.",tier:1},
  {sentence:"The Chalcedonian definition has held for over _____ hundred years.",answer:"fifteen",options:["fifteen","ten","twenty","five"],explanation:"451 AD to today — over fifteen centuries of orthodox confession.",tier:1},
  {sentence:"The bishops at Chalcedon came from regions including Egypt, Syria, North Africa, _____ Minor, Italy, and Gaul.",answer:"Asia",options:["Asia","Britain","Persia","Spain"],explanation:"Asia Minor (modern Turkey) was a major source of Christian bishops in late antiquity.",tier:1},
  {sentence:"According to the essay, the church has never been bound to one _____, century, or culture.",answer:"nation",options:["nation","language","race","tradition"],explanation:"The lesson's central claim: the church is global and trans-historical.",tier:1},
  {sentence:"Chalcedon is a town located across the water from _____.",answer:"Constantinople",options:["Constantinople","Rome","Antioch","Jerusalem"],explanation:"Chalcedon sat on the Asian side of the Bosphorus, opposite Constantinople.",tier:1},
  {sentence:"According to the essay, studying church history is _____ your relatives.",answer:"meeting",options:["meeting","judging","correcting","copying"],explanation:"The essay's closing metaphor: church history is a family reunion you didn't know you had.",tier:1},
  {sentence:"More than _____ bishops gathered at Chalcedon.",answer:"500",options:["500","12","50","2000"],explanation:"Roughly 520 bishops attended — the largest council to that point.",tier:1},
];

const I7_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 7 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">You Have a Family You've Never Met</h1>
<p class="article-sub">The Council of Chalcedon · 451 AD</p>
<div class="art-divider"></div>
<div class="article-body">
<p>Every believer has a family they have never met.</p>
<p>In <strong>451 AD</strong>, more than 500 bishops gathered at <strong>Chalcedon</strong>, a town across the water from <strong>Constantinople</strong>, to settle a question: who exactly is Jesus Christ? They came from Egypt, Syria, Palestine, North Africa, <strong>Asia Minor</strong>, Italy, and Gaul. They prayed in liturgies older than any modern denomination. They argued in Greek and Latin. They worked for weeks.</p>
<p>What they produced is the formula every orthodox Christian still confesses: Christ is fully God and fully man — two complete natures in one person, <em>"without confusion, change, division, or separation."</em> That definition has held for over <strong>fifteen hundred</strong> years.</p>
<p>These bishops are your ancestors. So are the African believers Tertullian led, the Syrian monks who copied Scripture by hand, the Korean Christians martyred under the Japanese occupation, the Chinese house-church pastors imprisoned today. The church has never been bound to one nation, one century, or one culture.</p>
<p>Paul wrote: <em>"There is one body and one Spirit… one Lord, one faith, one baptism."</em> That is not a metaphor. It is your family tree. Studying church history is meeting your relatives.</p>
<div class="pull-quote">
  <p>"There is one body and one Spirit… one Lord, one faith, one baptism."</p>
  <cite>— Ephesians 4:4–5</cite>
</div>
</div>`;

// ── Lesson 8 — Heroes Were Sinners Too ───────────────────────────────────

const I8_LEARN=[
  {sentence:"The Crusades were launched by Pope _____ II in 1095.",answer:"Urban",options:["Urban","Innocent","Gregory","Leo"],explanation:"Urban II called the First Crusade at the Council of Clermont.",tier:1},
  {sentence:"The Crusades aimed to recover the city of _____ from Muslim rule.",answer:"Jerusalem",options:["Jerusalem","Constantinople","Antioch","Rome"],explanation:"Jerusalem and the Holy Land were the official military objective.",tier:1},
  {sentence:"The Crusades ran roughly from 1095 to _____.",answer:"1291",options:["1291","1453","1204","1099"],explanation:"The fall of Acre in 1291 ended the crusader presence in the Holy Land.",tier:1},
  {sentence:"The medieval mystic and preacher of the Second Crusade was _____ of Clairvaux.",answer:"Bernard",options:["Bernard","Francis","Anselm","Thomas"],explanation:"Bernard's preaching tour rallied Europe for the Second Crusade (1147–1149).",tier:1},
  {sentence:"In 1204, Western crusaders sacked the Christian city of _____.",answer:"Constantinople",options:["Constantinople","Antioch","Jerusalem","Alexandria"],explanation:"The Fourth Crusade infamously turned on Constantinople, the heart of Eastern Christianity.",tier:1},
  {sentence:"The Crusades were called by Pope Urban II at the Council of _____.",answer:"Clermont",options:["Clermont","Nicaea","Trent","Lateran"],explanation:"Urban II preached the First Crusade at Clermont in November 1095.",tier:1},
  {sentence:"According to the essay, hagiography glorifies men — not _____.",answer:"God",options:["God","saints","truth","Christ"],explanation:"Polishing saints into idols steals glory from God.",tier:1},
  {sentence:"The Bible's heroes are sinners too: Abraham lies, Moses murders, David commits adultery, and _____ denies Christ.",answer:"Peter",options:["Peter","Paul","Thomas","Judas"],explanation:"Peter's denial is the New Testament's clearest example of a hero's failure.",tier:1},
  {sentence:"According to the essay, the church owns its failures because it depends on _____, not its own purity.",answer:"Christ",options:["Christ","grace","truth","the Spirit"],explanation:"Only Christ never fell — the church can be honest because its hope rests on Him.",tier:1},
  {sentence:"The biblical doctrine that warns against idolizing saints is the doctrine of human _____.",answer:"depravity",options:["depravity","weakness","frailty","limitation"],explanation:"Total depravity reminds us that every hero is also a sinner.",tier:1},
];

const I8_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 8 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">Heroes Were Sinners Too</h1>
<p class="article-sub">The Crusades and the courage of honest history · 1095–1291</p>
<div class="art-divider"></div>
<div class="article-body">
<p>A biblical doctrine of human <strong>depravity</strong> warns the church against making saints into idols.</p>
<p>The <strong>Crusades</strong> (1095–1291) are a case study. Pope <strong>Urban II</strong> launched them at the Council of <strong>Clermont</strong>, calling Christian knights to recover <strong>Jerusalem</strong> from Muslim rule. Many crusaders went out of genuine devotion. <strong>Bernard of Clairvaux</strong>, one of the great spiritual writers of the Middle Ages, preached the Second Crusade. The campaigns were also marked by political manipulation, mob violence against European Jews, brutal massacres at Antioch and Jerusalem, and — most infamously — the <strong>sack of Christian Constantinople</strong> by Western crusaders in <strong>1204</strong>. Crusaders prayed before they slaughtered.</p>
<p>The same church produced both Bernard's mysticism and the Fourth Crusade. Honest history names both. It does not airbrush.</p>
<p>Hagiography — the practice of polishing dead saints into untouchable idols — glorifies men, not God. Scripture itself refuses to do this. Abraham lies. Moses murders. David is an adulterer. <strong>Peter</strong> denies Christ. The Bible's heroes are sinners too. So are ours. The church owns its failures because the church does not depend on its own purity. It depends on Christ — the only one who never fell.</p>
</div>`;

// ── Lesson 9 — The Cloud of Witnesses ────────────────────────────────────

const I9_LEARN=[
  {sentence:"Hebrews 12 calls believers to lay aside every _____ and run with endurance.",answer:"weight",options:["weight","sin","burden","fear"],explanation:"Hebrews 12:1 — 'lay aside every weight, and sin which clings so closely.'",tier:1},
  {sentence:"The English queen who burned Protestants from 1555–1558 was _____ I.",answer:"Mary",options:["Mary","Elizabeth","Anne","Jane"],explanation:"Mary Tudor — 'Bloody Mary' — tried to restore Catholicism by force.",tier:1},
  {sentence:"Hugh Latimer was burned at the stake with Nicholas _____ outside Oxford.",answer:"Ridley",options:["Ridley","Cranmer","Tyndale","Hooper"],explanation:"Latimer and Ridley were burned together on October 16, 1555.",tier:1},
  {sentence:"Latimer's last words: 'We shall this day light such a _____, by God's grace, in England, as I trust shall never be put out.'",answer:"candle",options:["candle","fire","flame","light"],explanation:"Latimer's defiant prophecy at the stake — one of the most famous lines in English Christianity.",tier:1},
  {sentence:"Thomas _____, the third great English martyr, was burned in March 1556.",answer:"Cranmer",options:["Cranmer","Ridley","Latimer","Hooper"],explanation:"Cranmer — architect of the Book of Common Prayer — was burned at Oxford on March 21, 1556.",tier:1},
  {sentence:"Latimer and Ridley were burned at the stake in _____.",answer:"Oxford",options:["Oxford","London","Cambridge","Canterbury"],explanation:"Just outside the city walls of Oxford, near Balliol College.",tier:1},
  {sentence:"Hebrews 12 describes those who ran before as a 'great cloud of _____.'",answer:"witnesses",options:["witnesses","heroes","saints","martyrs"],explanation:"Hebrews 12:1 — the great cloud of witnesses surrounding the running believer.",tier:1},
  {sentence:"Latimer and Ridley were burned on October _____, 1555.",answer:"16",options:["16","31","25","1"],explanation:"The traditional date of their martyrdom.",tier:1},
  {sentence:"Mary I was the daughter of King _____ VIII.",answer:"Henry",options:["Henry","Edward","Richard","James"],explanation:"Mary was the daughter of Henry VIII and Catherine of Aragon.",tier:1},
  {sentence:"According to the essay, the candle Latimer lit has _____ been put out.",answer:"never",options:["never","barely","nearly","not yet"],explanation:"The essay closes by affirming Latimer's prophecy: the candle has never gone out.",tier:1},
];

const I9_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 9 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">The Cloud of Witnesses</h1>
<p class="article-sub">The English Martyrs · 1555–1558</p>
<div class="art-divider"></div>
<div class="article-body">
<p>Hebrews 12 opens with one of the most famous images in Scripture: a great <strong>cloud of witnesses</strong>, surrounding the running believer, urging him to lay aside every weight and run with endurance. Church history is the biography of that cloud.</p>
<p>England, 1555–1558. Queen <strong>Mary I</strong> — daughter of <strong>Henry VIII</strong> — set out to roll back the English Reformation by burning Protestants. Nearly three hundred died at the stake in three years. Among them were three of the most important shapers of the English church: <strong>Hugh Latimer</strong>, <strong>Nicholas Ridley</strong>, and <strong>Thomas Cranmer</strong>.</p>
<p>Latimer and Ridley were burned together outside <strong>Oxford</strong> on <strong>October 16, 1555</strong>. As the fire was being lit, the older Latimer turned to Ridley and spoke a sentence that English Christians have repeated ever since: <em>"Be of good comfort, Master Ridley, and play the man. We shall this day light such a candle, by God's grace, in England, as I trust shall never be put out."</em></p>
<p>It never has. Cranmer was burned the following March. The candle they lit shaped Anglicanism, the King James Bible, and the English-speaking gospel for the next four centuries.</p>
<div class="pull-quote">
  <p>"We shall this day light such a candle, by God's grace, in England, as I trust shall never be put out."</p>
  <cite>— Hugh Latimer to Nicholas Ridley · October 16, 1555</cite>
</div>
</div>`;

// ── Lesson 10 — We Are In the Story Too ──────────────────────────────────

const I10_LEARN=[
  {sentence:"In 1900, roughly _____ percent of the world's Christians lived in Africa, Asia, and Latin America combined.",answer:"9",options:["9","65","33","50"],explanation:"In 1900 the church was overwhelmingly Western — only about 9% lived in the Global South.",tier:1},
  {sentence:"Today, more than _____ percent of the world's Christians live in the Global South.",answer:"65",options:["65","9","25","90"],explanation:"The center of global Christianity has shifted south of the equator within a single century.",tier:1},
  {sentence:"The Communist takeover of China in _____ left perhaps one million Chinese Christians.",answer:"1949",options:["1949","1900","1976","2000"],explanation:"Mao's victory in 1949 ushered in decades of state opposition to the church.",tier:1},
  {sentence:"Today there are well over _____ million Christians in China.",answer:"100",options:["100","10","500","1"],explanation:"Estimates vary, but most scholars place the Chinese church well above 100 million today.",tier:1},
  {sentence:"The largest Pentecostal congregations in the world are in Seoul and _____.",answer:"Lagos",options:["Lagos","Nairobi","Sao Paulo","Manila"],explanation:"Yoido Full Gospel Church (Seoul) and several Lagos megachurches are the largest in the world.",tier:1},
  {sentence:"The continent with the most Christians on earth today is _____.",answer:"Africa",options:["Africa","Asia","Europe","North America"],explanation:"Africa overtook every other continent in Christian population in the 21st century.",tier:1},
  {sentence:"According to the essay, we live between the Resurrection and the _____.",answer:"Return",options:["Return","End","Judgment","Rapture"],explanation:"The 'already and not yet' framing: between Christ's first and second comings.",tier:1},
  {sentence:"According to the essay, the book of Acts did not end at chapter _____.",answer:"28",options:["28","12","20","1"],explanation:"Acts has 28 chapters — but the missionary story continues to today.",tier:1},
  {sentence:"The shift of Christianity south of the equator happened within a single _____.",answer:"century",options:["century","decade","generation","year"],explanation:"From 1900 to today — roughly one century — the church's center of gravity moved south.",tier:1},
  {sentence:"According to the essay, we are not just heirs of church history — we are _____ of it.",answer:"part",options:["part","students","critics","witnesses"],explanation:"The lesson's closing claim: church history is not behind us; it runs through us.",tier:1},
];

const I10_ARTICLE_HTML=`
<div class="article-eyebrow">
  <span class="art-tag">Lesson 10 Reading</span>
  <span class="art-time"><i class="ti ti-clock"></i> ~2 min read</span>
</div>
<h1 class="article-title">We Are In the Story Too</h1>
<p class="article-sub">The Global South explosion · 20th–21st century</p>
<div class="art-divider"></div>
<div class="article-body">
<p>Church history is not the past. It is a story still unfolding — and we are in it.</p>
<p>In <strong>1900</strong>, around <strong>9%</strong> of the world's Christians lived in Africa, Asia, and Latin America combined. Today, more than <strong>65%</strong> do. The center of gravity of global Christianity has shifted south of the equator within a single century. <strong>Africa</strong> is now the continent with the most Christians on earth. China — under decades of state opposition — has grown from perhaps one million believers in <strong>1949</strong> to well over <strong>100 million</strong> today. The largest Pentecostal congregations in the world are in Seoul and <strong>Lagos</strong>.</p>
<p>This is the fastest expansion of Christianity in two thousand years. The center is no longer Europe or America. The book of <strong>Acts</strong> did not end at chapter <strong>28</strong>. The same Spirit who fell on the upper room in Jerusalem is still falling — in Nigerian villages, Iranian living rooms, Brazilian favelas, and Chinese basements.</p>
<p>We live between the <strong>Resurrection</strong> and the <strong>Return</strong>. We are not just heirs of church history. We are part of it. The next chapter is being written now, and we hold a pen.</p>
<div class="atl-box">
  <div class="atl-label">Key shifts</div>
  <div class="atl-row"><div class="atl-year">1900</div><div class="atl-text">~9% of Christians live in the Global South</div></div>
  <div class="atl-row"><div class="atl-year">1949</div><div class="atl-text">Communist China — perhaps 1 million Christians at takeover</div></div>
  <div class="atl-row"><div class="atl-year">Today</div><div class="atl-text">65%+ of Christians in the Global South · 100M+ in China</div></div>
</div>
</div>`;

// Wire track6 (Intro) lesson data
const _track6=TRACKS.find(t=>t.id==='track6');
_track6.lessons[0].articleHtml=I1_ARTICLE_HTML;   _track6.lessons[0].learn=I1_LEARN;
_track6.lessons[1].articleHtml=I2_ARTICLE_HTML;   _track6.lessons[1].learn=I2_LEARN;
_track6.lessons[2].articleHtml=I3_ARTICLE_HTML;   _track6.lessons[2].learn=I3_LEARN;
_track6.lessons[3].articleHtml=I4_ARTICLE_HTML;   _track6.lessons[3].learn=I4_LEARN;
_track6.lessons[4].articleHtml=I5_ARTICLE_HTML;   _track6.lessons[4].learn=I5_LEARN;
_track6.lessons[5].articleHtml=I6_ARTICLE_HTML;   _track6.lessons[5].learn=I6_LEARN;
_track6.lessons[6].articleHtml=I7_ARTICLE_HTML;   _track6.lessons[6].learn=I7_LEARN;
_track6.lessons[7].articleHtml=I8_ARTICLE_HTML;   _track6.lessons[7].learn=I8_LEARN;
_track6.lessons[8].articleHtml=I9_ARTICLE_HTML;   _track6.lessons[8].learn=I9_LEARN;
_track6.lessons[9].articleHtml=I10_ARTICLE_HTML;  _track6.lessons[9].learn=I10_LEARN;

// ═══════════════════════════════════════════
// KEYBOARD SHORTCUTS
// ═══════════════════════════════════════════
function initKeyboardShortcuts(){
  document.addEventListener('keydown',function(e){
    if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA')return;
    if(e.metaKey||e.ctrlKey||e.altKey)return;

    if(e.key===' '){
      e.preventDefault();
      const co=document.getElementById('cold-open');
      if(co&&co.style.display==='flex'){advanceColdOpen();return;}
      const qBtn=document.getElementById('continue-btn');
      if(qBtn&&qBtn.style.display!=='none'&&currentScreenName==='lesson'){nextQ();return;}
      const eBtn=document.getElementById('exam-continue-btn');
      if(eBtn&&eBtn.style.display!=='none'&&currentScreenName==='exam'){nextExamQ();return;}
      const pBtn=document.getElementById('practice-continue-btn');
      if(pBtn&&pBtn.style.display!=='none'&&currentScreenName==='practice'){nextPracticeQ();return;}
      if(practiceState&&!practiceState.answered&&!practiceState.optionsRevealed&&!practiceState.interlude&&currentScreenName==='practice'){revealPracticeOptions();return;}
      const qpBtn=document.getElementById('qp-continue-btn');
      if(qpBtn&&qpBtn.style.display!=='none'&&currentScreenName==='quick-practice'){nextQPQuestion();return;}
      if(quickPracticeState&&!quickPracticeState.answered&&!quickPracticeState.optionsRevealed&&currentScreenName==='quick-practice'){revealQPOptions();return;}
      if(learnState&&!learnState.answered&&!learnState.optionsRevealed){revealLearnOptions();return;}
      if(learnState&&learnState.answered){advanceLearn();return;}
      // Era Check: advance after answering, or start next round from transition screen
      if(eraCheckState&&currentScreenName==='era-check'){
        const ecNext=document.querySelector('#ec-feedback .btn');
        if(ecNext){advanceEraCheck();return;}
        const ecRound=document.querySelector('.ec-round-start-btn');
        if(ecRound){beginNextEraRound();return;}
      }
      // Person Check: same pattern
      if(personCheckState&&currentScreenName==='person-check'){
        const pcNext=document.querySelector('#pc-feedback .btn');
        if(pcNext){advancePersonCheck();return;}
        const pcRound=document.querySelector('.pc-round-start-btn');
        if(pcRound){beginNextPersonRound();return;}
      }
      // Study: advance card or start quiz
      const sNext=document.querySelector('.study-btn-next');
      if(sNext){studyNext();return;}
      const sQuiz=document.querySelector('.study-btn-quiz');
      if(sQuiz){studyGoQuiz();return;}
      // Result screens: back to track
      if(document.getElementById('screen-lesson-result')?.classList.contains('active')){goTrack();return;}
      if(document.getElementById('screen-exam-result')?.classList.contains('active')){goTrack();return;}
      return;
    }

    const num=parseInt(e.key);
    if(isNaN(num)||num<1||num>4)return;
    const idx=num-1;

    // Era Check: 1 = yes (in era), 2 = no (different era)
    if(eraCheckState&&currentScreenName==='era-check'){
      const yesBtn=document.querySelector('.ec-btn-yes');
      if(yesBtn&&!yesBtn.disabled){
        if(num===1){selectEraAnswer(true);return;}
        if(num===2){selectEraAnswer(false);return;}
      }
    }
    // Person Check: 1 = yes (applies), 2 = no (doesn't apply)
    if(personCheckState&&currentScreenName==='person-check'){
      const yesBtn=document.querySelector('.pc-btn-yes');
      if(yesBtn&&!yesBtn.disabled){
        if(num===1){selectPersonAnswer(true);return;}
        if(num===2){selectPersonAnswer(false);return;}
      }
    }
    // Learn options
    if(learnState&&learnState.optionsRevealed&&!learnState.answered){
      const opt=document.getElementById('lopt-'+idx);
      if(opt){selectLearnOpt(idx);return;}
    }
    // Quiz MC
    if(document.getElementById('opts-container')&&lessonState&&!lessonState.answered){
      const opt=document.getElementById('opt-'+idx);
      if(opt){selectOpt(idx);return;}
    }
    // Quiz TF
    if(document.getElementById('tf-true')&&lessonState&&!lessonState.answered){
      if(num===1){selectTF(true);return;}
      if(num===2){selectTF(false);return;}
    }
    // Quiz timeline — pick the nth visible (undone) event
    if(document.getElementById('timeline-container')&&lessonState&&!lessonState.answered){
      const btns=[...document.querySelectorAll('#timeline-container .opt:not([disabled])')];
      const btn=btns[idx];
      if(btn){const m=btn.id.match(/tl-opt-(\d+)/);if(m)selectTimeline(parseInt(m[1]));return;}
    }
    // Exam TF
    const examTrueBtn=document.getElementById('exam-opt-true');
    if(examTrueBtn&&!examTrueBtn.disabled){
      if(num===1){selectExamTF(true);return;}
      if(num===2){selectExamTF(false);return;}
    }
    // Exam MC
    if(document.getElementById('exam-opts-container')&&!examTrueBtn){
      const opt=document.getElementById('exam-opt-'+idx);
      if(opt&&!opt.disabled){selectExamOpt(idx);return;}
    }
    // Exam timeline — pick the nth visible (undone) event
    if(document.getElementById('exam-timeline-container')){
      const btns=[...document.querySelectorAll('#exam-timeline-container .opt:not([disabled])')];
      const btn=btns[idx];
      if(btn){const m=btn.id.match(/exam-tl-opt-(\d+)/);if(m)selectExamTimeline(parseInt(m[1]));return;}
    }
    // Practice interlude: 1 = yes, 2 = no (era / person only)
    if(practiceState&&practiceState.interlude&&practiceState.interlude.type!=='centuryMatch'&&!practiceState.answered&&currentScreenName==='practice'){
      if(num===1){selectPracticeInterlude(true);return;}
      if(num===2){selectPracticeInterlude(false);return;}
    }
    // Practice MC
    if(document.getElementById('practice-opts-container')&&practiceState&&!practiceState.answered&&practiceState.optionsRevealed){
      const opt=document.getElementById('popt-'+idx);
      if(opt){selectPracticeOpt(idx);return;}
    }
    // Practice TF
    if(document.getElementById('ptf-true')&&practiceState&&!practiceState.answered){
      if(num===1){selectPracticeTF(true);return;}
      if(num===2){selectPracticeTF(false);return;}
    }
    // Practice timeline
    if(document.getElementById('practice-timeline-container')&&practiceState&&!practiceState.answered){
      const btns=[...document.querySelectorAll('#practice-timeline-container .opt:not([disabled])')];
      const btn=btns[idx];
      if(btn){const m=btn.id.match(/ptl-opt-(\d+)/);if(m)selectPracticeTimeline(parseInt(m[1]));return;}
    }
    // Quick Practice MC
    if(document.getElementById('qp-opts-container')&&quickPracticeState&&!quickPracticeState.answered&&quickPracticeState.optionsRevealed&&currentScreenName==='quick-practice'){
      const opt=document.getElementById('qpopt-'+idx);
      if(opt){selectQPOpt(idx);return;}
    }
    // Quick Practice TF
    if(document.getElementById('qptf-true')&&quickPracticeState&&!quickPracticeState.answered&&currentScreenName==='quick-practice'){
      if(num===1){selectQPTF(true);return;}
      if(num===2){selectQPTF(false);return;}
    }
    // Quick Practice timeline
    if(document.getElementById('qp-timeline-container')&&quickPracticeState&&!quickPracticeState.answered&&quickPracticeState.optionsRevealed&&currentScreenName==='quick-practice'){
      const btns=[...document.querySelectorAll('#qp-timeline-container .opt:not(.tl-done)')];
      const btn=btns[idx];
      if(btn){const m=btn.id.match(/qptl-opt-(\d+)/);if(m)selectQPTimeline(parseInt(m[1]));return;}
    }
    // Learn word bank
    if(learnState&&!learnState.answered){
      const opt=document.getElementById('lopt-'+idx);
      if(opt){selectLearnOpt(idx);return;}
    }
  });
}

// ═══════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════
// PROBLEM REPORT WIDGET (temporary)
// ═══════════════════════════════════════════
let _reportUser = null;

function _getReportContext() {
  const screen = currentScreenName;
  const track = currentTrack ? { id: currentTrack.id, name: currentTrack.name } : null;
  const lesson = (currentTrack && currentLessonIdx != null)
    ? { id: currentTrack.lessons[currentLessonIdx]?.id, name: currentTrack.lessons[currentLessonIdx]?.name }
    : null;

  // grab visible question or article snippet from DOM
  let snippet = '';
  const qEl = document.querySelector('.screen.active .q-text, .screen.active .learn-sentence, .screen.active .study-def-term, .screen.active .qblock-quote');
  if (qEl) snippet = qEl.textContent.trim().slice(0, 300);

  return { screen, track, lesson, snippet };
}

function toggleReportPanel() {
  const panel = document.getElementById('report-panel');
  const isOpen = panel.classList.contains('open');
  if (isOpen) { panel.classList.remove('open'); return; }

  const { screen, track, lesson, snippet } = _getReportContext();
  const lines = [
    `Screen: ${screen}`,
    track ? `Track: ${track.name}` : null,
    lesson ? `Lesson: ${lesson.name}` : null,
    snippet ? `Content: "${snippet.slice(0,80)}${snippet.length>80?'…':''}"` : null,
  ].filter(Boolean);
  document.getElementById('report-context').textContent = lines.join('\n');
  document.getElementById('report-note').value = '';
  panel.classList.add('open');
  setTimeout(() => document.getElementById('report-note').focus(), 50);
}

async function submitReport() {
  const note = document.getElementById('report-note').value.trim();
  if (!note) return;
  const btn = document.getElementById('report-submit');
  btn.disabled = true;
  btn.textContent = 'Sending…';

  const { screen, track, lesson, snippet } = _getReportContext();
  const { error } = await supabase.from('problem_reports').insert({
    user_id: _reportUser?.id ?? null,
    screen,
    track_id: track?.id ?? null,
    track_name: track?.name ?? null,
    lesson_id: lesson?.id ?? null,
    lesson_name: lesson?.name ?? null,
    content_snippet: snippet || null,
    note,
  });

  btn.disabled = false;
  btn.textContent = 'Submit';
  document.getElementById('report-panel').classList.remove('open');
  showToast(error ? 'Failed to send report.' : 'Problem reported — thanks!');
}

// ═══════════════════════════════════════════
// expose for inline onclick handlers
Object.assign(window, {
  goHome, goTrack, completeLessonArticle, retryLesson, startExam,
  nextExamQ, nextQ, selectExamOpt, selectExamTF, selectExamTimeline,
  selectOpt, selectTF, selectTimeline, signOut,
  selectLearnOpt, advanceLearn,
  startEraCheck, selectEraAnswer, advanceEraCheck, beginNextEraRound,
  startPersonCheck, selectPersonAnswer, advancePersonCheck, beginNextPersonRound,
  advanceColdOpen, skipColdOpen, showColdOpen,
  continueToStudy, studyToggleDef, studyToggleQ, studyNext, studyPrev, studyGoQuiz,
  handleTopbarResume,
  toggleReportPanel, submitReport,
  openPracticeSelect, togglePracticeTrack, beginPractice,
  selectPracticeOpt, selectPracticeTF, selectPracticeTimeline, nextPracticeQ, revealPracticeOptions, selectPracticeInterlude,
  selectCenturyMatchCell, checkCenturyMatch,
  openQuickPracticeSelect, startQuickPractice, selectQPOpt, selectQPTF, selectQPTimeline, nextQPQuestion, revealQPOptions,
});

initKeyboardShortcuts();

initAuth(async (user) => {
  _reportUser = user;
  setUserId(user.id);
  S = await loadState(user.id);
  updateTopbar();
  renderHome();
});