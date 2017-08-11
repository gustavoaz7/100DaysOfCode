/*
Sum all the prime numbers up to and including the provided number.

A prime number is defined as a number greater than one and having only two divisors, one and itself. 
For example, 2 is a prime number because it's only divisible by one and two.

The provided number may not be a prime.
*/



function sumPrimes(num) {
  let primes = [2], n = [];
  for (let i = 3; i <= num; i+=2 ) n.push(i);
  n.map( x => {
    let logical = true;
    for (let i = 3; i <= Math.floor(x/3); i+=2) {
      if (x % i === 0) logical = false;
    }
    if (logical) primes.push(x)
  })  
  return primes.reduce((a,b) => a + b);
}

sumPrimes(10);  // 17
sumPrimes(977)  // 73156