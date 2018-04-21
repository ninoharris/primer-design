import _ from 'lodash'
import { codonTable } from './codons'
import moment from 'moment'
export const RESites = require('./restrictionSites').RESites

// General
export const arrToObj = (arr) => arr.reduce((obj, currentID) => ({ ...obj, [currentID]: true }), {})

export const formatDate = (timestamp = 0) => moment(timestamp).format('ddd, Do MMM YY')

export const setIn = (obj, path, value) => _.setWith(_.clone(obj), path, value);

export const getPercent = (a, b) => Math.floor(a / b * 100)
// Database
export const firebasePathExists = (db, firebasePath) => db.ref(firebasePath).once('value').then(snapshot => {
  return snapshot.exists() ? Promise.resolve() : Promise.reject(`firebasePath of ${firebasePath} does not exist!`)
})
export const firebasePathAlreadyExists = (db, firebasePath) => db.ref(firebasePath).once('value').then(snapshot => {
  return snapshot.exists() ? Promise.reject(`firebasePath of ${firebasePath} already exists!`) : Promise.resolve()
})





// Domain specific to DNA

export const repeatChar = function (count, ch) {
  if (!ch || ch.length === 0) ch = " " // Default repeated char is space
  var txt = "";
  for (var i = 0; i < count; i++) {
    txt += ch;
  }
  return txt;
}


export const randomInt = function (max) {
  if (isNaN(max)) throw new Error('randomInt:', max, ' is not a number')
  return Math.floor(Math.random() * max)
}
export const pickRandomFromArray = (arr) => arr[Math.floor(Math.random() * arr.length)]

// 1
export const complementFromString = function (str) { // Pure
  const outcomes = {
    " ": " ",
    "A": "T",
    "T": "A",
    "G": "C",
    "C": "G",
    ".": ".",
  }
  return str.split('').reduce((prev, curr) => [...prev, outcomes[curr] || ' '], []).join('')
}

// 2
export const reverse = function (str) {
  return [...str].reverse().join('')
}

// 3
export const hund80 = str => complementFromString(reverse(str))

// 4
export const getAASeq = function ({ seq, offset = 0, separator = '' }) {
  if (typeof seq !== 'string') throw Error('seq must be a string')
  seq = seq.toUpperCase()

  let output = [], currentCodon
  for (let i = offset; i <= seq.length; i += 3) {
    let test = seq.substr(i, 3) // gets i, i+1, i+2 ONLY.
    currentCodon = codonTable[test] 
    output.push(currentCodon ? (currentCodon + separator) : separator + ' ')
  }
  return output
}

// 5
export const getGCContent = (seq) => {
  const GCCount = seq.toUpperCase().split('').filter(char => char === 'G' || char === 'C').length
  return GCCount / seq.length
}

// 6
export const getMeltingTemperature = (seq) => {
  // Tm = 4(G + C) + 2(A + T) °C
  const chars = seq.toUpperCase().split('')
  const ATCount = chars.filter(char => char === 'A' || char === 'T').length
  const GCCount = chars.filter(char => char === 'G' || char === 'C').length
  return Math.floor(4 * GCCount + 2 * ATCount)
}




export const getMatches = function (query, ref) {
  // returns a string like ---A-C--GT.
  ref = ref.slice('')
  return query.split('').map((char, i) => char === ref[i] ? char : ' ').join('')
}

export const getMismatches = function (query, ref) {
  // returns a string like ---A-C--GT.
  ref = ref.slice('')
  return query.split('').map((char, i) => char === ref[i] ? ' ' : char).join('')
}

export const getLongestMatch = function (str) {
  // Takes in a string of format AGC---TGCGCGATA--A
  // Returns an object of startPos, maxLength.
  // BUG: If two matches are found with equal length, will return the first one.
  str = str + '-' // Hacky hack hack
  let currentlyMatching = false, startPosTemp, lengthTemp = 0, startPos, maxLength = 0
  for (let i = 0, max = str.length; i < max; i++) {
    // loop through string. if not '-', then length+1.
    if (str[i] === '-') {
      if (currentlyMatching && lengthTemp >= maxLength) {
        if (lengthTemp === maxLength) console.log('We have a double match in getLongestMatch... oh dear FIX ME')
        maxLength = lengthTemp
        startPos = startPosTemp
      }
      // reset temps to 0
      currentlyMatching = false
      lengthTemp = 0
    } else {
      if (!currentlyMatching) {
        startPosTemp = i
        currentlyMatching = true
      } else { // if is currentlyMatching
        lengthTemp += 1
      }

    }
  }
  return {
    maxLength,
    startPos,
    longestMatch: str.substr(startPos, maxLength + 1), // +1 as substr is not inclusive
  }
}

