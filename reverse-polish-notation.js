// REVERESE POLISH NOTATION
// wiki - http://en.wikipedia.org/wiki/Reverse_Polish_notation
// kata - http://www.codewars.com/kata/52f78966747862fc9a0009ae/train/javascript
// 
// examples
// (a+b)*c => abc*+ (post fix)
// 5 1 2 + 4 * + 3 - =>  5 + (1 + 2 * 4) - 3

var assert = require('assert');

function calc(expr) {
  var stack = [0];

  expr.split(/\s/).filter(function (element) {
    if (element === "" || element === null)
      return false;
    else
      return true;
  }).forEach(function (element) {

    if('+-*/'.indexOf(element) > -1) {
      var a = stack.pop();
      var b = stack.pop();
      stack.push(eval(b + element + a));
    } else {
      stack.push(element);
    }
  });

  return stack[stack.length - 1] * 1;
}

assert.equal(calc(""), 0, "Should work with empty string");
assert.equal(calc("1 2 3"), 3, "Should parse numbers");
assert.equal(calc("1 2 3.5"), 3.5, "Should parse float numbers");
assert.equal(calc("1 3 +"), 4, "Should support addition");
assert.equal(calc("1 3 *"), 3, "Should support multiplication");
assert.equal(calc("1 3 -"), -2, "Should support subtraction");
assert.equal(calc("4 2 /"), 2, "Should support division");
assert.equal(calc("10000 123 +"), 10123, "Should support large numbers");
assert.equal(calc("5 1 2 + 4 * + 3 -"), 14, "Should work with complex expressions");
