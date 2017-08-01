/*
Given a positive number n > 1 find the prime factor decomposition of n. The result will be a string with the following form :

 "(p1**n1)(p2**n2)...(pk**nk)"
with the p(i) in increasing order and n(i) empty if n(i) is 1.

Example: n = 86240 should return "(2**5)(5)(7**2)(11)"
*/

function primeFactors(n){
  var primes = [], num = n, i, result = "";
  
  for(i = 2;i<=10e3;i++){
    primes.push(i);
  }
  for (i = 0; i < primes.length/2; i++) {
    for (var j = 2; j < primes[i]; j++) {
        if (primes[i] % j == 0) {primes.splice(i--, 1)}
    }
  }
   
  primes.map(prime => {
    i=0;
    while (num%prime == 0) {
      num = num/prime;
      i++;
    }
    if (i!=0) {
      if (i==1) {result += `(${prime})`} else {result += `(${prime}**${i})`}
    }
    })
  return result;
}