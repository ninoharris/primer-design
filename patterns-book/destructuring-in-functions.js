// Remember to call babel-node [filename] --preset stage-2
const args = {
	name: 'Harry',
	age: 22
}

const getDetails = function({ name, age }) {
	console.log(`${name} is ${age} years old.`)
}

getDetails(args)
