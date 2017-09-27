console.log("\n\n\n ------- NEW RUN -------")

const sequenceTemplate = {
	NTLength: 9,
	REStart: null,
	displayString: null,
	helperString: null,
	setREStart: function(pos) {
		if(!this["RESite"] || this["RESite"] == null) return
		if(pos > (this.NTLength - this["RESite"].seq.length))
			throw new Error("Cannot use a position that causes the returned string to be cut-off")
			this.REStart = pos
	},
	setDisplayString: function() {
		this.displayString =
			(this["RESite"] === undefined || this["RESite"] == null) ?
			generateRandom(9) :
			generateSequenceWithInclude(this.NTLength, this["RESite"].seq, this.REStart)
	},
	setHelperString: function() {
		if(!this["RESite"]) return this.helperString = new Array(this.NTLength + 1).join(" ");
		if(typeof this.REStart !== "number") throw new Error("Must have a start position")
		this.helperString = (
			new Array(this.REStart + 1).join(" ") +
			this["RESite"].name +
			new Array(this.NTLength - this.REStart - this["RESite"].name.length + 1).join(" ")
		)
	}
}

let sequence = []
for(let i = 0; i < 10; i++) {
	sequence.push(Object.create(sequenceTemplate))
}



const RESitesClean = [
	{ "id": 0, "name": "HindIII", "seq": "AAGCTT", "cutsForward": 2, "cutsReverse": 4 },
	{ "id": 1, "name": "EcoRI", "seq": "GAATTC" },
	{ "id": 2, "name": "NheI", "seq": "GCTAGC" },
	{ "id": 3, "name": "PstI", "seq": "CTGCAG" },
	{ "id": 4, "name": "SacII", "seq": "CCGCGG" },
	{ "id": 5, "name": "SpeI", "seq": "ACTAGT" },
	{ "id": 6, "name": "HpaI", "seq": "GTTAAC" },
	{ "id": 7, "name": "KpnI", "seq": "GGTACC" },
	// { name: "NotI", "seq": "GCGGCCGC", "length": 6 }
]

const randomInt = function(max) {
	if(typeof max !== 'number') throw new Error('randomInt:', max, ' is not a number')
	return Math.floor(Math.random() * max)
}

function generateSequenceWithInclude(len, include, start) {
	// console.log("generateSequenceWithInclude:", len, include, start)
	if(typeof len !== "number" || len <= 0) throw new Error("Length must be a number > 0")
	// TODO: Add colours for ease of reading
	let str = generateRandom(start)
	str += include
	str += generateRandom(len - (include.length + start))
	return str
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

sequence[grpContainingRE1]["RESite"] = RE1
sequence[grpContainingRE2]["RESite"] = RE2

for(let i = 0, count = 0, used = {}; i < sequence.length && count < 6; i++) {
	// Chance of a division containing a RE site is 40%
	// TODO: Prevent overriding, by checking if a division contains a RE
	if(sequence[i].hasOwnProperty('RESite') || Math.random() < 0.6) continue
	sequence[i]["RESite"] = RESites[randomInt(RESites.length)]
	count++
}

for(let i = 0, filledSequence; i < sequence.length; i++) {
	const division = sequence[i]
	division.setREStart(randomInt(4))
	division.setDisplayString()
	division.setHelperString()
}

// console.log("\n\nsequence contains:\n", JSON.stringify(sequence, null, 2))

let sequenceString, helperString

sequenceString = sequence.map(seq => seq.displayString).join("")
helperString = sequence.map(seq => seq.helperString).join("")
console.log(helperString)
console.log(sequenceString)
console.log(complementFromString(sequenceString))

// digest returns an object of forward and reverse strands
function digest(sequence, RESite) {
	output = {
		forward,
		reverse
	}

}
