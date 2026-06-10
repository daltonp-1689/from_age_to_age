// Track 6 — Introduction to Church History (I1–I10)
// Lesson content (essay HTML, fill-in-the-blank "learn", "study" cards, and cold-open intros).
// Pure data + wiring extracted from main.js — no app logic lives here.

export const I1_LEARN=[
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

export const I1_ARTICLE_HTML=`
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

export const I2_LEARN=[
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

export const I2_ARTICLE_HTML=`
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

export const I3_LEARN=[
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

export const I3_ARTICLE_HTML=`
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

export const I4_LEARN=[
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

export const I4_ARTICLE_HTML=`
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

export const I5_LEARN=[
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

export const I5_ARTICLE_HTML=`
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

export const I6_LEARN=[
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

export const I6_ARTICLE_HTML=`
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

export const I7_LEARN=[
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

export const I7_ARTICLE_HTML=`
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

export const I8_LEARN=[
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

export const I8_ARTICLE_HTML=`
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

export const I9_LEARN=[
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

export const I9_ARTICLE_HTML=`
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

export const I10_LEARN=[
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

export const I10_ARTICLE_HTML=`
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

export function attachIntroContent(TRACKS) {
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
}
