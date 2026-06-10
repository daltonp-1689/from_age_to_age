import { loadState, saveState, logExamResult, setUserId } from './storage.js';
import { initAuth } from './auth.js';
import { supabase } from './supabase.js';
import { L1_QUESTIONS, L2_QUESTIONS, L3_QUESTIONS, L4_QUESTIONS, M0_QUESTIONS, M1_QUESTIONS, M2_QUESTIONS, M4_QUESTIONS, M5_QUESTIONS, M6_QUESTIONS, M7_QUESTIONS, M8_QUESTIONS, M9_QUESTIONS, M10_QUESTIONS, M11_QUESTIONS, M12_QUESTIONS, M13_QUESTIONS, M14_QUESTIONS, M15_QUESTIONS, M16_QUESTIONS, M17_QUESTIONS, M18_QUESTIONS, M19_QUESTIONS, M20_QUESTIONS, M21_QUESTIONS, M22_QUESTIONS, M23_QUESTIONS, M24_QUESTIONS, M25_QUESTIONS, M26_QUESTIONS, M27_QUESTIONS, M28_QUESTIONS, M29_QUESTIONS, M30_QUESTIONS, M31_QUESTIONS } from './questions.js';
import { A1_QUESTIONS, A2_QUESTIONS, A3_QUESTIONS, A4_QUESTIONS, A5_QUESTIONS, A6_QUESTIONS, A7_QUESTIONS, A8_QUESTIONS, A9_QUESTIONS, A10_QUESTIONS, A11_QUESTIONS, A12_QUESTIONS, A13_QUESTIONS, A14_QUESTIONS, A15_QUESTIONS, A16_QUESTIONS, A17_QUESTIONS, A18_QUESTIONS, A19_QUESTIONS, A20_QUESTIONS, A21_QUESTIONS, A22_QUESTIONS, A23_QUESTIONS, A24_QUESTIONS, A25_QUESTIONS, A26_QUESTIONS, A27_QUESTIONS, A28_QUESTIONS, A29_QUESTIONS, A30_QUESTIONS, A31_QUESTIONS, A32_QUESTIONS, A_FINAL_QUESTIONS, A_ERA_EVENTS_1, A_ERA_EVENTS_2, A_ERA_EVENTS_3, A_PERSON_POOL_1, A_PERSON_POOL_2, A_PERSON_POOL_3 } from './questions_america.js';
import { attachSurveyContent } from './content/survey.js';
import { attachIntroContent } from './content/intro.js';
import { attachMedievalContent } from './content/medieval.js';
import { attachAmericaContent } from './content/america.js';

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
// ═══════════════════════════════════════════
// LESSON CONTENT (extracted to src/content/*)
// ═══════════════════════════════════════════
attachSurveyContent(TRACKS);
attachIntroContent(TRACKS);
attachMedievalContent(TRACKS);
attachAmericaContent(TRACKS);

// ═══════════════════════════════════════════
// STUDY DATA
// ═══════════════════════════════════════════

