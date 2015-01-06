// SUDOKU SOLVER
// wiki - http://en.wikipedia.org/wiki/Sudoku_solving_algorithms

// BACKSTRACKING algorithm
// example video - https://www.youtube.com/watch?v=IX3qHsLGvq8&channel=saurabhschool
// pseido-code
// go each sqaure row by column
//    if empty try to add number firs tnumber from 1-9 that is available to place
//    if no numbers can be added then you need to backtrack
//      go back on previous posted squares, try the next available number
//        if can't place anything then continue clear current square and backtrack again
//        else stop backtracking and continue regular filling

function sudoku (puzzle) {

  var size = puzzle.length,        // puzzle size
      sizeBlock = Math.sqrt(size), // size of 1 block 
      stack = [],                  // stack of all previously visited cells
      numInit = 1;                 // initial number of cell which will be tried to blaced in 
      found = true;

  // go through each row
  for (var row = 0; row < size; row++) {

    // go throught each column in row
    for (var col = 0; col < size; col++) {

      if (!found) {
        var backTraced = false;

        while (!backTraced) {
          var prevCoord = stack.pop();

          if (typeof prevCoord == 'undefined') {
            found = true;
            backTraced = true;
          } else if (prevCoord[2] !== size) {
            row = prevCoord[0];
            col = prevCoord[1];
            numInit = prevCoord[2] + 1;
            puzzle[row][col] = 0;

            found = true;
            backTraced = true;
          } else {
            row = prevCoord[0];
            col = prevCoord[1];
            numInit = 1;
            puzzle[row][col] = 0;
          }
        }
      } // end for !found

      // skip adding value if already has assigned
      if(puzzle[row][col])
        continue;

      // try and place number
      for (var num = numInit; num <= size; num++) {

        if (sudokuNumFound(puzzle, size, sizeBlock, row, col, num)) {
          stack.push([row, col, num]);
          puzzle[row][col] = num;
          found = true;
          numInit = 1;
          break;
        } else {
          found = false;
        }
            
      } // end for num
    } // end for col
  } // end for row

  return puzzle;
}

function sudokuNumFound (puzzle, size, sizeBlock, row, col, num) {
  var ret = false,
      inRow = true,
      inCol = true,
      inBlock = true;

  // find in row
  if (puzzle[row].indexOf(num) === -1)
    inRow = false;

  // find in column
  var tempCol = [];
  for (var tempRow = 0; tempRow < size; tempRow++) {
    if (tempRow !== row)
      tempCol.push(puzzle[tempRow][col]);
  }

  if (tempCol.indexOf(num) === -1)
    inCol = false;

  // find in block
  var blockMinRow = sizeBlock * Math.floor(row / sizeBlock),
      blockMinCol = sizeBlock * Math.floor(col / sizeBlock),
      blockMaxRow = blockMinRow + sizeBlock,
      blockMaxCol = blockMinCol + sizeBlock,
      blockStack = []; // will all hold values of the current block

  for (var i = blockMinRow; i < blockMaxRow; i++) {
    for (var j = blockMinCol; j < blockMaxCol; j++) {
      if(i !== row && j !== col)
        blockStack.push(puzzle[i][j]);
    }
  }

  if (blockStack.indexOf(num) === -1)
    inBlock = false;

  // if is available to place set return true
  if(!inRow && !inCol && !inBlock)
    ret = true;

  return ret;
}



var puzzle1 = [
  [5,3,0,0,7,0,0,0,0],
  [6,0,0,1,9,5,0,0,0],
  [0,9,8,0,0,0,0,6,0],
  [8,0,0,0,6,0,0,0,3],
  [4,0,0,8,0,3,0,0,1],
  [7,0,0,0,2,0,0,0,6],
  [0,6,0,0,0,0,2,8,0],
  [0,0,0,4,1,9,0,0,5],
  [0,0,0,0,8,0,0,7,9]
];

var puzzle2 = [
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
];

var puzzle3 = [
  [1,3,2,0],
  [0,2,0,1],
  [0,0,0,2],
  [2,0,4,3]
];
// results
// [1,3,2,4],
// [4,2,3,1],
// [3,4,1,2],
// [2,1,4,3]

console.log(sudoku(puzzle1));
// console.log(sudoku(puzzle2));
// console.log(sudoku(puzzle3));

