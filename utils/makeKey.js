export default function keyMaker() {
  var currentKey = 0;

  return function() {
    currentKey++;
    return currentKey;
  };
}
