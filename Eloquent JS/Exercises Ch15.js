// Game over
/*
It’s traditional for platform games to have the player start with a limited number of lives and subtract 
one life each time they die. When the player is out of lives, the game restarts from the beginning.
Adjust runGame to implement lives. Have the player start with three.
*/
<link rel="stylesheet" href="css/game.css"/>
<body>
<script>
  // The old runGame function. Modify it...
  function runGame(plans, Display) {
    var trials = 3;
    function startLevel(n) {
      runLevel(new Level(plans[n]), Display, function(status) {
        if (status == "lost") {
          trials--;
          if (trials === 0) {
          	console.log("Game Over")
            startLevel(0);
          }
          startLevel(n);
        }
        else if (n < plans.length - 1)
          startLevel(n + 1);
        else
          console.log("You win!");
      });
    }
    startLevel(0);
  }
  runGame(GAME_LEVELS, DOMDisplay);
</script>
</body>



// Pausing the game
/*
Make it possible to pause (suspend) and unpause the game by pressing the Esc key.
This can be done by changing the runLevel function to use another keyboard event handler and 
interrupting or resuming the animation whenever the Esc key is hit.
The runAnimation interface may not look like it is suitable for this at first glance, but it is, 
if you rearrange the way runLevel calls it.
When you have that working, there is something else you could try. 
The way we have been registering keyboard event handlers is somewhat problematic. 
The arrows object is currently a global variable, and its event handlers are kept around even when 
no game is running. You could say they leak out of our system. 
Extend trackKeys to provide a way to unregister its handlers, and then change runLevel to register 
its handlers when it starts and unregister them again when it is finished.
*/
<link rel="stylesheet" href="css/game.css"/>
<body>
<script>
  function runLevel(level, Display, andThen) {
    var display = new Display(document.body, level);
    
    var runflag = true;
    function handleKey(event) {
      if (event.keyCode === 27) {
        if (!runflag) {
          runflag = !runflag;
          runAnimation(animation);
        } else if (runflag === "pause") runflag = true; 
        else if (runflag)  runflag = "pause";
      }
    }
    addEventListener("keydown", handleKey);
    var arrows = trackKeys(arrowCodes);
    function animation(step) {
      if (runflag === "pause") {
        runflag = false;
        return runflag;
      }
      level.animate(step, arrows);
      display.drawFrame(step);
      if (level.isFinished()) {
        display.clear();
        removeEventListener("keydown", handleKey);
        arrows.unregister();
        if (andThen)
          andThen(level.status);
        return false;
      }
    }
    runAnimation(animation);
  }
  function trackKeys(keys) {
    var key = {};
    function handler(e) {
      if (keys.hasOwnProperty(e.keyCode)) {
        var active = e.type === "keydown";
        key[keys[e.keyCode]] = active;
        e.preventDefault();
      }
    }
    addEventListener("keydown", handler);
    addEventListener("keyup", handler);
    key.unregister = function() {
      removeEventListener("keydown", handler);
      removeEventListener("keyup", handler);
    };
    return key;
  }
  runGame(GAME_LEVELS, DOMDisplay);
</script>
</body>