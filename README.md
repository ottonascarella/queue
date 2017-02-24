queue
=====

proof of concept of a way to execute different function calls (async or not) in order.

```
///pass an object (or don't) that all functions will be bound to;

var q = queue({a:1, b:2})

    /// add many calls to queue inside an array
    .add([
    
        function(next, i) {
        
          console.log(this) // outputs object that was passed as argument to queue (line 9)
          console.log(i); // outputs 0, the current index.
          next(); // calls next one on the stack;
          
          
        },
        
        // adds 1000ms delay in between calls
        1000, 
        
        
        function(next, i) {
          console.log(i); // outputs 1, the current index.
          next();
        }
        
    ])
    
    // another way to add a delay call in the queue
    .delay(3000)
    
    // adds individual function
    .add(function(next, i) {
      console.log(this.a + this.b); // outputs 3, cos this was set to be the object below.
    })
    
    // starts execution of the queue
    .play()
    
    // adds another task to the end of the queue
    .add(function(next) {
        console.log(this);
        next();
    });


q.pause().resume(1); ///pauses queue, and resumes starting on index 1
q.play(); //starts queue from beggining;
q.stop();//stops queue. cannot resume;

q.lenght // gets size of queue
q.index // gets current index of queue


```
