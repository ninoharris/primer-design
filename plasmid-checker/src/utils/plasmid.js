import utils from '../utils/util'
import RESitesJSON from './data.json'

const RESites = RESitesJSON.res

const getRESitesInSeq = (str) => {
  const matches = []

  RESites.forEach(RE => {
    const { seq, name: REName } = RE
    let matchPos = str.indexOf(seq)
    while (matchPos > -1) {
      matches.push({
        REName,
        matchPos,
        length: seq.length,
        seq
      })
      matchPos = str.indexOf(seq, matchPos + seq.length)
    }
  })
  return matches
}


const getRESites = (str) => {
  
  return [
    ...getRESitesInSeq(str),
    ...getRESitesInSeq(utils.reverse(str)),
  ]
}

// console.log(getRESites('ATGGAATTCATGGAATTC'))
const plasmid = {
  getRESites,
}
export default plasmid