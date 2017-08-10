

// Ordering strings:
// Uppercase letters are always 'less' than lowercase letters (i.e. Uppercase letters are represented by lower numerical values)
	'Z' < 'a'  // TRUE


// Logical operators:
// You can set a default value using logical operator OR ( || )
	function power (base, exp) {
		let result = 1;
		for (var i = 0; i < (exp || 2); i++) {
			result *= base;
		}
		console.log(result)
	}
	power(6);	// 36
	power(6,3);  // 216
	// Explaining: If the value on the left is TRUE than it will be returned and the value on the right will be ignored. 
	//		   	   If the value on the left is FALSE than the value on the right will be evaluated.
	//			   (If a function is called missing an arguemnt, its value will be undefined which is also FALSE)

//In some cases you can shorthand an if statement with logical operator AND ( && )
	// This function will only be called if statement1 is TRUE, otherwise nothing will happen.
	element.addEventListener('click', statement1 && function () {//actions})  
// Explaining: This works similarly to OR, but the other way around. When the value on the left is FALSE than it will return false and ignores the value on the right.
//			   If the value on the left is TRUE than the value on the right will be evaluated.


*/