console.log(({
	seq: 'ATGC',
	render() { // Shorthand ES6 way
		return this.seq
	},
	init() {
		console.log(this.render())
		return this
	}
}.init()).render())
