// Track 1 — Survey of Church History (L1–L4)
// Lesson content (essay HTML, fill-in-the-blank "learn", "study" cards, and cold-open intros).
// Pure data + wiring extracted from main.js — no app logic lives here.

export const L1_LEARN=[
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

export const L2_LEARN=[
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

export const L3_LEARN=[
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

export const L4_LEARN=[
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

export const L1_STUDY={
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

export const L2_STUDY={
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

export const L3_STUDY={
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

export const L4_STUDY={
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

export const L1_ARTICLE_HTML=`
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
  <img src="/images/paul-journeys.png"
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
  <div class="fig-img-wrap"><img src="/images/polycarp.jpg" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block;"></div>
  <div class="fig-body">
    <div class="fig-label">Martyrdom · c. AD 155</div>
    <div class="fig-title">Polycarp of Smyrna</div>
    <div class="fig-desc">Bishop of Smyrna and disciple of the Apostle John, burned alive at age 86 after refusing to renounce Christ. His martyrdom is one of the earliest and most detailed accounts of a Christian execution outside the New Testament.</div>
  </div>
</figure>

<p>Out of persecution came theology. Thinkers called the Apologists — Justin Martyr, <strong>Tertullian</strong>, Origen — wrote sophisticated defenses of Christianity. Tertullian of Carthage coined the word <em>Trinitas</em> (Trinity) and the formula "one substance, three persons," effectively inventing Western theological vocabulary. His famous line: "The blood of the martyrs is the seed of the church."</p>

</div>`;

export const L2_ARTICLE_HTML=`
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
  <div class="fig-img-wrap"><img src="/images/constantine.jpg" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block;"></div>
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
  <div class="fig-img-wrap" style="min-height:240px;"><img src="/images/nicaea.jpg" style="width:100%;max-height:360px;object-fit:cover;display:block;"></div>
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

export const L3_ARTICLE_HTML=`
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
  <div class="fig-img-wrap" style="min-height:220px;"><img src="/images/hagia-sophia.jpg" style="width:100%;max-height:360px;object-fit:cover;display:block;"></div>
  <figcaption><strong>Hagia Sophia, Constantinople</strong> Built by Emperor Justinian (532–537), the greatest church in Christendom for nearly a thousand years — the spiritual heart of Eastern Orthodox Christianity until the Ottoman conquest of 1453.</figcaption>
</figure>

<!-- Aquinas -->
<figure class="art-fig portrait">
  <div class="fig-img-wrap"><img src="/images/aquinas.jpg" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block;"></div>
  <div class="fig-body">
    <div class="fig-label">Theologian · 1225–1274</div>
    <div class="fig-title">Thomas Aquinas</div>
    <div class="fig-desc">Aquinas wrote the Summa Theologica — over 1.5 million words synthesizing Aristotelian philosophy with Christian theology. Near death he called it all "straw" compared to what he had seen in contemplation.</div>
  </div>
</figure>

<p>Great thinkers defined this era. <strong>Anselm of Canterbury</strong> (1033–1109) developed the satisfaction theory of atonement. <strong>Thomas Aquinas</strong> (1225–1274) synthesized Aristotelian philosophy with Christian theology in the massive Summa Theologica. Near death, after a mystical experience, he described his entire life's work as "straw."</p>
<p>The era also produced reform movements that anticipated the Reformation. In England, <strong>John Wycliffe</strong> translated the Bible into English and attacked papal authority, influencing the Bohemian priest <strong>Jan Hus</strong>, who was burned at the Council of Constance in 1415 despite a promise of safe conduct — an act of treachery that set Bohemia ablaze.</p>

</div>`;

export const L4_ARTICLE_HTML=`
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
  <div class="fig-img-wrap"><img src="/images/luther.jpg" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block;"></div>
  <div class="fig-body">
    <div class="fig-label">Reformer · 1483–1546</div>
    <div class="fig-title">Martin Luther</div>
    <div class="fig-desc">Luther's 95 Theses (1517) ignited the Protestant Reformation. Summoned before Emperor Charles V at the Diet of Worms in 1521, he refused to recant: "Here I stand; I can do no other."</div>
  </div>
</figure>

<p class="lead"><span class="smc">On October 31, 1517,</span> an Augustinian monk named <strong>Martin Luther</strong> published 95 theses against the sale of indulgences. The printing press turned what might have been an academic dispute into a continent-wide crisis. Luther was summoned to the Diet of Worms in 1521, where he refused to recant before Emperor Charles V. While in hiding at Wartburg Castle, he translated the New Testament into German.</p>

<!-- Calvin -->
<figure class="art-fig portrait">
  <div class="fig-img-wrap"><img src="/images/calvin.png" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block;"></div>
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
  <div class="fig-img-wrap"><img src="/images/spurgeon.jpg" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block;"></div>
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

export function attachSurveyContent(TRACKS) {
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
}
