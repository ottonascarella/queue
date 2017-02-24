Queue
=====

proof of concept of a way to execute different function calls (async or not) in order.

```


///pass object as initial data;
const Queue = require('queue.js');

const q = new Queue({a:1, b:2})

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

    // adds another task to the end of the queue
    .add(function(next, data) {
        console.log(data);
        next();
    });


q.pause();   //pauses execution
q.resume(3); //resumes execution starting on index
q.play();    //starts queue from index 0;
q.destroy(); //stops queue. cannot resume;

q.size  // gets size of queue
q.index // gets current index of queue


```
