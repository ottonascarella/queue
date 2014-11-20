queue
=====

A function stack player, with pause, play and resume...

```
var q = queue({a:1, b:2})
    .add([
        function(next, i) {
          console.log(i); // outputs 0, the current index.
          next(); // calls next one on the stack;
        },
        1000, // adds 1000ms delay
        function(next, i) {
          console.log(i); // outputs 1, the current index.
          next();
        }
    ])
    .delay(3000) // ads 3s delay
    // adds individual function
    .add(function(next, i) {
      console.log(this.a + this.b); // outputs 3, cos this was set to be the object below.
    })
    .play()
    .add(function(next) {
        console.log(this);
        next();
    });


q.pause().resume(1); ///pauses stack, and resumes starting on index 1
q.play(); ///plays stack from beggining;
q.stop(); ///stops stack. cannot resume;
q.lenght /// gets size of stack
q.index /// gets current index of stack

```
