/*
  // Coordinate Validator
  // http://www.codewars.com/kata/5269452810342858ec000951/train/javascript

  var ValidCoordinates = [
      "-23, 25",
      "4, -3",
      "24.53525235, 23.45235",
      "04, -23.234235",
      "43.91343345, 143"
    ];

  var InvalidCoordinates = [
      "23.234, - 23.4234",
      "2342.43536, 34.324236",
      "N23.43345, E32.6457",
      "99.234, 12.324",
      "6.325624, 43.34345.345",
      "0, 1,2",
      "0.342q0832, 1.2324",
      "23.245, 1e1"
    ];
*/

function isValidCoordinates(coordinates){
  var coords = coordinates.split(', ');

  return isValidLat(coords[0]) && isValidLng(coords[1]);
}


function isValidLat(lat) {

  if((getIndicesOf('.', lat)).length > 1 ||
     (lat.indexOf(',') > -1) ||
     (lat.indexOf('-') > 0) ||
      lat.match(/[a-z]/i))
    return false;

  lat = parseFloat(lat);

  if(isNaN(lat))
    return false;

  // check if lat is in valid bounds
  var absLat = Math.abs(lat);
  if(absLat < 0 || absLat > 90)
    return false;


  return true;
}

function isValidLng(lng) {

  if((getIndicesOf('.', lng)).length > 1 ||
     (lng.indexOf(',') > -1) ||
     (lng.indexOf('-') > 0) ||
     lng.match(/[a-z]/i))
    return false;

  lng = parseFloat(lng);

  if(isNaN(lng))
    return false;

  // check if lng is in valid bounds
  var absLng = Math.abs(lng);
  if(absLng < 0 || absLng > 180)
    return false;

  return true;
}

function getIndicesOf(searchStr, str, caseSensitive) {
  var startIndex = 0, searchStrLen = searchStr.length;
  var index, indices = [];
  if (!caseSensitive) {
      str = str.toLowerCase();
      searchStr = searchStr.toLowerCase();
  }
  while ((index = str.indexOf(searchStr, startIndex)) > -1) {
      indices.push(index);
      startIndex = index + searchStrLen;
  }
  return indices;
}
