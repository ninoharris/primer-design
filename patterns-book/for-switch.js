// How NOT to do for loops
var start = new Date()
var myArray = [1,11,2,12,3,13,4,14,5,15,6,16,7,17,8,18,9,19]
console.log(new Date() - start)
for (var i = 0; i < myArray.length; i++) {

}

// better way to perform for loops
// especially in the case of repeating DOM methods (get getElementsByName/ClassName/TagName)
start = new Date()
for (var i = 0, max = myArray.length; i < max; i++) {
}
console.log(new Date() - start)

// How to do for in loops: for Objects only!
// Remember we only want to enumerate the object's direct properties
// To prevent stuff like this v from getting in...

var mark = {
	hands: 2,
	feet: 2,
	head: 1
}
Object.prototype.sayHi = function() {
	console.log('Hi!')
}

// Now the real execution:
let bodyPart
let isPropOf = Object.prototype.hasOwnProperty
for(bodyPart in mark) if (isPropOf.call(mark, bodyPart)) {
	console.log('Mark has', mark[bodyPart], bodyPart)
}


// How to do a switch right:
let query = 3
let result
switch (query) {
case 0:
	console.log('Query was 0')
	break;
case 1:
	console.log('Query was 1')
	break;
default:
	console.log('Unknown query')
}
