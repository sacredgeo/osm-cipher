//the default alphabet
let defaultAlphabet =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_.'

//declare empty
let cipherTableArray = []

function pageLoad () {
  //call function to reset keyed alphabet and cipher table
  resetAlphabet()
}

function resetAlphabet () {
  //display the default keyed alphabet on the right column of the page
  document.getElementById('keyedAlphabet').textContent = defaultAlphabet
  //reset the cipher table
  for (let i = 0; i < defaultAlphabet.length; i++) {
    document.getElementById('t' + i).textContent = defaultAlphabet[i]
  }
}

//get key from user input function
function getKey (k) {
  //get user input for the key
  let keyInput = document.getElementById('keyBox').value

  //check if using base64 for key
  var useBase = document.getElementById('useBase64')

  if (useBase.checked) {
    //convert ket input to base64
    let keyInputB64 = btoa(keyInput)
    //remove all equal signs from base64 key
    keyInput = keyInputB64
      .replace(/=/g, '')
      .replace(/\//g, '.')
      .replace(/\+/g, '_')
  }

  //split the key input to an array and filter duplicates
  let keyInputNoRepeated = keyInput
    .split('')
    .filter(
      (value, currentIndex, array) => array.indexOf(value) === currentIndex
    )

  //join the above key array into a string
  let keyInputNoRepeatedJoined = keyInputNoRepeated.join('')

  //if the key (without duplicates) is less than 64, add the alphabet?
  //add the default alphabet to the end of the string
  let keyWithAlphabet = keyInputNoRepeatedJoined + defaultAlphabet

  //split the key+alphabet to an array and filter duplicates
  let keyWithAlphabetNoRepeated = keyWithAlphabet
    .split('')
    .filter(
      (value, currentIndex, array) => array.indexOf(value) === currentIndex
    )

  //join the above array into a string, which is the final key
  k = keyWithAlphabetNoRepeated.join('')

  //display the keyed alphabet on the right column of the page
  document.getElementById('keyedAlphabet').textContent = k

  //the function returns the key
  return k
}

//find the YX positions of each character in the key (YYYXXX format)
function getKeyYX (finalKey) {
  //find the YX positions of each character in the key (YYYXXX format)
  for (let i = 0; i < finalKey.length; i++) {
    //get YX position
    let charXPos = i % 8
    let charYPos = Math.floor(i / 8)

    //convert positions to binary
    charYPos = '000'.substr(charYPos.toString(2).length) + charYPos.toString(2)
    charXPos = '000'.substr(charXPos.toString(2).length) + charXPos.toString(2)

    //create array that will store the YYYXXX positions for later
    cipherTableArray[i] = charYPos.concat(charXPos)

    //fill the cipher table with data from the keyed alphabet array
    document.getElementById('t' + i).textContent = finalKey.charAt(i)
  }
}

function getInputYX (inputText, finalKey, stringPreTrans) {
  //convert inputtext to YX positions of each character
  for (i = 0; i < inputText.length; i++) {
    //find the current character's position in the key
    currentCharPosInKey = finalKey.indexOf(inputText.charAt(i))

    //get YX positions
    let charYPosInKey = Math.floor(currentCharPosInKey / 8)
    let charXPosInKey = currentCharPosInKey % 8

    //convert YX positions to binary & make each 3 characters long (1 becomes 001, 10 becomes 010, etc)
    charYPosInKey =
      '000'.substr(charYPosInKey.toString(2).length) + charYPosInKey.toString(2)
    charXPosInKey =
      '000'.substr(charXPosInKey.toString(2).length) + charXPosInKey.toString(2)

    //create variable that will contain the merged YX positions
    let mergedCharPositions = ''

    //convert from two variables (YYY XXX) to one (YXYXYX)
    for (z = 0; z < 3; z++) {
      mergedCharPositions += charYPosInKey
        .charAt(z)
        .concat(charXPosInKey.charAt(z))
    }

    //add YXYXYX data to string
    stringPreTrans += mergedCharPositions
  }
  return stringPreTrans
}

//encrypt function
document.getElementById('encrypt').onclick = function () {

  //make sure a group size is selected. this part should go later, but if it's not inlcuded there is an error 
  if (document.getElementById('groupSizeM').checked) {
    if (document.getElementById('multiGroupSize').value == ""){
      document.getElementById('multiGroupSize').value = "5,7,6"

      document.getElementById('warningMessage').style.display = "inherit"
      document.getElementById('warningMessageText').innerHTML = " Group sizes not entered. Defaulted to '<b>5,7,6</b>'."

      setTimeout(() => {  
        document.getElementById('warningMessage').style.display = "none"
      }, 6000);
    }
  }
  //console.log("Encrypt function started...");

  //create variable k which is sent to the getKey function and returns the key
  let k
  let finalKey = getKey(k)

  //find the YX positions of each character in the key (YYYXXX format)
  getKeyYX(finalKey)

  //get inputText
  let inputText = document.getElementById('inputBox').value
  inputText = inputText.replaceAll(' ', '_')


  //XOR test   (64-(x-y))%64
  if(document.getElementById('stream').checked){
    var streamText = ""
    for (g=0; g < inputText.length; g++){
      streamText += finalKey.charAt((64-(finalKey.indexOf(inputText.charAt(g)) - defaultAlphabet.indexOf(finalKey.charAt(g % 64))))%64)
    }
    inputText = streamText
  }

  //x = character in plaintext
  //y = character in key's location in default alphabet
  //answer = character in key

  //adding filler characters to make cryptography more difficult
  if(document.getElementById('filler').checked){
    let inputLength = inputText.length
    inputText = inputText.split('');

    let fillerPeriod 
    //if using a single group size
    if (document.getElementById('groupSizeS').checked) {
      //add filler character into every group (get single group size here)
      fillerPeriod = document.getElementById('singleGroupSize').value

      for (b = 1; b <= inputLength/(fillerPeriod -1); b++){
        // Insert the string at the index position
        inputText.splice(b * (fillerPeriod -1) + b - 1, 0, defaultAlphabet.charAt(Math.floor(Math.random() * 63)))
        //console.log((b+1) * fillerPeriod)
      }

    //if using multiple group sizes
    } else if (document.getElementById('groupSizeM').checked) {

        //split the filler periods into an array
        fillerPeriod = document.getElementById('multiGroupSize').value.split(',')

        //get the amount of periods listed
        let fillerPeriodAmount = fillerPeriod.length

        //this variable is where we are in the input, starts at 0
        let cLocation = 0.0;

        for (c = 0; c < inputLength; c++){

          //add random character into each group
          inputText.splice(parseInt(cLocation, 10) + parseInt(fillerPeriod[c % fillerPeriodAmount], 10) - 1, 0, defaultAlphabet.charAt(Math.floor(Math.random() * 63)))

          //console.log(parseInt(cLocation, 10) + parseInt(fillerPeriod[c % fillerPeriodAmount], 10) - 1)
          //console.log("Period: " + fillerPeriod[c % fillerPeriodAmount] + ", Length: " + inputLength + ", c = " + c + ", cLocation: " + cLocation + ", fillerPeriodAmount: " + fillerPeriodAmount)

          //set the location to where the next group starts (*1 because it wants to be a string instead of int)
          cLocation = cLocation + (fillerPeriod[c % fillerPeriodAmount]) * 1

          //break the loop if we exceed the input (+2 becaue idk)
          if(cLocation + parseInt(fillerPeriod[(c + 1) % fillerPeriodAmount], 10) > inputLength + c + 2){
            break;
          }
        
        }

      //console.log('Specific groups: ' + fillerPeriod);
      //console.log('Groups in cycle: ' + fillerPeriod.length);
      
    }

    //console.log(inputText.length + " = length")
    
    // Join back the individual characters to form a new string
    inputText = inputText.join('');
    //console.log(inputText)
  }


  //create string that will hold a character as the next loop cycles through the message
  let currentCharPosInKey

  //create string for the inputtext locations pre-transposition
  let stringPreTrans = ''
  stringPreTrans = getInputYX(inputText, finalKey, stringPreTrans)

  //get the group size from user-selected menu
  //the period, either a single number or an array or numbers [a,b,c,d...]
  let cipherPeriod
  //if using a single group size
  if (document.getElementById('groupSizeS').checked) {
    cipherPeriod = document.getElementById('singleGroupSize').value
    //if using multiple group sizes
  } else if (document.getElementById('groupSizeM').checked) {
    cipherPeriod = document.getElementById('multiGroupSize').value.split(',')
    //console.log('Specific groups: ' + cipherPeriod);
    //console.log('Groups in cycle: ' + cipherPeriod.length);
  }

  //the number of periods specified by the user (ex: [3,4,3,6] = 4 total)
  //we will cycle through these to divide the string
  let periodCycleAmount = cipherPeriod.length

  //make a copy of the string we subtract the periods from
  let stringGroupCalc = stringPreTrans

  //determine the total number of groups required to divide string
  let totalGroups = 0
  while (stringGroupCalc.length > 0) {
    //remove length of period
    stringGroupCalc = stringGroupCalc.substring(
      6 * cipherPeriod[totalGroups % periodCycleAmount]
    )
    totalGroups++
  }
  //console.log('Total groups: ' + totalGroups);

  //create array that will hold each group
  let stringGroupsArray = []

  //break up the string into groups according to single group size
  if (document.getElementById('groupSizeS').checked) {
    for (i = 0; i < stringPreTrans.length / (cipherPeriod * 6); i++) {
      stringGroupsArray[i] = stringPreTrans.substr(i * cipherPeriod * 6, cipherPeriod * 6)

      //console.log(totalGroups + "?")
      //pad last group
      if (i === totalGroups -1){
        //console.log(cipherPeriod)
        if (stringGroupsArray[i].length < cipherPeriod * 6){
          //console.log("y")
          
      
          let padGroup = stringGroupsArray[i].length
          for (x = 0; x < ((cipherPeriod * 6) - padGroup); x++){
                stringGroupsArray[i] += Math.round(Math.random())
          }
        }
      }
      
     
    }
    
  } else if (document.getElementById('groupSizeM').checked) {
    //break up the string into groups according to multiple group sizes
    let startPos = 0
    for (i = 0; i < totalGroups; i++) {
      stringGroupsArray[i] = stringPreTrans.substr(startPos,  cipherPeriod[i % cipherPeriod.length] * 6)
      startPos += cipherPeriod[i % cipherPeriod.length] * 6

      if (i === totalGroups -1){

        if (stringGroupsArray[i].length < (cipherPeriod[i % cipherPeriod.length] * 6)){
          //console.log((cipherPeriod[i % cipherPeriod.length] * 6) - stringGroupsArray[i].length)
      
          let padGroup = stringGroupsArray[i].length
          for (x = 0; x < ((cipherPeriod[i % cipherPeriod.length] * 6) - padGroup); x++){
            stringGroupsArray[i] += Math.round(Math.random())
          }
          
        }
    }
    }
     
  }
  //console.log(stringPreTrans);
  //console.log(stringGroupsArray);

  //create an array that will hold the scrambled groups
  let transArray = []

  //loop through each group in the string array (this is the entire transposition)
  for (i = 0; i < stringGroupsArray.length; i++) {
    //transArray[i] is undefined, so clear it
    transArray[i] = [];
    //cycle through 0-5 (6 iterations)
    for (q = 0; q < 6; q++) {
      //create another loop that goes through and transposes
      for (p = 0; p < stringGroupsArray[i].length; p++) {
        //if the position of the current character is a multipe of q then add it to the array
        if (p % 6 === q) {
          transArray[i] += stringGroupsArray[i].charAt(p)
        }
      }
    }
  }
  //console.log('Transposed: ' + transArray)

  //need code to scramble last group if single character??

  //combine the transposed groups back into one string
  let stringPostTrans = transArray.join('')

  //split into groups for each character (stringPostTrans becomes groups of 6: ZZZZZZ, ZZZZZZ, etc)
  let stringPostTransArray = []
  for (i = 0; i < stringPostTrans.length / 6; i++) {
    stringPostTransArray[i] = stringPostTrans.substr(i * 6, 6)
  }

  //create variable that will hold the output
  let finalEncryption = ''

  //convert from YXYXYX to YYY XXX (ADBECF -> ABC DEF)
  for (i = 0; i < stringPostTransArray.length; i++) {
    //create variable to hold a YXYXYX group from the array
    let charGroup = stringPostTransArray[i]
    let charGroupY = '',
      charGroupX = ''

    //split group from YXYXYX to YYY and XXX
    for (r = 0; r < 3; r++) {
      charGroupY += charGroup.toString().charAt(r * 2) //0,2,4 (YxYxYx)
      charGroupX += charGroup.toString().charAt(r * 2 + 1) //1,3,5 (yXyXyX)
    }

    //combine YYY and XXX to YYYXXX
    charGroup = charGroupY.concat(charGroupX)

    //find the location of the string in the cipher table array (it has already stored these values)
    //then find the character at that location in the key and add it to the final encryption string
    finalEncryption += finalKey.charAt(cipherTableArray.indexOf(charGroup))

    
    //if(document.getElementById('filler').checked){
      //if (i > (cipherPeriod -1) && i%cipherPeriod===0){
      //console.log(finalKey)
        //finalKey = finalKey.substring(1) + finalKey.charAt(0)
      //finalKey = finalKey.charAt(63) + finalKey.substring(0, 62)
      //cipherTableArray.unshift(cipherTableArray.pop());
      //}
    //}
  }
  let outputXor = ''
  //outputXor = (finalKey.toString(16) ^ finalEncryption.toString(16))
  

  for(i=0; i<finalEncryption.length; i++) {
    outputXor += (finalEncryption.charCodeAt(i).toString(10) ^ finalKey.charCodeAt(i%finalKey.length).toString(10)).toString(16);
   // console.log(outputXor)
  }
  //console.log(outputXor)

  //write the final encryption to the output box
  document.getElementById('outputBox').value = finalEncryption

  //clear cipher table location box and hide it
  document.getElementById('tableLocation').textContent = ''
  document.getElementById('tableLocation').style.display = 'none'
}

//decrypt function
document.getElementById('decrypt').onclick = function () {
  //this will be very similar to the encrypt function, but the transposition will differ
  //console.log("Decrypt function started...");

  //make sure a group size is selected. this part should go later, but if it's not inlcuded there is an error 
  if (document.getElementById('groupSizeM').checked) {
    if (document.getElementById('multiGroupSize').value == ""){
      document.getElementById('multiGroupSize').value = "5,7,6"

      document.getElementById('warningMessage').style.display = "inherit"
      document.getElementById('warningMessageText').innerHTML = " Group sizes not entered. Defaulted to '<b>5,7,6</b>'."

      setTimeout(() => {  
        document.getElementById('warningMessage').style.display = "none"
      }, 6000);
    }
  }

  //create variable k which is sent to the getKey function and returns the key
  let k
  let finalKey = getKey(k)

  //find the YX positions of each character in the key (YYYXXX format)
  getKeyYX(finalKey)

  //get inputText
  let inputText = document.getElementById('inputBox').value
  inputText = inputText.replaceAll(' ', '_')

  //create string that will hold a character as the next loop cycles through the message
  let currentCharPosInKey

  //create string for the inputText locations pre-transposition
  let stringPreTrans = ''
  stringPreTrans = getInputYX(inputText, finalKey, stringPreTrans)

  //get the group size from user-selected menu
  //the period, either a single number or an array or numbers [a,b,c,d...]
  let cipherPeriod
  //if using a single group size
  if (document.getElementById('groupSizeS').checked) {
    cipherPeriod = document.getElementById('singleGroupSize').value
    //if using multiple group sizes
  } else if (document.getElementById('groupSizeM').checked) {
    cipherPeriod = document.getElementById('multiGroupSize').value.split(',')
    //console.log('Specific groups: ' + cipherPeriod);
    //console.log('Groups in cycle: ' + cipherPeriod.length);
  }

  //the number of periods specified by the user (ex: [3,4,3,6] = 4 total)
  //we will cycle through these to divide the string
  let periodCycleAmount = cipherPeriod.length

  //make a copy of the string we subtract the periods from
  let stringGroupCalc = stringPreTrans

  //determine the total number of groups required to divide string
  let totalGroups = 0
  while (stringGroupCalc.length > 0) {
    //remove length of period
    stringGroupCalc = stringGroupCalc.substring(
      6 * cipherPeriod[totalGroups % periodCycleAmount]
    )
    totalGroups++
  }
  //console.log('Total groups: ' + totalGroups);

  //create array that will hold each group
  let stringGroupsArray = []

  //break up the string into groups using one group size
  if (document.getElementById('groupSizeS').checked) {
    for (i = 0; i < stringPreTrans.length / (cipherPeriod * 6); i++) {
      stringGroupsArray[i] = stringPreTrans.substr(
        i * cipherPeriod * 6,
        cipherPeriod * 6
      )
    }
  } else if (document.getElementById('groupSizeM').checked) {
    //break up the string into groups using multiple group sizes
    let startPos = 0
    for (i = 0; i < totalGroups; i++) {
      stringGroupsArray[i] = stringPreTrans.substr(
        startPos,
        cipherPeriod[i % cipherPeriod.length] * 6
      )
      startPos += cipherPeriod[i % cipherPeriod.length] * 6
    }
  }
  //console.log(stringPreTrans);
  //console.log(stringGroupsArray);

  //create an array that will hold the scrambled groups
  let transArray = []

  //loop through each group in the string array (this is the entire transposition)
  for (i = 0; i < stringGroupsArray.length; i++) {
    //transArray[i] is undefined, so clear it
    transArray[i] = []
    //cycle through X iterations... X = cipherPeriod or group-length/6
    for (q = 0; q < stringGroupsArray[i].length / 6; q++) {
      //create another loop that goes through and transposes
      for (p = 0; p < stringGroupsArray[i].length; p++) {
        //if the position of the current character is a 6x multiple of q then add it to the array
        if (p % (stringGroupsArray[i].length / 6) === q) {
          transArray[i] += stringGroupsArray[i].charAt(p)
        }
      }
    }
  }

  //need code to scramble last group if single character??

  //combine the transposed groups back into one string
  let stringPostTrans = transArray.join('')

  //split into groups for each character (stringPostTrans becomes groups of 6: ZZZZZZ, ZZZZZZ, etc)
  let stringPostTransArray = []
  for (i = 0; i < stringPostTrans.length / 6; i++) {
    stringPostTransArray[i] = stringPostTrans.substr(i * 6, 6)
  }

  //create variable that will hold the output
  let finalDecryption = ''

  //convert from YXYXYX to YYY XXX (ADBECF -> ABC DEF)
  for (i = 0; i < stringPostTransArray.length; i++) {
    //create variable to hold a YXYXYX group from the array
    let charGroup = stringPostTransArray[i]
    let charGroupY = '',
      charGroupX = ''

    //split group from YXYXYX to YYY and XXX
    for (r = 0; r < 3; r++) {
      charGroupY += charGroup.toString().charAt(r * 2) //0,2,4 (YxYxYx)
      charGroupX += charGroup.toString().charAt(r * 2 + 1) //1,3,5 (yXyXyX)
    }

    //combine YYY and XXX to YYYXXX
    charGroup = charGroupY.concat(charGroupX)

    //find the location of the string in the cipher table array (it has already stored these values)
    //then find the character at that location in the key and add it to the final encryption string
    finalDecryption += finalKey.charAt(cipherTableArray.indexOf(charGroup))
    //if(document.getElementById('filler').checked){
      //if (i > (cipherPeriod -1) && i%cipherPeriod===0){
      //console.log(finalKey)
        //finalKey = finalKey.substring(1) + finalKey.charAt(0)
      //finalKey = finalKey.charAt(63) + finalKey.substring(0, 62)
      //cipherTableArray.unshift(cipherTableArray.pop());
    //  }
    //}
  }

  //write the final encryption to the output box
  

  //remove filler 
  if(document.getElementById('filler').checked){

    let fillerPeriod 
    let startIndex = 0;
    let newStrArray = [];

    //if using a single group size
    if (document.getElementById('groupSizeS').checked) {
      fillerPeriod = document.getElementById('singleGroupSize').value

    
      while (startIndex < finalDecryption.length) {
        newStrArray.push(finalDecryption.substring(startIndex, startIndex + parseInt(fillerPeriod, 10) - 1));
        startIndex += parseInt(fillerPeriod, 10);
      }
     
      finalDecryption = newStrArray.join('')
    
    //if using a multi group size
    } else if (document.getElementById('groupSizeM').checked) {

      fillerPeriod = document.getElementById('multiGroupSize').value.split(',')

      //get the amount of periods listed
      let fillerPeriodAmount = fillerPeriod.length

      let c = 0
      while (startIndex < finalDecryption.length) {
        newStrArray.push(finalDecryption.substring(startIndex, startIndex + parseInt(fillerPeriod[c % fillerPeriodAmount], 10) - 1));
        startIndex += parseInt(fillerPeriod[c % fillerPeriodAmount], 10);
        c++
      }

      finalDecryption = newStrArray.join('')
    }
  }

  //XOR test   (64-(x-y))%64
  if(document.getElementById('stream').checked){
    var streamText = ""
    for (g=0; g < finalDecryption.length; g++){
      streamText += finalKey.charAt((64-(finalKey.indexOf(finalDecryption.charAt(g)) - defaultAlphabet.indexOf(finalKey.charAt(g % 64))))%64)
    }
    finalDecryption = streamText
  }

  finalDecryption = finalDecryption.replaceAll('_', ' ')

  document.getElementById('outputBox').value = finalDecryption

  //clear cipher table location box
  document.getElementById('tableLocation').textContent = ''
  document.getElementById('tableLocation').style.display = 'none'
}

//copy the text of the output box
document.getElementById('copyText').onclick = function () {
  var copyTextv = document.getElementById('outputBox')
  var textArea = document.createElement('textarea')
  textArea.value = copyTextv.value
  document.body.appendChild(textArea)
  textArea.select()
  document.execCommand('Copy')
  textArea.remove()
}

//clear the text fields
document.getElementById('clearText').onclick = function () {
  document.getElementById('keyBox').value = ''
  document.getElementById('inputBox').value = ''
  document.getElementById('outputBox').value = ''
  document.getElementById('charCount').textContent = ''
  document.getElementById('tableLocation').textContent = ''
  document.getElementById('tableLocation').style.display = 'none'
  document.getElementById("inputBox").style.background = "white";
  document.getElementById("sanitize").style.outline = "none"
  //call function to reset the keyed alphabet and cipher table
  resetAlphabet()
}

//user clicks random key --> call random shuffle function
document.getElementById('randomKey').onclick = function () {
  var k = defaultAlphabet
  k = shuffle(k)
  document.getElementById('keyBox').value = k
}

//random shuffle function
function shuffle (k) {
  var arr = k.split('') // Convert String to array
  arr.sort(function () {
    return 0.5 - Math.random()
  })
  k = arr.join('') // Convert Array to string
  return k // Return shuffled string
}

//live character counter
document.getElementById('inputBox').oninput = function () {
  document.getElementById('charCount').textContent = 'Character count: ' + this.value.length
  document.getElementById('charCount').style.display = 'inherit'
  let inputCheck = document.getElementById('inputBox').value
  //console.log(inputCheck.length)
  
  //check text to see is sanitize is required
  if (inputCheck.length > 0 ){
    if( /[^a-zA-Z0-9\_\ \.]/.test(inputCheck)) {  //if( /[^a-zA-Z0-9\_\s\.]/.test(inputCheck)) { worked but didn't differentiate types of whitespace
      //change colors to red
      document.getElementById("inputBox").style.background = "linear-gradient(180deg, rgba(255,0,0,0.2) 0%, rgba(255,255,255,0) 100%)";
      document.getElementById("sanitize").style.outline = "2px solid red"
    }else{
      //revert to normal
      document.getElementById("inputBox").style.background = "white";
      document.getElementById("sanitize").style.outline = "none"
      
    }
  } else {
    //revert to normal
    document.getElementById("inputBox").style.background = "white";
    document.getElementById("sanitize").style.outline = "none"
  }
}

//sanitize input
document.getElementById('sanitize').onclick = function () {
  var punctRE = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-\/:;<=>@\[\]^`{|}~]/g
  var spaceRE = /\s+/g
  var str = document.getElementById('inputBox').value
  //replace !? with period, convert whitepace to spaces, remove all other punctuation
  document.getElementById('inputBox').value = str
    .replace(/[?!]/g, '.')
    .replace(punctRE, '')
    .replace(spaceRE, ' ')

  document.getElementById("inputBox").style.background = "white";
  document.getElementById("sanitize").style.outline = "none"
  document.getElementById('charCount').textContent = 'Character count: ' + document.getElementById('inputBox').value.length
}

//user clicks cipher table to find letter location
document.getElementById('cipherTableMatrix').onclick = e => {
  //if the target has been named with an id
  if (e.target.id) {
    //get id of clicked table cell
    let clickedChar = e.target.id

    //remove "t" from id name (t31 -> 31)
    clickedCharIndex = clickedChar.replace('t', '')

    //get the letter at that location from the keyed alphabet
    clickedChar = document
      .getElementById('keyedAlphabet')
      .textContent.charAt(clickedCharIndex)

    //get YX positions
    let charYPosInKey = Math.floor(clickedCharIndex / 8)
    let charXPosInKey = clickedCharIndex % 8

    //convert YX positions to binary & make each 3 characters long (1 becomes 001, 10 becomes 010, etc)
    charYPosInKey =
      '000'.substr(charYPosInKey.toString(2).length) + charYPosInKey.toString(2)
    charXPosInKey =
      '000'.substr(charXPosInKey.toString(2).length) + charXPosInKey.toString(2)

    //create variable that will contain the merged YX positions
    let mergedCharPositions = ''

    //convert from two variables (YYY XXX) to one (YXYXYX)
    for (z = 0; z < 3; z++) {
      mergedCharPositions += charYPosInKey
        .charAt(z)
        .concat(charXPosInKey.charAt(z))
    }

    document.getElementById('tableLocation').textContent =
      'Location of "' + clickedChar + '" = ' + mergedCharPositions
    document.getElementById('tableLocation').style.display = 'inherit'
  }
}

//user clicks "gen" key 
document.getElementById('genKey').onclick = function () {

  //check to make sure a key was entered
  if(document.getElementById('keyBox').value == ""){
    document.getElementById("keyBox").style.background = "linear-gradient(180deg, rgba(255,0,0,0.2) 0%, rgba(255,255,255,0) 100%)";
    document.getElementById("keyBox").style.textAlign = "center"
    document.getElementById("keyBox").style.color = "#333333"
    document.getElementById('keyBox').value = "Please enter a key first."
    document.getElementById('keyBox').disabled = true;
    document.getElementById('keyBox').style.pointerEvents = "none"
    
    setTimeout(() => {  
      document.getElementById("keyBox").style.background = "white"
      document.getElementById('keyBox').value = ""
      document.getElementById("keyBox").style.textAlign = "left"
      document.getElementById("keyBox").style.color = "black"
      document.getElementById('keyBox').disabled = false;
      document.getElementById('keyBox').style.pointerEvents = "auto"
    }, 2500);

  } else{
  //the entered key & its length
  var keygen = document.getElementById('keyBox').value
  var kLength = keygen.length

  //the starting alphabet, from which we will remove characters, and one for reference
  var kAlphabet = "xcFVXHSJRg2BkM5P0i4oYdZpODNGth6ajAq3Ur_uQWvwEIfe9KbCTzm.7nyl1s8L"
  var kDefaultAlphabet = "xcFVXHSJRg2BkM5P0i4oYdZpODNGth6ajAq3Ur_uQWvwEIfe9KbCTzm.7nyl1s8L"

  //the new key we will create
  var newKey = ""

  //the single character we will add each time we cycle through
  var newChar 

  //get added value of entered key, so any change makes a different number
  var kAdded = 0
  for (i = 0; i < kLength; i++){
    kAdded += kDefaultAlphabet.indexOf(keygen.charAt(i))*(i+1) // *(i+1) so each successive character changes it more
  }
  kAdded+=331 //add a big number because a short key (like "x") doesnt add much variety
  //console.log("k = " + kAdded)

  for (i = 0; i < 64; i++){
    //console.log(kAlphabet.charAt(i))
    //console.log(kAlphabet.charAt((defaultAlphabet.indexOf(keygen.charAt(i % kLength) + i + kLength) % 64)))

    //originalS
    //newChar = kAlphabet.charAt((defaultAlphabet.indexOf(keygen.charAt(i % kLength)) + i + kLength) % kAlphabet.length)
    //newChar = kAlphabet.charAt((defaultAlphabet.indexOf(keygen.charAt(i % kLength)) + (kAdded + i) * kLength) % kAlphabet.length)

    //find the next character
    newChar = kAlphabet.charAt((kDefaultAlphabet.indexOf(keygen.charAt(i % kLength)) + (kAdded*(71-i) + i) * kLength + 1) % kAlphabet.length)
    //console.log((kDefaultAlphabet.indexOf(keygen.charAt(i % kLength)) + (kAdded*(71-i) + i) * kLength) % kAlphabet.length)
    //console.log(i + " " + (kDefaultAlphabet.indexOf(keygen.charAt(i % kLength))+ (kAdded*(71-i) + i) * kLength)% kAlphabet.length + " " + kAlphabet + " " + newChar)
    
    //add the new character to the final key
    newKey += newChar

    //remove that character from the alphabet so it won't be added again
    kAlphabet = kAlphabet.replaceAll(newChar, '')
  }

  //reverse key
  newKey = newKey.split("").reverse().join("")
  
  //zipper merge key (abc123 -> a1b2c3)
  var newKeyFinal = ""
  for( i = 0; i < newKey.length/2; i++) {
    newKeyFinal += newKey.charAt(i) + newKey.charAt(i+newKey.length/2);
  }

  //send key to key textbox
  document.getElementById('keyBox').value = newKeyFinal
}
}


document.getElementById('warningButton').onclick = function () {
  document.getElementById('warningMessage').style.display = "none" 
}









//  (64-(39-38))%64