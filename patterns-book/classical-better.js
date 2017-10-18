function Parent(name) {
	this.name = name || 'Adam'
}
Parent.prototype.sayName = function() {
	return this.name
}
function Child(name) {
	Parent.apply(this, arguments) // 'this' has its properties *copied* (not referenced) from Parent.prototype.
	// Still allows proper construction
}

// Multiple inheritance by borrowing constructors (rent and set prototyping)
function A() {
	this.a = 2
}
function B() {
	this.b = 3
}
function C(name) {
	this.name = name
	A.apply(this)
	B.apply(this)
}
function D() {

}
D.prototype.getDimensions = function () {
	return this.a * this.b
}
C.prototype = new D()
const c = new C('X')
console.log(c) // C { name: 'X', a: true, b: true}
console.log(c.getDimensions()) // returns 6


// Another pattern uses a Temporary constructor (known as the 'proxy pattern')
function inherit(C, P) {
	let F = function() {}
	F.prototype = P.prototype // releases direct link between C & P. C -> F -> F.prototype -> P.prototype.
	C.prototype = new F()
}
// Note this doesn't allow use of the parent's constructor (at least easily that is...)
// BUT allows for safe handling of the parent's shared methods.
function ChildProxy() {

}
inherit(ChildProxy, Parent)
var y = new ChildProxy('Name should not appear')
console.log(y.sayName())
