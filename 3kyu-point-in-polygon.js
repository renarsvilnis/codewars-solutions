// Point in Polygon
// http://www.codewars.com/kata/530265044b7e23379d00076a/train/javascript

// points represented as [x,y]

function pointInPoly(poly, point) {
  // http://rosettacode.org/wiki/Ray-casting_algorithm

  // reduce polygon points to only points we interested in.
  // As in those the casting line has equal X value
  var x = point[0];
  var y = point[1];
  var reducedPoly = [];

  for(var i = 0, l = poly.length; i < l; i++) {
    var polyPoint = poly[i];
    console.log('Point:', x, y, 'PolyPoint:', polyPoint[0], polyPoint[1]);
    if(polyPoint[0] == x && polyPoint[1] >= y) {
      reducedPoly.push(polyPoint);
    }
  }

  // times it crosses a polygon line
  // check if count is odd
  console.log(reducedPoly);
  return reducedPoly.length % 2;
}