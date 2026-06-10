// Track 3 — The Medieval Church (M0–M31)
// Lesson content (essay HTML, fill-in-the-blank "learn", "study" cards, and cold-open intros).
// Pure data + wiring extracted from main.js — no app logic lives here.

export const M1_LEARN=[
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

export const M1_STUDY={
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

export const M1_ARTICLE_HTML=`
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

export const M0_LEARN=[
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

export const M0_STUDY={
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

export const M0_ARTICLE_HTML=`
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

export const M2_LEARN=[
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

export const M2_STUDY={
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

export const M2_ARTICLE_HTML=`
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

export const M4_LEARN=[
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

export const M4_STUDY={
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

export const M4_ARTICLE_HTML=`
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

export const M5_LEARN=[
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

export const M5_STUDY={
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

export const M5_ARTICLE_HTML=`
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

export const M6_LEARN=[
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

export const M6_STUDY={
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

export const M6_ARTICLE_HTML=`
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

export const M31_LEARN=[
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

export const M31_STUDY={
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

export const M31_ARTICLE_HTML=`
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

export const M7_LEARN=[
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

export const M7_STUDY={
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

export const M7_ARTICLE_HTML=`
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

export const M8_LEARN=[
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

export const M8_STUDY={
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

export const M8_ARTICLE_HTML=`
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

export const M9_LEARN=[
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

export const M9_STUDY={
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

export const M9_ARTICLE_HTML=`
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

export const M10_LEARN=[
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

export const M10_STUDY={
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

export const M10_ARTICLE_HTML=`
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

export const M11_LEARN=[
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

export const M11_STUDY={
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

export const M11_ARTICLE_HTML=`
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

export const M12_LEARN=[
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

export const M12_STUDY={
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

export const M12_ARTICLE_HTML=`
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

export const M13_LEARN=[
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

export const M13_STUDY={
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

export const M13_ARTICLE_HTML=`
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

export const M14_LEARN=[
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

export const M14_STUDY={
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

export const M14_ARTICLE_HTML=`
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

export const M15_LEARN=[
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

export const M15_STUDY={
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

export const M15_ARTICLE_HTML=`
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

export const M16_LEARN=[
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

export const M16_STUDY={
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

export const M16_ARTICLE_HTML=`
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

export const M17_LEARN=[
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

export const M17_STUDY={
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

export const M17_ARTICLE_HTML=`
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

export const M18_LEARN=[
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

export const M18_STUDY={
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

export const M18_ARTICLE_HTML=`
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

export const M19_LEARN=[
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

export const M19_STUDY={
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

export const M19_ARTICLE_HTML=`
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

export const M20_LEARN=[
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

export const M20_STUDY={
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

export const M20_ARTICLE_HTML=`
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

export const M21_LEARN=[
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

export const M21_STUDY={
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

export const M21_ARTICLE_HTML=`
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

export const M22_LEARN=[
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

export const M22_STUDY={
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

export const M22_ARTICLE_HTML=`
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

export const M23_LEARN=[
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

export const M23_STUDY={
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

export const M23_ARTICLE_HTML=`
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

export const M24_LEARN=[
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

export const M24_STUDY={
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

export const M24_ARTICLE_HTML=`
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

export const M25_LEARN=[
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

export const M25_STUDY={
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

export const M25_ARTICLE_HTML=`
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

export const M26_LEARN=[
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

export const M26_STUDY={
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

export const M26_ARTICLE_HTML=`
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

export const M27_LEARN=[
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

export const M27_STUDY={
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

export const M27_ARTICLE_HTML=`
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

export const M28_LEARN=[
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

export const M28_STUDY={
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

export const M28_ARTICLE_HTML=`
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

export const M29_LEARN=[
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

export const M29_STUDY={
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

export const M29_ARTICLE_HTML=`
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

export const M30_LEARN=[
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

export const M30_STUDY={
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

export const M30_ARTICLE_HTML=`
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

export function attachMedievalContent(TRACKS) {
  const _track3=TRACKS.find(t=>t.id==='track3');
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
  _track3.lessons[2].articleHtml=M2_ARTICLE_HTML;
  _track3.lessons[2].learn=M2_LEARN;
  _track3.lessons[2].study=M2_STUDY;
  _track3.lessons[2].coldOpen={_bg:'/images/middle-ages/IonaValley.jpeg',cards:[
    {label:'The World Before',text:'Rome is a ruin of vice and violence. A young student turns his back on the city and walks into the hills.',size:'lg'},
    {label:'The Turn',text:'He wants only to be alone with God — but disciples keep finding him.',size:'xl'},
    {label:'The Key Figure',text:'Benedict of Nursia — hermit, abbot, and the patriarch of Monasticism.',size:'lg'},
    {label:'The Rule',text:'Here is how a short rule for a hilltop monastery became the blueprint for Christian Europe.',size:'md'},
  ]};
  _track3.lessons[3].articleHtml=M4_ARTICLE_HTML;
  _track3.lessons[3].learn=M4_LEARN;
  _track3.lessons[3].study=M4_STUDY;
  _track3.lessons[3].coldOpen={_bg:'/images/middle-ages/GregorytheGreat.jpeg',cards:[
    {label:'The World Before',text:'Italy is shattered — Rome plundered, schools shut, the emperor far away in Constantinople.',size:'lg'},
    {label:'The Crisis',text:'The Lombards are at the gates. A senator\'s son who became a monk is dragged from his cell and made pope.',size:'xl'},
    {label:'The Key Figures',text:'Gregory of Rome. Augustine, sent to the Angles. The Lombard kings who let Rome breathe.',size:'lg'},
    {label:'The Bridge',text:'Here is how a sick monk on a sickbed shaped the medieval papacy — and the long shadow of mass conversion without conversion.',size:'md'},
  ]};
  _track3.lessons[4].articleHtml=M5_ARTICLE_HTML;
  _track3.lessons[4].learn=M5_LEARN;
  _track3.lessons[4].study=M5_STUDY;
  _track3.lessons[4].coldOpen={_bg:'/images/middle-ages/Mosque.jpeg',cards:[
    {label:'The World Before',text:'Arabia sits on the edge of the Persian and Byzantine empires. Caravan routes wind through Mecca, where pagan tribes ring a stone called the Kaaba.',size:'lg'},
    {label:'The Crisis',text:'A trader claims an angel speaks to him. Driven out of his city, he gathers an army.',size:'xl'},
    {label:'The Key Figures',text:'Mohammed of Mecca. The followers of the Hijra. Charles Martel at Tours.',size:'lg'},
    {label:'The Bridge',text:'Here is how a new faith, in eighty years, took half the Christian world.',size:'md'},
  ]};
  _track3.lessons[5].articleHtml=M6_ARTICLE_HTML;
  _track3.lessons[5].learn=M6_LEARN;
  _track3.lessons[5].study=M6_STUDY;
  _track3.lessons[5].coldOpen={_bg:'/images/middle-ages/Whitbey.jpeg',cards:[
    {label:'The World Before',text:'Two Christianities are growing in Britain — Roman from the south, Celtic from the north — using different calendars.',size:'lg'},
    {label:'The Crisis',text:'The Northumbrian king celebrates Easter while his wife still keeps Lent. Something has to give.',size:'xl'},
    {label:'The Key Figures',text:'Abbess Hilda hosts. King Oswiu rules. The bishops speak for Rome and for Iona.',size:'lg'},
    {label:'The Bridge',text:'Here is how a synod about haircuts revealed what the church loses when secondary issues become primary.',size:'md'},
  ]};
  _track3.lessons[6].articleHtml=M31_ARTICLE_HTML;
  _track3.lessons[6].learn=M31_LEARN;
  _track3.lessons[6].study=M31_STUDY;
  _track3.lessons[6].coldOpen={_bg:'/images/middle-ages/HagiaSophia.jpeg',cards:[
    {label:'The World Before',text:'Half the Christian East has fallen to Islam. The emperor wants the Monophysite provinces back, and offers a theological compromise to win them.',size:'lg'},
    {label:'The Crisis',text:'The compromise quietly says Christ had only one will. Accept it and the empire is unified — refuse it and you defy the throne.',size:'xl'},
    {label:'The Key Figures',text:'Maximus the Confessor, the monk who would not sign. Pope Martin I, who stood with him. The emperors Heraclius and Constans II.',size:'lg'},
    {label:'The Bridge',text:'Here is how one man with no army held the line on the two wills of Christ — and lost his tongue and hand for it.',size:'md'},
  ]};
  _track3.lessons[7].articleHtml=M7_ARTICLE_HTML;
  _track3.lessons[7].learn=M7_LEARN;
  _track3.lessons[7].study=M7_STUDY;
  _track3.lessons[7].coldOpen={_bg:'/images/middle-ages/Nicaea2.jpeg',cards:[
    {label:'The World Before',text:'Icons fill every Byzantine church — Christ, Mary, the saints, gazing out in gold leaf and tempera, prayed to and kissed.',size:'lg'},
    {label:'The Crisis',text:'An emperor decides this is idolatry. Soldiers tear images down. Monks and bishops resist. The empire splits over paint.',size:'xl'},
    {label:'The Key Figures',text:'Leo III, the iconoclast emperor. John of Damascus, defender from beyond the empire. Empress Irene, who called the council.',size:'lg'},
    {label:'The Bridge',text:'Here is how the East fought through a generation of conflict to answer a question Western Christians barely thought to ask.',size:'md'},
  ]};
  _track3.lessons[8].articleHtml=M8_ARTICLE_HTML;
  _track3.lessons[8].learn=M8_LEARN;
  _track3.lessons[8].study=M8_STUDY;
  _track3.lessons[8].coldOpen={_bg:'/images/middle-ages/Boniface.jpeg',cards:[
    {label:'The World Before',text:'East of the Rhine the old gods still hold — Thor, Wodan, sacred oaks in dim groves where blood is shed for harvest.',size:'lg'},
    {label:'The Test',text:'An English monk picks up an axe and walks into the grove. The villagers wait for lightning. None comes.',size:'xl'},
    {label:'The Key Figures',text:'Boniface, the English missionary. Pope Gregory II, who sent him. Charles Martel, who shielded him.',size:'lg'},
    {label:'The Bridge',text:'Here is how one Englishman bound the new German church to Rome — and gave his life among the Frisians.',size:'md'},
  ]};
  _track3.lessons[9].articleHtml=M9_ARTICLE_HTML;
  _track3.lessons[9].learn=M9_LEARN;
  _track3.lessons[9].study=M9_STUDY;
  _track3.lessons[9].coldOpen={_bg:'/images/middle-ages/NestorianStele.jpeg',cards:[
    {label:'The World Before',text:'While Anglo-Saxons are still being baptized in muddy English rivers, the Tang Dynasty rules the largest, richest, most cosmopolitan empire on earth.',size:'lg'},
    {label:'The Arrival',text:'A monk from Persia, carrying scrolls in a language no Chinese scribe can read, asks the emperor for a hearing.',size:'xl'},
    {label:'The Key Figures',text:'Olopan, the Assyrian missionary. Emperor Taizong, who received him. Emperor Wuzong, who later swept Christianity away.',size:'lg'},
    {label:'The Bridge',text:'Here is how the gospel reached China in the 7th century — and was nearly forgotten until a buried stone was found a thousand years later.',size:'md'},
  ]};
  _track3.lessons[10].articleHtml=M10_ARTICLE_HTML;
  _track3.lessons[10].learn=M10_LEARN;
  _track3.lessons[10].study=M10_STUDY;
  _track3.lessons[10].coldOpen={_bg:'/images/middle-ages/Filioque.jpeg',cards:[
    {label:'The World Before',text:'East and West still share one creed, one set of councils, one church — but barely. Two proud sees, two languages, two political worlds.',size:'lg'},
    {label:'The Quarrel',text:'A new pope claims authority over all Christendom. A new patriarch — yesterday a layman — refuses to bow. One word in the creed lights the fuse.',size:'xl'},
    {label:'The Key Figures',text:'Pope Nicholas I, claimant of universal jurisdiction. Patriarch Photios, the Greek scholar who said no.',size:'lg'},
    {label:'The Bridge',text:'Here is how a 9th-century quarrel over jurisdiction and one Latin word set the stage for the Great Schism of 1054.',size:'md'},
  ]};
  _track3.lessons[11].articleHtml=M11_ARTICLE_HTML;
  _track3.lessons[11].learn=M11_LEARN;
  _track3.lessons[11].study=M11_STUDY;
  _track3.lessons[11].coldOpen={_bg:'/images/middle-ages/CyrilMethodius.jpeg',cards:[
    {label:'The World Before',text:'A vast Slavic-speaking world lies between Greek Constantinople and Frankish Aachen. Latin missionaries have entered, but their books and liturgy speak a foreign tongue.',size:'lg'},
    {label:'The Request',text:'A Moravian prince writes to Constantinople: "Send us teachers who can speak to my people."',size:'xl'},
    {label:'The Key Figures',text:'Cyril, who built the alphabet. Methodius, who outlived him to defend their work. Photios, who sent them.',size:'lg'},
    {label:'The Bridge',text:'Here is how a Bible in Slavonic — and an alphabet still in use today — was born of one prince\'s request.',size:'md'},
  ]};
  _track3.lessons[12].articleHtml=M12_ARTICLE_HTML;
  _track3.lessons[12].learn=M12_LEARN;
  _track3.lessons[12].study=M12_STUDY;
  _track3.lessons[12].coldOpen={_bg:'/images/middle-ages/Carolingian.jpeg',cards:[
    {label:'The World Before',text:'Charlemagne is two generations dead. His empire is fragmenting, but his monasteries are still copying books — and reading them.',size:'lg'},
    {label:'The Crisis',text:'Two old Augustinian questions return with force. A monk preaches predestination and is flogged for it. Two more argue over whether the bread is really Christ.',size:'xl'},
    {label:'The Key Figures',text:'Gottschalk, imprisoned for grace. Paschasius and Ratramnus, two monks of Corbie taking opposite sides at the table.',size:'lg'},
    {label:'The Bridge',text:'Here is how a forgotten Carolingian quarrel quietly seeded the Reformation\'s rejection of transubstantiation 700 years later.',size:'md'},
  ]};
  _track3.lessons[13].articleHtml=M13_ARTICLE_HTML;
  _track3.lessons[13].learn=M13_LEARN;
  _track3.lessons[13].study=M13_STUDY;
  _track3.lessons[13].coldOpen={_bg:'/images/middle-ages/DarkAges.jpeg',cards:[
    {label:'The World Before',text:'Charlemagne\'s empire has fractured. Rome is a violent provincial town ruled by feuding noble families. The pope is whoever they crown this season.',size:'lg'},
    {label:'The Crisis',text:'A Roman matriarch places her teenage grandson on the throne of Peter. Vikings burn the monasteries of Britain. Muslim ships strike up the Italian coast.',size:'xl'},
    {label:'The Key Figures',text:'Marozia, the matriarch of the pornocracy. John XII, the boy pope. Otto I of Germany, who marched in and put both crown and discipline on the papacy.',size:'lg'},
    {label:'The Bridge',text:'Here is how the church fell to its lowest point in a millennium — and how reform began, quietly, in a Burgundian monastery called Cluny.',size:'md'},
  ]};
  _track3.lessons[14].articleHtml=M14_ARTICLE_HTML;
  _track3.lessons[14].learn=M14_LEARN;
  _track3.lessons[14].study=M14_STUDY;
  _track3.lessons[14].coldOpen={_bg:'/images/middle-ages/Cluniac.jpeg',cards:[
    {label:'The World Before',text:'Rome has collapsed into the pornocracy. Bishoprics are sold like property. Most parish priests cannot read the Latin Mass they recite.',size:'lg'},
    {label:'The Crisis',text:'The church has become a piece of real estate — owned, inherited, and traded by lay lords. Where can renewal possibly come from?',size:'xl'},
    {label:'The Key Figures',text:'Duke William the Pious, founder of Cluny. Berno, its first abbot. Hugh the Great, who presided over a thousand daughter houses.',size:'lg'},
    {label:'The Bridge',text:'Here is how a single Burgundian valley re-set the moral compass of the medieval church — and seeded the great reforming popes.',size:'md'},
  ]};
  _track3.lessons[15].articleHtml=M15_ARTICLE_HTML;
  _track3.lessons[15].learn=M15_LEARN;
  _track3.lessons[15].study=M15_STUDY;
  _track3.lessons[15].coldOpen={_bg:'/images/middle-ages/licensed-image.jpeg',cards:[
    {label:'The World Before',text:'Kievan Rus is a sprawling pagan principality astride the rivers between the Baltic and the Black Sea. Its prince, a hard warlord, is hunting a religion for his people.',size:'lg'},
    {label:'The Crisis',text:'Four faiths come courting: Islam from the Volga, Judaism from the Khazars, Latin Christianity from the Germans, Byzantine Christianity from Constantinople. Which will Vladimir choose?',size:'xl'},
    {label:'The Key Figures',text:'Vladimir of Kiev, the prince making the choice. His envoys, sent to see each faith. Princess Anna of Byzantium, whose marriage will seal the choice.',size:'lg'},
    {label:'The Bridge',text:'Here is how Vladimir\'s envoys returned from Hagia Sophia and decided the religious future of the Slavic east — for a thousand years.',size:'md'},
  ]};
  _track3.lessons[16].articleHtml=M16_ARTICLE_HTML;
  _track3.lessons[16].learn=M16_LEARN;
  _track3.lessons[16].study=M16_STUDY;
  _track3.lessons[16].coldOpen={_bg:'/images/middle-ages/Schism.jpeg',cards:[
    {label:'The World Before',text:'Seven centuries of drift between Greek east and Latin west — different languages, different liturgies, different politics. One creed, with one disputed clause.',size:'lg'},
    {label:'The Crisis',text:'A Latin cardinal arrives in Constantinople with a charge: the filioque is orthodox. The patriarch refuses to discuss it. The negotiations collapse.',size:'xl'},
    {label:'The Key Figures',text:'Pope Leo IX, who sent the embassy. Cardinal Humbert of Silva Candida, who laid the bull on the altar. Patriarch Michael Cerularius, who returned the anathema.',size:'lg'},
    {label:'The Bridge',text:'Here is the moment the visible unity of the church broke — and has never been restored.',size:'md'},
  ]};
  _track3.lessons[17].articleHtml=M17_ARTICLE_HTML;
  _track3.lessons[17].learn=M17_LEARN;
  _track3.lessons[17].study=M17_STUDY;
  _track3.lessons[17].coldOpen={_bg:'/images/middle-ages/Anselm.jpeg',cards:[
    {label:'The World Before',text:'Western theology has explained the cross for centuries as a ransom paid to the devil — the price God paid to free humanity from Satan\'s claim.',size:'lg'},
    {label:'The Crisis',text:'Why a God-Man? Could God not simply forgive? An Italian monk in Canterbury thinks the explanations of the cross have grown muddled — and dangerous.',size:'xl'},
    {label:'The Key Figures',text:'Anselm of Canterbury — Italian monk, archbishop, philosopher — who will rewire the West\'s account of God\'s existence and the meaning of the atonement.',size:'lg'},
    {label:'The Bridge',text:'Here is how Anselm\'s two short books set the terms for a thousand years of Western theology — the ontological argument, and the satisfaction theory of the cross.',size:'md'},
  ]};
  _track3.lessons[18].articleHtml=M18_ARTICLE_HTML;
  _track3.lessons[18].learn=M18_LEARN;
  _track3.lessons[18].study=M18_STUDY;
  _track3.lessons[18].coldOpen={_bg:'/images/middle-ages/GregoryVII.jpeg',cards:[
    {label:'The World Before',text:'Bishoprics are property. A king hands the bishop his ring and staff — and gets, in return, a loyal vassal. The Cluniac reform has called this disease by its name: lay investiture.',size:'lg'},
    {label:'The Crisis',text:'A reforming pope says: only the church may invest bishops. An emperor says: the church is mine. Who really rules Christendom?',size:'xl'},
    {label:'The Key Figures',text:'Hildebrand, the Cluniac monk who becomes Pope Gregory VII. Emperor Henry IV of Germany, who defies him. And the snow at Canossa where one humbles the other.',size:'lg'},
    {label:'The Bridge',text:'Here is how three days in the snow — and fifty years of struggle that followed — finally settled that the church was not royal property.',size:'md'},
  ]};
  _track3.lessons[19].articleHtml=M19_ARTICLE_HTML;
  _track3.lessons[19].learn=M19_LEARN;
  _track3.lessons[19].study=M19_STUDY;
  _track3.lessons[19].coldOpen={_bg:'/images/middle-ages/Crusades.jpeg',cards:[
    {label:'The World Before',text:'The East–West Schism is fifty years old. The Byzantine emperor is begging Western help against the Seljuk Turks who have overrun Asia Minor.',size:'lg'},
    {label:'The Crisis',text:'Can — should — the church send Christian armies to fight Muslims for control of the Holy Land? A pope answers yes, and tens of thousands sign the cross.',size:'xl'},
    {label:'The Key Figures',text:'Pope Urban II, who called the First Crusade at Clermont. Bernard of Clairvaux, who preached the Second. Saladin, who took Jerusalem back.',size:'lg'},
    {label:'The Bridge',text:'Here is how two centuries of armed pilgrimage reshaped both the church and its relation to the East — and learned that swords cut both ways.',size:'md'},
  ]};
  _track3.lessons[20].articleHtml=M20_ARTICLE_HTML;
  _track3.lessons[20].learn=M20_LEARN;
  _track3.lessons[20].study=M20_STUDY;
  _track3.lessons[20].coldOpen={_bg:'/images/middle-ages/Lombard.jpeg',cards:[
    {label:'The World Before',text:'Anselm has given the West a satisfaction theory of the atonement and a logical argument for God. A new generation of teachers wants to take his method further.',size:'lg'},
    {label:'The Crisis',text:'Can faith stand the questions reason throws at it? Two Parisian masters — one combative, one quiet — will set the terms.',size:'xl'},
    {label:'The Key Figures',text:'Peter Abelard, brilliant and abrasive, testing every doctrine by dialectic. Peter Lombard, Bishop of Paris, building the textbook the next four centuries would learn from.',size:'lg'},
    {label:'The Bridge',text:'Here is how the scholastic method took shape — and how Anselm\'s atonement got its first serious rival.',size:'md'},
  ]};
  _track3.lessons[21].articleHtml=M21_ARTICLE_HTML;
  _track3.lessons[21].learn=M21_LEARN;
  _track3.lessons[21].study=M21_STUDY;
  _track3.lessons[21].coldOpen={_bg:'/images/middle-ages/Waldenses.jpeg',cards:[
    {label:'The World Before',text:'The Cluniac and Investiture reforms have cleaned up the priesthood. The church is still rich, still distant, still in Latin. Crusader armies are marching east.',size:'lg'},
    {label:'The Crisis',text:'A rich merchant of Lyon reads Christ\'s command to the rich young man and decides to obey it. He gives his fortune away, hires translators, and starts preaching in the streets — without permission.',size:'xl'},
    {label:'The Key Figures',text:'Peter Waldo of Lyon, merchant turned preacher. Pope Alexander III at Lateran III, who refused his request. The Waldenses, who would outlive every army sent against them.',size:'lg'},
    {label:'The Bridge',text:'Here is how a layman\'s literal reading of Scripture became Rome\'s first major medieval heresy trial — and the oldest surviving evangelical movement.',size:'md'},
  ]};
  _track3.lessons[22].articleHtml=M22_ARTICLE_HTML;
  _track3.lessons[22].learn=M22_LEARN;
  _track3.lessons[22].study=M22_STUDY;
  _track3.lessons[22].coldOpen={_bg:'/images/middle-ages/FrancisAssisi.jpeg',cards:[
    {label:'The World Before',text:'The Crusades are draining the West. The hierarchy is rich, learned, and remote. Lay reform movements (like the Waldenses) have been driven out of the church.',size:'lg'},
    {label:'The Crisis',text:'A young soldier turned ascetic walks naked out of his father\'s house and asks the pope for permission to live the gospel — literally. Will the church embrace him, or banish him too?',size:'xl'},
    {label:'The Key Figures',text:'Francis of Assisi, son of a cloth merchant, in love with Lady Poverty. Pope Innocent III, who decides to approve rather than condemn.',size:'lg'},
    {label:'The Bridge',text:'Here is the reform that succeeded where the Waldenses were crushed — and reshaped medieval Christianity by simplicity, not power.',size:'md'},
  ]};
  _track3.lessons[23].articleHtml=M23_ARTICLE_HTML;
  _track3.lessons[23].learn=M23_LEARN;
  _track3.lessons[23].study=M23_STUDY;
  _track3.lessons[23].coldOpen={_bg:'/images/middle-ages/MendicantOrders.jpeg',cards:[
    {label:'The World Before',text:'Francis\'s Friars Minor are spreading. The Cathar heresy is sweeping southern France. The old monasteries are wealthy and withdrawn from the cities.',size:'lg'},
    {label:'The Crisis',text:'How will the church reach people in the new urban Europe — and answer the heretics — when the monasteries stay in their cloisters?',size:'xl'},
    {label:'The Key Figures',text:'Dominic of Caleruega, whose Order of Preachers will become the church\'s intellectual elite. The Augustinians and Carmelites, who joined the mendicant wave.',size:'lg'},
    {label:'The Bridge',text:'Here is how begging friars in the streets, the universities, and the confessional reshaped the pastoral life of the medieval church.',size:'md'},
  ]};
  _track3.lessons[24].articleHtml=M24_ARTICLE_HTML;
  _track3.lessons[24].learn=M24_LEARN;
  _track3.lessons[24].study=M24_STUDY;
  _track3.lessons[24].coldOpen={_bg:'/images/middle-ages/Aquinas.jpeg',cards:[
    {label:'The World Before',text:'13th-c. universities are buzzing with newly translated Aristotle. The mendicant orders are reshaping pastoral life. The intellectual question of the age: can pagan philosophy serve Christian theology?',size:'lg'},
    {label:'The Crisis',text:'Aristotle teaches without God. Latin Averroists say his reason contradicts the faith. Are reason and revelation enemies?',size:'xl'},
    {label:'The Key Figures',text:'Albertus Magnus, who first taught Aristotle in the Christian schools. Thomas Aquinas, his Dominican student, who would build the greatest synthesis of the medieval mind.',size:'lg'},
    {label:'The Bridge',text:'Here is the book that ordered Catholic theology for seven centuries — and the line "grace does not destroy nature, but perfects it."',size:'md'},
  ]};
  _track3.lessons[25].articleHtml=M25_ARTICLE_HTML;
  _track3.lessons[25].learn=M25_LEARN;
  _track3.lessons[25].study=M25_STUDY;
  _track3.lessons[25].coldOpen={_bg:'/images/middle-ages/Anignon.jpeg',cards:[
    {label:'The World Before',text:'The high medieval papacy is at the height of its claims. The kings of France and England no longer fear it. The mendicant orders are everywhere; Aquinas has just died.',size:'lg'},
    {label:'The Crisis',text:'Boniface VIII makes the most extreme papal claim ever — and a French king sends thugs after the elderly pope. The papacy will not recover.',size:'xl'},
    {label:'The Key Figures',text:'Boniface VIII, who overreached. Philip IV of France, who broke him. Clement V, the first French pope of the Avignon line.',size:'lg'},
    {label:'The Bridge',text:'Here is how the papacy fell into France\'s lap for seventy years — and emerged into a century of schism.',size:'md'},
  ]};
  _track3.lessons[26].articleHtml=M26_ARTICLE_HTML;
  _track3.lessons[26].learn=M26_LEARN;
  _track3.lessons[26].study=M26_STUDY;
  _track3.lessons[26].coldOpen={_bg:'/images/middle-ages/CatherineSiena.jpeg',cards:[
    {label:'The World Before',text:'For seventy years the popes have ruled from Avignon, taxing all Europe. Christendom is sick of it.',size:'lg'},
    {label:'The Crisis',text:'A young Italian mystic writes to the pope at Avignon: come back. He does. Then he dies — and the cardinals elect two popes, then three.',size:'xl'},
    {label:'The Key Figures',text:'Catherine of Siena, the mystic. Gregory XI, who returned the papacy to Rome. Urban VI and Clement VII, the rival popes.',size:'lg'},
    {label:'The Bridge',text:'Here is the great public scandal that broke the medieval papal claim — and the Council of Constance that finally healed it.',size:'md'},
  ]};
  _track3.lessons[27].articleHtml=M27_ARTICLE_HTML;
  _track3.lessons[27].learn=M27_LEARN;
  _track3.lessons[27].study=M27_STUDY;
  _track3.lessons[27].coldOpen={_bg:'/images/middle-ages/Wycliffe.jpeg',cards:[
    {label:'The World Before',text:'Three popes are cursing one another. The English church is wealthy, distant, in Latin. An Oxford theologian decides Scripture, not the pope, should be the rule.',size:'lg'},
    {label:'The Crisis',text:'Can the church be reformed by appeal to Scripture alone — over the head of pope and council? Wycliffe says yes.',size:'xl'},
    {label:'The Key Figures',text:'John Wycliffe, the Oxford theologian. His Lollards, who carried his English Bible across England.',size:'lg'},
    {label:'The Bridge',text:'Here is the "Morning Star" of the Reformation — preaching a century before Luther, condemned at Constance, and exhumed and burned to make the point.',size:'md'},
  ]};
  _track3.lessons[28].articleHtml=M28_ARTICLE_HTML;
  _track3.lessons[28].learn=M28_LEARN;
  _track3.lessons[28].study=M28_STUDY;
  _track3.lessons[28].coldOpen={_bg:'/images/middle-ages/Florence.jpeg',cards:[
    {label:'The World Before',text:'The Schism is healed, but the late medieval church is exhausted. New universities are flowering. Greek scholars are fleeing Ottoman pressure.',size:'lg'},
    {label:'The Crisis',text:'For a thousand years Latin Christendom has read the Bible in Latin. What happens when scholars open it in Greek and Hebrew again?',size:'xl'},
    {label:'The Key Figures',text:'Geert Groote and the Brethren of the Common Life. Thomas à Kempis. Erasmus of Rotterdam — and his 1516 Greek New Testament.',size:'lg'},
    {label:'The Bridge',text:'Here is the recovery of the original languages — ad fontes — that put the Greek New Testament into Luther\'s hands a year before the 95 Theses.',size:'md'},
  ]};
  _track3.lessons[29].articleHtml=M29_ARTICLE_HTML;
  _track3.lessons[29].learn=M29_LEARN;
  _track3.lessons[29].study=M29_STUDY;
  _track3.lessons[29].coldOpen={_bg:'/images/middle-ages/JanHus.jpeg',cards:[
    {label:'The World Before',text:'Wycliffe is dead; his bones soon to be burned. His teaching has spread through Czech students who studied at Oxford. Bohemia is restive.',size:'lg'},
    {label:'The Crisis',text:'A Bohemian priest preaches Wycliffe to the Czechs in their own language. Summoned to Constance under imperial safe conduct, he goes — and is arrested.',size:'xl'},
    {label:'The Key Figures',text:'Jan Huss, the Bohemian preacher. Emperor Sigismund, who broke his safe conduct. The Council of Constance, which burned him.',size:'lg'},
    {label:'The Bridge',text:'Here is how a stake outside Constance — and a final reported prophecy about a goose and a swan — set the table for Luther a century later.',size:'md'},
  ]};
  _track3.lessons[30].articleHtml=M30_ARTICLE_HTML;
  _track3.lessons[30].learn=M30_LEARN;
  _track3.lessons[30].study=M30_STUDY;
  _track3.lessons[30].coldOpen={_bg:'/images/middle-ages/Savonarola.jpeg',cards:[
    {label:'The World Before',text:'The Borgia pope sits in Rome. The Medici have fallen in Florence. Renaissance Italy is at the height of its wealth — and its depravity.',size:'lg'},
    {label:'The Crisis',text:'A Dominican friar preaches doom in the cathedral of Florence — and the city listens. He becomes its spiritual ruler. He denounces the pope. The pope strikes back.',size:'xl'},
    {label:'The Key Figures',text:'Girolamo Savonarola, the Dominican preacher. Pope Alexander VI — Rodrigo Borgia — whom he denounced.',size:'lg'},
    {label:'The Bridge',text:'Here is the final reformer-before-the-Reformation — hanged in Florence\'s main square nineteen years before Luther posted his Theses.',size:'md'},
  ]};
}
