import * as TYPES from './types'
import { history } from '../routers/Router'
import db, { firebase, googleAuthProvider, emailAuthProvider } from '../firebase/firebase'

// this is to bring up the login popup provided by firebase authentication, but doesn't yet affect redux state
export const startAdminLogin = (dispatch) => {
  firebase.auth().signInWithPopup(googleAuthProvider)
}

// this is attached to a logged-in listener for firebase's authentication. found in AdminRouter
export const adminLogin = (uid, gotoURL) => (dispatch) => {
  dispatch({
    type: TYPES.LOGGED_IN_ADMIN,
    uid,
  })
  history.push(gotoURL) // once logged in then redirect to the targeted URL
}

// this is attached to a logged-out listener for firebase's authentication.
export const startAdminLogout = () => (dispatch) => {
  console.log('logging out...')
  return firebase.auth().signOut()
    .then(() => dispatch({
      type: TYPES.LOGGED_OUT_ADMIN
    })
    // Unlike login, no redirects afterwards so that the user can return back to the page easily.
  )
}