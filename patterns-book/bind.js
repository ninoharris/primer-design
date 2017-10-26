// Binding allows decoupling of apply(context, args) with the actual function invocation.

let applyToObject = function(a, b) {
	this.result += (a + b)
	return this
}

const myObj = {
	result: 0
}

const addToMyObj = applyToObject.bind(myObj)
console.log(addToMyObj(1,1)) // returns 2

// You can also bind arguments, like currying does.
const addFiveToMyObj = applyToObject.bind(myObj, 5)

console.log(addFiveToMyObj(10)) // 2 + 5 + 10 = 17.

// can you rebind though?
const mySecondObj = {
	result: 100
}

// Nope, i guess you just bind another argument to the function.
let secondBinding = addFiveToMyObj(100) // returns an object of {result: 122}
console.log(secondBinding)

applyToObject = function(x) {
	this.result *= x
	return this
}
console.log(addFiveToMyObj(0.1))
// Conclusion: bind doesn't modify the function its been given, but instead creates
// a copy of the function which now has a different context (and possibly args) bound.
console.log(addToMyObj(10,0.2)) // see, even though addToMyObj is derived from applyToObject,
// It doesn't get affected by the reassignment of the applyToObject *pointer*
