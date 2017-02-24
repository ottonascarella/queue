/*
	queue.js
	Otto Nascarella
	https://github.com/ottonascarella/queue
*/

(function(global, undefined) {
	"strict mode";

	function isArray(o) {
		return ( ({}).toString.call(o) === '[object Array]' );
	}

	function Queue(self) {

		// in case user forgets to use the new operator
		if (!(this instanceof Queue)) return new Queue(self);

		this._self = self || global;
		this._array = [];
		this._index = -1;
		this._timer = null;

	}

	Queue.prototype = {
		
		constructor: Queue,

		get length() {
			return this._array.length;
		},

		get index() {
			return this._index;
		},

		resume: function resume(seek) {
			var that = this, funk, time;

			/* use seek to go to a certain function in the queue */
			if (typeof seek !== 'number') that._index++;
			else that._index = seek;

			/* reached the end of the queue */
			if (that.index > that.length - 1) {
				that._array = [];
				return;
			}

			/* negative values normalized */
			if (that.index < 0) that._index += that.length;

			funk = that._array[that.index];

			/* set up timer, if element is a number instead of function */
			if (typeof funk === 'number') {

				time = funk;
				funk = function(resume) {

					/* stores a timer in case pause is needed */
					that._timer = setTimeout(function() {

						that.resume.call(that);

					}, time);

				};
			}

			/* call the current function with self as this, resume (next) and current position as arguments*/
			funk.call(that._self, that.resume.bind(that), that._index);

			return this;

		},

		/* pauses the queue execution */
		pause: function pause() {

			if (this._timer !== null) {
				clearTimeout(this._timer);
				this._timer = null;
				if (this.index > -1) this._index--;
			}

			return this;
		},

		/* destroys the queue execution */
		destroy: function destroy() {
			clearTimeout(this._timer);
			this._index = -1;
			this._array = [];

			return this;
		},

		/* plays the stack */
		play: function play() {
			clearTimeout(this._timer);
			this.resume(0);

			return this;
		},

		add: function add(obj) {

			if ( isArray(obj) ) {
				for (var j = 0, m = obj.length; j < m; j++) {
					if (typeof obj[j] === 'number' || typeof obj[j] === 'function') this._array.push( obj[j] );
				}
				return this;
			}

			if (typeof obj === 'function') this._array.push(obj);

			return this;
		},

		delay: function delay(time) {
			if (typeof time === 'number') this._array.push(time);

			return this;
		}

	};

	global.Queue = Queue;

}).call(null, this);
