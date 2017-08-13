/*
Junior dev interview question

Find the biggest 5-digit number in a string
For example:
‘1239456789’ should return '98765'
*/

function big5 (str) {
  let i = 0, ans = [];
  while (i < 5) {
    let n = str.indexOf(Math.max(...str.split("")));
    ans.push(str[n]);
    str = str.slice(0,n) + str.slice(n+1);
    i++;
  }
  return ans.join("");
}