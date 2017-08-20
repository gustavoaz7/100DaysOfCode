
/*Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), 
payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.
cid is a 2D array listing available currency.
Return the string "Insufficient Funds" if cash-in-drawer is less than the change due. Return the string "Closed" if cash-in-drawer is equal to the change due.
Otherwise, return change in coin and bills, sorted in highest to lowest order.
*/



function checkCashRegister(price, cash, cid) {
  let change = (cash - price) * 100;
  let num = [1,5,10,25,100,500,1000,2000,10000]
  cid.forEach(x => x[1] = x[1]*100)
  
  let tot = cid.filter((x,i) => change >= num[i]).reduce((t,c) => t+c[1],0);
  if (tot < change) return "Insufficient Funds";
  if (tot == change) return "Closed";
  
  let back = [];
  for (let i = cid.length-1; i>=0; i--) {
    if (cid[i][1] > 0 && change >= num[i]) {
      let m = Math.floor(change / num[i]);
      if (m * num[i] > cid[i][1]) {
        change -= cid[i][1];
        back.push([cid[i][0], cid[i][1]/100]);
      } else {
        change -= m * num[i];
        back.push([cid[i][0], m * num[i]/100]);
      }
    }
  }
  return back;
}


checkCashRegister(19.50, 20.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]])
  //  [["QUARTER", 0.50]].
checkCashRegister(3.26, 100.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]])
  //  [["TWENTY", 60.00], ["TEN", 20.00], ["FIVE", 15.00], ["ONE", 1.00], ["QUARTER", 0.50], ["DIME", 0.20], ["PENNY", 0.04]].
checkCashRegister(19.50, 20.00, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1.00], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
  //  "Insufficient Funds".
checkCashRegister(19.50, 20.00, [["PENNY", 0.50], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
  //  "Closed".