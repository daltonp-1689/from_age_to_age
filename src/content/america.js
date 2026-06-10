// Track 5 — History of the Church in America (A1–A32)
// Lesson content (essay HTML, fill-in-the-blank "learn", "study" cards, and cold-open intros).
// Pure data + wiring extracted from main.js — no app logic lives here.

export const A1_LEARN=[
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

export const A2_LEARN=[
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

export const A3_LEARN=[
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

export const A4_LEARN=[
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

export const A5_LEARN=[
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

export const A6_LEARN=[
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

export const A1_STUDY={
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

export const A2_STUDY={
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

export const A3_STUDY={
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

export const A4_STUDY={
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

export const A5_STUDY={
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

export const A6_STUDY={
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

export const A1_ARTICLE_HTML=`
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

export const A2_ARTICLE_HTML=`
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

export const A3_ARTICLE_HTML=`
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

export const A4_ARTICLE_HTML=`
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

export const A5_ARTICLE_HTML=`
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

export const A6_ARTICLE_HTML=`
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

export const A7_LEARN=[
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

export const A8_LEARN=[
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

export const A9_LEARN=[
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

export const A10_LEARN=[
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

export const A11_LEARN=[
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

export const A12_LEARN=[
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

export const A7_STUDY={
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

export const A8_STUDY={
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

export const A9_STUDY={
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

export const A10_STUDY={
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

export const A11_STUDY={
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

export const A12_STUDY={
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

export const A7_ARTICLE_HTML=`
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

export const A8_ARTICLE_HTML=`
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

export const A9_ARTICLE_HTML=`
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

export const A10_ARTICLE_HTML=`
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

export const A11_ARTICLE_HTML=`
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

export const A12_ARTICLE_HTML=`
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

export const A13_LEARN=[
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

export const A14_LEARN=[
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

export const A15_LEARN=[
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

export const A16_LEARN=[
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

export const A17_LEARN=[
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

export const A18_LEARN=[
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

export const A19_LEARN=[
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

export const A20_LEARN=[
  {sentence:'Dwight L. Moody was a Chicago _____ salesman turned evangelist.',answer:'shoe',options:['shoe','book','dry goods','hardware'],explanation:'He had no formal theological training.',tier:1},
  {sentence:'Moody pioneered the modern urban _____ with singer Ira Sankey.',answer:'crusade',options:['crusade','revival','meeting','campaign'],explanation:'They rented large halls, used choirs, and organized local churches.',tier:1},
  {sentence:'Moody and Sankey\'s British campaigns ran from 1873 to _____.',answer:'1875',options:['1875','1877','1880','1871'],explanation:'They drew enormous crowds and made Moody internationally famous.',tier:1},
  {sentence:'Moody\'s message was simpler and warmer, preaching a God of _____ more than judgment.',answer:'love',options:['love','grace','mercy','peace'],explanation:'This distinguished his tone from Finney\'s more confrontational approach.',tier:1},
  {sentence:'Moody founded the Moody Bible Institute in Chicago in _____.',answer:'1886',options:['1886','1875','1880','1890'],explanation:'It trained lay workers and evangelists.',tier:1},
];

export const A21_LEARN=[
  {sentence:'The Social Gospel argued the gospel had implications for _____ as well as souls.',answer:'society',options:['society','families','nations','communities'],explanation:'It extended Christian concern from individual salvation to social justice.',tier:1},
  {sentence:'Washington Gladden was a _____ minister who defended workers\' rights.',answer:'Congregational',options:['Congregational','Methodist','Baptist','Presbyterian'],explanation:'He was among the first prominent ministers to support labor unions.',tier:1},
  {sentence:'Walter Rauschenbusch ministered for eleven years in the _____ Kitchen neighborhood of New York.',answer:'Hell\'s',options:['Hell\'s','Five Points\'','East','Clinton\'s'],explanation:'His experience with urban poverty shaped his theology.',tier:1},
  {sentence:'Rauschenbusch published Christianity and the Social _____ in 1907.',answer:'Crisis',options:['Crisis','Order','Problem','Question'],explanation:'It became the defining text of the Social Gospel movement.',tier:1},
  {sentence:'Rauschenbusch\'s term for sin embedded in unjust institutions was "social _____."',answer:'sin',options:['sin','evil','wrong','failure'],explanation:'It extended the concept of sin beyond individual moral failure.',tier:1},
  {sentence:'The Social Gospel produced the Federal Council of Churches in _____.',answer:'1908',options:['1908','1910','1900','1905'],explanation:'It united mainline denominations for cooperative social action.',tier:1},
];

export const A22_LEARN=[
  {sentence:'The Azusa Street revival began on April 9, _____.',answer:'1906',options:['1906','1901','1910','1904'],explanation:'A prayer group in Los Angeles began speaking in tongues.',tier:1},
  {sentence:'The Azusa Street Mission was located at 312 Azusa Street in _____.',answer:'Los Angeles',options:['Los Angeles','San Francisco','Chicago','Houston'],explanation:'The old stable became a revival center for three years.',tier:1},
  {sentence:'The Azusa Street Mission operated in an abandoned _____.',answer:'stable',options:['stable','warehouse','church','schoolhouse'],explanation:'It was an unlikely setting for what became a world-changing revival.',tier:1},
  {sentence:'The revival was led by William J. _____.',answer:'Seymour',options:['Seymour','Parham','Bartleman','Durham'],explanation:'A one-eyed Black preacher from Louisiana.',tier:1},
  {sentence:'Seymour had learned his theology of Spirit baptism from Charles _____.',answer:'Parham',options:['Parham','Price','Boddy','Mason'],explanation:'Parham first connected tongues with Spirit baptism in Kansas in 1901.',tier:1},
  {sentence:'Pentecostalism\'s defining doctrine is that Spirit baptism is evidenced by speaking in _____.',answer:'tongues',options:['tongues','prophecy','prayer','healing'],explanation:'This is called glossolalia.',tier:1},
];

export const A23_LEARN=[
  {sentence:'By 1910, conservative Protestants felt besieged by higher biblical _____.',answer:'criticism',options:['criticism','scholarship','liberalism','academia'],explanation:'It treated the Bible as a historical document subject to scholarly analysis.',tier:1},
  {sentence:'Two wealthy California _____ men funded The Fundamentals.',answer:'oil',options:['oil','railroad','banking','timber'],explanation:'Lyman and Milton Stewart of Union Oil Company paid for the project.',tier:1},
  {sentence:'The Fundamentals consisted of _____ essays published between 1910 and 1915.',answer:'ninety',options:['ninety','twelve','fifty','twenty-four'],explanation:'They covered core Protestant doctrines.',tier:1},
  {sentence:'The essays were mailed free to every pastor, missionary, and theology _____ in America.',answer:'student',options:['student','professor','doctor','bishop'],explanation:'This mass distribution gave the movement enormous reach.',tier:1},
  {sentence:'The Fundamentals defended the virgin birth, the physical resurrection, and Scripture\'s _____.',answer:'inerrancy',options:['inerrancy','authority','inspiration','sufficiency'],explanation:'These were the core doctrines under attack from modernism.',tier:1},
  {sentence:'The term "fundamentalist" was coined in _____ by Baptist editor Curtis Lee Laws.',answer:'1920',options:['1920','1910','1915','1925'],explanation:'He described those ready for "battle royal" for the faith.',tier:1},
];

export const A24_LEARN=[
  {sentence:'Harry Emerson Fosdick\'s 1922 sermon was titled "Shall the Fundamentalists _____?"',answer:'Win',options:['Win','Divide','Leave','Rule'],explanation:'It directly challenged fundamentalist influence in mainline denominations.',tier:1},
  {sentence:'Fosdick argued modern believers should reinterpret doctrines in the light of modern _____.',answer:'knowledge',options:['knowledge','tradition','authority','revelation'],explanation:'He represented the modernist approach to theology.',tier:1},
  {sentence:'Fosdick was a _____ preaching at a Presbyterian church in New York.',answer:'Baptist',options:['Baptist','Methodist','Congregationalist','Lutheran'],explanation:'He was a guest preacher at First Presbyterian Church.',tier:1},
  {sentence:'The Presbyterian establishment forced Fosdick to _____.',answer:'resign',options:['resign','recant','leave New York','publish a retraction'],explanation:'His liberal theology was incompatible with Presbyterian confessional standards.',tier:1},
  {sentence:'Machen published Christianity and _____ in 1923.',answer:'Liberalism',options:['Liberalism','Modernism','Culture','Doubt'],explanation:'It became the most rigorous conservative response to modernism.',tier:1},
  {sentence:'Machen argued liberalism was not a revised Christianity but an entirely _____ religion.',answer:'different',options:['different','secular','modern','human'],explanation:'This was a sharper claim than most conservatives made.',tier:1},
];

export const A25_LEARN=[
  {sentence:'In 1925 Tennessee passed the _____ Act, banning the teaching of human evolution.',answer:'Butler',options:['Butler','Bryan','Davidson','Tennessee'],explanation:'It made it illegal to teach any theory denying divine creation.',tier:1},
  {sentence:'John _____ was recruited as a teacher to test the Butler Act.',answer:'Scopes',options:['Scopes','Darrow','Bryan','Mencken'],explanation:'He was a high school teacher in Dayton, Tennessee.',tier:1},
  {sentence:'William Jennings _____ argued for the prosecution.',answer:'Bryan',options:['Bryan','Darrow','Stewart','McKenzie'],explanation:'He was a three-time presidential candidate and populist hero.',tier:1},
  {sentence:'Clarence _____ cross-examined Bryan on his literal reading of Genesis.',answer:'Darrow',options:['Darrow','Mencken','Malone','Hays'],explanation:'The cross-examination became one of the most famous courtroom scenes in American history.',tier:1},
  {sentence:'Scopes was convicted and fined _____ dollars.',answer:'one hundred',options:['one hundred','fifty','five hundred','one thousand'],explanation:'The conviction was later overturned on a technicality.',tier:1},
  {sentence:'Bryan died _____ days after the trial ended.',answer:'five',options:['five','ten','thirty','two'],explanation:'He died in his sleep in Dayton on July 26, 1925.',tier:1},
];

export const A26_LEARN=[
  {sentence:'The Social Gospel rested on an _____ view of human nature.',answer:'optimistic',options:['optimistic','pessimistic','realistic','neutral'],explanation:'It believed education and reform could perfect society — shattered by WWI.',tier:1},
  {sentence:'The carnage of World War _____ shattered liberal optimism in Europe.',answer:'I',options:['I','II','III','IV'],explanation:'The trenches made the idea of inevitable human progress theologically impossible.',tier:1},
  {sentence:'Karl Barth was a _____ Reformed pastor.',answer:'Swiss',options:['Swiss','German','French','Dutch'],explanation:'He watched his German liberal theology professors support the Kaiser\'s war.',tier:1},
  {sentence:'Barth concluded liberal theology had made God in _____ image.',answer:"humanity's",options:["humanity's",'nature\'s','reason\'s','culture\'s'],explanation:'Liberal theology identified God with human culture — Barth said this was idolatry.',tier:1},
  {sentence:'Barth\'s 1919 commentary on _____ announced his new theology.',answer:'Romans',options:['Romans','Galatians','John','Genesis'],explanation:'The Epistle to the Romans was a theological bombshell in postwar Europe.',tier:1},
  {sentence:'Reinhold Niebuhr developed what he called "Christian _____."',answer:'Realism',options:['Realism','Optimism','Socialism','Nationalism'],explanation:'Christian Realism applied the doctrine of original sin to politics and group behavior.',tier:1},
];

export const A27_LEARN=[
  {sentence:'Neo-evangelicals were dissatisfied with fundamentalism\'s _____ and intellectual withdrawal.',answer:'separatism',options:['separatism','pacifism','legalism','sectarianism'],explanation:'They wanted to re-engage culture and scholarship rather than withdraw.',tier:1},
  {sentence:'Neo-evangelicals formed the National Association of _____ in 1942.',answer:'Evangelicals',options:['Evangelicals','Churches','Christians','Protestants'],explanation:'The NAE was a moderate alternative to both separatist and liberal coalitions.',tier:1},
  {sentence:'Carl F. H. Henry published The Uneasy Conscience of Modern Fundamentalism in _____.',answer:'1947',options:['1947','1942','1952','1955'],explanation:'It charged fundamentalism with abandoning social concern along with liberalism.',tier:1},
  {sentence:'Fuller Theological Seminary was founded in 1947 in _____, California.',answer:'Pasadena',options:['Pasadena','Los Angeles','San Francisco','San Diego'],explanation:'It combined conservative doctrine with serious scholarship.',tier:1},
  {sentence:'Billy Graham burst onto the national scene at his 1949 _____ crusade.',answer:'Los Angeles',options:['Los Angeles','New York','Chicago','Houston'],explanation:'Hearst\'s newspapers gave Graham overnight national coverage.',tier:1},
  {sentence:'Graham\'s 1957 New York crusade drew over _____ million people.',answer:'two',options:['two','one','three','five'],explanation:'It ran sixteen weeks at Madison Square Garden.',tier:1},
];

export const A28_LEARN=[
  {sentence:'The Civil Rights Movement was organized primarily through the _____ church.',answer:'Black',options:['Black','Methodist','Baptist','Presbyterian'],explanation:'Church sanctuaries, networks, and clergy leadership formed the movement\'s backbone.',tier:1},
  {sentence:'The Southern Christian Leadership Conference was founded in _____.',answer:'1957',options:['1957','1955','1960','1963'],explanation:'It was led by Black Baptist and Methodist ministers.',tier:1},
  {sentence:'Martin Luther King Jr. held a doctorate in systematic _____ from Boston University.',answer:'theology',options:['theology','philosophy','ethics','history'],explanation:'He earned it in 1955, the year of the Montgomery Bus Boycott.',tier:1},
  {sentence:'King drew on Gandhi\'s _____ resistance.',answer:'nonviolent',options:['nonviolent','passive','armed','civil'],explanation:'He adapted Gandhi\'s methods to the American context.',tier:1},
  {sentence:'The church provided mass meetings in _____, training, and moral authority.',answer:'sanctuaries',options:['sanctuaries','schools','courthouses','universities'],explanation:'The church building was the movement\'s organizational home.',tier:1},
  {sentence:'King was assassinated on April 4, _____.',answer:'1968',options:['1968','1963','1965','1970'],explanation:'He was killed in Memphis, Tennessee.',tier:1},
];

export const A29_LEARN=[
  {sentence:'The Second Vatican Council ran from 1962 to _____.',answer:'1965',options:['1965','1963','1966','1970'],explanation:'It was the most significant Catholic event since the Reformation.',tier:1},
  {sentence:'Vatican II was convened by Pope John _____.',answer:'XXIII',options:['XXIII','Paul VI','Pius XII','Benedict XVI'],explanation:'He called it as an aggiornamento — a bringing up to date.',tier:1},
  {sentence:'John XXIII called the Council an _____ — a bringing up to date.',answer:'aggiornamento',options:['aggiornamento','reformation','renewal','ressourcement'],explanation:'He wanted the Church to open its windows to the modern world.',tier:1},
  {sentence:'The Council replaced the Latin liturgy with worship in the _____.',answer:'vernacular',options:['vernacular','Greek','English','national language'],explanation:'Catholics now heard Mass in their own language.',tier:1},
  {sentence:'John F. _____ was elected the first Catholic president in 1960.',answer:'Kennedy',options:['Kennedy','Johnson','McCarthy','Eisenhower'],explanation:'His election signaled Catholics\' full arrival into the American mainstream.',tier:1},
  {sentence:'After Vatican II, thousands of priests and _____ left religious life.',answer:'nuns',options:['nuns','deacons','monks','bishops'],explanation:'The post-conciliar era saw dramatic declines in religious vocations.',tier:1},
];

export const A30_LEARN=[
  {sentence:'After the Scopes Trial, conservative Protestants largely _____ from national politics.',answer:'withdrew',options:['withdrew','engaged','dominated','reformed'],explanation:'They built a separate subculture and disengaged from the public square.',tier:1},
  {sentence:'School prayer was removed from public schools in _____.',answer:'1962',options:['1962','1973','1954','1968'],explanation:'The Supreme Court\'s Engel v. Vitale decision banned state-sponsored school prayer.',tier:1},
  {sentence:'The IRS threatened to revoke the tax-exempt status of _____ Christian academies in 1978.',answer:'segregated',options:['segregated','liberal','charismatic','independent'],explanation:'This threat directly mobilized the Religious Right.',tier:1},
  {sentence:'Jerry Falwell Sr. was a Baptist pastor in _____, Virginia.',answer:'Lynchburg',options:['Lynchburg','Richmond','Roanoke','Norfolk'],explanation:'He founded Thomas Road Baptist Church there.',tier:1},
  {sentence:'Falwell founded the Moral _____ in 1979.',answer:'Majority',options:['Majority','Coalition','Alliance','Movement'],explanation:'It became the flagship organization of the Religious Right.',tier:1},
  {sentence:'The Moral Majority helped deliver evangelical votes to Ronald _____ in 1980.',answer:'Reagan',options:['Reagan','Nixon','Ford','Bush'],explanation:'It was a decisive shift in evangelical political alignment.',tier:1},
];

export const A31_LEARN=[
  {sentence:'A megachurch is a congregation of _____ thousand or more regular attendees.',answer:'two',options:['two','five','ten','one'],explanation:'The standard sociological threshold for a megachurch.',tier:1},
  {sentence:'Megachurches drew on marketing, seeker-sensitive worship, and _____ group infrastructure.',answer:'small',options:['small','large','house','cell'],explanation:'Small groups provided pastoral care at massive scale.',tier:1},
  {sentence:'Saddleback Community Church, a pioneering megachurch, is located in _____.',answer:'California',options:['California','Illinois','Texas','Florida'],explanation:'Founded by Rick Warren in Orange County.',tier:1},
  {sentence:'Americans identifying with no religion are called the "_____."',answer:'Nones',options:['Nones','Secular','Agnostics','Unchurched'],explanation:'They check "none" on religious affiliation surveys.',tier:1},
  {sentence:'The Nones rose from roughly 5% in 1970 to over _____ % by the 2020s.',answer:'25',options:['25','10','15','20'],explanation:'The rise makes the unaffiliated the largest single "religious" category in America.',tier:1},
  {sentence:'The decline was steepest among _____ Protestants and American Catholics.',answer:'mainline',options:['mainline','evangelical','Pentecostal','Baptist'],explanation:'They saw the sharpest drops in affiliation and attendance.',tier:1},
];

export const A32_LEARN=[
  {sentence:'Over _____ evangelical scholars gathered in Chicago in 1978 to define inerrancy.',answer:'300',options:['300','100','500','1,000'],explanation:'The broad coalition gave the Statement institutional weight.',tier:1},
  {sentence:'_____ Theological Seminary had quietly moved away from strict inerrancy, helping trigger the Chicago Statement.',answer:'Fuller',options:['Fuller','Princeton','Dallas','Westminster'],explanation:'Fuller\'s drift was one of the direct triggers for the Chicago Statement.',tier:1},
  {sentence:'The Chicago Statement defined Scripture as without error in all that it _____.',answer:'affirms',options:['affirms','contains','records','intends'],explanation:'The precise wording — "all that it affirms" — was carefully chosen.',tier:1},
  {sentence:'The Chicago Statement applied inerrancy to Scripture\'s original _____.',answer:'manuscripts',options:['manuscripts','translations','editions','copies'],explanation:'Also called autographs — no original manuscripts survive.',tier:1},
  {sentence:'Robert _____ launched the Jesus Seminar in 1985.',answer:'Funk',options:['Funk','Borg','Crossan','Ehrman'],explanation:'Funk was a New Testament scholar who wanted to reach a popular audience.',tier:1},
  {sentence:'The Jesus Seminar voted on Jesus\'s sayings using colored _____.',answer:'beads',options:['beads','ballots','cards','tokens'],explanation:'Red meant authentic; black meant inauthentic.',tier:1},
];

export const A13_STUDY={
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

export const A14_STUDY={
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

export const A15_STUDY={
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

export const A16_STUDY={
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

export const A17_STUDY={
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

export const A18_STUDY={
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

export const A19_STUDY={
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

export const A20_STUDY={
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

export const A21_STUDY={
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

export const A22_STUDY={
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

export const A23_STUDY={
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

export const A24_STUDY={
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

export const A25_STUDY={
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

export const A26_STUDY={
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

export const A27_STUDY={
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

export const A28_STUDY={
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

export const A29_STUDY={
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

export const A30_STUDY={
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

export const A31_STUDY={
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

export const A32_STUDY={
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

export const A13_ARTICLE_HTML=`
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

export const A14_ARTICLE_HTML=`
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

export const A15_ARTICLE_HTML=`
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

export const A16_ARTICLE_HTML=`
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

export const A17_ARTICLE_HTML=`
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

export const A18_ARTICLE_HTML=`
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

export const A19_ARTICLE_HTML=`
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

export const A20_ARTICLE_HTML=`
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

export const A21_ARTICLE_HTML=`
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

export const A22_ARTICLE_HTML=`
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

export const A23_ARTICLE_HTML=`
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

export const A24_ARTICLE_HTML=`
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

export const A25_ARTICLE_HTML=`
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

export const A26_ARTICLE_HTML=`
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

export const A27_ARTICLE_HTML=`
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

export const A28_ARTICLE_HTML=`
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

export const A29_ARTICLE_HTML=`
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

export const A30_ARTICLE_HTML=`
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

export const A32_ARTICLE_HTML=`
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

export const A31_ARTICLE_HTML=`
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

export function attachAmericaContent(TRACKS) {
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
}
