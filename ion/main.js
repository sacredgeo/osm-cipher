
/* alphabet without symbols
let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ "
let r = 
["YLBFSM GQCXHVEWPNJUTDAIKOZR", 
 "MXBDAQNOWRFIYCKJEZU PVSLTGH", 
 "UGLDN BXCESAOWKQFVIZHYMTPRJ", 
 "OW HYPCEFIZLUDQXMAGVBTKJRSN",
 "XVYAHSRILJFZNCWOMG UDQTEKBP", 
 "PNWDSCBHZOTIVFEMYGLKJUQRA X", 
 "QCH NPEABUTODVWXYSLMJGIRFKZ", 
 "DMJLQNPHOSGEXABUIFVYKR CZWT",
 "JPTAX HWDRZIKQUFSMLGNOYECVB", 
 "VFGDJHZONWLE KTBYISUMXCARPQ", 
 "SBXDE TGJKILRACYVUQZNWFPHMO", 
 "IKSVOWHDUMPGY QAJNLZTCXREBF"]
 */
 
 
//character set
//"ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz0123456789!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåçèéêëìíîïðñòóôõö÷øùúûüýþÿ"

//define rotors in array
/*
 let r = 
 ["6‡t¨äÎ²2Ÿ÷¾&k[˜F¦Â ÔÇdQ¯bê*©‘×”|–Ñ)^c4e8Ì‹K<öÜ«nõ.íÆŒ´Ý\\®åºGEèÙwHj½LhlZÄ`%ñ•9Û£É'ÊÞa51/RO¤¹ÿ¢NøÅAWœgŠá;Õ>€Ò¿¶}§séÀ?(ÐðX¡+üçÏŽ·J=°“!\"i‰-—ú3@µ{‚ª¥róþß›0Ixò„M³ëDv¼f#VãPÈm:]îTžâ†ƒqýï¸7ÁÚàYË$yØB,zSù~…ìôû_Í’š±pU™ˆ¬uÖC»oÓ", 
  "(|vcÔQÌÜù®xÕÒZIØ§8ÑÉYëÓ™/~ñ¬7+GaÝÚÀRPÁ`·ÞHOð£pU9Œ3k¦øVõ\"ÖM¥¹“«¢Dä[öo¡—ì.¿”ŠÄf¤Â¾åºiW¯,>qsg#SßrCÛ¶Å)°²œnšL˜J&àž‹Êé@»ƒ–û6*{•ÍúóˆÆAXÈ½1 ‰â¨ª‘÷…;<-eý^d†:4ô0yòÇ³‡áïB!_Ùt’‚NËw„?€ÿŸ¸5%'ãþ$ç¼j=}]2hT´îÐí\\êz±ŽèÎFüÏ©bulµ×›KEm", 
  "öÅmëN¤vê{ž¼kjyŸS‰€µYEâšHìC<X;˜º'ÀqŒÿézQýÝ5¾¹~(2§±’l¡ŠVß1•÷£õÇnOo`Õ”ªPÊKŽMÆ‡rÜ|ÁÐu¢¯»åÛ²h>4û¦A—+ô#I*ˆW´ËÓfáø}x“Ôte¸¶Ì™@dsú$ïÖGü¿„°ù½ðR8óiÙc.àÒòB…«paØ6ñbJF†ÞZÎ¥\\©0–¬ç¨!DÄ3,ÂîÉ7wT=]ÏU\"œãL·?g9Ñ&‘^ä³Ú‚Í [:/í-‹)þèÈ›ƒ×_®%", 
  ":©Ä¢$nçAd— Ž¸ƒä†}c»È«‡ªåÆÍsÛ˜i<”¼íh§Â(j¯–X²¹x·ÉºÞM@!ÊB`Ç2RvÀleÑÝˆß÷o¤~#VãzŒ×PŸaî7¦òÒ)*‘›ÁýZfµ3\\ÿwGètë¡®£ðÏ9’¶âÌ0™,{‚TJùk…¿UØQ>à6Ô€½5žL\"õìmó¾?bN;'ÐrO“é.³öuïK8þ´û‰%|FyøËô4Yá+_úÖÜ/]¨ñqp[•ŠÚSWÕ¬D°g&^H±EÙÎÓCš¥ÅœI=-‹ê1ü„",
  "Úc\"4Aó$Í5€ÿ¢úDþC~3ÇŒ°21¥ë!Tør\\7Ý¸Ev¾ºíô„”>O[bŠ(œB@l•m×PVJ‡ñá÷ßÄ¤ùõHï|Á.ÏsðzÅ¯…)¡¬«aI©ÐZw—W8u£ê‰¶dšÙËöQ´;=çÒÀ'ž’hfFÜÓÖÞ²Êi™-KÉ‹‚^·_ªüƒ6é{oµLà³îeq¹UŽ±nÂÛÕ¿y›MNjgX§+È]†ý:kRâŸ½%}?Ì»9&–/Ø®#¼ ,Æ¦ˆYt“ÎãÑ‘äèòì˜ûxÔp¨å`G0*S<", 
  "¾þuKÑ/&¦|7E¬ÄÓðeGb¡‘¢”^•™:¿~í*H‹5£U]ûx§°Çžt¸†Õ}—!ç–Ž“Ü€óN_>h’©RßùšØ·?@%Aªròñ‡,é±½…Â(ëBÐàgÚ#øÞ)ŸÌC{4+d2.µO÷ê´\"ILÀ$õf‚¹åvÅ²S=ö¨\\qW[ŒâÊÉT˜sä`¯Ïãÿl9<XQY‰»coyÁÛáÍ„0×î¤'ËÈŠ¼3üÒ6ÙJPFìzpœè¥nïM«ÖˆýÆjDºmVi ÎÔ›¶1ú³ÝkZw-®ô;8ƒa", 
  "&/Vð™”ŸbkìÐ ¨Ì®»GØxËïƒño¶Wªm@ˆÇ•óí¾ZÑec·ý$:7~O‹žY“Üöò–úœøI¯ß§‚Íôûnaé˜'AsÛ÷zTÀ98UŠÊÖÿµ¸Ål<É|-wK°y«äD!©…QPpâÄ¤èùÚüCõ;þ‘Á0ÙšåÕŽS×=F1ë5`]¢îu‡r´v¥t²j{—H#dà€Î?Æ.i^„¡çEÏf_¬£(Â%¿±á›†‰Ó}JÝŒB4È’³Þ,M\\gNêX[½hãLº+)¼R36¹Ò¦2q>Ô\"*", 
  "_ÄÆ‚‰¨9€èžŠtá%ÂTû’š 7:Ì›Þ!d1É\\ŸÖ†5»îS´B2Gœ¤ÅCìE[ö~sz8WglùÛ…}ˆßÊü]úZDÓÝ£õmø¬xXñNeïO•Ï@”é`È‹6y¿ª;íóÜ¢¦uËYnã½ijRô·$°à‘Ð.¾ÒÍQç{ƒÀf§rkºÕ¸I¶˜ÚMJ4P+Á“<‡µop|'¹*)þcÇ¥3LØðV^Î&–\"â™ê±ý¯=®?¡ò>,×÷vÔ—-¼(ÿ„w#UåFÙ«AKh©0ŒÑŽë³ab/qH²ä",
  "-ôŒ1y¦g Àï6™ÓœÑÉñÅ_KOrt+Â±èE\"Iá:½¸’çü{ö'„øÖ•ƒDSL‰þ<uˆv…éc×ª»5^ëÔ“z¤ËûÈ¨³beÌA,ß€©}ÿ¯9åâ8CU¡=º¿ðÊÕG/m#B·h°îp2wV²F§%3®†ÝÇl¼j[iÏqWäŸ0õó–4P˜‚\\)ÆQÄ@‘T«7XknµÒý?¬ŽHÁaJRd—ò>‹žÚ.Í”~MÜ|ì&´›$÷êfÐí¢ÛN‡¥š(*ØÞã¾ÎÙ¶]ú!xsŠ¹Y`£ù;àZo", 
  "™ÀÄ¾‘}‰ÆëCƒ1ÈIg·,[‡û#)5õ]ŒãÏœúEÓRls¨µ=GY½•p¼ÎrÞÑîÍüxª~4žD$¯PV”!÷Z´Ž‚¢q¶a‹t«Jêk¡ÅÒïÝØ²X§¦öþ(á¤{è¹Q—+»¿Ù¥HbÇAÖ8Ê0±“W©ˆ2’:Ë^KeN›j?@'é>/àB³òânÁñ&v®åhi€m£˜ÂùÐÕ°LcÌ|„ÿ\"6u¸SšøìÔoMô3z_ä¬\\ÜUT9Fy†Ow–f`çŸð…<;ŠÛ-7Ú%í*º ßÉ.×óýd", 
  "‡RŽÇ—üb×ûv÷J¸ôÒÁ¥\\ÊÌè\"ÆÑ²Õé£¼Kc_]›†BË¯Þ«í!¶>¾k…ˆ´hft;‰GïP€0þodàÉŸÅ¡-UOâ^ ~³¨`3‚¹ÚVØÏº%ìu2ùqM(‹6inF¬Óã.ÔÜê=@9Ð:ú’eza½[1rÿ$ò»Yx/mÂwNW¤QH#ª„Œ?ÈC©|jÝ,á·•ýóy–œžÎµñ4{ð°}ETÀ¢ÛZ'ŠlAÄõLäsƒ¦*8çîëSÙ<Í“I˜7&ß‘ø±öÖå”pgš)D5+¿§X™®", 
  "•Vµèí›ä…`·vo3ö,÷À«¯u$g4ÖÊ”x¢sñL+\\=[ŒÝú¾qãõilá°çyŽ@¦à³c¬BYß±h_¶ì^{m“GC:>Ï©²Š„×Þ5X8Ú‹é˜Kêd™—fåÕ\"®ÈÙ2ÎzØI»k†ïôšAË¨NO£*ÄÒe¤¼6?%WÍ<º(Ðj#ëò;SZ¿!‚‘rƒHþù´Áó¡’œ‰F¥-.§ÅaÛ)ŸâÔðwbEü‡|€î'¸RUtû9Ì Ó7JˆÑTÜýÿ/p}½ÆÂM–ÉD¹ønÇ]10Qž&~ªP",
  "™xƒIM.0©‘7ã:_û×nDªëp;¶‰jLùòìô¸!äCÊ(¦o\\ð3‹ïº…ßÇö¹†ÖØË}d'·ÓXb±¤ÄuÂl|ˆkÙU”¡^#ú²ü¬¯/ýAÕTŸÒ1e¨®E´É>ÿ ç‚¿+»JsaáÜ=œYÆéKÐ›{÷èG„øõŽ¾Ï‡i³&ó€N–ñ4)“Œt˜êÎ,§¢Ô\"6h°cRm9O¼½g*-]8WÈ«$@šy5ŠÌwPâþÍv`HÁVí’%žàFÛÀÅµÝ[BzÞÚåQ~2Zî£q•f¥Ñ?<Sr—"]
  */

