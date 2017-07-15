function condenseSentence(str) {
    return str.split(" ").reduce((prev, next) => {
      for (var i = next.length; i >= 0; i--) {
        if (prev.substr(-i) == next.substr(0,i)) {
          return prev+next.substr(i);
        }
      }
      return prev + " " + next;
    });
}

condenseSentence('no one ever runs so often');
condenseSentence('hello world'); 
condenseSentence('this is nice'); 