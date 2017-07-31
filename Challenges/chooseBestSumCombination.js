/*
John and Mary want to travel between a few towns A, B, C ... Mary has on a sheet of paper a list of distances between these towns. ls = [50, 55, 57, 58, 60]. 
John is tired of driving and he says to Mary that he doesn't want to drive more than t = 174 miles and he will visit only 3 towns.

Which distances, hence which towns, they will choose so that the sum of the distances is the biggest possible

to please Mary - but less than t - to please John- ?
Example:

With list ls and 3 towns to visit they can make a choice between: 
[50,55,57],[50,55,58],[50,55,60],[50,57,58],[50,57,60],[50,58,60],[55,57,58],[55,57,60],[55,58,60],[57,58,60].

The sums of distances are then: 162, 163, 165, 165, 167, 168, 170, 172, 173, 175.

The biggest possible sum taking a limit of 174 into account is then 173 and the distances of the 3 corresponding towns is [55, 58, 60].

The function chooseBestSum (or choose_best_sum or ... depending on the language) will take as parameters t (maximum sum of distances, integer >= 0), 
k (number of towns to visit, k >= 1) and ls (list of distances, all distances are positive or null integers and this list has at least one element). 
The function returns the "best" sum ie the biggest possible sum of k distances less than or equal to the given limit t, if that sum exists, or 
otherwise nil, null, None, Nothing, depending on the language. With C++, C, Rust, Swift, Go return -1.

Examples:

ts = [50, 55, 56, 57, 58] choose_best_sum(163, 3, ts) -> 163
*/



function chooseBestSum(t, k, ls) {
    // your code
  if (ls.length < k || k <= 0) return null;
  function kCombinations(set, k) {
  	var i, j, combs, head, tailcombs;
  	if (k == set.length) return [set];
  	if (k == 1) {
  		combs = [];
  		for (i = 0; i < set.length; i++) {
  			combs.push([set[i]]);
  		}
  		return combs;
  	} 
    combs = [];
  	for (i = 0; i < set.length - k + 1; i++) {
  		// head is a list that includes only our current element.
  		head = set.slice(i, i + 1);
  		// We take smaller combinations from the subsequent elements
  		tailcombs = kCombinations(set.slice(i + 1), k - 1);
  		// For each (k-1)-combination we join it with the current
  		// and store it to the set of k-combinations.
  		for (j = 0; j < tailcombs.length; j++) {
  			combs.push(head.concat(tailcombs[j]));
  		}
  	}
  	return combs;
  }
  
  var dist = [], permut = kCombinations(ls, k)
  for (i=0; i<permut.length; i++){
    dist.push(permut[i].reduce((x,y)=> x+y,0));
  }
  var ans = dist.filter(x => x <= t);
  if (!ans.length) {return null} else {return Math.max(...ans)} 
}


var ts = [50, 55, 56, 57, 58]
chooseBestSum(163, 3, ts) // 163
ts = [50]
chooseBestSum(163, 3, ts) // null
ts = [91, 74, 73, 85, 73, 81, 87]
chooseBestSum(230, 3, ts) // 228