// A vector type
/*
Write a constructor Vector that represents a vector in two-dimensional space. 
It takes x and y parameters (numbers), which it should save to properties of the same name.
Give the Vector prototype two methods, plus and minus, that take another vector as a parameter and return a new vector that 
has the sum or difference of the two vectors’ (the one in this and the parameter) x and y values.
Add a getter property length to the prototype that computes the length of the vector—that is, the distance of the point (x, y) from the origin (0, 0).
*/
// Your code here.
function Vector(x, y) {
 	this.x = x;
    this.y = y;
}

Vector.prototype.plus = function(obj) {
 	return new Vector( this.x + obj.x, this.y + obj.y)
}

Vector.prototype.minus = function(obj) {
 	return new Vector( this.x - obj.x, this.y - obj.y)
}

Object.defineProperty(Vector.prototype, 'length', {
  get: function() {
 	return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
  }
});


console.log(new Vector(1, 2).plus(new Vector(2, 3)));  // → Vector{x: 3, y: 5}
console.log(new Vector(1, 2).minus(new Vector(2, 3)));  // → Vector{x: -1, y: -1}
console.log(new Vector(3, 4).length);  // → 5



//Another cell
/*
Implement a cell type named StretchCell(inner, width, height) that conforms to the table cell interface described earlier in the chapter. 
It should wrap another cell (like UnderlinedCell does) and ensure that the resulting cell has at least the given width and height, 
even if the inner cell would naturally be smaller.
*/
// Your code here.
function StretchCell(inner, width, height) {
 	 this.inner = inner;
  	 this.width = width;
  	 this.height = height;
}

StretchCell.prototype.minWidth = function() {
  return Math.max(this.width, this.inner.minWidth())
}

StretchCell.prototype.minHeight = function() {
  return Math.max(this.height, this.inner.minHeight()) 
}

StretchCell.prototype.draw = function(width, height) {
  return this.inner.draw(width, height) 
}

var sc = new StretchCell(new TextCell("abc"), 1, 2);
console.log(sc.minWidth());  // → 3
console.log(sc.minHeight());  // → 2
console.log(sc.draw(3, 2));  // → ["abc", "   "]



// Sequence interface
/*
Design an interface that abstracts iteration over a collection of values. An object that provides this interface represents a sequence, and 
the interface must somehow make it possible for code that uses such an object to iterate over the sequence, 
looking at the element values it is made up of and having some way to find out when the end of the sequence is reached.
When you have specified your interface, try to write a function logFive that takes a sequence object and calls console.log on its first five 
elements—or fewer, if the sequence has fewer than five elements.
Then implement an object type ArraySeq that wraps an array and allows iteration over the array using the interface you designed. 
Implement another object type RangeSeq that iterates over a range of integers (taking from and to arguments to its constructor) instead.
*/
// Your code here.
function logFive(arr) {
  let i = 0;
  let max = arr.length < 5 ? arr.length : 5;
  while (i < max) {
   	console.log(arr[i]);
    i++;
  }
}

function ArraySeq(array) {
  let seq = [], arg = Array.from(array);
  for (let i = arg[0]; i <= arg[1]; i++) {
     seq.push(i);
  }
  return seq;
}

function RangeSeq(from, to) {
  return ArraySeq([from, to]);
}

logFive(new ArraySeq([1, 2]));
// → 1
// → 2
logFive(new RangeSeq(100, 1000));
// → 100
// → 101
// → 102
// → 103
// → 104