
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
  
//encryption 
document.getElementById('encryptButton').onclick = function () {
  console.log("--- ENCRYPTING ---")
    //get input text
    let inputText = document.getElementById('input').value 
    
    //declare output
    let outputText = ''
    
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
    console.log("Rotors: \n", alphabet, "\n", rotor1, "\n", rotor2, "\n", rotor3)

    //current character in input
    let char
    let [r1Pos, r2Pos, r3Pos] = [0, 0, 0]
    let [r1turns, r2turns, r3turns] = [0, 0, 0]
   
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

      //add the character to output
      outputText += char
    }
    //write output to textbox
    document.getElementById('output').value = outputText
  }

  //decryption  
  document.getElementById('decryptButton').onclick = function () {
    console.log("--- DECRYPTING ---")
      //get input text
      let inputText = document.getElementById('input').value 
      
      //declare output
      let outputText = ''
      
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
  
        //add the character to output
        outputText += char
      }
      //write output to textbox
      document.getElementById('output').value = outputText
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