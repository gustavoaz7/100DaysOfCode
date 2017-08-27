// Censored keyboard
/*
Between 1928 and 2013, Turkish law forbade the use of the letters Q, W, and X in official documents. 
This was part of a wider initiative to stifle Kurdish culture—those letters occur in the language used 
by Kurdish people but not in Istanbul Turkish.
As an exercise in doing ridiculous things with technology, I’m asking you to program a text field 
(an <input type="text"> tag) that these letters cannot be typed into.
*/
<input type="text"></input>
<script>
  var field = document.querySelector("input");
  // Your code here.
  field.addEventListener('keydown', function (e){
  	if (`${e.keyCode}`.match(/81|87|88/)) e.preventDefault()
  });
</script>



// Mouse trail
/*
In JavaScript’s early days, which was the high time of gaudy home pages with lots of animated images, 
people came up with some truly inspiring ways to use the language.
One of these was the “mouse trail”—a series of images that would follow the mouse pointer as you moved 
it across the page.
In this exercise, I want you to implement a mouse trail. Use absolutely positioned <div> elements with 
a fixed size and background color (refer to the code in the “Mouse Clicks” section for an example). 
Create a bunch of such elements and, when the mouse moves, display them in the wake of the mouse pointer.
There are various possible approaches here. You can make your solution as simple or as complex as you want. 
A simple solution to start with is to keep a fixed number of trail elements and cycle through them, moving the next one to the mouse’s current position every time a "mousemove" event occurs.
*/
<style>
  .trail { /* className for the trail elements */
    position: absolute;
    height: 6px; width: 6px;
    border-radius: 3px;
    background: teal;
  }
  body {
    height: 300px;
  }
</style>

<script>
  // Your code here.
  addEventListener('mousemove', function(e){
  	let trail = document.createElement('div');
    trail.classList.add('trail');
    trail.style.top = `${e.pageY}px`;
    trail.style.left = `${e.pageX}px`;
    console.log(trail)
    document.body.appendChild(trail)
    setTimeout(() => document.body.removeChild(trail), 500);
  })
</script>



// Tabs
/*
A tabbed interface is a common design pattern. It allows you to select an interface panel by choosing 
from a number of tabs “sticking out” above an element.
In this exercise you’ll implement a simple tabbed interface. Write a function, asTabs, that takes a DOM 
node and creates a tabbed interface showing the child elements of that node. It should insert a list of 
<button> elements at the top of the node, one for each child element, containing text retrieved from the 
data-tabname attribute of the child. All but one of the original children should be hidden 
(given a display style of none), and the currently visible node can be selected by clicking the buttons.
When it works, extend it to also style the currently active button differently.
*/
<div id="wrapper">
  <div data-tabname="one">Tab one</div>
  <div data-tabname="two">Tab two</div>
  <div data-tabname="three">Tab three</div>
</div>
<script>
  function asTabs(node) {
    // Your code here.
    let tabs = [];
    node.querySelectorAll('div').forEach(tab => {if (tab.nodeType === 1) tabs.push(tab)});
	let tabbar = document.createElement('div');
    tabs.forEach((tab,i) => {
    	let but = document.createElement('button');
      	but.textContent = tab.getAttribute('data-tabname');
      	but.addEventListener('click', () => changeTab(i))
        tabbar.appendChild(but);
    });
    node.insertBefore(tabbar, node.firstChild);
    
    function changeTab(n) {
    	for (let i = 0; i < tabs.length; i++) {
        	if (i === n) {
              tabs[i].style.display = "";
              tabbar.childNodes[i].style.textTransform = 'uppercase';
              tabbar.childNodes[i].style.fontWeight = 'bold';
            } else {
              tabs[i].style.display = 'none';
              tabbar.childNodes[i].style.textTransform = "lowercase";
              tabbar.childNodes[i].style.fontWeight = "normal";
            }
        }
    }
  }
  asTabs(document.querySelector("#wrapper"));
</script>