//" !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"


let r = 
 ["^éIlÿÀ³× >¢¹Ö§Pa.r¡û;K)¤j²SÍ¶±5&WD¦RE=ãJ\"k+ÃÄæçÆ/#wØ©6ø<_1¸ß9ÌÕeUÅfþX8£CqÙ¾â0-]¼½ò¬Ô÷oÁ3%êí@ö4!b`7ôàc®vÓ*TYªü\\´{,Îº?(ó2¥m}»ÐäFìÞõQZ$úyýM[ùÚåÏsB«gÇÊzÒOÉiNµÈÝd~|Gt¿:¨·ðHèÛA°LhëVuÂïîánËÜx¯'ñÑp", 
  "®t-èÄz^¦Æ±ÚþVòä½åfÔëÏ¥&IÈÅaBÐóH¢+L7ãØÝ¿C¼o·÷Ñ`»ÒêM\"5Tg§¬Q$r0KªàcÿßbGZôû²£ø}æ8>ÃY{D3j<PFA9~_)vw\\*1%ÍdÞ,©]'=üù./ÁéÊÇµÖx?ye2ÙËSmp ¹nq«´ïEíkÌ(À6O#WJ|úXñuîð¤:@Õiý¸çÛÓ[ÜÂ4³¶ì¯!NR;¨lºh°¾áÎ¡sâ×ÉõUö", 
  "ÎÿûK2!E©wÉÖÈó1a¢>ôÑñË°étÌkìd¯µò=£«õÇÆ-nîiü´Ueê¦å9íöMàø~c¨.\"W5+I¾ù^P4±ÛBÝ¼D_ã{f@vq,GYÃÜ·*¥u\\js²#ër)m`HhÙÂúlTýßV¶Ä|R¸ÍA[Å<ØgZ®Ð06½oáªÊSO§ï»è/Ó³¤QzX¬æx:3âN]Ô7?byçÚ} þÀ%ÏÒ'äF8¿Á&L;$¹JC×(ºpÕð÷¡Þ", 
  "å?S'Æ9p40kRí,^â6%õ¯üÞ/qi`n28òä<çEÎFXþß±|¥²£î:D-*@ÈN}¡¨êétP¿ÔÊ á©Ü¢ª3¦$b(mÄøWàÓÐûcº¼´°VLÃ7èÒ«ÚUÉ\\ÝÑïoAÕÖ1&Ù¾·®I[ÿ.×ëOG>Có{lôÏÍ)_ãæ÷Y#¶À¸ñy»afH=¬gQrÌ¹!½KìÇËÁ~¤d³M\"+wúÂµzùsTÛeö§B5;]ÅØxZJvuýðjh", 
  ":?doìÍN`=\\2ÅplÈþ 5UMÝë!QV÷Üáâ[Wôg%¨s¢kP3Ð>¤Z»SC{yjöõ.On®xYvJÙ³AD¹º7êÎüwîKÔØÊÇ¡E;×Úb^/0mòFû«cªíú'°GÿË]z&h_Xø|µÂ½Ã4·´)¯©¿Æ-åu²ÓB¼ÕÌHIè$ïð±Ñ¸<*Ûei\"1TÏñÄf¥ùR+äýrÉ#L¾a(@Àéóæ¦Þ8Áq~6ãàtÖß9,£ç}¬§Ò¶", 
  "\\;²b},Z3qÑ´¦ûÀKçJ-jÄÔ/g>1yÙ~ÎÐG½_<zcÝÜóí¿kDÆñÃä.(¾'¬5ªa÷M¯7ðtîXRE³ÌOÉ»Ó^6]¶r¤8nQ¨ÖlC #¸|?ÚºT©ú£èï)%µ¢â°vYohù@ýmì«W&Iü[VàL!efÁ`¥ÕÊõ±á§SÂpéHi¡=Ø9¹ÿ×uô+Íwös\":åBÞ®40dÛ2ÒxòPÏÇU{ø$ãëêÅ·*AËÈßæNF¼þ", 
  "FÇ¸A7iÎjíkî<Û*U~yõV×Ù1©ªÿ³.GïuÈØèzMà2²Ú«æ\"º)ó¬QÉÕô¢N¯WãÌÑd6¨êP5%¿[ûÒT¶?YÔxcÃ`Ór9Lw§¡^;pgäð÷Ï\\ö+Ö/}-ÄKvçlëÐZ>|(ÝÊñsúÞ3£IC¼ü½Á{a!°ýå»B®8Jò',Ë=Å´tß0SþÂO#$mXhD¾ù¹Íe:EÆábføé4â_ &R±·À@Hqìµ]¤n¦¥oÜ", 
  "È?d-Âªmg~Ø+lÐÑ³Ú*×Á^ºYw,íRÖÜÌhç(!®ð¦ÝÙr¼±¸0òâ\\àîi`8Ë9ÕJ¶Ï¥Ã>ø°¿u6á[ynpjÄñN|´a»HßIEqìÓþµxv)²To5Ufÿé]£¾#t}X¤½sÇÀZåý.{Î'b;Å S¯ú/OAüMP§ãÊô=Òó·7_:2c÷<@\"«$Æ©FLùêÛBÍ¬1èä¹VïQö%&DKGÔæe¨Þ¢3ûëWÉ¡Ckz4õ", 
  "¸\"l$®}èÍ½ÇÉ¬XxtÐÌöÀ²éR(÷LKZ7ïø¦BÓÈßæbD*.âA!ÃzmõC=TVÒó<ð\\%Ü·á9ËQàÛ3J×òÖãÆPsúë:n£kjcdÂ¾,ÄrgFíÔÙW/Å¿ôqüeaûÏ¼E¶>?ÞyÊ¯+¥Ñpýiÿ6þ{î|u-G^';`°O&¤¢ÁºØ04hÕM[8Iç³~¡U_o¹ù]©ñ«Y1)v´ÚªäNì¨5åÎw»µ#Sê2±@H f§Ý", 
  "¯9ñ÷ÁBÝ&í!²r'LÀD<¾«)VxcH6JX8úÊz?õËªêë¬;¸¶s]FÃÑbön pôó@Ki-`»ÏÚ×,ÙRG(Ò3¢#Ìò1â2½*Q·{Å:¿ÕwuìoÄ+>E¹NèWÂéM5´æûÇ¨lçqå¥\"PY¦gîÈÍUÖ[àf7øZ_%yµ0}~.þjºÎäTßt=¼ÞØa©®ðCdI§^hã¡ákÓ\\$S/ùÿïü°Ûý¤Ém£ÐvAÔeÜ±³OÆ4|", 
  "K¬¥6Ù0ä«û,×3D\\Ó9²ÌAàZ5~üÒ½°ý£ÈBd®·ÿ%¡7éúÄï³ãÂRèþ2kYô>y8±?µJ:aÝfÍq-&ÀÑÐ@'#¿Wx¦S¼hU÷eÏÎÖ¤º}oÔ[Os§4gæQv¹zÜjªÉcn=)]¢ËÕbti/âñF¸w¶áîuòC^\"óö©<ÛçHX.V¾Ê øEÅ_ë|`Þrùm$êlØpÃÚð(IP»{´õÁTGß¨Ç+ì!;åí1N¯ÆL*M", 
  "nÏÀÊ÷¤Tì_¶Ä3ëéáX¸î¾Üü]ÁN +'à/ç62r»¿¼óËV©§¯p5h`ÍÇ~úB½&#Ø4ÈKÒ:Æ¹ÕãA@¨ÙÅdOÝU.Gþ¦!ýWtD«z|*ûµ\\>³1ÖÞMªåRlxÉ\"ù0b®[<ñcõíI°uêeôFf%²ÃLòæ(¥øÚwCö¬7J8jSï£¡E)ÿ}giÌÂÐm9ÔYÛ{;×s¢ð=ºÎkä,$aQy±âqo?´HZvPß^·èÓÑ-", 
  "3Ä¸¢Îì!¬>Xãà°wè}ônöyÜòH¯P2ÿoï²ÒIþ617ñé0C_ëäukÉgÞû,eóBzÇÐf8ùÏm§[â%Qµ£^s5åß¥:»)GW¾ÊíËjÙÆ@vÈ'øðbOÑ«ÔlKÀ ±*¹T9Å/®]\"<ÖaF÷ç(Ó#r·ÁÝVD|á¤iZ-¶=©êº&ýØ¼ÚU~Ûú¦{Â?dæ½ü;³õÌª´c4YÕhp\\×JÃNMî.L+q`¨Ít¿SxA¡R$E",
  "D¡wr¦¾-üvæ÷O¸ÙÍ§.9ÂkÒmX8Ô\"MÈÜu¤ûôêa³ÚÃcÀ×gÄó¹>þ6²J;e`UÌCµ#ÏhFtñ¨p£íÛfK1{±»ÕªÁ âj0°ÊéúÅ½ë<Ao4õÝËàìn®5ÑðWÉ¯^=\\bx¶å·ZNÓ?ýøy´)!ál3dB¢Hß|Tqî~¿ISùÿYG¼ò«äszPÖ¬*7:/ÎÐi©èÞ_(@Ç&Ø2ï,¥[]öçQEÆ+%$L}ãº'VR",
  "M®ò=pVñí÷¦;©ó¸°W«ÛáëOD7_1gËJÜx2.Ø'³¼Ñ%Ðeby]5/XHâoÍ`>~º¥C:´B4Á!É<ãúôsIÓ 9$ÆSLýmF¾,Èçz|^ùd)×§ÊÄE\"R?ÏßNfïwîèìöÂ½l»r¯0ä&å¹Aêv-ÒÎQPþuÀ¢ð¡{àK²caéYÝ[·¬nhkÅû\\@¿}UÚÞ¶Ã¤3ÿZ£Ùªi±ütTæÕjÖ*#ø6G(Ôµ¨+Çqõ8Ì",
  "¥¨ÇZ'¿U<B,«@nIÄ·ªmYÚ¶ÁâT¾³+Æùfx»ëìê$Û:tjqQVG 79áéMõ8ºpÙËÈ*ÊP%©&Üä=}XHh°ãÐ)6ÓvCýí?ÿµðuÔiûS²s¦Éîà]Ã#Ï\"rE¼N~Âl;óÕ\\Ñ{ÎkåA/1wÌñ¯zòØ>úc´ç÷¹¬±ßga_®ø!À3¸Rödè[×ÖÅÞOôD5.yþKF40¡o2`J½e£§Wü-|^ÝÒb¢æLÍï¤(",
  "Ë5lø|T2ì}ÞÛí{6ÖØÎ·æ¼p½JO«-<D®G¤;k±SµaL¥8_èê Æu`r»ßP9'it°*Ãú^ä£K.³MCXRÔÕÙ¦ãÉ%HÈÀ²bÅ×jö>¢Y@IÌ)#fm/ZedÍÝy$?]E(F¬v§0¹ôNxÄºÓõ[V~!¯à,\\÷ð¸é¡=û¿¾ùÿs3+îÂâñgqÇÐ7ÒåÊþ¶\"ªÏÁoÜçÑBÚ¨czònáW&©UQwAó:hý´ë1ïü4",
  "]B«/`O3(ó·À>CêåL¬¤Ç_Ú6P¶úTÈ{[N¹RDwhö@gÐZËjSJØîò íü;\\ì¢øI\"u´¡<½¦GF0»£1Î%æk=ÞèôÒ-mÄ'¸fQª~°×WoV7$Íß®|û^²,§qÖ2)©XäsÑëýÓÁÊ.Ü!Û4Ù¾t+UÏEÌ¼ï¨cbðÔH9#ãAyvMr÷ànÅµ¯KzleÂÉ¿ñÿâ&x?õùþçd5éÝ±iÆÃpá:8Y¥³a*}Õº",
  ";0kºÐW©lÎñM²±«z¦]Ìíäê´é28üÔ'5áXQÆ¶u6P÷µýâè-#å4_IÙúc7gæ·.:óBÃo?ËNÚ\\[>ÞÑãÇÿð@,x\"¢w`&p°È~Õr^Â¼dîtD£³¨v¿ÀG/Ý Z¥{KÍY9òÊbõ<fªm)ù§S¡ïÒFÓq¯=RÖUyûôþÄLÉàjaßÅëhs*ø¾ni}Áì+Ø%×HV½¹¤JÜ!»(A1$¬¸OÛCTeE3öçÏ®|",
  "½¦ÚêìI»#6lRÊóÔ/ÿzÜÄ¥¹§ØªãÈð*(n,ÃÇ±Â³.Qy+µ>wÓÍñ÷cýï-p)MÅZ!²\"^£ÖAJNíe¢¸mVÝÌºÁ´¾Æ&[ÙxTáÏUCò7ë{u81Lä¼~Î¨åô¿YW«P;Ë=$<jt5`°qSB@¤oKEgà4ib3ÐXd'O¬0v¶9úÑ%\\}Àhs¡ßæf×Þö®FÒ:k|éGûþ ùüîÉøâÕ¯èa·]2©Û_rõH?çD"]
  

