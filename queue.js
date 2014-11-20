/*
	Queue - A stack of functions with pause, play, resume, delay....
	Made for fun. Use it as you want.

	Author: Otto Nascarella

*/

(function(global, undefined) {
	"strict mode";

	function isArray(o) {
		return ( ({}).toString.call(o) === "[object Array]" );
	}

	function q(self) {

		var index = -1,
			array = [],
			timer = null;


		self = self || global;



		/* creates the object that will be returned by queue and its "methods" */
		var queue = {
			add: add,
			delay: delay,
			resume: resume,
			pause: pause,
			play: play,
			stop: stop,
			get length() {
				return array.length;
			},
			get index() {
				return index;
			}
		};

		/* function that calls next function in the stack */
		function resume(seek) {
			var funk,
				time;


			/* use seek to go to a certain function in the queue */
			if (typeof seek !== 'number') {
				index++;
			} else {
				index = seek;
			}

			/* reached the end of the queue */
			if (index > array.length - 1) {
				array = [];
				return;
			}

			/* negative values normalized */
			if (index < 0) i += array.length;

			funk =  array[index];

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

			/* call the current function with self as this, resume (next) and current position as arguments*/
			funk.call(self, resume, index);

			return queue;

		}

		/* pauses the stack execution */
		function pause() {

			if (timer !== null) {
				clearTimeout(timer);
				timer = null;
				if (index > -1) index--;
			}

			return queue;
		}


		/* stops the stack execution */
		function stop() {
			clearTimeout(timer);
			index = -1;
			array = [];

			return queue;
		}

		/* plays the stack */
		function play() {
			clearTimeout(timer);
			resume(0);
			return queue;
		}


		function add(obj) {
			if ( isArray(obj) ) {
				for (var j = 0, m = obj.length; j < m; j++) {
					if (typeof obj[j] === 'number' || typeof obj[j] === 'function') array.push( obj[j] );
				}
				return queue;
			}

			if (typeof obj === 'function') array.push(obj);

			return queue;
		}

		function delay(time) {
			if (typeof time === 'number') array.push(time);

			return queue;
		}



		return queue;

	}


	global.queue = q;

}).call(null, window);