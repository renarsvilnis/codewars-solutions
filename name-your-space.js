// Name Your Space
// http://www.codewars.com/kata/514b6c44a337752e67000077/train/javascript

function namespace(root, path, value){

  if(typeof root == 'undefined' || typeof path == 'undefined' || typeof path != 'string')
    return undefined;

  // is user searching for value
  var searching = typeof value == 'undefined';

  // split path into parts
  var parts = path.split('.');
  var partCount = paths.length;

  var object = root;

  for(var i = 0; i < partCount; i++) {
    var part = parts[i];

    object = object[part];

    if(typeof object == 'undefined') {
      if(searching) {
        return undefined;
      } else {
        object = {};
      }
    }
  }
}
