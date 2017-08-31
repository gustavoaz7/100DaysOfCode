// Shapes
/*
Write a program that draws the following shapes on a canvas:
A trapezoid (a rectangle that is wider on one side)
A red diamond (a rectangle rotated 45 degrees or ¼π radians)
A zigzagging line
A spiral made up of 100 straight line segments
A yellow star
The shapes to draw
When drawing the last two, you may want to refer to the explanation of Math.cos and Math.sin in Chapter 13, 
which describes how to get coordinates on a circle using these functions.
I recommend creating a function for each shape. Pass the position, and optionally other properties, 
such as the size or the number of points, as parameters. The alternative, which is to hard-code numbers 
all over your code, tends to make the code needlessly hard to read and modify.
*/
<canvas width="600" height="200"></canvas>
//<script>
  var cx = document.querySelector("canvas").getContext("2d");
  // Your code here.
  function trapezoid(xi, yi, B, b, h){
    cx.beginPath();
    cx.moveTo(xi, yi);
    cx.lineTo(xi + b, yi);
    cx.lineTo((xi + b) + (B - b)/2, yi - h);
    cx.lineTo(xi - (B - b)/2, yi - h);
    cx.closePath();
    cx.stroke();	 
  }
  trapezoid(10,90,50,90,50)
  
  function diamond(xi, yi, side) {
    cx.translate(xi, yi);
    cx.rotate(Math.PI / 4);
    cx.fillStyle = "red";
    cx.fillRect(-side/2, -side/2, side/2, side/2);
    cx.resetTransform();
  }
  diamond(160, 90, 100);
  
  function zigzag(xi, xf, yi, height, n) {
    cx.beginPath();
    for (var y = yi; y < height*n; y += height) {
      cx.moveTo(xi, y);
      cx.lineTo(xf, y+height/2);
    }
    for (var y = yi+height/2; y <= height*n; y += height) {
      cx.moveTo(xf, y);
      cx.lineTo(xi, y+height/2);
    }
    cx.stroke();
  }
  zigzag(230, 330, 10, 20, 5);
  
  function spiral(xi, yi, r) {
    var xc = xi + r, yc = yi + r, dist = 5*r;
    cx.beginPath();
    cx.moveTo(xc, yc);
    for (var i = 0; i < dist; i++) {
      var angle = i * Math.PI / (dist/8);
      var d = r * i / dist;
      cx.lineTo(xc + Math.cos(angle) * d, yc + Math.sin(angle) * d);
    }
    cx.stroke();
  }
  spiral(350, 10, 60);
  
  function star(xi, yi, r, edges) {
    var xc = xi + r, yc = yi + r;
    cx.beginPath();
    cx.moveTo(xc + r, yc);
    for (var i = 1; i <= edges; i++) {
      var angle = i * Math.PI / (edges/2);
      cx.quadraticCurveTo(xc, yc, xc + Math.cos(angle) * r, yc + Math.sin(angle) * r);
    }
    cx.fillStyle = "yellow";
    cx.fill();
  }
  star(480, 20, 60, 8);
//</script>



// The pie chart
/*
Earlier in the chapter, we saw an example program that drew a pie chart. 
Modify this program so that the name of each category is shown next to the slice that represents it.
Try to find a pleasing-looking way to automatically position this text, 
which would work for other data sets as well. 
You may assume that categories are no smaller than 5 percent (that is, there won’t be a bunch of tiny 
ones next to each other).
You might again need Math.sin and Math.cos, as described in the previous exercise.
*/
<canvas width="600" height="300"></canvas>
//<script>
  var cx = document.querySelector("canvas").getContext("2d");
  var total = results.reduce(function(sum, choice) {
    return sum + choice.count;
  }, 0);
  var currentAngle = -0.5 * Math.PI;
  var centerX = 300, centerY = 150;
  // Add code to draw the slice labels in this loop.
  results.forEach(function(result) {
    var sliceAngle = (result.count / total) * 2 * Math.PI;
    cx.beginPath();
    cx.arc(centerX, centerY, 100,
           currentAngle, currentAngle + sliceAngle);
    var middleAngle = currentAngle + 0.5 * sliceAngle;
    var textX = Math.cos(middleAngle) * 120 + centerX;
    var textY = Math.sin(middleAngle) * 120 + centerY;
    cx.textBaseLine = "middle";
    if (Math.cos(middleAngle) > 0) cx.textAlign = "left";
    else cx.textAlign = "right";
    cx.font = "16px sans-serif";
    cx.fillStyle = '#333';
    cx.fillText(result.name, textX, textY);
    currentAngle += sliceAngle;
    cx.lineTo(centerX, centerY);
    cx.fillStyle = result.color;
    cx.fill();
  });
//</script>




// A bouncing ball
/*
Use the requestAnimationFrame technique that we saw in Chapter 13 and Chapter 15 to draw a box with a 
bouncing ball in it. The ball moves at a constant speed and bounces off the box’s sides when it hits them.
*/
<canvas width="400" height="400"></canvas>
//<script>
  var cx = document.querySelector("canvas").getContext("2d");

  var lastTime = null;
  function frame(time) {
    if (lastTime != null)
      updateAnimation(Math.min(100, time - lastTime) / 1000);
    lastTime = time;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  var xc =30, yc = 30, r = 10, speedX = Math.random()*100 +100, speedY = Math.random()*100 +100;
  
  function updateAnimation(step) {
    // Your code here.
    cx.clearRect(0, 0, 350, 350);
    cx.strokeRect(10, 10, 300, 300);
    
    xc += speedX * step;
    yc += speedY * step;
    if (xc - r < 10 || xc + r > 310) speedX = -speedX;
    if (yc - r < 10 || yc + r > 310) speedY = -speedY;
    
    cx.fillStyle = 'blue';
    cx.beginPath();
    cx.arc(xc, yc, r, 0, 7);
    cx.fill();
  }
//</script>