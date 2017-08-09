/*
Fill all missing letters in the passed letter range
*/



function fillLetter(str) {
  for (let i=1; i<str.length; i++) {
    if (str.charCodeAt(i) - str.charCodeAt(i-1) !== 1) {
      str = str.substring(0,i) + String.fromCharCode(str.charCodeAt(i-1)+1) + str.slice(i)
    }
  }
  return str;
}




fillLetter("abce")
fillLetter("abeg")
fillLetter("az")



