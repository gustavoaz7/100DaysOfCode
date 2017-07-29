/*
Common denominators

You will have a list of rationals in the form

 [ [numer_1, denom_1] , ... [numer_n, denom_n] ]

where all numbers are positive ints.

You have to produce a result in the form

 [ [N_1, D] ... [N_n, D] ]

in which D is as small as possible and

 N_1/D == numer_1/denom_1 ... N_n/D == numer_n,/denom_n.

Example:

convertFracs [(1, 2), (1, 3), (1, 4)] `shouldBe` [(6, 12), (4, 12), (3, 12)]
*/



function convertFrac(lst){
  //Your code here
  var j=0, logic = lst.map(x => false), ans = new Array(3);
    while (logic.includes(false)) {
      j++;
      logic.fill(false,0);
      for (i in lst) {
        if (j%lst[i][1] == 0) {logic[i] = true} else {break}
        ans[i] = `(${j/lst[i][1]*lst[i][0]},${j})`;
    }
  }
  return ans.join("")
}


var lst = [ [1, 2], [1, 3], [1, 4] ]
convertFrac(lst)