let m1 = ["0100100011100111100110110010001001110010100101110010011001100101010001101110011111001000100", //91
          "0100010111111101101010111110100001110110101001100000011110001001101010101110111110011010110",
          "1010101000000110010100110010000111001111101010000101100101011100101010110011001100011011100",
          "0011111110100010000101000111010100110111000010010010010010110001000001011000001110110011110",
          "0011010100111111010110010011001100001111010100111100101110100100010000010100110000011111001",
          "1001101010111000010001001001101111011100001101011101111101101001000100000011100010100011111",]
let m2 = ["1010110101011000110111001100101001000010001001010100011101000100111101001", //73
          "0110011101000000010110010001110111110100110011011101111011010000011011001",
          "1010111111010010010001001110010011010011100101011101110100111011110100010",
          "1111010011010111101001111010010100100110110100100010111101000100001001010",
          "0010001111101111000010000010110010000100011100010011110110101001100010111",
          "1011000111010000101001010010000100110111100111000011001111001011011001000"]

//encryption 
document.getElementById('encryptButton').onclick = function () {
 
    //get input text
    let inputText = document.getElementById('input').value 
    
    //send input to encrypt function, returns the output
    let outputText = encrypt(inputText)
    

    if(document.getElementById('methodStandard').checked){
       //write output to textbox
      document.getElementById('output').value = outputText
    } else if (document.getElementById('methodStream').checked) {

      let streamText = ''
      let outputXor = ''

      //get key
      let key = document.getElementById('keyBox').value
      let rotorCipher = outputText

      //repeat key to match message length
      for (i=0; i < rotorCipher.length; i++){
        streamText += key.charAt(i % key.length)
      }

      //encrypt the stretched key
      let keyStream = xencrypt(streamText)
      
      
      let p, q

      //XOR
      for (i=0; i < rotorCipher.length; i++ ){
          //stream character
          p = keyStream.charCodeAt(i)
          //plaintext character
          q = rotorCipher.charCodeAt(i)
          //XOR new character in hex
          //console.log("KeyStream: " + p, "Original: " + q, "Xor: " + (p ^ q), "Symbol: " + String.fromCharCode(p ^ q), "Hex: " + (p ^ q).toString(16))

          if ((p ^ q).toString(16).length===1){
            outputXor += ("0" + (p ^ q).toString(16))
          } else {
            outputXor += ((p ^ q).toString(16))
          }

          //String.fromCharCode(p ^ q)    to char
          //(p ^ q).toString(16)          to hex

      }
      //write final XOR'd output to textbox
      //console.log(outputXor)
      document.getElementById('output').value = btoa(outputXor.match(/\w{2}/g).map(function(a){return String.fromCharCode(parseInt(a, 16));} ).join(""))
      //???? Array.from(atob('AQ0gIAcDExUQAQECAWQW')).map(c=>c.charCodeAt(0).toString(16).padStart(2,'0')).join('').toUpperCase()
      //document.getElementById('output').value = outputXor
    
    }
    
}



