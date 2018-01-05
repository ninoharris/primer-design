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


export const generateSequenceWithInclude = function (len, include, start) {
  // console.log("generateSequenceWithInclude:", len, include, start)
  if (isNaN(len) || len <= 0) throw new Error("Length must be a number > 0")
  let str = generateRandom(start)
  str += include
  str += generateRandom(len - (include.length + start))
  return str
}

export const generateRandom = function (len) {
  if (isNaN(len)) throw new Error("Length must be a number")
  let str = ""
  for (let i = 0; i < len; i++) {
    str += generateRandomSingle()
  }
  return str
}

export const generateRandomSingle = function (not) { // Pure
  let pos, outcomes = ["A", "T", "G", "C"]
  if (not) {
    if (Array.isArray(not)) {
      for (let i = 0; i < not.length; i++) {
        if (pos = outcomes.indexOf(not[i]))
          outcomes.splice(pos, 1)
      }
    } else if (pos = outcomes.indexOf(not)) {
      outcomes.splice(pos, 1)
    }
  }
  return outcomes[randomInt(outcomes.length)]
}

export const generateHelper = function (len, start = 1) {
  let output = ""
  for (let i = start; i < len; i++) {
    if (i % 10 === 1) {
      output += i
      i += (String(i).length - 1) // If 10+, then remove a space to keep even. If 100+, remove 2 spaces.
    } else {
      output += " "
    }
  }
  return output
}

export const complementFromString = function (str) { // Pure
  if (!str || str.length === 0) throw new Error("String must not be empty")
  let complement = ""
  const outcomes = {
    " ": " ",
    "A": "T",
    "T": "A",
    "G": "C",
    "C": "G"
  }
  for (let i = 0; i < str.length; i++) {
    if (!outcomes[str[i]]) {
      throw new Error(`ComplementFromString: char "${str[i]}" is not a standard NT:`, str)
    }
    complement += outcomes[str[i]]
  }
  return complement
}


// export const seq = generateRandom(9)
// console.log(seq, complementFromString(seq))
// console.log(RESitesClean[1]["name"],
// "\n" + RESitesClean[1]["seq"] + "\n" +
// complementFromString(RESitesClean[1]["seq"]))

export const conflicts = function (s1, s2, maxRepeats) {
  // is memoization needed?
  const short = s1.length < s2.length ? s1 : s2
  const long = s1.length < s2.length ? s2 : s1
  const shortReversed = reverse(short)

  // If no maxRepeats, use a simpler one
  if (!maxRepeats) {
    if (long.indexOf(short) > -1 || long.indexOf(shortReversed) > -1) return true
    return false
  }

  if (typeof maxRepeats !== 'number') {
    throw Error('maxRepeats must be an integer.')
  }

  // If we have maxRepeats, then we need to test a certain limit of times.
  const reg1 = RegExp(short, 'g'), reg2 = RegExp(shortReversed, 'g')
  let match, matchCount
  // Yes its repeating, but this is fine.
  matchCount = 0
  while ((match = reg1.exec(long)) !== null) {
    console.log('reg1', match)
    if (matchCount++ >= maxRepeats) return true
  }
  while ((match = reg2.exec(long)) !== null) {
    console.log('reg2', match)
    if (matchCount++ >= maxRepeats) return true
  }
  return false
}
// console.log(conflicts('TATA', 'TATAAGCATATTATA', 2))


// TODO: see if non ES6 method exists
export const reverse = function (str) {
  return [...str].reverse().join('')
}

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
export const getMismatches = function (query, ref) {
  // returns a string like ---A-C--GT.
  ref = ref.slice('')
  return query.split('').map((char, i) =>
    char === ref[i] ? '-' : char)
    .join('')
}
export const getMatches = function (query, ref) {
  // returns a string like ---A-C--GT.
  ref = ref.slice('')
  return query.split('').map((char, i) =>
    char === ref[i] ? char : '-')
    .join('')
}

export const getLongestMatch = function (str) {
  // Takes in a string of format AGC---TGCGCGATA--A
  // Returns an object of startPos, maxLength.
  // BUG: If two matches are found with equal length, will return the first one.
  str = str + '-' // Hacky hack hack
  let currentlyMatching = false, startPosTemp, lengthTemp = 0, startPos, maxLength = 0
  for (let i = 0, max = str.length; i < max; i++) {
    // loop through string. if not '-', then length+1.
    if (str[i] == '-') {
      if (currentlyMatching && lengthTemp >= maxLength) {
        if (lengthTemp == maxLength) console.log('We have a double match in getLongestMatch... oh dear FIX ME')
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
  if (query == haystackSubString) {
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
 *
 * @author Vitim.us https://gist.github.com/victornpb/7736865
 * @see Unit Test https://jsfiddle.net/Victornpb/5axuh96u/
 * @see http://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string/7924240#7924240
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