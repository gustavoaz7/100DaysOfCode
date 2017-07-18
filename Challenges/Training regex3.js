/*
Coding in function ```countAnimals```. function accept two parameters: ```animals```, a string contains some animals; ```count```, 
an array list of which animals we should count. The result should be a number array.

Some examples:
```
countAnimals("dog,cat",["dog","cat"]) should return [1,1]
countAnimals("dog,cat",["dog","cat","pig"]) should return [1,1,0]
countAnimals("dog,dog,cat",["dog","cat"]) should return [2,1]
countAnimals("dog,dog,cat",["pig","cow"]) should return [0,0]
```
*/


function countAnimals(animals,count){
  //coding here...
  return count.map(animal => (animals.match(new RegExp(animal, "g")) || []).length);
}


countAnimals("dog,cat",["dog","cat"])
countAnimals("dog,cat",["dog","cat","pig"]) 
countAnimals("dog,dog,cat",["dog","cat"]) 
countAnimals("dog,dog,cat",["pig","cow"])