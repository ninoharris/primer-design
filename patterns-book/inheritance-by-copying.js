// Another inheritance pattern = Inheritance by copying = **Shallow** object copying.

// Simply: an object gets functionality from another object, simply by copying it.

function extend(parent, child) {
	child = child || {}
	for(let i in parent) {
		if (parent.hasOwnProperty(i)) {
			child[i] = parent[i]
		}
	}
	return child
}
// In this implmentation, child is optional:
// If you don't pass an existing object to be augmentated, a brand new one is created instead.

var dad = { name: "Adam", stuff: { car: 'BMW' } }
var kid = extend(dad)
var kid2 = extend(dad, {age: 22})
console.log(kid.name)
console.log(kid2.name, kid2.age) // Allows augmentation of existing objects.

//This is a shallow copy, whilst deep copying would require checking each property is an object/array and acting recursively.
// Shallow copy = objects are passed by reference. Therefore mutating a property would mutate the parent also.
kid.stuff.car = 'BMX'
console.log(dad.stuff.car) // BMX, not BMW!!
console.log(kid.stuff === dad.stuff) //  true. The 'stuff' object is passed by reference


// Now lets try some deep copying
function extendDeep(parent, child) {
	child = child || {}
	for(let i in parent) {
		if(parent.hasOwnProperty(i)) {
			if(typeof parent[i] === 'object') {
				console.log('Using simple toString()', parent[i].toString())
				console.log('Using Object.prototype.toString.call()', Object.prototype.toString.call(parent[i]))
				// child[i] = Object.prototype.toString.call(parent[i]) === "[object Array]" ? [] : {}
				// A newer way is
				child[i] = Array.isArray(parent[i]) ? [] : {} // FAB!
				child[i] = extendDeep(parent[i], child[i])
			} else {
				child[i] = parent[i]
			}
		}
	}
	return child
}
let deepInheritance = extendDeep(dad)
console.log(deepInheritance.stuff)
console.log(deepInheritance.stuff === dad.stuff)
