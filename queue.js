/*
	Queue - A stack of functions with pause, play, resume, delay....
	Made for fun.
	Use it as you want.

	ex: queue(arrayOfFunctionsAndPauses, self);

	q = queue([
		function(next, i) {
			console.log(i); // prints 0, the index of the function in the function's array
		},
		2000, // adds 2000ms pause
		function(next, i) {
			console.log(Date.now - this); // 2000ish (this was set to be Date.now() )
		}
	], Date.now() );


	q.play() => executes
	q.pause() => pauses
	q.resume(index) => resumes at a certain index of the array, or where it got paused(in case of no index given)
	q.stop() => stops

*/

(function(window, undefined) {
	"strict mode";

	function q(array, self) {

		var i = -1,
			l = array.length - 1,
			timer = null;


		self = self || window;

		/* creates the object that will be returned by queue and its "methods" */
		var queue = {
			resume: resume,
			pause: pause,
			play: play,
			stop: stop
		};

		/* function that calls next function in the stack */
		function resume(seek) {
			var funk,
				time;


			/* use seek to go to a certain function in the queue */
			if (typeof seek !== 'number') {
				i++;
			} else {
				i = seek;
			}

			/* reached the end of the queue */
			if (i > l) return;

			/* negative values normalized */
			if (i < 0) i += array.length;

			funk =  array[i];

			/* set up timer, if array element is a number */
			if (typeof funk === 'number') {
				time = funk;

				funk = function(resume) {
					/* stores a timer in case pause is needed */
					timer = setTimeout(function() {
						resume();
					}, time);
				};
			}


			/* call the current function with self as this, resume(next) and current position as arguments*/
			funk.call(self, resume, i);

			return queue;

		}

		/* pauses the stack execution */
		function pause() {

			if (timer !== null) {
				clearTimeout(timer);
				timer = null;
				if (i > -1) i--;
			}

			return queue;
		}


		/* stops the stack execution */
		function stop() {
			clearTimeout(timer);
			i = -1;

			return queue;
		}

		/* plays the stack */
		function play() {
			clearTimeout(timer);
			resume(0);
			return queue;
		}


		return queue;

	}


	window.queue = q;

}(window));