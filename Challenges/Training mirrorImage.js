/*
Coding in function ```mirrorImage```. function accept 1 parameter ```arr```, it's a number array. Your task is find the first pair of mirror-image number 
and return as an array. The two number must be adjacent, and the returned array is in accordance with the order from left to right.

What's the mirror-image number? for example:```123``` and ```321``` is a pair of mirror-image number. Two the same number of palindromes can also be seen as 
a pair of mirror-image number, such as ```121``` and ```121```. 

If no such number is found, return```[-1,-1]```

Some example:
```
mirrorImage([11,22,33,33,22,11]) should return [33,33]
mirrorImage([454,86,57,75,16,88]) should return [57,75]
mirrorImage([454,0,57,0,16,88]) should return [-1,-1]
```
*/


function mirrorImage(arr){
  //coding here...
  var ar=arr.slice(), a=0;
  for (var i=0; i<arr.length-1; i++){
    if(ar[i].toString().split("").reverse().join("")===ar[i+1].toString()){
    a = [ar[i],ar[i+1]];
    return a;}
  }
  if (a===0){a = [-1,-1];}
  return a;
}


mirrorImage([11,22,33,33,22,11]) 
mirrorImage([454,86,57,75,16,88])
mirrorImage([454,0,57,0,16,88])