import _ from 'lodash'
import codonTable from './codon_to_aa'

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

// TODO: see if non ES6 method exists
export const reverse = function (str) {
  return [...str].reverse().join('')
}

export const hund80 = str => complementFromString(reverse(str))

export const getAAseq = function ({ seq, offset = 0 }) {
  if (!seq || typeof seq !== 'string') throw Error('seq must be a string')
  // TODO: see if any non ATGC are included, if spacing then remove.
  seq = seq.toUpperCase()
  if (seq.match(/[^ATGC\b]+/gi)) throw Error('seq must only contain: ATGC (and space)')
  seq = seq.replace(/\b/, '') // remove spaces

  let output = []
  for (let i = offset; i < seq.length; i += 3) {
    let test = seq.substring(i, i + 3) // gets i, i+1, i+2 ONLY.
    output.push(codonTable[test])
  }
  return output
}

export const getMatches = function (query, ref) {
  // returns a string like ---A-C--GT.
  ref = ref.slice('')
  return query.split('').map((char, i) => char === ref[i] ? char : '-').join('')
}

export const getMismatches = function (query, ref) {
  // returns a string like ---A-C--GT.
  ref = ref.slice('')
  return query.split('').map((char, i) => char === ref[i] ? '-' : char).join('')
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
export const containsMatch = function ({ query, haystack, pos = 0 }) {
  let isExact = false, wrongSeqQuery = null, wrongSeqHaystack = null, rightSeq = null
  let haystackSubString = haystack.substr(pos, query.length)

  // If exact match
  if (query === haystackSubString) {
    isExact = true
    rightSeq = query
  } else {
    wrongSeqQuery = getMismatches(query, haystackSubString)
    wrongSeqHaystack = getMismatches(haystackSubString, query)
    // uses wrongSeqQuery to filter out correct matches
    rightSeq = getMatches(query, haystackSubString)
  }

  return {
    isExact, rightSeq, wrongSeqQuery, wrongSeqHaystack
  }
}

// query stays the same, haystack is complemented.
export const containsComplementMatch = function ({ query, haystack, pos }) {
  return containsMatch({
    query,
    pos,
    haystack: complementFromString(haystack)
  })
}

export const seqInVector = (seq, vector) => {

  return occurrences(vector, seq, true)
}

/** Function that count occurrences of a substring in a string;
 * @param {String} string               The string
 * @param {String} subString            The sub string to search for
 * @param {Boolean} [allowOverlapping]  Optional. (Default:false)
 * @returns {Array[position...]} 
 */
function occurrences(subString, string, allowOverlapping) {

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

// get restriction site matches:
/**
 * @param {Object} RESites {"AAATTT": { name: "HindII", ...}}
 * @returns {Object} {0: RESite1, 6: RESite2, ...}
 */
export const getRestrictionSiteMatches = (RESites, sequence) => {
  const matches = {}
  _.keys(RESites).forEach(RE => {
    let reg = RegExp(RE, 'g')
    let result = reg.exec(sequence)
    while (result !== null) {
      matches[result.index] = {...RESites[RE], pos: result.index}
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