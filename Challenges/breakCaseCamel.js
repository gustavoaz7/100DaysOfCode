/*
Complete the solution so that the function will break up camel casing, using a space between words.

Example

solution('camelCasing') // => should return 'camel Casing'
*/



// complete the function
function solution(string) {
    //if (typeof(string) !== 'string') return;
    let min = 65, max = 90;
    for (var i=0; i<string.length; i++) {
      if (string.charCodeAt([i]) >= min && string.charCodeAt([i]) <= max) {
        string = `${string.slice(0, i)} ${string.slice(i)}`;
        i++;
      }
    }
    return string;
}



solution('caseCamel')
solution('newVariableName')


// Later I learned that $1 is the output from matched item in regex
// New solution
// return string.replace(/([A-Z])/g, " $1")