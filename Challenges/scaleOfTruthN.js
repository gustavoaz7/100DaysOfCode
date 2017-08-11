/*
Suppose you were given eight soccer balls (aka footballs :soccer:️), all of them seemingly identical. 
You are given a balance scale :balance_scale:️ and told that one of the eight balls is slightly heavier than the others (outlierBall). 
What’s the fewest number of times you have to use the scale to find outlierBall? 
Write a function, scaleOfTruth, that will determine the minimum number of weighs that you’ll need to find outlierBall.

Hard Difficulty

Write a function, scaleOfTruthN that will solve this challenge with any given number of balls, n, and make sure that your function is as efficient as possible.
This function should print out the minimum number of weighs needed to find the outlierBall in a set of n footballs, where all balls have 
identical weights apart from one outlierBall, which is heavier.
Function Name: scaleOfTruthN
Input: n - an integer representing the number of footballs
Output: An integer representing the minium number of weighs to find the outlier ball.
Don’t forget to explain your submission just as you would do in a job interview setting!
*/

// MY SOLUTION

// You will divide all balls in three groups and weight two of them. 

// There are 3 possible situations: 
// - Both sides are equal  (the non-weighted group contains the outlier)
// - Left side is heavier (contains the outlier)
// - Right side is heavier (contains the outlier)

// As we are always working with the worst case scenario:
// If there is one extra ball (remainder from division by 3), next iteration: ballsInEachGroup+1 (not weighted group)
// If there are two extra balls, this iteration should have an extra ball (on each weighted group)

function scaleOfTruthN (n) {
    if (n <= 1) return 0;
    let count = 0, r;
    while (n >= 3) {
      let m = Math.floor(n/3);
      r = n % 3;
      if (r === 2) {n++; continue}
      n = m + r;
      count++;
    }
    if (n >= 2) {count++}
    return count;
}