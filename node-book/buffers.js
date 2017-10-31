console.log( new Buffer(8) ) // an uninitialised buffer

var buffer = new Buffer([ 8, 6, 7, 5, 3, 0, 9]); // a buffer of integers, each representing a byte
console.log(buffer)

buffer = new Buffer('Im a string!', 'utf-8')
console.log(buffer)

console.log((new Buffer(10)).write('Hello')) // buffer.write returned 5.
// BUG: This means that we wrote to five bytes of the buffer.

let emptyBuffer = new Buffer(30)
emptyBuffer.write('Hello,') // returns 6
emptyBuffer.write(' world', 6) // returns 6

console.log(emptyBuffer.toString('utf-8', 0, 10)) // returns 'Hello, worl'. no D cuz 11 'space' not 12.

console.log(new Buffer([1,2,3,4,5,255])) // hexadecimal -> 16 x 16 - 1 = (ff) = 255.

for(let i = 13; i < 20; i++) {
	emptyBuffer[i] = '!'.charCodeAt(0)
}
console.log(emptyBuffer)
console.log(emptyBuffer.toString())

console.log(emptyBuffer.length)

let party = new Buffer(10)
let welcome = new Buffer(15)
welcome.write('Hello!')
party.write('🎉', 'utf-8')
party.copy(welcome, 7)
console.log(welcome)
console.log(welcome.toString())
console.log(party)
// lets use slice. which creates a direct, editable representation of a slice of the array.
let confetti = welcome.slice(7, 11)
confetti.write('nope')
console.log(welcome.toString())
