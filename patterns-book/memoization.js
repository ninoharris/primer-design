// Uses the fact that functions are objects, hence have propoerties.

function func (a, b, c) {}
console.log('func.length is', func.length) // 3

// Custom function properties can be used for caching its result
var myFunc = function (param) {
	if (!myFunc.cache[param]) {
		myFunc.cache[param] = param * 2
	}
	return myFunc.cache[param]
}
// Aha! when using a cache, remember it initialise it.
myFunc.cache = {}

console.log(myFunc(3))
console.log(myFunc)

console.log('Module:', module)
