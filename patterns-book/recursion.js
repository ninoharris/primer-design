const countdown = num => {
	if(num === 0) return
	console.log(num)
	countdown(num - 1)
	console.log('bam')
}

// countdown(10)


getChildren(animalArray, parent) {
	if(animalArray.find(animal => animal.parent == null) return null
	let nodes = animalArray.filter(animal => animal)
	let children = {}
	for (let i = 0, max = nodes.length; i < max; i++) {
		children[nodes[i].name] = getChildren(animalArray, nodes[i])
	}
	return children
}
