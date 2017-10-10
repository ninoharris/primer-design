var counter = 1

function increment() {
	return counter++
}

function decrement() {
	return counter--
}

module.exports = {
	counter: counter,
	increment: increment,
	decrement: decrement
}
