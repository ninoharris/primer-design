
import _ from 'lodash'
import { arrToObj, firebasePathExists, firebasePathAlreadyExists } from '../api'
import * as TYPES from './types'
import db from '../firebase/firebase'

export const fetchCohortSummaryOnce = (cohortID) => (dispatch) => {
  dispatch({
    type: TYPES.FETCH_COHORT_SUMMARY_INIT,
    cohortID,
  })


  // return db.ref(`cohorts/${cohortID}/summary`).on('value')
}