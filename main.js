//the default alphabet
let defaultAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ."

//create an array that tells the position of each character?
let cipherTableArray = [];

function pageLoad(){
    //call function to reset keyed alphabet and cipher table
    resetAlphabet ();
}

function resetAlphabet (){
    //display the default keyed alphabet on the right column of the page
    document.getElementById("keyedAlphabet").textContent = defaultAlphabet;
     //reset the cipher table
    for (let i = 0; i < defaultAlphabet.length; i++) {
        document.getElementById("t" + i).textContent = defaultAlphabet[i];
    }
}

//get key from user input function
function getKey(k) {
    //get user input for the key
    let keyInput = document.getElementById("keyBox").value;

    //check if using base64 for key
    var useBase = document.getElementById('useBase64');

    if (useBase.checked){
         //convert ket input to base64
        let keyInputB64 = btoa(keyInput);
        //remove all equal signs from base64 key
        keyInput = keyInputB64.replace(/=/g, '').replace(/\//g, ' ').replace(/\+/g, '.');
    }

    //split the key input to an array and filter duplicates
    let keyInputNoRepeated = keyInput.split("").filter((value, currentIndex, array) => array.indexOf(value) === currentIndex);

    //join the above key array into a string
    let keyInputNoRepeatedJoined = keyInputNoRepeated.join("");

    //if the key (without duplicates) is less than 64, add the alphabet?
    // if (keyInputNoRepeatedJoined.length < 64){}
        //add the default alphabet to the end of the string
        let keyWithAlphabet = keyInputNoRepeatedJoined + defaultAlphabet;
    
    //split the key+alphabet to an array and filter duplicates
    let keyWithAlphabetNoRepeated = keyWithAlphabet.split("").filter((value, currentIndex, array) => array.indexOf(value) === currentIndex);

    //join the above array into a string, which is the final key
    k = keyWithAlphabetNoRepeated.join("");

    //display the keyed alphabet on the right column of the page
    document.getElementById("keyedAlphabet").textContent = k;

    //the function returns the key
    return k;                        
}

//find the YX positions of each character in the key (YYYXXX format)
function getKeyYX(finalKey) {
    //find the YX positions of each character in the key (YYYXXX format)
    for (let i = 0; i < finalKey.length; i++) {
        
        //get YX position 
        let charXPos = i % 8;
        let charYPos = Math.floor(i / 8);

        //convert positions to binary
        charYPos = "000".substr(charYPos.toString(2).length) + charYPos.toString(2);
        charXPos = "000".substr(charXPos.toString(2).length) + charXPos.toString(2);

        //create array that will store the YYYXXX positions for later
        cipherTableArray[i] = charYPos.concat(charXPos);  

        //fill the cipher table with data from the keyed alphabet array
        document.getElementById("t" + i).textContent = finalKey.charAt(i);
    }                      
}

function getInputYX(inputText, finalKey, stringPreTrans){

    //convert inputtext to YX positions of each character
    for (i = 0; i < inputText.length; i++){ 
        
        //find the current character's position in the key
        currentCharPosInKey = finalKey.indexOf(inputText.charAt(i));

        //get YX positions
        let charYPosInKey = Math.floor(currentCharPosInKey / 8);
        let charXPosInKey = currentCharPosInKey % 8;
    
        //convert YX positions to binary & make each 3 characters long (1 becomes 001, 10 becomes 010, etc)
        charYPosInKey = "000".substr(charYPosInKey.toString(2).length) + charYPosInKey.toString(2);
        charXPosInKey = "000".substr(charXPosInKey.toString(2).length) + charXPosInKey.toString(2);

        //create variable that will contain the merged YX positions
        let mergedCharPositions = ''

        //convert from two variables (YYY XXX) to one (YXYXYX)  
        for (z=0; z < 3; z++){
            mergedCharPositions += charYPosInKey.charAt(z).concat(charXPosInKey.charAt(z));
        }

        //add YXYXYX data to string
        stringPreTrans += mergedCharPositions;
    }
    return stringPreTrans;
    
}

//encrypt function
document.getElementById("encrypt").onclick = function() {

    console.log("Encrypt function started...");

    //create variable k which is sent to the getKey function and returns the key
    let k;
    let finalKey = getKey(k);

    //find the YX positions of each character in the key (YYYXXX format)
    getKeyYX(finalKey);
  
    //get inputText 
    let inputText = document.getElementById("inputBox").value;
   
    //create string that will hold a character as the next loop cycles through the message
    let currentCharPosInKey;

    //create string for the inputtext locations pre-transposition
    let stringPreTrans = '';
    stringPreTrans = getInputYX(inputText, finalKey, stringPreTrans);
   
    //get the group size from user-selected menu
    let cipherPeriod = document.getElementById("keyPeriod").value;

    //create array that will hold each group
    let stringGroupsArray = [];

    //break up the string into groups according to group size
    for (i = 0; i < (stringPreTrans.length / (cipherPeriod * 6)); i++){
        stringGroupsArray[i] = stringPreTrans.substr((i * cipherPeriod * 6), (cipherPeriod * 6));
    }

    //create an array that will hold the scrambled groups
    let transArray = [];

    //loop through each group in the string array (this is the entire transposition)
    for (i = 0; i < stringGroupsArray.length; i++){

        //transArray[i] is undefined, so clear it
        transArray[i] = [];

        //cycle through 0-5 (6 iterations)
        for (q = 0; q < 6; q++){

            //create another loop that goes through and transposes
            for (p = 0; p < stringGroupsArray[i].length; p++){
            
                //if the position of the current character is a multipe of q then add it to the array
                if (p % 6 === q){
                    transArray[i] += stringGroupsArray[i].charAt(p);
                }
            }
        }
    }

    //need code to scramble last group if single character???????????????????

    //combine the transposed groups back into one string
    let stringPostTrans = transArray.join('');

    //split into groups for each character (stringPostTrans becomes groups of 6: ZZZZZZ, ZZZZZZ, etc)
    let stringPostTransArray = [];
    for (i = 0; i < (stringPostTrans.length / 6); i++){
        stringPostTransArray[i] = stringPostTrans.substr(i * 6, 6);
    }

    //create variable that will hold the output
    let finalEncryption = '';

    //convert from YXYXYX to YYY XXX (ADBECF -> ABC DEF)
    for (i = 0; i < stringPostTransArray.length; i++){

        //create variable to hold a YXYXYX group from the array
        let charGroup = stringPostTransArray[i];
        let charGroupY = '', charGroupX = '';

        //split group from YXYXYX to YYY and XXX
        for (r = 0; r < 3; r++){
            charGroupY += charGroup.toString().charAt(r*2);   //0,2,4 (YxYxYx)
            charGroupX += charGroup.toString().charAt(r*2+1); //1,3,5 (yXyXyX)
        }

        //combine YYY and XXX to YYYXXX
        charGroup = charGroupY.concat(charGroupX);

        //find the location of the string in the cipher table array (it has already stored these values)
        //then find the character at that location in the key
        //then add it to the final encryption string
        finalEncryption += finalKey.charAt(cipherTableArray.indexOf(charGroup));
    }

    //write the final encryption to the output box
    document.getElementById("outputBox").value = finalEncryption;

    //clear cipher table location box
    document.getElementById("tableLocation").textContent = '';
    document.getElementById("tableLocation").style.display = "none";
}

//decrypt function
document.getElementById("decrypt").onclick = function() {
    //this will be very similar to the encrypt function, but the transposition will differ
    console.log("Decrypt function started...");

    //create variable k which is sent to the getKey function and returns the key
    let k;
    let finalKey = getKey(k);

    //find the YX positions of each character in the key (YYYXXX format)
    getKeyYX(finalKey);
    
    //get inputText 
    let inputText = document.getElementById("inputBox").value;
    
    //create string that will hold a character as the next loop cycles through the message
    let currentCharPosInKey;

    //create string for the inputText locations pre-transposition
    let stringPreTrans = '';
    stringPreTrans = getInputYX(inputText, finalKey, stringPreTrans);
    
    //get the group size from user-selected menu
    let cipherPeriod = document.getElementById("keyPeriod").value;

    //create array that will hold each group
    let stringGroupsArray = [];

    //break up the string into groups according to group size
    for (i = 0; i < (stringPreTrans.length / (cipherPeriod * 6)); i++){
        stringGroupsArray[i] = stringPreTrans.substr((i * cipherPeriod * 6), (cipherPeriod * 6));
    }
    //console.log(stringGroupsArray);

    //create an array that will hold the scrambled groups
    let transArray = [];

    console.log(cipherPeriod);

    //loop through each group in the string array (this is the entire transposition)
    for (i = 0; i < stringGroupsArray.length; i++){

        //transArray[i] is undefined, so clear it
        transArray[i] = [];

        //cycle through X iterations... X = cipherPeriod or group-length/6
        for (q = 0; q < (stringGroupsArray[i].length / 6); q++){

            //create another loop that goes through and transposes
            for (p = 0; p < stringGroupsArray[i].length; p++){
            
                //if the position of the current character is a 6x multiple of q then add it to the array
                if (p % (stringGroupsArray[i].length / 6)  === q){
                    transArray[i] += stringGroupsArray[i].charAt(p);
                }
            }
        }
    }
    console.log(transArray);

    //need code to scramble last group if single character???????????????????

    //combine the transposed groups back into one string
    let stringPostTrans = transArray.join('');

    //split into groups for each character (stringPostTrans becomes groups of 6: ZZZZZZ, ZZZZZZ, etc)
    let stringPostTransArray = [];
    for (i = 0; i < (stringPostTrans.length / 6); i++){
        stringPostTransArray[i] = stringPostTrans.substr(i * 6, 6);
    }

    //create variable that will hold the output
    let finalDecryption = '';

    //convert from YXYXYX to YYY XXX (ADBECF -> ABC DEF)
    for (i = 0; i < stringPostTransArray.length; i++){

        //create variable to hold a YXYXYX group from the array
        let charGroup = stringPostTransArray[i];
        let charGroupY = '', charGroupX = '';

        //split group from YXYXYX to YYY and XXX
        for (r = 0; r < 3; r++){
            charGroupY += charGroup.toString().charAt(r*2);   //0,2,4 (YxYxYx)
            charGroupX += charGroup.toString().charAt(r*2+1); //1,3,5 (yXyXyX)
        }

        //combine YYY and XXX to YYYXXX
        charGroup = charGroupY.concat(charGroupX);

        //find the location of the string in the cipher table array (it has already stored these values)
        //then find the character at that location in the key
        //then add it to the final encryption string
        finalDecryption += finalKey.charAt(cipherTableArray.indexOf(charGroup));
    }

    //write the final encryption to the output box
    document.getElementById("outputBox").value = finalDecryption;
    
    //clear cipher table location box
    document.getElementById("tableLocation").textContent = '';
    document.getElementById("tableLocation").style.display = "none";
}

//copy the text of the output box
document.getElementById("copyText").onclick = function() {
    var copyTextv = document.getElementById("outputBox");
    var textArea = document.createElement("textarea");
    textArea.value = copyTextv.value;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
}

//clear the text fields
document.getElementById("clearText").onclick = function() {
    document.getElementById("keyBox").value = '';
    document.getElementById("inputBox").value = '';
    document.getElementById("outputBox").value = '';
    document.getElementById("charCount").textContent = '';
    document.getElementById("tableLocation").textContent = '';
    document.getElementById("tableLocation").style.display = "none";
    //call function to reset the keyed alphabet and cipher table
    resetAlphabet();
}

//user clicks random key --> call random shuffle function
document.getElementById("randomKey").onclick = function() {
    var k = defaultAlphabet;
    k = shuffle(k);
    document.getElementById("keyBox").value = k;
}

//random shuffle function
function shuffle(k) {
    var arr = k.split('');           // Convert String to array
    arr.sort(function() {
      return 0.5 - Math.random();
    });  
    k = arr.join('');                // Convert Array to string
    return k;                        // Return shuffled string
}

//live character counter
document.getElementById("inputBox").onkeyup = function(){
    document.getElementById("charCount").textContent = 'Character count: ' + this.value.length;
    document.getElementById("charCount").style.display = "inherit";
}

//sanitize input
document.getElementById("sanitize").onclick = function() {
    var punctRE = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-\/:;<=>@\[\]^_`{|}~]/g;
    var spaceRE = /\s+/g;
    var str = document.getElementById("inputBox").value;
    document.getElementById("inputBox").value = str.replace(/[?!]/g, '.').replace(punctRE, '').replace(spaceRE, ' ');
}

//user clicks cipher table to find letter location
document.getElementById("cipherTableMatrix").onclick = e => {
    //console.log(e.target);  // to get the element

    //if the target has been named with an id
    if(e.target.id){
        //get id of clicked table cell
        let clickedChar = e.target.id;
            
        //remove "t" from id name (t31 -> 31)
        clickedCharIndex = clickedChar.replace("t", '');

        //get the letter at that location from the keyed alphabet
        clickedChar = document.getElementById("keyedAlphabet").textContent.charAt(clickedCharIndex);

        //get YX positions
        let charYPosInKey = Math.floor(clickedCharIndex / 8);
        let charXPosInKey = clickedCharIndex % 8;

        //convert YX positions to binary & make each 3 characters long (1 becomes 001, 10 becomes 010, etc)
        charYPosInKey = "000".substr(charYPosInKey.toString(2).length) + charYPosInKey.toString(2);
        charXPosInKey = "000".substr(charXPosInKey.toString(2).length) + charXPosInKey.toString(2);

        //create variable that will contain the merged YX positions
        let mergedCharPositions = ''

        //convert from two variables (YYY XXX) to one (YXYXYX)  
        for (z=0; z < 3; z++){
            mergedCharPositions += charYPosInKey.charAt(z).concat(charXPosInKey.charAt(z));
        }

        document.getElementById("tableLocation").textContent = 'Location of "' +  clickedChar + '" = ' + mergedCharPositions;
        document.getElementById("tableLocation").style.display = "inherit";

       
        //console.log('Location of "' + clickedChar + '" = ' +mergedCharPositions);
    }
    
} 