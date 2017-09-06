// A JavaScript workbench
/*
Build an interface that allows people to type and run pieces of JavaScript code.
Put a button next to a <textarea> field, which, when pressed, uses the Function constructor we saw 
in Chapter 10 to wrap the text in a function and call it. Convert the return value of the function, 
or any error it raised, to a string and display it after the text field.
*/
<textarea id="code">return "hi";</textarea>
<button id="button">Run</button>
<pre id="output"></pre>

// Your code here.
let code = document.getElementById('code');
let run = document.getElementById('button');
let output = document.getElementById('output');

run.addEventListener('click', () => {
  output.textContent = new Function(code.value)();
});




// Autocompletion
/*
Extend a text field so that when the user types, a list of suggested values is shown below the field. 
You have an array of possible values available and should show those that start with the text that was typed. 
When a suggestion is clicked, replace the text field’s current value with it.
*/
<input type="text" id="field"/>
<div id="suggestions" style="cursor: pointer"></div>

// Builds up an array with global variable names, like
// 'alert', 'document', and 'scrollTo'
var terms = [];
for (var name in window)
  terms.push(name);

// Your code here.
let typed = document.getElementById('field');
let suggestions = document.getElementById('suggestions');

typed.addEventListener('keydown', () => {
  suggestions.textContent = "";
  let match = terms.filter(x => x.startsWith(typed.value));
  match.forEach(i => {
    let item = document.createElement('div');
      item.textContent = i;
      item.addEventListener('click', () => {
        typed.value = i;
          suggestions = "";
      });
      suggestions.appendChild(item);
  });
});
