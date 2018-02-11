import React from 'react';
import ReactDOM from 'react-dom';
import 'csshake'
import './index.css';
import registerServiceWorker from './registerServiceWorker';

// Firebase
import { firebase } from './firebase/firebase'

// Redux
import { Provider } from 'react-redux'
import { fetchExercises } from './actions'
import configureStore from './configureStore'

import Loading from './components/Loading'
import App from './routers'

export const store = configureStore()

ReactDOM.render(<Loading />, document.getElementById('root'))

store.dispatch(fetchExercises()).then(() => {
  ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById('root')
  )
})
  
registerServiceWorker();

firebase.auth().onAuthStateChanged((user) => {
  if(user) {
    console.log('log in')
  } else {
    console.log('log out')
  }
})