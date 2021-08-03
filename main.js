let defaultAlphabet =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .'

let cipherTableArray = []

function pageLoad () {
  resetAlphabet()
}

function resetAlphabet () {
  document.getElementById('keyedAlphabet').textContent = defaultAlphabet
  for (let i = 0; i < defaultAlphabet.length; i++) {
    document.getElementById('t' + i).textContent = defaultAlphabet[i]
  }
}

function getKey (k) {
  let keyInput = document.getElementById('keyBox').value
  var useBase = document.getElementById('useBase64')
  if (useBase.checked) {
    let keyInputB64 = btoa(keyInput)
    keyInput = keyInputB64
      .replace(/=/g, '')
      .replace(/\//g, ' ')
      .replace(/\+/g, '.')
  }
  let keyInputNoRepeated = keyInput
    .split('')
    .filter(
      (value, currentIndex, array) => array.indexOf(value) === currentIndex
    )
  let keyInputNoRepeatedJoined = keyInputNoRepeated.join('')
  let keyWithAlphabet = keyInputNoRepeatedJoined + defaultAlphabet
  let keyWithAlphabetNoRepeated = keyWithAlphabet
    .split('')
    .filter(
      (value, currentIndex, array) => array.indexOf(value) === currentIndex
    )
  k = keyWithAlphabetNoRepeated.join('')
  document.getElementById('keyedAlphabet').textContent = k
  return k
}

function getKeyYX (finalKey) {
  for (let i = 0; i < finalKey.length; i++) {
    let charXPos = i % 8
    let charYPos = Math.floor(i / 8)
    charYPos = '000'.substr(charYPos.toString(2).length) + charYPos.toString(2)
    charXPos = '000'.substr(charXPos.toString(2).length) + charXPos.toString(2)
    cipherTableArray[i] = charYPos.concat(charXPos)
    document.getElementById('t' + i).textContent = finalKey.charAt(i)
  }
}

function getInputYX (inputText, finalKey, stringPreTrans) {
  for (i = 0; i < inputText.length; i++) {
    currentCharPosInKey = finalKey.indexOf(inputText.charAt(i))
    let charYPosInKey = Math.floor(currentCharPosInKey / 8)
    let charXPosInKey = currentCharPosInKey % 8
    charYPosInKey =
      '000'.substr(charYPosInKey.toString(2).length) + charYPosInKey.toString(2)
    charXPosInKey =
      '000'.substr(charXPosInKey.toString(2).length) + charXPosInKey.toString(2)
    let mergedCharPositions = ''
    for (z = 0; z < 3; z++) {
      mergedCharPositions += charYPosInKey
        .charAt(z)
        .concat(charXPosInKey.charAt(z))
    }
    stringPreTrans += mergedCharPositions
  }
  return stringPreTrans
}

document.getElementById('encrypt').onclick = function () {
  let k
  let finalKey = getKey(k)
  getKeyYX(finalKey)
  let inputText = document.getElementById('inputBox').value
  let stringPreTrans = ''
  stringPreTrans = getInputYX(inputText, finalKey, stringPreTrans)
  let cipherPeriod
  if (document.getElementById('groupSizeS').checked) {
    cipherPeriod = document.getElementById('singleGroupSize').value
  } else if (document.getElementById('groupSizeM').checked) {
    cipherPeriod = document.getElementById('multiGroupSize').value.split(',')
  }
  let periodCycleAmount = cipherPeriod.length
  let stringGroupCalc = stringPreTrans
  let totalGroups = 0
  while (stringGroupCalc.length > 0) {
    stringGroupCalc = stringGroupCalc.substring(
      6 * cipherPeriod[totalGroups % periodCycleAmount]
    )
    totalGroups++
  }
  let stringGroupsArray = []
  if (document.getElementById('groupSizeS').checked) {
    for (i = 0; i < stringPreTrans.length / (cipherPeriod * 6); i++) {
      stringGroupsArray[i] = stringPreTrans.substr(
        i * cipherPeriod * 6,
        cipherPeriod * 6
      )
    }
  } else if (document.getElementById('groupSizeM').checked) {
    let startPos = 0
    for (i = 0; i < totalGroups; i++) {
      stringGroupsArray[i] = stringPreTrans.substr(
        startPos,
        cipherPeriod[i % cipherPeriod.length] * 6
      )
      startPos += cipherPeriod[i % cipherPeriod.length] * 6
    }
  }
  let transArray = []
  for (i = 0; i < stringGroupsArray.length; i++) {
    transArray[i] = [];
    for (q = 0; q < 6; q++) {
      for (p = 0; p < stringGroupsArray[i].length; p++) {
        if (p % 6 === q) {
          transArray[i] += stringGroupsArray[i].charAt(p)
        }
      }
    }
  }
  let stringPostTrans = transArray.join('')
  let stringPostTransArray = []
  for (i = 0; i < stringPostTrans.length / 6; i++) {
    stringPostTransArray[i] = stringPostTrans.substr(i * 6, 6)
  }
  let finalEncryption = ''
  for (i = 0; i < stringPostTransArray.length; i++) {
    let charGroup = stringPostTransArray[i]
    let charGroupY = '',
      charGroupX = ''
    for (r = 0; r < 3; r++) {
      charGroupY += charGroup.toString().charAt(r * 2) 
      charGroupX += charGroup.toString().charAt(r * 2 + 1) 
    }
    charGroup = charGroupY.concat(charGroupX)
    finalEncryption += finalKey.charAt(cipherTableArray.indexOf(charGroup))
  }
  document.getElementById('outputBox').value = finalEncryption
  document.getElementById('tableLocation').textContent = ''
  document.getElementById('tableLocation').style.display = 'none'
}

document.getElementById('decrypt').onclick = function () {
  let k
  let finalKey = getKey(k)
  getKeyYX(finalKey)
  let inputText = document.getElementById('inputBox').value
  let stringPreTrans = ''
  stringPreTrans = getInputYX(inputText, finalKey, stringPreTrans)
  let cipherPeriod
  if (document.getElementById('groupSizeS').checked) {
    cipherPeriod = document.getElementById('singleGroupSize').value
  } else if (document.getElementById('groupSizeM').checked) {
    cipherPeriod = document.getElementById('multiGroupSize').value.split(',')
  }
  let periodCycleAmount = cipherPeriod.length
  let stringGroupCalc = stringPreTrans
  let totalGroups = 0
  while (stringGroupCalc.length > 0) {
    stringGroupCalc = stringGroupCalc.substring(
      6 * cipherPeriod[totalGroups % periodCycleAmount]
    )
    totalGroups++
  }
  let stringGroupsArray = []
  if (document.getElementById('groupSizeS').checked) {
    for (i = 0; i < stringPreTrans.length / (cipherPeriod * 6); i++) {
      stringGroupsArray[i] = stringPreTrans.substr(
        i * cipherPeriod * 6,
        cipherPeriod * 6
      )
    }
  } else if (document.getElementById('groupSizeM').checked) {
    let startPos = 0
    for (i = 0; i < totalGroups; i++) {
      stringGroupsArray[i] = stringPreTrans.substr(
        startPos,
        cipherPeriod[i % cipherPeriod.length] * 6
      )
      startPos += cipherPeriod[i % cipherPeriod.length] * 6
    }
  }
  let transArray = []
  for (i = 0; i < stringGroupsArray.length; i++) {
    transArray[i] = []
    for (q = 0; q < stringGroupsArray[i].length / 6; q++) {
      for (p = 0; p < stringGroupsArray[i].length; p++) {
        if (p % (stringGroupsArray[i].length / 6) === q) {
          transArray[i] += stringGroupsArray[i].charAt(p)
        }
      }
    }
  }
  let stringPostTrans = transArray.join('')
  let stringPostTransArray = []
  for (i = 0; i < stringPostTrans.length / 6; i++) {
    stringPostTransArray[i] = stringPostTrans.substr(i * 6, 6)
  }
  let finalDecryption = ''
  for (i = 0; i < stringPostTransArray.length; i++) {
    let charGroup = stringPostTransArray[i]
    let charGroupY = '',
      charGroupX = ''
    for (r = 0; r < 3; r++) {
      charGroupY += charGroup.toString().charAt(r * 2) 
      charGroupX += charGroup.toString().charAt(r * 2 + 1) 
    }
    charGroup = charGroupY.concat(charGroupX)
    finalDecryption += finalKey.charAt(cipherTableArray.indexOf(charGroup))
  }
  document.getElementById('outputBox').value = finalDecryption
  document.getElementById('tableLocation').textContent = ''
  document.getElementById('tableLocation').style.display = 'none'
}

document.getElementById('copyText').onclick = function () {
  var copyTextv = document.getElementById('outputBox')
  var textArea = document.createElement('textarea')
  textArea.value = copyTextv.value
  document.body.appendChild(textArea)
  textArea.select()
  document.execCommand('Copy')
  textArea.remove()
}

document.getElementById('clearText').onclick = function () {
  document.getElementById('keyBox').value = ''
  document.getElementById('inputBox').value = ''
  document.getElementById('outputBox').value = ''
  document.getElementById('charCount').textContent = ''
  document.getElementById('tableLocation').textContent = ''
  document.getElementById('tableLocation').style.display = 'none'
  resetAlphabet()
}

document.getElementById('randomKey').onclick = function () {
  var k = defaultAlphabet
  k = shuffle(k)
  document.getElementById('keyBox').value = k
}

function shuffle (k) {
  var arr = k.split('') 
  arr.sort(function () {
    return 0.5 - Math.random()
  })
  k = arr.join('') 
  return k 
}

document.getElementById('inputBox').onkeyup = function () {
  document.getElementById('charCount').textContent =
    'Character count: ' + this.value.length
  document.getElementById('charCount').style.display = 'inherit'
}

document.getElementById('sanitize').onclick = function () {
  var punctRE = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-\/:;<=>@\[\]^_`{|}~]/g
  var spaceRE = /\s+/g
  var str = document.getElementById('inputBox').value
  document.getElementById('inputBox').value = str
    .replace(/[?!]/g, '.')
    .replace(punctRE, '')
    .replace(spaceRE, ' ')
}

document.getElementById('cipherTableMatrix').onclick = e => {
  if (e.target.id) {
    let clickedChar = e.target.id
    clickedCharIndex = clickedChar.replace('t', '')
    clickedChar = document
      .getElementById('keyedAlphabet')
      .textContent.charAt(clickedCharIndex)
    let charYPosInKey = Math.floor(clickedCharIndex / 8)
    let charXPosInKey = clickedCharIndex % 8
    charYPosInKey =
      '000'.substr(charYPosInKey.toString(2).length) + charYPosInKey.toString(2)
    charXPosInKey =
      '000'.substr(charXPosInKey.toString(2).length) + charXPosInKey.toString(2)
    let mergedCharPositions = ''
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
