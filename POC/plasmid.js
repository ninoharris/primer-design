const pad = require('pad')

function repeatChar(count, ch) {
	if(!ch || ch.length === 0) ch = " " // Default repeated char is space
    var txt = "";
    for (var i = 0; i < count; i++) {
        txt += ch;
    }
    return txt;
}

console.log("\n\n\n ------- NEW RUN -------")

const sequenceTemplate = {
	NTLength: 9,
	REStart: null,
	displayString: null,
	helperString: null,
	setREStart: function(fixed) { // fixed is optional
		if(!this["RESite"] || this["RESite"] == null) return
		const maxPosition = this.NTLength - this["RESite"].seq.length
		if(fixed > (maxPosition))
			throw new Error("Cannot instruct a position that causes the returned string to be cut-off")
		this.REStart = fixed ? fixed :
			randomInt(maxPosition + 1) // randomInt always floors, so +1.
	},
	setDisplayString: function() {
		this.displayString =
			(this["RESite"] === undefined || this["RESite"] == null) ?
			generateRandom(9) :
			generateSequenceWithInclude(this.NTLength, this["RESite"].seq, this.REStart)
	},
	setHelperString: function() {
		if(!this["RESite"]) return this.helperString = repeatChar(this.NTLength, " ");
		if(typeof this.REStart !== "number") throw new Error("Must have a start position")
		this.helperString = (
			repeatChar(this.REStart, " ") +
			this["RESite"].name +
			repeatChar(this.NTLength - this.REStart - this["RESite"].name.length, " ")
		)
	}
}

let sequence = []
for(let i = 0; i < 7; i++) {
	sequence.push(Object.create(sequenceTemplate))
}


// TODO: properly define positions
const RESitesClean = [
	{ "id": 0, "name": "HndIII", "seq": "AAGCTT", "cutsForward": 2, "cutsReverse": 4 },
	{ "id": 1, "name": "EcoRI", "seq": "GAATTC", "cutsForward": 2, "cutsReverse": 4 },
	{ "id": 2, "name": "NheI", "seq": "GCTAGC", "cutsForward": 2, "cutsReverse": 4 },
	{ "id": 3, "name": "PstI", "seq": "CTGCAG", "cutsForward": 2, "cutsReverse": 4 },
	{ "id": 4, "name": "SacII", "seq": "CCGCGG", "cutsForward": 2, "cutsReverse": 4 },
	{ "id": 5, "name": "SpeI", "seq": "ACTAGT", "cutsForward": 2, "cutsReverse": 4 },
	{ "id": 6, "name": "HpaI", "seq": "GTTAAC", "cutsForward": 2, "cutsReverse": 4 },
	{ "id": 7, "name": "KpnI", "seq": "GGTACC", "cutsForward": 2, "cutsReverse": 4 },
	// { name: "NotI", "seq": "GCGGCCGC", "length": 6 }
]

const randomInt = function(max) {
	if(typeof max !== 'number') throw new Error('randomInt:', max, ' is not a number')
	return Math.floor(Math.random() * max)
}

function generateSequenceWithInclude(len, include, start) {
	// console.log("generateSequenceWithInclude:", len, include, start)
	if(typeof len !== "number" || len <= 0) throw new Error("Length must be a number > 0")
	let str = generateRandom(start)
	str += include
	str += generateRandom(len - (include.length + start))
	return str
}

function generateRandom(len) {
	if(typeof len !== 'number') throw new Error("Length must be a number")
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

function conflicts(s1, s2) {
	const short = s1.length < s2.length ? s1 : s2, long = s1.length < s2.length ? s2 : s1
	const shortReversed = reverse(short)

	if(long.indexOf(short) > -1 || long.indexOf(shortReversed) > -1) return true
	return false
}
// TODO: see if non ES6 method exists
function reverse(str) {
	return [...str].reverse().join('')
}




// Select 'guaranteed' RE sites
let RE1, RE2, RE1Index, RE2Index
RESites = RESitesClean.slice() // Make an editable copy of RESitesClean
RE1Index = randomInt(RESites.length) // Select first sequence
RE1 = RESites.splice(RE1Index, 1)[0]

do {
	RE2Index = randomInt(RESites.length)
	RE2 = RESites.splice(RE2Index, 1)[0]
	//  RESites[RE2Index]
} while (conflicts(RE1.seq, RE2.seq))
console.log("RE1", RE1)
console.log("RE2", RE2)


// Appoint 2 grps to contain one of each of the 2 'guaranteeds'
let grpContainingRE1 = randomInt(sequence.length), grpContainingRE2
do {
	grpContainingRE2 = randomInt(sequence.length)
} while (Math.abs(grpContainingRE1 - grpContainingRE2) < 1) // At least 1 apart either direction

console.log("Positions of guaranteed RE sites: ", grpContainingRE1, grpContainingRE2)

sequence[grpContainingRE1]["RESite"] = RE1
sequence[grpContainingRE2]["RESite"] = RE2

// Choose which divisions are going to contain the 'filler' RE sites
for(let i = 0, count = 0, used = {}; i < sequence.length && count < 6; i++) {
	// Chance of a division containing a RE site is 40%
	// TODO: Prevent overriding, by checking if a division contains a RE
	if(sequence[i].hasOwnProperty('RESite') || Math.random() < 0.6) continue
	sequence[i]["RESite"] = RESites[randomInt(RESites.length)]
	count++
}

for(let i = 0, filledSequence; i < sequence.length; i++) {
	const division = sequence[i]
	division.setREStart()
	division.setDisplayString()
	division.setHelperString()
}

// console.log("\n\nsequence contains:\n", JSON.stringify(sequence, null, 2))

let sequenceString, helperString

sequenceString = sequence.map(seq => seq.displayString).join(" ")
helperString = sequence.map(seq => seq.helperString).join(" ")
console.log(helperString)
console.log(sequenceString)
console.log(complementFromString(sequenceString))

// digest returns an object of forward and reverse strands
function digest(sequence, RESite) {
	const re = new RegExp(RESite.seq)
	let matchPos = re.exec(sequence).index
	let cutForward = matchPos + RESite.cutsForward
	let cutReverse = matchPos + RESite.cutsReverse
	console.log("cutForward:", cutForward, "cutReverse:", cutReverse,)
	return {
		LHS: {
			forward: sequence.slice(0, cutForward),
			reverse: sequence.slice(0, cutReverse)
		},
		// RHS: {
		// 	forward: sequence.slice(0, cutForward),
		// 	reverse: sequence.slice(0, cutReverse)
		// }
	}
}

let fragments = digest(sequenceString, RE1)
console.log(fragments.LHS.forward)
console.log(fragments.LHS.reverse)