// ═══════════════════════════════════════════
// COLD OPEN DATA
// ═══════════════════════════════════════════
const _IMG='/images/';
const COLD_OPEN_CARDS=[
  // Lesson 1 — Early Church & Persecution
  {_bg:_IMG+'polycarp.jpg',cards:[
    {label:'The World Before',text:'The Roman Empire rules the known world — and its emperor is a god.',size:'lg'},
    {label:'The Crisis',text:'A Jewish carpenter is executed in Jerusalem. His followers claim he rose from the dead.',size:'xl'},
    {label:'The Stakes',text:'If they\'re right, everything Rome stands for is wrong. If they keep talking, they will die for it.',size:'md'},
    {label:'The Key Figures',text:'Peter. Paul. Ignatius. Polycarp. Ordinary men who refused to stay quiet.',size:'xl'},
    {label:'The Surprise',text:'Three centuries of bloodshed didn\'t kill the church. It made it grow faster.',size:'lg'},
    {label:'The Bridge',text:'Here\'s how a movement of fishermen became the faith of an empire.',size:'md'},
  ]},
  // Lesson 2 — Councils & Creeds
  {_bg:_IMG+'constantine.jpg',cards:[
    {label:'The World Before',text:'Christianity is suddenly legal. After 300 years underground, the church steps into daylight.',size:'lg'},
    {label:'The Crisis',text:'A popular preacher named Arius has a question: Was Jesus actually God — or just the greatest creature God ever made?',size:'md'},
    {label:'The Stakes',text:'The answer will split the empire. It will determine what Christians believe about Jesus forever.',size:'lg'},
    {label:'The Key Figures',text:'Constantine. Arius. Athanasius. A single Greek letter separates orthodoxy from heresy.',size:'xl'},
    {label:'The Surprise',text:'The man who defended the faith was exiled five times — and still won.',size:'xl'},
    {label:'The Bridge',text:'Here\'s the story of how the church learned to say who Jesus is — in words that still echo every Sunday.',size:'md'},
  ]},
  // Lesson 3 — Medieval Church & Schism
  {_bg:_IMG+'hagia-sophia.jpg',cards:[
    {label:'The World Before',text:'Rome has fallen. Europe is in ruins. The church is the last institution standing.',size:'lg'},
    {label:'The Crisis',text:'Power corrupts. By the 11th century, the Pope and the Emperor are at war — and the church splits in two.',size:'md'},
    {label:'The Stakes',text:'One billion people today are Catholic or Orthodox because of decisions made in this era.',size:'lg'},
    {label:'The Key Figures',text:'Benedict. Charlemagne. Aquinas. Wycliffe. Builders and reformers who shaped a thousand years.',size:'xl'},
    {label:'The Surprise',text:'The church that dominated medieval Europe was already planting the seeds of its own destruction.',size:'xl'},
    {label:'The Bridge',text:'Here\'s the story of the church\'s longest chapter — and the cracks that would eventually break it open.',size:'md'},
  ]},
  // Lesson 4 — Reformation & Modern Era
  {_bg:_IMG+'luther.jpg',cards:[
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
        <button class="btn btn-primary" data-action="startExam" data-args='["${tr.id}"]'><i class="ti ti-refresh"></i> Retake Examination</button>`;
    } else {
      examDiv.innerHTML=`
        <div class="exam-cta-eyebrow">Track Examination</div>
        <p>You\'ve completed all four lessons. Prove your mastery with the final examination.</p>
        <button class="btn btn-primary" style="background:var(--crimson);border-color:var(--crimson2);" data-action="startExam" data-args='["${tr.id}"]'><i class="ti ti-award"></i> Take the Examination</button>`;
    }
    c.appendChild(examDiv);
  }
}

// ═══════════════════════════════════════════
// ARTICLE HTML
// Images use data-wiki="Page_Title" — resolved at runtime via Wikipedia REST API
// Paul's journey uses a Leaflet map rendered after article is injected
// ═══════════════════════════════════════════

// Wire article HTML and matching data into lessons after constants are defined

// ═══════════════════════════════════════════
// AMERICAN CHURCH HISTORY — TRACK 5 DATA
// 30-Lesson Track · Lessons 1–6 implemented
// ═══════════════════════════════════════════

// Wire track5 lesson data

// ═══════════════════════════════════════════
// TRACK 5 LESSONS 7–12 DATA
// ═══════════════════════════════════════════

// Wire lessons 7–12

// — Lessons 13–18 —

// Wire lessons 13–19

// Wire lessons 19–24

// Wire lessons 25–30

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
    `<button class="learn-opt" id="lopt-${i}" data-action="selectLearnOpt" data-args='[${i}]'>${opt}</button>`
  ).join('');

  document.getElementById('learn-inner').innerHTML=`
    <div class="learn-wrap">
      <div class="learn-header">
        <div class="learn-back" data-action="goTrack"><i class="ti ti-arrow-left"></i> Back</div>
      </div>
      <div class="learn-prog-bar-track">
        <div class="learn-prog-bar" id="learn-prog-bar" style="width:${pct}%;background:${TIER_COLORS[q.tier||1]};"></div>
      </div>
      <div class="learn-question-card">
        <div class="learn-sentence">${q.sentence}</div>
        <div class="learn-wordbank" id="learn-wordbank" style="display:none;">${optionsHtml}</div>
        <div class="learn-reveal-hint" id="learn-reveal-hint" data-action="revealLearnOptions">
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
    nw.innerHTML=`<button class="continue-btn" data-action="advanceLearn"><i class="ti ti-arrow-right"></i> Next</button>`;
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
    ?`<button class="btn btn-primary btn-full" style="max-width:280px;margin:1rem auto 0;" data-action="goTrack"><i class="ti ti-arrow-right"></i> Back to track</button>`
    :`<button class="btn btn-primary btn-full" style="max-width:280px;margin:1rem auto 0;" data-action="continueToStudy"><i class="ti ti-bulb"></i> Continue to Study</button>`;

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
        <span class="learn-back" data-action="goTrack"><i class="ti ti-arrow-left"></i> Lessons</span>
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
        <button class="ec-btn-yes" data-action="selectEraAnswer" data-args='[true]'><i class="ti ti-check"></i> Yes, in this era</button>
        <button class="ec-btn-no" data-action="selectEraAnswer" data-args='[false]'><i class="ti ti-x"></i> No, different era</button>
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
    <button class="btn btn-primary btn-full" style="margin-top:4px;" data-action="advanceEraCheck">
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
        <span class="learn-back" data-action="goTrack"><i class="ti ti-arrow-left"></i> Lessons</span>
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
      <button class="btn btn-primary btn-full ec-round-start-btn" style="margin-top:20px;" data-action="beginNextEraRound">
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
        <button class="btn btn-primary btn-full" style="max-width:280px;margin:1.5rem auto 0;" data-action="goTrack">
          <i class="ti ti-arrow-left"></i> Back to Lessons
        </button>
        <button class="btn btn-full" style="max-width:280px;margin:10px auto 0;" data-action="startEraCheck" data-args='["${s.checkId}"]'>
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
        <span class="learn-back" data-action="goTrack"><i class="ti ti-arrow-left"></i> Lessons</span>
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
        <button class="pc-btn-yes" data-action="selectPersonAnswer" data-args='[true]'><i class="ti ti-check"></i> Yes, this applies</button>
        <button class="pc-btn-no" data-action="selectPersonAnswer" data-args='[false]'><i class="ti ti-x"></i> No, doesn't apply</button>
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
    <button class="btn btn-primary btn-full" style="margin-top:4px;" data-action="advancePersonCheck">
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
        <span class="learn-back" data-action="goTrack"><i class="ti ti-arrow-left"></i> Lessons</span>
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
      <button class="btn btn-primary btn-full pc-round-start-btn" style="margin-top:20px;background:var(--crimson);border-color:var(--crimson2);" data-action="beginNextPersonRound">
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
        <button class="btn btn-primary btn-full" style="max-width:280px;margin:1.5rem auto 0;background:var(--crimson);border-color:var(--crimson2);" data-action="goTrack">
          <i class="ti ti-arrow-left"></i> Back to Lessons
        </button>
        <button class="btn btn-full" style="max-width:280px;margin:10px auto 0;" data-action="startPersonCheck" data-args='["${s.checkId}"]'>
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
      `<span class="study-kw" data-action="studyToggleDef" data-args='[${term.origIdx}]'>${term.word}</span>`
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
    `<button class="study-q-chip${ss.activeQ===i?' open':''}" data-action="studyToggleQ" data-args='[${i}]'>${q.q}</button>`
  ).join('');

  const ansHtml=ss.activeQ!==null
    ?`<div class="study-q-answer"><i class="ti ti-arrow-right" style="font-size:12px;color:var(--gold2);margin-right:6px;flex-shrink:0;"></i>${ss.questions[ss.activeQ].a}</div>`
    :'';

  document.getElementById('study-inner').innerHTML=`
    <div class="study-wrap">
      <div class="study-header">
        <div class="study-back" data-action="goTrack"><i class="ti ti-arrow-left"></i> Back</div>
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
            ?`<button class="study-btn-prev" data-action="studyPrev"><i class="ti ti-arrow-left"></i> Prev</button>`
            :'<span></span>'}
          ${isLast
            ?`<button class="btn btn-primary study-btn-quiz" data-action="studyGoQuiz"><i class="ti ti-pencil"></i> Start Quiz</button>`
            :`<button class="study-btn-next" data-action="studyNext">Next <i class="ti ti-arrow-right"></i></button>`}
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
      q.opts.map((o,i)=>`<button class="opt" data-action="selectOpt" data-args='[${i}]' id="opt-${i}"><span class="opt-letter">${'ABCD'[i]}</span>${o}</button>`).join('')+
    `</div>`;
  } else if(q.type==='timeline'){
    qBody=`<div id="timeline-container" style="display:flex;flex-direction:column;gap:8px;margin-top:1rem;">`+
      q.shuffled.map((ev,i)=>{
        const isDone=q.order.slice(0,q.timelineStep).includes(i);
        return `<button class="opt${isDone?' tl-done':''}" ${isDone?'disabled':`data-action="selectTimeline" data-args='[${i}]'`} id="tl-opt-${i}"><span class="opt-letter">${isDone?(q.order.indexOf(i)+1):'·'}</span>${ev.label}</button>`;
      }).join('')+
    `</div>`;
  } else {
    qBody=`<div class="tf-row">
      <button class="tf-btn" data-action="selectTF" data-args='[true]' id="tf-true"><i class="ti ti-check tf-icon"></i><span class="tf-label">True</span></button>
      <button class="tf-btn" data-action="selectTF" data-args='[false]' id="tf-false"><i class="ti ti-x tf-icon"></i><span class="tf-label">False</span></button>
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
    <button class="continue-btn" id="continue-btn" style="display:none;" data-action="nextQ">
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
      <button class="btn btn-primary btn-full" data-action="retryLesson"><i class="ti ti-refresh"></i> Try again</button>
      <button class="btn btn-full" data-action="goTrack">Back to track</button>
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
      q.opts.map((o,i)=>`<button class="opt" data-action="selectExamOpt" data-args='[${i}]' id="exam-opt-${i}"><span class="opt-letter">${'ABCD'[i]}</span>${o}</button>`).join('')+
    `</div>`;
  } else if(q.type==='tf'){
    qBody=`<div class="options" id="exam-opts-container">
      <button class="opt" data-action="selectExamTF" data-args='[true]' id="exam-opt-true"><span class="opt-letter">T</span>True</button>
      <button class="opt" data-action="selectExamTF" data-args='[false]' id="exam-opt-false"><span class="opt-letter">F</span>False</button>
    </div>`;
  } else if(q.type==='timeline'){
    qBody=`<div id="exam-timeline-container" style="display:flex;flex-direction:column;gap:8px;margin-top:1rem;">`+
      q.shuffled.map((ev,i)=>{
        const isDone=q.order.slice(0,q.timelineStep).includes(i);
        return `<button class="opt${isDone?' tl-done':''}" ${isDone?'disabled':`data-action="selectExamTimeline" data-args='[${i}]'`} id="exam-tl-opt-${i}"><span class="opt-letter">${isDone?(q.order.indexOf(i)+1):'·'}</span>${ev.label}</button>`;
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
      <button class="btn btn-primary" data-action="nextExamQ"><i class="ti ti-arrow-right"></i> Continue</button>
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
      ${!passed?`<button class="btn btn-gold btn-full" data-action="startExam" data-args='["${es.trackId}"]'><i class="ti ti-refresh"></i> Retake</button>`:''}
      <button class="btn btn-primary btn-full" data-action="goTrack"><i class="ti ti-arrow-right"></i> Back to track</button>
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
      ${ls.wrong>0?`<button class="btn btn-gold btn-full" data-action="retryLesson"><i class="ti ti-refresh"></i> Improve score</button>`:''}
      <button class="btn btn-primary btn-full" data-action="goTrack"><i class="ti ti-arrow-right"></i> Back to track</button>
      <button class="btn btn-full" data-action="openQuickPracticeSelect"><i class="ti ti-bolt"></i> Quick Practice</button>
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
          <button class="qp-track-btn" data-action="startQuickPractice" data-args='["${tr.id}"]'>
            <i class="ti ${tr.icon} qp-track-icon"></i>
            <div class="qp-track-text">
              <div class="qp-track-name">${tr.name}</div>
              <div class="qp-track-era">${tr.eyebrow||''}</div>
            </div>
            <i class="ti ti-chevron-right"></i>
          </button>`).join('')}
      </div>
      <button class="btn btn-ghost qp-cancel" data-action="closeOverlay" data-args='["quick-practice-overlay"]'>Cancel</button>
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
        q.opts.map((o,i)=>`<button class="opt" data-action="selectQPOpt" data-args='[${i}]' id="qpopt-${i}"><span class="opt-letter">${'ABCD'[i]}</span>${o}</button>`).join('')+
      `</div>`+
      `<div class="learn-reveal-hint" id="qp-reveal-hint" data-action="revealQPOptions"><span class="learn-reveal-key">Space</span> to reveal options</div>`;
  } else if(q.type==='tf'){
    qs.optionsRevealed=true;
    qBody=`<div class="options" id="qp-opts-container">
      <button class="opt" data-action="selectQPTF" data-args='[true]' id="qptf-true"><span class="opt-letter">T</span>True</button>
      <button class="opt" data-action="selectQPTF" data-args='[false]' id="qptf-false"><span class="opt-letter">F</span>False</button>
    </div>`;
  } else if(q.type==='timeline'){
    qs.optionsRevealed=false;
    qBody=`<div class="learn-reveal-hint" id="qp-reveal-hint" data-action="revealQPOptions"><span class="learn-reveal-key">Space</span> to reveal options</div>`+
      `<div id="qp-timeline-container" style="display:none;flex-direction:column;gap:8px;margin-top:1rem;">`+
        q.shuffled.map((ev,i)=>`<button class="opt" data-action="selectQPTimeline" data-args='[${i}]' id="qptl-opt-${i}"><span class="opt-letter">·</span>${ev.label}</button>`).join('')+
      `</div>`;
  }

  document.getElementById('quick-practice-inner').innerHTML=`
    <div class="qp-topbar">
      <button class="back-btn" data-action="goHome"><i class="ti ti-x"></i></button>
      <div class="qp-prog-wrap"><div class="qp-prog-bar" style="width:${(qs.qIdx/qs.pool.length)*100}%"></div></div>
      <div class="qp-prog-label">${prog}</div>
    </div>
    <div class="qp-question-wrap">
      <div class="qp-track-badge">${qs.trackName}</div>
      <div class="question-text">${q.q}</div>
      ${qBody}
      <div class="q-feedback" id="qp-feedback"></div>
      <button class="btn btn-primary continue-btn" id="qp-continue-btn" style="display:none;" data-action="nextQPQuestion">
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
        <button class="btn btn-primary btn-full" data-action="openQuickPracticeSelect"><i class="ti ti-bolt"></i> Another track</button>
        <button class="btn btn-full" data-action="goHome"><i class="ti ti-home"></i> Home</button>
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
        <div class="back-btn" data-action="goHome"><i class="ti ti-arrow-left"></i> Home</div>
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
      <div class="back-btn" data-action="goHome"><i class="ti ti-arrow-left"></i> Home</div>
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
          return `<div class="practice-track-card selected" id="ptc-${tr.id}" data-action="togglePracticeTrack" data-args='["${tr.id}"]'>
            <div class="ptc-check"><i class="ti ti-check"></i></div>
            <div class="ptc-icon"><i class="ti ${tr.icon}"></i></div>
            <div class="ptc-text">
              <div class="ptc-name">${tr.name}</div>
              <div class="ptc-meta">${qCount} questions · ${doneLessons.length} of ${tr.lessons.length} lessons</div>
            </div>
          </div>`;
        }).join('')}
      </div>
      <button class="btn btn-primary btn-full practice-start-btn" data-action="beginPractice">
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
        q.opts.map((o,i)=>`<button class="opt" data-action="selectPracticeOpt" data-args='[${i}]' id="popt-${i}"><span class="opt-letter">${'ABCD'[i]}</span>${o}</button>`).join('')+
      `</div>`+
      `<div class="learn-reveal-hint" id="practice-reveal-hint" data-action="revealPracticeOptions"><span class="learn-reveal-key">Space</span> to reveal options</div>`;
  } else if(q.type==='timeline'){
    qBody=
      `<div id="practice-timeline-container" style="display:none;flex-direction:column;gap:8px;margin-top:1rem;">`+
        q.shuffled.map((ev,i)=>{
          const isDone=q.order.slice(0,q.timelineStep).includes(i);
          return`<button class="opt${isDone?' tl-done':''}" ${isDone?'disabled':`data-action="selectPracticeTimeline" data-args='[${i}]'`} id="ptl-opt-${i}"><span class="opt-letter">${isDone?(q.order.indexOf(i)+1):'·'}</span>${ev.label}</button>`;
        }).join('')+
      `</div>`+
      `<div class="learn-reveal-hint" id="practice-reveal-hint" data-action="revealPracticeOptions"><span class="learn-reveal-key">Space</span> to reveal options</div>`;
  } else {
    ps.optionsRevealed=true;
    qBody=`<div class="tf-row">
      <button class="tf-btn" data-action="selectPracticeTF" data-args='[true]' id="ptf-true"><i class="ti ti-check tf-icon"></i><span class="tf-label">True</span></button>
      <button class="tf-btn" data-action="selectPracticeTF" data-args='[false]' id="ptf-false"><i class="ti ti-x tf-icon"></i><span class="tf-label">False</span></button>
    </div>`;
  }

  const acc=ps.total>0?Math.round(ps.correct/ps.total*100):100;
  const streakHtml=ps.streak>=3?`<span class="practice-stat"><i class="ti ti-flame practice-streak-fire"></i> <span class="streak-val">${ps.streak}</span></span>`:'';

  document.getElementById('practice-inner').innerHTML=`
    <div class="practice-header-bar">
      <button class="practice-exit-btn" data-action="goHome"><i class="ti ti-x"></i></button>
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
    <button class="continue-btn" id="practice-continue-btn" style="display:none;" data-action="nextPracticeQ">
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
    btnYes=`<button class="pil-btn pil-yes" id="pil-yes" data-action="selectPracticeInterlude" data-args='[true]'><span class="pil-key">1</span>In this era</button>`;
    btnNo=`<button class="pil-btn pil-no" id="pil-no" data-action="selectPracticeInterlude" data-args='[false]'><span class="pil-key">2</span>Not in this era</button>`;
  } else {
    banner=`<div class="pil-person-banner">${il.person.name}<span class="pil-person-desc">${il.person.descriptor}</span></div>`;
    prompt=`Does this statement apply to ${il.person.name}?`;
    btnYes=`<button class="pil-btn pil-yes" id="pil-yes" data-action="selectPracticeInterlude" data-args='[true]'><span class="pil-key">1</span>Yes, applies</button>`;
    btnNo=`<button class="pil-btn pil-no" id="pil-no" data-action="selectPracticeInterlude" data-args='[false]'><span class="pil-key">2</span>Doesn't apply</button>`;
  }
  document.getElementById('practice-inner').innerHTML=`
    <div class="practice-header-bar">
      <button class="practice-exit-btn" data-action="goHome"><i class="ti ti-x"></i></button>
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
    <button class="continue-btn" id="practice-continue-btn" style="display:none;" data-action="nextPracticeQ">
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
    const click=il.checked?'':`data-action="selectCenturyMatchCell" data-args='["c",${i}]'`;
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
    const click=il.checked?'':`data-action="selectCenturyMatchCell" data-args='["e",${i}]'`;
    return`<button class="${cls}" ${click} ${il.checked?'disabled':''}>${ev.label}${badge}</button>`;
  }).join('');

  const allPaired=Object.keys(il.pairs).length===il.centuryRows.length;
  const checkBtn=il.checked?'':`<button class="btn btn-primary cmatch-check-btn" ${allPaired?'':'disabled'} data-action="checkCenturyMatch">Check matches</button>`;

  document.getElementById('practice-inner').innerHTML=`
    <div class="practice-header-bar">
      <button class="practice-exit-btn" data-action="goHome"><i class="ti ti-x"></i></button>
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
    <button class="continue-btn" id="practice-continue-btn" style="display:${il.checked?'flex':'none'};" data-action="nextPracticeQ">
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

