var result = true

Object.prototype.length = 10

function Person() {

}
Person.prototype.saying = "hi"

Array.prototype.q = "12"

for(var x in Array) {
	console.log(x)
	if(x == 'length')
		result = false
}

console.log(result)
