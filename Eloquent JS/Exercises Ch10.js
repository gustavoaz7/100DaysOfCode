// Month names
/*
Write a simple module similar to the weekDay module that can convert month numbers (zero-based, as in the Date type) to names 
and can convert names back to numbers. Give it its own namespace since it will need an internal array of month names, and use 
plain JavaScript, without any module loader system.
*/
// Your code here.
var month = function() {
  var names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return {
    name: function(number) { return names[number]; },
    number: function(name) { return names.indexOf(name); }
  };
}();
console.log(month.name(2)); // → March
console.log(month.number("November")); // → 10



// A return to electronic life
/*
Hoping that Chapter 7 is still somewhat fresh in your mind, think back to the system designed in that chapter and come up 
with a way to separate the code into modules. To refresh your memory, these are the functions and types defined in that chapter, 
in order of appearance:
Vector
Grid
directions
directionNames
randomElement
BouncingCritter
elementFromChar
World
charFromElement
Wall
View
WallFollower
dirPlus
LifelikeWorld
Plant
PlantEater
SmartPlantEater
Tiger
Don’t exaggerate and create too many modules. A book that starts a new chapter for every page would probably get on your nerves, 
if only because of all the space wasted on titles. Similarly, having to open 10 files to read a tiny project isn’t helpful. 
Aim for three to five modules.
You can choose to have some functions become internal to their module and thus inaccessible to other modules.
There is no single correct solution here. Module organization is largely a matter of taste.
*/
Module 'Space'
	Vector
	Grid
	directions
	directionNames

Module 'Animals'
	randomElement
	dirPlus
	BouncingCritter
	Wall
	WallFollower
	Plant
	PlantEater
	SmartPlantEater
	Tiger

Module 'Find'
	randomElement
	elementFromChar
	charFromElement
	View
	World
	LifelikeWorld