var MYAPP = MYAPP || {}

MYAPP.namespace = function (ns_string) {
	var parts = ns_string.split('.')
	var parent = MYAPP
	var i

	if (parts[0] === 'MYAPP') { // doesn't need NS at start of string
		parts = parts.slice(1)
	}
	for(i = 0; i < parts.length; i += 1) {
		// Create a property if it doesn't exist
		if (typeof parent[parts[i]] === 'undefined') {
			parent[parts[i]] = {}
		}
		parent = parent[parts[i]] // either way, will give the correct child node.
	}
	return parent // Give back the most 'indented' property back for modification.
}

MYAPP.namespace('hello.world')
console.log(JSON.stringify(MYAPP, null, 2))
MYAPP.namespace('MYAPP.hello.world')
console.log(JSON.stringify(MYAPP, null, 2))
MYAPP.namespace('MYAPP.hello.there')
console.log(JSON.stringify(MYAPP, null, 2))
