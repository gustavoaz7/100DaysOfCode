/*
The maximum sum subarray problem consists in finding the maximum sum of a contiguous subsequence in an array 
or list of integers:
maxSequence([-2, 1, -3, 4, -1, 2, 1, -5, 4])
// should be 6: [4, -1, 2, 1]
Easy case is when the list is made up of only positive numbers and the maximum sum is the sum of the whole array. 
If the list is made up of only negative numbers, return 0 instead.
Empty list is considered to have zero greatest sum. Note that the empty list or array is also a valid 
sublist/subarray.
*/



var maxSequence = (ar) => {
  let [bigsum, sum] = [0, 0];
  for (let i = ar.length; i > 0; i--){
    for (let j = 0; j < ar.length-i+1; j++){
      sum = ar.slice(j,i+j).reduce((ac, n) => ac + n, 0)
      sum > bigsum ? bigsum = sum : sum = 0;
    }
  }
  return bigsum
}