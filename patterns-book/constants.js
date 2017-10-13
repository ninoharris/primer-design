const constant = (function() {
	const constants = {}
	const ownProp = Object.prototype.hasOwnProperty // lazy naming
	const allowed = {
		string: 1,
		number: 1,
		boolean: 1,
	}
	const prefix = (Math.random() + "_").slice(2) // slice gets rid of '0.'

	return { // why are we returning an object instead of directly returning a function?
		set: function (name, value) {
			if(this.isDefined(name)) return false
			if(!ownProp.call(allowed, typeof value)) return false

			constants[prefix] = value
			return true
		},
		isDefined: function (name) {
			return ownProp.call(constants, prefix + name)
		},
		get: function (name) {
			if (this.isDefined(name)) {
				return constants[prefix + name]
			}
			return null
		}
	}
}())
