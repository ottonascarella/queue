queue
=====

A function stack player, with pause, play and resume...

```
var q = queue([
    function(next, i) {
      console.log(i); // outputs 0, the current index.
      next(); // calls next one on the stack;
    },
    function(next, i) {
      console.log(i); // outputs 1, the current index.
      next();
    },
    3000, // waits 3s
    function(next, i) {
      console.log(this.a + this.b); // outputs 3, cos this was set to be the object below.
    }
  ]
  , {
    a:1,
    b:2
  }
);


q.play(); ///plays stack
q.stop(); ///stops stack
q.pause(); ///pauses stack
q.resume(3); ///resumes stack on the 3rd index

q.play().stop().resume(2); ///chaining supported...even though not very useful
```