// Wire track3 lesson data

// ── Lesson 1 (intro) — The Medieval Church: A Thousand-Year Bridge ───────

// ── Lesson 2 — Benedict & the Holy Rule (c. 480–547) ────────────────────

// ── Lesson 4 — Gregory the Great (590–604) ─────────────────────────────

// ── Lesson 5 — Mohammed & the Rise of Islam (7th c.) ────────────────────

// ── Lesson 6 — The Synod of Whitby (664) ─────────────────────────────────

// ── Lesson 7 — Maximus the Confessor & the Two Wills of Christ (633–681) ─

// ── Lesson 8 — The Iconoclastic Controversy & Nicaea II (8th c.) ────────

// ── Lesson 8 — Boniface, Apostle of the Germans (c. 680–754) ───────────

// ── Lesson 9 — Olopan & the Gospel in China (635–845) ──────────────────

// ── Lesson 10 — Nicholas I, Photios & the Filioque (9th c.) ────────────

// ── Lesson 11 — Cyril & Methodius (9th c.) ────────────

// ── Lesson 12 — Gottschalk, Ratramnus & the Recovery of Augustine (9th c.) ────────────

// ── Lesson 13 — The Dark Ages (10th c.) ────────────

// ═══════════════════════════════════════════
// INTRODUCTION TRACK (track6) — read + learn only
// ═══════════════════════════════════════════

