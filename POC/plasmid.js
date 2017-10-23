import util from './util'
import Nt from 'ntseq';
// ES6 destructuring
var {
	repeatChar,
	randomInt,
	generateSequenceWithInclude,
	generateRandom,
	generateRandomSingle,
	generateHelper,
	complementFromString,
	conflicts,
	reverse,
	getAAseq,
} = util

console.log("\n\n\n ------- NEW RUN -------")

const sequenceTemplate = {
	NTLength: 9,
	REStart: null,
	displayString: null, // The output sequence
	helperString: null, // 'eg HindIII' at position 3
	setREStart: function(fixed) { // fixed is optional
		if(!this["RESite"] || this["RESite"] == null) return null
		const maxPosition = this.NTLength - this["RESite"].seq.length
		if(fixed > (maxPosition))
			throw new Error("Cannot instruct a position that causes the returned string to be cut-off")
		this.REStart = fixed ? fixed :
			randomInt(maxPosition + 1) // randomInt always floors, so +1.
		return true
	},
	setDisplayString: function() {
		this.displayString =
			(this["RESite"] === undefined || this["RESite"] == null) ?
			generateRandom(9) :
			generateSequenceWithInclude(this.NTLength, this["RESite"].seq, this.REStart)
	},
	setHelperString: function() {
		if(!this["RESite"]) return this.helperString = repeatChar(this.NTLength, " ");
		if(isNaN(this.REStart)) throw new Error("Must have a start position")
		this.helperString = (
			repeatChar(this.REStart, " ") +
			this["RESite"].name +
			repeatChar(this.NTLength - this.REStart - this["RESite"].name.length, " ")
		)
	}
}

let sequence = []
for(let i = 0; i < 9; i++) {
	sequence.push(Object.create(sequenceTemplate)) // composition > inheritance
}


// TODO: properly define positions
// const RESitesClean = [
// 	{ "id": 0, "name": "HndIII", "seq": "AAGCTT", "cutsForward": 2, "cutsReverse": 4 },
// 	{ "id": 1, "name": "EcoRI", "seq": "GAATTC", "cutsForward": 2, "cutsReverse": 4 },
// 	{ "id": 2, "name": "NheI", "seq": "GCTAGC", "cutsForward": 2, "cutsReverse": 4 },
// 	{ "id": 3, "name": "PstI", "seq": "CTGCAG", "cutsForward": 2, "cutsReverse": 4 },
// 	{ "id": 4, "name": "SacII", "seq": "CCGCGG", "cutsForward": 2, "cutsReverse": 4 },
// 	{ "id": 5, "name": "SpeI", "seq": "ACTAGT", "cutsForward": 2, "cutsReverse": 4 },
// 	{ "id": 6, "name": "HpaI", "seq": "GTTAAC", "cutsForward": 2, "cutsReverse": 4 },
// 	{ "id": 7, "name": "KpnI", "seq": "GGTACC", "cutsForward": 2, "cutsReverse": 4 },
// 	// { name: "NotI", "seq": "GCGGCCGC", "length": 6 }
// ]

const RESitesJSON = require('./data')
let RESitesClean = RESitesJSON["default"]["res"]
// console.log(RESitesClean)



// Select 'guaranteed' RE sites
let RE1, RE2, RE1Index, RE2Index
let RESites = RESitesClean.slice() // Make an editable copy of RESitesClean
RE1Index = randomInt(RESites.length) // Select first sequence
RE1 = RESites.splice(RE1Index, 1)[0]

do {
	RE2Index = randomInt(RESites.length)
	RE2 = RESites.splice(RE2Index, 1)[0]
	//  RESites[RE2Index]
} while (conflicts(RE1.seq, RE2.seq))
// console.log("RE1", RE1)
// console.log("RE2", RE2)


// Appoint 2 grps to contain one of each of the 2 'guaranteeds'
let grpContainingRE1 = randomInt(sequence.length), grpContainingRE2
do {
	grpContainingRE2 = randomInt(sequence.length)
} while (Math.abs(grpContainingRE1 - grpContainingRE2) < 1) // At least 1 apart either direction

// console.log("Positions of guaranteed RE sites: ", grpContainingRE1, grpContainingRE2)

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
console.log(helperString) // ****** TODO: uncomment these three.
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

// let test = 'GGGCGGGTGGG'
// console.log('Should be equal to: CCCACCCGCCC', reverse(complementFromString(test)))
;(function() {
	// for(let i = 0; i <= 180; i += 60) {
		let i = 0, min = i + 1, max = i + 60
		console.log(generateHelper(max, min))
		let forward = generateRandom(max);
		let backward = complementFromString(forward);
		console.log(forward)
		console.log(backward)

		// Get AA sequences
		let aa1 = getAAseq({ seq: forward })
		let aa2 = getAAseq({ seq: forward, offset: 1 })
		let aa3 = getAAseq({ seq: forward, offset: 2 })
		console.log(aa1.join('  '))
		console.log(" " + aa2.join('  '))
		console.log("  " + aa3.join('  '))
		console.log('\n')
	// }
}())
