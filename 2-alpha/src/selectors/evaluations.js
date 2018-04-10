import _ from 'lodash'
import { createSelector } from 'reselect'
import * as api from '../api'
import evaluator from './evaluator'
import msgs from './evaluator-messages'
import { 
  getCurrentStudentProfile,
  getCurrentExercise, 
  getVectorRestrictionSites,
  getBothHaystackStrands,
  getURV, 
  getUFV, 
  getUFG, 
  getURG,
  getURVHund80, 
  getURGReverse,
  getHaystackForwardRestrictionSites,
  getHaystackReverseRestrictionSites,
  getEditingGameInputs,
} from './index'

// // function that returns an object which can be used to createMessage directly, or through a shorthand:
// // First create a category and assign it to a variable: const myCategory = createCategory('myCat')
// // Then call the success/failure fns: myCategory.success(msg) myCategory.failure(msg)
// const createEvaluation = (...initialStates) => {
//   const state = Array.isArray(initialStates) ? initialStates.reduce((p, c) => [...p, ...c], []) : []
//   let anyErrors = false
//   const createMessage = ({ inputs, success, messageID, contexts }) => {
//     if (!inputs) throw Error('Missing inputs in createMessage.')
//     if (!messageID) throw Error('Missing messageID in createMessage.')
//     state.push({ inputs, success, ID: messageID, contexts })
//     if (success === false) anyErrors = true
//     return // to send back true or false or null here?
//   }
//   const getEvaluation = () => {
//     return state
//   }
//   const hasErrors = () => anyErrors
//   const contains = (searchID) => state.find(msg => msg.ID === searchID)
//   const doesntContain = (searchID) => !contains(searchID)

//   const createCategory = (inputs = [], contexts = {}) => ({ 
//     // inputs include which parts of the primer(s).
//     // context refers to the match objects. This provides information for advice messages and analytics.
//     success: (messageID) => {
//       createMessage({ inputs, messageID, /* contexts, is context necessary for correctness? */ success: true })
//     },
//     failure: (messageID) => {
//       createMessage({ inputs, messageID, contexts, success: false })
//       return getEvaluation()
//     }
//   })

//   return {
//     getEvaluation,
//     createCategory,
//     createMessage,
//     hasErrors,
//     contains,
//     doesntContain
//   }
// }


// Each of the inputs have their own individual parameters used to produce the main evaluation 
export const getUserVectorMatchForward = createSelector(
  getUFV,
  getCurrentExercise,
  getVectorRestrictionSites,
  (input, { fusionStart, vectorStart, vector }, RESites) => {
    const matches = RESites 
      .filter(RESite => input.includes(RESite.seq))
      .map(RESite => api.getMatchParameters(RESite, input, true))

    if (matches.length !== 1) {  
      return { 
        matches,
        multipleMatches: true
      }
    }
    const singleMatch = { ...matches[0] } // only one match

    if(fusionStart) {
      singleMatch['betweenStartAndREStr'] = vector.substring(vectorStart, singleMatch.pos) // ZZZZZATAGCG (vector) -> ZZZZZ
      singleMatch['betweenStartAndRE'] = singleMatch['betweenStartAndREStr'].length // ZZZZZ -> 5
      singleMatch['toGetDesiredFrame'] = (3 - singleMatch['betweenStartAndRE'] % 3) % 3
    }
    return { singleMatch }
  }
)

export const getUserVectorMatchReverse = createSelector(
  getURVHund80,
  getURV,
  getCurrentExercise,
  getVectorRestrictionSites,
  (inputHund80, input, { fusionEnd, vectorEnd, vector }, RESites) => {
    const matches = RESites
      .filter(RESite => inputHund80.includes(RESite.seq))
      .map(RESite => api.getMatchParameters(RESite, input, false))

    if (matches.length !== 1) {
      return { 
        matches,
        multipleMatches: true
      }
    }
    const singleMatch = { ...matches[0] } // only one match

    if (fusionEnd) {
      singleMatch['betweenEndAndREStr'] = vector.slice(singleMatch.pos + 6, vectorEnd) // ATAGCGZZZZZ (vector) -> ZZZZZ
      singleMatch['betweenEndAndRE'] = singleMatch['betweenEndAndREStr'].length // ZZZZZ -> 5
      singleMatch['toGetDesiredFrame'] = (3 - singleMatch['betweenEndAndRE'] % 3) % 3
    }
    return { singleMatch }
  }
)