// ── Lesson 1 — History Is a Command, Not a Hobby ─────────────────────────

// ── Lesson 2 — The Bible Itself Is Church History ────────────────────────

// ── Lesson 3 — God Is Lord of History ────────────────────────────────────

// ── Lesson 4 — Guard Against Heresy ──────────────────────────────────────

// ── Lesson 5 — Guard Against Foolish Mistakes ────────────────────────────

// ── Lesson 6 — God Has Never Abandoned His Church ────────────────────────

// ── Lesson 7 — You Have a Family You've Never Met ────────────────────────

// ── Lesson 8 — Heroes Were Sinners Too ───────────────────────────────────

// ── Lesson 9 — The Cloud of Witnesses ────────────────────────────────────

// ── Lesson 10 — We Are In the Story Too ──────────────────────────────────

// Wire track6 (Intro) lesson data

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
// ═══════════════════════════════════════════
// Event delegation — one click dispatcher for every [data-action] element
// (replaces the old inline onclick handlers; nothing is hung on window).
// Arguments ride along as a JSON array in data-args, preserving their types.
// ═══════════════════════════════════════════
const ACTIONS = {
  goHome, goTrack, completeLessonArticle, retryLesson, startExam,
  nextExamQ, nextQ, selectExamOpt, selectExamTF, selectExamTimeline,
  selectOpt, selectTF, selectTimeline, signOut,
  selectLearnOpt, revealLearnOptions, advanceLearn,
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
  closeOverlay: (id) => document.getElementById(id)?.remove(),
};

document.addEventListener('click', (e) => {
  const el = e.target.closest?.('[data-action]');
  if (!el) return;
  const fn = ACTIONS[el.dataset.action];
  if (!fn) return;                  // e.g. the lesson-list read/learn/quiz pills bind their own handlers
  fn(...(el.dataset.args ? JSON.parse(el.dataset.args) : []));
});

initKeyboardShortcuts();

initAuth(async (user) => {
  _reportUser = user;
  setUserId(user.id);
  S = await loadState(user.id);
  updateTopbar();
  renderHome();
});