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