function base64ToHex(str) {
  const raw = atob(str);
  let result = '';
  for (let i = 0; i < raw.length; i++) {
    const hex = raw.charCodeAt(i).toString(16);
    result += (hex.length === 2 ? hex : '0' + hex);
  }
  return result.toUpperCase();
}

//decryption  
document.getElementById('decryptButton').onclick = function () {
  console.log("--- DECRYPTING ---")
  //get input text
  let inputText 
  
  //declare output
  let outputText = ''

  if(document.getElementById('methodStandard').checked){
    //write output to textbox
    inputText = document.getElementById('input').value 
  } else if (document.getElementById('methodStream').checked) {
    let streamText = ''
    let outputXor = ''
  
    //get key
    let key = document.getElementById('keyBox').value

    
    let hexCipher = base64ToHex(document.getElementById('input').value )
    //let hexCipher = document.getElementById('input').value 
  
    //repeat key to match message length
    for (i=0; i < (hexCipher.length / 2); i++){
      streamText += key.charAt(i % key.length)
    }
    
    //encrypt the stretched key
    let keyStream = xencrypt(streamText)
    
    let streamArray = []
      
    for (i = 0; i < hexCipher.length / 2; i++){
      streamArray[i] = parseInt(hexCipher.substring((i * 2), (i * 2)+2), 16)
    }
    console.log(streamArray)
  
    let p, q
  
    //XOR
    for (i=0; i < streamArray.length; i++ ){
         //stream character
         p = keyStream.charCodeAt(i)
         //plaintext character
         q = streamArray[i]
         //XOR new character in hex
        
        outputXor += String.fromCharCode(p ^ q)
         
  
         
         //String.fromCharCode(p ^ q)    to char
         //(p ^ q).toString(16)          to hex
  
    }
    //write final XOR'd output to textbox
    inputText = outputXor




  }





  
  //get user input for rotors
  let alphabet = r[document.getElementById('ra').value]
  let rotor1 = r[document.getElementById('r1').value]
  let rotor2 = r[document.getElementById('r2').value]
  let rotor3 = r[document.getElementById('r3').value]

  //set rotor starting position
  alphabet = alphabet.substring(document.getElementById('raStart').value -1) + alphabet.substring(0, document.getElementById('raStart').value -1)
  rotor1 = rotor1.substring(document.getElementById('r1Start').value -1) + rotor1.substring(0, document.getElementById('r1Start').value -1)
  rotor2 = rotor2.substring(document.getElementById('r2Start').value -1) + rotor2.substring(0, document.getElementById('r2Start').value -1)
  rotor3 = rotor3.substring(document.getElementById('r3Start').value -1) + rotor3.substring(0, document.getElementById('r3Start').value -1)

  let mu1 = m1[document.getElementById('m1').value]
  let mu2 = m2[document.getElementById('m2').value]
  mu1 = mu1.substring(document.getElementById('m1Start').value -1) + mu1.substring(0, document.getElementById('m1Start').value -1)
  mu2 = mu2.substring(document.getElementById('m2Start').value -1) + mu2.substring(0, document.getElementById('m2Start').value -1)


  //current character in input
  let char

  //rotor position and total turns
  let [r1Pos, r2Pos, r3Pos] = [0, 0, 0]
  let [r1turns, r2turns, r3turns] = [0, 0, 0]
  
  //cycle through each character in input
  for (i = 0; i < inputText.length; i++){

    //follow input character through all rotors to find output character
    char = alphabet.charAt(rotor3.indexOf(inputText.charAt(i)))
    char = alphabet.charAt(rotor2.indexOf(char))
    char = alphabet.charAt(rotor1.indexOf(char))

    //rotate rotor1
    rotor1 = rotor1.substring(1) + rotor1.charAt(0)
    r1Pos++
    r1turns++

    //rotate rotor2
    if (r1Pos === alphabet.length){
      rotor2 = rotor2.substring(1) + rotor2.charAt(0)
      r2Pos++
      r2turns++
      r1Pos=0
    }

    //rotate rotor3
    if (r2Pos === alphabet.length){
      rotor3 = rotor3.substring(1) + rotor3.charAt(0)
      r3Pos++
      r3turns++
      r2Pos=0
    }

    //rotate m rotors
    mu1 = mu1.substring(1) + mu1.charAt(0)
    if (mu1.charAt(0)==="1"){
      mu2 = mu2.substring(1) + mu2.charAt(0)
        if (mu2.charAt(0)==="1"){
          rotor3 = rotor3.substring(1) + rotor3.charAt(0)
        }
    }


    //add the character to output
    outputText += char
  }
  //write output to textbox
  document.getElementById('output').value = outputText


  
}



