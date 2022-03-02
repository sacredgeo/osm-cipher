const defaultAlphabet =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_.";


let cipherTableArray = [];
let warningActive = false;

function pageLoad() {
  resetAlphabet();
}

function resetAlphabet() {
  document.getElementById("keyedAlphabet").textContent = defaultAlphabet;
  for (let i = 0; i < defaultAlphabet.length; i++) {
    document.getElementById("t" + i).textContent = defaultAlphabet[i];
  }
}

function getKey(k) {
  let keyInput = document.getElementById("keyBox").value;
  var useBase = document.getElementById("useBase64");

  if (useBase.checked) {
    let keyInputB64 = btoa(keyInput);
    keyInput = keyInputB64
      .replace(/=/g, "")
      .replace(/\//g, ".")
      .replace(/\+/g, "_");
  }

  let keyInputNoRepeated = keyInput
    .split("")
    .filter(
      (value, currentIndex, array) => array.indexOf(value) === currentIndex
    );

  let keyInputNoRepeatedJoined = keyInputNoRepeated.join("");
  let keyWithAlphabet = keyInputNoRepeatedJoined + defaultAlphabet;
  let keyWithAlphabetNoRepeated = keyWithAlphabet
    .split("")
    .filter(
      (value, currentIndex, array) => array.indexOf(value) === currentIndex
    );

  k = keyWithAlphabetNoRepeated.join("");
  document.getElementById("keyedAlphabet").textContent = k;

  return k;
}

function getKeyYX(finalKey) {
  for (let i = 0; i < finalKey.length; i++) {
    let charXPos = i % 8;
    let charYPos = Math.floor(i / 8);

    charYPos = "000".substring(charYPos.toString(2).length) + charYPos.toString(2);
    charXPos = "000".substring(charXPos.toString(2).length) + charXPos.toString(2);

    cipherTableArray[i] = charYPos.concat(charXPos);
    document.getElementById("t" + i).textContent = finalKey.charAt(i);
  }
}

function getInputYX(inputText, finalKey, stringPreTrans) {
  for (i = 0; i < inputText.length; i++) {
    currentCharPosInKey = finalKey.indexOf(inputText.charAt(i));

    let charYPosInKey = Math.floor(currentCharPosInKey / 8);
    let charXPosInKey = currentCharPosInKey % 8;

    charYPosInKey =
      "000".substring(charYPosInKey.toString(2).length) +
      charYPosInKey.toString(2);
    charXPosInKey =
      "000".substring(charXPosInKey.toString(2).length) +
      charXPosInKey.toString(2);

    let mergedCharPositions = "";

    for (z = 0; z < 3; z++) {
      mergedCharPositions += charYPosInKey
        .charAt(z)
        .concat(charXPosInKey.charAt(z));
    }

    stringPreTrans += mergedCharPositions;
  }
  return stringPreTrans;
}

document.getElementById("encrypt").onclick = function () {
  if (document.getElementById("groupSizeM").checked) {
    if (document.getElementById("multiGroupSize").value == "") {
      document.getElementById("multiGroupSize").value = "5,7,6";

      document.getElementById("warningMessage").style.display = "inherit";
      document.getElementById("warningMessageText").innerHTML =
        " Group sizes not entered. Defaulted to '<b>5,7,6</b>'.";

      setTimeout(() => {
        document.getElementById("warningMessage").style.display = "none";
      }, 6000);
    }
  }

  let k;
  let finalKey = getKey(k);

  getKeyYX(finalKey);

  let inputText = document.getElementById("inputBox").value;
  inputText = inputText.replaceAll(" ", "_");

  if (document.getElementById("stream").checked) {
    var streamText = "";
    var streamKey = hashValue(finalKey);
    var finalKeyRef = streamKey;

    for (g = 0; g < inputText.length; g++) {
      streamText += streamKey.charAt(
        (64 -
          (finalKeyRef.indexOf(inputText.charAt(g)) -
            defaultAlphabet.indexOf(finalKeyRef.charAt(g % 64)))) %
          64
      );
      if ((g + 1) % 64 == 0) {
        finalKeyRef = finalKeyRef.substring(1) + finalKeyRef.charAt(0);
        finalKeyRef = hashValue(
          finalKeyRef.substring(
            0,
            6 + ((g + defaultAlphabet.indexOf(finalKeyRef.charAt(0))) % 13)
          )
        );
        streamKey = finalKeyRef;
      }
    }
    inputText = streamText;
  }
  
  if (document.getElementById("filler").checked) {
    let inputLength = inputText.length;
    inputText = inputText.split("");

    let fillerPeriod;
    if (document.getElementById("groupSizeS").checked) {
      fillerPeriod = document.getElementById("singleGroupSize").value;

      for (b = 1; b <= inputLength / (fillerPeriod - 1); b++) {
        inputText.splice(
          b * (fillerPeriod - 1) + b - 1,
          0,
          defaultAlphabet.charAt(Math.floor(Math.random() * 63))
        );
      }

    } else if (document.getElementById("groupSizeM").checked) {
      fillerPeriod = document.getElementById("multiGroupSize").value.split(",");
      let fillerPeriodAmount = fillerPeriod.length;
      let cLocation = 0.0;

      for (c = 0; c < inputLength; c++) {
        inputText.splice(
          cLocation + Number(fillerPeriod[c % fillerPeriodAmount]) - 1,
          0,
          defaultAlphabet.charAt(Math.floor(Math.random() * 63))
        );

        cLocation = cLocation + Number(fillerPeriod[c % fillerPeriodAmount]);

        if (
          cLocation + Number(fillerPeriod[(c + 1) % fillerPeriodAmount]) >
          inputLength + c + 2
        ) {
          break;
        }
      }
    }
    inputText = inputText.join("");
  }

  let currentCharPosInKey;
  let stringPreTrans = "";
  stringPreTrans = getInputYX(inputText, finalKey, stringPreTrans);

  let cipherPeriod;
  if (document.getElementById("groupSizeS").checked) {
    cipherPeriod = document.getElementById("singleGroupSize").value;
  } else if (document.getElementById("groupSizeM").checked) {
    cipherPeriod = document.getElementById("multiGroupSize").value.split(",");
  }


  let periodCycleAmount = cipherPeriod.length;
  let stringGroupCalc = stringPreTrans;
  let totalGroups = 0;
  while (stringGroupCalc.length > 0) {
    stringGroupCalc = stringGroupCalc.substring(
      6 * cipherPeriod[totalGroups % periodCycleAmount]
    );
    totalGroups++;
  }

  let stringGroupsArray = [];

  if (document.getElementById("groupSizeS").checked) {
    for (i = 0; i < stringPreTrans.length / (cipherPeriod * 6); i++) {
      stringGroupsArray[i] = stringPreTrans.substring(
        i * cipherPeriod * 6,
        i * cipherPeriod * 6 + cipherPeriod * 6
      );

      if (i === totalGroups - 1) {
        if (stringGroupsArray[i].length < cipherPeriod * 6) {
          let padGroup = stringGroupsArray[i].length;
          for (x = 0; x < cipherPeriod * 6 - padGroup; x++) {
            stringGroupsArray[i] += Math.round(Math.random());
          }
        }
      }
    }
  } else if (document.getElementById("groupSizeM").checked) {
    let startPos = 0;
    for (i = 0; i < totalGroups; i++) {
      stringGroupsArray[i] = stringPreTrans.substring(
        startPos,
        startPos + cipherPeriod[i % cipherPeriod.length] * 6
      );
      startPos += cipherPeriod[i % cipherPeriod.length] * 6;

      if (i === totalGroups - 1) {
        if (
          stringGroupsArray[i].length <
          cipherPeriod[i % cipherPeriod.length] * 6
        ) {
          let padGroup = stringGroupsArray[i].length;
          for (
            x = 0;
            x < cipherPeriod[i % cipherPeriod.length] * 6 - padGroup;
            x++
          ) {
            stringGroupsArray[i] += Math.round(Math.random());
          }
        }
      }
    }
  }
  
  let transArray = [];
  for (i = 0; i < stringGroupsArray.length; i++) {

    transArray[i] = [];
    for (q = 0; q < 6; q++) {
      for (p = 0; p < stringGroupsArray[i].length; p++) {
        if (p % 6 === q) {
          transArray[i] += stringGroupsArray[i].charAt(p);
        }
      }
    }
  }
  
  let stringPostTrans = transArray.join("");
  let stringPostTransArray = [];
  for (i = 0; i < stringPostTrans.length / 6; i++) {
    stringPostTransArray[i] = stringPostTrans.substring(i * 6, i * 6 + 6);
  }

  let finalEncryption = "";

  for (i = 0; i < stringPostTransArray.length; i++) {
    let charGroup = stringPostTransArray[i];
    let charGroupY = "",
      charGroupX = "";

    for (r = 0; r < 3; r++) {
      charGroupY += charGroup.toString().charAt(r * 2); 
      charGroupX += charGroup.toString().charAt(r * 2 + 1); 
    }
    
    charGroup = charGroupY.concat(charGroupX);

    finalEncryption += finalKey.charAt(cipherTableArray.indexOf(charGroup));
  }
  
  let outputXor = "";
  for (i = 0; i < finalEncryption.length; i++) {
    outputXor += (
      finalEncryption.charCodeAt(i).toString(10) ^
      finalKey.charCodeAt(i % finalKey.length).toString(10)
    ).toString(16);
  
  }

  document.getElementById("outputBox").value = finalEncryption;
  document.getElementById("tableLocation").textContent = "";
  document.getElementById("tableLocation").style.display = "none";
};

document.getElementById("decrypt").onclick = function () {
  if (document.getElementById("groupSizeM").checked) {
    if (document.getElementById("multiGroupSize").value == "") {
      document.getElementById("multiGroupSize").value = "5,7,6";

      document.getElementById("warningMessage").style.display = "inherit";
      document.getElementById("warningMessageText").innerHTML =
        " Group sizes not entered. Defaulted to '<b>5,7,6</b>'.";

      setTimeout(() => {
        document.getElementById("warningMessage").style.display = "none";
      }, 6000);
    }
  }

  let k;
  let finalKey = getKey(k);
  getKeyYX(finalKey);

  let inputText = document.getElementById("inputBox").value;
  inputText = inputText.replaceAll(" ", "_");

  let currentCharPosInKey;

  let stringPreTrans = "";
  stringPreTrans = getInputYX(inputText, finalKey, stringPreTrans);

  let cipherPeriod;
  if (document.getElementById("groupSizeS").checked) {
    cipherPeriod = document.getElementById("singleGroupSize").value;
  } else if (document.getElementById("groupSizeM").checked) {
    cipherPeriod = document.getElementById("multiGroupSize").value.split(",");
  }

  let periodCycleAmount = cipherPeriod.length;

  let stringGroupCalc = stringPreTrans;

  let totalGroups = 0;
  while (stringGroupCalc.length > 0) {
    stringGroupCalc = stringGroupCalc.substring(
      6 * cipherPeriod[totalGroups % periodCycleAmount]
    );
    totalGroups++;
  }

  let stringGroupsArray = [];

  if (document.getElementById("groupSizeS").checked) {
    for (i = 0; i < stringPreTrans.length / (cipherPeriod * 6); i++) {
      stringGroupsArray[i] = stringPreTrans.substring(
        i * cipherPeriod * 6,
        i * cipherPeriod * 6 + cipherPeriod * 6
      );
    }
  } else if (document.getElementById("groupSizeM").checked) {
    let startPos = 0;
    for (i = 0; i < totalGroups; i++) {
      stringGroupsArray[i] = stringPreTrans.substring(
        startPos,
        startPos + cipherPeriod[i % cipherPeriod.length] * 6
      );
      startPos += cipherPeriod[i % cipherPeriod.length] * 6;
    }
  }
 
  let transArray = [];

  for (i = 0; i < stringGroupsArray.length; i++) {
    transArray[i] = [];
    for (q = 0; q < stringGroupsArray[i].length / 6; q++) {
      for (p = 0; p < stringGroupsArray[i].length; p++) {
        if (p % (stringGroupsArray[i].length / 6) === q) {
          transArray[i] += stringGroupsArray[i].charAt(p);
        }
      }
    }
  }

  let stringPostTrans = transArray.join("");

  let stringPostTransArray = [];
  for (i = 0; i < stringPostTrans.length / 6; i++) {
    stringPostTransArray[i] = stringPostTrans.substring(i * 6, i * 6 + 6);
  }

  let finalDecryption = "";

  for (i = 0; i < stringPostTransArray.length; i++) {
    let charGroup = stringPostTransArray[i];
    let charGroupY = "",
      charGroupX = "";

    for (r = 0; r < 3; r++) {
      charGroupY += charGroup.toString().charAt(r * 2);
      charGroupX += charGroup.toString().charAt(r * 2 + 1);
    }
    charGroup = charGroupY.concat(charGroupX);

    finalDecryption += finalKey.charAt(cipherTableArray.indexOf(charGroup));
  }

  if (document.getElementById("filler").checked) {
    let fillerPeriod;
    let startIndex = 0;
    let newStrArray = [];

    if (document.getElementById("groupSizeS").checked) {
      fillerPeriod = document.getElementById("singleGroupSize").value;

      while (startIndex < finalDecryption.length) {
        newStrArray.push(
          finalDecryption.substring(
            startIndex,
            startIndex + Number(fillerPeriod) - 1
          )
        );
        startIndex += Number(fillerPeriod);
      }
      finalDecryption = newStrArray.join("");
      
    } else if (document.getElementById("groupSizeM").checked) {
      fillerPeriod = document.getElementById("multiGroupSize").value.split(",");

      let fillerPeriodAmount = fillerPeriod.length;
      let c = 0;
      while (startIndex < finalDecryption.length) {
        newStrArray.push(
          finalDecryption.substring(
            startIndex,
            startIndex + Number(fillerPeriod[c % fillerPeriodAmount]) - 1
          )
        );
        startIndex += Number(fillerPeriod[c % fillerPeriodAmount]);
        c++;
      }
      finalDecryption = newStrArray.join("");
    }
  }

  if (document.getElementById("stream").checked) {
    var streamText = "";
    var streamKey = hashValue(finalKey);
    var finalKeyRef = streamKey;
    for (g = 0; g < finalDecryption.length; g++) {
      streamText += streamKey.charAt(
        (64 -
          (finalKeyRef.indexOf(finalDecryption.charAt(g)) -
            defaultAlphabet.indexOf(finalKeyRef.charAt(g % 64)))) %
          64
      );
      if ((g + 1) % 64 == 0) {
        finalKeyRef = finalKeyRef.substring(1) + finalKeyRef.charAt(0);
        finalKeyRef = hashValue(
          finalKeyRef.substring(
            0,
            6 + ((g + defaultAlphabet.indexOf(finalKeyRef.charAt(0))) % 13)
          )
        );
        streamKey = finalKeyRef;
      }
    }
    finalDecryption = streamText;
  }

  finalDecryption = finalDecryption.replaceAll("_", " ");
  document.getElementById("outputBox").value = finalDecryption;
  document.getElementById("tableLocation").textContent = "";
  document.getElementById("tableLocation").style.display = "none";
};

document.getElementById("copyText").onclick = function () {
  var copyTextv = document.getElementById("outputBox");
  var textArea = document.createElement("textarea");
  textArea.value = copyTextv.value;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("Copy");
  textArea.remove();
};


document.getElementById("clearText").onclick = function () {
  if (warningActive == false) {
    document.getElementById("keyBox").value = "";
  }
  document.getElementById("inputBox").value = "";
  document.getElementById("outputBox").value = "";
  document.getElementById("charCount").textContent = "";
  document.getElementById("charCount").style.display = "none";
  document.getElementById("tableLocation").textContent = "";
  document.getElementById("tableLocation").style.display = "none";
  document.getElementById("inputBox").style.background = "white";
  document.getElementById("sanitize").style.outline = "none";
  resetAlphabet();
};

document.getElementById("randomKey").onclick = function () {
  if (warningActive == false) {
    var k = defaultAlphabet;
    k = shuffle(k);
    document.getElementById("keyBox").value = k;
  }
};


function shuffle(k) {
  var arr = k.split(""); 
  arr.sort(function () {
    return 0.5 - Math.random();
  });
  k = arr.join(""); 
  return k; 
}

document.getElementById("multiGroupSize").oninput = function () {
  if (document.getElementById("inputBox").value.length > 0) {
    paddingChecker();
  }
};
document.getElementById("singleGroupSize").oninput = function () {
  if (document.getElementById("inputBox").value.length > 0) {
    paddingChecker();
  }
}

document.getElementById("inputBox").oninput = function () {
  document.getElementById("charCount").textContent =
    "Character count: " + this.value.length;
  document.getElementById("charCount").style.display = "inherit";
  let inputCheck = document.getElementById("inputBox").value;

  if (inputCheck.length > 0) {
    if (/[^a-zA-Z0-9\_\ \.]/.test(inputCheck)) {
      document.getElementById("inputBox").style.background =
        "linear-gradient(180deg, rgba(255,0,0,0.2) 0%, rgba(255,255,255,0) 100%)";
      document.getElementById("sanitize").style.outline = "2px solid red";
    } else {
      document.getElementById("inputBox").style.background = "white";
      document.getElementById("sanitize").style.outline = "none";
    }
  } else {
    document.getElementById("inputBox").style.background = "white";
    document.getElementById("sanitize").style.outline = "none";
  }
  paddingChecker();
};

paddingChecker = function () {
  let inputText = document.getElementById("inputBox").value;
  let paddingMatch;
  
  if (document.getElementById("groupSizeS").checked) {
    let singlePeriod = document.getElementById("singleGroupSize").value;

    if (document.getElementById("filler").checked) {
      if (inputText.length % (singlePeriod - 1) == 0) {
        paddingMatch = true;
      } else {
        paddingMatch = false;
      }
    } else {
      if (inputText.length % singlePeriod == 0) {
        paddingMatch = true;
      } else {
        paddingMatch = false;
      }
    }
  } else if (document.getElementById("groupSizeM").checked) {
    let multiPeriod = [];
    multiPeriod = document.getElementById("multiGroupSize").value.split(",");
    let totalPeriod = 0;
    let remainingPeriod = 0;
    for (m = 0; m < multiPeriod.length; m++) {
      totalPeriod += +multiPeriod[m];
    }
    if (document.getElementById("filler").checked) {
      console.log(totalPeriod - multiPeriod.length);
      if (inputText.length % (totalPeriod - multiPeriod.length) == 0) {
        paddingMatch = true;
      } else {
        document.getElementById("charCount").style.color = "black";
        remainingPeriod = inputText.length % (totalPeriod - multiPeriod.length);
        for (m = 0; m < multiPeriod.length; m++) {
          remainingPeriod -= +multiPeriod[m] - 1;
          if (remainingPeriod == 0) {
            paddingMatch = true;
            break;
          } else if (remainingPeriod < 0) {
            paddingMatch = false;
            break;
          }
        }
      }
    } else {
      if (inputText.length % totalPeriod == 0) {
        paddingMatch = true;
      } else {
        remainingPeriod = inputText.length % totalPeriod;
        for (m = 0; m < multiPeriod.length; m++) {
          remainingPeriod -= +multiPeriod[m];
          if (remainingPeriod == 0) {
            paddingMatch = true;
            break;
          } else if (remainingPeriod < 0) {
            paddingMatch = false;
            break;
          }
        }
      }
    }
  }
  if (paddingMatch == true) {
    document.getElementById("charCount").style.color = "var(--b7)";
    document.getElementById("charCount").style.border = "1px solid var(--b5)";
    document.getElementById("charCount").style.backgroundColor = "#0095c72a";
  } else {
    document.getElementById("charCount").style.color = "black";
    document.getElementById("charCount").style.border = "1px solid #dddddd";
    document.getElementById("charCount").style.backgroundColor = "#e1e1e1";
  }
};

document.getElementById("filler").onclick = function () {
  if (document.getElementById("inputBox").value.length > 0) {
    paddingChecker();
  } else {
    console.log("empty");
  }
};

document.getElementById("sanitize").onclick = function () {
  var punctRE =
    /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-\/:;<=>@\[\]^`{|}~]/g;
  var spaceRE = /\s+/g;
  var str = document.getElementById("inputBox").value;
  document.getElementById("inputBox").value = str
    .replace(/[?!]/g, ".")
    .replace(punctRE, "")
    .replace(spaceRE, " ");

  document.getElementById("inputBox").style.background = "white";
  document.getElementById("sanitize").style.outline = "none";
  document.getElementById("charCount").textContent =
    "Character count: " + document.getElementById("inputBox").value.length;
  paddingChecker();
};

document.getElementById("cipherTableMatrix").onclick = (e) => {
  if (e.target.id) {
    let clickedChar = e.target.id;
    clickedCharIndex = clickedChar.replace("t", "");

    clickedChar = document
      .getElementById("keyedAlphabet")
      .textContent.charAt(clickedCharIndex);

    let charYPosInKey = Math.floor(clickedCharIndex / 8);
    let charXPosInKey = clickedCharIndex % 8;

    charYPosInKey =
      "000".substring(charYPosInKey.toString(2).length) +
      charYPosInKey.toString(2);
    charXPosInKey =
      "000".substring(charXPosInKey.toString(2).length) +
      charXPosInKey.toString(2);

    let mergedCharPositions = "";

    for (z = 0; z < 3; z++) {
      mergedCharPositions += charYPosInKey
        .charAt(z)
        .concat(charXPosInKey.charAt(z));
    }

    document.getElementById("tableLocation").textContent =
      'Location of "' + clickedChar + '" = ' + mergedCharPositions;
    document.getElementById("tableLocation").style.display = "inherit";
  }
};

document.getElementById("genKey").onclick = function () {
  if (warningActive == false) {
    if (document.getElementById("keyBox").value == "") {
      document.getElementById("keyBox").style.background =
        "linear-gradient(180deg, rgba(255,0,0,0.2) 0%, rgba(255,255,255,0) 100%)";
      document.getElementById("keyBox").style.textAlign = "center";
      document.getElementById("keyBox").style.color = "#333333";
      document.getElementById("keyBox").value = "Please enter a key first.";
      document.getElementById("keyBox").disabled = true;
      document.getElementById("keyBox").style.pointerEvents = "none";
      warningActive = true;

      setTimeout(() => {
        document.getElementById("keyBox").style.background = "white";
        document.getElementById("keyBox").value = "";
        document.getElementById("keyBox").style.textAlign = "left";
        document.getElementById("keyBox").style.color = "black";
        document.getElementById("keyBox").disabled = false;
        document.getElementById("keyBox").style.pointerEvents = "auto";
        warningActive = false;
      }, 2500);
    } else {
      var keygen = document.getElementById("keyBox").value;
      document.getElementById("keyBox").value = hashValue(keygen);
    }
  }
};

document.getElementById("warningButton").onclick = function () {
  document.getElementById("warningMessage").style.display = "none";
};

function hashValue(keygen) {
  var kLength = keygen.length;
  var kAlphabet =
    "xcFVXHSJRg2BkM5P0i4oYdZpODNGth6ajAq3Ur_uQWvwEIfe9KbCTzm.7nyl1s8L";
  var kDefaultAlphabet =
    "xcFVXHSJRg2BkM5P0i4oYdZpODNGth6ajAq3Ur_uQWvwEIfe9KbCTzm.7nyl1s8L";

  var newKey = "";
  var newChar;
  var kAdded = 0;
  
  for (i = 0; i < kLength; i++) {
    kAdded += kDefaultAlphabet.indexOf(keygen.charAt(i)) * (i + 1); 
  }
  kAdded += 331;

  for (i = 0; i < 64; i++) {
    newChar = kAlphabet.charAt(
      (kDefaultAlphabet.indexOf(keygen.charAt(i % kLength)) +
        (kAdded * (71 - i) + i) * kLength +
        1) %
        kAlphabet.length
    );
    
    newKey += newChar;
    kAlphabet = kAlphabet.replaceAll(newChar, "");
  }

  newKey = newKey.split("").reverse().join("");
  var newKeyFinal = "";
  for (i = 0; i < newKey.length / 2; i++) {
    newKeyFinal += newKey.charAt(i) + newKey.charAt(i + newKey.length / 2);
  }

  keygen = newKeyFinal;
  return keygen;
}
