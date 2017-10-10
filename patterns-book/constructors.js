function Plasmid() {
	this.def = "1"

	let that = {}
	that.def = "2"
	return that
}
var x = new Plasmid()
console.log(x.def)
