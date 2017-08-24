// Modules divide programs into clusters of code that, by some criterion, belong together.
	// Organizing a program into different files (modules) makes it easier to find what you are looking for.
		// Maintainability, Namespacing, Reusability
// Literate programming - Using modules in a defined order and adding comments for descriptions of the code.

// CommonJS module - module system that uses a single global variable (require) to allow modules to find and 
	//use each other without going through the global scope.
// In order to avoid slow-loading due to the time it takes for every 'require' call to fetch something (the page would freeze while loading all that)
// We can use BROWSERIFY - This will look for calls to require, resolve all dependencies, and gather the needed code into a single big file. 
	// Then drop a single <script> tag into your HTML and all your dependecies will be loaded.
// Another solution is the Asynchronous Modules Definition (AMD) which consists in wrapping the code in a function so that the module loader
	// will load its dependencies in the background and then call the function, initializing the module, when the dependencies have been loaded.
	// REQUIRE.JS provides a popular of this style of module loader.

