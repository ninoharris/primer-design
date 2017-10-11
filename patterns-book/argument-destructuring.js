var x = {
	hello: "hi"
}

function bamWham(input) {
	let { hello } = input
	console.log(hello)
}

bamWham(x)

// this is the same as:
// works as long as the property is found in the object.
function giveMeHam({ hello }) {
	console.log(hello)
}
