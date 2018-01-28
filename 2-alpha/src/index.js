import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'csshake'
import './index.css';
import registerServiceWorker from './registerServiceWorker';


// Redux
import { Provider } from 'react-redux'
import { fetchExercises } from './actions'
import configureStore from './configureStore'

import Loading from './components/Loading'
import App from './routers'

const store = configureStore()

ReactDOM.render(<Loading />, document.getElementById('root'))

store.dispatch(fetchExercises()).then(() => {
  ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById('root')
  )
})
  
registerServiceWorker();
