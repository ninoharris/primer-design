const _ = {}
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
_.debounce = function(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
var start = Date.now()
function fireEvent () {
	console.log('Event fired at ' + (Date.now() - start) + 'ms past')

}
let fireEventDebounce = _.debounce(fireEvent, 1000, true)

setInterval(fireEventDebounce, 2000)
setInterval(fireEventDebounce, 1500)