function encrypt(inputText){
  //get user input for rotors
  let alphabet = r[document.getElementById('ra').value]
  let rotor1 = r[document.getElementById('r1').value]
  let rotor2 = r[document.getElementById('r2').value]
  let rotor3 = r[document.getElementById('r3').value]

  //set rotor starting position (input is 1-214, but index goes 0-213 [subtract 1])
  alphabet = alphabet.substring(document.getElementById('raStart').value -1) + alphabet.substring(0, document.getElementById('raStart').value -1)
  rotor1 = rotor1.substring(document.getElementById('r1Start').value -1) + rotor1.substring(0, document.getElementById('r1Start').value -1)
  rotor2 = rotor2.substring(document.getElementById('r2Start').value -1) + rotor2.substring(0, document.getElementById('r2Start').value -1)
  rotor3 = rotor3.substring(document.getElementById('r3Start').value -1) + rotor3.substring(0, document.getElementById('r3Start').value -1)
  //console.log("Rotors: \n", alphabet, "\n", rotor1, "\n", rotor2, "\n", rotor3)


  let mu1 = m1[document.getElementById('m1').value]
  let mu2 = m2[document.getElementById('m2').value]
  mu1 = mu1.substring(document.getElementById('m1Start').value -1) + mu1.substring(0, document.getElementById('m1Start').value -1)
  mu2 = mu2.substring(document.getElementById('m2Start').value -1) + mu2.substring(0, document.getElementById('m2Start').value -1)

  

  //current character in input
  let char
  let [r1Pos, r2Pos, r3Pos] = [0, 0, 0]
  let [r1turns, r2turns, r3turns] = [0, 0, 0]

  //declare output
  let outputText = ''

  //cycle through each character in input
  for (i = 0; i < inputText.length; i++){

    //follow input character through all rotors to find output character
    char = rotor1.charAt(alphabet.indexOf(inputText.charAt(i)))
    char = rotor2.charAt(alphabet.indexOf(char))
    char = rotor3.charAt(alphabet.indexOf(char))
    
    //rotate rotor1
    rotor1 = rotor1.substring(1) + rotor1.charAt(0)
    r1Pos++
    r1turns++

    //rotate rotor2
    if (r1Pos === alphabet.length){
      rotor2 = rotor2.substring(1) + rotor2.charAt(0)
      r2Pos++
      r2turns++
      r1Pos=0
    }

    //rotate rotor3
    if (r2Pos === alphabet.length){
      rotor3 = rotor3.substring(1) + rotor3.charAt(0)
      r3Pos++
      r3turns++
      r2Pos=0
    }

    //rotate m rotors
    mu1 = mu1.substring(1) + mu1.charAt(0)
    if (mu1.charAt(0)==="1"){
      mu2 = mu2.substring(1) + mu2.charAt(0)
        if (mu2.charAt(0)==="1"){
          rotor3 = rotor3.substring(1) + rotor3.charAt(0)
        }
    }

    //add the character to output
    outputText += char

  }
return outputText
}

