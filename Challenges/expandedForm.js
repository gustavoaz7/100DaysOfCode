/*
Write Number in Expanded Form

You will be given a number and you will need to return it as a string in Expanded Form. For example:

expandedForm(12); // Should return '10 + 2'
expandedForm(42); // Should return '40 + 2'
expandedForm(70304); // Should return '70000 + 300 + 4'
*/


function expandedForm(num) {
  // Your code here
  var div = [], str = [];
  for (var q=0; q<15; q++){
    div.unshift(Math.pow(10,q));
  }
  for (var i=0; i<div.length; i++){
    var a = Math.floor(num/div[i]);
    if (a!==0){str.push(div[i]*a);
    num -= div[i]*a} else {continue}
  }
  return str.join(" + ");
}


expandedForm(12)
expandedForm(42)
expandedForm(70304)