const prompt = require('prompt')

const sha1 = require('sha1')

prompt.start()
// Am i overdoing this?
prompt.get(['username', 'level'], function(err, result) {
	if(err) throw new Error(err)
	let usernameEncrypt = ""
	const reId = new RegExp(/(.{4})(.{4})/) // 'sedm4647' -> 'sedm','4647'
	for(let i = 0; i < 4; i++) {
		let match = reId.exec(result['username'])
		usernameEncrypt += match[1][i] + match[2][i] // 'sedm','4647' -> 's4','e6','d4'...
	}
	console.log(usernameEncrypt)
	let sha1text = sha1(usernameEncrypt + result['level'])
	let output = ""
	const getDigits = new RegExp(/\d/, 'g');
	for(let i = 0; i < 4; i++) {
		output += getDigits.exec(sha1text)
	}
	console.log(output)
	return output
})
// 3935
