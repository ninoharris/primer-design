const prompt = require('prompt')

const sha1 = require('sha1')

prompt.start()

prompt.get(['username', 'level'], function(err, result) {
	if(err) throw new Error(err)
	let sha1text = sha1(result['username'] + result['level'])
	console.log(sha1text)
})
