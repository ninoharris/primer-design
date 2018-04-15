import util from './util'
import Nt from 'ntseq';
import rls from 'readline-sync'
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
	getLongestMatch,
	containsMatch,
	containsComplementMatch,
} = util

// Start application
console.log("\n\n\n ------- NEW RUN -------")

// This proof-of-concept/prototype is testing the plausibility of creating 'random' exercises
// It generates a sequence of bases with at least 2 unique  restriction enzyme (RE) sites from a database. 
// This sequence is divided into blocks of 9 bases each, so that: 
// random assignment of two RE sites is guaranteed, 
// manipulation is self-contained and does not interfere with other RE sites, 
// easy to analyse and render, 
// and prevents overlapping RE sites.


// Define a templating object that represents a sequence of 9 bases that can be manipulated to:
// 1) add in a restriction site: sequenceTemplate.RESite = RESite object from database
// 2) position a RESite within the 9 bases: setREStart(position) or setREStart() for a random position
// 3) fill in the other bases in the sequence randomly with A/T/G/C
// 4) When displayed, the restriction site sequence is contained within a randomly generated sequence 
// 5) The name of the restriction site is positioned in line with its sequence 
const sequenceTemplate = {
  NTLength: 9,
  // 1)
  RESite: null,
  REStart: null,
  // 4)
  displayString: null, // The output sequence
  // 5)
  helperString: null, // 'eg HindIII' at position 3 = '   HindIII'
  
  // 2)
	setREStart: function(fixed) { // fixed is optional
		if(!this["RESite"] || this["RESite"] == null) return null // If no RE site assigned, ignore
		const maxPosition = this.NTLength - this["RESite"].seq.length
		if(fixed > (maxPosition))
			throw new Error("Cannot choose a position that causes the returned RESite to be cut-off")
		this.REStart = fixed ? fixed :
			randomInt(maxPosition + 1) // position randomly
		return true
  },
  
  // 3)
	setDisplayString: function() { // generate random bases around the sequence
		this.displayString =
			(this["RESite"] === undefined || this["RESite"] == null) ?
      generateRandom(9) : // from general application programming interface (API), creates A/T/G/C
      // below similarly creates a random base sequence with a fixed sequence at a fixed position (this.REStart)
			generateSequenceWithInclude(this.NTLength, this["RESite"].seq, this.REStart) 
  },
  
  // 5)
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

// Create 9 blocks of sequences: 81 bases in total
let sequence = []
for(let i = 0; i < 9; i++) {
	sequence.push(Object.create(sequenceTemplate))
}

// Create a database of restriction sites
const RESites = [
  { "seq": "AAGCTT", "name": "HndIII", "cutsForward": 1, "cutsReverse": 5, },
  { "seq": "ACTAGT", "name": "SpeI", "cutsForward": 1, "cutsReverse": 5, },
  { "seq": "CATATG", "name": "NdeI", "cutsForward": 2, "cutsReverse": 4, },
  { "seq": "CCGCGG", "name": "SacII", "cutsForward": 4, "cutsReverse": 2, },
  { "seq": "CTGCAG", "name": "PstI", "cutsForward": 5, "cutsReverse": 1, },
  { "seq": "GAATTC", "name": "EcoRI", "cutsForward": 1, "cutsReverse": 5, },
  { "seq": "GCTAGC", "name": "NheI", "cutsForward": 1, "cutsReverse": 5, },
  { "seq": "GGTACC", "name": "KpnI", "cutsForward": 5, "cutsReverse": 1, },
  { "seq": "GTCGAC", "name": "SalI", "cutsForward": 1, "cutsReverse": 5, },
  { "seq": "TCTAGA", "name": "Xba1", "cutsForward": 1, "cutsReverse": 5, },
  { "seq": "CTCGAG", "name": "Xho1", "cutsForward": 1, "cutsReverse": 5, },
  { "seq": "GAGCTC", "name": "Sac1", "cutsForward": 5, "cutsReverse": 1, },
  { "seq": "CCCGGG", "name": "Sma1", "cutsForward": 3, "cutsReverse": 3, },
  { "seq": "CCATGG", "name": "NcoI", "cutsForward": 1, "cutsReverse": 5, }
]


// Create variables for unique restriction sites
let RE1, RE2

// Select the first RE site randomly from the database
RE1 = RESites[randomInt(RESites.length)]

// Select a second RE site that is not the same as the first
do {
	RE2 = RESites[randomInt(RESites.length)]
} while (RE1.seq === RE2.seq)

// Appoint 2 of the 9-base sequence blocks to contain one of each of the 2 'guaranteed' RE sites
let grpContainingRE1 = randomInt(sequence.length)
let grpContainingRE2
do {
  grpContainingRE2 = randomInt(sequence.length)
  // At least 1 9-base block apart in either direction
} while (Math.abs(grpContainingRE1 - grpContainingRE2) < 1) 

// Assign RE sites to their blocks
sequence[grpContainingRE1]["RESite"] = RE1
sequence[grpContainingRE2]["RESite"] = RE2

// Choose which of the other blocks are going to contain 'noise' RE sites
for(let i = 0, count = 0, used = {}; i < sequence.length && count < 6; i++) {
  // Chance of a block containing a 'noise' RE site is 40%
	if(sequence[i].hasOwnProperty('RESite') || Math.random() < 0.6) continue
  // pick a RE site that isn't one of the guaranteed unique RE sites
	sequence[i]["RESite"] = RESites[randomInt(RESites.length, )]
	count++
}

// Tell each block to generate its sequence
for(let i = 0; i < sequence.length; i++) {
	const division = sequence[i]
	division.setREStart()
	division.setDisplayString()
	division.setHelperString()
}

console.log("\n\nSequence object exists as:\n", JSON.stringify(sequence, null, 2))

let sequenceString, helperString

// Preparing display: render sequences/helper text into strings
sequenceString = sequence.map(seq => seq.displayString).join(" ")
helperString = sequence.map(seq => seq.helperString).join(" ")

// Send to user display
console.log(helperString)
console.log(sequenceString)
console.log(complementFromString(sequenceString))

// Creating restriction enzyme digests
// Digest returns an object of forward and reverse strands on the left hand side (LHS)
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
	}
}

