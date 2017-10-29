var a = 2;      // 'a' hold a copy of the value 2.
var b = a;      // 'b' is always a copy of the value in 'a'
b++;
console.log(a); // 2
console.log(b); // 3
var c = [1,2,3];
var d = c;      // 'd' is a reference to the shared value
d.push( 4 );    // Mutates the referenced value (object)
console.log(c); // [1,2,3,4]
console.log(d); // [1,2,3,4]
/* Compound values are equal by reference */
var e = [1,2,3,4];
console.log(c === d); // true
console.log(c === e); // false