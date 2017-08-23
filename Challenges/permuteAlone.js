/*
Return the number of total permutations of the provided string that don't have repeated consecutive letters. 
Assume that all characters in the provided string are each unique.
For example, aab  //  2 because it has 6 total permutations (aab, aab, aba, aba, baa, baa), 
but only 2 of them (aba and aba) don't have the same letter (in this case a) repeating.
*/


function permAlone(str) {
  let result = [];
  function permute(arr, m = []) {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  }
  permute(str.split(""));
  return result.filter(x => {
    for (let i = 0; i < x.length-1; i++) {
      if (x[i] === x[i+1]) return false;
    }
    return true;
  }).length;
}


permAlone("aab")  //  2.
permAlone("aaa")  //  0.
permAlone("aabb")  //  8.
permAlone("zzzzzzzz")  //  0.
permAlone("a")  //  1.
permAlone("aaab")  //  0.
permAlone("aaabb")  //  12.
