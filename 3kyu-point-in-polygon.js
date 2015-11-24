'use strict';
/**
 * 3kyu - Point in Polygon
 * 
 * http://www.codewars.com/kata/530265044b7e23379d00076a/train/javascript
 * http://stackoverflow.com/a/16391873/1378261
 *
 */

function pointInPoly (poly, [px, py]) {
  let minX = poly[0][0];
  let maxX = poly[0][0];
  let minY = poly[0][1];
  let maxY = poly[0][1];;
  
  poly.forEach((polyPoint) => {
    minX = Math.min(polyPoint[0], minX);
    maxX = Math.max(polyPoint[0], maxX);
    minY = Math.min(polyPoint[1], minY);
    maxY = Math.max(polyPoint[1], maxY);
  });

  // initial check
  if (px < minX || px > maxY || py < minY || py > maxY) {
    return false;
  }
  
  // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
  let isInside = false;
  for(let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const pi = poly[i];
    const pj = poly[j];

    if (
      ((pi[1] > py) != (pj[1] > py)) &&
      (px < (pj[0] - pi[0]) * (py - pi[1]) / (pj[1] - pi[1]) + pi[0])
    ) {
      console.log('test');
      isInside = !isInside;
    }
  }
  
  return isInside;
}
