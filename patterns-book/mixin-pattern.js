// mixins are a form of object composition

const chocolate = {
	hasChocolate: () => true
}
const caramel = {
	hasCaramelSwirl: () => true
}
let iceCream = Object.assign({}, chocolate, caramel)
console.log(iceCream)

// If you can use ES6's spread operator
const newIceCream = {...chocolate, ...caramel}
console.log(newIceCream)


// Functional inheritance
function base (spec) {
	const that = {} // create an empty object
	that.name = spec.name // assign it a 'name' property using the same property 'name' in spec
	return that // return the modified object
}

function child (spec) {
	// create object through 'base' constructor
	const that = base(spec)
	that.sayHello = function() { // augment the object
		return 'Hello, my name is ' + that.name
	}
	return that
}

const paul = child({name: 'Paul Westwood'})
console.log(paul.sayHello())
// Not that functional inheritance is awkward, messy, and easy to break (still has tight coupling via 'base' function)

// Now bring in the functional mixins!
const flying = o => {
	let isFlying = false
	return Object.assign({}, o, {
		fly () {
			isFlying = true
			return this
		},
		isFlying: () => isFlying,
		land () {
			isFlying = false
			return this
		},
	})
}
const bird = flying({ name: 'keith gull'})
console.log(bird.isFlying())
console.log(bird.fly().isFlying())
console.log(bird.fly().land().isFlying())
console.log(bird)

// This is an amazing pattern!
const swimming = o => {
	let isUnderwater = false
	return Object.assign({}, o, {
		swim () {
			isUnderwater = true
			return this
		},
		unswim () {
			isUnderwater = false
			return this
		},
		isSwimming: () => isUnderwater
	})
}

const flyingFrog = swimming(flying({name: 'Todd'}))
console.log(flyingFrog.swim().isSwimming())
console.log(flyingFrog.fly().swim().land().isFlying())


console.log('Now doing some harder composition...')
const quacking =
	quack =>
	 	o => Object.assign({}, o, {
			quack: () => quack
		})

const duck = quacking('QuAcKK')(bird)
console.log(duck)
console.log(duck.quack())

const louderDuck = quacking('QUACKK!')
const jerry = louderDuck(bird)
console.log(jerry.quack())

// but how do we compose in order? compose or pipe? compose is RTL, whilst pipe is LTR. (aka go for pipe)
const pipe = (...fns) => (x) => fns.reduce((acc, curr) => curr(acc), x)
// pipe(fns)(x), where x is an object to be built upon

const speaking = o => {
	return Object.assign({}, o, {
		says (phrase) {
			return this.name + " says: " + phrase
		},
		shouts (phrase) {
			return this.name + " shouts: " + phrase.toUpperCase()
		}
	})
}

const createDuck = (quack, name) => pipe(
	quacking(quack),
	flying,
	swimming,
	speaking
)({ name: name })

let jeremy = createDuck('qoark', 'jeremy')
console.log(jeremy.swim().unswim().fly().land().quack())
console.log(jeremy.says('I am a bad man.'))
console.log(createDuck('qqq', 'niko').shouts('I am the baddest'))
