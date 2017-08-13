/*
Find the smallest common multiple of the provided parameters that can be evenly divided by both, as well as by all sequential numbers 
in the range between these parameters.

The range will be an array of two numbers that will not necessarily be in numerical order.

e.g. for 1 and 3 - find the smallest common multiple of both 1 and 3 that is evenly divisible by all numbers between 1 and 3.
*/


// More efficient
function smallestCommons(arr) {
  let array = arr.sort((a,b) => a>b), range = [], logical = [], test = 0;
  for (let i = array[0]; i <= array[1]; i++) {
    range.push(i);
  }
  while (logical.length < range.length) {
    logical = [];
    test += array[1];
    for (let n = range[0]; n <= range[range.length-1]; n++) {
      if (!(test % n)) {logical.push(1);} else {break;};
    } 
  }
  return test
}


// More elegant
function smallestCommons(arr) {
  let array = arr.sort((a,b) => a>b), range = [], test = array[1];
  for (let i = array[0]; i <= array[1]; i++) {
    range.push(i);
  }
  while (range.filter(x => (!(test % x))).length < range.length) {
    test += array[1];    
  }
  return test
}


smallestCommons([1, 5])  //  60.
smallestCommons([5, 1])  //  60.
smallestCommons([1, 13])  //  360360.
smallestCommons([23, 18])  //  6056820.