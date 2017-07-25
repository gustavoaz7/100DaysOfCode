/*
For a given nonempty string s find a minimum substring t and the maximum number k, such that the entire string s is equal to t repeated k times. The input string consists of lowercase latin letters. Your function should return a tuple (in Python) (t, k) or an array (in Ruby and JavaScript) [t, k]

Example #1:

for string

s = "ababab";
the answer is

["ab", 3]
Example #2:

for string

s = "abcde";
the answer is

["abcde", 1]
*/


function f(s) {
  // your code here
  var str, count = 1, test;
  for (var i=0; i<s.length; i++) {
    test = s.substring(0,(i+1));
    if (test == s.replace(test,"").substr(0,test.length)) {
      str = test;
      s = s.slice(test.length);
      i--;
      // In case that the string is not entirely repeated
      // if (s.length < test.length)
      if (s.length == 0) {break}
      count++;
    };
  }
  if (count > 1) {return [str, count]} else {return [s,count]};
}


f("ababab");
f("abcde");