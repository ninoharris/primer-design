// Default pattern

const Person = function(name) {
	this.name = name || undefined
}
Person.prototype.getName = function() {
	return this.name
}
const Student = function(name) {
	this.id = 10
	this.name = name
}
Student.getId = function() {
	return this.id
}
const inherit = function(C, P) {
	C.prototype = new P() // points to a new instance... slow.
}
inherit(Student, Person)

var amy = new Student('Amy')
console.log(amy.getName())

Person.prototype.sayHi = function() {
	console.log('This shouldn\'t happen')
}

var peter = new Student('Peter')
peter.sayHi()

// Here's a non-reusable alternative
const Student2 = function(name) {
	this.name = name
}
Student2.prototype = Person
var andy = new Student('andy')
console.log(andy.getName())



console.log(andy.__proto__) // links up to person
