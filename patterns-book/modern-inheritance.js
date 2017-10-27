// Doesn't use class inheritance, instead uses object inheritance.
var parent = {
	name: "papa"
}
var child = object(parent)
console.log(child.name)

// object uses an empty temporary constructor
function object(parent) {
	function F() {}
	F.prototype = parent
	return new F()
}
// From above, child always begin as a new empty object but with its prototype set to the parent (but not directly)


// Can also use Constructor functions. But if you do, both 'own' properties and Class methods are inherited.
function Parent() {
	this.name = 'adam'
}
Parent.prototype.getName = function() {
	return this.name
}
var papa = new Parent()
var adam = object(papa)
console.log(adam.getName()) // gets adam.

// a way to just get the methods, but not the 'self' stuff:
var notAdam = object(Parent.prototype)
// notAdam.name = 'George'
console.log(notAdam.getName()) // gets George || undefined.

// As of ECMAScript5 you can use Object.create(parent, obj)
// Where the second param is added to the parent in the object's construction

var amy = Object.create(new Parent(), { // Use property descriptors, not properties.
	age: { value: 2 },
	name: { value: 'Amy' },
	toString: {
	configurable: true, enumerable: true, writable: true,
	value: function() {
		return this.name + ' is going down the hill...';
	}},
})
console.log(amy.getName())
console.log(amy.age)
