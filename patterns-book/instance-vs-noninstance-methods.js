function Gadget(price) {
	this.price = price
}
Gadget.isShiny = function () {
	let msg = 'You bet\n'

	if(this instanceof Gadget) {
		msg += 'The price is $' + this.price + '.'
	}

	return msg
}
// This works
Gadget.prototype.isShiny = function() {
	return Gadget.isShiny.call(this)
}

// Why doesn't the following below work?
// Gadget.prototype.isShiny = Gadget.isShiny.bind(this)
// This definitely wont work
Gadget.prototype.isShiny = () => {
	return Gadget.isShiny.bind(this)()
}
// But this will, god oh mighty
Gadget.prototype.isShiny = function () {
	return Gadget.isShiny.bind(this)()
}

console.log(Gadget.isShiny())
var iphone = new Gadget(550.99)
var parent = {
	price: 10000,
	macbook: new Gadget(10)
}
console.log(parent.macbook.isShiny())
console.log(iphone.isShiny())
