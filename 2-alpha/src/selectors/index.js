import _ from 'lodash'
import * as api from '../api'
import { createSelector } from 'reselect'

export const loadingSelector = state => state.fetchingExercises
export const showCodons = state => state.showCodons
export const getAllRestrictionSites = state => state.restrictionSites

export const exercisesListSelector = state => state.exercisesList
export const exercisesByIdSelector = state => state.exercisesById
export const currentExerciseSelector = state => state.currentExercise
export const sortOrderSelector = state => state.sortOrder
export const sortBySelector = state => state.sortBy
export const filterTextSelector = state => state.filterText

export const getMultilineWidth = state => state.charMultilineWidth
export const getExercise = (state, { id }) => state.exercisesById[id]

export const getFilteredExercises = createSelector(
  exercisesListSelector,
  exercisesByIdSelector,
  filterTextSelector,
  (IDsList, exercisesById, filterText) => IDsList.filter(ID => {
    const { questionPart1, questionPart2, authorId } = exercisesById[ID]
    filterText = filterText.toLowerCase()
    return questionPart1.toLowerCase().includes(filterText) || 
      questionPart2.toLowerCase().includes(filterText) 
      // TODO: include author names in this
  })
)


// function that returns an object which can be used to createMessage directly, or through a shorthand:
// First create a category and assign it to a variable: const myCategory = createCategory('myCat')
// Then call the success/failure fns: myCategory.success(msg) myCategory.failure(msg)
const createEvaluation = (...initialStates) => {
  const state = Array.isArray(initialStates) ? initialStates.reduce((p, c) => [...p, ...c], []) : []
  let anyErrors = false
  const createMessage = ({ inputs, success, messageID, context }) => {
    if (!inputs) throw Error('Missing inputs in createMessage.')
    if (!messageID) throw Error('Missing messageID in createMessage.')
    state.push({ inputs, success, ID: messageID, context })
    if (success === false) anyErrors = true
    return // to send back true or false or null here?
  }
  const getEvaluation = () => {
    // console.log('getEvaluation called: ', state)
    return state
  }
  const hasErrors = () => anyErrors
  const contains = (searchID) => state.find(msg => msg.ID === searchID)
  const doesntContain = (searchID) => !contains(searchID)

  const createCategory = (...inputs) => ({ // inputs include:
    success: (messageID, context) => {
      createMessage({ inputs, messageID, context, success: true })
    },
    failure: (messageID, context) => {
      createMessage({ inputs, messageID, context, success: false })
      return getEvaluation()
    }
  })

  return {
    getEvaluation,
    createCategory,
    createMessage,
    hasErrors,
    contains,
    doesntContain
  }
}

const uFV = state => state.formInputs.FV
const uFG = state => state.formInputs.FG
const uRV = state => state.formInputs.RV
const uRG = state => state.formInputs.RG

export const getUFV = createSelector(uFV, (seq) => seq.toUpperCase())
export const getUFG = createSelector(uFG, (seq) => seq.toUpperCase())
export const getURV = createSelector(uRV, (seq) => seq.toUpperCase())
export const getURVHund80 = createSelector(getURV, seq => api.hund80(seq))
export const getURVReverse = createSelector(getURV, seq => api.reverse(seq))
export const getURG = createSelector(uRG, (seq) => seq.toUpperCase())
export const getURGHund80 = createSelector(getURG, seq => api.hund80(seq))
export const getURGReverse = createSelector(getURG, seq => api.reverse(seq))

const restrictionSitesSelector = state => state.restrictionSites

export const getCurrentExercise = createSelector(
  exercisesByIdSelector,
  currentExerciseSelector,
  (allExercises, currentId) => ({ ...allExercises[currentId] })
)

export const getBothHaystackStrands = createSelector(
  getCurrentExercise,
  ( exercise ) => /* console.log(exercise) || */
  ({
    forward: exercise.haystack,
    reverse: api.complementFromString(exercise.haystack)
  })
)

