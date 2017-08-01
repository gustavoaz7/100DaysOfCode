/*The drawing shows 6 squares the sides of which have a length of 1, 1, 2, 3, 5, 8. It's easy to see that the sum of the perimeters of these squares is : 
4 * (1 + 1 + 2 + 3 + 5 + 8) = 4 * 20 = 80

Could you give the sum of the perimeters of all the squares in a rectangle when there are n + 1 squares disposed in the same manner?

#Hint: See Fibonacci sequence

The function perimeter has for parameter n where n + 1 is the number of squares (they are numbered from 0 to n) and returns the total perimeter of all the squares.
*/


function perimeter(n) {
  var arr = new Array(n+1), sum = 2;
  arr.fill(1,0);
  function fib(arr) {
      for (var i=1; i<arr.length-1; i++) {
        arr[i+1] = arr[i-1] + arr[i];
        sum += arr[i+1];
      }
  return sum;
  }
    return 4*fib(arr);
}