let fragments = digest(sequenceString, RE1)

// display fragments
console.log(fragments.LHS.forward)
console.log(fragments.LHS.reverse)
/*
// First setup
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

	console.log(containsMatch({
		haystack: 'CATAAATAATGCGTGTCTAGGTCAAGGTCCCCGGTGATGTTAGGTGGGAAAACCGGAGGA',
		query: 'CATAAAAT',
	}))

}())

*/

// Interactive demo evaluates user input against a randomly generated PCR primer design exercise
// Does not cover plasmid cloning at this stage.
;(function() {
	console.log(' - - - - Starting CLI tool - - - - -')
	const max = 100; // Length of whole sequence, gene sequence contained within

	const forward = generateRandom(max) // Create sequence of bases
	const backward = complementFromString(forward)

	// Appoint a random gene within the whole forward sequence.
	let matchLength = Math.floor(Math.random() * 10) + 36 // Gene length is between 36-46
	let startPos = Math.floor(Math.random() * 30) // Starts between 0 and 54 (100-46 to be within whole sequence)
	let endPos = startPos + matchLength
	let endPosFromEnd = max - endPos // Distance between end of gene and end of whole sequence

	// Set length limits in which the user must create a primer
	const limits = {
		min: 18,
		max: 22
	}

  // Display of exercise
  console.log(  `Make a forward primer that begins at position ${startPos + 1}
                and ends at ${endPos} for the sequence below\n`)
	console.log(generateHelper(60))
	console.log(forward)
	console.log(backward)
  let userCorrect = false, answer, matchAttempt

  // If user is not yet successful, this evaluation loop repeats
	while(!userCorrect) {
    // read answer from user input
    answer = rls.question(`Attempt: (5' to 3')`)
    if (answer.length === 0) {
      console.log('No answer given...')
      continue;
    } 
    if (answer.length >= limits.min || answer.length <= limits.max) {
      console.log('So close! Sequence is just a bit too ' + (answer.length > limits.max ? 'long' : 'short'))
      continue;
    }
    // containsMatch was written in an API to determine correctness and returns an object of
    // isExact                                        TRUE/FALSE
    // a string of matched bases                      (eg --AG-T-C)
    // and a string of mismatched bases from the user (eg TA--C-C-) 
    // and from the exercise                          (eg GT--G-T-)
    matchAttempt = containsMatch({ haystack: forward, query: answer, pos: startPos })

		if(matchAttempt.isExact) {
      userCorrect = true
      console.log('Well done!')
      continue;
		} else { 
      // If the user is wrong, check likely permutations of mistakes
      if (containsMatch({
        haystack: reverse(forward),
        query: answer,
        pos: startPos
      }).isExact) {
        console.log(`Oops, youve done it 3' to 5' instead of 5' to 3'. Try instead reversing your answer.`)
      }
      // Wrong strand...
      if (containsMatch({
        haystack: complementFromString(forward),
        query: answer,
        pos: startPos
      }).isExact) {
        console.log(`You've picked the reverse strand instead of the forward strand for the forward primer.`)
      }
      // Tests for frame shifts
      for (let i = -2; i <= 2; i++) {
        if (containsMatch({
          haystack: forward,
          query: answer,
          pos: startPos + i
        }).isExact) {
          console.log(`Out of frame by ${Math.abs(i)} bases to the ${i < 0 ? 'left' : 'right'}!`)
        }
      }
			console.log('Sorry no luck... mismatch shown')
			console.log(matchAttempt)
		}
	}
	userCorrect = false // reset for next stage...
	console.log('Now for the reverse primer!')
	while(!userCorrect) {
		answer = rls.question(`Attempt: (5' to 3')`)
		// get reverse to go from 3' LEFT to 5' RIGHT to: 5' LEFT to 3' RIGHT.
		let backward5to3 = reverse(backward)

		matchAttempt = containsMatch({
			haystack: backward5to3,
			query: answer,
			pos: endPosFromEnd
		})
		if(matchAttempt.isExact) {
			if(answer.length >= limits.min && answer.length <= limits.max) {
				userCorrect = true
				console.log('Well done!')
			} else {
        if (answer.length === 0) {
          console.log('No answer given...')
        } else {
          console.log('So close! Sequence is just a bit too ' + (answer.length > limits.max ? 'long' : 'short'))
        }
			}
		} else {
			// go through different reasons as to why they're wrong...
			// if its 3' to 5' instead of 5' to 3':
			if(containsMatch({
				haystack: backward5to3,
				query: reverse(answer),
				pos: endPosFromEnd
			}).isExact) {
				console.log(`Oops, youve done it 3' to 5' instead of 5' to 3'. Try instead reversing your answer as this is the *reverse* primer`)
			}
			// if they've gone for the wrong strand...
			if(containsMatch({
				haystack: reverse(forward),
				query: answer,
				pos: endPosFromEnd
			}).isExact) {
				console.log(`You've picked the forward strand instead of the reverse strand for the reverse primer.`)
      }
      // tests for out-of-frame
      for (let i = -2; i <= 2; i++) {
        if (containsMatch({
          haystack: backward5to3,
          query: reverse(answer),
          pos: endPosFromEnd + i
        }).isExact) {
          console.log(`Out of frame by ${Math.abs(i)} bases to the ${i < 0 ? 'left' : 'right'}!`)
        }
      }
			console.log('Sorry no luck... mismatch shown')
			console.log(matchAttempt)
		}
	}
}())

// let match = containsMatch({
// 	haystack: 'CATAAATAATGCGTGTCTAGGTCAAGGTCCCCGGTGATGTTAGGTGGGAAAACCGGAGGA',
// 	query: 'CATCAAT',
// })
// let { rightSeq } = match
// console.log(getLongestMatch(rightSeq))
