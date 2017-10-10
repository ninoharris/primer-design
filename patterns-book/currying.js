import _ from 'lodash'
// from MPJ
const dragon =
	name =>
		size =>
			power =>
				name + ' is a ' + size + ' dragon that breathes ' + power

console.log(dragon('Kiros')('big')('ice'))

// Lets make this a bit more complicated (see bottom)


const sayHi = function(who) {
	return "Hello" + (who ? (", " + who) : "") + "!"
}

// In 'normal' languages (JS, Java, C++) we invoke/call a function
// In purely functional languages, we apply a function
console.log(sayHi())
console.log(sayHi("Ralph"))
console.log(sayHi.apply(null, ['Jimbo'])) // Applying gives same result

// A method being invokved is the same as applying a function with an object as 'this'
var alien = {
	sayHi: function(who) {
		return "The alien says hi" + (who ? (" to " + who) : "") + "!"
	}
}
console.log(alien.sayHi())
console.log(alien.sayHi('Jowdan')) // Either are are same as

console.log(alien.sayHi.apply(alien, ['George']))

// ---------------------------------------------------------------------------
// CALLING A FUNCTION IS THE SAME AS APPLYING A SET OF ARGUMENTS TO A FUNCTION
// ---------------------------------------------------------------------------

// A manual partial application (curry) of a function
function add(x, y) {
	if(typeof y !== 'number') {
		return function(y) {
			return x + y
		}
	}
}
// Note currying is also known as schonfinkelizing
console.log(add(6)(3))

// What do we need to do.
// We need to take in a function, which returns a function (2)
// (2) then takes parameters, x at a time, and returns a function unless
// the number of total arguments given is long enough for the function to run.
function schon(fn) {
	let args = []

	return function curry() {
		args = args.concat(Array.prototype.slice.apply(arguments))
		if(args.length >= fn.length) {
			return fn.apply(null, args)
		}
		return curry
	}
}

var addy = function (a, b, c, d, e) {
	return a + b + c + d + e
}

var hooray = schon(addy)
console.log(hooray(5)(1)(1,10,1))



const dragons = [
	{ name: 'Myru', power: 'ice' },
	{ name: 'Jenkins', power: 'old age' },
	{ name: 'Rayshun', power: 'fire' },
	{ name: 'Kanye', power: 'power' },
]

const filterDragons = function(power, dragon) {
	console.log('Filter', power, dragon)
	return dragon.power === power
}

const filterDragonsCurry = _.curry(filterDragons)

console.log(dragons.filter(filterDragonsCurry('ice'))) // woo it works!
