/*Coding in function ```findSimilarity```. function accept two parameters: ```str```, a sentence contains some words, separated by spaces; ```word```, 
a sample word. 

Your task is to keep the words that are similar to the sample word, and to remove the other words. 

The similarity is defined as: the same length as the sample; the letter at the beginning and the end of word are same as the sample too.

If there are no similar words in the sentence, should return an empty string.

Some examples:
```
findSimilarity("bag dog dig dot doog dogs","dog") should return "dog dig"
findSimilarity("bag dog dig dot doog dogs","dig") should return "dog dig"
findSimilarity("bag dog dig dot doog dogs","dot") should return "dot"
findSimilarity("bag dog dig dot doog dogs","god") should return ""
```
*/


function findSimilarity(str,word){
  //coding here...
  var ini = new RegExp("^"+word[0],"i"), fin = new RegExp(word[word.length-1]+"$","i"), a="";
  str.split(" ").map(x=>{if(ini.test(x) && fin.test(x) && (x.length===word.length)){a+=" " + x}});
  return a.trim();
  }


findSimilarity("bag dog dig dot doog dogs","dog") 
findSimilarity("bag dog dig dot doog dogs","dig") 
findSimilarity("bag dog dig dot doog dogs","dot") 
findSimilarity("bag dog dig dot doog dogs","god") 