export const getBothVectorStrands = createSelector(
  getCurrentExercise,
  ({ vector }) => ({
    forward: vector,
    reverse: api.complementFromString(vector)
  })
)
export const getForwardVectorStrand = createSelector(
  getBothVectorStrands,
  ({ forward }) => forward
)
export const getReverseVectorStrand = createSelector(
  getBothVectorStrands,
  ({ reverse }) => reverse
)

export const getQuestion = createSelector(
  getCurrentExercise,
  ({ questionPart1, questionPart2 }) => ({ questionPart1, questionPart2 })
)

export const getVectorRestrictionSites = createSelector(
  restrictionSitesSelector,
  getBothVectorStrands,
  (RESites, { forward }) => {
    return api.getRestrictionSiteMatches(RESites, forward)
    // 20: { pos: 20, name: 'X', seq: 'AAAAAA' }
  }
)

export const getVectorHelpers = createSelector( // merges RESites and user-added helpers
  getCurrentExercise,
  getVectorRestrictionSites,
  ({helpers}, RESites) => {
    // console.log(helpers, RESites)
    const REHelpers = _.mapValues(RESites, ({ name, seq, pos, color = '#CCCCCC'}) => ({
      name, seq, pos, len: seq.length, color
    }))
    return {
      ...REHelpers,
      ...helpers,
    }
  }
  // returns object of pos: { name, pos, len, color }
)

export const getUserVectorMatchForward = createSelector(
  getUFV,
  getCurrentExercise,
  getVectorRestrictionSites,
  (input, { fusionStart, vectorStart, vector }, RESites) => {
    const matchesObj = _.pickBy(RESites, (RESite) => input.includes(RESite.seq))
    const matches = _.values(matchesObj)
    if (matches.length !== 1) {
      return { matches, multipleMatches: true }
    }
    const singleMatch = { ...matches[0] }
    // console.log('getUserVectorMatchForward', input, match)
    const REMatchPos = singleMatch['REMatchPos'] = input.indexOf(singleMatch.seq) // XXATAGCGYY (primer) -> 2
    singleMatch['leadingSeq']  = input.slice(0, REMatchPos) // XXATAGCGYY (primer)-> XX
    singleMatch['trailingSeq'] = input.slice(REMatchPos + singleMatch.seq.length) // XXATAGCGYY (primer) -> YY
    singleMatch['positionInVector'] = singleMatch.pos - singleMatch['leadingSeq'].length  // position to put primer relative to vector.
    singleMatch['endPos'] = singleMatch['positionInVector'] + 6

    if(!fusionStart) return { singleMatch } // no required frame -> return now and say we dont need frame here
    console.log('Start of vector and RE match:', vectorStart, singleMatch.pos)
    singleMatch['betweenStartAndREStr'] = vector.substring(vectorStart, singleMatch.pos) // ZZZZZATAGCG (vector) -> ZZZZZ
    singleMatch['betweenStartAndRE'] = singleMatch['betweenStartAndREStr'].length // ZZZZZ -> 5
    singleMatch['toGetDesiredFrame'] = (3 - singleMatch['betweenStartAndRE'] % 3) % 3
    singleMatch['input'] = input
    
    return console.log('singleMatch:', {singleMatch}) || { singleMatch }
  }
)

