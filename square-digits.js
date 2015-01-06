// Square-Digits
// Takes input string and square each digit of it
// http://www.codewars.com/kata/546e2562b03326a88e000020/train/javascript

function squareDigits(num){
  // num to string to array
  var arr = (num + '').split('');

  var arrLength = arr.length;
  for(var i = 0; i < arrLength; i++) {
    var el = arr[i];

    if(isNumber(el)) {
      arr[i] = el * el;
    }
  }

  return arr.join('') * 1;
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}


if (typeof exports !== "undefined") {
  // output 811181
  console.log(squareDigits(9119));
}