//encrpyting key for xor
function xencrypt(inputText){
  //get user input for rotors
  let alphabet = r[document.getElementById('xra').value]
  let rotor1 = r[document.getElementById('xr1').value]
  let rotor2 = r[document.getElementById('xr2').value]
  let rotor3 = r[document.getElementById('xr3').value]

  //set rotor starting position (input is 1-214, but index goes 0-213 [subtract 1])
  alphabet = alphabet.substring(document.getElementById('xraStart').value -1) + alphabet.substring(0, document.getElementById('xraStart').value -1)
  rotor1 = rotor1.substring(document.getElementById('xr1Start').value -1) + rotor1.substring(0, document.getElementById('xr1Start').value -1)
  rotor2 = rotor2.substring(document.getElementById('xr2Start').value -1) + rotor2.substring(0, document.getElementById('xr2Start').value -1)
  rotor3 = rotor3.substring(document.getElementById('xr3Start').value -1) + rotor3.substring(0, document.getElementById('xr3Start').value -1)
  //console.log("Rotors: \n", alphabet, "\n", rotor1, "\n", rotor2, "\n", rotor3)


  let mu1 = m1[document.getElementById('xm1').value]
  let mu2 = m2[document.getElementById('xm2').value]
  mu1 = mu1.substring(document.getElementById('xm1Start').value -1) + mu1.substring(0, document.getElementById('xm1Start').value -1)
  mu2 = mu2.substring(document.getElementById('xm2Start').value -1) + mu2.substring(0, document.getElementById('xm2Start').value -1)

  

  //current character in input
  let char
  let [r1Pos, r2Pos, r3Pos] = [0, 0, 0]
  let [r1turns, r2turns, r3turns] = [0, 0, 0]

  //declare output
  let outputText = ''

  //cycle through each character in input
  for (i = 0; i < inputText.length; i++){

    //follow input character through all rotors to find output character
    char = rotor1.charAt(alphabet.indexOf(inputText.charAt(i)))
    char = rotor2.charAt(alphabet.indexOf(char))
    char = rotor3.charAt(alphabet.indexOf(char))
    
    //rotate rotor1
    rotor1 = rotor1.substring(1) + rotor1.charAt(0)
    r1Pos++
    r1turns++

    //rotate rotor2
    if (r1Pos === alphabet.length){
      rotor2 = rotor2.substring(1) + rotor2.charAt(0)
      r2Pos++
      r2turns++
      r1Pos=0
    }

    //rotate rotor3
    if (r2Pos === alphabet.length){
      rotor3 = rotor3.substring(1) + rotor3.charAt(0)
      r3Pos++
      r3turns++
      r2Pos=0
    }

    //rotate m rotors
    mu1 = mu1.substring(1) + mu1.charAt(0)
    if (mu1.charAt(0)==="1"){
      mu2 = mu2.substring(1) + mu2.charAt(0)
        if (mu2.charAt(0)==="1"){
          rotor3 = rotor3.substring(1) + rotor3.charAt(0)
        }
    }

    //add the character to output
    outputText += char

  }
return outputText
}


