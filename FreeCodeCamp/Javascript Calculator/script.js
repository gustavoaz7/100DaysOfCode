const btns = document.querySelectorAll('p');
const operators = {
  '÷': '/',
  '×': '*',
  '-': '-',
  '+': '+'
}
let calc = "", lastBtn, parCounter = 0, answer;

btns.forEach(b=>b.addEventListener('click', ()=>{
  // Avoiding duplicated operators
  if (b.className === 'operator' && lastBtn.className === 'operator') {
    calc = calc.slice(0,-1); 
    calc += b.textContent
  } else {
    // Adding 'dot' only if last number is not yet decimal
    if (b.className === 'dot') {
      if (!/\d*\.\d*$/.test(calc)) calc += '.'
    } else {
      // Adding operator
      if (b.className === 'operator') {
        calc += operators[b.textContent]
      } else {
        // Adding numbers
        if (b.className === 'number') {
          calc += b.textContent
        } else {
          // Backspace - Removing last element
          if (b.className === 'delete') {
            calc.slice(0,-1)
          } else {
            // Clear all
            if (b.className === 'clear') {
              calc = '';
            } else {
              if (b.className === 'parO') {
                /\d$/.test(calc) ? calc+='*(' : calc+='(';
                parCounter++;
              } else {
                if (/\(/.test(calc) && parCounter > 0) calc+=')';
                parCounter--;
              }
            }
          }
        }
      }


      
    //if (b.className === 'equal') {
      //answer = eval(calc).toFixed(8)
      // while(answer[answer.length-1] === 0) {answer = answer.slice(0,-1)}
   // }
    }
  }
  lastBtn = b;
  
  console.log(calc)
  if (b.textContent === '=') {
    answer = eval(calc)
    Number.isInteger(answer) ? answer : answer.toFixed(8);
    while(answer[answer.length-1] === '0') {answer = answer.slice(0,-1)}
    // For brevity I'm ignoring rounding of 10th element
    answer < 10e10 ? answer = answer.toString().slice(0,10) : answer = answer.toExponential(5);
    calc = answer;
    console.log(answer);
  }
}))




//   LISTEN FOR KEYPAD ASWELL
// TURN IT ALL INTO A FUNCTION AND ACCEPT A DIFFERENT ARGUMENT (b.textContent and keyCode)
// operators[b.textContent] || keyCode
