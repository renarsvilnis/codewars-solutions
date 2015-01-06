function anagrams(word, words) {
  var wordLength = word.length,
      wordsLenght = words.length,
      wordLetters = {},
      ret = [];
    
  wordLetters = analyzeString(word);

  for (var i = 0; i < wordsLenght; i++) {
    var tempWord = words[i];
        tempWordLetters = analyzeString(tempWord);

    if(compareLetterCount(wordLetters, tempWordLetters))
      ret.push(tempWord);
  }

  return ret;
}


// count each letter of string
// return object
function analyzeString (string) {
  var stringLength = string.length,
      ret = {};

  for (var i = 0; i < stringLength; i++) {
    if (typeof ret[string[i]] === 'undefined') {
      ret[string[i]] = 1;
    } else {
      ret[string[i]]++;
    }
  }

  return ret;
}

function compareLetterCount (a, b) {

  // if count if isn't equal then isn't anagrams
  if(Object.keys(a).length !== Object.keys(b).length)
    return false;

  for (var letter in a) {

    // if b doesn't have key
    if (typeof b[letter] === 'undefined')
      return false;

    // if isn't the same length
    if (a[letter] !== b[letter])
      return false;
  }

  return true;
}


// should return [];
console.log(anagrams('abba', ['abbba']));

// should return ['aabb', 'bbaa'];
console.log(anagrams('abba', ['aabb', 'abcd', 'bbaa', 'dada']));

// should return ['carer', racer'];
console.log(anagrams('racer', ['crazer', 'carer', 'racar', 'caers', 'racer']));

// should return [];
console.log(anagrams('laser', ['lazing', 'lazy', 'lacer']));