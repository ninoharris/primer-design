var outer = "hi"
console.log('Explicit global:', outer)
;(function() {
	console.log('Global inside function but before declaration:', outer) // This fucks up because of hoisting
	var outer = "bye"
	console.log('Global after declaration:', outer)
	// As long as a variable is in the same scope (function)
	// its considered declared
}())
