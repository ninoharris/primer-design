import { firebase, googleAuthProvider, emailAuthProvider } from '../firebase/firebase'

export const startLogin = (dispatch) => {
    return firebase.auth().signInWithPopup(googleAuthProvider)
}

export const startLogout = (dispatch) => {
    console.log('logging out...')
    return firebase.auth().signOut()
  }