// 2048
// http://www.codewars.com/kata/547c5e9bec2cf1d311000842/train/javascript

// -----
// TO-DO
// - add cehck for game status in functions to limitdoing them if won,lost,...

var Board = function(_matrix) {
  this.matrix = _matrix;

  this.status = Board.GAME_STATES.PLAYING;

  this.direction = [0,0];
  this.moveHorizontal = null;

  // Adding support row bigger SQUARE boards
  this.size = this.matrix.length;
};

Board.MAX_VALUE = 2048;

// setting up direction as a 1x2 matrix which represents direction of [x,y]
// where 1 is forwards and -1 backwards
Board.DIRECTION_TYPES = {
  TOP: [0,1],
  RIGHT: [1,0],
  BOTTOM: [0,-1],
  LEFT: [-1,0],
};

Board.GAME_STATES = {
  PLAYING: 0,
  WON: 1,
  LOST: 2
};

Board.prototype.getBoard = function() {
  switch(this.status) {
    case Board.GAME_STATES.PLAYING:
      return this.matrix;
      break;
    case Board.GAME_STATES.WON:
      return 'Winner';
      break;
    case Board.GAME_STATES.LOST:
      return 'Game over';
      break;
  }
};

Board.prototype.isMoveHorizontal = function() {
  return this.direction[0] !== 0;
};

// Get matrix row depening on direction
Board.extractRow = function(isMoveHorizontal, index, matrix) {
  if(isMoveHorizontal) {
    return matrix[index];
  } else {
    var size = matrix.length;

    var col = [];

    for(var i = 0; i < size; i++) {
      col.push(matrix[i][index]);
    }

    return col;
  }
};

Board.prototype.extractRow = function(index) {
  return Board.extractRow(this.moveHorizontal, index, this.matrix);
};

// Add row to matrix depending on direction
Board.addRow = function(isMoveHorizontal, row, index, matrix) {
  if(isMoveHorizontal) {
    matrix[i] = row;
  } else {
    var rowCount = matrix.length;

    for(var i = 0; i < rowCount; i++) {

      if(typeof matrix[i] == 'undefined')
        matrix[i] = [];

      matrix[i][index] = row[i];
    }
  }

  return matrix;
};

Board.prototype.addRow = function(row, index) {
  this.matrix = Board.addRow(this.moveHorizontal, row, index, this.matrix);
};

Board.prototype.move = function(_direction) {

  // process direction
  this.direction = Board.DIRECTION_TYPES[_direction.toUpperCase()] || [0,0];

  // boolean about direction of move;
  this.moveHorizontal = this.isMoveHorizontal();

  var size = this.size;

  for(var i = 0; i < size; i++) {
    var row = this.extractRow(i);

    var processedRow = Row.process(this.direction, row);

    this.addRow(processedRow, i);
  }

  this.validate();

};

Board.prototype.addRandomValue = function() {

  var matrix = this.matrix;
  var size = this.size;

  var maxDoCount = size * size;
  var didCount = 0;

  if(!size)
    return [];

  // generate number to be added
  // Either 2 or 4
  var numberToAdd = Math.random() < 0.5 ? 2 : 4;

  // position of new random number;
  var x,y;

  do {
    x = ~~(Math.random() * size);
    y = ~~(Math.random() * size);

    didCount++;

    if(didCount > maxDoCount) {
      this.status = Board.GAME_STATES.LOST;
      return;
    }
  } while(matrix[x][y]);

  matrix[x][y] = numberToAdd;

  this.matrix = matrix;

  this.validate();
};

// Check after doing move and added the randomvalue
// if any moves are available or the game is won
Board.prototype.validate = function() {
  var matrix = this.matrix;
  var size = this.size;

  var canMakeMove = false;

  for(var i = 0; i < size; i++) {
    for(var j = 0; j < size; j++) {
      // check all sides of square if neighbor can be added to this or is null
      // including zeros
      var field = matrix[i][j];

      // if won
      if(field >= Board.MAX_VALUE) {
        this.status = Board.GAME_STATES.WON;
        return;

      // check if any neighbour is similar thus valid move
      } else {
        if(this.validateEl(i, j)) {
          // console.log('#', i, j);
          canMakeMove = true;
        }
      }

    }
  }

  if(!canMakeMove)
    this.status = Board.GAME_STATES.LOST;
};

Board.prototype.validateEl = function(row, col) {
  var matrix = this.matrix;
  var curr = matrix[row][col];
  var neighbours = this._getNeighbours(row, col);

  var neighbourCount = neighbours.length;
  for(var i = 0; i < neighbourCount; i++) {
    var tn = neighbours[i];
    if(Board.isMovePossible(curr, tn)) {
      // console.log('legal move', curr, tn, neighbours, matrix);
      return true;
    }
  }
  
  return false;
};

Board.prototype._getNeighbours = function(row, col) {
  var neighbours = [];
  var matrix = this.matrix;
  var size = this.size - 1;

  // TOP
  if(col > 0) {
    neighbours.push(matrix[row][col - 1]);
  }

  // RIGHT
  if(row < size) {
    neighbours.push(matrix[row + 1][col]);
  }

  // BOTTOM
  if(col < size) {
    neighbours.push(matrix[row][col + 1]);
  }

  // LEFT
  if(row > 0) {
    neighbours.push(matrix[row - 1][col]);
  }

  return neighbours;
};

// Check if anykind of move is possible
Board.isMovePossible = function(a, b) {
  return a === b || (a && Board.isNull(b));
};

Board.isNull =  function(value) {
  return value === 0 || value === '0' /*|| !value*/;
};



var Row = {

  // Invert the row if needed
  normalize: function(direction, row) {
    if(direction[0] < 0 || direction[1] < 0)
    row.reverse();
  },

  // Re-invert the row if needed
  denormalize: function(direction, row) {
    return this.normalize(direction, row);
  },

  process: function(direction, row) {
    Row.normalize(direction, row);

    for(var i = row.length; i >= 0; i--) {
      row = this._processEl(i, row);  
    }

    Row.denormalize(direction, row);
    return row;
  },

  // sum element recursive to until right of the row
  _processEl: function(i, row) {

    // we subtract thus removing necessity to check if last element each time
    var maxBoundry = row.length - 1;

    while(i < maxBoundry) {

      var curr = row[i];
      var next = row[i + 1];

      if(Board.isMovePossible(curr, next)) {
        row[i] = 0;
        row[i + 1] += curr;
        i++;
      } else {
        break;
      }
    }

    return row;
  },

};



function generateNewBoard(matrix, input) {
  var board = new Board(matrix, input);
  board.move(input);
  return board.getBoard();
}

function expectedPlusRandom(matrix) {
  var board = new Board(matrix);
  board.addRandomValue();
  return board.getBoard();
}







// var board = [
//   [0, 0, 0, 0],
//   [2, 0, 0, 2],
//   [0, 0, 0, 0],
//   [0, 0, 0, 0]
// ];

var board = [
  [ 2, 4, 8, 16 ],
  [ 16, 8, 4, 2 ],
  [ 2, 4, 8, 16 ],
  [ 16, 8, 4, 2 ]
];

var expected = [
  [0, 0, 0, 0],
  [0, 0, 0, 4],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
];

console.log('-----');
console.log(board);
newBoard = generateNewBoard(board, "right");
console.log(newBoard);
newBoard = expectedPlusRandom(newBoard);
console.log(newBoard);