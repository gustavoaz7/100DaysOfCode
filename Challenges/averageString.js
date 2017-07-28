/*
You are given a string of numbers between 0-9. Find the average of these numbers and return it as a floored whole number (ie: no decimal places) 
written out as a string. Eg:

"zero nine five two" -> "four"

If the string is empty or includes a number greater than 9, return "n/a"
*/



function averageString(str) {
  // Code away
  const number = ["zero", "one", "two", "three", 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  var arr = str.split(" ");
  var ans = Math.floor(arr.map(x => number.includes(x) ? number.indexOf(x) : undefined)
    .reduce((a,b) => a+b)/arr.length);
  return number[ans] || "n/a"
}



averageString("zero nine five two")
averageString("four six two three")
averageString("one two three four five")
averageString("five four")
averageString("zero zero zero zero zero")
averageString("one one eight one")
averageString("")
