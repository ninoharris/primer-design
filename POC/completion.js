const prompt = require('prompt')

const sha1 = require('sha1')

prompt.start()

prompt.get(['username', 'level'], function(err, result) {
	if(err) throw new Error(err)
	let sha1text = sha1(result['username'] + result['level'])
	const getDigits = new RegExp(/\d/, 'g');
	let str = ""
	for(let i = 0; i < 4; i++) {
		str += getDigits.exec(sha1text)
	}
	console.log(str)
	return str
})
// 3935
