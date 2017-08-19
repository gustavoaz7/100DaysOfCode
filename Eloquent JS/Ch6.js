// OBJECTS
// Methods are properties that hold function values.

// Constructors creates new objects with some predefined prototypes. Requires `new` keyword before the Objectname and best practice Capitalized name.
// An object created with 'new' is said to be an 'instance' of its constructor.  
	// The 'instanceof' operator is used to know if an object was derived from a specific constructor.
// Prototypes can be overwritten by new object methods with the same name as the prototype.
// When looping through an object keys, prototypes that we created by assigning to them are 'enumarable' properties and will be accessed will be accessed 
	// That is usually a problem. To solve that we can:
		// Check if obj.hasOwnProperty('propertyName') and run the code only for those who return TRUE.
		// Or Object.create(null) to create a fresh object with no properties or prototypes 
// Standard properties in Object.prototype are 'nonenumerable' properties and will not be accessed in a for loop.
// We can create a 'nonenumerable' property by using the Object.defineProperty
	Object.defineProperty(objectName, 'propertyName', {key1: value1, key2: value2})
// We can also specify a function to be run when the property is read and written:
	let obj = {name: 'gus', get functionName(){ return this.name.length }, set functName(lastName) { this.lastname = lastName }}
