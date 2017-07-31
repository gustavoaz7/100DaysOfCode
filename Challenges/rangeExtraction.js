/*
Complete the solution so that it strips all text that follows any of a set of comment markers passed in. 
Any whitespace at the end of the line should also be stripped out.

Example:

Given an input string of:

apples, pears # and bananas
grapes
bananas !apples

The output expected would be:

apples, pears
grapes
bananas
*/



function solution(input, markers){
  for (var index = 0; index<input.length-1; index++) {
    if (markers.map(x => x==input[index+1]).includes(true)) {
      var a = 0;
      for (var i=index; i<input.length-index; i++) {
        if (input[i] == "\n") {a = i; break}
      }
      if (!a) {
        input = input.replace(input.slice(index),"")
        } else{
          input = input.replace(input.substr(index,a-index),"")
        }
      input[index] += "\n";
    } 
  }
  return input;
}


// Second attempt
function solution(input, markers){
  var a = input.split("\n");
  input.split("\n").map((x, i) => {
    markers.map(m => { 
      if (x.indexOf(m) >= 0) {
        a[i] = x.split(m)[0].trim();
      }
    })
  })
  return a.join("\n");
}