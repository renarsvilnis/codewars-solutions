'use strict';

/**
 * CSV Parser.  Takes a string as input and returns
 * an array of arrays (for each row).
 *
 * http://www.codewars.com/kata/525ca723b6aecee8c900033c/train/javascript
 * 
 * @param input String, CSV input
 * @param separator String, single character used to separate fields.
 *        Defaults to ","
 * @param quote String, single character used to quote non-simple fields.
 *        Defaults to "\"".
 */
function parseCSV (input, separator = ',', quote = '"') {
  let parsedCSV = [];
  let line = [];

  let buffer = '';
  let openedQuotes = false;

  function clearLine () {
    clearBuffer();
    parsedCSV.push(line);
    line = [];
  }

  function clearBuffer () {
    line.push(buffer);
    buffer = '';
    openedQuotes = false;
  }

  // check type methods for clearer code
  const isNewline = (symbol) => symbol === '\n' && !openedQuotes;
  const isSeperator = (symbol) => symbol === separator && !openedQuotes;
  const isQuote = (symbol) => symbol === quote;
  const isDoubleQuoute = (symbol, nextSymbol, nextNextSymobl) => symbol === quote && nextSymbol === quote && !isSeperator(nextNextSymobl);

  for(let i = 0, l = input.length; i < l; i++) {
    const symbol = input[i];
    
    if (isNewline(symbol)) {
      clearLine();
      continue;
    }

    if (isSeperator(symbol)) {
      clearBuffer();
      continue;
    }

    if (isDoubleQuoute(symbol, input[i + 1], input[i + 2])) {
      buffer += `${quote}`;
      i++;
      continue;
    }

    if (isQuote(symbol)) {
      openedQuotes = !openedQuotes;      
      continue;
    }

    buffer += symbol;
  }

  // handle the last element in row as it doesn't have a seperator
  clearLine();

  return parsedCSV;
}
