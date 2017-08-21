// Looping a triangle
/*
Write a loop that makes seven calls to console.log to output the following triangle:
	#
	##
	###
	####
	#####
	######
	#######
It may be useful to know that you can find the length of a string by writing .length after it.
*/
(function loopTriang() {
	let tri = "";
	while (tri.length < 8) {
		console.log(tri);
		tri+='#';
	}
}());



// FizzBuzz
/*
Write a program that uses console.log to print all the numbers from 1 to 100, with two exceptions. 
For numbers divisible by 3, print "Fizz" instead of the number, and for numbers divisible by 5 (and not 3), print "Buzz" instead.
When you have that working, modify your program to print "FizzBuzz", for numbers that are divisible by 
both 3 and 5 (and still print "Fizz" or "Buzz" for numbers divisible by only one of those).
(This is actually an interview question that has been claimed to weed out a significant percentage of programmer candidates. 
So if you solved it, you’re now allowed to feel good about yourself.)
*/
(function fizzBuzz() {
	let i = 0, div3 = 'Fizz', div5 = 'Buzz';
	while (i < 100) {
		i++;
		if (!(i%3) && !(i%5)) console.log(div3+div5);
		else if (!(i%3)) console.log(div3);
		else if (!(i%5)) console.log(div5);
		else console.log(i);
	}
}());



// Chess Board
/*
Write a program that creates a string that represents an 8×8 grid, using newline characters to separate lines. 
At each position of the grid there is either a space or a “#” character. The characters should form a chess board.
Passing this string to console.log should show something like this:
 # # # #
# # # #
 # # # #
# # # #
 # # # #
# # # #
 # # # #
# # # #
When you have a program that generates this pattern, define a variable size = 8 and change the program so that it works for any size, 
outputting a grid of the given width and height.
*/
(function Chess() {
	let str = "", size = 8;
	for (let i = 1; i <= size; i++) {
      for (let j = 1; j<= size; j++) {
        if (!((i+j)%2)) {str+='#'} else {str+=' '}
      }
      str+='\n'
    }
  console.log('\n'+str)
  // '\n' at the end and beginning so the "" won't displace the first neither the last row.
}());
