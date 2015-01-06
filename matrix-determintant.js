function determinant(matrix) {
  var size = matrix.length;

  if(size == 1) {
    return matrix[0][0];
  } else {
    var addPart = true;
    var det = 0;
    for(var i = 0; i < size; i++) {
      var major = matrix[0][i];
      var subMatrix = getSubMatrix(matrix, 0, i);
      var minor = determinant(subMatrix);

      var part = minor * major;
      det = addPart ? det + part : det - part;

      addPart = !addPart;
    }

    return det;
  }
}

// Get minor matrix for a [x][y] matrix member
function getSubMatrix(matrix, row, col) {
  var subMatrix = [];
  var size = matrix.length;

  for(var i = 0; i < size; i++) {
    if(i != row) {
      var newRow = [];
      for(var j = 0; j < size; j++) {
        if(j != col) {
          newRow.push(matrix[i][j]);
        }
      }
      subMatrix.push(newRow);
    }
  }

  return subMatrix;
}



if (typeof exports !== "undefined") {
  var m2 = [
    [2,5,3],
    [1,-2,-1],
    [1, 3, 4]
  ];

  console.log(determinant(m2));
}
