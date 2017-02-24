/*
	queue.js
	Otto Nascarella
	https://github.com/ottonascarella/queue
*/

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof exports === "object") {
        module.exports = factory();
    } else {
        root.Queue = factory();
    }
}(this, function () {

	'strict mode';

	function isArray(o) {
		return ( ({}).toString.call(o) === '[object Array]' );
	}

	function toArray(a) {
		return [].slice.call(a);
	}

	function Queue(data) {

		if (!(this instanceof Queue)) return new Queue(data);

		this._data = data || undefined;
		this._queue = [];
		this._index = -1;
		this._paused = false;
		this._destroyed = false;
		this._timer = undefined;

	}

	Queue.prototype = {

		constructor: Queue,

		get size() {
			return this._queue.length;
		},

		get index() {
			return this._index;
		},

		_next: function _next(data) {

			if (this.index + 1 >= this.size) return;

			if (this._paused) {
				this._data = data;
				return;
			}

			this._index++;
			this._queue[this.index]
							.call(null, this._next.bind(this), data);

		},

		add: function add(stuff) {
			var that = this;

			if (this._destroyed) return;

			if (typeof stuff === 'function') {
				this._queue.push( stuff );
				return this;
			}

			// if reached here and not array, exit
			if ( !isArray(stuff) ) return this;

			for (var i = 0, m = stuff.length; i < m; i++) {

				switch (typeof stuff[i]) {
					case 'number':
						this.delay( stuff[i] )
						break;

					case 'function':
						this._queue.push( stuff[i] )
						break;
				}

			}

			return this;
		},

		/* starts execution */
		play: function play() {
			if (this._destroyed) return;

			this._paused = false;
			this._next(this._data);
			return this;
		},

		/* pauses the queue execution */
		pause: function pause() {
			clearTimeout(this._timer);
			this._paused = true;
			return this;
		},

		/* destroys the queue execution */
		destroy: function destroy() {
			this.pause();
			this._queue = [];
			this._data = undefined;
			this._index = -1;
			this._paused = false;
			this._destroyed = true;
			return this;
		},

		delay: function delay(time) {
			var that = this;

			this.add(function(next, data) {
				that._timer = setTimeout(function() {
					if (typeof next == 'function') next(data);
				}, time);
			});

			return this;
		}

	}; // prototype

    return Queue;

}));
