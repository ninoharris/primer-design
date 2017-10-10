const Constructor = function(seq, res) {
	var plasmid = {
		id: new Date(),
		seq: { text: seq },
		res: res
	}
	this.getSpecs = function() {
		// return ...plasmid
	}
	this.getSequence = function() {
		return {
			...plasmid,
			age: 10
		}
	}
	this.setSequence = function() {
		plasmid.seq = 'BAM'
	}
}

var x = new Constructor('ATGC', 'AT')
// var edit = x.getSpecs()
var edit = x.getSequence()
console.log('edit', edit.seq)
edit.seq.text = 'TTTT' // why is this protected?
console.log('edit', edit.seq) // seriously why
console.dir(x.getSpecs()) // Note console.dir is identical to .log in terminal.
// console.dir is only useful for checking current object references in browsers
// or to check regex objects.
