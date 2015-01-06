// http://www.shodor.org/interactivate/activities/SierpinskiTriangle/
// http://mathworld.wolfram.com/SierpinskiSieve.html
// http://www.codewars.com/kata/53ea3ad17b5dfe1946000278
// http://eldar.mathstat.uoguelph.ca/dashlock/ftax/GSF.html

function Sierpinski(n) {

  // options
  this.level = n;
  this.dimension = Math.pow(2, n);
  this.layout = [];
  this.fillStyles = {
    'empty': 0,
    'filled': 1,
    'outofbounds': 2,
  };
  this.symbol = 'L'; // fill symbol

  // create empty layout
  // fill y
  for (var i = 0; i < this.dimension; i++) {

    var row = [];

    // fill x
    for (var j = 0; j < this.dimension; j++) {
      var cell = j <= i ? this.fillStyles['filled'] : this.fillStyles['outofbounds'];
      row.push(cell);
    }

    this.layout.push(row);
  }

  this.divide(this.dimension);
  return this.draw();
}

// draw layout
Sierpinski.prototype.draw = function () {
  var ret = '';

  for (var i = 0; i < this.dimension; i++) {

    // fill x
    for (var j = 0; j < this.dimension; j++) {
      if (this.layout[i][j] === this.fillStyles['filled'])
        ret += this.symbol + ' ';
      else
        ret += '  ';
    }

    ret += '\n';
  }

  return ret;
};

Sierpinski.prototype.divide = function (height, startX, startY) {
  startX = startX || 0;
  startY = startY || 0;

  var newHeight = height / 2;

  if(newHeight % 2 === 0) {
    this.cleanTriangle(newHeight, startX + 1, startY + newHeight);
    this.divide(newHeight, startX, startY); // upper triangles
    this.divide(newHeight, startX, startY + newHeight);
    this.divide(newHeight, startX + newHeight, startY + newHeight);
  }
};

Sierpinski.prototype.cleanTriangle = function (dim, startX, startY) {
  var endX = startX + dim - 1,
      endY = startY + dim,
      tempX = startX;

  for (var i = startY; i < endY; i++) {
    for (var j = tempX; j < endX; j++) {
      if(typeof this.layout[i] !== 'undefined' && typeof this.layout[i][j] !== 'undefined')
        this.layout[i][j] = this.fillStyles['empty'];
    }

    tempX++;
  }
};


// init function
var level = process.argv[2] || 3;
console.log(new Sierpinski(level).draw());