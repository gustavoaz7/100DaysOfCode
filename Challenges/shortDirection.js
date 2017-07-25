/*
Write a function dirReduc which will take an array of strings and returns an array of strings with the needless directions removed (W<->E or S<->N side by side).

The Haskell version takes a list of directions with data Direction = North | East | West | South. The Clojure version returns nil when the path is reduced to 
nothing. The Rust version takes a slice of enum Direction {NORTH, SOUTH, EAST, WEST}.
*/


function dirReduc(arr){
  // ...
 /* arr.reduce((direction, item) => {
    if (!direction[item]) {direction.push(item)}
    
  },{})*/
  
  var N="NORTH", S="SOUTH", E="EAST", W="WEST";
  for (var i=0; i<arr.length; i++) {
    if ((arr[i]==N && arr[i+1]==S) ||
    (arr[i]==S && arr[i+1]==N) ||
    (arr[i]==E && arr[i+1]==W) ||
    (arr[i]==W && arr[i+1]==E)) {
      arr.splice(i, 2);
      i-=2;
    }
  }
  return arr;
}


dirReduc(["NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH", "WEST"])
dirReduc(["NORTH", "WEST", "SOUTH", "EAST"])
dirReduc(["NORTH", "SOUTH", "EAST", "WEST", "EAST", "WEST"])