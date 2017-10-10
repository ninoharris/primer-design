function IneedInput (a, b) {
	return (a + b)
}

(function() {
	var x
	setTimeout(() => {
		x = IneedInput(3, 4)
	}, 1000)
	console.log('After setTimeout declaration, but before its execution:', x)
	setTimeout(() => console.log('After execution:', x), 2000)
}())


var jsstring = "var woo = true; console.log('Using var within a new Function constructor:', woo)"
new Function(jsstring)()

// new Function is safer (ish), as its a bit more sandboxed.

// Also note that new Function can only 'see' within itself or global variables.
// new Function cannot see up its scope chain:
;(function() {
	var local = 6
	var q = new Function("local = 0; console.log('Local within the new function:', local)")
	q()
	console.log("new Function' cannot access up the local scope:", local) // returns 6
}())
