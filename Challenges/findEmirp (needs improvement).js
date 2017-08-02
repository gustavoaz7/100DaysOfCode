/*
If you reverse the word emirp you will have the word prime. That idea is related with the purpose of this kata. 
We should select all the primes that when reversed are a different prime. The palindromic primes should be discarded. 
For example: 13, 17 are prime numbers and the reversed respectively are 31, 71 which are also primes, so 13 and 17 are emirps 
But see the cases, 757, 787, 797, these are palindromic primes, with the special property that primes coincides with the reversed ones, 
so they do not enter in the sequence.

You should create a function find_emirp(), that receives one argument n, as an upper limit and the output should be an array with this structure:

[number of emirps bellow n, largest emirp smaller than n, sum of all the emirps of the sequence bellow n]

Let's some examples:

find_emirp(10) -------> [0, 0, 0] # No emirps for this value of n

find_emirp(50) -------> [4, 37, 98] # there are 4 emirps [13, 17, 31, 37]), the max. value is 37, and the sum = 13 + 17 + 31 + 37 = 98

find_emirp(100) ------> [8, 97, 418] # there are 8 emirps [13, 17, 31, 37, 71, 73, 79, 97], 97 is the highest emirp for this range and 
the sum of all these 8 emirp primes is 418.
Happy coding!!
*/



// Working for up to n = 15000
// I need a more efficient prime number generator to higher values in a reasonable time

function findEmirp(n){
  // your code 
  const firstPrimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151,157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239,241, 251, 257, 263, 269, 271, 277, 281, 283, 293]  
   
  for (var primes = [], i = firstPrimes[firstPrimes.length-1]; i < n*10; i+=2) {
    primes.push(i);
  }
  for (i=1 ; i<firstPrimes.length; i++) {
    primes = primes.filter(x => x%firstPrimes[i] !== 0)
  }
  primes.unshift(...firstPrimes)

  var palprime = [];
  for (var i=0; i<=n; i++) {
    var reversedNum = Number(i.toString().split("").reverse().join(""))
    if (i !== reversedNum) {
      if (primes.includes(i) && primes.includes(reversedNum)) palprime.push(i)
    }
  }
  return [palprime.length, Math.max(...palprime), palprime.reduce((a,b)=> a+b)]
}


findEmirp(50)
findEmirp(200)
findEmirp(1000)
findEmirp(5000)
findEmirp(15000)