export const getUserVectorMatchReverse = createSelector(
  getURVHund80,
  getURVReverse,
  getCurrentExercise,
  getVectorRestrictionSites,
  (inputHund80, input, { fusionEnd, vectorEnd, vector }, RESites) => {
    const matchesObj = _.pickBy(RESites, (RESite) => inputHund80.includes(RESite.seq))
    const matchesObjSeqReverse = _.map(matchesObj, (RESite => ({ ...RESite, seq: api.reverse(RESite.seq) })))
    const matches = _.values(matchesObjSeqReverse)
    if (matches.length !== 1) {
      return { matches, multipleMatches: true }
    }
    const singleMatch = { ...matches[0] }

    const REMatchPos = singleMatch['REMatchPos'] = input.indexOf(singleMatch.seq) // XXATAGCGYY (primer) -> 2
    singleMatch['leadingSeq'] = input.slice(REMatchPos + singleMatch.seq.length) // 5'-XXATAGCGYY-3' = 3'-YYGCGATAXX-5' (primer)-> XX
    singleMatch['trailingSeq'] = input.slice(0, REMatchPos) // XXATAGCGYY (primer) -> YY
    singleMatch['positionInVector'] = singleMatch['pos'] - singleMatch['trailingSeq'].length // position to put primer relative to vector.
    if (!fusionEnd) return { singleMatch } // no required frame -> return now and say we dont need frame here

    singleMatch['betweenEndAndREStr'] = vector.slice(singleMatch.pos + 6, vectorEnd) // ATAGCGZZZZZ (vector) -> ZZZZZ
    singleMatch['betweenEndAndRE'] = singleMatch['betweenEndAndREStr'].length // ZZZZZ -> 5
    singleMatch['toGetDesiredFrame'] = (3 - singleMatch['betweenEndAndRE'] % 3) % 3
    singleMatch['input'] = input

    return console.log('singleMatch:', { singleMatch }) || { singleMatch }
  }
)

export const getHaystackForwardMatches = createSelector(
  getUFG,
  getBothHaystackStrands,
  getCurrentExercise,
  (input, { forward }, { constructStart }) => {
    if(input.length < 4) return {}
    const forwardMatches = {
      rightSeq: forward.substr(constructStart, input.length),
      input,
      tooShort: api.isTooShort(input),
      tooLong: api.isTooLong(input),
      pos: constructStart,
      endPos: constructStart + input.length,
      ...api.shotgunAllPotentialMatches({ haystack: forward, query: input, pos: constructStart })
    }
    return forwardMatches
  }
)

export const getHaystackReverseMatches = createSelector(
  getURGReverse,
  getBothHaystackStrands,
  getCurrentExercise,
  (input, {reverse}, { constructEnd }) => {
    if (input.length < 4) return {}
    // for this, we keep the haystack the same and reverse the users input. Substring the haystack by the input length for checking.
    const pos = constructEnd - input.length
    const reverseMatches = { 
      input,
      tooShort: api.isTooShort(input),
      tooLong: api.isTooLong(input),
      pos,
      endPos: constructEnd,
      ...api.shotgunAllPotentialMatches({ haystack: reverse, query: input, pos: pos }),
    }
    return reverseMatches
  }
)



// evaluations which are independent of vector input
export const getHaystackEvaluations = createSelector(
  getHaystackForwardMatches,
  getHaystackReverseMatches,
  (FG, RG) => {
  // set up
  const Eval = createEvaluation()
  const EvalFG = Eval.createCategory('FG')
  const EvalRG = Eval.createCategory('RG')

  // check if right completely (and frame)
  if(FG.input) {
    if (FG.normalMatch) EvalFG.success('FORWARD_HAYSTACK_MATCH')
    if (FG.complementMatch) EvalFG.failure('FORWARD_WRONG_STRAND')
    if (FG.reverseMatch) EvalFG.failure('FORWARD_WRONG_DIRECTION')
    if (FG.frame && FG.frame !== 0) EvalFG.failure('FORWARD_HAYSTACK_OUT_OF_FRAME', FG.frame)
    if (!FG.normalMatch && !FG.complementMatch && !FG.reverseMatch) EvalFG.failure("FORWARD_NO_MATCH")
    if (api.isTooShort(FG.input)) EvalFG.failure('FORWARD_TOO_SHORT')
  }
  
  if(RG.input) {
    if (RG.normalMatch) EvalRG.success('REVERSE_HAYSTACK_MATCH')
    if (RG.complementMatch) EvalRG.failure('REVERSE_WRONG_STRAND')
    if (RG.reverseMatch) EvalRG.failure('REVERSE_WRONG_DIRECTION')
    if (RG.frame && RG.frame !== 0) EvalRG.failure('REVERSE_HAYSTACK_OUT_OF_FRAME', RG.frame)
    if (!RG.normalMatch && !RG.complementMatch && !RG.reverseMatch) EvalRG.failure("REVERSE_NO_MATCH")
    if (api.isTooShort(RG.input)) EvalRG.failure('REVERSE_TOO_SHORT')
  }
  // go to vector evaluations!
  return Eval.getEvaluation()
})

