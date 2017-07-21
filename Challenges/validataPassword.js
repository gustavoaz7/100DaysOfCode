/*
You need to write regex that will validate a password to make sure it meets the following criteria:

At least six characters long
contains a lowercase letter
contains an uppercase letter
contains a number
Valid passwords will only be alphanumeric characters.
*/


function validate(password) {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,}$/.test(password);
}


/* 
return /^[A-Za-z0-9]{6,}$/.test(password) &&
       /[A-Z]+/           .test(password) &&
       /[a-z]+/           .test(password) &&
       /[0-9]+/           .test(password) ;
*/


validate('djI38D55'), 'djI38D55 - Expected true';
validate('a2.d412'), 'a2.d412 - Expected false';
validate('JHD5FJ53'), 'JHD5FJ53 - Expected false';
validate('!fdjn345'), '!fdjn345 - Expected false';
validate('jfkdfj3j'), 'jfkdfj3j - Expected false';
validate('123'), '123 - Expected false';
validate('abc'), 'abc - Expected false';
validate('Password123'), 'Password123 - Expected true';