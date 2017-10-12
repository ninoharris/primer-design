// This is a demonstration, not how you actually do it (too hard otherwise)

// Sandboxing means that two modules under the same name can co-exist: 'play' together
// Also doesn't require typing/resolving long dotted names (MYAPP.utilities.array)

// In the namespacing (MYAPP = (function() { return fn/obj }()) ), you have one global object
// In the sandbox pattern, we use a single global constructor:
// new Sandbox(function (box) {
// 	// The object box will act like MYAPP in the namespacing pattern
// 	// box will contain all the library functionality for this 'sandbox'
// 	if(!(this instanceof Sandbox)) {
// 		return new Sandbox(arguments[0]) // replay selecta
// 	}
// })
function Sandbox() {
	if (!(this instanceof Sandbox)) return new Sandbox(...arguments)
	// make arguments an Array
	const args = Array.prototype.slice.call(arguments)

	// The last argument is a callback
	const callback = args.pop() // Wow as if we finally used this
	// Pop is similar to slice(this.length - 1)
	// **** Actually pretty useful!!! ****


	// Modules can be passed as an array or as individual parameters: either is fine to use!
	let modules = (args[0] && Array.isArray(args[0])) ? args[0] : args
	// let modules = (args[0] && typeof args[0] === 'string') ? args : args[0] // woo
	let i

	// Add properties to 'this' as needed
	this.a = 1
	this.b = 2

	// Now add modules to the core 'this' object
	// no modules or "*" = use all modules
	if(!modules || modules === '*') {
		modules = []
		for (i in Sandbox.modules) {
			if (Sandbox.modules.hasOwnProperty(i)) {
				modules.push(i)
			}
		}
	}

	// initialise the required modules
	for (i = 0; i < modules.length; i += 1) { // i += 1 is better than using i++
		if(typeof Sandbox.modules[modules[i]] !== 'function') {
			throw Error(modules[i]+' is not a valid module')
			continue
		}
		Sandbox.modules[modules[i]](this)
	}

	// Call the callback
	return callback(this)
}

// Any prototype properties as needed
Sandbox.prototype = {
	name: 'My application',
	version: '1.0.0',
	getName: function() {
		return this.name
	}
}

// How we add modules
Sandbox.modules = {}

Sandbox.modules.dom = function (box) {
	box.getElement = function() {}
	box.getStyle = function() {}
	box.foo = 'bar'
}
Sandbox.modules.example = function (box) {
	box.bam = 'ham'
}
/// The functions which implement each module accept the current instance box

// The object box will be the namespace itself

console.log(Sandbox('example', 'dom', function (box) {
	// Can only ever return an object, as constructor functions must return an object
	// (not even primitives or functions)
	return { hello: box.bam }
}))
