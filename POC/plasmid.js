console.log("\n\n\n ------- NEW RUN -------")

let sequence = []
for(let i = 0; i < 11; i++) {
	sequence.push({})
}

const RESitesClean = [
	{ "id": 0, "name": "HindIII", "seq": "AAGCTT", "length": 6 },
	{ "id": 1, "name": "EcoRI", "seq": "GAATTC", "length": 6 },
	{ "id": 2, "name": "NheI", "seq": "GCTAGC", "length": 6 },
	{ "id": 3, "name": "PstI", "seq": "CTGCAG", "length": 6 },
	{ "id": 4, "name": "SacII", "seq": "CCGCGG", "length": 6 },
	{ "id": 5, "name": "SpeI", "seq": "ACTAGT", "length": 6 },
	{ "id": 6, "name": "HpaI", "seq": "GTTAAC", "length": 6 },
	{ "id": 7, "name": "KpnI", "seq": "GGTACC", "length": 6 },
	// { name: "NotI", "seq": "GCGGCCGC", "length": 6 }
]

const randomInt = function(max) {
	if(typeof max !== 'number') throw new Error('randomInt:', max, ' is not a number')
	return Math.floor(Math.random() * max)
}

function generateRandom(len) {
	let str = ""
	for(let i = 0; i < len; i++) {
		str += generateRandomSingle()
	}
	return str
}

function generateRandomSingle(not) { // Pure
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

function complementFromString(str) { // Pure
	let complement = ""
	const outcomes = {
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
// console.log(RESitesClean[1]["name"], "\n" + RESitesClean[1]["seq"] + "\n" + complementFromString(RESitesClean[1]["seq"]))

function conflicts(s1, s2) {
	const short = s1.length < s2.length ? s1 : s2, long = s1.length < s2.length ? s2 : s1
	const shortReversed = reverse(short)

	if(long.indexOf(short) > -1 || long.indexOf(shortReversed) > -1) return true
	return false
}

function reverse(str) {
	return [...str].reverse().join('')
}




// Select 'guaranteed' RE sites
let RE1, RE2, RE1Index, RE2Index
RESites = RESitesClean.slice() // Make an editable copy of RESitesClean
RE1Index = randomInt(RESites.length) // Select first sequence
console.log("RESites.length before both splicing", RESites.length)
RE1 = RESites.splice(RE1Index, 1)[0]
console.log("RESites.length after one splicing", RESites.length)

do {
	RE2Index = randomInt(RESites.length)
	RE2 = RESites.splice(RE2Index, 1)[0]
	//  RESites[RE2Index]
} while (conflicts(RE1.seq, RE2.seq))
console.log("RE1", RE1)
console.log("RE2", RE2)
console.log("RESites.length after both splicing", RESites.length)


// Appoint 2 grps to contain one of each of the 2 'guaranteeds'
let grpContainingRE1 = randomInt(sequence.length), grpContainingRE2
do {
	grpContainingRE2 = randomInt(sequence.length)
} while (Math.abs(grpContainingRE1 - grpContainingRE2) < 1) // At least 1 apart either direction

console.log(grpContainingRE1, grpContainingRE2)
// console.log("\n\nAvailable RE sites left:\n", RESites)

sequence[grpContainingRE1] = RE1
sequence[grpContainingRE2] = RE2

for(let i = 0, count = 0, used = {}; i < sequence.length && count < 6; i++) {
	// Chance of a division containing a RE site is 40%
	if(sequence[i].id > -1 || Math.random() < 0.6) continue
	sequence[i] = RESites[randomInt(RESites.length)]
	count++
}

console.log("\n\nsequence contains:\n", sequence)

console.log(generateRandom(500))