// evaluations which are independent of haystack input
export const getVectorEvaluations = createSelector(
  getUserVectorMatchForward,
  getUserVectorMatchReverse,
  getUFV,
  getURV,
  (FV, RV, UFV, URV) => {
  const Eval = createEvaluation()
  const EvalFV = Eval.createCategory('FV')
  const EvalRV = Eval.createCategory('RV')
  const FVRV = Eval.createCategory('RV', 'FV')
  const UFVReadyToCheck = UFV.length >= 6
  const URVReadyToCheck = URV.length >= 6
  
  // No input or not enough to check against, return early
  if(!UFVReadyToCheck && !URVReadyToCheck) return Eval.getEvaluation()

  // If no match or too many matches, then return early as later logic requires a single match
  if(UFVReadyToCheck) {
    if (FV.matches && FV.matches.length === 0) return EvalFV.failure("NO_MATCH_FV")
    if (FV.matches) {
      EvalFV.failure("EXCEED_MATCH_FV") 
    } else {
      EvalFV.success('FV_MATCHES_ONCE')
    }
  }
  if(URVReadyToCheck) {
    if (RV.matches && RV.matches.length === 0) return EvalRV.failure("NO_MATCH_RV") 
    if (RV.matches) {
      EvalRV.failure("EXCEED_MATCH_RV")
    } else {
      EvalRV.success('RV_MATCHES_ONCE')
    }
  }


  // If either aren't ready yet, stop now
  if (Eval.doesntContain('FV_MATCHES_ONCE') || Eval.doesntContain('RV_MATCHES_ONCE')) {
    return Eval.getEvaluation()
  }
  
  // FVRV.success("EACH_VECTOR_PRIMER_MATCHES_ONCE")
  console.log('Were down to single matches:', FV, RV)

  // For readability
  FV = FV.singleMatch
  RV = RV.singleMatch 
  
  // TODO: either restriction site matches inside haystack:
  // Spacing between primers
  if (FV.endPos >= RV.pos) FVRV.failure("VECTOR_OVERLAP")
  const differenceBetweenVectorPrimers = RV.pos - FV.endPos
  if (differenceBetweenVectorPrimers <= 4) FVRV.failure("VECTORS_TOO_CLOSE", differenceBetweenVectorPrimers)

  if (Eval.hasErrors()) return Eval.getEvaluation()
  FVRV.success("VECTOR_PRIMERS_APART")

  // go to final evaluations!
  return Eval.getEvaluation()
})

// evaluations which depend on both haystack and vector
export const getAllEvaluations = createSelector(
  getVectorEvaluations,
  getHaystackEvaluations,
  getCurrentExercise,
  getUserVectorMatchForward,
  getUserVectorMatchReverse,
  getHaystackForwardMatches,
  getHaystackReverseMatches,
  (EvalVector, EvalHaystack, exercise, FV, RV, FG, RG) => {
    const Eval = createEvaluation(EvalHaystack, EvalVector)
    const EvalFV = Eval.createCategory('FV')
    const EvalRV = Eval.createCategory('RV')
    const EvalALL = Eval.createCategory('RV', 'FV', 'FG', 'RG')
    console.log(Eval.getEvaluation())
    if(!FV.singleMatch || !RV.singleMatch) return Eval.getEvaluation()

    // does Forward primer need a start codon in this exercise, if not:
    if (FG.isExact && FG.normalMatch) {
      // check in-frame with constructStart and vectorStart
      if (exercise.fusionStart) {
        const diffBetweenForwardFrameAndDesired = (FV.singleMatch.toGetDesiredFrame - FV.singleMatch.trailingSeq.length)
        if (diffBetweenForwardFrameAndDesired === 0) {
          EvalFV.success('FORWARD_BOTH_IN_FRAME')
        } else {
          EvalFV.failure('FORWARD_BOTH_OUT_OF_FRAME', diffBetweenForwardFrameAndDesired)
        }
      // check in-frame with constructStart and placed start codon
      } else {
        



      }
    }

    if (RG.isExact && RG.normalMatch) {
      // does Reverse primer need a stop codon in this exercise, if so:
      if (exercise.fusionEnd) { // no need for stop codon
        const diffBetweenReverseFrameAndDesired = (RV.singleMatch.toGetDesiredFrame - RV.singleMatch.trailingSeq.length)
        if (diffBetweenReverseFrameAndDesired === 0) {
          EvalRV.success('REVERSE_BOTH_IN_FRAME')
        } else {
          EvalRV.failure('REVERSE_BOTH_OUT_OF_FRAME', diffBetweenReverseFrameAndDesired)
        }
      // check in-frame with constructEnd and placed end codon
      } else {

      }
    }

    // no: check in-frame with constructEnd and vectorEnd
    // yes: check in-frame with constructEnd and placed stop codon


    // COMPLETED EXERCISE. Ready to go
    if(Eval.contains('VECTOR_PRIMERS_APART') && Eval.contains('REVERSE_BOTH_IN_FRAME') && Eval.contains('FORWARD_BOTH_IN_FRAME')) {
      EvalALL.success('READY')
    }
    const result = Eval.getEvaluation()
    return console.log('Evaluations result: ', result) || result
})

