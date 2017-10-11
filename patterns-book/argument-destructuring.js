// The following are different ways to do destructuring

var x = {
	hello: "hi"
}

function bamWham(input) {
	let { hello } = input
	console.log(hello)
}

bamWham(x)

function fireSam(input) {
	let hello
	({hello} = input) // must be in parenthese in order for the des-object to not be seen as a code block
	console.log(hello)
}
fireSam(x) // same as bamWham

// this is the same as:
// works as long as the property is found in the object.
function giveMeHam({ hello }) {
	console.log(hello)
}
giveMeHam(x) // same as above