document.getElementById('clearText').onclick = function () {
  document.getElementById('input').value = ''
  document.getElementById('output').value = ''
  document.getElementById('keyBox').value = ''
}



document.getElementById('copyText').onclick = function () {
  var copyTextv = document.getElementById('output')
  var textArea = document.createElement('textarea')
  textArea.value = copyTextv.value
  document.body.appendChild(textArea)
  textArea.select()
  document.execCommand('Copy')
  textArea.remove()
}

     /*
      //separate alphabets with dash
      if ((i+1) % alphabet.length === 0){
        if(r3turned === true){
          outputText += " / "
          r3turned = false
        }else{
        outputText += "-"
      }
      }

     */


      /*
       console.log("Rotor total turns: ", r1turns, r2turns, r3turns)
      console.log("Rotor positons: ", r1Pos, r2Pos, r3Pos)
      console.log("Rotors: ", rotor1, " - ", rotor2, " - ", rotor3)
      console.log("Output: ", outputText)
      console.log("Message length: ", inputText.length, " - Alphabet length: ", alphabet.length)
      console.log("--- --- --- --- --- --- --- --- ---")
      */

      /*
       let charset = ''
    for(i=0; i < 256; i++){
      charset += String.fromCharCode(i)

    }
    console.log(charset)
    */