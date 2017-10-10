"use strict"
var x1, q1
var x1 = q1 = 7 // works

// var r = w = 9
// Doesn't work, w not declared. "use strict" = no implicit globals

// Implicit vs explicit vars
var glo_var = "hi"
console.log(typeof glo_var)
// delete glo_var // Bah goes mental (EXPLICIT vars aren't properties!)
// 'delete' only works on properties, not str8 up vars.
// console.log(typeof glo_var)

this.prop_var = "hey"
console.log(typeof this.prop_var) // 'string'
delete this.prop_var // works. prop_var is implicit global (hence property)
console.log(typeof this.prop_var) // 'undefined'

this.test_var = "The test is true"
debugger
var global = (function() { // doesn't work lol, but no error.
	return this 
}())
debugger
// Doesn't work in ES5+
// console.log('global', global)
//
// function ham() {
// 	console.log(global.test_var)
// }
// ham.test_var = "no"
// ham()


console.log('this', this)
// console.log('process', process)
