/*
Write a function named firstNonRepeatingCharacter that takes a string input, and returns the first character that is not repeated anywhere in the string.

For example, if given the input 'stress', the function should return 't', since the letter t only occurs once in the string, and occurs first in the string.

As an added challenge, upper- and lowercase letters are considered the same character, but the function should return the correct case for the initial letter. For example, the input 'sTreSS' should return 'T'.

If a string contains all repeating characters, it should return the empty string ("").
*/



function firstNonRepeatingLetter(s) {
  // Add your code here
  var ans = "";
  for (var i=0; i<s.length; i++) {
    if (!s.toLowerCase().replace(s.substr(i,1),"").includes(s[i])) {
    	ans = s[i]; break
    }
  }
  return ans;
}


firstNonRepeatingLetter('a')
firstNonRepeatingLetter('stress')
firstNonRepeatingLetter('moonmen')