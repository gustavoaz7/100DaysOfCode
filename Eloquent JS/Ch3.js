// Scopes:

//// You can create a variable inside a function with the same name as a variable in the global scope and it will not be overwritten, but
// You will not overwrite a global variable if you create a variable with the same name inside a function and 
// if you call that variable inside the funtion you will get its local value, not the global. The global value will continue untouched.
// But if you assign a new value to that variable, the global one will be overwritten.
	let name = 'Gus';
	function createName() {
		let name = 'User1';
		console.log(name)
	}
	createName(); 	// 'User1'
	console.log(name)	// 'Gus'
	function changeName() {
		name = 'User2';
		console.log(name)
	}
	changeName(); 	// 'User2'
	console.log(name)	// 'User2'


// Lexical scope:
// Each local scope can see all local scopes that contain it.
// Imagine we have a function1 nested in another function2 nested in a third function3 nested in a fourth function4. 
// If we have a variable declared in the global scope, it will be visible to all functions scopes (i.e. that variable can be accessed and/or changed in any inner function).
// If we have a variable declared in the fourth function4 (the outter one), this variable will be visible to all inner functions aswell (function3, function2 and function1).
// And this goes on as deep as the last nested function.




// Closure:
// The hability to reference an instance of local variable to an outter function scope.
// A closure is created whenever a function accesses a variable defined outside the immediate function scope.
	function greet(message){
	    return function(name) {
	        console.log(message + " " + name)
	    }
	}
	greet("Hello")("Gus");	// 'Hello Gus'
	greet('Hi')('User1');	// 'Hi User1'
	let sayHello = greet('Hello');
	console.log(sayHello('User2'))	// 'Hello User2'
// The inner function is accessing the 'message' variable from the parent scope (even after that scope has closed)


// Recursion:
// When a function calls itself.
	function factorial(n) {
		if (n <= 1) return 1;
		return n * factorial(n-1);
	}
// It is preferable (when possible) to use a loop instead of calling a function multiple times. Looping is about 10x faster.


// Pure function:
// Is a function which 
	// Given the same input, will always return the same output.
	// Produces no side effects.
	// Relies on no external mutable state.
	function pureDouble(n) {
		return n * 2;
	}
// No matter the circumstances in which this function is called, it will always return the same output for a given input.
// console.log(pureDouble(22)) === console.log(44)    Always! 