// Returns an object of { isExact, rightSeq, wrongSeqQuery, wrongSeqHaystack }
// export const containsMatch = function ({ query, haystack, pos = 0 }) {
//   let isExact = false, wrongSeqQuery = null, wrongSeqHaystack = null, rightSeq = null
//   let haystackSubString = haystack.substr(pos, query.length)

//   // If exact match
//   if (query === haystackSubString) {
//     isExact = true
//     rightSeq = query
//   } else {
//     wrongSeqQuery = getMismatches(query, haystackSubString)
//     wrongSeqHaystack = getMismatches(haystackSubString, query)
//     // uses wrongSeqQuery to filter out correct matches
//     rightSeq = getMatches(query, haystackSubString)
//   }

//   return {
//     isExact, rightSeq, wrongSeqQuery, wrongSeqHaystack
//   }
// }

// shotgun match = check the entire haystack.
// not there: false
// there and at position: true
// there but not correct position (out of frame): INT, WHERE -ve MEANS QUERY IS TO THE LEFT
// export const shotgunMatch = ({ query, haystack, pos = 0 }) => {
//   const matchIndex = haystack.indexOf(query)
//   if(matchIndex > -1) { // if its in the query
//     if(matchIndex === 0) return true
//     return matchIndex
//   }
//   return false
// }
// HELLO WORLD



// looks for closest match within a range of 2 before and 2 after.
export const shotgunMatch = ({ query, haystack, pos = 0, minPercentMatching = 0.5, ...rest }) => {
  let startPos = pos - 2
  // let startPos = Math.min(pos - 2, 0) // set start position to 2 before or 1 or 0
  // FOR SHIFTED TO THE RIGHT
  while(startPos < (pos + 2)) {
    const haystackSubString = haystack.substr(startPos, query.length)
    let isExact = haystackSubString.indexOf(query) > -1
    if(isExact) {
      return {
        isExact,
        frame: startPos - pos,
        ...rest,
      }
    }
    startPos += 1
  }
  return false
}
export const shotgunNormalMatch = ({ query, ...rest, }) => {
  return shotgunMatch({ query: query, ...rest, normalMatch: true })
}
export const shotgunComplementMatch = ({ query, ...rest }) => {
  return shotgunMatch({ query: complementFromString(query), ...rest, complementMatch: true})
}
export const shotgunReverseMatch = ({ query, ...rest }) => {
  return shotgunMatch({ query: reverse(query), ...rest, reverseMatch: true})
}
export const shotgunComplementReverseMatch = ({ query, ...rest }) => {
  shotgunMatch({ query: complementFromString(reverse(query)), ...rest, complementMatch: true, reverseMatch: true})
}
export const shotgunAllPotentialMatches = ({ query, haystack, pos = 0 }) => {
  const correctSequence = haystack.substr(pos, query.length)
  const params = { query, haystack, pos, correctSequence,
    wrongSeqQuery: getMismatches(query, correctSequence), correctChars: getMatches(query, correctSequence)
  }
  return ( // note, everything in params is always returned
    shotgunNormalMatch(params) ||
    shotgunComplementMatch(params) ||
    shotgunReverseMatch(params) ||
    shotgunComplementReverseMatch(params) ||
    params
  )
}


// query stays the same, haystack is complemented.
// export const containsComplementMatch = function ({ query, haystack, pos }) {
//   return containsMatch({
//     query,
//     pos,
//     haystack: complementFromString(haystack)
//   })
// }

export const seqInVector = (seq, vector) => {
  return occurrences(vector, seq, true)
}

/** Function that count occurrences of a substring in a string;
 * @param {String} string               The string
 * @param {String} subString            The sub string to search for
 * @param {Boolean} [allowOverlapping]  Optional. (Default:false)
 * @returns {Array[position...]} 
 */
export function occurrences(subString, string, allowOverlapping) {

    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = [],
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            n.push(pos);
            pos += step;
        } else break;
    }
    return n;
}

