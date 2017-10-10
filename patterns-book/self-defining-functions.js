// Firstly, a foundational pattern: returning functions

var setup = function () {
	var count = 0;
	return function () {
		return (count += 1) // starts at 1, not 0
	}
}

var next = setup()
console.log(next())
console.log(next())

// Self-defining functions = "Lazy functions"
var init = function () {
	console.log('Initialisation')
	init = function () {
		console.log('Carry on...')
	}
}

// init() // Initialisation
// init() // Carry on...

init.prop = 'An added property'

var rename = init
rename() // Initialisation
rename() // Initialisation
console.log(rename.prop) // An added property

init() // Even though it should be Initialisation, it's actually already done.
console.log(init.prop) // undefined

// The secret to all this is how pointers work, rename still points to
// the old *definition*, whilst init now points to the 'optimised' function
