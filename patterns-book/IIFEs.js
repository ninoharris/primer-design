// Immediately invoked function expressions

// Good for:
// Module definitions: setting up objects
// Page setup: eg adding event handlers

// Why?
// Local scope prevents bleeding into the global scope

// Let's give it a go
(function () {
	var days = ['Sun', 'Mon', 'Tues', 'Weds', 'Thurs', 'Fri', 'Sat']
	var date = new Date()
	var month = (date.getMonth() < 10) ? '0' + date.getMonth() : date.getMonth()
	var text = `Today is ${days[date.getDay()]}, ${date.getDate()}-${month}-${String(date.getFullYear()).slice(2)}`
	console.log(text)
}())
