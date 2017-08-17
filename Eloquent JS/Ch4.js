// Ch.4

// Difference between two objects refering to the same memoryspace and two objects with the same property

let obj1 = {value: 5}
let obj2 = obj1;
let obj3 = {value: 5}

console.log(obj1 == obj2)  // TRUE
console.log(obj1 == obj3)  // FALSE!!
  
obj1.value = 10;
console.log(obj2.value  // 10
obj2.value = 22;
console.log(obj1.value)  // 22
	
// JavaScript’s == operator, when comparing objects, will return true only if both objects are precisely the same value. 
// Comparing different objects will return false, even if they have identical contents. 


