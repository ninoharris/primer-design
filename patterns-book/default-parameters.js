// ES6

const multiply = function (a, b = 1) {
	return a * b
}
console.log(multiply(10))

const add = function (a, b = a) {
	return a + b
}
console.log(add(2))