export const getHaystackForwardMatches = createSelector(
  getUFG,
  getBothHaystackStrands,
  getCurrentExercise,
  (input, { forward }, { constructStart }) => {
    if (input.length < 4) return {}
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
  (input, { reverse }, { constructEnd }) => {
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

// START EVALUATION

// evaluations which are independent of vector input
export const getHaystackEvaluations = createSelector(
  getHaystackForwardMatches,
  getHaystackReverseMatches,
  getEditingGameInputs,
  (FG, RG, editing) => {
    // set up
    const advice = evaluator()
    advice.addInputs({ FG, RG })

    // check if right completely (and frame)
    if (FG.input) {
      if (FG.normalMatch) advice.add(msgs.FORWARD_HAYSTACK_MATCH()) // EvalFG.success('FORWARD_HAYSTACK_MATCH')
      if (FG.complementMatch) advice.add(msgs.FORWARD_WRONG_STRAND()) // EvalFG.failure('FORWARD_WRONG_STRAND')
      if (FG.reverseMatch) advice.add(msgs.FORWARD_WRONG_DIRECTION())
      if (FG.frame && FG.frame !== 0) advice.add(msgs.FORWARD_HAYSTACK_OUT_OF_FRAME(FG.frame))
      if (!FG.normalMatch && !FG.complementMatch && !FG.reverseMatch) advice.add(msgs.FORWARD_NO_MATCH())
      if (api.isTooShort(FG.input) && !editing.FG) advice.add(msgs.FORWARD_TOO_SHORT())
    }

    if (RG.input) {
      if (RG.normalMatch) advice.add(msgs.REVERSE_HAYSTACK_MATCH())
      if (RG.complementMatch) advice.add(msgs.REVERSE_WRONG_STRAND())
      if (RG.reverseMatch) advice.add(msgs.REVERSE_WRONG_DIRECTION())
      if (RG.frame && RG.frame !== 0) advice.add(msgs.REVERSE_HAYSTACK_OUT_OF_FRAME(RG.frame))
      if (!RG.normalMatch && !RG.complementMatch && !RG.reverseMatch) advice.add(msgs.REVERSE_NO_MATCH())
      if (api.isTooShort(RG.input) && !editing.RG) advice.add(msgs.REVERSE_TOO_SHORT())
    }
    // go to vector evaluations!
    return advice
  }
)

// evaluations) which are independent of haystack input
export const getVectorEvaluations = createSelector(
  getUserVectorMatchForward,
  getUserVectorMatchReverse,
  getUFV,
  getURV,
  getHaystackForwardRestrictionSites,
  getHaystackReverseRestrictionSites,
  getCurrentExercise,
  (FV, RV, UFV, URV, FG_RE_Sites, RG_RE_Sites, exercise) => {
    const advice = evaluator()
    advice.addInputs({ FV, RV })

    const UFVReadyToCheck = UFV.length >= 6
    const URVReadyToCheck = URV.length >= 6

    // No input or not enough to check against, return early
    if (!UFVReadyToCheck && !URVReadyToCheck) return advice

    // If no match or too many matches, then return early as later logic requires a single match
    if (UFVReadyToCheck) {
      // if only one match
      if (FV.singleMatch) {
        advice.add(msgs.FV_MATCHES_ONCE())
        // check clashes with haystack
        if (FG_RE_Sites.find(RESite => UFV.includes(RESite.seq))) advice.add(msgs.HAYSTACK_FORWARD_CONTAINS_FV_SITE())
        if (RG_RE_Sites.find(RESite => UFV.includes(RESite.seq))) advice.add(msgs.HAYSTACK_REVERSE_CONTAINS_FV_SITE())
        // if fusion protein, check that chosen RE site is after the fusion addition
        if (exercise.fusionStart && FV.singleMatch.pos < exercise.vectorStart) advice.add(msgs.FV_BEFORE_START())
      } else {
        // check if reversed input contains an RE site, indicate that the wrong direction was supplied
        if (api.getRestrictionSiteMatches(api.reverse(UFV)).length > 0) advice.add(msgs.FV_MATCHES_WRONG_STRAND()) // BUGGY FIX THIS....
      }
      if (FV.matches && FV.matches.length === 0) advice.add(msgs.NO_MATCH_FV())
      if (FV.matches && FV.matches.length > 0) advice.add(msgs.EXCEED_MATCH_FV())
    }
    if (URVReadyToCheck) {
      if (RV.singleMatch) {
        advice.add(msgs.RV_MATCHES_ONCE())
        if (FG_RE_Sites.find(RESite => URV.includes(RESite.seq))) advice.add(msgs.HAYSTACK_FORWARD_CONTAINS_RV_SITE())
        if (RG_RE_Sites.find(RESite => URV.includes(RESite.seq))) advice.add(msgs.HAYSTACK_REVERSE_CONTAINS_RV_SITE())
        if (exercise.fusionStart && RV.singleMatch.pos > exercise.vectorEnd) advice.add(msgs.RV_AFTER_END())
      } else {
        if (api.getRestrictionSiteMatches(api.reverse(URV)).length > 0) advice.add(msgs.RV_MATCHES_WRONG_STRAND()) // BUGGY
      }
      if (RV.matches && RV.matches.length === 0) advice.add(msgs.NO_MATCH_RV())
      if (RV.matches && RV.matches.length > 0) advice.add(msgs.EXCEED_MATCH_RV())
    }


    // If either aren't ready yet, stop now
    if (advice.doesntContain('FV_MATCHES_ONCE') || advice.doesntContain('RV_MATCHES_ONCE')) {
      return advice
    }

    // For readability
    FV = FV.singleMatch
    RV = RV.singleMatch

    // restriction sites cannot be the same
    if (FV.seq === api.reverse(RV.seq)) advice.add(msgs.SAME_RESTRICTION_SITES())

    // Spacing between primers
    if (FV.endPos > RV.pos) advice.add(msgs.VECTOR_OVERLAP())
    const differenceBetweenVectorPrimers = RV.pos - FV.endPos
    if (differenceBetweenVectorPrimers <= 4) advice.add(msgs.VECTORS_TOO_CLOSE(differenceBetweenVectorPrimers))

    if (advice.hasError()) return advice
    advice.add(msgs.VECTOR_PRIMERS_APART())

    // go to final evaluations!
    return advice
  })


// evaluations which depend on both haystack and vector
export const getAllEvaluationsPhase1 = createSelector(
  getVectorEvaluations,
  getHaystackEvaluations,
  getCurrentExercise,
  getUserVectorMatchForward,
  getUserVectorMatchReverse,
  getHaystackForwardMatches,
  getHaystackReverseMatches,
  (EvalVector, EvalHaystack, exercise, FV, RV, FG, RG) => {
    const advice = evaluator(EvalVector, EvalHaystack)

    if (!FV.singleMatch || !RV.singleMatch) return advice //
    
    if (FG.isExact && FG.normalMatch) {
      // does Forward primer need a start codon in this exercise, if not:
      // check in-frame with constructStart and vectorStart
      if (exercise.fusionStart) {
        const diffBetweenForwardFrameAndDesired = (FV.singleMatch.toGetDesiredFrame - FV.singleMatch.trailingSeq.length)
        if (diffBetweenForwardFrameAndDesired === 0) {
          advice.add(msgs.FORWARD_BOTH_IN_FRAME()) // note this is the same regardless if start codon needed or not, since start codon is 3 bases.
        } else {
          advice.add(msgs.FORWARD_BOTH_OUT_OF_FRAME(diffBetweenForwardFrameAndDesired))
        }
      } else {
        if (exercise.userProvidesStartCodon) {
          const startCodonPos = FV.singleMatch.trailingSeq.toUpperCase().indexOf('ATG')
          if (startCodonPos > -1) {

            advice.add(msgs.FORWARD_INCLUDES_START_CODON())
            const startCodonFrame = FV.singleMatch.trailingSeq.slice(startCodonPos).length % 3
            if (startCodonFrame !== 0) advice.add(msgs.FORWARD_START_CODON_OUT_OF_FRAME(startCodonFrame))

          } else {
            advice.add(msgs.FORWARD_MISSING_START_CODON())
          }
        }
      }
    }

    if (RG.isExact && RG.normalMatch) {
      // does Reverse primer need a stop codon in this exercise, if so:
      if (exercise.fusionEnd) { // no need for stop codon
        const diffBetweenReverseFrameAndDesired = (RV.singleMatch.toGetDesiredFrame - RV.singleMatch.trailingSeq.length)
        if (diffBetweenReverseFrameAndDesired === 0) {
          advice.add(msgs.REVERSE_BOTH_IN_FRAME())
        } else {
          advice.add(msgs.REVERSE_BOTH_OUT_OF_FRAME(diffBetweenReverseFrameAndDesired))
        }
        // check in-frame with constructEnd and placed end codon
      } else {
        if (exercise.userProvidesStopCodon) {
          const endCodonMatch = /(TAA)|(TAG)|(TGA)/i.exec(api.reverse(RV.singleMatch.trailingSeq))
          if (endCodonMatch !== null) {

            advice.add(msgs.REVERSE_INCLUDES_STOP_CODON())
            let endCodonFrame = FV.singleMatch.trailingSeq.slice(0, endCodonMatch.index).length % 3
            if (endCodonFrame !== 0) advice.add(msgs.REVERSE_STOP_CODON_OUT_OF_FRAME(endCodonFrame))

          } else {
            advice.add(msgs.REVERSE_MISSING_STOP_CODON())
          }
        }
      }
    }

    // Check if all inputs entered and no errors
    if (
      advice.contains('VECTOR_PRIMERS_APART') && // FV and RV are correct
      FG.isExact && FG.normalMatch && // FG is correct
      RG.isExact && RG.normalMatch && // RG is correct
      !advice.hasError() // (FV + FG + RV + RG) combined is correct, including frame, stop/start codons if necessary
    ) {
      advice.add(msgs.MATCHES_VECTOR_AND_HAYSTACK()) // phase 1 of exercise completed (matching haystack and vector) 
    }
    return advice
    // console.log('Evaluations result: ', result)
  })

// 'phase 1' is separated into 'ready' and 'complete'
// Order of completion: phase 1 ready -> (user agrees to proceed) -> phase 1 complete -> exercise complete

// Used in student's input form to decide between "Attempt" and "Check final considerations"
export const getPhase1Ready = createSelector(
  getAllEvaluationsPhase1,
  (advice) => advice.contains("MATCHES_VECTOR_AND_HAYSTACK")
)

export const getUserPhase1Ready = state => state.userPhase1Complete

export const getPhase1Complete = createSelector(
  getPhase1Ready,
  getUserPhase1Ready,
  (process, user) => user && process // both are ready to proceed to next stage
)

// after user has decided to go with their answers, a final check of GC content/melting temp/ etc are made before an exercise is considered completed.
export const getAllEvaluations = createSelector(
  getAllEvaluationsPhase1,
  getPhase1Complete,
  getUFV,
  getURV,
  getUFG,
  getURG,
  getUserVectorMatchForward,
  getUserVectorMatchReverse,
  (evaluations, phase1Complete, FV, RV, FG, RG, {singleMatch: FVMatch}, { singleMatch: RVMatch }) => {
    const advice = evaluator(evaluations)
    if (!phase1Complete) return advice
    
    
    const forwardPrimer = '' + FV + FG
    const reversePrimer = '' + RV + RG
    // check length
    if(forwardPrimer.length > 30 || forwardPrimer.length < 18) {
      advice.add(msgs.TOTAL_LENGTH_INCORRECT(forwardPrimer.length, 'FV', 'FG'))
    }
    if (reversePrimer.length > 30 || reversePrimer.length < 18) {
      advice.add(msgs.TOTAL_LENGTH_INCORRECT(reversePrimer.length, 'RV', 'RG'))
    }

    // check 3' GC end clamp
    if(api.hasGCClamp(FG) && api.hasGCClamp(RG)) {
      advice.add(msgs.ADDED_GC_CLAMP())
    } else {
      if(!api.hasGCClamp(FG)) {
        advice.add(msgs.FORGOT_GC_CLAMP('FG'))
      }
      if(!api.hasGCClamp(RG)) {
        advice.add(msgs.FORGOT_GC_CLAMP('RG'))
      }
    }

    // Check 5' cap
    if (api.has5Cap(FVMatch.REMatchPos) && api.has5Cap(RVMatch.REMatchPos)) {
      advice.add(msgs.ADDED_5_PRIME_CAP('FV', 'RV'))
    } else {
      if(!api.has5Cap(FVMatch.REMatchPos)) {
        advice.add(msgs.FORGOT_5_PRIME_CAP('FV'))
      }
      if (!api.has5Cap(RVMatch.REMatchPos)) {
        advice.add(msgs.FORGOT_5_PRIME_CAP('RV'))
      }
    }

    // check GC content
    const forwardGCContent = api.getGCContent(forwardPrimer)
    const reverseGCContent = api.getGCContent(reversePrimer)
    // for all limits, 4% error is allowed
    
    if (forwardGCContent > 0.64 || forwardGCContent < 0.36) {
      advice.add(msgs.GC_CONTENT_INCORRECT(forwardGCContent, 'FV', 'FG'))
    } else {
      advice.add(msgs.GC_CONTENT_CORRECT(forwardGCContent, 'FV', 'FG'))
    }
    if (reverseGCContent > 0.64 || reverseGCContent < 0.36) {
      advice.add(msgs.GC_CONTENT_INCORRECT(reverseGCContent, 'FV', 'FG'))
    } else {
      advice.add(msgs.GC_CONTENT_CORRECT(reverseGCContent, 'RV', 'RG'))
    }

    // check melting temperature
    const forwardMeltingTemperature = api.getMeltingTemperature(forwardPrimer)
    const reverseMeltingTemperature = api.getMeltingTemperature(reversePrimer)
    if (forwardMeltingTemperature > 72) {
      advice.add(msgs.MELTING_TEMPERATURE_INCORRECT(forwardMeltingTemperature, true, 'FORWARD'))
    } else if (forwardMeltingTemperature < 46) {
      advice.add(msgs.MELTING_TEMPERATURE_INCORRECT(forwardMeltingTemperature, false, 'FORWARD'))
    }
    if (reverseMeltingTemperature > 72) {
      advice.add(msgs.MELTING_TEMPERATURE_INCORRECT(reverseMeltingTemperature, true, 'REVERSE'))
    } else if (reverseMeltingTemperature < 46) {
      advice.add(msgs.MELTING_TEMPERATURE_INCORRECT(reverseMeltingTemperature, false, 'REVERSE'))
    }
    
    if (advice.doesntContain('MELTING_TEMPERATURE_INCORRECT')) {
      advice.add(msgs.MELTING_TEMPERATURE_CORRECT({forward: forwardMeltingTemperature, reverse: reverseMeltingTemperature}, 'FORWARD', 'REVERSE'))
    }

    // if no errors, exercise is complete
    if (!advice.hasError()) advice.add(msgs.COMPLETE())

    console.log('Evaluations currently:', advice.getMessages())
    return advice
  }
)

// This means the user has entered successful inputs, but has not 'submitted' just yet.
export const getExerciseComplete = createSelector(getAllEvaluations,
  (advice) => advice.contains('COMPLETE')
)

export const getFinalClone = createSelector(
  getCurrentExercise,
  getUserVectorMatchForward,
  getUserVectorMatchReverse,
  getHaystackForwardMatches,
  getHaystackReverseMatches,
  (exercise, { singleMatch: FV }, { singleMatch: RV }, FG, RG) => {
    const helpers = []

    const vectorStartSeq = exercise.vector.slice(0, FV.positionInVector)
    const startPosOfSecondPart = FV.positionInVector + FV.input.length + exercise.haystack.length
    const vectorEndSeq = exercise.vector.slice(RV.positionInVector + FV.input.length)

    // helper pushing: look at vector and see which helpers are before the first cut off point or after the second. includes those in.
    _.mapValues(exercise.helpers, (helper) => {
      if (helper.pos < FV.positionInVector) {
        helpers.push(helper)
      }
      if (helper.pos > (RV.pos + 6)) {
        helpers.push({ ...helper, pos: (startPosOfSecondPart + helper.pos - RV.positionInVector - RV.trailingSeq.length) })
      }
    })

    const construct = exercise.haystack.slice(exercise.constructStart, exercise.constructEnd)

    const forward = {
      [vectorStartSeq]: {
        seq: vectorStartSeq, text: 'Vector start'
      },
      [FV.leadingSeq]: {
        seq: FV.leadingSeq, text: `Forward primer's 5' clamp`
      },
      [FV.seq]: {
        seq: FV.seq, text: `Forward restriction site match: ${FV.name}`
      },
      [FV.trailingSeq]: {
        seq: FV.trailingSeq, text: 'Additional sequence to get construct in sequence'
      },
      [construct]: {
        seq: construct, text: 'Construct sequence to be cloned'
      },
      [RV.trailingSeq]: {
        seq: RV.trailingSeq, text: 'Additional sequence to get construct in sequence'
      },
      [RV.seq]: {
        seq: RV.seq, text: `Reverse restriction site match: ${RV.name}`
      },
      [RV.leadingSeq]: {
        seq: RV.leadingSeq, text: `Reverse primer's 5' clamp.`
      },
      [vectorEndSeq]: {
        seq: vectorEndSeq, text: 'Vector end'
      },
    }

    const markers = _.map(forward, ({ seq, text }) => seq)

    return {
      forward,
      markers,
      helpers
    }

  }
)
export const getCurrentUserSummary = createSelector(
  getCurrentStudentProfile,
  (student) => student.summary || {}
)

export const getUserCommonMistakes = createSelector(
  getCurrentUserSummary,
  (summary) => {
    const attemptsCount = summary.attemptsCount || {}
    const commonMistakes = Object.keys(attemptsCount)
      .map(attemptID => ([msgs[attemptID]().adminTitle, attemptsCount[attemptID], attemptID])) // create array of [ [ATTEMPT_ID, COUNT] ... ]
    console.log('getting mistakes')
    const commonMistakesSorted = commonMistakes.sort((a, b) => b[1] - a[1])
    return commonMistakesSorted
  }
)