// Readability is King - Flesch–Kincaid Grade Level
// 5 kyu
// http://www.codewars.com/kata/52b2cf1386b31630870005d4/train/javascript

/*
  Write a function that will calculate the Flesch–Kincaid grade level for any given string. Return the grade level rounded off to two decimal points.

  HINT: Count the number of vowels as an approximation for the number of syllables. But count groups of vowels as one (e.g. deal is one syllable).

  Ignore hyphens, dashes, apostrophes, parentheses, ellipses and abbreviations. The tests for the kata are the same as the example fixtures.

  Calculated as follows:
  (0.39 * average number of words per sentence) + (11.8 * average number of syllables per word) - 15.59

  Example:
  The turtle is leaving.
  (0.39 * 4) + (11.8 * 1.5) - 15.59 = 3.67


  Vowels: A, E, I, O, U, and sometimes Y
  Syllables: http://www.howmanysyllables.com/whataresyllables
  Ignore: -, _, ', ", {}, [], (), <>, mr.|dr.|ms.|...
 */

function fleschKincaid(text){
  var words = text.split(' ');

  var wordCount = words.length;
  var syllableCount = 0;
  var sentenceCount = 0;

  var syllableReg = /([aeiou])(?![aeiou])/ig;
  var sentenceReg = /([\.\!\?]){1}$/i;

  for(var i = 0; i < wordCount; i++) {
    var word = words[i];

    syllableCount += (word.match(syllableReg) || []).length;

    var sentenceRegResults = word.match(sentenceReg) || [];

    if(sentenceRegResults.length)
      sentenceCount++;

  }

  return 0.39 * (wordCount / sentenceCount) + 11.8 * (syllableCount / wordCount) - 15.59;
}