// This means the user has entered successful inputs, but has not 'submitted' just yet.
export const getIsSuccessful = createSelector(getAllEvaluations,
  (evaluations) => evaluations.find(msg => msg.ID === 'READY' && msg.success))


export const getFinalClone = createSelector(
  getCurrentExercise,
  getUserVectorMatchForward,
  getUserVectorMatchReverse,
  getHaystackForwardMatches,
  getHaystackReverseMatches,
  (exercise, {singleMatch: FV }, {singleMatch: RV }, FG, RG) => {
    const helpers = []
      
    const vectorStartSeq = exercise.vector.slice(0, FV.positionInVector)
    const startPosOfSecondPart = FV.positionInVector + FV.input.length + exercise.haystack.length
    const vectorEndSeq = exercise.vector.slice(RV.positionInVector + FV.input.length)

    // helper pushing: look at vector and see which helpers are before the first cut off point or after the second. includes those in.
    _.mapValues(exercise.helpers, (helper) => {
      if(helper.pos < FV.positionInVector) {
        helpers.push(helper)
      }
      if (helper.pos > (RV.pos + 6)) {
        helpers.push({ ...helper, pos: (startPosOfSecondPart + helper.pos - RV.positionInVector - RV.trailingSeq.length) })
      }
    })

    const construct = exercise.haystack.slice(exercise.constructStart, exercise.constructEnd)

    const forward = {
      [vectorStartSeq]: { seq: vectorStartSeq, text: 'Vector start'
      },
      [FV.leadingSeq]: { seq: FV.leadingSeq, text: `Forward primer's 5' clamp`
      },
      [FV.seq]: { seq: FV.seq, text: `Forward restriction site match: ${FV.name}`
      },
      [FV.trailingSeq]: { seq: FV.trailingSeq, text: 'Additional sequence to get construct in sequence'
      },
      [construct]: { seq: construct, text: 'Construct sequence to be cloned'
      },
      [RV.trailingSeq]: { seq: RV.trailingSeq, text: 'Additional sequence to get construct in sequence'
      },
      [RV.seq]: { seq: RV.seq, text: `Reverse restriction site match: ${RV.name}`
      },
      [RV.leadingSeq]: { seq: RV.leadingSeq, text: `Reverse primer's 5' clamp.`
      },
      [vectorEndSeq]: { seq: vectorEndSeq, text: 'Vector end'
      },
    }

    const markers = _.map(forward, ({seq, text}) => seq)

    // console.log('Markers', markers)
    // console.log('Forward', forward, forward.length)
    return {
      forward,
      markers,
      helpers
    }
    
  }
)

export const getTroubleshooter = state => state.troubleshooter
export const FV_TS = createSelector(getTroubleshooter, (TS) => TS.FV)