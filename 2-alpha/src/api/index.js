import _ from 'lodash'
import { codonTable } from './codons'
export const RESites = require('./restrictionSites').RESites

export const arrToObj = (arr) => arr.reduce((obj, currentID) => ({ ...obj, [currentID]: true }), {})

export const firebasePathExists = (db, firebasePath) => db.ref(firebasePath).once('value').then(snapshot => {
  return snapshot.exists() ? Promise.resolve() : Promise.reject('`firebasePath of ${firebasePath} does not exist!`')
})
export const firebasePathAlreadyExists = (db, firebasePath) => db.ref(firebasePath).once('value').then(snapshot => {
  return snapshot.exists() ? Promise.reject(`firebasePath of ${firebasePath} already exists!`) : Promise.resolve()
})

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

export const reverse = function (str) {
  return [...str].reverse().join('')
}

export const hund80 = str => complementFromString(reverse(str))

export const getAASeq = function ({ seq, offset = 0, separator = '' }) {
  if (typeof seq !== 'string') throw Error('seq must be a string')
  seq = seq.toUpperCase()
  // if (seq.match(/[^ATGC\b]+/gi)) throw Error('seq must only contain: ATGC (and space)')
  // seq = seq.replace(/\b/, '') // remove spaces

  let output = [], currentCodon
  for (let i = offset; i <= seq.length; i += 3) {
    let test = seq.substr(i, 3) // gets i, i+1, i+2 ONLY.
    currentCodon = codonTable[test] 
    output.push(currentCodon ? (currentCodon + separator) : separator + ' ')
  }
  return output
}

export const getGCContent = (seq) => {
  const GCCount = seq.toUpperCase().split('').filter(char => char === 'G' || char === 'C').length
  return GCCount / seq.length
}

export const getMeltingTemperature = (seq) => {
  // Tm = 4(G + C) + 2(A + T) °C
  const chars = seq.toUpperCase().split('')
  const ATCount = chars.filter(char => char === 'A' || char === 'T').length
  const GCCount = chars.filter(char => char === 'G' || char === 'C').length
  return 4 * GCCount + 2 * ATCount
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

export const getRestrictionSiteMatches = (sequence) => {
  const matches = [] // returns array
  _.forEach(RESites, RE => {
    let reg = RegExp(RE.seq, 'g')
    let result = reg.exec(sequence)
    while (result !== null) {
      matches.push({...RE, pos: result.index })
      result = reg.exec(sequence)
    }
  })
  return matches
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

export const getMatchParameters = (RESite, input, forwardDirection = true) => {
  // a RESite has a sequence, pos, cutsForward, name
  // if input is for the reverse strand, then its RESite seq must be reversed
  // const REMatchingSeq = forwardDirection ? RESite.seq : api.reverse(RESite.seq)

  // every input can be split up into a leading, "match", and trailing sequence:
  // ABCTTTTGGXYZ -> ABC leading, TTTTGG match, XYZ leading
  // console.log(REMatchingSeq)
  const REMatchPos = input.indexOf(RESite.seq)
  // if(REMatchPos === -1) throw Error('getMatchParameters called on zero matches')

  // lets chunk up the input into two parts now:
  // for forward primer: [leading, trailing]
  // for reverse primer: [trailing, leading]
  let seqChunks = [
    input.slice(0, REMatchPos),
    input.slice(REMatchPos + RESite.seq.length)
  ]
  if (forwardDirection === false) {
    seqChunks = seqChunks.map(reverse)
  }
  let trailingSeq = forwardDirection ? seqChunks[1] : seqChunks[1]
  let leadingSeq = forwardDirection ? seqChunks[0] : seqChunks[0]
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