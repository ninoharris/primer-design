const repeatChar = function(count, ch) {
	if(!ch || ch.length === 0) ch = " " // Default repeated char is space
    var txt = "";
    for (var i = 0; i < count; i++) {
        txt += ch;
    }
    return txt;
}


const randomInt = function(max) {
	if(isNaN(max)) throw new Error('randomInt:', max, ' is not a number')
	return Math.floor(Math.random() * max)
}


const generateSequenceWithInclude = function(len, include, start) {
	// console.log("generateSequenceWithInclude:", len, include, start)
	if(isNaN(len) || len <= 0) throw new Error("Length must be a number > 0")
	let str = generateRandom(start)
	str += include
	str += generateRandom(len - (include.length + start))
	return str
}

const generateRandom = function(len) {
	if(isNaN(len)) throw new Error("Length must be a number")
	let str = ""
	for(let i = 0; i < len; i++) {
		str += generateRandomSingle()
	}
	return str
}

const generateRandomSingle = function(not) { // Pure
	let pos, outcomes = ["A", "T", "G", "C"]
	if(not) {
		if(Array.isArray(not)) {
			for(let i = 0; i < not.length; i++) {
				if(pos = outcomes.indexOf(not[i]))
					outcomes.splice(pos, 1)
			}
		} else if(pos = outcomes.indexOf(not)) {
			outcomes.splice(pos, 1)
		}
	}
	return outcomes[randomInt(outcomes.length)]
}

const complementFromString = function(str) { // Pure
	if(!str || str.length === 0) throw new Error("String must not be empty")
	let complement = ""
	const outcomes = {
		" ": " ",
		"A": "T",
		"T": "A",
		"G": "C",
		"C": "G"
	}
	for(let i = 0; i < str.length; i++) {
		if(!outcomes[str[i]]) {
			throw new Error(`ComplementFromString: char "${str[i]}" is not a standard NT:`, str)
		}
		complement += outcomes[str[i]]
	}
	return complement
}


// const seq = generateRandom(9)
// console.log(seq, complementFromString(seq))
// console.log(RESitesClean[1]["name"],
// "\n" + RESitesClean[1]["seq"] + "\n" +
// complementFromString(RESitesClean[1]["seq"]))

const conflicts = function(s1, s2, maxRepeats) {
	const short = s1.length < s2.length ? s1 : s2
	const long = s1.length < s2.length ? s2 : s1
	const shortReversed = reverse(short)

	// If no maxRepeats, use a simpler one
	if(!maxRepeats) {
		if(long.indexOf(short) > -1 || long.indexOf(shortReversed) > -1) return true
		return false
	}

	if(typeof maxRepeats !== 'number') {
		throw Error('maxRepeats must be an integer.')
	}

	// If we have maxRepeats, then we need to test a certain limit of times.
	const reg1 = RegExp(short, 'g'), reg2 = RegExp(shortReversed, 'g')
	let match, matchCount
	// Yes its repeating, but this is fine.
	matchCount = 0
	while((match = reg1.exec(long)) !== null) {
		if(matchCount++ >= maxRepeats) return true
	}
	matchCount = 0
	if((match = reg2.exec(long)) !== null) {
		if(matchCount++ >= maxRepeats) return true
	}
	return false
}
// TODO: see if non ES6 method exists
const reverse = function(str) {
	return [...str].reverse().join('')
}

const utils = {
	repeatChar,
	randomInt,
	generateSequenceWithInclude,
	generateRandom,
	generateRandomSingle,
	complementFromString,
	conflicts,
	reverse,
}
export default utils
// console.log('module', module)

console.log(conflicts('TA', 'ATGCTATATA', 2))
