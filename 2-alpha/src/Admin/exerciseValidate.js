import _ from 'lodash'
import * as api from '../api'
import { store } from '../index'

export const required = (value) => (value ? undefined : 'Required')

export const number = (value) =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined

export const validate = values => {
  const errors = {}
  // Required
  if (!values.questionPart1) errors.questionPart1 = 'Required'
  if (!values.questionPart2) errors.questionPart2 = 'Required'
  if (!values.vector) errors.vector = 'Required'
  if (!values.haystack) errors.haystack = 'Required'
  if (!values.constructStart) errors.constructStart = 'Required'
  if (!values.constructEnd) errors.constructEnd = 'Required'

  // Only contains ATGC
  const basesRegExp = /[^ATGC]/g
  if (basesRegExp.test(values.haystack)) errors.haystack = 'Haystack must only contain uppercase ATGC'
  if (basesRegExp.test(values.vector)) errors.vector = 'Vector must only contain uppercase ATGC'

  // Number values only
  const constructStart = Number(values.constructStart)
  const constructEnd = Number(values.constructEnd)
  if (isNaN(Number(constructStart))) errors.constructStart = 'Must be a number'
  if (isNaN(Number(constructEnd))) errors.constructEnd = 'Must be a number'

  // vector contains at least two different restriction sites and isn't too long
  if (values.vector.length > 100) errors.vector = 'For display reasons, vector cannot be over 100 bases in length'
  if (_.keys(api.getRestrictionSiteMatches(store.getState().restrictionSites, values.vector)).length < 2) errors.vector = 'Vector must contain at least two different restriction sites'

  // Positions of constructEnd and constructStart
  if (constructStart >= constructEnd) errors.constructEnd = 'Construct end must be after construct start'
  
  // Vector start and vector end
  // TODO: is fusion protein at start? y -> do users need to add their own start codon?. n -> whats the start position.

  // helpers
  const helpersArrayErrors = []
  // check if each one is complete
  values.helpers.forEach(({name, pos, len, color}, index) => {
    pos = Number(pos)
    len = Number(len)
    const helperErrors = {}
    if (!name) {
      helperErrors.name = 'Required'
      helpersArrayErrors[index] = helperErrors
    }
    if (!pos) {
      helperErrors.pos = 'Required'
      helpersArrayErrors[index] = helperErrors
    }
    if (isNaN(pos)) {
      helperErrors.pos = 'Must be a number'
      helpersArrayErrors[index] = helperErrors
    }
    if (!len) {
      helperErrors.len = 'Required'
      helpersArrayErrors[index] = helperErrors
    }
    if (isNaN(len)) {
      helperErrors.len = 'Must be a number'
      helpersArrayErrors[index] = helperErrors
    }
    if (!color || !/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)) {
      helperErrors.color = 'Color required in hexadecimal (#FF0000) format'
      helpersArrayErrors[index] = helperErrors
    }

    // check if each one starts and ends before the end
    if (pos > values.vector.length) {
      helperErrors.pos = 'Helper must start within the length of the vector'
      helpersArrayErrors[index] = helperErrors
    }
    if((pos + len) > values.vector.length) {
      helperErrors.len = 'Helper cannot extend past the vectors length'
      helpersArrayErrors[index] = helperErrors
    }
  })
  
  if (helpersArrayErrors.length > 0) {
    errors.helpers = helpersArrayErrors
  }

  // // run through all helpers and check for no overlaps
  const overlapping = values.helpers.slice()
    .sort((a, b) => (b.pos - a.pos) > 0 ? -1 : 1)
    .reduce((acc, helper, i) => {
      const pos = Number(helper.pos), len = Number(helper.len)
      if (pos < acc.prevPos) {
        acc.errors = `Helper #${i+1} ${helper.name ? `with name of ${helper.name}` : ''} overlaps another helper`
      }
      console.log(acc)
      return { ...acc, prevPos: pos + len}
    }, { prevPos: 0, errors: null })
    
  if(overlapping.errors) {
    errors.helpers = { _error: overlapping.errors }
  }
  return errors
}


export default validate