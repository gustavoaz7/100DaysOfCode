/*
Some numbers have funny properties. For example:

89 --> 8¹ + 9² = 89 * 1

695 --> 6² + 9³ + 5⁴= 1390 = 695 * 2

46288 --> 4³ + 6⁴+ 2⁵ + 8⁶ + 8⁷ = 2360688 = 46288 * 51
Given a positive integer n written as abcd... (a, b, c, d... being digits) and a positive integer p we want to find a positive integer k, if it exists, 
such as the sum of the digits of n taken to the successive powers of p is equal to k * n. In other words:

Is there an integer k such as : (a ^ p + b ^ (p+1) + c ^(p+2) + d ^ (p+3) + ...) = n * k
If it is the case we will return k, if not return -1.
*/


function digPow(n, p){
  // ...
  var sumSqr = 0;
  for (var i=0; i<n.toString().length; i++){
    sumSqr += Math.pow(parseFloat(n.toString().split("")[i]),p+i);
  }
  var k =[];
  for (var j=0; j<20000; j++){
    if (sumSqr%(n*j)==0){k = j}
  }
  if (k.length==0){k=-1}
  return k;
}


digPow(89, 1)
digPow(92, 1)
digPow(695, 2) 
digPow(46288, 3)