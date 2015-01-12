// Run-length encoding
// http://www.codewars.com/kata/546dba39fa8da224e8000467/train/javascript

/*
  Your task is to write such a run-length encoding. For a given string, return a list (or array) of pairs (or arrays) [ (i1, s1), (i2, s2), …, (in, sn) ], such that one can reconstruct the original string by replicating the character sx ix times and concatening all those strings. Your run-length encoding should be minimal, ie. for all i the values si and si+1 should differ.

  https://en.wikipedia.org/w/index.php?title=Run-length_encoding&oldid=624938313

  runLengthEncoding("hello world!")
  [[1,'h'],[1,'e'],[2,'l'],[1,'o'],[1,' '],[1,'w'],[1,'o'],[1,'r'],[1,'l'],[1,'d'],[1,'!']]

  runLengthEncoding("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbb")
  [[34,'a'], [3,'b']]
 */

var runLengthEncoding = function(str){

  var size = str.length;

  if(!size)
    return [];

  var compressed = [];
  var bufferEl = str[0];
  var bufferCount = 0;

  for(var i = 0; i < size; i++) {
    var el = str[i];

    if(bufferEl === el) {
      bufferCount++;
    } else {
      compressed.push([bufferCount, bufferEl]);

      bufferEl = el;
      bufferCount = 1;
    }
  }

  compressed.push([bufferCount, bufferEl]);

  return compressed;
};