export const isTooShort = (seq, min = 10) => {
  if(seq.length < min) return true
  return false
}
export const isTooLong = (seq, max = 20) => {
  if (seq.length > max) return true
  return false
}



export const generateHelper = function (len, start = 1) {
  let output = ""
  for (let i = start; i < len; i++) {
    if (i % 3 === 1) {
      output += i
      i += (String(i).length - 1) // If 10+, then remove a space to keep even. If 100+, remove 2 spaces.
    } else {
      output += " "
    }
  }
  return output
}

export const pickTextColor = (bgColor, lightColor = '#FFFFFF', darkColor = '#333333') => {
  var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
  var r = parseInt(color.substring(0, 2), 16); // hexToR
  var g = parseInt(color.substring(2, 4), 16); // hexToG
  var b = parseInt(color.substring(4, 6), 16); // hexToB
  return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186) ?
    darkColor : lightColor;
}

export const properSpacing = (str = '') => {
  return str.replace(/\s/g, "\u2001") // this is because some browsers wont start a new line with normal spaces, so we replace all spaces with breaking spaces. (\u00A0)
}

export const addCutsAsSpaces = (str, cuts = []) => {
  if(!Array.isArray(cuts)) throw Error('Cuts should always be an array')
  for(let i = cuts.length; i > 0; i -= 1) {
    str = [str.substring(0, cuts[i]), ' ', str.substring(cuts[i])].join('')
  }
  return str
}

// Run through the MCS sequence for any restriction sites and record their position within the sequence
export const getRestrictionSiteMatches = (sequence) => {
  const matches = [] // function returns array of matches
  // From the RESites database (not shown), check each RE site for any occurances
  _.forEach(RESites, RE => {
    let reg = RegExp(RE.seq, 'g') // searching uses regular expressions (RegExp)
    let result = reg.exec(sequence)
    // run a loop to check of multiple instances of the same RE site.
    while (result !== null) {
      matches.push({ ...RE, pos: result.index })
      result = reg.exec(sequence)
    }
  })
  return matches
}

// getMatchParameters is repeatedly used on each RE site within the MCS 
// forwardDirection refers to whether the analysed primer is a forward or reverse primer.
export const getMatchParameters = (RESite, input, forwardDirection = true) => { // assumes forward direction
  // All database entries of RESite have a sequence, cutsForward, and name
  // When part of the MCS

  // if input is for the reverse strand, then its RESite seq must be reversed

  // every input can be split up into a leading, "match", and trailing sequence:
  // ABCTTTTGGXYZ -> ABC leading (5' cap), TTTTGG match (RE site annealing), XYZ leading (bases added for frame)
  const REMatchPos = input.indexOf(RESite.seq) // gets position of the RE site within the input
  if(REMatchPos === -1) { // if the RE site is not found within the input
    return null
  }
  // lets chunk up the input into two parts now:
  // for forward primer: [0: leading, 1: trailing]
  // for reverse primer: [0: trailing, 1: leading]. In either case, the RE site is kept
  let seqChunks = [
    input.slice(0, REMatchPos),
    input.slice(REMatchPos + RESite.seq.length)
  ]
  if (forwardDirection === false) { // if the reverse primer is being analysed
    // reverse the trailing and leading strings to be 3' to 5' 
    seqChunks = seqChunks.map(reverse)
  }
  // assign sequence parts dependent on whether its a forward or reverse primer
  let trailingSeq = forwardDirection ? seqChunks[1] : seqChunks[1]
  let leadingSeq = forwardDirection ? seqChunks[0] : seqChunks[0]
  // return all available information
  return {
    input,
    REMatchPos,
    ...RESite,
    leadingSeq,
    REMatchingSeq: forwardDirection ? RESite.seq : reverse(RESite.seq),
    trailingSeq,
    cutsAt: RESite.pos + (forwardDirection ? RESite.cutsForward : RESite.cutsReverse),
    endPos: RESite.pos + RESite.seq.length,
    positionInVector: RESite.pos - (forwardDirection ? leadingSeq.length : trailingSeq.length),
  }
}

export const has5Cap = (REMatchPos) => {
  return REMatchPos >= 3
}

export const hasGCClamp = (seq = '') => {
  const seqEnd = seq.slice(seq.length - 2) // get last 2 bases
  return getGCContent(seqEnd) >= 0.5 // at least 1 of the end bases is GC
}



window.reverse = reverse
window.complementFromString = complementFromString