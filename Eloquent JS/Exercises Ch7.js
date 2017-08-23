// This
// when a function isn’t called as a method, this will refer to the global object.
// A common pattern is to say var self = this and from then on refer to self, which is a normal variable and thus visible to inner functions.
// Another solution is to use the bind method, which allows us to provide an explicit this object to bind to.


// Electronic Life

/* ALTERNATIVE CODE FOR A DIFFERENT GRID VALUE STORAGE

var grid = [["top left",    "top middle",    "top right"],
            ["bottom left", "bottom middle", "bottom right"]];
console.log(grid[1][2]);
// → bottom right


function Grid(width, height) {
	let row = 0, matrix = [];
	while (row < height) {
		matrix[row] = new Array(width);
        row++;
	}
  this.space = matrix;
  this.width = width;
  this.height = height;
}
Grid.prototype.isInside = function(vector) {
  return vector.x >= 0 && vector.x < this.width &&
         vector.y >= 0 && vector.y < this.height;
};
Grid.prototype.get = function(vector) {
  return this.space[vector.x][vector.y];
};
Grid.prototype.set = function(vector, value) {
  this.space[vector.x][vector.y] = value;
};
*/



// Artificial stupidity
/*
Having the inhabitants of our world go extinct after a few minutes is kind of depressing. 
To deal with this, we could try to create a smarter plant eater.
There are several obvious problems with our herbivores. 
First, they are terribly greedy, stuffing themselves with every plant they see until they have wiped out the local plant life. 
Second, their randomized movement (recall that the view.find method returns a random direction when multiple directions match) 
causes them to stumble around ineffectively and starve if there don’t happen to be any plants nearby. 
And finally, they breed very fast, which makes the cycles between abundance and famine quite intense.
Write a new critter type that tries to address one or more of these points and substitute it for the old PlantEater type in the valley world. 
See how it fares. Tweak it some more if necessary.
*/
// Your code here
function SmartPlantEater() {
	this.energy = 20;
  	this.direction = 'w';
}

SmartPlantEater.prototype.act = function(view) {
  var space = view.find(" ");
  if (this.energy > 80 && space)
    return {type: "reproduce", direction: space};
  var plant = view.findAll("*");
  if (plant.length > 1)
    return {type: "eat", direction: randomElement(plant)};
  if (view.look(this.direction) != " " && space) this.direction = space;
    return {type: "move", direction: this.direction};
};

animateWorld(new LifelikeWorld(
  ["############################",
   "#####                 ######",
   "##   ***                **##",
   "#   *##**         **  O  *##",
   "#    ***     O    ##**    *#",
   "#       O         ##***    #",
   "#                 ##**     #",
   "#   O       #*             #",
   "#*          #**       O    #",
   "#***        ##**    O    **#",
   "##****     ###***       *###",
   "############################"],
  {"#": Wall,
   "O": SmartPlantEater,
   "*": Plant}
));



// Predators
/*
Any serious ecosystem has a food chain longer than a single link. Write another critter that survives by eating the herbivore critter. 
You’ll notice that stability is even harder to achieve now that there are cycles at multiple levels. 
Try to find a strategy to make the ecosystem run smoothly for at least a little while.
One thing that will help is to make the world bigger. 
This way, local population booms or busts are less likely to wipe out a species entirely, and there is space for the relatively large
prey population needed to sustain a small predator population.
*/
// Your code here
function Tiger() {
	this.energy = 100;
  	this.direction = 'e';
  	this.critterCount = [];
  	this.turn = 0;
}

Tiger.prototype.act = function(view) {
 	var space = view.find(" ");
  if (this.energy > 300 && space)
    return {type: "reproduce", direction: space};
  this.turn++;
  var critter = view.findAll("O");
  this.critterCount.push(critter.length);
  if (this.turn > 10) {this.turn--; this.critterCount.shift()}
  if (this.critterCount.reduce((a,b) => a + b) / this.critterCount.length > 0.2)
    return {type: "eat", direction: randomElement(critter)};
  if (view.look(this.direction) != " " && space) this.direction = space;
    return {type: "move", direction: this.direction};
};
 

animateWorld(new LifelikeWorld(
  ["####################################################",
   "#                 ####         ****              ###",
   "#   *  @  ##                 ########       OO    ##",
   "#   *    ##        O O                 ****       *#",
   "#       ##*                        ##########     *#",
   "#      ##***  *         ****                     **#",
   "#* **  #  *  ***      #########                  **#",
   "#* **  #      *               #   *              **#",
   "#     ##              #   O   #  ***          ######",
   "#*            @       #       #   *        O  #    #",
   "#*                    #  ######                 ** #",
   "###          ****          ***                  ** #",
   "#       O                        @         O       #",
   "#   *     ##  ##  ##  ##               ###      *  #",
   "#   **         #              *       #####  O     #",
   "##  **  O   O  #  #    ***  ***        ###      ** #",
   "###               #   *****                    ****#",
   "####################################################"],
  {"#": Wall,
   "@": Tiger,
   "O": SmartPlantEater, // from previous exercise
   "*": Plant}
));