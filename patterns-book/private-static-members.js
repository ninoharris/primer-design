var Cons = (function() {
	var counter = 0

	// The outer function is not the constructor itself, but is instead to wrap
	// around private members.
	var ActualConstructor = function(prop) {
		this.text = prop
		this.id = (counter += 1)
	}

	ActualConstructor.prototype.getLastId = function() {
		return counter
	}

	ActualConstructor.prototype.getText = function() {
		return this.text
	}
	ActualConstructor.prototype.getId = function() {
		return this.id
	}
	return ActualConstructor
}()) // Using an IIFE

var x = new Cons('Test')
console.log(x.getLastId())
console.log(x.getText())
var y = new Cons('Test2')
console.log(y.getLastId())
console.log(y.getText())
console.log(x.getLastId())
console.log(x.getId())
