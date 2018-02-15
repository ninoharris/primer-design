import React from 'react';
import ReactDOM from 'react-dom';
import 'csshake'
import './index.css';
import registerServiceWorker from './registerServiceWorker';

// Redux
import { Provider } from 'react-redux'
import { fetchAllExercises } from './actions'
import configureStore from './configureStore'

import { saveState } from './reducers/localStorage'

import Loading from './components/Loading'
import App, { history } from './routers/Router'

export const store = configureStore()

ReactDOM.render(<Loading />, document.getElementById('root'))

store.dispatch(fetchAllExercises()).then(() => {
  ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById('root')
  )
})

store.subscribe(() => {
  saveState(store.getState())
})

// TODO: REMOVE SRSLY
window.store = store
  
registerServiceWorker();

