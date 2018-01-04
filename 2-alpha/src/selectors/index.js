import * as api from '../api'
import { createSelector } from 'reselect'

const forwardVectorSelector = state => state.formInputs.FV
const forwardGeneSelector = state => state.formInputs.FG
const reverseVectorSelector = state => state.formInputs.RV
const reverseGeneSelector = state => state.formInputs.RG

const hayStackSelector = state => state.question.haystack
const vectorkSelector = state => state.question.vector

const FVErrorsSelector = (FV, )