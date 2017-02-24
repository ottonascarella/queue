#Queue
=====

A very light way to avoid "callback hell".

Play and pause execution.

ECMAScript 3 compliant.

UMD compliant.

```

///pass object as initial data;
var q = new Queue({a:1, b:2})

    /// add n calls to queue (array)
    .add([

        function(next, data) {
          console.log(data) // outputs object that was passed as argument to queue (line 9)
          next('second data'); // calls next one on the stack;
        },

        // adds 1000ms delay in between calls
        1000,


        function(next, data) {
          console.log(data); // outputs 'second data'
          next({a:1, b:2});
        }

    ])

    // another way to add a delay call in the queue
    .delay(3000)

    // adds individual function
    .add(function(next, data) {
      console.log(data.a + data.b); // outputs number 3
      next(22)
    })

    // starts execution of the queue
    .play()

    // you can add another task to the end of the queue
    .add(function(next, data) {
        console.log(data);
        next();
    });

 
##Methods

q.pause();    //pauses execution
q.play();     //resumes queue execution
q.destroy();  //destroys queue

q.size()      // gets size of queue
q.index()     // gets current index of queue


```
